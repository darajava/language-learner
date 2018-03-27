import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BigButton from '../../views/BigButton/BigButton';

class SelectLearning extends Component {

    constructor() {
      super();

      this.ispeak = 'I\'m learning...';

      this.languages = [
        {
          code: 'en',
          lang: 'English',
        },
        {
          code: 'de',
          lang: 'German',
        },
        {
          code: 'fr',
          lang: 'French',
        },
        {
          code: 'it',
          lang: 'Italian',
        },
        {
          code: 'es',
          lang: 'Spanish',
        }
      ]

    }

    render() {

      let components = [];

      console.log(this.props)

      for (let i = 0; i < this.languages.length; i++) {
        let lang = this.languages[i];
        components.push(<BigButton text={lang.lang} soustitle={this.ispeak} link={this.props.match.params.knows + '/' + lang.code} />);
      }

      return (
        <div>
          {components}
        </div>
      );
    }
}

export default SelectLearning;