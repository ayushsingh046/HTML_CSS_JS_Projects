//DOM Elements
const convertorForm = document.getElementById("convertor-form");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("show-result");

//Event Listeners
window.addEventListener("load", fetchCurrencies)
convertorForm.addEventListener("submit", convertCurrency)

async function fetchCurrencies() {

    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD") //fetching raw data from the api
    const data = await response.json() //converting the data into json

    console.log(data)
    // Object.keys is a built in JS method that returns an array of a given object's property names
    // data.rates here data is our response which has been converted into json and there is an object inside that data which is rates and with data.rates we are taking that response and with Object.keys we are coverting it into array and storing it in currencyOptions
    const currencyOptions = Object.keys(data.rates);

    // here we are applying a forEach on the array currencyOpitons and creating two elements one for  fromCurrency and another for toCurrency. From this we display the options in the UI
    currencyOptions.forEach((currency) => {
        const option1 = document.createElement("option")
        option1.value = currency
        option1.textContent = currency
        fromCurrency.appendChild(option1)

        const option2 = document.createElement("option")
        option2.value = currency
        option2.textContent = currency
        toCurrency.appendChild(option2)
    })
}
async function convertCurrency(e) {
    e.preventDefault()

    const amount = parseFloat(amountInput.value) //parseFloat has been used to convert the amountInput.value into float as the value obtained is string 
    const fromCurrencyValue = fromCurrency.value
    const toCurrencyValue = toCurrency.value

    if (amount < 0) {
        alert("Kindly enter a valid amount")
        return
    }

    // In this api when a currecy is asked it gives the rates as per that currency so instead of asking for two different currencies value we ask for the one and then multiply the rate with the other one to get the final answer
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
    const data = await response.json(); //as per the passed currency we get an object and in that object there is another object named rate which contains the rates as per the passed currency with respect to the other currencies

    const rate = data.rates[toCurrencyValue]; //getting the rate for the To currency 
    const convertedAmount = (amount * rate).toFixed(2); //multipling the rate with amount and setting max two numbers after the decimal

    resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;

}