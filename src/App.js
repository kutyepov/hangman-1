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

function Answer({ word }) {
  console.log('word', word);
  console.log(word.length);
  let lines = [

  ]

  for (let i = 0; i < word.length; i++) {
    lines.push(<li>_</li>);
  }

  return (
    <ul>
      {lines}
    </ul>
  );
}

class AnswerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  render() {
    return (
      <div>
        <input type="text" maxlength="1" value={this.state.inputValue} onChange={(e) => {
          this.setState({ inputValue: e.target.value })
        }} />
        <button onClick={() => {
          console.log(this.state.inputValue);
          //this.props.onInputSubmitted(this.state.inputValue);
        }}>Guess</button>
      </div>
    )
  }
}

class HiddenInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  render() {
    return (
      <div>
        <input type="password" value={this.state.inputValue} onChange={(e) => {
          this.setState({ inputValue: e.target.value })
        }} />
        <button onClick={() => {
          this.props.onInputSubmitted(this.state.inputValue);
        }}>Start Game</button>
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  }

  render() {

    return (
      <div className="App">
        <GuessAmount />
        <Hangman />
        <Answer word={this.state.word} />
        <AnswerInput />
        <HiddenInput onInputSubmitted={(word) => {
          this.setState({ word });
        }} />
      </div>
    );
  }
}

export default App;