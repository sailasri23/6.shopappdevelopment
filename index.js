async function handleFormSubmit(event) {
    event.preventDefault();

    const category = event.target.category.value;
    const description = event.target.description.value;
    const price = event.target.expense.value;
    const quantity = event.target.quantity.value;

    const expenseData = {
        category,
        description,
        price,
        quantity
    };

    try {
        const response = await axios.post('https://crudcrud.com/api/5300c65fd46d4b839f9569ab8b9190fd/sellersdashboard', expenseData);
        showscreen(response.data);
    } catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>";
        console.log(err);
    }
}

// Function to make the API call for buying an item
async function handleBuyAction(expenseData, decrement) {
    try {
        const updatedData = {
            category: expenseData.category,
            description: expenseData.description,
            price: expenseData.price,
            quantity: expenseData.quantity - decrement,
        };

        // Use Promise.all to perform both PUT and GET requests concurrently
        const [putResponse, getResponse] = await Promise.all([
            axios.put(`https://crudcrud.com/api/5300c65fd46d4b839f9569ab8b9190fd/sellersdashboard/${expenseData._id}`, updatedData),
            axios.get(`https://crudcrud.com/api/5300c65fd46d4b839f9569ab8b9190fd/sellersdashboard/${expenseData._id}`)
        ]);

        // Update the expenseData with the new quantity from the updated GET response
        expenseData.quantity = getResponse.data.quantity;

        // Update the displayed quantity on the screen
        const quantityTextNode = document.querySelector(`#userList li[data-id="${expenseData._id}"] .quantity`);
        if (quantityTextNode) {
            const newQuantity = expenseData.quantity;
            const decrementValue = decrement;

            // Check if newQuantity is defined before updating the text content
            const quantityText = typeof newQuantity !== 'undefined' ? `Quantity: ${newQuantity} ` : `Quantity: undefined `;

            quantityTextNode.textContent = quantityText;
        }

        console.log(putResponse.data);
    } catch (err) {
        console.log(err);
    }
}
// Function to create a buy button with a specific quantity decrement
function createBuyButton(expenseData, decrement) {
    const buyButton = document.createElement('input');
    buyButton.type = "button";
    buyButton.value = `buy${decrement}`;
    buyButton.onclick = async () => {
        await handleBuyAction(expenseData, decrement);
    };

    return buyButton;
}

// Function to display an item on the screen
function showscreen(expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');
    childele.setAttribute('data-id', expenseData._id);
    const quantityTextNode = document.createElement('span');
    quantityTextNode.classList.add('quantity');
    quantityTextNode.textContent = `Quantity: ${expenseData.quantity}`;
    childele.textContent = `${expenseData.category} - ${expenseData.description} - Price: ${expenseData.price} - `;
    childele.appendChild(quantityTextNode);

    const buy1button = createBuyButton(expenseData, 1);
    const buy2button = createBuyButton(expenseData, 2);
    const buy3button = createBuyButton(expenseData, 3);
    const deleteButton = document.createElement('button');

    childele.appendChild(buy1button);
    childele.appendChild(buy2button);
    childele.appendChild(buy3button);

    parentele.appendChild(childele);
}

// Window event listener
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/5300c65fd46d4b839f9569ab8b9190fd/sellersdashboard');
        for (let i = 0; i < response.data.length; i++) {
            showscreen(response.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
});
