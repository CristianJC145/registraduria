import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
interface AppSwitchProps {
    label? : string;
    value: number;
    onChange: (value: number) => void;
}
const AppSwitch : React.FC<AppSwitchProps> = ({label, value, onChange}) => {
    console.log(value);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('click');
        const { checked } = event.target;
        const newValue = checked ? 1 : 0;
        onChange(newValue);
    };    

    return (
        <AppSwitchStyle>
            <div className="vs-form-switch">
                <input className='vs-check-input' checked={ value===1 } type="checkbox" onChange={ handleInputChange } />
                <span className="vs-slider"></span>
            </div>
            <label htmlFor="">{label}</label>
        </AppSwitchStyle>
    )
}
export default AppSwitch

const AppSwitchStyle = styled.div`
    .vs-form-switch {
        position: relative;
        display: inline-block;
        width: 38px;
        height: 24px;
    }  
    .vs-form-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .vs-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        border: 1px solid rgba(var(--color-gray-400-rgb), 0.2);
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;
    }
      
    .vs-slider:before {
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
    
    input:checked + .vs-slider {
        background-color: #2196F3;
    }
    
    input:focus + .vs-slider {
        box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .vs-slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`