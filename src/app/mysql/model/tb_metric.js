module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Metric = sequelizeConfig.define(
        'tb_metric',
        {
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
        },
        {
            updatedAt: false
        }
    );

    return Metric;
};