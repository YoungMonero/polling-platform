import { SessionService } from '../services/sessionService.js';

export const createSession = async (req, res, next) => {
  try {
    const session = await SessionService.createSession(req.user.id);
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
};

export const joinSession = async (req, res, next) => {
  try {
    const participant = await SessionService.joinSession(req.body);
    res.status(201).json(participant);
  } catch (err) {
    next(err);
  }
};

export const getSession = async (req, res, next) => {
  try {
    const session = await SessionService.getSession(req.params.id, req.user.id);
    res.json(session);
  } catch (err) {
    next(err);
  }
};

export const getParticipants = async (req, res, next) => {
  try {
    const participants = await SessionService.getParticipants(req.params.id, req.user.id);
    res.json(participants);
  } catch (err) {
    next(err);
  }
};