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
        timeProgress: 0,
      };

      this.state = this.initialState;
      this.progress = JSON.parse(localStorage.getItem('progress'));

      setInterval(() => {
        let timeLimit = 20;
        this.setState({
          timeProgress: ((Date.now() - this.state.time) / 1000) * 100 / timeLimit,
        }, () => {
          if (this.state.timeProgress >= 99) {
            this.loseRound();
          }
        })
      }, 100);

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        this.setState({
          currentAnswer: event.target.value,
        }, () => { this.checkAnswer() })
      };

      document.body.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && (this.state.error || this.state.correct)) {
          this.startNextRound();
        } else if (event.keyCode === 27 || event.keyCode === 13) {
          this.loseRound();
        }
      });

      this.loseRound = this.loseRound.bind(this);
      this.startNextRound = this.startNextRound.bind(this);
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

    startNextRound() {
      document.querySelector('input[id="hidden-field"]').value = '';
      this.initialState.time = Date.now();
      this.props.newQuestion();

      this.progress = JSON.parse(localStorage.getItem('progress'));
      let progress = this.progress;

      if (typeof progress[this.props.index] === 'undefined' || progress[this.props.index] === null) {
        progress[this.props.index] = {
          date: Date.now(),
          score: 0,
        };
      }
      progress[this.props.index].date = Date.now();
      
      if (this.state.correct) {
        progress[this.props.index].score++;        
      } else if (this.state.error) {
        progress[this.props.index].score--;
      }

      this.setState(this.initialState);

      localStorage.setItem('progress', JSON.stringify(progress));

    }


    render() {
      let progress = this.progress;

      if (typeof progress[this.props.index] === 'undefined' || progress[this.props.index] === null) {
        progress[this.props.index] = {
          date: Date.now(),
          score: 0,
        };
      }


      return (
        <div>
          <Question
            correct={this.state.correct}
            error={this.state.error}
            question={this.props.question}
            answer={this.props.answer}
            name={this.props.name}
            timeProgress={this.state.timeProgress}
            currentAnswer={this.state.currentAnswer}
            loseRound={this.loseRound}
            startNextRound={this.startNextRound}
            progress={progress[this.props.index]}
          />
        </div>
      );
    }
}

export default Round;
