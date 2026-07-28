import { RealtimeProvider as UpstashRealtimeProvider } from "@upstash/realtime/client";

export const RealtimeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => (
  <UpstashRealtimeProvider>{children}</UpstashRealtimeProvider>
);
