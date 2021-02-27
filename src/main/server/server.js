import mongoose from 'mongoose';
const { DB_HOST, DB_NAME } = process.env;

const MONGO_URI = `mongodb://${DB_HOST}/${DB_NAME}`;

mongoose.connect(MONGO_URI, ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}))

    .then( db => console.log(`DB conected to: ${MONGO_URI}`))
    .catch( err => console.log(err))