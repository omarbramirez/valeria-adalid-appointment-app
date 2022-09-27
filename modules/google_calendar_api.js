//DEPENDENCIES
// const googleAuth = require('google-auth-library');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const dotenv = require('dotenv');
// const ejs = requrie('ejs');

//MODULES IN USE
const eventCreator = require('./event.js');

// PAYMENT MODULE REQUEST
const payment = require('./payment.js');

// LOCALSTORAGE PACK USAGE
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
};

//GOOGLE CALENDAR API VARIABLES
dotenv.config({ path: './config.env' });
const calendarID = process.env.CALENDAR_ID;
const oAuth2ClientToken = process.env.OAUTH2_REFRESH_TOKEN;
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

//GOOGLE CALENDAR API SET-UP
const oAuth2Client = new OAuth2(clientID, clientSecret);

oAuth2Client.setCredentials({
  refresh_token: oAuth2ClientToken
});

const calendar = google.calendar({
  version: 'v3', auth: oAuth2Client
});

var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// IMPORT DATA TO GOOGLE CALENDAR
exports.googleCalendarValidator = (event, startTime, endTime, response) => {

  calendar.freebusy.query(
    {
      resource:
      {
        timeMin: startTime,
        timeMax: endTime,
        timeZone: 'America/Mexico_City',
        items: [{ id: calendarID }]
      }
    },
    (err, res) => {
      if (err) {
        //LOCALSTORAGE RESET
        localStorage.clear();
        response.render('app', {
          activator: 'active',
          msg1: 'Tus datos son inválidos.',
          msg2: 'Inténtalo de nuevo.'
        });
        return console.error('Free Busy Error:'/*, err*/);
      };
      const eventsArr = res.data.calendars[calendarID].busy;

      ////////////////////////////////////////////////////////////////////////////////
      //PAYMENT PACKAGES
      const express = require('express');
      const cors = require('cors');
      const request = require('request');

      //PAYMENT MODULES
      const app = express();
      app.use(express.urlencoded({ extended: true }))
      app.use(cors())

      //PAYMENT VARIABLES
      const CLIENT = process.env.PAYMENT_ID;
      const SECRET = process.env.PAYMENT_SECRET;
      const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

      const auth = { user: CLIENT, pass: SECRET }


      const createPayment = (res) => {

        const body = {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: 'MXN', //https://developer.paypal.com/docs/api/reference/currency-codes/
              value: '2000'
            }
          }],
          application_context: {
            brand_name: `Nutriologadalid.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago

            return_url: `http://localhost:3000/success`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/` // Url despues de realizar el pago

            // return_url: `https://valeria-adalid-appointment-app.herokuapp.com/success`, // Url despues de realizar el pago
            // cancel_url: `https://valeria-adalid-appointment-app.herokuapp.com/cancel-payment` // Url despues de realizar el pago
          }
        }
        //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

        request.post(`${PAYPAL_API}/v2/checkout/orders`, {
          auth,
          body,
          json: true
        }, (err, response) => {
          // res.json({ data: response.body })
          res.redirect(response.body.links[1].href);
        })
      }
      if (eventsArr.length === 0) createPayment(response)
      else {
        //LOCALSTORAGE RESET
        localStorage.clear();
        return response.render('app', {
          activator: 'active',
          msg1: 'El horario elegido ya está ocupado.',
          msg2: 'Inténtalo de nuevo.'
        });
      };
    }
  )
};



exports.googleCalendarCreator = (event, startTime, endTime, response) => {
  calendar.freebusy.query(
    {
      resource:
      {
        timeMin: startTime,
        timeMax: endTime,
        timeZone: 'America/Mexico_City',
        items: [{ id: calendarID }]
      }
    },
    (err, res) => {
      const eventsArr = res.data.calendars[calendarID].busy;
      if (eventsArr.length === 0) return calendar.events.insert({ calendarId: calendarID, resource: event },
        err => {
          if (err) return console.error('Calendar event creating error:', err);
          const formData = JSON.parse(localStorage.getItem("formData"));
          // console.log(formData);
          const currentDay = days[startTime.getDay()];
          const currentMonth = months[startTime.getMonth()];
          const currentHour = startTime.getHours();
          const currentDate = startTime.getDate();
          //LOCALSTORAGE RESET
          localStorage.clear();
          return response.render('success', {
            activator: 'active',
            msg1: `¡Pago exitoso!`,
            msg2: `Tu cita el día ${currentDay} ${currentDate} de ${currentMonth} a las ${currentHour}:00hrs ha sido agendada.`
          });
        });
    }
  )
};