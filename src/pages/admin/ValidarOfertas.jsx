/**
 * Componente: ValidarOfertas
 * Módulo: Views/Admin
 * 
 * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function ValidarOfertas() {
    const [ofertas, setOfertas] = useState([]);

    useEffect(() => { cargarPendientes(); }, []);

    const cargarPendientes = async () => {
        const res = await client.get('/admin/ofertas/pendientes');
        setOfertas(res.data);
    };

    const handleValidar = async (id, estado) => {
        // estado puede ser 'PUBLICADA' (Aprobar) o 'CERRADA' (Rechazar)
        const confirmMsg = estado === 'PUBLICADA' ? '¿Aprobar y publicar esta oferta?' : '¿Rechazar esta oferta?';
        if (!confirm(confirmMsg)) return;

        try {
            await client.put(`/admin/ofertas/${id}/validar`, { estado });
            cargarPendientes(); // Recargar la lista
        } catch (error) {
            alert("Error al validar la oferta.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-8">Validación de Ofertas</h1>

            {ofertas.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
                    🎉 ¡Estás al día! No hay ofertas pendientes de validación.
                </div>
            ) : (
                <div className="space-y-4">
                    {ofertas.map(oferta => (
                        <div key={oferta.id_oferta} className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-yellow-400 border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-primary-900">{oferta.titulo}</h3>
                                    <p className="text-gray-600 font-medium text-sm mt-1">🏢 Empresa: {oferta.empresa?.nombre_comercial}</p>
                                    <p className="text-gray-500 text-sm mt-1">Modalidad: {oferta.modalidad}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleValidar(oferta.id_oferta, 'PUBLICADA')} className="bg-status-active text-status-activeText px-4 py-2 rounded-lg font-bold shadow hover:bg-green-200 transition">
                                        ✅ Aprobar
                                    </button>
                                    <button onClick={() => handleValidar(oferta.id_oferta, 'CERRADA')} className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-bold shadow hover:bg-red-200 transition">
                                        ❌ Rechazar
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
                                {oferta.descripcion}
                            </div>
                            
                            {oferta.tecnologias.length > 0 && (
                                <div className="mt-4 flex gap-2">
                                    {oferta.tecnologias.map(t => (
                                        <span key={t.id_tecnologia} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-bold">
                                            {t.nombre}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}