Array.prototype.myFilter = function (callback, context = globalThis) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(context, this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

console.log(
  "Basic filter: ",
  [12, 5, 8, 130, 44].myFilter((item) => item > 10)
);

console.log(
  "Sparse eg 1: ",
  [1, , undefined].filter((x) => x === undefined)
);

console.log(
  "Sparse eg 2: ",
  [1, , undefined].filter((x) => x !== 2)
);
