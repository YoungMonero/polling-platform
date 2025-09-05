import express from 'express';
import { createSession, joinSession, getSession } from '../controllers/sessionController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { validate, sessionSchema, participantSchema } from '../middlewares/validation.js';

const router = express.Router();

router.use(authenticateJWT);  // Protect host routes

router.post('/', createSession);  // Host creates a session
router.get('/:id', getSession);  // Host views session details

// Participant join (public endpoint, no auth)
router.post('/join', validate(participantSchema), joinSession);

export default router;