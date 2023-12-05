import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetProductsWithPaginationService } from "../../dashboard/services/getProductsWithPagination.service";
import { services } from "../../../shared/constant/services";
import styled from "styled-components";
import AppButton from "../../../shared/components/Buttons/AppButton";
import Select from "react-select";
import AppCard from "../../../shared/components/AppCard/AppCard";
import AppIcon from "../../../shared/components/AppIcon";
import { settings } from "../../../shared/constant/settings.constants";

const getProductsWithPaginationService = new GetProductsWithPaginationService();

const ProductList = () => {
  const appNoResults = settings.appNoResults;
  const { searchTerm } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const fetchProducts = async () => {
    const result = await getProductsWithPaginationService.run({
      search: `${searchTerm}`,
    });
    const { data } = result;
    data.map((product: any) => {
      product.images = product.images
        .split(",")
        .map((image: string) => `${services.api_url}/${image}`);
      return {
        ...data,
      };
    });
    setProducts(data);
  };

  function truncateName(text: string) {
    const screenWidth = window.innerWidth;
    let maxLength;

    if (screenWidth >= 1200) {
      maxLength = 180;
    } else if (screenWidth >= 768) {
      maxLength = 90;
    } else {
      maxLength = 30;
    }

    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }
  function formattedPrice(price: number | bigint) {
    return new Intl.NumberFormat("es-ES").format(price);
  }

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  return (
    <ProductListStyle>
      <div className="vs-search">
        {products.length !== 0 ? (
          <>
            <div className="vs-search-container__sidebar">
              <div className="vs-sidebar-search__result">
                <h4 className="vs-result-value">{searchTerm}</h4>
                <span className="vs-result-number">
                  {products.length} resultados
                </span>
              </div>
              <div className="vs-sidebar-filter">
                <div className="vs-filter-price">
                  <span className="vs-prince-label">Precio</span>
                  <div className="vs-price-list">
                    <span>Hasta $250.000</span>
                    <span>$250.000 a $500.000</span>
                    <span>$500.000 a $1.000.000</span>
                    <span>Más de $1.000.000</span>
                  </div>
                  <div className="vs-price-range">
                    <input
                      className="vs-range-input"
                      type="text"
                      placeholder="$ Mín"
                    />
                    <input
                      className="vs-range-input"
                      type="text"
                      placeholder="$ Máx"
                    />
                    <AppButton
                      className="vs-range-btn"
                      variant="primary"
                      outlined
                      icon="angle-right"
                    ></AppButton>
                  </div>
                </div>
                <div className="vs-filter-condition">
                  <span className="vs-condition-label">Condición</span>
                  <div className="vs-condition-list">
                    <span>Nuevo</span>
                    <span>Usado</span>
                    <span>Reacondicionado</span>
                  </div>
                </div>
              </div>
              <div className="vs-sidebar-advertising">
                <AppCard
                  body={
                    <div className="vs-advertising-container">
                      <div className="vs-container-title">
                        <span>Promoción Pagada</span>
                        <AppIcon icon="ad"></AppIcon>
                      </div>
                      <div className="vs-container-img">
                        <img
                          src={products[0].images[0]}
                          alt="Image Paid Advertising"
                        />
                      </div>
                      <div className="vs-container-product">
                        <span className="vs-product-name">
                          {products[0].product_name.length > 60
                            ? `${products[0].product_name.slice(0, 60)}...`
                            : products[0].product}
                        </span>
                        <h6 className="vs-product-price__before">$3.999.900</h6>
                        <h3 className="vs-product-price__after">
                          $2.949.900
                          <span>16% OFF</span>
                        </h3>
                        <AppButton label="Comprar Ahora"></AppButton>
                      </div>
                    </div>
                  }
                ></AppCard>
              </div>
            </div>
            <div className="vs-search-container__result">
              <div className="vs-search-filter">
                <div className="vs-filter-select">
                  <span>Ordenar Por</span>
                  <Select
                    options={[
                      { value: 1, label: "Menor Precio" },
                      { value: 2, label: "Mayor Precio" },
                      { value: 3, label: "Más Relevante" },
                    ]}
                    defaultValue={{ value: 3, label: "Más Relevante" }}
                  ></Select>
                </div>
              </div>
              <div className="vs-search-result">
                {products.map((product) => (
                  <div className="vs-result-item" key={product.id}>
                    <Link
                      to={`/${encodeURIComponent(product.product_name)}/${
                        product.id
                      }`}
                      state={product}
                      className="vs-items-img"
                    >
                      <img
                        src={product?.images[0]}
                        alt={`Image ${product?.name}`}
                      />
                    </Link>
                    <div className="vs-item-detail">
                      <Link
                        className="vs-detail-name"
                        to={`/${encodeURIComponent(product.product_name)}/${
                          product.id
                        }`}
                        state={product}
                      >
                        {truncateName(product?.product_name)}
                      </Link>
                      <h3 className="vs-detail-price">
                        ${formattedPrice(product?.price)}
                      </h3>
                      <span className="vs-detail-stock">
                        Unidades Disponibles {product?.stock}
                      </span>
                      <span className="vs-detail-shipping">Envio gratis</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="vs-search-containter__without">
            <img src={appNoResults} alt="Image No Results" width={300} />
            <h2>Lo sentimos, no se encontraron resultados.</h2>
            <span>
              Prueba con otra busqueda o revisa tu ortografía.
              <br></br>
              Estamos trabajando constantemente para mejorar y actualizar
              nuestra base de datos.
            </span>
          </div>
        )}
      </div>
    </ProductListStyle>
  );
};

export default ProductList;

const ProductListStyle = styled.div`
  .vs-search {
    display: flex;
    gap: 0.75rem;
  }
  .vs-search-container__sidebar {
    display: none;
    padding: 1rem;
    flex: 1 1;
    padding-right: 2rem;
  }
  .vs-sidebar-search__result {
    display: flex;
    flex-direction: column;
  }
  .vs-result-value {
    text-transform: capitalize;
    margin-bottom: 0;
    font-weight: 600;
  }
  .vs-result-number {
    margin-top: 0.325rem;
    color: var(--color-gray-700);
    font-size: 13px;
  }
  .vs-sidebar-filter {
    display: flex;
    flex-direction: column;
  }
  .vs-prince-label,
  .vs-condition-label {
    font-size: 16px;
    font-weight: 500;
  }
  .vs-price-list,
  .vs-condition-list {
    display: flex;
    flex-direction: column;
    color: var(--color-gray-700);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .vs-price-range {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .vs-range-input {
    display: flex;
    width: 90px;
    border: 1px solid rgba(var(--color-gray-300-rgb), 0.5);
    border-radius: 8px;
    padding: 0 var(--p-4);
  }
  .vs-range-input:focus {
    box-shadow: 0 0 3px 2px rgba(var(--color-primary-rgb), 0.8);
  }
  .vs-range-input:focus-visible {
    outline: unset;
  }
  .vs-filter-condition,
  .vs-filter-price {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 2rem;
  }
  .vs-range-btn {
    width: 30px;
    height: 30px;
    border-radius: 99px;
  }
  .vs-sidebar-advertising {
    margin-top: 2rem;
  }
  .vs-advertising-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .vs-container-title {
    display: flex;
    align-items: center;
    gap: 0.125rem;
    font-size: 12px;
    text-align: left;
    color: var(--color-gray-300);
  }
  .vs-container-img {
    width: 150px;
    height: 350px;
  }
  .vs-container-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .vs-product-price__before {
    margin-top: 1rem;
    text-decoration: line-through;
    margin-bottom: 0;
    color: var(--color-gray-300);
  }
  .vs-product-price__after {
    display: flex;
  }
  .vs-product-price__after span {
    margin-left: 0.125rem;
    color: var(--color-success);
    font-size: 14px;
  }
  .vs-search-container__result {
    width: 100%;
    padding: var(--p-4) 0;
  }
  .vs-filter-select {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .vs-search-result {
    display: inline-flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
  .vs-result-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 2px solid var(--color-body);
    border-radius: 8px;
    padding: var(--p-4);
  }
  .vs-items-img {
    padding: 0 var(--p-4);
    box-sizing: content-box;
    min-width: 130px;
    width: 130px;
    height: 130px;
  }
  .vs-items-img img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
  .vs-item-detail {
    display: flex;
    flex-direction: column;
  }
  .vs-detail-name {
    color: var(--color-gray-900);
    text-decoration: none;
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .vs-detail-shipping {
    color: var(--color-success);
    font-weight: 500;
  }
  .vs-detail-stock {
    margin-bottom: 0.75rem;
  }
  .vs-search-containter__without {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
  .vs-search-containter__without img {
    object-fit: contain;
    height: 300px;
    width: 300px;
  }
  .vs-search-containter__without h2 {
    color: var(--color-gray-700);
    font-weight: 500;
  }
  .vs-search-containter__without span {
    text-align: center;
    font-size: 15px;
    color: var(--color-gray-700);
  }
  @media (min-width: 768px) {
    .vs-search-container__sidebar {
      display: inline-flex;
      flex-direction: column;
    }
    .vs-sidebar-search__result {
    }
    .vs-result-item {
      padding: var(--p-4) 0;
    }
    .vs-items-img {
      height: 180px;
      width: 180px;
      min-width: 180px;
    }
  }
`;
