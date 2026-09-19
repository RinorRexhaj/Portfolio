import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cycles an index on a timer. `restart` resets the clock after a manual pick so
 * the next auto-advance is not cut short.
 */
export const useAutoRotate = (
  length: number,
  { enabled, intervalMs = 3000 }: { enabled: boolean; intervalMs?: number }
) => {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const clear = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    if (!enabled || length <= 1) return;
    timer.current = window.setInterval(
      () => setIndex((prev) => (prev + 1) % length),
      intervalMs
    );
  }, [clear, enabled, length, intervalMs]);

  useEffect(() => {
    start();
    return clear;
  }, [start, clear]);

  const select = useCallback(
    (next: number) => {
      setIndex(next);
      start();
    },
    [start]
  );

  const step = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + length) % length),
    [length]
  );

  return { index, select, step, reset: () => setIndex(0) };
};
