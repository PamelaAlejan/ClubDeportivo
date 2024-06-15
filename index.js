import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const __dirname = import.meta.dirname
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))


const pathFile = __dirname + "/data/deportes.json"

// TO DO

// READ

app.get('/deportes', async (req, res) => {
    try {
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)
        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

//CREATE

app.get('/deportes/create', async (req, res) => {
    try {
        const nombre = req.query.nombre
        const precio = req.query.precio
        const newDeporte = {
            nombre: nombre,
            precio: precio,
            id: nanoid()
        }

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)
        todos.push(newDeporte)

        await writeFile(pathFile, JSON.stringify(todos))

        return res.json(todos)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

// DELETE

app.get('/deportes/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const deporte = todos.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "no encontrado" })
        }

        const newDeporte = todos.filter((item) => item.id !== id)

        await writeFile(pathFile, JSON.stringify(newDeporte))
        return res.json(newDeporte)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

//UPDATE

app.get('/deportes/update/:id', async (req, res) => {
    try {

        const id = req.params.id
        const { nombre = "", precio = "" } = req.query

        const stringTodos = await readFile(pathFile, 'utf8')
        const todos = JSON.parse(stringTodos)

        const deporte = todos.find(item => item.id === id)
        if (!deporte) {
            return res.status(404).json({ ok: false, msg: "no encontrado" })
        }

        deporte.nombre = nombre
        deporte.precio = precio

        await writeFile(pathFile, JSON.stringify(todos))
        return res.json(todos)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(' server andando... http://localhost:3000/ '))

