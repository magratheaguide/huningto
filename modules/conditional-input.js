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

let targetClass = "js-conditional";
let form;
let triggers, followers;
let requiredStorage = [];

function initialize(f) {
    form = f;

    triggers = form.querySelectorAll(`input.${targetClass}`);
    followers = form.querySelectorAll(`.${targetClass}:not(input)`);

    triggers.forEach((trigger) => {
        // consider initial states
        if (trigger.checked) {
            updateFollowers(trigger.name, trigger.value);
        }

        // update on change
        trigger.addEventListener("change", () => {
            updateFollowers(trigger.name, trigger.value, trigger.checked);
        });
    });
}

function updateFollowers(key, value, checked = true) {
    followers.forEach((follower) => {
        if (follower.dataset[key]) {
            if (checked && follower.dataset[key] == value) {
                follower.removeAttribute("hidden");
                recallRequired(follower);
            } else {
                follower.setAttribute("hidden", "");
                storeRequired(follower);
            }
        }
    });
}

/*
hidden, required elements are still considered in validation,
so we need to make them un-required when we hide them
*/
function storeRequired(element) {
    if (element.required) {
        requiredStorage.push(element);
        element.removeAttribute("required");
    }

    let children = Array.from(element.children);

    children.forEach((child) => {
        storeRequired(child);
    });
}

function recallRequired(element) {
    if (requiredStorage.includes(element)) {
        element.setAttribute("required", "");
        requiredStorage = requiredStorage.filter((x) => x !== element);
    }

    let children = Array.from(element.children);

    children.forEach((child) => {
        recallRequired(child);
    });
}

export { initialize };
