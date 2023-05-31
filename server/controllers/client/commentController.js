import mongoose from "mongoose";
import Project from '../../models/Project.js'
import ClientComment from '../../models/Client/ClientComment.js'
import permissions from "../../config/permissions.js";

const ObjectId = mongoose.Types.ObjectId;
async function create(req, res) {
    const projectId = req.params.id;
    const { message = null, files = [] } = req.body;

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
        const newComment = new ClientComment({ user: req.user._id, project: projectId, message, files: files || [] });
        newComment.save();
        return res.status(200).json({ _id: newComment._id, user: { _id: req.user._id, name: req.user.name, surname: req.user.surname }, message: newComment.message, files: newComment.files });
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

async function seen(req, res) {
    const { id } = req.params;

    if(!id || !ObjectId.isValid(id)) {
        const error = new Error("Comment id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const comment = await ClientComment.findById(id);
    if(!comment) {
        return res.status(400).json({ msg: "This comment doesn't exists" })
    }

    try {
        comment.seen = true;
        comment.save();
        return res.status(200).json({ msg: "Comment marked as seen" });
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
    seen,
    remove
}