import sequelize from '../config/sequelize.js';
import User from './user.js';
import Session from './session.js';
import Poll from './poll.js';
import Participant from './participant.js';
import Response from './responce.js';

// Associations
Session.belongsTo(User, { foreignKey: 'hostId' });
User.hasMany(Session, { foreignKey: 'hostId' });
Poll.belongsTo(Session, { foreignKey: 'sessionId' });
Session.hasMany(Poll, { foreignKey: 'sessionId' });
Participant.belongsTo(Session, { foreignKey: 'sessionId' });
Session.hasMany(Participant, { foreignKey: 'sessionId' });
Response.belongsTo(Poll, { foreignKey: 'pollId' });
Poll.hasMany(Response, { foreignKey: 'pollId' });
Response.belongsTo(Participant, { foreignKey: 'participantId' });
Participant.hasMany(Response, { foreignKey: 'participantId' });

// Sync models with error handling
(async () => {
  try {
    await sequelize.sync({ alter: true });  // Creates or alters tables
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Database sync failed:', error.message);
  }
})();

export { User, Session, Poll, Participant, Response };