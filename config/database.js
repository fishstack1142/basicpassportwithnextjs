const mongoose = require('mongoose');

require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env

const conn = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@graphql-basic.pmnob.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    raw: String,
    admin: Boolean
});


const User = connection.model('User', UserSchema);

module.exports = connection;