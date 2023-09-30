import { generateSlug } from "@/tools";
import Link from "next/link";

interface UnitTitleAtomProps {
  title: string;
}

export function UnitTitleAtom({ title }: UnitTitleAtomProps) {
  return (
    <Link
      href={`/challenge/${generateSlug(title)}`}
      className="text-green-900 font-bold"
    >
      {title}
    </Link>
  );
}
