import { Button } from "@/modules/share";

interface NormalProps {
  checkCorrectSentence: () => void;
}

export function Normal({ checkCorrectSentence }: NormalProps) {
  return (
    <div className="max-w-5xl w-full mx-auto flex justify-between items-center h-full">
      <div className="w-36">
        <Button variant="secondary">Skip</Button>
      </div>

      <div className="w-36">
        <Button onClick={checkCorrectSentence} variant="primary">
          Check
        </Button>
      </div>
    </div>
  );
}
