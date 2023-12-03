import { Button } from "@/modules/share";
import { CheckFat, Flag } from "@phosphor-icons/react/dist/ssr";

interface SuccessProps {
  handleNextSentence: () => void;
}

export function Success({ handleNextSentence }: SuccessProps) {
  return (
    <div className="max-w-5xl px-4 w-full mx-auto flex justify-between items-center h-full">
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-green-secondary">
          <CheckFat size={32} weight="fill" />
        </div>

        <div className="flex flex-col gap-4 text-green-primary">
          <span className="text-2xl">Excellent!</span>

          <div className="flex items-center gap-1">
            <Flag size={20} weight="bold" />
            REPORT
          </div>
        </div>
      </div>

      <div className="w-36">
        <Button onClick={handleNextSentence}>Continue</Button>
      </div>
    </div>
  );
}
