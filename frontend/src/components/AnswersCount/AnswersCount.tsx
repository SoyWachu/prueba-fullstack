"use client";

import { useEffect, useState } from "react";

type Estadistica = {
  lenguaje: string;
  cantidad: number;
};

export default function AnswersCount() {
  const [stats, setStats] = useState<Estadistica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "http://localhost:4001/dev/backend/api/responses/stats"
        );
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Error al cargar estadísticas");

        setStats(data.estadisticas);
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-md w-full">
      <h2 className="text-xl font-semibold mb-4">
        Estadísticas de Selección Múltiple
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : stats.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">Lenguaje</th>
              <th className="border-b py-2 px-4">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(({ lenguaje, cantidad }) => (
              <tr key={lenguaje}>
                <td className="border-b py-2 px-4">{lenguaje}</td>
                <td className="border-b py-2 px-4">{cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </div>
  );
}
