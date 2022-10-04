//GOOGLE CALENDAR MODULE 
const googleCalendar = require('./google_calendar_api.js');

var event;
var eventStartTime;
var eventEndTime;
var service = {
  service: 'Por definir',
  price: '0'
}

exports.eventValidator = (req, res) => {

  eventStartTime = new Date(req.body.date + 'T' + req.body.hour);
  eventStartTime.toLocaleTimeString('es-MX');

  eventEndTime = new Date(req.body.date + 'T' + req.body.hour);
  eventEndTime.toLocaleTimeString('es-MX');
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 60);

  event = {
    summary: `${req.body.service} con ${req.body.name}`,
    description: `Teléfono: ${req.body.number}` + "\n" + `Comentarios adicionales: ${req.body.comments}`,
    start: {
      dateTime: eventStartTime,
      timeZone: 'America/Mexico_City'
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'America/Mexico_City'
    },
    colorId: 1
  };

  service.service = req.body.service;
  if (req.body.service === 'Consulta - EN LÍNEA') service.price = '550';
  if (req.body.service === 'Consulta - PRESENCIAL') service.price = '600';
  if (req.body.service === 'Test') service.price = '5';

  googleCalendar.googleCalendarValidator(event, eventStartTime, eventEndTime, res, service);
};

exports.eventCreator = (req, res) => {

  eventStartTime = new Date(req.body.date + 'T' + req.body.hour);
  eventStartTime.toLocaleTimeString('es-MX');

  eventEndTime = new Date(req.body.date + 'T' + req.body.hour);
  eventEndTime.toLocaleTimeString('es-MX');
  if (req.body.service === 'Consulta - EN LÍNEA') eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);
  /////////////////////////////////////////////////////////////////////////////////////
  if (req.body.service === '') eventEndTime.setMinutes(eventEndTime.getMinutes() + 150);
  event = {
    summary: `${req.body.service} con ${req.body.name}`,
    description: `Teléfono: ${req.body.number}` + "\n" + `Comentarios adicionales: ${req.body.comments}`,
    start: {
      dateTime: eventStartTime,
      timeZone: 'America/Mexico_City'
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'America/Mexico_City'
    },
    colorId: 1
  };

  googleCalendar.googleCalendarCreator(event, eventStartTime, eventEndTime, res, service);
};
