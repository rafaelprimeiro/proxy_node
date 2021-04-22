const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuration
const PORT = process.env.PORT || '3000';
const API_SERVICE_URL = process.env.API_SERVICE_URL || "https://google.com";
const CHANGE_ORIGIN = process.env.CHANGE_ORIGIN === 'true';

//Debug
// app.use(morgan('dev'));

app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

//  app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
//  });

 app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: CHANGE_ORIGIN,
 }));

 app.listen(PORT, () => {
    console.log(`Starting Proxy at port ${PORT}`);
 });