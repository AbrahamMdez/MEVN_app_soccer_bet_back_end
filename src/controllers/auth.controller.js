import User from '../models/UserModel.js'
import Role from '../models/RoleModel.js'

import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {

    const { name, surname, age, email, password, role } = req.body;

    try {

        const newUser = new User({
            name,
            surname,
            age,
            email,
            password: await User.encryptPassword(password)
        });

        if (role) {
            const foundRoles = await Role.find({ name: { $in: role }})
            newUser.role = foundRoles.map ( role => role._id)
        }else {
            const role = await Role.findOne({ name: 'user' })
            newUser.role = [role._id];
        }

        const savedUser = await newUser.save();

        const token = jwt.sign({
            id: savedUser._id
        }, process.env.PORT.TOKEN_SECRET || 'secret_token', {
            expiresIn: 60 * 60 * 24 * 30
        });

        res.status(200).json({token})

    }catch(error) {
        return res.status(500).json({
            msg: 'Error al guardar el usuario',
            error
        })
    }
};

export const signIn = async(req, res) => {

    //La propiedad que le añadimos al final llamada POPULATE, nos trae lo que le metamos en los parametros, tal cual esta en nuestro modelo. Sino
    //le pusieramos el populate, solo nos traería el id, pero no veriamos que tipo de rol es ('admin', 'user'....), esto nos permite ver que tipo de rol es
    //ademas de su id que ya nos viene por defecte
    const userFound = await User.findOne({ email: req.body.email }).populate('role');

    console.log(userFound)

    if(!userFound) {
        return res.status(400).json({
            msg: 'No existe usuario con ese email'
        })
    };

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if(!matchPassword) {
        return res.status(401).json({
            token: null,
            msg: 'No existe usuario con esa contraseña'
        })
    };

    const token = jwt.sign({
        id: userFound._id
        }, process.env.PORT.TOKEN_SECRET || 'secret_token', {
            expiresIn: 60 * 60 * 24 * 30
    })

    console.log(userFound)
    res.json({ token });
};