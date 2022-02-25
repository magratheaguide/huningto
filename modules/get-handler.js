import { WebhookHandler } from "./webhook-handler.js";

class GetHandler extends WebhookHandler {
    constructor(form, output) {
        super(form, output);

        this.method = "GET";
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
