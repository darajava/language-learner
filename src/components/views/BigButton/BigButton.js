import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import { Link } from 'react-router-dom';

const BigButton = (props) => {

  return (
    <Link style={{ textDecoration: 'none' }} to={props.link}>
      <div klass='button'>
        <div klass={'soustitle'}>
          {props.soustitle}
        </div>
        <div klass='text'>
          {props.text}
        </div>
      </div>
    </Link>
  );
        
}

export default BigButton;
 