// TODO add border for the menu
// TODO make a way to input and track expenses
// TODO make a way to input and track incomes
// TODO make a way to view and analyze spending
// TODO make a way to set allotments/budget goals
// TODO make input form 
// TODO create categories for the types of expenses
// TODO allow modification of the categories for future changes
// TODO make a storage for expense categories
// TODO make expense categories editable
// TODO Make a summary update

// Retrieves the expense information provided by user from the form
const expenseSubmit = document.getElementById('expense-submit');

expenseSubmit.addEventListener("click", function(event) {
    event.preventDefault;

    const expenseAmount = document.getElementById('expense-amount');
    const validCurrency = verifyCurrency(expenseAmount.value)

    // Add bubble explaining error and use visibility to hide it
    if (!validCurrency) {
        return;
    }

    // get required elements
    const expenseDate = document.getElementById('expense-date');
    const expenseSource = document.getElementById('expense-source');
    const expenseCategory = document.getElementById('expense-category');
    const expenseTable = document.getElementById('expense-table');

    // get the values from the form
    const inputArray = [expenseDate, expenseSource, expenseAmount, expenseCategory];

    // Create the new row with data
    row = newRow(inputArray, () => newRemoveButton(expenseTable, 'expense-total', 2));

    // Add the row to the table
    expenseTable.appendChild(row);

    amountSum(expenseTable, 'expense-total', 2);

    clearInputs(inputArray);
})

// Retrieves the income information provided by user from the form
const incomeSubmit = document.getElementById('income-submit');

incomeSubmit.addEventListener("click", function(event) {
    event.preventDefault;

    // get required elements
    const incomeSource = document.getElementById('income-source');
    const incomeAmount = document.getElementById('income-amount');
    const incomeTable = document.getElementById('income-table');

    // Get the values of the form
    const inputArray = [incomeSource, incomeAmount];

    // Create new row with data
    row = newRow(inputArray, () => newRemoveButton(incomeTable, 'income-total', 1));

    // Add the new row to the table
    incomeTable.appendChild(row);

    amountSum(incomeTable, 'income-total', 1);

    // Clear out the input form
    clearInputs(inputArray);
})

// Makes a new row with input values and remove button to be appended to a table
function newRow (inputArray, removeButton) {
    // Create a new row
    const row = document.createElement('tr');
    
    // Add cells with data
    for (let y = 0; y < inputArray.length; y++) {
        newestCell = newCell(inputArray[y].value);
        row.appendChild(newestCell);
    }
    
    // Add a remove button cell
    row.appendChild(removeButton());

    return row;
}

// Makes a new cell with text
function newCell (data) {
    // Create a new cell
    const cell = document.createElement('td');

    // add the contents of the cell
    cell.textContent = data;

    return cell;
}

// Creates a button that will remove a row from the specified table
function newRemoveButton (table, totalField, sumCol) {
    const removeButton = document.createElement('button');
    const cell = document.createElement('td');
    
    removeButton.className = "remove-button";
    removeButton.textContent = '🗑';

    removeButton.addEventListener('click', function(e) {
        // Select the row where the remove button is located
        const row = e.target.parentElement.parentElement;

        // Remove the row from the table
        row.parentElement.removeChild(row);

        // Update the running sum
        amountSum(table, totalField, sumCol);
    })

    cell.appendChild(removeButton);

    return cell;
}

// Clears any inputs
function clearInputs (inputArray) {
    // clear all input fields in the array
    for (let x = 0; x < inputArray.length; x++) {
        inputArray[x].value = "";
    }
}

// Adds the amounts within the specified column in the table and returns the sum
function amountSum (table, totalLocation, sumCol) {
    // Get the required rows from the table and the total line
    const rows = table.getElementsByTagName('tr');
    const total = document.getElementById(totalLocation).firstChild;

    // clear the total line and sum
    total.textContent = '';
    let sum = 0;

    // move through the column to sum up
    for (let i = 1; i < rows.length; i++) {
        // Get the row
        const cells = rows[i].getElementsByTagName('td');

        // Get the Amount cell
        const cell = cells[sumCol];
        
        // Add the value to the sum
        sum += parseInt(cell.textContent);
    }

    // TODO change the text to whichever total is being calculated
    // TODO allow the sum to have 2 decimal points
    // display the new sum on the total line
    total.textContent = "Total Income: $" + sum;
}

function verifyCurrency (value) {
    const regex = /^\d+(\.\d{1,2})?$/;

    return regex.test(value)
}