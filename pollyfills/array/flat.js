function innerFlat(result, arr, depth) {
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue;
    if (Array.isArray(arr[i]) && depth > 0) {
      innerFlat(result, arr[i], depth - 1);
    } else result.push(arr[i]);
  }
}

Array.prototype.myFlat = function (depth = 1) {
  const result = [];
  innerFlat(result, this, depth);
  return result;
};

console.log("Simple flat: ", [1, 2, [3, 4, [5]]].myFlat());
console.log("Level 2 flat: ", [1, 2, [3, 4, [5]]].myFlat(2));
const quiteNested = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log("Quite nested", quiteNested.myFlat(Infinity));

const sparseEg1 = [1, , 3, ["a", , ["d", , "e"]]];
console.log("Remove sparse within depth 1: ", sparseEg1.flat());
console.log("Remove sparse with depth 2: ", sparseEg1.myFlat(2));

const arrayLike = {
  length: 3,
  0: [1, 2],
  // Array-like objects aren't flattened
  1: { length: 2, 0: 3, 1: 4 },
  2: 5,
  3: 3, // ignored by flat() since length is 3
};
console.log("Array like flatten", Array.prototype.myFlat.call(arrayLike));
