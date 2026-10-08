import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { Arrow } from "./Arrow";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "ink" | "ghost-ink";

type Props = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  children: ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  cursor?: string;
};

const variantClass: Record<Variant, string> = {
  solid: "btn btn--solid",
  outline: "btn",
  ink: "btn btn--ink",
  "ghost-ink": "btn btn--ghost-ink",
};

/** Custom-made CTA: fill sweeps up, arrow exits right and re-enters from the left. */
export default function Button({
  children,
  variant = "outline",
  magnetic = false,
  cursor,
  className = "",
  ...rest
}: Props) {
  const link = (
    <a className={`${variantClass[variant]} ${className}`} data-cursor={cursor} {...rest}>
      <span className="btn-label">{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </a>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
