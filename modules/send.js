let form, output;

function initialize(f, o) {
    form = f;
    output = o;

    form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();

    let submitButton = event.submitter;
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
}

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
        insertLinebreak(output);
        output.value = "Message sent successfully";
    } else {
        output.value = `HTTP Status Code ${response.status}: ${response.statusText}`;

        response.text().then((text) => {
            try {
                let json = JSON.parse(text);

                for (const [key, value] of Object.entries(json)) {
                    insertLinebreak(output);
                    output.append(`${key}: ${value}`);
                }
            } catch {
                insertLinebreak(output);
                output.append(text);
            }
        });
    }
}

function insertLinebreak(element) {
    element.append(document.createElement("br"));
}

export { initialize };
