import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    console.log(AppState.bugs)
  }

  async getBugById(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.thisBug = res.data
    console.log(AppState.thisBug)
  }

  async createBug(obj) {
    const res = await api.post('api/bugs', obj)
    logger.log(res)
    AppState.bugs.push(res.data)
    logger.log(AppState.bugs)
  }
}

export const bugsService = new BugsService()
