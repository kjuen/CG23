/**
 * Exercise 2:
 * Calculate square root according to Newton iteration.
 * (see http://usejsdoc.org/ for more on JSDoc)
 *
 * @param {Number} a the value of which to calculate the square root.
 * @param {Number} tol accuracy of calculation, default value: 10^-8.
 * @returns {Number} the square root of a.
 */
function mysqrt(a, tol=1e-8) {

  // the recursive calculation
  let x = a;  // initial value x_0
  for(let n=0; n<1000; ++n) {
    console.log('Iteration ' + n + ': ' + x);
    x = 1/2 * (x+a/x);
    if (Math.abs(x*x-a) < tol) {
      break;
    }
  }
  return x;
}
