
import { useCallback, useEffect, useState } from "react";

import { fetchPhotos } from "../services/photoService";

/**
 * Carrega, de forma paginada, as fotos da API pública.
 * status: "loading" | "success" | "error"
 */
export function usePhotoReferences(limit = 12) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetchPhotos({ page, limit, signal: controller.signal })
      .then((result) => {
        setPhotos((current) => {
          const known = new Set(current.map((photo) => photo.id));

          return [
            ...current,
            ...result.filter((photo) => !known.has(photo.id))
          ];
        });

        setStatus("success");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message || "Falha ao carregar as fotos.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [page, limit, reloadKey]);

  const loadMore = useCallback(() => {
    setError("");
    setStatus("loading");
    setPage((value) => value + 1);
  }, []);

  const retry = useCallback(() => {
    setError("");
    setStatus("loading");
    setReloadKey((value) => value + 1);
  }, []);

  return { photos, status, error, loadMore, retry };
}
