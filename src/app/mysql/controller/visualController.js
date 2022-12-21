const db = require('../model/index.js');
const Device = db.device;
const Group = db.group;
const Metric = db.metric;
const Topic = db.topic;
const Op = db.sequelize.Op;

const FACILITY_CARD_LIST = [
    { id: 1, name: "Kesra", imgSrc: 43, }, 
    { id: 2, name: "Tegharia", imgSrc: 44, }, 
    { id: 3, name: "potepur", imgSrc: 45, }, 
    { id: 4, name: "Kesra", imgSrc: 43,},
    { id: 5, name: "Tegharia", imgSrc: 44,},
    { id: 6, name: "potepur", imgSrc: 45,}
];
const WATER_GRAPH_DATA = [
    { x: 0, y: 0, },
    { x: 2, y: 0, },
    { x: 4, y: 0, },
    { x: 6, y: 1, },
    { x: 8, y: 2, },
    { x: 10, y: 4, },
    { x: 12, y: 6, },
    { x: 14, y: 8, },
    { x: 16, y: 11, },
    { x: 18, y: 12, },
    { x: 20, y: 13, },
    { x: 22, y: 15, },
    { x: 24, y: 18, },
];

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
                            name: device.device_name,
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

exports.facilityCardList = (req, res) => {
    console.log("facilityCardList");
    res.json(FACILITY_CARD_LIST);
};


exports.waterGraph = (req, res) => {
    console.log("waterGraph");
    res.json({
        timeunit: "hour",
        time: "2022-11-19",
        data: WATER_GRAPH_DATA,
    });
};

// Retrieve device by id
exports.statusOne = (req, res) => {
    const dev_id = req.params.id;
    let condition = {
        where: {
            id: dev_id
        },
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
                            name: device.device_name,
                            description: device.description,
                            location: {
                                // lat: device.latitude,
                                // lon: device.longitude
                                lat: 11,
                                lon: 11
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
exports.chart = (req, res) => {
    if (!req.query.facilityId) {
        req.query.facilityId = 1;
    }
    if(!req.query.timeunit) {
        req.query.timeunit = "hour";
    }
    if(!req.query.time) {
        req.query.time = new Date().toISOString().slice(0, 10);
    }

    const facilityId = req.query.facilityId;
    const timeunit = req.query.timeunit;
    const timeString = req.query.time;

    //console.log(facilityId);
    //console.log(timeunit);
    //console.log(timeString);

    var result = {};

    Device.findByPk(facilityId)
        .then(data => {
            //console.log(data);
            result = {
                districtId: data.id_group,
                facilityId: data.id,
                facilityName: data.device_name,
                connection: !!data.connection,
                location: {
                    lat: data.latitude,
                    lon: data.longitude,
                }
            }

            return data;
        })
        .then(data => {
            console.log('divice id', data.id);
            let condition = {
                where: {
                    id_device: data.id
                },
                order: [['createdAt', 'DESC']],
            };

            var findFlag = {
                flow_treated: 0,
                flow_concentrated: 0,
                lvlsw_raw: 0,
                lvlsw_drink: 0,
                pump_ro: 0,
                pump_feed: 0,
                ph_treated: 0,
                cd_treated: 0
            }, flagCount = 0;

            Metric.findAll(condition)
                .then(metrics => {
                    for (const metric of metrics) {
                        //console.log(metric);
                        console.log(metric.topics_alias);
                        console.log('find metric', metric);
                        switch (metric.topics_alias) {
                            case "FLOW_TREATED":
                                if (findFlag["flow_treated"] == 0) {
                                    result["treatedFlowRate"] = metric.value;
                                    findFlag["flow_treated"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "FLOW_CONCENTRATED":
                                if (findFlag["flow_concentrated"] == 0) {
                                    result["concentratedFlowRate"] = metric.value;
                                    findFlag["flow_concentrated"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "LVLSW_RAW":
                                if (findFlag["lvlsw_raw"] == 0) {
                                    result["rawLevelSwitch"] = !!metric.value;
                                    findFlag["lvlsw_raw"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "LVLSW_DRINK":
                                if (findFlag["lvlsw_drink"] == 0) {
                                    result["drinkLevelSwitch"] = !!metric.value;
                                    findFlag["lvlsw_drink"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "PUMP_RO":
                                if (findFlag["pump_ro"] == 0) {
                                    result["roPump"] = !!metric.value;
                                    findFlag["pump_ro"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "PUMP_FEED":
                                if (findFlag["pump_feed"] == 0) {
                                    result["feedPump"] = !!metric.value;
                                    findFlag["pump_feed"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "PH_TREATED":
                                if (findFlag["ph_treated"] == 0) {
                                    result["treatedWaterPH"] = metric.value;
                                    findFlag["ph_treated"] = 1;
                                    flagCount++;
                                }
                                break;
                            case "CD_TREATED":
                                if (findFlag["cd_treated"] == 0) {
                                    result["treatedWaterConductivity"] = metric.value;
                                    findFlag["cd_treated"] = 1;
                                    flagCount++;
                                }
                                break;
                        }
                        if (flagCount == 8) break;
                    }
                    //res.send(result);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Retrieve all devices failure.'
                    });
                    return;
                });

            return data;
        })
        .then(data => {
            let minTime, maxTime;
            const year_month_day = timeString.split("-");
            //console.log(timeString);
            if (timeunit == "hour") {
                // time: "2022-12-01"
                maxTime = new Date(Number(year_month_day[0]), Number(year_month_day[1]) - 1, Number(year_month_day[2]) + 1, 0);
                minTime = new Date(Number(year_month_day[0]), Number(year_month_day[1]) - 1, Number(year_month_day[2]), 0);
            } else if (timeunit == "day") {
                // time: "2022-12"
                maxTime = new Date(Number(year_month_day[0]), Number(year_month_day[1]), 1);
                minTime = new Date(Number(year_month_day[0]), Number(year_month_day[1]) - 1, 1);
            } else if (timeunit == "month") {
                // time: "2022"
                maxTime = new Date(Number(year_month_day) + 1,0);
                minTime = new Date(Number(year_month_day),0);
            }

            console.log("Search minTime: " + minTime.toString());
            console.log("Search maxTime: " + maxTime.toString());

            //console.log(data);

            let condition_chart = {
                where: {
                    id_device: data.id,
                    topics_alias: "FLOW_TREATED",
                    createdAt: {
                        [Op.lt]: maxTime,
                        [Op.gt]: minTime
                    }
                },
                order: [[ 'createdAt', 'DESC' ]],
            };

            Metric.findAll(condition_chart)
                .then(metrics => {
                    //console.log(metrics);

                    const coord_list = [];

                    // Calculating the Average by timeunit
                    if (timeunit == "hour") {
                        for (let hr = 0; hr < 24; hr++) {
                            let sum_value = 0, cnt = 0;
                            for (const metric of metrics) {
                                if (hr == new Date(metric.createdAt).getHours()) {
                                    sum_value += metric.value;
                                    cnt++;
                                }
                            }
                            if (cnt != 0) {
                                coord_list.push({
                                    x: hr,
                                    y: sum_value / cnt
                                });
                            }
                        }
                    } else if (timeunit == "day") {
                        const daysInMonth = new Date(Number(year_month_day[0]), Number(year_month_day[1]) - 1, 0).getDate();
                        for (let day = 1; day < daysInMonth; day++) {
                            let sum_value = 0, cnt = 0;
                            for (const metric of metrics) {
                                if (day == new Date(metric.createdAt).getDay()) {
                                    sum_value += metric.value;
                                    cnt++;
                                }
                            }
                            if (cnt != 0) {
                                coord_list.push({
                                    x: day,
                                    y: sum_value / cnt
                                });
                            }
                        }
                    } else if (timeunit == "month") {
                        for (let month = 0; month < 12; month++) {
                            let sum_value = 0, cnt = 0;
                            for (const metric of metrics) {
                                if (month == new Date(metric.createdAt).getMonth()) {
                                    sum_value += metric.value;
                                    cnt++;
                                }
                            }
                            if (cnt != 0) {
                                coord_list.push({
                                    x: month,
                                    y: sum_value / cnt
                                });
                            }
                        }
                    }

                    //console.log(coord_list);

                    result['waterGraphData'] = {
                        timeunit: timeunit,
                        time: timeString,
                        data: coord_list
                    };
                    console.log(result);
                    res.send(result);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Retrieve all devices failure.'
                    });
                    return;
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Retrieve all devices failure.'
            });
            return;
        });
};