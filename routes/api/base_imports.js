const HttpStatus = require('http-status-codes')

const express = require('express');
const router = express.Router({
    mergeParams: true
});

module.exports = {
    HttpStatus,
    router
}