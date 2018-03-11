import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import Timer from '../Timer/Timer';

let oldprops;

function resetAnimation() {
  var el = document.getElementById('animated');
  el.style.animation = 'none';
  el.offsetHeight; /* trigger reflow */
  el.style.animation = null; 
}

const Question = (props) => {
  
  let styleName = 'container';
  if (props.error) {
    styleName = 'container-error'
  }
  if (props.correct) {
    styleName = 'container-correct'
  }

  let newAnimation = 'animate';
  if (props.newAnimation !== oldprops) {
    resetAnimation();
  }

  oldprops = props.newAnimation;

  return (
    <div styleName={styleName} onClick={props.error || props.correct ? () => props.startNextRound() : undefined}>
      <span id="animated" styleName={newAnimation}>
        <span>Words: {props.words}</span>  
      </span>
      <span styleName='total'>Words: {props.words}</span>



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

    </div>
  );
        
}

export default CSSModules(Question, styles);
 