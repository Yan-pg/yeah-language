import { generateSlug } from "@/tools";
import Link from "next/link";
import { Unit } from "../../models";
import { tv } from "tailwind-variants";

interface CardProps {
  unit: Unit;
  disabled: boolean;
}

const card = tv({
  slots: {
    container: [
      "w-full bg-green-100 border border-green-900",
      "rounded-xl p-4 text-left flex flex-col cursor-pointer",
    ],
    title: ["text-green-900 font-bold"],
    subTitle: ["break-all text-gray-700"],
  },

  variants: {
    disabled: {
      true: {
        container: ["bg-gray-100 border border-gray-900 cursor-not-allowed"],
        title: ["text-gray-900"],
        subTitle: ["text-gray-700"],
      },
    },
  },
});

export function Card({ unit, disabled }: CardProps) {
  const { container, subTitle, title } = card({ disabled });

  return (
    <>
      {!disabled ? (
        <Link
          href={`/challenge/${generateSlug(unit.title)}`}
          className={container()}
        >
          <span className={title()}>{unit.title}</span>
          <div className="text-left line-clamp-2 text-gray-300">
            <span className={subTitle()}>{unit.contents.join(", ")}</span>
          </div>
        </Link>
      ) : (
        <div className={container()}>
          <span className="text-green-900 font-bold">{unit.title}</span>
          <div className="text-left line-clamp-2 text-gray-300">
            <span className="break-all text-gray-700">
              {unit.contents.join(", ")}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
