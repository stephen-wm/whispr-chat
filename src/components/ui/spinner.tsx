import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const Spinner = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <Loader2Icon
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
    role="status"
    data-slot="spinner"
    aria-label="Loading"
    className={cn("size-4 animate-spin", className)}
    {...props}
  />
);

export { Spinner };
