import { useEffect, useState } from 'react';
import client from '../../api/axios';

export default function MisCandidaturas() {
    const [candidaturas, setCandidaturas] = useState([]);

    useEffect(() => {
        client.get('/alumno/candidaturas').then(res => setCandidaturas(res.data));
    }, []);

    const getEstado = (estado) => {
        switch (estado) {
            case 'SOLICITADA': return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">Enviada</span>;
            case 'EN_CURSO': return <span className="bg-status-active text-status-activeText px-3 py-1 rounded-full text-xs font-bold">Aceptada</span>;
            case 'RECHAZADA': return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Rechazada</span>;
            default: return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold">{estado}</span>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-primary-900 mb-6">Mis Candidaturas</h1>

                {candidaturas.length === 0 ? (
                    <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
                        Aún no has solicitado ninguna práctica. ¡Ve al buscador!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {candidaturas.map(c => (
                            <div key={c.id_practica} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-primary-900">{c.oferta?.titulo}</h3>
                                    <p className="text-sm text-gray-600">🏢 Empresa: {c.oferta?.empresa?.nombre_comercial}</p>
                                    <p className="text-xs text-gray-400 mt-1">Solicitado el {new Date(c.created_at).toLocaleDateString()}</p>
                                </div>
                                <div>{getEstado(c.estado)}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}