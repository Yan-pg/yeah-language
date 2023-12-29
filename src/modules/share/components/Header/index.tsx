import { Power } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { LogOutButton } from "./LogOutOutButton";

interface HeaderProps {
  userName: string;
  img: string;
}

export function Header({ img, userName }: HeaderProps) {
  return (
    <header className="border-b border-gray">
      <div className="max-w-5xl p-1 m-auto flex justify-between items-center">
        <Link
          href="/challenges"
          className="text-xl font-bold text-green-primary"
        >
          Yeah.Language
        </Link>
        <div className="flex gap-4 items-center">
          <span className="text-purple-primary">{userName}</span>
          <Link href="/offensive">
            <Image
              src={img}
              width={20}
              height={20}
              alt="avatar"
              className="rounded-full"
            />
          </Link>
          <LogOutButton />
        </div>
      </div>
    </header>
  );
}
