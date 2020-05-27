import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

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

function Hangman(props) {
  return (
    <img src={'./images/hang' + props.hang + '.png'}></img>
  )
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { word, letter, correctlyGuessedLetters } = this.props;
    let lines = [];
    // let wrongLetters = this.props.wrongLetters.length;
    console.log(correctlyGuessedLetters);
    //apple
    //["a", "p", "p", "l", "e"]
    // correctlyGuessedLetters
    //['a', 'e']
    let haveWeEverHitElseClause = 0;
    for (let i = 0; i < word.length; i++) {
      if (correctlyGuessedLetters.indexOf(word[i]) != -1) {
        lines.push(<li>{word[i]}</li>);
        ++haveWeEverHitElseClause;
      } else {
        lines.push(<li>_</li>);
      }
    }

    console.log(haveWeEverHitElseClause);
    if (haveWeEverHitElseClause >= word.length + 1) {
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
    let word = this.props.word;
    let correctlyGuessedLetters = this.props.correctlyGuessedLetters;
    let wrongLetters = this.props.wrongLetters;

    console.log(wrongLetters.length);

    if (wrongLetters.length > 7) {
      alert("You Lose");
      window.location.reload(false);
    }

    return (
      <div>
        <span>Wrong Letters:</span>
        {
          wrongLetters
        }
      </div>
    )

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
        <input type="text" maxLength="1" value={this.state.inputValue} onChange={(e) => {
          this.setState({ inputValue: e.target.value })
        }} />
        <Button onClick={() => {
          console.log(this.state.inputValue);
          this.props.onInputSubmitted(this.state.inputValue);
        }}>Guess</Button>
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
          this.setState({ inputValue: e.target.value.replace(' ', '') })
        }} />
        <Button onClick={() => {
          if (this.state.inputValue.length >= 0) {
            this.props.onInputSubmitted(this.state.inputValue);
          }
        }}>Start Game</Button>
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
      word: 'x',
      letter: '',
      correctlyGuessedLetters: [],
      wrongLetters: [],
    };
  }

  render() {

    return (
      <div className="App">
        <GuessAmount />
        <Hangman hang={this.state.wrongLetters.length} />
        <IncorrectLetters
          correctlyGuessedLetters={this.state.correctlyGuessedLetters}
          word={this.state.word}
          wrongLetters={this.state.wrongLetters}
        />
        <Answer
          word={this.state.word}
          letter={this.state.letter}
          correctlyGuessedLetters={this.state.correctlyGuessedLetters}
        />
        <AnswerInput onInputSubmitted={(letter) => {
          const isThisCorrectLetter = this.state.word.indexOf(letter) !== -1;
          let updatedCorrectlyGuessedLetters = this.state.correctlyGuessedLetters.slice();
          let updatedIncorrectlyGuessedLetters = this.state.wrongLetters.slice();

          if (isThisCorrectLetter) {
            updatedCorrectlyGuessedLetters.push(letter);
          } else {
            updatedIncorrectlyGuessedLetters.push(letter);
          }
          this.setState({
            letter,
            correctlyGuessedLetters: updatedCorrectlyGuessedLetters,
            wrongLetters: updatedIncorrectlyGuessedLetters,
          });
        }} />
        <HiddenInput onInputSubmitted={(word) => {
          this.setState({ word });
        }} />
      </div>
    );
  }
}

export default App;