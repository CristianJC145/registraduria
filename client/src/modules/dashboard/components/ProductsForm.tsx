import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Select from "react-select";
import { toast } from "react-toastify";

import AppCard from "../../../shared/components/AppCard/AppCard";
import ImageUpload from "../components/ImageUpload";
import ProductField from "./ProductField";
import AppButton from "../../../shared/components/Buttons/AppButton";

import { TokenService } from "../../../shared/services/token.service";
import { CreateOrUpdateProductService } from "../services/CreateOrUpdateElement.service";
import { GetAllElementTypesService } from "../services/getAllElementType.service";

const createOrUpdateProduct = new CreateOrUpdateProductService();
const getAllElementTypes = new GetAllElementTypesService()
const tokenSertice = new TokenService();

interface ProductFormProps {
  onClose : () => void,
  onSave: ()=> void,
  dataElement?: any,
}

const validationSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "Debes subir al menos una imagen")
    .max(5, "No puedes subir más de 5 imágenes a la vez")
    .test({
      name: "maxImages",
      message: "No puedes subir más de 5 imágenes a la vez",
      test: function (images) {
        return !images || images.length <= 5;
      },
    }
  ),
  elementName: Yup.string().required("El nombre del producto es obligatorio"),
  idElementType: Yup.number().required("Este campo es obligatorio"),
  material: Yup.string().required("El material del elemento es requerido"),
  color: Yup.string().required("El color es requerido"),
  model: Yup.string().required("Este campo es obligatorio"),
  serial: Yup.string().required("Este campo es obligatorio"),
  idCondition: Yup.number().required("La condicion es obligatoria"),
  dateCreation: Yup.date().required("La fecha es requerida"),
  idAvailability: Yup.string().required("La disponibilidad es requerida"),
  warranty: Yup.string().required("La garantia es obligatoria")
});

const ProductForm: React.FC<ProductFormProps> = ({ onClose, dataElement, onSave }) => {
  const dataToken = tokenSertice.isAuthenticated();
  const UserId = dataToken.id;
  const [elementType, setElemetType] = useState<any[]>([]);
  const condition = [
    {
        id: 1,
        name: "Nuevo"
    },
    {
        id: 2,
        name: "Usado",
    }
  ]
  const availability = [
    {
        id: 1,
        name: "Disponible"
    },
    {
        id: 2,
        name: "En uso",
    }
  ]

  const handleSubmit = async (data: any) => {
    const dataSend = {
      data: {
        ...data,
      },
      isFormData: true,
      ...(data?.id && { id: data.id}),
    }
    try {
      await createOrUpdateProduct.run(dataSend);
      onClose();
      onSave();
      toast.success(`¡Producto ${dataElement ? "editado" : "creado"} con éxito!`);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchTypeElement = async () => {
    try {
      const response = await getAllElementTypes.run();
      setElemetType(response);
    } catch (error) {
      console.log(error);
    }
  }

  const GoBack = () => {
    onClose();
  };

  useEffect(()=> {
    fetchTypeElement();
  }, [])

  const initialValues = {
    id: dataElement?.id ?? "",
    images: dataElement?.images ?? [],
    idElementType: dataElement?.idElementType ?? "",
    elementName: dataElement?.elementName ?? "",
    material: dataElement?.material ?? "",
    color: dataElement?.color ?? "",
    model: dataElement?.model ?? "",
    serial: dataElement?.serial ?? "",
    idCondition: dataElement?.idCondition ?? "",
    idAvailability: dataElement?.idAvailability ?? "",
    warranty: dataElement?.warranty ?? "",
    idUser: UserId,
    dateCreation: dataElement?.formattedDate ?? "",
  };
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
                dataElement ? "Editar" : "Crear"
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
                        Información del Elemento
                      </h5>
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-4">
                        <div className="col-12 col-sm-6 pe-sm-3">
                          <ProductField
                            title="Nombre del Elemento"
                            required
                          >
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="elementName"
                              placeholder="Nombre del Elemento"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="elementName"
                              component="div"
                            />
                          </ProductField>

                          <ProductField
                            title="Tipo de elemendo ID"
                            required
                          >
                            <Field className="form-control py-2" name="idElementType" id= "idElementType">
                                {() => (
                                    <Select
                                      className="w-100"
                                      value = {
                                          values.idElementType
                                            ?  {
                                                value: values.idElementType,
                                                label: elementType.find((elementType:any)=> elementType.id === values.idElementType)?.elementType
                                            }
                                            : null
                                      }
                                      options={elementType.map((elementType:any) => ({
                                          value: elementType.id,
                                          label: elementType.elementType,
                                      }))}
                                      onChange={(elementType: any) => {
                                          setFieldValue(
                                          "idElementType",
                                          elementType?.value ?? ""
                                          );
                                      }}
                                      placeholder="Selecciona un municipio"
                                    />
                                )}
                            </Field>
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="idElementType"
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
                              name="material"
                              placeholder="Material"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="material"
                              component="div"
                            />
                          </ProductField>
                        </div>
                        <div className="col-12 col-sm-6 pe-4">
                          <ProductField title="Color" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="color"
                              placeholder="Color"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="color"
                              component="div"
                            />
                          </ProductField>
                          <ProductField title="Marca/Modelo" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="model"
                              placeholder="Marca/Modelo"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="model"
                              component="div"
                            />
                          </ProductField>
                          <ProductField title="Serial" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="serial"
                              placeholder="Serial"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="serial"
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
                      <div className="d-flex flex-column flex-sm-row justify-content-between gap-4">
                        <div className="col-12 col-sm-6 pe-sm-3">
                          <ProductField
                            title="Condicion del producto"
                            required
                          >
                            <Field name="idCondition" id= "idCondition">
                              {() => (
                                  <Select
                                      options={condition.map((state) => ({
                                          value: state.id,
                                          label: state.name,
                                      }))}
                                      value={
                                          values.idCondition ?
                                          {
                                              value: values.idCondition ,
                                              label: condition.find((sts) => sts.id === values.idCondition)?.name
                                          }
                                          : null
                                      }
                                      onChange={(idCondition: any) => {
                                          setFieldValue(
                                          "idCondition",
                                          idCondition?.value ?? ""
                                          );
                                      }}
                                      placeholder="Selecciona una condicion"
                                  />
                              )}
                            </Field>
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="idCondition"
                              component="div"
                            />  
                          </ProductField>

                          <ProductField title="Fecha de Recepción" required>
                            <Field
                              type="date"
                              className="form-control py-2"
                              name="dateCreation"
                              placeholder="Ingrese Stock del Producto"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="dateCreation"
                              component="div"
                            />
                          </ProductField>
                        </div>

                        <div className="col-12 col-sm-6 pe-sm-3">
                          <ProductField title="Disponibilidad" required>
                            <Field name="idAvailability" id="idAvailability">
                              {() => (
                                <Select
                                    options={availability.map((state) => ({
                                        value: state.id,
                                        label: state.name,
                                    }))}
                                    value={
                                        values.idAvailability ?
                                        {
                                            value: values.idAvailability ,
                                            label: availability.find((sts) => sts.id === values.idAvailability)?.name
                                        }
                                        : null
                                    }
                                    onChange={(idAvailability: any) => {
                                        setFieldValue(
                                        "idAvailability",
                                        idAvailability?.value ?? ""
                                        );
                                    }}
                                    placeholder="Disponibilidad del elemento"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="idAvailability"
                              component="div"
                            />
                          </ProductField>                    
                          <ProductField title="Garantia" required>
                            <Field
                              type="text"
                              className="form-control py-2"
                              name="warranty"
                              placeholder="Garantia"
                            />
                            <ErrorMessage
                              className="vs-errorMensage"
                              name="warranty"
                              component="div"
                            />
                          </ProductField>
                        </div>
                      </div>
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
