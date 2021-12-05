//Arij Karovadiya
//1779053


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



// index page 
//simple index page to let the user know that he/she can do two things using this site
app.get('/', function(req, res) {
    var tagline = "To Start, simply choose one of the two options below.";
    //rendering the index page with the simple tagline above
    res.render('pages/index', {
        tagline: tagline
    });
});

//the choose page will let the user choose the friends who attending the part
app.get('/choose', function(req, res) {
    //axious calls the api from the back end to show all users
    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    //taking the info from the api to then pass it to the choose.ejs with all the info in the body variable
    fullinfo = response.data;
    res.render('pages/choose.ejs', {body: fullinfo})
    });
 
});


app.post('/processdynamicform', function(req, res){
    //taking the info from the form and recording it and showing it in the console
    console.log(req.body);
    selectedID = req.body;
    for (x in req.body) {
        var id = x;
        console.log(id);
    }
    fulluser = req.body
    //need to get the showrestaurants to correlate with users 
    axios.get('http://127.0.0.1:5000/api/showrestaurants')
    .then((response)=>{
        console.log(response.data);
    //jsonifying it so it is easier to parse, or take information individually. 
    fullinfo = response.data;
    fullinfo2 = JSON.parse(JSON.stringify(fullinfo))
    //rendering it to thanks.ejs to filter through the users who will be coming
    res.render('pages/thanks.ejs', {user: req.body, restaurants: fullinfo2})
    })
});

//edit page is just rendering the edit.ejs to then give the user two options:
//1. Add/Delete Friends
//2. Edit his/her preference
app.get('/edit', function(req, res) {
    fullinfo = "Add/delete friends or edit their preference ";
    //rendering with a simple string variable
    res.render('pages/edit.ejs', {body: fullinfo})
});


//processdynamicform2 is taking the user info again from the api
//and pushing it to thanks2.ejs, where the user can add or delete 
//people from the list
app.post('/processdynamicform2', function(req, res){
    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    //rendering with the user variable, which carries all the "friends"
    res.render('pages/thanks2.ejs', {user: fullinfo})
    })
});


//processdynamicform3 is taking the user info again from the api
//and pushing it to thanks3.ejs, where the user can manupulate 
//the friend's preference from the list
app.post('/processdynamicform3', function(req, res){
    // will also take showusers api and push it to thanks3.ejs
    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    
    res.render('pages/thanks3.ejs', {user: fullinfo})
    })
});

app.post('/processdynamicform4', function(req, res){
    // will also take showusers api and push it to thanks4.ejs
    //do not have a thanks4.ejs set up properly, so I am not including it.
    axios.get('http://127.0.0.1:5000/api/showuser')
    .then((response)=>{
        console.log(response.data);
    fullinfo = response.data;
    
    res.render('pages/thanks4.ejs', {user: fullinfo})
    })
});




/*

    


    

*/



app.listen(8080);
console.log('8080 is the magic port');
