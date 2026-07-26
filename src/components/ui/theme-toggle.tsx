"use client";

import type { HTMLMotionProps } from "motion/react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Eclipse } from "@/components/icons/eclipse";
import { useHydrated } from "@/hooks/use-hydrated";
import { useAppTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

import { Skeleton } from "./skeleton";

const ThemeToggle = ({
  className,
  ...props
}: Readonly<HTMLMotionProps<"button">>) => {
  const [animating, setAnimating] = useState<boolean>(false);
  const { isDark, toggleTheme } = useAppTheme();
  const hydrated = useHydrated();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleThemeToggle = useCallback(() => {
    setAnimating(true);
    toggleTheme();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAnimating(false);
    }, 300);
  }, [toggleTheme]);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  if (!hydrated) {
    return (
      <Skeleton
        className={cn(
          `size-8 rounded-lg border border-input bg-background transition-all duration-150 hover:bg-secondary`,
          className
        )}
      />
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "grid place-items-center size-8 rounded-lg border border-input bg-background transition-all duration-150 hover:bg-secondary",
        className
      )}
      onClick={handleThemeToggle}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <motion.div
        animate={{
          rotate: isDark ? 180 : 0,
          scale: animating ? [1, 1.25, 1] : 1,
        }}
        initial={{
          rotate: isDark ? 180 : 0,
          scale: 1,
        }}
        transition={{
          rotate: {
            damping: 20,
            stiffness: 300,
            type: "spring" as const,
          },
          scale: {
            duration: 0.25,
            ease: "easeOut" as const,
          },
        }}
      >
        <Eclipse className="text-black dark:invert size-4" />
      </motion.div>
    </motion.button>
  );
};

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
