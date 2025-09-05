import { Session, Participant } from '../models/index.js';
import crypto from 'crypto';

export class SessionService {
  static async createSession(hostId) {
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    return Session.create({ code, hostId });
  }

  static async joinSession({ code, name, email, phone }) {
    const session = await Session.findOne({ where: { code } });
    if (!session) throw new Error('Invalid session code');
    return Participant.create({ name, email, phone, sessionId: session.id });
  }

  static async getSession(sessionId, hostId) {
    const session = await Session.findOne({ where: { id: sessionId, hostId } });
    if (!session) throw new Error('Session not found or not owned');
    return session;
  }

  static async getParticipants(sessionId, hostId) {
    const session = await Session.findOne({ where: { id: sessionId, hostId } });
    if (!session) throw new Error('Session not found or not owned');
    return Participant.findAll({ where: { sessionId } });
  }
}