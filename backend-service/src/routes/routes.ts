import { Router } from "express";
import {
  createAnswer,
  getAnswerByEmail,
  getAnswersStats,
  getLatestAnswers,
  getTotalAnswers,
} from "../controllers/formulario.controller";

const router = Router();

router.post("/api/responses", createAnswer);

router.get("/api/responses/count", getTotalAnswers);

router.get("/api/responses/recent", getLatestAnswers);

router.get("/api/responses/stats", getAnswersStats);

router.get("/api/responses/:email", getAnswerByEmail);

export default router;
