import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { toast } from "react-toastify";

import AppCard from "../../../shared/components/AppCard/AppCard";
import ImageUpload from "../components/ImageUpload";
import ProductField from "./ProductField";
import AppButton from "../../../shared/components/Buttons/AppButton";
import AppSwitch from "../../../shared/components/AppSwitch";
import RichTextEditor from "./RichTextEditor";

import { GetAllCategoriesService } from "../services/getAllCategories.service";
import { GetSubCategoriesByIdService } from "../services/getSubCategoriesById.service";
import { GetConditionsService } from "../services/getConditions.service";
import { CategoriesDto } from "../dtos/product.dto";
import { TokenService } from "../../../shared/services/token.service";
import { GetSubCategoriesByProductService } from "../services/getSubcategoriesByProduct.service";
import { CreateOrUpdateProductService } from "../services/CreateOrUpdateProduct.service";

const createOrUpdateProduct = new CreateOrUpdateProductService();
const getAllCategoriesService = new GetAllCategoriesService();
const getSubCategoriesByIdService = new GetSubCategoriesByIdService();
const getConditionsService = new GetConditionsService();
const getSubCategoriesByProductService = new GetSubCategoriesByProductService();

const tokenSertice = new TokenService();

interface ProductFormProps {
  dataProduct?: {
    productData?: {
      id: number;
      images: [];
      state: number;
      stock: string;
      user_id: number;
      price: string;
      product_name: string;
      condition_id: string;
      category_id: number;
      description: string;
    };
    subcategoryData?: {
      subcategory_id: number[];
    };
  };
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre del producto es obligatorio"),
  productCategoryId: Yup.number().required("La categoría es obligatoria"),
  subcategoryId: Yup.array().required("Elige al menos una subcatería"),
  stock: Yup.number()
    .required("El stock es obligatorio")
    .min(0, "El stock debe ser mayor o igual a 0"),
  state: Yup.string().required("El estado es obligatorio"),
  conditionId: Yup.string().required(
    "La condición del producto es obligatorio"
  ),
  price: Yup.number().required("El precio es requerido"),
  images: Yup.array()
    .min(1, "Debes subir al menos una imagen")
    .max(5, "No puedes subir más de 5 imágenes a la vez")
    .test({
      name: "maxImages",
      message: "No puedes subir más de 5 imágenes a la vez",
      test: function (images) {
        return !images || images.length <= 5;
      },
    }),
});

const ProductForm: React.FC<ProductFormProps> = ({ dataProduct }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesDto[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [subcategoriesByProduct, setSubcategoriesByProduct] = useState<any[]>(
    []
  );
  const [conditions, setConditions] = useState<any[]>([]);
  const dataToken = tokenSertice.isAuthenticated();
  const UserId = dataToken.id;

  const initialValues = {
    id: dataProduct?.productData?.id ?? "",
    images: dataProduct?.productData?.images ?? [],
    name: dataProduct?.productData?.product_name ?? "",
    state: dataProduct?.productData?.state ?? 0,
    productCategoryId: dataProduct?.productData?.category_id ?? 1,
    subcategoryId: dataProduct?.subcategoryData ?? [],
    stock: dataProduct?.productData?.stock ?? "",
    price: dataProduct?.productData?.price ?? "",
    description: dataProduct?.productData?.description ?? "",
    conditionId: dataProduct?.productData?.condition_id ?? null,
    userId: UserId,
  };
  const fetchCategories = async () => {
    try {
      const result = await getAllCategoriesService.run();

      if (Object.keys(result).length > 0 && result !== undefined) {
        setCategories(result);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const fetchSubCategories = async (categoryId: number) => {
    try {
      const result = await getSubCategoriesByIdService.run(categoryId);
      setSubcategories(result);
    } catch (error) {}
  };

  const fetchSubcategoriesByProduct = async (productId: number) => {
    try {
      const result = await getSubCategoriesByProductService.run(productId);

      if (Object.keys(result).length > 0) {
        setSubcategoriesByProduct(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConditions = async () => {
    try {
      const conditions = await getConditionsService.run();
      setConditions(conditions);
    } catch (error) {}
  };

  const handleSubmit = async (data: any) => {
    const selectedSubcategories = data.subcategoryId.map(
      (subcategory: { value: any }) => subcategory.value
    );
    console.log(data);
    const dataSend = data?.id
      ? {
          id: data.id,
          data: {
            ...data,
            subcategoryId: selectedSubcategories,
          },
          isFormData: true,
        }
      : {
          data: {
            ...data,
            subcategoryId: selectedSubcategories,
          },
          isFormData: true,
        };

    try {
      await createOrUpdateProduct.run(dataSend);
      toast.success("¡Producto creado con éxito!");
      let url = "../products";
      navigate(url);
    } catch (e) {
      console.log(e);
    }
  };

  const GoBack = () => {
    let url = "../products";
    navigate(url);
  };
  useEffect(() => {
    fetchCategories();
    fetchConditions();
    if (initialValues.id) {
      fetchSubcategoriesByProduct(initialValues.id as number);
    }
  }, []);
  return (
    <ProductFormStyle>
      <div className="vs-product-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <div>
              <h4 className="fw-bold mt-2">{`${
                dataProduct?.productData ? "Editar" : "Crear"
              } Producto`}</h4>
              <Form className="d-flex flex-column gap-4 mt-4">
                <AppCard
                  body={
                    <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                      <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                        Imagenes del Producto
                      </h5>
                      <ProductField
                        title="Subir Imagenes"
                        required
                      >
                        <Field name="images">
                          {({ field }: any) => (
                            <ImageUpload
                              images={field.value}
                              onRemoveImage={(index: number) => {
                                const newImages = [...field.value];
                                newImages.splice(index, 1);
                                setFieldValue(field.name, newImages);
                              }}
                              onAddImages={(newImages: File[]) => {
                                setFieldValue("images", newImages);
                              }}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          className="vs-errorMensage"
                          name="images"
                          component="div"
                        />
                      </ProductField>
                    </div>
                  }
                ></AppCard>

                <AppCard
                  body={
                    <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                      <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                        Información del Producto
                      </h5>
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-4">
                        <div className="col-12 col-sm-6 pe-3">
                          <ProductField
                            title="Bien ID"
                            required
                          >
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="name"
                              placeholder="Bien ID"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="name"
                              component="div"
                            />
                          </ProductField>

                          <ProductField
                            title="Tipo de elemendo ID"
                            required
                          >
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="name"
                              placeholder="Tipo de elemendo ID"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="name"
                              component="div"
                            />
                          </ProductField>
                          <ProductField
                            title="Material"
                            required
                          >
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="name"
                              placeholder="Material"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="name"
                              component="div"
                            />
                          </ProductField>
                        </div>
                        <div className="col-12 col-sm-6 pe-4">
                          <ProductField title="Color" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="price"
                              placeholder="Color"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="price"
                              component="div"
                            />
                          </ProductField>
                          <ProductField title="Marca/Modelo" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="price"
                              placeholder="Marca/Modelo"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="price"
                              component="div"
                            />
                          </ProductField>
                          <ProductField title="Serial" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="price"
                              placeholder="Serial"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="price"
                              component="div"
                            />
                          </ProductField>
                        </div>
                      </div>
                    </div>
                  }
                ></AppCard>
                <AppCard
                  body={
                    <div className="border p-4 rounded-3 border border-secondary border-opacity-10">
                      <h5 className="fw-bold border-bottom border-secondary border-opacity-10 pb-3 mb-0">
                        Gestion del Producto
                      </h5>
                      <ProductField
                        title="Estado del producto"
                        required
                      >
                        <Field name="state">
                          {({ field, form }: any) => (
                            <div className="d-flex gap-3 align-items-center">
                              <AppSwitch
                                value={field.value ? 1 : 0}
                                onChange={(value: number) =>
                                  form.setFieldValue("state", value)
                                }
                              />
                            </div>
                          )}
                        </Field>
                        <ErrorMessage
                          className="vs-errorMensage"
                          name="state"
                          component="div"
                        />
                      </ProductField>

                      <ProductField title="Stock del Producto" required>
                        <Field
                          type="text"
                          className="form-control py-2"
                          name="stock"
                          placeholder="Ingrese Stock del Producto"
                        />
                        <ErrorMessage
                          className="vs-errorMensage"
                          name="stock"
                          component="div"
                        />
                      </ProductField>

                      <ProductField title="Precio del Producto" required>
                        <Field
                          type="text"
                          className="form-control py-2"
                          name="price"
                          placeholder="Ingrese precio del Producto"
                        />
                        <ErrorMessage
                          className="vs-errorMensage"
                          name="price"
                          component="div"
                        />
                      </ProductField>
                    </div>
                  }
                ></AppCard>
                
                <div className="d-flex flex-column flex-sm-row gap-sm-3 justify-content-sm-end">
                  <AppButton
                    className="mt-3 px-5"
                    variant="dark"
                    outlined
                    label="Cancelar"
                    onClick={() => GoBack()}
                  ></AppButton>
                  <AppButton className="mt-3 px-5" label="Guardar"></AppButton>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </ProductFormStyle>
  );
};
export default ProductForm;

const ProductFormStyle = styled.div`

  .vs-errorMensage {
    padding: var(--p-4) 0;
    color: red;
  }
  @media (min-width: 768px) {
    .vs-product-form {
      width: 700px;
    }
  }
`;
