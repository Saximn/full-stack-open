const express = require("express")
const morgan = require("morgan")

morgan.token("person", (res) => JSON.stringify(res.body))

const app = express()

app.use(morgan(':method :url :status :res[content-length]- :response-time ms :person'))
app.use(express.static("dist"))

app.get(morgan())

const MAXID = 1000000
const generateId = () => {
    let id;
    do {
        id = Math.floor(Math.random() * MAXID);
    } while (persons.some(p => Number(p.id) === id));
    return id.toString();
}


app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>")
})

app.get("/info", (req, res) => {
    const contactInfo = `Phonebook has info for ${persons.length} people`
    const currentTime = new Date().toString()
    res.send(`${contactInfo}<br><br>${currentTime}`)
}) 

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    console.log(body)
    console.log("name: " + body.name + "number:" +  body.number)

    if (!body.name || !body.number) { 
        return res.status(400).json({
            error: "name and number must both be filled"
        })
    }
    if (persons.some(p => p.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        "id": generateId(),
        "name": body.name,
        "number": body.number
    }

    persons = persons.concat(person)

    console.log(`persons length: ${persons.length}`)
    res.json(person)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})