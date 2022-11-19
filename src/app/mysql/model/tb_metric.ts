module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Metric = sequelizeConfig.define(
        'tb_metric',
        {
            updatedAt: false,
            topics_id: {
                type: Sequelize.STRING
            },
            topics_alias: {
                type: Sequelize.STRING
            },
            id_device: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.STRING
            },
        }
    );

    return Metric;
};