const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
    name: 'theAuthSession',
    secret: 'this shit is secret',
    cookie: {
        maxAge: 1000 * 60 * 60, // one hour
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sessionID',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ apiStatus: `API is running`})
})

module.exports = server;
