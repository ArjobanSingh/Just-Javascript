Array.prototype.myForEach = function (callback, context = globalThis) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback.call(context, this[i], i, this);
    }
  }
};
