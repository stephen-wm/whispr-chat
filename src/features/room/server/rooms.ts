import { Elysia } from "elysia";
import { nanoid } from "nanoid";

import { redis } from "@/lib/redis";

const ROOM_TTL_SECONDS = 60 * 10;

export const rooms = new Elysia({ prefix: "/room" }).post(
  "/create",
  async () => {
    const roomId = nanoid();

    await redis.hset(`meta:${roomId}`, {
      connected: [],
      createdAt: Date.now(),
    });

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

    return { roomId };
  }
);
