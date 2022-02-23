import * as JsCheck from "/modules/js-check.js";
import * as Send from "/modules/send.js";
import * as ConditionalInput from "/modules/conditional-input.js";

JsCheck.setJsAvailable();

const form = document.querySelector("form");
const output = document.querySelector("output");

Send.initialize(form, output);
ConditionalInput.initialize(form);
