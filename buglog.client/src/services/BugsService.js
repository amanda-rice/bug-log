import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAll() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async createBug(obj) {
    const res = await api.post('api/bugs', obj)
    logger.log(res)
    AppState.bugs.push(res.data)
    logger.log(AppState.bugs)
  }
}

export const bugsService = new BugsService()
