import mongoose from "mongoose"
import User from "../../models/User.js"
import createToken from "../../helpers/createToken.js"
import createJWT from '../../helpers/createJWT.js'

const ObjectId = mongoose.Types.ObjectId;

const authenticate = async (req, res) => {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('User does not exist')
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('You must confirm your account')
        return res.status(400).json({ msg: error.message })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('This account is disabled')
        return res.status(403).json({ msg: error.message })
    }

    if(await user.checkPassword(password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            position: user.position,
            email: user.email,
            profile_img: user.profile_img,
            permissions: user.permissions,
            token: createJWT(user._id)
        })
    } else {
        const error = new Error('Incorrect password')
        return res.status(403).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.confirmed = true
        user.token = ''
        user.save()
        res.json({ msg: 'User confirmed successfully'})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('There is no registered user with that email')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = createToken()
        user.save()
        return res.json({ msg: 'Instructions have been sent to your email', token: user.token });
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }
    res.json({ msg: 'Valid token' })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Invalid token')
        return res.status(404).json({ msg: error.message })
    }

    if (String(password).length < 12) {
        const error = new Error('The password is too short')
        return res.status(404).json({ msg: error.message })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        res.json({ msg: 'You have changed the password successfully' })
    } catch (error) {
        console.log(error)
    }
}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}

const editProfile = async (req, res) => {
    const { name = null, surname = null, email = null, profile_img = null, password = null, userId = null } = req.body

    if(!ObjectId.isValid(userId)) {
        const error = new Error("The userId is invalid");
        return res.status(400).json({ msg: error.message })
    }

    const user = await User.findById(userId)
    if(!user) {
        const error = new Error("This user does not exist");
        return res.status(400).json({ msg: error.message })
    }

    if(password && String(password).length < 16) {
        const error = new Error("Password must be 16 or more characters");
        return res.status(400).json({ msg: error.message })
    }

    /* if (String(name).length < 20 || String(surname).length < 20) {
        const error = new Error("First and last name must be less than 20 characters");
        return res.status(400).json({ msg: error.message })
    } */

    try {
        if(name) user.name = name;
        if(surname) user.surname = surname
        if(email) user.email = email
        if(profile_img) user.profile_img = profile_img
        if(password) user.password = password
        await user.save()
        return res.status(200).json({ msg: "You edited the profile correctly" })
    } catch (error) {
        return res.status(500).json({ msg: 'There was an error saving changes' })
    }
}

const disable = async (req, res) => {
    const { userId } = req.body

    if(ObjectId.isValid(userId)) {
        const user = await User.findOne({ userId })
        if(user) {
            console.log(user)
            user.disabled = true
            try {
                await user.save()
                res.json({ msg: 'You have successfully deactivated your account'})
            } catch (error) {
                console.log(error)
                res.json({ msg: 'There was a problem deactivating your account' })   
            }
        }
    }
}

export {
    authenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    profile,
    editProfile,
    disable
}
