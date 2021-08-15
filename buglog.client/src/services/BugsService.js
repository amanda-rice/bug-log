import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getOpen(query) {
    const res = await api.get('api/bugs', { query })
    AppState.OpenBugs = res.data
  }

  async getBugById(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.thisBug = res.data
  }

  async createBug(obj) {
    const res = await api.post('api/bugs', obj)
    AppState.bugs.push(res.data)
    return res.data.id
  }

  async editBug(obj, id) {
    const res = await api.put(`api/bugs/${id}`, obj)
    const index = AppState.bugs.findIndex(b => b.id === id)
    AppState.bugs.splice(index, 1)
    AppState.bugs.push(res.data)
    AppState.thisBug = res.data
    logger.log(AppState.bugs[AppState.bugs.length - 1])
    return res.data.id
  }

  async closeBug(id) {
    const res = await api.delete(`api/bugs/${id}`)
    const index = AppState.bugs.findIndex(b => b.id === id)
    AppState.bugs.splice(index, 1)
    AppState.bugs.push(res.data)
    return res.data.id
  }
}

export const bugsService = new BugsService()
