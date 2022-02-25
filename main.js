import * as JsCheck from "./modules/js-check.js";
import { SendHandler } from "./modules/send-handler.js";
import * as ConditionalInput from "./modules/conditional-input.js";
import { GetHandler } from "./modules/get-handler.js";

JsCheck.setJsAvailable();

// set up send form
const sendForm = document.getElementById("form-send");
const sendOutput = document.getElementById("output-send");
const sendHandler = new SendHandler(sendForm, sendOutput);

sendHandler.register();
ConditionalInput.initialize(sendForm);

// set up get form
const getForm = document.getElementById("form-get");
const getOutput = document.getElementById("output-get");
const getHandler = new GetHandler(getForm, getOutput);

getHandler.register();
