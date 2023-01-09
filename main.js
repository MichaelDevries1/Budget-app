regex-previewer.enableCodeLense;

// TODO add border for the menu
// TODO make a way to input and track expenses
// TODO make a way to input and track incomes
// TODO make a way to view and analyze spending
// TODO make a way to set allotments/budget goals
// TODO make input form 
// TODO create categories for the types of expenses
// TODO allow modification of the categories for future changes

// Retrieves the income information provided by user from the form
const incomeSubmit = document.getElementById('income-submit');
const incomeSource = document.getElementById('income-source');
const incomeAmount = document.getElementById('income-amount');
const incomeTable = document.getElementById('income-table');
const incomeTotal = document.getElementById('income-total');

incomeSubmit.addEventListener("click", function(event) {
    event.preventDefault;

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