import { Elysia } from "elysia";
import { nanoid } from "nanoid";
import z from "zod";

import { realtime } from "@/lib/realtime";
import type { ChatMessage } from "@/lib/realtime";
import { redis } from "@/lib/redis";

import { authMiddleware } from "./auth";

type StoredMessage = ChatMessage & { token: string };

export const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ auth }) => {
      const { roomId } = auth;
      const roomExists = await redis.exists(`meta:${roomId}`);

      if (!roomExists) {
        throw new Error("Room does not exist.");
      }

      const raw = await redis.lrange<StoredMessage>(
        `messages: ${roomId}`,
        0,
        -1
      );

      // strip the auth token before this ever reaches the browser —
      // it's stored alongside the message but has no business leaving server.
      const history: ChatMessage[] = raw.map(
        ({ token: _token, ...message }) => message
      );

      return history;
    },
    {
      query: z.object({ roomId: z.string() }),
    }
  )
  .post(
    "/",
    async ({ body, auth }) => {
      const { text } = body;
      const { roomId, username } = auth;

      const roomExists = await redis.exists(`meta:${roomId}`);

      if (!roomExists) {
        throw new Error("Room does not exist.");
      }

      const message: ChatMessage = {
        id: nanoid(),
        roomId,
        sender: username,
        text,
        timestamp: Date.now(),
      };

      await redis.rpush(`messages:${roomId}`, {
        ...message,
        token: auth.token,
      });

      await realtime.channel(roomId).emit("chat.message", message);
    },
    {
      body: z.object({
        text: z.string().max(1000),
      }),
      query: z.object({ roomId: z.string() }),
    }
  );
