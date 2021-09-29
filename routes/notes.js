const utils = require('../utils');
const _ = require('lodash');
const {models} = require('../sequelize');

module.exports = function (app) {
    //find
    app.get('/notes', [utils.jwtMW], async (req, res) => {
        try {
            const notes = await models.notes.findAll({
                where: {
                    ...JSON.parse(req.query.where || "{}")
                },
                limit: req.query.limit ? Number(req.query.limit) : 1000
            });
            return res.json(notes);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //get by id
    app.get('/notes/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.notes.findByPk(req.params.id);
            if (!note) {
                return res.status(404).send({error: `Note with id: ${req.params.id} was not found`});
            }
            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //update
    app.put('/notes/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.notes.findByPk(req.params.id);
            if (!note) {
                return res.status(404).send({error: `Note with id: ${req.params.id} was not found`});
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
    app.post('/notes', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.notes.create(req.body);

            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });
    //delete
    app.delete('/notes/:id', [utils.jwtMW], async (req, res) => {
        try {
            let note = await models.notes.destroy({where: {
                _id: req.params.id
            }});
            if (!note) {
                return res.status(404).send({error: `Note with id: ${req.params.id} was not found`});
            }
            return res.json(note);
        } catch (e) {
            return utils.returnError(res, req, e);
        }
    });

}
