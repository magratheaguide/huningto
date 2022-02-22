import * as Send from "/modules/send.js";

const form = document.querySelector("form");
const output = document.querySelector("output");

Send.initialize(form, output);
