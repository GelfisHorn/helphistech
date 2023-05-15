import mongoose from "mongoose";
import Project from "../../../models/Project.js";
import Entry from '../../../models/Client/Project/Entry.js'

const ObjectId = mongoose.Types.ObjectId;
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
        const newEntry = new Entry({ project: projectId, title, description, images, work_hours });
        await newEntry.save();
        return res.status(200).json({ msg: "Entry created successfully" });
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

    try {
        await entry.deleteOne();
        return res.status(200).json({ msg: "Entry deleted successfully" });
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