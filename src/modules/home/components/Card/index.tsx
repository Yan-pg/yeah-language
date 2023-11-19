import { generateSlug } from "@/tools";
import Link from "next/link";
import { Unit } from "../../models";

interface CardProps {
  unit: Unit;
}

export function Card({ unit }: CardProps) {
  return (
    <button
      key={unit.id}
      className=" w-full bg-units-green rounded-xl p-4 text-left flex flex-col"
    >
      <Link
        href={`/challenge/${generateSlug(unit.title)}`}
        className="text-green-900 font-bold"
      >
        {unit.title}
      </Link>
      <div className="text-left line-clamp-2 text-gray-300">
        <span className="break-all text-gray-700">
          {unit.contents.join(", ")}
        </span>
      </div>
    </button>
  );
}
