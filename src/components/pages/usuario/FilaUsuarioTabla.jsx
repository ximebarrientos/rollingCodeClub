import { Button } from "react-bootstrap";

const FilaUsuarioTabla = () => {
    return (
        <tr>
          <td>JosePerez</td>
          <td>joseperez@mail.com</td>
          <td>
            <Button size="sm" variant="success">Activo</Button>
          </td>
        </tr>
    );
};

export default FilaUsuarioTabla;