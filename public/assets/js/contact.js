// const btn = document.getElementById('button');

// document.getElementById('contact-form')
//     .addEventListener('submit', function (event) {
//         event.preventDefault();

//         btn.value = 'Sending...';

//         const serviceID = 'contact_service';
//         const templateID = 'contact_form';

//         emailjs.sendForm(serviceID, templateID, this)
//             .then(() => {
//                 btn.value = 'Send Email';
//                 alert('Sent!');
//             }, (err) => {
//                 btn.value = 'Send Email';
//                 alert(JSON.stringify(err));
//             });
//     });

function sendMail(params) {
    let tempParams = {
        from_name: document.getElementById('firstLastName').value
        to_name: document.getElementById('exampleFormControlInput1').value
        msg_name: document.getElementById('exampleFormControlTextarea1').value
        

    }
}

// function sendEmail(e) {
//     e.preventDefault();

//     emailjs.sendForm('contact_service', 'contact_form', e.target, 'user_uUtrRyGsoUMd0aTdjzprd')
//         .then((result) => {
//             console.log(result.text);
//         }, (error) => {
//             console.log(error.text);
//         });
// }