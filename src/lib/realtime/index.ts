import type { InferRealtimeEvents } from "@upstash/realtime";
import { Realtime } from "@upstash/realtime";
import { z } from "zod";

import { redis } from "@/lib/redis";

const messageEntry = z.object({
  id: z.string(),
  roomId: z.string(),
  sender: z.string(),
  text: z.string(),
  timestamp: z.number(),
  type: z.literal("message"),
});

const joinEntry = z.object({
  id: z.string(),
  roomId: z.string(),
  sender: z.string(),
  timestamp: z.number(),
  type: z.literal("join"),
});

const message = z.discriminatedUnion("type", [messageEntry, joinEntry]);

const schema = {
  chat: {
    message,
  },
};

export const realtime = new Realtime({ redis, schema });

export type RealtimeEvents = InferRealtimeEvents<typeof realtime>;
export type ChatMessage = z.infer<typeof message>;
