import { ReactNode } from 'react'
import './AppCard.css'
interface AppCardProps {
    header?: ReactNode,   
    body?: ReactNode,
    footer?: ReactNode,
    children?: ReactNode;
}
const AppCard: React.FC<AppCardProps>  = ({header, body, footer, children}) => {
    return (
        <div className="vs-card">
            {header && <div className="vs-card__header">{header}</div>}
            {body && <div className="vs-card__body">{body}</div>}
            {footer && <div className="vs-card__footer">{footer}</div>}
            {children}
        </div>
    )
}
export default AppCard