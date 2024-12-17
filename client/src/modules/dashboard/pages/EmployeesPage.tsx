import AppDataTable from "../../../shared/components/DataTable/AppDataTable";
import { useEffect, useState } from "react";
import { TokenService } from "../../../shared/services/token.service";
import AppButton from "../../../shared/components/Buttons/AppButton";
import { GetPeopleWithPaginationService } from "../services/getPeopleWithPagination.service";

const tokenService = new TokenService();
const getPeopleWithPaginationService = new GetPeopleWithPaginationService()


const EmployeesPage = () => {
    const dataToken = tokenService.isAuthenticated();
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

    }
    const handleDelete = (data: string) => {
    };
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
        </>
    )
}
export default EmployeesPage