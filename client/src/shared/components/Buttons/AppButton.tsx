import React from 'react';
import './AppButton.css';
import { ButtonProps } from './props.button';
import AppIcon from '../../components/AppIcon';
import { Link } from 'react-router-dom';

const AppButton: React.FC<ButtonProps> = ({ 
  ariaLabel,
  label, 
  outlined, 
  href,
  onClick, 
  variant, 
  target, 
  shadow, 
  icon, 
  to, 
  className,
  children, 
  subvariant
}) => {

  const baseClassName = "vs-btn";
  const variantClassName = `vs-btn--${variant ?? 'primary'}`;
  const outlinedClassName = outlined ? `vs-outlined--${variant ?? 'primary'}` : '';
  const shadowClassName =  shadow ? `vs-shadow--${shadow}` : '';
  const iconClassName = icon ? `vs-btn--icon` : '';
  const classNameCustom = className ? className : '';
  const classNames = [baseClassName, variantClassName, subvariant, outlinedClassName, shadowClassName, iconClassName, classNameCustom].filter(Boolean).join(' ');

  if (onClick && to) {
    return (
      <Link to={`${to}`} onClick={onClick} className={classNames}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </Link>
    )
  }

  if (href && onClick) {
    return (
      <a className={classNames} target={target} href={href} onClick={onClick} aria-label={ariaLabel}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <a className={classNames} target={target} href={href}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </a>
    );
  }
  
  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick} aria-label={ariaLabel}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={`${to}`} className={classNames}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </Link>
    );
  }


  return (
    <button type="submit" className={classNames} aria-label={ariaLabel}>
      {label}
      {icon && <AppIcon icon={icon}></AppIcon>}
      {children}
    </button>
  );
};
export default AppButton;