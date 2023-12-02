import { Button } from "@/modules/share";
import { XCircle } from "@phosphor-icons/react/dist/ssr";

interface ErrorProps {
  correctSolution: string;
}

export function Error({ correctSolution }: ErrorProps) {
  return (
    <div className="max-w-5xl w-full mx-auto flex justify-between items-center h-full">
      <div className="flex items-center gap-3">
        <div className="text-red-dark">
          <XCircle size={80} weight="fill" />
        </div>

        <div className="flex flex-col gap-4 text-red-dark">
          <span className="text-2xl">Correct solution!</span>

          <div className="flex items-center gap-1">{correctSolution}</div>
        </div>
      </div>

      <div className="w-36">
        <Button variant="error">Continue</Button>
      </div>
    </div>
  );
}
