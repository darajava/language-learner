import React , { Component } from 'react';

import Question from '../../views/Question/Question'

class Round extends Component {

    constructor() {
      super();

      this.initialState = {
        correct: false,
        error: false,
        currentAnswer: "",
        time: Date.now(),
        progress: 0,
      };

      this.state = this.initialState;

      setInterval(() => {
        let timeLimit = 20;
        this.setState({
          progress: ((Date.now() - this.state.time) / 1000) * 100 / timeLimit,
        }, () => {
          if (this.state.progress >= 99) {
            this.loseRound();
          }
        })
      }, 100);

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        console.log(event);
        this.setState({
          currentAnswer: event.target.value,
        }, () => { this.checkAnswer() })
      };

      document.body.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && (this.state.error || this.state.correct)) {
          this.reset();
        } else if (event.keyCode === 27 || event.keyCode === 13) {
          this.loseRound();
        }
      });

      this.loseRound = this.loseRound.bind(this);
      this.reset = this.reset.bind(this);
    }

    checkAnswer() {
      this.setState({
        correct: this.state.currentAnswer.toLowerCase() === this.props.answer.toLowerCase(),
      });
    }

    loseRound() {
      this.setState({
        error: true,
      })
    }

    reset() {
      document.querySelector('input[id="hidden-field"]').value = '';
      this.initialState.time = Date.now();
      this.setState(this.initialState);
      this.props.newQuestion();
    }


    render() {
      return (
        <div>
          <Question
            correct={this.state.correct}
            error={this.state.error}
            question={this.props.question}
            answer={this.props.answer}
            name={this.props.name}
            progress={this.state.progress}
            currentAnswer={this.state.currentAnswer}
            loseRound={this.loseRound}
            reset={this.reset}
          />
        </div>
      );
    }
}

export default Round;
