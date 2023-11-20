import { useEffect, useState } from "react";
import ProductForm from "../components/ProductsForm"
import { GetProductByIdService } from "../services/getProductById.service";
import { useParams } from "react-router-dom";
import { services } from "../../../shared/constant/services";

const getProductByIdService = new GetProductByIdService();
interface EditProductPageState {
    productData?: {
        id: number;
        images: [];
        state: number;
        stock: string;
        user_id: number;
        price: string;
        name: string;
        condition_id: string;
        category_id: number;
        description: string;
    };
    subcategoryData?: {
        subcategory_id: number[];
    };
}

const EditProductPage = () => {

    const [productById, setproductById] = useState<EditProductPageState>({})

    const { id } : any  = useParams<{ id : string }>();
    const fetchProduct = async () => {
        try {
            let idProduct = parseInt(id, 10)

            const { productData,  subcategoryData} = await getProductByIdService.run(idProduct);
            
            const updateProductData = productData.map((prod : any) => ({
                ...prod,
                images: prod.images.split(',').map((image: string) => `${services.api_url}/${image}`),
            }));

            const dataSend : EditProductPageState = { 
                productData : updateProductData[0],
                subcategoryData: subcategoryData.map((item: { subcategory_id: any }) => item.subcategory_id),
            }

            setproductById(dataSend);
            console.log(dataSend.subcategoryData);
            
        } catch (error) {
            
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [])
    return (
        <>
            {Object.keys(productById).length > 0 && (
                 <ProductForm dataProduct={productById}></ProductForm>
            )}
        </>
    )
}  
export default EditProductPage;