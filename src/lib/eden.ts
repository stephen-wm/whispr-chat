import { treaty } from "@elysia/eden";

import type { App as ElysiaApplication } from "@/app/api/[[...slugs]]/route";

const origin =
  typeof window === "undefined"
    ? "http://localhost:3000"
    : window.location.origin;

export const { api } = treaty<ElysiaApplication>(origin);
