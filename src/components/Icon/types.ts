import type { FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";
export type IconType = "primary" | "danger" | "success" | "warning";
export type IconProps = FontAwesomeIconProps & {
  type?: IconType;
  color?: string;
};
