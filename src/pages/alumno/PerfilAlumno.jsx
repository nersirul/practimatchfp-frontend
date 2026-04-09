/**
 * Componente: PerfilAlumno
 * Módulo: Views/Alumno
 * 
 * Componente del perfil Alumno. Permite visualizar y gestionar candidaturas, perfil y catálogo de ofertas públicas.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function PerfilAlumno() {
    const [perfil, setPerfil] = useState({ nombre: '', apellidos: '', ciclo: '', modalidad_preferida: 'PRESENCIAL' });
    const [misTecnologias, setMisTecnologias] = useState([]);
    const [catalogo, setCatalogo] = useState([]);

    useEffect(() => {
        const load = async () => {
            const resCat = await client.get('/tecnologias');
            setCatalogo(resCat.data);
            const resPer = await client.get('/alumno/perfil');
            const { tecnologias, ...data } = resPer.data;
            setPerfil(data);
            setMisTecnologias(tecnologias.map(t => ({
                id_tecnologia: t.id_tecnologia, nivel: t.pivot.nivel, tipo_relacion: t.pivot.tipo_relacion
            })));
        };
        load();
    }, []);

    const toggleTech = (id, checked) => {
        if (checked) setMisTecnologias([...misTecnologias, { id_tecnologia: id, nivel: 1, tipo_relacion: 'CONOCE' }]);
        else setMisTecnologias(misTecnologias.filter(t => t.id_tecnologia !== id));
    };

    const updateTech = (id, field, val) => {
        setMisTecnologias(misTecnologias.map(t => t.id_tecnologia === id ? { ...t, [field]: val } : t));
    };

    const guardar = async (e) => {
        e.preventDefault();
        try {
            await client.put('/alumno/perfil', { ...perfil, tecnologias: misTecnologias });
            alert("Perfil guardado con éxito.");
        } catch (e) { alert("Error al guardar."); }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-primary-900">Editar Perfil Profesional</h1>
                <form onSubmit={guardar} className="space-y-6">
                    {/* Datos Personales */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 gap-4">
                        <h2 className="col-span-2 font-bold text-lg border-b pb-2 mb-2">Datos Personales</h2>
                        <input type="text" value={perfil.nombre} onChange={e => setPerfil({ ...perfil, nombre: e.target.value })} className="border p-2 rounded" placeholder="Nombre" />
                        <input type="text" value={perfil.apellidos} onChange={e => setPerfil({ ...perfil, apellidos: e.target.value })} className="border p-2 rounded" placeholder="Apellidos" />
                        <input type="text" value={perfil.ciclo} onChange={e => setPerfil({ ...perfil, ciclo: e.target.value })} className="border p-2 rounded" placeholder="Ciclo (DAW/DAM)" />
                        <input type="text" value={perfil.telefono || ''} onChange={e => setPerfil({ ...perfil, telefono: e.target.value })} className="border p-2 rounded" placeholder="Teléfono" />
                        <input type="text" value={perfil.direccion || ''} onChange={e => setPerfil({ ...perfil, direccion: e.target.value })} className="border p-2 rounded" placeholder="Dirección"/>
                        <input type="text" value={perfil.ciudad || ''} onChange={e => setPerfil({ ...perfil, ciudad: e.target.value })} className="border p-2 rounded" placeholder="Ciudad" />
                        <select value={perfil.modalidad_preferida} onChange={e => setPerfil({ ...perfil, modalidad_preferida: e.target.value })} className="border p-2 rounded">
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="REMOTO">Remoto</option>
                            <option value="HIBRIDO">Híbrido</option>
                        </select>
                    </div>

                    {/* Tecnologías */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg border-b pb-2 mb-4">Mis Habilidades</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {catalogo.map(tech => {
                                const sel = misTecnologias.find(mt => mt.id_tecnologia === tech.id_tecnologia);
                                return (
                                    <div key={tech.id_tecnologia} className={`p-3 border rounded-lg ${sel ? 'bg-accent-50 border-accent-200' : 'bg-gray-50'}`}>
                                        <div className="flex items-center mb-2">
                                            <input type="checkbox" checked={!!sel} onChange={(e) => toggleTech(tech.id_tecnologia, e.target.checked)} className="h-5 w-5 text-accent-600 rounded" />
                                            <span className="ml-2 font-bold text-gray-700">{tech.nombre}</span>
                                        </div>
                                        {sel && (
                                            <div className="ml-7 flex gap-2">
                                                <select value={sel.tipo_relacion} onChange={e => updateTech(tech.id_tecnologia, 'tipo_relacion', e.target.value)} className="text-sm border rounded p-1">
                                                    <option value="CONOCE">Conozco</option>
                                                    <option value="INTERES">Interés</option>
                                                </select>
                                                {sel.tipo_relacion === 'CONOCE' && (
                                                    <input type="number" min="1" max="10" value={sel.nivel} onChange={e => updateTech(tech.id_tecnologia, 'nivel', e.target.value)} className="text-sm border rounded p-1 w-16" placeholder="Nvl" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <button type="submit" className="bg-primary-900 text-white px-8 py-3 rounded-lg font-bold shadow hover:bg-primary-800 w-full">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}