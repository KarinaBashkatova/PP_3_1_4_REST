$(async function () {
    await getTableWithUsers();
    getAllRoles()
    roleArray()
})

//DECLARATIONS
const userEditModal = new bootstrap.Modal(document.getElementById('userEditModal'))
const formEditUser = document.getElementById('userEditModal')
const id = document.getElementById('userId')
const username = document.getElementById('userUsername')
const age = document.getElementById('age')
const email = document.getElementById('email')
const password = document.getElementById('password')
const roles = document.getElementById('roles')

const userDeleteModal = new bootstrap.Modal(document.getElementById('userDeleteModal'))
const formDeleteUser = document.getElementById('userDeleteModal')
const idDelete = document.getElementById('userDeleteId')
const usernameDelete = document.getElementById('userDeleteUsername')
const ageDelete = document.getElementById('ageDelete')
const emailDelete = document.getElementById('emailDelete')
const passwordDelete = document.getElementById('passwordDelete')
const rolesDelete = document.getElementById('rolesDelete')

let option = ''
let result = ''
const url = "http://localhost:8080/admin/users"
const tbody = document.querySelector('tbody')

//ALL-USERS TABLE
const getTableWithUsers = (users) => {
    users.forEach(user => {
        let userRoles = "";
        user.roles.forEach(role => {
            userRoles = userRoles + role.name.substring(5) + ' '
        })
        result += `<tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td>${userRoles}</td>
                            <td class="text-center">
                                <button  class="btnEdit btn btn-secondary"  data-bs-toggle="modal"  data-bs-target="#userModal">Edit</button>
                            </td>       
                            <td class="text-center">
                                <button  class="btnDelete btn btn-danger"  data-bs-toggle="modal"  data-bs-target="#userModal">Delete</button>
                            </td>   
                      </tr>
                    `
    })

    tbody.innerHTML = result
}

    fetch(url)
        .then( response => response.json() )
        .then( data => getTableWithUsers(data) )
        .catch( error => console.log(error))

//ROLES-SELECTOR
function getAllRoles(target) {
    fetch(url + '/roles')
        .then(response => response.json())
        .then(roles => {
            let optionsRoles = ''
            roles.forEach(role => {
                optionsRoles += `<option value='${role.id}'>${role.name.substring(5)}</option>`
            })
            target.innerHTML = optionsRoles
        })
}

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;
}

//REFRESHING TABLE
const refreshUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            getTableWithUsers(data)
        })
}

//ON-EVENT
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//OPEN EDIT-MODAL
let idForm = 0
on(document, 'click', '.btnEdit', e => {

    const target = e.target.parentNode.parentNode
    idForm = target.children[0].innerHTML
    const usernameForm = target.children[1].innerHTML
    const ageForm = target.children[2].innerHTML
    const emailForm = target.children[3].innerHTML
    const passwordForm = target.children[4].innerHTML
    id.value = idForm
    username.value =  usernameForm
    age.value =  ageForm
    email.value =  emailForm
    password.value =  passwordForm
    roles.value = getAllRoles(roles)

    option = 'edit'
    userEditModal.show()
})

//OPEN DELETE-MODAL
on(document, 'click', '.btnDelete', e => {
    const target = e.target.parentNode.parentNode
    idForm = target.children[0].innerHTML
    const usernameForm = target.children[1].innerHTML
    const ageForm = target.children[2].innerHTML
    const emailForm = target.children[3].innerHTML
    const passwordForm = target.children[4].innerHTML
    const rolesForm = target.children[5].innerHTML
    idDelete.value = idForm
    usernameDelete.value =  usernameForm
    ageDelete.value =  ageForm
    emailDelete.value =  emailForm
    passwordDelete.value =  passwordForm
    rolesDelete.value = rolesForm.toString()
    option = 'delete'
    userDeleteModal.show()
})

//SUBMIT FOR EDIT-MODAL
formEditUser.addEventListener('submit', (e)=> {
    let options = document.querySelector('#roles');
    let setRoles = roleArray(options)
    e.preventDefault()
    fetch(url + '/' + idForm, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                age: age.value,
                email: email.value,
                password: password.value,
                roles: setRoles
            })
        })
            .then(data => refreshUsersTable(data))
        userEditModal.hide()
    })

//SUBMIT FOR DELETE-MODAL
formDeleteUser.addEventListener('submit', (e)=> {
    let options = document.querySelector('#rolesDelete');
    roleArray(options);
    e.preventDefault()
    fetch(url + '/' + idForm, {
            method: 'DELETE'
        })
        .then(data => refreshUsersTable(data))
        userDeleteModal.hide()
})








