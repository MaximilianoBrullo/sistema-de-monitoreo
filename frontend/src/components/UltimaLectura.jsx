export default function UltimaLectura({ lectura }) {
  if (!lectura) {
    return (
      <p className="vacio">
        Todavía no hay lecturas. Encendé el ESP32 o mandá una de prueba desde /docs del backend.
      </p>
    );
  }

  return (
    <section className="panel ultima">
      <h2>Última lectura</h2>
      <p className="ultima-valor">
        {lectura.distancia_cm}
        <span className="unidad"> cm</span>
      </p>
      <dl className="detalle">
        <div><dt>Dispositivo</dt><dd>{lectura.device_id}</dd></div>
        <div><dt>ID</dt><dd>{lectura.id}</dd></div>
        <div><dt>Timestamp</dt><dd>{lectura.timestamp}</dd></div>
      </dl>
    </section>
  );
}