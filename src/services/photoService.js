/**
 * Camada de serviço da API pública Lorem Picsum (https://picsum.photos).
 * Não exige chave de acesso. A URL base pode ser trocada pela variável
 * de ambiente VITE_PHOTOS_API_URL (veja .env.example).
 */
const BASE_URL = (
  import.meta.env.VITE_PHOTOS_API_URL || "https://picsum.photos"
).replace(/\/$/, "");

export async function fetchPhotos({ page = 1, limit = 12, signal } = {}) {
  const response = await fetch(
    `${BASE_URL}/v2/list?page=${page}&limit=${limit}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(
      `A API de fotos respondeu com o status ${response.status}.`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Resposta inesperada da API de fotos.");
  }

  return data.map((photo) => ({
    id: String(photo.id),
    author: photo.author,
    width: photo.width,
    height: photo.height,
    sourceUrl: photo.url,
    thumb: `${BASE_URL}/id/${photo.id}/480/320`
  }));
}