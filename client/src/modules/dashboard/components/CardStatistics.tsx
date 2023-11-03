import React from "react"
import AppIcon from "../../../shared/components/AppIcon"
import '../css/CardStatistics.css'

interface CardStatisticProps {
    label : string,
    value : number | string,
    icon : string,
}
const CardStatistic : React.FC<CardStatisticProps> = ({label, value, icon}) =>{
    return (
        <div className="vs-card-statistic">
            <div className="d-flex align-center justify-content-between">
                <span className="vs-statistic-label">{label}</span>
                <AppIcon className="vs-statistic-icon" icon={icon}></AppIcon>
            </div>
            <h3 className="vs-statistic-value">{value}</h3>
        </div>
    )
}
export default CardStatistic