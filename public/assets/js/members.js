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




$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
    
  
  // function github () {
  //   // $("#submitBtn").on("click", function(event){  
  //       // event.preventDefault();
  //       var username = $("#username-input").val();
  //       console.log(username);
  //       // "Hoybaby"
      
        $.ajax({
        
            url: "https://api.github.com/users/" + data.username,
            type:"GET",
            dataType: 'json',
        }) .then(function(data){
            console.log(data)
            $("#githubName").text(data.name)
            $("#githubLocation").text(data.location)
        })
        // axios.get(`https://api.github.com/users/${username}`)
        // .then(async function init(res) {
        //     try {
        //     console.log(res);
    
        //     }
    // }
  });
});