import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getNoteById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getNoteById(req, res, next) {
    try {
      const bug = await notesService.getById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const bug = await bugsService.getOne(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      // req.body.creatorId = req.userInfo.id
      const bug = await bugsService.edit(req.body, req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      const bug = await bugsService.destroy(req.params.id, req.userInfo.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const bug = await bugsService.getAll()
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // do not trust the client use userInfo
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}
