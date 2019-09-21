import util from '../util';
var checkInterval = 500;

export default function (e, n, t) {
  function r(e, n, t) {
    var i = 0,
      u = e.tagName;
    if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
      var c = e.children ? e.children.length : 0;
      if (c > 0) for (var a = e.children, l = c - 1; l >= 0; l--) {
        i += r(a[l], n + 1, i > 0);
      }
      if (i <= 0 && !t) {
        if (!(e.getBoundingClientRect && e.getBoundingClientRect().top < o)) return 0;
      }
      i += 1 + .5 * n;
    }
    return i;
  }
  var imgs = []
  function i(e) {
    for (var n = 1; n < e.length; n++) {
      if (e[n].score < e[n - 1].score) return e.splice(n, 1), i(e);
    } return e;
  }
  var o = n.innerHeight || 0,
    u = [],
    c = null,
    a = 0;
  util.ext(e.prototype, {
    initFmpObserver: function initFmpObserver(e) {
      var i = this;
      if (!n.MutationObserver) return util.warn("[retcode] first meaningful paint can not be retrieved"), i.setPerformance({}), null;
      function listenTouchstart() {
        if (performance && performance.now() > 2000) {
          i.endObserving(0, !0);
          util.off(n, 'touchstart', listenTouchstart)
        }
      }
      util.on(n, 'touchstart', listenTouchstart)
      var o = n.MutationObserver;
      return (c = new o(function () {
        !function (e) {
          var n = Date.now() - e,
            i = t.querySelector("body");
          if (i) {
            var o = 0;
            o += r(i, 1, !1), u.push({
              score: o,
              t: n
            });
            console.log('权重：', o)
          } else u.push({
            score: 0,
            t: n
          });
        }(i._startTime);
      })).observe(document.body, {
        childList: !0,
        subtree: !0
      }), a = 1, i.onReady(function () {
        i.endObserving(e);
      }), c;
    },
    endObserving: function endObserving(e, n) {
      var t = this;
      if (c && a) if (n || !function (e, n) {
        var t = Date.now() - e;
        return !(t > n || t - (u && u.length && u[u.length - 1].t || 0) > 2 * checkInterval);
      }(t._startTime, e)) {
        c.disconnect(), a = 0, u = i(u);
        for (var r = null, o = 1; o < u.length; o++) {
          if (u[o].t >= u[o - 1].t) {
            var l = u[o].score - u[o - 1].score;
            (!r || r.rate <= l) && (r = {
              t: u[o].t,
              rate: l
            });
          }
        }
        this.fmp = r && r.t || 0;
        try {
          t.f(document.body)
          var max = Math.max(...imgs.map(element => {
            if (/^(\/\/)/.test(element)) element = 'https:' + element;
            try {
              return performance.getEntriesByName(element)[0].responseEnd || 0
            } catch (error) {
              return 0
            }
          }))
          r && r.t > 0 && r.t < 36e5 ? t.setPerformance({
            fmp: parseInt(Math.max(r.t, max))
          }) : t.setPerformance({});

          console.log('监听dom渲染完成时间：', parseInt(Math.max(r.t, max)))
        } catch (error) {
          t.setPerformance({});
        }
      } else util.delay(function () {
        t.endObserving(e);
      }, checkInterval);
    },
    f(e) {
      var t = this,
        u = e.tagName;
      if ("SCRIPT" !== u && "STYLE" !== u && "META" !== u && "HEAD" !== u) {
        var b = util.getImgSrcFromDom(e)
        if (b) imgs.push(b)
        var c = e.children ? e.children.length : 0;
        if (c > 0) for (var a = e.children, l = c - 1; l >= 0; l--) t.f(a[l]);
      }
    }
  });
};