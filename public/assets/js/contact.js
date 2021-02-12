
function sendMail(params) {
    let tempParams = {
        from_name: document.getElementById('firstLastName').value,
        to_name: document.getElementById('exampleFormControlInput1').value,
        message: document.getElementById('exampleFormControlTextarea1').value,

    }; 
    emailjs.send('contact_service', 'contact_form', tempParams )
        .then(function(res) {
            console.log("success", res.status)
        })
}

