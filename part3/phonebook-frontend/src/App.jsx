import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import ContactList from "./components/ContactList"
import Notification from "./components/Notification"
import personService from "./services/persons"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({ message: null, error:false })

  useEffect(() => {
    personService.getAll()
    .then(persons => setPersons(persons))
  }, [])

  const handleSearch = (e) => setSearchName(e.target.value)

  const elements = [
    {
      element: "name",
      newElement: newName,
      handleElementChange: (e) => setNewName(e.target.value),
      clearElement: () => setNewName("")
    }, 
    {
      element: "number",
      newElement: newNumber,
      handleElementChange: (e) => setNewNumber(e.target.value),
      clearElement: () => setNewNumber("")
    }
  ]

  // remove person where person.id = id 
  const removePerson = (id) => {
    const reallyDelete = window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)
    if (!reallyDelete) return
    personService
      .remove(id)
      .then(removedPerson => {
        setPersons(
          persons.filter(person =>
            person.id !== removedPerson.id
          )
        )
      })
  }

  const addPerson = (e) => {
    e.preventDefault()
    // Create new Person object
    const newPerson = Object.fromEntries(
          elements.map(
            ({ element, newElement, clearElement }) =>{
              clearElement();
              return [element, newElement];
            }
          )
        )
    // If newName in persons, confirm whether to change phone number or not
    if (persons.some(p => p.name === newName)) {
      console.log("included");
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook,` +
        `replace the old number with a new one?`
      )
      if (!confirmation) return
      const oldPerson = persons.find(p => p.name === newPerson.name)
      personService
        .update(oldPerson.id, newPerson)
        .then(p => {
          // console.log("before setperson")
          setPersons(
            persons.map(person =>
              person.id !== oldPerson.id ? person : p
            )
          )
          return p
        })
        .then(p => {
          // console.log("before success message")
          setNotificationMessage({
            message: `Updated ${p.name}`,
            error: false
          })
          // console.log("after success message")
          
        })
        .catch(error => {
          setNotificationMessage({ message: `${error.name} is not in the database`, error: true})
        })
        .then(e => {
          setTimeout(() => {
            setNotificationMessage({ message: null, error: false })
          }, 5000)
        })

      return
    }
    console.log("not included")
        
        personService
            .create(newPerson)
            .then(person => {
              setPersons(
                persons.concat(
                  person
                )
              )
              setNotificationMessage(
                `Added ${person.name}`
              )
              console.log("after success message")
              setTimeout(() => {
                setNotificationMessage({ message: null, error: false})
              }, 5000)
            })
    return
  }
  
  // From searchName, only output where name.beginswith(searchName.lowercase())
  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().startsWith(searchName.toLowerCase())
  )
  console.log("persons", persons)
  console.log("filteredPersons", filteredPersons)
  return (
    <div>
      <h2>Phonebook</h2>
      {console.log("after printing phonebook")}
      <Notification message={notificationMessage.message} error={notificationMessage.error} />
      <Filter persons={persons} searchName={searchName} handleSearch={handleSearch} />
      <h3>Add a new person</h3>
      <PersonForm elements={elements} addPerson={addPerson} />
      <h3>Contact List</h3>
      <ContactList persons={filteredPersons} handleDelete={removePerson} />
    </div>
  )
}

export default App
