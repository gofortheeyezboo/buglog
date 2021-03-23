import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      alert(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      alert(error)
    }
  }

  async createBug(rawBug) {
    try {
      const bug = await api.post('api/bugs', rawBug)
      this.getBugs()
      return bug
    } catch (error) {
      alert(error)
    }
  }

  async delete(id) {
    try {
      await api.delete('api/bugs/' + id)
    } catch (error) {
      alert(error)
    }
  }

  async editBug(id, editedBug) {
    try {
      await api.put('api/bugs/' + id, editedBug)
    } catch (error) {
      alert(error)
    }
  }
}
export const bugService = new BugService()
