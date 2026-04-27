/**
 * Componente: GestionCandidatos
 * Módulo: Views/Empresa
 * * Componente del perfil Empresa. Facilita la creación de vacantes y la validación de postulantes.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';

export default function GestionCandidatos() {
    
    usePageTitle("Gestión de Candidatos - Prácticas Empresa");

    const { id_oferta } = useParams();
    const [candidatos, setCandidatos] = useState([]);

    useEffect(() => { cargarCandidatos(); }, [id_oferta]);

    const cargarCandidatos = async () => {
        const res = await client.get(`/empresa/ofertas/${id_oferta}/candidatos`);
        setCandidatos(res.data);
    };

    const cambiarEstado = async (id_practica, nuevoEstado) => {
        // Determinación contextualizada de mensajes de confirmación
        let mensajeConfirmacion = `¿Estás seguro de marcar a este alumno como ${nuevoEstado}?`;
        if (nuevoEstado === 'ESPERANDO_TUTOR') {
            mensajeConfirmacion = "¿Confirmas que quieres aceptar a este alumno? Su instituto recibirá una notificación para autorizar el inicio oficial de las prácticas.";
        }

        if (!confirm(mensajeConfirmacion)) return;

        try {
            await client.put(`/empresa/practicas/${id_practica}/estado`, { estado: nuevoEstado });
            cargarCandidatos();
        } catch (error) {
            alert(error.response?.data?.error || "Error al actualizar estado.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                <Link to="/dashboard" className="text-gray-500 hover:text-primary-900 mb-6 inline-block">&larr; Volver al Dashboard</Link>
                <h1 className="text-3xl font-bold text-primary-900 mb-6">Candidatos Recibidos</h1>

                {candidatos.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
                        Aún no hay candidatos para esta oferta.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {candidatos.map(c => (
                            <div key={c.id_practica} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-primary-900">{c.alumno.nombre} {c.alumno.apellidos}</h3>
                                        <div className="text-sm text-gray-600 mt-2 space-y-1">
                                            <p>🎓 Ciclo: <strong>{c.alumno.ciclo}</strong> ({c.alumno.modalidad_preferida})</p>
                                            {/* Datos de contacto */}
                                            <p>✉️ {c.alumno.email}</p>
                                            <p>📞 {c.alumno.telefono || 'No especificado'}</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="mb-3 flex flex-col items-end">
                                            <span className="text-xs text-gray-500 uppercase font-bold mb-1">Estado actual:</span>

                                            {/* Renderizado Visual Condicionado por Estado del Flujo */}
                                            {c.estado === 'SOLICITADA' && (
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    Pendiente de tu revisión
                                                </span>
                                            )}
                                            {c.estado === 'ESPERANDO_TUTOR' && (
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    ⏳ Esperando autorización del Instituto
                                                </span>
                                            )}
                                            {c.estado === 'EN_CURSO' && (
                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    🚀 Prácticas en Curso
                                                </span>
                                            )}
                                            {c.estado === 'FINALIZADA' && (
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    ✅ Prácticas Finalizadas
                                                </span>
                                            )}
                                            {c.estado === 'RECHAZADA' && (
                                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    ❌ Candidatura Rechazada
                                                </span>
                                            )}
                                        </div>

                                        {/* Bloque de Acciones Condicionales (Solo disponibles en estado SOLICITADA) */}
                                        {c.estado === 'SOLICITADA' && (
                                            <div className="flex gap-2 justify-end mt-4">
                                                {/* Transición inicial condicionada a la validación secundaria de la entidad educativa */}
                                                <button onClick={() => cambiarEstado(c.id_practica, 'ESPERANDO_TUTOR')} className="bg-primary-900 text-white px-4 py-2 rounded font-bold hover:bg-primary-800 shadow transition">
                                                    ✅ Aceptar Candidato
                                                </button>
                                                <button onClick={() => cambiarEstado(c.id_practica, 'RECHAZADA')} className="bg-red-50 text-red-700 px-4 py-2 rounded font-bold hover:bg-red-100 transition border border-red-200">
                                                    ❌ Rechazar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Skills del candidato */}
                                <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm font-bold text-gray-500 mb-2">Tecnologías del Alumno:</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {c.alumno.tecnologias.map(t => (
                                            <span key={t.id_tecnologia} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-xs font-bold">
                                                {t.nombre} (Nvl: {t.pivot.nivel})
                                            </span>
                                        ))}
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