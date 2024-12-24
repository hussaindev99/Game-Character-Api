const mongoose = require('mongoose');
userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true, // To remove any surrounding white spaces
      },
     
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // To ensure email is unique
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Regex to validate email
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
},
})

module.exports = mongoose.model('user',userSchema)