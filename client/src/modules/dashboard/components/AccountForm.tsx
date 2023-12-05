import { ReactNode } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import styled from "styled-components";
import { settings } from "../../../shared/constant/settings.constants";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre del producto es obligatorio"),
});

const AcountForm: React.FC = () => {
  const appLogo = [settings.appNoResults];
  const initialValues = {
    name: "VSHOWCASE",
    email: "admin@vshowcase.com.co",
    phone: "573216549870",
    images: appLogo,
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
      //   await createOrUpdateProduct.run(dataSend);
      toast.success("¡Producto creado con éxito!");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AcountFormStyle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="d-flex">
              <div className="vs-form-field__right">
                <div className="vs-form-field">
                  <div className="vs-form-field__container">
                    <div className="vs-field-content">
                      <label htmlFor="name">Nombre</label>
                      <Field
                        type="text"
                        name="name"
                        className="form-control py-2 my-2"
                        disabled
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="name"
                        component="div"
                      />
                    </div>
                    <div className="vs-field-content">
                      <label htmlFor="phone">Celular</label>
                      <Field
                        type="text"
                        name="phone"
                        className="form-control py-2 my-2"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="phone"
                        component="div"
                      />
                    </div>
                    <div className="vs-field-content">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control py-2 my-2"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="email"
                        component="div"
                      />
                    </div>

                    <div className="vs-field-content">
                      <label htmlFor="typeAccount">Tipo de Cuenta</label>
                      <Field
                        type="text"
                        name="typeAccount"
                        className="form-control py-2 my-2"
                        disabled
                        value="Empresarial"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="typeAccount"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="vs-form-field__image">
                <Field name="images">
                  {({ field }: any) => (
                    console.log(field),
                    (
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
                    )
                  )}
                </Field>
                <ErrorMessage
                  className="vs-errorMensage"
                  name="images"
                  component="div"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AcountFormStyle>
  );
};
export default AcountForm;
const AcountFormStyle = styled.div`
  .vs-form-field__right {
    flex: 1 1 0%;
  }
  .vs-form-field {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 1.25rem;
  }
  .vs-form-field__container {
    grid-column: span 12 / span 12;
  }
  .vs-form-field__image {
    margin-left: 1.5rem;
  }
  .vs-updateImage-dropzone {
    flex-direction: column;
    gap: 0.5rem;
  }
  .vs-updateImage-dropzone button {
    margin: 0 !important;
  }
  .vs-container-image {
    height: 14rem;
    width: 14rem;
  }
  .vs-updateImage-dropzone h6 {
    margin: 0 !important;
  }
  .vs-field-content {
    margin-top: 0.75rem;
  }
`;
