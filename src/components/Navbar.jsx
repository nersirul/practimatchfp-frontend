/**
 * Componente Navbar.jsx
 * * Es la barra superior de todo el sitio web (tanto dentro como fuera del login).
 * Modela un menú adaptativo con un "hamburguesa" para móviles y un dropdown 
 * de avatar según el perfil extraído dinámicamente del AuthContext.
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

// Importamos el logotipo directamente desde la carpeta assets
import logo from '../assets/logo.png';

export default function Navbar() {
    // Suscripción al bus de contexto para saber en vivo qué sesión existe.
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Estados para controlar los menús desplegables
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Función para cerrar el menú móvil al hacer clic en un enlace
    const closeMobileMenu = () => setIsMobileOpen(false);

    return (
        // NUEVO: Cambiado bg-white por bg-[#f3f3f4]
        <nav className="bg-[#f3f3f4] border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logotipo Dinámico (Solo imagen, mismo espacio) */}
                    <div className="flex items-center">
                        <Link to="/" onClick={closeMobileMenu} className="flex items-center z-50">
                            <img
                                src={logo}
                                alt="Logotipo PractiMatch FP"
                                className="h-12 sm:h-14 w-auto max-w-[200px] sm:max-w-[240px] object-contain object-left"
                            />
                        </Link>
                    </div>

                    {/* ENLACES DE ESCRITORIO (Ocultos en móviles) */}
                    <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium text-sm">
                        <Link to="/ofertas" className="text-primary-900 font-bold hover:text-accent-500 transition-colors flex items-center gap-1">
                            💼 Explorar Ofertas
                        </Link>
                        <Link to="/info-alumnos" className="hover:text-primary-900 transition-colors">Alumnos</Link>
                        <Link to="/info-empresas" className="hover:text-primary-900 transition-colors">Empresas</Link>
                        <Link to="/como-funciona" className="hover:text-primary-900 transition-colors">¿Cómo funciona?</Link>
                    </div>

                    {/* LADO DERECHO: Usuario y Menú Hamburguesa */}
                    <div className="flex items-center gap-4">

                        {/* Módulo Interactivo de Usuario */}
                        <div className="flex items-center">
                            {!user ? (
                                // Renderizado Off-line
                                <div className="hidden md:flex gap-4 items-center">
                                    <Link to="/login" className="bg-primary-900 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-800 transition-colors">
                                        Conectar &gt;
                                    </Link>
                                </div>
                            ) : (
                                // Renderizado On-line: Avatar con mini-dropdown integrado
                                <div className="relative">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-black focus:outline-none">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zM8 11a5 5 0 00-5 5h14a5 5 0 00-5-5H8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="hidden md:block font-semibold">
                                            {user?.id_admin ? 'Administrador' : user?.id_empresa ? 'Empresa' : user?.id_profesor ? 'Profesor' : 'Alumno'}
                                        </span>
                                    </button>

                                    {/* Menú flotante del Avatar */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                                            <Link to="/dashboard" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setIsProfileOpen(false)}>Mi Dashboard</Link>
                                            <button onClick={() => { logout(); navigate('/login'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-medium border-t border-gray-50 mt-1">Cerrar Sesión</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Botón Menú Hamburguesa (Solo Móvil) */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="text-gray-500 hover:text-primary-900 focus:outline-none p-2"
                                aria-label="Abrir menú"
                            >
                                <svg className="h-7 w-7 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE MÓVIL */}
            {isMobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/ofertas" onClick={closeMobileMenu} className="block px-3 py-3 rounded-md text-base font-bold text-primary-900 bg-primary-50">
                            💼 Explorar Ofertas
                        </Link>
                        <Link to="/info-alumnos" onClick={closeMobileMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-900">
                            Alumnos
                        </Link>
                        <Link to="/info-empresas" onClick={closeMobileMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-900">
                            Empresas
                        </Link>
                        <Link to="/como-funciona" onClick={closeMobileMenu} className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-900">
                            ¿Cómo funciona?
                        </Link>

                        {/* Botón de login para móviles si no hay sesión */}
                        {!user && (
                            <div className="pt-4 mt-2 border-t border-gray-100">
                                <Link to="/login" onClick={closeMobileMenu} className="block w-full text-center bg-primary-900 text-white px-6 py-3 rounded-md font-bold hover:bg-primary-800 shadow-sm">
                                    Conectar &gt;
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}