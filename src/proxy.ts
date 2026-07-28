import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { redis } from "@/lib/redis";

const ANIMALS = ["wolf", "hawk", "bear", "shark"];

export const proxy = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  // oxlint-disable-next-line prefer-named-capture-group
  const roomMatch = pathname.match(/^\/room\/([^/]+)$/u);

  if (!roomMatch) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const roomId = roomMatch?.[1];

  if (!roomId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const meta = await redis.hgetall<{
    connected: { token: string; username: string; animal: string }[];
    createdAt: number;
  }>(`meta:${roomId}`);

  if (!meta) {
    return NextResponse.redirect(new URL("/?error=ROOM_NOT_FOUND", req.url));
  }

  const existingToken = req.cookies.get("x-auth-token")?.value;
  const existingEntry = meta.connected.find(
    (entry) => entry.token === existingToken
  );

  // Allow user to join room
  if (existingEntry) {
    const response = NextResponse.next();

    response.cookies.set("username", existingEntry.username, {
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  }

  // User is not allowed to join room
  if (meta.connected.length >= 2) {
    return NextResponse.redirect(new URL("/?error=ROOM_IS_FULL", req.url));
  }

  const takenAnimals = new Set(meta.connected.map((entry) => entry.animal));
  const animal = ANIMALS.find((candidate) => !takenAnimals.has(candidate));

  if (!animal) {
    throw new Error(
      "No animal available — capacity check should have prevented this"
    );
  }

  const username = `anonymous_${animal}_${nanoid(5)}`;
  const token = nanoid();

  const response = NextResponse.next();

  response.cookies.set("x-auth-token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set("username", username, {
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, { animal, token, username }],
  });

  return response;
};

export const config = {
  matcher: "/room/:path*",
};
