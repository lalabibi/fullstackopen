import axios from 'axios'

// Set API key to environment variable before starting with "npm run dev" !!
// e.g. export VITE_OPENWEATHER_KEY=1234567890abcdef
const apiKey=import.meta.env.VITE_OPENWEATHER_KEY
const baseUrl='https://api.openweathermap.org/data'

// This is version 3.0 of the API, but I seem not to have access
const requestWeatherLatLon = ({lat, lon}) => {
    const request = axios.get(`${baseUrl}/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`)
    return request.then(response => response.data)
}

// Example API call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2647ba50c5b562bf1465f14a6e1e5cd7
// The cca2 field in country data is GB, not UK, but it seems to work
const requestWeather = ({country}) => {
    const apiUrl = `${baseUrl}/2.5/weather?q=${country.capital},${country.cca2}&APPID=${apiKey}`
    console.log('Retrieving weather data using URL:', apiUrl)
    const request = axios.get(apiUrl)
    return request.then(response => response.data)
}

export default { requestWeatherLatLon, requestWeather }
