import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';
import Timer from '../Timer/Timer';
import Progress from '../Progress/Progress';

function resetAnimation() {
  var el = document.getElementById('animated');
  el.style.animation = 'none';
  // el.offsetHeight;
  el.style.animation = null; 
}

let oldprops;

const Question = (props) => {
  
  let styleName = 'container';
  if (props.error) {
    styleName = 'container-error'
  }
  if (props.close) {
    styleName = 'container-close';
  }
  if (props.correct) {
    styleName = 'container-correct'
  }

  if (props.newAnimation !== oldprops) {
    resetAnimation();
  }
  oldprops = props.newAnimation;

  let question, answer;
  if (props.question)
    question = props.question.split('|')[0];
  if (props.answer)
    answer = props.answer.split('|')[0];


  return (
    <div styleName={styleName} onClick={props.error || props.correct ? () => props.startNextRound() : undefined}>
      <span id="animated" styleName='animate'>
        <span>words: {props.words}</span>  
      </span>
      <span styleName='total'>words: {props.words}</span>

      <div styleName='question'>
        <div>{question}</div>
        <Progress 
          score={props.score}
          threshold={props.threshold}
          revision={props.revision}
          newWord={props.newWord} />
      </div>

      

      <div styleName='answer'>
        {props.error || props.correct ? answer : props.currentAnswer}
        <span styleName='underscore'>_</span>
        <div styleName='wrong-answer'>
          {props.error ? props.currentAnswer : ' '}
        </div>
      </div>
      
      <div styleName="timer" onClick={props.loseRound}>
      </div>

    </div>
  );
        
}

export default CSSModules(Question, styles);
 