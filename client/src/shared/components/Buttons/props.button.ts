import { VariantsConstant } from "../../constant/variants.constant";
import { ShadowsConstant } from "../../constant/shadows.const";

export interface ButtonProps {
    label?: string ;
    href? : string;
    variant?: VariantsConstant;
    shadow?:ShadowsConstant;
    type?: 'button' | 'submit' | 'reset' | 'link';
    className?: string;
    target?: string;
    icon?: React.ReactNode;
    outlined?: boolean;
    onClick?: () => void;
}