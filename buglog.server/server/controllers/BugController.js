import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'

export class BugController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)
    // NOTE: Calling noteService
      .get('/:id/notes', this.getNotes)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editBug)
      .delete('/:id', this.deleteBug)
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugService.find(req.query)
      res.status(200).send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const bug = await bugService.findById(req.params.id)
      res.status(200).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = res.send(await bugService.create(req.body))
      res.status(201).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      delete req.body.closed
      const bug = await bugService.editBug(req.params.id, req.body)
      res.status(200).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      const bug = await bugService.deleteBug(req.params.id)
      res.status(200).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await noteService.find({ bug: req.params.id })
      res.status(200).send(notes)
    } catch (error) {
      next(error)
    }
  }
}
