
import { BrowserRouter, Route, Routes } from 'react-router';
import Footer from './components/shared/Footer.jsx';
import Menu from './components/shared/Menu.jsx';
import Inicio from './components/pages/Inicio.jsx';
import FormularioTurnos from './components/pages/turnos/FormularioTurnos.jsx';
import Tienda from './components/pages/Tienda.jsx';
import Contacto from './components/pages/Contacto.jsx';
import QuienesSomos from './components/pages/QuienesSomos.jsx';
import Administrador from './components/pages/Administrador.jsx';
import Error404 from './components/pages/Error404.jsx';
import Login from './components/pages/Login.jsx';
import Registro from './components/pages/usuario/Registro.jsx';



function App() {
  
  return (
    <>
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path='/' element={<Inicio/>}></Route>
          <Route path='/turnos' element={<FormularioTurnos/>}></Route>
          <Route path='/tienda' element={<Tienda/>}></Route>
          <Route path='/contacto' element={<Contacto/>}></Route>
          <Route path='/sobre-nosotros' element={<QuienesSomos/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/registro' element={<Registro/>}></Route>
          <Route path='/administrador' element={<Administrador/>}></Route>
          <Route path='*' element={<Error404/>}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;

