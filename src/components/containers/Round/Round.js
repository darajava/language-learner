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

      document.querySelector('input[id="hidden-field"]').oninput = (event) => {
        this.setState({
          currentAnswer: event.target.value,
        })
      };

      this.changeEventHandler = this.changeEventHandler.bind(this);
    }

    changeEventHandler(event) {
      console.log(event)
      // You can use “this” to refer to the selected element.
      
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
