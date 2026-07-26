"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useCallback, useMemo } from "react";

/**
 * App-level theme hook wrapping `next-themes`.
 */
export const useAppTheme = () => {
  const { theme, resolvedTheme, setTheme } = useNextTheme();

  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return useMemo(
    () => ({
      isDark,
      isLight,
      resolvedTheme,
      setTheme,
      theme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, isDark, isLight, toggleTheme]
  );
};
