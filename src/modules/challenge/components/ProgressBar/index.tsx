import { tv } from "tailwind-variants";

interface ProgressBarProps {
  progress: number;
}

const progressStyle = tv({
  slots: {
    container: "relative bg-gray-primary w-full h-[1.1rem] rounded-lg",
    progressBar: [
      "absolute h-[1.1rem] bg-green-primary w-full rounded-lg",
      "transition-all duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]",
    ],
  },
});

export function ProgressBar({ progress }: ProgressBarProps) {
  const { container, progressBar } = progressStyle();

  return (
    <div className={container()} style={{ transform: "translateZ(0)" }}>
      <div className={progressBar()} style={{ width: `${progress}%` }}></div>
    </div>
  );
}
