const validLogin = {
    email: "admin@admin.com",
    password: "secret_admin"
}

const notPasswordLogin = {
    email: "admin@admin.com",
    password: ''
}

const notEmailLogin = {
    email: "",
    password: 'secret_admin'
}

const invalidEmail = {
    email: "adm@admin.com",
    password: 'secret_admin'
}

const invalidPassword = {
    email: "admin@admin.com",
    password: "seet_admin"
}

const formatInvalidEmail = {
    email: "adminadmin.com",
    password: "secret_admin"
}


export {validLogin, notPasswordLogin, notEmailLogin, invalidEmail, invalidPassword, formatInvalidEmail};