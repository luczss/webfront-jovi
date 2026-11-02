/**
 * Análise de imagem feita 100% no navegador, com algoritmos clássicos de
 * visão computacional (NÃO é um modelo de IA/Machine Learning):
 *
 *  - Nitidez:      variância do filtro Laplaciano.
 *  - Exposição:    luminância média comparada a um valor "ideal".
 *  - Estabilidade: diferença média entre dois quadros consecutivos.
 *  - Composição:   distância do centro de massa das bordas aos pontos
 *                  de interseção da regra dos terços.
 *  - Cena:         heurística simples (brilho, movimento e orientação).
 */

const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

let workCanvas = null;

function getWorkContext(width, height) {
  if (!workCanvas) {
    workCanvas = document.createElement("canvas");
  }

  workCanvas.width = width;
  workCanvas.height = height;

  return workCanvas.getContext("2d", { willReadFrequently: true });
}

/**
 * Reduz a imagem/vídeo para uma matriz em tons de cinza.
 * `source` pode ser <video>, <img> ou <canvas>.
 */
export function sampleGray(source, { width = 160, mirror = false } = {}) {
  const sourceWidth =
    source.videoWidth || source.naturalWidth || source.width;
  const sourceHeight =
    source.videoHeight || source.naturalHeight || source.height;

  if (!sourceWidth || !sourceHeight) {
    return null;
  }

  const height = Math.max(
    8,
    Math.round((sourceHeight * width) / sourceWidth)
  );

  const ctx = getWorkContext(width, height);

  ctx.save();

  if (mirror) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(source, 0, 0, width, height);
  ctx.restore();

  const { data } = ctx.getImageData(0, 0, width, height);
  const gray = new Float32Array(width * height);

  for (let i = 0, p = 0; i < gray.length; i += 1, p += 4) {
    gray[i] =
      0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
  }

  return {
    gray,
    width,
    height,
    aspect: sourceWidth / sourceHeight
  };
}

function meanBrightness(gray) {
  let sum = 0;

  for (let i = 0; i < gray.length; i += 1) {
    sum += gray[i];
  }

  return sum / gray.length;
}

function motionAmount(previous, current) {
  if (!previous || previous.length !== current.length) {
    return 0;
  }

  let sum = 0;

  for (let i = 0; i < current.length; i += 1) {
    sum += Math.abs(previous[i] - current[i]);
  }

  return sum / current.length;
}

/** Variância do Laplaciano + centro de massa das bordas, em uma passada. */
function edgeStats(gray, width, height) {
  let lapSum = 0;
  let lapSumSq = 0;
  let count = 0;
  let weight = 0;
  let cx = 0;
  let cy = 0;

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const i = y * width + x;

      const lap =
        4 * gray[i] -
        gray[i - 1] -
        gray[i + 1] -
        gray[i - width] -
        gray[i + width];

      lapSum += lap;
      lapSumSq += lap * lap;
      count += 1;

      const gx = gray[i + 1] - gray[i - 1];
      const gy = gray[i + width] - gray[i - width];
      const magnitude = Math.abs(gx) + Math.abs(gy);

      weight += magnitude;
      cx += magnitude * x;
      cy += magnitude * y;
    }
  }

  const mean = lapSum / count;

  return {
    variance: lapSumSq / count - mean * mean,
    centroid:
      weight > 0
        ? {
            x: cx / weight / (width - 1),
            y: cy / weight / (height - 1)
          }
        : { x: 0.5, y: 0.5 }
  };
}

const POWER_POINTS = [
  { x: 1 / 3, y: 1 / 3 },
  { x: 2 / 3, y: 1 / 3 },
  { x: 1 / 3, y: 2 / 3 },
  { x: 2 / 3, y: 2 / 3 }
];

function compositionInfo(centroid) {
  let best = POWER_POINTS[0];
  let bestDistance = Infinity;

  for (const point of POWER_POINTS) {
    const distance = Math.hypot(
      point.x - centroid.x,
      point.y - centroid.y
    );

    if (distance < bestDistance) {
      best = point;
      bestDistance = distance;
    }
  }

  const score = Math.round(clamp(100 - bestDistance * 160));

  let suggestion = null;

  if (score < 80) {
    const dx = best.x - centroid.x;
    const dy = best.y - centroid.y;

    if (Math.abs(dx) >= Math.abs(dy)) {
      suggestion =
        dx > 0
          ? "Mova o assunto para a direita"
          : "Mova o assunto para a esquerda";
    } else {
      suggestion =
        dy > 0
          ? "Mova o assunto para baixo"
          : "Mova o assunto para cima";
    }
  }

  return { score, suggestion };
}

const sharpnessScore = (variance) =>
  Math.round(
    clamp(
      ((Math.log(1 + variance) - Math.log(6)) /
        (Math.log(301) - Math.log(6))) *
        100
    )
  );

const exposureScore = (mean) =>
  Math.round(clamp(100 - Math.abs(mean - 120) * 0.9));

const stabilityScore = (motion) =>
  Math.round(clamp(100 - motion * 6));

function detectScene({ brightness, motion, aspect }) {
  if (brightness < 70) {
    return "Noite";
  }

  if (motion > 10) {
    return "Ação";
  }

  return aspect < 1 ? "Retrato" : "Paisagem";
}

/** Análise de um quadro ao vivo (usa o quadro anterior para estabilidade). */
export function analyzeSample(sample, previousGray) {
  const { gray, width, height, aspect } = sample;

  const brightness = meanBrightness(gray);
  const motion = motionAmount(previousGray, gray);
  const { variance, centroid } = edgeStats(gray, width, height);
  const composition = compositionInfo(centroid);

  const foco = sharpnessScore(variance);
  const luz = exposureScore(brightness);
  const estab = stabilityScore(motion);

  return {
    foco,
    luz,
    estab,
    composicao: composition.score,
    suggestion: composition.suggestion,
    scene: detectScene({ brightness, motion, aspect }),
    overall: Math.round((foco + luz + estab + composition.score) / 4)
  };
}

/** Análise de uma imagem estática (foto capturada ou referência). */
export function analyzeStill(source) {
  const sample = sampleGray(source, { width: 160 });

  if (!sample) {
    throw new Error("Imagem sem dimensões válidas.");
  }

  const { gray, width, height, aspect } = sample;

  const brightness = meanBrightness(gray);
  const { variance, centroid } = edgeStats(gray, width, height);

  const sharpness = sharpnessScore(variance);
  const exposure = exposureScore(brightness);
  const composition = compositionInfo(centroid).score;

  return {
    sharpness,
    exposure,
    composition,
    overall: Math.round((sharpness + exposure + composition) / 3),
    scene: detectScene({ brightness, motion: 0, aspect })
  };
}

/** Carrega uma imagem remota (com CORS) e a analisa. */
export function analyzeImageUrl(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        resolve(analyzeStill(image));
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () =>
      reject(
        new Error("Não foi possível carregar a imagem para análise.")
      );

    image.src = url;
  });
}