import { PollService } from '../services/pollService.js';

export const createPoll = async (req, res, next) => {
  try {
    const { title, options, sessionId } = req.body;
    if (!title || !options || !sessionId) {
      return res.status(400).json({ error: "Missing required fields: title, options, sessionId" });
    }
    if (options.length < 2) {
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
    const { sessionId } = req.body;
    const poll = await PollService.publishPoll(req.params.id, sessionId);
    res.json(poll);
  } catch (error) {
    next(error);
  }
};

export const closePoll = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const poll = await PollService.closePoll(req.params.id, sessionId);
    res.json(poll);
  } catch (error) {
    next(error);
  }
};

export const hidePoll = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const poll = await PollService.hidePoll(req.params.id, sessionId);
    res.json(poll);
  } catch (error) {
    next(error);
  }
};

export const getPublishedPolls = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const polls = await PollService.getPublishedPolls(sessionId);
    res.json(polls);
  } catch (error) {
    next(error);
  }
};

export const submitResponse = async (req, res, next) => {
  try {
    const { participantId, answer } = req.body;
    if (!participantId || !answer) {
      return res.status(400).json({ error: "Missing participantId or answer" });
    }
    const response = await PollService.submitResponse({
      pollId: req.params.id,
      participantId,
      answer
    });
    res.status(201).json({ message: "Response recorded", response });
  } catch (error) {
    next(error);
  }
};

export const getPollResponses = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const responses = await PollService.getResponses(req.params.id, sessionId);
    res.json(responses);
  } catch (error) {
    next(error);
  }
};
