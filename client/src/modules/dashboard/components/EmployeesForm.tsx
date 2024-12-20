import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { CreateOrUpdatePeopleService } from "../services/CreateOrUpdatePeople.service";
import { toast } from "react-toastify";

const createOrUpdatePeopleService = new CreateOrUpdatePeopleService();

interface EmployeesFormProps {
    onSave : ()=> void,
    onClose: () => void,
    dataPeople? : any
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre del funcionario es requerido"),
    idCard: Yup.string().required("El documento del funcionario es requerido"),
    email: Yup.string().required("El email del funcionario es requerido"),
    phone: Yup.string().required("El telefono del funcionario es requerido"),
    birthDate: Yup.date().required("Este campo es obligatorio")
})
const EmployeesForm: React.FC<EmployeesFormProps> = ({ onSave, onClose, dataPeople}) => {
    const handleSubmit = async (data: any) => {
        const dataSend  = {
            ...(data?.id && {id : data.id}),
            data: {...data},
        };
        try {
            await createOrUpdatePeopleService.run(dataSend);
            onSave();
            onClose();
            toast.success(`Funcionario ${data.id ? "editado" : "creado"} con exito`)
        } catch (error) {
            console.log(error)
        }
    }
    const initialValues = {
        id: dataPeople?.id ?? "",
        name: dataPeople?.name ?? "",
        idCard: dataPeople?.idCard ?? "",
        email: dataPeople?.email ?? "",
        phone: dataPeople?.phone ?? "",
        birthDate: dataPeople?.formattedDate ?? "",
    }
    return (
        <EmployeesFormStyle>
            <div className="form-content">
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <div className="content-field">
                                <div className="d-flex align-items-center gap-3">
                                    <label htmlFor="name" className="field-label">Nombre</label>
                                    <Field
                                        type= "text"
                                        className="form-control py-2 w-100"
                                        name="name"
                                        id="name"
                                        placeholder="Digite un nombre de funcionario"
                                    />
                                </div>
                                <ErrorMessage
                                    name="name"
                                    className="vs-errorMensage"
                                    component="div"
                                />
                            </div>
                            <div className="content-field">
                                <div className="d-flex align-items-center gap-3">
                                    <label htmlFor="idCard" className="field-label">Documento</label>
                                    <Field
                                        type= "text"
                                        className="form-control py-2 w-100"
                                        name="idCard"
                                        id="idCard"
                                        placeholder="Digite documento de funcionario"
                                    />
                                </div>
                                <ErrorMessage
                                    name="idCard"
                                    className="vs-errorMensage"
                                    component="div"
                                />
                            </div>
                            <div className="content-field">
                                <div className="d-flex align-items-center gap-3">
                                    <label htmlFor="email" className="field-label">Email</label>
                                    <Field
                                        type= "text"
                                        className="form-control py-2 w-100"
                                        name="email"
                                        id="email"
                                        placeholder="Digite email de funcionario"
                                    />
                                </div>
                                <ErrorMessage
                                    name="email"
                                    className="vs-errorMensage"
                                    component="div"
                                />
                            </div>
                            <div className="content-field">
                                <div className="d-flex align-items-center gap-3">
                                    <label htmlFor="phone" className="field-label">Telefono</label>
                                    <Field
                                        type= "text"
                                        className="form-control py-2 w-100"
                                        name="phone"
                                        id="phone"
                                        placeholder="Digite contacto del funcionario"
                                    />
                                </div>
                                <ErrorMessage
                                    name="phone"
                                    className="vs-errorMensage"
                                    component="div"
                                />
                            </div>
                            <div className="content-field">
                                <div className="d-flex align-items-center gap-3">
                                    <label htmlFor="birthDate" className="field-label">Fecha Nacimiento</label>
                                    <Field
                                        type= "date"
                                        className="form-control py-2 w-100"
                                        name="birthDate"
                                        id="birthDate"
                                        placeholder="Digite contacto del funcionario"
                                    />
                                </div>
                                <ErrorMessage
                                    name="birthDate"
                                    className="vs-errorMensage"
                                    component="div"
                                />
                            </div>
                            <div className="d-flex flex-column flex-sm-row gap-sm-3 justify-content-sm-end">
                                <AppButton label={dataPeople? "Guardar" : "Agregar"}></AppButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </EmployeesFormStyle>
    )
}
export default EmployeesForm;

const EmployeesFormStyle = styled.div `
    .form-content {
        min-width: 350px;
    }
    .content-field {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }
    .field-label {
        display: flex;
        justify-content: flex-end;
        width: 100px;
        text-align: end;
        line-height: 1.125rem;
    }
    .vs-errorMensage {
        padding: var(--p-2) 0 0 6.5rem;
        color: red;
    }
`