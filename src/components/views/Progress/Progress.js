import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

const Progress = (props) => {
  
  let dots = [];

  for (let i = 0; i < props.threshold; i++) {
    if (i < props.score) {
      dots.push(<span key={i} styleName={'complete' + Math.min(props.score, props.threshold)}><span styleName='shadow'></span></span>);
    } else {
      dots.push(<span key={i} styleName='incomplete'><span styleName='shadow'></span></span>);
    }
  }

  console.log(props.score)

  return (
    <div styleName='container'>

      <div styleName='dots'>
        {dots}
      </div>
    </div>
  );
        
}

export default CSSModules(Progress, styles);
 