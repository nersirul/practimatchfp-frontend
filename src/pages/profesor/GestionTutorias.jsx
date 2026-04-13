import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function GestionTutorias() {
    const [misAlumnos, setMisAlumnos] = useState([]);
    const [alumnosHuerfanos, setAlumnosHuerfanos] = useState([]);

    useEffect(() => { cargarDatos(); }, []);

    const cargarDatos = async () => {
        const [mis, huerfanos] = await Promise.all([
            client.get('/profesor/mis-alumnos'),
            client.get('/profesor/alumnos/huérfanos')
        ]);
        setMisAlumnos(mis.data);
        setAlumnosHuerfanos(huerfanos.data);
    };

    const toggleTutoria = async (id_alumno, accion) => {
        await client.post(`/profesor/alumnos/${id_alumno}/tutoria`, { accion });
        cargarDatos();
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-900 mb-6">Gestión de mis Alumnos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* MIS ALUMNOS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Mis Alumnos Tutorizados</h2>
                    {misAlumnos.length === 0 ? <p className="text-gray-500">No tienes alumnos asignados.</p> : (
                        <ul className="space-y-3">
                            {misAlumnos.map(a => (
                                <li key={a.id_alumno} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                                    <span className="font-medium">{a.nombre} {a.apellidos}</span>
                                    <button onClick={() => toggleTutoria(a.id_alumno, 'soltar')} className="text-xs text-red-600 font-bold hover:underline">Soltar Alumno</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* ALUMNOS SIN TUTOR (Del mismo centro) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200">
                    <h2 className="text-xl font-bold text-yellow-800 mb-4">Alumnos del Centro sin Tutor</h2>
                    {alumnosHuerfanos.length === 0 ? <p className="text-gray-500">Todos los alumnos tienen tutor.</p> : (
                        <ul className="space-y-3">
                            {alumnosHuerfanos.map(a => (
                                <li key={a.id_alumno} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                                    <span className="font-medium">{a.nombre} {a.apellidos}</span>
                                    <button onClick={() => toggleTutoria(a.id_alumno, 'reclamar')} className="bg-primary-900 text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-primary-800">Reclamar Alumno</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}