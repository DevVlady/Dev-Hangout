


// function requestUserRepos(username) {
//     //create new XMLHttpRequest object
//     const xhr = new XMLHttpRequest()

//     const url = `https://api.github.com/users/${username}/repos`;

//     // Open a new connection, using a GET request via URL endpoint
//     // Providing 3 arguments (GET/POST, The URL, Async True/False)
//     xhr.open('GET', url, true);

//     xhr.onload = function() {
    
//         // Parse API data into JSON
//         const data = JSON.parse(this.response);
        
//         // Log the response
//         console.log(data);
    
//     }
    
//     // Send the request to the server
//     xhr.send();
// }
function github () {
// $("#submitBtn").on("click", function(event){  
    // event.preventDefault();
    var username = $("#username-input").val();
    console.log(username);
    // "Hoybaby"
  
    $.ajax({
     
        url: "https://api.github.com/users/" + username,
        type:"GET",
        dataType: 'json',
    }) .then(function(data){
        console.log(data)
        $("#githubName").text(data.name)
    })
    // axios.get(`https://api.github.com/users/${username}`)
    // .then(async function init(res) {
    //     try {
    //     console.log(res);

    //     }
}

// userName();