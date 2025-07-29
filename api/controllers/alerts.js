const Alerts = require('../models/alert');
const AlertsSerializer = require('../serializers/alerts_serializer');
const asyncHandler = require('express-async-handler');

exports.getAll = asyncHandler(async (req, res, next) => {
    const alerts = await Alerts.find({ user_id: req.params.id });

    const serializedAlerts = new AlertsSerializer(alerts);
    serializedAlerts.include('id timestamp title status');

    res.status(200).json({
        alerts: serializedAlerts.getJSON(),
    });
});

exports.get = asyncHandler(async (req, res, next) => {
    const alert = await Alerts.findById(req.params.id);

    const serializedAlert = new AlertsSerializer(alert);
    serializedAlert.include('id timestamp title status');

    res.status(200).json({
        alerts: serializedAlert.getJSON(),
    });
});