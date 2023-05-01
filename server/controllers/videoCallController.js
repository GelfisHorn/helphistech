import mongoose from "mongoose";
import VideoCall from "../models/VideoCall.js";

const ObjectId = mongoose.Types.ObjectId;

const listActiveVideoCalls = async (req, res) => {
    try {
        const videocalls = await VideoCall.find({ date: { $gt: new Date()}, state: "pending" }).select("date hour")
        return res.status(200).json(videocalls);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ msg: 'Hubo un error al obtener las videollamadas' })
    }
}
const getVideoCall = async (req, res) => {
    
    const _id = req.body._id;

    if(!_id) {
        return res.status(404).json({ msg: 'Hay campos requeridos vacíos (_id)' })
    }

    if(!ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'id no válido' })
    }

    try {
        const videocall = await VideoCall.findById(_id).select('-updatedAt -__v');
        return res.status(200).json(videocall);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener las videollamadas' })
    }
}

const getVideoCalls = async (req, res) => {
    try {
        const videocalls = await VideoCall.find().select('-updatedAt -__v');
        return res.status(200).json(videocalls);
    } catch (error) {
        return res.status(404).json({ msg: 'Hubo un error al obtener las videollamadas' })
    }
}

/**
 * Create video call
 */ 
async function createVideoCall(req, res) {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const date = req.body.date;
    const hour = req.body.hour;
    const description = req.body.description

    if([full_name, email, date, hour, description].includes('')) {
        return res.status(400).json({ msg: 'All fields are required. (full_name, email, platform, date, hour, timezone)' })
    }

    if(typeof hour != 'string' || typeof email != 'string' || typeof full_name != 'string') {
        return res.status(400).json({ msg: 'All fields must be type string' })
    }

    try {
        const newVideoCall = new VideoCall({full_name, email, date, hour, description});
        await newVideoCall.save();
        return res.status(200).json({ msg: 'ok' })
    } catch (error) {
        return res.status(400).json({ msg: 'There was an error scheduling your video call' })
    }
}

const changeState = async (req, res) => {
    const videocallId = req.body._id;
    const newState = req.body.state;

    // Check if videocall ID is valid
    if(!ObjectId.isValid(videocallId)) {
        return res.status(406).json({ msg: 'El id no es válido' });
    }

    if(!newState) {
        return res.status(406).json({ msg: 'Hay campos requeridos vacíos (state)' });
    }

    // Check if videocall exists
    const videocall = await VideoCall.findById(videocallId);
    if(!videocall) {
        return res.status(404).json({ msg: 'Esta videollamada no existe' });
    }

    try {
        videocall.state = newState;
        videocall.save();
        return res.status(200).json({ msg: 'Cambiaste el estado de la videollamada' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado' });
    }
}

const cancelVideoCall = async (req, res) => {
    const videocallId = req.body._id;

    // Check if videocall ID is valid
    if(!ObjectId.isValid(videocallId)) {
        return res.status(406).json({ msg: 'El id no es válido' });
    }

    // Check if videocall exists
    const videocall = await VideoCall.findById(videocallId);
    if(!videocall) {
        return res.status(404).json({ msg: 'Este proyecto no existe' });
    }

    try {
        videocall.state = 'cancelled';
        videocall.save();
        return res.status(200).json({ msg: 'Cancelaste la videollamada' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al cambiar el estado' });
    }
}

const deleteVideoCall = async (req, res) => {
    const videocallId = req.body._id;

    // Check if videocall ID is valid
    if(!ObjectId.isValid(videocallId)) {
        return res.status(406).json({ msg: 'El id no es válido' });
    }

    // Check if videocall exists
    const videocall = await VideoCall.findById(videocallId);
    if(!videocall) {
        return res.status(404).json({ msg: 'Esta videollamada no existe' });
    }

    try {
        await videocall.deleteOne();
        return res.status(200).json({ msg: 'Eliminiaste la videollamada' });
    } catch (error) {
        return res.status(500).json({ msg: 'Hubo un error al eliminar la videollamada' });
    }
}

export {
    listActiveVideoCalls,
    getVideoCall,
    getVideoCalls,
    createVideoCall,
    changeState,
    cancelVideoCall,
    deleteVideoCall
}