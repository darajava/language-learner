import React, { Component } from 'react';

import MainLayout from './components/containers/MainLayout/MainLayout'
import QuestionPicker from './components/containers/QuestionPicker/QuestionPicker'
import { BrowserRouter } from 'react-router-dom';

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
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
