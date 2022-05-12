const express = require('express');
const router = express.Router();
const { getVacantRooms, reserveRoom } = require('../controllers/room')
const { getVacantRoomsValidation, reservationValidation } = require('../middlewares/validation')

router.get('/vacant', getVacantRoomsValidation, getVacantRooms);
router.post('/reserve', reservationValidation, reserveRoom);


module.exports = router;