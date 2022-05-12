const server = require('../src/server');
const supertest = require('supertest');
const expect = require("chai").expect;

const requestWithSupertest = supertest(server);

describe('Health check', () => {

    it('GET /api/status should return 200', async () => {
        const res = await requestWithSupertest.get(`/api/status`);
        expect(res.status).equal(200);
    });

});