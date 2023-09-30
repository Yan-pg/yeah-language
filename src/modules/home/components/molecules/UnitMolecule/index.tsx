import data from "@/data/units.json";
import { ContentsUnitAtom } from "../../atoms/ContentsUnitAtom";
import { UnitTitleAtom } from "../../atoms/UnitTitleAtom";

interface UnitMoleculeProps {
  unit: (typeof data.content)[0];
}

export function UnitMolecule({ unit }: UnitMoleculeProps) {
  return (
    <button className=" w-full bg-units-green rounded-xl p-4 text-left flex flex-col">
      <UnitTitleAtom title={unit.title} />

      <ContentsUnitAtom contents={unit.contents} />
    </button>
  );
}
