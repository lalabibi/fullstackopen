import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  if (props.text.length == 0) return (<></>) // No votes - no winner

  return (
        <>
        <h2>Anecdote with most votes</h2>
        {props.text}<br />
        has {props.votes} votes<br />
        </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Index of selected anecdote, initial index is random
  const initial_anecdote_index=Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(initial_anecdote_index)

  // Array of votes for each anecdote
  const [votes, setVotes]       = useState(Array(anecdotes.length).fill(0))

  // Change to a random anecdote, different from current one
  const setRandom = () => {
      let next_anecdote_index = Math.floor(Math.random() * anecdotes.length)
      if (selected == next_anecdote_index) {
          // Prevent changing to the same index already displaying.
          // That would prevent UI to update and UI gets stuck!
          next_anecdote_index++;
          if (next_anecdote_index >= anecdotes.length) {
              next_anecdote_index = 0; // Wrap around
          }
      }
      console.log("Changing to anecdote index " + next_anecdote_index)
      setSelected(next_anecdote_index)
  }

  // Increment vote for currently displayed anecdote
  const newVote = () => {
      const votes_copy = { ...votes }
      votes_copy[selected]++;
      setVotes(votes_copy);
      console.log("Voting for anecdote " + selected + " results in " + votes_copy[selected] + " votes")
  }

  // Return index of anecdote with most votes (or -1 if no votes yet)
  const mostFavouriteAnecdote = () => {
      let result = -1;
      let max_votes=0;
      let i
      for (i=0; i<anecdotes.length; i++) {
          if (votes[i] > max_votes) {
                max_votes = votes[i];
                result = i;
          }
      }
      return result;
  }

  const winnerIndex = mostFavouriteAnecdote()
  const winnerText = winnerIndex >= 0 ? anecdotes[winnerIndex] : ""
  const winnerVotes = winnerIndex >= 0 ? votes[winnerIndex] : ""

  // Return the page HTML
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br />
      has {votes[selected]} votes<br />
      <Button text="vote" onClick={newVote} />
      <Button text="next anecdote" onClick={setRandom} />

      <Statistics text={winnerText} votes={winnerVotes}/>
    </div>
  )
}

export default App
