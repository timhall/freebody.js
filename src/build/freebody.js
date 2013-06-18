(function (root, factory) {
  var dep = 'underscore';

  if (typeof exports === 'object') {
    module.exports = factory(require(dep));
  } else if (typeof define === 'function' && define.amd) {
    define([dep], factory);
  } else {
    root.freebody = factory(root._);
  }
}(this, function (_) {
  "use strict";

  // Define and export the freebody namespace
  var freebody = {};

// @include ../utils.js
// @include ../Vector.js
// @include ../Body.js
// @include ../gravity.js
  return freebody;
}));
