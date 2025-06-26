import { Request, Response } from "express";
import { connectDB } from "../database/db";

const allowedLanguages = ["JavaScript", "Python", "Java", "C#", "Otro"];

interface AnswerBody {
  email: string;
  motivacion?: string;
  lenguaje: string;
}

export const createAnswer = async (
  req: Request<{}, {}, AnswerBody>,
  res: Response
) => {
  const { email, motivacion, lenguaje } = req.body;

  if (
    !email ||
    typeof email !== "string" ||
    !/^[\w-.]+@[\w-]+\.[\w-.]+$/.test(email)
  ) {
    return res.status(400).json({ error: "Email inválido o faltante." });
  }

  const lenguajeNormalizado = allowedLanguages.find(
    (lang) => lang.toLowerCase() === lenguaje.toLowerCase()
  );

  if (!lenguajeNormalizado) {
    return res.status(400).json({
      error: `Lenguaje invalido. Opciones permitidas: ${allowedLanguages.join(
        ", "
      )}.`,
    });
  }

  try {
    const db = await connectDB();

    const isEmailUsed = await db.get(
      "SELECT * FROM respuestas WHERE email = ?",
      email
    );
    if (isEmailUsed) {
      return res
        .status(409)
        .json({ error: "Este correo ya ha enviado una respuesta." });
    }

    const stmt = await db.prepare(`
      INSERT INTO respuestas (email, motivacion, lenguaje)
      VALUES (?, ?, ?)
    `);
    await stmt.run(email, motivacion ?? null, lenguajeNormalizado);
    await stmt.finalize();

    return res
      .status(201)
      .json({ message: "Respuesta guardada exitosamente." });
  } catch (error) {
    console.error("Error al guardar respuesta:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getTotalAnswers = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const result = await db.get(`SELECT COUNT(*) as total FROM respuestas`);
    res.status(200).json({ total: result.total });
  } catch (error) {
    console.error("Error al contar respuestas:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getLatestAnswers = async (req: Request, res: Response) => {
  try {
    const db = await connectDB();
    const results = await db.all(`
      SELECT email, fecha_creacion, motivacion
      FROM respuestas
      ORDER BY fecha_creacion DESC
      LIMIT 5
    `);
    res.status(200).json({ ultimos: results });
  } catch (error) {
    console.error("Error al obtener últimos usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getAnswersStats = async (req: Request, res: Response) => {
  console.log("✅ Rutas cargadas");
  try {
    const db = await connectDB();
    const results = await db.all(`
      SELECT lenguaje, COUNT(*) as cantidad
      FROM respuestas
      GROUP BY lenguaje
    `);
    res.status(200).json({ estadisticas: results });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getAnswerByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;

  console.log(req.query, "query from param");

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email es obligatorio." });
  }

  try {
    const db = await connectDB();
    const result = await db.get(
      `
      SELECT motivacion
      FROM respuestas
      WHERE email = ?
    `,
      email
    );

    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    res.status(200).json({ respuesta: result.motivacion });
  } catch (error) {
    console.error("Error al buscar respuesta:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
