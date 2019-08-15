const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String
})

//load it to mongoose
mongoose.model('users', userSchema);