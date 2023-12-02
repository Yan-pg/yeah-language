import { ProgressBar } from "@/modules/challenge/components/ProgressBar";
import { Button } from "@/modules/share";
import units from "@/data/units.json";
import { generateSlug } from "@/tools";
import { ChallengeSentence } from "@/modules/challenge/components/ChallengeSentence";
import { ChallengeTemplate } from "@/modules/challenge/templete";

interface ChallengePageProps {
  params: {
    slug: string;
  };
}

export default async function Challenge({ params }: ChallengePageProps) {
  const { slug } = params;

  const unit = units.content.find((unit) => generateSlug(unit.title) === slug);

  const response = await fetch("http://localhost:3000/api/generate-sentences", {
    method: "POST",
    body: JSON.stringify({ unit: unit?.contents }),
  });

  const sentences = await response.json();

  return <ChallengeTemplate sentences={sentences.response} />;
}
