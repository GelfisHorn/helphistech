import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    position: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profile_img: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: String,
        default: null,
        enum: [null, 'client', 'developer', 'admin', 'superadmin']
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (formPassword) {
    return await bcrypt.compare(formPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User