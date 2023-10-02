import { VariantsConstant } from "../../constant/variants.constant";
import { ShadowsConstant } from "../../constant/shadows.const";

export interface ButtonProps {
    label?: string ;
    href? : string;
    to? : string;
    variant?: VariantsConstant;
    shadow?:ShadowsConstant;
    className?: string;
    target?: string;
    icon?: React.ReactNode;
    outlined?: boolean;
    onClick?: () => void;
    params?: any;
}