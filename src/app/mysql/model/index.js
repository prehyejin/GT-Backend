const dbConfig = require('../config/config.js');
const Sequelize = require('sequelize');

const sequelizeConfig = new Sequelize(
    dbConfig.db,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

var db = {
    sequelize: undefined,
    sequelizeConfig: undefined,
    device: undefined,
    group: undefined,
    metric: undefined,
    topic: undefined
};
db.sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;
db.device = require('./tb_device.js')(sequelizeConfig, Sequelize);
db.group = require('./tb_group.js')(sequelizeConfig, Sequelize);
db.metric = require('./tb_metric.js')(sequelizeConfig, Sequelize);
db.topic = require('./tb_topic.js')(sequelizeConfig, Sequelize);

db.group.hasMany(db.device, { foreignKey: "id_group" });
db.device.hasMany(db.metric, { foreignKey: "id_device" });
//db.topic.hasMany(db.metric, { foreignKey: ["topic_id", "topic_alias"] })

module.exports = db;