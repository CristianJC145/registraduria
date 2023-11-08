import React from "react";

interface ProductFormProps {
    data?: string;
}

const ProductForm : React.FC<ProductFormProps> = ({data}) =>{
    const dataProps = data
    return (
        <h2>Add a new product</h2>
    )
}
export default ProductForm;