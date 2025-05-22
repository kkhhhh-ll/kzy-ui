import type { Placement, Options } from "@popperjs/core";
export interface TooltipProps {
  content?: string; // 提示内容
  placement?: Placement; // 提示位置
  trigger?: "hover" | "click"; // 触发方式
  manual?: boolean; // 是否手动控制
  popperOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
}
export interface TooltipEmits {
  (e: "visible-change", visible: boolean): void; // 显示状态改变
}

export interface TooltipInstance {
  show: () => void; // 显示提示
  hide: () => void; // 隐藏提示
}
