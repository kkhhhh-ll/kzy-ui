export type SwitchType = boolean | string | number;
export interface SwitchProps {
  modelValue: SwitchType;
  disabled?: boolean;
  activeText?: string;
  activeValue?: SwitchType;
  inactiveValue?: SwitchType;
  inactiveText?: string;
  name?: string;
  id?: string;
}

export interface SwitchEmits {
  (e: "update:modelValue", value: SwitchType): void;
  (e: "change", value: SwitchType): void;
}
