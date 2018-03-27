import React from 'react';
import CSSModules from 'react-css-modules';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { Link } from 'react-router-dom';

import styles from './styles.css';

const BigButton = (props) => {

  return (
    <Link to={props.link}>
      <div>
        {props.soustitle}
        {props.text}
      </div>
    </Link>
  );
        
}

export default CSSModules(BigButton, styles);
 