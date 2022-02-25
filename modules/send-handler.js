import { WebhookHandler } from "./webhook-handler.js";

class SendHandler extends WebhookHandler {
    constructor(form, output) {
        super(form, output);

        this.method = "POST";
    }

    constructUrl(elements) {
        let baseUrl = elements.action.value.trim() + "?wait=true";
        let threadId = elements.thread_id.value.trim();

        if (threadId) {
            return `${baseUrl}&thread_id=${threadId}`;
        } else {
            return baseUrl;
        }
    }
}

export { SendHandler };
