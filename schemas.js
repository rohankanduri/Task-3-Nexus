const Joi = require('joi');
const { number } = require('joi');

module.exports.certificateSchema = Joi.object({
    certificate: Joi.object({
        title: Joi.string().required(),

    }).required(),
    deleteImages: Joi.array()
});


