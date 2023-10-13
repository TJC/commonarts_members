
function memberCreated(data, textStatus, xhr) {
    $("#submissionForm").addClass("invisible");
    $("#successResult").removeClass("invisible");
}

function memberCreationFailed(data, textStatus, xhr) {
    alert("oh shit, something went wrong!");
}

$("#submissionForm").submit(() => {
    console.log("Submitting form...");

    const emailAddress = $("#emailAddress").val();
    const mobileNumber = $("#mobileNumber").val();
    const firstName = $("#firstName").val();
    const familyName = $("#familyName").val();
    const address = $("#address").val();
    const country = $("#country").val();

    const agreed = $("input[name='agreedToValues']:checked").val();
    if (agreed != "true") {
        alert("Your membership will not be accepted if you refuse to accept the values!");
        return false;
    }

    const data = {
        "emailAddress": emailAddress,
        "mobileNumber": mobileNumber,
        "firstName": firstName,
        "familyName": familyName,
        "address": address,
        "country": country,
        "agreedToValues": agreed == "true",
    };

    $("#formSubmit").attr("disabled", true);

    $.ajax({
        "url": "/member",
        "method": "POST",
        "contentType": "application/json",
        "data": data,
        "success": memberCreated,
        "error": memberCreationFailed,
    });

    return false;
});