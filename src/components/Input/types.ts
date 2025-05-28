export interface InputProps {
  type?: string;
  modelValue?: string;
  disabled?: boolean;
  clearable?: boolean;
  placeholder?: string;
  showPassword?: boolean;
}

export interface InputEmits {
  (e: "update:modelValue", value: string | undefined): void;
  (e: "input", value: string | undefined): void;
  (e: "change", value: string | undefined): void;
  (e: "clear"): void;
  (e: "focus", value: FocusEvent): void;
  (e: "blur", value: FocusEvent): void;
}
export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement; // 按钮实例
}
