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
        let timeLimit = 17;
        this.setState({
          timeProgress: ((Date.now() - this.state.time) / 1000) * 100 / timeLimit,
        }, () => {
          if (this.state.timeProgress >= 99 && !this.state.correct && !this.state.error) {
            this.loseRound();
          }
        })
      }, 100);

      this.audio = [
        new Audio('sounds/1.wav'),
        new Audio('sounds/2.wav'),
        new Audio('sounds/3.wav'),
        new Audio('sounds/4.wav'),
      ]

      this.win = new Audio('sounds/win.wav');
      this.lose = new Audio('sounds/lose.wav');
      this.levelup = new Audio('sounds/levelup.wav');
      this.lose.volume = 0.3;

      this.audio.map((audio) => {audio.volume = 0.3});

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        this.audio[Math.floor(Math.random() * 4)].play();
        console.log(this.audio[Math.floor(Math.random() * 4)])
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

    componentWillUpdate(nextprops) {
      if (this.props.words < nextprops.words) {
        this.levelup.play();
        this.newAnimation = Math.random();
      }
    }

    isCorrect() {
      let answers = this.props.answer.split('|');

      console.log(answers);

      for (let i = 0; i < answers.length; i++) {
        if (this.state.currentAnswer.toLowerCase() === answers[i].toLowerCase()) {
          return true;
        }
      }

      return false;
    }

    checkAnswer() {
      let correct = this.isCorrect();

      this.setState({
        correct,
      });

      if (correct) {
        this.win.play();
      }
    }

    loseRound() {
      this.lose.play();
      window.navigator.vibrate(200);
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
        if (progress[this.props.index].score < 0) {
          progress[this.props.index].score = 0;
        }
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
            words={this.props.words}
            newAnimation={this.newAnimation}
          />
        </div>
      );
    }
}

export default Round;
