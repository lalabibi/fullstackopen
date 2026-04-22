import Countrylist    from './Countrylist'
import Countrydetails from './Countrydetails'

const Countries = ({countries, handleCountryButton, showCountry}) => {
    console.log(`Displaying ${countries.length} countries`)

    if (countries==null)       return (<></>)
    if (countries.length==0)   return (<></>)
    if (countries.length > 10) return("Too many matches, specify another filter")
    if (countries.length==1)   return (
        <Countrydetails country={countries[0]} />
    )

    return (
        <>
        <Countrylist countries={countries} handleCountryButton={handleCountryButton} />
        <Countrydetails country={showCountry} />
        </>
    )
}

export default Countries
