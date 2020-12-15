// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

//Requiring Fetch for GiutHub use
const fetch = require('node-fetch');
// const cookieSession = require('cookie-session');

// Variables to get the Keys from env File - GitHub
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const cookie_secret = process.env.COOKIE_SECRET;
console.log({ client_id, client_secret })


var socket = require('socket.io');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");


//variables for socket io

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
// app.use(cookieSession({
//   secret: cookie_secret
// }));

//Route for the user to login - GitHub
app.get('/login/github', (req, res) => {
  console.log('***LOGIN/GITHUB***')
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=https://dev-hangout.herokuapp.com/login/github/callback`;
  res.redirect(url);

})

//Function to get access token from GitHub API
async function getAccessToken(code) {
  console.log('***getAccessToken()***')
  const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          client_id,
          client_secret,
          code,
      }),

  })
  console.log(code)
  const data = await res.text();
  const params = new URLSearchParams(data);
  return params.get("access_token");
}

//Function to get the github user using the GitHub API
async function getGithubUser(access_token) {
  console.log('***getGithubUser()***')
  const req = await fetch('https://api.github.com/user', {
      headers: {
          Authorization: `bearer ${access_token}`,
      },
  });
  console.log(access_token)
  const data = await req.json();
  console.log('***data:', data)
  return data;
}


//Callback route once the user successfully logs in using GitHub
app.get('/login/github/callback', async (req, res) => {
  console.log('***/login/github/callback***')
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGithubUser(token);
  if (githubData) {
      console.log('**githubData:', githubData);
      req.session.githubId = githubData.id;
      console.log('***req.session.githubId:', req.session.githubId);
      req.session.token = token;
      console.log('***req.session.token:', req.session.token);
      console.log('***token:', token);
      res.redirect('/github')

  } else {
      console.log('Oooops....Error!')
      res.send('Oooops....Error!')
  }
})


// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: false}).then(function() {
  console.log("database was succesful");
  //  var server = app.listen(PORT, function() {
  //   console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  // });
});

var server = app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

var io = socket(server);
// Setup basic express server
// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// server.listen(PORT, () => {
//   console.log('Server listening at PORT %d', PORT);
// });


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});
// Routing
// app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
