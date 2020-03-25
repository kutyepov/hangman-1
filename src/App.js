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
    <img src='http://4.bp.blogspot.com/-6xqP75TYEUk/UDAk41KvIfI/AAAAAAAAAqU/kihmttv7iPg/s1600/Hangman.png'></img>
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
      <input type="text" maxlength = "1"></input>
    )
  }
}

class HiddenInput extends React.Component {
  render() {
    return (
    <div>
      <input type="password"></input>
      <button>Start Game</button>
    </div>
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
     <GuessAmount />
     <Hangman />
     <Answer />
     <AnswerInput />
     <HiddenInput />
    </div>
  );
}

export default App;