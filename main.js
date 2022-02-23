import * as JsCheck from "/modules/js-check.js";
import * as Send from "/modules/send.js";
import * as ConditionalInput from "/modules/conditional-input.js";

JsCheck.setJsAvailable();

// set up send form
const sendForm = document.getElementById("form-send");
const sendOutput = sendForm.querySelector("output");

Send.initialize(sendForm, sendOutput);
ConditionalInput.initialize(sendForm);
