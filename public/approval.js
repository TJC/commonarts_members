function loadPendingMembers() {
    fetch("/members/pending").then(r => r.json()).then(data => displayMembers(data));
}

function displayMembers(data) {
    const memberList = document.querySelector("#memberList tbody");
    memberList.querySelectorAll('tr').forEach(el => el.remove());

    const memberFields = ["emailAddress", "mobileNumber", "firstName", "familyName", "country"];

    data.forEach(member => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");

        const input = document.createElement("input");
        input.classList.add("form-check-input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", "memberId");
        input.setAttribute("id", `memberId${member.id}`);
        input.setAttribute("value", member.id);
        td1.append(input);
        tr.append(td1);

        memberFields.forEach(f => {
            const td = document.createElement("td");
            td.textContent = member[f];
            tr.append(td);
        });

        memberList.append(tr);
    });
}

function onApproveClickHandler() {
    var ids = [];
    document.querySelectorAll("input[name='memberId']:checked").forEach(v => ids.push(v.value));
    if (ids.length == 0) {
        alert("No members selected?!");
        return;
    }

    fetch("/members/approve", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids),
    }).then(r => {
        if (r.ok) showSuccess()
        else showFailure()
    });
    return;
}

function showSuccess() {
    var alert = document.querySelector("#alertBox");
    alert.classList.add("alert-success");
    alert.classList.remove("invisible");
    alert.textContent = "Successfully approved members";
    setTimeout(loadPendingMembers, 1000);
}

function showFailure() {
    var alert = document.querySelector("#alertBox");
    alert.classList.add("alert-danger");
    alert.classList.remove("invisible");
    alert.textContent = "Error :(";
    setTimeout(loadPendingMembers, 1000);
}

function onRejectClickHandler() {
    alert("Not actually implemented yet");
    return;
}

function initialSetup() {
    document.querySelector("#memberListForm").addEventListener("submit", (event) => {
        console.log("Preventing default form handler submission event.");
        event.preventDefault();
        return;
    });

    document.querySelector("#approveBtn").addEventListener('click', onApproveClickHandler);
    document.querySelector("#rejectBtn").addEventListener('click', onRejectClickHandler);

    loadPendingMembers();
}

if (document.readyState !== 'loading') {
    initialSetup();
} else {
    document.addEventListener('DOMContentLoaded', initialSetup);
}
