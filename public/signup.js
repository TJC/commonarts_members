
function memberCreated(data) {
    document.querySelector("#submissionForm").classList.add("invisible");
    document.querySelector("#successResult").classList.remove("invisible");
    document.querySelector("#successResult").style.display = "";
    window.scrollTo(0, 0);
}

function textAlert(message) {
    var alertBox = document.querySelector("#failResult");
    alertBox.textContent = message;
    alertBox.classList.remove("invisible");
}

function resetAlertBox() {
    let alertBox = document.querySelector("#failResult");
    alertBox.classList.add("invisible");
    alertBox.textContent = "";
}

function memberCreationFailed(status, data) {
    if (data != undefined && data["error"]) {
        var msg = data["error"];
        if (data["message"] != undefined) {
            msg += ": " + data["message"];
        }
        textAlert(msg);
    }
    else {
        textAlert("oh shit, something went wrong!");
    }

    document.querySelector("#formSubmitBtn").removeAttribute("disabled");
}

function initialSetup() {
    document.querySelector("#submissionForm").addEventListener("submit", (event) => {
        console.log("Preventing default form handler submission event.");
        event.preventDefault();
        return;
    });

    document.querySelector("#formSubmitBtn").addEventListener('click', onSubmitClickHandler);

    document.querySelector("#successResult").style.display = "none";
}

function thingIsCheckedOrElse(inputName, orElse) {
    const element = document.querySelector(`input[name='${inputName}']:checked`);
    if (element == null || element.value != "true") {
        orElse();
        return false;
    }
    return true;
}

function captchaCheckIsGood() {
    return thingIsCheckedOrElse("captcha", () =>
        textAlert("You must confirm you are not a robot to continue")
    );
}

function valuesCheckIsGood() {
    return thingIsCheckedOrElse("captcha", () =>
        textAlert("Your membership will not be accepted if you refuse to accept the values!")
    );
}

function onSubmitClickHandler() {
    console.log("Submitting form...");
    resetAlertBox();

    if (!captchaCheckIsGood()) return;
    if (!valuesCheckIsGood()) return;

    var formData = { agreedToValues: "true" };

    const fields = ["emailAddress", "mobileNumber", "firstName", "familyName"];
    fields.forEach(field => formData[field] = document.querySelector(`input[name='${field}']`).value);

    formData["address"] = document.querySelector("textarea[name='address']").value;
    formData["country"] = document.querySelector("select[name='country']").value;

    document.querySelector("#formSubmitBtn").setAttribute("disabled", true);

    fetch("/member",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }
    ).
        then(r => {
            if (r.ok) r.json().then(data => memberCreated(data))
            else r.json().then(data => memberCreationFailed(r.status, data))
        })

    return;
}


if (document.readyState !== 'loading') {
    initialSetup();
} else {
    document.addEventListener('DOMContentLoaded', initialSetup);
}
