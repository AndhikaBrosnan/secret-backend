import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }, 
        username: {
            type: String,
            unique: [true, '{VALUES} already exists'],
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 6  
        },
        email: {
            type: String,
            unique: [true, '{VALUES} already exists'],
            required: true,
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            lowercase: true,
            required: true,
            enum: {
                values: ['male', 'female'],
                message: '{VALUES} is not supported'
            }
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;