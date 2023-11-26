import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <div className="w-fit rounded-2xl border-2 border-gray-primary shadow-button-secondary py-[0.88rem] px-[1.2rem]">
      <span>{children}</span>
    </div>
  );
}
