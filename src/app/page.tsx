"use client";

import Image from "next/image";
import Link from "next/link";

import { GitHub } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCreateRoom } from "@/features/room/hooks/use-create-room";

export default function Home() {
  const { mutate, isPending, error } = useCreateRoom();

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 relative">
      <header className="h-18 w-full max-w-full flex items-center justify-center bg-background z-50">
        <div className="w-full max-w-3xl self-stretch flex items-center justify-start px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Image
              className="transition-opacity hover:opacity-75 dark:invert"
              src="/whispr.svg"
              alt="Whispr logo"
              height={0}
              width={0}
              style={{ height: "auto", width: "100px" }}
              loading="eager"
              priority
            />
          </Link>

          <div className="flex gap-2 items-center justify-end ml-auto">
            <ThemeToggle className="ml-auto border-0" />

            <Button asChild variant="icon">
              <Link
                href="https://github.com/stephen-wm/whispr-chat#README"
                target="_blank"
                rel="noreferrer noopener"
                className="size-8 rounded-lg border border-input bg-background transition-all duration-150 hover:bg-secondary"
              >
                <GitHub className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex size-full items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2">
            <Image
              src="/icon.svg"
              alt="Whispr logomark"
              className="dark:invert"
              height={0}
              width={0}
              style={{ height: "auto", width: "30px" }}
            />
            <CardDescription className="font-medium">
              Anonymous, disappearing conversations — no accounts, no history.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  1
                </span>
                <span>Create a room and get a random anonymous identity</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  2
                </span>
                <span>Share the room link with one other person</span>
              </li>
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  3
                </span>
                <span>Talk freely — the room self-destructs in 10 minutes</span>
              </li>
            </ol>
          </CardContent>

          <CardFooter>
            <Button
              onClick={() => mutate()}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner /> Creating room...
                </div>
              ) : (
                "Create room"
              )}
            </Button>

            {error && (
              <p className="w-full text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                {error.message || "Failed to create room"}
              </p>
            )}
          </CardFooter>
        </Card>
      </main>

      <footer className="h-18 w-full max-w-full flex items-center justify-center bg-background">
        <div className="container max-w-3xl w-full self-stretch items-center justify-center flex">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {new Date().getFullYear()} Whispr Chat
          </p>
        </div>
      </footer>
    </div>
  );
}
