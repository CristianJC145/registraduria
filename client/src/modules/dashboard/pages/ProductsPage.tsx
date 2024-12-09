import { useEffect, useState } from "react";
import styled from "styled-components";

import AppButton from "../../../shared/components/Buttons/AppButton";
import AppDataTable from "../../../shared/components/DataTable/AppDataTable";

import { GetProductsWithPaginationService } from "../services/getProductsWithPagination.service";
import { TokenService } from "../../../shared/services/token.service";

import AppModal from "../../../shared/components/Modal/AppModal";
import ProductForm from "../components/ProductsForm";
import ConfirmAction from "../components/ConfirmAction";

const getProductsWithPaginationService = new GetProductsWithPaginationService();
const tokenService = new TokenService();

const ProductsPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<any>(null);
  const [elementDataDelete, setElementDataDelete] = useState<any>();
  const dataToken = tokenService.isAuthenticated();
  const [loading, setLoading] = useState(true);


  const handleDelete = (data: string) => {
    setIsDeleteModalOpen(true);
    setElementDataDelete(data);
  };

  const handleCloseWarning = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };
  
  const handleLoading = () => {
    setLoading(!loading);
  }
  const handleCloseModal = () => {
    setEditingProductId(null);
    setIsModalOpen(false);
  }
  const handleOpenModal = (data?: any) => {
    if (data) {
      setEditingProductId(data);
    }
    setIsModalOpen(true);
  }

  const params = {
    id: dataToken.id,
  };
  const columns = [
    {
      Header: "Imagenes",
      Cell: ({ value }: any) => {
        const imagesArray = value.images.toString().split(",");
        return (
          <div className="d-flex ms-4">
            {imagesArray.map((image: string) => (
              <div key={image} style={{ marginLeft: "-1.75rem" }}>
                <img
                  key={image}
                  src={image}
                  width={45}
                  height={45}
                  className="object-fit-cover rounded-circle"
                  style={{ boxShadow: "0 0 0 2px #fff" }}
                  alt="Imagen Producto"
                />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      Header: "Tipo Elemendo ID",
      accessor: "elementType",
      columnClassName: "text-center",
      HeaderClassName: "text-center",
      truncate: true,
      maxChars: 40,
    },
    {
      Header: "Material",
      accessor: "material",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Color",
      accessor: "color",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Marca/Modelo",
      accessor: "model",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Serial",
      accessor: "serial",
      HeaderClassName: "text-center",
      columnClassName: "text-center",
    },
    {
      Header: "Condidicion",
      accessor: "conditionName",
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
      Header: "Fecha Registro",
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
        <div className="d-flex align-items-center mb-3">
          <AppButton onClick={() => handleOpenModal()} icon="plus">Agregar Producto</AppButton>
        </div>
      </div>
      <AppDataTable
        columns={columns}
        params={params}
        service={getProductsWithPaginationService}
        loading={loading}
      ></AppDataTable>
      <AppModal title="Agregar Productos" subtitle="Ingresa los detalles del nuevo producto" isOpen={isModalOpen} onClose={handleCloseModal}>
          <ProductForm dataElement={editingProductId!} onClose={handleCloseModal} onSave={handleLoading}/>
      </AppModal>

      <AppModal title='¿Eliminar Elemento?' isOpen={isDeleteModalOpen} onClose={handleCloseWarning}>
          <ConfirmAction page="products" dataDelete={elementDataDelete} onClose={handleCloseWarning} onSave={handleLoading}></ConfirmAction>
        </AppModal>
    </>
  );
};
export default ProductsPage;

const ProductsPageStyles = styled.span`
  .vs-active {
    color: var(--color-success);
  }
  .vs-inactive {
    color: var(--color-danger);
  }
`;
