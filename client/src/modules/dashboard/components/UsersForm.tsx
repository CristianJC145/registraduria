import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { CreateOrUpdateUserService } from "../services/CreateOrUpdateUsers.service";
import { GetUserByNameService } from "../services/getUserByName.service";
import { GetPeopleByIdService } from "../services/getPeopleById.service";
import { GetUserByIdService } from "../services/getUserById.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface FigureEditorProps {
    onClose : () => void,
    onSave: () => void,
    id?: number
}
const createOrUpdateUserService = new CreateOrUpdateUserService();
const getUserByNameService = new GetUserByNameService();
const getUserByIdService = new GetUserByIdService();
const getPeopleByIdService = new GetPeopleByIdService();
const validationSchema = Yup.object().shape({
    id: Yup.number().nullable(),
    username: Yup.string().required("El nombre de usuario es obligatorio"),

    password: Yup.string()
        .nullable()
        .test(
            "password-required",
            "La contraseña es obligatoria",
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
    confirmPassword: Yup.string()
        .nullable()
        .test("confirm-password", "Las contraseñas deben coincidir", function (value) {
            const { password, id } = this.parent;
            if (id && password && value) {
                return password === value;
            }
            return true;
        })
        .test("confirm-password-required", "Debes confirmar la contraseña", function (value) {
            const { password, id } = this.parent;
            if (password && id && !value) {
                return false;
            }
            return true;
    }),
    idRole: Yup.string().required("El rol es obligatorio"),
    idStatus: Yup.string().required("El estado es obligatorio"),
    idPerson: Yup.string().required("Este campo es obligatorio"),
})
const UsersForm: React.FC<FigureEditorProps> = ({ onClose, onSave, id }) => {
    const [options, setOptions] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>({});
    const [peopleData, setPeopleData] = useState<any>({});
    const [selectedOption, setSelectedOption] = useState<any>(null);


    const roles = [
        {
            id: 1,
            name: "Administrador"
        },
        {
            id: 2,
            name: "Usuario"
        }
    ]
    const status = [
        {
            id: 1,
            name: "Activo"
        },
        {
            id: 2,
            name: "Inactivo",
        }
    ]
    const fetchOptions = async (inputValue: string) => {
        if (inputValue.trim().length === 0) {
            setOptions([]);
            return;
        }
        try {
            const response = await getUserByNameService.run(inputValue);
            const data = response;
            const formattedOptions = (data && Array.isArray(data))
            ? data.map((item: any) => ({
                value: item.idUser,
                label: item.name,
              }))
            : [];
            setOptions(formattedOptions);
        } catch (error) {
            console.error("Error al buscar datos:", error);
            setOptions([])
        }
    }
    const fetchEditUser = async (id: number) => {
        try {
            const response = await getUserByIdService.run(id);
            let dataUser = response.userData[0]
            const peopleDataResponse = await getPeopleByIdService.run(dataUser.idPerson)
            setUserData(dataUser);
            setPeopleData(peopleDataResponse.peopleData[0]);
            console.log(peopleDataResponse.peopleData[0]);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (inputValue: string) => {
        fetchOptions(inputValue);
    };
    const handleSubmit = async ( data:any ) => {
        const dataSend = {
            ...(data?.id && { id: data.id }),
            data: { ...data },
        };

        try {
            await createOrUpdateUserService.run(dataSend);
            onClose();
            onSave();
            toast.success(`Usuario ${userData?.id ? 'editado' : 'creado'} correctamente`);

        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (id) {
            fetchEditUser(id)
        }
    }, [id]);
    const initialValues = {
        id: userData?.id ?? "",
        username: userData?.username ?? "",
        password: "",
        idRole: userData?.idRole ?? null,
        idStatus: userData?.idStatus ?? null,
        idPerson: userData?.idPerson ?? "",
        confirmPassword : "",
    };
    return (
        <UsersFormStyle>
            <div className="form-content">
                <Formik 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize = { true }
                    validationSchema={validationSchema}
                >
                    {({ values, setFieldValue, setFieldTouched }) => (
                        <div>
                            <Form>
                                <div className="content-field">
                                        <div className="d-flex align-items-center gap-3">
                                            <label htmlFor="idPerson" className="field-label">Persona</label>
                                            <Field className="form-control py-2" name="idPerson" id= "idPerson">
                                                {() => (
                                                    <Select
                                                        className="py-2 w-100"
                                                        value={selectedOption ||
                                                            (values.idPerson && peopleData
                                                                ? {value :values.idPerson, label : peopleData.name}
                                                                : null
                                                            )
                                                        }
                                                        options={options}
                                                        onChange={(option) => {
                                                            setFieldValue("idPerson", option?.value?? "")
                                                            setSelectedOption(option);
                                                        }}
                                                        onInputChange={handleInputChange}
                                                        onBlur={() => setFieldTouched("idPerson", true)}
                                                        placeholder="Escribe un nombre..."
                                                        isDisabled={!!values.id}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <ErrorMessage
                                            className="vs-errorMensage"
                                            name="idPerson"
                                            component="div"
                                        />
                                    </div>
                                    <div className="content-field">
                                        <div className="d-flex align-items-center gap-3">
                                            <label htmlFor="username" className="field-label">Usuario</label>
                                            <Field
                                                type="text"
                                                className="form-control py-2"
                                                name="username"
                                                id= "username"
                                                placeholder="Digite un nombre de usuario"
                                            />
                                        </div>
                                        <ErrorMessage
                                            className="vs-errorMensage"
                                            name="username"
                                            component="div"
                                        />
                                    </div>
                                    <div className="content-field">
                                        <div className="d-flex align-items-center gap-3">
                                            <label htmlFor="password" className="field-label">Contraseña</label>
                                            <Field
                                                type="password"
                                                className="form-control py-2"
                                                name="password"
                                                id= "password"
                                                placeholder={values.id ? "Cambiar Contraseña" : "Digite una Contraseña"}
                                            />
                                        </div>
                                        <ErrorMessage
                                            className="vs-errorMensage"
                                            name="password"
                                            component="div"
                                        />
                                    </div>

                                    {values.id && (
                                        <div className="content-field">
                                            <div className="d-flex align-items-center gap-3">
                                                <label htmlFor="confirmPassword" className="field-label">Confirmar</label>
                                                <Field
                                                    type="password"
                                                    className="form-control py-2"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    placeholder="Confirmar Contraseña"
                                                />
                                            </div>
                                            <ErrorMessage
                                                className="vs-errorMensage"
                                                name="confirmPassword"
                                                component="div"
                                            />
                                        </div>
                                    )}
                                    <div className="content-field">
                                        <div className="d-flex align-items-center gap-3">
                                            <label htmlFor="idRole" className="field-label">Rol</label>
                                            <Field className="form-control py-2" name="idRole" id= "idRole">
                                                {() => (
                                                    <Select
                                                        className="py-2 w-100"
                                                        value = {
                                                            values.idRole
                                                                ? {
                                                                    value: values.idRole,
                                                                    label: roles.find((role)=> role.id === values.idRole)?.name
                                                                }
                                                                : null
                                                        }
                                                        options={roles.map((role) => ({
                                                            value: role.id,
                                                            label: role.name,
                                                        }))}
                                                        onChange={(idRole: any) => {
                                                            setFieldValue(
                                                            "idRole",
                                                            idRole?.value ?? ""
                                                            );
                                                        }}
                                                        placeholder="Selecciona un Rol"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <ErrorMessage
                                            className="vs-errorMensage"
                                            name="idRole"
                                            component="div"
                                        />
                                    </div>

                                    <div className="content-field">
                                        <div className="d-flex align-items-center gap-3">
                                            <label htmlFor="idStatus" className="field-label">Estado</label>
                                            <Field className="form-control py-2" name="idStatus" id= "idStatus">
                                                {() => (
                                                    <Select
                                                        className="py-2 w-100"
                                                        options={status.map((state) => ({
                                                            value: state.id,
                                                            label: state.name,
                                                        }))}
                                                        value={
                                                            values.idStatus ?
                                                            {
                                                                value: values.idStatus ,
                                                                label: status.find((sts) => sts.id === values.idStatus)?.name
                                                            }
                                                            : null
                                                        }
                                                        onChange={(idStatus: any) => {
                                                            setFieldValue(
                                                            "idStatus",
                                                            idStatus?.value ?? ""
                                                            );
                                                        }}
                                                        placeholder="Selecciona una Estado"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <ErrorMessage
                                            className="vs-errorMensage"
                                            name="idStatus"
                                            component="div"
                                        />
                                    </div>
                                    <div className="d-flex flex-column flex-sm-row gap-sm-3 justify-content-sm-end">
                                        <AppButton className="mt-3 px-4" label={values.id ? "Editar" : 'Agregar'}></AppButton>
                                    </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
        </UsersFormStyle>
    )
}
export default UsersForm;

const UsersFormStyle = styled.div`
    .form-content{
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