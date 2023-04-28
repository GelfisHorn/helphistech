import mongoose from "mongoose";

const projectCommentSchema = mongoose.Schema({
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

const ProjectComment = mongoose.model('ProjectComment', projectCommentSchema)

export default ProjectComment