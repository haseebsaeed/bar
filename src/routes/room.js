const express = require('express');
const router = express.Router();
const { getVacantRooms, reserveRoom } = require('../controllers/room')

router.get('/vacant', getVacantRooms);
router.post('/reserve', reserveRoom);


module.exports = router;