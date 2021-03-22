import { AppState } from '../AppState.js'
import { api } from './AxiosService'

class BugService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBug(rawBug) {
    try {
      await api.post('api/bugs', rawBug)
      this.getBugs()
    } catch (error) {
      console.error(error)
    }
  }

  async delete(id) {
    try {
      await api.delete('api/bugs/' + id)
    } catch (error) {
      console.error(error)
    }
  }
}
export const bugService = new BugService()
