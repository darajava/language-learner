import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

const Progress = (props) => {
  
  let dots = [];

  for (let i = 0; i < props.threshold; i++) {
    if (i < props.score) {
      dots.push(<span styleName={'complete' + Math.min(props.score, props.threshold)}></span>);
    } else {
      dots.push(<span styleName='incomplete'></span>);
    }
  }

  console.log(props.score)

  return (
    <div styleName='container'>

      <div styleName='dots'>
        {dots}
      </div>
      <div styleName='revision'>
        {props.revision ? '(revision)' : ''}
      </div>
    </div>
  );
        
}

export default CSSModules(Progress, styles);
 