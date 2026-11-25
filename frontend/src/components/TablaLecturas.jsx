export default function TablaLecturas({ lecturas }) {
  if (!lecturas || lecturas.length === 0) return null;

  return (
    <section className="panel">
      <h2>Lecturas recibidas ({lecturas.length})</h2>
      <div className="tabla-scroll">
        <table>
          <thead>
            <tr><th>ID</th><th>Dispositivo</th><th>Distancia (cm)</th><th>Timestamp</th></tr>
          </thead>
          <tbody>
            {lecturas.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.device_id}</td>
                <td className="numero">{l.distancia_cm}</td>
                <td>{l.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}