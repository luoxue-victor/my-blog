import util from '../util'

const win = util.win,
  doc = win.document,
  Browser = function (vue, params) {
    this.vue = vue;
    const r = this;
    var t;
    try {
      t = "object" == typeof performance ? performance.timing.fetchStart : Date.now();
    } catch (r) {
      t = Date.now();
    }
    this._startTime = t,
      r.initHandler(), r.initFmpObserver(1e4);
  };

Browser.prototype = util.ext(Browser.prototype, {
  constructor: Browser,
  onReady: function (e) {
    const r = this;
    if (r.hasReady) return e();
    "complete" === doc.readyState ? (r.hasReady = !0, e()) : util.on(win, "load", function () {
      r.hasReady = !0, e();
    }, !0);
  }
});
var f = require('./fmp'), h = require('./handler');
typeof h === 'function' ? h(Browser, win, doc) : h.default(Browser, win, doc);
typeof f === 'function' ? f(Browser, win, doc) : f.default(Browser, win, doc);

export default Browser