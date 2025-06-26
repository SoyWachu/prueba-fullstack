import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

export async function connectDB(): Promise<Database> {
  return open({
    filename: path.resolve(__dirname, "formulario.db"),
    driver: sqlite3.Database,
  });
}
