(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30f9cfa6"],{"0a49":function(e,t,r){var n=r("9b43"),_=r("626a"),i=r("4bf8"),o=r("9def"),a=r("cd1c");e.exports=function(e,t){var r=1==e,c=2==e,u=3==e,s=4==e,f=6==e,d=5==e||f,l=t||a;return function(t,a,p){for(var v,h,b=i(t),E=_(b),g=n(a,p,3),O=o(E.length),w=0,y=r?l(t,O):c?l(t,0):void 0;O>w;w++)if((d||w in E)&&(v=E[w],h=g(v,w,b),e))if(r)y[w]=h;else if(h)switch(e){case 3:return!0;case 5:return v;case 6:return w;case 2:y.push(v)}else if(s)return!1;return f?-1:u||s?s:y}}},"0d6d":function(e,t,r){var n=r("d3f4"),_=r("67ab").onFreeze;r("5eda")("freeze",(function(e){return function(t){return e&&n(t)?e(_(t)):t}}))},"10ad":function(e,t,r){"use strict";var n,_=r("7726"),i=r("0a49")(0),o=r("2aba"),a=r("67ab"),c=r("7333"),u=r("643e"),s=r("d3f4"),f=r("b39a"),d=r("b39a"),l=!_.ActiveXObject&&"ActiveXObject"in _,p="WeakMap",v=a.getWeak,h=Object.isExtensible,b=u.ufstore,E=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},g={get:function(e){if(s(e)){var t=v(e);return!0===t?b(f(this,p)).get(e):t?t[this._i]:void 0}},set:function(e,t){return u.def(f(this,p),e,t)}},O=e.exports=r("e0b8")(p,E,g,u,!0,!0);d&&l&&(n=u.getConstructor(E,p),c(n.prototype,g),a.NEED=!0,i(["delete","has","get","set"],(function(e){var t=O.prototype,r=t[e];o(t,e,(function(t,_){if(s(t)&&!h(t)){this._f||(this._f=new n);var i=this._f[e](t,_);return"set"==e?this:i}return r.call(this,t,_)}))})))},2139:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"my-app"}},[r("input"),r("h1",{attrs:{"c-bind":"a.b.c.d.e"}}),r("input",{attrs:{"c-model":"a.b.c.d.e",type:"text"}})])}],i=r("d225"),o=r("b0b4"),a=r("308d"),c=r("6bb5"),u=r("4e2b"),s=r("9ab4"),f=r("60a3"),d=function(e){function t(){var e;return Object(i["a"])(this,t),e=Object(a["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.msg="proxy",e}return Object(u["a"])(t,e),Object(o["a"])(t,[{key:"mounted",value:function(){var e=r("bf81").default,t=e.createApp,n=e.reactive,_=r("f298"),i=_.effect,o={setup:function(){var e=n({a:{b:{c:{d:{e:222}}}}}),t=0;return i((function(){t=e.a.b.c.d.e})),console.log(t),e.a.b.c.d.e=333,console.log(t),e}};t().mount(o,"#my-app")}}]),t}(f["c"]);d=Object(s["a"])([f["a"]],d);var l=d,p=l,v=r("2877"),h=Object(v["a"])(p,n,_,!1,null,null,null);t["default"]=h.exports},"28a5":function(e,t,r){"use strict";var n=r("aae3"),_=r("cb7c"),i=r("ebd6"),o=r("0390"),a=r("9def"),c=r("5f1b"),u=r("520a"),s=r("79e5"),f=Math.min,d=[].push,l="split",p="length",v="lastIndex",h=4294967295,b=!s((function(){RegExp(h,"y")}));r("214f")("split",2,(function(e,t,r,s){var E;return E="c"=="abbc"[l](/(b)*/)[1]||4!="test"[l](/(?:)/,-1)[p]||2!="ab"[l](/(?:ab)*/)[p]||4!="."[l](/(.?)(.?)/)[p]||"."[l](/()()/)[p]>1||""[l](/.?/)[p]?function(e,t){var _=String(this);if(void 0===e&&0===t)return[];if(!n(e))return r.call(_,e,t);var i,o,a,c=[],s=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,l=void 0===t?h:t>>>0,b=new RegExp(e.source,s+"g");while(i=u.call(b,_)){if(o=b[v],o>f&&(c.push(_.slice(f,i.index)),i[p]>1&&i.index<_[p]&&d.apply(c,i.slice(1)),a=i[0][p],f=o,c[p]>=l))break;b[v]===i.index&&b[v]++}return f===_[p]?!a&&b.test("")||c.push(""):c.push(_.slice(f)),c[p]>l?c.slice(0,l):c}:"0"[l](void 0,0)[p]?function(e,t){return void 0===e&&0===t?[]:r.call(this,e,t)}:r,[function(r,n){var _=e(this),i=void 0==r?void 0:r[t];return void 0!==i?i.call(r,_,n):E.call(String(_),r,n)},function(e,t){var n=s(E,e,this,t,E!==r);if(n.done)return n.value;var u=_(e),d=String(this),l=i(u,RegExp),p=u.unicode,v=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(b?"y":"g"),g=new l(b?u:"^(?:"+u.source+")",v),O=void 0===t?h:t>>>0;if(0===O)return[];if(0===d.length)return null===c(g,d)?[d]:[];var w=0,y=0,m=[];while(y<d.length){g.lastIndex=b?y:0;var k,M=c(g,b?d:d.slice(y));if(null===M||(k=f(a(g.lastIndex+(b?0:y)),d.length))===w)y=o(d,y,p);else{if(m.push(d.slice(w,y)),m.length===O)return m;for(var D=1;D<=M.length-1;D++)if(m.push(M[D]),m.length===O)return m;y=w=k}}return m.push(d.slice(w)),m}]}))},"454f":function(e,t,r){r("46a7");var n=r("584a").Object;e.exports=function(e,t,r){return n.defineProperty(e,t,r)}},"46a7":function(e,t,r){var n=r("63b6");n(n.S+n.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"4f7f":function(e,t,r){"use strict";var n=r("c26b"),_=r("b39a"),i="Set";e.exports=r("e0b8")(i,(function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}}),{add:function(e){return n.def(_(this,i),e=0===e?0:e,e)}},n)},"5dbc":function(e,t,r){var n=r("d3f4"),_=r("8b97").set;e.exports=function(e,t,r){var i,o=t.constructor;return o!==r&&"function"==typeof o&&(i=o.prototype)!==r.prototype&&n(i)&&_&&_(e,i),e}},"5df3":function(e,t,r){"use strict";var n=r("02f4")(!0);r("01f9")(String,"String",(function(e){this._t=String(e),this._i=0}),(function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=n(t,r),this._i+=e.length,{value:e,done:!1})}))},"5eda":function(e,t,r){var n=r("5ca1"),_=r("8378"),i=r("79e5");e.exports=function(e,t){var r=(_.Object||{})[e]||Object[e],o={};o[e]=t(r),n(n.S+n.F*i((function(){r(1)})),"Object",o)}},"643e":function(e,t,r){"use strict";var n=r("dcbc"),_=r("67ab").getWeak,i=r("cb7c"),o=r("d3f4"),a=r("f605"),c=r("4a59"),u=r("0a49"),s=r("69a8"),f=r("b39a"),d=u(5),l=u(6),p=0,v=function(e){return e._l||(e._l=new h)},h=function(){this.a=[]},b=function(e,t){return d(e.a,(function(e){return e[0]===t}))};h.prototype={get:function(e){var t=b(this,e);if(t)return t[1]},has:function(e){return!!b(this,e)},set:function(e,t){var r=b(this,e);r?r[1]=t:this.a.push([e,t])},delete:function(e){var t=l(this.a,(function(t){return t[0]===e}));return~t&&this.a.splice(t,1),!!~t}},e.exports={getConstructor:function(e,t,r,i){var u=e((function(e,n){a(e,u,t,"_i"),e._t=t,e._i=p++,e._l=void 0,void 0!=n&&c(n,r,e[i],e)}));return n(u.prototype,{delete:function(e){if(!o(e))return!1;var r=_(e);return!0===r?v(f(this,t))["delete"](e):r&&s(r,this._i)&&delete r[this._i]},has:function(e){if(!o(e))return!1;var r=_(e);return!0===r?v(f(this,t)).has(e):r&&s(r,this._i)}}),u},def:function(e,t,r){var n=_(i(t),!0);return!0===n?v(e).set(t,r):n[e._i]=r,e},ufstore:v}},"85f2":function(e,t,r){e.exports=r("454f")},"8b97":function(e,t,r){var n=r("d3f4"),_=r("cb7c"),i=function(e,t){if(_(e),!n(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,n){try{n=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),n(e,[]),t=!(e instanceof Array)}catch(_){t=!0}return function(e,r){return i(e,r),t?e.__proto__=r:n(e,r),e}}({},!1):void 0),check:i}},aae3:function(e,t,r){var n=r("d3f4"),_=r("2d95"),i=r("2b4c")("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==_(e))}},b0b4:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r("85f2"),_=r.n(n);function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),_()(e,n.key,n)}}function o(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),e}},b39a:function(e,t,r){var n=r("d3f4");e.exports=function(e,t){if(!n(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},bf81:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"OperationTypes",(function(){return OperationTypes})),__webpack_require__.d(__webpack_exports__,"targetMap",(function(){return targetMap}));var _Users_luoxue_Desktop_source_code_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("75fc"),core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("f400"),core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es6_map__WEBPACK_IMPORTED_MODULE_1__),core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("d185"),core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(core_js_modules_es6_reflect_get__WEBPACK_IMPORTED_MODULE_2__),core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("28a5"),core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__),core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("ac6a"),core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_4__),core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("5df3"),core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_5__),core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("10ad"),core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(core_js_modules_es6_weak_map__WEBPACK_IMPORTED_MODULE_6__),_Users_luoxue_Desktop_source_code_node_modules_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("7618"),_effect_effect__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("f298"),isObject=function(e){return null!==e&&"object"===Object(_Users_luoxue_Desktop_source_code_node_modules_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_7__["a"])(e)},rawToReactive=new WeakMap,reactiveToRaw=new WeakMap,OperationTypes;(function(e){e["SET"]="set",e["ADD"]="add",e["DELETE"]="delete",e["CLEAR"]="clear",e["GET"]="get",e["HAS"]="has",e["ITERATE"]="iterate"})(OperationTypes||(OperationTypes={}));var targetMap=new WeakMap;__webpack_exports__["default"]={createApp:function(){return{mount:function(e,t){var r=e.setup(),n=document.querySelector(t).children,_=r;_compile(n,_)}}},reactive:reactive};var Dep={deps:[],add:function(e){this.deps.push(e)}};function notify(){Dep.deps.forEach((function(e){e.update()}))}function _watcher(e,t,r,n){return{node:e,attr:t,data:r,key:n,update:function(){var e=this,t=this.key.split(".");if(t.length>1){var r=null;return t.forEach((function(t){return r=e.data[t]||r&&r[t]})),void(this.node[this.attr]=r)}this.node[this.attr]=this.data[this.key]}}}function reactive(e){var t=rawToReactive.get(e);if(void 0!==t)return t;if(reactiveToRaw.has(e))return e;var r={get:function(t,r,n){var _=Reflect.get(t,r,n);return isObject(_)&&(e[r]=e[r]=reactive(_)),Object(_effect_effect__WEBPACK_IMPORTED_MODULE_8__["track"])(t,r),t[r]},set:function(e,t,r){return e[t]=r,notify(),Object(_effect_effect__WEBPACK_IMPORTED_MODULE_8__["trigger"])(e,t),r}};return t=new Proxy(e,r),rawToReactive.set(e,t),reactiveToRaw.set(t,e),targetMap.has(e)||targetMap.set(e,new Map),t}function _compile(nodes,$data){Object(_Users_luoxue_Desktop_source_code_node_modules_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["a"])(nodes).forEach((function(e,index){var theNode=nodes[index];if("INPUT"===theNode.tagName&&theNode.hasAttribute("c-model")){var key=theNode.getAttribute("c-model");Dep.add(_watcher(theNode,"value",$data,key)),theNode.addEventListener("input",(function(){var mutationKeys=key.split(".");mutationKeys.length>1?eval("$data.".concat(key,"='").concat(theNode.value,"'")):$data[key]=theNode.value}))}if(theNode.hasAttribute("c-bind")){var _key=theNode.getAttribute("c-bind");Dep.add(_watcher(theNode,"innerHTML",$data,_key))}})),notify()}},c26b:function(e,t,r){"use strict";var n=r("86cc").f,_=r("2aeb"),i=r("dcbc"),o=r("9b43"),a=r("f605"),c=r("4a59"),u=r("01f9"),s=r("d53b"),f=r("7a56"),d=r("9e1e"),l=r("67ab").fastKey,p=r("b39a"),v=d?"_s":"size",h=function(e,t){var r,n=l(t);if("F"!==n)return e._i[n];for(r=e._f;r;r=r.n)if(r.k==t)return r};e.exports={getConstructor:function(e,t,r,u){var s=e((function(e,n){a(e,s,t,"_i"),e._t=t,e._i=_(null),e._f=void 0,e._l=void 0,e[v]=0,void 0!=n&&c(n,r,e[u],e)}));return i(s.prototype,{clear:function(){for(var e=p(this,t),r=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete r[n.i];e._f=e._l=void 0,e[v]=0},delete:function(e){var r=p(this,t),n=h(r,e);if(n){var _=n.n,i=n.p;delete r._i[n.i],n.r=!0,i&&(i.n=_),_&&(_.p=i),r._f==n&&(r._f=_),r._l==n&&(r._l=i),r[v]--}return!!n},forEach:function(e){p(this,t);var r,n=o(e,arguments.length>1?arguments[1]:void 0,3);while(r=r?r.n:this._f){n(r.v,r.k,this);while(r&&r.r)r=r.p}},has:function(e){return!!h(p(this,t),e)}}),d&&n(s.prototype,"size",{get:function(){return p(this,t)[v]}}),s},def:function(e,t,r){var n,_,i=h(e,t);return i?i.v=r:(e._l=i={i:_=l(t,!0),k:t,v:r,p:n=e._l,n:void 0,r:!1},e._f||(e._f=i),n&&(n.n=i),e[v]++,"F"!==_&&(e._i[_]=i)),e},getEntry:h,setStrong:function(e,t,r){u(e,t,(function(e,r){this._t=p(e,t),this._k=r,this._l=void 0}),(function(){var e=this,t=e._k,r=e._l;while(r&&r.r)r=r.p;return e._t&&(e._l=r=r?r.n:e._t._f)?s(0,"keys"==t?r.k:"values"==t?r.v:[r.k,r.v]):(e._t=void 0,s(1))}),r?"entries":"values",!r,!0),f(t)}}},cd1c:function(e,t,r){var n=r("e853");e.exports=function(e,t){return new(n(e))(t)}},d185:function(e,t,r){var n=r("11e9"),_=r("38fd"),i=r("69a8"),o=r("5ca1"),a=r("d3f4"),c=r("cb7c");function u(e,t){var r,o,s=arguments.length<3?e:arguments[2];return c(e)===s?e[t]:(r=n.f(e,t))?i(r,"value")?r.value:void 0!==r.get?r.get.call(s):void 0:a(o=_(e))?u(o,t,s):void 0}o(o.S,"Reflect",{get:u})},e0b8:function(e,t,r){"use strict";var n=r("7726"),_=r("5ca1"),i=r("2aba"),o=r("dcbc"),a=r("67ab"),c=r("4a59"),u=r("f605"),s=r("d3f4"),f=r("79e5"),d=r("5cc5"),l=r("7f20"),p=r("5dbc");e.exports=function(e,t,r,v,h,b){var E=n[e],g=E,O=h?"set":"add",w=g&&g.prototype,y={},m=function(e){var t=w[e];i(w,e,"delete"==e?function(e){return!(b&&!s(e))&&t.call(this,0===e?0:e)}:"has"==e?function(e){return!(b&&!s(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return b&&!s(e)?void 0:t.call(this,0===e?0:e)}:"add"==e?function(e){return t.call(this,0===e?0:e),this}:function(e,r){return t.call(this,0===e?0:e,r),this})};if("function"==typeof g&&(b||w.forEach&&!f((function(){(new g).entries().next()})))){var k=new g,M=k[O](b?{}:-0,1)!=k,D=f((function(){k.has(1)})),P=d((function(e){new g(e)})),j=!b&&f((function(){var e=new g,t=5;while(t--)e[O](t,t);return!e.has(-0)}));P||(g=t((function(t,r){u(t,g,e);var n=p(new E,t,g);return void 0!=r&&c(r,h,n[O],n),n})),g.prototype=w,w.constructor=g),(D||j)&&(m("delete"),m("has"),h&&m("get")),(j||M)&&m(O),b&&w.clear&&delete w.clear}else g=v.getConstructor(t,e,h,O),o(g.prototype,r),a.NEED=!0;return l(g,e),y[e]=g,_(_.G+_.W+_.F*(g!=E),y),b||v.setStrong(g,e,h),g}},e853:function(e,t,r){var n=r("d3f4"),_=r("1169"),i=r("2b4c")("species");e.exports=function(e){var t;return _(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!_(t.prototype)||(t=void 0),n(t)&&(t=t[i],null===t&&(t=void 0))),void 0===t?Array:t}},f298:function(e,t,r){"use strict";r.r(t),r.d(t,"track",(function(){return a})),r.d(t,"trigger",(function(){return c})),r.d(t,"effect",(function(){return u}));var n=r("75fc"),_=(r("4f7f"),r("ac6a"),r("5df3"),r("f400"),r("0d6d"),r("bf81")),i=[],o=Object.freeze({});function a(e,t){var r=i[i.length-1];if(r){var n=_["targetMap"].get(e);void 0===n&&_["targetMap"].set(e,n=new Map);var o=n.get(t);o||n.set(t,o=new Set),o.has(r)||(o.add(r),r.deps.push(o))}}function c(e,t){var r=_["targetMap"].get(e),n=new Set;r&&r.get(t)&&(r.get(t).forEach((function(e){n.add(e)})),n.forEach((function(e){return e()})))}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;e.isEffect&&(e=e.raw);var r=s(e,t);return t.lazy||r(),r}function s(e,t){var r=function t(){for(var r=arguments.length,n=new Array(r),_=0;_<r;_++)n[_]=arguments[_];return f(t,e,n)};return r.isEffect=!0,r.active=!0,r.raw=e,r.scheduler=t.scheduler,r.onTrack=t.onTrack,r.onTrigger=t.onTrigger,r.onStop=t.onStop,r.computed=t.computed,r.deps=[],r}function f(e,t,r){if(!e.active)return t.apply(void 0,Object(n["a"])(r));if(-1===i.indexOf(e))try{return i.push(e),t.apply(void 0,Object(n["a"])(r))}finally{i.pop()}}},f400:function(e,t,r){"use strict";var n=r("c26b"),_=r("b39a"),i="Map";e.exports=r("e0b8")(i,(function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(e){var t=n.getEntry(_(this,i),e);return t&&t.v},set:function(e,t){return n.def(_(this,i),0===e?0:e,t)}},n,!0)}}]);
//# sourceMappingURL=chunk-30f9cfa6.c1af50bc.js.map