// Please Note: This pollyfill is for non-strict mode, in strict mode
// the primitives and undefined/null values are not substituted to
// wrappers and global this respectively.

// Writing polly-fill to cover strict mode is quite tricky because:
// 1. It's tricky to find if strict mode is on or not in polly-fill,
// so defined non-strict mode pollyfills.
// 2. Moreover there is no direct way to pollyfill context as primitive or null,
// which happens in strict mode call.
Function.prototype.myCall = function (context, ...args) {
  let finalContext = context;
  if (typeof context === "number") finalContext = new Number(context);
  else if (typeof context === "string") finalContext = new String(context);
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
printInfo.myCall(obj, "JavaScript");

function printLocation() {
  console.log("Undefined should render globalThis: ", this);
}
printLocation.myCall(null);

function checkWithPrimitiveNum() {
  console.log("Primitive type as context: ", this);
}
checkWithPrimitiveNum.myCall(1);

const callCannotAppliedArrowFunction = () => {
  console.log("GlobalThis in non-module else undefined: ", this);
};
callCannotAppliedArrowFunction.myCall();
