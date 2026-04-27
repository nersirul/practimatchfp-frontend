/**
 * Componente: ComoFunciona
 * Módulo: Views/Public
 * 
 * Página o vista pública / general de la aplicación PractiMatch FP.
 * Esta vista interactúa con el backend consumiendo su respectivo Controlador API de Laravel.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const ComoFunciona = () => {

  usePageTitle("¿Cómo Funciona? - PractiMatch FP");

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Conectamos el talento junior con el mundo laboral de forma <span className="text-indigo-300">fluida</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 font-light mb-10 max-w-2xl mx-auto">
            PractiMatch FP digitaliza la FCT para que alumnos, empresas y profesores colaboren en un entorno único, rápido y sin papeleos innecesarios.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/registro" className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-sm hover:bg-indigo-50 transition-colors">
              Comenzar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Grid / Timeline de 3 pasos */}
      <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona PractiMatch FP?</h2>
          <p className="text-gray-600">Un proceso simplificado en 3 pasos clave para todas las partes implicadas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Línea conectora (solo en desktop) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-200 z-0"></div>

          {/* Paso 1: El Match */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center relative z-10 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. El Match</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              La empresa publica una oferta detallando su stack tecnológico. El alumno descubre la oferta y, si sus tecnologías coinciden, hace match y se inscribe con un solo clic.
            </p>
          </div>

          {/* Paso 2: La Selección */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center relative z-10 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. La Selección</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              La empresa recibe las candidaturas estructuradas, revisa los perfiles completos con sus habilidades y toma una decisión transparente aceptando al mejor candidato.
            </p>
          </div>

          {/* Paso 3: La Evaluación Oficial */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center relative z-10 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Evaluación Oficial</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              El profesor tutoriza el progreso. Al terminar, introduce la calificación (APTO / NO APTO) y el sistema genera automáticamente el informe PDF oficial listo para firmar.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Bottom */}
      <section className="bg-white py-16 border-t border-gray-200 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">¿Listo para unirte a la nueva era de la FCT?</h3>
        <div className="flex justify-center gap-4">
          <Link to="/registro" className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-sm hover:bg-indigo-700 transition-colors">
            Crear cuenta gratuita
          </Link>
          <Link to="/login" className="bg-white text-gray-700 font-medium px-8 py-3 rounded-xl shadow-sm border border-gray-300 hover:bg-gray-50 transition-colors">
            Iniciar sesión
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ComoFunciona;
