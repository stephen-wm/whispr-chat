import { Elysia } from "elysia";

import { redis } from "@/lib/redis";

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const authMiddleware = new Elysia({ name: "Auth" })
  .error({ AuthError })
  .onError(({ code, set }) => {
    if (code === "AuthError") {
      set.status = 401;

      return { error: "Unauthorized" };
    }
  })
  .derive({ as: "scoped" }, async ({ query, cookie }) => {
    const { roomId } = query;
    const token = cookie["x-auth-token"]?.value as string | undefined;

    if (!roomId || !token) {
      throw new AuthError("Missing room ID or token.");
    }

    const connected = await redis.hget<
      { token: string; username: string; animal: string }[]
    >(`meta:${roomId}`, "connected");

    const existing = connected?.find((user) => user.token === token);

    if (!existing) {
      throw new AuthError("Invalid token");
    }

    return { auth: { connected, roomId, ...existing } };
  });
