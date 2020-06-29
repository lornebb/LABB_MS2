var template_params = {
   "feature_request": "feature_request_value"
};

var service_id = "default_service";
var template_id = "wub";

emailjs.send(service_id, template_id, template_params)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    return false;});

/* function sendMail(contactForm) {
    emailjs.send("gmail", "wub", {
        "project_request": contactForm.feature_request.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response.status, response.text);
        },
        function(error) {
            console.log("FAILED", error);
        });
*/