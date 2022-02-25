import { WebhookHandler } from "./webhook-handler.js";

class GetHandler extends WebhookHandler {
    constructor(form, output) {
        super(form, output);

        this.method = "GET";
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
        return {
            method: this.method,
        };
    }

    displayResponse(response) {
        response.text().then((text) => {
            this.output.append(text);
        });
    }
}

export { GetHandler };
