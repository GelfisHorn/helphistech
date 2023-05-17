import mongoose from "mongoose";
// Models
import User from "../models/User.js";
import Project from "../models/Project.js";
import ProjectComment from '../models/ProjectComment.js'
// Config
import permissions from "../config/permissions.js";

const ObjectId = mongoose.Types.ObjectId;
const getProject = async (req, res) => {
    
    const _id = req.body._id;

    if(!_id) {
        return res.status(404).json({ msg: 'Hay campos requeridos vacíos (_id)' })
    }

    if(!ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'id no válido' })
    }

    Promise.all([Project.findById(_id).select('-updatedAt -__v'), ProjectComment.find({ project: _id }).populate({ path: 'user', select: 'name' }).select('-__v -project')])
        .then(values => {
            return res.status(200).json({ project: values[0], comments: values[1] });
        })
        .catch(error => {
            return res.status(404).json({ msg: 'Hubo un error al obtener los proyectos' })
        })
}

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().select('-updatedAt -__v');
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener los proyectos' })
    }
}

const createProject = async (req, res) => {
    const website_type = req.body.website_type;
    const contact_information = req.body.contact_information;

    if(!website_type || !contact_information) {
        return res.status(406).json({ msg: 'Hay campos requeridos vacíos' });
    }

    if(website_type === 'website' || website_type === 'ecommerce' || website_type === 'app') {
        if(!contact_information?.company_name || !contact_information?.full_name || !contact_information?.email) {
            return res.status(406).json({ msg: "'contact_information' debe ser un objecto { company_name, full_name, email }" });
        }
    
        try {
            const newProject = new Project(req.body);
            await newProject.save();
            return res.status(200).json({ msg: "Hemos recibido los datos de tu proyecto" });
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error al enviar los datos de tu proyecto" });
        }
    } else {
        return res.status(406).json({ msg: "'website_type' debe ser 'website' o 'ecommerce' o 'app'" }); 
    }
}

const changeProjectState = async (req, res) => {
    const projectId = req.body._id;
    const newState = req.body.state;

    // Check if project ID is valid
    if(!ObjectId.isValid(projectId)) {
        return res.status(406).json({ msg: 'El id del proyecto no es válido' });
    }

    if(!newState) {
        return res.status(406).json({ msg: 'Hay campos requeridos vacíos (state)' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    try {
        project.state = newState;
        project.save();
        return res.status(200).json({ msg: 'Cambiaste el estado del proyecto correctamente' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado del proyecto' });
    }
}

const cancelProject = async (req, res) => {
    const projectId = req.body._id;

    if(req.user.permissions !== permissions.superadmin) {
        return res.status(406).json({ msg: 'Permisos insuficientes' });
    }

    // Check if project ID is valid
    if(!ObjectId.isValid(projectId)) {
        return res.status(406).json({ msg: 'El id del proyecto no es válido' });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    try {
        project.state = 'cancelled';
        project.save();
        return res.status(200).json({ msg: 'Cancelaste el proyecto' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado del proyecto' });
    }
}

const createComment = async (req, res) => {
    const user = req.user;
    const reqUserId = req.body.userId;
    const projectId = req.body.projectId;
    const message = req.body.message;

    if(user._id.toString() != reqUserId) {
        return res.status(400).json({ msg: 'El usuario es incorrecto' });
    }

    const project = await Project.findById(projectId);
    if(!project) {
        return res.status(404).json({ msg: 'Este proyecto no existe' })
    }

    try {
        const projectComment = new ProjectComment({ user: user._id.toString(), project: project._id.toString(), message });
        await projectComment.save();
        return res.status(200).json({ comment: { _id: projectComment._id, user: { _id: user._id, name: user.name }, message, createdAt: projectComment.createdAt }, msg: 'Comentario creado correctamente' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al crear el comentario' });
    }
}

const editComment = async (req, res) => {
    const user = req.user;
    const commentId = req.body.commentId;
    const message = req.body.message;

    if(!ObjectId.isValid(commentId)) {
        return res.status(404).json({ msg: 'Este comentario no existe' })
    }

    const comment = await ProjectComment.findById(commentId);
    if(!comment) {
        return res.status(404).json({ msg: 'Este comentario no existe' })
    }

    if(user._id.toString() != comment.user.toString()) {
        return res.status(400).json({ msg: 'El usuario es incorrecto' });
    }

    try {
        comment.message = message;
        await comment.save();
        return res.status(200).json({ msg: 'Comentario editado correctamente' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al editar el comentario' });
    }
}

const deleteComment = async (req, res) => {
    const user = req.user;
    const commentId = req.body.commentId;

    if(!ObjectId.isValid(commentId)) {
        return res.status(404).json({ msg: 'Este comentario no existe' })
    }

    const comment = await ProjectComment.findById(commentId);
    if(!comment) {
        return res.status(404).json({ msg: 'Este comentario no existe' })
    }

    if(user._id.toString() != comment.user.toString()) {
        return res.status(400).json({ msg: 'El usuario es incorrecto' });
    }

    try {
        await comment.deleteOne();
        return res.status(200).json({ msg: 'Comentario elimiado correctamente' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Hubo un error al eliminar el comentario' });
    }
}

export {
    getProject,
    getProjects,
    createProject,
    changeProjectState,
    cancelProject,
    createComment,
    editComment,
    deleteComment
}