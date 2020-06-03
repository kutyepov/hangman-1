import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function GuessAmount({ guesses = [] }) {
  return (
    <ul>
      {guesses.map(({ guess_letter }) => (
        <li>{guess_letter}</li>
      ))}
    </ul>
  );
}

function Hangman(props) {
  return <img src={'./images/hang' + props.hang + '.png'} alt="" />;
}

class Answer extends React.Component {
  render() {
    const { word, correctlyGuessedLetters } = this.props;
    let lines = [];
    let haveWeEverHitElseClause = 0;
    for (let i = 0; i < word.length; i++) {
      if (correctlyGuessedLetters.indexOf(word[i]) !== -1) {
        lines.push(<li>{word[i]}</li>);
        ++haveWeEverHitElseClause;
      } else {
        lines.push(<li>_</li>);
      }
    }
    if (word.length > 0 && haveWeEverHitElseClause >= word.length) {
      alert('congrats');
      window.location.reload(false);
    }

    return <ul className="guessesContainer">{lines}</ul>;
  }
}

class IncorrectLetters extends React.Component {
  render() {
    let wrongLetters = this.props.wrongLetters;

    if (wrongLetters.length > 7) {
      alert('You Lose');
      window.location.reload(false);
    }

    return (
      <div hidden={this.props.wrongLetters.length === 0}>
        <span>Wrong Letters:</span>
        {wrongLetters}
      </div>
    );
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
      <div hidden={!this.props.hasGameStarted}>
        <InputGroup size="lg">
          <InputGroup.Prepend>
            <Button
              onClick={() => {
                this.props.onInputSubmitted(this.state.inputValue);
              }}
            >
              Guess
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Guess"
            aria-describedby="inputGroup-sizing-sm"
            type="text"
            maxLength="1"
            value={this.state.inputValue}
            onChange={(e) => {
              this.setState({ inputValue: e.target.value });
            }}
          />
        </InputGroup>
      </div>
    );
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
      <div hidden={this.props.hasGameStarted}>
        <InputGroup size="lg">
          <InputGroup.Prepend>
            <Button
              onClick={() => {
                if (this.state.inputValue.length >= 0) {
                  this.props.onInputSubmitted(this.state.inputValue);
                }
              }}
            >
              Start Game
            </Button>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Guess"
            aria-describedby="inputGroup-sizing-sm"
            type="password"
            value={this.state.inputValue}
            onChange={(e) => {
              this.setState({ inputValue: e.target.value.replace(' ', '') });
            }}
          />
        </InputGroup>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
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
          hasGameStarted={this.state.word.length !== 0}
          wrongLetters={this.state.wrongLetters}
        />
        <Answer
          word={this.state.word}
          letter={this.state.letter}
          correctlyGuessedLetters={this.state.correctlyGuessedLetters}
        />
        <AnswerInput
          hasGameStarted={this.state.word.length !== 0}
          onInputSubmitted={(letter) => {
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
          }}
        />
        <HiddenInput
          hasGameStarted={this.state.word.length !== 0}
          onInputSubmitted={(word) => {
            this.setState({ word });
          }}
        />
      </div>
    );
  }
}

export default App;
