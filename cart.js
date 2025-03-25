function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<tr><td colspan="6">Ваш кошик порожній</td></tr>`;
        totalPriceElement.textContent = "0 грн";
        return;
    }

    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" alt="${item.title}" class="cart-img"></td>
            <td><strong>${item.title}</strong></td>
            <td>${item.author}</td>
            <td>${item.price} грн</td>
            <td>
    <div class="quantity-container">
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">➖</button>
        <span id="quantity-${item.id}" class="quantity-value">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">➕</button>
    </div>
</td>


            <td><button onclick="removeFromCart(${item.id})">❌ Видалити</button></td>
        `;
        cartContainer.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toLocaleString("uk-UA") + " грн";
}


// Оновлення кількості товару
function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        } else {
            // Оновлюємо ТІЛЬКИ текст у DOM без перерисовки таблиці
            document.querySelector(`#quantity-${id}`).textContent = item.quantity;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartBadge();

        updateTotalPrice(); // Оновлюємо тільки загальну суму
    }
}
function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    document.getElementById("total-price").textContent = total.toLocaleString("uk-UA") + " грн";
}


// Видалення товару з кошика
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Очистити кошик
function clearCart() {
    localStorage.removeItem("cart");
    updateCartBadge();

    loadCart();
}

// Завантаження кошика при відкритті сторінки
document.addEventListener("DOMContentLoaded", loadCart);

function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge(); // оновлення бейджика при кожному відкритті сторінки
});

function completeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Кошик порожній!");
        return;
    }

    // Отримуємо історію
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

    // Додаємо нову покупку
    history.push({
        date: new Date().toLocaleString(),
        items: cart
    });

    // Зберігаємо
    localStorage.setItem("purchaseHistory", JSON.stringify(history));

    // Очищаємо кошик
    clearCart();

    alert("Дякуємо за покупку!");
}
