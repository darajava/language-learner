import React from 'react';

import ProgressLabel from 'react-progress-label';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'



const Timer = (props) => {

  return (
    <div>
      <div klass='cancel'>
        <Glyphicon glyph="remove" />
      </div>

      <ProgressLabel
        klass='push-right'
        progress={props.progress}
        progressWidth={10}
        trackWidth={10}
        cornersWidth={0}
        size={60}
        fillColor="white"
        trackColor="white"
        progressColor="#999"
      >
    </ProgressLabel>
    </div>
  );
        
}

export default Timer;
 