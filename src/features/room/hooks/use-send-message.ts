"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/lib/eden";

export const useSendMessage = (roomId: string) =>
  useMutation({
    mutationFn: async ({ text }: { text: string }) => {
      const { error } = await api.messages.post(
        { text },
        { query: { roomId } }
      );

      if (error) {
        if (error.status === 429) {
          throw new Error("You're sending messages too fast, slow down a bit");
        }
        throw error;
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
    },
  });
