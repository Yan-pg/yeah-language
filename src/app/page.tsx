import { HomeTemplate } from "@/modules/home/templates";
import units from "@/data/units.json";

export default function HomePage() {
  return <HomeTemplate units={units.content} />;
}
