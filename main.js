'use strict'; 
//Code ChanX

const poll = {
    question: 'What is your favourite programming language?', 
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'], 

    //This returns an array of [0,0,0,0]
    answers: new Array(4).fill(0),

    registerNewAnswer(){
       const answer = Number(prompt(`${this.question} \n ${this.options.join('\n')}\n(Write option number)`)); 
       console.log(answer);


       //register answer using short circuting
       typeof answer === 'number' && answer > this.options.length && this.answers[answer]++;

       console.log(this.answers)
    }, 
    displayResult(type){
       if(type === Array){
          console.log(type)
       }else if(type === String){}
    }

}

poll.registerNewAnswer()
document.querySelector('.btn--1').addEventListener('click', poll.registerNewAnswer.bind(poll) );