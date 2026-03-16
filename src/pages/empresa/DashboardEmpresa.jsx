import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/axios';

export default function DashboardEmpresa() {
    const [ofertas, setOfertas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarMisOfertas();
    }, []);

    const cargarMisOfertas = async () => {
        try {
            const res = await client.get('/empresa/ofertas');
            setOfertas(res.data);
        } catch (error) {
            console.error("Error cargando las ofertas de la empresa", error);
        } finally {
            setCargando(false);
        }
    };

    const getBadgeEstado = (estado) => {
        switch (estado) {
            case 'PUBLICADA': return <span className="bg-status-active text-status-activeText px-3 py-1 rounded-full text-xs font-bold">Activa</span>;
            case 'PENDIENTE': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">En Revisión</span>;
            case 'CERRADA': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Cerrada</span>;
            default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{estado}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-900">Dashboard de Empresa</h1>
                    <Link
                        to="/empresa/ofertas/crear"
                        className="bg-accent-500 hover:bg-accent-600 text-white font-medium px-4 py-2 rounded shadow flex items-center gap-2 transition"
                    >
                        + Crear nueva oferta
                    </Link>
                </div>

                {cargando ? (
                    <div className="text-center py-12 text-gray-500">Cargando tus ofertas...</div>
                ) : ofertas.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center py-12">
                        <p className="text-gray-500 text-lg">Aún no has publicado ofertas de prácticas.</p>
                        <p className="text-sm text-gray-400 mt-2">Haz clic en "Crear nueva oferta" para empezar a buscar talento.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {ofertas.map((oferta) => (
                            <div key={oferta.id_oferta} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-primary-900">{oferta.titulo}</h3>
                                        <div className="text-gray-500 mt-1 text-sm flex gap-2 items-center">
                                            <span>{oferta.modalidad}</span>
                                            <span>|</span>
                                            <span>{oferta.es_remunerada ? 'Remunerada' : 'No remunerada'}</span>
                                            <span>|</span>
                                            <span>{oferta.posibilidad_contratacion ? 'Con posibilidad de contrato' : 'Solo prácticas'}</span>
                                        </div>
                                    </div>
                                    <div>{getBadgeEstado(oferta.estado)}</div>
                                </div>

                                <div className="mt-6 flex justify-between items-center border-t pt-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        👥 <span className="font-bold">Ver</span> Alumnos inscritos
                                    </div>

                                    {/* ENLACE MODIFICADO PARA EL SPRINT 4 */}
                                    <Link to={`/empresa/ofertas/${oferta.id_oferta}/candidatos`} className="text-blue-600 font-medium hover:underline flex items-center transition">
                                        Gestionar candidatos &gt;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}