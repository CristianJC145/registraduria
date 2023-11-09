import AppButton from "../../../shared/components/Buttons/AppButton"
import AppDataTable from '../../../shared/components/DataTable/AppDataTable'
import '../css/ProductsPage.css'
 const ProductsPage = () => {
    const handleEdit = ((row: number) =>{
        //editar tabla
    });

    const handleDelete = ((row: number) =>{
        //editar tabla
    });
    const columns = [
        { Header: 'Imagen', accessor: 'imagen', disableSortBy : true, Cell: ({ row } : any) => <img src={row.original.imagen} width={45} height={45} className="object-fit-cover rounded-circle" alt="Imagen Producto"></img>},
        { Header: 'Nombre', accessor: 'nombre'},
        { Header: 'Stock', accessor: 'stock', HeaderClassName : 'text-center', className: 'text-center'},
        { Header: 'Precio', accessor: 'precio', HeaderClassName : 'text-center', className: 'text-center'},
        { 
            Header: 'Estado', 
            accessor: 'estado', 
            HeaderClassName: 'text-center',
            className: 'text-center'
        },
        { 
            Header: 'Acciones', 
            accessor: 'acciones', 
            HeaderClassName : 'text-center',
            disableSortBy : true,
            Cell: ({ row } : any) => (
                <div className="d-flex justify-content-center">
                    <AppButton variant="dark" className="bg-transparent" icon="check-square" onClick={() => handleEdit(row)}>Editar</AppButton>
                    <AppButton  className="text-danger bg-transparent" icon="trash-alt" onClick={() => handleDelete(row)}>Eliminar</AppButton>
                </div>
            )
        }
    ];
    
      const data = [
        { imagen: '../src/assets/images/portatil-1.webp', nombre: 'Computador Asus ryzen 7', stock : 4, precio: '2.300.000', estado: 'Activo'},
        { imagen: '../src/assets/images/1.webp', nombre: 'Reloj pulsera Sanda 739 de cuerpo color negro', stock : 12, precio: '730.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        { imagen: '../src/assets/images/iphone.webp', nombre: 'Iphone 15 Pro Max 1TB - Gris Espacial', stock : 5, precio: '7.600.000', estado: 'Activo'},
        
    ]
    return (
        <>
            <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
            <div className="d-flex align-items-center mb-3">
                <AppButton label="Agregar Producto" to={'/dashboard/products/create'}></AppButton>
            </div>
            <AppDataTable columns={columns} data={data}></AppDataTable>
        </>
    )
}
export default ProductsPage