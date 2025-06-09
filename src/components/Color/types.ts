export interface ColorEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}
export interface ColorProps {
  modelValue?: string;
  disabled?: boolean;
  value?: string;
  name?: string;
  id?: string;
}
