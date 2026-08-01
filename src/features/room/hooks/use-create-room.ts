"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/eden";

export const useCreateRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await api.room.create.post();

      if (error) {
        if (error.status === 429) {
          throw new Error(error.value.error);
        }

        throw error;
      }

      return data.roomId;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create room.");
    },
    onSuccess: (roomId) => {
      router.push(`/room/${roomId}`);
    },
  });
};
