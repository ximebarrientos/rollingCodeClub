import { Container } from "react-bootstrap";
import CarrouselInicio from "./CarrouselInicio";
import SacarTurnoInicio from "./SacarTurnoInicio";
import SponsorsInicio from "./SponsorsInicio";
import ProductosInicio from "./ProductosInicio";

export default function Inicio() {
  return (
    <div className="bg-dark text-light py-5">
      <Container>
        <CarrouselInicio />
        <SacarTurnoInicio />
        <ProductosInicio />
       <SponsorsInicio /> 
      </Container>
    </div>
  );
}
