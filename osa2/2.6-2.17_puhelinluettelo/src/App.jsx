import { useEffect, useState } from 'react'
import Persons       from './components/Persons'
import PersonForm    from './components/PersonForm'
import Filter        from './components/Filter'
import Notification  from './components/Notification'
import personService from './services/persons'

// Application component : phonebook
const App = () => {
  const [persons,   setPersons]   = useState([]) 
  const [newName,   setNewName]   = useState('a new contact...')
  const [newNumber, setNewNumber] = useState('a new number...')
  const [filter,    setFilter]    = useState('')
  const [statusMessage, setStatusMessage] = useState(null)

  // Retrieve phonebook data from JSON server to state variable "persons"
  useEffect(() => {
    console.log("Retrieving all phonebook data from backend server...")
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        const count = initialPersons.length
        console.log(`Retrieved ${count} phonebook entries!`)
      })
      .catch(error => { alert('Failed to retrieve data from server!') })
  }, [])
  

  // Handle "add" button press
  const handleAddPerson = (event) => {
      event.preventDefault()

      // Create new person object
      const personObject = {
        name:   newName,
        number: newNumber,
  //      id:     String(persons.length + 1)  // !! The server creates the ID !!
      }

      // Check if person exists already and abort with alert in that case
      const index=persons.findIndex((person) => person.name.toUpperCase() === newName.toUpperCase())
      if (index>=0) {          
          console.log('Name', newName, 'already exists')

          // Using + to concatenate strings for alert message box :
          // alert(newName + ' is already added to phonebook')

          if (!window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) return;

          console.log('Changing number for', newName, 'to', newNumber)
          personService
          .update(persons[index].id, personObject)
            .then(returnedPerson => {
              // If send was successful add the person also to frontend
              console.log('Received response from backend:', returnedPerson)
              const changedPersons = persons
              changedPersons[index] = returnedPerson
              setPersons(changedPersons)
              setNewName('')
              setNewNumber('')
              setStatusMessage({ text:`Changed number ${returnedPerson.number} for ${returnedPerson.name}`, color:'green'})
              setTimeout(() => {setStatusMessage(null)}, 4000)
            })
            .catch(error => {
              // alert('Failed to change number!')
              setStatusMessage({text:`Failed to change number for ${newName}`, color:'red'})
              setTimeout(() => {setStatusMessage(null)}, 4000)  
            })
          return
      }

      console.log('Adding person', persons.length + 1, ':', newName, ':', newNumber)

      // Send new person object to backend server
      console.log('Sending new person to backend')
      personService
        .create(personObject)
          .then(returnedPerson => {
            // If send was successful add the person also to frontend
            console.log('Received response from backend:', returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setStatusMessage({ text:`Added ${returnedPerson.name}`, color:'green'})
            setTimeout(() => {setStatusMessage(null)}, 4000)
        })
          .catch(error => {
            // alert('Failed to add person!')
            setStatusMessage({text:`Failed to add ${newName}`, color:'red'})
            setTimeout(() => {setStatusMessage(null)}, 4000)
          })
  }
  

  // Handle "delete" button press
  const handleRemove = (id) => {
    const personName = persons.find(persons => persons.id == id).name
    
    if (!window.confirm(`Delete ${personName} ?`)) return

    console.log('About to remove', personName)
    personService
      .remove(id)
      .then(response => {
        console.log('Response: ', response.statusText)
        // Remove person from local state variable by copying all with different "id"
        const changedPersons = persons.filter((person) => person.id != id)
        setPersons(changedPersons)
        console.log(`${personName} removed!`)
        setStatusMessage({text:`Deleted ${personName}`, color:'green'})
        setTimeout(() => {setStatusMessage(null)}, 4000)
  })
      .catch(error => {
        // alert('Failed to remove person!')
        setStatusMessage({text:`Failed to remove ${personName}`, color:'red'})
        setTimeout(() => {setStatusMessage(null)}, 4000)
      })
  }


  const handleNameChange = (event) => {
    console.log('name', event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    console.log('filter', event.target.value)
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={statusMessage} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <PersonForm newName={newName} newNumber={newNumber} handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} handleRemove={handleRemove} />
    </div>
  )
}


export default App
