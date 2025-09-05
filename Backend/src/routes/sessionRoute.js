import express from 'express';
import { createSession, joinSession, getSession } from '../controllers/sessionController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { validate, sessionSchema, participantSchema } from '../middlewares/validation.js';

const router = express.Router();

// Host routes (protected)
router.post('/', authenticateJWT, createSession);  // Host creates a session
router.get('/:id', authenticateJWT, getSession);  // Host views session details

// Participant join (public endpoint, no auth)
router.post('/join', validate(participantSchema), joinSession);

export default router;