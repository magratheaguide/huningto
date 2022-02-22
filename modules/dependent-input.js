/* HTML requirements:

For triggers:
    - Must be an <input>
    - Must have class js-dependency
    - Must have a name
    - Must have a value

For followers:
    - Must not be an input
    - Must have class js-dependency
    - Must have data attribute with name and value corresponding to intended trigger

Triggers and followers must be in the same form.
*/

let targetClass = "js-dependency";
let form;
let triggers, followers;
let hiddenRequired = [];

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
                show(follower);

                let children = Array.from(follower.children);

                children.forEach((child) => {
                    if (hiddenRequired.includes(child)) {
                        child.setAttribute("required", "");
                        hiddenRequired = hiddenRequired.filter(
                            (x) => x !== child
                        );
                    }
                });
            } else {
                hide(follower);

                Array.from(follower.children).forEach((child) => {
                    if (child.required) {
                        hiddenRequired.push(child);
                        child.removeAttribute("required");
                    }
                });
            }
        }
    });
    console.log(hiddenRequired);
}

function hide(element) {
    element.setAttribute("hidden", "");
}

function show(element) {
    element.removeAttribute("hidden");
}

export { initialize };
