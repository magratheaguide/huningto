const form = document.querySelector("form");
const output = document.querySelector("output");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let submitButton = form.querySelector("button[type='submit']");
    let url = constructUrl(form.elements);
    let body = new FormData();

    output.value = "";
    submitButton.setAttribute("disabled", "");

    // TODO: Need to teach this how to check dependent fields
    if (form.elements.buildFrom.value === "json") {
        body.append("payload_json", form.elements.payload_json.value);
    } else {
        body.append("content", form.elements.content.value);
    }

    fetch(url, {
        body: body,
        method: "POST",
    }).then((response) => {
        console.log(response);

        displayResponse(response);
    });

    submitButton.removeAttribute("disabled");
});

function constructUrl(elements) {
    let baseUrl = elements.action.value;
    let threadId = elements.thread_id.value.trim();

    if (threadId) {
        return `${baseUrl}?thread_id=${threadId}`;
    }

    return baseUrl;
}

function displayResponse(response) {
    if (response.ok) {
        linebreak(output);
        output.value = "Message sent successfully";
    } else {
        output.value = `HTTP Status Code ${response.status}: ${response.statusText}`;

        response.text().then((text) => {
            try {
                let json = JSON.parse(text);

                for (const [key, value] of Object.entries(json)) {
                    linebreak(output);
                    output.append(`${key}: ${value}`);
                }
            } catch {
                linebreak(output);
                output.append(text);
            }
        });
    }
}

function linebreak(element) {
    element.append(document.createElement("br"));
}
