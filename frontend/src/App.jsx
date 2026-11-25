import { useCallback } from "react";
import { getHistorial, getUltima } from "./api/lecturas";
import { DEVICE_ID, INTERVALO_MS } from "./config";
import { useConsultaPeriodica } from "./hooks/useConsultaPeriodica";
import UltimaLectura from "./components/UltimaLectura";
import GraficoHistorial from "./components/GraficoHistorial";
import TablaLecturas from "./components/TablaLecturas";

export default function App() {
  const consultarUltima = useCallback(() => getUltima(DEVICE_ID), []);
  const consultarHistorial = useCallback(() => getHistorial(DEVICE_ID), []);

  const ultima = useConsultaPeriodica(consultarUltima, INTERVALO_MS);
  const historial = useConsultaPeriodica(consultarHistorial, INTERVALO_MS);

  const error = ultima.error || historial.error;
  const cargando = ultima.cargando || historial.cargando;

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Monitoreo de tanque</h1>
        <p className="tenue">Dispositivo {DEVICE_ID}, se actualiza cada {INTERVALO_MS / 1000} s</p>
      </header>

      {error && <p className="error" role="alert">{error}</p>}

      {cargando ? (
        <p className="vacio">Cargando lecturas…</p>
      ) : (
        <>
          <UltimaLectura lectura={ultima.datos} />
          <GraficoHistorial lecturas={historial.datos} />
          <TablaLecturas lecturas={historial.datos} />
        </>
      )}
    </main>
  );
}