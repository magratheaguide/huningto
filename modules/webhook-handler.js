class WebhookHandler {
    constructor(form, output) {
        this.form = form;
        this.output = output;
    }

    // based on advice from: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_value_of_this_within_the_handler
    register() {
        const that = this;
        this.form.addEventListener("submit", function (event) {
            that.submit(event);
        });
    }

    submit(event) {
        event.preventDefault();

        let submitButton = event.submitter;

        this.output.value = "";
        submitButton.setAttribute("disabled", "");

        let url = this.constructUrl(this.form.elements);
        let fetchInit = this.constructFetchInit(this.form.elements);

        fetch(url, fetchInit).then((response) => {
            this.displayResponse(response);
        });

        submitButton.removeAttribute("disabled");
    }

    constructUrl(elements) {
        let baseUrl = elements.action.value.trim();
        let threadId = elements.thread_id.value.trim();
        let messageId = elements.message_id.value.trim();

        let composite = `${baseUrl}/messages/${messageId}`;

        if (threadId) {
            composite = `${composite}?thread_id=${threadId}`;
        }

        return composite;
    }

    constructFetchInit(elements) {
        let body = new FormData();

        if (elements.buildFrom.value === "json") {
            body.append("payload_json", this.form.elements.payload_json.value);
        } else {
            body.append("content", this.form.elements.content.value);
        }

        return {
            body: body,
            method: this.method,
        };
    }

    displayResponse(response) {
        if (response.ok) {
            this.output.value = "Completed successfully";
        } else {
            this.output.value = `HTTP Status Code ${response.status}: ${response.statusText}`;

            response.text().then((text) => {
                try {
                    let json = JSON.parse(text);

                    for (const [key, value] of Object.entries(json)) {
                        this.insertLinebreak(this.output);
                        this.output.append(`${key}: ${value}`);
                    }
                } catch (error) {
                    console.error(error);

                    this.insertLinebreak(this.output);
                    this.output.append(text);
                }
            });
        }
    }

    insertLinebreak(element) {
        element.append(document.createElement("br"));
    }
}

export { WebhookHandler };
