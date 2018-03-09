import React, { Component } from 'react';

import QuestionPicker from './components/containers/QuestionPicker/QuestionPicker'

class App extends Component {
  componentDidMount() {
    let target = document.getElementsByTagName("input")[0];

    document.body.addEventListener('click', (event) => {
      if (event.target !== target) {
          target.focus();
          target.click();
      }
    });

    target.focus();
    target.click();
  }

  render() {
    return (
      <div>
        <QuestionPicker />
      </div>
    );
  }
}

export default App;
