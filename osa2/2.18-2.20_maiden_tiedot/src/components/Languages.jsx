import Language from './Language'

const Languages = ({languages}) => {
    if (languages==null) return (<></>)
    console.log('Languages: ',languages)

    // Dictionary to array (was not successful doing a for loop inside the return statement!)
    let language_array = []
    for (let key in languages) {
        language_array = language_array.concat(languages[key])
    }

    return (
        language_array.map((language) => (
            <Language key={language} language={language} />
        ))
    )
}

export default Languages
