import AppCard from "../../../shared/components/AppCard/AppCard"
import AppButton from "../../../shared/components/Buttons/AppButton"

 const ProductsPage = () => {
    return (
        <>
            <h4 className="fw-bold mt-2 mb-4">Lista de Productos</h4>
            <div className="d-flex gap-2 align-items-center mb-3">
                <AppButton label="Agregar Producto"></AppButton>
                <AppButton className="rounded-3" variant="primary" outlined icon="plus"></AppButton>
            </div>
            <div className="overflow-x-auto">
                <table className='vs-dataTable'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img className="object-fit-cover rounded-circle" width="50px" height="50px" src="../src/assets/images/1.webp" alt="" />
                            </td>
                            <td>Computador Asus ryzen 7</td>
                            <td>4</td>
                            <td>2.300.000</td>
                            <td>Activo</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <AppButton variant="dark" icon="check-square">Editar</AppButton>
                                    <AppButton variant="dark" icon="trash">Eliminar</AppButton>
                                </div>
                            </td>
                        </tr>
                        <tr>
                        <td>
                                <img className="object-fit-cover rounded-circle" width="50px" height="50px" src="../src/assets/images/portatil-1.webp" alt="" />
                            </td>
                            <td>Computador Asus ryzen 7</td>
                            <td>4</td>
                            <td>2.300.000</td>
                            <td>Activo</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <AppButton variant="dark" icon="check-square">Editar</AppButton>
                                    <AppButton variant="dark" icon="trash">Eliminar</AppButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ProductsPage