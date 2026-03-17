import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/axios';

export default function DashboardProfesor() {
    const { user } = useAuth();
    const [practicas, setPracticas] = useState([]);

    // Estado para el modal de evaluación
    const [evaluandoId, setEvaluandoId] = useState(null);
    const [formEval, setFormEval] = useState({ calificacion: 'APTO', nota_numerica: 5, comentarios_profesor: '' });

    useEffect(() => { cargarPracticas(); }, []);

    const cargarPracticas = async () => {
        const res = await client.get('/profesor/practicas');
        setPracticas(res.data);
    };

    const submitEvaluacion = async (e) => {
        e.preventDefault();
        try {
            await client.post(`/profesor/practicas/${evaluandoId}/evaluar`, formEval);
            alert("Práctica evaluada con éxito.");
            setEvaluandoId(null);
            cargarPracticas();
        } catch (error) { alert("Error al guardar la evaluación."); }
    };

    // FUNCIÓN MÁGICA PARA DESCARGAR PDF CON AXIOS Y SANCTUM
    const descargarPDF = async (id_practica) => {
        try {
            const res = await client.get(`/practicas/${id_practica}/pdf`, { responseType: 'blob' });
            // Crear un enlace temporal en memoria para descargar el Blob
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `informe_fct_${id_practica}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) { alert("Error al generar el PDF."); }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-primary-900 mb-2">Panel de Supervisión FCT</h1>
                <p className="text-gray-600 mb-8">Bienvenido/a, Profesor/a {user?.nombre}. Aquí puedes evaluar las prácticas en curso.</p>

                {practicas.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500 border border-gray-100">
                        No hay alumnos realizando prácticas actualmente.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {practicas.map(p => (
                            <div key={p.id_practica} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-primary-900">👨‍🎓 {p.alumno.nombre} {p.alumno.apellidos}</h3>
                                    <p className="text-sm text-gray-600 mt-1">🏢 Empresa: <strong>{p.oferta.empresa.nombre_comercial}</strong></p>
                                    <p className="text-sm text-gray-500">Puesto: {p.oferta.titulo}</p>
                                </div>

                                <div className="text-right flex flex-col items-end gap-2">
                                    {p.estado === 'EN_CURSO' ? (
                                        <>
                                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold mb-2">En Curso (Pendiente Evaluar)</span>
                                            <button onClick={() => setEvaluandoId(p.id_practica)} className="bg-accent-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-accent-600 shadow-sm transition">
                                                📝 Evaluar Alumno
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold mb-2">Finalizada - Nota: {p.valoracion?.nota_numerica}</span>
                                            <button onClick={() => descargarPDF(p.id_practica)} className="bg-primary-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-800 shadow-sm transition flex items-center gap-2">
                                                📄 Descargar Informe PDF
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* MODAL DE EVALUACIÓN (Se muestra si evaluandoId no es null) */}
                {evaluandoId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
                            <h2 className="text-2xl font-bold text-primary-900 mb-4">Evaluar Práctica</h2>
                            <form onSubmit={submitEvaluacion} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Calificación</label>
                                    <select value={formEval.calificacion} onChange={e => setFormEval({ ...formEval, calificacion: e.target.value })} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-accent-500">
                                        <option value="APTO">Apto</option>
                                        <option value="NO APTO">No Apto</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nota Numérica (1-10)</label>
                                    <input type="number" min="1" max="10" value={formEval.nota_numerica} onChange={e => setFormEval({ ...formEval, nota_numerica: e.target.value })} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-accent-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Comentarios</label>
                                    <textarea rows="3" value={formEval.comentarios_profesor} onChange={e => setFormEval({ ...formEval, comentarios_profesor: e.target.value })} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-accent-500" placeholder="Observaciones finales..."></textarea>
                                </div>
                                <div className="flex gap-2 justify-end mt-6">
                                    <button type="button" onClick={() => setEvaluandoId(null)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">Cancelar</button>
                                    <button type="submit" className="bg-accent-500 text-white px-6 py-2 rounded font-bold shadow hover:bg-accent-600">Guardar Evaluación</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}