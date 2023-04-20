import mongoose from "mongoose";

const videoCallSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'pending',
        enum: ['pending', 'concluded', 'cancelled']
    }
}, {
    timestamps: true
})

const VideoCall = mongoose.model('VideoCall', videoCallSchema)

export default VideoCall