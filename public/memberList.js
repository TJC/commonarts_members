function loadMemberList() {
    fetch("/members/approved").then(r => r.json()).then(data => displayMembers(data));
}

function displayMembers(data) {
    const memberList = document.querySelector("#memberList tbody");
    memberList.querySelectorAll('tr').forEach(el => el.remove());

    const memberFields = ["emailAddress", "mobileNumber", "firstName", "familyName", "country"];

    data.forEach(member => {
        console.log(member);
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        const approvedAt = member["membershipApprovedAt"].slice(0, 10);
        td1.textContent = approvedAt;
        tr.append(td1);

        memberFields.forEach(f => {
            var td = document.createElement("td");
            td.textContent = member[f];
            tr.append(td);
        });

        memberList.append(tr);
    });
}

if (document.readyState !== 'loading') {
    loadMemberList();
} else {
    document.addEventListener('DOMContentLoaded', loadMemberList);
}
