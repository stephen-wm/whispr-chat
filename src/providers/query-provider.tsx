import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export const QueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());

  void setQueryClient;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
