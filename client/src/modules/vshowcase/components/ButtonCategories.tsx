import React, { useEffect  } from "react"
import '../css/ButtonCategories.css'
import AppIcon from "../../../shared/components/AppIcon"
import { useButtonContext } from "../../../shared/contexts/ButtonContext"

interface ButtonCategoriesProps {
    icon?: string,
    label: string,
    ariaLabel: string
}
const ButtonCategories: React.FC<ButtonCategoriesProps>= ({icon, label, ariaLabel})=>{
    const {selectedButton, setSelectedButton, defaultSelectedButton, setDefaultSelectedButton} = useButtonContext();

    useEffect(()=>{
        if(defaultSelectedButton === label) {
            setSelectedButton(label);
            setDefaultSelectedButton(null);
        }
    })

    const handleClick = () => {
        setSelectedButton(label);
        // Llamar a la función de filtro aquí con el parámetro de categoría
    };

    return (
        <div className={`vs-categories-btn ${selectedButton === label ? 'selected' : ''}`} onClick={handleClick}>
            <button className='vs-btn-action' aria-label={ariaLabel}>
                <AppIcon icon={icon}></AppIcon>
            </button>
            <span className="vs-btn-label">{label}</span>
        </div>
    )
}
export default ButtonCategories