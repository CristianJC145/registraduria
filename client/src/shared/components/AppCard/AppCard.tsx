import { ReactNode } from 'react'
import './AppCard.css'
interface AppCardProps {
    header?: ReactNode,   
    body?: ReactNode,
    footer?: ReactNode,
    children?: ReactNode;
    className?: string;
}
const AppCard: React.FC<AppCardProps>  = ({header, body, footer, children, className}) => {
    const classN = className ? `vs-card ${className}`: 'vs-card';
    const classNames = [classN].filter(Boolean).join(' ')
    return (
        <div className={classNames}>
            {header && <div className="vs-card__header">{header}</div>}
            {body && <div className="vs-card__body">{body}</div>}
            {footer && <div className="vs-card__footer">{footer}</div>}
            {children}
        </div>
    )
}
export default AppCard