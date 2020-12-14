let githubUsername = $("#username-input")

function githubInfo (github) {
    
    $.ajax({
        type:"GET",
        url: `api.github.com/users/${github}`,
        dataType: "json",
        // console.log(github)
    }).then(function(data){
        console.log(data);
    })
}