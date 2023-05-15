import mongoose from "mongoose";
// Models
import Project from "../../models/Project.js";
import User from "../../models/User.js";

const ObjectId = mongoose.Types.ObjectId;
async function getProject(req, res) {
    const { id = null } = req.params;

    if(!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id del proyecto es incorrecto' });
    }
    
    const project = await Project.findById(id).populate({ path: 'client', select: '_id name email' });
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    if(project.client && project.client._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: 'No tienes acceso a este proyecto' });
    }

    try {
        return res.status(200).json(project);
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message });
    }
}

async function assignClient (req, res) {
    const { id = null } = req.params;
    const { userId = null } = req.body;

    if(!id || !userId) {
        return res.status(400).json({ msg: 'El id del usuario o del proyecto es incorrecto' });
    }

    if(!ObjectId.isValid(id) || !ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: 'El id del usuario o del proyecto es incorrecto' });
    }

    const project = await Project.findById(id);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }
    if(project.client) {
        return res.status(404).json({ msg: 'Ya hay un cliente asignado a este proyecto' });
    }

    const user = await User.findById(userId);
    if(!user) {
        return res.status(404).json({ msg: 'Este usuario no existe' })
    }

    if(user.permissions !== 'client') {
        return res.status(400).json({ msg: 'Este usuario no es cliente' });
    }

    try {
        project.client = user._id;
        await project.save();
        return res.status(200).json({ msg: 'Se asignó el cliente correctamente' })
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({ msg: error.message })
    }
}

export {
    getProject,
    assignClient
}