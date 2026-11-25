import { useEffect, useState } from "react";

// Ejecuta la consulta al montar y luego cada intervaloMs
export function useConsultaPeriodica(consulta, intervaloMs) {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function ejecutar() {
      try {
        const resultado = await consulta();
        if (activo) {
          setDatos(resultado);
          setError(null);
        }
      } catch (e) {
        if (activo) setError(e.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    ejecutar();
    const id = setInterval(ejecutar, intervaloMs);
    return () => {
      activo = false;
      clearInterval(id);
    };
  }, [consulta, intervaloMs]);

  return { datos, error, cargando };
}