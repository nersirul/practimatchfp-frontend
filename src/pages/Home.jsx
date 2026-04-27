/**
 * Componente: Home
 * Módulo: Views/Public
 * 
 * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-illustration.png';
import usePageTitle from '../hooks/usePageTitle';

export default function Home() {

  usePageTitle("Inicio - PractiMatch FP");

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 pt-10 pb-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Potencia tu futuro profesional <br />
              <span className="font-medium text-gray-600 text-3xl">en Formación Profesional</span>
            </h1>
            <p className="text-xl text-primary-900 font-semibold">
              Toda la FCT a tu alcance <br />
              <span className="font-normal text-gray-500">en un solo lugar.</span>
            </p>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <img src={heroImg} alt="Estudiantes conectando con empresas" className="max-w-full h-auto drop-shadow-md rounded-lg" style={{ maxHeight: '300px' }} />
          </div>
        </div>
      </section>

      {/* Main Buttons Section */}
      <section className="max-w-4xl mx-auto px-4 -mt-6 z-10 relative">
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/login" className="bg-primary-900 text-white text-center py-4 rounded-md shadow-lg hover:bg-primary-800 transition-colors text-lg font-semibold block w-full">
            Soy Alumno: Buscar Prácticas
          </Link>
          <Link to="/login" className="bg-accent-500 text-white text-center py-4 rounded-md shadow-lg hover:bg-accent-600 transition-colors text-lg font-semibold block w-full">
            Soy Empresa: Publicar Oferta
          </Link>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">Ofertas de Prácticas</h3>
              <p className="text-gray-600 mt-4 text-sm max-w-[200px]">Encuentra las mejores oportunidades en tu sector.</p>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <Link to="/ofertas" className="text-primary-900 font-bold hover:underline flex items-center gap-1">
                Ver ofertas <span className="text-lg">&gt;</span>
              </Link>
              <div className="w-16 h-12 bg-primary-900 rounded-md shadow flex items-center justify-center">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-2">Programas de Prácticas</h3>
              <p className="text-gray-600 mt-4 text-sm max-w-[200px]">Inicia tus prácticas en empresas destacadas.</p>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <Link to="/empresas" className="text-primary-900 font-bold hover:underline flex items-center gap-1">
                Saber más <span className="text-lg">&gt;</span>
              </Link>
              <div className="w-16 h-12 flex items-center justify-center">
                 <span className="text-4xl">🤝</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-white py-16 text-center border-t border-gray-200">
        <h2 className="text-2xl font-bold text-primary-900 mb-12">
          Conecta con tu <span className="text-accent-500">futuro</span> hoy
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-20 right-20 h-0.5 bg-gray-200 -z-10"></div>
          
          <div className="flex flex-col items-center bg-white px-4 z-10 mb-8 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-white shadow flex items-center justify-center text-4xl mb-4">👦🏻</div>
            <p className="text-gray-700 font-medium">Regístrate</p>
          </div>
          <div className="flex flex-col items-center bg-white px-4 z-10 mb-8 md:mb-0">
            <div className="w-24 h-24 rounded-full bg-orange-50 border-4 border-white shadow flex items-center justify-center text-4xl mb-4">👩🏻</div>
            <p className="text-gray-700 font-medium">Aplica</p>
          </div>
          <div className="flex flex-col items-center bg-white px-4 z-10">
            <div className="w-24 h-24 rounded-full bg-teal-50 border-4 border-white shadow flex items-center justify-center text-4xl mb-4">👨🏽‍💼</div>
            <p className="text-gray-700 font-medium">Gana Experiencia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
