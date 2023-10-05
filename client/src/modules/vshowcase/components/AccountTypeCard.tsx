import React, { ReactNode } from 'react';
import AppButton from '../../../shared/components/Buttons/AppButton';
import '../css/AccountSelectionPage.css'

interface AccountTypeCardProps {
    imageSrc: string;
    title: string;
    description: string;
    children?: ReactNode;
  }

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({ imageSrc, title, description, children}) => {
  return (
    <div className="account-type-card">
      <img className="vs-card-img" src={imageSrc} alt="Referencia" />
      <h2 className='vs-card-title'>{title}</h2>
      <p className="vs-card-info">{description}</p>
      {children}
    </div>
  );
};

export default AccountTypeCard;