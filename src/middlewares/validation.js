const Joi = require('joi')
.extend(require('@joi/date'));


function getVacantRoomsValidation(req, res, next) {

    const schema = Joi.object({
        date: Joi.date().format("YYYY-MM-DD").raw().required()
    });

    const { error } = schema.validate(req.query)

    if (error) res.status(400).json(error.message)
    else next()
}

function reservationValidation(req, res, next) {

    const schema = Joi.object({
        reservation_date: Joi.date().required(),
        room_id: Joi.number().required(),
        user_id: Joi.number().required()
    });

    const { error } = schema.validate(req.body)

    if (error) res.status(400).json(error.message)
    else next()
}

module.exports = {
    getVacantRoomsValidation,
    reservationValidation
}