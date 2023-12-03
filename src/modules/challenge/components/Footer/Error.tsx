import { Button } from "@/modules/share";
import { XCircle } from "@phosphor-icons/react/dist/ssr";

interface ErrorProps {
  correctSolution: string;
  wrongSolution: string;
  handleNextSentence: () => void;
}

export function Error({
  correctSolution,
  wrongSolution,
  handleNextSentence,
}: ErrorProps) {
  return (
    <div className="max-w-5xl px-4 w-full mx-auto flex justify-between items-center h-full">
      <div className="flex items-center gap-3">
        <div className="text-red-dark">
          <XCircle size={80} weight="fill" />
        </div>

        <div className="flex flex-col  text-red-dark">
          <div>
            <span className="text-lg font-bold">Correct solution!</span>

            <div className="flex items-center gap-1">{correctSolution}</div>
          </div>
          <div>
            <span className="text-lg font-bold">Your answer!</span>

            <div className="flex items-center gap-1">{wrongSolution}</div>
          </div>
        </div>
      </div>

      <div className="w-36">
        <Button variant="error" onClick={handleNextSentence}>
          Continue
        </Button>
      </div>
    </div>
  );
}
