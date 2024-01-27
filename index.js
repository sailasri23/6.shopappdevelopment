// Function to update item details based on selected category
function updateItemDetails() {
    const category = document.getElementById('category').value;
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('expense');

    switch (category) {
        case 'Eclairs':
            descriptionInput.value = 'Chocolate';
            priceInput.value = 2;
            break;
        case 'cooldrink':
            descriptionInput.value = 'Cooldrink';
            priceInput.value = 10;
            break;
        case 'Milkybar':
            descriptionInput.value = 'Chocolate';
            priceInput.value = 10;
            break;
        case 'Lays':
            descriptionInput.value = 'Chips';
            priceInput.value = 5;
            break;
        case 'Lollypops':
            descriptionInput.value = 'Candy';
            priceInput.value = 2;
            break;
        default:
            descriptionInput.value = '';
            priceInput.value = '';
    }
}
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
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

    axios.post('https://crudcrud.com/api/ba051c2d01df4a0ebead496679f6fe70/sellersdashboard', expenseData)
        .then((response) => {
            showscreen(response.data);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>";
            console.log(err);
        });
}
document.getElementById('category').addEventListener('change', updateItemDetails);
window.addEventListener("DOMContentLoaded", () => {
    axios.get('https://crudcrud.com/api/ba051c2d01df4a0ebead496679f6fe70/sellersdashboard')
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showscreen(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
// Function to display an item on the screen
function showscreen(expenseData) {
    const parentele = document.getElementById("userList");
    const childele = document.createElement('li');

    childele.textContent = `${expenseData.category} - ${expenseData.description} - Price: ${expenseData.price} - Quantity: ${expenseData.quantity}`;

    const buy1button = document.createElement('input');
    buy1button.type = "button";
    buy1button.value = "buy1";
    buy1button.onclick = () => {
        handleBuyAction(expenseData._id, expenseData.quantity - 1, expenseData.category, expenseData.description, expenseData.price);
    };

    const buy2button = document.createElement('input');
    buy2button.type = "button";
    buy2button.value = "buy2";
    buy2button.onclick = () => {
        handleBuyAction(expenseData._id, expenseData.quantity - 2, expenseData.category, expenseData.description, expenseData.price);
    };

    const buy3button = document.createElement('input');
    buy3button.type = "button";
    buy3button.value = "buy3";
    buy3button.onclick = () => {
        handleBuyAction(expenseData._id, expenseData.quantity - 3, expenseData.category, expenseData.description, expenseData.price);
    };

    childele.appendChild(buy1button);
    childele.appendChild(buy2button);
    childele.appendChild(buy3button);

    parentele.appendChild(childele);
}
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
    axios.put(`https://crudcrud.com/api/ba051c2d01df4a0ebead496679f6fe70/sellersdashboard/${itemId}`, updatedData)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

