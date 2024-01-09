function prettyPrintBufferAttr(attr) {

  console.log('attr.array.length=', attr.array.length);
  console.log('attr.count=', attr.count);
  console.log('attr.itemSize=', attr.itemSize);


  for(let itemIdx = 0; itemIdx<attr.count; ++itemIdx) {
    let s = 'item ' + itemIdx + ';'; // ':(';

    for(let elIdx = 0; elIdx<attr.itemSize; ++elIdx) {
      const idx = itemIdx * attr.itemSize + elIdx;
      const num = attr.array[idx];
      s += num.toFixed(2);
      if(elIdx<attr.itemSize-1) {
        s += '; ';
      }
    }
    console.log(s); // + ')');
  }
}
