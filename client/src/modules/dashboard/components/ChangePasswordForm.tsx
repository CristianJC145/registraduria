import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { ChangePasswordUserService } from "../services/changePasswordUser.service";
import { toast } from "react-toastify";

const changePasswordUserService = new ChangePasswordUserService()

interface ChangePasswordFormProps {
    dataToken : any
    onSave: () => void
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({dataToken, onSave}) => {
    const validationSchema = Yup.object().shape({
        current_password: Yup.string().required("Este campo es obligatorio"),
        new_password: Yup.string()
            .nullable()
            .test(
                "password-required",
                "Digite una nueva contraseña",
                function(value) {
                    return this.parent.id || (value)
                }
            )
            .test(
                "password-min-length",
                "La contraseña debe tener al menos 6 caracteres",
                (value) => !value || value.length >= 6
            )
            .test(
                "password-uppercase",
                "La contraseña debe incluir al menos una letra mayúscula",
                (value) => !value || /[A-Z]/.test(value)
            )
            .test(
                "password-lowercase",
                "La contraseña debe incluir al menos una letra minúscula",
                (value) => !value || /[a-z]/.test(value)
            )
            .test(
                "password-number",
                "La contraseña debe incluir al menos un número",
                (value) => !value || /[0-9]/.test(value)
        ),
        confirm_new_password: Yup.string()
            .nullable()
            .test("confirm-password", "Las contraseñas deben coincidir", function (value) {
                const { new_password } = this.parent;
                if (new_password && value) {
                    return new_password === value;
                }
                return true;
            })
            .test("confirm-password-required", "Debes confirmar la contraseña", function (value) {
                const { new_password } = this.parent;
                if (new_password && !value) {
                    return false;
                }
                return true;
        }),
    })
    const initialValues = {
        current_password : "",
        new_password : "",
        confirm_new_password: ""
    }

    const handleSubmit = async (data: any) => {
        const dataSend = {
            id : dataToken?.id,
            data: {...data}
        }
        try {
            await changePasswordUserService.run(dataSend);
            toast.success("Contraseña actualizada con exito!");
            onSave();
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <ChangePasswordFormStyle>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema= {validationSchema}
            >
                <Form className="d-flex flex-column flex-sm-row">
                    <div className="vs-form-wrapper">
                        <div className="vs-field-content">
                            <Field
                                type="password"
                                name="current_password"
                                id="current_password"
                                className="form-control py-3 my-2 rounded-4"
                                placeholder="Contraseña actual"
                            />
                            <ErrorMessage
                                className="vs-errorMensage"
                                name="current_password"
                                component="div"
                            />
                        </div>
                        <div className="vs-field-content">
                            <Field
                                type="password"
                                name="new_password"
                                id="new_password"
                                className="form-control py-3 my-2 rounded-4"
                                placeholder="Contraseña nueva"
                            />
                            <ErrorMessage
                                className="vs-errorMensage"
                                name="new_password"
                                component="div"
                            />
                        </div>

                        <div className="vs-field-content">
                            <Field
                                type="password"
                                name="confirm_new_password"
                                id="confirm_new_password"
                                className="form-control py-3 my-2 rounded-4"
                                placeholder="Confirmar la contraseña"
                            />
                            <ErrorMessage
                                className="vs-errorMensage"
                                name="confirm_new_password"
                                component="div"
                            />
                        </div>
                        <AppButton className="mt-4 rounded-4">Cambiar contraseña</AppButton>
                    </div>
                </Form>
            </Formik>
        </ChangePasswordFormStyle>
    )
}

export default ChangePasswordForm;

const ChangePasswordFormStyle = styled.div `
    .vs-form-wrapper {
        flex: 1 1 0%;
    }
    .vs-form-field {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: 1.25rem;
    }
    .vs-field-content {
        margin-top: 0.75rem;
    }
    .vs-errorMensage {
        color: red;
    }
`