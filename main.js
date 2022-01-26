"use strict";

const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", event => {
    let url = constructUrl(form.elements);
    let body = new FormData();

    // body.append("content", form.elements.content.value);

    body.append("payload_json", form.elements.payload_json.value);

    fetch(url, {
        body: body,
        method: "POST"
    }).then(response => {
        console.log(response);
        output.value = `${ response.status }: ${ response.statusText }\n`;

        response.text();
    }).then(text => {
        if (text) output.value += text;
    });

    event.preventDefault();
});

function constructUrl(elements) {
    let baseUrl = elements.action.value;
    let threadId = elements.thread_id.value.trim();

    if (threadId) {
        return `${ baseUrl }?thread_id=${ threadId }`;
    }

    return baseUrl;
}
