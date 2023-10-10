import React, { ChangeEventHandler } from "react"

import './css/AppFormField.css'
interface FromFieldProps {
    label?: string;
    name: string;
    value: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}
const AppFormField: React.FC<FromFieldProps> = ({label, name, value, type, onChange}) =>{
    return (
        <div className='vs-form-field'>
            <label htmlFor={name} className='vs-form-label'>{label}</label>
            <input className='vs-form-input' type={type} name={name} id={name} value={value} onChange={onChange} required />
        </div>
    )
}
export default AppFormField