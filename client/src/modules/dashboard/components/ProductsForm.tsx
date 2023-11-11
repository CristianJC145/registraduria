import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

import AppCard from "../../../shared/components/AppCard/AppCard";
import ImageUpload from '../components/ImageUpload'
import ProductField from "./ProductField";
import AppButton from "../../../shared/components/Buttons/AppButton";
import AppSwitch from "../../../shared/components/AppSwitch";


interface ProductFormProps {
    data?: {
        id: number;
        productName: string;
        category: string;
        stock: number;
        status: number;
        images: File[];
    };
}

const validationSchema = Yup.object().shape({
    productName: Yup.string().required('El nombre del producto es obligatorio'),
    category: Yup.string().required('La categoría es obligatoria'),
    stock: Yup.number().required('El stock es obligatorio').min(0, 'El stock debe ser mayor o igual a 0'),
    status: Yup.string().required('El estado es obligatorio'),
    images: Yup.array()
        .min(1, 'Debes subir al menos una imagen')
        .max(5, 'No puedes subir más de 5 imágenes a la vez')
        .test({ 
            name: 'maxImages',
            message: 'No puedes subir más de 5 imágenes a la vez',
            test: function(images) {
                return !images || images.length <= 5;
            }
        })
        .test({
            name: 'fileType',
            message: 'Solo se admiten archivos con las extensiones .jpg, .png y .webp',
            test: (files) => {
              if (!files) return true;
      
              const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
      
              return files.every((file) => {
                const extension = (file.name || '').split('.').pop().toLowerCase();
                return allowedExtensions.includes(extension);
            });
        },
    })
});

const ProductForm : React.FC<ProductFormProps> = ({ data }) =>{

    const [switchValue, setSwitchValue] = useState(0);
    const handleSwitchChange = (value: number) => {
        console.log('click');
        setSwitchValue(value);
    };
    console.log(switchValue);
    const initialValues = {
        id : data?.id,
        productName: data?.productName || '',
        status: data?.status || 0,
        category: data?.category || '',
        stock: data?.category ||'',
        images: data?.images || [],
    };

    const handleSubmit = async (values : any )=> {
       console.log(values);
       handleGoBack();
    };  

    const handleGoBack = () => {
        // Puedes implementar la lógica para volver a la página anterior
        console.log('Volver');
    };

    return (
        <ProductFormStyle>
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
                                        tipDescription="Los formatos admitidos para las imagenes son .jpg .png .webp y un tamaño minimo de 250 x 250 pixeles. Seleccione o arrastre hasta 5 imagenes del producto y procure que sean imagenes llamativas para que resalte su producto." 
                                        required
                                    >
                                    <Field name="images" component={ImageUpload} />
                                    <ErrorMessage className="vs-errorMensage" name="images" component="div" />
                                    </ProductField>
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
                                        <ErrorMessage className="vs-errorMensage" name="productName" component="div" />
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
                                        <ErrorMessage className="vs-errorMensage" name="category" component="div" />
                                    </ProductField>
                                </div>
                            }
                        >
                        </AppCard>
                        <AppCard
                            body= {
                                <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                    <h6 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Gestion del Producto</h6>
                                    <ProductField
                                        title="Estado del producto" 
                                        tipDescription="Si el producto está activo, los compradores puedes encontrar tu producto facilmente" 
                                        required
                                    >
                                        <Field name="status">
                                              
                                                
                                        </Field>
                                        <ErrorMessage className="vs-errorMensage" name="status" component="div" />
                                    </ProductField>

                                    <ProductField 
                                        title="Stock del Producto"
                                        required
                                    >
                                        <Field type="text" className="form-control py-2" name='stock' placeholder="Ingrese Stock del Producto"/>
                                        <ErrorMessage className="vs-errorMensage" name="stock" component="div" />
                                    </ProductField>
                                </div>
                            }
                        >
                        </AppCard>
                        <div className="d-flex gap-3 justify-content-end">
                            <AppButton className="mt-3" variant="dark" outlined label="Cancelar" onClick={() => handleGoBack()}></AppButton>
                            <AppButton className="mt-3" outlined label="Guardar y Añadir Nuevo"></AppButton>
                            <AppButton className="mt-3" label="Guardar"></AppButton>
                        </div>
                    </Form>
                </div>
            </Formik>
            <AppSwitch
                value={switchValue} onChange={handleSwitchChange}
            />
        </ProductFormStyle>
    )
}
export default ProductForm;

const ProductFormStyle = styled.div`
.vs-errorMensage {
    padding: var(--p-4) 0;
    color: red;
}
`