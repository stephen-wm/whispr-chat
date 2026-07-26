import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-50">
      <div className="grid place-items-center">
        <Link
          href="https://github.com/stephen-wm/whispr-chat#README"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            className="float-bounce transition-opacity duration-300 hover:opacity-75"
            src="/whispr.svg"
            alt="Whispr logo"
            height={0}
            width={0}
            style={{ height: "auto", width: "150px" }}
            loading="eager"
            priority
          />
        </Link>
      </div>
    </div>
  );
}
