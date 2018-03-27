import React , { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BigButton from '../../views/BigButton/BigButton';

class SelectLanguage extends Component {

    constructor() {
      super();

      this.languages = [
        {
          code: 'en',
          lang: 'English',
          ispeak: 'I speak...',
        },
        {
          code: 'de',
          lang: 'Deutsche',
          ispeak: 'Ich spreche...',
        },
        {
          code: 'fr',
          lang: 'Français',
          ispeak: 'Je parle...',
        },
        {
          code: 'it',
          lang: 'Italiano',
          ispeak: 'Me speeky...'
        },
        {
          code: 'es',
          lang: 'Español',
          ispeak: 'Yo hablo...'
        }
      ]

    }

    render() {

      let components = [];

      for (let i = 0; i < this.languages.length; i++) {
        let lang = this.languages[i];
        components.push(<BigButton text={lang.lang} soustitle={lang.ispeak} link={lang.code} />);
      }

      return (
        <div>
          {components}
        </div>
      );
    }
}

export default SelectLanguage;