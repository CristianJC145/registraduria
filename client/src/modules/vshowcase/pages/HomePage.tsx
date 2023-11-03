import CardProducts from '../components/CardProducts';
import AppCarousel from '../../../shared/components/Carousel/AppCarousel';
import ButtonCategories from '../components/ButtonCategories';
import { ButtonProvider } from '../../../shared/contexts/ButtonContext';
import '../css/HomePage.css'
function HomePage() {
  const dynamicImages = [
    'src/assets/images/1.webp',
    'src/assets/images/2.webp',
    'src/assets/images/3.webp',
  ];
  return (
    <ButtonProvider>
      <article>
        <AppCarousel interval={5000} images={dynamicImages} />
      </article>
      <article>
        <div className="vs-menu-options">
          <h4 className="vs-menu-title">Recomendado para ti</h4>
          <div className="vs-options">
            <ButtonCategories label="Todos" icon="fa-gem" ariaLabel="Button all"></ButtonCategories>
            <ButtonCategories label="Favoritos" icon="fa-heart" ariaLabel="Button favorite"></ButtonCategories>
            <ButtonCategories label="Mejor Calificacion" icon="fa-star" ariaLabel="Button best score "></ButtonCategories>
            <ButtonCategories label="Promociones" icon="fa-tag" ariaLabel="Button promotions"></ButtonCategories>
          </div>
        </div>
      </article>
      <article>
        <div className="vs-cards">
          <CardProducts
            imageSrc="src/assets/images/portatil-1.webp"
            description="Portatil Republic Games | Ryzen 7 7600x"
            price="1.700.000"
            sellerName="PCTELECOMPUTO"
            shippingPrice="Gratis"
          />
          <CardProducts
            imageSrc="src/assets/images/iphone.webp"
            description="iPhone 15 Pro Max 1TB - Gris Espacial"
            price="7.600.000"
            sellerName="APPLE STORE"
            shippingPrice="Gratis"
          />
          <CardProducts
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="Gratis"
          />
          <CardProducts
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="Gratis"
          />
          <CardProducts
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="5.00"
          />
        </div>
      </article>
    </ButtonProvider>
  );
};

export default HomePage;