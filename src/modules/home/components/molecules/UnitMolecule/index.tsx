import data from "@/data/units.json";

console.log();

interface UnitMoleculeProps {
  unit: (typeof data.content)[0];
}

export function UnitMolecule({ unit }: UnitMoleculeProps) {
  return <div key={unit.id}>{unit.title}</div>;
}
