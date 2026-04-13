/**
 * Componente: Registro
 * Módulo: Views/Public
 * * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/axios';

export default function Registro() {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState('alumno');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    // NUEVO: Estado para almacenar los centros educativos cargados del backend
    const [centros, setCentros] = useState([]);

    // Estado único que engloba todos los campos posibles
    const [formData, setFormData] = useState({
        // Comunes
        email: '', password: '', telefono: '', direccion: '', ciudad: '',
        // Alumno & Profesor
        nombre: '', apellidos: '', nombre_centro: '',
        // Solo Alumno
        nif: '', ciclo: '',
        // Solo Empresa
        cif: '', nombre_comercial: '', telefono_contacto: '', descripcion: '',
        // Solo Profesor
        departamento: ''
    });

    useEffect(() => {
        client.get('/centros')
            .then(res => setCentros(res.data))
            .catch(err => console.error("Error al cargar centros:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            await client.post('/registro', { ...formData, tipo });
            alert("¡Registro completado! Ya puedes iniciar sesión con tu nueva cuenta.");
            navigate('/login');
        } catch (err) {
            if (err.response?.data?.errors) {
                const primerosErrores = Object.values(err.response.data.errors)[0];
                setError(primerosErrores[0]); // Muestra el primer error de validación (ej. email duplicado)
            } else {
                setError("Ocurrió un error al procesar el registro.");
            }
        } finally {
            setCargando(false);
        }
    };

    // Helper para las etiquetas (asterisco rojo para obligatorios)
    const Label = ({ text, required = true }) => (
        <label className="block text-sm font-bold text-gray-700 mb-1">
            {text} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full border border-gray-100">

                <div className="text-center mb-8 border-b pb-6">
                    <h1 className="text-3xl font-bold text-primary-900 mb-2">Crear nueva cuenta</h1>
                    <p className="text-gray-500">Completa tus datos para acceder a la plataforma</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-bold border border-red-100 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SELECTOR DE TIPO (A lo ancho) */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <Label text="¿Qué tipo de usuario eres?" />
                        <select
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-accent-500 font-medium text-primary-900"
                        >
                            <option value="alumno">👨‍🎓 Alumno (Busco Prácticas)</option>
                            <option value="empresa">🏢 Empresa (Ofrezco Prácticas)</option>
                            <option value="profesor">👨‍🏫 Profesor (Tutor de Centro Educativo)</option>
                        </select>
                    </div>

                    {/* NUEVO: BLOQUE DE CENTRO EDUCATIVO (Solo Alumno y Profesor) */}
                    {(tipo === 'alumno' || tipo === 'profesor') && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <Label text="Centro Educativo" />
                            <input
                                list="centros-list"
                                name="nombre_centro"
                                required
                                value={formData.nombre_centro}
                                onChange={handleChange}
                                placeholder="Empieza a escribir tu IES/Centro..."
                                className="w-full p-2 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <datalist id="centros-list">
                                {centros.map(c => <option key={c.id_centro} value={c.nombre} />)}
                            </datalist>
                            <p className="text-xs text-blue-600 mt-1 font-medium">Si tu centro no aparece, escríbelo completo y lo daremos de alta automáticamente.</p>
                        </div>
                    )}

                    {/* BLOQUE DINÁMICO: ALUMNO */}
                    {tipo === 'alumno' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label text="NIF / DNI" /><input type="text" name="nif" required value={formData.nif} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Ciclo Formativo" /><input type="text" name="ciclo" placeholder="Ej: DAW, DAM, ASIR..." required value={formData.ciclo} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Nombre" /><input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Apellidos" /><input type="text" name="apellidos" required value={formData.apellidos} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div><Label text="Teléfono" required={false} /><input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Ciudad" required={false} /><input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Dirección" required={false} /><input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            </div>
                        </>
                    )}

                    {/* BLOQUE DINÁMICO: EMPRESA */}
                    {tipo === 'empresa' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><Label text="CIF" /><input type="text" name="cif" required value={formData.cif} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Nombre Comercial" /><input type="text" name="nombre_comercial" required value={formData.nombre_comercial} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Teléfono de Contacto" /><input type="text" name="telefono_contacto" required value={formData.telefono_contacto} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                                <div><Label text="Ciudad" /><input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            </div>
                            <div>
                                <Label text="Dirección Completa" />
                                <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" />
                            </div>
                            <div>
                                <Label text="Descripción de la empresa" required={false} />
                                <textarea name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500"></textarea>
                            </div>
                        </>
                    )}

                    {/* BLOQUE DINÁMICO: PROFESOR */}
                    {tipo === 'profesor' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><Label text="Nombre" /><input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            <div><Label text="Apellidos" /><input type="text" name="apellidos" required value={formData.apellidos} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            <div><Label text="Departamento Formativo" /><input type="text" name="departamento" placeholder="Ej: Informática y Comunicaciones" required value={formData.departamento} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                            <div><Label text="Teléfono" required={false} /><input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" /></div>
                        </div>
                    )}

                    {/* SECCIÓN COMÚN DE CREDENCIALES (Aislada visualmente) */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Credenciales de Acceso</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label text="Correo Electrónico" />
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" />
                            </div>
                            <div>
                                <Label text="Contraseña (mínimo 6 caracteres)" />
                                <input type="password" name="password" minLength="6" required value={formData.password} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-accent-500" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={cargando} className="w-full bg-primary-900 text-white font-bold py-3.5 rounded-lg shadow-md hover:bg-primary-800 transition disabled:bg-gray-400 mt-4 text-lg">
                        {cargando ? 'Procesando registro...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta? <Link to="/login" className="text-accent-600 font-bold hover:underline">Inicia Sesión aquí</Link>
                </div>
            </div>
        </div>
    );
}