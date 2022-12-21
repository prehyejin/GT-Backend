module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Group = sequelizeConfig.define(
        'tb_group',
        {
            series_group: {
                type: Sequelize.INTEGER
            },
            group_name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
        }
    );

    return Group;
};