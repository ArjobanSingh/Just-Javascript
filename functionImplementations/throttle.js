function throttle(fn, delay, context) {
  let canCall = true;
  return function (...args) {
    if (!canCall) return;
    canCall = false;
    fn.apply(context || this, args);
    setTimeout(() => {
      canCall = true;
    }, delay);
  };
}
