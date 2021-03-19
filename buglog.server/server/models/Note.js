import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema(
  {
    body: { type: String, required: true },
    // eslint-disable-next-line no-undef
    bug: { type: ObjectId, ref: 'Bug', required: true },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
