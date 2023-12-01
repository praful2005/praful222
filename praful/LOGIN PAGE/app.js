let firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()
function register() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let full_name = document.getElementById('full_name').value;
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    if (validate_field(full_name) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            let user = auth.currentUser
            let database_ref = database.ref()
            const currentDate = new Date().toDateString();
            // Create User data
            let user_data = {
                email: email,
                full_name: full_name,
                last_login: currentDate
            }
            database_ref.child('users/' + user.uid).set(user_data)
            alert('User Created!!')
        })
        .catch(function (error) {
            let error_code = error.code
            let error_message = error.message
            alert(error_code, error_message)
        })
}
function login() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            let user = auth.currentUser
            let database_ref = database.ref()
            let user_data = {
                last_login: Date.now()
            }
            database_ref.child('users/' + user.uid).update(user_data)
            alert('User Logged In!!')
        })
        .catch(function (error) {
            let error_code = error.code
            let error_message = error.message
            alert(error_code, error_message)
        })
}
function validate_email(email) {
    let expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
}
function validate_password(password) {
    if (password < 6) {
        return false
    } else {
        return true
    }
}
function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}
