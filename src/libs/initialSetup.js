import Role from '../models/RoleModel.js'

export const createRoles = async () => {

    try {

        const count = await Role.estimatedDocumentCount();

        //Esto lo que hace es decir, al arrancar servidor, si ya hay roles, no lo vuelvas a ejecutar.
        if (count > 0 ) return;

        //Promise.all Arranca todas las funciones a la vez, para ganar rendimiento, en lugar de ejecutar una por una, lo podemos hacer así
        const values = await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'moderator' }).save(),
            new Role({ name: 'admin' }).save()
        ]);

        console.log(values)

    } catch (error) {
        console.log(error)
    }
};