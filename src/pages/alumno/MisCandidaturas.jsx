/**
 * Componente: MisCandidaturas
 * Módulo: Views/Alumno
 * * Componente del perfil Alumno. Permite visualizar y gestionar candidaturas, perfil y catálogo de ofertas públicas.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function MisCandidaturas() {
    const [candidaturas, setCandidaturas] = useState([]);

    // Estados para el Modal de Valoración de 5 Estrellas
    const [evaluandoPracticaId, setEvaluandoPracticaId] = useState(null);
    const [ratingForm, setRatingForm] = useState({ puntuacion_empresa: 0, comentario_alumno: '' });
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        cargarMisCandidaturas();
    }, []);

    const cargarMisCandidaturas = async () => {
        try {
            const res = await client.get('/alumno/candidaturas');
            setCandidaturas(res.data);
        } catch (error) {
            console.error("Error al cargar las candidaturas");
        }
    };

    const submitValoracion = async (e) => {
        e.preventDefault();
        if (ratingForm.puntuacion_empresa === 0) {
            return alert("Por favor, selecciona al menos una estrella.");
        }

        try {
            await client.post(`/alumno/practicas/${evaluandoPracticaId}/valorar`, ratingForm);
            alert("¡Valoración enviada correctamente! Gracias por tu feedback.");
            setEvaluandoPracticaId(null);
            cargarMisCandidaturas(); // Recargamos para que el botón cambie a las estrellas estáticas
        } catch (error) {
            alert(error.response?.data?.error || "Error al enviar la valoración.");
        }
    };

    const getEstado = (estado) => {
        switch (estado) {
            case 'SOLICITADA': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">Enviada</span>;
            case 'ESPERANDO_TUTOR': return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">Aceptada (Pdt. Tutor)</span>;
            case 'EN_CURSO': return <span className="bg-status-active text-status-activeText px-3 py-1 rounded-full text-xs font-bold">En Curso</span>;
            case 'FINALIZADA': return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Finalizada</span>;
            case 'RECHAZADA': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Rechazada</span>;
            default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{estado}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-primary-900 mb-6">Mis Candidaturas y Prácticas</h1>

                {candidaturas.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
                        Aún no has solicitado ninguna práctica. ¡Ve al buscador!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {candidaturas.map(c => (
                            <div key={c.id_practica} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-lg text-primary-900">{c.oferta?.titulo}</h3>
                                        {getEstado(c.estado)}
                                    </div>
                                    <p className="text-sm text-gray-600">🏢 Empresa: <strong>{c.oferta?.empresa?.nombre_comercial}</strong></p>
                                    <p className="text-xs text-gray-400 mt-1">Solicitado el {new Date(c.created_at).toLocaleDateString()}</p>
                                </div>

                                <div className="flex flex-col items-end w-full md:w-auto">
                                    {/* BOTÓN PARA VALORAR (Solo si está finalizada y no tiene puntuación previa) */}
                                    {c.estado === 'FINALIZADA' && !c.puntuacion_empresa && (
                                        <button
                                            onClick={() => {
                                                setEvaluandoPracticaId(c.id_practica);
                                                setRatingForm({ puntuacion_empresa: 0, comentario_alumno: '' });
                                            }}
                                            className="mt-3 md:mt-0 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 shadow-sm transition flex items-center gap-2 text-sm w-full md:w-auto justify-center"
                                        >
                                            ⭐ Valorar Experiencia
                                        </button>
                                    )}

                                    {/* ESTRELLAS ESTÁTICAS (Si ya la ha valorado) */}
                                    {c.estado === 'FINALIZADA' && c.puntuacion_empresa > 0 && (
                                        <div className="mt-3 md:mt-0 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm flex flex-col items-end">
                                            <span className="text-gray-500 font-semibold text-xs mb-1">Tu valoración:</span>
                                            <span className="text-yellow-400 text-lg tracking-widest leading-none drop-shadow-sm">
                                                {'★'.repeat(c.puntuacion_empresa)}{'☆'.repeat(5 - c.puntuacion_empresa)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL DE VALORACIÓN 5 ESTRELLAS */}
                {evaluandoPracticaId && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fadeIn">
                            <h2 className="text-2xl font-bold text-primary-900 mb-2 text-center">Valora a la Empresa</h2>
                            <p className="text-gray-500 text-sm text-center mb-6">Tu opinión es anónima y ayudará a futuros alumnos a elegir mejor.</p>

                            <form onSubmit={submitValoracion} className="space-y-6">

                                {/* Selector de Estrellas Interactivo */}
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`text-5xl transition-transform transform hover:scale-110 focus:outline-none ${star <= (hoverRating || ratingForm.puntuacion_empresa) ? 'text-yellow-400 drop-shadow-md' : 'text-gray-200'
                                                }`}
                                            onClick={() => setRatingForm({ ...ratingForm, puntuacion_empresa: star })}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mt-[-10px]">
                                    {ratingForm.puntuacion_empresa === 0 && 'Selecciona una puntuación'}
                                    {ratingForm.puntuacion_empresa === 1 && 'Muy mala'}
                                    {ratingForm.puntuacion_empresa === 2 && 'Mala'}
                                    {ratingForm.puntuacion_empresa === 3 && 'Normal'}
                                    {ratingForm.puntuacion_empresa === 4 && 'Buena'}
                                    {ratingForm.puntuacion_empresa === 5 && '¡Excelente!'}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Comentario (Opcional)</label>
                                    <textarea
                                        rows="3"
                                        value={ratingForm.comentario_alumno}
                                        onChange={e => setRatingForm({ ...ratingForm, comentario_alumno: e.target.value })}
                                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                                        placeholder="¿Qué tal fue el ambiente? ¿Aprendiste mucho?..."
                                    ></textarea>
                                </div>

                                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setEvaluandoPracticaId(null)}
                                        className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-yellow-400 text-yellow-900 px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-yellow-500 transition"
                                    >
                                        Enviar Valoración
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}