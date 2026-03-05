import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

// Componente temporal para ver si el login funcionó
function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Éxito! Estás dentro.</h1>
        <p className="text-gray-700 mb-4">Bienvenido al sistema, <strong>{user?.nombre}</strong>.</p>

        <div className="bg-gray-100 p-4 rounded mb-6 overflow-auto">
          <p className="text-xs text-gray-500 uppercase font-bold mb-2">Datos del Usuario (JSON):</p>
          <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

// Protección de rutas: Si no hay usuario, manda al login
function ProtectedRoute({ children }) {
  const { user, token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      {/* Por defecto, redirigir al dashboard (que redirigirá al login si no estás auth) */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;