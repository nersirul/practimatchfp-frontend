import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../api/axios';

export default function EditarOferta() {
    const { id_oferta } = useParams();
    const navigate = useNavigate();
    const [catalogoTech, setCatalogoTech] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', modalidad: 'PRESENCIAL', vacantes: '',
        es_remunerada: false, posibilidad_contratacion: false, tecnologias: []
    });

    useEffect(() => {
        cargarDatos();
    }, [id_oferta]);

    const cargarDatos = async () => {
        try {
            const [resTech, resOferta] = await Promise.all([
                client.get('/tecnologias'),
                client.get(`/ofertas/${id_oferta}`) // Reutilización del endpoint público de detalle
            ]);

            setCatalogoTech(resTech.data);

            const oferta = resOferta.data;
            setFormData({
                titulo: oferta.titulo,
                descripcion: oferta.descripcion,
                modalidad: oferta.modalidad,
                vacantes: oferta.vacantes === null ? '' : oferta.vacantes,
                es_remunerada: oferta.es_remunerada,
                posibilidad_contratacion: oferta.posibilidad_contratacion,
                tecnologias: oferta.tecnologias.map(t => t.id_tecnologia) // Mapeo selectivo de Primary Keys
            });
        } catch (error) {
            alert("No se pudo cargar la oferta.");
            navigate(-1);
        } finally {
            setCargando(false);
        }
    };

    const handleTechToggle = (id) => {
        setFormData(prev => ({
            ...prev,
            tecnologias: prev.tecnologias.includes(id)
                ? prev.tecnologias.filter(t => t !== id)
                : [...prev.tecnologias, id]
        }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                vacantes: formData.vacantes === '' ? null : parseInt(formData.vacantes, 10)
            };

            // Persistencia de modificaciones mediante endpoint compartido
            await client.put(`/ofertas/${id_oferta}/editar`, payload);
            alert("¡Oferta actualizada con éxito!");
            navigate(-1); // Retorno al historial de navegación anterior
        } catch (error) {
            alert(error.response?.data?.error || "Error al actualizar la oferta.");
        }
    };

    if (cargando) return <div className="text-center p-12 text-gray-500">Cargando datos de la oferta...</div>;

    // Estructura heredada de la vista de creación con ligeras adaptaciones de título al contexto de mutación
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary-900">Editar Oferta</h1>
                <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-800 font-bold">&larr; Volver</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Título del Puesto</label>
                        <input type="text" name="titulo" required className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 focus:border-accent-500 outline-none"
                            value={formData.titulo} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Modalidad</label>
                        <select name="modalidad" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 outline-none"
                            value={formData.modalidad} onChange={handleChange}>
                            <option value="PRESENCIAL">Presencial</option>
                            <option value="REMOTO">Remoto</option>
                            <option value="HIBRIDO">Híbrido</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nº Vacantes (Opcional)</label>
                        <input type="number" name="vacantes" min="1" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 focus:border-accent-500 outline-none"
                            value={formData.vacantes} onChange={handleChange} placeholder="Ilimitadas si está vacío" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Descripción y Tareas</label>
                    <textarea name="descripcion" required rows="5" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-accent-500 outline-none resize-none"
                        value={formData.descripcion} onChange={handleChange}></textarea>
                </div>

                <div className="flex gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-accent-600 rounded" checked={formData.es_remunerada} onChange={e => setFormData({ ...formData, es_remunerada: e.target.checked })} />
                        <span className="font-medium text-gray-700">Prácticas Remuneradas (Beca)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-accent-600 rounded" checked={formData.posibilidad_contratacion} onChange={e => setFormData({ ...formData, posibilidad_contratacion: e.target.checked })} />
                        <span className="font-medium text-gray-700">Posibilidad de Contratación</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Requisitos Tecnológicos</label>
                    <div className="flex flex-wrap gap-3">
                        {catalogoTech.map(tech => (
                            <button type="button" key={tech.id_tecnologia} onClick={() => handleTechToggle(tech.id_tecnologia)}
                                className={`px-4 py-2 rounded-full border text-sm font-bold transition ${formData.tecnologias.includes(tech.id_tecnologia) ? 'bg-accent-500 text-white border-accent-600 shadow-md' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                                {tech.nombre}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t flex justify-end gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100">Cancelar</button>
                    <button type="submit" className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-2.5 rounded-lg font-bold shadow-md transition">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
}