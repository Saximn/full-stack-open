import axios from "axios"
const baseUrl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log("getAll is called from persons.js")
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log(`removed person with id ${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }