const server = require('../src/server');
const supertest = require('supertest');
const expect = require("chai").expect;

const requestWithSupertest = supertest(server);
const models = require("../src/models");

describe('Health check', () => {

    it('GET /api/status should return 200', async () => {
        const res = await requestWithSupertest.get(`/api/status`);
        expect(res.status).equal(200);
    });

});

describe('Room Endpoints', () => {
    const date = '2022-05-12'

    before(async () => {
        await models.sequelize.sync()
        await models.Room.bulkCreate([
            { id: 1, name: 'Room A' },
            { id: 2, name: 'Room B' },
        ], { ignoreDuplicates: true })
        return models.User.bulkCreate([
            { id: 1, name: 'Daenerys Targaryen' },
            { id: 2, name: 'Jon Snow' },
        ], { ignoreDuplicates: true })
    });

    //deleting room 1 and 2 reservations for a particular date if already exist
    beforeEach(() => {
        return models.Room_Occupancy.destroy({ where: { room_id: [1, 2], date_occupied: date } })
    })

    describe('Vacancy - /room/vacant', () => {
        it('GET /room/vacant should return 400 if `date` is not provided in the query', async () => {
            const res = await requestWithSupertest.get(`/api/room/vacant`);
            expect(res.status).equal(400);
        });

        it('GET /room/vacant should show all vacant rooms', async () => {
            const res = await requestWithSupertest.get(`/api/room/vacant?date=${date}`);
            expect(res.status).equal(200);
            expect(res.body).to.be.an('array')
        });

        it('GET /room/vacant should not list the room as vacant after it has been reserved', async () => {
            const room_id = 1
            await requestWithSupertest.post('/api/room/reserve').send({
                reservation_date: date,
                room_id,
                user_id: 1
            });
            const res = await requestWithSupertest.get(`/api/room/vacant?date=${date}`);
            expect(res.body).to.not.deep.include({ id: 1, name: 'Room A' })
        });

    })

    describe('Reservation - /room/reserve', () => {

        it('Post /room/reserve should return with status code 400 if reservation_date is not provided', async () => {
            const res = await requestWithSupertest.post('/api/room/reserve').send({
                room_id: 1,
                user_id: 1
            });
            expect(res.status).equal(400);
        });

        it('Post /room/reserve should return with status code 400 if room_id is not provided', async () => {
            const res = await requestWithSupertest.post('/api/room/reserve').send({
                reservation_date: date,
                user_id: 1
            });
            expect(res.status).equal(400);
        });

        it('Post /room/reserve should return with status code 400 if user_id is not provided', async () => {
            const res = await requestWithSupertest.post('/api/room/reserve').send({
                reservation_date: date,
                room_id: 1
            });
            expect(res.status).equal(400);
        });

        it('Post /room/reserve should reserve room on the given date', async () => {
            const res = await requestWithSupertest.post('/api/room/reserve').send({
                reservation_date: date,
                room_id: 1,
                user_id: 1
            });
            expect(res.status).equal(200);
        });

        it('Post /room/reserve should return 500 if the room is already reserved on that date', async () => {
            const body = {
                reservation_date: date,
                room_id: 1,
                user_id: 1
            }
            await requestWithSupertest.post('/api/room/reserve').send(body);
            const res = await requestWithSupertest.post('/api/room/reserve').send(body);
            expect(res.status).equal(500);
        });

    })

});