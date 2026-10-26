import { toast } from "sonner";

/** Acknowledge-style feedback for user actions (Legion interactive discipline). */
export function notify(message: string) {
  toast(message);
}
