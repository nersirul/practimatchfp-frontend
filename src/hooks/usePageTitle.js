import { useEffect } from 'react';

/**
 * Custom Hook para cambiar el <title> del documento dinámicamente.
 * Le añade automáticamente el sufijo " | PractiMatch FP" para mantener la consistencia de marca.
 * * @param {string} title - El título específico de la página actual.
 */
export default function usePageTitle(title) {
    useEffect(() => {
        // Guardamos el título original por si queremos restaurarlo
        const prevTitle = document.title;
        
        // Asignamos el nuevo título
        document.title = `${title} | PractiMatch FP`;

        // Opcional: Restaurar el título anterior al desmontar el componente
        return () => {
            document.title = prevTitle;
        };
    }, [title]);
}