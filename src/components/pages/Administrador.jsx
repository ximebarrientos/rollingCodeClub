import { useState } from "react";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import TablaProducto from "./producto/TablaProducto";
import TablaUsuario from "./usuario/TablaUsuario";
import TablaCancha from "./cancha/TablaCancha";
import TablaTurnos from "./turnos/TablaTurnos";
import FormularioProducto from "./producto/FormularioProducto";
import { useOutletContext } from "react-router";

const Administrador = () => {
  const { usuarioLogueado } = useOutletContext();
  const [seleccion, setSeleccion] = useState("productos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);

  const renderContenido = () => {
    switch (seleccion) {
      case "productos":
        if (mostrarFormulario) {
          return (
            <FormularioProducto
              setMostrarFormulario={setMostrarFormulario}
              productoEditado={productoEditado}
              setProductoEditado={setProductoEditado}
            />
          );
        }
        return (
          <TablaProducto
            setMostrarFormulario={setMostrarFormulario}
            setProductoEditado={setProductoEditado}
            usuarioLogueado={usuarioLogueado}
          />
        );

      case "usuarios":
        return <TablaUsuario usuarioLogueado={usuarioLogueado} />;

      case "canchas":
        return <TablaCancha usuarioLogueado={usuarioLogueado} />;

      case "turnos":
        return <TablaTurnos usuarioLogueado={usuarioLogueado} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="my-4">
      <h2>Administrador</h2>
      <Row>
        <Col md={3} className="mb-3 mb-md-0">
          <ListGroup>
            <ListGroup.Item
              action
              active={seleccion === "productos"}
              onClick={() => {
                setSeleccion("productos");
                setMostrarFormulario(false);
              }}
            >
              Productos
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={seleccion === "usuarios"}
              onClick={() => setSeleccion("usuarios")}
            >
              Usuarios
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={seleccion === "canchas"}
              onClick={() => setSeleccion("canchas")}
            >
              Canchas de fútbol
            </ListGroup.Item>
            <ListGroup.Item
              action
              active={seleccion === "turnos"}
              onClick={() => setSeleccion("turnos")}
            >
              Turnos Ocupados
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={9}>{renderContenido()}</Col>
      </Row>
    </Container>
  );
};

export default Administrador;
