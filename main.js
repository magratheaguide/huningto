import * as JsCheck from "/modules/js-check.js";
import * as Send from "/modules/send.js";
import * as ConditionalInput from "/modules/conditional-input.js";
import * as Get from "/modules/get.js";

JsCheck.setJsAvailable();

// set up send form
const sendForm = document.getElementById("form-send");
const sendOutput = document.getElementById("output-send");

Send.initialize(sendForm, sendOutput);
ConditionalInput.initialize(sendForm);

// set up get form
const getForm = document.getElementById("form-get");
const getOutput = document.getElementById("output-get");

Get.initialize(getForm, getOutput);
