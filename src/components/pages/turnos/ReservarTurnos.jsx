import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Spinner } from "react-bootstrap";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";
import FormularioTurnos from "./FormularioTurnos";

const ReservarTurnos = () => {
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

    useEffect(() => {
        cargarCanchas();
    }, []);

    const cargarCanchas = async () => {
        try {
            const data = await obtenerCanchasAPI();
            setCanchas(data);
        } catch (error) {
            console.error("Error al cargar canchas", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeleccionarCancha = (cancha) => {
        setCanchaSeleccionada(cancha);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCanchaSeleccionada(null);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="info" />
                <p className="mt-3">Cargando canchas...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="text-info text-center mb-4">Reservar Turno</h2>

            {canchas.length === 0 ? (
                <Alert variant="info" className="text-center">
                    No hay canchas disponibles en este momento.
                </Alert>
            ) : (
                <Row>
                    {canchas.map((cancha) => (
                        <Col key={cancha._id} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Img variant="top" src={cancha.imagenCancha} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-info">{cancha.nombreCancha}</Card.Title>
                                    <Card.Text>
                                        <strong>Categoría:</strong> {cancha.categoriaCancha}<br />
                                        <strong>Horarios:</strong> {cancha.horariosCancha.join(", ")}<br />
                                        <strong>Precio:</strong> ${cancha.precioCancha}
                                    </Card.Text>
                                    <Button
                                        variant="outline-info"
                                        className="mt-auto"
                                        onClick={() => handleSeleccionarCancha(cancha)}
                                    >
                                        Reservar Turno
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <FormularioTurnos
                show={showModal}
                onHide={handleCloseModal}
                cancha={canchaSeleccionada}
            />
        </Container>
    );
};

export default ReservarTurnos;
