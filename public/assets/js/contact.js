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

// function sendMail(params) {
//     let tempParams = {
//         from_name: document.getElementById('name').value
//     }
// }