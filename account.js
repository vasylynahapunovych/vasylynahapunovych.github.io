document.addEventListener("DOMContentLoaded", () => {
    const history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const list = document.getElementById("purchase-history");

    if (history.length === 0) {
        list.innerHTML = "<li>У вас ще немає покупок.</li>";
        return;
    }

    list.innerHTML = "";

    history.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${order.date}</strong>
            <ul>
                ${order.items.map(book => `<li>${book.title} — ${book.quantity} шт.</li>`).join("")}
            </ul>
        `;
        list.appendChild(li);
    });
    
    // Тема (опціонально)
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
        darkModeToggle.checked = true;
    }

    darkModeToggle?.addEventListener("change", () => {
        const isDark = darkModeToggle.checked;
        document.body.classList.toggle("dark", isDark);
        localStorage.setItem("darkMode", isDark);
    });

});

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge(); // оновлення бейджика при кожному відкритті сторінки
});
 