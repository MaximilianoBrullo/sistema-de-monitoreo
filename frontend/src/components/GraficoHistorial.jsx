import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export default function GraficoHistorial({ lecturas }) {
  if (!lecturas || lecturas.length === 0) {
    return <p className="vacio">No hay lecturas en las últimas 24 horas.</p>;
  }

  return (
    <section className="panel">
      <h2>Distancia medida, últimas 24 horas</h2>
      <div className="grafico">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lecturas} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="var(--linea)" strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fill: "var(--tenue)", fontSize: 11 }} minTickGap={60} />
            <YAxis unit=" cm" tick={{ fill: "var(--tenue)", fontSize: 12 }} width={70} />
            <Tooltip
              contentStyle={{ background: "var(--superficie)", border: "1px solid var(--linea)" }}
              labelStyle={{ color: "var(--tenue)" }}
            />
            <Line
              type="monotone"
              dataKey="distancia_cm"
              name="Distancia (cm)"
              stroke="var(--acento)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}