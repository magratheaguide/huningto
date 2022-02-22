let targetClass = "js-dependency";
let form;
let triggers, followers;

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
            if (checked && follower.dataset[key] == value)
                follower.removeAttribute("hidden");
            else follower.setAttribute("hidden", "");
        }
    });
}

export { initialize };
