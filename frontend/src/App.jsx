import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginUsuario from './pages/LoginUsuario';
import Registro     from './pages/Registro';
import Inicio       from './pages/Inicio';

function Protegida({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<LoginUsuario />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio"   element={<Protegida><Inicio /></Protegida>} />
        <Route path="*"         element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
