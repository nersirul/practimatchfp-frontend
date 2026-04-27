/**
 * Componente: Login
 * Módulo: Views/Public
 * 
 * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import loginImg from '../assets/login-illustration.png';
import usePageTitle from '../hooks/usePageTitle';

export default function Login() {

    usePageTitle("Iniciar Sesión - PractiMatch FP");

    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('alumno'); // Mantenemos el estado para la API
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Intentamos loguear
            await login(email, password, tipo);
            // Si funciona, redirigimos al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setError('Credenciales incorrectas o error de conexión.');
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex bg-[#f8fafc] overflow-hidden relative">
            {/* Background Waves (Simulated with absolute divs for simplicity, or just plain background) */}
            <div className="absolute top-0 left-0 w-full h-48 bg-[#e0f2fe] rounded-b-[100%] opacity-50 transform -translate-y-24 scale-150 z-0"></div>
            <div className="absolute bottom-0 left-0 w-full h-48 bg-[#bae6fd] rounded-t-[100%] opacity-50 transform translate-y-24 scale-150 z-0"></div>

            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center p-6 z-10 relative">
                
                {/* Illustration Side */}
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 pr-0 md:pr-12">
                    <img src={loginImg} alt="Ilustración de conexión" className="max-w-md w-full h-auto drop-shadow-lg rounded-2xl" />
                </div>

                {/* Form Side */}
                <div className="w-full md:w-5/12 bg-white p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <h1 className="text-3xl font-bold mb-2 text-primary-900 leading-tight">
                        Inicia sesión en <span className="text-accent-500">tu<br/>futuro</span>
                    </h1>
                    
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm text-sm" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                        {/* Pequeño selector de rol camuflado como tabs o un select discreto para no romper la API */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de acceso</label>
                            <select
                                value={tipo}
                                onChange={e => setTipo(e.target.value)}
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none text-gray-700"
                            >
                                <option value="alumno">Alumno</option>
                                <option value="empresa">Empresa</option>
                                <option value="profesor">Profesor del Centro</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow"
                                placeholder="Correo electrónico"
                            />
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow"
                                    placeholder="Contraseña"
                                />
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-gray-600">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm text-gray-500 hover:text-accent-600 transition-colors">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-accent-600 transition duration-300 shadow-md transform hover:-translate-y-0.5"
                        >
                            Iniciar Sesión
                        </button>

                        {/* Registro */}
                        <div className="mt-6 text-center text-sm text-gray-600 pt-4">
                            ¿No tienes cuenta? <Link to="/registro" className="text-primary-900 font-bold hover:underline">Regístrate</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}