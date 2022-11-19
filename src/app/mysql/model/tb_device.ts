module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Device = sequelizeConfig.define(
        'tb_device',
        {
            series_device: {
                type: Sequelize.INTEGER
            },
            id_group: {
                type: Sequelize.INTEGER
            },
            device_name: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            cumulative_water_amount: {
                type: Sequelize.FLOAT
            },
            amount_unit: {
                type: Sequelize.STRING
            },
            latitude: {
                type: Sequelize.FLOAT
            },
            longitude: {
                type: Sequelize.FLOAT
            },
            connection: {
                type: Sequelize.INTEGER
            },
            photo: {
                type: Sequelize.BLOB("long"),
            },
            description: {
                type: Sequelize.STRING
            },
        }
    );

    return Device;
};