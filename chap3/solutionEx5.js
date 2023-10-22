/*
 * colon generates vector of equidistant elements
 * @param{Number} start first element of generated vector
 * @param{Number} end last element of generated vector
 * @param{Number} incr (optional, default=1) increment between elements
 * @param{Array} the generated array
 */
function colon(start, end, incr=1) {
  const N = Math.floor((end-start)/incr) + 1;
  const result = new Array(N);
  result[0] = start;
  for(let k = 1; k<N; ++k) {
    result[k] = result[k-1] + incr;
  }
  return result;
}



/*
 * linspace generates vector of equidistant elements
 * @param{Number} start first element of generated vector
 * @param{Number} end last element of generated vector
 * @param{Number} N (optional) number of generated elements (default 100)
 * @param{Array} the generated array
 */
function linspace(start, end, N=100) {

  const result = new Array(N);
  result[0] = start;
  const incr = (end-start)/(N-1);
  for(let k = 1; k<N; ++k) {
    result[k] = result[k-1] + incr;
  }
  return result;
}
