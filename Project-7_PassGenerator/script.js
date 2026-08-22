//DOM Elements
const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

//To show the value of the slider
lengthSlider.addEventListener("input", () => {
    lengthDisplay.textContent = lengthSlider.value
})

generateButton.addEventListener("click", makePassword)

function makePassword() {
    //Input taken from range is a string. Number() convets it into interger
    const length = Number(lengthSlider.value)
    //.checked returns true or flase. If it is checked then true else false
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    //to check whether there is any chartype or not
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert("Kindly select atleast one type of char type")
        return
    }

    const newPassword = createRandomPassword(
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols
    )

    passwordInput.value = newPassword
    //After showing showing the generated pass updating the strength Meter by function
    updateStrengthMeter(newPassword)
}

function updateStrengthMeter(password) {
    const passwordLength = password.length
    //.test method is used to check where the passed parameter has elements or not. If it has then it returns true else false
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNubmers = /[0-9]/.test(password)
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0

    //here i want to set the value of strengthScore and for one character in the password it adds two points and maximum of 40 will be given
    strengthScore += Math.min(passwordLength * 2, 40);

    //here for each char type we are giving 15 points to the strength
    if (hasUppercase) strengthScore += 15;
    if (hasLowercase) strengthScore += 15;
    if (hasNubmers) strengthScore += 15;
    if (hasSymbols) strengthScore += 15;

    // enforce minimum score for every short password
    if (passwordLength < 8) {
        strengthScore = Math.min(strengthScore, 40);
    }

    // ensure the width of the strength bar is a valid percentage
    const safeScore = Math.max(5, Math.min(100, strengthScore));
    strengthBar.style.width = safeScore + "%";

    let strengthLabelText = "";
    let barColor = "";

    if (strengthScore < 40) {
        // weak password
        barColor = "#fc8181";
        strengthLabelText = "Weak";
    } else if (strengthScore < 70) {
        // Medium password
        barColor = "#fbd38d"; // Yellow
        strengthLabelText = "Medium";
    } else {
        // Strong password
        barColor = "#68d391"; // Green
        strengthLabelText = "Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;
}

//This function has important logic
function createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
    //Getting the length of pass and what chars does it have
) {
    let allCharacters = ""; //intialising a empty variable

    //In the below four conditions if the char set is there then all the characters of that set are added in the allCharacters variable
    if (includeUppercase) allCharacters += uppercaseLetters;
    if (includeLowercase) allCharacters += lowercaseLetters;
    if (includeNumbers) allCharacters += numberCharacters;
    if (includeSymbols) allCharacters += symbolCharacters;

    let password = ""; //intialising a empty variable

    //In this for loop in the first line we are generating a random index and using that index we are picking one char from the allCharacters varialbe which contains continuous chars but random index makes it random
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
}

//This makes sure that whenever the page is opened or refreshed it calls the makePassword funciton get some randomly generated password
window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
    if (!passwordInput.value) return; //if nothing is there then function get completed

    navigator.clipboard
        .writeText(passwordInput.value)
        .then(() => showCopySuccess())
        .catch((error) => console.log("Could not copy:", error));
});

//In this function first we are replacing the copy btn into check btn and in green color then there is timeout of 1500ms which tell for how much time the green check will appear
function showCopySuccess() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#48bb78";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 1500);
}