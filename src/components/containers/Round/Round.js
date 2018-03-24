import React , { Component } from 'react';

import Question from '../../views/Question/Question'

class Round extends Component {

    constructor() {
      super();

      this.initialState = {
        correct: false,
        error: false,
        close: false,
        currentAnswer: "",
        time: Date.now(),
        timeProgress: 0,
      };

      this.state = this.initialState;

      this.progress = localStorage.getItem('progress');

      if (this.progress === null) {
        this.progress = {};
      } else {
        this.progress = JSON.parse(this.progress);
      }

      setInterval(() => {
        let timeLimit = 25;
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
      ];

      this.win = new Audio('sounds/win.wav');
      this.lose = new Audio('sounds/lose.wav');
      this.levelup = new Audio('sounds/levelup.wav');
      this.lose.volume = 0.3;

      this.audio.map((audio) => audio.volume = 0.3);

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        if (this.state.error || this.state.correct) return;
        
        this.audio[Math.floor(Math.random() * 4)].play();

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

      // NO IDEA WHY I NEED THIS
      setTimeout(() => {
        this.loadSounds();
      }, 50);

      this.loadSounds = this.loadSounds.bind(this);
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

      if (this.state.currentAnswer.toLowerCase().replace('the ', '') === this.props.answer.toLowerCase()) {
        return true;
      }

      return false;
    }

    levenshteinDistance(a, b) {
      if(a.length === 0) return b.length; 
      if(b.length === 0) return a.length; 

      var matrix = [];

      // increment along the first column of each row
      var i;
      for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                             matrix[i-1][j] + 1)); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    }

    checkAnswer() {
      let correct = this.isCorrect();

      this.setState({
        correct,
      });

      let cleanedAnswer = this.state.currentAnswer.toLowerCase().replace('the ', '');
      let actualAnswer = this.props.answer.toLowerCase().replace('the ', '');

      let distance = this.levenshteinDistance(
        cleanedAnswer,
        actualAnswer
      );

      if (
        distance >= 1 // if we're close
        && distance <= 2
        && cleanedAnswer.length > 2 // and we have some answer
        && actualAnswer.indexOf(cleanedAnswer) !== 0 // and it's not one char from completion
      ) {
        this.setState({
          close: true,
        });
      } else {
        this.setState({
          close: false,
        });
      }

      if (correct) {
        this.winRound();
      }
    }

    winRound() {
      this.win.play();

      let progress = this.progress;

      if (progress === null) {
        progress = {};
      }

      if (typeof progress[this.props.hash] === 'undefined') {
        progress[this.props.hash] = {
          date: Date.now(),
          score: 1,
        };
      } else {
        progress[this.props.hash] = {
          date: Date.now(),
          score: progress[this.props.hash].score + 1,
        };
      }

      localStorage.setItem('progress', JSON.stringify(progress));

      this.playSounds();
    }

    loseRound() {
      this.lose.play();

      if (window.navigator) {
        window.navigator.vibrate(200);
      }

      // this.progress = JSON.parse(localStorage.getItem('progress'));
      let progress = this.progress;

      if (!this.state.close) {
        progress[this.props.hash] = {
          date: Date.now(),
          score: 0,
        };
      }

      console.log('fdd');
      console.log(progress);
      console.log(this.props.hash);

      localStorage.setItem('progress', JSON.stringify(progress));

      this.setState({
        error: true,
      });

      this.playSounds();
    }

    playSounds() {
      let audio = new Audio();

      let learning = `sounds/words/${this.props.learning}/${this.props.word[this.props.learning].replace(' ', '_')}.mp3`;
      let knows = `sounds/words/${this.props.knows}/${this.props.word[this.props.knows].replace(' ', '_')}.mp3`
    
      
      setTimeout(() => {
        audio.src = knows;
        audio.play()
        audio.onended = () => {
          setTimeout(() => {
            audio.src = learning
            audio.play();
            audio.onended = undefined;
          }, 180);
        }
      }, 180);
    }

    loadSounds() {

    }

    startNextRound() {
      document.querySelector('input[id="hidden-field"]').value = '';
      this.props.newQuestion();

      this.loadSounds();

      this.initialState.time = Date.now();
      this.setState(this.initialState);
    }


    render() {
      return (
        <div>
          <Question
            correct={this.state.correct}
            error={this.state.error}
            close={this.state.close}
            question={this.props.question}
            answer={this.props.answer}
            name={this.props.name}
            timeProgress={this.state.timeProgress}
            currentAnswer={this.state.currentAnswer}
            loseRound={this.loseRound}
            startNextRound={this.startNextRound}
            words={this.props.words}
            newAnimation={this.newAnimation}
          />
        </div>
      );
    }
}

export default Round;
