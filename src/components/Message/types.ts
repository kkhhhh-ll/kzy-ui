import type { ComponentInternalInstance, VNode } from "vue";

export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: "success" | "primary" | "warning" | "danger";
  onDestroy: () => void;
  offset?: number;
  id: string;
  zIndex: number;
}

export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  destroy: () => void;
}

export type CreateMessageProps = Omit<
  MessageProps,
  "onDestroy" | "id" | "zIndex"
>;
