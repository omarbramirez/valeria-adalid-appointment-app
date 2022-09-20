{
  service: 'seguimiento XD',
  date: '2022-07-21',
  hour: '19:00:00',
  name: 'Omar Ramírez',
  email: 'omar.ramirez94@hotmail.es',
  comments: 'Este es un comentario papá',
  send: 'Enviar'
}

<%- include("partials/header"); -%>
    <h1>Home</h1>
    <p> <%= startingContent %> </p>


  <%  posts.forEach(function(post){ %>

    <h1><%=post.title%></h1>
    <p>
    <%=post.content.substring(0, 100) + " ..."%>
    <a href="/posts/<%=post.title%>">Read More</a>
    </p>


    <% }) %>


<%- include("partials/footer"); -%>


class = st-bg

///////////////////////////


```
<div id="invalid_sunday" class="popup_box">
                            
                            <span class="popup_wrap">
                                <p class="popup_icon">X</p>
                            </span>
                            
                            <p class="popup_msg">Lo siento. <br> Los días domingos no están disponibles.</p>
                            
                        </div>


<div id="invalid_data" class="popup_box">
                            
                            <span class="popup_wrap">
                                <p class="popup_icon">X</p>
                            </span>
                            
                            <p class="popup_msg">La fecha que elegiste ya está ocupada.</p>
                            
                        </div>
                        
                        <div id="invalid_data" class="popup_box">
                            
                            <span class="popup_wrap">
                                <p class="popup_icon">X</p>
                            </span>
                            
                            <p class="popup_msg">La hora que elegiste ya está ocupada.</p>
                            
                        </div>


```

GOOGLE RECAPTCHA CUSTOMIZED LOGIC

```
// async function getData(req) {
//   try {
//     if (!req.body.captcha) {
//       console.log("err");
//       // return res.json({ "success": false, "msg": "Capctha is not checked" });
//     };
//     ///////////////////////////
//     const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

//     const body = await fetch(verifyUrl).then(res => res.json());

//     if (!body.success && body.success === undefined) {
//       console.log('x1');
//       return false
//       // return res.json({ "success": false, "msg": "captcha verification failed" });
//     }
//     else if (body.score < 0.5) {
//       console.log('x2');
//       return false
//       // return res.json({ "success": false, "msg": "you might be a bot, sorry!", "score": body.score });
//     }

//     // return json message or continue with your function. Example: loading new page, ect
//     console.log('x3');
//     return true
//     // return res.json({ "success": true, "msg": "captcha verification passed", "score": body.score });
//   } catch (error) {
//     console.log(error);
//   }

// };
```

ALTERNATIVE GOOGLE RECAPTCHA CUSTOMIZED LOGIC

```
// app.post('/agenda-tu-consulta', (request, response) => {


//   async function getData(req) {
//     try {
//       if (!req.body.captcha) {
//         console.log("err");
//         // return res.json({ "success": false, "msg": "Capctha is not checked" });
//       };
//       ///////////////////////////
//       const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

//       const body = await fetch(verifyUrl).then(res => res.json());

//       // console.log(body.success);

//       if (!body.success && body.success === undefined) {
//         console.log('x1');
//         return false
//         // return res.json({ "success": false, "msg": "captcha verification failed" });
//       }
//       else if (body.score < 0.5) {
//         console.log('x2');
//         return false
//         // return res.json({ "success": false, "msg": "you might be a bot, sorry!", "score": body.score });
//       }

//       // return json message or continue with your function. Example: loading new page, ect
//       console.log('x3');

//       return true;
//       // return res.json({ "success": true, "msg": "captcha verification passed", "score": body.score });
//     } catch (error) {
//       console.log(error);
//     }

//   };


//   (
//     async () => {
//       const body = await getData(request).then(data => data);
//       if (body) {
//         // console.log(typeof (response));
//         response.redirect('https://nutriologadalid.com/');
//         // eventCreator.eventCreator(request, response);
//       };
//     }
//   )()


// });
```




//EXPORT DATA FROM GOOGLE CALENDAR 
`exports.events = (req, res) => {

  calendar.events.list({
    calendarId: calendarID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  },
    (error, result) => {

      if (error) {
        res.send(JSON.stringify({ error: error }));
      }
      else {
        res.render('app');
        const x = result.data.items;
      }
    });
};`