import { useState, useEffect } from 'react'
import weatherService from '../services/openweather'

const ShowWeather = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const lat = country.latlng[0]
        const lon = country.latlng[1]
        console.log('Weather in',country.capital,'lat',lat,'lon',lon)
        
        weatherService
        .requestWeather({country})
            .then(
                weatherReceived => {
                    console.log('Weather:', weatherReceived)
                    setWeather(weatherReceived)
                }
            )
            .catch(
                error => { alert('Failed to retrieve weather data from server!') }
            )
    }, [country])

    if (weather==null) return (<></>)

    const temperature = -273.15+weather.main.temp
    const wind = weather.wind.speed

    return (
        <>
        <h2>Weather in {country.capital}</h2>
        <div>Temperature {temperature.toFixed(2)} Celsius</div>
        <div>Wind {wind.toFixed(1)} m/s</div>
        </>
    )
}

export default ShowWeather
