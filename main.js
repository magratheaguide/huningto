import * as Send from "/modules/send.js";
import * as HandleDependencies from "/modules/dependent-input.js";

const form = document.querySelector("form");
const output = document.querySelector("output");

Send.initialize(form, output);
HandleDependencies.initialize(form);
