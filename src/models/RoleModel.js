import pkg from 'mongoose';
const { Schema, model } = pkg;

const RoleSchema = new Schema(
    {
    name: String,
    },
    {
        versionKey: false
    }
);

export default model('Role', RoleSchema);