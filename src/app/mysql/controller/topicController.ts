const db = require('../model/index.ts');
const Topic = db.topic;
const Op = db.sequelize.Op;

// Create topic
exports.create = (req, res) => {
    // Validate request
    if (!req.body.alias) {
        res.status(400).send({
            message: 'Topic Name is empty!'
        });
        return;
    }

    // Set topic
    const topic = {
        alias: req.body.alias,
        name_kor: req.body.name_kor,
        name_eng: req.body.name_eng,
        unit: req.body.unit,
        interval_sec: req.body.interval_sec
    };

    // Save Topic
    Topic
        .create(topic)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Create topic failure.'
            });
        });
};

// Retrieve all topics
exports.findAll = (req, res) => {
    Topic
        .findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all topics failure.'
            });
        });
};

// Update topic by id
exports.update = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { id: id } } : null;

    Topic
        .update(
            req.body,
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'Topic updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update topic. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update topic failure. (id: ' + id + ')'
            });
        });
};