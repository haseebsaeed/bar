
const roomService = require("../services/room")

async function getVacantRooms(req, res, next) {

    try {
        const filters = req.query

        const rooms = await roomService.getVacantRooms(filters)

        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }

}


async function reserveRoom(req, res, next) {
    try {
        const { room_id, reservation_date, user_id } = req.body

        const reservation = await roomService.reserve({ room_id, reservation_date, user_id })

        if (reservation) res.status(200).json('Room has been reserved!');
        else res.status(409).json('Room reservation failed!')
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getVacantRooms,
    reserveRoom
};