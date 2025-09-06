import express from "express";
import { createPoll, publishPoll, closePoll, hidePoll, getPublishedPolls, submitResponse, getPollResponses } from "../controllers/pollController.js";
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { validate, pollSchema, responseSchema } from '../middlewares/validation.js'; // Add validation

const router = express.Router();

// Poll management routes (host only, require authentication)
router.post("/sessions/:sessionId", authenticateJWT, validate(pollSchema), createPoll); // Create poll for a session
router.put("/sessions/:sessionId/:id/publish", authenticateJWT, publishPoll); // Publish a poll
router.put("/sessions/:sessionId/:id/close", authenticateJWT, closePoll); // Close a poll
router.put("/sessions/:sessionId/:id/hide", authenticateJWT, hidePoll); // Hide a poll
router.get("/sessions/:sessionId/:id/responses", authenticateJWT, getPollResponses); // Get responses

// Public routes for participants (optional authentication)
router.get("/sessions/:sessionId/published", getPublishedPolls); // Get published polls
router.post("/sessions/:sessionId/:id/responses/:participantId", validate(responseSchema), submitResponse); // Submit response

export default router;