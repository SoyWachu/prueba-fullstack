import { connectDB } from "../db";

export async function runMigrations() {
  const db = await connectDB();

  await db.exec(`
  CREATE TABLE IF NOT EXISTS respuestas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    motivacion TEXT,
    lenguaje TEXT NOT NULL CHECK (lenguaje IN ('JavaScript', 'Python', 'Java', 'C#', 'Otro')),
    fecha_respuesta DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

  console.log("Migración completada: tabla 'respuestas' creada.");
}
