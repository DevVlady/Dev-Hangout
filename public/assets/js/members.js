const chatButton = document.querySelector('#chatBtn');
chatButton.addEventListener('click', displaySocketIo)
function displaySocketIo() {
  const socketIoSection = document.querySelector('#socket-content');
  if (socketIoSection.classList.contains('d-none')) {
    socketIoSection.classList.remove('d-none');
  } else {
    socketIoSection.classList.add('d-none');
  }
}

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.username);
    $.ajax({
      url: "https://api.github.com/users/" + data.username,
      type: "GET",
      dataType: 'json',
    }).then(function (data) {
      console.log(data)
      $("#profilepic").attr(`src`, data.avatar_url)
      $("#githubName").text(data.name)
      $("#location").text(data.location)
      $("#githubId").text(data.login)
      $("#bio").text(data.bio)
      $("#followers").text(data.followers)
      $("#following").text(data.following)
      $("#gitrepos").text(data.public_repos)
      $("#githubUrl").attr(`href`, data.html_url)
    })
  });
});