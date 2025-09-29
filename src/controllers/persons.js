export const createPersonController = (personQueries) => ({
  /**
   * 
   * @param {object} req
   * @param {string} req.validatedId
   * @param {*} res 
   * @returns {Promise<Json>}
   */
  getPerson: async (req, res) => {
    try {
      const person = await personQueries.getPersonById(req.validatedId)

      if (!person) {
        return res.status(404).json({ error: 'Person not found' })
      }

      res.json(person)
    } catch (error) {
      console.error('Error fetching person:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  listPersons: async (req, res) => {
    try {
      const persons = await personQueries.getPersons(req.validatedFilters)
      res.json(persons)
    } catch (error) {
      console.error('Error fetching persons list:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  createPerson: async (req, res) => {
    try {
      const newPerson = await personQueries.createPerson(req.validatedPerson)
      res.status(201).json(newPerson)
    } catch (error) {
      console.error('Error creating person:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})