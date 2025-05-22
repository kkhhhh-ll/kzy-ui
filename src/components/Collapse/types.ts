import type { Ref, InjectionKey } from "vue";

export type NameTypes = string | number;
export interface CollapseProps {
  modelValue: NameTypes[]; // 绑定值
  according?: boolean; // 是否手风琴模式
}
export interface CollapseItemProps {
  name: NameTypes;
  title?: string;
  disabled?: boolean;
}

export interface CollapseEmits {
  (e: "update:modelValue", values: NameTypes[]): void; // 绑定值
  (e: "change", values: NameTypes[]): void; // 绑定值
}
export interface CollapseContext {
  activeNames: Ref<NameTypes[]>;
  handleClick: (name: NameTypes) => void;
}
export const CollapseContextKey: InjectionKey<CollapseContext> =
  Symbol("CollapseContext");
