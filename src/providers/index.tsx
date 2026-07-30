"use client";

import * as React from "react";

import { QueryProvider } from "./query-provider";
import { RealtimeProvider } from "./realtime-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

// Single <Providers> wrapper imported by the root layout.
// Add new providers here — root layout.tsx stays clean.
// Order matters: outer providers are available to inner providers.
// ThemeProvider is outermost so theme context is available to everything,
// including any provider UI that might render loading states.
export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => (
  <ThemeProvider>
    <ToastProvider />
    <QueryProvider>
      <RealtimeProvider>{children}</RealtimeProvider>
    </QueryProvider>
  </ThemeProvider>
);
