"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode, MouseEventHandler } from "react";

const spring = { type: "spring" as const, stiffness: 420, damping: 18 };

type BtnVariants = VariantProps<typeof buttonVariants>;

interface MotionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BtnVariants {
  href?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export function MotionButton({ children, href, className, variant, size, type, onClick, ...rest }: MotionButtonProps) {
  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={spring}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.div
      style={{ display: "inline-block" }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={spring}
    >
      <Button
        type={type as "button" | "submit" | "reset" | undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        {...(rest as object)}
      >
        {children}
      </Button>
    </motion.div>
  );
}
