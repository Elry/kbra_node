import { jest } from '@jest/globals';
import { createPersonRoutes } from '../persons.js';

describe('Person Routes', () => {
  let mockController;
  let router;

  beforeEach(() => {
    mockController = {
      getPerson: jest.fn(),
      listPersons: jest.fn(),
      createPerson: jest.fn()
    };

    router = createPersonRoutes(mockController);
  })

  it('should create a router with all routes', () => {
    expect(router).toBeInstanceOf(Function);

    // Check if routes are defined by examining the router stack
    const routes = router.stack.map(layer => ({
      method: Object.keys(layer.route.methods)[0],
      path: layer.route.path
    }));

    expect(routes).toContainEqual({ method: 'get', path: '/:id' });
    expect(routes).toContainEqual({ method: 'post', path: '/list' });
    expect(routes).toContainEqual({ method: 'post', path: '/' });
  });

  it('should have correct number of routes', () => {
    expect(router.stack).toHaveLength(3);
  });
});
