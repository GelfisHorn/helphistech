import permissions from '../config/permissions.js';

/**
 * Check if the user has client permissions
 * @param req - request object
 * @param res - response object
 * @param next - callback
*/

const checkClient = async (req, res, next) => {
    const user = req.user;

    if(user.permissions != permissions.client) {
        return res.status(403).json({ msg: 'Insufficient permissions' })
    }

    next();
}

export default checkClient