"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes";

type ThemeProviderProps = Omit<
  NextThemeProviderProps,
  | "attribute"
  | "defaultTheme"
  | "disableTransitionOnChange"
  | "enableColorScheme"
  | "enableSystem"
>;

export const ThemeProvider = ({
  children,
  ...props
}: Readonly<ThemeProviderProps>) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="light"
    disableTransitionOnChange
    enableColorScheme
    enableSystem
    storageKey="whispr-chat-theme"
    themes={["light", "dark"]}
    {...props}
  >
    {children}
  </NextThemeProvider>
);
