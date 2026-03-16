import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';

// Pages
import Login from './pages/Login';
import DashboardAlumno from './pages/alumno/DashboardAlumno';
import PerfilAlumno from './pages/alumno/PerfilAlumno';
import DashboardEmpresa from './pages/empresa/DashboardEmpresa';
import PerfilEmpresa from './pages/empresa/PerfilEmpresa';
import Tecnologias from './pages/admin/Tecnologias';

// Ofertas
import CrearOferta from './pages/empresa/CrearOferta';
import ValidarOfertas from './pages/admin/ValidarOfertas';
import BuscadorOfertas from './pages/alumno/BuscadorOfertas';

// Helper Wrapper
const MainLayout = ({ children }) => <><Navbar />{children}</>;

function App() {
  const { user } = useAuth();
  const isAdmin = user?.hasOwnProperty('id_admin');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      {isAdmin && (
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Tecnologias />} />
          <Route path="/admin/tecnologias" element={<Tecnologias />} />
          <Route path="/admin/ofertas/validar" element={<ValidarOfertas />} />
        </Route>
      )}

      {/* USUARIOS */}
      {!isAdmin && (
        <>
          <Route path="/dashboard" element={
            <MainLayout>
              {user?.hasOwnProperty('id_alumno') ? <DashboardAlumno /> : <DashboardEmpresa />}
            </MainLayout>
          } />
          <Route path="/alumno/perfil" element={<MainLayout><PerfilAlumno /></MainLayout>} />
          <Route path="/empresa/perfil" element={<MainLayout><PerfilEmpresa /></MainLayout>} />
          <Route path="/empresa/ofertas/crear" element={<MainLayout><CrearOferta /></MainLayout>} />

          <Route path="/ofertas" element={<MainLayout><BuscadorOfertas /></MainLayout>} />
        </>
      )}

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;