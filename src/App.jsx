import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';

// Páginas (Auth & Generales)
import Login from './pages/Login';

// Páginas (Admin)
import Tecnologias from './pages/admin/Tecnologias';
import ValidarOfertas from './pages/admin/ValidarOfertas';

// Páginas (Alumno)
import DashboardAlumno from './pages/alumno/DashboardAlumno';
import PerfilAlumno from './pages/alumno/PerfilAlumno';
import BuscadorOfertas from './pages/alumno/BuscadorOfertas';
import DetalleOferta from './pages/alumno/DetalleOferta'; // NUEVO SPRINT 4
import MisCandidaturas from './pages/alumno/MisCandidaturas'; // NUEVO SPRINT 4

// Páginas (Empresa)
import DashboardEmpresa from './pages/empresa/DashboardEmpresa';
import PerfilEmpresa from './pages/empresa/PerfilEmpresa'; // DEL SPRINT 3.5
import CrearOferta from './pages/empresa/CrearOferta';
import GestionCandidatos from './pages/empresa/GestionCandidatos'; // NUEVO SPRINT 4


const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  const { user } = useAuth();

  // Helpers para detectar roles
  const isAdmin = user?.hasOwnProperty('id_admin');
  const isAlumno = user?.hasOwnProperty('id_alumno');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* =======================
          RUTAS ADMIN (Sidebar)
          ======================= */}
      {isAdmin && (
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<ValidarOfertas />} />
          <Route path="/admin/tecnologias" element={<Tecnologias />} />
          <Route path="/admin/ofertas/validar" element={<ValidarOfertas />} />
        </Route>
      )}

      {/* =======================
          RUTAS USUARIOS (Navbar)
          ======================= */}
      {!isAdmin && (
        <>
          {/* Dashboard dinámico según rol */}
          <Route path="/dashboard" element={
            <MainLayout>
              {isAlumno ? <DashboardAlumno /> : <DashboardEmpresa />}
            </MainLayout>
          } />

          {/* --- Rutas exclusivas Alumno --- */}
          <Route path="/alumno/perfil" element={<MainLayout><PerfilAlumno /></MainLayout>} />
          <Route path="/ofertas" element={<MainLayout><BuscadorOfertas /></MainLayout>} />
          <Route path="/ofertas/:id" element={<MainLayout><DetalleOferta /></MainLayout>} /> {/* SPRINT 4 */}
          <Route path="/mis-candidaturas" element={<MainLayout><MisCandidaturas /></MainLayout>} /> {/* SPRINT 4 */}

          {/* --- Rutas exclusivas Empresa --- */}
          <Route path="/empresa/perfil" element={<MainLayout><PerfilEmpresa /></MainLayout>} />
          <Route path="/empresa/ofertas/crear" element={<MainLayout><CrearOferta /></MainLayout>} />
          <Route path="/empresa/ofertas/:id_oferta/candidatos" element={<MainLayout><GestionCandidatos /></MainLayout>} /> {/* SPRINT 4 */}
        </>
      )}

      {/* Ruta por defecto (Fallback) */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;