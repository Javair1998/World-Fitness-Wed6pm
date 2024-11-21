// 
// Names: Tavaughn Henry, Aljermaine Hutchinson , Nswain Shakespeare and Roxann Jahnson
// ID#: 2305252 , 2205641 , 2006054 , 2306621
// Class Day and Time: Wednesday 6pm - 8pm 

//Cart
// a.	Product List (Using Arrays & Objects)
// i.	Create an array of product objects in JavaScript. Each product should have:
    // `name`
    // `price`
    // `description`
    // `image`
// b.	An updated product list must be kept on localStorage, as AllProducts. 
// c.	Display the product list dynamically on the website. 
// d.	Each product should have an “Add to Cart” button.
// e.	Add to Cart:
// i.	Shopping Cart (localStorage and Objects)
// 1.	When a user clicks the “Add to Cart” button, add the selected product to the user’s shopping cart. 
// 2.	Shopping cart must include, product details along with the taxes, discounts, subtotal and current total cost. 

// Array of products
const products = [
    { name: 'Treadmill', price: 60000, description: 'High-quality treadmill for home workouts', image: 'treadmill.jpg' },
    { name: 'Dumbell', price: 20000, description: 'Adjustable dumbbells for strength training', image: 'dumbell.jpg' },
    { name: 'Flooring-mat', price: 7500, description: 'Comfortable flooring mat for workouts', image: 'Flooring-mat- 12pieces.jpg' },
    { name: 'Roller set', price: 5500, description: 'Foam roller set for muscle recovery', image: 'Roller set.jpg' },
    { name: 'Scale', price: 3000, description: 'Digital scale for weight measurement', image: 'scale.jpg' },
    { name: 'Pullup Bar', price: 4570, description: 'Sturdy pull-up bar for home use', image: 'Pullup Bar.jpg' },
    { name: 'RitFit-Single-Resistance-Exercise-Band', price: 3000, description: 'Single resistance band for resistance training', image: 'RitFit-Single-Resistance-Exercise-Band.jpg' },
    { name: 'Workout-gloves', price: 2000, description: 'Comfortable gloves for weightlifting', image: 'Workout-gloves.jpg' },
    { name: 'Yoga-mat', price: 4000, description: 'Non-slip yoga mat for yoga sessions', image: 'yoga-mat.jpg' },
    { name: 'Abs-Muscle-Stimulator', price: 8000, description: 'Stimulator for abdominal workouts', image: 'Abs-Muscle-Stimulator.jpg' },
    { name: 'Kettlebell', price: 10000, description: 'Kettlebell for various workouts', image: 'kettlebell.jpg' },
    { name: 'Flat-bench', price: 50000, description: 'Flat bench for weight training', image: 'Flat-bench.jpg' },
];
// Add the products to local storage 
localStorage.setItem('AllProducts', JSON.stringify(products));


//Display Items 
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');
    let cartItems;
    
    try {
        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    } catch (e) {
        console.error('Error parsing cart items:', e);
        cartItems = [];
        localStorage.setItem('cartItems', '[]');
    }

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="../Assets/${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p>Price: $${product.price.toLocaleString()}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productContainer.appendChild(productDiv);

        //"Add to Cart" button
        productDiv.querySelector('.add-to-cart').addEventListener('click', () => {
            addToCart(product);
        });
    });
    // Add the products to the cart 
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }
    //Display on Cart
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        const itemCount = {};

        cartItems.forEach(item => {
            const li = document.createElement('li');
    
            const img = document.createElement('img');
            img.src = `../Assets/${item.image}`;
            img.alt = item.name;
    
            li.appendChild(img);
            li.appendChild(document.createTextNode(` ${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toLocaleString()}`));
            cartItemsContainer.appendChild(li);
    
            subtotal += item.price * item.quantity;
        });
        
// Display the total price

        for (const itemName in itemCount) {
            const item = itemCount[itemName];
            const total = item.price * item.quantity;
            subtotal += total;

            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span class="cart-header">${item.name}</span>
                <span>Price: $${item.price.toLocaleString()}</span>
                <span>Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)"></span>
                <span>Subtotal: $${total.toLocaleString()}</span>
                <button onclick="removeItem('${item.name}')">Remove</button>
            `;
            cartItemsContainer.appendChild(li);
        }

        const tax = subtotal * 0.15; // 15% tax
        const discount = subtotal * 0.10; // 10% discount
        const total = subtotal + tax - discount;
    
        const summary = document.createElement('div');
        summary.innerHTML = `
            <p>Subtotal: $${subtotal.toLocaleString()}</p>
            <p>Tax (15%): $${tax.toLocaleString()}</p>
            <p>Discount (10%): -$${discount.toLocaleString()}</p>
            <p>Total: $${total.toLocaleString()}</p>
        `;
        cartItemsContainer.appendChild(summary);
    }
    

    // Checkout button
    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        window.location.href = "Cart Page.html";
    });

    // Cancel button
    const cancelButton = document.getElementById('cancel-btn');
    cancelButton.addEventListener('click', () => {
        cartItems = [];
        localStorage.removeItem('cartItems');
        renderCart();
    });

    // Exit button
    const exitButton = document.getElementById('exit-btn');
    exitButton.addEventListener('click', () => {
        window.location.href = "Home.html";
    });

    renderCart();
});