import Languages      from './Languages'
import Flag           from './Flag'
import ShowWeather    from './ShowWeather'

const Countrydetails = ({country}) => {
    if (country==null) return (<></>)
    console.log('Displaying details of country:', country.name.common)

    return (
        <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
        <Languages languages={country.languages} />
        </ul>
        <Flag flag_url={country.flags['png']} />
        <ShowWeather country={country} />
        </>
    )
}

export default Countrydetails
