import * as JsCheck from "./modules/js-check.js";
import { SendHandler } from "./modules/send-handler.js";
import * as ConditionalInput from "./modules/conditional-input.js";
import { GetHandler } from "./modules/get-handler.js";

JsCheck.setJsAvailable();

// set up send form
const sendForm = document.getElementById("send-form");
const sendOutput = document.getElementById("send-output");
const sendHandler = new SendHandler(sendForm, sendOutput);

sendHandler.register();
ConditionalInput.initialize(sendForm);

// set up get form
const getForm = document.getElementById("get-form");
const getOutput = document.getElementById("get-output");
const getHandler = new GetHandler(getForm, getOutput);

getHandler.register();
