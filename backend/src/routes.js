const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

//session
routes.post(
  "/session",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  SessionController.create
);

//ongs
routes.get("/ongs", OngController.index);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string().length(2)
    })
  }),
  OngController.create
);

//incidents
routes.get(
  "/incidents",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      auth: Joi.string().required()
    }).unknown()
  }),
  IncidentController.index
);

routes.post(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.create
);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

//profile
routes.get(
  "/profile/incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      auth: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

module.exports = routes;
