import { revertSlug, generateSlug } from "@/tools";
import units from "@/data/units.json";

interface ChallengePageProps {
  params: {
    slug: string;
  };
}

export default async function Challenge({ params }: ChallengePageProps) {
  const { slug } = params;

  // const unit = units.content.find((unit) => generateSlug(unit.title) === slug);

  // const response = await fetch("http://localhost:3000/api/generate-sentences", {
  //   method: "POST",
  //   body: JSON.stringify({ unit: unit?.contents }),
  // });

  // const sentences = await response.json();

  // return <div>{sentences.response.join("")}</div>;

  return <div>{slug}</div>;
}
