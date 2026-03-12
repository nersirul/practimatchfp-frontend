import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../api/axios';

export default function CrearOferta() {
    const navigate = useNavigate();
    const [catalogoTech, setCatalogoTech] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', modalidad: 'PRESENCIAL',
        es_remunerada: false, posibilidad_contratacion: false, tecnologias: []
    });

    useEffect(() => {
        // Cargar tecnologías para que la empresa elija los requisitos
        client.get('/tecnologias').then(res => setCatalogoTech(res.data));
    }, []);

    const handleTechToggle = (id) => {
        setFormData(prev => {
            const techs = prev.tecnologias.includes(id)
                ? prev.tecnologias.filter(t => t !== id) // Quitar
                : [...prev.tecnologias, id]; // Añadir
            return { ...prev, tecnologias: techs };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.post('/empresa/ofertas', formData);
            alert("¡Oferta enviada! Un administrador la revisará pronto.");
            navigate('/dashboard'); // Volver al panel
        } catch (error) {
            alert("Error al crear la oferta. Revisa los datos.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Crear Nueva Oferta de Prácticas</h1>
            <p className="text-gray-600 mb-8">Rellena los detalles. Las ofertas pasarán por un proceso de validación.</p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                {/* Título y Modalidad */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Título del Puesto</label>
                        <input type="text" required className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 focus:border-accent-500 outline-none"
                            value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                            placeholder="Ej: Desarrollador Frontend Junior" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Modalidad</label>
                        <select className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 outline-none"
                            value={formData.modalidad} onChange={e => setFormData({ ...formData, modalidad: e.target.value })}>
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="REMOTO">Remoto</option>
                            <option value="HIBRIDO">Híbrido</option>
                        </select>
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descripción y Tareas</label>
                    <textarea required rows="5" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 outline-none resize-none"
                        value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describe las tareas que realizará el alumno..."></textarea>
                </div>

                {/* Condiciones (Checks) */}
                <div className="flex gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-accent-600 rounded"
                            checked={formData.es_remunerada} onChange={e => setFormData({ ...formData, es_remunerada: e.target.checked })} />
                        <span className="font-medium text-gray-700">Prácticas Remuneradas (Beca)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-accent-600 rounded"
                            checked={formData.posibilidad_contratacion} onChange={e => setFormData({ ...formData, posibilidad_contratacion: e.target.checked })} />
                        <span className="font-medium text-gray-700">Posibilidad de Contratación</span>
                    </label>
                </div>

                {/* Tecnologías Requeridas */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Requisitos Tecnológicos (Opcional)</label>
                    <div className="flex flex-wrap gap-3">
                        {catalogoTech.map(tech => (
                            <button type="button" key={tech.id_tecnologia}
                                onClick={() => handleTechToggle(tech.id_tecnologia)}
                                className={`px-4 py-2 rounded-full border text-sm font-bold transition ${formData.tecnologias.includes(tech.id_tecnologia)
                                        ? 'bg-accent-500 text-white border-accent-600 shadow-md'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                    }`}>
                                {tech.nombre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100">Cancelar</button>
                    <button type="submit" className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition">Enviar Oferta</button>
                </div>
            </form>
        </div>
    );
}