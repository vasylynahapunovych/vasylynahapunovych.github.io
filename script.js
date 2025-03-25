
document.addEventListener("DOMContentLoaded", function () {
    // Додаємо подію для ВСІХ кнопок "Додати в кошик", які є в `index.html`
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            const title = this.dataset.title;
            const price = parseInt(this.dataset.price);
            addToCart(id, title, price);
        });
    });


    const books = [
        { id: 1, title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінг", price: 350 },
        { id: 2, title: "Мистецтво війни", author: "Сунь-цзи", price: 200 },
        { id: 3, title: "1984", author: "Джордж Орвелл", price: 280 },
        { id: 4, title: "Алхімік", author: "Пауло Коельйо", price: 270 },
        { id: 5, title: "Таємничий острів", author: "Жюль Верн", price: 250 },
        { id: 6, title: "Шерлок Голмс", author: "Артур Конан Дойл", price: 650 },
        { id: 7, title: "Великий Гетсбі", author: "Френсіс Скотт Фіцджеральд", price: 470 },
        { id: 8, title: "Гра престолів", author: "Джордж Мартін", price: 900 },
        { id: 9, title: "Місто дівчат", author: "Елізабет Ґілберт", price: 400 },
        { id: 10, title: "За 5 років", author: "Ребекка Сірл", price: 300 },
        { id: 11, title: "Бійцівський клуб", author: "Чак Поланік", price: 370 },
        { id: 12, title: "Четверте крило. Емпіреї. Книга 1", author: "Ребекка Яррос", price: 680 },
        { id: 13, title: "Залізне полум’я. Емпіреї. Книга 2", author: "Ребекка Яррос", price: 790 },
        { id: 14, title: "Змія і Голуб. Книга 1", author: "Шелбі Мег'юрін", price: 390 },
        { id: 15, title: "Кров і мед. Книга 2", author: "Шелбі Мег'юрін", price: 475 },
        { id: 16, title: "Боги й чудовиська. Книга 3", author: "Шелбі Мег'юрін", price: 475 }
    ];

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Автор: ${book.author}</p>
            <p>Ціна: ${book.price} грн</p>
            <button class="add-to-cart" data-id="${book.id}" data-title="${book.title}" data-price="${book.price}">
                Додати в кошик
            </button>
        `;
        bookList.appendChild(bookCard);
    });

    // Додаємо обробник подій для кнопок "Додати в кошик"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            const title = this.dataset.title;
            const price = parseInt(this.dataset.price);
            addToCart(id, title, price);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("book-list");
    if (!bookList) return; // Якщо елемента немає, виходимо

    books.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Автор: ${book.author}</p>
            <p>Ціна: ${book.price} грн</p>
            <button onclick="addToCart(${book.id}, '${book.title}', ${book.price})">Додати в кошик</button>
        `;
        bookList.appendChild(bookCard);
    });
});

function addToCart(id, title, author, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Знайти картку за ID (унікальний через кнопку)
    const bookCard = document.querySelector(`button[onclick*="addToCart(${id},"]`)?.closest(".book-card");
    const img = bookCard?.querySelector("img")?.getAttribute("src") || "";

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, author, price, quantity: 1, img });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();

    // 🔹 Зміна кнопки — колір і текст
    const button = bookCard?.querySelector("button");
    if (button) {
        button.classList.add("added");
        button.textContent = "Додано!";
    }
}


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

document.addEventListener("DOMContentLoaded", () => {
    const recommendedContainer = document.getElementById("recommended-books");

    const books = [
            { id: 1, title: "Гаррі Поттер і філософський камінь", author: "Дж. К. Ролінг", price: 350, img: "images/harrypotter1.jpg" },
            { id: 2, title: "Мистецтво війни", author: "Сунь-цзи", price: 200, img: "images/mscwar.jpg" },
            { id: 3, title: "1984", author: "Джордж Орвелл", price: 280, img: "images/1984go.jpg" },
            { id: 4, title: "Алхімік", author: "Пауло Коельйо", price: 270, img: "images/alhimic.jpg" },
            { id: 5, title: "Таємничий острів", author: "Жюль Верн", price: 250, img: "images/scarb.jpg" },
            { id: 6, title: "Шерлок Голмс", author: "Артур Конан Дойл", price: 650, img: "images/sherlokhoms.jpg" },
            { id: 7, title: "Великий Гетсбі", author: "Френсіс Скотт Фіцджеральд", price: 470, img: "images/big_gedspi.jpg" },
            { id: 8, title: "Гра престолів", author: "Джордж Мартін", price: 900, img: "images/gameoftrons.jpg" },
            { id: 9, title: "Місто дівчат", author: "Елізабет Ґілберт", price: 400, img: "images/citygirls.jpg" },
            { id: 10, title: "За 5 років", author: "Ребекка Сірл", price: 300, img: "images/for5years.jpg" },
            { id: 11, title: "Бійцівський клуб", author: "Чак Поланік", price: 370, img: "images/clubofboyets.jpg" },
            { id: 12, title: "Четверте крило. Емпіреї. Книга 1", author: "Ребекка Яррос", price: 680, img: "images/forthwing.jpg" },
            { id: 13, title: "Залізне полум’я. Емпіреї. Книга 2", author: "Ребекка Яррос", price: 790, img: "images/ironflame.jpg" },
            { id: 14, title: "Змія і Голуб. Книга 1", author: "Шелбі Мег'юрін", price: 390, img: "images/snakeanddove.jpg" },
            { id: 15, title: "Кров і мед. Книга 2", author: "Шелбі Мег'юрін", price: 475, img: "images/bloodandhoney.jpg" },
            { id: 16, title: "Боги й чудовиська. Книга 3", author: "Шелбі Мег'юрін", price: 475, img: "images/godsandmonsters.jpg" },
            { id: 17, title: "У напрямку до нуля", author: "Аґата Крісті", price: 230, img: "images/agatacristi1.jpg" },
            { id: 18, title: "Поїзд о 4:50 з Педдінґтона", author: "Аґата Крісті", price: 230, img: "images/agatacristi2.jpg" },
            { id: 19, title: "Убивство в будинку вікарія", author: "Аґата Крісті", price: 230, img: "images/agatacristi3.jpg" },
            { id: 20, title: "І не лишилось жодного", author: "Аґата Крісті", price: 230, img: "images/agatacristi4.jpg" },
            { id: 21, title: "Вбивство у «Східному експресі»", author: "Аґата Крісті", price: 230, img: "images/agatacristi5.jpg" },
            { id: 22, title: "Убивства за абеткою", author: "Аґата Крісті", price: 230, img: "images/agatacristi6.jpg" },
            { id: 23, title: "Тіло у бібліотеці", author: "Аґата Крісті", price: 230, img: "images/agatacristi7.jpg" },
            { id: 24, title: "Тріснуло дзеркало", author: "Аґата Крісті", price: 230, img: "images/agatacristi8.jpg" }
          ];

    // Випадкові 3 унікальні книги
    const randomIndexes = [];
    while (randomIndexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * books.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Використовуємо саме цикл `for`
    for (let i = 0; i < randomIndexes.length; i++) {
        const book = books[randomIndexes[i]];
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="price">${book.price} грн</p>
            <button onclick="addToCart(${book.id}, '${book.title}', '${book.author}', ${book.price})">Додати в кошик</button>
        `;
        recommendedContainer.appendChild(card);
    }
});


