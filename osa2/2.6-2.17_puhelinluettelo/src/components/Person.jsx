const Person = ({ person, filter, handleRemove }) => {
  if (person.name.toUpperCase().search(filter.toUpperCase())<0) return (<></>)
  return (
    // <p>{person.name} {person.number} <button onClick={handleRemove}>delete</button></p>
    <p>{person.name} {person.number} <button onClick={handleRemove}>delete</button></p>
  )
}

export default Person
