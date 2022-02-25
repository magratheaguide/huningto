import { WebhookHandler } from "./webhook-handler.js";

class EditHandler extends WebhookHandler {
    constructor(form, output) {
        super(form, output);

        this.method = "PATCH";
    }
}

export { EditHandler };
