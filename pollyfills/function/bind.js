Function.prototype.myBind = function (context, ...bindArgs) {
  const cb = this;
  return function (...args) {
    return cb.call(context, ...bindArgs, ...args);
  };
};

const module = {
  x: 42,
  getX: function () {
    return this?.x;
  },
};

const unboundGetX = module.getX;
console.log("Unbounded call", unboundGetX());

const boundGetX = unboundGetX.myBind(module);
console.log("Bounded call", boundGetX());
// Expected output: 42

function log(...args) {
  console.log(this, ...args);
}
// Double bind example:
const boundLog = log.myBind({ value: "First context" }, 1, 2);
const boundLog2 = boundLog.myBind({ value: "second context" }, 3, 4);
boundLog2(5, 6); // { value: "First context" }, 1, 2, 3, 4, 5, 6
