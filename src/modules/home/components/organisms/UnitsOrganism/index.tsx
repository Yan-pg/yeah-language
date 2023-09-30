import units from "@/data/units.json";
import { UnitMolecule } from "../../molecules/UnitMolecule";

export function UnitsOrganism() {
  return (
    <section className="gap-4 space-y-5 my-10">
      {units.content.map((unit) => (
        <UnitMolecule unit={unit} key={unit.id} />
      ))}
    </section>
  );
}
