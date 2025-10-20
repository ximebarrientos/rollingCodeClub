import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Button, Col } from "react-bootstrap";
import { crearProducto, editarProducto } from "../../../helpers/queries";
import Swal from "sweetalert2";

const FormularioProducto = ({
  setMostrarFormulario,
  productoEditado,
  setProductoEditado,
}) => {
  const [preview, setPreview] = useState("");
  const [imagenActual, setImagenActual] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    resetField,
    watch,
  } = useForm();

const categoriaActual = watch("categoria");
const subcategoriaActual = watch("subcategoria");

useEffect(() => {

  if (categoriaActual === "Accesorios") {
    resetField("tallesTexto");
    resetField("numerosTexto");
  }

  if (categoriaActual === "Indumentaria") {
    if (!["Camisetas", "Shorts"].includes(subcategoriaActual)) {
      resetField("tallesTexto");
    }
    if (subcategoriaActual !== "Botines") {
      resetField("numerosTexto");
    }
  }
}, [categoriaActual, subcategoriaActual, resetField]);

  const subcategoriasPorCategoria = {
    Indumentaria: ["Camisetas", "Shorts", "Botines"],
    Accesorios: ["Kits de entrenamiento", "Pelotas"],
  };

  useEffect(() => {
    if (productoEditado) {
      setValue("nombreProducto", productoEditado.nombreProducto);
      setValue("precio", productoEditado.precio);
      setValue("categoria", productoEditado.categoria);
      setValue("subcategoria", productoEditado.subcategoria);
      setValue("descripcion", productoEditado.descripcion);
      if (productoEditado.talles) {
        setValue("tallesTexto", productoEditado.talles.join(", "));
      }
      if (productoEditado.numeros) {
        setValue("numerosTexto", productoEditado.numeros.join(", "));
      }
      setImagenActual(productoEditado.imagen);
    } else {
      reset();
      setPreview("");
      setImagenActual("");
    }
  }, [productoEditado, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombreProducto", data.nombreProducto);
      formData.append("precio", data.precio);
      formData.append("categoria", data.categoria);
      formData.append("subcategoria", data.subcategoria);
      formData.append("descripcion", data.descripcion);

      if (data.tallesTexto) {
        const tallesArray = data.tallesTexto
          .split(",")
          .map((t) => t.trim().toUpperCase())
          .filter((t) => t !== "");
        tallesArray.forEach((talle) => formData.append("talles", talle));
      }

      if (data.numerosTexto) {
        const numerosArray = data.numerosTexto
          .split(",")
          .map((n) => n.trim())
          .filter((n) => n !== "");
        numerosArray.forEach((num) => formData.append("numeros", num));
      }

      if (data.imagen && data.imagen[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      const respuesta = productoEditado
        ? await editarProducto(productoEditado._id, formData)
        : await crearProducto(formData);

      if (!respuesta) throw new Error("No se pudo conectar con el servidor.");

      if (respuesta.ok) {
        Swal.fire({
          title: productoEditado
            ? "Producto editado con éxito"
            : "Producto creado con éxito",
          icon: "success",
          confirmButtonColor: "#198754",
          timer: 2000,
          background: "#212529",
          color: "#fff",
        });

        reset();
        setPreview("");
        setImagenActual("");
        setProductoEditado(null);
        setMostrarFormulario(false);
        return;
      }

      let mensajeError = "Ocurrió un error al procesar el producto.";
      try {
        const errorData = await respuesta.json();
        if (errorData.errores && Array.isArray(errorData.errores)) {
          mensajeError = errorData.errores[0]?.msg || mensajeError;
        } else if (errorData.mensaje) {
          mensajeError = errorData.mensaje;
        } else {
          const textoPlano = JSON.stringify(errorData).toLowerCase();
          if (
            textoPlano.includes("e11000") ||
            textoPlano.includes("duplicate") ||
            textoPlano.includes("unique")
          ) {
            mensajeError = "Ya existe un producto con este nombre.";
          }
        }
      } catch {
        mensajeError = "Error al procesar la respuesta del servidor.";
      }

      Swal.fire({
        title: "Error",
        text: mensajeError,
        icon: "error",
        confirmButtonColor: "#d33",
        background: "#212529",
        color: "#fff",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Ocurrió un error al procesar el producto.",
        icon: "error",
        confirmButtonColor: "#d33",
        background: "#212529",
        color: "#fff",
      });
    }
  };

  return (
    <div>
      <Row className="justify-content-center mb-5">
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-success text-center display-5 mb-4">
              {productoEditado ? "Editar producto" : "Cargar producto"}
            </h2>

            <Form.Group className="mb-3">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del producto"
                className="bg-primary text-light"
                {...register("nombreProducto", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nombreProducto?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese el precio"
                className="bg-primary text-light"
                {...register("precio", {
                  required: "El precio es obligatorio",
                  min: { value: 50, message: "Mínimo 50" },
                  max: { value: 1000000, message: "Máximo 1.000.000" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.precio?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                className="bg-primary text-light"
                {...register("categoria", {
                  required: "Seleccione una categoría",
                })}
              >
                <option value="">Seleccionar</option>
                <option value="Indumentaria">Indumentaria</option>
                <option value="Accesorios">Accesorios</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.categoria?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subcategoría</Form.Label>
              <Form.Select
                className="bg-primary text-light"
                {...register("subcategoria", {
                  required: "Seleccione una subcategoría",
                })}
                disabled={!watch("categoria")}
              >
                <option value="">Seleccionar</option>
                {watch("categoria") &&
                  subcategoriasPorCategoria[watch("categoria")]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.subcategoria?.message}
              </Form.Text>
            </Form.Group>

            {watch("categoria") === "Indumentaria" && (
              <>
                {["Camisetas", "Shorts"].includes(watch("subcategoria")) && (
                  <Form.Group className="mb-3">
                    <Form.Label>Talles (separados por coma)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ejemplo: S, M, L, XL"
                      className="bg-primary text-light"
                      {...register("tallesTexto")}
                    />
                    <Form.Text className="text-muted">
                      Se convertirán automáticamente a mayúsculas.
                    </Form.Text>
                  </Form.Group>
                )}

                {watch("subcategoria") === "Botines" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Números (separados por coma)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ejemplo: 38, 39, 40, 41"
                      className="bg-primary text-light"
                      {...register("numerosTexto")}
                    />
                  </Form.Group>
                )}
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese una descripción"
                className="bg-primary text-light"
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.descripcion?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Imagen del producto</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                {...register("imagen", {
                  required: !productoEditado
                    ? "La imagen es obligatoria"
                    : false,
                  validate: {
                    fileSize: (files) =>
                      !files[0] ||
                      files[0].size <= 2 * 1024 * 1024 ||
                      "La imagen no debe superar los 2MB.",
                  },
                })}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  } else {
                    setPreview("");
                  }
                }}
              />

              {(preview || imagenActual) && (
                <div className="mb-2 position-relative d-inline-block mt-3">
                  <img
                    className="rounded-3 img-preview"
                    src={preview || imagenActual}
                    alt="Vista previa"
                    width={200}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                    onClick={() => {
                      setPreview("");
                      setImagenActual("");
                      resetField("imagen");
                    }}
                  >
                    <i className="bi bi-x fs-5 text-danger"></i>
                  </Button>
                </div>
              )}

              <Form.Text className="text-danger">
                {errors.imagen?.message}
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
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
