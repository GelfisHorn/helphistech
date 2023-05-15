import mongoose from "mongoose";

const clientCommentSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    },
    message: {
        type: String
    }
}, {
    timestamps: true
})

const ClientComment = mongoose.model('ClientComment', clientCommentSchema)

export default ClientComment