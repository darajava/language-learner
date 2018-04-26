import React from 'react';

import Glyphicon from 'react-bootstrap/lib/Glyphicon'


import Timer from '../Timer/Timer';
import Progress from '../Progress/Progress';

function resetAnimation() {
  var el = document.getElementById('animated');
  el.style.animation = 'none';
  // el.offsetHeight;
  setTimeout(() => el.style.animation = '', 0); 
}

let oldprops;
let mungus = false;

const Question = (props) => {
  
  let klass = 'container';
  if (props.error) {
    klass = 'container-error'
  }
  if (props.close) {
    klass = 'container-close';
  }
  if (props.correct) {
    klass = 'container-correct'
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

  let x = 'container';

  return (
    <div klass={x} onClick={props.error || props.correct ? () => props.startNextRound() : undefined}>
      <span id="animated" klass='animate'>
        <span>score: {props.words}</span>  
      </span>
      <span klass='total'>score: {props.words}</span>

      <div klass='question'>
        <div>{question}</div>
        <Progress 
          score={props.score}
          threshold={props.threshold}
          revision={props.revision}
          newWord={props.newWord} />
      </div>

      
        <div klass='answer'>
        {props.error || props.correct ? answer : props.currentAnswer}
        <span klass='underscore'>_</span>
        <div klass='wrong-answer'>
          {props.error ? props.currentAnswer : ' '}
        </div>
      </div>

      <div klass={props.error || props.correct ? '' : 'hidden'}>
        <div onClick={props.repeatAudio} klass='repeat'>
          <Glyphicon glyph="repeat" />
        </div>
      </div>
      
      <div klass="timer" onClick={props.loseRound}>
      </div>

    </div>
  );
        
}

export default Question;
 