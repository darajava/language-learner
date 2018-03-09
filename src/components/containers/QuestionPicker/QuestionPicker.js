import React , { Component } from 'react';

import Round from '../Round/Round';
import words from './words';

class QuestionPicker extends Component {

    constructor() {
      super();

      this.state = {
        word: [],
      }

      this.selectQuestion = this.selectQuestion.bind(this);
    }

    componentDidMount() {
      this.selectQuestion();
    }

    selectQuestion() {
      let word = words[Math.round(Math.random() * words.length)];
      this.setState({word});
    }


    render() {
      return (
        <div>
          <Round
            answer={this.state.word.en}
            question={this.state.word.de}
            name={this.state.word.name}
            newQuestion={this.selectQuestion}
          />
        </div>
      );
    }
}

export default QuestionPicker;
