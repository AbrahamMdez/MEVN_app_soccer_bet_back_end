import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import Role from '../models/RoleModel.js'

export const verifyToken = async (req, res, next) => {
    
    try {
        const token = req.headers['token'];

        console.log(token)

        if(!token) {
            return res.status(403).json({
                msg: 'No existe token'
            });
        };

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if(!user) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        };

        next();

    }catch(error) {
        return res.status(401).json({
            msg: 'No estas autorizado'
        })
    }
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: user.role}})

    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next();
            return
        }
    }

    return res.status(403).json({
        msg: 'Tienes que ser administrador para realizar estas operaciones'
    })
};