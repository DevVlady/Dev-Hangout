$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var usernameInput = $("input#username-input");
  var githubInput = $("#github-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      githubname: githubInput.val().trim()
    };

    if (!userData.email || !userData.username || !userData.password || !userData.githubname) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    emailInput.val("");
    usernameInput.val("");
    passwordInput.val("");
    githubInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the profile page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      githubname: userData.githubname
    })
      .then(function(data) {
        window.location.replace("/profile");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});