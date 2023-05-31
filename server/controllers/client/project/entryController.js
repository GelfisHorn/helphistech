import mongoose from "mongoose";
// Models
import Project from "../../../models/Project.js";
import Entry from '../../../models/Client/Project/Entry.js'
import EntryComment from "../../../models/Client/Project/EntryComment.js";

const ObjectId = mongoose.Types.ObjectId;
async function getEntries(req, res) {

    const { project } = req.params || {};

    try {
        const entries = await Entry.find({ project }).select('-__v -updatedAt');
        return res.status(200).json(entries);
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message })
    }
}

async function get(req, res) {

    const { id } = req.params;

    if(!id || !ObjectId.isValid(id)) {
        const error = new Error('Entry id is required');
        return res.status(400).json({ msg: error.message })
    }

    
    try {
        const entry = await Entry.findById(id).select('-__v -updatedAt');
        const comments = await EntryComment.find({ entry: id }).populate({path: 'user', select: '_id name surname'}).select('-__v -updatedAt');
        return res.status(200).json({ entry, comments });
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message })
    }
}

async function create(req, res) {
    const projectId = req.params.id;
    const { title = null, description = null, images = null, work_hours = null } = req.body;

    if([title, description, images, work_hours].includes(null)) {
        const error = new Error("All fields are required")
        return res.status(400).json({ msg: error.message })
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
        const newEntry = new Entry({ user: req.user._id, project: projectId, title, description, images, work_hours });
        await newEntry.save();
        return res.status(200).json(newEntry);
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

async function edit(req, res) {
    const entryId = req.params.id;
    const { title = null, description = null, images = null, work_hours = null } = req.body;

    if([title, description, images, work_hours].includes(null)) {
        const error = new Error("All fields are required")
        return res.status(400).json({ msg: error.message })
    }

    // If entryId is not mongodb id throw error
    if(!ObjectId.isValid(entryId)) {
        const error = new Error("Entry id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const entry = await Entry.findById(entryId);
    if(!entry) {
        return res.status(400).json({ msg: "Entry doesn't exists" })
    }

    try {
        entry.title = title;
        entry.description = description;
        entry.images = images;
        entry.work_hours = work_hours;
        await entry.save();
        return res.status(200).json({ msg: "Entry edited successfully" });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

async function remove(req, res) {
    const entryId = req.params.id;

    // If entryId is not mongodb id throw error
    if(!ObjectId.isValid(entryId)) {
        const error = new Error("Entry id isn't valid")
        return res.status(400).json({ msg: error.message })
    }

    const entry = await Entry.findById(entryId);
    if(!entry) {
        return res.status(400).json({ msg: "Entry doesn't exists" })
    }
    await EntryComment.find({ entry: entryId }).deleteMany();

    try {
        await entry.deleteOne();
        return res.status(200).json({ msg: "Entry deleted successfully" });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message })
    }
}

export {
    getEntries,
    get,
    create,
    edit,
    remove
}