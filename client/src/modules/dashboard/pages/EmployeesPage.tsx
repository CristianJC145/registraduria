import AppDataTable from "../../../shared/components/DataTable/AppDataTable";
import { useEffect, useState } from "react";
import { TokenService } from "../../../shared/services/token.service";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { GetPeopleWithPaginationService } from "../services/getPeopleWithPagination.service";
import AppModal from "../../../shared/components/Modal/AppModal";
import EmployeesForm from "../components/EmployeesForm";
import ConfirmAction from "../components/ConfirmAction";

const tokenService = new TokenService();
const getPeopleWithPaginationService = new GetPeopleWithPaginationService();


const EmployeesPage = () => {
  const dataToken = tokenService.isAuthenticated();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [peopleDataDelete, setPeopleDataDelete] = useState<any | null >(null);
  const [editingEmployeeData, setEditingEmployeeData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
      page: 1,
      perPage: 10,
      total: 0,
  });

  const columns = [
      {
          Header: "Nombre",
          accessor: "name",
          HeaderClassName: "text-center",
          columnClassName: "text-center",
      },
      {
          Header: "Documento",
          accessor: "idCard",
          HeaderClassName: "text-center",
          columnClassName: "text-center",
      },
      {
          Header: "Email",
          accessor: "email",
          HeaderClassName: "text-center",
          columnClassName: "text-center",
      },
      {
          Header: "Contacto",
          accessor: "phone",
          HeaderClassName: "text-center",
          columnClassName: "text-center",
      },
      {
          Header: "Fecha Nacimiento",
          accessor: "formattedDate",
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
                onClick={() => handleOpenModal(value)}
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

  const params = {
      id: dataToken.id,
  };
  const handleOpenModal = (data?: any) => {
    if (data) {
      setEditingEmployeeData(data);
    }
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setEditingEmployeeData(null);
    setIsModalOpen(!isModalOpen);
  }
  const handleLoading = () => {
    setLoading(!loading);
  }
  const handleDelete = (data: string) => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setPeopleDataDelete(data);
  };
  const handleCloseWarning = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }
  return (
      <>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mt-2 mb-4">Lista de Funcionarios</h4>
            <AppButton onClick={() => handleOpenModal()} icon="plus">Agregar Funcionario</AppButton>
        </div>
        <AppDataTable
            columns={columns}
            params={params}
            service={getPeopleWithPaginationService}
            loading={loading}
        ></AppDataTable>
        <AppModal title="Funcionarios" subtitle="Ingresa los detalles del nuevo funcionario" isOpen={isModalOpen} onClose={handleCloseModal}>
          <EmployeesForm dataPeople={editingEmployeeData!} onClose={handleCloseModal} onSave={handleLoading}></EmployeesForm>
        </AppModal>
        <AppModal title="¿Eliminar Funcionario?" isOpen={isDeleteModalOpen} onClose={handleCloseWarning}>
          <ConfirmAction page="employees" dataDelete={peopleDataDelete} onClose={handleCloseWarning} onSave={handleLoading}></ConfirmAction>
        </AppModal>
      </>
  )
}
export default EmployeesPage