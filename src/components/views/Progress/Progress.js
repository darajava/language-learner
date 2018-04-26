import React from 'react';




const Progress = (props) => {
  
  let dots = [];

  for (let i = 0; i < props.threshold; i++) {
    if (i < props.score) {
      dots.push(<span key={i} klass={'complete' + Math.min(props.score, props.threshold)}><span klass='shadow'></span></span>);
    } else {
      dots.push(<span key={i} klass='incomplete'><span klass='shadow'></span></span>);
    }
  }

  console.log(props.score)

  return (
    <div klass='container'>

      <div klass='dots'>
        {dots}
      </div>
    </div>
  );
        
}

export default Progress;
 