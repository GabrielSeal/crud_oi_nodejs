// determina qual a rota vai ser usada 
// determina qual operação vai ser usada na rota

const express = require('express');
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');
const { create } = require('./models/AnnotationData');
const PriorityController = require('./controllers/PriorityController');
const ContentController = require('./controllers/ContentController');

// rota annotation
routes.post('/annotations', AnnotationController.create);
routes.get('/annotations', AnnotationController.read);
routes.delete('/annotations/:id',AnnotationController.delete);

// rota prioridade
routes.get('/priorities', PriorityController.read);
routes.put('/priorities/:id', PriorityController.update);

//rota de content
routes.post('/contents/:id', ContentController.updade);

module.exports = routes;


