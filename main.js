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

    // get required elements
    const expenseDate = document.getElementById('expense-date');
    const expenseSource = document.getElementById('expense-source');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');
    const expenseTable = document.getElementById('expense-table');

    // get the values from the form
    const date = expenseDate.value;
    const source = expenseSource.value;
    const amount = expenseAmount.value;
    const category = expenseCategory.value;

    // reset the values in the form
    expenseDate.value = '';
    expenseSource.value = '';
    expenseAmount.value = '';
    expenseCategory.value = '';

    // Create a new row
    const row = document.createElement('tr');

    // Create ellse for the row
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');
    const removeButton = document.createElement('button');

    // Add the values from the form to the cells
    cell1.textContent = date;
    cell2.textContent = source;
    cell3.textContent = amount;
    cell4.textContent = category;
    removeButton.className = "remove-button";
    removeButton.textContent = '🗑';

    removeButton.addEventListener('click', function(e) {
        // Select the row where the remove button is located
        const row = e.target.parentElement.parentElement;

        // Remove the row from the table
        row.parentElement.removeChild(row);

        // Update the running sum
        amountSum(expenseTable, 'expense-total', 2);
    })

    // Add the cells and button to the new row
    cell5.appendChild(removeButton);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    // Add the row to the table
    expenseTable.appendChild(row);

    amountSum(expenseTable, 'expense-total', 2);
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
    const source = incomeSource.value;
    const amount = incomeAmount.value;

    // Clear out the input form
    incomeSource.value = "";
    incomeAmount.value = "";

    // Create a new row
    const row = document.createElement('tr');

    // Create cells for the row
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const removeButton = document.createElement('button');

    // Add the values from the form to the cells
    cell1.textContent = source;
    cell2.textContent = amount;
    removeButton.className = "remove-button";
    removeButton.textContent = '🗑';

    removeButton.addEventListener('click', function(e) {
        // Select the row where the remove button is located
        const row = e.target.parentElement.parentElement;

        // Remove the row from the table
        row.parentElement.removeChild(row);

        // Update the running sum
        amountSum(incomeTable, 'income-total', 1);
    })

    // Add the cells and button to the row
    cell3.appendChild(removeButton);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);

    // Add the new row to the table
    incomeTable.appendChild(row);

    amountSum(incomeTable, 'income-total', 1);
})

function amountSum (table, totalLocation, sumCol) {
    // Get the required rows from the table and the total line
    const rows = table.getElementsByTagName('tr');
    const total = document.getElementById(totalLocation).firstChild;

    // clear the total line and sum
    total.textContent = '';
    let sum = 0;

    // move through the column to sum up
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');

        const cell = cells[sumCol];
        
        sum += parseInt(cell.textContent);
    }

    // display the new sum on the total line
    total.textContent = "Total Income: $" + sum;
}

function verifyCurrency () {
    const regex = /^\d+(\.\d{1,2})?$/;
}