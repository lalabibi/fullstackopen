import { useState } from 'react'

const StatisticsLine = (props) => {
  return (
    <>
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
    </>
  )
}

const Statistics = (props) => {
      let all=props.good+props.neutral+props.bad
      if (all == 0) return <p>No feedback given</p>
      let positive=100*props.good/all
      return (
          <>
          <h2>statistics</h2>
          <table>
            <tbody>
              <StatisticsLine text="good" value={props.good} />
              <StatisticsLine text="neutral" value={props.neutral} />
              <StatisticsLine text="bad" value={props.bad} />
              <StatisticsLine text="all" value={all} />
              <StatisticsLine text="average" value={(props.good-props.bad)/all} />
              <StatisticsLine text="positive" value={positive.toString()+" %"} />
            </tbody>
          </table>
          </>
      )
}

const Button = (props) => {
  return (
      <button onClick={() => props.method(props.counter + 1)}>{props.text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" counter={good} method={setGood} />
      <Button text="neutral" counter={neutral} method={setNeutral} />
      <Button text="bad" counter={bad} method={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
