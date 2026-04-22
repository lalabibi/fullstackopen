import Person       from './Person'

const Persons = ({ persons, filter, handleRemove }) => {
    return (
          persons.map((person) => (
          <Person key={person.id} person={person} filter={filter} handleRemove={() => handleRemove(person.id)}/>
          ))
    )
}

export default Persons
