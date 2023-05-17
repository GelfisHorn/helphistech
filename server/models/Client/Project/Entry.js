import mongoose from "mongoose";

const entrySchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Project'
    },
    title: String,
    description: String,
    images: [String],
    work_hours: Number
}, {
    timestamps: true
})

const ProjectEntry = mongoose.model('ProjectEntry', entrySchema)

export default ProjectEntry