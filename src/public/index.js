const socket = io()

socket.on("products", (data) => {
    renderProductos(data)
})

const renderProductos = (products) => {
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ""

    products.forEach(item => {
        const card = document.createElement("div")
        card.innerHTML = `
        <p> ID: ${item.id}</p>
        <p>Titulo: ${item.title}</p>
        <p>Precio: ${item.price}</p>
        <button> Eliminar productos</button>
        `
        contenedorProductos.appendChild(card)
        card.querySelector("button").addEventListener("click", () => {
            eliminarProduct(item.id)
        })

    })
}

const eliminarProduct = (id) => {
    socket.emit("eliminarProducto", id)
}
document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProduct()
})
const agregarProduct = () =>{
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
    }
    socket.emit("agregarProducto", product)
}
