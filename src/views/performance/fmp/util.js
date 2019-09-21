var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Date.now = Date.now || function () {
  return new Date().getTime();
};
var store = [];
var noop = function noop() { },
  util = {
    noop: noop,
    win: "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window.document ? window : undefined,
    createObject: function createObject(t) {
      if (Object.create) return Object.create(t);
      var e = function e() { };
      return e.prototype = t, new e();
    },

    safetyCall: function safetyCall(t, e, n) {
      if ("function" != typeof t) return n;
      try {
        return t.apply(this, e);
      } catch (r) {
        return n;
      }
    },

    each: function each(t, e) {
      var n = 0,
        r = t.length;
      if (this.T(t, "Array")) for (; n < r && !1 !== e.call(t[n], t[n], n); n++) { } else for (n in t) {
        if (!1 === e.call(t[n], t[n], n)) break;
      } return t;
    },

    T: function T(t, e) {
      var n = Object.prototype.toString.call(t).substring(8).replace("]", "");
      return e ? n === e : n;
    },

    J: function J(t) {
      if (!t || "string" != typeof t) return t;
      var e = null;
      try {
        e = JSON.parse(t);
      } catch (n) { }
      return e;
    },

    on: function on(t, e, n, r) {
      return t.addEventListener ? t.addEventListener(e, function o(i) {
        r && t.removeEventListener(e, o, !1), n.call(this, i);
      }, !1) : t.attachEvent && t.attachEvent("on" + e, function i(o) {
        r && t.detachEvent("on" + e, i), n.call(this, o);
      }), this;
    },

    off: function off(t, e, n) {
      return n ? (t.removeEventListener ? t.removeEventListener(e, n) : t.detachEvent && t.detachEvent(e, n), this) : this;
    },

    ext: function ext(t) {
      for (var e = 1, n = arguments.length; e < n; e++) {
        var r = arguments[e];
        for (var o in r) {
          Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
        }
      }
      return t;
    },

    delay: function delay(t, e) {
      return -1 === e ? (t(), null) : setTimeout(t, e || 0);
    },

    supportsPushState: function () {
      var ua = window.navigator.userAgent;
      if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
        return false;
      }
      return window.history && 'pushState' in window.history;
    }(),

    _getImgSrcFromBgImg: function (bgImg) {
      var imgSrc;
      var matches = bgImg.match(/url\(.*?\)/g);
      if (matches && matches.length) {
        var urlStr = matches[matches.length - 1]; // use the last one
        var innerUrl = urlStr.replace(/^url\([\'\"]?/, '').replace(/[\'\"]?\)$/, '');
        if (((/^http/.test(innerUrl) || /^\/\//.test(innerUrl)))) {
          imgSrc = innerUrl;
        }
      }

      return imgSrc;
    },

    getImgSrcFromDom: function (dom, imgFilter) {
      if (!(dom.getBoundingClientRect && dom.getBoundingClientRect().top < window.innerHeight)) return false;
      imgFilter = [/(\.)(png|jpg|jpeg|gif|webp|ico|bmp|tiff|svg)/i]
      var src;
      if (dom.nodeName.toUpperCase() == 'IMG') {
        src = dom.getAttribute('src');
      } else {
        var computedStyle = window.getComputedStyle(dom);
        var bgImg = computedStyle.getPropertyValue('background-image') || computedStyle.getPropertyValue('background');
        var tempSrc = this._getImgSrcFromBgImg(bgImg, imgFilter);
        if (tempSrc && this._isImg(tempSrc, imgFilter)) {
          src = tempSrc;
        }
      }
      return src;
    },

    _isImg: function (src, imgFilter) {
      for (var i = 0, len = imgFilter.length; i < len; i++) {
        if (imgFilter[i].test(src)) {
          return true;
        }
      }
      return false;
    },
  };

export default util;