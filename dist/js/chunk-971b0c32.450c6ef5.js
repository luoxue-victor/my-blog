(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-971b0c32"],{"0b64":function(t,n,e){var r=e("f772"),o=e("9003"),i=e("5168")("species");t.exports=function(t){var n;return o(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)||(n=void 0),r(n)&&(n=n[i],null===n&&(n=void 0))),void 0===n?Array:n}},1173:function(t,n){t.exports=function(t,n,e,r){if(!(t instanceof n)||void 0!==r&&r in t)throw TypeError(e+": incorrect invocation!");return t}},"2d7d":function(t,n,e){t.exports=e("5037")},3024:function(t,n){t.exports=function(t,n,e){var r=void 0===e;switch(n.length){case 0:return r?t():t.call(e);case 1:return r?t(n[0]):t.call(e,n[0]);case 2:return r?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return r?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return r?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},4517:function(t,n,e){var r=e("a22a");t.exports=function(t,n){var e=[];return r(t,!1,e.push,e,n),e}},"454f":function(t,n,e){e("46a7");var r=e("584a").Object;t.exports=function(t,n,e){return r.defineProperty(t,n,e)}},"46a7":function(t,n,e){var r=e("63b6");r(r.S+r.F*!e("8e60"),"Object",{defineProperty:e("d9f6").f})},"4c95":function(t,n,e){"use strict";var r=e("e53d"),o=e("584a"),i=e("d9f6"),u=e("8e60"),c=e("5168")("species");t.exports=function(t){var n="function"==typeof o[t]?o[t]:r[t];u&&n&&!n[c]&&i.f(n,c,{configurable:!0,get:function(){return this}})}},5037:function(t,n,e){e("c207"),e("1654"),e("6c1c"),e("837d"),e("5cb6"),e("fe1e"),e("7554"),t.exports=e("584a").Map},"57b1":function(t,n,e){var r=e("d864"),o=e("335c"),i=e("241e"),u=e("b447"),c=e("bfac");t.exports=function(t,n){var e=1==t,a=2==t,f=3==t,s=4==t,p=6==t,l=5==t||p,v=n||c;return function(n,c,d){for(var h,b,y=i(n),w=o(y),_=r(c,d,3),m=u(w.length),g=0,x=e?v(n,m):a?v(n,0):void 0;m>g;g++)if((l||g in w)&&(h=w[g],b=_(h,g,y),t))if(e)x[g]=b;else if(b)switch(t){case 3:return!0;case 5:return h;case 6:return g;case 2:x.push(h)}else if(s)return!1;return p?-1:f||s?s:x}}},"5aee":function(t,n,e){"use strict";var r=e("d9f6").f,o=e("a159"),i=e("5c95"),u=e("d864"),c=e("1173"),a=e("a22a"),f=e("30f1"),s=e("50ed"),p=e("4c95"),l=e("8e60"),v=e("ebfd").fastKey,d=e("9f79"),h=l?"_s":"size",b=function(t,n){var e,r=v(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,f){var s=t((function(t,r){c(t,s,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[h]=0,void 0!=r&&a(r,e,t[f],t)}));return i(s.prototype,{clear:function(){for(var t=d(this,n),e=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete e[r.i];t._f=t._l=void 0,t[h]=0},delete:function(t){var e=d(this,n),r=b(e,t);if(r){var o=r.n,i=r.p;delete e._i[r.i],r.r=!0,i&&(i.n=o),o&&(o.p=i),e._f==r&&(e._f=o),e._l==r&&(e._l=i),e[h]--}return!!r},forEach:function(t){d(this,n);var e,r=u(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.n:this._f){r(e.v,e.k,this);while(e&&e.r)e=e.p}},has:function(t){return!!b(d(this,n),t)}}),l&&r(s.prototype,"size",{get:function(){return d(this,n)[h]}}),s},def:function(t,n,e){var r,o,i=b(t,n);return i?i.v=e:(t._l=i={i:o=v(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[h]++,"F"!==o&&(t._i[o]=i)),t},getEntry:b,setStrong:function(t,n,e){f(t,n,(function(t,e){this._t=d(t,n),this._k=e,this._l=void 0}),(function(){var t=this,n=t._k,e=t._l;while(e&&e.r)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?s(0,"keys"==n?e.k:"values"==n?e.v:[e.k,e.v]):(t._t=void 0,s(1))}),e?"entries":"values",!e,!0),p(n)}}},"5c95":function(t,n,e){var r=e("35e8");t.exports=function(t,n,e){for(var o in n)e&&t[o]?t[o]=n[o]:r(t,o,n[o]);return t}},"5cb6":function(t,n,e){var r=e("63b6");r(r.P+r.R,"Map",{toJSON:e("f228")("Map")})},"68f7":function(t,n,e){"use strict";var r=e("63b6"),o=e("79aa"),i=e("d864"),u=e("a22a");t.exports=function(t){r(r.S,t,{from:function(t){var n,e,r,c,a=arguments[1];return o(this),n=void 0!==a,n&&o(a),void 0==t?new this:(e=[],n?(r=0,c=i(a,arguments[2],2),u(t,!1,(function(t){e.push(c(t,r++))}))):u(t,!1,e.push,e),new this(e))}})}},7075:function(t,n,e){"use strict";var r=e("63b6");t.exports=function(t){r(r.S,t,{of:function(){var t=arguments.length,n=new Array(t);while(t--)n[t]=arguments[t];return new this(n)}})}},"733c":function(t,n,e){var r=e("63b6"),o=e("a159"),i=e("79aa"),u=e("e4ae"),c=e("f772"),a=e("294c"),f=e("c189"),s=(e("e53d").Reflect||{}).construct,p=a((function(){function t(){}return!(s((function(){}),[],t)instanceof t)})),l=!a((function(){s((function(){}))}));r(r.S+r.F*(p||l),"Reflect",{construct:function(t,n){i(t),u(n);var e=arguments.length<3?t:i(arguments[2]);if(l&&!p)return s(t,n,e);if(t==e){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var r=[null];return r.push.apply(r,n),new(f.apply(t,r))}var a=e.prototype,v=o(c(a)?a:Object.prototype),d=Function.apply.call(t,v,n);return c(d)?d:v}})},7554:function(t,n,e){e("68f7")("Map")},"837d":function(t,n,e){"use strict";var r=e("5aee"),o=e("9f79"),i="Map";t.exports=e("ada4")(i,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=r.getEntry(o(this,i),t);return n&&n.v},set:function(t,n){return r.def(o(this,i),0===t?0:t,n)}},r,!0)},"83fd":function(t,n,e){},"85f2":function(t,n,e){t.exports=e("454f")},"9f79":function(t,n,e){var r=e("f772");t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},a22a:function(t,n,e){var r=e("d864"),o=e("b0dc"),i=e("3702"),u=e("e4ae"),c=e("b447"),a=e("7cd6"),f={},s={};n=t.exports=function(t,n,e,p,l){var v,d,h,b,y=l?function(){return t}:a(t),w=r(e,p,n?2:1),_=0;if("function"!=typeof y)throw TypeError(t+" is not iterable!");if(i(y)){for(v=c(t.length);v>_;_++)if(b=n?w(u(d=t[_])[0],d[1]):w(t[_]),b===f||b===s)return b}else for(h=y.call(t);!(d=h.next()).done;)if(b=o(h,w,d.value,n),b===f||b===s)return b};n.BREAK=f,n.RETURN=s},a5b2:function(t,n,e){t.exports=e("aa28")},aa28:function(t,n,e){e("733c"),t.exports=e("584a").Reflect.construct},ada4:function(t,n,e){"use strict";var r=e("e53d"),o=e("63b6"),i=e("ebfd"),u=e("294c"),c=e("35e8"),a=e("5c95"),f=e("a22a"),s=e("1173"),p=e("f772"),l=e("45f2"),v=e("d9f6").f,d=e("57b1")(0),h=e("8e60");t.exports=function(t,n,e,b,y,w){var _=r[t],m=_,g=y?"set":"add",x=m&&m.prototype,O={};return h&&"function"==typeof m&&(w||x.forEach&&!u((function(){(new m).entries().next()})))?(m=n((function(n,e){s(n,m,t,"_c"),n._c=new _,void 0!=e&&f(e,y,n[g],n)})),d("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),(function(t){var n="add"==t||"set"==t;t in x&&(!w||"clear"!=t)&&c(m.prototype,t,(function(e,r){if(s(this,m,t),!n&&w&&!p(e))return"get"==t&&void 0;var o=this._c[t](0===e?0:e,r);return n?this:o}))})),w||v(m.prototype,"size",{get:function(){return this._c.size}})):(m=b.getConstructor(n,t,y,g),a(m.prototype,e),i.NEED=!0),l(m,t),O[t]=m,o(o.G+o.W+o.F,O),w||b.setStrong(m,t,y),m}},b0b4:function(t,n,e){"use strict";e.d(n,"a",(function(){return u}));var r=e("85f2"),o=e.n(r);function i(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),o()(t,r.key,r)}}function u(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}},b835:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"wrap"},[e("button",{on:{click:function(n){return t.push("a")}}},[t._v("pushState A")]),e("button",{on:{click:function(n){return t.push("b")}}},[t._v("pushState B")]),e("my-router-view")],1)},o=[],i=e("d225"),u=e("b0b4"),c=e("308d"),a=e("6bb5"),f=e("4e2b"),s=e("9ab4"),p=e("60a3"),l=e("bd86"),v={name:"MyRouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,n){n.props,n.children,n.parent,n.data}},d=window.performance&&window.performance.now?window.performance:Date;function h(){return d.now().toFixed(3)}var b={};function y(t){var n=window.history,e=h();n.pushState({key:e},"",t),b[e]=t}function w(t){window.addEventListener("popstate",(function(){var n=b[history.state.key];t._myrouterRoot._myrouter=n}))}var _,m,g="http://localhost:8080/source-code/dist/#";function x(t){x.installed&&_===t||(x.installed=!0,_=t,m=_,t.mixin({beforeCreate:function(){this._myrouterRoot=this.$parent&&this.$parent._myrouterRoot||this,t.util.defineReactive(this._myrouterRoot,"_myrouter",{}),this._myrouterRoot._myrouter.push=function(t){y(g+t.path)},m=this},mounted:function(){w(m)}}),Object.defineProperty(t.prototype,"$myrouter",{get:function(){return this._myrouterRoot._myrouter}}),t.component("MyRouterView",v))}e("a481");var O=e("4aa6"),R=e.n(O),j=e("2d7d"),k=e.n(j),S=e("54b6");function E(t){return-1!==Function.toString.call(t).indexOf("[native code]")}var F=e("a5b2"),M=e.n(F);function N(){if("undefined"===typeof Reflect||!M.a)return!1;if(M.a.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(M()(Date,[],(function(){}))),!0}catch(t){return!1}}function P(t,n,e){return P=N()?M.a:function(t,n,e){var r=[null];r.push.apply(r,n);var o=Function.bind.apply(t,r),i=new o;return e&&Object(S["a"])(i,e.prototype),i},P.apply(null,arguments)}function T(t){var n="function"===typeof k.a?new k.a:void 0;return T=function(t){if(null===t||!E(t))return t;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof n){if(n.has(t))return n.get(t);n.set(t,e)}function e(){return P(t,arguments,Object(a["a"])(this).constructor)}return e.prototype=R()(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),Object(S["a"])(e,t)},T(t)}T(History);function A(){var t=window.location.href,n=t.indexOf("#");if(n<0)return"";t=t.slice(n+1);var e=t.indexOf("?");if(e<0){var r=t.indexOf("#");t=r>-1?decodeURI(t.slice(0,r))+t.slice(r):decodeURI(t)}else e>-1&&(t=decodeURI(t.slice(0,e))+t.slice(e));return t}function I(t){var n=window.location.href,e=n.indexOf("#"),r=e>=0?n.slice(0,e):n;return"".concat(r,"#").concat(t)}function J(t){supportsPushState?replaceState(I(t)):window.location.replace(I(t))}var V=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(i["a"])(this,t),this.options=n,this.matcher=n.routes||[]};Object(l["a"])(V,"install",void 0),Object(l["a"])(V,"version",void 0),V.install=x,V.version="__VERSION__",window.Vue&&window.Vue.use(V),p["c"].use(V);var $={template:"<div>foo</div>"},z={template:"<div>bar</div>"},C=[{path:"/foo",component:$},{path:"/bar",component:z}];new V({routes:C});var D=function(t){function n(){return Object(i["a"])(this,n),Object(c["a"])(this,Object(a["a"])(n).apply(this,arguments))}return Object(f["a"])(n,t),Object(u["a"])(n,[{key:"push",value:function(t){var n=this;n.$myrouter.push({path:"/".concat(t,".html")})}},{key:"mounted",value:function(){console.log(this)}}]),n}(p["c"]);Object(s["a"])([Object(p["b"])()],D.prototype,"msg",void 0),D=Object(s["a"])([p["a"]],D);var U=D,B=U,K=(e("ba9e"),e("2877")),q=Object(K["a"])(B,r,o,!1,null,"77d07d2b",null);n["default"]=q.exports},ba9e:function(t,n,e){"use strict";var r=e("83fd"),o=e.n(r);o.a},bd86:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e("85f2"),o=e.n(r);function i(t,n,e){return n in t?o()(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}},bfac:function(t,n,e){var r=e("0b64");t.exports=function(t,n){return new(r(t))(n)}},c189:function(t,n,e){"use strict";var r=e("79aa"),o=e("f772"),i=e("3024"),u=[].slice,c={},a=function(t,n,e){if(!(n in c)){for(var r=[],o=0;o<n;o++)r[o]="a["+o+"]";c[n]=Function("F,a","return new F("+r.join(",")+")")}return c[n](t,e)};t.exports=Function.bind||function(t){var n=r(this),e=u.call(arguments,1),c=function(){var r=e.concat(u.call(arguments));return this instanceof c?a(n,r.length,r):i(n,r,t)};return o(n.prototype)&&(c.prototype=n.prototype),c}},f228:function(t,n,e){var r=e("40c3"),o=e("4517");t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+"#toJSON isn't generic");return o(this)}}},fe1e:function(t,n,e){e("7075")("Map")}}]);
//# sourceMappingURL=chunk-971b0c32.450c6ef5.js.map