import mongoose from "mongoose";
import Entry from "../../../../models/Client/Project/Entry.js";
import EntryComment from '../../../../models/Client/Project/EntryComment.js'

const ObjectId = mongoose.Types.ObjectId;
async function create(req, res) {
    const entryId = req.params.id;
    const { message = null } = req.body;

    if([message].includes(null)) {
        const error = new Error('"message" is required');
        return res.status(400).json({ msg: error.message });
    }

    // If entryId is not mongodb id throw error
    if(!ObjectId.isValid(entryId)) {
        const error = new Error("Entry id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const entryExists = await Entry.findById(entryId);
    if(!entryExists) {
        return res.status(400).json({ msg: "Entry doesn't exists" })
    }

    try {
        const newComment = new EntryComment({ user: req.user._id, entry: entryId, message });
        newComment.save();
        return res.status(200).json({ 
            _id: newComment._id, 
            user: { _id: req.user._id, name: req.user.name, surname: req.user.surname },
            message
        });
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

    const comment = await EntryComment.findById(commentId);
    if(!comment) {
        return res.status(400).json({ msg: "This comment doesn't exists" })
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

    const comment = await EntryComment.findById(id);
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

    const comment = await EntryComment.findById(commentId);
    if(!comment) {
        return res.status(400).json({ msg: "This comment doesn't exists" })
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