import { useEffect, useState } from "react";
import CardProducts from "../components/CardProducts";
import AppCarousel from "../../../shared/components/Carousel/AppCarousel";
import ButtonCategories from "../components/ButtonCategories";
import styled from "styled-components";

import { ButtonProvider } from "../../../shared/contexts/ButtonContext";
import { GetAllProductsService } from "../services/getAllProducts.service";
import { services } from "../../../shared/constant/services";

const getAllProductsService = new GetAllProductsService();

function HomePage() {
  const [products, setProducts] = useState<any>({});

  const fetchProducts = async () => {
    const response = await getAllProductsService.run();
    const { data } = response;
    console.log();
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
    return text.length > 45 ? `${text.slice(0, 45)}...` : text;
  }

  function formattedPrice(price: number | bigint) {
    return new Intl.NumberFormat("es-ES").format(price);
  }
  const dynamicImages = [
    "src/assets/images/1.webp",
    "src/assets/images/2.webp",
    "src/assets/images/3.webp",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ButtonProvider>
      <HomePageStyles>
        <article>
          <AppCarousel interval={5000} images={dynamicImages} />
        </article>
        <article>
          <div className="vs-menu-options">
            <h4 className="vs-menu-title">Recomendado para ti</h4>
            <div className="vs-options">
              <ButtonCategories
                label="Todos"
                icon="fa-gem"
                ariaLabel="Button all"
              ></ButtonCategories>
              <ButtonCategories
                label="Favoritos"
                icon="fa-heart"
                ariaLabel="Button favorite"
              ></ButtonCategories>
              <ButtonCategories
                label="Mejor Calificacion"
                icon="fa-star"
                ariaLabel="Button best score "
              ></ButtonCategories>
              <ButtonCategories
                label="Promociones"
                icon="fa-tag"
                ariaLabel="Button promotions"
              ></ButtonCategories>
            </div>
          </div>
        </article>
        <article>
          <div className="vs-cards">
            {Object.keys(products).length > 0 && (
              <>
                {products.map((product: any, index: number) => (
                  <CardProducts
                    key={index + 1}
                    imageSrc={product.images[0]}
                    description={truncateName(product.product_name)}
                    price={formattedPrice(product.price)}
                    sellerName={product.user_name}
                    shippingPrice="Gratis"
                    url={{
                      pathname: `/${encodeURIComponent(product.product_name)}/${
                        product.id
                      }`,
                      state: { product },
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </article>
      </HomePageStyles>
    </ButtonProvider>
  );
}

export default HomePage;

const HomePageStyles = styled.div`
  .vs-menu-options {
    margin: 1.5rem 0 0;
  }
  .vs-menu-title {
    font-weight: 600;
    color: #2d2f31;
  }
  .vs-options {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding: var(--p-6) 0;
  }
  .vs-options::-webkit-scrollbar {
    display: none;
  }
  .vs-btnOptions {
    font-weight: 600;
  }
  .vs-cards {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 40%), 1fr));
    padding-bottom: var(--p-6);
  }

  @media (min-width: 768px) {
    .vs-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 30%), 1fr));
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
  }
  @media (min-width: 992px) {
    .vs-menu-options {
      margin: 1.5rem 1.5rem 1rem;
    }
    .vs-cards {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 20%), 1fr));
    }
  }
  @media (min-width: 1200px) {
    .vs-cards {
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 18%), 1fr));
      gap: 1.5rem;
    }
  }
`;
