import units from "@/data/units.json";
import { generateSlug } from "@/tools";
import { ChallengeTemplate } from "@/modules/challenge/templete";

interface ChallengePageProps {
  params: {
    slug: string;
  };
}

export default async function Challenge({ params }: ChallengePageProps) {
  const { slug } = params;

  const unit = units.content.find((unit) => generateSlug(unit.title) === slug);

  const response = await fetch(`${process.env.API_HOST}/generate-sentences`, {
    method: "POST",
    body: JSON.stringify({ unit: unit?.contents }),
  });

  const sentences = await response.json();

  return <ChallengeTemplate sentences={sentences.response} />;
}
