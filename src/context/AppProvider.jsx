import { useCallback, useMemo } from "react";

import { AppContext } from "./AppContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Mesmas chaves da Sprint 3, para preservar os dados já salvos.
const ITEMS_KEY = "snapflow_items";
const AI_KEY = "snapflow_ai";

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function AppProvider({ children }) {
  const [aiEnabled, setAiEnabled] = useLocalStorage(AI_KEY, true);
  const [items, setItems, storageError] = useLocalStorage(ITEMS_KEY, []);

  const toggleAI = useCallback(
    () => setAiEnabled((value) => !value),
    [setAiEnabled]
  );

  const saveCapture = useCallback(
    (capture) => {
      setItems((current) => [
        {
          id: newId(),
          ...capture,
          createdAt: Date.now(),
          isPrivate: false
        },
        ...current
      ]);
    },
    [setItems]
  );

  const togglePrivacy = useCallback(
    (id) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, isPrivate: !item.isPrivate } : item
        )
      );
    },
    [setItems]
  );

  const deleteItem = useCallback(
    (id) => {
      setItems((current) => current.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const value = useMemo(
    () => ({
      aiEnabled,
      toggleAI,
      items,
      storageError,
      saveCapture,
      togglePrivacy,
      deleteItem
    }),
    [
      aiEnabled,
      toggleAI,
      items,
      storageError,
      saveCapture,
      togglePrivacy,
      deleteItem
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}