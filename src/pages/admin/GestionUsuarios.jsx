/**
 * Componente: GestionUsuarios
 * Módulo: Views/Admin
 * 
 * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';
import { useAuth } from '../../context/AuthContext'; // <-- IMPORTAMOS ESTO

export default function GestionUsuarios() {
    const { user } = useAuth(); // <-- OBTENEMOS EL USUARIO LOGUEADO
    const [tipoSeleccionado, setTipoSeleccionado] = useState('alumnos');
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => { cargarUsuarios(); }, [tipoSeleccionado]);

    const cargarUsuarios = async () => {
        setCargando(true);
        try {
            const res = await client.get(`/admin/usuarios/${tipoSeleccionado}`);
            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    // Helpers
    const getId = (u) => u.id_alumno || u.id_empresa || u.id_profesor || u.id_admin;
    const getNombre = (u) => u.nombre ? `${u.nombre} ${u.apellidos || ''}` : u.nombre_comercial;
    const getEmail = (u) => u.email || u.email_contacto;

    const handleDelete = async (id, nombre) => {
        if (!confirm(`🚨 ¿ESTÁS SEGURO? Vas a dar de baja a ${nombre}. No se borrará de la base de datos (Soft Delete), pero no podrá iniciar sesión.`)) return;

        try {
            await client.delete(`/admin/usuarios/${tipoSeleccionado}/${id}`);
            alert("Usuario dado de baja correctamente.");
            cargarUsuarios();
        } catch (error) {
            // Si el backend escupe el error 403 de "no puedes borrarte a ti mismo" (o cualquier otro)
            alert(error.response?.data?.error || "Error al borrar el usuario.");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Gestor Global de Usuarios</h1>
            <p className="text-gray-600 mb-8">Administra a todos los usuarios de la plataforma (Listado y Bajas).</p>

            {/* Pestañas / Selector */}
            <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm border border-gray-100 inline-flex">
                {['alumnos', 'empresas', 'profesores', 'administradores'].map(tipo => (
                    <button
                        key={tipo}
                        onClick={() => setTipoSeleccionado(tipo)}
                        className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition ${tipoSeleccionado === tipo ? 'bg-primary-900 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {tipo}
                    </button>
                ))}
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {cargando ? (
                    <div className="p-10 text-center text-gray-500">Cargando datos...</div>
                ) : usuarios.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No hay registros en esta categoría.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                                <th className="p-4 font-bold uppercase">ID</th>
                                <th className="p-4 font-bold uppercase">Nombre / Entidad</th>
                                <th className="p-4 font-bold uppercase">Email</th>
                                <th className="p-4 font-bold uppercase">Fecha Registro</th>
                                <th className="p-4 font-bold uppercase text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(u => {
                                // LÓGICA DE PROTECCIÓN VISUAL
                                const esElMismoAdmin = tipoSeleccionado === 'administradores' && u.id_admin === user?.id_admin;

                                return (
                                    <tr key={getId(u)} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="p-4 font-mono text-xs text-gray-500">#{getId(u)}</td>
                                        <td className="p-4 font-bold text-primary-900">{getNombre(u)}</td>
                                        <td className="p-4 text-gray-600 text-sm">{getEmail(u)}</td>
                                        <td className="p-4 text-gray-500 text-sm">{new Date(u.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 text-right">

                                            {esElMismoAdmin ? (
                                                <span className="text-gray-400 font-medium text-sm px-3 py-1.5 cursor-not-allowed">
                                                    Usuario Actual
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleDelete(getId(u), getNombre(u))}
                                                    className="text-red-600 hover:text-red-800 font-bold text-sm bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition"
                                                >
                                                    Dar de baja
                                                </button>
                                            )}

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}