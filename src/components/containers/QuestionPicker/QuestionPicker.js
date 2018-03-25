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

      this.thresholdScore = 3;

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

      let thresholdScore = this.thresholdScore;

      // words.en is used as a hash, nothing to do with the language

      for (let i = 0; i < words.length; i++) {
        // If we have seen it recently, and the score is high
        if (progress[words[i].en] && progress[words[i].en].score >= thresholdScore) {
          this.knownQuestions.push(words[i]);
        }
      }

      let badQuestionsMax = 6;

      for (let i = 20; i < words.length; i++) {
        if (this.badQuestions.length >= badQuestionsMax) break;

        console.log(progress[words[i].en])

        // If the score is low
        if ((progress[words[i].en] && progress[words[i].en].score < thresholdScore) || !progress[words[i].en]) {
          this.badQuestions.push(words[i]);
        }
      }

      console.log('-------')
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
        if (Math.random() < 0.7) {
          if (this.badQuestions.length) {
            questionPool = this.badQuestions;
          }
        }

        word = questionPool[Math.floor(Math.random() * questionPool.length)];

      } while (!word || this.inArray(this.state.recentWords, word));

      let recentWords = this.state.recentWords.slice(0, 2);
      recentWords.push(word);

      this.setState({
        word,
        recentWords,
      });
    }


    render() {
      let learningLang = 'de';
      let knowsLang = 'en';

      let progress = this.progress;

      let answer = this.state.word[knowsLang];
      let question = this.state.word[learningLang];

      let newWord = false;

      if (progress[this.state.word.en]) {
        if (progress[this.state.word.en].score >= 1) {
          question = this.state.word[knowsLang];
          answer = this.state.word[learningLang];
        }
      } else {
        newWord = true;
        progress[this.state.word.en] = {score: 0}
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
            knows={knowsLang}
            learning={learningLang}
            word={this.state.word}
            newWord={newWord}
            revision={progress[this.state.word.en].score >= this.thresholdScore}
            progress={progress[this.state.word.en]}
            threshold={this.thresholdScore}
          />
        </div>
      );
    }
}

export default QuestionPicker;
