import express from "express";
import { createPoll, publishPoll, closePoll, getPublishedPolls, submitResponse } from "../controllers/pollController.js";

const router = express.Router();

router.post("/", createPoll);
router.post("/:id/publish", publishPoll);
router.post("/:id/close", closePoll);
router.get("/session/:sessionId", getPublishedPolls);
router.post("/:id/respond", submitResponse);

export default router;
