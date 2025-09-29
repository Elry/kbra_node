import { Router } from 'express';
import {
  validatePersonId,
  validateCreatePerson,
  validateListFilters
} from '../middleware/validation.js';

export const createPersonRoutes = personController => {
  const router = Router()

  router.get(
    '/:id',
    validatePersonId,
    personController.getPerson
  );
  
  router.post(
    '/list',
    validateListFilters,
    personController.listPersons
  );

  router.post(
    '/',
    validateCreatePerson,
    personController.createPerson
  );

  return router;
};
