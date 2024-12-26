import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import styled from "styled-components";
import { settings } from "../../../shared/constant/settings.constants";
import { GetPeopleByIdService } from "../services/getPeopleById.service";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { useEffect, useState } from "react";
import { CreateOrUpdatePeopleService } from "../services/CreateOrUpdatePeople.service";

const getPeopleByIdService = new GetPeopleByIdService();
const createOrUpdatePeopleService = new CreateOrUpdatePeopleService();


interface AcountFormProps {
  dataToken: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre del funcionario es requerido"),
  idCard: Yup.string().required("El documento del funcionario es requerido"),
  email: Yup.string().required("El email del funcionario es requerido"),
  phone: Yup.string().required("El telefono del funcionario es requerido"),
  birthDate: Yup.date().required("Este campo es obligatorio")
});

const AcountForm: React.FC<AcountFormProps> = ({ dataToken }) => {
  const appLogo = [settings.appNoResults];
  const [peopleData, setPeopleData] = useState<any>({});
  const initialValues = {
    id: peopleData?.id ?? "",
    name: peopleData?.name ?? "",
    email: peopleData?.email ?? "",
    idCard: peopleData?.idCard ?? "",
    phone: peopleData?.phone ?? "",
    birthDate: peopleData?.formattedDate ?? "",
    images: appLogo,
  };

  const fetchPeople = async () => {
    try {
        let dataUser = dataToken;
        const peopleDataResponse = await getPeopleByIdService.run(dataUser.idPerson);
        setPeopleData(peopleDataResponse.peopleData[0]);
        console.log(peopleDataResponse);
    } catch (error) {
        console.log(error);
    }
  }
  const handleSubmit = async (data: any) => {
   const dataSend = {
    ...(data?.id && {id: data.id}),
    data: {...data}
   }
    try {
      console.log(dataSend);
      await createOrUpdatePeopleService.run(dataSend);
      toast.success("Informacion actualizada con exito!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);
  return (
    <AcountFormStyle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize = { true }
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="d-flex flex-column flex-sm-row">
              <div className="vs-form-field__right">
                <div className="vs-form-field">
                  <div className="vs-form-field__container">
                    <div className="vs-field-content">
                      <label htmlFor="name">Nombre</label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="form-control py-2 my-2"
                        placeholder="Nombre persona"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="name"
                        component="div"
                      />
                    </div>

                    <div className="vs-field-content">
                      <label htmlFor="idCard">Documento</label>
                      <Field
                        type="text"
                        name="idCard"
                        className="form-control py-2 my-2"
                        placeholder="Numero de documento"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="idCard"
                        component="div"
                      />
                    </div>

                    <div className="vs-field-content">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control py-2 my-2"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="email"
                        component="div"
                      />
                    </div>
                    <div className="vs-field-content">
                      <label htmlFor="phone">Contacto</label>
                      <Field
                        type="text"
                        name="phone"
                        className="form-control py-2 my-2"
                        placeholder="Contacto"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="phone"
                        component="div"
                      />
                    </div>

                    <div className="vs-field-content">
                      <label htmlFor="birthDate">Fecha de Nacimiento</label>
                      <Field
                        type="date"
                        name="birthDate"
                        className="form-control py-2 my-2"
                        placeholder="Contacto"
                      />
                      <ErrorMessage
                        className="vs-errorMensage"
                        name="birthDate"
                        component="div"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <AppButton>Aplicar Cambios</AppButton>
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
  .vs-field-content {
    margin-top: 0.75rem;
  }
  .vs-errorMensage {
    color: red;
  }
  @media (min-width: 768px){
    .vs-form-field__image {
      margin-left: 1.5rem;
    }
  }
`;
