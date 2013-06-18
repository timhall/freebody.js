require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/lodash/lodash'
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

require(['app'], function (app) {
  'use strict';


});