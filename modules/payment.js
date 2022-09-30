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
// const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com
const PAYPAL_API = 'https://api-m.paypal.com';

const auth = { user: CLIENT, pass: SECRET }


exports.createPayment = (req, res) => {

    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'MXN', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: '10'
            },
            description: 'Test'
        }],
        application_context: {
            brand_name: `Nutriologadalid.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            // return_url: `http://localhost:3000/success`, // Url despues de realizar el pago
            // cancel_url: `http://localhost:3000/cancel-paymen` // Url despues de realizar el pago

            return_url: `https://valeria-adalid-appointment-app.herokuapp.com/success`, // Url despues de realizar el pago
            cancel_url: `https://valeria-adalid-appointment-app.herokuapp.com/` // Url despues de realizar el pago
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
};

const executePayment = (req, res) => {
    const token = req.query.token; //<-----------

    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        console.log(response.body);
        res.render('app', {
            activator: 'active',
            msg1: '¡Pago exitoso!',
            msg2: 'Tu cita ha sido agendada.'
        });
    })
};
