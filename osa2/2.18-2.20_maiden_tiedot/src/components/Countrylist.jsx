import Country from './Country'

const Countrylist = ({countries, handleCountryButton}) => {
    return (
        countries.map((country) => (
            <Country key={country.name.common} country={country} handleCountryButton={() => handleCountryButton(country)} />
        ))
    )
}

export default Countrylist
