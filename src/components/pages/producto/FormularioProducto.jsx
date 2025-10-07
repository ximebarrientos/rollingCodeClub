import { useEffect, useState } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import { crearProducto, editarProducto } from "../../../helpers/queries.js";

const FormularioProducto = ({
  setMostrarFormulario,
  productoEditado,
  setProductoEditado,
}) => {
  const [formData, setFormData] = useState({
    nombreProducto: "",
    precio: "",
    categoria: "",
    subcategoria: "",
    descripcion: "",
    imagen: "",
    tallesTexto: "",
    numerosTexto: "",
  });

  useEffect(() => {
    if (productoEditado) {
      setFormData({
        nombreProducto: productoEditado.nombreProducto || "",
        precio: productoEditado.precio || "",
        categoria: productoEditado.categoria || "",
        subcategoria: productoEditado.subcategoria || "",
        descripcion: productoEditado.descripcion || "",
        imagen: productoEditado.imagen || "",
        tallesTexto: productoEditado.talles
          ? productoEditado.talles.join(", ")
          : "",
        numerosTexto: productoEditado.numeros
          ? productoEditado.numeros.join(", ")
          : "",
      });
    }
  }, [productoEditado]);

  const subcategoriasPorCategoria = {
    Indumentaria: ["Camisetas", "Shorts", "Botines"],
    Accesorios: ["Kits de entrenamiento", "Pelotas"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatoValido = /\.(jpg|jpeg|png|webp)$/i.test(formData.imagen);
    if (!formatoValido) {
      alert("❌ La imagen debe tener formato .jpg, .jpeg, .png o .webp");
      return;
    }

    const productoAEnviar = {
      ...formData,
      talles: formData.tallesTexto
        ? formData.tallesTexto
            .split(",")
            .map((v) => v.trim().toUpperCase()) 
            .filter((v) => v !== "")
        : [],
      numeros: formData.numerosTexto
        ? formData.numerosTexto
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v !== "")
        : [],
    };

    delete productoAEnviar.tallesTexto;
    delete productoAEnviar.numerosTexto;

    const respuesta = productoEditado
      ? await editarProducto(productoEditado._id, productoAEnviar)
      : await crearProducto(productoAEnviar);

    if (respuesta && respuesta.ok) {
      alert(
        productoEditado
          ? "✅ Producto editado con éxito"
          : "✅ Producto creado con éxito"
      );

      setFormData({
        nombreProducto: "",
        precio: "",
        categoria: "",
        subcategoria: "",
        descripcion: "",
        imagen: "",
        tallesTexto: "",
        numerosTexto: "",
      });
      setProductoEditado(null);
      setMostrarFormulario(false);
    } else {
      alert("❌ Error al guardar el producto. Revisa los datos.");
    }
  };

  return (
    <div>
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-success text-center display-5 mb-4">
              {productoEditado ? "Editar producto" : "Cargar producto"}
            </h2>

            <Form.Group className="mb-3" controlId="nombreProducto">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                name="nombreProducto"
                placeholder="Ingrese el nombre del producto"
                className="bg-primary text-light"
                value={formData.nombreProducto}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={100}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="precioProducto">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                placeholder="Ingrese el precio del producto"
                className="bg-primary text-light"
                value={formData.precio}
                onChange={handleChange}
                required
                min={50}
                max={1000000}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="categoriaProducto">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoria"
                className="bg-primary text-light"
                value={formData.categoria}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    categoria: e.target.value,
                    subcategoria: "",
                    tallesTexto: "",
                    numerosTexto: "",
                  });
                }}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Accesorios">Accesorios</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="subcategoriaProducto">
              <Form.Label>Subcategoría</Form.Label>
              <Form.Select
                name="subcategoria"
                className="bg-primary text-light"
                value={formData.subcategoria}
                onChange={handleChange}
                required
                disabled={!formData.categoria}
              >
                <option value="">Seleccionar</option>
                {formData.categoria &&
                  subcategoriasPorCategoria[formData.categoria].map(
                    (sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    )
                  )}
              </Form.Select>
            </Form.Group>

            {formData.categoria === "Indumentaria" && (
              <>
                {["Camisetas", "Shorts"].includes(formData.subcategoria) && (
                  <Form.Group className="mb-3" controlId="tallesProducto">
                    <Form.Label>Talles (separados por coma)</Form.Label>
                    <Form.Control
                      type="text"
                      name="tallesTexto"
                      placeholder="Ejemplo: S, M, L, XL"
                      className="bg-primary text-light"
                      value={formData.tallesTexto}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                      Se convertirán automáticamente a mayúsculas.
                    </Form.Text>
                  </Form.Group>
                )}

                {formData.subcategoria === "Botines" && (
                  <Form.Group className="mb-3" controlId="numerosProducto">
                    <Form.Label>Números (separados por coma)</Form.Label>
                    <Form.Control
                      type="text"
                      name="numerosTexto"
                      placeholder="Ejemplo: 38, 39, 40, 41"
                      className="bg-primary text-light"
                      value={formData.numerosTexto}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )}
              </>
            )}

            <Form.Group className="mb-3" controlId="descripcionProducto">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                rows={3}
                placeholder="Ingrese una descripción del producto"
                className="bg-primary text-light"
                value={formData.descripcion}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={500}
              />
            </Form.Group>

            {/* Imagen local (maquetada para futuro Cloudinary) */}
            <Form.Group className="mb-3" controlId="imagenLocal">
              <Form.Label>Subir imagen (opcional, futura integración)</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="bg-primary text-light"
                disabled // 🔒 por ahora solo visual
              />
              <Form.Text className="text-warning">
                Próximamente podrás subir imágenes directamente desde tu equipo.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="imagenProducto">
              <Form.Label>URL de imagen del producto</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                placeholder="Pegue la URL (https://...)"
                className="bg-primary text-light"
                value={formData.imagen}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={() => {
                  setMostrarFormulario(false);
                  setProductoEditado(null);
                }}
              >
                Cancelar
              </Button>

              <Button variant="success" type="submit">
                {productoEditado ? "Guardar cambios" : "Cargar producto"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default FormularioProducto;
