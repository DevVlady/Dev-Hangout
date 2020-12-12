// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // app.get("/", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    console.log('**MEMBERS.HTML**')
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  //THIS IS THE ROUTE INDEX. THE HOMEPAGE. FIRST PAGE YOU WILL SEE
  app.get("/", (req, res) => {
    console.log('**ROOT.HTML**')
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // app.get("/login", (req, res) => {
  //   console.log('**PROFILE.HTML**')
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });
  app.get("/signup", (req, res) => {
    console.log('**SIGNUP.HTML**')
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

};
