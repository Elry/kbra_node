import { Router } from 'express';
import {
  validatePerson,
  validateId,
  validateFilters,
} from '../middleware/joiValidation.js';

export const createPersonRoutes = personController => {
  const router = Router()

  router.get(
    '/:id',
    validateId,
    personController.getPerson
  );
  
  router.post(
    '/list',
    validateFilters,
    personController.listPersons
  );

  router.post(
    '/',
    validatePerson,
    personController.createPerson
  );

  return router;
};
