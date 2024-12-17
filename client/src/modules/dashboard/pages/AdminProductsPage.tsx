import { useEffect, useState } from "react";
import AppDataTable from "../../../shared/components/DataTable/AppDataTable";
import { TokenService } from "../../../shared/services/token.service";
import { GetProductsWithPaginationService } from "../services/getProductsWithPagination.service";
import { GetUserByIdService } from "../services/getUserById.service";
import { GetAllCitiesService } from "../services/getAllCities.service";

const getProductsWithPaginationService = new GetProductsWithPaginationService();
const getUserByIdService = new GetUserByIdService();
const tokenService = new TokenService();
const getAllCitiesService = new GetAllCitiesService();

const AdminProductsPage = () => {
    const dataToken = tokenService.isAuthenticated();
    const [addFor, setAddFor] = useState<any>();
    const [idUser, setIdUser] = useState<number>();
    const [cities, setCities] = useState<any>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
        total: 0,
    });

    const columns = [
        {
            Header: "Nombre",
            accessor: "elementName",
            HeaderClassName: "text-center",
            columnClassName: "text-center",
        },
        {
            Header: "Agregado por",
            Cell: ({ value }: any) => {
                const username = addFor?.username ?? "Desconocido";
                return <span>{username}</span>;
            },
            HeaderClassName: "text-center",
            columnClassName: "text-center",
        },
        {
            Header: "Fecha Agregado",
            accessor: "formattedDate",
            HeaderClassName: "text-center",
            columnClassName: "text-center",
        },
        {
            Header: "Disponibilidad",
            accessor: "availability",
            HeaderClassName: "text-center",
            columnClassName: "text-center",
        },
        {
            Header: "Ciudad",
            Cell: ({ value }: any) => {
                const cityUser = cities.find((city: any) => city.id === addFor?.idCity)?.nameCity ?? "Desconocido";
                return <span>{cityUser}</span>;
            },
            HeaderClassName: "text-center",
            columnClassName: "text-center",
        },
    ];

    const params = {
        id: dataToken.id,
    };

    const fetchUserById = async (id: number) => {
        const response = await getUserByIdService.run(id);
        setAddFor(response.userData[0]);
    };

    const fetchCities = async () => {
        const response = await getAllCitiesService.run();
        setCities(response);
    };

    const fetchTableData = async () => {
        const response = await getProductsWithPaginationService.run({...params, page: pagination.page, perPage: pagination.perPage,});
        response.data.forEach((item: any) => setIdUser(item.idUser)); 
    };

    useEffect(() => {
        fetchCities();
        fetchTableData();
    }, []);

    useEffect(() => {
        if (idUser) {
            fetchUserById(idUser);
        }
    }, [idUser]);

    return (
        <>
            <AppDataTable service={getProductsWithPaginationService} params={params} columns={columns}></AppDataTable>
        </>
    );
};

export default AdminProductsPage;
