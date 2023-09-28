import React from 'react';
import './AppButton.css';
import { ButtonProps } from './props.button';
import AppIcon from '../../components/AppIcon';


const AppButton: React.FC<ButtonProps> = ({ label, outlined, type, href, onClick, variant, target, shadow, icon, className }) => {
  if (!variant) {
    variant = 'primary';
  }
  const baseClassName = "vs-btn";
  const variantClassName = `vs-btn--${variant}`;
  const outlinedClassName = outlined ? `vs-outlined--${variant}` : '';
  const shadowClassName =  shadow ? `vs-shadow--${shadow}` : '';
  const iconClassName = icon ? `vs-btn--icon` : '';
  const classNameCustom = className ? className : '';
  const classNames = [baseClassName, variantClassName, outlinedClassName, shadowClassName, iconClassName, classNameCustom].filter(Boolean).join(' ');
  

  if (type === 'button') {
    return ( 
      <button 
        className={classNames}
        onClick={onClick}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
      </button>
    );

  } else if (type === 'link') {
    return <a className={classNames} target={target} href={href}>{label}</a>;
  } else {
    return null;
  }
};
export default AppButton;



