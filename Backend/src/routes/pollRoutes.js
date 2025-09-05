import express from "express";
import { createPoll, publishPoll, closePoll, hidePoll, getPublishedPolls, submitResponse, getPollResponses } from "../controllers/pollController.js";
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Poll management routes (host only)
router.post("/", authenticateJWT, createPoll);
router.post("/:id/publish", authenticateJWT, publishPoll);
router.post("/:id/close", authenticateJWT, closePoll);
router.post("/:id/hide", authenticateJWT, hidePoll);
router.get("/:id/responses", authenticateJWT, getPollResponses);

// Public routes for participants
router.get("/session/:sessionId", getPublishedPolls);
router.post("/:id/respond", submitResponse);

export default router;
