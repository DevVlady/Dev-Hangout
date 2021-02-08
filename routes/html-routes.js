// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const passport = require("passport");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Github
require("dotenv").config();
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const cookie_secret = process.env.COOKIE_SECRET;

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    console.log("GET /login");
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("redirect /members");
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/profile", function (req, res) {
    console.log("GET /profile");
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   console.log("redirect /members");
    //   res.redirect("/profile");
    // }
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });


  //GitHub - Routes to GitHub HTML if user uses Signin with GitHub
  app.get("/github", function (req, res) {
    console.log("GET /github");
    res.sendFile(path.join(__dirname, "../public/github.html"));
  });

  //Route for the user to login - GitHub
  app.get("/login/github", (req, res) => {
    console.log("GET /login/github");
    const url = `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=https://cors-anywhere.herokuapp.com/https://dev-hangout.herokuapp.com/login/github/callback`;
    res.redirect(url);
  });

  //Function to get access token from GitHub API
  async function getAccessToken(code) {
    console.log("getAccessToken");
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });
    console.log(code);
    const data = await res.text();
    const params = new URLSearchParams(data);
    return params.get("access_token");
  }

  //Function to get the github user using the GitHub API
  async function getGithubUser(access_token) {
    console.log("getGithubUser");
    const req = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `bearer ${access_token}`,
      },
    });
    console.log(access_token);
    const data = await req.json();
    console.log("***data:", data);
    return data;
  }

  //Callback route once the user successfully logs in using GitHub
  app.get("/login/github/callback", async (req, res) => {
    console.log("GET /login/github/callback");
    const code = req.query.code;
    const token = await getAccessToken(code);
    const githubData = await getGithubUser(token);
    if (githubData) {
      console.log("**githubData:", githubData);
      req.session.githubId = githubData.id;
      console.log("***req.session.githubId:", req.session.githubId);
      req.session.token = token;
      console.log("***req.session.token:", req.session.token);
      console.log("***token:", token);
      res.redirect("/github");
    } else {
      console.log("Oooops....Error!");
      res.send("Oooops....Error!");
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    console.log("GET /members");
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // app.get("/chat", function (req, res) {
  //   // If the user already has an account send them to the members page
  //   // if (req.user) {
  //   //   res.redirect("/members");
  //   // }
  //   res.sendFile(path.join(__dirname, "../public/socketio.html"));
  // });
};
