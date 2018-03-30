import React , { Component } from 'react';

import Question from '../../views/Question/Question'

class Round extends Component {

    constructor() {
      super();

      this.progress = localStorage.getItem('progress');

      if (this.progress === null) {
        this.progress = {};
      } else {
        this.progress = JSON.parse(this.progress);
      }

      this.typingSounds = [
        document.getElementById('typing1'),
        document.getElementById('typing4'),
        document.getElementById('typing3'),
        document.getElementById('typing2'),
        document.getElementById('typing5'),
        document.getElementById('typing6'),
        document.getElementById('typing7'),
        document.getElementById('typing8'),
      ];

      this.win = document.getElementById('win-audio');
      this.lose = document.getElementById('lose-audio');
      this.levelup = document.getElementById('levelup-audio');
      this.lose.volume = 0.3;
      
      this.typingSounds.map((audio) => audio.volume = 0.3);

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        if (this.state.error || this.state.correct) return;
        
        this.typingSounds[Math.floor(Math.random() * 8)].play();

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

    componentWillMount() {
      this.initialState = {
        correct: false,
        error: false,
        close: false,
        currentAnswer: "",
        time: Date.now(),
        progress: this.props.progress,
      };

      this.timeProgress = 0;

      this.setState(this.initialState);
    }

    componentWillUpdate(nextprops) {
      console.log(this.state);
      if (this.props.words < nextprops.words) {
        this.levelup.play();
        this.newAnimation = Math.random();
      }
    }

    isCorrect() {
      let cleanedAnswer = this.state.currentAnswer.toLowerCase().replace('the ', '');
      cleanedAnswer = cleanedAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let actualAnswer = this.props.answer.toLowerCase().replace('the ', '');
      let actualAnswerNoDiacritics = actualAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

      if (cleanedAnswer === actualAnswerNoDiacritics) {
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
      cleanedAnswer = cleanedAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      let actualAnswer = this.props.answer.toLowerCase().replace('the ', '');

      let actualAnswerNoDiacritics = actualAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

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

      if (progress[this.props.hash].score === this.props.threshold) {
        this.props.updateScore(this.props.words + 1);
      }


      this.setState({
        progress: progress[this.props.hash],
      });

      localStorage.setItem('progress', JSON.stringify(progress));

      this.playSounds();
    }

    loseRound() {
      this.lose.play();

      if (window.navigator) {
        window.navigator.vibrate(200);
      }

      let progress = this.progress;

      if (!this.state.close) {
        progress[this.props.hash] = {
          date: Date.now(),
          score: progress[this.props.hash] && progress[this.props.hash].score >= 1 ? 1 : 0, 
        };
      }

      this.setState({
        progress: progress[this.props.hash],
      });

      localStorage.setItem('progress', JSON.stringify(progress));

      this.setState({
        error: true,
      });

      this.playSounds();
    }

    playSounds() {
      let audio1 = document.getElementById('main-audio1');
      let audio2 = document.getElementById('main-audio2');

      let learning = `/sounds/words/${this.props.learning}/${this.props.word[this.props.learning].replace(' ', '_')}.mp3`;
      let knows = `/sounds/words/${this.props.knows}/${this.props.word[this.props.knows].replace(' ', '_')}.mp3`
    
      
      // audio1.src = knows;
      audio2.src = learning;

      // audio1.addEventListener('ended', () => {
      //   setTimeout(() => {
      //     // audio2.play();
      //   }, 180);
      // }, false);

      setTimeout(() => {
        audio2.play();
      }, 180);

      // setTimeout(() => {
      //   audio.play()
      //   audio.src = learning
      //   audio.onended = () => {
      //     setTimeout(() => {
      //       audio.play();
      //       audio.onended = undefined;
      //     }, 180);
      //   }
      // }, 180);
    }

    startNextRound() {
      document.querySelector('input[id="hidden-field"]').value = '';
      this.props.newQuestion();

      this.initialState.progress = this.props.progress;
      this.initialState.time = Date.now();
      this.setState(this.initialState);
    }

    repeatAudio(e) {
      let audio = document.getElementById('main-audio2');
      audio.play();
      e.stopPropagation();
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
            currentAnswer={this.state.currentAnswer}
            loseRound={this.loseRound}
            startNextRound={this.startNextRound}
            words={this.props.words}
            newAnimation={this.newAnimation}
            score={this.state.progress.score}
            revision={this.props.revision}
            newWord={this.props.newWord}
            threshold={this.props.threshold}
            repeatAudio={this.repeatAudio}
          />
        </div>
      );
    }
}

export default Round;
