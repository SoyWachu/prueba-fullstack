"use client";

import { useEffect, useState } from "react";

type Usuario = {
  email: string;
  fecha_creacion: string;
  motivacion: string | null;
};

export default function LastestAnswers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch(
          "http://localhost:4001/dev/backend/api/responses/recent"
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Error al cargar usuarios");

        setUsuarios(data.ultimos);
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const selectedUser = usuarios.find((u) => u.email === selectedEmail);

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl w-full mr-16">
      <h2 className="text-xl font-semibold mb-4">Últimos Usuarios</h2>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul className="space-y-2">
          {usuarios.map((user) => (
            <li
              key={user.email}
              className="border p-3 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => setSelectedEmail(user.email)}
            >
              <p className="font-medium text-blue-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                {new Date(user.fecha_creacion).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">
            Respuesta de: {selectedUser.email}
          </h3>
          <p>{selectedUser.motivacion || <i>No respondió la motivación.</i>}</p>
        </div>
      )}
    </div>
  );
}
