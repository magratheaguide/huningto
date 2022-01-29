"use strict";

(function () {
    const form = document.querySelector("form");

    const dependencyTriggers = form.querySelectorAll("input.js-dependency");
    const dependencyFollowers = form.querySelectorAll(
        ".js-dependency:not(input)"
    );

    dependencyTriggers.forEach((trigger) => {
        // consider initial states
        if (trigger.checked) {
            updateDependencyFollowers(trigger.name, trigger.value);
        }

        // update on change
        trigger.addEventListener("change", () => {
            updateDependencyFollowers(
                trigger.name,
                trigger.value,
                trigger.checked
            );
        });
    });

    function updateDependencyFollowers(key, value, checked = true) {
        dependencyFollowers.forEach((follower) => {
            if (follower.dataset[key]) {
                if (checked && follower.dataset[key] == value)
                    follower.removeAttribute("hidden");
                else follower.setAttribute("hidden", "");
            }
        });
    }
})();
