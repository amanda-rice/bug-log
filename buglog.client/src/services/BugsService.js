import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
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
}

export const bugsService = new BugsService()
