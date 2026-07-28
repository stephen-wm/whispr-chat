import { Elysia } from "elysia";

import { messages } from "@/features/room/server/messages";
import { rooms } from "@/features/room/server/rooms";

export const app = new Elysia({ prefix: "/api" }).use(rooms).use(messages);
export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
