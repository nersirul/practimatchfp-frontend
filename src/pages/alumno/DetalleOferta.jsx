/**
 * Componente: DetalleOferta
 * Módulo: Views/Alumno
 * 
 * Componente del perfil Alumno. Permite visualizar y gestionar candidaturas, perfil y catálogo de ofertas públicas.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function DetalleOferta() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [oferta, setOferta] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const isAlumno = user?.hasOwnProperty('id_alumno') || user?.id_alumno;

    useEffect(() => {
        client.get(`/ofertas/${id}`).then(res => setOferta(res.data)).catch(() => navigate('/ofertas'));
    }, [id, navigate]);

    const handleSolicitar = async () => {
        setEnviando(true);
        try {
            await client.post(`/ofertas/${id}/solicitar`);
            alert("¡Solicitud enviada con éxito! La empresa revisará tu perfil.");
            navigate('/mis-candidaturas');
        } catch (error) {
            if (error.response?.status === 422) {
                alert("Ya has solicitado esta oferta anteriormente.");
            } else {
                alert("Error al enviar la solicitud.");
            }
        } finally {
            setEnviando(false);
        }
    };

    if (!oferta) return <div className="p-10 text-center">Cargando oferta...</div>;

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/ofertas" className="text-gray-500 hover:text-primary-900 mb-6 inline-block font-medium">
                    &larr; Volver a Ofertas
                </Link>

                <h1 className="text-3xl font-bold text-primary-900 mb-6 tracking-tight">{oferta.titulo}</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cabecera Tarjeta */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-bold text-primary-800">🏢 {oferta.empresa?.nombre_comercial}</span>
                                <span className="bg-gray-100 px-3 py-1 rounded text-sm font-bold text-gray-700">{oferta.modalidad}</span>
                            </div>
                            <div className="text-gray-500 text-sm mt-2 flex gap-4">
                                <span>📍 {oferta.empresa?.ciudad || 'España'}</span>
                                <span>💰 {oferta.es_remunerada ? 'Remunerada' : 'No remunerada'}</span>
                            </div>
                        </div>
                        {isAlumno && (
                            <button
                                onClick={handleSolicitar}
                                disabled={enviando}
                                className="bg-accent-500 hover:bg-accent-600 disabled:bg-gray-400 text-white font-bold px-8 py-3 rounded-lg shadow transition w-full md:w-auto transform hover:-translate-y-0.5"
                            >
                                {enviando ? 'Enviando...' : 'Solicitar Práctica'}
                            </button>
                        )}
                    </div>

                    {/* Tecnologías */}
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Tecnologías Requeridas</h3>
                        <div className="flex gap-2 flex-wrap">
                            {oferta.tecnologias.map(t => (
                                <span key={t.id_tecnologia} className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                                    {t.nombre}
                                </span>
                            ))}
                            {oferta.tecnologias.length === 0 && <span className="text-gray-500 text-sm">No se han especificado tecnologías.</span>}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-primary-900 mb-4">Descripción del puesto</h3>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{oferta.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}