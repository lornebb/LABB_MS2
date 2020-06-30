/* 
const template_params = {
   "feature_request": "feature_request_value"
};
let service_id = "default_service";
let template_id = "wub";
emailjs.send(service_id, template_id, template_params)
    .then(res => {console.log('SUCCESS!', response.status, response.text);
    }).catch(error => {console.log('NOPE, try again')});
*/

function sendMail(contactForm) {
console.log("reached");
    emailjs.send("lorneashley_gmail_com", "wub", {
/*    "from_name": contactForm.name.value,
    "from_email": contactForm.emailaddress.value,*/
    "feature_request": contactForm.feature_request.value
})
    .then(
        function (response) {
            console.log("SUCCESS", response);
            console.log("SUCCESS", response.status, response.text);
        },
        function (error) {
            console.log("FAILED", error);
        }
    );
return false;
} 

$("#test").click(function(){
    alert("reached")
});