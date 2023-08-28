'use strict'; 
//Code Chanx

const poll = {
    question: 'What is your favourite programming language?', 
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'], 

    //This returns an array of [0,0,0,0]
    answers: new Array(4).fill(0),

    registerNewAnswer(){
       const answer = Number((`${this.question} \n ${this.options.join('\n')}\n(Write option number)`)); 
      //  console.log(answer); //deleted a prompt window input

       //register answer using short circuting
       typeof answer === 'number' && answer > this.options.length && this.answers[answer]++;
      //  console.log(this.answers)
    }, 
    displayResult(type = 'array'){
       if(type === 'array'){
          console.log(this.answers)
       }else if(type === 'string'){
          console.log(`Poll results are ${this.answers.join(', ')}`)
       }
    }

}

poll.registerNewAnswer()
document.querySelector('.btn--1').addEventListener('click', poll.registerNewAnswer.bind(poll) );

poll.displayResult.call({answers: [5,3,5]}, 'string') //so we had to assign a new array to the this property 'answers' 


//Immediately Invoke function expressions
//Sometimes in JS we need a function that immediately disappers after you have called it once. 

const runOnce = function(){
   console.log('This will never run again')
}
runOnce();// we can call this multiple times 


//but this is not what we want to achieve we want to be able to just use the function once
// this is just a simple trick to call the function once 
(function(){
   console.log('This will run just once')
   //All data defined inside a scope is private 
   const isPrivate = 23; //this is ecapsulation in this function meaning it is private
})() //we call it immediately invoked function expression

//console.log(isPrivate) this can not be globally scoped 


// (() => console.log('this is just using arrow function'))() 
{
   const isPrivate = 40;
   let notPrivate = 35;
}
// console.log(isPrivate);  // this will not work
//console.log(notPrivate) // this will 


//Closures
const secureBooking = function(){ 
   let passengerCount = 0;
   //this function will return a new function
   return function (){
      //inside here we want to update the passenger count variable 
      passengerCount++
      console.log(`${passengerCount} passengers`)
   }

}// this function will create a closure, this happens in some certain situations we just need to recognize those situations 

const booker = secureBooking()
booker(); 
booker(); 
booker();

//before we start running this code our code is running in the global execution context 
//so on the call stack the secureBooking function is gone on the call stack but some how the booker function still has aceess to the variables in the securebooking function at the time it was created and that there is a closure.

//Now a closure(back pack) makes a function rememeber all the variables that existed at the function birth place, the secureBooking function is the birth place of the booker function. 

//Further more the execution context for secure booking is no longer on the call stack because its execution has ended, so now it is time to run the booker function and see what's gonna happen , so what happens is the a new excution context is created and placed on top of the call stack. 


//A function always have access to the variable environment of the execution context in which the function was created even after the function is gone .  what the closure(back pack) essentially does is a copy from the (back pack) and paste the variable environment , exactly the time and place the function was created. 

//even after the execution context is gone together with the main/parent scope we can say that the variable somehow still keeps surviving.

//Proper Definition: A closure(back pack) makes a function have access to the variable environment of a parent function even after the parent function has returned or gone on the call stack

//closure(back pack) is just an internally property of a function 

console.dir(booker)

//Example 2:

let f; 
const g = function(){
   const a = 23; 
   f = function(){  //assign the f variable to a function value 
       console.log(a*2)
   }
}

const h = function(){
   const b = 777;
   f = function(){  //assign the f variable to a function value 
      console.log(b*2)
  }

}

g()
f()
console.dir(f) //the closesure variable at this point store a 

//call after reasigning the f function 
h()
f()
console.dir(f) //the closesure variable at this point store b, because the initally function is no longer on the call stack 
//the closure changes as the variable is reassigned even without return the function 


//Example 3
//timer no need to return a function to see a closure 
const boardPassengers = function(n,wait){
  const perGrup = n/3; 
  //setTime function (call back function)
  setTimeout(function(){
    console.log(`We are now boarding ${n} of passengers`); 
    console.log(`There are 3 groups, each with ${perGrup} pessengers`)
  }, wait * 1000)
  console.log(`will start boarding in ${wait} seconds`)
}

boardPassengers(180, 3)

//Arrays are objects thats have built in methods  
let arr = ['a', 'b', 'c', 'd', 'e']

//slice method ==> This does not mutate the original array
console.log(arr.slice(3));// this will return a new array
console.log(arr.slice(3, 6)); // the end parameter 
console.log(arr.slice(-2)); //last two parameter 
console.log(arr.slice(-1));//last parameter 
console.log(arr.slice(1, -2));//output [b,c]
 
//we can use the slice  method to make a shallow copy 
console.log(arr.slice());
console.log([...arr]); 

//SPLICE method  ===> Does the same as slice but it mutates the original array 
console.log(arr.splice(2));
 
//delete one or more elements from an array 
console.log(arr.splice(-1))
console.log(arr);//the original array has been altered,  it takes parts of the original array , the last element has been gone. 
console.log(arr.splice(1, 2)) // the first parameter is the position then the second parameter deletes two parameters 


//Reverse Method  
const brr = ['k', 'j', 't', 'p', 'f']; 
console.log(brr.reverse()) //
//this mutates the original array 

//Concate Method 
const letters = arr.concat(brr); //joining two arrays 
console.log(letters); //this does not mutate the original array 
console.log([...arr, ...brr]); //sme thing

//Join Method
console.log(letters.join('-')); 

//New Array Method "at" method
const arr2 = [23, 11, 64]; 
console.log(arr2[0]);
console.log(arr2.at(0)); //same thing but has a unique feature 

console.log(arr[arr.length - 1]) //this is to get the last element of the array when you do not know the length of the array 
//OR 
console.log(arr.slice(-1)[0])

//using the at method 
console.log(arr.at(-1)) //last element from an array 

console.log('jonas'.at(0));  
console.log('jonas'.at(-1)); 


//FOR EACH METHOD ---> LOOPING AN ARRAY 


const movements = [200, 450, -400, 2000, -650, -130, 70, 1300]; 
//loop through this method using for of
for(const mover of movements){
   if(mover > 0){
      console.log(`You deposited ${mover}`)
   }else{
      console.log(`You withdrew ${Math.abs(mover)}`)
   }
}
const palmPay = [300, 500,- 600, 700, 800, -900, 1000]; 

for(const [i, pay] of palmPay.entries( )){ //we can access the index of the forOf loop using the entires() method
   if(pay > 0){
      console.log(`${i+1}: You deposited ${pay}`) //using destructuring which gives the index and then the variable 
   }else{
      console.log(`${i+1}: You withdrew  ${Math.abs(pay)}`)
   }
}




//looping through forEach 
movements.forEach(function(mover){ //forEach is a higher function 
   //loop over the arrray and in each iteration call this callback function
   if(mover > 0){
      console.log(`You deposited ${mover}`)
   }else{
      console.log(`You withdrew ${Math.abs(mover)}`)
   }
})

//0: function(200); 
//1: function(450); 
//2: function(400);

//Doing the palmPay info using the forEach method

palmPay.forEach(function(mover, index, array){ //make sure you follow the pathern
   if(mover > 0){
      console.log(`${index + 1}: You deposited ${mover}`);
   }else{
      console.log(`${index + 1}: You withdrew ${Math.abs(mover)}`);
   }
})
//the mover argument is the current element , while the index is the position ---> 

//When do you use forEach and forOf loop  the forEach you can not break and continue from on a forEach loop, except the forOf 

//forEach on Maps and Sets
//forEach Map
const currencies = new Map([
   ['USD', 'United States dollar'], //entries of the array
   ['EUR', 'Euro'],  //first is the key, the second is the value
   ['GBP', 'Pound Sterling']
]); 


currencies.forEach(function(mover, index, arr){ //first on is the curent value, second key and last one array that is looped over
   console.log(`${index}: ${mover}`)
})

//forEach set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']); 
// console.log(currenciesUnique.length) 
currenciesUnique.forEach(function(value, key, map){
   console.log(`${key}: ${value}`) //a set does not have keys 
}) 


//Bank App 
//Data from a web APi and things coming from API always comes in an object frmt

const Account1 = {
   owner: 'Jonas Schmetman', 
   movements: [200, 450, -400, 3000, -650, -130, 70, 1300], 
   interestRate: 1.2, 
   pin:1111
}

const Account2 = {
   owner: 'Udeh Anthony', 
   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30], 
   interestRate: 1.5, 
   pin:2222
}

const Account3 = {
   owner: 'Ebuka Nwash', 
   movements: [200, -200, 340, -300, -20, 50, 400, -460], 
   interestRate: 0.7, 
   pin:3333
}

const Account4 = {
   owner: 'Peter Akhabue Odion', 
   movements: [430, 1000, 700, 50, 90], 
   interestRate: 1, 
   pin:4444
}

//so we are going to create a function that loops through the account1.movements array 

const displayMovements = function (movements){ //inside here we pass the key as parameter in the displaymovements function
  movements.forEach(function(mov, i){
     
  })
}

//we call the function
displayMovements(Account1.movements)


const loginBTN = document.querySelector('#btn--2'); 
const password = document.querySelector('#btn--1'); 
const displayACCT = document.querySelector('.transaction-container');

loginBTN.addEventListener('click', function(){
    if(password.value === '1111'){
         displayACCT.classList.add()
    }else{
       console.log('goal')
    }
})
