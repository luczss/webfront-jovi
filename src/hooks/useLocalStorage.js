import { useEffect, useState } from "react";

/**
 * useState persistido no localStorage.
 * Retorna [valor, setValor, erroDeArmazenamento].
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);

      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setError((current) => (current ? "" : current));
    } catch {
      setError(
        "Não foi possível salvar no navegador (armazenamento cheio ou bloqueado)."
      );
    }
  }, [key, value]);

  return [value, setValue, error];
}