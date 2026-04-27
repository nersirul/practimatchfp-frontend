import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import usePageTitle from '../hooks/usePageTitle';

export default function CatalogoOfertas() {

    usePageTitle("Catálogo de Ofertas - PractiMatch FP");
    
    const [ofertas, setOfertas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { user } = useAuth(); // Comprobamos si hay alguien logueado
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                // Al ser pública, Axios no necesita enviar el Token y no dará error
                const res = await client.get('/ofertas');
                // Si tienes paginación, recuerda acceder a res.data.data
                setOfertas(res.data.data ? res.data.data : res.data);
            } catch (error) {
                console.error("Error al cargar las ofertas públicas");
            } finally {
                setCargando(false);
            }
        };
        fetchOfertas();
    }, []);

    const handleVerDetalles = (id_oferta) => {
        if (!user) {
            // MURO PARA VISITANTES ANÓNIMOS
            const quiereRegistrarse = confirm("🔒 Para ver los detalles de esta oferta y postularte, necesitas tener una cuenta de Alumno. ¿Quieres registrarte o iniciar sesión ahora?");
            if (quiereRegistrarse) {
                navigate('/login');
            }
        } else {
            // SI ESTÁ LOGUEADO (Alumno/Admin), lo dejamos pasar a los detalles
            navigate(`/ofertas/${id_oferta}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary-900 mb-4">Descubre tu próxima aventura FCT</h1>
                    <p className="text-lg text-gray-600">Explora las vacantes publicadas por las mejores empresas del sector tecnológico.</p>
                </div>

                {cargando ? (
                    <div className="text-center text-gray-500 py-10 animate-pulse">Cargando catálogo de ofertas...</div>
                ) : ofertas.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-sm text-center border border-gray-100">
                        <p className="text-gray-500">Actualmente no hay ofertas activas. ¡Vuelve pronto!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ofertas.map(oferta => (
                            <div key={oferta.id_oferta} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-xl font-bold text-primary-900 mb-2">{oferta.titulo}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                                        <span>🏢 {oferta.empresa?.nombre_comercial}</span>
                                        <span>•</span>
                                        <span>📍 {oferta.empresa?.ciudad}</span>
                                    </div>

                                    {/* Muestra las tecnologías como "cebo" visual */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {oferta.tecnologias?.slice(0, 3).map(tech => (
                                            <span key={tech.id_tecnologia} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                                {tech.nombre}
                                            </span>
                                        ))}
                                        {oferta.tecnologias?.length > 3 && (
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">
                                                +{oferta.tecnologias.length - 3} más
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500">{oferta.modalidad}</span>
                                    <button
                                        onClick={() => handleVerDetalles(oferta.id_oferta)}
                                        className="bg-primary-900 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-800 transition shadow"
                                    >
                                        Ver Detalles &rarr;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}