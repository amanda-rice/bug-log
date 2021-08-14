import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BugsService {
  async getAll() {
    const bugs = await dbContext.Bugs.find().populate('creator', 'name picture')
    return bugs
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async getOne(id) {
    const bugs = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    if (!bugs) {
      throw new BadRequest('Invalid Id')
    }
    return bugs
  }

  async edit(updated, updatedId, userId) {
    const bug = await dbContext.Bugs.findById(updatedId)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    if (bug.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your bug')
    }
    if (bug.closed) {
      throw new Forbidden('Already Closed')
    }
    const afterUpdate = await dbContext.Bugs.findByIdAndUpdate(updatedId, updated, { new: true })
    return afterUpdate
  }

  async destroy(id, thisUserId) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    if (bug.creatorId.toString() !== thisUserId) {
      throw new Forbidden('This is not your bug')
    }
    if (bug.closed) {
      throw new Forbidden('Already Closed')
    }
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return await dbContext.Bugs.findByIdAndUpdate(id, { closed: true, closedDate: `${month}/${day}/${year}` }, { new: true })
  }
}
export const bugsService = new BugsService()
