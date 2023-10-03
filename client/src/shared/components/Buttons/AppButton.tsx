import React from 'react';
import './AppButton.css';
import { ButtonProps } from './props.button';
import AppIcon from '../../components/AppIcon';
import { Link } from 'react-router-dom';

const AppButton: React.FC<ButtonProps> = ({ 
  label, 
  outlined, 
  href,
  onClick, 
  variant, 
  target, 
  shadow, 
  icon, 
  to, 
  className 
}) => {

  const baseClassName = "vs-btn";
  const variantClassName = `vs-btn--${variant ?? 'primary'}`;
  const outlinedClassName = outlined ? `vs-outlined--${variant}` : '';
  const shadowClassName =  shadow ? `vs-shadow--${shadow}` : '';
  const iconClassName = icon ? `vs-btn--icon` : '';
  const classNameCustom = className ? className : '';
  const classNames = [baseClassName, variantClassName, outlinedClassName, shadowClassName, iconClassName, classNameCustom].filter(Boolean).join(' ');
  
  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={`${to}`} className={classNames}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classNames} target={target} href={href}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
      </a>
    );
  }

  return (
    <button type="submit" className={classNames}>
      {label}
      {icon && <AppIcon icon={icon}></AppIcon>}
    </button>
  );
};
export default AppButton;