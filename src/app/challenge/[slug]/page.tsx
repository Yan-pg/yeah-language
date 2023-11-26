import { Button } from "@/modules/share";
import { ProgressBar } from "@/modules/share/components/ProgressBar";
import { Tag } from "@/modules/share/components/Tag";

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

  return (
    <div>
      <ProgressBar progress={10} />

      <div className="max-w-xs">
        <Button variant="primary" disabled>
          CHECK
        </Button>

        <Tag>I</Tag>
      </div>
    </div>
  );
}
