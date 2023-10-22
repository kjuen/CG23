// Some examples how to pass parameters to functions



// Example 1: A constructor function that takes an object containing parameters. All parameters have default values
// and are therefore optional. This approach is taken useful when the number of parameters is large and is
// taken by some, but not by all three.js constructor functions. For instance, the three.js Material
// constructor functions work this way.
function A(params={}) {

  this.p1 = params.p1 || 34;
  this.p2 = params.p2 || "default p2";
  this.p3 = params.p3 || {a:2, b:3};
}




// Example 2: We can also have a mixture of mandatory and optional parameters:
// p is now a required parameter without default values
function A2(p, params={}) {

  this.p = p;

  this.p1 = params.p1 || 34;
  this.p2 = params.p2 || "default p2";
  this.p3 = params.p3 || {a:2, b:3};
}


// Example 3: If the number of parameters is not that large, it may be more convenient to use the standard
// mechansim for function default parameters. This (or an older-fashioned version of this) is
// how many of the three Geometry contructor functions work.
function A3(p, p1=34, p2="default p2") {

  this.p = p;
  this.p1 = p1;
  this.p2 = p2;
}


// Side remark (not needed to follow the lecture): there is a more modern version of the
// parameter object version (Example 1) based on object destructuring.
// (this is taken from Hack#7 on https://medium.com/dailyjs/7-hacks-for-es6-developers-4e24ff425d0b,
// see for instance here for more details on destructuring in general: https://exploringjs.com/impatient-js/ch_destructuring.html)
function A4(p, {p1=34, p2="default p2", p3={a:2, b:3}}={}) {
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
}
