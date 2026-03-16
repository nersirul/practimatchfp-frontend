import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('alumno'); // Valor por defecto
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">PractiMatch FP</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Selector de Rol */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soy:</label>
                        <select
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="alumno">Alumno</option>
                            <option value="empresa">Empresa</option>
                            <option value="profesor">Profesor del Centro</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="tu@email.com"
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}