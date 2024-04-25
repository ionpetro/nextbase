import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase",

  {
    variants: {
      variant: {
        draft:
          "border-muted bg-transparent text-muted-foreground hover:bg-muted/80 border-2",
        pending_approval:
          "text-purple-500 border-purple-500 border-2",
        approved:
          "text-blue-500 border-blue-500 border-2",
        completed: "text-green-500 border-green-500 border-2",
      },
      size: {
        default: "px-4 py-0.5 ",
        sm: "h-8 rounded-lg",
        lg: "h-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "draft",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function ProjectBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { ProjectBadge, badgeVariants };
