import React , { Component } from 'react';

import Round from '../Round/Round';
import words from './words';

class QuestionPicker extends Component {

    constructor() {
      super();

      this.state = {
        word: [],
      }

      this.knownQuestions = [];
      this.almostQuestions = [];
      this.iffyQuestions = [];

      let progress = localStorage.getItem('progress');
      if (progress === null) {
        progress = [];
      } else {
        progress = JSON.parse(progress);
      }
      console.log(progress);

      localStorage.setItem('progress', JSON.stringify(progress));

      this.groupQuestions = this.groupQuestions.bind(this);
      this.selectQuestion = this.selectQuestion.bind(this);
    }

    componentDidMount() {
      this.selectQuestion();
    }

    groupQuestions() {
      this.knownQuestions = [];
      this.almostQuestions = [];
      this.iffyQuestions = [];

      let progress = JSON.parse(localStorage.getItem('progress'));


      for (let i = 0; i < words.length; i++) {
        // If we have seen it recently, and the score is high
        if (progress[i] && progress[i].score >= 5) {
          this.knownQuestions.push(words[i]);
        }
        console.log(progress[i])
      }
      console.log('this')
      console.log(this.knownQuestions)

      let almostQuestionsPercentage = Math.max(Math.floor(this.knownQuestions.length / 5), 5)

      for (let i = 0; i < words.length; i++) {
        if (this.almostQuestions.length >= almostQuestionsPercentage) break;

        // If the score is middling
        if (progress[i] && progress[i].score < 5 && progress[i].score >= 2) {
          this.almostQuestions.push(words[i]);
        }
      }

      let iffyQuestionsPercentage = Math.max(Math.floor(this.knownQuestions.length / 3), 8);

      for (let i = 0; i < words.length; i++) {
        if (this.iffyQuestions.length >= iffyQuestionsPercentage) break;

        // If we have seen it recently, and the score is high
        if (progress[i] && progress[i].score < 2) {
          this.iffyQuestions.push(words[i]);
        } else if (!progress[i]) {
          this.iffyQuestions.push(words[i]);
        }
      }


    }

    selectQuestion() {
      this.groupQuestions();

      let questionPool;

      // for (let i = 0; i< 100; i++) {
        questionPool = [];
        if (Math.random() < 0.5) {
          if (this.almostQuestions.length) {
            questionPool = this.almostQuestions;
            console.log('choosing almost')
          }
        } else if (Math.random() < 0.7) {
          if (this.iffyQuestions.length) {
            questionPool = this.iffyQuestions;
            console.log('choosing bad')
          }
        }

        if (questionPool.length === 0) {
          questionPool = this.knownQuestions;
          console.log('choosing good')
        }

        if (questionPool.length === 0) {
          questionPool = this.iffyQuestions;
          console.log('choosing bad')
        }
      // }

      console.log('bad')
      console.log(this.iffyQuestions.map((i) => " - " + i.en));
      console.log('good')
      console.log(this.knownQuestions.map((i) => " - " + i.en + i.score));
      console.log('middle')
      console.log(this.almostQuestions.map((i) => " - " + i.en + i.score));

      let word = questionPool[Math.floor(Math.random() * questionPool.length)];
      this.setState({word});
    }


    render() {
      let progress = JSON.parse(localStorage.getItem('progress'));

      let answer = this.state.word.en;
      let question = this.state.word.de;

      if (this.state.word.index && progress[this.state.word.index]) {
        console.log(this.state.word.index);
        if (progress[this.state.word.index].score >= 2) {
          question = this.state.word.en;
          answer = this.state.word.de;
        }
      }
      
      return (
        <div>
          <Round
            index={this.state.word.index}
            answer={answer}
            question={question}
            name={this.state.word.name}
            newQuestion={this.selectQuestion}
            words={this.knownQuestions.length}
          />
        </div>
      );
    }
}

export default QuestionPicker;
