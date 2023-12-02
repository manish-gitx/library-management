    let inventory = [];

    // Load inventory from local storage
    function loadInventory() {
        const storedInventory = localStorage.getItem('inventory');
        if (storedInventory) {
            inventory = JSON.parse(storedInventory);
            updateTable();
        }
    }

    // Save inventory to local storage
    function saveInventory() {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }

    function addItem() {
        const itemName = document.getElementById('itemName').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (itemName && !isNaN(quantity) && quantity > 0) {
            const existingItemIndex = inventory.findIndex(item => item.name === itemName);

            if (existingItemIndex !== -1) {
                // Item already exists, update quantity
                inventory[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                inventory.push({ name: itemName, quantity: quantity });
            }

            updateTable();
            saveInventory();
        }

        // Clear input fields
        document.getElementById('itemName').value = '';
        document.getElementById('quantity').value = '';
    }

    function updateTable() {
        const table = document.getElementById('inventoryTable');
        // Clear existing rows
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Add rows with data from the inventory
        inventory.forEach(item => {
            if (item.quantity > 0) { // Display only items with quantity greater than 0
                const row = table.insertRow(-1);
                const nameCell = row.insertCell(0);
                const quantityCell = row.insertCell(1);
                const actionCell = row.insertCell(2);

                nameCell.textContent = item.name;
                quantityCell.textContent = item.quantity;

                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.onclick = () => increaseQuantity(item.name);
                actionCell.appendChild(increaseButton);

                const decreaseButton = document.createElement('button');
                decreaseButton.textContent = '-';
                decreaseButton.onclick = () => decreaseQuantity(item.name);
                actionCell.appendChild(decreaseButton);
            }
        });
    }

    function increaseQuantity(itemName) {
        const index = inventory.findIndex(item => item.name === itemName);
        if (index !== -1) {
            inventory[index].quantity += 1;
            updateTable();
            saveInventory();
        }
    }

    function decreaseQuantity(itemName) {
        const index = inventory.findIndex(item => item.name === itemName);
        if (index !== -1 && inventory[index].quantity > 0) {
            inventory[index].quantity -= 1;
            updateTable();
            saveInventory();
        }
    }

    // Function to search items based on input
    function searchItems() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filteredInventory = inventory.filter(item => item.quantity > 0 && item.name.toLowerCase().includes(searchTerm));
        updateTableWithSearch(filteredInventory);
    }

    // Function to update table with search results
    function updateTableWithSearch(filteredInventory) {
        const table = document.getElementById('inventoryTable');
        // Clear existing rows
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Add rows with data from the filtered inventory
        filteredInventory.forEach(item => {
            const row = table.insertRow(-1);
            const nameCell = row.insertCell(0);
            const quantityCell = row.insertCell(1);
            const actionCell = row.insertCell(2);

            nameCell.textContent = item.name;
            quantityCell.textContent = item.quantity;

            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.onclick = () => increaseQuantity(item.name);
            actionCell.appendChild(increaseButton);

            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.onclick = () => decreaseQuantity(item.name);
            actionCell.appendChild(decreaseButton);
        });
    }

    // Load inventory from local storage on page load
    window.addEventListener('load', loadInventory);
