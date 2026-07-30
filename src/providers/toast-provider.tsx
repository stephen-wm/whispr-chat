import { Toaster as SonnerToaster } from "sonner";
import type { ToasterProps } from "sonner";

import { useAppTheme } from "@/hooks/use-theme";

export const ToastProvider = () => {
  const { resolvedTheme } = useAppTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme as ToasterProps["theme"]}
      closeButton
      position="bottom-right"
    />
  );
};
