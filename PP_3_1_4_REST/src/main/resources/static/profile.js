$(async function () {
    await getProfile()
})



async function getProfile() {
    fetch("http://localhost:8080/user/profile")
        .then(res => res.json())
        .then(data => {
            // Добавляем информацию в шапку
            $('#headerName').append(data.username);
            let roles = data.roles.map(role => " " + role.name.substring(5));
            $('#headerRoles').append(roles);

            //Добавляем информацию в таблицу
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                 <td>${data.password}</td>
                <td>${roles}</td>)`;
            $('#user-table-body').append(user);
        })
}