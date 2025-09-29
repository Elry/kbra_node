import { jest } from '@jest/globals'
import { createPersonController } from '../persons.js'

describe('Person Controller', () => {
  let mockQueries
  let controller
  let mockReq, mockRes

  beforeEach(() => {
    mockQueries = {
      getPersonById: jest.fn(),
      getPersons: jest.fn(),
      createPerson: jest.fn()
    }
    
    controller = createPersonController(mockQueries)
    
    mockReq = {
      validatedId: 1,
      validatedPerson: { firstName: 'John', lastName: 'Doe' },
      validatedFilters: {},
      validatedUpdates: { firstName: 'Jane' }
    }
    
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getPerson', () => {
    it('should return person when found', async () => {
      const mockPerson = { id: 1, first_name: 'John', last_name: 'Doe' }
      mockQueries.getPersonById.mockResolvedValue(mockPerson)

      await controller.getPerson(mockReq, mockRes)

      expect(mockQueries.getPersonById).toHaveBeenCalledWith(1)
      expect(mockRes.json).toHaveBeenCalledWith(mockPerson)
    })

    it('should return 404 when person not found', async () => {
      mockQueries.getPersonById.mockResolvedValue(null)

      await controller.getPerson(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(404)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Person not found' })
    })

    it('should return 500 on database error', async () => {
      mockQueries.getPersonById.mockRejectedValue(new Error('DB Error'))

      await controller.getPerson(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
  })

  describe('listPersons', () => {
    it('should return list of persons', async () => {
      const mockPersons = [
        { id: 1, first_name: 'John', last_name: 'Doe' },
        { id: 2, first_name: 'Jane', last_name: 'Smith' }
      ]
      mockQueries.getPersons.mockResolvedValue(mockPersons)

      await controller.listPersons(mockReq, mockRes)

      expect(mockQueries.getPersons).toHaveBeenCalledWith({})
      expect(mockRes.json).toHaveBeenCalledWith(mockPersons)
    })

    it('should return 500 on database error', async () => {
      mockQueries.getPersons.mockRejectedValue(new Error('DB Error'))

      await controller.listPersons(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
  })

  describe('createPerson', () => {
    it('should create a new person', async () => {
      const mockPerson = { id: 1, first_name: 'John', last_name: 'Doe' }
      mockQueries.createPerson.mockResolvedValue(mockPerson)

      await controller.createPerson(mockReq, mockRes)

      expect(mockQueries.createPerson).toHaveBeenCalledWith({ firstName: 'John', lastName: 'Doe' })
      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.json).toHaveBeenCalledWith(mockPerson)
    })

    it('should return 500 on database error', async () => {
      mockQueries.createPerson.mockRejectedValue(new Error('DB Error'))

      await controller.createPerson(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server error' })
    })
  });
});
