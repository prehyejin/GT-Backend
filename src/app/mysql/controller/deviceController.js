const db = require('../model/index.js');
const Device = db.device;
const Op = db.sequelize.Op;

// Create device
exports.create = (req, res) => {
    // Validate request
    if (!req.body.device_name) {
        res.status(400).send({
            message: 'Device Name is empty!'
        });
        return;
    }

    // Set device
    const device = {
        series_device: 0,
        device_name: req.body.device_name,
        id_group: 1,
        country: req.body.country,
        cumulative_water_amount: 0,
        amount_unit: "ton",
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        connection: 0,
        photo: req.file,
        description: req.body.description
    };

    // Save Device
    Device
        .create(device)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Create device failure.'
            });
        });
};

// Retrieve all devices
exports.findAll = (req, res) => {
    const keyword = req.query.title;
    let condition = { where: {} };

    if (keyword) {
        condition = {
            where : {
                [Op.or]: [
                    {
                        device_name: {
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        country: {
                            [Op.like]: `%${keyword}%`
                        }
                    },
                    {
                        description: {
                            [Op.like]: `%${keyword}%`
                        }
                    }
                ]
            }
        }
    }

    Device
        .findAll(condition)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all devices failure.'
            });
        });
};

// Retrieve device by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Device
        .findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve device failure. (id: ' + id + ')'
            });
        });
};

// Retrieve device by id
exports.findByName = (req, res) => {
    const name = req.params.name;

    let condition = { where: {} };

    if (name) {
        condition = {
            where : {
                device_name: {
                    [Op.like]: `%${name}%`
                }
            }
        };
    }

    Device
        .findAll(condition)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all devices failure.'
            });
        });
};

// Update device by id
exports.update = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { id: id } } : null;

    Device
        .update(
            req.body,
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'Device updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update device. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update device failure. (id: ' + id + ')'
            });
        });
};

// Delete device by id
exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { id: id } } : null;

    Device
        .destroy(condition)
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'Device deleted.'
                });
            } else {
                res.send({
                    message: 'Cannot delete device. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Delete device failure. (id: ' + id + ')'
            });
        });
};




