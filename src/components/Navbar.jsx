/**
 * Componente Navbar.jsx
 * * Es la barra superior de todo el sitio web (tanto dentro como fuera del login).
 * Modela un menú "hamburguesa/avatar" que cambia adaptativamente según el 
 * perfil extraído dinámicamente del AuthContext.
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    // Suscripción al bus de contexto para saber en vivo qué sesión existe.
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Estado para controlar el despliegue del menú dropdown móvil/avatar
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logotipo vectorial estático */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex items-center text-primary-900">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="16" r="6" fill="#14B8A6" />
                                    <path d="M14 16 L22 8 M14 16 L22 24" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="24" cy="8" r="4" fill="#0F172A" />
                                    <circle cx="24" cy="24" r="4" fill="#0F172A" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-primary-900 tracking-tight">PractiMatch<span className="font-light">FP</span></span>
                        </Link>
                    </div>

                    {/* Enlaces de interés públicos */}
                    <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium text-sm">
                        {/* NUEVO ENLACE: El Catálogo para atraer visitantes */}
                        <Link to="/ofertas" className="text-primary-900 font-bold hover:text-accent-500 transition-colors flex items-center gap-1">
                            💼 Explorar Ofertas
                        </Link>
                        <Link to="/info-alumnos" className="hover:text-primary-900 transition-colors">Alumnos</Link>
                        <Link to="/info-empresas" className="hover:text-primary-900 transition-colors">Empresas</Link>
                        <Link to="/como-funciona" className="hover:text-primary-900 transition-colors">¿Cómo funciona?</Link>
                    </div>

                    {/* Módulo Interactivo de Usuario */}
                    <div className="flex items-center">
                        {!user ? (
                            // Renderizado Off-line (Call To Action para Registros)
                            <div className="flex gap-4 items-center">
                                <Link to="/login" className="bg-primary-900 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-800 transition-colors">
                                    Conectar &gt;
                                </Link>
                            </div>
                        ) : (
                            // Renderizado On-line: Avatar con mini-dropdown integrado
                            <div className="relative ml-3">
                                <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-black focus:outline-none">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zM8 11a5 5 0 00-5 5h14a5 5 0 00-5-5H8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="hidden md:block font-semibold">
                                        {/* Auto-etiquetado según la ForeignKey en el modelo Poly User */}
                                        {user?.id_admin ? 'Administrador' : user?.id_empresa ? 'Empresa' : user?.id_profesor ? 'Profesor' : 'Alumno'}
                                    </span>
                                </button>

                                {/* Menú flotante del Avatar */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                                        <Link to="/dashboard" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Mi Dashboard</Link>
                                        <button onClick={() => { logout(); navigate('/login') }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Cerrar Sesión</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}