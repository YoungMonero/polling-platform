import { PollService } from '../services/pollService.js';

export const createPoll = async (req, res, next) => {
  try {
    const { title, options, sessionId } = req.body;
    if (!title || !options || !sessionId) {
      return res.status(400).json({ error: "Missing required fields: title, options, sessionId" });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Poll requires at least 2 options" });
    }
    const poll = await PollService.createPoll({ title, options, sessionId });
    res.status(201).json(poll);
  } catch (error) {
    next(error);
  }
};

export const publishPoll = async (req, res, next) => {
  try {
    console.log('Publish Poll - Params:', req.params); // Debug log
    const poll = await PollService.publishPoll(req.params.id, req.params.sessionId);
    console.log('Poll published:', poll); // Debug log
    req.io.to(`session:${req.params.sessionId}`).emit('pollPublished', poll); // Correct emit
    res.json(poll);
  } catch (error) {
    console.error('Publish Poll Error:', error.message); // Debug log
    next(error);
  }
};

export const closePoll = async (req, res, next) => {
  try {
    console.log('Close Poll - Params:', req.params); // Debug log
    const poll = await PollService.closePoll(req.params.id, req.params.sessionId);
    req.io.to(`session:${req.params.sessionId}`).emit('pollClosed', poll.id); // Emit event
    res.json(poll);
  } catch (error) {
    console.error('Close Poll Error:', error.message); // Debug log
    next(error);
  }
};

export const hidePoll = async (req, res, next) => {
  try {
    console.log('Hide Poll - Params:', req.params); // Debug log
    const poll = await PollService.hidePoll(req.params.id, req.params.sessionId);
    req.io.to(`session:${req.params.sessionId}`).emit('pollHidden', poll.id); // Emit event
    res.json(poll);
  } catch (error) {
    console.error('Hide Poll Error:', error.message); // Debug log
    next(error);
  }
};

export const getPublishedPolls = async (req, res, next) => {
  try {
    console.log('Get Published Polls - sessionId:', req.params.sessionId); // Debug log
    const polls = await PollService.getPublishedPolls(req.params.sessionId);
    res.json(polls);
  } catch (error) {
    console.error('Get Published Polls Error:', error.message); // Debug log
    next(error);
  }
};

export const submitResponse = async (req, res, next) => {
  try {
    const { participantId, answer } = req.body;
    if (!participantId || !answer) {
      return res.status(400).json({ error: "Missing participantId or answer" });
    }
    console.log('Submit Response - Params:', req.params, 'Body:', req.body); // Debug log
    const response = await PollService.submitResponse({
      pollId: req.params.id,
      participantId,
      answer,
    });
    req.io.to(`poll:${req.params.id}`).emit('newResponse', response); // Emit event
    res.status(201).json({ message: "Response recorded", response });
  } catch (error) {
    console.error('Submit Response Error:', error.message); // Debug log
    next(error);
  }
};

export const getPollResponses = async (req, res, next) => {
  try {
    console.log('Get Poll Responses - Params:', req.params); // Debug log
    const responses = await PollService.getResponses(req.params.id, req.params.sessionId);
    res.json(responses);
  } catch (error) {
    console.error('Get Poll Responses Error:', error.message); // Debug log
    next(error);
  }
};