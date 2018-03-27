import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import QuestionPicker from '../QuestionPicker/QuestionPicker';
import SelectLearning from '../SelectLearning/SelectLearning';
import SelectLanguage from '../SelectLanguage/SelectLanguage';

class MainLayout extends Component {

    constructor() {
      super();
    }

    render() {

      return (
        <div>
          <Switch>
            <Route exact path='/' component={SelectLanguage}/>
            <Route path='/:knows/:learning' component={QuestionPicker}/>
            <Route path='/:knows' component={SelectLearning}/>
          </Switch>
        </div>
      );
    }
}

export default MainLayout;
