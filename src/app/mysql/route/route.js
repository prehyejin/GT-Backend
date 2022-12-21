const router = require('express').Router();
const deviceController = require('../controller/deviceController.js');
const groupController = require('../controller/groupController.js');
const topicController = require('../controller/topicController.js');
const metricController = require('../controller/metricController.js');
const visualController = require('../controller/visualController.js');

//// DEVICE
// Create device
router.post('/api/v1/device', deviceController.create);

// Retrieve all devices
router.get('/api/v1/device', deviceController.findAll);

// Retrieve device by id
router.get('/api/v1/device/:id', deviceController.findOne);

// Update device by id
router.put('/api/v1/device/:id', deviceController.update);

// Delete device by id
router.delete('/api/v1/device/:id', deviceController.delete);

// Retrieve device by name
router.get('/api/v1/dev_name/:name', deviceController.findByName);

//// GROUP
// Create group
router.post('/api/v1/group', groupController.create);

// Retrieve all groups
router.get('/api/v1/group', groupController.findAll);

// Retrieve group by id
router.get('/api/v1/group/:id', groupController.findOne);

// Update group by id
router.put('/api/v1/group/:id', groupController.update);

// Delete group by id
router.delete('/api/v1/group/:id', groupController.delete);

//// METRIC
// Create metric
router.post('/api/v1/metric', metricController.create);

// Retrieve all metrics by device id
router.get('/api/v1/metric/:id', metricController.findByDevice);

//// TOPIC
// Create topic
router.post('/api/v1/topic', topicController.create);

// Retrieve all topics
router.get('/api/v1/topic', topicController.findAll);

// Update topic by id
router.put('/api/v1/topic/:id', topicController.update);

//// CHART - Visualizations

// Retrieve Status Values
router.get('/api/v1/status', visualController.statusAll);

// Retrieve Status Value by ID
router.get('/api/v1/status/:id', visualController.statusOne);

// Retrieve Chart Data
router.get('/api/v1/chart', visualController.chart);


// Test
router.get('/districts', visualController.statusAll);
router.get('/facilityCardList', visualController.facilityCardList);
router.get('/allAboutFacility', visualController.chart);
router.get('/waterGraph', visualController.waterGraph);

module.exports = router;