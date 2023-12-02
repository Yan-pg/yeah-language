"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { ReactNode } from "react";
import { VariantProps, tv } from "tailwind-variants";

const tag = tv({
  slots: {
    container: [
      "w-fit rounded-2xl border-2 shadow-button-secondary",
      "border-gray-primary",
      "py-[0.88rem] px-[1.2rem] outline-1",
    ],
  },

  variants: {
    hasShadow: {
      false: {
        container: "shadow-none",
      },
    },
    selected: {
      true: {
        container:
          "bg-gray-primary text-gray-primary shadow-none pointer-events-none",
      },
    },
    isBlue: {
      true: {
        container: "bg-blue-primary text-white rounded-3xl shadow-tag-blue",
      },
    },
  },

  defaultVariants: {
    hasShadow: true,
    selected: false,
  },
});

interface TagProps extends VariantProps<typeof tag> {
  children: ReactNode;
  asChild?: boolean;
  handleClick?: () => void;
}

export function Tag({
  children,
  asChild,
  hasShadow,
  selected,
  isBlue,
  handleClick,
}: TagProps) {
  const Component = asChild ? Slot : "button";

  const { container } = tag({ hasShadow, selected, isBlue });

  return (
    <Component className={container()} onClick={handleClick}>
      <Slottable>{children}</Slottable>
    </Component>
  );
}
