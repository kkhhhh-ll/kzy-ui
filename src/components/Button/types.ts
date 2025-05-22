// 单个配置
export type ButtonType =
  | "default"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info";
export type ButtonSize = "medium" | "large" | "small";
export type ButtonHTMLType = "button" | "submit" | "reset";
export interface ButtonInstance {
  ref: HTMLButtonElement; // 按钮实例
}
export interface ButtonProps {
  type?: ButtonType; // 按钮类型
  size?: ButtonSize; // 按钮大小
  plain?: boolean; // 是否朴素按钮
  round?: boolean; // 是否圆形按钮
  circle?: boolean; // 是否圆形按钮
  disabled?: boolean; // 是否禁用按钮
  ButtonHTMLType?: ButtonHTMLType; // 按钮类型
  autofocus?: boolean; // 是否自动获取焦点
  loading?: boolean; // 是否加载中
  icon?: string; // 图标
}
