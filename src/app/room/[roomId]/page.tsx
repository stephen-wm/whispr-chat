"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useRoomMessages } from "@/features/room/hooks/use-room-messages";
import { useSendMessage } from "@/features/room/hooks/use-send-message";
import type { ChatMessage } from "@/lib/realtime";
import { cn } from "@/lib/utils";

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match?.split("=")[1];
};

const groupMessages = (messages: ChatMessage[]) =>
  messages.map((message, index) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];

    return {
      ...message,
      isFirstInGroup: !prev || prev.sender !== message.sender,
      isLastInGroup: !next || next.sender !== message.sender,
    };
  });

export default function ChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [username, setUsername] = useState(() => getCookie("username") ?? "");

  void setUsername;

  const { messages, isLoading, error } = useRoomMessages(roomId);
  const { mutate: sendMessage, isPending } = useSendMessage(roomId);

  const [draft, setDraft] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      behavior: "smooth",
      top: scrollRef.current.scrollHeight,
    });
  }, [messages.length]);

  const handleSend = () => {
    const text = draft.trim();

    if (!text) {
      return;
    }

    sendMessage({ text });
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const grouped = groupMessages(messages);

  return (
    <div className="h-dvh flex flex-col items-start bg-background relative">
      {/* Header */}
      <header className="h-18 w-full max-w-full flex items-center justify-center bg-transparent absolute top-0 inset-x-0 z-50 backdrop-blur-lg">
        <div className="w-full max-w-3xl flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Image
              src="/icon.svg"
              alt="Whispr logomark"
              className="dark:invert"
              height={0}
              width={0}
              style={{ height: "auto", width: "30px" }}
            />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="border border-border px-2 py-1 text-xs text-muted-foreground rounded-md bg-zinc-50 dark:bg-zinc-800 h-8 flex items-center justify-center gap-2">
              Room: <span className="font-mono">{roomId}</span>
            </div>
            <ThemeToggle className="border-0" />
          </div>
        </div>
      </header>

      {/* Chat Window */}
      <div
        ref={scrollRef}
        className="flex-1 flex justify-center overflow-y-auto pt-20 self-stretch"
      >
        <div className="mx-auto w-full h-full flex-1 max-w-3xl px-4 sm:px-6 lg:px-8 pt-3 pb-12">
          {(() => {
            let content: React.ReactNode;

            if (isLoading) {
              content = (
                <p className="pt-10 text-center text-sm text-muted-foreground">
                  Loading messages…
                </p>
              );
            } else if (error) {
              content = (
                <p className="pt-10 text-center text-sm text-red-500">
                  Couldn&apos;t load this room.
                </p>
              );
            } else {
              content = grouped.map((message) => {
                const isOwn = message.sender === username;
                return (
                  <div
                    key={message.id}
                    className={cn(
                      `flex ${isOwn ? "justify-end" : "justify-start"} ${
                        message.isFirstInGroup ? "mt-3" : "mt-1"
                      }`
                    )}
                  >
                    <div
                      className={`flex w-fit max-w-[70%] flex-col ${isOwn ? "items-end" : "items-start"}`}
                    >
                      {message.isFirstInGroup && !isOwn && (
                        <span className="mb-1 px-3 text-xs font-medium text-muted-foreground">
                          {message.sender}
                        </span>
                      )}
                      <div
                        className={[
                          "rounded-2xl px-3.5 py-2 text-[15px] leading-snug",
                          isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground",
                          isOwn && message.isLastInGroup
                            ? "rounded-br-md mb-4"
                            : "",
                          !isOwn && message.isLastInGroup
                            ? "rounded-bl-md mb-4"
                            : "",
                        ].join(" ")}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                );
              });
            }

            return content;
          })()}
        </div>
      </div>

      <div className="border-t p-3 w-full max-w-full">
        <div className="mx-auto flex w-full max-w-2xl items-end gap-2">
          <Textarea
            autoFocus
            placeholder="Message the room"
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none"
          />
          <Button onClick={handleSend} disabled={!draft.trim() || isPending}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
