import styled from "styled-components";
import AppIcon from "../../../shared/components/AppIcon";
import AppButton from "../../../shared/components/Buttons/AppButton";
import AppDataTable from "../../../shared/components/DataTable/AppDataTable";
import { useState } from "react";
import { TokenService } from "../../../shared/services/token.service";
import { GetUsersWithPaginationService } from "../services/getUsersWithPagination.service";
import AppModal from "../../../shared/components/Modal/AppModal";
import UsersForm from "../components/UsersForm";
import ConfirmAction from "../components/ConfirmAction";

const tokenService = new TokenService();
const getUsersWithPaginationService = new GetUsersWithPaginationService();

const UsersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userDataDelete, setUserDataDelete] = useState<any | null >(null);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const dataToken = tokenService.isAuthenticated();
    const [loading, setLoading] = useState(true);
    const columns = [
      {
        Header: "Nombre",
        accessor: "name",
        columnClassName: "text-center",
        HeaderClassName: "text-center",
        truncate: true,
        maxChars: 40,
      },
      {
        Header: "Email",
        accessor: "email",
        HeaderClassName: "text-center",
        columnClassName: "text-center",
      },
      {
        Header: "Estado",
        HeaderClassName: "text-center",
        columnClassName: "text-center",
        Cell: ({ value }: any) => {
          const className = `${
            value.statusName === "activo" ? "vs-active" : "vs-inactive"
          }`;
          return (
            <UsersPageStyles>
              <div
                className={`${className} d-flex align-items-center justify-content-center gap-2`}
              >
                <AppIcon icon="square-check"></AppIcon>
                <span>{ value.statusName || "Desconocido"}</span>
              </div>
            </UsersPageStyles>
          );
        },
      },
      {
          Header: "Rol",
          accessor: "roleName",
          HeaderClassName: "text-center",
          columnClassName: "text-center",
      },
      {
        Header: "Acciones",
        HeaderClassName: "text-center",
        Cell: ({ value }: any) => (
          <div className="d-flex justify-content-center">
            <AppButton
              variant="dark"
              className="bg-transparent"
              icon="check-square"
              onClick={() => handleOpenModal(value.id)}
            >
              Editar
            </AppButton>
            <AppButton
              className="text-danger bg-transparent"
              icon="trash-alt"
              onClick={() => handleDelete(value)}
            >
              Eliminar
            </AppButton>
          </div>
        ),
      },
    ];
    const handleDelete = (data: string) => {
        setIsDeleteModalOpen(true);
        setUserDataDelete(data);
    };
    const handleCloseWarning = () => {
      setIsDeleteModalOpen(!isDeleteModalOpen);
    }
    const handleCloseModal = () => {
        setEditingUserId(null);
        setIsModalOpen(false);
    }
    const handleLoading = () => {
        setLoading(!loading);
    }
    const params = {
        id: dataToken.id,
    };
    const handleOpenModal = (id?: number) => {
      if (id) {
          setEditingUserId(id);
      }
      setIsModalOpen(true);
    };
  
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mt-2 mb-4">Lista de Usuarios</h4>
                <AppButton onClick={() => handleOpenModal()} icon="plus">Agregar Usuario</AppButton>
            </div>
            <AppDataTable
                columns={columns}
                params={params}
                service={getUsersWithPaginationService}
                loading={loading}
            ></AppDataTable>
            <AppModal title="Usuarios" subtitle="Ingresa los detalles del nuevo usuario" isOpen={isModalOpen} onClose={handleCloseModal}>
                <UsersForm id={editingUserId!} onClose={handleCloseModal} onSave={handleLoading} />
            </AppModal>
            <AppModal title='¿Eliminar Usuario?' isOpen={isDeleteModalOpen} onClose={handleCloseWarning}>
              <ConfirmAction page="users" dataDelete={userDataDelete} onClose={handleCloseWarning} onSave={handleLoading}></ConfirmAction>
            </AppModal>
        </>
    )
}
export default UsersPage;

const UsersPageStyles = styled.span`
    .vs-active {
        color: var(--color-success);
    }
    .vs-inactive {
        color: var(--color-danger);
    }
`