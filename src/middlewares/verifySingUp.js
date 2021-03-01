import User from '../models/UserModel.js';
import ROLES from '../models/UserModel.js';

export const checkDuplicatedUserOrEmail = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) return res.status(400).json({
        msg: 'El usuario ya existe'
    });

    next();
};

export const checkIfRoleExists = (req, res, next) => {
    if(req.body.role) {
        for (let i = 0; i < req.body.role.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    msg: `Role ${req.body.roles[i]} no existe`
                })
            }
        }
    }

    next();
};