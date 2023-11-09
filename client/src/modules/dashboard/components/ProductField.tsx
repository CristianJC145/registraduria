import { ReactNode } from "react";
import '../css/ProductField.css'


interface ProductFieldProps {
    title: string;
    required?: boolean;
    tipDescription? : string;
    children : ReactNode,
}

const ProductField : React.FC<ProductFieldProps> = ({title, required, tipDescription, children}) => {
    return (
        <div className="d-flex flex-column flex-xl-row mt-3">
            <div className="col-12 col-xl-4">
                <div className="d-flex gap-2 align-items-center mb-3">
                    <h6 className="fw-bold mb-0">{title}</h6>
                    {required && (
                        <span className="badge bg-secondary rounded-3">Requerido</span>
                    )}
                </div>
                <div className="">
                    {tipDescription && (
                        <p className="vs-text-tip pe-lg-5">{tipDescription}</p>
                    )}
                </div>
            </div>
            <div className="col-12 col-xl-8">
                {children}
            </div>
        </div>
    )
}
export default ProductField