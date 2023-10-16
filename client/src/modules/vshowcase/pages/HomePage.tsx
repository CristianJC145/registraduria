import AppCard from '../../../shared/components/AppCard/AppCard';
import AppButton from '../../../shared/components/Buttons/AppButton';
import AppCarousel from '../../../shared/components/Carousel/AppCarousel';
import '../css/HomePage.css'
function HomePage() {
  const dynamicImages = [
    'src/assets/images/1.webp',
    'src/assets/images/2.webp',
    'src/assets/images/3.webp',
  ];
  return (
    <>
      <article>
        <AppCarousel interval={5000} images={dynamicImages} />
      </article>
      <article>
        <div className="vs-menu-options">
          <h4 className="vs-menu-title">Recomendado para ti</h4>
          <div className="vs-options">
            <AppButton className='vs-btnOptions' variant='secondary-ghost' label='Favoritos'></AppButton>
            <AppButton className='vs-btnOptions' variant='secondary-ghost' label='Mejor Calificación'></AppButton>
            <AppButton className='vs-btnOptions' variant='secondary-ghost' label='Promociones'></AppButton>
            <AppButton className='vs-btnOptions' variant='secondary-ghost' label='Todos'></AppButton>
          </div>
        </div>
      </article>
      <article>
        <div className="vs-cards">
          <AppCard
            imageSrc="src/assets/images/portatil-1.webp"
            description="Portatil Republic Games | Ryzen 7 7600x"
            price="1.700.000"
            sellerName="PCTELECOMPUTO"
            shippingPrice="Gratis"
          />
          <AppCard
            imageSrc="src/assets/images/iphone.webp"
            description="iPhone 15 Pro Max 1TB - Gris Espacial"
            price="7.600.000"
            sellerName="APPLE STORE"
            shippingPrice="Gratis"
          />
          <AppCard
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="Gratis"
          />
          <AppCard
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="Gratis"
          />
          <AppCard
            imageSrc="src/assets/images/portatil-1.webp"
            description="Descripción del producto"
            price="50.00"
            sellerName="Nombre del Vendedor"
            shippingPrice="5.00"
          />
        </div>
      </article>
    </>
  );
};

export default HomePage;