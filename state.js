(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.LELE_STATE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function createStationState(total) {
    const lit = new Set();

    return {
      light(id) {
        if (lit.has(id) || lit.size >= total) return false;
        lit.add(id);
        return true;
      },
      isLit(id) {
        return lit.has(id);
      },
      count() {
        return lit.size;
      },
      complete() {
        return lit.size === total;
      }
    };
  }

  return { createStationState };
});
