/**
 * Define schema for "collAuth" table
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    password: String
}, { collection: 'collAuth' });

let User = mongoose.model('User', userSchema);

module.exports = User;