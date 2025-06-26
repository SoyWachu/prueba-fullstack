import { connectDB } from "../db";

export async function seedData() {
  const db = await connectDB();

  const insert = await db.prepare(`
    INSERT OR IGNORE INTO respuestas (email, motivacion, lenguaje)
    VALUES (?, ?, ?)
  `);

  const samples: [string, string | null, string][] = [
    ["alice1@example.com", "Me interesa el equipo", "Python"],
    [
      "bob2@example.com",
      "Quiero trabajar con tecnologías modernas",
      "JavaScript",
    ],
    ["carla3@example.com", null, "Java"],
    ["david4@example.com", "Vi que se alineaba con mis valores", "C#"],
    ["emily5@example.com", "Estoy buscando nuevos desafíos", "Otro"],
    ["frank6@example.com", "Me gusta resolver problemas", "Python"],
    [
      "grace7@example.com",
      "Estoy aprendiendo nuevas tecnologías",
      "JavaScript",
    ],
    ["hugo8@example.com", "Busco estabilidad laboral", "Java"],
    ["irene9@example.com", "Me encanta programar", "C#"],
    ["jack10@example.com", "Quiero crecer profesionalmente", "Otro"],
  ];

  for (const [email, motivacion, lenguaje] of samples) {
    await insert.run(email, motivacion, lenguaje);
  }

  await insert.finalize();
  console.log("Seed completado: datos de ejemplo insertados.");
}
