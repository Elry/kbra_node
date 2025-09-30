import Joi from 'joi';

const personSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(100).required(),
  lastName: Joi.string().trim().min(1).max(100).required(),
});

const idSchema = Joi.number().integer().positive().required();

const filterSchema = Joi.object({
  firstName: Joi.string().trim().min(1),
  lastName: Joi.string().trim().min(1),
});


const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedPerson = value;
  next();
};

const validateId = (req, res, next) => {
  const { error, value } = idSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  req.validatedId = value;
  next();
};

const validateFilters = (req, res, next) => {
  const { error, value } = filterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.validatedFilters = value;
  next();
};

export const validatePerson = validate(personSchema);
export { validateId, validateFilters };