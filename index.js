// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    // Extract data from the form

    const category = event.target.category.value;
    const description = event.target.description.value;
    const price = event.target.expense.value;
    const quantity = event.target.quantity.value;
    // Data to be sent in the POST request
    const expenseData = {
        category,
        description,
        price,
        quantity
    };
    // POST request to add item
    axios.post('https://crudcrud.com/api/b7ef11747e954a2eba337fb80c9d1eec/sellersdashboard', expenseData)
        .then((response) => {
            showscreen(response.data);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>";
            console.log(err);
        });
}
function showscreen(expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');
    childele.textContent = `${expenseData.category} - ${expenseData.description} - Price: ${expenseData.price} - Quantity: ${expenseData.quantity}`;
    const buy1button = createBuyButton(expenseData, 1);
    const buy2button = createBuyButton(expenseData, 2);
    const buy3button = createBuyButton(expenseData, 3);
 
    childele.appendChild(buy1button);
    childele.appendChild(buy2button);
    childele.appendChild(buy3button);

    parentele.appendChild(childele);
}
// Function to create a buy button with a specific quantity decrement
function createBuyButton(expenseData, decrement) {
    const buyButton = document.createElement('input');
    buyButton.type = "button";
    buyButton.value = `buy${decrement}`;
    buyButton.onclick = () => {
        // Handle the buy action
        handleBuyAction(expenseData._id, expenseData.quantity - decrement, expenseData.category, expenseData.description, expenseData.price);
    };

    return buyButton;
}

// Function to display an item on the screen
function handleBuyAction(itemId, newQuantity, category, description, price) {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = newQuantity;

    const updatedData = {
        category,
        description,
        price,
        quantity: newQuantity,
    };
    // PUT request to update the item quantity
    axios.put(`https://crudcrud.com/api/b7ef11747e954a2eba337fb80c9d1eec/sellersdashboard/${itemId}`, updatedData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/b7ef11747e954a2eba337fb80c9d1eec/sellersdashboard')
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showscreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
