import React from 'react';
import CSSModules from 'react-css-modules';
import ProgressLabel from 'react-progress-label';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import styles from './styles.css';

const Timer = (props) => {

  return (
    <div>
      <div styleName='cancel'>
        <Glyphicon glyph="remove" />
      </div>

      <ProgressLabel
        styleName='push-right'
        progress={props.progress}
        progressWidth={10}
        trackWidth={10}
        cornersWidth={0}
        size={60}
        fillColor="white"
        trackColor="white"
        progressColor="#6B4423"
      >
    </ProgressLabel>
    </div>
  );
        
}

export default CSSModules(Timer, styles);
 