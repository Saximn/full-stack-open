const Filter = ({ searchName, handleSearch }) => {
  return (
    <>
      <p>filter shown with</p>
      <input 
        value={searchName}
        onChange={handleSearch}
      />
    </>
  )
}

export default Filter