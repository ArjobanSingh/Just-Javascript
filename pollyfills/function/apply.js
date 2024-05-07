// Please Note: This pollyfill is for non-strict mode, in strict mode
// the primitives and undefined/null values are not substituted to
// wrappers and global this respectively.

// Writing polly-fill to cover strict mode is quite tricky because:
// 1. It's tricky to find if strict mode is on or not in polly-fill,
// so defined non-strict mode pollyfills.
// 2. Moreover there is no direct way to pollyfill context as primitive or null,
// which happens in strict mode apply.

Function.prototype.myApply = function (context, argsArr) {
  const args = Array.isArray(argsArr) ? argsArr : [];

  let finalContext = context;
  if (typeof context === "number") finalContext = Number;
  else if (typeof context === "string") finalContext = String;
  else if (context === undefined || context === null) finalContext = globalThis;

  // Create unique key using Symbol() that can be assigned to the
  // context, so that we can invoke this function from context
  const uniqKey = Symbol();

  finalContext[uniqKey] = this;
  const result = finalContext[uniqKey](...args);
  delete finalContext[uniqKey];
  return result;
};

const obj = {
  firstName: "Arjoban",
  lastName: "Singh",
};

function printInfo(favLanguage) {
  console.log(`${this.firstName} ${this.lastName}`);
  console.log(`Favorite programming language:  ${favLanguage}`);
}
printInfo.myApply(obj, ["JavaScript"]);

function printLocation() {
  console.log(
    "This should print globalThis.location(non-strict mode): ",
    this.location
  );
}
printLocation.myApply(undefined);

function checkWithPrimitiveNum() {
  console.log(
    "This should invoke with Number wrapper, and its parseInt function is: ",
    this.parseInt
  );
}
checkWithPrimitiveNum.myApply(1);
