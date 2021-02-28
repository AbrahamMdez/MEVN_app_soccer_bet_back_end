import mongoose from 'mongoose'

import UserModel from '../src/models/UserModel.js'

const userData = {
    name: 'name',
    surname: 'surname',
    age: 15,
    email: 'email@email',
    password: 'abcdef',
    role: 'admin'
};

describe('test dbs', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/soccer-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, (err) => {
            if(err) {
                console.log(err);
                process.exit(1);
            }
        })
    })

    it('create and save a user', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.surname).toBe(userData.suage);
        expect(savedUser.age).toBe(userData.age);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.role).toBe(userData.role);
    })
});