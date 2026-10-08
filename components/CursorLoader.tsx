"use client";

import dynamic from "next/dynamic";

/** Cursor is desktop-only decoration — keep it out of the critical bundle. */
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export default function CursorLoader() {
  return <Cursor />;
}
