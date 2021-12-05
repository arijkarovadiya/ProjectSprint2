// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');
const { response } = require('express');

var selectedID = "";
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    var tagline = "To Start, simply choose one of the two options below.";

    res.render('pages/index', {
        tagline: tagline
    });
});

app.get('/choose', function(req, res) {
    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
        //console.log(response.data.results[1].trackName);
    
    fullinfo = response.data;
    res.render('pages/choose.ejs', {body: fullinfo})
    });
 
});


app.post('/processdynamicform', function(req, res){
    //go directly to thanks.ejs and show dynamic checkbox selection
    console.log(req.body);
    selectedID = req.body;
    for (x in req.body) {
        var id = x;
        console.log(id);
    }
    fulluser = req.body

    axios.get('http://127.0.0.1:5000/api/showrestaurants')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    fullinfo2 = JSON.parse(JSON.stringify(fullinfo))
    
    res.render('pages/thanks.ejs', {user: req.body, restaurants: fullinfo2})
    })
});


app.get('/edit', function(req, res) {
    
    fullinfo = "hi";
    res.render('pages/edit.ejs', {body: fullinfo})
    
 
});



app.post('/processdynamicform2', function(req, res){


    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    
    res.render('pages/thanks2.ejs', {user: fullinfo})
    })
});



app.post('/processdynamicform3', function(req, res){


    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    
    res.render('pages/thanks3.ejs', {user: fullinfo})
    })
});





/*
// choose a movie page
app.get('/choose', function(req, res) {
    res.render('pages/choose');
});

// about page
app.get('/about', function(req, res) {

    
    //itunes API call
    axios.get('https://itunes.apple.com/search?term=radiohead')
    .then((response)=>{
    console.log(response.data);
    });
    res.render('pages/about');
    

    /*
    //superhero API CALL
    axios.get('https://superheroapi.com/api/10221405381743383/69')
    .then((response)=>{
    console.log(response.data);
    });
    res.render('pages/about');
    */

    /*
    //local API call to my Python REST API that delivers cars
    axios.get(`http://127.0.0.1:5000/api/cars/all`)
    .then((response)=>{
        
        var cars = response.data;
        var tagline = "Here is the data coming from my own API";
        console.log(cars);
         // use res.render to load up an ejs view file
        res.render('pages/about', {
            cars: cars,
            tagline: tagline
        });
    }); 
    */

    /*
    //get multiple service calls and combine the results in 1 function
    axios.all([axios.get(`http://127.0.0.1:5000/api/cars/all`),
    axios.get(`http://127.0.0.1:5000/api/cars?id=2`)])
    .then(axios.spread((firstResponse, secondResponse) => {  
  
    var cars = firstResponse.data;
    var tagline = "Here is the data coming from my own API";
    var aSingleCar = secondResponse.data[0];

    //use res.render to load up an ejs view file
    res.render('pages/about', {
        cars: cars,
        tagline: tagline,
        single: aSingleCar
    });
    }))
    .catch(error => console.log(error)); 
    
    
});

// examples page 
app.get('/examples', function(req, res) {
    var exampleVar = "Javascript";
    
    // this will render our new example spage 
    res.render("pages/examples.ejs", {exampleVar: exampleVar});
});

app.post('/process_form', function(req, res){
    // create a variable to hold the username parsed from the request body
    var username = req.body.username
    // create a variable to hold ....
    var password = req.body.password

    let check = 0;

    if (req.body.rememberme == 'on')
            check = 1;

   console.log("email is: " + username);
   console.log("password is: " + password);
   console.log("checkedbox checked: " + check);

    res.render('pages/thanks.ejs', {body: req.body})
  
  })

  app.post('/processdynamicform', function(req, res){
    //go directly to thanks.ejs and show dynamic checkbox selection
    console.log(req.body);
    selectedID = req.body;
    for (x in req.body) {
        var selectedName = x;
        console.log("selected name is: " + selectedName);
    }
    res.render('pages/thanks.ejs', {body: req.body})
  
  })

*/



app.listen(8080);
console.log('8080 is the magic port');
