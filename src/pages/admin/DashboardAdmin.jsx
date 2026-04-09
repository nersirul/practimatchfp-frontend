/**
 * Componente: DashboardAdmin
 * Módulo: Views/Admin
 * 
 * Componente del módulo de Administración (SuperAdmin). Gestiona configuraciones, listados y validaciones del sistema.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { Link } from 'react-router-dom';

export default function DashboardAdmin() {
    return (
        <div className="space-y-6">
            
            {/* General Stats - Top Row */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Estadísticas Generales</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    
                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-4 first:pt-0 first:pl-0">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Usuarios Totales:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">👤</span>
                            <span className="text-4xl font-bold text-primary-900">2,540</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Empresas Activas:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl text-gray-500">🏢</span>
                            <span className="text-4xl font-bold text-primary-900">320</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Ofertas Publicadas:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">💼</span>
                            <span className="text-4xl font-bold text-primary-900">1,150</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start pt-4 md:pt-0 md:pl-8">
                        <span className="text-gray-500 font-medium text-sm mb-1 text-center md:text-left w-full">Prácticas en Curso:</span>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl text-gray-500">🤝</span>
                            <span className="text-4xl font-bold text-primary-900">450</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column Left: Validaciones */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Validación de Empresas Pendientes (3)</h2>
                    <div className="space-y-4">
                        
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">TechNova Solutions</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 bg-accent-500 text-white rounded-md text-sm font-semibold hover:bg-accent-600 transition shadow-sm">Validar</button>
                                <button className="px-4 py-1.5 bg-white border border-red-300 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50 transition shadow-sm">Rechazar</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">InnoSoft Ibérica</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 bg-accent-500 text-white rounded-md text-sm font-semibold hover:bg-accent-600 transition shadow-sm">Validar</button>
                                <button className="px-4 py-1.5 bg-white border border-red-300 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50 transition shadow-sm">Rechazar</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">DataDynamics</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-1.5 bg-accent-500 text-white rounded-md text-sm font-semibold hover:bg-accent-600 transition shadow-sm">Validar</button>
                                <button className="px-4 py-1.5 bg-white border border-red-300 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50 transition shadow-sm">Rechazar</button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Column Right: Recientes */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Supervisión de Prácticas Recientes (5)</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">Ana García - Tech Solutions</span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">Iniciada</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">Carlos Ruiz - Cloud Services</span>
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">En revisión</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 last:pb-0">
                            <span className="font-semibold text-gray-700">Elena López - DataCorp</span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Finalizada</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row - Usuarios */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 overflow-x-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Gestión de Usuarios Recientes</h2>
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-bold uppercase tracking-wider">
                            <th className="px-6 py-3 rounded-tl-lg">Usuario</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-right rounded-tr-lg">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-medium">
                        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">Juan Pérez (Alumno)</td>
                            <td className="px-6 py-4">Tech Solutions</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Activo</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-700">•••</button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">María Sánchez (Empresa)</td>
                            <td className="px-6 py-4">Cloud Services</td>
                            <td className="px-6 py-4 text-center">
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">En revisión</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-gray-700">•••</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
