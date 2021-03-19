import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }
}

export const bugService = new BugService()
