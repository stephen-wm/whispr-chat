"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function RoomPage() {
  const { roomId } = useParams();

  return (
    <div className="flex-1 flex flex-col items-start">
      {/* Header */}
      <header className="h-18 w-full max-w-full flex items-center justify-center bg-background absolute top-0 inset-x-0 z-50">
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

          <ThemeToggle className="ml-auto border-0" />
        </div>
      </header>

      {/* Chat Window */}
      <main className="flex-1 flex items-center justify-center self-stretch py-20">
        {roomId}
      </main>
    </div>
  );
}
