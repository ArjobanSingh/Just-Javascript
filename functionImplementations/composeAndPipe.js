function composeWithSingleInitialArg(...fns) {
  if (!fns.length) return (val) => val;

  return function (arg) {
    return fns.reduceRight((ans, fn) => fn(ans), arg);
  };
}

// [fn1, fn2] ===> (...args) => fn1(fn2(...args));
// [fn1, fn2, fn3] ===> (...args) => accFunc(fn3(...args))
function compose(...funcs) {
  if (!funcs.length) return (...args) => args;

  return funcs.reduce(function (acc, cur) {
    return function (...args) {
      return acc(cur(...args));
    };
  });
}

// [fn1, fn2] ===> (...args) => fn2(fn1(...args));
// [fn1, fn2, fn3] ===> (...args) => fn3(accFunc(...args))
function pipe(...funcs) {
  if (!funcs.length) return (...args) => args;

  return funcs.reduce((accFn, currFn) => {
    return (...args) => {
      return currFn(accFn(...args));
    };
  });
}

const getFullName = (firstName, lastName) => `${firstName} ${lastName}`;
const uppercase = (string) => string.toUpperCase();
const removeSpace = (string) => string.replace(/\s/g, "");
const reverse = (string) => string.split("").reverse().join("");

const obj = { firstName: "Arjoban", lastName: "Singh" };

const normalResult = reverse(
  removeSpace(uppercase(getFullName("Arjoban", "Singh")))
);

const pipeResult = pipe(
  getFullName,
  uppercase,
  removeSpace,
  reverse
)("Arjoban", "Singh");

const composeResult = compose(
  reverse,
  removeSpace,
  uppercase,
  getFullName
)("Arjoban", "Singh");

console.log({ normalResult, pipeResult, composeResult });
