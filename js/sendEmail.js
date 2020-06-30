const template_params = {
   "feature_request": "feature_request_value"
};
let service_id = "default_service";
let template_id = "wub";
emailjs.send(service_id, template_id, template_params)
    .then(res => {console.log('SUCCESS!', response.status, response.text);
    }).catch(error => {console.log('NOPE, try again')});