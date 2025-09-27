import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router';
import Menu from './components/shared/menu.jsx';

export default function App() {
  return (
   <> 
    <BrowserRouter>
      <Menu />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/quienessomos" element={<h1>Sobre Nosotros</h1>} />
          <Route path="*" element={<h1>Error 404 - Página no encontrada</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
    </>
  );
}
