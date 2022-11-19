module.exports = {
    host: 'ict.gatc.co.kr',
    username: 'glory',
    password: 'glory2017!',
    db: 'glory_tech',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};