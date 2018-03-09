import React, { Component } from 'react';

import QuestionPicker from './components/containers/QuestionPicker/QuestionPicker'

class App extends Component {
  componentDidMount() {
  	document.body.addEventListener('click', () => {
  	  document.getElementById('hidden-field').focus()
  	})
  	
  	document.getElementById('hidden-field').focus()

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
