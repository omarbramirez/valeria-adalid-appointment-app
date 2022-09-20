//GOOGLE CALENDAR MODULE 
const googleCalendar = require('./google_calendar_api.js');

var event;
var eventStartTime;
var eventEndTime;

exports.eventValidator = (req, res) => {

  const response = res;

  eventStartTime = new Date(req.body.date + 'T' + req.body.hour);
  eventStartTime.toLocaleTimeString('es-MX');

  // const eventStartTime = new Date();
  // eventStartTime.toLocaleTimeString('es-MX');
  eventEndTime = new Date(req.body.date + 'T' + req.body.hour);
  eventEndTime.toLocaleTimeString('es-MX');
  if (req.body.service === 'Primera Consulta (Evaluación Clínica)') {
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 90);
  } else {
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 40);
  }

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
  googleCalendar.googleCalendarValidator(event, eventStartTime, eventEndTime, response);
};


exports.eventCreator = (req, res) => {

  const response = res;

  eventStartTime = new Date(req.body.date + 'T' + req.body.hour);
  eventStartTime.toLocaleTimeString('es-MX');

  // const eventStartTime = new Date();
  // eventStartTime.toLocaleTimeString('es-MX');
  eventEndTime = new Date(req.body.date + 'T' + req.body.hour);
  eventEndTime.toLocaleTimeString('es-MX');
  if (req.body.service === 'Primera Consulta (Evaluación Clínica)') {
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 90);
  } else {
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 40);
  }

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
  googleCalendar.googleCalendarCreator(event, eventStartTime, eventEndTime, res);
};