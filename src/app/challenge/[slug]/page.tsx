import { ProgressBar } from "@/modules/challenge/components/ProgressBar";
import { Button } from "@/modules/share";
import units from "@/data/units.json";
import { generateSlug } from "@/tools";
import { ChallengeSentence } from "@/modules/challenge/components/ChallengeSentence";
import { Chat } from "@/modules/challenge/models";

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

  return (
    <div className="min-h-full w-full mx-auto mt-10 h-screen">
      <div className="max-w-5xl flex-1 mx-auto w-full">
        <ProgressBar progress={50} />
      </div>

      <div className="max-w-5xl mx-auto mt-36">
        <ChallengeSentence chat={sentences.response} />
      </div>

      <div className="border-t-2 h-32 fixed bottom-0 right-0 left-0">
        <div className="max-w-5xl w-full mx-auto flex justify-between items-center h-full">
          <div className="w-36">
            <Button variant="secondary">Skip</Button>
          </div>

          <div className="w-36">
            <Button variant="primary">Check</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
