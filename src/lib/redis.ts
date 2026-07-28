import { Redis } from "@upstash/redis";

const upstashRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRestToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!upstashRestUrl) {
  throw new Error(`Cannot find 'UPSTASH_REDIS_REST_URL' environment variable.`);
}

if (!upstashRestToken) {
  throw new Error(`Cannot find 'UPSTASH_REDIS_REST_URL' environment variable.`);
}

export const redis = new Redis({
  token: upstashRestToken,
  url: upstashRestUrl,
});

// const data = await redis.get("key");
// console.log(data);
