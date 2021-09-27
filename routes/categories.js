const utils = require('../utils');
const _ = require('lodash');
const {models} = require('../sequelize');
const { Op , cast} = require("sequelize");

module.exports = function (app) {
    //find
    app.get('/categories', [utils.jwtMW], async (req, res) => {
        try {
            const defaultWhere = {
                userId: utils.getUserId(req)
            };
            const requestWhere = JSON.parse(req.query.where || "{}");
            let resultWhere;
            if(req.query.where && req.query.where.indexOf("updatedAt") != -1 && req.query.where.indexOf("$gt") != -1){
                //fetch case, so we need to cast date and use sequelize condition operators
                const dateValue = cast(requestWhere.updatedAt["$gt"],'DATETIME');
                resultWhere = {
                    "_updatedAt":{ [Op.gte]: dateValue}
                };
            } else {
                resultWhere = {
                    ...defaultWhere,
                    ...requestWhere
                };
            }
            const categories = await models.categories.findAll({
                where: resultWhere,
                limit: req.query.limit ? Number(req.query.limit) : 1000
            });
            return res.json(categories);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //get by id
    app.get('/categories/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.categories.findByPk(req.params.id);
            if (!note) {
                return res.status(404).send({error: `Category with id: ${req.params.id} was not found`});
            }
            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //update
    app.put('/categories/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.categories.findByPk(req.params.id);
            if (!note) {
                return res.status(404).send({error: `Category with id: ${req.params.id} was not found`});
            }
            utils.checkUpdatedAt(req.body, note);
            utils.unite(note, req.body);
            note = await note.save();

            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //create
    app.post('/categories', [utils.jwtMW], async (req, res) => {
        try {
            req.body.userId = utils.getUserId(req);
            let note = await models.categories.create(req.body);

            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //delete
    app.delete('/categories/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.categories.destroy({where: {
                _id: req.params.id
            }});
            if (!note) {
                return res.status(404).send({error: `Category with id: ${req.params.id} was not found`});
            }
            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
}
