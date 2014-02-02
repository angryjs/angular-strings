(function(angular, undefined) {
  'use strict';

  angular.module('angryjs.strings', [])

    .factory('Strings', function () {
      var nodiac = { 'á': 'a', 'č': 'c', 'ď': 'd', 'é': 'e', 'ě': 'e', 'í': 'i', 'ň': 'n', 'ó': 'o', 'ř': 'r', 'š': 's', 'ť': 't', 'ú': 'u', 'ů': 'u', 'ý': 'y', 'ž': 'z' };
      var Strings = function () {};

      Strings.prototype.webalize = function (s) {
        s = s.toLowerCase();
        var s2 = '';
        for (var i=0; i < s.length; i++) {
          s2 += (typeof nodiac[s.charAt(i)] != 'undefined' ? nodiac[s.charAt(i)] : s.charAt(i));
        }
        return s2.replace(/[^a-z0-9_]+/g, '-').replace(/^-|-$/g, '');
      };

      Strings.prototype.capitaliseFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      Strings.prototype.dateFromString = function (string) {
        if(typeof string === 'string') {
          var t = string.split(/[- :]/);
          return new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
        }

        return null;
      };

      Strings.prototype.htmlToPlaintext = function (text) {
        return String(text).replace(/<(?:.|\n)*?>/gm, '');
      };

      return new Strings();
    })

    .filter('dateFromString', ['Strings', function (Strings) {
      return function (string) {
        return Strings.dateFromString(string);
      }
    }])

    .filter('htmlToPlainText', ['Strings', function (Strings) {
      return function (string) {
        return Strings.htmlToPlaintext(string);
      }
    }])

    .filter('webalize', ['Strings', function (Strings) {
      return function (string) {
        return Strings.webalize(string);
      }
    }])

    .filter('truncate', function () {
      return function (text, length, end) {
        if (isNaN(length)) {
          length = 10;
        }

        if (end == undefined) {
          end = "...";
        }

        if (text.length <= length || text.length - end.length <= length) {
          return text;
        } else {
          return String(text).substring(0, length-end.length) + end
        }
      }
    });

})(window.angular);