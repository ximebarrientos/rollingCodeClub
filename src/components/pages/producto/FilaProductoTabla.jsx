import { Button } from "react-bootstrap";

const FilaProductoTabla = () => {
    return (
        <tr >
            <td>Musculosa fluor</td>
            <td>50</td>
            <td>Indumentaria</td>
            <td>
              <Button size="sm" variant="warning" className="me-2">
                Editar
              </Button>
              <Button
                size="sm"
                variant="danger"
              >
                Borrar
              </Button>
            </td>
          </tr>
    );
};

export default FilaProductoTabla;