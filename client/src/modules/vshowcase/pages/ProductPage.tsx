interface ProductPageProps {
    data?: {
        name: string,
        description: string,
        price: number,
        stock: number,
    }
}
const ProductPage: React.FC<ProductPageProps> = ({ data }) => {
    console.log(data);
    return (
        <h1>Producto</h1>
    )
}
export default ProductPage