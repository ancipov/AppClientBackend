const utils = require('../utils');
const _ = require('lodash');
const {models} = require('../sequelize');

module.exports = function (app) {
    app.post('/entities', [utils.jwtMW], async (req, res) => {
        try {
            return res.json([]);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });

}
