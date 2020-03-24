const routes = require('express').Router();
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

// ONG Routes
routes.get('/ongs', ongController.findAll);
routes.post('/ongs', ongController.create);
// Profile Routes
routes.get('/profile', profileController.findAll);
// Session Routes
routes.post('/sessions', sessionController.create);
// Incident Routes
routes.get('/incidents', incidentController.findAll);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;