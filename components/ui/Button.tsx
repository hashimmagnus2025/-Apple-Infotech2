import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { Arrow } from "./Arrow";

type Props = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  children: ReactNode;
  variant?: "solid" | "outline";
  cursor?: string;
};

/** Editorial CTA: hairline square, fill wipes up, arrow exits right and re-enters left. */
export default function Button({ children, variant = "outline", cursor, className = "", ...rest }: Props) {
  return (
    <a className={`btn ${variant === "solid" ? "btn--solid" : ""} ${className}`} data-cursor={cursor} {...rest}>
      <span>{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </a>
  );
}
