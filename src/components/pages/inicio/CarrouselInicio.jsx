import { Carousel } from "react-bootstrap";

export default function CarrouselInicio() {
  return (
    <Carousel fade interval={3000} className="shadow rounded overflow-hidden">
     
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./canchafutbolimg.jpg" 
          alt="Fútbol 5 Techada"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 5 Techada</h3>
          <p>Ideal para jugar sin preocuparse por la lluvia ☔</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./canchadestechadaimg.jpg"
          alt="Fútbol 5 Descubierta"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 5 Descubierta</h3>
          <p>Al aire libre, con toda la frescura 🌤️</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./f7techada.jpg"
          alt="Fútbol 7 Techada"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 7 Techada</h3>
          <p>Más espacio para partidos épicos ⚡</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src="./f7destechada.jpg"
          alt="Fútbol 7 Descubierta"
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
          <h3>Fútbol 7 Descubierta</h3>
          <p>Juegos al aire libre con toda la adrenalina ⚽</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
