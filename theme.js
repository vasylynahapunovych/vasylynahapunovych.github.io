// theme.js

// застосовуємо збережену тему при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
        document.body.classList.add("dark");
    }
});

function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// Застосовуємо збережену тему
document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
        document.body.classList.add("dark");
    }

    // Після завантаження DOM — оновити бейджик
    updateCartBadge();
});

