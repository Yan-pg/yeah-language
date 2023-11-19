import { Card } from "../../components";
import { Unit } from "../../models";

interface HomeTemplateProps {
  units: Unit[];
}

export function HomeTemplate({ units }: HomeTemplateProps) {
  return (
    <main className="max-w-5xl p-1 m-auto">
      <section className="gap-4 space-y-5 my-10">
        {units.map((unit) => (
          <Card key={unit.id} unit={unit} />
        ))}
      </section>
    </main>
  );
}
