import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardAlumno() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary-900">¡Hola, {user?.nombre}!</h1>
                    <p className="text-gray-600">Bienvenido a tu panel de prácticas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-6">
                        {/* Resumen Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold mb-4 text-primary-900">Resumen</h3>
                            <div className="flex justify-between text-center">
                                <div><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Enviadas</div></div>
                                <div><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Proceso</div></div>
                                <div><div className="text-2xl font-bold">0</div><div className="text-xs text-gray-500">Aceptado</div></div>
                            </div>
                        </div>

                        {/* Accesos Rápidos */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
                            <Link to="/ofertas" className="block w-full bg-accent-500 text-white text-center py-3 rounded-lg font-bold shadow hover:bg-accent-600">🔍 Buscar Ofertas</Link>
                            <Link to="/alumno/perfil" className="block w-full bg-primary-900 text-white text-center py-3 rounded-lg font-bold shadow hover:bg-primary-800">👤 Mi Perfil</Link>
                        </div>
                    </div>

                    {/* Novedades (Placeholder) */}
                    <div className="md:col-span-2">
                        <h3 className="text-xl font-bold mb-4 text-gray-700">Novedades</h3>
                        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                            Aún no hay ofertas destacadas disponibles.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}