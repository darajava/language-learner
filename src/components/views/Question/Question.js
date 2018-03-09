import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

const Question = (props) => {
  
  let styleName = 'container';
  if (props.error) {
    styleName = 'container-error'
  }
  if (props.correct) {
    styleName = 'container-correct'
  }

  return (
    <div styleName={styleName}>
      <div styleName='question'>{props.question}</div>
      <div styleName='answer'>{props.answer}
        <span styleName='underscore'>_</span>
      </div>
    </div>
  );
        
}

export default CSSModules(Question, styles);
 