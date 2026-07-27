"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "@/lib/eden";

export const useCreateRoom = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await api.room.create.post();

      if (response.status !== 200) {
        throw new Error("Failed to create room");
      }

      const roomId = response.data?.roomId;

      if (!roomId) {
        throw new Error("Room ID was not returned");
      }

      return roomId;
    },

    onSuccess: (roomId) => {
      router.push(`/room/${roomId}`);
    },
  });
};
