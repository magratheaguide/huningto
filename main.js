import * as Send from "/modules/send.js";
import * as Conditional from "/modules/conditional-input.js";

const form = document.querySelector("form");
const output = document.querySelector("output");

Send.initialize(form, output);
Conditional.initialize(form);
