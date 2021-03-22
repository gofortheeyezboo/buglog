import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(rawBug) {
    const bug = await dbContext.Bugs.create(rawBug)
    return bug
  }

  async deleteBug(id) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: id }, { closed: true })
    if (!bug) {
      throw new Error('That bug does not exist')
    }
    return bug
  }

  async editBug(id, editedBug) {
    const bug = await dbContext.Bugs.findOneAndUpdate({ _id: id, closed: false }, editedBug)
    if (!bug) {
      throw new Error('That bug does not exist')
    }
    return bug
  }
}

export const bugService = new BugService()
