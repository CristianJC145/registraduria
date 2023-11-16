import AppButton from "../../../shared/components/Buttons/AppButton"
import AppDataTable from '../../../shared/components/DataTable/AppDataTable'
import '../css/ProductsPage.css'
import { GetProductsWithPaginationService } from "../services/getProductsWithPagination.service";
const ProductsPage = () => {
    const getProductsWithPaginationService = new GetProductsWithPaginationService();
    const handleEdit = ((row: number) =>{
        console.log("editar producto con id: ", row)
    });

    const handleDelete = ((row: number) =>{
        //editar tabla
    });
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
    
    return (
        <>
            <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
            <div className="d-flex align-items-center mb-3">
                <AppButton label="Agregar Producto" to={'/dashboard/products/create'}></AppButton>
            </div>
            <AppDataTable columns={columns} service={getProductsWithPaginationService}></AppDataTable>
        </>
    )
}
export default ProductsPage