// 1
console.log(a);
var a = 1;
//  Prediction:undefined  
//  Actual:undefined  


// // 2
// console.log(b);
// let b = 2;
// //  Prediction:ReferenceError  
// //      Actual:ReferenceError: Cannot access 'b' before initialization  



//  3

hello();
function hello() { console.log("hi"); }

//   Prediction:hi  
//  Actual:hi  



// 4


// bye();
// const bye = () => console.log("bye");

// Prediction:ReferenceError  
//   Actual:ReferenceError: Cannot access 'bye' before initialization  


// 5

function f() { return; 42; }
console.log(f());

// Prediction  :hundefined  
//  Actual  :undefined  



// 6

const g = (x) => { x * 2 };
console.log(g(5));

// Prediction:10  
//  Actual: undefined  


//Why  :The arrow function uses {}  , so it has a block body and needs an explicit  return  .


//  7

const h = (x) => { value: x };
console.log(h(5));


//  Prediction:undefined  
//     Actual:undefined  




function k(a, b) { return a + b; }
console.log(k(1));
//       

//      Prediction:undefined  
//          Actual:NaN  


//  b argument becomes undefined , and 1 + undefined =NaN  .


// 9

function m(x = 10) { return x; }
console.log(m(null), m(undefined), m(0));


//  Prediction null 10 0  
//   Actual: ull 10 0  




let n = "outer";
function p() { let n = "inner"; return n; }
console.log(p(), n);


//Prediction  :inner outer  
// b Actual  :inner outer  




for (var i = 0; i < 3; i++) { }
console.log(i);


// Prediction: 3  
//  Actual: 3  






for (let j = 0; j < 3; j++) { }
console.log(j);


// Prediction: ReferenceError  
//   Actual: ReferenceError: j is not defined  



function counter() { let c = 0; return () => ++c; }

const q = counter();

console.log(q(), q(), counter()());


//Prediction:1  
// Actual:1 2 1  


// Why:q()   xxxx



const nums = [1, 2, 3];
console.log(nums.map((x) => x * 2));


//   Prediction:[2, 4, 6]  
//  Actual:[2, 4, 6]  



function r() { console.log("ran"); }
console.log(r);


//   Prediction:[Function: r]  
//  Actual:[Function: r]  

