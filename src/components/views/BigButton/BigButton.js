import React from 'react';
import CSSModules from 'react-css-modules';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { Link } from 'react-router-dom';

import styles from './styles.css';

const BigButton = (props) => {

  return (
    <Link style={{ textDecoration: 'none' }} to={props.link}>
      <div styleName='button'>
        <div styleName='soustitle'>
          {props.soustitle}
        </div>
        <div styleName='text'>
          {props.text}
        </div>
      </div>
    </Link>
  );
        
}

export default CSSModules(BigButton, styles);
 