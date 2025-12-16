const deleteBtn = document.querySelectorAll('.del')
const favIcon = document.querySelectorAll('.fav-icon')
const favoritesBody = document.querySelector("table.favorites-table tbody");
// const todoItem = document.querySelectorAll('span.not')
// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})


// Array.from(favIcon).forEach((el)=>{
//     el.addEventListener('click', addFavorite)
// })

document.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("fav-icon")) return;

    const icon = e.target;
    const row = icon.closest("tr");
    const coinId = row.dataset.id;

    const isFavorited = icon.classList.contains("fa-solid");

    // UI toggle
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");

    // Save to DB
    await fetch("/coin/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            coinId,
            favorite: !isFavorited // true = add, false = remove
        })
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const mainTableBody = document.querySelector(".crypto-table tbody");
    const favoritesTableBody = document.querySelector(".favorites-table tbody");

    if (!mainTableBody || !favoritesTableBody) return;

    // Find all rows that are already favorited (solid star)
    const favoriteRows = mainTableBody.querySelectorAll(
        "tr .fav-icon.fa-solid"
    );

    favoriteRows.forEach(icon => {
        const row = icon.closest("tr");
        favoritesTableBody.appendChild(row);
    });
});


// Array.from(todoItem).forEach((el)=>{
//     el.addEventListener('click', markComplete)
// })

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
// })

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


// async function markComplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('dashboard/markComplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('dashboard/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }