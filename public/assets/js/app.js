const formAddTodo = document.querySelector('#form-add-todo')
const inputNombre = document.querySelector('#input-nombre')
const inputPrecio = document.querySelector('#input-precio')
const deportesList = document.querySelector('#deportes-list')
const formUpdateTodo = document.querySelector('#form-update-todo')
const inputNombreNuevo = document.querySelector('#input-nombreNuevo')
const inputPrecioNuevo = document.querySelector('#input-precioNuevo')
let idUpdate;



formAddTodo.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = inputNombre.value
    const precio = inputPrecio.value

    const res = await fetch(`/deportes/create?nombre=${nombre}&precio=${precio}`)
    const data = await res.json()
    getDeportes()

})

const getDeportes = async () => {
    const res = await fetch('/deportes')
    const data = await res.json()


    deportesList.innerHTML = ''
    data.forEach(item => {
        deportesList.innerHTML += `
        <li>
        ${item.id} - ${item.nombre} - ${item.precio}
        <button onclick="deleteDeporte('${item.id}')">Eliminar</button>
        </li>
        <button onclick="formUpdate('${item.id}', '${item.nombre}','${item.precio}')">Actualizar</button>
        </li>`
    })
}
getDeportes()

const deleteDeporte = async (id) => {
    const res = await fetch(`/deportes/delete/${id}`)
    const data = await res.json()

    getDeportes()
}

const formUpdate = (id, nombre, precio) => {
    console.log(id, nombre, precio)
    inputNombreNuevo.value = nombre
    inputPrecioNuevo.value = precio
    idUpdate = id

}

formUpdateTodo.addEventListener('submit', async (event) => {
    event.preventDefault()

    const nombreNuevo = inputNombreNuevo.value
    const precioNuevo = inputPrecioNuevo.value
    const res = await fetch(`/deportes/update/${idUpdate}?nombre=${nombreNuevo}&precio=${precioNuevo}`)
    const data = await res.json()

    getDeportes()

})


