const primitiveTypes = ["number", "bigint", "string", "boolean"];
const ignoreTypes = ["undefined", "function", "symbol"];

// The ignoreTypes is converted to null inside arrays as in JSON.stringify
// Nested array and object is processed and added inside the stringified array
// Every primitive apart from string is directly added to the stringified array
// The string primitive type is wrapped with "" before adding it to the the stringified array
function handleArrays(arr) {
  const result = [];
  arr.forEach((item, idx) => {
    const itemType = typeof item;

    if (item === null || ignoreTypes.includes(itemType)) {
      result.push("null");
      return;
    }

    if (primitiveTypes.includes(itemType)) {
      result.push(itemType === "string" ? `"${item}"` : item);
      return;
    }

    if (Array.isArray(item)) {
      result.push(handleArrays(item));
      return;
    }

    if (itemType === "object") {
      result.push(handleObjects(item));
      return;
    }
  });

  return `[${result.join(",")}]`;
}

// Same functionality as in handleArrays except, the ignoreTypes
// are ignored and their keys value pairs are not added to the stringified obj.
function handleObjects(obj) {
  let result = "{";
  const entries = Object.entries(obj);
  entries.forEach(([key, item], idx) => {
    const itemType = typeof item;
    const isLastKey = idx === entries.length - 1;
    if (ignoreTypes.includes(itemType)) {
      return;
    }

    let updatedValue = "";
    if (item === null) {
      updatedValue = null;
    } else if (primitiveTypes.includes(itemType)) {
      updatedValue = itemType === "string" ? `"${item}"` : item;
    } else if (Array.isArray(item)) {
      updatedValue = handleArrays(item);
    } else if (itemType === "object") {
      updatedValue = handleObjects(item);
    } else {
      //   There shouldn't be anything left
      return;
    }
    result += `"${key}":${updatedValue}${isLastKey ? "" : ","}`;
  });

  result += "}";
  return result;
}

function stringify(value) {
  const valueType = typeof value;

  if (value === null) return "null";
  if (ignoreTypes.includes(valueType)) return undefined;
  if (primitiveTypes.includes(valueType)) {
    return `${value}`;
  }

  if (Array.isArray(value)) return handleArrays(value);
  if (valueType === "object") return handleObjects(value);
  return "";
}

const obj = {
  num: 1,
  str: "text",
  bool: true,
  simplArr: [1, 2],
  objArr: [{ one: 1 }, { nestedArr: ["user", "name"] }],
  obj: {
    name: "user name",
    interests: ["cricket", "basketball", Symbol(), () => {}, undefined],
    jobs: {
      job1: "Company1",
      job2: "Company2",
      fn: () => {},
      sm: Symbol(),
      un: undefined,
      nl: null,
    },
  },
};

console.log("Is equal nested obj: ", stringify(obj) === JSON.stringify(obj));
console.log("Is equal null: ", stringify(null) === JSON.stringify(null));
console.log("Is equal undefined: ", stringify() === JSON.stringify());
console.log(
  "Is equal Symbol(): ",
  stringify(Symbol()) === JSON.stringify(Symbol())
);
console.log(
  "Is equal function: ",
  stringify(() => {}) === JSON.stringify(() => {})
);
