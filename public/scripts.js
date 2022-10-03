//FORM VALIDATORS
const pickerDate = document.getElementById('date');
const popupBackground = document.querySelector('#popup');
const close_btn = document.querySelector('.popup_icon');
const popup_box = document.querySelector('.popup_box');
const popup_msg = document.querySelector('.popup_msg');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');
const hours = document.getElementsByClassName('hour');
const hourSelector = document.getElementById('');


function popupActivation() {
    popupBackground.classList.toggle('active');
    if (popupBackground.classList.contains('active')) {
        setTimeout(function () {
            if (popupBackground.classList.contains('active')) {
                popupBackground.classList.toggle('active');
            }
        }, 4200);
    };
};

//SUNDAY BANNING FUNCTION
pickerDate.addEventListener('input', function (e) {
    e.preventDefault();
    const day = new Date(this.value).getUTCDay();
    if (!day) {
        popupActivation();
        msg1.innerHTML = 'Los días domingos';
        msg2.innerHTML = 'no están disponibles actualmente.';
    }
});

// SATURDAY ACTIVE HOURS CUSTOMIZING FUNCTION 

const unavailableHours = ["16:00:00", "17:00:00", "18:00:00", "19:00:00"]

pickerDate.addEventListener('input', function (e) {

    e.preventDefault();
    const day = new Date(this.value).getUTCDay();

    if (day === 6) {
        popupActivation();
        msg1.innerHTML = 'Los días sábados tienen únicamente estos horarios:';
        msg2.innerHTML = '11:00 AM a 3:00 PM';
        console.log(hours);
        let n = 5;
        unavailableHours.map(hour => {
            const currentHour = hours[n];
            if (hour === currentHour.value) {
                currentHour.style.display = "none";
                n += 1;
            }
        })
    } else {
        for (let i = 0; i < hours.length; i++) {
            const currentHour = hours[i];
            currentHour.style.display = "block";
        }
    }

});



close_btn.addEventListener('click', function (e) {
    e.preventDefault();
    popupBackground.classList.toggle('active');
});


// CALLBACK FUNCTION TO HANDLE RECAPTCHA TOKEN

// const form = document.querySelector('#appointment_form');
// const summmit_btn = document.querySelector('#send');
// summmit_btn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const service = document.querySelector('#service').value;
//     const date = document.querySelector('#date').value;
//     const hour = document.querySelector('#hour').value;
//     const name = document.querySelector('#name').value;
//     const email = document.querySelector('#email').value;
//     const number = document.querySelector('#number').value;
//     const comments = document.querySelector('#comments').value;

//     grecaptcha.ready(function () {
//         const captcha = grecaptcha.execute('6LdZNn0hAAAAAC4H5KGSRN3TGRov_E3CatMY89OO', { action: 'submit' }).then(function (token) {
//             return token;
//         });
//         fetch('/agenda-tu-consulta', {
//             method: 'POST',
//             // mode: "no-cors",
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json'

//             },
//             body: JSON.stringify({
//                 captcha,
//                 service,
//                 date,
//                 hour,
//                 name,
//                 email,
//                 number,
//                 comments
//             })
//         })
//     });
// });