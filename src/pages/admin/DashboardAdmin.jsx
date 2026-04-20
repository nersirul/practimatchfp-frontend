/**
 * Componente: DashboardAdmin
 * Módulo: Views/Admin
 * * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../../api/axios';

export default function DashboardAdmin() {
    const [stats, setStats] = useState({
        usuariosTotales: 0,
        empresasActivas: 0,
        ofertasPublicadas: 0,
        practicasEnCurso: 0
    });
    const [empresasPendientes, setEmpresasPendientes] = useState([]);
    const [practicasRecientes, setPracticasRecientes] = useState([]);
    const [usuariosRecientes, setUsuariosRecientes] = useState([]);

    // Estado contenedor para listar y habilitar la edición de ofertas recientes
    const [ofertasRecientes, setOfertasRecientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                const res = await client.get('/admin/dashboard');
                setStats(res.data.stats);
                setEmpresasPendientes(res.data.validacionesPendientes);
                setPracticasRecientes(res.data.practicasRecientes);
                setUsuariosRecientes(res.data.usuariosRecientes);

                // Recepción de la cohorte de ofertas recientes emitidas por el Controlador
                setOfertasRecientes(res.data.ofertasRecientes || []);
            } catch (error) {
                console.error("Error cargando el dashboard de admin:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDashboard();
    }, []);

    const handleValidarEmpresa = async (id, nombre) => {
        if (!confirm(`¿Estás seguro de activar la empresa ${nombre}? A partir de ahora podrá publicar ofertas.`)) return;

        try {
            await client.put(`/admin/empresas/${id}/validar`);
            const res = await client.get('/admin/dashboard');
            setEmpresasPendientes(res.data.validacionesPendientes);
        } catch (error) {
            alert("Error al activar la empresa.");
        }
    };

    if (cargando) {
        return <div className="p-6 text-center text-gray-500 font-medium mt-10">Cargando datos del panel principal...</div>;
    }

    return (
        <div className="space-y-6 pb-10">

            {/* General Stats - Top Row */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Estadísticas Generales</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-4 first:pt-0 first:pl-0">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Usuarios Totales:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">👤</span>
                            <span className="text-4xl font-bold text-primary-900">{stats.usuariosTotales}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Empresas Activas:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl text-gray-500">🏢</span>
                            <span className="text-4xl font-bold text-primary-900">{stats.empresasActivas}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Ofertas Publicadas:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">💼</span>
                            <span className="text-4xl font-bold text-primary-900">{stats.ofertasPublicadas}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Prácticas en Curso:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl text-gray-500">🤝</span>
                            <span className="text-4xl font-bold text-primary-900">{stats.practicasEnCurso}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column Left: Validaciones */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Validación de Empresas ({empresasPendientes.length})</h2>
                        {empresasPendientes.length > 0 && <Link to="/admin/validar/empresas" className="text-sm font-semibold text-primary-900 hover:underline">Ver todas</Link>}
                    </div>
                    <div className="space-y-4">
                        {empresasPendientes.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No hay empresas pendientes de validación.</p>
                        ) : (
                            empresasPendientes.map(empresa => (
                                <div key={empresa.id_empresa} className="flex flex-col xl:flex-row justify-between items-start xl:items-center py-3 border-b border-gray-100 last:border-0 last:pb-0 gap-3">
                                    <span className="font-semibold text-gray-700">{empresa.nombre_comercial}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleValidarEmpresa(empresa.id_empresa, empresa.nombre_comercial)} className="px-4 py-1.5 bg-accent-500 text-white rounded-md text-sm font-semibold hover:bg-accent-600 transition shadow-sm">Validar</button>
                                        <button className="px-4 py-1.5 bg-white border border-red-300 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50 transition shadow-sm">Rechazar</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Column Right: Prácticas Recientes */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Supervisión de Prácticas ({practicasRecientes.length})</h2>
                    <div className="space-y-4">
                        {practicasRecientes.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No hay prácticas registradas aún.</p>
                        ) : (
                            practicasRecientes.map(practica => (
                                <div key={practica.id_practica} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                                    <span className="font-semibold text-gray-700 truncate w-2/3" title={`${practica.alumno?.nombre} - ${practica.oferta?.empresa?.nombre_comercial}`}>
                                        {practica.alumno?.nombre} - {practica.oferta?.empresa?.nombre_comercial}
                                    </span>
                                    {practica.estado === 'EN_CURSO' && <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">En Curso</span>}
                                    {practica.estado === 'SOLICITADA' && <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">En Revisión</span>}
                                    {practica.estado === 'FINALIZADA' && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Finalizada</span>}
                                    {practica.estado === 'RECHAZADA' && <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold border border-red-200">Rechazada</span>}
                                    {/* Estado del Sprint 7 */}
                                    {practica.estado === 'ESPERANDO_TUTOR' && <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">Pdt. Tutor</span>}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* SECCIÓN: GESTIÓN RÁPIDA DE OFERTAS */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Control de Ofertas Recientes</h2>
                    
                </div>
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-bold uppercase tracking-wider">
                            <th className="px-6 py-3 rounded-tl-lg">Título de la Oferta</th>
                            <th className="px-6 py-3">Empresa</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-right rounded-tr-lg">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-medium">
                        {ofertasRecientes.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-6 text-gray-500">No hay ofertas registradas</td></tr>
                        ) : (
                            ofertasRecientes.map((oferta) => (
                                <tr key={oferta.id_oferta} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {oferta.titulo}
                                        {!oferta.activa && <span className="ml-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded uppercase">Pausada</span>}
                                    </td>
                                    <td className="px-6 py-4">{oferta.empresa?.nombre_comercial || 'N/A'}</td>
                                    <td className="px-6 py-4 text-center">
                                        {oferta.estado === 'PUBLICADA' && <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Activa</span>}
                                        {oferta.estado === 'CERRADA' && <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Cerrada</span>}
                                        {oferta.estado === 'PENDIENTE' && <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">Pendiente</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* Enrutamiento directo al componente de edición de oferta */}
                                        <Link
                                            to={`/admin/ofertas/${oferta.id_oferta}/editar`}
                                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition"
                                        >
                                            ✏️ Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bottom Row - Usuarios */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Nuevos Usuarios Registrados</h2>
                    <Link to="/admin/usuarios" className="text-sm font-semibold text-primary-900 hover:underline">Gestionar todos</Link>
                </div>
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-bold uppercase tracking-wider">
                            <th className="px-6 py-3 rounded-tl-lg">Usuario</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-right rounded-tr-lg">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-medium">
                        {usuariosRecientes.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-6 text-gray-500">No hay nuevos usuarios</td></tr>
                        ) : (
                            usuariosRecientes.map((usuario, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">{usuario.nombre_completo} ({usuario.rol})</td>
                                    <td className="px-6 py-4">{usuario.empresa_o_ciclo || 'N/A'}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${usuario.estado === 'Activo' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'}`}>
                                            {usuario.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link to="/admin/usuarios" className="text-gray-400 hover:text-gray-700 text-lg">•••</Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}