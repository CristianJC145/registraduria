import React from 'react';
import styled from 'styled-components';
import { SizeConstant } from '../../constant/size.constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  size?: SizeConstant;
}

const AppModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, subtitle, size }) => {
  if (!isOpen) return null;
  return (
    <AppModalStyle>
        <div className="modal-overlay">
        <div className={size ? `modal-container ${size}` : 'modal-container'}>
          <div className='modal-header'>
            <div className='header-title'>{title}</div>
            <small className='header-subtitle'>
              {subtitle}
            </small>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-content">
              {children}
          </div>
        </div>
        </div>
    </AppModalStyle>
  );
};

export default AppModal;

const AppModalStyle = styled.div`
  .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  }
  .modal-container {
    background: #fff;
    max-width: 400px;
    max-height: 600px;
    border-radius: 16px;
    margin: 1rem;
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #a7a7a7;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-button {
    background: rgba(0, 0, 0, 0);
  }
  .modal-container.md {
    max-width: 850px;
  }
  .modal-content {
      position: relative;
      padding: 1rem 2rem;
  }

  .modal-close {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.5rem;
      top: 3px;
      right: 0;
      width: 25px;
      height: 25px;
      font-size: 1.5rem;
      color: var(--color-dark);      
      border: none;
      background-color: unset;
      cursor: pointer;
  }
  .modal-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    border-bottom: 1px solid rgba(var(--color-gray-300-rgb), .2);
    padding: 1rem 2rem;
  }
  .header-title {
    font-weight: 700;
    font-size: 16px;
    width: 100%;
    color: var(--color-dark);
  }

  @media (min-width: 768px) {
    .modal-container {
      max-width: 1500px;
    }
  }
`