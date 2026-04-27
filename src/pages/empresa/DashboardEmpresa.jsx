/**
 * Componente: DashboardEmpresa
 * Módulo: Views/Empresa
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';

export default function DashboardEmpresa() {
    
    usePageTitle("Dashboard - Prácticas Empresa");

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
            console.error("Error cargando las ofertas", error);
        } finally {
            setCargando(false);
        }
    };

    const toggleActiva = async (id_oferta) => {
        try {
            await client.put(`/empresa/ofertas/${id_oferta}/toggle`);
            cargarMisOfertas();
        } catch (error) {
            alert("Error al cambiar el estado de la oferta.");
        }
    };

    // Cierre definitivo de vacante (Soft/Hard Disable)
    const cerrarOferta = async (id_oferta) => {
        if (!confirm("¿Estás seguro de cerrar esta oferta? No podrás volver a editarla ni activarla, y desaparecerá del buscador de alumnos.")) return;
        try {
            await client.put(`/empresa/ofertas/${id_oferta}/cerrar`);
            cargarMisOfertas();
        } catch (error) {
            alert("Error al cerrar la oferta.");
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

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] p-6 text-gray-800">
            <div className="max-w-5xl mx-auto mt-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Dashboard de Empresa</h1>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link to="/empresa/perfil" className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold px-6 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-colors">
                            🏢 Editar Perfil
                        </Link>
                        <Link to="/empresa/ofertas/crear" className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-colors">
                            + Crear nueva oferta
                        </Link>
                    </div>
                </div>

                {cargando ? (
                    <div className="text-center py-12 text-gray-500 font-medium">Cargando tus ofertas...</div>
                ) : ofertas.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center py-12">
                        <p className="text-gray-500 text-lg">Aún no has publicado ofertas de prácticas.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {ofertas.map((oferta) => (
                            <div key={oferta.id_oferta} className={`bg-white p-6 rounded-xl shadow-sm border transition-all duration-300 ${!oferta.activa ? 'opacity-60 border-dashed border-gray-400 grayscale-[40%]' : 'border-gray-200 hover:shadow-md'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-bold text-primary-900 tracking-tight">{oferta.titulo}</h3>
                                        {!oferta.activa && oferta.estado !== 'CERRADA' && (
                                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Pausada</span>
                                        )}
                                    </div>
                                    <div>{getBadgeEstado(oferta.estado)}</div>
                                </div>

                                <div className="text-gray-600 text-sm mb-6 font-medium flex flex-wrap items-center gap-3">
                                    <span>{oferta.empresa?.ciudad} | {oferta.modalidad}</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-primary-800 font-bold bg-blue-50 px-2 py-0.5 rounded">
                                        Vacantes: {oferta.vacantes === null ? 'Ilimitadas ∞' : oferta.vacantes}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-4 gap-4">
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold w-full sm:w-auto">
                                        <div className="text-2xl">👨‍🎓</div>
                                        <span><span className="font-bold text-primary-900">{oferta.practicas_count || 0}</span> Alumnos inscritos</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">

                                        {/* Bloque de acciones condicionales: Deshabilitado en estado CERRADA */}
                                        {oferta.estado !== 'CERRADA' && (
                                            <>
                                                <Link to={`/empresa/ofertas/${oferta.id_oferta}/editar`} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition flex items-center gap-1">
                                                    ✏️ Editar
                                                </Link>

                                                <button onClick={() => toggleActiva(oferta.id_oferta)} className={`px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition ${oferta.activa ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200' : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'}`}>
                                                    {oferta.activa ? '⏸️ Pausar' : '▶️ Reactivar'}
                                                </button>

                                                <button onClick={() => cerrarOferta(oferta.id_oferta)} className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition">
                                                    🔒 Cerrar
                                                </button>
                                            </>
                                        )}

                                        <Link to={`/empresa/ofertas/${oferta.id_oferta}/candidatos`} className="text-gray-600 font-semibold hover:text-primary-900 transition flex items-center gap-1 bg-gray-50 px-4 py-2 rounded-lg border hover:bg-gray-100 text-sm">
                                            Gestionar candidatos <span className="text-xl leading-none">&gt;</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}