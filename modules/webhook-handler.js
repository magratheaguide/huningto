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

    insertLinebreak(element) {
        element.append(document.createElement("br"));
    }
}

export { WebhookHandler };
