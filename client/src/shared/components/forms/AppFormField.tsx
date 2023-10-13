import React, { ChangeEventHandler, useState } from "react"

import './css/AppFormField.css'
interface FromFieldProps {
    label?: string;
    name: string;
    value: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    errorMessage?: string | null;
}
const AppFormField: React.FC<FromFieldProps> = ({label, name, value, type, onChange, errorMessage}) =>{
    const classNameInput = `vs-form-input${errorMessage ? ' error' : ''}`;
    return (
        <div className='vs-form-field'>
            <label htmlFor={name} className='vs-form-label'>{label}</label>
            <input className={classNameInput} type={type} name={name} id={name} value={value} onChange={onChange} required />
            {errorMessage && (
                <div className="vs-form-error-message">
                    {errorMessage}
                </div>
             )}
        </div>
    )
}
export default AppFormField