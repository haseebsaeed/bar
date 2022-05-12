const models = require("../models");

async function getVacantRooms({ date }) {
    return await models.Room.findAll({
        include: [{
            attributes: [],
            model: models.Room_Occupancy,
            required: false,
            where: { date_occupied: date }
        }],
        where: models.sequelize.literal(`\`date_occupied\` IS NULL`)
    })
}

async function reserve({ room_id, reservation_date, user_id }) {
    try {
        return await models.Room_Occupancy.create({
            room_id,
            date_occupied: reservation_date,
            user_id
        })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return false
        }
        throw error
    }
}

module.exports = {
    getVacantRooms,
    reserve
}