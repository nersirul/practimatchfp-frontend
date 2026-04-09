import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/Navbar';
import AdminLayout from './components/AdminLayout';

// Páginas (Auth & Generales)
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import ComoFunciona from './pages/ComoFunciona';
import InfoAlumnos from './pages/InfoAlumnos';
import InfoEmpresas from './pages/InfoEmpresas';

// Páginas (Admin)
import DashboardAdmin from './pages/admin/DashboardAdmin';
import Tecnologias from './pages/admin/Tecnologias';
import ValidarOfertas from './pages/admin/ValidarOfertas';
import ValidarEmpresas from './pages/admin/ValidarEmpresas';
import GestionUsuarios from './pages/admin/GestionUsuarios';

// Páginas (Alumno)
import DashboardAlumno from './pages/alumno/DashboardAlumno';
import PerfilAlumno from './pages/alumno/PerfilAlumno';
import BuscadorOfertas from './pages/alumno/BuscadorOfertas';
import DetalleOferta from './pages/alumno/DetalleOferta'; 
import MisCandidaturas from './pages/alumno/MisCandidaturas'; 

// Páginas (Empresa)
import DashboardEmpresa from './pages/empresa/DashboardEmpresa';
import PerfilEmpresa from './pages/empresa/PerfilEmpresa'; 
import CrearOferta from './pages/empresa/CrearOferta';
import GestionCandidatos from './pages/empresa/GestionCandidatos'; 

// Páginas (Profesor)
import DashboardProfesor from './pages/profesor/DashboardProfesor';

/**
 * MainLayout - Plantilla estándar orientada a usuarios comunes.
 * Incluye la cabecera / Navbar por defecto.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children Contenidos de la ruta
 * @returns {React.ReactElement}
 */
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

/**
 * Raíz de Enrutamiento de la Aplicación.
 * Contiene la semántica y jerarquía de Rutas de todo el Frontend.
 * Incorpora un diseño responsivo basado en el perfil del usuario actual (AuthContext).
 * 
 * @returns {React.ReactElement}
 */
function App() {
  const { user } = useAuth();

  // Diccionario de flags para mapeo de renderizado condicional por rol
  const isAdmin = user?.hasOwnProperty('id_admin');
  const isAlumno = user?.hasOwnProperty('id_alumno');
  const isProfesor = user?.hasOwnProperty('id_profesor');

  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/registro" element={<MainLayout><Registro /></MainLayout>} />
      <Route path="/como-funciona" element={<MainLayout><ComoFunciona /></MainLayout>} />
      <Route path="/info-alumnos" element={<MainLayout><InfoAlumnos /></MainLayout>} />
      <Route path="/info-empresas" element={<MainLayout><InfoEmpresas /></MainLayout>} />

      {/* =======================
          Árbol Privado: Administrador
          Usa un Layout diferenciado (AdminLayout con Sidebar lateral)
          ======================= */}
      {isAdmin && (
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/tecnologias" element={<Tecnologias />} />
          <Route path="/admin/ofertas/validar" element={<ValidarOfertas />} />
          <Route path="/admin/empresas/validar" element={<ValidarEmpresas />} />
          <Route path="/admin/usuarios" element={<GestionUsuarios />} />
        </Route>
      )}

      {/* =======================
          Árbol Privado: Clientes (Alumno, Empresa, Profesor)
          Usan el Layout estándar con el nav horizontal.
          ======================= */}
      {!isAdmin && (
        <>
          {/* Dispatcher Inteligente de Dashboard según quien logueó */}
          <Route path="/dashboard" element={
            <MainLayout>
               {!user ? <Navigate to="/login" /> : (
                 isProfesor ? <DashboardProfesor /> : (isAlumno ? <DashboardAlumno /> : <DashboardEmpresa />)
               )}
            </MainLayout>
          } />

          {/* Área Reclutamiento (Alumnos) */}
          <Route path="/alumno/perfil" element={<MainLayout><PerfilAlumno /></MainLayout>} />
          <Route path="/ofertas" element={<MainLayout><BuscadorOfertas /></MainLayout>} />
          <Route path="/ofertas/:id" element={<MainLayout><DetalleOferta /></MainLayout>} /> 
          <Route path="/mis-candidaturas" element={<MainLayout><MisCandidaturas /></MainLayout>} /> 

          {/* Área Gestión de Talento (Empresas) */}
          <Route path="/empresa/perfil" element={<MainLayout><PerfilEmpresa /></MainLayout>} />
          <Route path="/empresa/ofertas/crear" element={<MainLayout><CrearOferta /></MainLayout>} />
          <Route path="/empresa/ofertas/:id_oferta/candidatos" element={<MainLayout><GestionCandidatos /></MainLayout>} /> 
        </>
      )}

      {/* Controlador contra 404: Fuerza un redirect duro a index en enlaces rotos */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;