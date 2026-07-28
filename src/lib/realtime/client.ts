import { createRealtime } from "@upstash/realtime/client";

import type { RealtimeEvents } from "./index";

export const { useRealtime } = createRealtime<RealtimeEvents>();
