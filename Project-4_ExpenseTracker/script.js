//DOM Elements
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

//getting prevously stored values and if not it returns empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault(); //to stop the browser from executing its default HTTP request and page reload

  // get form values
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  //pushing transaction details object in the transactions array created above
  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  //storing the data in local storage so that when we refresh the page we get the previously filled data
  localStorage.setItem("transactions", JSON.stringify(transactions));

  //after adding the transaction we need to update teh transaction list and summary
  updateTransactionList();
  updateSummary();

  //setting the form values to default
  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  //creating list element for transaction-list
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
  
    ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
  `;

  return li;
}

function updateSummary() {
  // 100, -50, 200, -200 => 50
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  //here we have got the balance, income and expenses now putting them in the UI
  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

//this the curreny formatter
function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function removeTransaction(id) {
  // filter out the one we wanted to delete
  transactions = transactions.filter((transaction) => transaction.id !== id);

  localStorage.setItem("transcations", JSON.stringify(transactions));

  updateTransactionList();
  updateSummary();
}

// initial render, these functions will be called whenever the page is opend
updateTransactionList();
updateSummary();