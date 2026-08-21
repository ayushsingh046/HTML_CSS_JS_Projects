//DOM Elements
const form = document.getElementById("registration-form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const confirmPass = document.getElementById("confirmPassword")

form.addEventListener("submit", function (e) {
    e.preventDefault() //by default when the form is submitted the browser refreshes the page and the data to server and by using this method we stop the refresh of page on submit

    //passing array to checkRequired function and in that function we check if the data is entered or not and if not it display an error msg
    const isRequiredValid = checkRequired([username, email, pass, confirmPass])

    let isFormValid = isRequiredValid

    if (isRequiredValid) {
        const isUsernameValid = checkLength(username, 3, 15)
        const isEmailValid = checkEmail(email)
        const isPassValid = checkLength(pass, 6, 25)
        const isPassMatch = checkPassMatch(pass, confirmPass)

        isFormValid = isUsernameValid && isEmailValid && isPassValid && isPassMatch;
    }

    if (isFormValid) {
        alert("Registration Successful!!")
        form.reset()
        document.querySelectorAll(".form-group").forEach((group) => {
            group.className = "form-group"
        })
    }

})

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldName(input)} must be at least ${min} characters.`)
        return false
    } else if (input.value.length > max) {
        showError(input, `${formatFieldName(input)} must be less than ${max} characters.`)
        return false
    } else {
        showSuccess(input)
        return true
    }
}
function checkEmail(email) {
    // Email regex that covers most common email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid");
        return false;
    }
}
function checkPassMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match")
        return false
    }
    return true
}
function checkRequired(inputArray) {
    let isValid = true

    inputArray.forEach((input) => {
        //checking if data is enter or not if enter then the succes msg is shown and if not error msg is shown, error is displayed by the showError function and success by showSucces method
        if (input.value.trim() === "") {
            showError(input, `${formatFieldName(input)} is required`)
            isValid = false
        } else {
            showSuccess(input)
        }
    })

    return isValid

}
function showError(input, msg) {
    const formGroup = input.parentElement
    formGroup.className = "form-group error"
    const small = formGroup.querySelector("small")
    small.innerText = msg
}

//format field name with proper capitalization
function formatFieldName(input) {
    //input username will be made to Username
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
function showSuccess(input) {
    const formGroup = input.parentElement
    formGroup.className = "form-group success"

}