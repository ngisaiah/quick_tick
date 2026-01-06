const deleteBtn = document.querySelectorAll('.del')
const favIcon = document.querySelectorAll('.fav-icon')
const favoritesBody = document.querySelector("table.favorites-table tbody");

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

document.addEventListener("click", async (el) => {
    if (!el.target.classList.contains("fav-icon")) return;

    const icon = el.target;
    const row = icon.closest("tr");
    const coinId = row.dataset.id;

    const isFavorited = icon.classList.contains("fa-solid");

    // UI toggle
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");

    const mainTableBody = document.querySelector(".crypto-table tbody");
    const favoritesTableBody = document.querySelector(".favorites-table tbody");

    if (isFavorited) {
        // removing favorite = move back
        mainTableBody.appendChild(row);
    } else {
        // adding favorite = move to favorites
        favoritesTableBody.appendChild(row);
    }

    // Save to DB
    await fetch("/dashboard/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            coinId,
            favorite: !isFavorited // true = add & false = remove
        })
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const mainTableBody = document.querySelector(".crypto-table tbody");
    const favoritesTableBody = document.querySelector(".favorites-table tbody");

    // If page doesnt include tables return - remove when tables added to Dashboard
    if (!mainTableBody || !favoritesTableBody) return;

    // Find all rows that are already favorited (solid star)
    const favoriteRows = mainTableBody.querySelectorAll("tr .fav-icon.fa-solid");

    favoriteRows.forEach(icon => {
        const row = icon.closest("tr");
        favoritesTableBody.appendChild(row);
    });
});

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('dashboard/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// light / dark mode toggle

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        document.documentElement.classList.remove("dark");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

// Apply default on page load
let currentTheme = localStorage.getItem("theme") || "dark"; // default dark
applyTheme(currentTheme);

// Toggle button click
themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
});