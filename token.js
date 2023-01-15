// var base64=require('base-64')
// app.use(bodyParser.json());

        const jwt=require("jsonwebtoken");
       
         token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImRpc3BsYXluYW1lIjoic25laGEiLCJpYXQiOjE2Njk3MjQwMjYsImV4cCI6MTY2OTc1MTAyNn0.dMXb5O1K_DhoknupiCWXqVtwdY6x1UlBcTHn8xRY2Jw"
        // console.log(token)
        // payload=token.split(".")[1]
        // console.log(payload)
        //  decoder=base64.decode
        //  console.log(decoder)
        //  e=JSON.parser(decoder)
        //  console.log(e)
        e=jwt.decode(token)
        console.log(e)
        ee=e.displayname
        eee=e.id
        console.log(eee)
        console.log(ee)

{/* <script src="jwt-decode.js"></script>
    <script type="module">
        
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImRpc3BsYXluYW1lIjoic25laGEiLCJpYXQiOjE2Njk3MjQwMjYsImV4cCI6MTY2OTc1MTAyNn0.dMXb5O1K_DhoknupiCWXqVtwdY6x1UlBcTHn8xRY2Jw"
        // console.log(token)
        // payload=token.split(".")[1]
        // console.log(payload)
        //  decoder=base64.decode
        //  console.log(decoder)
        //  e=JSON.parser(decoder)
        //  console.log(e)
        var e = window.jwt_decode(token)
        console.log(e)
        var ee = e.displayname
        var eee = e.id
        console.log(eee)
        console.log(ee)
        document.getElementById('user').innerHTML = "e.dispalyname";
    </script>
 */}


//     <script>
//         document.getElementById('head').style.display = "none";
//         var form = document.getElementById('form');
//         form.addEventListener('submit', function (e) {
//             e.preventDefault();
//             const Token = JSON.parse(localStorage.getItem('token'))
//             // const inMemoryToken = localstorage_user
//             // console.log(inMemoryToken)
//             console.log('Event')
//             fetch("http://localhost:8080/getproject", {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json, text/plain, */*',
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Bearer' + " " + Token
//                 }

//             })


//                 .then((response) => response.json())

//                 // console.log(data)

//                 .then((data) => {
//                     document.getElementById('head').style.display = "block";
//                     let tbody = document.querySelector('table tbody');
//                     tbody.replaceChildren();
//                     data.forEach(value => {

//                         let tbody = document.querySelector('table tbody');
//                         let row = document.createElement('tr');

//                         let col1 = document.createElement('td');

//                         col1.innerHTML = value.title;

//                         console.log(col1)
//                         let col2 = document.createElement('td');

//                         col2.innerHTML = value.startdate;

//                         console.log(col2)
//                         // let col3 = document.createElement('td');

//                         // col3.innerHTML = value.daystodeadline

//                         // console.log(col3)
//                         // let col4 = document.createElement('td');

//                         // col4.innerHTML = value.progress;

//                         // console.log(col4)
//                         let col5 = document.createElement('td');

//                         col5.innerHTML = value.priority;

//                         console.log(col5)
//                         let col6 = document.createElement('td');

//                         col6.innerHTML = value.leader;

//                         console.log(col6)
//                         let col7 = document.createElement('td');
//                         col7.innerHTML = value.status;
//                         if (value.status == "closed") {
//                             col7.style.color = "black";
//                         }
//                         else if (value.status == "active") {
//                             col7.style.color = "green"
//                         }
//                         else {
//                             col7.style.color = "red";
//                         }

//                         console.log(col7)

//                         row.appendChild(col1)

//                         row.appendChild(col2)
//                         //  row.appendChild(col3)
//                         //  row.appendChild(col4)
//                         row.appendChild(col5)
//                         row.appendChild(col6)
//                         row.appendChild(col7)


//                         tbody.append(row)


//                     })

//                 })
//                 .catch((error) => {
//                     console.log("error", error)
//                 })
//         })


//     </script>
 
