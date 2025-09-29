import { validateId, validatePersonData, validateFilterData } from '../utils/validators.js'

export const validatePersonId = (req, res, next) => {
  const validation = validateId(req.params.id)

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error })
  }

  req.validatedId = validation.id
  next()
};

export const validateCreatePerson = (req, res, next) => {
  const validation = validatePersonData(req.body)

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error })
  }

  req.validatedPerson = validation.data
  next()
};

export const validateListFilters = (req, res, next) => {
  req.validatedFilters = validateFilterData(req.body);
  next();
};
