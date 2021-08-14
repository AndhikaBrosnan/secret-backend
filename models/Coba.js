const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cobaSchema = new Schema(
    {
        coba: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Coba = mongoose.model('Coba', cobaSchema);

module.exports = Coba;