import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { noteService } from '../services/NoteService'

export class NoteController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.editNote)
      .delete('/:id', this.deleteNote)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const note = res.send(await noteService.create(req.body))
      res.status(201).send(note)
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      const bug = await noteService.editNote(req.params.id, req.body)
      res.status(200).send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const bug = await noteService.deleteNote(req.params.id)
      res.status(200).send(bug)
    } catch (error) {
      next(error)
    }
  }
}
