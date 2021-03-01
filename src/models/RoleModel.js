import pkg from 'mongoose';
const { Schema, model } = pkg;

export const ROLES = ['admin', 'user', 'moderator'];

const RoleSchema = new Schema(
    {
    name: String,
    },
    {
        versionKey: false
    }
);

export default model('Role', RoleSchema);