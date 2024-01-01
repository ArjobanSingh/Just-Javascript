Array.prototype.myMap = function (callback, context = globalThis) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];
  result.length = this.length;

  for (let idx = 0; idx < this.length; idx++) {
    // basically skip over empty slots provided in sparse array
    if (idx in this) {
      result[idx] = callback.call(context, this[idx], idx, this);
    }
  }

  return result;
};

console.log(
  "Simple map: ",
  [1, 2, 3].myMap((num) => num * 2)
);

const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 5, // ignored by map() since length is 3
};

console.log(
  "Array like structure map",
  Array.prototype.myMap.call(arrayLike, (x) => x ** 2)
);

console.log(
  "Sparse arrays",
  [1, , 3].myMap((x, index) => {
    console.log(`Visit ${index}`);
    return x * 2;
  })
);
