"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { api } from "@/lib/eden";

const RESYNC_INTERVAL_MS = 30_000;

export const useRoomTtl = (roomId: string) => {
  // Periodically re-fetch the real value from Redis so a throttled
  // background tab (which pauses setInterval) can't drift silently —
  // this is the correction, not the primary countdown mechanism.
  const { data: ttlSeconds } = useQuery({
    queryFn: async () => {
      const { data: response, error } = await api.room.ttl.get({
        query: { roomId },
      });

      if (error) {
        throw error;
      }

      return response.ttl;
    },
    queryKey: ["room-ttl", roomId],
    refetchInterval: RESYNC_INTERVAL_MS,
  });

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Every time we get a fresh value from the server (initial load or
  // a resync), snap the displayed value to it.
  useEffect(() => {
    if (typeof ttlSeconds === "number") {
      // oxlint-disable-next-line react/react-compiler
      setSecondsLeft(ttlSeconds);
    }
  }, [ttlSeconds]);

  // The actual second-by-second countdown, independent of fetches.
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => (prev === null ? prev : Math.max(prev - 1, 0)));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return secondsLeft;
};
