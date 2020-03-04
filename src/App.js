import React from 'react';
import logo from './logo.svg';
import './App.css';

function GuessAmount({ guesses = [] }) {
  return (
    <ul>
      {guesses.map(({ guess_letter }) => (
        <li>
          {guess_letter}
        </li>
      ))}
    </ul>
  );
}

function Hangman() {
  return (
    <p>Hangman</p>
  )
}

function Answer() {
  return (
    <ul>
      <li>Letter</li>
    </ul>
  );
}

class AnswerInput extends React.Component {
  render() {
    return (
      <input />
    )
  }
}

class HangmanContainer extends React.Component {
  constructor(props) {
    this.state = {};
  }

  render() {
    return (
     <div>
        <GuessAmount />
        <Hangman />
     </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;