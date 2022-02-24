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

    output.value = "";
    submitButton.setAttribute("disabled", "");

    fetch(url, {
        method: "GET",
    }).then((response) => {
        displayResponse(response);
    });

    submitButton.removeAttribute("disabled");
}

function constructUrl(elements) {
    let baseUrl = elements.action.value.trim();
    let threadId = elements.thread_id.value.trim();
    let messageId = elements.message_id.value.trim();

    let composite = `${baseUrl}/messages/${messageId}`;

    if (threadId) {
        return `${composite}?thread_id=${threadId}`;
    }

    return composite;
}

function displayResponse(response) {
    response.text().then((text) => {
        output.append(text);
    });
}

export { initialize };
