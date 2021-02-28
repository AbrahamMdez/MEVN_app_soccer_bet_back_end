import pkg from 'mongoose';
const { Schema, model } = pkg;
import bcrypt from 'bcryptjs';

export const ROLES = ['admin', 'user', 'moderator'];

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        lowercase: true
    },
    surname: {
        type: String,
        required: [true, 'El apellido es necesario'],
        lowercase: true
    },
    age: {
        type: Number,
        required: [true, 'La edad es necesaria'],
    },
    email: {
        type: String,
        required: [true, 'Email obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria'],
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: [
        {
            ref: 'Role',
            type: Schema.Types.ObjectId
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
},
    {
        versionKey: false
    }
);

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', UserSchema);
