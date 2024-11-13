const formNode = document.getElementById('sign-up-form');
const signInInputsNode = document.getElementById('sign-up-inputs');

formNode.addEventListener("submit", (event) => {
    if (!formNode.checkValidity()) {
        event.preventDefault();
    }
    

    if (!signInInputsNode.classList.contains("post-submit")) {
        signInInputsNode.classList.add("post-submit");
    }
})