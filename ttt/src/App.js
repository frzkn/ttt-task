import React from 'react'
import searchIcon from './images/search.svg'
import './App.css'

function App() {
  const [answer, setAnswer] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [n, setN] = React.useState()

  const submit = () => {
    let N = parseInt(n)
    if (N) {
      if (typeof N == 'number') {
        setAnswer([])
        setLoading(true)
        fetch(`https://terriblytinytask.herokuapp.com/ttt/?n=${n}`)
          .then((response) => response.json())
          .then((data) => {
            return setAnswer(JSON.parse(data))
          })
      } else {
        alert('I dont think thats a number')
      }
    } else {
      alert('User has to enter a number!')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>terribly tiny task</h1>
      </header>
      <main>
        <div className="search">
          <input
            value={n || ''}
            onChange={(e) => setN(e.target.value)}
            placeholder="* User enters a value of N *"
          ></input>
          <button onClick={() => submit()}>
            <img class="search-icon" src={searchIcon} alt="search"></img>
          </button>
        </div>
        {loading && answer.length === 0 && <Spinner></Spinner>}
        {answer.length > 1 && (
          <section className="results fadeInUp">
            <div className="item-header container">
              {answer.length > 1 && <h2 className="table-head">WORD</h2>}
              {answer.length > 1 && <h2 className="table-head">FREQUENCY</h2>}
            </div>
            <div className="item-row container">
              {answer &&
                answer.map((item) => {
                  return [
                    <p className="word-key">{item.key}</p>,
                    <p className="frequency-value">{item.value}</p>
                  ]
                })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function Spinner() {
  return (
    <div className="spinner-bg">
      <div className="spinner"></div>
    </div>
  )
}

export default App
