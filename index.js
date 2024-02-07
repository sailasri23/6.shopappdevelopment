// Function to handle form submission
async function handleFormSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Extract data from the form
    const category = event.target.category.value;
    const description = event.target.description.value;
    const price = event.target.expense.value;
    const quantity = event.target.quantity.value;

    // Construct expense data object
    const expenseData = {
        category,
        description,
        price,
        quantity
    };

    try {
        // Make POST request to create a new expense
        const response =  await axios.post('https://crudcrud.com/api/6df96a71d8524b17878a10a6f13b8fd1/sellersdashboard', expenseData);
        
        // Show the created expense on screen
        showScreen(response.data);
    } catch (err) {
        // Handle errors
        document.body.innerHTML += "<h4> Something went wrong</h4>";
        console.log(err);
    }
}

// Function to display an item on the screen
function showScreen(expenseData) {
    const parentElement = document.getElementById("userList");
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', expenseData._id);
    
    const quantityNode = document.createElement('span');
    quantityNode.classList.add('quantity');
    quantityNode.textContent = `quantity: ${expenseData.quantity}`;
    
    listItem.textContent = `${expenseData.category} - ${expenseData.description} - Price: ${expenseData.price} - `;
    listItem.appendChild(quantityNode);

    // Create buy buttons with different decrements
    const buy1Button = createBuyButton(expenseData, 1);
    const buy2Button = createBuyButton(expenseData, 2);
    const buy3Button = createBuyButton(expenseData, 3);

    // Append buy buttons to the list item
    listItem.appendChild(buy1Button);
    listItem.appendChild(buy2Button);
    listItem.appendChild(buy3Button);

    // Append the list item to the parent element
    parentElement.appendChild(listItem);
}

// Function to create a buy button with a specific quantity decrement
function createBuyButton(expenseData, decrement) {
    const buyButton = document.createElement('input');
    buyButton.type = "button";
    buyButton.value = `Buy ${decrement}`;
    buyButton.onclick =  () => {
        console.log(expenseData.quantity)
        handleBuyAction(expenseData, decrement);
    };
    

    return buyButton;
}
// Function to handle buying an item
async function handleBuyAction(expenseData, decrement) {
    try {
        // Update quantity in expense data
        const updatedData = {
            category: expenseData.category,
            description: expenseData.description,
            price: expenseData.price,
            quantity: expenseData.quantity - decrement,
        };

        // Make PUT request to update the expense
       await axios.put(`https://crudcrud.com/api/6df96a71d8524b17878a10a6f13b8fd1/sellersdashboard/${expenseData._id}`, updatedData);

        // Update expenseData with new quantity
        expenseData.quantity -= decrement;

        // Update displayed quantity on screen
        const quantityNode = document.querySelector(`#userList li[data-id="${expenseData._id}"] .quantity`);
         quantityNode.textContent = `quantity: ${expenseData.quantity}`;
        

    } catch (err) {
        console.log(err);
    }
}

// Window event listener to load expenses on page load
window.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch expenses from API
        const response = await axios.get('https://crudcrud.com/api/6df96a71d8524b17878a10a6f13b8fd1/sellersdashboard');
        
        // Display each expense on screen
        for (let i = 0; i < response.data.length; i++) {
            showScreen(response.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
});
