import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import { z } from "zod";

import { authMiddleware } from "@/features/room/server/auth";
import { RateLimitError } from "@/lib/errors";
import { roomCreateRateLimit } from "@/lib/ratelimit";
import { redis } from "@/lib/redis";

const ROOM_TTL_SECONDS = 60 * 10;

export const rooms = new Elysia({ prefix: "/room" })
  .error({ RateLimitError })
  .onError(({ code, error, set }) => {
    if (code === "RateLimitError") {
      set.status = 429;

      const retryAfter =
        typeof error.reset === "number"
          ? Math.max(Math.ceil((error.reset - Date.now()) / 1000), 0)
          : undefined;

      return {
        error: retryAfter
          ? `${error.message} Try again in ${retryAfter} seconds.`
          : error.message,
      };
    }
  })
  .post(
    "/create",
    async ({ request }) => {
      const roomId = nanoid();
      const ip =
        request.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown";

      const result = await roomCreateRateLimit.limit(ip);

      if (!result.success) {
        throw new RateLimitError(
          "You've reached the room creation limit.",
          result.remaining,
          result.reset
        );
      }

      await redis.hset(`meta:${roomId}`, {
        connected: [],
        createdAt: Date.now(),
      });

      await redis.expire(`meta:${roomId}`, ROOM_TTL_SECONDS);

      return { roomId };
    },
    {
      response: {
        200: z.object({
          roomId: z.string(),
        }),
        429: z.object({
          error: z.string(),
        }),
      },
    }
  )
  .use(authMiddleware)
  .get(
    "/ttl",
    async ({ auth }) => {
      const ttl = await redis.ttl(`meta:${auth.roomId}`);

      return { ttl: Math.max(ttl, 0) };
    },
    {
      query: z.object({ roomId: z.string() }),
      response: { 200: z.object({ ttl: z.number() }) },
    }
  );
