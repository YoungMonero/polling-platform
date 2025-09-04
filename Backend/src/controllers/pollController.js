import { PollService } from '../services/pollService.js';

export const createPoll = async (req, res, next) => {
  try {
    const poll = await PollService.createPoll({ ...req.body, sessionId: req.params.sessionId });
    res.status(201).json(poll);
  } catch (err) {
    next(err);
  }
};

export const updatePoll = async (req, res, next) => {
  try {
    const poll = await PollService.updatePoll(req.params.id, { ...req.body, sessionId: req.params.sessionId });
    res.json(poll);
  } catch (err) {
    next(err);
  }
};

export const publishPoll = async (req, res, next) => {
  try {
    const poll = await PollService.publishPoll(req.params.id, req.params.sessionId);
    // Emit real-time event via Socket.IO (handled in socket.js)
    req.io.to(`session:${req.params.sessionId}`).emit('pollPublished', poll);
    res.json(poll);
  } catch (err) {
    next(err);
  }
};

export const hidePoll = async (req, res, next) => {
  try {
    const poll = await PollService.hidePoll(req.params.id, req.params.sessionId);
    req.io.to(`session:${req.params.sessionId}`).emit('pollHidden', poll.id);
    res.json(poll);
  } catch (err) {
    next(err);
  }
};

export const closePoll = async (req, res, next) => {
  try {
    const poll = await PollService.closePoll(req.params.id, req.params.sessionId);
    req.io.to(`session:${req.params.sessionId}`).emit('pollClosed', poll.id);
    res.json(poll);
  } catch (err) {
    next(err);
  }
};

export const submitResponse = async (req, res, next) => {
  try {
    const response = await PollService.submitResponse({ ...req.body, participantId: req.params.participantId });
    req.io.to(`poll:${req.body.pollId}`).emit('newResponse', response);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const getResponses = async (req, res, next) => {
  try {
    const responses = await PollService.getResponses(req.params.id, req.params.sessionId);
    res.json(responses);
  } catch (err) {
    next(err);
  }
};