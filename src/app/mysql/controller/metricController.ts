const db = require('../model/index.ts');
const Metric = db.metric;
const Op = db.sequelize.Op;

// Create metric
exports.create = (req, res) => {
    // Validate request
    if (!req.body.metric_name) {
        res.status(400).send({
            message: 'Metric Name is empty!'
        });
        return;
    }

    // Set metric
    const metric = {
        topics_id: req.body.topics_id,
        topics_alias: req.body.topics_alias,
        id_device: req.body.id_device,
        value: req.body.value
    };

    // Save Metric
    Metric
        .create(metric)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Create metric failure.'
            });
        });
};

// Retrieve all metrics
exports.findByDevice = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { device_id: id } } : null;

    Metric
        .findAll(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all metrics failure.'
            });
        });
};