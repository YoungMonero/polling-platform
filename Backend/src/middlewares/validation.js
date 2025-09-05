// backend/middlewares/validation.js (updated)
import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const sessionSchema = Joi.object({
  code: Joi.string().min(6).required(),
});

export const pollSchema = Joi.object({
  title: Joi.string().min(3).required(),
  options: Joi.array().items(Joi.string()).min(2).required(),
});

export const participantSchema = Joi.object({

  code: Joi.string().length(8).required(),

  code: Joi.string().min(6).required(),  // Added to allow session code

  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
});

export const responseSchema = Joi.object({
  answer: Joi.string().required(),
});

export { validate };