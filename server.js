// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

//Requiring Fetch for GiutHub use
const fetch = require('node-fetch');
const cookieSession = require('cookie-session');
// Variables to get the Keys from env File
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const cookie_secret = process.env.COOKIE_SECRET;
console.log({ client_id, client_secret })



// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//Cookie Session to keep track of the user - GitHub
app.use(cookieSession({
  secret: cookie_secret
}));

//Route for the user to login - GitHub
app.get('/login/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:8080/login/github/callback`;
  res.redirect(url);
  console.log('***LOGIN/GITHUB***')
})




// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});