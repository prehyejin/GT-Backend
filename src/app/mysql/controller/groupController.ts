const db = require('../model/index.ts');
const Group = db.group;
const Op = db.sequelize.Op;

// Create group
exports.create = (req, res) => {
    // Validate request
    if (!req.body.group_name) {
        res.status(400).send({
            message: 'Group Name is empty!'
        });
        return;
    }

    // Set group
    const group = {
        series_group: 0,
        group_name: req.body.group_name,
        description: req.body.description
    };

    // Save Group
    Group
        .create(group)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Create group failure.'
            });
        });
};

// Retrieve all groups
exports.findAll = (req, res) => {
    const keyword = req.query.title;
    let condition = { where: {} };

    if (keyword) {
        condition = {
            where : {
                [Op.or]: [
                    {
                        group_name: {
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
    };

    Group
        .findAll(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all groups failure.'
            });
        });
};

// Retrieve group by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Group
        .findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve group failure. (id: ' + id + ')'
            });
        });
};

// Update group by id
exports.update = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { id: id } } : null;

    Group
        .update(
            req.body,
            condition
        )
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'Group updated.'
                });
            } else {
                res.send({
                    message: 'Cannot update group. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Update group failure. (id: ' + id + ')'
            });
        });
};

// Delete group by id
exports.delete = (req, res) => {
    const id = req.params.id;
    const condition = id ? { where: { id: id } } : null;

    Group
        .destroy(condition)
        .then(resultCount => {
            if (resultCount == 1) {
                res.send({
                    message: 'Group deleted.'
                });
            } else {
                res.send({
                    message: 'Cannot delete group. (id: ' + id + ')'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Delete group failure. (id: ' + id + ')'
            });
        });
};