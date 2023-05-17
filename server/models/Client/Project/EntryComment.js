import mongoose from "mongoose";

const entryCommentSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    entry: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'ProjectEntry'
    },
    message: String
}, {
    timestamps: true
})

const EntryComment = mongoose.model('EntryComment', entryCommentSchema)

export default EntryComment