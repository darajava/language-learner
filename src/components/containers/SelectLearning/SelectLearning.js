import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class SelectLearning extends Component {

    constructor() {
      super();
    }

    render() {

      return (
        <div>
          {JSON.stringify(this.props)}
        </div>
      );
    }
}

export default SelectLearning;