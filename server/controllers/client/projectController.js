import mongoose from "mongoose";
// Models
import Project from "../../models/Project.js";
import ClientComments from '../../models/Client/ClientComment.js'
import User from "../../models/User.js";
import permissions from "../../config/permissions.js";

const ObjectId = mongoose.Types.ObjectId;
async function getProject(req, res) {
    const { id = null } = req.params;
    const { user } = req;

    if(!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id del proyecto es incorrecto' });
    }
    
    const project = await Project.findOne({ client: id }).populate({ path: 'client', select: '_id name email' });
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe o no tiene un cliente asignado' });
    }

    const projectComments = await ClientComments.find({ project: project._id }).populate({ path: 'user', select: '_id name surname'});

    if(user.permissions === permissions.client && user._id.toString() !== project?.client?._id?.toString()) {
        return res.status(403).json({ msg: 'No tienes acceso a este proyecto' });
    }

    try {
        return res.status(200).json({ project, comments: projectComments });
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message });
    }
}

async function assignClient (req, res) {
    const { id = null } = req.params;
    const { email = null } = req.body;

    if(!id || !email) {
        return res.status(400).json({ msg: 'El email del usuario o del proyecto es incorrecto' });
    }

    if(!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id del proyecto es incorrecto' });
    }

    const project = await Project.findById(id);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }
    if(project.client) {
        return res.status(404).json({ msg: 'Ya hay un cliente asignado a este proyecto' });
    }

    const user = await User.findOne({ email });
    if(!user) {
        return res.status(404).json({ msg: 'Este usuario no existe' })
    }

    if(user.permissions !== 'client') {
        return res.status(400).json({ msg: 'Este usuario no es cliente' });
    }

    const alreadyAssigned = await Project.findOne({ client: user._id });
    if(alreadyAssigned) {
        return res.status(400).json({ msg: 'Este usuario ya está asignado a un proyecto' });
    }

    try {
        project.client = user._id;
        await project.save();
        return res.status(200).json(project)
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message })
    }
}

export {
    getProject,
    assignClient
}