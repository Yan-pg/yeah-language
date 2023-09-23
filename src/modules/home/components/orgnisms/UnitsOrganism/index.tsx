import units from "@/data/units.json";
import { UnitMolecule } from "../../molecules/UnitMolecule";

export function UnitsOrganism() {
  return (
    <div>
      {units.content.map((unit) => (
        <UnitMolecule unit={unit} key={unit.id} />
      ))}
    </div>
  );
}
