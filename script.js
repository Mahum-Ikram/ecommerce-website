let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(item, price) {
    if (cart[item]) {
        cart[item].quantity++;
    } else {
        cart[item] = { price, quantity: 1 };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

function loadCart() {
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    for (let item in cart) {
        let li = document.createElement('li');
        li.innerHTML = `${item} - $${cart[item].price} x ${cart[item].quantity} 
                        <button onclick="removeFromCart('${item}')">Remove</button>`;
        cartItems.appendChild(li);
        total += cart[item].price * cart[item].quantity;
    }

    cartTotal.innerText = "Total: $" + total;
}

function removeFromCart(item) {
    if (cart[item].quantity > 1) {
        cart[item].quantity--;
    } else {
        delete cart[item];
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

if (document.getElementById('cart-items')) {
    loadCart();
}

updateCartCount();
