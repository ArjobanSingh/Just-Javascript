// Function 1: converts fn(1, 2, 3) to fn(1)(2)(3)

function sum(num1, num2, num3) {
  return num1 + num2 + num3;
}

function curry(fn, arity = fn.length) {
  return function (...args) {
    if (args.length >= arity) {
      return fn(...args);
    }

    return curry(function (...innerArgs) {
      return fn(...args, ...innerArgs);
    }, arity - args.length);
  };
}
