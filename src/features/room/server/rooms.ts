import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { z } from "zod";

import { authMiddleware } from "@/features/room/server/auth";
import { redis } from "@/lib/redis";

const ROOM_TTL_SECONDS = 60 * 10;

export const rooms = new Elysia({ prefix: "/room" })
  .post("/create", async () => {
    const roomId = nanoid();

    await redis.hset(`meta:${roomId}`, {
      connected: [],
      createdAt: Date.now(),
    });

    await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

    return { roomId };
  })
  .use(authMiddleware)
  .get(
    "/ttl",
    async ({ auth }) => {
      const ttl = await redis.ttl(`meta:${auth.roomId}`);

      return { ttl: Math.max(ttl, 0) };
    },
    { query: z.object({ roomId: z.string() }) }
  );
