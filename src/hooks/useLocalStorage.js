
import { useCallback, useState } from "react";

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

  const updateValue = useCallback(
    (nextValue) => {
      const newValue =
        typeof nextValue === "function"
          ? nextValue(value)
          : nextValue;

      setValue(newValue);

      try {
        localStorage.setItem(key, JSON.stringify(newValue));
        setError("");
      } catch {
        setError(
          "Não foi possível salvar no navegador (armazenamento cheio ou bloqueado)."
        );
      }
    },
    [key, value]
  );

  return [value, updateValue, error];
}
