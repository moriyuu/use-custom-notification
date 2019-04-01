import { genId } from "./utils";

export type Notification = {
  id: string;
  type: "normal" | "success" | "error";
  children: React.ReactNode;
  timeout: number; // ms
};

/**
 * Generate default Notification
 * At the same time, generate it's ID.
 */
export const getDefaultNotification: () => Notification = () => ({
  id: genId(),
  type: "success",
  children: "",
  timeout: 5000
});

export type NotificationStatus = "ready" | "showing" | "died";
