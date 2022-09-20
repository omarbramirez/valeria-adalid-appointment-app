//APP PACKAGES
const express = require('express');//
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request');

// LOCALSTORAGE PACK USAGE
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
};

//APP PACKAGES
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//SECURITY PACKAGES
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const sanitizer = require('express-sanitizer');

//SECURITY METHODS
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Llegaste al límite de interacciones disponibles. Por favor inténtalo más tarde.'
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(sanitizer());
app.use(xss());

// GOOGLECALENDAR MODULE REQUEST
const googleCalendar = require('./modules/google_calendar_api.js');
// EVENTCREATOR MODULE REQUEST
const eventCreator = require('./modules/event.js');
// PAYMENT MODULE REQUEST
const payment = require('./modules/payment.js');


app.get('/', (req, res, next) => {

  res.status(200).json({
    status: 'success',
    data: {
      name: 'name of your app',
      version: '0.1.0'
    }
  });

});


app.get('/agenda-tu-consulta', (req, res) => {

  res.render('app', {
    activator: ' ',
    msg1: 'Los días domingos',
    msg2: 'no están disponibles actualmente.'
  });
});

app.post('/agenda-tu-consulta',
  (request, response) => {
    const replacerFunc = () => {
      const visited = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (visited.has(value)) {
            return;
          }
          visited.add(value);
        }
        return value;
      };
    };
    localStorage.setItem("formData", JSON.stringify(request, replacerFunc()));
    eventCreator.eventValidator(request, response);
  });


//PAYMENT VARIABLES
const CLIENT = process.env.PAYMENT_ID;
const SECRET = process.env.PAYMENT_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET }

app.get('/success', (req, res) => {
  const token = req.query.token; //<-----------
  request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
    auth,
    body: {},
    json: true
  }, (err, response) => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    eventCreator.eventCreator(formData, res);
  })
});


// app.get('/success', (req, res) => googleCalendar.executePayment(req, res));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});