Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const isInitialValueNotGiven = arguments.length < 2;
  if (this.length === 0 && isInitialValueNotGiven) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let accumulator = isInitialValueNotGiven ? this[0] : initialValue;
  for (let i = isInitialValueNotGiven ? 1 : 0; i < this.length; i++) {
    // skip empty slot values in sparse arrays and only call callback on value items
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

function funcAndReturn(fn) {
  try {
    return fn();
  } catch (error) {
    return error.message;
  }
}

let res1 = funcAndReturn(() => [].reduce((acc, value) => acc + value));
let myRes1 = funcAndReturn(() => [].myReduce((acc, value) => acc + value));
if (res1 !== myRes1) {
  console.log("res1: ", res1);
  console.log("myRes1: ", myRes1);
}

let res2 = funcAndReturn(() => [].reduce((acc, value) => acc + value, 0));
let myRes2 = funcAndReturn(() => [].myReduce((acc, value) => acc + value, 0));
if (res2 !== myRes2) {
  console.log("res2: ", res2);
  console.log("myRes2: ", myRes2);
}

let res3 = funcAndReturn(() => [1, 2, 3].reduce((acc, value) => acc + value));
let myRes3 = funcAndReturn(() =>
  [1, 2, 3].myReduce((acc, value) => acc + value)
);

if (res3 !== myRes3) {
  console.log("res3: ", res3);
  console.log("myRes3: ", myRes3);
}

let res4 = funcAndReturn(() =>
  [1, 2, 3].reduce((acc, value) => acc + value, 0)
);
let myRes4 = funcAndReturn(() =>
  [1, 2, 3].myReduce((acc, value) => acc + value, 0)
);

if (res4 !== myRes4) {
  console.log("res4: ", res4);
  console.log("myRes4: ", myRes4);
}

let res5 = funcAndReturn(() =>
  [1, 2, 3].reduce((acc, value) => acc + value, 1)
);
let myRes5 = funcAndReturn(() =>
  [1, 2, 3].myReduce((acc, value) => acc + value, 1)
);
if (res5 !== myRes5) {
  console.log("res5: ", res5);
  console.log("myRes5: ", myRes5);
}

let res6 = funcAndReturn(() => [].reduce((acc, value) => acc + value));
let myRes6 = funcAndReturn(() => [].myReduce((acc, value) => acc + value));
if (res6 !== myRes6) {
  console.log("res6: ", res6);
  console.log("myRes6: ", myRes6);
}

let res7 = funcAndReturn(() => [undefined].reduce((acc, value) => acc + value));
let myRes7 = funcAndReturn(() =>
  [undefined].myReduce((acc, value) => acc + value)
);
if (res7 !== myRes7) {
  console.log("res7: ", res7);
  console.log("myRes7: ", myRes7);
}

let res8 = funcAndReturn(() =>
  [].reduce((acc, value) => acc + value, undefined)
);
let myRes8 = funcAndReturn(() =>
  [].myReduce((acc, value) => acc + value, undefined)
);
if (res8 !== myRes8) {
  console.log("res8: ", res8);
  console.log("myRes8: ", myRes8);
}

let res9 = funcAndReturn(() => [1].reduce((acc, value) => acc + value * 2, 0));
let myRes9 = funcAndReturn(() =>
  [1].myReduce((acc, value) => acc + value * 2, 0)
);

if (res9 !== myRes9) {
  console.log("res9: ", res9);
  console.log("myRes9: ", myRes9);
}

let res10 = funcAndReturn(() =>
  [1].reduce((acc, value) => {
    console.log("called callback in reduce");
    return acc + value * 2;
  })
);
let myRes10 = funcAndReturn(() =>
  [1].myReduce((acc, value) => acc + value * 2)
);

if (res10 !== myRes10) {
  console.log("res10: ", res10);
  console.log("myRes10: ", myRes10);
}
