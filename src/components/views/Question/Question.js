import React from 'react';
import CSSModules from 'react-css-modules';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

import styles from './styles.css';
import Timer from '../Timer/Timer';
import Progress from '../Progress/Progress';

function resetAnimation() {
  var el = document.getElementById('animated');
  el.style.animation = 'none';
  // el.offsetHeight;
  setTimeout(() => el.style.animation = '', 0); 
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


  if (props.currentAnswer === "mungus") {
      let audio = document.getElementById('main-audio2');
      audio.src="/mungus.mp3";
      audio.play();
      audio.src = '';
    } 


  return (
    <div styleName={styleName} onClick={props.error || props.correct ? () => props.startNextRound() : undefined}>
      <span id="animated" styleName='animate'>
        <span>score: {props.words}</span>  
      </span>
      <span styleName='total'>score: {props.words}</span>

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

      <div styleName={props.error || props.correct ? '' : 'hidden'}>
        <div onClick={props.repeatAudio} styleName='repeat'>
          <Glyphicon glyph="repeat" />
        </div>
      </div>

      <div styleName={props.currentAnswer === "mungus" ? "spin" : "hidden"} >
        <img src="/mungus.png" />
      </div>
      
      <div styleName="timer" onClick={props.loseRound}>
      </div>

    </div>
  );
        
}

export default CSSModules(Question, styles);
 