/**
 * Componente: InfoEmpresas
 * Módulo: Views/Public
 * 
 * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const InfoEmpresas = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="bg-gray-800 border border-gray-700 text-gray-300 text-sm font-semibold tracking-wider uppercase py-1 px-3 rounded-full mb-6">
            Para Empresas y Startups
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            El mejor talento técnico, directo a tu empresa. <span className="text-indigo-400">Gratis y organizado.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light mb-10 max-w-2xl mx-auto">
            Publica tus vacantes de prácticas FCT y atrae a estudiantes formados y motivados de centros oficiales. Simplifica la captación de talento junior.
          </p>
          <Link to="/registro" className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-colors text-lg flex items-center gap-2">
            Registrar mi Empresa
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
          <p className="text-xs text-gray-500 mt-4">* El registro de empresa está sujeto a validación por un Centro Educativo (SuperAdmin).</p>
        </div>
      </section>

      {/* Features Destacadas */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Feature 1: Entorno seguro y validado */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Entorno seguro y validado</h3>
            <p className="text-gray-600 leading-relaxed">
              Trata únicamente con alumnos reales pertenecientes a centros formativos oficiales. Nosotros nos encargamos de verificar la identidad de cada actor. Para garantizar la seguridad, las empresas también deben ser aprobadas primero por un administrador del centro.
            </p>
          </div>

          {/* Feature 2: Filtros inteligentes */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Filtros inteligentes</h3>
            <p className="text-gray-600 leading-relaxed">
              ¿Buscas un perfil enfocado en React puro o un experto configurando servidores Linux? Utiliza nuestras etiquetas tecnológicas y encuentra al alumno que encaja como un guante en el stack que realmente necesitas.
            </p>
          </div>

          {/* Feature 3: Gestión centralizada */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gestión centralizada</h3>
            <p className="text-gray-600 leading-relaxed">
              Acepta o rechaza candidatos desde un dashboard intuitivo. Todas las aplicaciones agrupadas por oferta, con acceso en un solo clic al email y teléfono de cada candidato preseleccionado.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-white py-20 px-6 text-center border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Inicia tu proceso de selección gratis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          La cuenta de empresa y la publicación de ofertas de FCT son 100% gratuitas. Aprovecha el flujo de talento recién formado de tu región.
        </p>
        <Link to="/registro" className="inline-block bg-indigo-600 text-white font-bold px-10 py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-colors text-lg">
          Registrar mi Empresa
        </Link>
        <p className="text-sm text-gray-500 mt-4">* Sujeto a validación</p>
      </section>
    </div>
  );
};

export default InfoEmpresas;
