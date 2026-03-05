import { Link } from 'react-router-dom';

export default function DashboardEmpresa() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-900">Dashboard Empresa</h1>
                    <button className="bg-accent-500 text-white font-bold px-4 py-2 rounded shadow hover:bg-accent-600">+ Nueva Oferta</button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center py-12">
                    <p className="text-gray-500 text-lg">Aún no has publicado ofertas.</p>
                </div>
            </div>
        </div>
    );
}