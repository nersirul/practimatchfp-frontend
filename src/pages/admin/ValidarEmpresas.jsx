/**
 * Componente: ValidarEmpresas
 * Módulo: Views/Admin
 * 
 * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function ValidarEmpresas() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => { cargarPendientes(); }, []);

    const cargarPendientes = async () => {
        const res = await client.get('/admin/empresas/pendientes');
        setEmpresas(res.data);
    };

    const handleValidar = async (id, nombre) => {
        if (!confirm(`¿Estás seguro de activar la empresa ${nombre}? A partir de ahora podrá publicar ofertas.`)) return;

        try {
            await client.put(`/admin/empresas/${id}/validar`);
            alert("Empresa activada con éxito.");
            cargarPendientes(); // Recargar lista
        } catch (error) {
            alert("Error al activar la empresa.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Validación de Empresas Nuevas</h1>
            <p className="text-gray-600 mb-8">Revisa los datos fiscales antes de darles acceso a publicar ofertas.</p>

            {empresas.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
                    🎉 ¡Estás al día! No hay empresas pendientes de validación.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {empresas.map(empresa => (
                        <div key={empresa.id_empresa} className="bg-white p-6 rounded-xl shadow-sm border border-l-4 border-l-yellow-400">
                            <h3 className="text-xl font-bold text-primary-900">{empresa.nombre_comercial}</h3>
                            <div className="mt-4 space-y-2 text-sm text-gray-700">
                                <p><strong>CIF:</strong> {empresa.cif}</p>
                                <p><strong>Email:</strong> {empresa.email_contacto}</p>
                                <p><strong>Teléfono:</strong> {empresa.telefono_contacto}</p>
                                <p><strong>Ubicación:</strong> {empresa.ciudad} ({empresa.direccion})</p>
                                <p><strong>Registrada el:</strong> {new Date(empresa.created_at).toLocaleDateString()}</p>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => handleValidar(empresa.id_empresa, empresa.nombre_comercial)}
                                    className="bg-status-active text-status-activeText px-4 py-2 rounded-lg font-bold shadow hover:bg-green-200 transition"
                                >
                                    ✅ Aprobar Empresa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}