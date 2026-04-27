import { useState, useEffect } from 'react';
import client from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';

export default function PerfilProfesor() {
    
    usePageTitle("Perfil del Profesor - Supervisión FCT");

    const { user, setUser } = useAuth(); // Para actualizar el Navbar instantáneamente
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '', apellidos: '', telefono: '', departamento: ''
    });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        // Precargar datos del usuario logueado
        if (user) {
            setFormData({
                nombre: user.nombre || '',
                apellidos: user.apellidos || '',
                telefono: user.telefono || '',
                departamento: user.departamento || ''
            });
        }
    }, [user]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGuardando(true);
        try {
            await client.put('/profesor/perfil', formData);
            alert("Perfil actualizado correctamente");

            // Actualizamos el contexto global para que el Header refleje el cambio de nombre
            setUser({ ...user, ...formData });
            navigate('/dashboard'); // Devolvemos al profesor a su panel
        } catch (error) {
            alert("Error al actualizar el perfil.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-900">Mi Perfil Docente</h1>
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 font-bold">&larr; Volver</button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                        <input type="text" name="nombre" required className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-accent-500" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Apellidos</label>
                        <input type="text" name="apellidos" required className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-accent-500" value={formData.apellidos} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Teléfono de Contacto</label>
                        <input type="text" name="telefono" className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-accent-500" value={formData.telefono} onChange={handleChange} placeholder="Opcional" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Departamento</label>
                        <select name="departamento" required className="w-full border p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 bg-white" value={formData.departamento} onChange={handleChange}>
                            <option value="">Selecciona un departamento...</option>
                            <option value="Informática">Informática y Comunicaciones</option>
                            <option value="Sistemas y Redes">Sistemas y Redes</option>
                            <option value="Desarrollo Web">Desarrollo Web y Multiplataforma</option>
                            <option value="Ciberseguridad">Ciberseguridad</option>
                            <option value="Administración">Administración</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition">
                        Cancelar
                    </button>
                    <button type="submit" disabled={guardando} className="bg-primary-900 text-white px-8 py-2.5 rounded-lg font-bold shadow-md hover:bg-primary-800 disabled:opacity-50 transition">
                        {guardando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
}