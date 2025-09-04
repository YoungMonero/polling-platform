

function generateId() {
  return Date.now().toString();
}

export const createPoll = (req, res) => {
  const { sessionId, type, question, options } = req.body;
  if (!sessionId || !type || !question) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if ((type === TYPE.MULTIPLE_CHOICE || type === TYPE.SINGLE_CHOICE) && (!options || options.length < 2)) {
    return res.status(400).json({ error: "Choice polls require ≥2 options" });
  }
  const poll = {
    id: generateId(),
    sessionId,
    status: STATUS.DRAFT,
    type,
    question,
    options: options || [],
    responses: new Map(),
  };
  polls.push(poll);
  res.status(201).json(poll);
};

export const publishPoll = (req, res) => {
  const poll = polls.find(p => p.id === req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });
  poll.status = STATUS.PUBLISHED;
  res.json(poll);
};

export const closePoll = (req, res) => {
  const poll = poll.find(p => p.id === req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });
  poll.status = STATUS.CLOSED;
  res.json(poll);
};

export const getPublishedPolls = (req, res) => {
  const sessionId = req.params.sessionId;
  const publishedPolls = polls.filter(p => p.sessionId === sessionId && p.status === STATUS.PUBLISHED);
  res.json(publishedPolls);
};

export const submitResponse = (req, res) => {
  const poll = polls.find(p => p.id === req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });
  const { participantId, response } = req.body;
  if (!participantId || response === undefined) return res.status(400).json({ error: "Missing participantId or response" });
  if (poll.status !== STATUS.PUBLISHED) return res.status(400).json({ error: "Poll not published" });
  poll.responses.set(participantId, response);
  res.status(201).json({ message: "Response recorded" });
};
