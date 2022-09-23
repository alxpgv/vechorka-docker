import { useCallback, useEffect } from "react";

export const useKey = (key: string, callback: () => void) => {
  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        return callback();
      }
    },
    [callback, key]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  return null;
};
