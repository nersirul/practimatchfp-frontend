/**
 * AdminLayout.jsx
 * 
 * Esqueleto principal (HOC Layout) exclusivo para los Usuarios Administradores.
 * A diferencia del layout estándar horizontal, proporciona un modelo de navegación 
 * Sidebar izquierdo (menú lateral) orientado a tableros de control complejos y 
 * listados de mantenedor (CRUD). Reutiliza la misma Navbar superior que todos.
 */

import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
    const location = useLocation();

    /**
     * Detector analítico de la ruta actual.
     * Evalúa si una URL concreta coincide con la posición real del Router
     * para aplicar o retirar estilos de "enlace activo" (highlight) dinámicamente en el menú.
     * @param {string} path Ruta a evaluar.
     * @returns {boolean}
     */
    const isActive = (path) => location.pathname === path || (path === '/dashboard' && location.pathname === '/admin/dashboard');

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] font-sans text-gray-800 flex flex-col">
            <Navbar />

            <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-primary-900 tracking-tight">Panel de Administración</h1>
                </header>

                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* BARRA LATERAL (SIDEBAR) */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <nav className="space-y-1">
                            <div className="text-xs font-bold text-gray-400 uppercase mb-3 px-3">Menú Principal</div>

                            <Link 
                                to="/dashboard" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${isActive('/dashboard') ? 'bg-accent-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path></svg>
                                Dashboard General
                            </Link>

                            <Link 
                                to="/admin/usuarios" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${isActive('/admin/usuarios') ? 'bg-accent-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                Gestión de Usuarios
                            </Link>

                            <Link 
                                to="/admin/empresas/validar" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${isActive('/admin/empresas/validar') ? 'bg-accent-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                Validación de Empresas
                            </Link>

                            <Link 
                                to="/admin/ofertas/validar" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${isActive('/admin/ofertas/validar') ? 'bg-accent-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Supervisión de Prácticas
                            </Link>
                            
                            <Link 
                                to="/admin/tecnologias" 
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors mt-6 ${isActive('/admin/tecnologias') ? 'bg-accent-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-900'}`}
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Tecnologías (Config)
                            </Link>

                        </nav>
                    </aside>

                    {/* VENTANA DE CONTENIDO (Páginas insertadas en la etiqueta Outlet del Router) */}
                    <main className="flex-1 w-full relative">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}