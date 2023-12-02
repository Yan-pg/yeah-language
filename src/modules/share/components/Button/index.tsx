import { ButtonHTMLAttributes } from "react";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "w-full h-11 text-sm transition-all rounded-2xl",

  variants: {
    variant: {
      primary: [
        "bg-green-secondary/90 text-white hover:bg-green-dark focus:bg-green-dark",
        "shadow-button-primary font-bold active:animate-pulse-click",
      ],
      secondary: [
        "bg-transparent shadow-button-secondary",
        "border-2 border-gray-primary ",
        "text-gray-secondary font-bold text-sm",
        "active:animate-pulse-click",
      ],
      error: [
        "bg-error-button text-white hover:bg-red-dark focus:bg-red-dark",
        "shadow-button-error font-bold active:animate-pulse-click",
      ],
    },
    disabled: {
      true: [
        "bg-gray-primary text-gray-secondary hover:bg-gray-primary",
        "shadow-none cursor-not-allowed",
      ],
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ variant, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={button({ variant, disabled })}
    />
  );
}
