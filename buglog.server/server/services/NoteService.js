import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NoteService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(rawNote) {
    const note = await dbContext.Notes.create(rawNote)
    return note
  }

  async deleteNote(id) {
    const note = await dbContext.Notes.findOneAndRemove({ _id: id })
    if (!note) {
      throw new Error('That note does not exist')
    }
    return note
  }

  async editNote(id, editedNote) {
    const note = await dbContext.Notes.findOneAndUpdate({ _id: id, closed: false }, editedNote)
    if (!note) {
      throw new Error('That note does not exist')
    }
    return note
  }
}

export const noteService = new NoteService()
