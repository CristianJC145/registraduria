import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import Select from "react-select";

import AppCard from "../../../shared/components/AppCard/AppCard";
import ImageUpload from '../components/ImageUpload'
import ProductField from "./ProductField";
import AppButton from "../../../shared/components/Buttons/AppButton";
import AppSwitch from "../../../shared/components/AppSwitch";
import RichTextEditor from "./RichTextEditor";

import { CreateOrUpdateProductService } from '../services/createOrUpdateProduct.service'
import { GetAllCategoriesService } from '../services/getAllCategories.service'
import { CategoriesDto } from "../dtos/product.dto";


const createOrUpdateProduct = new CreateOrUpdateProductService();
const getAllCategoriesService = new GetAllCategoriesService();

interface ProductFormProps {
    dataProduct?: {
        id: number;
        images: File[];
        name: string;
        product_category_id: string;
        subCategory: string;
        stock: number;
        price : number;
        state: number;
        description: string;
        condition_id: number;
    };
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre del producto es obligatorio'),
    product_category_id: Yup.string().required('La categoría es obligatoria'),
    // subCategory: Yup.string().required('Elige al menos una subcatería'),
    stock: Yup.number().required('El stock es obligatorio').min(0, 'El stock debe ser mayor o igual a 0'),
    state: Yup.string().required('El estado es obligatorio'),
    condition_id: Yup.mixed().required('La condición del producto es obligatorio'),
    price : Yup.number().required('El precio es requerido'),
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

const ProductForm : React.FC<ProductFormProps> = ({ dataProduct }) =>{
    const options = [
        { value: "producto 1", label:"producto 1" },
        { value: "producto 2", label:"producto 2" },
        { value: "producto 3", label:"producto 3" },
    ]
    const initialValues = {
        id : dataProduct?.id ,
        images: dataProduct?.images ?? '',
        name: dataProduct?.name ?? '',
        state: dataProduct?.state || 0,
        subCategory: dataProduct?.subCategory ?? '',
        stock: dataProduct?.stock ?? '',
        price : dataProduct?.price ?? '',
        description : dataProduct?.description ?? '',
        condition_id: dataProduct?.condition_id ?? '',
        condition: dataProduct?.condition_id || 1,
    };

    const [categories, setCategories] = useState<CategoriesDto[]>([]);
    const [productConditions, setproductConditions] = useState([]);

    const fethData = async () => {
        try {
            const result = await getAllCategoriesService.run();
            setCategories(result);
            console.log("categorias", result)
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }
    useEffect(() =>{
        fethData();
    }, []);

    const handleSubmit = async (data : any)=> {
        const dataSend =data?.id ? {
            id: data.id,
            data,
            isFormData: true
        } : 
        {
            data,
            isFormData: true
        }

        try {
            await createOrUpdateProduct.run(dataSend);     
            handleGoBack(); 
        } catch (e) {
            console.log(e)
        }
    };

    const handleGoBack = () => {
        // Volver a la página anterior
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
                                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Imagenes del Producto</h5>
                                    <ProductField
                                        title="Subir Imagenes"
                                        tipDescription="Los formatos admitidos para las imagenes son .jpg .png .webp y un tamaño minimo de 250 x 250 pixeles. Seleccione o arrastre hasta 5 imagenes del producto y procure que sean imagenes llamativas para que resalte su producto."
                                        required
                                    >
                                    <Field name="images" component={ ImageUpload } />
                                    <ErrorMessage className="vs-errorMensage" name="images" component="div" />
                                    </ProductField>
                                </div>
                            }
                        >
                        </AppCard>

                        <AppCard
                            body= {
                                <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Información del Producto</h5>
                                    <ProductField
                                        title="Nombre del Producto"
                                        tipDescription="Incluya almenos 20 caracteres para que su producto sea mas descriptivo y facil de buscar, inlcuya información relevante del producto como su color, material o tipo"
                                        required
                                    >
                                        <Field type="text" className="form-control py-2" name='name' placeholder="Nombre del Producto"/>
                                        <ErrorMessage className="vs-errorMensage" name="name" component="div" />
                                    </ProductField>

                                    <ProductField
                                        title="Categoría"
                                        tipDescription="Recuerda seleccionar la caterogia correspondiente al producto"
                                        required
                                    >
                                        <Field as="select" className="form-select py-2" id="product-category" name='product_category_id'>
                                            <option value="">Seleccione una Categoria</option>
                                            {categories.map((category) => {
                                                return <option key={category.id} value={category.id}>{category.name}</option>
                                            })}
                                        </Field>
                                        <ErrorMessage className="vs-errorMensage" name="product_category_id" component="div" />
                                    </ProductField>
                                    <ProductField
                                        title="Subcategoria"
                                        tipDescription=" Selecciona la subcategoría que mejor describe tu producto. La subcategoría proporciona detalles adicionales y ayuda a los compradores a encontrar tu producto más fácilmente. Asegúrate de elegir la subcategoría más relevante para garantizar una clasificación precisa en la plataforma."
                                        required
                                    >
                                        <Field className=" py-2" id="product-subCategory" name='subCategory'>
                                            {({ field } : any) =>(
                                                <Select 
                                                    className="form-select" 
                                                    isMulti 
                                                    options={options}
                                                    value={field.value}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage className="vs-errorMensage" name="subCategory" component="div" />
                                    </ProductField>
                                </div>
                            }
                        >
                        </AppCard>
                        <AppCard
                            body= {
                                <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Gestion del Producto</h5>
                                    <ProductField
                                        title="Estado del producto"
                                        tipDescription="Si el producto está activo, los compradores puedes encontrar tu producto facilmente"
                                        required
                                    >
                                        <Field name="state">
                                            {({ field, form }: any) => (
                                                <div className="d-flex gap-3 align-items-center">
                                                    <AppSwitch
                                                        value={field.value ? 1 : 0}
                                                        onChange={(value: number) => form.setFieldValue('state', value)}
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <ErrorMessage className="vs-errorMensage" name="state" component="div" />
                                    </ProductField>

                                    <ProductField
                                        title="Stock del Producto"
                                        required
                                    >
                                        <Field type="text" className="form-control py-2" name='stock' placeholder="Ingrese Stock del Producto"/>
                                        <ErrorMessage className="vs-errorMensage" name="stock" component="div" />
                                    </ProductField>

                                    <ProductField
                                        title="Precio del Producto"
                                        required
                                    >
                                        <Field type="text" className="form-control py-2" name='price' placeholder="Ingrese precio del Producto"/>
                                        <ErrorMessage className="vs-errorMensage" name="price" component="div" />
                                    </ProductField>
                                </div>
                            }
                        >
                        </AppCard>
                        <AppCard
                            body= {
                                <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                                    <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">Detalles del Producto</h5>
                                    <ProductField
                                        title="Condición del Producto"
                                        required
                                    >
                                        <Field
                                            as="select"
                                            name="condition_id"
                                            className="form-select"
                                        >
                                            <option value="" disabled>Seleccione una condición</option>
                                                <option value="1">Nuevo</option>
                                                <option value="2">Usado</option>
                                                <option value="3">Reacondicionado</option>
                                        </Field>

                                        <ErrorMessage className="vs-errorMensage" name="condition_id" component="div" />
                                    </ProductField>

                                    <ProductField
                                        title="Descripción del Producto"
                                        tipDescription="Ingresa una descripción detallada de tu producto. Proporciona información relevante, como características, usos, materiales y cualquier detalle que pueda ser útil para los compradores."
                                    >
                                        <Field name="description" component={RichTextEditor}>
                                        </Field>
                                        <ErrorMessage className="vs-errorMensage" name="description" component="div" />
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