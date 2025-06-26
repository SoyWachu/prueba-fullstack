import { runMigrations } from "../migrations/migrations";
import { seedData } from "../seeds/seeds";

async function setup() {
  await runMigrations();
  await seedData();
}

setup();
