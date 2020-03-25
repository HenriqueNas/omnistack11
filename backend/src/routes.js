const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//session
routes.post('/session', SessionController.create)

//ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//incidents
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

//profile
routes.get('/profile/incidents', ProfileController.index);

module.exports = routes;