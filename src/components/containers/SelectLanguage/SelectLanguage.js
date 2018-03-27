import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

class SelectLanguage extends Component {

    constructor() {
      super();
    }

    render() {

      return (
        <div>
          Hallo
          {JSON.stringify(this.props)}
        </div>
      );
    }
}

export default SelectLanguage;