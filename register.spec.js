const request = require('supertest');

const server = require('./api/server.js');

const Users = require('./auth/auth-model.js');
const db = require('./database/dbConfig.js');

describe('server.js', () => {

    describe('register route', () => {
        it('should return 404 if not logged in', async () => {
            const expected = 404;

            const response = await request(server).get('/api/auth/register');

            expect(response.status).toEqual(expected);
        })
    })
})

// describe('users model', () => {
//     describe('addUser()', () => {
//         it('should insert the user into the db', async () => {
//             let newUser = {
//                 username: "christian",
//                 password: "test"
//             }
//             await Users.addUser(newUser);

//             const users = await db('users');

//             console.log(users)
//             expect(users).toHaveLength(2);
            
//         })
//     })
// })