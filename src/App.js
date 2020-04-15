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

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { word, letter, correctlyGuessedLetters } = this.props;
    let lines = []
    console.log(correctlyGuessedLetters);
    //apple
    //["a", "p", "p", "l", "e"]
    // correctlyGuessedLetters
    //['a', 'e']
    let haveWeEverHitElseClause = false;
    for (let i = 0; i < word.length; i++) {
      if (correctlyGuessedLetters.indexOf(word[i]) != -1) {
        lines.push(<li>{word[i]}</li>);
      } else {
        haveWeEverHitElseClause = true;
        lines.push(<li>_</li>);
      }
    }

    if (!haveWeEverHitElseClause) {
      alert('congrats');
    }

    return (
      <ul>
        {lines}
      </ul>
    );
  }
}

class IncorrectLetters extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let wrongLetters = []

    if (correctlyGuessedLetters.indexOf(word[i]) = -1) {
      wrongLettters.push(<li>{word[i]}</li>);
    } else {
    
    }
  
    return (<p>fff</p>)

    }

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
          this.props.onInputSubmitted(this.state.inputValue);
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
      word: '',
      letter: '',
      correctlyGuessedLetters: [],
    }
  }

  render() {

    return (
      <div className="App">
        <GuessAmount />
        <Hangman />
        <IncorrectLetters />
        <Answer word={this.state.word}
          letter={this.state.letter}
          correctlyGuessedLetters={this.state.correctlyGuessedLetters}
        />
        <AnswerInput onInputSubmitted={(letter) => {
          const isThisCorrectLetter = this.state.word.indexOf(letter) !== -1;
          let updatedCorrectlyGuessedLetters = this.state.correctlyGuessedLetters.slice();
          if (isThisCorrectLetter) {
            updatedCorrectlyGuessedLetters.push(letter);
          }
          this.setState({ letter, correctlyGuessedLetters: updatedCorrectlyGuessedLetters });
        }} />
        <HiddenInput onInputSubmitted={(word) => {
          this.setState({ word });
        }} />
      </div>
    );
  }
}

export default App;