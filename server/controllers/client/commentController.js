import mongoose from "mongoose";
import Project from '../../models/Project.js'
import ClientComment from '../../models/Client/ClientComment.js'

const ObjectId = mongoose.Types.ObjectId;
async function create(req, res) {
    const projectId = req.params.id;
    const { message = null } = req.body;

    if([message].includes(null)) {
        const error = new Error('"message" is required');
        return res.status(400).json({ msg: error.message });
    }

    // If projectId is not mongodb id throw error
    if(!ObjectId.isValid(projectId)) {
        const error = new Error("Project id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const projectExists = await Project.findById(projectId);
    if(!projectExists) {
        return res.status(400).json({ msg: "Project doesn't exists" })
    }

    try {
        const newComment = new ClientComment({ user: req.user._id, project: projectId, message });
        newComment.save();
        return res.status(200).json({ msg: "Comment created successfully" });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

async function edit(req, res) {
    const commentId = req.params.id;
    const { message = null } = req.body;

    if([message].includes(null)) {
        const error = new Error('"message" is required');
        return res.status(400).json({ msg: error.message });
    }

    // If commentId is not mongodb id throw error
    if(!ObjectId.isValid(commentId)) {
        const error = new Error("Comment id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const comment = await ClientComment.findById(commentId);
    if(!comment) {
        return res.status(400).json({ msg: "This comment doesn't exists" })
    }

    if(comment.user.toString() != req.user._id) {
        return res.status(400).json({ msg: "You can't do this" });
    }

    try {
        comment.message = message;
        await comment.save();
        return res.status(200).json({ msg: "Comment edited successfully" });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

async function remove(req, res) {
    const commentId = req.params.id;

    // If commentId is not mongodb id throw error
    if(!ObjectId.isValid(commentId)) {
        const error = new Error("Comment id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const comment = await ClientComment.findById(commentId);
    if(!comment) {
        return res.status(400).json({ msg: "This comment doesn't exists" })
    }

    if(comment.user.toString() != req.user._id) {
        return res.status(400).json({ msg: "You can't do this" });
    }

    try {
        await comment.deleteOne();
        return res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

export {
    create,
    edit,
    remove
}