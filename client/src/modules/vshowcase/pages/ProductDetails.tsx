import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";
import DOMPurify from "dompurify";
import AppCard from "../../../shared/components/AppCard/AppCard";
import AppIcon from "../../../shared/components/AppIcon";
import { useShoppingCart } from "../../../shared/contexts/ShoppingCartContext";
import { ProductDto } from "../../../shared/dtos/products.dto";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { addToCart } = useShoppingCart();
  const { state } = useLocation();

  const data = state.product ? state.product : state;
  const sanitizedHTML = DOMPurify.sanitize(data.description);
  const condition =
    data.condition_id === 1
      ? "Nuevo"
      : data.condition_id === 2
      ? "Usado"
      : "Reacondicionado";

  const handleBuyNow = (product: string) => {
    toast.success(`Compra Realizada con !Exito!`);
  };
  const handleAddCartShopping = (product: ProductDto) => {
    addToCart(product);
  };

  function formattedPrice(price: number | bigint) {
    return new Intl.NumberFormat("es-ES").format(price);
  }
  return (
    <ProductPageStyles>
      <div className="vs-product-container">
        <div className="vs-container-left__col">
          <div className="vs-col-content__row">
            <div className="vs-row-image_container">
              <div className="vs-container-list-gallery">
                {data.images.map((img: string, index: number) => (
                  <div className="vs-list-gallery_thumbnail" key={index}>
                    <img src={img} alt={`Gallery Images Products ${index}`} />
                  </div>
                ))}
              </div>
              <div className="vs-container-main-image">
                <img src={data.images[0]} alt="Main Image Product" />
              </div>
            </div>
          </div>
          <div
            className="vs-containter-description"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
        </div>
        <div className="vs-container-right__col">
          <AppCard
            body={
              <div className="vs-col-widgets">
                <div className="vs-widgets-container">
                  <div className="vs-container-condition">
                    <span>{condition}</span>
                  </div>
                  <div className="vs-container-name">
                    <span>{data.name}</span>
                  </div>
                  <div className="vs-container-price">
                    <span>$ {formattedPrice(data.price)}</span>
                  </div>
                  <div className="vs-container-shipment">
                    <span>
                      Entrega
                      <span
                        style={{
                          color: "var(--color-pastel-green)",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        GRATIS
                      </span>{" "}
                      entre el el lunes y el miercoles
                    </span>
                  </div>
                  <div className="vs-container-stock">
                    <div className="fw-bold my-4">
                      <span>Stock Disponible: </span>
                      <span> {data.stock} unidades</span>
                    </div>
                    <div
                      className="d-flex align-items-center gap-2 my-4"
                      style={{ color: "var(--color-gray-700)" }}
                    >
                      <span>Cantidad:</span>
                      <div>
                        <select className="form-select form-select-sm border-0 fs-6">
                          <option value="1">1 unidad</option>
                          <option value="2">2 unidades</option>
                          <option value="3">3 unidades</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="vs-widgets-actions">
                  <AppButton
                    label="Comprar Ahora"
                    onClick={() => handleBuyNow(data)}
                  ></AppButton>
                  <AppButton
                    outlined
                    label="Agregar al Carrito"
                    onClick={() => handleAddCartShopping(data)}
                  ></AppButton>
                </div>
                <div className="d-flex gap-1 my-4">
                  <span>Vendido por </span>
                  <AppButton
                    to={`/seller/${data.user_id}`}
                    variant="link"
                    label={data.user_name}
                  ></AppButton>
                </div>
                <div style={{ color: "var(--color-gray-400)" }}>
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="d-flex align-items-center justify-content-center position-relative">
                      <AppIcon
                        className="text-white position-absolute w-50"
                        icon="check"
                      ></AppIcon>
                      <AppIcon className="fs-5" icon="certificate"></AppIcon>
                    </div>
                    <span>
                      Garantia del producto:{" "}
                      <span className="fw-bold">12 meses</span>
                    </span>
                  </div>
                  <div className="d-flex gap-2 align-items-start mb-4">
                    <AppIcon
                      className="vs-icon-tag rotate"
                      icon="level-down-alt"
                    ></AppIcon>
                    <span>
                      Devoluciones:{" "}
                      <span className="fw-bold">
                        se puede devolver hasta el 25 de dic {"(1 mes)"}
                      </span>{" "}
                    </span>
                  </div>
                  <div className="d-flex gap-2 align-items-start mb-4">
                    <AppIcon icon="shield" className="vs-icon-tag"></AppIcon>
                    <span>
                      Compra Segura:{" "}
                      <span className="fw-bold">
                        Protegemos tu informacion al realizar la transacción
                      </span>{" "}
                    </span>
                  </div>
                </div>
              </div>
            }
          ></AppCard>
          <div className="vs-col-details"></div>
        </div>
        <div className="vs-containter-description__col">
          <AppCard
            body={<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />}
          ></AppCard>
        </div>
      </div>
    </ProductPageStyles>
  );
};
export default ProductDetails;

const ProductPageStyles = styled.div`
  .vs-product-container {
    display: flex;
    flex-direction: column;
  }
  .vs-container-left__col,
  .vs-container-right__col,
  .vs-containter-description__col {
    padding: var(--p-4) var(--p-2);
  }
  .vs-containter-description__col {
    padding: var(--p-4) var(--p-2);
  }
  .vs-row-image_container {
    display: flex;
    flex-direction: column-reverse;
  }
  .vs-container-list-gallery {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
  }
  .vs-list-gallery_thumbnail {
    display: flex;
    align-items: center;
    border: 2px solid var(--color-body);
    border-radius: 8px;
    width: 80px;
    height: 80px;
  }
  .vs-list-gallery_thumbnail img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .vs-container-main-image {
    width: 100%;
    height: 100%;
  }
  .vs-container-main-image img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
  .vs-containter-description {
    display: none;
  }
  .vs-row-details_container {
    display: flex;
    flex-direction: column;
  }
  .vs-widgets-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .vs-container-condition {
    color: var(--color-gray-300);
    margin-bottom: 0.5rem;
  }
  .vs-container-name {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 0.5rem;
    color: var(--color-gray-800);
  }
  .vs-container-price {
    font-size: 36px;
    font-weight: 300;
  }
  .vs-container-stock {
    color: var(--color-gray-800);
  }
  .vs-container-shipment {
    color: var(--color-gray-700);
    margin: 0.5rem 0;
  }
  .vs-icon-tag {
    margin-top: 0.3rem;
  }
  .rotate {
    transform: rotate(90deg);
  }
  @media (min-width: 768px) {
    .vs-container-list-gallery {
      flex-direction: column;
      width: 100px;
    }
    .vs-row-image_container {
      display: flex;
      flex-direction: row;
    }
  }
  @media (min-width: 992px) {
    .vs-product-container {
      display: flex;
      flex-direction: row;
    }
    .vs-container-main-image {
      width: 100%;
      height: 450px;
    }
    .vs-col-widgets {
      min-width: 320px;
      max-width: 420px;
    }
    .vs-container-left__col,
    .vs-container-right__col,
    .vs-containter-description__col {
      padding: var(--p-8);
    }
    .vs-containter-description {
      border-top: 1px solid rgba(var(--color-gray-300-rgb), 0.3);
      margin-top: 2rem;
      padding-top: var(--p-8);
      display: inline-block;
    }
    .vs-containter-description__col {
      display: none;
    }
  }
  @media (min-width: 1200px) {
  }
`;
