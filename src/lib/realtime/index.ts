import type { InferRealtimeEvents } from "@upstash/realtime";
import { Realtime } from "@upstash/realtime";
import { z } from "zod";

import { redis } from "@/lib/redis";

const message = z.object({
  id: z.string(),
  roomId: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

const schema = {
  chat: {
    message,
  },
};

export const realtime = new Realtime({ redis, schema });

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export type ChatMessage = z.infer<typeof message>;
