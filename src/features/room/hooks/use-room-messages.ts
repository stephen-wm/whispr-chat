"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { api } from "@/lib/eden";
import type { ChatMessage } from "@/lib/realtime";
import { useRealtime } from "@/lib/realtime/client";

export const useRoomMessages = (roomId: string) => {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery({
    queryFn: async () => {
      const { data, error: queryError } = await api.messages.get({
        query: { roomId },
      });

      if (queryError) {
        throw queryError;
      }

      if (!Array.isArray(data)) {
        throw new TypeError("Unexpected response shape from /messages");
      }

      return data;
    },
    queryKey: ["messages", roomId],
    retry: 1,
  });

  const [realtimeMessages, setRealtimeMessages] = useState<ChatMessage[]>([]);

  const messages = useMemo(() => {
    const merged = [...(history ?? []), ...realtimeMessages];
    const uniqueMessages = new Map<string, ChatMessage>();

    for (const message of merged) {
      if (!uniqueMessages.has(message.id)) {
        uniqueMessages.set(message.id, message);
      }
    }

    return [...uniqueMessages.values()].toSorted(
      (a, b) => a.timestamp - b.timestamp
    );
  }, [history, realtimeMessages]);

  const channels = useMemo(() => [roomId], [roomId]);
  const events = useMemo(() => ["chat.message"] as const, []);

  useRealtime({
    channels,
    events,
    onData: ({ data }) => {
      setRealtimeMessages((prev) =>
        prev.some((message) => message.id === data.id) ? prev : [...prev, data]
      );
    },
  });

  return { error, isLoading, messages };
};
