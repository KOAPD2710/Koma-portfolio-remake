// const express = require('express');
// const Bundler = require('parcel-bundler');
// const path = require('path');

import express from 'express';
import Bundler from 'parcel-bundler';
import path from 'path';

const app = express();
const bundler = new Bundler('src/index.html', {});

app.use((req, res, next) => {
    if (req.path.endsWith('/') || req.path === '/') {
        return next();
    }

    const filePath = path.join(__dirname, 'dist', req.path + '.html');
    if (path.extname(req.path) === '') {
        req.url = req.url + '.html';
    }

    next();
});

app.use(bundler.middleware());

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});