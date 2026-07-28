"use client";

import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/eden";

export const useSendMessage = (roomId: string) =>
  useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      const { error } = await api.messages.post(
        { text },
        { query: { roomId } }
      );

      if (error) {
        throw error;
      }
    },
  });
