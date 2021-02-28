import ROLES from '../models/UserModel.js';

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