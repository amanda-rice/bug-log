import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async getAll() {
    const notes = await dbContext.Notes.find().populate('creator', 'name picture')
    return notes
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id).populate('creator', 'name picture')
  }

  async getById(id) {
    const notes = await dbContext.Notes.find({ bugId: id }).populate('creator', 'name picture')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async edit(updated, updatedId, userId) {
    const note = await dbContext.Notes.findById(updatedId)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your note')
    }
    if (note.closed) {
      throw new Forbidden('Already Closed')
    }
    const afterUpdate = await dbContext.Notes.findByIdAndUpdate(updatedId, updated, { new: true }).populate('creator', 'name picture')
    return afterUpdate
  }

  async destroy(id, thisUserId) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== thisUserId) {
      throw new Forbidden('This is not your note')
    }
    return await dbContext.Notes.findByIdAndDelete(id)
  }
}
export const notesService = new NotesService()
