function debounce(fn, delay, context) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context || this, args);
    }, delay);
  };
}
