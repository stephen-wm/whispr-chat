import { Ratelimit } from "@upstash/ratelimit";

import { redis } from "./redis";

export const messageRateLimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "ratelimit:messages",
  redis,
});

export const roomCreateRateLimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "ratelimit:room-create",
  redis,
});
