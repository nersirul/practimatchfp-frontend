/**
 * Componente: InfoAlumnos
 * Módulo: Views/Public
 * 
 * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const InfoAlumnos = () => {

  usePageTitle("Información para Alumnos - PractiMatch FP");

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-24 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="bg-indigo-500/30 text-indigo-100 text-sm font-semibold tracking-wider uppercase py-1 px-3 rounded-full mb-4">
            Para Estudiantes de FP
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Encuentra la empresa ideal para tu FCT <span className="text-indigo-300">sin estrés</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 font-light mb-10 max-w-2xl mx-auto">
            Olvídate de buscar ofertas en tablones antiguos o portales confusos. Descubre empresas que buscan tu stack tecnológico y aplica con un solo clic.
          </p>
          <Link to="/registro" className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-emerald-600 transition-colors text-lg flex items-center gap-2">
            Registrarse como Alumno
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Features Destacadas */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Feature 1: Tu perfil es tu CV */}
          <div className="order-2 md:order-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-sm">
                💼
              </div>
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2 mb-4">Perfil Técnico</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-lg text-xs font-bold">React</div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full w-4/5"></div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 text-yellow-700 p-2 rounded-lg text-xs font-bold">PHP</div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full w-3/5"></div></div>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu perfil es tu CV</h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Destaca tu ciclo formativo, especialidad y, lo más importante, tu nivel en cada tecnología. Las empresas te encontrarán exactamente por lo que sabes hacer.
            </p>
          </div>

          {/* Feature 2: Transparencia total */}
          <div className="order-1 md:order-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-gray-800">Estado de solicitud</span>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">En revisión</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-indigo-500 h-2 rounded-full w-1/2"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Solicitada</span>
                <span>En Curso</span>
                <span>Finalizada</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparencia total</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Haz un seguimiento en tiempo real de tus candidaturas. Sabrás en todo momento si tu perfil está siendo revisado, si has sido aceptado o si la oferta ya se completó. Adiós a la incertidumbre.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-indigo-50 py-20 px-6 text-center border-t border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Da el salto al mercado profesional</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          Únete a cientos de estudiantes que ya han hecho match con las empresas tecnológicas más punteras para sus prácticas FCT.
        </p>
        <Link to="/registro" className="inline-block bg-indigo-600 text-white font-bold px-10 py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-colors text-lg">
          Crear cuenta de Alumno
        </Link>
      </section>
    </div>
  );
};

export default InfoAlumnos;
