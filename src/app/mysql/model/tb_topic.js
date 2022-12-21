module.exports = (sequelizeConfig, Sequelize) => {
    // Set Model
    const Topic = sequelizeConfig.define(
        'tb_topic',
        {
            timestamps: false,
            alias: {
                type: Sequelize.STRING
            },
            name_kor: {
                type: Sequelize.STRING
            },
            name_eng: {
                type: Sequelize.STRING
            },
            unit: {
                type: Sequelize.STRING
            },
            interval_sec: {
                type: Sequelize.INTEGER
            }
        }
    );

    return Topic;
};