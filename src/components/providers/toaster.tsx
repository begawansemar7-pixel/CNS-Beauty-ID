"use client";

import { Toaster } from "sonner";

/** Toast host (Legion interactive discipline). Mounted once in the root layout. */
export function ToasterHost() {
  return <Toaster position="top-right" richColors />;
}
