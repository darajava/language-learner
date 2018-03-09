import React , { Component } from 'react';

import Question from '../../views/Question/Question'

class Round extends Component {

    constructor() {
      super();

      this.state = {
        correct: Math.random() > 0.5,
        error: Math.random() > 0.5,
        currentAnswer: "",
      }
    }


    handleKeyDown (event) {
      console.log(this.state.currentAnswer);

      if (event.keyCode === 8) { // backspace
        this.setState({currentAnswer: this.state.currentAnswer.substring(0, this.state.currentAnswer.length - 1)})
        return;
      }

      // let isPrintableKey = event.key.length === 1;
      // if (!isPrintableKey) return;

      this.setState({currentAnswer: this.state.currentAnswer + event.data})
    }

    componentDidMount() {
      document.addEventListener("textInput", this.handleKeyDown.bind(this));
    }


    render() {
      return (
        <div>
          <Question
            correct={this.state.correct}
            error={this.state.error}
            question={this.props.question}
            answer={this.state.currentAnswer}
            currentAnswer={this.state.currentAnswer}
          />
        </div>
      );
    }
}

export default Round;
