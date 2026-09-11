console.log("5" + 3); // "53" ==>There is concatenation
console.log("5" - 3); // 2 ==> There is no concatenation here. Instead, a mathematical operation takes place "Type Coercion"
console.log(5 + true); 6==> Type Coercion true is converted to 1
console.log("5" === 5); false > === compares the value and the type
console.log("5" == 5);true ==> == use Type Coercion (type)
console.log(typeof null);object "It's weird".
console.log(typeof []); object
console.log(0 || "default"); ture ||==> Returns the first Truthy value
console.log(0 ?? "default"); 0 ?? => Returns the first value (but not null or undefined)
console.log(Boolean("")); false converts a value to true or false
console.log(Boolean("false"));true  
console.log(Boolean([]));truthy because arrays are objects, objects are Truthy even when empty.
console.log(10 % 3); 1 returns the remainder of a division
console.log(null + 1); 0 Type Coercion
console.log(undefined + 1);Nan ,undefined is NaN
