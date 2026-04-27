/**
 * Componente: PerfilEmpresa
 * Módulo: Views/Empresa
 * 
 * Componente del perfil Empresa. Facilita la creación de vacantes y la validación de postulantes.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useEffect, useState } from 'react';
import client from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';

export default function PerfilEmpresa() {

    usePageTitle("Perfil de la Empresa");
    
    const [perfil, setPerfil] = useState({ nombre_comercial: '', cif: '', telefono_contacto: '', direccion: '', ciudad: '', descripcion: '' });


    useEffect(() => {
        client.get('/empresa/perfil').then(res => setPerfil(res.data));
    }, []);

    const guardar = async (e) => {
        e.preventDefault();
        try {
            await client.put('/empresa/perfil', perfil);
            alert("Datos de la empresa actualizados.");
        } catch (error) { alert("Error al guardar"); }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-primary-900">Perfil de la Empresa</h1>
            <form onSubmit={guardar} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Comercial</label>
                        <input type="text" value={perfil.nombre_comercial || ''} onChange={e => setPerfil({ ...perfil, nombre_comercial: e.target.value })} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">CIF</label>
                        <input type="text" value={perfil.cif || ''} onChange={e => setPerfil({ ...perfil, cif: e.target.value })} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono Contacto</label>
                        <input type="text" value={perfil.telefono_contacto || ''} onChange={e => setPerfil({ ...perfil, telefono_contacto: e.target.value })} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Ciudad</label>
                        <input type="text" value={perfil.ciudad || ''} onChange={e => setPerfil({ ...perfil, ciudad: e.target.value })} className="w-full border p-2 rounded" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Dirección Completa</label>
                    <input type="text" value={perfil.direccion || ''} onChange={e => setPerfil({ ...perfil, direccion: e.target.value })} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descripción de la Empresa</label>
                    <textarea rows="4" value={perfil.descripcion || ''} onChange={e => setPerfil({ ...perfil, descripcion: e.target.value })} className="w-full border p-2 rounded"></textarea>
                </div>

                <button type="submit" className="bg-primary-900 text-white px-6 py-2 rounded-lg font-bold">Guardar Empresa</button>
            </form>
        </div>
    );
}