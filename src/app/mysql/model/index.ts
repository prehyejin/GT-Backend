const dbConfig = require('../config/config.ts');
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
db.device = require('./tb_device.ts')(sequelizeConfig, Sequelize);
db.group = require('./tb_group.ts')(sequelizeConfig, Sequelize);
db.metric = require('./tb_metric.ts')(sequelizeConfig, Sequelize);
db.topic = require('./tb_topic.ts')(sequelizeConfig, Sequelize);

db.group.hasMany(db.device, { foreignKey: "id_group" });

module.exports = db;