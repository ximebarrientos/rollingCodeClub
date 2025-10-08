import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { obtenerCanchasAPI } from "../../../helpers/canchasAPI";
import { crearTurnoAPI } from "../../../helpers/turnosAPI";
import Swal from "sweetalert2";

const ReservarTurnos = () => {
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState("");
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

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

    const handleReservar = async () => {
        if (!fechaSeleccionada || !horarioSeleccionado) {
            Swal.fire("Error", "Por favor selecciona fecha y horario", "error");
            return;
        }

        const nuevoTurno = {
            fecha: fechaSeleccionada,
            horario: horarioSeleccionado,
            canchaId: canchaSeleccionada._id
        };

        try {
            const respuesta = await crearTurnoAPI(nuevoTurno);
            if (respuesta.ok) {
                Swal.fire("¡Turno reservado!", "Tu turno ha sido confirmado.", "success");
                setShowModal(false);
                setFechaSeleccionada("");
                setHorarioSeleccionado("");
                setCanchaSeleccionada(null);
            } else {
                Swal.fire("Error", "No se pudo reservar el turno", "error");
            }
        } catch (error) {
            console.error("Error al crear turno", error);
            Swal.fire("Error", "Ocurrió un error al reservar", "error");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCanchaSeleccionada(null);
        setFechaSeleccionada("");
        setHorarioSeleccionado("");
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Turno - {canchaSeleccionada?.nombreCancha}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha del Turno</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaSeleccionada}
                                onChange={(e) => setFechaSeleccionada(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Horario Disponible</Form.Label>
                            <Form.Select
                                value={horarioSeleccionado}
                                onChange={(e) => setHorarioSeleccionado(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar horario</option>
                                {canchaSeleccionada?.horariosCancha.map((horario, index) => (
                                    <option key={index} value={horario}>{horario}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleReservar}>
                        Reservar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ReservarTurnos;
