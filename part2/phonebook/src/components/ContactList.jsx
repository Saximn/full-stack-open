
const ContactList = ({ persons, handleDelete }) => {
  const names = persons.map(person =>
    <p key={person.id}>
      {person.name} 
      {" "}
      {person.number}
      {" "}
      <button onClick={() => handleDelete(person.id)}>
        delete
      </button>
    </p>
  )
  return (
    <>
      {names}
    </>
    
  )
}

export default ContactList