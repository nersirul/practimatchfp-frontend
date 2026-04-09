/**
 * Componente: DashboardAlumno
 * Módulo: Views/Alumno
 * 
 * Componente del perfil Alumno. Permite visualizar y gestionar candidaturas, perfil y catálogo de ofertas públicas.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function DashboardAlumno() {
    const { user } = useAuth();

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] p-6 text-gray-800">
            <div className="max-w-5xl mx-auto mt-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary-900 tracking-tight">¡Hola, {user?.nombre || 'Alumno'}!</h1>
                    <p className="text-xl text-gray-700 tracking-tight mt-1">Tu panel de prácticas.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column - Stats & Quick Links */}
                    <div className="w-full md:w-[350px] space-y-6">
                        
                        {/* Summary Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-6 text-primary-900">Resumen de solicitudes</h3>
                            <div className="flex justify-between items-center px-2">
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold text-primary-900">5</span>
                                    <span className="text-sm font-medium text-gray-600 mt-1">Enviadas</span>
                                    <div className="mt-2 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold text-primary-900">2</span>
                                    <span className="text-sm font-medium text-gray-600 mt-1">En proceso</span>
                                    <div className="mt-2 w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl font-bold text-primary-900">1</span>
                                    <span className="text-sm font-medium text-gray-600 mt-1">Seleccionado</span>
                                    <div className="mt-2 w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-accent-500">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Access Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4 text-primary-900">Acceso rápido a:</h3>
                            <div className="space-y-3">
                                <Link to="/ofertas" className="flex items-center gap-3 w-full bg-accent-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    Buscar ofertas
                                </Link>
                                <Link to="/mis-candidaturas" className="flex items-center gap-3 w-full bg-[#1e40af] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path></svg>
                                    Mis solicitudes
                                </Link>
                                <Link to="/alumno/perfil" className="flex items-center gap-3 w-full bg-primary-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-800 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zM8 11a5 5 0 00-5 5h14a5 5 0 00-5-5H8z" clipRule="evenodd"></path></svg>
                                    Mi perfil
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Featured Offers */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4 text-primary-900">Ofertas destacadas</h3>
                        <div className="space-y-4">
                            
                            {/* Card 1 */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="text-lg font-bold text-primary-900">Prácticas Desarrollo Web (Full Stack)</h4>
                                <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                    Madrid
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="text-lg font-bold text-primary-900">Desarrollador Front-End Junior</h4>
                                <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path></svg>
                                    Tech Solutions
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="text-lg font-bold text-primary-900">Técnico de Sistemas y Redes</h4>
                                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path></svg>
                                        Cloud Services
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        Presencial
                                    </span>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                <h4 className="text-lg font-bold text-primary-900">Analista de Datos Junior</h4>
                                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1">
                                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path></svg>
                                        DataCorp
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        Sevilla | Empleo
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}