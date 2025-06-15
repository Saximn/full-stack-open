
const PersonForm = ({ elements, addPerson }) => {
  // elements: element, newElement, handleElementChange
  return (
    <>
      <form onSubmit={addPerson}>
        {elements.map(element =>
          <div key={element.element}>
          {element.element}: 
          <input 
          id={element.element} 
          value={element.newElement} 
          onChange={element.handleElementChange} 
          />
        </div>
        )}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm