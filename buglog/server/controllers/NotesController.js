import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      // req.body.creatorId = req.userInfo.id
      const note = await notesService.edit(req.body, req.params.id, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const note = await notesService.destroy(req.params.id, req.userInfo.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const note = await notesService.getAll()
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // do not trust the client use userInfo
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
