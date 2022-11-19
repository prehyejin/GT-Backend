const db = require('../model/index.ts');
const Device = db.device;
const Group = db.group;
const Metric = db.metric;
const Topic = db.topic;
const Op = db.sequelize.Op;

// Retrieve all devices
exports.statusAll = (req, res) => {
    let condition = {
        include: [ {
            model: Device
        }] };
    const result = [];

    // Find all
    Group.findAll(condition)
        .then(data => {
            for (const group of data) {
                const devices = group.tb_devices;
                const facilities = [];
                for (const device of devices) {
                    facilities.push(
                        {
                            id: device.id,
                            series_device: device.series_device,
                            name: device.name,
                            description: device.description,
                            location: {
                                lat: device.latitude,
                                lon: device.longitude
                            }
                        }
                    );
                }

                result.push(
                    {
                        id: group.id,
                        series_group: group.series_group,
                        name: group.group_name,
                        description: group.description,
                        facilities: facilities
                    }
                );
            }
            //console.log(result);
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all devices failure.'
            });
        });
};

// Retrieve device by id
exports.statusOne = (req, res) => {
    let condition = {
        include: [ {
            model: Device
        }] };
    const result = [];

    // Find all
    Group.findAll(condition)
        .then(data => {
            for (const group of data) {
                const devices = group.tb_devices;
                const facilities = [];
                for (const device of devices) {
                    facilities.push(
                        {
                            id: device.id,
                            series_device: device.series_device,
                            name: device.name,
                            description: device.description,
                            location: {
                                lat: device.latitude,
                                lon: device.longitude
                            }
                        }
                    );
                }

                result.push(
                    {
                        id: group.id,
                        series_group: group.series_group,
                        name: group.group_name,
                        description: group.description,
                        facilities: facilities
                    }
                );
            }
            //console.log(result);
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all devices failure.'
            });
        });
};
