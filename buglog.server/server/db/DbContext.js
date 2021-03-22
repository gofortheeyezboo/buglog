import mongoose from 'mongoose'
import BugSchema from '../models/Bug'
import AccountSchema from '../models/Account'
import NoteSchema from '../models/Note'

class DbContext {
  Bugs = mongoose.model('Bug', BugSchema);
  Account = mongoose.model('Account', AccountSchema);
  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
