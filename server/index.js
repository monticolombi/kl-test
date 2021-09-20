require('dotenv').config();

const express = require('express')
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const server = express();
const app = next({ dev });
const handle = app.getRequestHandler();
const HOST = '::'

try {
    app.prepare();

    server.get('/', async (req, res) => {
        app.render(req, res, '/');
    });

    server.all('*', (req, res) => handle(req, res));

    server.listen(3000, HOST, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${HOST}:3000`);
    });
} catch (err) {
    console.log('App failed to load');
}