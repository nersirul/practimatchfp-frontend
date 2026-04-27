/**
 * Componente: Tecnologias
 * Módulo: Views/Admin
 * 
 * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';

export default function Tecnologias() {
    
    usePageTitle("Gestor de Tecnologías");

    const [tecnologias, setTecnologias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => { cargarTecnologias(); }, []);

    const cargarTecnologias = async () => {
        const res = await client.get('/tecnologias');
        setTecnologias(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) await client.put(`/tecnologias/${editId}`, { nombre });
            else await client.post('/tecnologias', { nombre });
            setNombre(''); setEditId(null); cargarTecnologias();
        } catch (error) { alert("Error al guardar"); }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Eliminar?')) {
            await client.delete(`/tecnologias/${id}`);
            cargarTecnologias();
        }
    };

    return (
        <div>
            {/* Formulario */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                <h3 className="font-bold text-lg mb-4 text-primary-900">{editId ? 'Editar' : 'Añadir'} Tecnología</h3>
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text" value={nombre} onChange={e => setNombre(e.target.value)}
                        placeholder="Ej: React, Python..."
                        className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-accent-500 outline-none"
                    />
                    <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-2.5 rounded-lg transition">
                        Guardar
                    </button>
                    {editId && <button onClick={() => { setNombre(''); setEditId(null) }} className="bg-gray-400 text-white px-4 rounded-lg">Cancelar</button>}
                </form>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Nombre</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tecnologias.map(tec => (
                            <tr key={tec.id_tecnologia} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold text-gray-900">#{tec.id_tecnologia}</td>
                                <td className="px-6 py-4 text-gray-700">{tec.nombre}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => { setNombre(tec.nombre); setEditId(tec.id_tecnologia) }} className="text-accent-600 font-bold text-sm">Editar</button>
                                    <button onClick={() => handleDelete(tec.id_tecnologia)} className="text-red-500 font-bold text-sm">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}