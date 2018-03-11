import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import Timer from '../Timer/Timer';

const Question = (props) => {
  
  let styleName = 'container';
  if (props.error) {
    styleName = 'container-error'
  }
  if (props.correct) {
    styleName = 'container-correct'
  }

  return (
    <div styleName={styleName} onClick={props.error || props.correct ? () => props.startNextRound() : undefined}>
      <div styleName='question'>
        <div>{props.question}</div>
        <div styleName='name'>({props.name})</div>
      </div>
      

      <div styleName='answer'>
        {props.error ? props.answer : props.currentAnswer}
        <span styleName='underscore'>_</span>
        <div styleName='wrong-answer'>
          {props.error ? props.currentAnswer : ' '}
        </div>
      </div>
      
      <div styleName="timer" onClick={props.loseRound}>
        <Timer progress={props.timeProgress}/>
      </div>

      <u>{props.progress.score}</u>
    </div>
  );
        
}

export default CSSModules(Question, styles);
 