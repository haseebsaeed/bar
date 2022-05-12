require("./init")
const express = require('express');
const room = require('./routes/room')
const logger = require('./logger')
const errorsMiddlware = require('./middlewares/error')

/** Creating express app. */
const app = express();

app.use(express.json());

/** Endpoint to check status of the service. */
app.get('/api/status', async (req, res) => res.status(200).json({ message: "Book a room service is up and running." }));

app.use('/api/room', room)

/** Error handler middleware */
app.use(errorsMiddlware);

PORT = process.env.PORT || 80
app.listen(PORT, () => logger.info(`Listening at port ${PORT}`));

module.exports = app;