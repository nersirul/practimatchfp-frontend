import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center text-white font-bold">P</div>
                            <span className="text-xl font-bold text-primary-900">PractiMatch<span className="text-blue-600">FP</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                        <Link to="/dashboard" className="hover:text-primary-900">Inicio</Link>
                        {user?.id_alumno && <Link to="/alumno/perfil" className="hover:text-primary-900">Mi Perfil</Link>}
                    </div>

                    <div className="flex items-center">
                        <div className="relative ml-3">
                            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border">👤</div>
                                <span className="hidden md:block">{user?.nombre}</span>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-50">
                                    <button onClick={() => { logout(); navigate('/login') }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Cerrar Sesión</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}