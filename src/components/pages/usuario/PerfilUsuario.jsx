import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Container,
  Alert,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { editarUsuario } from "../../../helpers/usuariosAPI";

const PerfilUsuario = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("Datos de usuario para precarga:", usuarioLogueado);
    if (usuarioLogueado && usuarioLogueado.token) {
      let fechaNac = usuarioLogueado.fechaNacimiento;

      if (fechaNac && fechaNac.includes("T")) {
        fechaNac = fechaNac.split("T")[0];
      }

      const [anio, mes, dia] = (fechaNac || "----").split("-");

      setValue("nombreUsuario", usuarioLogueado.nombreUsuario || "");
      setValue("nombre", usuarioLogueado.nombre || "");
      setValue("apellido", usuarioLogueado.apellido || "");
      setValue("genero", usuarioLogueado.genero || "");
      setValue("celular", usuarioLogueado.celular || "");
      setValue("correoElectronico", usuarioLogueado.correoElectronico || "");

      setValue("anio", anio || "");

      setValue("mes", mes || "");

      const diaSinCero = dia ? parseInt(dia).toString() : "";
      setValue("dia", diaSinCero);
    }
  }, [usuarioLogueado, setValue]);

  const submitEdicion = async (datosFormulario) => {
    setCargando(true);

    const { anio, mes, dia, ...resto } = datosFormulario;

    const diaAjustado = String(dia).padStart(2, "0");
    const fechaNacimiento = `${anio}-${mes}-${diaAjustado}`;

    const datosFinales = {
      ...resto,
      fechaNacimiento: fechaNacimiento,
    };

    try {
      const respuesta = await editarUsuario(
        usuarioLogueado.id,
        datosFinales,
        usuarioLogueado.token
      );

      if (respuesta.ok) {
        const usuarioActualizado = await respuesta.json();

        const nuevoUsuarioLogueado = {
          ...usuarioLogueado,
          ...usuarioActualizado.usuario,
          token: usuarioLogueado.token,
        };
        sessionStorage.setItem("userKey", JSON.stringify(nuevoUsuarioLogueado));
        setUsuarioLogueado(nuevoUsuarioLogueado);

        Swal.fire({
          title: "Actualizado",
          text: "Tu perfil se ha guardado correctamente.",
          icon: "success",
          background: "#212529",
          color: "#fff",
        });
        setEditando(false);
      } else {
        const datosError = await respuesta.json();
        Swal.fire(
          "Error",
          datosError.mensaje || "Error al actualizar el perfil.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
      Swal.fire({
        title: "Error Grave",
        text: "No se pudo conectar con el servidor para actualizar.",
        icon: "error",
        background: "#212529",
        color: "#fff",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <Container className="my-5 px-4 border border-1 rounded-4 border-secondary">
        <h2 className="text-center my-4 text-success">
          <i className="bi bi-person-circle fs-1 me-2"></i>
          Mi Perfil
          <Button
            variant={editando ? "secondary" : "warning"}
            size="sm"
            onClick={() => {
              setEditando(!editando);
            }}
            className="float-end mt-1"
          >
            {editando ? "Cancelar" : "Editar Datos"}
          </Button>
        </h2>

        {editando ? (
          <Form onSubmit={handleSubmit(submitEdicion)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="formNombreUsuario">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  className="bg-primary text-success"
                  {...register("nombreUsuario", {
                    required: "El nombre de usuario es obligatorio",
                    minLength: { value: 4, message: "Mínimo 4 caracteres" },
                    maxLength: { value: 20, message: "Máximo 20 caracteres" },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.nombreUsuario?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formNombre">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  className="bg-primary text-success"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.nombre?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  className="bg-primary text-success"
                  {...register("apellido", {
                    required: "El apellido es obligatorio",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.apellido?.message}
                </Form.Text>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Group as={Col} md="4" controlId="formFechaAnio">
                <Form.Select
                  className="bg-primary text-success"
                  {...register("anio", {
                    required: "Seleccionar Año es obligatorio",
                  })}
                >
                  <option value="">Año</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.anio?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formFechaMes">
                <Form.Select
                  className="bg-primary text-success"
                  {...register("mes", {
                    required: "Seleccionar Mes es obligatorio",
                  })}
                >
                  <option value="">Mes</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.mes?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="formFechaDia">
                <Form.Select
                  className="bg-primary text-success"
                  {...register("dia", {
                    required: "Seleccionar Día es obligatorio",
                  })}
                >
                  <option value="">Día</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.dia?.message}
                </Form.Text>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGenero">
                <Form.Label>Género</Form.Label>
                <Form.Select
                  className="bg-primary text-success"
                  {...register("genero", {
                    required: "El género es obligatorio",
                  })}
                >
                  <option value=""></option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="No Binario">No Binario</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.genero?.message}
                </Form.Text>
              </Form.Group>

              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="formCelular"
              >
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  className="bg-primary text-success"
                  type="number"
                  {...register("celular", {
                    required: "El celular es obligatorio",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Número de celular inválido (ej: 3811234567)",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.celular?.message}
                </Form.Text>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formCorreoElectronico">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                className="bg-primary text-success"
                type="email"
                {...register("correoElectronico", {
                  required: "El email es obligatorio",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message: "El email debe tener un formato válido.",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.correoElectronico?.message}
              </Form.Text>
            </Form.Group>

            <div className="d-grid my-4 ">
              <Button
                variant="success"
                type="submit"
                size="lg"
                disabled={cargando}
              >
                {cargando ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </Form>
        ) : (
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Usuario</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.nombreUsuario}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Nombre</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.nombre}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Apellido</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.apellido}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Fecha de Nacimiento</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.fechaNacimiento.split("T")[0]}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Género</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.genero}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Celular</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.celular}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-success">
                <CardBody>
                  <CardTitle>Correo Electrónico</CardTitle>
                  <CardText className="text-success">
                    {usuarioLogueado.correoElectronico}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PerfilUsuario;
