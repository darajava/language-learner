import React , { Component } from 'react';

import Round from '../Round/Round';
import words from './noun_map.json';

class QuestionPicker extends Component {

    constructor() {
      super();

      this.state = {
        word: [],
        recentWords: [],
      }

      this.knownQuestions = [];
      this.badQuestions = [];

      this.updateProgress();

      this.groupQuestions = this.groupQuestions.bind(this);
      this.selectQuestion = this.selectQuestion.bind(this);
      this.updateProgress = this.updateProgress.bind(this);
    }

    componentDidMount() {
      this.selectQuestion();
    }

    updateProgress() {
      this.progress = localStorage.getItem('progress');
      if (this.progress === null) {
        this.progress = {};
      } else {
        this.progress = JSON.parse(this.progress);
      }
    }

    groupQuestions() {
      this.knownQuestions = [];
      this.badQuestions = [];

      let progress = this.progress;

      for (let i = 0; i < words.length; i++) {
        // If we have seen it recently, and the score is high
        if (progress[i] && progress[i].score >= 3) {
          this.knownQuestions.push(words[i]);
        }
      }

      let badQuestionsPercentage = Math.max(Math.floor(this.knownQuestions.length / 5), 5)

      for (let i = 0; i < words.length; i++) {
        if (this.badQuestions.length >= badQuestionsPercentage) break;

        // If the score is low
        if ((progress[i] && progress[i].score <= 2) || !progress[i]) {
          this.badQuestions.push(words[i]);
        }
      }

      console.log(this.knownQuestions)
      console.log(this.badQuestions)
      console.log(this.progress);
    }

    inArray(arr, needle) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].en === needle.en) {
          return true;
        }
      }
      return false;
    }

    selectQuestion() {
      this.updateProgress();
      this.groupQuestions();

      let questionPool, word;

      do {
        questionPool = this.knownQuestions;
        if (Math.random() < 0.8) {
          if (this.badQuestions.length) {
            questionPool = this.badQuestions;
          }
        }

        word = questionPool[Math.floor(Math.random() * questionPool.length)];

      } while (!word || this.inArray(this.state.recentWords, word));

      let recentWords = this.state.recentWords.slice(0, 3);
      recentWords.push(word);

      this.setState({
        word,
        recentWords,
      });
    }


    render() {
      let progress = this.progress;

      let answer = this.state.word.en;
      let question = this.state.word.de;

      if (this.state.word.index && progress[this.state.word.index]) {
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
            hash={this.state.word.en}
            name={this.state.word.name}
            newQuestion={this.selectQuestion}
            words={this.knownQuestions.length}
          />
        </div>
      );
    }
}

export default QuestionPicker;
