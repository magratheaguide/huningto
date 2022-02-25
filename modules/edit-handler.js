import { WebhookHandler } from "./webhook-handler.js";

class EditHandler extends WebhookHandler {
    constructor(form, output) {
        super(form, output);

        this.method = "PATCH";
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
            this.output.value = "Message edited successfully";
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
}

export { EditHandler };
