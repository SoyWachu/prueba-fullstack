"use client";

import { useEffect, useState } from "react";

export default function TotalAnswers() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch(
          "http://localhost:4001/dev/backend/api/responses/count"
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error al obtener datos");

        setTotal(data.total);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm w-full text-center">
      <h2 className="text-xl font-semibold mb-2">Total de Respuestas</h2>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p className="text-3xl font-bold text-blue-600">{total}</p>
      )}
    </div>
  );
}
