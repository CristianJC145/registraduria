import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
interface AppSwitchProps {
    label? : string;
    value: number;
    onChange: (value: number) => void;
}
const AppSwitch : React.FC<AppSwitchProps> = ({ label, value, onChange }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked ? 1 : 0;
        onChange(newValue);
    };    

    return (
        <AppSwitchStyle>
            <div className="vs-form-switch">
                <input className="vs-switch-input"checked={ value===1 } type="checkbox" onChange={ handleInputChange } />
                <label htmlFor="">{label}</label>
                <label>{value === 1 ? 'Activo' : 'Desactivo'}</label>
            </div>
        </AppSwitchStyle>
    )
}
export default AppSwitch

const AppSwitchStyle = styled.div`
    .vs-form-switch {
        display: flex;
        align-items: center;
        position: relative;
        gap: .5rem;
    }  
    .vs-form-switch input {
        position: relative;
        width: 38px;
        height: 24px;
    }
    [type=checkbox] {
        -webkit-appearance: none;
        appearance: none;
        border: 1px solid rgba(var(--color-gray-300-rgb), .3);
        border-radius: 999px;
    }
    .vs-switch-input::after {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }
      
    .vs-switch-input::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 1px;
        top: 0px;
        bottom: 0px;
        margin-top: auto;
        margin-bottom: auto;
        background-color: white;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, .5);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
    
    input:checked {
        background-color: var(--color-primary);
        border: 1px solid var(--color-primary);
    }
    
    input:focus{
        box-shadow: 0 0 1px 4px rgba(var(--color-primary-rgb), 0.5);
        border: 1px solid var(--color-primary);
    }
    
    input:checked:before {
        -webkit-transform: translateX(15px);
        -ms-transform: translateX(15px);
        transform: translateX(15px);
    }
`