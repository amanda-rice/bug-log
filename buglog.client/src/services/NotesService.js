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
    logger.log(res, 'create note')
    AppState.notes.push(res.data)
    logger.log(AppState.notes)
  }

  async destroy(id) {
    const res = await api.delete(`api/notes/${id}`)
    AppState.notes = AppState.notes.filter(note => note.id !== id)
  }
}

export const notesService = new NotesService()
