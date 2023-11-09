import React from "react";
import AppCard from "../../../shared/components/AppCard/AppCard";
import ProductField from "./ProductField";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ImageUpload from '../components/ImageUpload'
import * as Yup from 'yup';

import '../css/ProductForm.css'
import AppButton from "../../../shared/components/Buttons/AppButton";

interface ProductFormProps {
    data?: string;
}

const initialValues = {
    productName: '',
    category: '',
    stock: 0,
    status: 'active',
    images: []
};

const validationSchema = Yup.object().shape({
    productName: Yup.string().required('El nombre del producto es obligatorio'),
    category: Yup.string().required('La categoría es obligatoria'),
    stock: Yup.number().required('El stock es obligatorio').min(0, 'El stock debe ser mayor o igual a 0'),
    status: Yup.string().required('El estado es obligatorio'),
    images: Yup.array()
        .max(5, 'No puedes subir más de 5 imágenes a la vez')
        .required('Debes subir al menos una imagen')
    });

const ProductForm : React.FC<ProductFormProps> = ({data}) =>{
    const dataProps = data ?? {} as any

    const handleSubmit = async (values : any) => {
       console.log(values);
    };  

    return (
        <Formik 
            className="vs-product-form"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <div>
                <h4 className="fw-bold mt-2">Crear Productos</h4>
                <Form className="d-flex flex-column gap-4 mt-4">
                    <AppCard
                        body= {
                            <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                <h6 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Imagenes del Producto</h6>
                                <ProductField
                                    title="Subir fotos" 
                                    tipDescription="Los formatos admitidos para las imagenes son .jpg .png .webp y un tamaño minimo de 250 x 250 pixeles. Seleccione o arrastre hasta 3 imagenes del producto y procure que sean imagenes llamativas para que resalte su producto." 
                                    required
                                >
                                <Field name="images" component={ImageUpload} />
                                </ProductField>
                                <ErrorMessage name="images" component="div" />
                            </div>
                        }
                    >
                    </AppCard>
                    
                    <AppCard
                        body= {
                            <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                <h6 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Información del Producto</h6>
                                <ProductField
                                    title="Nombre del Producto" 
                                    tipDescription="Incluya almenos 20 caracteres para que su producto sea mas descriptivo y facil de buscar, inlcuya información relevante del producto como su color, material o tipo" 
                                    required
                                >
                                    <Field type="text" className="form-control py-2" name='productName' placeholder="Nombre del Producto"/>
                                    <ErrorMessage name="productName" component="div" />
                                </ProductField>

                                <ProductField 
                                    title="Categoría" 
                                    tipDescription="Recuerda seleccionar la caterogia correspondiente al producto" 
                                    required
                                >
                                    <Field as="select" className="form-select py-2" id="product-category" name='category'>
                                        <option value="1">Categoria 1</option>
                                        <option value="2">Categoria 2</option>
                                        <option value="3">Categoria 3</option>
                                    </Field>
                                    <ErrorMessage name="category" component="div" />
                                </ProductField>
                            </div>
                        }
                    >
                    </AppCard>
                    <AppButton className="mt-3" label="Guardar"></AppButton>
                </Form>
            </div>
        </Formik>
    )
}
export default ProductForm;