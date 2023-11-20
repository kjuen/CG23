/**
 * prints a THREE.Matrix3 or THREE.Matrix4 object in matrix shape
 * @param{object} m THREE.Matrix3 or THREE.Matrix4 object to print
 * @param{number} fixed small integer giving the number of digits to print
 */
function printMat(m, fixed=3) {
  const len = Math.sqrt(m.elements.length);
  for(let r=0;r<len; ++r) {
    let str = '';
    for (let c=0; c<len; ++c) {
      const num = m.elements[c*len+r];
      if (num>=0) str += ' ' + num.toFixed(fixed) + ' ';
      else str += num.toFixed(fixed) + ' ';
    }
    console.log(str);
  }
}
