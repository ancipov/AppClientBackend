'use strict';
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const secret = process.env.JWT_SECRET || 'keyboard cat 4 ever'
const expiresIn = process.env.JWT_EXPIRES_IN || 129600000;

let utils = {
    DB: {
        port: process.env.DB_PORT || 1434,
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD || 'tiggzi_pwd#TDCAKFVAcscam34234',
        server: process.env.DB_HOST || 'localhost',
        database: process.env.DB_DATABASE || 'app_client_test_demo'
    },

    secret: secret,
    expiresIn: expiresIn,

    jwtMW: exjwt({
        secret: secret,
        algorithms: ['HS256']
    }),

    getToken: function (id) {
        return jwt.sign(
            {id: id},
            secret,
            {algorithm: "HS256", expiresIn: expiresIn}
        );
    },
    getUserId: function (req) {
        if (!req || !req.headers || !req.headers.authorization || req.headers.authorization.length < 18) {
            return '--';
        }
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        return jwt.verify(token[1], secret).id;
    },
    unite(source, obj) {
        for (let property in obj) {
            if (!obj.hasOwnProperty(property)) continue;
            source[property] = obj[property];
        }
    },
    returnError(res, req, e) {
        console.log(e);
        return res.status(400).send({message: 'error'});
    },
    checkUpdatedAt(obj1, obj2) {
        if(obj1["updatedAt"] && obj1["updatedAt"] !== obj2["updatedAt"].toISOString()){
            throw new Error("updatedAt is outdated");
        }
    }
}

module.exports =
    Object.freeze(utils);
