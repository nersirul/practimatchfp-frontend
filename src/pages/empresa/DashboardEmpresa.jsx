/**
 * Componente: DashboardEmpresa
 * Módulo: Views/Empresa
 * 
 * Componente del perfil Empresa. Facilita la creación de vacantes y la validación de postulantes.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

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
            case 'PUBLICADA': return <span className="bg-status-active text-status-activeText px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-green-200">Activa</span>;
            case 'PENDIENTE': return <span className="bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-orange-200">En Revisión</span>;
            case 'CERRADA': return <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-red-200">Cerrada</span>;
            default: return <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold shadow-sm border border-gray-200">{estado}</span>;
        }
    };

    // Helper for mockup data when not provided by API
    const mockLocation = "Madrid";

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] p-6 text-gray-800">
            <div className="max-w-5xl mx-auto mt-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Dashboard de Empresa</h1>
                    <Link
                        to="/empresa/ofertas/crear"
                        className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-colors"
                    >
                        + Crear nueva oferta
                    </Link>
                </div>

                {/* Content Section */}
                {cargando ? (
                    <div className="text-center py-12 text-gray-500 font-medium">Cargando tus ofertas...</div>
                ) : ofertas.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center py-12">
                        <p className="text-gray-500 text-lg">Aún no has publicado ofertas de prácticas.</p>
                        <p className="text-sm text-gray-400 mt-2">Haz clic en "Crear nueva oferta" para buscar talento.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {ofertas.map((oferta) => (
                            <div key={oferta.id_oferta} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition hover:shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-primary-900 tracking-tight">{oferta.titulo}</h3>
                                    <div>{getBadgeEstado(oferta.estado)}</div>
                                </div>
                                <div className="text-gray-600 text-sm mb-6 font-medium">
                                    {mockLocation} | {oferta.modalidad || 'Presencial'}
                                </div>
                                
                                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                                        <div className="text-2xl">👨‍🎓</div>
                                        <span><span className="font-bold text-primary-900">{oferta.practicas_count || 0}</span> Alumnos inscritos</span>
                                    </div>

                                    <Link to={`/empresa/ofertas/${oferta.id_oferta}/candidatos`} className="text-gray-600 font-semibold hover:text-primary-900 transition flex items-center gap-1">
                                        Gestionar candidatos <span className="text-xl leading-none">&gt;</span>
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