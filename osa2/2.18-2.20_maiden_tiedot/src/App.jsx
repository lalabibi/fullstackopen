import { useEffect, useState } from 'react'
import CountryForm from './components/CountryForm'
import Countries from './components/Countries'
import countryService from './services/countries'

function App() {
  const [country,     setCountry]     = useState('')
  const [countries,   setCountries]   = useState([])
  const [showCountry, setShowCountry] = useState(null)


  // Retrieve country data from REST server to variable countries
  useEffect(() => {
      console.log("Retrieving all country data from backend server...")
      countryService
      .getAll()
          .then(countriesReceived => {
            const count = countriesReceived.length
            console.log(`Retrieved ${count} country entries!`)
            setCountries(countriesReceived)
          })
          .catch(error => { alert('Failed to retrieve country data from server!') })
  }, [])


  const handleCountryChange = (event) => {
      console.log('country', event.target.value)
      setCountry(event.target.value)
      setShowCountry(null)
  }


  const handleCountryButton = (country) => {
      console.log('Button pressed to show', country.name.common)
      setShowCountry(country)
  }


  const filterString = country.toUpperCase()
  const filteredCountries = countries.filter((country) => country.name.common.toUpperCase().search(filterString) >= 0 )


  return (
    <>
    <CountryForm country={country} handleCountryChange={handleCountryChange} />
    <Countries countries={filteredCountries} handleCountryButton={handleCountryButton} showCountry={showCountry} />
    </>
  )
}

export default App
