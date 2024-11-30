import React from "react"
import AppIcon from "../../../shared/components/AppIcon"
import styled from "styled-components"
interface CardOptionsProps {
    title : string,
    subtitle : string,
    color: string,
    icon : string,
    onClick : ()=> void
}
const CardOptions : React.FC<CardOptionsProps> = ({title, subtitle, icon, color, onClick}) =>{
    return (
        <CardOptionsStyle>
            <div className="vs-card-options" onClick = {onClick}>
                <div className="vs-options-icon" style={{backgroundColor: `${color}`}}>
                    <AppIcon className="vs-icon-box" icon={icon}></AppIcon>
                </div>
                <div className="vs-options-text">
                    <h5 className="vs-text-title">{title}</h5>
                    <small className="vs-text-subtitle">{subtitle}</small>
                </div>
            </div>
        </CardOptionsStyle>
    )
}
export default CardOptions

const CardOptionsStyle = styled.div`
    .vs-card-options {
        display: flex;
        gap: 0.5rem;
        padding: var(--p-6);
        background-color: #fff;
        border-radius: 16px;
        box-shadow: 1px 9px 20px rgba(0, 0, 0, 0.05);
        border: 2px solid rgba(var(--color-gray-300-rgb), 0.1);
    }
    .vs-card-options:hover{
        zoom: 105%;
        cursor: pointer;
    }
    .vs-options-label {
        color: var(--color-gray-800);
        font-size: 16px;
        margin-bottom: 1rem;    
    }
    .vs-options-value {
        font-weight: bold;
        color: var(--color-gray-800);
        margin-bottom: 0;
    }
    .vs-options-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 6px;
    }
    .vs-icon-box {
        color: #fff;
        font-size: 17px;
    }
    .vs-options-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .vs-text-title {
        font-weight: bold;
        margin-bottom: 0;
    }

    @media (min-width: 992px) {
        .vs-options-icon {
            font-size: 22px;
        }
        .vs-options-label {
            font-size: 18px
        }
    }
`