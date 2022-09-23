$(async function () {
    await addNewUser()
})
const newUserForm = document.forms['newUserForm']


async function addNewUser() {
    await fetch("http://localhost:8080/admin/users/roles")
        .then(res => res.json())
        .then(roles => {
            roles.forEach(role => {
                let el = document.createElement("option");
                el.text = role.name.substring(5);
                el.value = role.id;
                $('#addRoles')[0].appendChild(el);
            })
        })

    newUserForm.addEventListener('submit', addNewUser)

    function addNewUser(e) {
        e.preventDefault();
        let newUserRoles = [];
        for (let i = 0; i < newUserForm.roles.options.length; i++) {
            if (newUserForm.roles.options[i].selected) newUserRoles.push({
                id : newUserForm.roles.options[i].value,
                name : newUserForm.roles.options[i].name
            })
        }
        fetch("http://localhost:8080/admin/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: newUserForm.username.value,
                age: newUserForm.age.value,
                email: newUserForm.email.value,
                password: newUserForm.password.value,
                roles: newUserRoles
            })
        }).then(() => {
            newUserForm.reset();
            location.href = 'http://localhost:8080/admin';
        })
    }

}