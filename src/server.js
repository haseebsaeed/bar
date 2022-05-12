require("./init")
const express = require('express');

/** Creating express app. */
const app = express();

app.use(express.json());

/** Endpoint to check status of the service. */
app.get('/api/status', async (req, res) => res.status(200).json({ message: "Book a room service is up and running." }));

PORT = process.env.PORT || 80
app.listen(PORT, () => console.info(`Listening at port ${PORT}`));

module.exports = app;