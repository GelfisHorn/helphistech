import mongoose from "mongoose"
import User from "../../models/User.js"
import createToken from "../../helpers/createToken.js"
import createJWT from '../../helpers/createJWT.js'

const ObjectId = mongoose.Types.ObjectId;

/**
 * Get Account (only superadmin)
 */
const getAccount = async (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(400).json({ msg: 'Es necesario un ID de usuario' });
    }
    
    if(!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Este usuario no existe' });
    }

    try {
        const account = await User.findById(id).select('-__v -createdAt -updatedAt -permissions -disabled -confirmed -password');
        return res.status(200).json(account);
    } catch (error) {
        return res.status(400).json({ msg: 'Hubo un error al obtener el usuario' });
    }
}
/**
 * Create Account (only superadmin)
 */
const createAccount = async (req, res) => {
    const { name = null, surname = null, position = null, email = null, password = null, permissions = null } = req.body;

    if(name == null) {
        return res.status(400).json({ msg: '"name" es obligatorio' });
    }
    if(email == null) {
        return res.status(400).json({ msg: '"email" es obligatorio' });
    }
    if(password == null || String(password).length < 16) {
        return res.status(400).json({ msg: '"password" es obligatorio y debe tener mínimo 16 caracteres' });
    }

    const userExists = await User.findOne({ email });
    if(userExists) {
        return res.status(409).json({ msg: 'Este e-mail ya pertenece a un usuario' });
    }

    try {
        const newUser = new User({ name, surname, position, email, password, permissions });
        await newUser.save();
        return res.status(200).json({ msg: 'Se creó el usuario correctamente' });
    } catch (err) {
        const error = new Error(err)
        return res.status(400).json({ msg: error.message });
    }
}
/**
 * Edit Account (only superadmin)
 */
const editAccount = async (req, res) => {
    const id = req.body._id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(name == '') {
        return res.status(400).json({ msg: '"name" es obligatorio' });
    }
    if(email == '') {
        return res.status(400).json({ msg: '"email" es obligatorio' });
    }
    if(password && String(password).length < 16) {
        return res.status(400).json({ msg: '"password" debe tener mínimo 16 caracteres' });
    }

    const user = await User.findById(id);
    if(!user) {
        return res.status(409).json({ msg: 'Este usuario no existe' });
    }
    const emailExists = await User.findOne({ email });
    if(emailExists && emailExists._id != id && emailExists.email == email) {
        return res.status(409).json({ msg: 'Este email ya existe para un usuario' });
    }

    try {
        user.name = name;
        user.email = email;
        password ? user.password = password : null;
        await user.save();
        return res.status(200).json({ msg: 'Se aplicaron los cambios al usuario correctamente' });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: 'Hubo un error al aplicar los cambios' });
    }
}
/**
 * Delete Account (only superadmin)
 */
const deleteAccount = async (req, res) => {
    const id = req.body.accountId;
    if(!id) {
        return res.status(400).json({ msg: 'Es necesario un ID de usuario' });
    }
    
    if(!ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Este usuario no existe' });
    }

    const user = await User.findById(id);
    if(!user) {
        return res.status(409).json({ msg: 'Este usuario no existe' });
    }

    try {
        await user.deleteOne();
        return res.status(200).json({ msg: 'El usuario se eliminó correctamente' });
    } catch (error) {
        return res.status(400).json({ msg: 'Hubo un error al obtener el usuario' });
    }
}

const authenticate = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Check if user exists
    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('Este usuario no existe')
        return res.status(404).json({ msg: error.message })
    }
    // Check if user is confiremd
    if(!user.confirmed) {
        const error = new Error('Debes confirmar tu cuenta')
        return res.status(400).json({ msg: error.message })
    }
    /* Check if user account is disabled */
    if(user.disabled) {
        const error = new Error('Esta cuenta se encuentra deshabilitada')
        return res.status(403).json({ msg: error.message })
    }

    if(await user.checkPassword(password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            position: user.position,
            email: user.email,
            permissions: user.permissions,
            token: createJWT(user._id)
        })
    } else {
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({token})
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.confirmed = true
        user.token = ''
        user.save()
        res.json({ msg: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if(!user) {
        const error = new Error('No hay ningún usuario registrado con este correo electrónico')
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = createToken()
        user.save()
        /* TODO: Importar nodemailer al proyecto y enviar email cuando el usuario resetee su password */
        res.json({ msg: 'Se enviaron instrucciones a tu correo electrónico' })
    } catch (error) {
        console.log(error)
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }
    res.json({ msg: 'Token váldio' })
}

const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if(!user) {
        const error = new Error('Este token no es válido')
        return res.status(404).json({ msg: error.message })
    }

    user.password = password
    user.token = ''
    try {
        await user.save()
        res.json({ msg: 'Cambiaste tu contraseña correctamente' })
    } catch (error) {
        console.log(error)
    }
}

const profile = async (req, res) => {
    const { user } = req

    res.json(user)
}

const editProfile = async (req, res) => {
    const { name, email, password, userId } = req.body

    if (ObjectId.isValid(userId)) {
        const user = await User.findOne({ userId })
        if(!user) {
            return
        }

        if (String(name).length < 20) {
            try {
                user.name = name
                user.email = email
                user.password = password
                await user.save()
                res.json(user)
            } catch (error) {
                res.json({ msg: 'Hubo un error al guardar los cambios' })
            }

        }
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
                res.json({ msg: 'Has desactivado tu cuenta'})
            } catch (error) {
                console.log(error)
                res.json({ msg: 'Hubo un problema al desactivar tu cuenta' })   
            }
        }
    }
}

export {
    getAccount,
    createAccount,
    editAccount,
    deleteAccount,
    authenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    profile,
    editProfile,
    disable
}
