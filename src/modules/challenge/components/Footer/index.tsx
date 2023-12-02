import { Button } from "@/modules/share";
import { Success } from "./Success";
import { ReactNode } from "react";
import { Normal } from "./Normal";
import { tv } from "tailwind-variants";
import { Error } from "./Error";

export enum FooterVariant {
  NORMAL = "normal",
  ERROR = "error",
  SUCCESS = "success",
}

interface FooterProps {
  variant: FooterVariant;
  children: ReactNode;
}

const footer = tv({
  base: "border-t-2 h-32 fixed bottom-0 right-0 left-0",

  variants: {
    variant: {
      normal: "bg-white",
      error: "bg-red-light",
      success: "bg-success",
    },
  },

  defaultVariants: {
    variant: "normal",
  },
});

export function Footer({ children, variant }: FooterProps) {
  return <div className={footer({ variant })}>{children}</div>;
}

Footer.Success = Success;
Footer.Normal = Normal;
Footer.Error = Error;
