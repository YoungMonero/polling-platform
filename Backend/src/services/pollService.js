import { Poll, Response } from '../models/index.js';

export class PollService {
  static async createPoll({ title, options, sessionId }) {
    return Poll.create({ title, options, status: 'draft', sessionId });
  }

  static async updatePoll(pollId, { title, options, sessionId }) {
    const poll = await Poll.findOne({ where: { id: pollId, sessionId } });
    if (!poll) throw new Error('Poll not found');
    await poll.update({ title, options });
    return poll;
  }

  static async publishPoll(pollId, sessionId) {
    const poll = await Poll.findOne({ where: { id: pollId, sessionId } });
    if (!poll) throw new Error('Poll not found');
    await poll.update({ status: 'published' });
    return poll;
  }

  static async hidePoll(pollId, sessionId) {
    const poll = await Poll.findOne({ where: { id: pollId, sessionId } });
    if (!poll) throw new Error('Poll not found');
    await poll.update({ status: 'draft' });
    return poll;
  }

  static async closePoll(pollId, sessionId) {
    const poll = await Poll.findOne({ where: { id: pollId, sessionId } });
    if (!poll) throw new Error('Poll not found');
    await poll.update({ status: 'closed' });
    return poll;
  }

  static async submitResponse({ pollId, participantId, answer }) {
    const poll = await Poll.findByPk(pollId);
    if (!poll || poll.status !== 'published') throw new Error('Poll not available');
    return Response.create({ answer, pollId, participantId });
  }

  static async getResponses(pollId, sessionId) {
    const poll = await Poll.findOne({ where: { id: pollId, sessionId } });
    if (!poll) throw new Error('Poll not found');
    return Response.findAll({ where: { pollId } });
  }
}