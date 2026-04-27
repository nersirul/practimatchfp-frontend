/**
 * Componente: BuscadorOfertas
 * Módulo: Views/Alumno
 * 
 * Componente del perfil Alumno. Permite visualizar y gestionar candidaturas, perfil y catálogo de ofertas públicas.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';

export default function BuscadorOfertas() {
    
    usePageTitle("Buscador de Ofertas");
    
    const [ofertas, setOfertas] = useState([]);
    const [catalogoTech, setCatalogoTech] = useState([]);

    // Filtros
    const [filtroModalidad, setFiltroModalidad] = useState('');
    const [filtroTech, setFiltroTech] = useState('');

    useEffect(() => {
        client.get('/tecnologias').then(res => setCatalogoTech(res.data));
        cargarOfertas();
    }, []);

    // Se ejecuta cada vez que cambian los filtros
    useEffect(() => {
        cargarOfertas();
    }, [filtroModalidad, filtroTech]);

    const cargarOfertas = async () => {
        try {
            let query = '/ofertas?';
            if (filtroModalidad) query += `modalidad=${filtroModalidad}&`;
            if (filtroTech) query += `tecnologias[]=${filtroTech}`;

            const res = await client.get(query);
            setOfertas(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-primary-900 mb-2">Ofertas de Prácticas</h1>
                <p className="text-gray-600 mb-8">Encuentra las mejores oportunidades para ti.</p>

                {/* Barra de Filtros */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-center">
                    <select value={filtroModalidad} onChange={e => setFiltroModalidad(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 outline-none text-sm text-gray-700 bg-gray-50 w-48">
                        <option value="">Todas las Modalidades</option>
                        <option value="PRESENCIAL">Presencial</option>
                        <option value="REMOTO">Remoto</option>
                        <option value="HIBRIDO">Híbrido</option>
                    </select>

                    <select value={filtroTech} onChange={e => setFiltroTech(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 outline-none text-sm text-gray-700 bg-gray-50 w-48">
                        <option value="">Todas las Tecnologías</option>
                        {catalogoTech.map(t => (
                            <option key={t.id_tecnologia} value={t.id_tecnologia}>{t.nombre}</option>
                        ))}
                    </select>

                    {(filtroModalidad || filtroTech) && (
                        <button onClick={() => { setFiltroModalidad(''); setFiltroTech(''); }} className="text-sm text-blue-600 hover:underline">
                            Limpiar filtros
                        </button>
                    )}
                </div>

                {/* Listado de Tarjetas */}
                <div className="space-y-4">
                    {ofertas.length === 0 ? (
                        <div className="bg-white p-10 rounded-xl shadow-sm text-center py-10 text-gray-500 border border-gray-100">
                            No hay ofertas que coincidan con tu búsqueda.
                        </div>
                    ) : (
                        ofertas.map(oferta => (
                            <div key={oferta.id_oferta} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <h3 className="text-xl font-bold text-primary-900">{oferta.titulo}</h3>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                    <span className="font-bold text-primary-800">🏢 {oferta.empresa?.nombre_comercial}</span>
                                    <span>•</span>
                                    <span>📍 {oferta.empresa?.ciudad || 'España'}</span>
                                    <span>•</span>
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold">{oferta.modalidad}</span>
                                </div>

                                <div className="mt-4 flex justify-between items-end">
                                    <div className="flex gap-2 flex-wrap">
                                        {oferta.tecnologias.map(t => (
                                            <span key={t.id_tecnologia} className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-xs font-bold">
                                                {t.nombre}
                                            </span>
                                        ))}
                                    </div>

                                    {/* ENLACE MODIFICADO PARA EL SPRINT 4 */}
                                    <Link to={`/ofertas/${oferta.id_oferta}`} className="text-accent-600 font-bold hover:underline text-sm flex items-center gap-1">
                                        Ver detalles &gt;
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}