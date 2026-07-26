import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 relative">
      <header className="h-18 w-full max-w-full flex items-center justify-center absolute top-0 inset-x-0">
        <div className="w-full max-w-3xl self-stretch flex items-center justify-start">
          <ThemeToggle className="ml-auto border-0" />
        </div>
      </header>

      <main className="flex-1 flex size-full items-center justify-center bg-background">
        <Link
          href="https://github.com/stephen-wm/whispr-chat#README"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            className="float-bounce transition-opacity duration-300 hover:opacity-75 dark:invert"
            src="/whispr.svg"
            alt="Whispr logo"
            height={0}
            width={0}
            style={{ height: "auto", width: "150px" }}
            loading="eager"
            priority
          />
        </Link>
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
