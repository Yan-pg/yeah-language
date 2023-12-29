import { HomeTemplate } from "@/modules/home/templates";
import units from "@/data/units.json";

export default function Challenges() {
  return <HomeTemplate units={units.content} />;
}
