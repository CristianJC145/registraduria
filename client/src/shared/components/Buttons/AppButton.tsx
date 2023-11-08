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
  subvariant,
  disabled
}) => {

  const baseClassName = "vs-btn";
  const variantClassName = `vs-btn--${variant ?? 'primary'}`;
  const outlinedClassName = outlined ? `vs-outlined--${variant ?? 'primary'}` : '';
  const shadowClassName =  shadow ? `vs-shadow--${shadow}` : '';
  const iconClassName = icon && label || children ? `vs-btn--labelIcon` : icon ? 'vs-btn--icon' : '';
  const classNameCustom = className ? className : '';
  const classNames = [baseClassName, variantClassName, subvariant, outlinedClassName, shadowClassName, iconClassName, classNameCustom].filter(Boolean).join(' ');

  if (onClick && to) {
    return (
      <Link to={`${to}`} onClick={onClick} className={classNames}>
        {icon && <AppIcon icon={icon}></AppIcon>}
        {label}
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
        {icon && <AppIcon icon={icon}></AppIcon>}
        {label}
        {children}
      </a>
    );
  }
  
  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
        {label}
        {icon && <AppIcon icon={icon}></AppIcon>}
        {children}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={`${to}`} className={classNames}>
        {icon && <AppIcon icon={icon}></AppIcon>}
        {label}
        {children}
      </Link>
    );
  }


  return (
    <button type="submit" className={classNames} aria-label={ariaLabel} disabled={disabled}>
      {label}
      {icon && <AppIcon icon={icon}></AppIcon>}
      {children}
    </button>
  );
};
export default AppButton;