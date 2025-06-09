import { useState } from 'react'

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) =>(
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
)

function GiveFeedback({ goodFeedback, neutralFeedback, badFeedback }) {
  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={goodFeedback}></Button>
      <Button text="neutral" onClick={neutralFeedback}></Button>
      <Button text="bad" onClick={badFeedback}></Button>
    </>
  )
}

function Statistics({ goodCount, neutralCount, badCount}) {
  const total = goodCount + neutralCount + badCount;
  const average = total > 0 ? (goodCount - badCount) / total : 0;
  const positive = total > 0 ? goodCount * 100 / total : 0;
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <thead>
          
        </thead>
        <tbody>
          <tr><StatisticLine text="good" value={goodCount}></StatisticLine></tr>
          <tr><StatisticLine text="neutral" value={neutralCount}></StatisticLine></tr>
          <tr><StatisticLine text="bad" value={badCount}></StatisticLine></tr>
          <tr><StatisticLine text="average" value={average}></StatisticLine></tr>
          <tr><StatisticLine text="positive" value={positive + "%"}></StatisticLine></tr>
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => setGood(good => good + 1)
  const handleNeutralFeedback = () => setNeutral(neutral => neutral + 1)
  const handleBadFeedback = () => setBad(bad => bad + 1)

  return (
    <>
      <GiveFeedback 
      goodFeedback={handleGoodFeedback} 
      neutralFeedback={handleNeutralFeedback}
      badFeedback={handleBadFeedback}
      />
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </>
    
  )
}

export default App