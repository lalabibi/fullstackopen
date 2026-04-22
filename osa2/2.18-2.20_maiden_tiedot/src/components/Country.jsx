const Country = ({country, handleCountryButton}) => {
    return (
      <div>{country.name.common} <button onClick={handleCountryButton}>Show</button></div>
    )
}

export default Country
