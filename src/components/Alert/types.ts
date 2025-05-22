export interface AlertProps {
  content?: string;
  type?: "primary" | "success" | "warning" | "danger";
  showIcon?: boolean;
  effect?: "light" | "dark";
}
export interface AlertEvent {
  (e: "close"): void;
}
export interface AlertInstance {
  close(): void;
}
