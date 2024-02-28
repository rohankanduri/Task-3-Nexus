const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/MediEase/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CertificateSchema = new Schema({
    title: String,
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});



module.exports = mongoose.model('Certificate', CertificateSchema);