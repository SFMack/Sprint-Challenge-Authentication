const request = require('supertest');

const server = require('./api/server.js');

const Users = require('./auth/auth-model.js');

describe('server.js', () => {

    describe('login route', () => {
        it('should return 404 if not logged in', async () => {
            const expected = 404;

            const response = await request(server).get('/api/auth/login');

            expect(response.status).toEqual(expected);
        })

    })
})