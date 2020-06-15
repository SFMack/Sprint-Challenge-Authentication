const db = require('../database/dbConfig.js');

module.exports = {
    addUser,
    findUser
}

async function addUser(user) {
    const [id] = await db('users').insert(user, 'id');
}

function findUser(username) {
    return db('users').where(username).orderBy('id');
}