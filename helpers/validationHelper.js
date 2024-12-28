const Joi = require('joi');

const addAnakValidation = (data) => {
    const schema = Joi.object({
        nama: Joi.string().required(),
        usia: Joi.number().required(),
        beratBadan: Joi.number().required(),
        tinggiBadan: Joi.number().required(),
        milestone: Joi.array().items(
            Joi.object({
                tipe: Joi.string().required(),
                tanggal: Joi.date().iso().required(),
                keterangan: Joi.string().required(),
            }).required()
        ).required()
    });

    return schema.validate(data);
};

module.exports = {
    addAnakValidation
}