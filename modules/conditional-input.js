/* HTML requirements:

For triggers:
    - Must be an <input>
    - Must have class js-conditional
    - Must have a name
    - Must have a value

For followers:
    - Must not be an input
    - Must have class js-conditional
    - Must have data attribute with name and value corresponding to intended trigger

Triggers and followers must be in the same form.
*/

class ConditionalInput {
    constructor(form) {
        this.form = form;
        this.targetClass = "js-conditional";

        this.triggers = this.form.querySelectorAll(`input.${this.targetClass}`);
        this.followers = this.form.querySelectorAll(
            `.${this.targetClass}:not(input)`
        );

        this.requiredStorage = [];
    }

    register() {
        const that = this;
        this.triggers.forEach((trigger) => {
            // consider initial state
            if (trigger.checked) {
                this.updateFollowers(trigger.name, trigger.value);
            }

            // update on change
            trigger.addEventListener("change", function (event) {
                that.updateFollowers(
                    trigger.name,
                    trigger.value,
                    trigger.checked
                );
            });
        });
    }

    updateFollowers(key, value, checked = true) {
        this.followers.forEach((follower) => {
            if (follower.dataset[key]) {
                if (checked && follower.dataset[key] == value) {
                    follower.removeAttribute("hidden");
                    this.recallRequired(follower);
                } else {
                    follower.setAttribute("hidden", "");
                    this.storeRequired(follower);
                }
            }
        });
        console.log("this = ", this);
        console.log("requiredStorage = ", this.requiredStorage);
    }

    /*
    hidden, required elements are still considered in validation,
    so we need to make them un-required when we hide them
    */
    storeRequired(element) {
        if (element.required) {
            this.requiredStorage.push(element);
            element.removeAttribute("required");
        }

        Array.from(element.children).forEach((child) => {
            this.storeRequired(child);
        });
    }

    recallRequired(element) {
        if (this.requiredStorage.includes(element)) {
            element.setAttribute("required", "");
            this.requiredStorage = this.requiredStorage.filter(
                (x) => x !== element
            );
        }

        Array.from(element.children).forEach((child) => {
            this.recallRequired(child);
        });
    }
}

export { ConditionalInput };
