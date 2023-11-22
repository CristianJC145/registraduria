import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import AppButton from "../../../shared/components/Buttons/AppButton"
import AppDataTable from '../../../shared/components/DataTable/AppDataTable'

import { useBreadcrumbs } from "../../../shared/contexts/BreadCrumbsContext";
import { GetProductsWithPaginationService } from "../services/getProductsWithPagination.service";
import {DeleteProductByIdService } from "../services/deleteProductById.service"

import '../css/ProductsPage.css'

import AppModal from '../../../shared/components/Modal/AppModal';
import { UpdateDatatableService } from '../../../shared/services/updateDatatable.service';

const getProductsWithPaginationService = new GetProductsWithPaginationService();
const deleteProductByIdService = new DeleteProductByIdService();
const updateDatatableService = new UpdateDatatableService();

const ProductsPage = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [idDataDelete, setIdDataDelete] = useState<number>()
    const { updateBreadcrumbs } = useBreadcrumbs();
    const navigate = useNavigate();

    const handleEdit = ((row: number) =>{
        let url = `/dashboard/products/edit-product/${row}`
        navigate(url)
    });

    const handleDelete = ((id: number) =>{
        setIsDeleteModalOpen(true);
        setIdDataDelete(id);
    });

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = async() => {
        if (idDataDelete) {
            await deleteProductByIdService.run(idDataDelete);
        }
        toast.success('¡Producto eliminado correctamente!');
        setIsDeleteModalOpen(false);
    };
    const columns = [
        { 
            Header: 'Imagenes', 
            Cell: ({ value }: any) => {
                const imagesArray = (value.images.toString()).split(',');
                return (
                    <div className="d-flex ms-4">
                        {imagesArray.map((image: string) => 
                            <div key={image} style={{marginLeft: '-1.75rem'}}>
                                <img key={image} src={image} width={45} height={45} className="object-fit-cover rounded-circle" style={{boxShadow: '0 0 0 2px #fff'}} alt="Imagen Producto"/>                   
                            </div>
                        )}
                    </div>
                )
            }
        },
        { Header: 'Nombre', accessor: 'name', columnClassName: 'text-center', HeaderClassName : 'text-center', truncate: true, maxChars : 40},
        { Header: 'Stock', accessor: 'stock', HeaderClassName : 'text-center', columnClassName: 'text-center'},
        { Header: 'Precio', accessor: 'price', HeaderClassName : 'text-center', columnClassName: 'text-center'},
        { 
            Header: 'Estado', 
            accessor: 'state', 
            HeaderClassName: 'text-center',
            columnClassName: 'text-center'
        },
        { 
            Header: 'Acciones', 
            HeaderClassName : 'text-center',
            Cell: ({ value } : any) => (
                <div className="d-flex justify-content-center">
                    <AppButton variant="dark" className="bg-transparent" icon="check-square" onClick={() => handleEdit(value.id)}>Editar</AppButton>
                    <AppButton  className="text-danger bg-transparent" icon="trash-alt" onClick={() => handleDelete(value.id)}>Eliminar</AppButton>
                </div>
            )
        }
    ];

    useEffect(() => {
        updateBreadcrumbs(( prevBreadcrumbs ) => [
          ...prevBreadcrumbs,
          { name: 'Productos', route: '/dasboard/products', level: 2 },
        ]);
        
        return () => {
          updateBreadcrumbs(( prevBreadcrumbs ) => prevBreadcrumbs.slice(0, -3));
        };
      }, [updateBreadcrumbs]);
    
    return (
        <>
            <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
            <div className="d-flex align-items-center mb-3">
                <AppButton label="Agregar Producto" to={'/dashboard/products/create'}></AppButton>
            </div>
            <AppDataTable columns={columns} service={getProductsWithPaginationService}></AppDataTable>
            
            <AppModal
                isOpen={isDeleteModalOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            ></AppModal>
        </>
    )
}
export default ProductsPage
