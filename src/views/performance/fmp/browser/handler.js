export default function (e, n) {
  var t = require("../util").default || require("../util"),
    o = null;
  return t.ext(e.prototype, {
    activeErrHandler: function (e) {
      return o && !e ? this : (o = this, this);
    },
    setPerformance(e) {
      var n = this;
      n.onReady(function () {
        // 设置首屏时间
        // console.log({ atfTime: e.fmp || n.fmp || e.atfTime || 0, fmp: e.fmp || n.fmp || 0 })
      });
    },
    sendPerformance: function (e) {
      var n = this;
      n.onReady(function () {
      });
    },
    handleUnload: function (e) {
      var n = Date.now();
      var r = this
      if (n - this._lastUnload < 200) return this;
      this._lastUnload = n, (function () {
        if (performance.now() > 1000) r.sendPerformance()
      })();
    },
    bindHashChange: function (e) {
      var r = this;
      e
        ? (r.hashChangeHandler = function (e) {
          if (performance.now() > 1000) r.sendPerformance()
        }, r.stateChangeHandler = function (e) {
          if (performance.now() > 1000) r.sendPerformance()
        },
          t.on(n, t.supportsPushState ? 'popstate' : 'hashchange', r.hashChangeHandler),
          t.on(n, "historystatechange", r.stateChangeHandler),
          r.hashChangeHandler(!1))
        : (t.off(n, "hashchange", r.hashChangeHandler),
          t.off(n, "historystatechange", r.stateChangeHandler),
          r.hashChangeHandler = null, r.stateChangeHandler = null);
    },
    initHandler: function () {
      var e = this;
      if (e.hasInitHandler) return e;
      return t.on(n, "beforeunload", function (ee) {
        e.handleUnload(0);
      }), e.bindHashChange(true), e.activeErrHandler(!1), e.hasInitHandler = !0,
        e;
    }
  }), e;
};