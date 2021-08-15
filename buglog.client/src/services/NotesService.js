import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
    console.log(AppState.notes)
  }

  async createNote(obj) {
    const res = await api.post('api/notes', obj)
    logger.log(res)
    AppState.notes.push(res.data)
    logger.log(AppState.notes)
  }
}

export const notesService = new NotesService()
