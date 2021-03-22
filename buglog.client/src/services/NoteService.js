import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class NoteService {
  async getNotes(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createNote(rawNote, bugId) {
    try {
      rawNote.bug = bugId
      await api.post('api/notes', rawNote)
      this.getNotes(bugId)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteNote(id, bugId) {
    try {
      await api.delete('api/notes/' + id)
      this.getNotes(bugId)
    } catch (error) {
      console.error(error)
    }
  }
}
export const noteService = new NoteService()
