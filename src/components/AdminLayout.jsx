import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white shadow-lg fixed h-full z-10 flex flex-col">
                <div className="p-6 border-b flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-900 rounded text-white flex items-center justify-center font-bold">P</div>
                    <span className="font-bold text-primary-900 text-lg">PractiMatch FP</span>
                </div>

                <nav className="p-4 space-y-2 flex-1">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-2 mt-2">Menú Principal</div>

                    <Link to="/admin/tecnologias" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-accent-50 hover:text-accent-600 rounded-lg font-medium transition">
                        🛠️ Tecnologías
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <button onClick={() => { logout(); navigate('/login') }} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition">
                        🚪 Salir
                    </button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="ml-64 flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-900">Panel de Administración</h1>
                    <span className="bg-primary-900 text-white px-3 py-1 rounded-full text-xs">Admin</span>
                </header>
                <Outlet />
            </main>
        </div>
    );
}