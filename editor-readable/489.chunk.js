"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[489],{

/***/ 9068:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qw: () => (/* binding */ Ae),
/* harmony export */   Rc: () => (/* binding */ De),
/* harmony export */   kt: () => (/* binding */ Me),
/* harmony export */   tz: () => (/* binding */ $e)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1609);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5795);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){c(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n,t){return(n=function(e){var n=function(e,n){if("object"!=typeof e||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,n||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==typeof n?n:String(n)}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function u(){return u=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},u.apply(this,arguments)}function l(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i,a,s=[],c=!0,u=!1;try{if(i=(t=t.call(e)).next,0===n){if(Object(t)!==t)return;c=!1}else for(;!(c=(r=i.call(t)).done)&&(s.push(r.value),s.length!==n);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=t.return&&(a=t.return(),Object(a)!==a))return}finally{if(u)throw o}}return s}}(e,n)||p(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,n){if(e){if("string"==typeof e)return d(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?d(e,n):void 0}}function d(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function m(e,n){return e(n={exports:{}},n.exports),n.exports}!function(e,n){void 0===n&&(n={});var t=n.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}('.contextmenu {\n  position: fixed;\n  width: 200px;\n  left: 0;\n  top: calc(100% + 10px);\n  border-radius: 4px;\n  background-color: #fff;\n  padding: 10px 0;\n  z-index: 99;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);\n}\n.contextmenu__item {\n  font-size: 14px;\n  display: block;\n  text-decoration: none;\n  padding: 10px 15px;\n  cursor: pointer;\n  user-select: none;\n  transition: 0.2s;\n  position: relative;\n  margin-bottom: 2px;\n}\n.contextmenu__item:hover:not(.contextmenu__item--disabled) {\n  background-color: #f1f1f1;\n}\n.contextmenu__item--disabled {\n  opacity: 0.5;\n  cursor: no-drop;\n}\n.contextmenu .submenu {\n  position: relative;\n}\n.contextmenu .submenu:hover > .contextmenu__item {\n  background-color: #f1f1f1;\n}\n.contextmenu .submenu__item {\n  position: absolute;\n  top: 0;\n  left: 100%;\n  width: 100%;\n  border: solid 1px #ccc;\n  background-color: #fff;\n  border-radius: 4px;\n  padding: 5px 0;\n  opacity: 0;\n  visibility: hidden;\n}\n.contextmenu .submenu > .contextmenu__item:after {\n  content: "";\n  border-style: solid;\n  border-width: 5px 8px;\n  border-color: transparent transparent transparent #000;\n  width: 0;\n  height: 0;\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  right: 0px;\n  transition: 0.2s;\n}\n\n.fade-enter {\n  opacity: 0;\n}\n\n.fade-enter-active {\n  opacity: 1;\n  transition: opacity 200ms;\n}\n\n.fade-exit {\n  opacity: 1;\n}\n\n.fade-exit-active {\n  opacity: 0;\n  transition: opacity 200ms;\n}\n\n.zoom-enter {\n  opacity: 0;\n  transform: scale(0.8);\n  transform-origin: top left;\n}\n\n.zoom-enter-active {\n  opacity: 1;\n  transform: scale(1);\n  transition: opacity 200ms, transform 200ms;\n  transform-origin: top left;\n}\n\n.zoom-exit {\n  opacity: 1;\n  transform: scale(1);\n  transform-origin: top left;\n}\n\n.zoom-exit-active {\n  opacity: 0;\n  transform: scale(0.8);\n  transition: opacity 200ms, transform 200ms;\n  transform-origin: top left;\n}\n\n.toTopLeft-enter {\n  opacity: 0;\n  transform: translate(10px, 10px);\n}\n\n.toTopLeft-enter-active {\n  opacity: 1;\n  transform: translate(0px, 0px);\n  transition: opacity 200ms, transform 200ms;\n}\n\n.toTopLeft-exit {\n  opacity: 1;\n  transform: translate(0px, 0px);\n}\n\n.toTopLeft-exit-active {\n  opacity: 0;\n  transform: translate(10px, 10px);\n  transition: opacity 200ms, transform 200ms;\n}\n\n.rightToLeft-enter {\n  opacity: 0;\n  transform: translateX(10px);\n}\n\n.rightToLeft-enter-active {\n  opacity: 1;\n  transform: translateX(0px);\n  transition: opacity 200ms, transform 200ms;\n}\n\n.rightToLeft-exit {\n  opacity: 1;\n  transform: translateX(0px);\n}\n\n.rightToLeft-exit-active {\n  opacity: 0;\n  transform: translateX(10px);\n  transition: opacity 200ms, transform 200ms;\n}\n\n.pop-enter {\n  opacity: 0;\n  transform: scale(0.8);\n}\n\n.pop-enter-active {\n  opacity: 1;\n  transform: scale(1);\n  transition: opacity 200ms, transform 200ms;\n}\n\n.pop-exit {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.pop-exit-active {\n  opacity: 0;\n  transform: scale(0.8);\n  transition: opacity 200ms, transform 200ms;\n}');var y=m((function(e){
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
!function(){var n={}.hasOwnProperty;function t(){for(var e=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var i=typeof o;if("string"===i||"number"===i)e.push(o);else if(Array.isArray(o)){if(o.length){var a=t.apply(null,o);a&&e.push(a)}}else if("object"===i){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){e.push(o.toString());continue}for(var s in o)n.call(o,s)&&o[s]&&e.push(s)}}}return e.join(" ")}e.exports?(t.default=t,e.exports=t):window.classNames=t}()})),v="undefined"==typeof arguments?void 0:arguments,b=function(e,n){var t,r;return function(){var o=window,i=v;r?(clearTimeout(t),t=setTimeout((function(){Date.now()-r>=n&&(e.apply(o,i),r=Date.now())}),n-(Date.now()-r))):(e.apply(o,i),r=Date.now())}},h={},g={},E=function(e,n,t){var r="_".concat(Math.random().toString(36).substr(2,9));return h[r]={id:e,showMenu:n,hideMenu:t},e},x=function(e){g.hideMenu&&g.hideMenu(),Object.keys(h).forEach((function(n){h[n].id&&h[n].id===e.id&&(h[n].showMenu(e),g=h[n])}))},O=function(e){g.id!==e&&"ID_NOT_REQUIRED"!==e||(g.hideMenu&&g.hideMenu(),g={})};function S(){return S=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},S.apply(this,arguments)}function w(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}function N(e,n){return N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,n){return e.__proto__=n,e},N(e,n)}function C(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,N(e,n)}
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var T="function"==typeof Symbol&&Symbol.for,j=T?Symbol.for("react.element"):60103,P=T?Symbol.for("react.portal"):60106,_=T?Symbol.for("react.fragment"):60107,k=T?Symbol.for("react.strict_mode"):60108,R=T?Symbol.for("react.profiler"):60114,$=T?Symbol.for("react.provider"):60109,M=T?Symbol.for("react.context"):60110,D=T?Symbol.for("react.async_mode"):60111,A=T?Symbol.for("react.concurrent_mode"):60111,L=T?Symbol.for("react.forward_ref"):60112,I=T?Symbol.for("react.suspense"):60113,V=T?Symbol.for("react.suspense_list"):60120,z=T?Symbol.for("react.memo"):60115,F=T?Symbol.for("react.lazy"):60116,W=T?Symbol.for("react.block"):60121,q=T?Symbol.for("react.fundamental"):60117,H=T?Symbol.for("react.responder"):60118,U=T?Symbol.for("react.scope"):60119;function X(e){if("object"==typeof e&&null!==e){var n=e.$$typeof;switch(n){case j:switch(e=e.type){case D:case A:case _:case R:case k:case I:return e;default:switch(e=e&&e.$$typeof){case M:case L:case F:case z:case $:return e;default:return n}}case P:return n}}}function Y(e){return X(e)===A}var B={AsyncMode:D,ConcurrentMode:A,ContextConsumer:M,ContextProvider:$,Element:j,ForwardRef:L,Fragment:_,Lazy:F,Memo:z,Portal:P,Profiler:R,StrictMode:k,Suspense:I,isAsyncMode:function(e){return Y(e)||X(e)===D},isConcurrentMode:Y,isContextConsumer:function(e){return X(e)===M},isContextProvider:function(e){return X(e)===$},isElement:function(e){return"object"==typeof e&&null!==e&&e.$$typeof===j},isForwardRef:function(e){return X(e)===L},isFragment:function(e){return X(e)===_},isLazy:function(e){return X(e)===F},isMemo:function(e){return X(e)===z},isPortal:function(e){return X(e)===P},isProfiler:function(e){return X(e)===R},isStrictMode:function(e){return X(e)===k},isSuspense:function(e){return X(e)===I},isValidElementType:function(e){return"string"==typeof e||"function"==typeof e||e===_||e===A||e===R||e===k||e===I||e===V||"object"==typeof e&&null!==e&&(e.$$typeof===F||e.$$typeof===z||e.$$typeof===$||e.$$typeof===M||e.$$typeof===L||e.$$typeof===q||e.$$typeof===H||e.$$typeof===U||e.$$typeof===W)},typeOf:X},J=m((function(e,n){ false&&0}));J.AsyncMode,J.ConcurrentMode,J.ContextConsumer,J.ContextProvider,J.Element,J.ForwardRef,J.Fragment,J.Lazy,J.Memo,J.Portal,J.Profiler,J.StrictMode,J.Suspense,J.isAsyncMode,J.isConcurrentMode,J.isContextConsumer,J.isContextProvider,J.isElement,J.isForwardRef,J.isFragment,J.isLazy,J.isMemo,J.isPortal,J.isProfiler,J.isStrictMode,J.isSuspense,J.isValidElementType,J.typeOf;var G=m((function(e){ true?e.exports=B:0})),Q=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var ee=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var n={},t=0;t<10;t++)n["_"+String.fromCharCode(t)]=t;var r=Object.getOwnPropertyNames(n).map((function(e){return n[e]}));if("0123456789"!==r.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(e){return!1}}()?Object.assign:function(e,n){for(var t,r,o=function(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),i=1;i<arguments.length;i++){for(var a in t=Object(arguments[i]))K.call(t,a)&&(o[a]=t[a]);if(Q){r=Q(t);for(var s=0;s<r.length;s++)Z.call(t,r[s])&&(o[r[s]]=t[r[s]])}}return o},ne="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",te=Function.call.bind(Object.prototype.hasOwnProperty),re=function(){};if(false){ var oe, ie, ae; }function se(e,n,t,r,o){if(false){ var c, s, a, i; }}se.resetWarningCache=function(){ false&&(0)};var ce=(/* unused pure expression or super */ null && (se)),ue=function(){};function le(){return null} false&&(0);var fe=function(e,n){var t="function"==typeof Symbol&&Symbol.iterator,r="@@iterator";var o="<<anonymous>>",i={array:u("array"),bigint:u("bigint"),bool:u("boolean"),func:u("function"),number:u("number"),object:u("object"),string:u("string"),symbol:u("symbol"),any:c(le),arrayOf:function(e){return c((function(n,t,r,o,i){if("function"!=typeof e)return new s("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside arrayOf.");var a=n[t];if(!Array.isArray(a))return new s("Invalid "+o+" `"+i+"` of type `"+p(a)+"` supplied to `"+r+"`, expected an array.");for(var c=0;c<a.length;c++){var u=e(a,c,r,o,i+"["+c+"]",ne);if(u instanceof Error)return u}return null}))},element:c((function(n,t,r,o,i){var a=n[t];return e(a)?null:new s("Invalid "+o+" `"+i+"` of type `"+p(a)+"` supplied to `"+r+"`, expected a single ReactElement.")})),elementType:c((function(e,n,t,r,o){var i=e[n];return G.isValidElementType(i)?null:new s("Invalid "+r+" `"+o+"` of type `"+p(i)+"` supplied to `"+t+"`, expected a single ReactElement type.")})),instanceOf:function(e){return c((function(n,t,r,i,a){if(!(n[t]instanceof e)){var c=e.name||o;return new s("Invalid "+i+" `"+a+"` of type `"+(((u=n[t]).constructor&&u.constructor.name?u.constructor.name:o)+"` supplied to `")+r+"`, expected instance of `"+c+"`.")}var u;return null}))},node:c((function(e,n,t,r,o){return f(e[n])?null:new s("Invalid "+r+" `"+o+"` supplied to `"+t+"`, expected a ReactNode.")})),objectOf:function(e){return c((function(n,t,r,o,i){if("function"!=typeof e)return new s("Property `"+i+"` of component `"+r+"` has invalid PropType notation inside objectOf.");var a=n[t],c=p(a);if("object"!==c)return new s("Invalid "+o+" `"+i+"` of type `"+c+"` supplied to `"+r+"`, expected an object.");for(var u in a)if(te(a,u)){var l=e(a,u,r,o,i+"."+u,ne);if(l instanceof Error)return l}return null}))},oneOf:function(e){if(!Array.isArray(e))return false&&0,le;return c((function(n,t,r,o,i){for(var c=n[t],u=0;u<e.length;u++)if(a(c,e[u]))return null;var l=JSON.stringify(e,(function(e,n){return"symbol"===d(n)?String(n):n}));return new s("Invalid "+o+" `"+i+"` of value `"+String(c)+"` supplied to `"+r+"`, expected one of "+l+".")}))},oneOfType:function(e){if(!Array.isArray(e))return false&&0,le;for(var n=0;n<e.length;n++){var t=e[n];if("function"!=typeof t)return ue("Invalid argument supplied to oneOfType. Expected an array of check functions, but received "+m(t)+" at index "+n+"."),le}return c((function(n,t,r,o,i){for(var a=[],c=0;c<e.length;c++){var u=(0,e[c])(n,t,r,o,i,ne);if(null==u)return null;u.data&&te(u.data,"expectedType")&&a.push(u.data.expectedType)}return new s("Invalid "+o+" `"+i+"` supplied to `"+r+"`"+(a.length>0?", expected one of type ["+a.join(", ")+"]":"")+".")}))},shape:function(e){return c((function(n,t,r,o,i){var a=n[t],c=p(a);if("object"!==c)return new s("Invalid "+o+" `"+i+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");for(var u in e){var f=e[u];if("function"!=typeof f)return l(r,o,i,u,d(f));var m=f(a,u,r,o,i+"."+u,ne);if(m)return m}return null}))},exact:function(e){return c((function(n,t,r,o,i){var a=n[t],c=p(a);if("object"!==c)return new s("Invalid "+o+" `"+i+"` of type `"+c+"` supplied to `"+r+"`, expected `object`.");var u=ee({},n[t],e);for(var f in u){var m=e[f];if(te(e,f)&&"function"!=typeof m)return l(r,o,i,f,d(m));if(!m)return new s("Invalid "+o+" `"+i+"` key `"+f+"` supplied to `"+r+"`.\nBad object: "+JSON.stringify(n[t],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "));var y=m(a,f,r,o,i+"."+f,ne);if(y)return y}return null}))}};function a(e,n){return e===n?0!==e||1/e==1/n:e!=e&&n!=n}function s(e,n){this.message=e,this.data=n&&"object"==typeof n?n:{},this.stack=""}function c(e){if(false){ var t, r; }function i(i,a,c,u,l,f,p){if(u=u||o,f=f||c,p!==ne){if(n){var d=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");throw d.name="Invariant Violation",d}if(false){ var m; }}return null==a[c]?i?null===a[c]?new s("The "+l+" `"+f+"` is marked as required in `"+u+"`, but its value is `null`."):new s("The "+l+" `"+f+"` is marked as required in `"+u+"`, but its value is `undefined`."):null:e(a,c,u,l,f)}var a=i.bind(null,!1);return a.isRequired=i.bind(null,!0),a}function u(e){return c((function(n,t,r,o,i,a){var c=n[t];return p(c)!==e?new s("Invalid "+o+" `"+i+"` of type `"+d(c)+"` supplied to `"+r+"`, expected `"+e+"`.",{expectedType:e}):null}))}function l(e,n,t,r,o){return new s((e||"React class")+": "+n+" type `"+t+"."+r+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+o+"`.")}function f(n){switch(typeof n){case"number":case"string":case"undefined":return!0;case"boolean":return!n;case"object":if(Array.isArray(n))return n.every(f);if(null===n||e(n))return!0;var o=function(e){var n=e&&(t&&e[t]||e[r]);if("function"==typeof n)return n}(n);if(!o)return!1;var i,a=o.call(n);if(o!==n.entries){for(;!(i=a.next()).done;)if(!f(i.value))return!1}else for(;!(i=a.next()).done;){var s=i.value;if(s&&!f(s[1]))return!1}return!0;default:return!1}}function p(e){var n=typeof e;return Array.isArray(e)?"array":e instanceof RegExp?"object":function(e,n){return"symbol"===e||!!n&&("Symbol"===n["@@toStringTag"]||"function"==typeof Symbol&&n instanceof Symbol)}(n,e)?"symbol":n}function d(e){if(null==e)return""+e;var n=p(e);if("object"===n){if(e instanceof Date)return"date";if(e instanceof RegExp)return"regexp"}return n}function m(e){var n=d(e);switch(n){case"array":case"object":return"an "+n;case"boolean":case"date":case"regexp":return"a "+n;default:return n}}return s.prototype=Error.prototype,i.checkPropTypes=ce,i.resetWarningCache=ce.resetWarningCache,i.PropTypes=i,i};function pe(){}function de(){}de.resetWarningCache=pe;var me=m((function(e){if(false){ var n; }else e.exports=function(){function e(e,n,t,r,o,i){if(i!==ne){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function n(){return e}e.isRequired=e;var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:n,element:e,elementType:e,instanceOf:n,node:e,objectOf:n,oneOf:n,oneOfType:n,shape:n,exact:n,checkPropTypes:de,resetWarningCache:pe};return t.PropTypes=t,t}()}));function ye(e,n){return e.replace(new RegExp("(^|\\s)"+n+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var ve=!1,be= false?0:null,he= false?0:null,ge=react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null),Ee=function(e){return e.scrollTop},xe="unmounted",Oe="exited",Se="entering",we="entered",Ne="exiting",Ce=function(n){function t(e,t){var r;r=n.call(this,e,t)||this;var o,i=t&&!t.isMounting?e.enter:e.appear;return r.appearStatus=null,e.in?i?(o=Oe,r.appearStatus=Se):o=we:o=e.unmountOnExit||e.mountOnEnter?xe:Oe,r.state={status:o},r.nextCallback=null,r}C(t,n),t.getDerivedStateFromProps=function(e,n){return e.in&&n.status===xe?{status:Oe}:null};var r=t.prototype;return r.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},r.componentDidUpdate=function(e){var n=null;if(e!==this.props){var t=this.state.status;this.props.in?t!==Se&&t!==we&&(n=Se):t!==Se&&t!==we||(n=Ne)}this.updateStatus(!1,n)},r.componentWillUnmount=function(){this.cancelNextCallback()},r.getTimeouts=function(){var e,n,t,r=this.props.timeout;return e=n=t=r,null!=r&&"number"!=typeof r&&(e=r.exit,n=r.enter,t=void 0!==r.appear?r.appear:n),{exit:e,enter:n,appear:t}},r.updateStatus=function(e,n){if(void 0===e&&(e=!1),null!==n)if(this.cancelNextCallback(),n===Se){if(this.props.unmountOnExit||this.props.mountOnEnter){var t=this.props.nodeRef?this.props.nodeRef.current:react_dom__WEBPACK_IMPORTED_MODULE_1___default().findDOMNode(this);t&&Ee(t)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Oe&&this.setState({status:xe})},r.performEnter=function(e){var n=this,t=this.props.enter,r=this.context?this.context.isMounting:e,o=this.props.nodeRef?[r]:[react_dom__WEBPACK_IMPORTED_MODULE_1___default().findDOMNode(this),r],a=o[0],s=o[1],c=this.getTimeouts(),u=r?c.appear:c.enter;!e&&!t||ve?this.safeSetState({status:we},(function(){n.props.onEntered(a)})):(this.props.onEnter(a,s),this.safeSetState({status:Se},(function(){n.props.onEntering(a,s),n.onTransitionEnd(u,(function(){n.safeSetState({status:we},(function(){n.props.onEntered(a,s)}))}))})))},r.performExit=function(){var e=this,n=this.props.exit,t=this.getTimeouts(),r=this.props.nodeRef?void 0:react_dom__WEBPACK_IMPORTED_MODULE_1___default().findDOMNode(this);n&&!ve?(this.props.onExit(r),this.safeSetState({status:Ne},(function(){e.props.onExiting(r),e.onTransitionEnd(t.exit,(function(){e.safeSetState({status:Oe},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:Oe},(function(){e.props.onExited(r)}))},r.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},r.safeSetState=function(e,n){n=this.setNextCallback(n),this.setState(e,n)},r.setNextCallback=function(e){var n=this,t=!0;return this.nextCallback=function(r){t&&(t=!1,n.nextCallback=null,e(r))},this.nextCallback.cancel=function(){t=!1},this.nextCallback},r.onTransitionEnd=function(e,n){this.setNextCallback(n);var t=this.props.nodeRef?this.props.nodeRef.current:react_dom__WEBPACK_IMPORTED_MODULE_1___default().findDOMNode(this),r=null==e&&!this.props.addEndListener;if(t&&!r){if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[t,this.nextCallback],a=o[0],s=o[1];this.props.addEndListener(a,s)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},r.render=function(){var n=this.state.status;if(n===xe)return null;var t=this.props,r=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var o=w(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ge.Provider,{value:null},"function"==typeof r?r(n,o):react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(react__WEBPACK_IMPORTED_MODULE_0___default().Children.only(r),o))},t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));function Te(){}Ce.contextType=ge,Ce.propTypes= false?0:{},Ce.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Te,onEntering:Te,onEntered:Te,onExit:Te,onExiting:Te,onExited:Te},Ce.UNMOUNTED=xe,Ce.EXITED=Oe,Ce.ENTERING=Se,Ce.ENTERED=we,Ce.EXITING=Ne;var je=Ce,Pe=function(e,n){return e&&n&&n.split(" ").forEach((function(n){return r=n,void((t=e).classList?t.classList.add(r):function(e,n){return e.classList?!!n&&e.classList.contains(n):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+n+" ")}(t,r)||("string"==typeof t.className?t.className=t.className+" "+r:t.setAttribute("class",(t.className&&t.className.baseVal||"")+" "+r)));var t,r}))},_e=function(e,n){return e&&n&&n.split(" ").forEach((function(n){return r=n,void((t=e).classList?t.classList.remove(r):"string"==typeof t.className?t.className=ye(t.className,r):t.setAttribute("class",ye(t.className&&t.className.baseVal||"",r)));var t,r}))},ke=function(n){function t(){for(var e,t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(e=n.call.apply(n,[this].concat(r))||this).appliedClasses={appear:{},enter:{},exit:{}},e.onEnter=function(n,t){var r=e.resolveArguments(n,t),o=r[0],i=r[1];e.removeClasses(o,"exit"),e.addClass(o,i?"appear":"enter","base"),e.props.onEnter&&e.props.onEnter(n,t)},e.onEntering=function(n,t){var r=e.resolveArguments(n,t),o=r[0],i=r[1]?"appear":"enter";e.addClass(o,i,"active"),e.props.onEntering&&e.props.onEntering(n,t)},e.onEntered=function(n,t){var r=e.resolveArguments(n,t),o=r[0],i=r[1]?"appear":"enter";e.removeClasses(o,i),e.addClass(o,i,"done"),e.props.onEntered&&e.props.onEntered(n,t)},e.onExit=function(n){var t=e.resolveArguments(n)[0];e.removeClasses(t,"appear"),e.removeClasses(t,"enter"),e.addClass(t,"exit","base"),e.props.onExit&&e.props.onExit(n)},e.onExiting=function(n){var t=e.resolveArguments(n)[0];e.addClass(t,"exit","active"),e.props.onExiting&&e.props.onExiting(n)},e.onExited=function(n){var t=e.resolveArguments(n)[0];e.removeClasses(t,"exit"),e.addClass(t,"exit","done"),e.props.onExited&&e.props.onExited(n)},e.resolveArguments=function(n,t){return e.props.nodeRef?[e.props.nodeRef.current,n]:[n,t]},e.getClassNames=function(n){var t=e.props.classNames,r="string"==typeof t,o=r?""+(r&&t?t+"-":"")+n:t[n];return{baseClassName:o,activeClassName:r?o+"-active":t[n+"Active"],doneClassName:r?o+"-done":t[n+"Done"]}},e}C(t,n);var r=t.prototype;return r.addClass=function(e,n,t){var r=this.getClassNames(n)[t+"ClassName"],o=this.getClassNames("enter").doneClassName;"appear"===n&&"done"===t&&o&&(r+=" "+o),"active"===t&&e&&Ee(e),r&&(this.appliedClasses[n][t]=r,Pe(e,r))},r.removeClasses=function(e,n){var t=this.appliedClasses[n],r=t.base,o=t.active,i=t.done;this.appliedClasses[n]={},r&&_e(e,r),o&&_e(e,o),i&&_e(e,i)},r.render=function(){var n=this.props;n.classNames;var t=w(n,["classNames"]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(je,S({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));ke.defaultProps={classNames:""},ke.propTypes= false?0:{};var Re=function(n){var t=n.children,r=n.isVisible,o=n.timeout,i=n.className,a=react__WEBPACK_IMPORTED_MODULE_0___default().useRef(null);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ke,{nodeRef:a,in:r,timeout:o,classNames:i,unmountOnExit:!0},t)};function $e(a){var s=a.children,c=a.id,p=a.appendTo,d=a.hideOnLeave,m=a.onMouseLeave,v=a.onHide,h=a.onShow,g=a.preventHideOnScroll,x=a.preventHideOnResize,S=a.attributes,w=a.className,N=a.animation,C=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),T=l((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),j=T[0],P=T[1],_=l((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),2),k=_[0],R=_[1],$=function(e){var n=e.position;P(!0),R(n)},M=function(){P(!1),v&&v()},D=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){e.preventDefault(),m(e),d&&O(c)})),A=function(e){C.current&&!C.current.contains(e.target)&&O(c)},L=function(e){var n=e.target;do{if(n.classList&&n.classList.contains("menu-trigger"))return;n=n.parentNode}while(n);O(c)},I=b((function(){O(c)}),200),V=b((function(){O(c)}),200);(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return E(c,$,M),document.addEventListener("mousedown",A),document.addEventListener("contextmenu",L),g||window.addEventListener("scroll",I),x||window.addEventListener("resize",V),function(){document.removeEventListener("mousedown",A),document.removeEventListener("contextmenu",L),window.removeEventListener("scroll",I),window.removeEventListener("resize",V)}}),[]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){if(j){var e=k.clientY,n=k.clientX,t=window,r=t.innerHeight,o=t.innerWidth,i=C.current,a=i.offsetHeight,s=i.offsetWidth,c=e,u=n;r<e+a&&(c=e-a),o<n+s&&(u=n-s),C.current.style.top="".concat(c+2,"px"),C.current.style.left="".concat(u+2,"px"),h&&h()}}),[j,k]);var z=react__WEBPACK_IMPORTED_MODULE_0___default().Children.map(s,(function(n){return react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(n,{id:c})})),F=function(){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",u({className:y.apply(void 0,["contextmenu"].concat(f(w.split(" ")))),ref:C,onMouseLeave:D},S),z)},W=function(){return react_dom__WEBPACK_IMPORTED_MODULE_1___default().createPortal(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F,null),document.querySelector(p))};return"complete"===document.readyState&&p?N?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Re,{isVisible:j,timeout:200,className:N},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(W,null)):react__WEBPACK_IMPORTED_MODULE_0___default().createElement(W,null):N?react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Re,{isVisible:j,timeout:200,className:N},react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F,null)):react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F,null)}function Me(t){var o=t.children,i=t.onClick,a=t.disabled,s=t.preventClose,c=t.attributes,l=t.className,p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){a||(i(e),s||O("ID_NOT_REQUIRED"))}));return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",u({className:y.apply(void 0,["contextmenu__item",{"contextmenu__item--disabled":a}].concat(f(l.split(" ")))),onClick:d},c,{ref:p}),o)}function De(t){var o=t.children,i=t.id,a=t.disableWhileShiftPressed,s=t.attributes,c=t.disable,l=t.className,p=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),d=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){if(!c)if(a&&e.nativeEvent.shiftKey)O(i);else{e.preventDefault(),e.stopPropagation();var n=e.nativeEvent,t=n.clientX,r=n.clientY;x({position:{clientY:r,clientX:t},id:i})}}));return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",u({className:y.apply(void 0,["menu-trigger"].concat(f(l.split(" ")))),ref:p},s,{onContextMenu:function(e){return d(e)}}),o)}function Ae(o){var i=o.children,a=o.title,c=o.attributes,p=o.className,d=l((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),2),m=d[0],v=d[1],b=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),h=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),g=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){var e=window,n=e.innerHeight,t=e.innerWidth,r=h.current.getBoundingClientRect(),o=r.left,i=r.top,a=r.width,c=r.height,u=b.current.getBoundingClientRect(),l=u.width,f={opacity:1,visibility:"visible"};i+u.height+c>n&&(f=s(s({},f),{},{top:"inherit",bottom:"0"})),o+l+a>t&&(f=s(s({},f),{},{left:"inherit",right:"100%"})),v(f)})),E=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(){v({opacity:0,visibility:"hidden"})}));return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",u({className:y.apply(void 0,["submenu"].concat(f(p.split(" ")))),onMouseOver:function(){return g()},onMouseOut:function(){return E()},onFocus:function(){return null},onBlur:function(){return null},ref:h},c),react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Me,null,a),react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",{className:"submenu__item",ref:b,style:m},i))}$e.defaultProps={appendTo:null,hideOnLeave:!1,preventHideOnResize:!1,preventHideOnScroll:!1,attributes:{},className:"",animation:"fade",onMouseLeave:function(){return null},onHide:function(){return null},onShow:function(){return null}},Me.defaultProps={disabled:!1,preventClose:!1,attributes:{},className:"",onClick:function(){return null},onItemHover:function(){return null}},De.defaultProps={attributes:{},disable:!1,renderTag:"div",disableWhileShiftPressed:!1,className:""},Ae.defaultProps={title:"Sub Menu",className:""};


/***/ }),

/***/ 1670:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  o: () => (/* binding */ Center)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/Box.mjs + 21 modules
var Box = __webpack_require__(9500);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/polymorphic-factory.mjs
var polymorphic_factory = __webpack_require__(8639);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Center/Center.module.css.mjs
'use client';
var classes = {"root":"m_4451eb3a"};


//# sourceMappingURL=Center.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Center/Center.mjs
'use client';
















const defaultProps = {};
const Center = (0,polymorphic_factory/* polymorphicFactory */.v)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("Center", defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, inline, mod, ...others } = props;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "Center",
    props,
    classes: classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars
  });
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Box/* Box */.a, { ref, mod: [{ inline }, mod], ...getStyles("root"), ...others });
});
Center.classes = classes;
Center.displayName = "@mantine/core/Center";


//# sourceMappingURL=Center.mjs.map


/***/ }),

/***/ 6988:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  s: () => (/* binding */ ColorPicker)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var use_uncontrolled = __webpack_require__(1617);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-did-update/use-did-update.mjs
var use_did_update = __webpack_require__(297);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
var get_size = __webpack_require__(6324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
var create_vars_resolver = __webpack_require__(9396);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/Box.mjs + 21 modules
var Box = __webpack_require__(9500);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/units-converters/rem.mjs
var rem = __webpack_require__(8149);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/polymorphic-factory.mjs
var polymorphic_factory = __webpack_require__(8639);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorSwatch/ColorSwatch.module.css.mjs
'use client';
var classes = {"root":"m_de3d2490","colorOverlay":"m_862f3d1b","shadowOverlay":"m_98ae7f22","alphaOverlay":"m_95709ac0","childrenOverlay":"m_93e74e3"};


//# sourceMappingURL=ColorSwatch.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorSwatch/ColorSwatch.mjs
'use client';



















const defaultProps = {
  withShadow: true
};
const varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((_, { radius, size }) => ({
  root: {
    "--cs-radius": radius === void 0 ? void 0 : (0,get_size/* getRadius */.nJ)(radius),
    "--cs-size": (0,rem/* rem */.D)(size)
  }
}));
const ColorSwatch = (0,polymorphic_factory/* polymorphicFactory */.v)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("ColorSwatch", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    size,
    radius,
    withShadow,
    children,
    variant,
    ...others
  } = (0,use_props/* useProps */.Y)("ColorSwatch", defaultProps, props);
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "ColorSwatch",
    props,
    classes: classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      ref,
      variant,
      size,
      ...getStyles("root", { focusable: true }),
      ...others,
      children: [
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("alphaOverlay") }),
        withShadow && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("shadowOverlay") }),
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("colorOverlay", { style: { backgroundColor: color } }) }),
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("childrenOverlay"), children })
      ]
    }
  );
});
ColorSwatch.classes = classes;
ColorSwatch.displayName = "@mantine/core/ColorSwatch";


//# sourceMappingURL=ColorSwatch.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/utils/clamp/clamp.mjs
var clamp = __webpack_require__(8143);
;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/use-move/use-move.mjs
'use client';



function clampUseMovePosition(position) {
  return {
    x: (0,clamp/* clamp */.q)(position.x, 0, 1),
    y: (0,clamp/* clamp */.q)(position.y, 0, 1)
  };
}
function useMove(onChange, handlers, dir = "ltr") {
  const mounted = (0,external_React_.useRef)(false);
  const isSliding = (0,external_React_.useRef)(false);
  const frame = (0,external_React_.useRef)(0);
  const [active, setActive] = (0,external_React_.useState)(false);
  const cleanupRef = (0,external_React_.useRef)(null);
  (0,external_React_.useEffect)(() => {
    mounted.current = true;
  }, []);
  const refCallback = (0,external_React_.useCallback)(
    (node) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (!node) {
        return;
      }
      const onScrub = ({ x, y }) => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          if (mounted.current && node) {
            node.style.userSelect = "none";
            const rect = node.getBoundingClientRect();
            if (rect.width && rect.height) {
              const _x = (0,clamp/* clamp */.q)((x - rect.left) / rect.width, 0, 1);
              onChange({
                x: dir === "ltr" ? _x : 1 - _x,
                y: (0,clamp/* clamp */.q)((y - rect.top) / rect.height, 0, 1)
              });
            }
          }
        });
      };
      const bindEvents = () => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", stopScrubbing);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", stopScrubbing);
      };
      const unbindEvents = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopScrubbing);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", stopScrubbing);
      };
      const startScrubbing = () => {
        if (!isSliding.current && mounted.current) {
          isSliding.current = true;
          typeof handlers?.onScrubStart === "function" && handlers.onScrubStart();
          setActive(true);
          bindEvents();
        }
      };
      const stopScrubbing = () => {
        if (isSliding.current && mounted.current) {
          isSliding.current = false;
          setActive(false);
          unbindEvents();
          setTimeout(() => {
            typeof handlers?.onScrubEnd === "function" && handlers.onScrubEnd();
          }, 0);
        }
      };
      const onMouseDown = (event) => {
        startScrubbing();
        event.preventDefault();
        onMouseMove(event);
      };
      const onMouseMove = (event) => onScrub({ x: event.clientX, y: event.clientY });
      const onTouchStart = (event) => {
        if (event.cancelable) {
          event.preventDefault();
        }
        startScrubbing();
        onTouchMove(event);
      };
      const onTouchMove = (event) => {
        if (event.cancelable) {
          event.preventDefault();
        }
        onScrub({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
      };
      node.addEventListener("mousedown", onMouseDown);
      node.addEventListener("touchstart", onTouchStart, { passive: false });
      cleanupRef.current = () => {
        node.removeEventListener("mousedown", onMouseDown);
        node.removeEventListener("touchstart", onTouchStart);
      };
    },
    [dir, onChange]
  );
  return { ref: refCallback, active };
}


//# sourceMappingURL=use-move.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var use_merged_ref = __webpack_require__(7055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs + 1 modules
var MantineThemeProvider = __webpack_require__(1101);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/create-optional-context/create-optional-context.mjs
var create_optional_context = __webpack_require__(7986);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.context.mjs
'use client';













const [ColorPickerProvider, useColorPickerContext] = (0,create_optional_context/* createOptionalContext */.e)(null);


//# sourceMappingURL=ColorPicker.context.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/Thumb/Thumb.mjs
'use client';












const Thumb = (0,external_React_.forwardRef)(({ position, ...others }, ref) => /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
  Box/* Box */.a,
  {
    ref,
    __vars: {
      "--thumb-y-offset": `${position.y * 100}%`,
      "--thumb-x-offset": `${position.x * 100}%`
    },
    ...others
  }
));
Thumb.displayName = "@mantine/core/ColorPickerThumb";


//# sourceMappingURL=Thumb.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.module.css.mjs
'use client';
var ColorPicker_module_css_classes = {"wrapper":"m_fee9c77","preview":"m_9dddfbac","body":"m_bffecc3e","sliders":"m_3283bb96","thumb":"m_40d572ba","swatch":"m_d8ee6fd8","swatches":"m_5711e686","saturation":"m_202a296e","saturationOverlay":"m_11b3db02","slider":"m_d856d47d","sliderOverlay":"m_8f327113"};


//# sourceMappingURL=ColorPicker.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/ColorSlider/ColorSlider.mjs
'use client';



















const ColorSlider_defaultProps = {};
const ColorSlider = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("ColorSlider", ColorSlider_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    onChange,
    onChangeEnd,
    maxValue,
    round,
    size = "md",
    focusable = true,
    value,
    overlays,
    thumbColor = "transparent",
    onScrubStart,
    onScrubEnd,
    __staticSelector = "ColorPicker",
    ...others
  } = props;
  const _getStyles = (0,use_styles/* useStyles */.I)({
    name: __staticSelector,
    classes: ColorPicker_module_css_classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled
  });
  const ctxGetStyles = useColorPickerContext()?.getStyles;
  const getStyles = ctxGetStyles || _getStyles;
  const theme = (0,MantineThemeProvider/* useMantineTheme */.xd)();
  const [position, setPosition] = (0,external_React_.useState)({ y: 0, x: value / maxValue });
  const positionRef = (0,external_React_.useRef)(position);
  const getChangeValue = (val) => round ? Math.round(val * maxValue) : val * maxValue;
  const { ref: sliderRef } = useMove(
    ({ x, y }) => {
      positionRef.current = { x, y };
      onChange?.(getChangeValue(x));
    },
    {
      onScrubEnd: () => {
        const { x } = positionRef.current;
        onChangeEnd?.(getChangeValue(x));
        onScrubEnd?.();
      },
      onScrubStart
    }
  );
  (0,use_did_update/* useDidUpdate */.C)(() => {
    setPosition({ y: 0, x: value / maxValue });
  }, [value]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange?.(getChangeValue(_position.x));
    onChangeEnd?.(getChangeValue(_position.x));
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  const layers = overlays.map((overlay, index) => /* @__PURE__ */ (0,external_React_.createElement)("div", { ...getStyles("sliderOverlay"), style: overlay, key: index }));
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      ...others,
      ref: (0,use_merged_ref/* useMergedRef */.pc)(sliderRef, ref),
      ...getStyles("slider"),
      role: "slider",
      "aria-valuenow": value,
      "aria-valuemax": maxValue,
      "aria-valuemin": 0,
      tabIndex: focusable ? 0 : -1,
      onKeyDown: handleKeyDown,
      "data-focus-ring": theme.focusRing,
      __vars: {
        "--cp-thumb-size": `var(--cp-thumb-size-${size})`
      },
      children: [
        layers,
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          Thumb,
          {
            position,
            ...getStyles("thumb", { style: { top: (0,rem/* rem */.D)(1), background: thumbColor } })
          }
        )
      ]
    }
  );
});
ColorSlider.displayName = "@mantine/core/ColorSlider";


//# sourceMappingURL=ColorSlider.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/converters/parsers.mjs
'use client';
function round(number, digits = 0, base = 10 ** digits) {
  return Math.round(base * number) / base;
}
function hslaToHsva({ h, s, l, a }) {
  const ss = s * ((l < 50 ? l : 100 - l) / 100);
  return {
    h,
    s: ss > 0 ? 2 * ss / (l + ss) * 100 : 0,
    v: l + ss,
    a
  };
}
const angleUnits = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};
function parseHue(value, unit = "deg") {
  return Number(value) * (angleUnits[unit] || 1);
}
const HSL_REGEXP = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function parseHsla(color) {
  const match = HSL_REGEXP.exec(color);
  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === void 0 ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
}
function rgbaToHsva({ r, g, b, a }) {
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  const hh = delta ? max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta : 0;
  return {
    h: round(60 * (hh < 0 ? hh + 6 : hh), 3),
    s: round(max ? delta / max * 100 : 0, 3),
    v: round(max / 255 * 100, 3),
    a
  };
}
function parseHex(color) {
  const hex = color[0] === "#" ? color.slice(1) : color;
  if (hex.length === 3) {
    return rgbaToHsva({
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1
    });
  }
  return rgbaToHsva({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: 1
  });
}
function parseHexa(color) {
  const hex = color[0] === "#" ? color.slice(1) : color;
  const roundA = (a2) => round(parseInt(a2, 16) / 255, 3);
  if (hex.length === 4) {
    const withoutOpacity2 = hex.slice(0, 3);
    const a2 = roundA(hex[3] + hex[3]);
    const hsvaColor2 = { ...parseHex(withoutOpacity2), a: a2 };
    return hsvaColor2;
  }
  const withoutOpacity = hex.slice(0, 6);
  const a = roundA(hex.slice(6, 8));
  const hsvaColor = { ...parseHex(withoutOpacity), a };
  return hsvaColor;
}
const RGB_REGEXP = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
function parseRgba(color) {
  const match = RGB_REGEXP.exec(color);
  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === void 0 ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
  });
}
const VALIDATION_REGEXP = {
  hex: /^#?([0-9A-F]{3}){1,2}$/i,
  hexa: /^#?([0-9A-F]{4}){1,2}$/i,
  rgb: /^rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  rgba: /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  hsl: /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i,
  hsla: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/i
};
const CONVERTERS = {
  hex: parseHex,
  hexa: parseHexa,
  rgb: parseRgba,
  rgba: parseRgba,
  hsl: parseHsla,
  hsla: parseHsla
};
function isColorValid(color) {
  for (const [, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(color)) {
      return true;
    }
  }
  return false;
}
function parseColor(color) {
  if (typeof color !== "string") {
    return { h: 0, s: 0, v: 0, a: 1 };
  }
  if (color === "transparent") {
    return { h: 0, s: 0, v: 0, a: 0 };
  }
  const trimmed = color.trim();
  for (const [rule, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(trimmed)) {
      return CONVERTERS[rule](trimmed);
    }
  }
  return { h: 0, s: 0, v: 0, a: 1 };
}


//# sourceMappingURL=parsers.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/AlphaSlider/AlphaSlider.mjs
'use client';
















const AlphaSlider_defaultProps = {};
const AlphaSlider = (0,external_React_.forwardRef)((props, ref) => {
  const { value, onChange, onChangeEnd, color, ...others } = (0,use_props/* useProps */.Y)(
    "AlphaSlider",
    AlphaSlider_defaultProps,
    props
  );
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    ColorSlider,
    {
      ...others,
      ref,
      value,
      onChange: (val) => onChange?.(round(val, 2)),
      onChangeEnd: (val) => onChangeEnd?.(round(val, 2)),
      maxValue: 1,
      round: false,
      "data-alpha": true,
      overlays: [
        {
          backgroundImage: "linear-gradient(45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(-45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--slider-checkers) 75%), linear-gradient(-45deg, var(--mantine-color-body) 75%, var(--slider-checkers) 75%)",
          backgroundSize: `${(0,rem/* rem */.D)(8)} ${(0,rem/* rem */.D)(8)}`,
          backgroundPosition: `0 0, 0 ${(0,rem/* rem */.D)(4)}, ${(0,rem/* rem */.D)(4)} ${(0,rem/* rem */.D)(-4)}, ${(0,rem/* rem */.D)(-4)} 0`
        },
        {
          backgroundImage: `linear-gradient(90deg, transparent, ${color})`
        },
        {
          boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${(0,rem/* rem */.D)(1)} inset, rgb(0, 0, 0, .15) 0 0 ${(0,rem/* rem */.D)(
            4
          )} inset`
        }
      ]
    }
  );
});
AlphaSlider.displayName = "@mantine/core/AlphaSlider";


//# sourceMappingURL=AlphaSlider.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/converters/converters.mjs
'use client';


function hsvaToRgbaObject({ h, s, v, a }) {
  const _h = h / 360 * 6;
  const _s = s / 100;
  const _v = v / 100;
  const hh = Math.floor(_h);
  const l = _v * (1 - _s);
  const c = _v * (1 - (_h - hh) * _s);
  const d = _v * (1 - (1 - _h + hh) * _s);
  const module = hh % 6;
  return {
    r: round([_v, c, l, l, d, _v][module] * 255),
    g: round([d, _v, _v, c, l, l][module] * 255),
    b: round([l, l, d, _v, _v, c][module] * 255),
    a: round(a, 2)
  };
}
function hsvaToRgba(color, includeAlpha) {
  const { r, g, b, a } = hsvaToRgbaObject(color);
  if (!includeAlpha) {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${round(a, 2)})`;
}
function hsvaToHsl({ h, s, v, a }, includeAlpha) {
  const hh = (200 - s) * v / 100;
  const result = {
    h: Math.round(h),
    s: Math.round(hh > 0 && hh < 200 ? s * v / 100 / (hh <= 100 ? hh : 200 - hh) * 100 : 0),
    l: Math.round(hh / 2)
  };
  if (!includeAlpha) {
    return `hsl(${result.h}, ${result.s}%, ${result.l}%)`;
  }
  return `hsla(${result.h}, ${result.s}%, ${result.l}%, ${round(a, 2)})`;
}
function formatHexPart(number) {
  const hex = number.toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
}
function hsvaToHex(color) {
  const { r, g, b } = hsvaToRgbaObject(color);
  return `#${formatHexPart(r)}${formatHexPart(g)}${formatHexPart(b)}`;
}
function hsvaToHexa(color) {
  const a = Math.round(color.a * 255);
  return `${hsvaToHex(color)}${formatHexPart(a)}`;
}
const converters_CONVERTERS = {
  hex: hsvaToHex,
  hexa: (color) => hsvaToHexa(color),
  rgb: (color) => hsvaToRgba(color, false),
  rgba: (color) => hsvaToRgba(color, true),
  hsl: (color) => hsvaToHsl(color, false),
  hsla: (color) => hsvaToHsl(color, true)
};
function convertHsvaTo(format, color) {
  if (!color) {
    return "#000000";
  }
  if (!(format in converters_CONVERTERS)) {
    return converters_CONVERTERS.hex(color);
  }
  return converters_CONVERTERS[format](color);
}


//# sourceMappingURL=converters.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/HueSlider/HueSlider.mjs
'use client';















const HueSlider = (0,external_React_.forwardRef)((props, ref) => {
  const { value, onChange, onChangeEnd, color, ...others } = (0,use_props/* useProps */.Y)("HueSlider", {}, props);
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    ColorSlider,
    {
      ...others,
      ref,
      value,
      onChange,
      onChangeEnd,
      maxValue: 360,
      thumbColor: `hsl(${value}, 100%, 50%)`,
      round: true,
      "data-hue": true,
      overlays: [
        {
          backgroundImage: "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))"
        },
        {
          boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${(0,rem/* rem */.D)(1)} inset, rgb(0, 0, 0, .15) 0 0 ${(0,rem/* rem */.D)(
            4
          )} inset`
        }
      ]
    }
  );
});
HueSlider.displayName = "@mantine/core/HueSlider";


//# sourceMappingURL=HueSlider.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/Saturation/Saturation.mjs
'use client';















function Saturation({
  className,
  onChange,
  onChangeEnd,
  value,
  saturationLabel,
  focusable = true,
  size,
  color,
  onScrubStart,
  onScrubEnd,
  ...others
}) {
  const { getStyles } = useColorPickerContext();
  const [position, setPosition] = (0,external_React_.useState)({ x: value.s / 100, y: 1 - value.v / 100 });
  const positionRef = (0,external_React_.useRef)(position);
  const { ref } = useMove(
    ({ x, y }) => {
      positionRef.current = { x, y };
      onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
    },
    {
      onScrubEnd: () => {
        const { x, y } = positionRef.current;
        onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
        onScrubEnd?.();
      },
      onScrubStart
    }
  );
  (0,external_React_.useEffect)(() => {
    setPosition({ x: value.s / 100, y: 1 - value.v / 100 });
  }, [value.s, value.v]);
  const handleArrow = (event, pos) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    onChange({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
    onChangeEnd({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowUp": {
        handleArrow(event, { y: position.y - 0.05, x: position.x });
        break;
      }
      case "ArrowDown": {
        handleArrow(event, { y: position.y + 0.05, x: position.x });
        break;
      }
      case "ArrowRight": {
        handleArrow(event, { x: position.x + 0.05, y: position.y });
        break;
      }
      case "ArrowLeft": {
        handleArrow(event, { x: position.x - 0.05, y: position.y });
        break;
      }
    }
  };
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      ...getStyles("saturation"),
      ref,
      ...others,
      role: "slider",
      "aria-label": saturationLabel,
      "aria-valuenow": position.x,
      "aria-valuetext": convertHsvaTo("rgba", value),
      tabIndex: focusable ? 0 : -1,
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          "div",
          {
            ...getStyles("saturationOverlay", {
              style: { backgroundColor: `hsl(${value.h}, 100%, 50%)` }
            })
          }
        ),
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          "div",
          {
            ...getStyles("saturationOverlay", {
              style: { backgroundImage: "linear-gradient(90deg, #fff, transparent)" }
            })
          }
        ),
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          "div",
          {
            ...getStyles("saturationOverlay", {
              style: { backgroundImage: "linear-gradient(0deg, #000, transparent)" }
            })
          }
        ),
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Thumb, { position, ...getStyles("thumb", { style: { backgroundColor: color } }) })
      ]
    }
  );
}
Saturation.displayName = "@mantine/core/Saturation";


//# sourceMappingURL=Saturation.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/Swatches/Swatches.mjs
'use client';














const Swatches = (0,external_React_.forwardRef)(
  ({
    className,
    datatype,
    setValue,
    onChangeEnd,
    size,
    focusable,
    data,
    swatchesPerRow,
    ...others
  }, ref) => {
    const ctx = useColorPickerContext();
    const colors = data.map((color, index) => /* @__PURE__ */ (0,external_React_.createElement)(
      ColorSwatch,
      {
        ...ctx.getStyles("swatch"),
        unstyled: ctx.unstyled,
        component: "button",
        type: "button",
        color,
        key: index,
        radius: "sm",
        onClick: () => {
          setValue(color);
          onChangeEnd?.(color);
        },
        "aria-label": color,
        tabIndex: focusable ? 0 : -1,
        "data-swatch": true
      }
    ));
    return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Box/* Box */.a, { ...ctx.getStyles("swatches"), ref, ...others, children: colors });
  }
);
Swatches.displayName = "@mantine/core/Swatches";


//# sourceMappingURL=Swatches.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/ColorPicker/ColorPicker.mjs
'use client';


























const ColorPicker_defaultProps = {
  swatchesPerRow: 7,
  withPicker: true,
  focusable: true,
  size: "md",
  __staticSelector: "ColorPicker"
};
const ColorPicker_varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((_, { size, swatchesPerRow }) => ({
  wrapper: {
    "--cp-preview-size": (0,get_size/* getSize */.YC)(size, "cp-preview-size"),
    "--cp-width": (0,get_size/* getSize */.YC)(size, "cp-width"),
    "--cp-body-spacing": (0,get_size/* getSpacing */.GY)(size),
    "--cp-swatch-size": `${100 / swatchesPerRow}%`,
    "--cp-thumb-size": (0,get_size/* getSize */.YC)(size, "cp-thumb-size"),
    "--cp-saturation-height": (0,get_size/* getSize */.YC)(size, "cp-saturation-height")
  }
}));
const ColorPicker = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("ColorPicker", ColorPicker_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    format = "hex",
    value,
    defaultValue,
    onChange,
    onChangeEnd,
    withPicker,
    size,
    saturationLabel,
    hueLabel,
    alphaLabel,
    focusable,
    swatches,
    swatchesPerRow,
    fullWidth,
    onColorSwatchClick,
    __staticSelector,
    mod,
    ...others
  } = props;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: __staticSelector,
    props,
    classes: ColorPicker_module_css_classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "wrapper",
    vars,
    varsResolver: ColorPicker_varsResolver
  });
  const formatRef = (0,external_React_.useRef)(format || "hex");
  const valueRef = (0,external_React_.useRef)("");
  const scrubTimeoutRef = (0,external_React_.useRef)(-1);
  const isScrubbingRef = (0,external_React_.useRef)(false);
  const withAlpha = format === "hexa" || format === "rgba" || format === "hsla";
  const [_value, setValue, controlled] = (0,use_uncontrolled/* useUncontrolled */.Z)({
    value,
    defaultValue,
    finalValue: "#FFFFFF",
    onChange
  });
  const [parsed, setParsed] = (0,external_React_.useState)(parseColor(_value));
  const startScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current);
    isScrubbingRef.current = true;
  };
  const stopScrubbing = () => {
    window.clearTimeout(scrubTimeoutRef.current);
    scrubTimeoutRef.current = window.setTimeout(() => {
      isScrubbingRef.current = false;
    }, 200);
  };
  const handleChange = (color) => {
    setParsed((current) => {
      const next = { ...current, ...color };
      valueRef.current = convertHsvaTo(formatRef.current, next);
      return next;
    });
    setValue(valueRef.current);
  };
  (0,use_did_update/* useDidUpdate */.C)(() => {
    if (typeof value === "string" && isColorValid(value) && !isScrubbingRef.current) {
      setParsed(parseColor(value));
    }
  }, [value]);
  (0,use_did_update/* useDidUpdate */.C)(() => {
    formatRef.current = format || "hex";
    setValue(convertHsvaTo(formatRef.current, parsed));
  }, [format]);
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(ColorPickerProvider, { value: { getStyles, unstyled }, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      ref,
      ...getStyles("wrapper"),
      size,
      mod: [{ "full-width": fullWidth }, mod],
      ...others,
      children: [
        withPicker && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(external_ReactJSXRuntime_.Fragment, { children: [
          /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
            Saturation,
            {
              value: parsed,
              onChange: handleChange,
              onChangeEnd: ({ s, v }) => onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsed, s, v })),
              color: _value,
              size,
              focusable,
              saturationLabel,
              onScrubStart: startScrubbing,
              onScrubEnd: stopScrubbing
            }
          ),
          /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)("div", { ...getStyles("body"), children: [
            /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)("div", { ...getStyles("sliders"), children: [
              /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
                HueSlider,
                {
                  value: parsed.h,
                  onChange: (h) => handleChange({ h }),
                  onChangeEnd: (h) => onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsed, h })),
                  size,
                  focusable,
                  "aria-label": hueLabel,
                  onScrubStart: startScrubbing,
                  onScrubEnd: stopScrubbing
                }
              ),
              withAlpha && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
                AlphaSlider,
                {
                  value: parsed.a,
                  onChange: (a) => handleChange({ a }),
                  onChangeEnd: (a) => {
                    onChangeEnd?.(convertHsvaTo(formatRef.current, { ...parsed, a }));
                  },
                  size,
                  color: convertHsvaTo("hex", parsed),
                  focusable,
                  "aria-label": alphaLabel,
                  onScrubStart: startScrubbing,
                  onScrubEnd: stopScrubbing
                }
              )
            ] }),
            withAlpha && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
              ColorSwatch,
              {
                color: _value,
                radius: "sm",
                size: "var(--cp-preview-size)",
                ...getStyles("preview")
              }
            )
          ] })
        ] }),
        Array.isArray(swatches) && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          Swatches,
          {
            data: swatches,
            swatchesPerRow,
            focusable,
            setValue,
            onChangeEnd: (color) => {
              const convertedColor = convertHsvaTo(format, parseColor(color));
              onColorSwatchClick?.(convertedColor);
              onChangeEnd?.(convertedColor);
              if (!controlled) {
                setParsed(parseColor(color));
              }
            }
          }
        )
      ]
    }
  ) });
});
ColorPicker.classes = ColorPicker_module_css_classes;
ColorPicker.displayName = "@mantine/core/ColorPicker";


//# sourceMappingURL=ColorPicker.mjs.map


/***/ }),

/***/ 2538:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  K: () => (/* binding */ MultiSelect)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-id/use-id.mjs + 1 modules
var use_id = __webpack_require__(6284);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var use_uncontrolled = __webpack_require__(1617);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-resolved-styles-api/use-resolved-styles-api.mjs
var use_resolved_styles_api = __webpack_require__(9274);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/style-props/extract-style-props/extract-style-props.mjs
var extract_style_props = __webpack_require__(3733);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/get-parsed-combobox-data/get-parsed-combobox-data.mjs
var get_parsed_combobox_data = __webpack_require__(8177);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/get-options-lockup/get-options-lockup.mjs
var get_options_lockup = __webpack_require__(1067);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/Combobox.mjs + 16 modules
var Combobox = __webpack_require__(3748);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/OptionsDropdown.mjs + 3 modules
var OptionsDropdown = __webpack_require__(715);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/use-combobox/use-combobox.mjs + 1 modules
var use_combobox = __webpack_require__(4913);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/InputBase/InputBase.mjs + 1 modules
var InputBase = __webpack_require__(2056);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
var get_size = __webpack_require__(6324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
var create_vars_resolver = __webpack_require__(9396);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/Box.mjs + 21 modules
var Box = __webpack_require__(9500);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/CloseButton/CloseButton.mjs + 1 modules
var CloseButton = __webpack_require__(3255);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/create-optional-context/create-optional-context.mjs
var create_optional_context = __webpack_require__(7986);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/PillsInput/PillsInput.context.mjs
'use client';













const [PillsInputProvider, usePillsInputContext] = (0,create_optional_context/* createOptionalContext */.e)();


//# sourceMappingURL=PillsInput.context.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Pill/PillGroup.context.mjs
'use client';













const [PillGroupProvider, usePillGroupContext] = (0,create_optional_context/* createOptionalContext */.e)();


//# sourceMappingURL=PillGroup.context.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Pill/Pill.module.css.mjs
'use client';
var classes = {"root":"m_7cda1cd6","root--default":"m_44da308b","root--contrast":"m_e3a01f8","label":"m_1e0e6180","remove":"m_ae386778","group":"m_1dcfd90b"};


//# sourceMappingURL=Pill.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Pill/PillGroup/PillGroup.mjs
'use client';




















const defaultProps = {};
const varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((_, { gap }, { size }) => ({
  group: {
    "--pg-gap": gap !== void 0 ? (0,get_size/* getSize */.YC)(gap) : (0,get_size/* getSize */.YC)(size, "pg-gap")
  }
}));
const PillGroup = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("PillGroup", defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, size, disabled, ...others } = props;
  const pillsInputCtx = usePillsInputContext();
  const _size = pillsInputCtx?.size || size || void 0;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "PillGroup",
    classes: classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
    stylesCtx: { size: _size },
    rootSelector: "group"
  });
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(PillGroupProvider, { value: { size: _size, disabled }, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Box/* Box */.a, { ref, size: _size, ...getStyles("group"), ...others }) });
});
PillGroup.classes = classes;
PillGroup.displayName = "@mantine/core/PillGroup";


//# sourceMappingURL=PillGroup.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Pill/Pill.mjs
'use client';























const Pill_defaultProps = {
  variant: "default"
};
const Pill_varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((_, { radius }, { size }) => ({
  root: {
    "--pill-fz": (0,get_size/* getSize */.YC)(size, "pill-fz"),
    "--pill-height": (0,get_size/* getSize */.YC)(size, "pill-height"),
    "--pill-radius": radius === void 0 ? void 0 : (0,get_size/* getRadius */.nJ)(radius)
  }
}));
const Pill = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("Pill", Pill_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    variant,
    children,
    withRemoveButton,
    onRemove,
    removeButtonProps,
    radius,
    size,
    disabled,
    mod,
    ...others
  } = props;
  const ctx = usePillGroupContext();
  const pillsInputCtx = usePillsInputContext();
  const _size = size || ctx?.size || void 0;
  const _variant = pillsInputCtx?.variant === "filled" ? "contrast" : variant || "default";
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "Pill",
    classes: classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: Pill_varsResolver,
    stylesCtx: { size: _size }
  });
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      component: "span",
      ref,
      variant: _variant,
      size: _size,
      ...getStyles("root", { variant: _variant }),
      mod: [
        { "with-remove": withRemoveButton && !disabled, disabled: disabled || ctx?.disabled },
        mod
      ],
      ...others,
      children: [
        /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("label"), children }),
        withRemoveButton && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          CloseButton/* CloseButton */.J,
          {
            variant: "transparent",
            radius,
            tabIndex: -1,
            "aria-hidden": true,
            unstyled,
            ...removeButtonProps,
            ...getStyles("remove", {
              className: removeButtonProps?.className,
              style: removeButtonProps?.style
            }),
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
              removeButtonProps?.onMouseDown?.(event);
            },
            onClick: (event) => {
              event.stopPropagation();
              onRemove?.();
              removeButtonProps?.onClick?.(event);
            }
          }
        )
      ]
    }
  );
});
Pill.classes = classes;
Pill.displayName = "@mantine/core/Pill";
Pill.Group = PillGroup;


//# sourceMappingURL=Pill.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var use_merged_ref = __webpack_require__(7055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Input/InputWrapper.context.mjs
var InputWrapper_context = __webpack_require__(7561);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/PillsInput/PillsInput.module.css.mjs
'use client';
var PillsInput_module_css_classes = {"field":"m_45c4369d"};


//# sourceMappingURL=PillsInput.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/PillsInput/PillsInputField/PillsInputField.mjs
'use client';

























const PillsInputField_defaultProps = {
  type: "visible"
};
const PillsInputField = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("PillsInputField", PillsInputField_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    type,
    disabled,
    id,
    pointer,
    mod,
    ...others
  } = props;
  const ctx = usePillsInputContext();
  const inputWrapperCtx = (0,InputWrapper_context/* useInputWrapperContext */.e)();
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "PillsInputField",
    classes: PillsInput_module_css_classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "field"
  });
  const _disabled = disabled || ctx?.disabled;
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    Box/* Box */.a,
    {
      component: "input",
      ref: (0,use_merged_ref/* useMergedRef */.pc)(ref, ctx?.fieldRef),
      "data-type": type,
      disabled: _disabled,
      mod: [{ disabled: _disabled, pointer }, mod],
      ...getStyles("field"),
      ...others,
      id: inputWrapperCtx?.inputId || id,
      "aria-invalid": ctx?.hasError,
      "aria-describedby": inputWrapperCtx?.describedBy,
      type: "text",
      onMouseDown: (event) => !pointer && event.stopPropagation()
    }
  );
});
PillsInputField.classes = PillsInput_module_css_classes;
PillsInputField.displayName = "@mantine/core/PillsInputField";


//# sourceMappingURL=PillsInputField.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/PillsInput/PillsInput.mjs
'use client';

















const PillsInput_defaultProps = {
  size: "sm"
};
const PillsInput = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("PillsInput", PillsInput_defaultProps, _props);
  const {
    children,
    onMouseDown,
    onClick,
    size,
    disabled,
    __staticSelector,
    error,
    variant,
    ...others
  } = props;
  const fieldRef = (0,external_React_.useRef)(null);
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(PillsInputProvider, { value: { fieldRef, size, disabled, hasError: !!error, variant }, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    InputBase/* InputBase */.O,
    {
      size,
      error,
      variant,
      component: "div",
      ref,
      "data-no-overflow": true,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown?.(event);
        fieldRef.current?.focus();
      },
      onClick: (event) => {
        event.preventDefault();
        const fieldset = event.currentTarget.closest("fieldset");
        if (!fieldset?.disabled) {
          fieldRef.current?.focus();
          onClick?.(event);
        }
      },
      ...others,
      multiline: true,
      disabled,
      __staticSelector: __staticSelector || "PillsInput",
      withAria: false,
      children
    }
  ) });
});
PillsInput.displayName = "@mantine/core/PillsInput";
PillsInput.Field = PillsInputField;


//# sourceMappingURL=PillsInput.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Combobox/OptionsDropdown/is-options-group.mjs
var is_options_group = __webpack_require__(8455);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/MultiSelect/filter-picked-values.mjs
'use client';




































function filterPickedValues({ data, value }) {
  const normalizedValue = value.map((item) => item.trim().toLowerCase());
  const filtered = data.reduce((acc, item) => {
    if ((0,is_options_group/* isOptionsGroup */.c)(item)) {
      acc.push({
        group: item.group,
        items: item.items.filter(
          (option) => normalizedValue.indexOf(option.value.toLowerCase().trim()) === -1
        )
      });
    } else if (normalizedValue.indexOf(item.value.toLowerCase().trim()) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
  return filtered;
}


//# sourceMappingURL=filter-picked-values.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/MultiSelect/MultiSelect.mjs
'use client';











































const MultiSelect_defaultProps = {
  maxValues: Infinity,
  withCheckIcon: true,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
};
const MultiSelect = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("MultiSelect", MultiSelect_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    onFocus,
    onBlur,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    maxValues,
    searchable,
    nothingFoundMessage,
    withCheckIcon,
    checkIconPosition,
    hidePickedOptions,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    placeholder,
    hiddenInputValuesDivider,
    required,
    mod,
    renderOption,
    onRemove,
    onClear,
    scrollAreaProps,
    chevronColor,
    ...others
  } = props;
  const _id = (0,use_id/* useId */.B)(id);
  const parsedData = (0,get_parsed_combobox_data/* getParsedComboboxData */.d)(data);
  const optionsLockup = (0,get_options_lockup/* getOptionsLockup */.D)(parsedData);
  const combobox = (0,use_combobox/* useCombobox */.B)({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose: () => {
      onDropdownClose?.();
      combobox.resetSelectedOption();
    }
  });
  const {
    styleProps,
    rest: { type, autoComplete, ...rest }
  } = (0,extract_style_props/* extractStyleProps */.j)(others);
  const [_value, setValue] = (0,use_uncontrolled/* useUncontrolled */.Z)({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const [_searchValue, setSearchValue] = (0,use_uncontrolled/* useUncontrolled */.Z)({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: "",
    onChange: onSearchChange
  });
  const handleSearchChange = (value2) => {
    setSearchValue(value2);
    combobox.resetSelectedOption();
  };
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "MultiSelect",
    classes: {},
    props,
    classNames,
    styles,
    unstyled
  });
  const { resolvedClassNames, resolvedStyles } = (0,use_resolved_styles_api/* useResolvedStylesApi */.Y)({
    props,
    styles,
    classNames
  });
  const handleInputKeydown = (event) => {
    onKeyDown?.(event);
    if (event.key === " " && !searchable) {
      event.preventDefault();
      combobox.toggleDropdown();
    }
    if (event.key === "Backspace" && _searchValue.length === 0 && _value.length > 0) {
      onRemove?.(_value[_value.length - 1]);
      setValue(_value.slice(0, _value.length - 1));
    }
  };
  const values = _value.map((item, index) => /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    Pill,
    {
      withRemoveButton: !readOnly && !optionsLockup[item]?.disabled,
      onRemove: () => {
        setValue(_value.filter((i) => item !== i));
        onRemove?.(item);
      },
      unstyled,
      disabled,
      ...getStyles("pill"),
      children: optionsLockup[item]?.label || item
    },
    `${item}-${index}`
  ));
  (0,external_React_.useEffect)(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _searchValue]);
  const clearButton = /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    Combobox/* Combobox */.G.ClearButton,
    {
      ...clearButtonProps,
      onClear: () => {
        onClear?.();
        setValue([]);
        handleSearchChange("");
      }
    }
  );
  const filteredData = filterPickedValues({ data: parsedData, value: _value });
  const _clearable = clearable && _value.length > 0 && !disabled && !readOnly;
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(external_ReactJSXRuntime_.Fragment, { children: [
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
      Combobox/* Combobox */.G,
      {
        store: combobox,
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        size,
        readOnly,
        __staticSelector: "MultiSelect",
        onOptionSubmit: (val) => {
          onOptionSubmit?.(val);
          handleSearchChange("");
          combobox.updateSelectedOptionIndex("selected");
          if (_value.includes(optionsLockup[val].value)) {
            setValue(_value.filter((v) => v !== optionsLockup[val].value));
            onRemove?.(optionsLockup[val].value);
          } else if (_value.length < maxValues) {
            setValue([..._value, optionsLockup[val].value]);
          }
        },
        ...comboboxProps,
        children: [
          /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Combobox/* Combobox */.G.DropdownTarget, { children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
            PillsInput,
            {
              ...styleProps,
              __staticSelector: "MultiSelect",
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              unstyled,
              size,
              className,
              style,
              variant,
              disabled,
              radius,
              __defaultRightSection: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
                Combobox/* Combobox */.G.Chevron,
                {
                  size,
                  error,
                  unstyled,
                  color: chevronColor
                }
              ),
              __clearSection: clearButton,
              __clearable: _clearable,
              rightSection,
              rightSectionPointerEvents: rightSectionPointerEvents || (clearButton ? "all" : "none"),
              rightSectionWidth,
              rightSectionProps,
              leftSection,
              leftSectionWidth,
              leftSectionPointerEvents,
              leftSectionProps,
              inputContainer,
              inputWrapperOrder,
              withAsterisk,
              labelProps,
              descriptionProps,
              errorProps,
              wrapperProps,
              description,
              label,
              error,
              withErrorStyles,
              __stylesApiProps: {
                ...props,
                rightSectionPointerEvents: rightSectionPointerEvents || (_clearable ? "all" : "none"),
                multiline: true
              },
              pointer: !searchable,
              onClick: () => searchable ? combobox.openDropdown() : combobox.toggleDropdown(),
              "data-expanded": combobox.dropdownOpened || void 0,
              id: _id,
              required,
              mod,
              children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(Pill.Group, { disabled, unstyled, ...getStyles("pillsList"), children: [
                values,
                /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Combobox/* Combobox */.G.EventsTarget, { autoComplete, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
                  PillsInput.Field,
                  {
                    ...rest,
                    ref,
                    id: _id,
                    placeholder,
                    type: !searchable && !placeholder ? "hidden" : "visible",
                    ...getStyles("inputField"),
                    unstyled,
                    onFocus: (event) => {
                      onFocus?.(event);
                      searchable && combobox.openDropdown();
                    },
                    onBlur: (event) => {
                      onBlur?.(event);
                      combobox.closeDropdown();
                      handleSearchChange("");
                    },
                    onKeyDown: handleInputKeydown,
                    value: _searchValue,
                    onChange: (event) => {
                      handleSearchChange(event.currentTarget.value);
                      searchable && combobox.openDropdown();
                      selectFirstOptionOnChange && combobox.selectFirstOption();
                    },
                    disabled,
                    readOnly: readOnly || !searchable,
                    pointer: !searchable
                  }
                ) })
              ] })
            }
          ) }),
          /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
            OptionsDropdown/* OptionsDropdown */.i,
            {
              data: hidePickedOptions ? filteredData : parsedData,
              hidden: readOnly || disabled,
              filter,
              search: _searchValue,
              limit,
              hiddenWhenEmpty: !nothingFoundMessage,
              withScrollArea,
              maxDropdownHeight,
              filterOptions: searchable,
              value: _value,
              checkIconPosition,
              withCheckIcon,
              nothingFoundMessage,
              unstyled,
              labelId: label ? `${_id}-label` : void 0,
              "aria-label": label ? void 0 : others["aria-label"],
              renderOption,
              scrollAreaProps
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      Combobox/* Combobox */.G.HiddenInput,
      {
        name,
        valuesDivider: hiddenInputValuesDivider,
        value: _value,
        form,
        disabled,
        ...hiddenInputProps
      }
    )
  ] });
});
MultiSelect.classes = { ...InputBase/* InputBase */.O.classes, ...Combobox/* Combobox */.G.classes };
MultiSelect.displayName = "@mantine/core/MultiSelect";


//# sourceMappingURL=MultiSelect.mjs.map


/***/ }),

/***/ 5987:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Q: () => (/* binding */ NumberInput)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
;// CONCATENATED MODULE: ./node_modules/react-number-format/dist/react-number-format.es.js
/**
 * react-number-format - 5.4.3
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2024 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-number-format
 */



/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        { t[p] = s[p]; } }
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        { for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                { t[p[i]] = s[p[i]]; }
        } }
    return t;
}

var SourceType;
(function (SourceType) {
    SourceType["event"] = "event";
    SourceType["props"] = "prop";
})(SourceType || (SourceType = {}));

// basic noop function
function noop() { }
function memoizeOnce(cb) {
    var lastArgs;
    var lastValue = undefined;
    return function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        if (lastArgs &&
            args.length === lastArgs.length &&
            args.every(function (value, index) { return value === lastArgs[index]; })) {
            return lastValue;
        }
        lastArgs = args;
        lastValue = cb.apply(void 0, args);
        return lastValue;
    };
}
function charIsNumber(char) {
    return !!(char || '').match(/\d/);
}
function isNil(val) {
    return val === null || val === undefined;
}
function isNanValue(val) {
    return typeof val === 'number' && isNaN(val);
}
function isNotValidValue(val) {
    return isNil(val) || isNanValue(val) || (typeof val === 'number' && !isFinite(val));
}
function escapeRegExp(str) {
    return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
function getThousandsGroupRegex(thousandsGroupStyle) {
    switch (thousandsGroupStyle) {
        case 'lakh':
            return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
        case 'wan':
            return /(\d)(?=(\d{4})+(?!\d))/g;
        case 'thousand':
        default:
            return /(\d)(?=(\d{3})+(?!\d))/g;
    }
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
    var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
    var index = str.search(/[1-9]/);
    index = index === -1 ? str.length : index;
    return (str.substring(0, index) +
        str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator));
}
function usePersistentCallback(cb) {
    var callbackRef = (0,external_React_.useRef)(cb);
    // keep the callback ref upto date
    callbackRef.current = cb;
    /**
     * initialize a persistent callback which never changes
     * through out the component lifecycle
     */
    var persistentCbRef = (0,external_React_.useRef)(function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return callbackRef.current.apply(callbackRef, args);
    });
    return persistentCbRef.current;
}
//spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr, allowNegative) {
    if ( allowNegative === void 0 ) allowNegative = true;

    var hasNegation = numStr[0] === '-';
    var addNegation = hasNegation && allowNegative;
    numStr = numStr.replace('-', '');
    var parts = numStr.split('.');
    var beforeDecimal = parts[0];
    var afterDecimal = parts[1] || '';
    return {
        beforeDecimal: beforeDecimal,
        afterDecimal: afterDecimal,
        hasNegation: hasNegation,
        addNegation: addNegation,
    };
}
function fixLeadingZero(numStr) {
    if (!numStr)
        { return numStr; }
    var isNegative = numStr[0] === '-';
    if (isNegative)
        { numStr = numStr.substring(1, numStr.length); }
    var parts = numStr.split('.');
    var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
    var afterDecimal = parts[1] || '';
    return ("" + (isNegative ? '-' : '') + beforeDecimal + (afterDecimal ? ("." + afterDecimal) : ''));
}
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(numStr, scale, fixedDecimalScale) {
    var str = '';
    var filler = fixedDecimalScale ? '0' : '';
    for (var i = 0; i <= scale - 1; i++) {
        str += numStr[i] || filler;
    }
    return str;
}
function repeat(str, count) {
    return Array(count + 1).join(str);
}
function toNumericString(num) {
    var _num = num + ''; // typecast number to string
    // store the sign and remove it from the number.
    var sign = _num[0] === '-' ? '-' : '';
    if (sign)
        { _num = _num.substring(1); }
    // split the number into cofficient and exponent
    var ref = _num.split(/[eE]/g);
    var coefficient = ref[0];
    var exponent = ref[1];
    // covert exponent to number;
    exponent = Number(exponent);
    // if there is no exponent part or its 0, return the coffiecient with sign
    if (!exponent)
        { return sign + coefficient; }
    coefficient = coefficient.replace('.', '');
    /**
     * for scientific notation the current decimal index will be after first number (index 0)
     * So effective decimal index will always be 1 + exponent value
     */
    var decimalIndex = 1 + exponent;
    var coffiecientLn = coefficient.length;
    if (decimalIndex < 0) {
        // if decimal index is less then 0 add preceding 0s
        // add 1 as join will have
        coefficient = '0.' + repeat('0', Math.abs(decimalIndex)) + coefficient;
    }
    else if (decimalIndex >= coffiecientLn) {
        // if decimal index is less then 0 add leading 0s
        coefficient = coefficient + repeat('0', decimalIndex - coffiecientLn);
    }
    else {
        // else add decimal point at proper index
        coefficient =
            (coefficient.substring(0, decimalIndex) || '0') + '.' + coefficient.substring(decimalIndex);
    }
    return sign + coefficient;
}
/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
function roundToPrecision(numStr, scale, fixedDecimalScale) {
    //if number is empty don't do anything return empty string
    if (['', '-'].indexOf(numStr) !== -1)
        { return numStr; }
    var shouldHaveDecimalSeparator = (numStr.indexOf('.') !== -1 || fixedDecimalScale) && scale;
    var ref = splitDecimal(numStr);
    var beforeDecimal = ref.beforeDecimal;
    var afterDecimal = ref.afterDecimal;
    var hasNegation = ref.hasNegation;
    var floatValue = parseFloat(("0." + (afterDecimal || '0')));
    var floatValueStr = afterDecimal.length <= scale ? ("0." + afterDecimal) : floatValue.toFixed(scale);
    var roundedDecimalParts = floatValueStr.split('.');
    var intPart = beforeDecimal;
    // if we have cary over from rounding decimal part, add that on before decimal
    if (beforeDecimal && Number(roundedDecimalParts[0])) {
        intPart = beforeDecimal
            .split('')
            .reverse()
            .reduce(function (roundedStr, current, idx) {
            if (roundedStr.length > idx) {
                return ((Number(roundedStr[0]) + Number(current)).toString() +
                    roundedStr.substring(1, roundedStr.length));
            }
            return current + roundedStr;
        }, roundedDecimalParts[0]);
    }
    var decimalPart = limitToScale(roundedDecimalParts[1] || '', scale, fixedDecimalScale);
    var negation = hasNegation ? '-' : '';
    var decimalSeparator = shouldHaveDecimalSeparator ? '.' : '';
    return ("" + negation + intPart + decimalSeparator + decimalPart);
}
/** set the caret positon in an input field **/
function setCaretPosition(el, caretPos) {
    el.value = el.value;
    // ^ this is used to not only get 'focus', but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)
    if (el !== null) {
        /* @ts-ignore */
        if (el.createTextRange) {
            /* @ts-ignore */
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        }
        // (el.selectionStart === 0 added for Firefox bug)
        if (el.selectionStart || el.selectionStart === 0) {
            el.focus();
            el.setSelectionRange(caretPos, caretPos);
            return true;
        }
        // fail city, fortunately this never happens (as far as I've tested) :)
        el.focus();
        return false;
    }
}
/**
 * TODO: remove dependency of findChangeRange, findChangedRangeFromCaretPositions is better way to find what is changed
 * currently this is mostly required by test and isCharacterSame util
 * Given previous value and newValue it returns the index
 * start - end to which values have changed.
 * This function makes assumption about only consecutive
 * characters are changed which is correct assumption for caret input.
 */
var findChangeRange = memoizeOnce(function (prevValue, newValue) {
    var i = 0, j = 0;
    var prevLength = prevValue.length;
    var newLength = newValue.length;
    while (prevValue[i] === newValue[i] && i < prevLength)
        { i++; }
    //check what has been changed from last
    while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] &&
        newLength - j > i &&
        prevLength - j > i) {
        j++;
    }
    return {
        from: { start: i, end: prevLength - j },
        to: { start: i, end: newLength - j },
    };
});
var findChangedRangeFromCaretPositions = function (lastCaretPositions, currentCaretPosition) {
    var startPosition = Math.min(lastCaretPositions.selectionStart, currentCaretPosition);
    return {
        from: { start: startPosition, end: lastCaretPositions.selectionEnd },
        to: { start: startPosition, end: currentCaretPosition },
    };
};
/*
  Returns a number whose value is limited to the given range
*/
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function geInputCaretPosition(el) {
    /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
    return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode() {
    return (typeof navigator !== 'undefined' &&
        !(navigator.platform && /iPhone|iPod/.test(navigator.platform)));
}
function getDefaultChangeMeta(value) {
    return {
        from: {
            start: 0,
            end: 0,
        },
        to: {
            start: 0,
            end: value.length,
        },
        lastValue: '',
    };
}
function getMaskAtIndex(mask, index) {
    if ( mask === void 0 ) mask = ' ';

    if (typeof mask === 'string') {
        return mask;
    }
    return mask[index] || ' ';
}
function defaultIsCharacterSame(ref) {
    var currentValue = ref.currentValue;
    var formattedValue = ref.formattedValue;
    var currentValueIndex = ref.currentValueIndex;
    var formattedValueIndex = ref.formattedValueIndex;

    return currentValue[currentValueIndex] === formattedValue[formattedValueIndex];
}
function getCaretPosition(newFormattedValue, lastFormattedValue, curValue, curCaretPos, boundary, isValidInputCharacter, 
/**
 * format function can change the character, the caret engine relies on mapping old value and new value
 * In such case if character is changed, parent can tell which chars are equivalent
 * Some example, all allowedDecimalCharacters are updated to decimalCharacters, 2nd case if user is coverting
 * number to different numeric system.
 */
isCharacterSame) {
    if ( isCharacterSame === void 0 ) isCharacterSame = defaultIsCharacterSame;

    /**
     * if something got inserted on empty value, add the formatted character before the current value,
     * This is to avoid the case where typed character is present on format characters
     */
    var firstAllowedPosition = boundary.findIndex(function (b) { return b; });
    var prefixFormat = newFormattedValue.slice(0, firstAllowedPosition);
    if (!lastFormattedValue && !curValue.startsWith(prefixFormat)) {
        lastFormattedValue = prefixFormat;
        curValue = prefixFormat + curValue;
        curCaretPos = curCaretPos + prefixFormat.length;
    }
    var curValLn = curValue.length;
    var formattedValueLn = newFormattedValue.length;
    // create index map
    var addedIndexMap = {};
    var indexMap = new Array(curValLn);
    for (var i = 0; i < curValLn; i++) {
        indexMap[i] = -1;
        for (var j = 0, jLn = formattedValueLn; j < jLn; j++) {
            var isCharSame = isCharacterSame({
                currentValue: curValue,
                lastValue: lastFormattedValue,
                formattedValue: newFormattedValue,
                currentValueIndex: i,
                formattedValueIndex: j,
            });
            if (isCharSame && addedIndexMap[j] !== true) {
                indexMap[i] = j;
                addedIndexMap[j] = true;
                break;
            }
        }
    }
    /**
     * For current caret position find closest characters (left and right side)
     * which are properly mapped to formatted value.
     * The idea is that the new caret position will exist always in the boundary of
     * that mapped index
     */
    var pos = curCaretPos;
    while (pos < curValLn && (indexMap[pos] === -1 || !isValidInputCharacter(curValue[pos]))) {
        pos++;
    }
    // if the caret position is on last keep the endIndex as last for formatted value
    var endIndex = pos === curValLn || indexMap[pos] === -1 ? formattedValueLn : indexMap[pos];
    pos = curCaretPos - 1;
    while (pos > 0 && indexMap[pos] === -1)
        { pos--; }
    var startIndex = pos === -1 || indexMap[pos] === -1 ? 0 : indexMap[pos] + 1;
    /**
     * case where a char is added on suffix and removed from middle, example 2sq345 becoming $2,345 sq
     * there is still a mapping but the order of start index and end index is changed
     */
    if (startIndex > endIndex)
        { return endIndex; }
    /**
     * given the current caret position if it closer to startIndex
     * keep the new caret position on start index or keep it closer to endIndex
     */
    return curCaretPos - startIndex < endIndex - curCaretPos ? startIndex : endIndex;
}
/* This keeps the caret within typing area so people can't type in between prefix or suffix or format characters */
function getCaretPosInBoundary(value, caretPos, boundary, direction) {
    var valLn = value.length;
    // clamp caret position to [0, value.length]
    caretPos = clamp(caretPos, 0, valLn);
    if (direction === 'left') {
        while (caretPos >= 0 && !boundary[caretPos])
            { caretPos--; }
        // if we don't find any suitable caret position on left, set it on first allowed position
        if (caretPos === -1)
            { caretPos = boundary.indexOf(true); }
    }
    else {
        while (caretPos <= valLn && !boundary[caretPos])
            { caretPos++; }
        // if we don't find any suitable caret position on right, set it on last allowed position
        if (caretPos > valLn)
            { caretPos = boundary.lastIndexOf(true); }
    }
    // if we still don't find caret position, set it at the end of value
    if (caretPos === -1)
        { caretPos = valLn; }
    return caretPos;
}
function caretUnknownFormatBoundary(formattedValue) {
    var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true; });
    for (var i = 0, ln = boundaryAry.length; i < ln; i++) {
        // consider caret to be in boundary if it is before or after numeric value
        boundaryAry[i] = Boolean(charIsNumber(formattedValue[i]) || charIsNumber(formattedValue[i - 1]));
    }
    return boundaryAry;
}
function useInternalValues(value, defaultValue, valueIsNumericString, format, removeFormatting, onValueChange) {
    if ( onValueChange === void 0 ) onValueChange = noop;

    var getValues = usePersistentCallback(function (value, valueIsNumericString) {
        var formattedValue, numAsString;
        if (isNotValidValue(value)) {
            numAsString = '';
            formattedValue = '';
        }
        else if (typeof value === 'number' || valueIsNumericString) {
            numAsString = typeof value === 'number' ? toNumericString(value) : value;
            formattedValue = format(numAsString);
        }
        else {
            numAsString = removeFormatting(value, undefined);
            formattedValue = format(numAsString);
        }
        return { formattedValue: formattedValue, numAsString: numAsString };
    });
    var ref = (0,external_React_.useState)(function () {
        return getValues(isNil(value) ? defaultValue : value, valueIsNumericString);
    });
    var values = ref[0];
    var setValues = ref[1];
    var _onValueChange = function (newValues, sourceInfo) {
        if (newValues.formattedValue !== values.formattedValue) {
            setValues({
                formattedValue: newValues.formattedValue,
                numAsString: newValues.value,
            });
        }
        // call parent on value change if only if formatted value is changed
        onValueChange(newValues, sourceInfo);
    };
    // if value is switch from controlled to uncontrolled, use the internal state's value to format with new props
    var _value = value;
    var _valueIsNumericString = valueIsNumericString;
    if (isNil(value)) {
        _value = values.numAsString;
        _valueIsNumericString = true;
    }
    var newValues = getValues(_value, _valueIsNumericString);
    (0,external_React_.useMemo)(function () {
        setValues(newValues);
    }, [newValues.formattedValue]);
    return [values, _onValueChange];
}

function defaultRemoveFormatting(value) {
    return value.replace(/[^0-9]/g, '');
}
function defaultFormat(value) {
    return value;
}
function NumberFormatBase(props) {
    var type = props.type; if ( type === void 0 ) type = 'text';
    var displayType = props.displayType; if ( displayType === void 0 ) displayType = 'input';
    var customInput = props.customInput;
    var renderText = props.renderText;
    var getInputRef = props.getInputRef;
    var format = props.format; if ( format === void 0 ) format = defaultFormat;
    var removeFormatting = props.removeFormatting; if ( removeFormatting === void 0 ) removeFormatting = defaultRemoveFormatting;
    var defaultValue = props.defaultValue;
    var valueIsNumericString = props.valueIsNumericString;
    var onValueChange = props.onValueChange;
    var isAllowed = props.isAllowed;
    var onChange = props.onChange; if ( onChange === void 0 ) onChange = noop;
    var onKeyDown = props.onKeyDown; if ( onKeyDown === void 0 ) onKeyDown = noop;
    var onMouseUp = props.onMouseUp; if ( onMouseUp === void 0 ) onMouseUp = noop;
    var onFocus = props.onFocus; if ( onFocus === void 0 ) onFocus = noop;
    var onBlur = props.onBlur; if ( onBlur === void 0 ) onBlur = noop;
    var propValue = props.value;
    var getCaretBoundary = props.getCaretBoundary; if ( getCaretBoundary === void 0 ) getCaretBoundary = caretUnknownFormatBoundary;
    var isValidInputCharacter = props.isValidInputCharacter; if ( isValidInputCharacter === void 0 ) isValidInputCharacter = charIsNumber;
    var isCharacterSame = props.isCharacterSame;
    var otherProps = __rest(props, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "removeFormatting", "defaultValue", "valueIsNumericString", "onValueChange", "isAllowed", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value", "getCaretBoundary", "isValidInputCharacter", "isCharacterSame"]);
    var ref = useInternalValues(propValue, defaultValue, Boolean(valueIsNumericString), format, removeFormatting, onValueChange);
    var ref_0 = ref[0];
    var formattedValue = ref_0.formattedValue;
    var numAsString = ref_0.numAsString;
    var onFormattedValueChange = ref[1];
    var caretPositionBeforeChange = (0,external_React_.useRef)();
    var lastUpdatedValue = (0,external_React_.useRef)({ formattedValue: formattedValue, numAsString: numAsString });
    var _onValueChange = function (values, source) {
        lastUpdatedValue.current = { formattedValue: values.formattedValue, numAsString: values.value };
        onFormattedValueChange(values, source);
    };
    var ref$1 = (0,external_React_.useState)(false);
    var mounted = ref$1[0];
    var setMounted = ref$1[1];
    var focusedElm = (0,external_React_.useRef)(null);
    var timeout = (0,external_React_.useRef)({
        setCaretTimeout: null,
        focusTimeout: null,
    });
    (0,external_React_.useEffect)(function () {
        setMounted(true);
        return function () {
            clearTimeout(timeout.current.setCaretTimeout);
            clearTimeout(timeout.current.focusTimeout);
        };
    }, []);
    var _format = format;
    var getValueObject = function (formattedValue, numAsString) {
        var floatValue = parseFloat(numAsString);
        return {
            formattedValue: formattedValue,
            value: numAsString,
            floatValue: isNaN(floatValue) ? undefined : floatValue,
        };
    };
    var setPatchedCaretPosition = function (el, caretPos, currentValue) {
        // don't reset the caret position when the whole input content is selected
        if (el.selectionStart === 0 && el.selectionEnd === el.value.length)
            { return; }
        /* setting caret position within timeout of 0ms is required for mobile chrome,
        otherwise browser resets the caret position after we set it
        We are also setting it without timeout so that in normal browser we don't see the flickering */
        setCaretPosition(el, caretPos);
        timeout.current.setCaretTimeout = setTimeout(function () {
            if (el.value === currentValue && el.selectionStart !== caretPos) {
                setCaretPosition(el, caretPos);
            }
        }, 0);
    };
    /* This keeps the caret within typing area so people can't type in between prefix or suffix */
    var correctCaretPosition = function (value, caretPos, direction) {
        return getCaretPosInBoundary(value, caretPos, getCaretBoundary(value), direction);
    };
    var getNewCaretPosition = function (inputValue, newFormattedValue, caretPos) {
        var caretBoundary = getCaretBoundary(newFormattedValue);
        var updatedCaretPos = getCaretPosition(newFormattedValue, formattedValue, inputValue, caretPos, caretBoundary, isValidInputCharacter, isCharacterSame);
        //correct caret position if its outside of editable area
        updatedCaretPos = getCaretPosInBoundary(newFormattedValue, updatedCaretPos, caretBoundary);
        return updatedCaretPos;
    };
    var updateValueAndCaretPosition = function (params) {
        var newFormattedValue = params.formattedValue; if ( newFormattedValue === void 0 ) newFormattedValue = '';
        var input = params.input;
        var source = params.source;
        var event = params.event;
        var numAsString = params.numAsString;
        var caretPos;
        if (input) {
            var inputValue = params.inputValue || input.value;
            var currentCaretPosition = geInputCaretPosition(input);
            /**
             * set the value imperatively, this is required for IE fix
             * This is also required as if new caret position is beyond the previous value.
             * Caret position will not be set correctly
             */
            input.value = newFormattedValue;
            //get the caret position
            caretPos = getNewCaretPosition(inputValue, newFormattedValue, currentCaretPosition);
            //set caret position imperatively
            if (caretPos !== undefined) {
                setPatchedCaretPosition(input, caretPos, newFormattedValue);
            }
        }
        if (newFormattedValue !== formattedValue) {
            // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287
            _onValueChange(getValueObject(newFormattedValue, numAsString), { event: event, source: source });
        }
    };
    /**
     * if the formatted value is not synced to parent, or if the formatted value is different from last synced value sync it
     * if the formatting props is removed, in which case last formatted value will be different from the numeric string value
     * in such case we need to inform the parent.
     */
    (0,external_React_.useEffect)(function () {
        var ref = lastUpdatedValue.current;
        var lastFormattedValue = ref.formattedValue;
        var lastNumAsString = ref.numAsString;
        if (formattedValue !== lastFormattedValue || numAsString !== lastNumAsString) {
            _onValueChange(getValueObject(formattedValue, numAsString), {
                event: undefined,
                source: SourceType.props,
            });
        }
    }, [formattedValue, numAsString]);
    // also if formatted value is changed from the props, we need to update the caret position
    // keep the last caret position if element is focused
    var currentCaretPosition = focusedElm.current
        ? geInputCaretPosition(focusedElm.current)
        : undefined;
    // needed to prevent warning with useLayoutEffect on server
    var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? external_React_.useLayoutEffect : external_React_.useEffect;
    useIsomorphicLayoutEffect(function () {
        var input = focusedElm.current;
        if (formattedValue !== lastUpdatedValue.current.formattedValue && input) {
            var caretPos = getNewCaretPosition(lastUpdatedValue.current.formattedValue, formattedValue, currentCaretPosition);
            /**
             * set the value imperatively, as we set the caret position as well imperatively.
             * This is to keep value and caret position in sync
             */
            input.value = formattedValue;
            setPatchedCaretPosition(input, caretPos, formattedValue);
        }
    }, [formattedValue]);
    var formatInputValue = function (inputValue, event, source) {
        var input = event.target;
        var changeRange = caretPositionBeforeChange.current
            ? findChangedRangeFromCaretPositions(caretPositionBeforeChange.current, input.selectionEnd)
            : findChangeRange(formattedValue, inputValue);
        var changeMeta = Object.assign(Object.assign({}, changeRange), { lastValue: formattedValue });
        var _numAsString = removeFormatting(inputValue, changeMeta);
        var _formattedValue = _format(_numAsString);
        // formatting can remove some of the number chars, so we need to fine number string again
        _numAsString = removeFormatting(_formattedValue, undefined);
        if (isAllowed && !isAllowed(getValueObject(_formattedValue, _numAsString))) {
            //reset the caret position
            var input$1 = event.target;
            var currentCaretPosition = geInputCaretPosition(input$1);
            var caretPos = getNewCaretPosition(inputValue, formattedValue, currentCaretPosition);
            input$1.value = formattedValue;
            setPatchedCaretPosition(input$1, caretPos, formattedValue);
            return false;
        }
        updateValueAndCaretPosition({
            formattedValue: _formattedValue,
            numAsString: _numAsString,
            inputValue: inputValue,
            event: event,
            source: source,
            input: event.target,
        });
        return true;
    };
    var setCaretPositionInfoBeforeChange = function (el, endOffset) {
        if ( endOffset === void 0 ) endOffset = 0;

        var selectionStart = el.selectionStart;
        var selectionEnd = el.selectionEnd;
        caretPositionBeforeChange.current = { selectionStart: selectionStart, selectionEnd: selectionEnd + endOffset };
    };
    var _onChange = function (e) {
        var el = e.target;
        var inputValue = el.value;
        var changed = formatInputValue(inputValue, e, SourceType.event);
        if (changed)
            { onChange(e); }
        // reset the position, as we have already handled the caret position
        caretPositionBeforeChange.current = undefined;
    };
    var _onKeyDown = function (e) {
        var el = e.target;
        var key = e.key;
        var selectionStart = el.selectionStart;
        var selectionEnd = el.selectionEnd;
        var value = el.value; if ( value === void 0 ) value = '';
        var expectedCaretPosition;
        //Handle backspace and delete against non numerical/decimal characters or arrow keys
        if (key === 'ArrowLeft' || key === 'Backspace') {
            expectedCaretPosition = Math.max(selectionStart - 1, 0);
        }
        else if (key === 'ArrowRight') {
            expectedCaretPosition = Math.min(selectionStart + 1, value.length);
        }
        else if (key === 'Delete') {
            expectedCaretPosition = selectionStart;
        }
        // if key is delete and text is not selected keep the end offset to 1, as it deletes one character
        // this is required as selection is not changed on delete case, which changes the change range calculation
        var endOffset = 0;
        if (key === 'Delete' && selectionStart === selectionEnd) {
            endOffset = 1;
        }
        var isArrowKey = key === 'ArrowLeft' || key === 'ArrowRight';
        //if expectedCaretPosition is not set it means we don't want to Handle keyDown
        // also if multiple characters are selected don't handle
        if (expectedCaretPosition === undefined || (selectionStart !== selectionEnd && !isArrowKey)) {
            onKeyDown(e);
            // keep information of what was the caret position before keyDown
            // set it after onKeyDown, in case parent updates the position manually
            setCaretPositionInfoBeforeChange(el, endOffset);
            return;
        }
        var newCaretPosition = expectedCaretPosition;
        if (isArrowKey) {
            var direction = key === 'ArrowLeft' ? 'left' : 'right';
            newCaretPosition = correctCaretPosition(value, expectedCaretPosition, direction);
            // arrow left or right only moves the caret, so no need to handle the event, if we are handling it manually
            if (newCaretPosition !== expectedCaretPosition) {
                e.preventDefault();
            }
        }
        else if (key === 'Delete' && !isValidInputCharacter(value[expectedCaretPosition])) {
            // in case of delete go to closest caret boundary on the right side
            newCaretPosition = correctCaretPosition(value, expectedCaretPosition, 'right');
        }
        else if (key === 'Backspace' && !isValidInputCharacter(value[expectedCaretPosition])) {
            // in case of backspace go to closest caret boundary on the left side
            newCaretPosition = correctCaretPosition(value, expectedCaretPosition, 'left');
        }
        if (newCaretPosition !== expectedCaretPosition) {
            setPatchedCaretPosition(el, newCaretPosition, value);
        }
        onKeyDown(e);
        setCaretPositionInfoBeforeChange(el, endOffset);
    };
    /** required to handle the caret position when click anywhere within the input **/
    var _onMouseUp = function (e) {
        var el = e.target;
        /**
         * NOTE: we have to give default value for value as in case when custom input is provided
         * value can come as undefined when nothing is provided on value prop.
         */
        var correctCaretPositionIfRequired = function () {
            var selectionStart = el.selectionStart;
            var selectionEnd = el.selectionEnd;
            var value = el.value; if ( value === void 0 ) value = '';
            if (selectionStart === selectionEnd) {
                var caretPosition = correctCaretPosition(value, selectionStart);
                if (caretPosition !== selectionStart) {
                    setPatchedCaretPosition(el, caretPosition, value);
                }
            }
        };
        correctCaretPositionIfRequired();
        // try to correct after selection has updated by browser
        // this case is required when user clicks on some position while a text is selected on input
        requestAnimationFrame(function () {
            correctCaretPositionIfRequired();
        });
        onMouseUp(e);
        setCaretPositionInfoBeforeChange(el);
    };
    var _onFocus = function (e) {
        // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
        // (onFocus event target selectionStart is always 0 before setTimeout)
        if (e.persist)
            { e.persist(); }
        var el = e.target;
        var currentTarget = e.currentTarget;
        focusedElm.current = el;
        timeout.current.focusTimeout = setTimeout(function () {
            var selectionStart = el.selectionStart;
            var selectionEnd = el.selectionEnd;
            var value = el.value; if ( value === void 0 ) value = '';
            var caretPosition = correctCaretPosition(value, selectionStart);
            //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
            if (caretPosition !== selectionStart &&
                !(selectionStart === 0 && selectionEnd === value.length)) {
                setPatchedCaretPosition(el, caretPosition, value);
            }
            onFocus(Object.assign(Object.assign({}, e), { currentTarget: currentTarget }));
        }, 0);
    };
    var _onBlur = function (e) {
        focusedElm.current = null;
        clearTimeout(timeout.current.focusTimeout);
        clearTimeout(timeout.current.setCaretTimeout);
        onBlur(e);
    };
    // add input mode on element based on format prop and device once the component is mounted
    var inputMode = mounted && addInputMode() ? 'numeric' : undefined;
    var inputProps = Object.assign({ inputMode: inputMode }, otherProps, {
        type: type,
        value: formattedValue,
        onChange: _onChange,
        onKeyDown: _onKeyDown,
        onMouseUp: _onMouseUp,
        onFocus: _onFocus,
        onBlur: _onBlur,
    });
    if (displayType === 'text') {
        return renderText ? (external_React_default().createElement((external_React_default()).Fragment, null, renderText(formattedValue, otherProps) || null)) : (external_React_default().createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), formattedValue));
    }
    else if (customInput) {
        var CustomInput = customInput;
        /* @ts-ignore */
        return external_React_default().createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
    }
    return external_React_default().createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
}

function format(numStr, props) {
    var decimalScale = props.decimalScale;
    var fixedDecimalScale = props.fixedDecimalScale;
    var prefix = props.prefix; if ( prefix === void 0 ) prefix = '';
    var suffix = props.suffix; if ( suffix === void 0 ) suffix = '';
    var allowNegative = props.allowNegative;
    var thousandsGroupStyle = props.thousandsGroupStyle; if ( thousandsGroupStyle === void 0 ) thousandsGroupStyle = 'thousand';
    // don't apply formatting on empty string or '-'
    if (numStr === '' || numStr === '-') {
        return numStr;
    }
    var ref = getSeparators(props);
    var thousandSeparator = ref.thousandSeparator;
    var decimalSeparator = ref.decimalSeparator;
    /**
     * Keep the decimal separator
     * when decimalScale is not defined or non zero and the numStr has decimal in it
     * Or if decimalScale is > 0 and fixeDecimalScale is true (even if numStr has no decimal)
     */
    var hasDecimalSeparator = (decimalScale !== 0 && numStr.indexOf('.') !== -1) || (decimalScale && fixedDecimalScale);
    var ref$1 = splitDecimal(numStr, allowNegative);
    var beforeDecimal = ref$1.beforeDecimal;
    var afterDecimal = ref$1.afterDecimal;
    var addNegation = ref$1.addNegation; // eslint-disable-line prefer-const
    //apply decimal precision if its defined
    if (decimalScale !== undefined) {
        afterDecimal = limitToScale(afterDecimal, decimalScale, !!fixedDecimalScale);
    }
    if (thousandSeparator) {
        beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
    }
    //add prefix and suffix when there is a number present
    if (prefix)
        { beforeDecimal = prefix + beforeDecimal; }
    if (suffix)
        { afterDecimal = afterDecimal + suffix; }
    //restore negation sign
    if (addNegation)
        { beforeDecimal = '-' + beforeDecimal; }
    numStr = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal;
    return numStr;
}
function getSeparators(props) {
    var decimalSeparator = props.decimalSeparator; if ( decimalSeparator === void 0 ) decimalSeparator = '.';
    var thousandSeparator = props.thousandSeparator;
    var allowedDecimalSeparators = props.allowedDecimalSeparators;
    if (thousandSeparator === true) {
        thousandSeparator = ',';
    }
    if (!allowedDecimalSeparators) {
        allowedDecimalSeparators = [decimalSeparator, '.'];
    }
    return {
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator,
        allowedDecimalSeparators: allowedDecimalSeparators,
    };
}
function handleNegation(value, allowNegative) {
    if ( value === void 0 ) value = '';

    var negationRegex = new RegExp('(-)');
    var doubleNegationRegex = new RegExp('(-)(.)*(-)');
    // Check number has '-' value
    var hasNegation = negationRegex.test(value);
    // Check number has 2 or more '-' values
    var removeNegation = doubleNegationRegex.test(value);
    //remove negation
    value = value.replace(/-/g, '');
    if (hasNegation && !removeNegation && allowNegative) {
        value = '-' + value;
    }
    return value;
}
function getNumberRegex(decimalSeparator, global) {
    return new RegExp(("(^-)|[0-9]|" + (escapeRegExp(decimalSeparator))), global ? 'g' : undefined);
}
function isNumericString(val, prefix, suffix) {
    // for empty value we can always treat it as numeric string
    if (val === '')
        { return true; }
    return (!(prefix === null || prefix === void 0 ? void 0 : prefix.match(/\d/)) && !(suffix === null || suffix === void 0 ? void 0 : suffix.match(/\d/)) && typeof val === 'string' && !isNaN(Number(val)));
}
function removeFormatting(value, changeMeta, props) {
    var assign;

    if ( changeMeta === void 0 ) changeMeta = getDefaultChangeMeta(value);
    var allowNegative = props.allowNegative;
    var prefix = props.prefix; if ( prefix === void 0 ) prefix = '';
    var suffix = props.suffix; if ( suffix === void 0 ) suffix = '';
    var decimalScale = props.decimalScale;
    var from = changeMeta.from;
    var to = changeMeta.to;
    var start = to.start;
    var end = to.end;
    var ref = getSeparators(props);
    var allowedDecimalSeparators = ref.allowedDecimalSeparators;
    var decimalSeparator = ref.decimalSeparator;
    var isBeforeDecimalSeparator = value[end] === decimalSeparator;
    /**
     * If only a number is added on empty input which matches with the prefix or suffix,
     * then don't remove it, just return the same
     */
    if (charIsNumber(value) &&
        (value === prefix || value === suffix) &&
        changeMeta.lastValue === '') {
        return value;
    }
    /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
    if (end - start === 1 && allowedDecimalSeparators.indexOf(value[start]) !== -1) {
        var separator = decimalScale === 0 ? '' : decimalSeparator;
        value = value.substring(0, start) + separator + value.substring(start + 1, value.length);
    }
    var stripNegation = function (value, start, end) {
        /**
         * if prefix starts with - we don't allow negative number to avoid confusion
         * if suffix starts with - and the value length is same as suffix length, then the - sign is from the suffix
         * In other cases, if the value starts with - then it is a negation
         */
        var hasNegation = false;
        var hasDoubleNegation = false;
        if (prefix.startsWith('-')) {
            hasNegation = false;
        }
        else if (value.startsWith('--')) {
            hasNegation = false;
            hasDoubleNegation = true;
        }
        else if (suffix.startsWith('-') && value.length === suffix.length) {
            hasNegation = false;
        }
        else if (value[0] === '-') {
            hasNegation = true;
        }
        var charsToRemove = hasNegation ? 1 : 0;
        if (hasDoubleNegation)
            { charsToRemove = 2; }
        // remove negation/double negation from start to simplify prefix logic as negation comes before prefix
        if (charsToRemove) {
            value = value.substring(charsToRemove);
            // account for the removal of the negation for start and end index
            start -= charsToRemove;
            end -= charsToRemove;
        }
        return { value: value, start: start, end: end, hasNegation: hasNegation };
    };
    var toMetadata = stripNegation(value, start, end);
    var hasNegation = toMetadata.hasNegation;
    ((assign = toMetadata, value = assign.value, start = assign.start, end = assign.end));
    var ref$1 = stripNegation(changeMeta.lastValue, from.start, from.end);
    var fromStart = ref$1.start;
    var fromEnd = ref$1.end;
    var lastValue = ref$1.value;
    // if only prefix and suffix part is updated reset the value to last value
    // if the changed range is from suffix in the updated value, and the the suffix starts with the same characters, allow the change
    var updatedSuffixPart = value.substring(start, end);
    if (value.length &&
        lastValue.length &&
        (fromStart > lastValue.length - suffix.length || fromEnd < prefix.length) &&
        !(updatedSuffixPart && suffix.startsWith(updatedSuffixPart))) {
        value = lastValue;
    }
    /**
     * remove prefix
     * Remove whole prefix part if its present on the value
     * If the prefix is partially deleted (in which case change start index will be less the prefix length)
     * Remove only partial part of prefix.
     */
    var startIndex = 0;
    if (value.startsWith(prefix))
        { startIndex += prefix.length; }
    else if (start < prefix.length)
        { startIndex = start; }
    value = value.substring(startIndex);
    // account for deleted prefix for end
    end -= startIndex;
    /**
     * Remove suffix
     * Remove whole suffix part if its present on the value
     * If the suffix is partially deleted (in which case change end index will be greater than the suffixStartIndex)
     * remove the partial part of suffix
     */
    var endIndex = value.length;
    var suffixStartIndex = value.length - suffix.length;
    if (value.endsWith(suffix))
        { endIndex = suffixStartIndex; }
    // if the suffix is removed from the end
    else if (end > suffixStartIndex)
        { endIndex = end; }
    // if the suffix is removed from start
    else if (end > value.length - suffix.length)
        { endIndex = end; }
    value = value.substring(0, endIndex);
    // add the negation back and handle for double negation
    value = handleNegation(hasNegation ? ("-" + value) : value, allowNegative);
    // remove non numeric characters
    value = (value.match(getNumberRegex(decimalSeparator, true)) || []).join('');
    // replace the decimalSeparator with ., and only keep the first separator, ignore following ones
    var firstIndex = value.indexOf(decimalSeparator);
    value = value.replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), function (match, index) {
        return index === firstIndex ? '.' : '';
    });
    //check if beforeDecimal got deleted and there is nothing after decimal,
    //clear all numbers in such case while keeping the - sign
    var ref$2 = splitDecimal(value, allowNegative);
    var beforeDecimal = ref$2.beforeDecimal;
    var afterDecimal = ref$2.afterDecimal;
    var addNegation = ref$2.addNegation; // eslint-disable-line prefer-const
    //clear only if something got deleted before decimal (cursor is before decimal)
    if (to.end - to.start < from.end - from.start &&
        beforeDecimal === '' &&
        isBeforeDecimalSeparator &&
        !parseFloat(afterDecimal)) {
        value = addNegation ? '-' : '';
    }
    return value;
}
function getCaretBoundary(formattedValue, props) {
    var prefix = props.prefix; if ( prefix === void 0 ) prefix = '';
    var suffix = props.suffix; if ( suffix === void 0 ) suffix = '';
    var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true; });
    var hasNegation = formattedValue[0] === '-';
    // fill for prefix and negation
    boundaryAry.fill(false, 0, prefix.length + (hasNegation ? 1 : 0));
    // fill for suffix
    var valLn = formattedValue.length;
    boundaryAry.fill(false, valLn - suffix.length + 1, valLn + 1);
    return boundaryAry;
}
function validateAndUpdateProps(props) {
    var ref = getSeparators(props);
    var thousandSeparator = ref.thousandSeparator;
    var decimalSeparator = ref.decimalSeparator;
    // eslint-disable-next-line prefer-const
    var prefix = props.prefix; if ( prefix === void 0 ) prefix = '';
    var allowNegative = props.allowNegative; if ( allowNegative === void 0 ) allowNegative = true;
    if (thousandSeparator === decimalSeparator) {
        throw new Error(("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " + thousandSeparator + " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n        decimalSeparator: " + decimalSeparator + " (default value for decimalSeparator is .)\n     "));
    }
    if (prefix.startsWith('-') && allowNegative) {
        // TODO: throw error in next major version
        console.error(("\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " + prefix + "\n      allowNegative: " + allowNegative + "\n    "));
        allowNegative = false;
    }
    return Object.assign(Object.assign({}, props), { allowNegative: allowNegative });
}
function useNumericFormat(props) {
    // validate props
    props = validateAndUpdateProps(props);
    var _decimalSeparator = props.decimalSeparator;
    var _allowedDecimalSeparators = props.allowedDecimalSeparators;
    var thousandsGroupStyle = props.thousandsGroupStyle;
    var suffix = props.suffix;
    var allowNegative = props.allowNegative;
    var allowLeadingZeros = props.allowLeadingZeros;
    var onKeyDown = props.onKeyDown; if ( onKeyDown === void 0 ) onKeyDown = noop;
    var onBlur = props.onBlur; if ( onBlur === void 0 ) onBlur = noop;
    var thousandSeparator = props.thousandSeparator;
    var decimalScale = props.decimalScale;
    var fixedDecimalScale = props.fixedDecimalScale;
    var prefix = props.prefix; if ( prefix === void 0 ) prefix = '';
    var defaultValue = props.defaultValue;
    var value = props.value;
    var valueIsNumericString = props.valueIsNumericString;
    var onValueChange = props.onValueChange;
    var restProps = __rest(props, ["decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "suffix", "allowNegative", "allowLeadingZeros", "onKeyDown", "onBlur", "thousandSeparator", "decimalScale", "fixedDecimalScale", "prefix", "defaultValue", "value", "valueIsNumericString", "onValueChange"]);
    // get derived decimalSeparator and allowedDecimalSeparators
    var ref = getSeparators(props);
    var decimalSeparator = ref.decimalSeparator;
    var allowedDecimalSeparators = ref.allowedDecimalSeparators;
    var _format = function (numStr) { return format(numStr, props); };
    var _removeFormatting = function (inputValue, changeMeta) { return removeFormatting(inputValue, changeMeta, props); };
    var _value = isNil(value) ? defaultValue : value;
    // try to figure out isValueNumericString based on format prop and value
    var _valueIsNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString(_value, prefix, suffix);
    if (!isNil(value)) {
        _valueIsNumericString = _valueIsNumericString || typeof value === 'number';
    }
    else if (!isNil(defaultValue)) {
        _valueIsNumericString = _valueIsNumericString || typeof defaultValue === 'number';
    }
    var roundIncomingValueToPrecision = function (value) {
        if (isNotValidValue(value))
            { return value; }
        if (typeof value === 'number') {
            value = toNumericString(value);
        }
        /**
         * only round numeric or float string values coming through props,
         * we don't need to do it for onChange events, as we want to prevent typing there
         */
        if (_valueIsNumericString && typeof decimalScale === 'number') {
            return roundToPrecision(value, decimalScale, Boolean(fixedDecimalScale));
        }
        return value;
    };
    var ref$1 = useInternalValues(roundIncomingValueToPrecision(value), roundIncomingValueToPrecision(defaultValue), Boolean(_valueIsNumericString), _format, _removeFormatting, onValueChange);
    var ref$1_0 = ref$1[0];
    var numAsString = ref$1_0.numAsString;
    var formattedValue = ref$1_0.formattedValue;
    var _onValueChange = ref$1[1];
    var _onKeyDown = function (e) {
        var el = e.target;
        var key = e.key;
        var selectionStart = el.selectionStart;
        var selectionEnd = el.selectionEnd;
        var value = el.value; if ( value === void 0 ) value = '';
        // if user tries to delete partial prefix then ignore it
        if ((key === 'Backspace' || key === 'Delete') && selectionEnd < prefix.length) {
            e.preventDefault();
            return;
        }
        // if multiple characters are selected and user hits backspace, no need to handle anything manually
        if (selectionStart !== selectionEnd) {
            onKeyDown(e);
            return;
        }
        // if user hits backspace, while the cursor is before prefix, and the input has negation, remove the negation
        if (key === 'Backspace' &&
            value[0] === '-' &&
            selectionStart === prefix.length + 1 &&
            allowNegative) {
            // bring the cursor to after negation
            setCaretPosition(el, 1);
        }
        // don't allow user to delete decimal separator when decimalScale and fixedDecimalScale is set
        if (decimalScale && fixedDecimalScale) {
            if (key === 'Backspace' && value[selectionStart - 1] === decimalSeparator) {
                setCaretPosition(el, selectionStart - 1);
                e.preventDefault();
            }
            else if (key === 'Delete' && value[selectionStart] === decimalSeparator) {
                e.preventDefault();
            }
        }
        // if user presses the allowed decimal separator before the separator, move the cursor after the separator
        if ((allowedDecimalSeparators === null || allowedDecimalSeparators === void 0 ? void 0 : allowedDecimalSeparators.includes(key)) && value[selectionStart] === decimalSeparator) {
            setCaretPosition(el, selectionStart + 1);
        }
        var _thousandSeparator = thousandSeparator === true ? ',' : thousandSeparator;
        // move cursor when delete or backspace is pressed before/after thousand separator
        if (key === 'Backspace' && value[selectionStart - 1] === _thousandSeparator) {
            setCaretPosition(el, selectionStart - 1);
        }
        if (key === 'Delete' && value[selectionStart] === _thousandSeparator) {
            setCaretPosition(el, selectionStart + 1);
        }
        onKeyDown(e);
    };
    var _onBlur = function (e) {
        var _value = numAsString;
        // if there no no numeric value, clear the input
        if (!_value.match(/\d/g)) {
            _value = '';
        }
        // clear leading 0s
        if (!allowLeadingZeros) {
            _value = fixLeadingZero(_value);
        }
        // apply fixedDecimalScale on blur event
        if (fixedDecimalScale && decimalScale) {
            _value = roundToPrecision(_value, decimalScale, fixedDecimalScale);
        }
        if (_value !== numAsString) {
            var formattedValue = format(_value, props);
            _onValueChange({
                formattedValue: formattedValue,
                value: _value,
                floatValue: parseFloat(_value),
            }, {
                event: e,
                source: SourceType.event,
            });
        }
        onBlur(e);
    };
    var isValidInputCharacter = function (inputChar) {
        if (inputChar === decimalSeparator)
            { return true; }
        return charIsNumber(inputChar);
    };
    var isCharacterSame = function (ref) {
        var currentValue = ref.currentValue;
        var lastValue = ref.lastValue;
        var formattedValue = ref.formattedValue;
        var currentValueIndex = ref.currentValueIndex;
        var formattedValueIndex = ref.formattedValueIndex;

        var curChar = currentValue[currentValueIndex];
        var newChar = formattedValue[formattedValueIndex];
        /**
         * NOTE: as thousand separator and allowedDecimalSeparators can be same, we need to check on
         * typed range if we have typed any character from allowedDecimalSeparators, in that case we
         * consider different characters like , and . same within the range of updated value.
         */
        var typedRange = findChangeRange(lastValue, currentValue);
        var to = typedRange.to;
        // handle corner case where if we user types a decimal separator with fixedDecimalScale
        // and pass back float value the cursor jumps. #851
        var getDecimalSeparatorIndex = function (value) {
            return _removeFormatting(value).indexOf('.') + prefix.length;
        };
        if (value === 0 &&
            fixedDecimalScale &&
            decimalScale &&
            currentValue[to.start] === decimalSeparator &&
            getDecimalSeparatorIndex(currentValue) < currentValueIndex &&
            getDecimalSeparatorIndex(formattedValue) > formattedValueIndex) {
            return false;
        }
        if (currentValueIndex >= to.start &&
            currentValueIndex < to.end &&
            allowedDecimalSeparators &&
            allowedDecimalSeparators.includes(curChar) &&
            newChar === decimalSeparator) {
            return true;
        }
        return curChar === newChar;
    };
    return Object.assign(Object.assign({}, restProps), { value: formattedValue, valueIsNumericString: false, isValidInputCharacter: isValidInputCharacter,
        isCharacterSame: isCharacterSame, onValueChange: _onValueChange, format: _format, removeFormatting: _removeFormatting, getCaretBoundary: function (formattedValue) { return getCaretBoundary(formattedValue, props); }, onKeyDown: _onKeyDown, onBlur: _onBlur });
}
function NumericFormat(props) {
    var numericFormatProps = useNumericFormat(props);
    return external_React_default().createElement(NumberFormatBase, Object.assign({}, numericFormatProps));
}

function format$1(numStr, props) {
    var format = props.format;
    var allowEmptyFormatting = props.allowEmptyFormatting;
    var mask = props.mask;
    var patternChar = props.patternChar; if ( patternChar === void 0 ) patternChar = '#';
    if (numStr === '' && !allowEmptyFormatting)
        { return ''; }
    var hashCount = 0;
    var formattedNumberAry = format.split('');
    for (var i = 0, ln = format.length; i < ln; i++) {
        if (format[i] === patternChar) {
            formattedNumberAry[i] = numStr[hashCount] || getMaskAtIndex(mask, hashCount);
            hashCount += 1;
        }
    }
    return formattedNumberAry.join('');
}
function removeFormatting$1(value, changeMeta, props) {
    if ( changeMeta === void 0 ) changeMeta = getDefaultChangeMeta(value);

    var format = props.format;
    var patternChar = props.patternChar; if ( patternChar === void 0 ) patternChar = '#';
    var from = changeMeta.from;
    var to = changeMeta.to;
    var lastValue = changeMeta.lastValue; if ( lastValue === void 0 ) lastValue = '';
    var isNumericSlot = function (caretPos) { return format[caretPos] === patternChar; };
    var removeFormatChar = function (string, startIndex) {
        var str = '';
        for (var i = 0; i < string.length; i++) {
            if (isNumericSlot(startIndex + i) && charIsNumber(string[i])) {
                str += string[i];
            }
        }
        return str;
    };
    var extractNumbers = function (str) { return str.replace(/[^0-9]/g, ''); };
    // if format doesn't have any number, remove all the non numeric characters
    if (!format.match(/\d/)) {
        return extractNumbers(value);
    }
    /**
     * if user paste the whole formatted text in an empty input or doing select all and paste, check if matches to the pattern
     * and remove the format characters, if there is a mismatch on the pattern, do plane number extract
     */
    if ((lastValue === '' || from.end - from.start === lastValue.length) &&
        value.length === format.length) {
        var str = '';
        for (var i = 0; i < value.length; i++) {
            if (isNumericSlot(i)) {
                if (charIsNumber(value[i])) {
                    str += value[i];
                }
            }
            else if (value[i] !== format[i]) {
                // if there is a mismatch on the pattern, do plane number extract
                return extractNumbers(value);
            }
        }
        return str;
    }
    /**
     * For partial change,
     * where ever there is a change on the input, we can break the number in three parts
     * 1st: left part which is unchanged
     * 2nd: middle part which is changed
     * 3rd: right part which is unchanged
     *
     * The first and third section will be same as last value, only the middle part will change
     * We can consider on the change part all the new characters are non format characters.
     * And on the first and last section it can have partial format characters.
     *
     * We pick first and last section from the lastValue (as that has 1-1 mapping with format)
     * and middle one from the update value.
     */
    var firstSection = lastValue.substring(0, from.start);
    var middleSection = value.substring(to.start, to.end);
    var lastSection = lastValue.substring(from.end);
    return ("" + (removeFormatChar(firstSection, 0)) + (extractNumbers(middleSection)) + (removeFormatChar(lastSection, from.end)));
}
function getCaretBoundary$1(formattedValue, props) {
    var format = props.format;
    var mask = props.mask;
    var patternChar = props.patternChar; if ( patternChar === void 0 ) patternChar = '#';
    var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function () { return true; });
    var hashCount = 0;
    var firstEmptySlot = -1;
    var maskAndIndexMap = {};
    format.split('').forEach(function (char, index) {
        var maskAtIndex = undefined;
        if (char === patternChar) {
            hashCount++;
            maskAtIndex = getMaskAtIndex(mask, hashCount - 1);
            if (firstEmptySlot === -1 && formattedValue[index] === maskAtIndex) {
                firstEmptySlot = index;
            }
        }
        maskAndIndexMap[index] = maskAtIndex;
    });
    var isPosAllowed = function (pos) {
        // the position is allowed if the position is not masked and valid number area
        return format[pos] === patternChar && formattedValue[pos] !== maskAndIndexMap[pos];
    };
    for (var i = 0, ln = boundaryAry.length; i < ln; i++) {
        // consider caret to be in boundary if it is before or after numeric value
        // Note: on pattern based format its denoted by patternCharacter
        // we should also allow user to put cursor on first empty slot
        boundaryAry[i] = i === firstEmptySlot || isPosAllowed(i) || isPosAllowed(i - 1);
    }
    // the first patternChar position is always allowed
    boundaryAry[format.indexOf(patternChar)] = true;
    return boundaryAry;
}
function validateProps(props) {
    var mask = props.mask;
    if (mask) {
        var maskAsStr = mask === 'string' ? mask : mask.toString();
        if (maskAsStr.match(/\d/g)) {
            throw new Error(("Mask " + mask + " should not contain numeric character;"));
        }
    }
}
function isNumericString$1(val, format) {
    //we can treat empty string as numeric string
    if (val === '')
        { return true; }
    return !(format === null || format === void 0 ? void 0 : format.match(/\d/)) && typeof val === 'string' && (!!val.match(/^\d+$/) || val === '');
}
function usePatternFormat(props) {
    var mask = props.mask;
    var allowEmptyFormatting = props.allowEmptyFormatting;
    var formatProp = props.format;
    var inputMode = props.inputMode; if ( inputMode === void 0 ) inputMode = 'numeric';
    var onKeyDown = props.onKeyDown; if ( onKeyDown === void 0 ) onKeyDown = noop;
    var patternChar = props.patternChar; if ( patternChar === void 0 ) patternChar = '#';
    var value = props.value;
    var defaultValue = props.defaultValue;
    var valueIsNumericString = props.valueIsNumericString;
    var restProps = __rest(props, ["mask", "allowEmptyFormatting", "format", "inputMode", "onKeyDown", "patternChar", "value", "defaultValue", "valueIsNumericString"]);
    // validate props
    validateProps(props);
    var _getCaretBoundary = function (formattedValue) {
        return getCaretBoundary$1(formattedValue, props);
    };
    var _onKeyDown = function (e) {
        var key = e.key;
        var el = e.target;
        var selectionStart = el.selectionStart;
        var selectionEnd = el.selectionEnd;
        var value = el.value;
        // if multiple characters are selected and user hits backspace, no need to handle anything manually
        if (selectionStart !== selectionEnd) {
            onKeyDown(e);
            return;
        }
        // bring the cursor to closest numeric section
        var caretPos = selectionStart;
        // if backspace is pressed after the format characters, bring it to numeric section
        // if delete is pressed before the format characters, bring it to numeric section
        if (key === 'Backspace' || key === 'Delete') {
            var direction = 'right';
            if (key === 'Backspace') {
                while (caretPos > 0 && formatProp[caretPos - 1] !== patternChar) {
                    caretPos--;
                }
                direction = 'left';
            }
            else {
                var formatLn = formatProp.length;
                while (caretPos < formatLn && formatProp[caretPos] !== patternChar) {
                    caretPos++;
                }
                direction = 'right';
            }
            caretPos = getCaretPosInBoundary(value, caretPos, _getCaretBoundary(value), direction);
        }
        else if (formatProp[caretPos] !== patternChar &&
            key !== 'ArrowLeft' &&
            key !== 'ArrowRight') {
            // if user is typing on format character position, bring user to next allowed caret position
            caretPos = getCaretPosInBoundary(value, caretPos + 1, _getCaretBoundary(value), 'right');
        }
        // if we changing caret position, set the caret position
        if (caretPos !== selectionStart) {
            setCaretPosition(el, caretPos);
        }
        onKeyDown(e);
    };
    // try to figure out isValueNumericString based on format prop and value
    var _value = isNil(value) ? defaultValue : value;
    var isValueNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString$1(_value, formatProp);
    var _props = Object.assign(Object.assign({}, props), { valueIsNumericString: isValueNumericString });
    return Object.assign(Object.assign({}, restProps), { value: value,
        defaultValue: defaultValue, valueIsNumericString: isValueNumericString, inputMode: inputMode, format: function (numStr) { return format$1(numStr, _props); }, removeFormatting: function (inputValue, changeMeta) { return removeFormatting$1(inputValue, changeMeta, _props); }, getCaretBoundary: _getCaretBoundary, onKeyDown: _onKeyDown });
}
function PatternFormat(props) {
    var patternFormatProps = usePatternFormat(props);
    return React.createElement(NumberFormatBase, Object.assign({}, patternFormatProps));
}



// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/utils/clamp/clamp.mjs
var clamp_clamp = __webpack_require__(8143);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var use_uncontrolled = __webpack_require__(1617);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var use_merged_ref = __webpack_require__(7055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/noop/noop.mjs
var noop_noop = __webpack_require__(2796);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
var get_size = __webpack_require__(6324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
var create_vars_resolver = __webpack_require__(9396);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-resolved-styles-api/use-resolved-styles-api.mjs
var use_resolved_styles_api = __webpack_require__(9274);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/InputBase/InputBase.mjs + 1 modules
var InputBase = __webpack_require__(2056);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/UnstyledButton/UnstyledButton.mjs + 1 modules
var UnstyledButton = __webpack_require__(6076);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/NumberInput/NumberInputChevron.mjs
'use client';


function NumberInputChevron({ direction, style, ...others }) {
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    "svg",
    {
      style: {
        width: "var(--ni-chevron-size)",
        height: "var(--ni-chevron-size)",
        transform: direction === "up" ? "rotate(180deg)" : void 0,
        ...style
      },
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...others,
      children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
        "path",
        {
          d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}


//# sourceMappingURL=NumberInputChevron.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/NumberInput/NumberInput.module.css.mjs
'use client';
var classes = {"root":"m_e2f5cd4e","controls":"m_95e17d22","control":"m_80b4b171"};


//# sourceMappingURL=NumberInput.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/NumberInput/NumberInput.mjs
'use client';
























const leadingDecimalZeroPattern = /^(0\.0*|-0(\.0*)?)$/;
const leadingZerosPattern = /^-?0\d+(\.\d+)?\.?$/;
function isNumberString(value) {
  return typeof value === "string" && value !== "" && !Number.isNaN(Number(value));
}
function canIncrement(value) {
  if (typeof value === "number") {
    return value < Number.MAX_SAFE_INTEGER;
  }
  return value === "" || isNumberString(value) && Number(value) < Number.MAX_SAFE_INTEGER;
}
function getDecimalPlaces(inputValue) {
  return inputValue.toString().replace(".", "").length;
}
function isValidNumber(floatValue, value) {
  return (typeof floatValue === "number" ? floatValue < Number.MAX_SAFE_INTEGER : !Number.isNaN(Number(floatValue))) && !Number.isNaN(floatValue) && getDecimalPlaces(value) < 14 && value !== "";
}
function isInRange(value, min, max) {
  if (value === void 0) {
    return true;
  }
  const minValid = min === void 0 || value >= min;
  const maxValid = max === void 0 || value <= max;
  return minValid && maxValid;
}
const defaultProps = {
  step: 1,
  clampBehavior: "blur",
  allowDecimal: true,
  allowNegative: true,
  withKeyboardEvents: true,
  allowLeadingZeros: true,
  trimLeadingZeroesOnBlur: true,
  startValue: 0
};
const varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((_, { size }) => ({
  controls: {
    "--ni-chevron-size": (0,get_size/* getSize */.YC)(size, "ni-chevron-size")
  }
}));
function clampAndSanitizeInput(sanitizedValue, max, min) {
  const replaced = sanitizedValue.toString().replace(/^0+/, "");
  const parsedValue = parseFloat(replaced);
  if (Number.isNaN(parsedValue)) {
    return replaced;
  } else if (parsedValue > Number.MAX_SAFE_INTEGER) {
    return max !== void 0 ? String(max) : replaced;
  }
  return (0,clamp_clamp/* clamp */.q)(parsedValue, min, max);
}
const NumberInput = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("NumberInput", defaultProps, _props);
  const {
    className,
    classNames,
    styles,
    unstyled,
    vars,
    onChange,
    onValueChange,
    value,
    defaultValue,
    max,
    min,
    step,
    hideControls,
    rightSection,
    isAllowed,
    clampBehavior,
    onBlur,
    allowDecimal,
    decimalScale,
    onKeyDown,
    onKeyDownCapture,
    handlersRef,
    startValue,
    disabled,
    rightSectionPointerEvents,
    allowNegative,
    readOnly,
    size,
    rightSectionWidth,
    stepHoldInterval,
    stepHoldDelay,
    allowLeadingZeros,
    withKeyboardEvents,
    trimLeadingZeroesOnBlur,
    ...others
  } = props;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "NumberInput",
    classes: classes,
    props,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  const { resolvedClassNames, resolvedStyles } = (0,use_resolved_styles_api/* useResolvedStylesApi */.Y)({
    classNames,
    styles,
    props
  });
  const [_value, setValue] = (0,use_uncontrolled/* useUncontrolled */.Z)({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const shouldUseStepInterval = stepHoldDelay !== void 0 && stepHoldInterval !== void 0;
  const inputRef = (0,external_React_.useRef)(null);
  const onStepTimeoutRef = (0,external_React_.useRef)(null);
  const stepCountRef = (0,external_React_.useRef)(0);
  const handleValueChange = (payload, event) => {
    if (event.source === "event") {
      setValue(
        isValidNumber(payload.floatValue, payload.value) && !leadingDecimalZeroPattern.test(payload.value) && !(allowLeadingZeros ? leadingZerosPattern.test(payload.value) : false) ? payload.floatValue : payload.value
      );
    }
    onValueChange?.(payload, event);
  };
  const getDecimalPlaces2 = (inputValue) => {
    const match = String(inputValue).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };
  const adjustCursor = (position) => {
    if (inputRef.current && typeof position !== "undefined") {
      inputRef.current.setSelectionRange(position, position);
    }
  };
  const incrementRef = (0,external_React_.useRef)(noop_noop/* noop */.l);
  incrementRef.current = () => {
    if (!canIncrement(_value)) {
      return;
    }
    let val;
    const currentValuePrecision = getDecimalPlaces2(_value);
    const stepPrecision = getDecimalPlaces2(step);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    if (!isNumberString(_value) && (typeof _value !== "number" || Number.isNaN(_value))) {
      val = (0,clamp_clamp/* clamp */.q)(startValue, min, max);
    } else if (max !== void 0) {
      const incrementedValue = (Math.round(Number(_value) * factor) + Math.round(step * factor)) / factor;
      val = incrementedValue <= max ? incrementedValue : max;
    } else {
      val = (Math.round(Number(_value) * factor) + Math.round(step * factor)) / factor;
    }
    const formattedValue = val.toFixed(maxPrecision);
    setValue(parseFloat(formattedValue));
    onValueChange?.(
      { floatValue: parseFloat(formattedValue), formattedValue, value: formattedValue },
      { source: "increment" }
    );
    setTimeout(() => adjustCursor(inputRef.current?.value.length), 0);
  };
  const decrementRef = (0,external_React_.useRef)(noop_noop/* noop */.l);
  decrementRef.current = () => {
    if (!canIncrement(_value)) {
      return;
    }
    let val;
    const minValue = min !== void 0 ? min : !allowNegative ? 0 : Number.MIN_SAFE_INTEGER;
    const currentValuePrecision = getDecimalPlaces2(_value);
    const stepPrecision = getDecimalPlaces2(step);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    if (!isNumberString(_value) && typeof _value !== "number" || Number.isNaN(_value)) {
      val = (0,clamp_clamp/* clamp */.q)(startValue, minValue, max);
    } else {
      const decrementedValue = (Math.round(Number(_value) * factor) - Math.round(step * factor)) / factor;
      val = minValue !== void 0 && decrementedValue < minValue ? minValue : decrementedValue;
    }
    const formattedValue = val.toFixed(maxPrecision);
    setValue(parseFloat(formattedValue));
    onValueChange?.(
      { floatValue: parseFloat(formattedValue), formattedValue, value: formattedValue },
      { source: "decrement" }
    );
    setTimeout(() => adjustCursor(inputRef.current?.value.length), 0);
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (readOnly || !withKeyboardEvents) {
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      incrementRef.current?.();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      decrementRef.current?.();
    }
  };
  const handleKeyDownCapture = (event) => {
    onKeyDownCapture?.(event);
    if (event.key === "Backspace") {
      const input = inputRef.current;
      if (input && input.selectionStart === 0 && input.selectionStart === input.selectionEnd) {
        event.preventDefault();
        window.setTimeout(() => adjustCursor(0), 0);
      }
    }
  };
  const handleBlur = (event) => {
    let sanitizedValue = _value;
    if (clampBehavior === "blur" && typeof sanitizedValue === "number") {
      sanitizedValue = (0,clamp_clamp/* clamp */.q)(sanitizedValue, min, max);
    }
    if (trimLeadingZeroesOnBlur && typeof sanitizedValue === "string" && getDecimalPlaces2(sanitizedValue) < 15) {
      sanitizedValue = clampAndSanitizeInput(sanitizedValue, max, min);
    }
    if (_value !== sanitizedValue) {
      setValue(sanitizedValue);
    }
    onBlur?.(event);
  };
  (0,use_merged_ref/* assignRef */.bl)(handlersRef, { increment: incrementRef.current, decrement: decrementRef.current });
  const onStepHandleChange = (isIncrement) => {
    if (isIncrement) {
      incrementRef.current?.();
    } else {
      decrementRef.current?.();
    }
    stepCountRef.current += 1;
  };
  const onStepLoop = (isIncrement) => {
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      const interval = typeof stepHoldInterval === "number" ? stepHoldInterval : stepHoldInterval(stepCountRef.current);
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), interval);
    }
  };
  const onStep = (event, isIncrement) => {
    event.preventDefault();
    inputRef.current?.focus();
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), stepHoldDelay);
    }
  };
  const onStepDone = () => {
    if (onStepTimeoutRef.current) {
      window.clearTimeout(onStepTimeoutRef.current);
    }
    onStepTimeoutRef.current = null;
    stepCountRef.current = 0;
  };
  const controls = /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)("div", { ...getStyles("controls"), children: [
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      UnstyledButton/* UnstyledButton */.N,
      {
        ...getStyles("control"),
        tabIndex: -1,
        "aria-hidden": true,
        disabled: disabled || typeof _value === "number" && max !== void 0 && _value >= max,
        mod: { direction: "up" },
        onMouseDown: (event) => event.preventDefault(),
        onPointerDown: (event) => {
          onStep(event, true);
        },
        onPointerUp: onStepDone,
        onPointerLeave: onStepDone,
        children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(NumberInputChevron, { direction: "up" })
      }
    ),
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      UnstyledButton/* UnstyledButton */.N,
      {
        ...getStyles("control"),
        tabIndex: -1,
        "aria-hidden": true,
        disabled: disabled || typeof _value === "number" && min !== void 0 && _value <= min,
        mod: { direction: "down" },
        onMouseDown: (event) => event.preventDefault(),
        onPointerDown: (event) => {
          onStep(event, false);
        },
        onPointerUp: onStepDone,
        onPointerLeave: onStepDone,
        children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(NumberInputChevron, { direction: "down" })
      }
    )
  ] });
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    InputBase/* InputBase */.O,
    {
      component: NumericFormat,
      allowNegative,
      className: (0,clsx/* default */.A)(classes.root, className),
      size,
      ...others,
      readOnly,
      disabled,
      value: _value,
      getInputRef: (0,use_merged_ref/* useMergedRef */.pc)(ref, inputRef),
      onValueChange: handleValueChange,
      rightSection: hideControls || readOnly || !canIncrement(_value) ? rightSection : rightSection || controls,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      __staticSelector: "NumberInput",
      decimalScale: allowDecimal ? decimalScale : 0,
      onKeyDown: handleKeyDown,
      onKeyDownCapture: handleKeyDownCapture,
      rightSectionPointerEvents: rightSectionPointerEvents ?? (disabled ? "none" : void 0),
      rightSectionWidth: rightSectionWidth ?? `var(--ni-right-section-width-${size || "sm"})`,
      allowLeadingZeros,
      onBlur: handleBlur,
      isAllowed: (val) => {
        if (clampBehavior === "strict") {
          if (isAllowed) {
            return isAllowed(val) && isInRange(val.floatValue, min, max);
          }
          return isInRange(val.floatValue, min, max);
        }
        return isAllowed ? isAllowed(val) : true;
      }
    }
  );
});
NumberInput.classes = { ...InputBase/* InputBase */.O.classes, ...classes };
NumberInput.displayName = "@mantine/core/NumberInput";


//# sourceMappingURL=NumberInput.mjs.map


/***/ }),

/***/ 8030:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I: () => (/* binding */ SegmentedControl)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/use-mounted/use-mounted.mjs
'use client';


function useMounted() {
  const [mounted, setMounted] = (0,external_React_.useState)(false);
  (0,external_React_.useEffect)(() => setMounted(true), []);
  return mounted;
}


//# sourceMappingURL=use-mounted.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/utils/random-id/random-id.mjs
var random_id = __webpack_require__(5727);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-uncontrolled/use-uncontrolled.mjs
var use_uncontrolled = __webpack_require__(1617);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-id/use-id.mjs + 1 modules
var use_id = __webpack_require__(6284);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var use_merged_ref = __webpack_require__(7055);
;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/utils/shallow-equal/shallow-equal.mjs
'use client';
function shallowEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }
  const keys = Object.keys(a);
  const { length } = keys;
  if (length !== Object.keys(b).length) {
    return false;
  }
  for (let i = 0; i < length; i += 1) {
    const key = keys[i];
    if (!(key in b)) {
      return false;
    }
    if (a[key] !== b[key] && !(Number.isNaN(a[key]) && Number.isNaN(b[key]))) {
      return false;
    }
  }
  return true;
}


//# sourceMappingURL=shallow-equal.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/use-shallow-effect/use-shallow-effect.mjs
'use client';



function shallowCompare(prevValue, currValue) {
  if (!prevValue || !currValue) {
    return false;
  }
  if (prevValue === currValue) {
    return true;
  }
  if (prevValue.length !== currValue.length) {
    return false;
  }
  for (let i = 0; i < prevValue.length; i += 1) {
    if (!shallowEqual(prevValue[i], currValue[i])) {
      return false;
    }
  }
  return true;
}
function useShallowCompare(dependencies) {
  const ref = (0,external_React_.useRef)([]);
  const updateRef = (0,external_React_.useRef)(0);
  if (!shallowCompare(ref.current, dependencies)) {
    ref.current = dependencies;
    updateRef.current += 1;
  }
  return [updateRef.current];
}
function useShallowEffect(cb, dependencies) {
  (0,external_React_.useEffect)(cb, useShallowCompare(dependencies));
}


//# sourceMappingURL=use-shallow-effect.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
var get_size = __webpack_require__(6324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
var create_vars_resolver = __webpack_require__(9396);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-theme-color/get-theme-color.mjs
var get_theme_color = __webpack_require__(6344);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-contrast-color/get-contrast-color.mjs
var get_contrast_color = __webpack_require__(5488);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs + 1 modules
var MantineThemeProvider = __webpack_require__(1101);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/Box.mjs + 21 modules
var Box = __webpack_require__(9500);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/use-timeout/use-timeout.mjs
'use client';


function useTimeout(callback, delay, options = { autoInvoke: false }) {
  const timeoutRef = (0,external_React_.useRef)(null);
  const start = (0,external_React_.useCallback)(
    (...args) => {
      if (!timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          callback(args);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [delay]
  );
  const clear = (0,external_React_.useCallback)(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  (0,external_React_.useEffect)(() => {
    if (options.autoInvoke) {
      start();
    }
    return clear;
  }, [clear, start]);
  return { start, clear };
}


//# sourceMappingURL=use-timeout.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/hooks/esm/use-mutation-observer/use-mutation-observer.mjs
'use client';


function useMutationObserver(callback, options, target) {
  const observer = (0,external_React_.useRef)(null);
  const ref = (0,external_React_.useRef)(null);
  (0,external_React_.useEffect)(() => {
    const targetElement = typeof target === "function" ? target() : target;
    if (targetElement || ref.current) {
      observer.current = new MutationObserver(callback);
      observer.current.observe(targetElement || ref.current, options);
    }
    return () => {
      observer.current?.disconnect();
    };
  }, [callback, options]);
  return ref;
}


//# sourceMappingURL=use-mutation-observer.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-env/get-env.mjs
var get_env = __webpack_require__(9890);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/ScrollArea/utils/to-int.mjs
var to_int = __webpack_require__(4302);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/FloatingIndicator/use-floating-indicator.mjs
'use client';














function isParent(parentElement, childElement) {
  if (!childElement || !parentElement) {
    return false;
  }
  let parent = childElement.parentNode;
  while (parent != null) {
    if (parent === parentElement) {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}
function useFloatingIndicator({
  target,
  parent,
  ref,
  displayAfterTransitionEnd
}) {
  const transitionTimeout = (0,external_React_.useRef)(-1);
  const [initialized, setInitialized] = (0,external_React_.useState)(false);
  const [hidden, setHidden] = (0,external_React_.useState)(
    typeof displayAfterTransitionEnd === "boolean" ? displayAfterTransitionEnd : false
  );
  const updatePosition = () => {
    if (!target || !parent || !ref.current) {
      return;
    }
    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const targetComputedStyle = window.getComputedStyle(target);
    const parentComputedStyle = window.getComputedStyle(parent);
    const borderTopWidth = (0,to_int/* toInt */.R)(targetComputedStyle.borderTopWidth) + (0,to_int/* toInt */.R)(parentComputedStyle.borderTopWidth);
    const borderLeftWidth = (0,to_int/* toInt */.R)(targetComputedStyle.borderLeftWidth) + (0,to_int/* toInt */.R)(parentComputedStyle.borderLeftWidth);
    const position = {
      top: targetRect.top - parentRect.top - borderTopWidth,
      left: targetRect.left - parentRect.left - borderLeftWidth,
      width: targetRect.width,
      height: targetRect.height
    };
    ref.current.style.transform = `translateY(${position.top}px) translateX(${position.left}px)`;
    ref.current.style.width = `${position.width}px`;
    ref.current.style.height = `${position.height}px`;
  };
  const updatePositionWithoutAnimation = () => {
    window.clearTimeout(transitionTimeout.current);
    if (ref.current) {
      ref.current.style.transitionDuration = "0ms";
    }
    updatePosition();
    transitionTimeout.current = window.setTimeout(() => {
      if (ref.current) {
        ref.current.style.transitionDuration = "";
      }
    }, 30);
  };
  const targetResizeObserver = (0,external_React_.useRef)(null);
  const parentResizeObserver = (0,external_React_.useRef)(null);
  (0,external_React_.useEffect)(() => {
    updatePosition();
    if (target) {
      targetResizeObserver.current = new ResizeObserver(updatePositionWithoutAnimation);
      targetResizeObserver.current.observe(target);
      if (parent) {
        parentResizeObserver.current = new ResizeObserver(updatePositionWithoutAnimation);
        parentResizeObserver.current.observe(parent);
      }
      return () => {
        targetResizeObserver.current?.disconnect();
        parentResizeObserver.current?.disconnect();
      };
    }
    return void 0;
  }, [parent, target]);
  (0,external_React_.useEffect)(() => {
    if (parent) {
      const handleTransitionEnd = (event) => {
        if (isParent(event.target, parent)) {
          updatePositionWithoutAnimation();
          setHidden(false);
        }
      };
      parent.addEventListener("transitionend", handleTransitionEnd);
      return () => {
        parent.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
    return void 0;
  }, [parent]);
  useTimeout(
    () => {
      if ((0,get_env/* getEnv */._)() !== "test") {
        setInitialized(true);
      }
    },
    20,
    { autoInvoke: true }
  );
  useMutationObserver(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "dir") {
          updatePositionWithoutAnimation();
        }
      });
    },
    { attributes: true, attributeFilter: ["dir"] },
    () => document.documentElement
  );
  return { initialized, hidden };
}


//# sourceMappingURL=use-floating-indicator.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/FloatingIndicator/FloatingIndicator.module.css.mjs
'use client';
var classes = {"root":"m_96b553a6"};


//# sourceMappingURL=FloatingIndicator.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/FloatingIndicator/FloatingIndicator.mjs
'use client';


















const defaultProps = {};
const varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)(
  (_theme, { transitionDuration }) => ({
    root: {
      "--transition-duration": typeof transitionDuration === "number" ? `${transitionDuration}ms` : transitionDuration
    }
  })
);
const FloatingIndicator = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("FloatingIndicator", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    target,
    parent,
    transitionDuration,
    mod,
    displayAfterTransitionEnd,
    ...others
  } = props;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "FloatingIndicator",
    classes: classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  const innerRef = (0,external_React_.useRef)(null);
  const { initialized, hidden } = useFloatingIndicator({
    target,
    parent,
    ref: innerRef,
    displayAfterTransitionEnd
  });
  const mergedRef = (0,use_merged_ref/* useMergedRef */.pc)(ref, innerRef);
  if (!target || !parent) {
    return null;
  }
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(Box/* Box */.a, { ref: mergedRef, mod: [{ initialized, hidden }, mod], ...getStyles("root"), ...others });
});
FloatingIndicator.displayName = "@mantine/core/FloatingIndicator";
FloatingIndicator.classes = classes;


//# sourceMappingURL=FloatingIndicator.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.module.css.mjs
'use client';
var SegmentedControl_module_css_classes = {"root":"m_cf365364","indicator":"m_9e182ccd","label":"m_1738fcb2","input":"m_1714d588","control":"m_69686b9b","innerLabel":"m_78882f40"};


//# sourceMappingURL=SegmentedControl.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/SegmentedControl/SegmentedControl.mjs
'use client';





















const SegmentedControl_defaultProps = {
  withItemsBorders: true
};
const SegmentedControl_varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)(
  (theme, { radius, color, transitionDuration, size, transitionTimingFunction }) => ({
    root: {
      "--sc-radius": radius === void 0 ? void 0 : (0,get_size/* getRadius */.nJ)(radius),
      "--sc-color": color ? (0,get_theme_color/* getThemeColor */.r)(color, theme) : void 0,
      "--sc-shadow": color ? void 0 : "var(--mantine-shadow-xs)",
      "--sc-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
      "--sc-transition-timing-function": transitionTimingFunction,
      "--sc-padding": (0,get_size/* getSize */.YC)(size, "sc-padding"),
      "--sc-font-size": (0,get_size/* getFontSize */.ny)(size)
    }
  })
);
const SegmentedControl = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("SegmentedControl", SegmentedControl_defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    data,
    value,
    defaultValue,
    onChange,
    size,
    name,
    disabled,
    readOnly,
    fullWidth,
    orientation,
    radius,
    color,
    transitionDuration,
    transitionTimingFunction,
    variant,
    autoContrast,
    withItemsBorders,
    mod,
    ...others
  } = props;
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "SegmentedControl",
    props,
    classes: SegmentedControl_module_css_classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: SegmentedControl_varsResolver
  });
  const theme = (0,MantineThemeProvider/* useMantineTheme */.xd)();
  const _data = data.map(
    (item) => typeof item === "string" ? { label: item, value: item } : item
  );
  const initialized = useMounted();
  const [key, setKey] = (0,external_React_.useState)((0,random_id/* randomId */.z)());
  const [parent, setParent] = (0,external_React_.useState)(null);
  const [refs, setRefs] = (0,external_React_.useState)({});
  const setElementRef = (element, val) => {
    refs[val] = element;
    setRefs(refs);
  };
  const [_value, handleValueChange] = (0,use_uncontrolled/* useUncontrolled */.Z)({
    value,
    defaultValue,
    finalValue: Array.isArray(data) ? _data.find((item) => !item.disabled)?.value ?? data[0]?.value ?? null : null,
    onChange
  });
  const uuid = (0,use_id/* useId */.B)(name);
  const controls = _data.map((item) => /* @__PURE__ */ (0,external_React_.createElement)(
    Box/* Box */.a,
    {
      ...getStyles("control"),
      mod: { active: _value === item.value, orientation },
      key: item.value
    },
    /* @__PURE__ */ (0,external_React_.createElement)(
      "input",
      {
        ...getStyles("input"),
        disabled: disabled || item.disabled,
        type: "radio",
        name: uuid,
        value: item.value,
        id: `${uuid}-${item.value}`,
        checked: _value === item.value,
        onChange: () => !readOnly && handleValueChange(item.value),
        "data-focus-ring": theme.focusRing,
        key: `${item.value}-input`
      }
    ),
    /* @__PURE__ */ (0,external_React_.createElement)(
      Box/* Box */.a,
      {
        component: "label",
        ...getStyles("label"),
        mod: {
          active: _value === item.value && !(disabled || item.disabled),
          disabled: disabled || item.disabled,
          "read-only": readOnly
        },
        htmlFor: `${uuid}-${item.value}`,
        ref: (node) => setElementRef(node, item.value),
        __vars: {
          "--sc-label-color": color !== void 0 ? (0,get_contrast_color/* getContrastColor */.w)({ color, theme, autoContrast }) : void 0
        },
        key: `${item.value}-label`
      },
      /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("span", { ...getStyles("innerLabel"), children: item.label })
    )
  ));
  const mergedRef = (0,use_merged_ref/* useMergedRef */.pc)(ref, (node) => setParent(node));
  useShallowEffect(() => {
    setKey((0,random_id/* randomId */.z)());
  }, [data.length]);
  if (data.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
    Box/* Box */.a,
    {
      ...getStyles("root"),
      variant,
      size,
      ref: mergedRef,
      mod: [
        {
          "full-width": fullWidth,
          orientation,
          initialized,
          "with-items-borders": withItemsBorders
        },
        mod
      ],
      ...others,
      role: "radiogroup",
      "data-disabled": disabled,
      children: [
        typeof _value === "string" && /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
          FloatingIndicator,
          {
            target: refs[_value],
            parent,
            component: "span",
            transitionDuration: "var(--sc-transition-duration)",
            ...getStyles("indicator")
          },
          key
        ),
        controls
      ]
    }
  );
});
SegmentedControl.classes = SegmentedControl_module_css_classes;
SegmentedControl.displayName = "@mantine/core/SegmentedControl";


//# sourceMappingURL=SegmentedControl.mjs.map


/***/ }),

/***/ 5917:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  T: () => (/* binding */ Textarea)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(8168);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(8587);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
;// CONCATENATED MODULE: ./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js


var index = external_React_.useLayoutEffect ;



;// CONCATENATED MODULE: ./node_modules/use-latest/dist/use-latest.esm.js



var useLatest = function useLatest(value) {
  var ref = external_React_default().useRef(value);
  index(function () {
    ref.current = value;
  });
  return ref;
};



;// CONCATENATED MODULE: ./node_modules/use-composed-ref/dist/use-composed-ref.esm.js


// basically Exclude<React.ClassAttributes<T>["ref"], string>

var updateRef = function updateRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  ref.current = value;
};
var useComposedRef = function useComposedRef(libRef, userRef) {
  var prevUserRef = external_React_default().useRef();
  return external_React_default().useCallback(function (instance) {
    libRef.current = instance;
    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }
    prevUserRef.current = userRef;
    if (!userRef) {
      return;
    }
    updateRef(userRef, instance);
  }, [userRef]);
};



;// CONCATENATED MODULE: ./node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js






var HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  height: '0',
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'absolute',
  'z-index': '-1000',
  top: '0',
  right: '0',
  display: 'block'
};
var forceHiddenStyles = function forceHiddenStyles(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function (key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], 'important');
  });
};
var forceHiddenStyles$1 = forceHiddenStyles;

var hiddenTextarea = null;
var getHeight = function getHeight(node, sizingData) {
  var height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    return height + sizingData.borderSize;
  }

  // remove padding, since height = content
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value, minRows, maxRows) {
  if (minRows === void 0) {
    minRows = 1;
  }
  if (maxRows === void 0) {
    maxRows = Infinity;
  }
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tabindex', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    forceHiddenStyles$1(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  var paddingSize = sizingData.paddingSize,
    borderSize = sizingData.borderSize,
    sizingStyle = sizingData.sizingStyle;
  var boxSizing = sizingStyle.boxSizing;
  Object.keys(sizingStyle).forEach(function (_key) {
    var key = _key;
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles$1(hiddenTextarea);
  hiddenTextarea.value = value;
  var height = getHeight(hiddenTextarea, sizingData);
  // Double set and calc due to Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1795904
  hiddenTextarea.value = value;
  height = getHeight(hiddenTextarea, sizingData);

  // measure height of a textarea with a single row
  hiddenTextarea.value = 'x';
  var rowHeight = hiddenTextarea.scrollHeight - paddingSize;
  var minHeight = rowHeight * minRows;
  if (boxSizing === 'border-box') {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  var maxHeight = rowHeight * maxRows;
  if (boxSizing === 'border-box') {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return [height, rowHeight];
}

var noop = function noop() {};
var pick = function pick(props, obj) {
  return props.reduce(function (acc, prop) {
    acc[prop] = obj[prop];
    return acc;
  }, {});
};

var SIZING_STYLE = ['borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'boxSizing', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop',
// non-standard
'tabSize', 'textIndent',
// non-standard
'textRendering', 'textTransform', 'width', 'wordBreak', 'wordSpacing', 'scrollbarGutter'];
var isIE = !!document.documentElement.currentStyle ;
var getSizingData = function getSizingData(node) {
  var style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  var sizingStyle = pick(SIZING_STYLE, style);
  var boxSizing = sizingStyle.boxSizing;

  // probably node is detached from DOM, can't read computed dimensions
  if (boxSizing === '') {
    return null;
  }

  // IE (Edge has already correct behaviour) returns content width as computed width
  // so we need to add manually padding and border widths
  if (isIE && boxSizing === 'border-box') {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(sizingStyle.borderRightWidth) + parseFloat(sizingStyle.borderLeftWidth) + parseFloat(sizingStyle.paddingRight) + parseFloat(sizingStyle.paddingLeft) + 'px';
  }
  var paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  var borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize
  };
};
var getSizingData$1 = getSizingData;

function useListener(target, type, listener) {
  var latestListener = useLatest(listener);
  external_React_.useLayoutEffect(function () {
    var handler = function handler(ev) {
      return latestListener.current(ev);
    };
    // might happen if document.fonts is not defined, for instance
    if (!target) {
      return;
    }
    target.addEventListener(type, handler);
    return function () {
      return target.removeEventListener(type, handler);
    };
  }, []);
}
var useFormResetListener = function useFormResetListener(libRef, listener) {
  useListener(document.body, 'reset', function (ev) {
    if (libRef.current.form === ev.target) {
      listener(ev);
    }
  });
};
var useWindowResizeListener = function useWindowResizeListener(listener) {
  useListener(window, 'resize', listener);
};
var useFontsLoadedListener = function useFontsLoadedListener(listener) {
  useListener(document.fonts, 'loadingdone', listener);
};

var _excluded = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
var TextareaAutosize = function TextareaAutosize(_ref, userRef) {
  var cacheMeasurements = _ref.cacheMeasurements,
    maxRows = _ref.maxRows,
    minRows = _ref.minRows,
    _ref$onChange = _ref.onChange,
    onChange = _ref$onChange === void 0 ? noop : _ref$onChange,
    _ref$onHeightChange = _ref.onHeightChange,
    onHeightChange = _ref$onHeightChange === void 0 ? noop : _ref$onHeightChange,
    props = (0,objectWithoutPropertiesLoose/* default */.A)(_ref, _excluded);
  var isControlled = props.value !== undefined;
  var libRef = external_React_.useRef(null);
  var ref = useComposedRef(libRef, userRef);
  var heightRef = external_React_.useRef(0);
  var measurementsCacheRef = external_React_.useRef();
  var resizeTextarea = function resizeTextarea() {
    var node = libRef.current;
    var nodeSizingData = cacheMeasurements && measurementsCacheRef.current ? measurementsCacheRef.current : getSizingData$1(node);
    if (!nodeSizingData) {
      return;
    }
    measurementsCacheRef.current = nodeSizingData;
    var _calculateNodeHeight = calculateNodeHeight(nodeSizingData, node.value || node.placeholder || 'x', minRows, maxRows),
      height = _calculateNodeHeight[0],
      rowHeight = _calculateNodeHeight[1];
    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty('height', height + "px", 'important');
      onHeightChange(height, {
        rowHeight: rowHeight
      });
    }
  };
  var handleChange = function handleChange(event) {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };
  {
    external_React_.useLayoutEffect(resizeTextarea);
    useFormResetListener(libRef, function () {
      if (!isControlled) {
        var currentValue = libRef.current.value;
        requestAnimationFrame(function () {
          var node = libRef.current;
          if (node && currentValue !== node.value) {
            resizeTextarea();
          }
        });
      }
    });
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return /*#__PURE__*/external_React_.createElement("textarea", (0,esm_extends/* default */.A)({}, props, {
      onChange: handleChange,
      ref: ref
    }));
  }
};
var react_textarea_autosize_browser_esm_index = /* #__PURE__ */external_React_.forwardRef(TextareaAutosize);



// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-env/get-env.mjs
var get_env = __webpack_require__(9890);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/InputBase/InputBase.mjs + 1 modules
var InputBase = __webpack_require__(2056);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Textarea/Textarea.mjs
'use client';

















const defaultProps = {};
const Textarea = (0,factory/* factory */.P9)((props, ref) => {
  const { autosize, maxRows, minRows, __staticSelector, resize, ...others } = (0,use_props/* useProps */.Y)(
    "Textarea",
    defaultProps,
    props
  );
  const shouldAutosize = autosize && (0,get_env/* getEnv */._)() !== "test";
  const autosizeProps = shouldAutosize ? { maxRows, minRows } : {};
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
    InputBase/* InputBase */.O,
    {
      component: shouldAutosize ? react_textarea_autosize_browser_esm_index : "textarea",
      ref,
      ...others,
      __staticSelector: __staticSelector || "Textarea",
      multiline: true,
      "data-no-overflow": autosize && maxRows === void 0 || void 0,
      __vars: { "--input-resize": resize },
      ...autosizeProps
    }
  );
});
Textarea.classes = InputBase/* InputBase */.O.classes;
Textarea.displayName = "@mantine/core/Textarea";


//# sourceMappingURL=Textarea.mjs.map


/***/ }),

/***/ 2335:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  m: () => (/* binding */ Tooltip)
});

// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(4164);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-merged-ref/use-merged-ref.mjs
var use_merged_ref = __webpack_require__(7055);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/is-element/is-element.mjs
var is_element = __webpack_require__(9178);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-default-z-index/get-default-z-index.mjs
var get_default_z_index = __webpack_require__(8690);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-size/get-size.mjs
var get_size = __webpack_require__(6324);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/utils/get-ref-prop/get-ref-prop.mjs
var get_ref_prop = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/create-vars-resolver/create-vars-resolver.mjs
var create_vars_resolver = __webpack_require__(9396);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/use-props/use-props.mjs
var use_props = __webpack_require__(6100);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/styles-api/use-styles/use-styles.mjs + 15 modules
var use_styles = __webpack_require__(2837);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/Box.mjs + 21 modules
var Box = __webpack_require__(9500);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/factory/factory.mjs
var factory = __webpack_require__(2412);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/DirectionProvider/DirectionProvider.mjs
var DirectionProvider = __webpack_require__(2820);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Floating/FloatingArrow/FloatingArrow.mjs + 1 modules
var FloatingArrow = __webpack_require__(1797);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Floating/get-floating-position/get-floating-position.mjs
var get_floating_position = __webpack_require__(9598);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Portal/OptionalPortal.mjs + 1 modules
var OptionalPortal = __webpack_require__(9268);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/components/Transition/Transition.mjs + 3 modules
var Transition = __webpack_require__(3087);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Transition/get-transition-props/get-transition-props.mjs
'use client';
const defaultTransition = {
  duration: 100,
  transition: "fade"
};
function getTransitionProps(transitionProps, componentTransition) {
  return { ...defaultTransition, ...componentTransition, ...transitionProps };
}


//# sourceMappingURL=get-transition-props.mjs.map

// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/color-functions/get-theme-color/get-theme-color.mjs
var get_theme_color = __webpack_require__(6344);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/MantineProvider/MantineThemeProvider/MantineThemeProvider.mjs + 1 modules
var MantineThemeProvider = __webpack_require__(1101);
// EXTERNAL MODULE: ./node_modules/@mantine/core/esm/core/Box/get-style-object/get-style-object.mjs
var get_style_object = __webpack_require__(7500);
// EXTERNAL MODULE: ./node_modules/@floating-ui/react/dist/floating-ui.react.mjs + 1 modules
var floating_ui_react = __webpack_require__(3505);
// EXTERNAL MODULE: ./node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var floating_ui_react_dom = __webpack_require__(4743);
// EXTERNAL MODULE: ./node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
var floating_ui_utils_dom = __webpack_require__(6635);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/use-floating-tooltip.mjs
'use client';



function useFloatingTooltip({
  offset,
  position,
  defaultOpened
}) {
  const [opened, setOpened] = (0,external_React_.useState)(defaultOpened);
  const boundaryRef = (0,external_React_.useRef)(null);
  const { x, y, elements, refs, update, placement } = (0,floating_ui_react/* useFloating */.we)({
    placement: position,
    middleware: [
      (0,floating_ui_react_dom/* shift */.BN)({
        crossAxis: true,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  });
  const horizontalOffset = placement.includes("right") ? offset : position.includes("left") ? offset * -1 : 0;
  const verticalOffset = placement.includes("bottom") ? offset : position.includes("top") ? offset * -1 : 0;
  const handleMouseMove = (0,external_React_.useCallback)(
    ({ clientX, clientY }) => {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            left: clientX + horizontalOffset,
            top: clientY + verticalOffset,
            right: clientX,
            bottom: clientY
          };
        }
      });
    },
    [elements.reference]
  );
  (0,external_React_.useEffect)(() => {
    if (refs.floating.current) {
      const boundary = boundaryRef.current;
      boundary.addEventListener("mousemove", handleMouseMove);
      const parents = (0,floating_ui_utils_dom/* getOverflowAncestors */.v9)(refs.floating.current);
      parents.forEach((parent) => {
        parent.addEventListener("scroll", update);
      });
      return () => {
        boundary.removeEventListener("mousemove", handleMouseMove);
        parents.forEach((parent) => {
          parent.removeEventListener("scroll", update);
        });
      };
    }
    return void 0;
  }, [elements.reference, refs.floating.current, update, handleMouseMove, opened]);
  return { handleMouseMove, x, y, opened, setOpened, boundaryRef, floating: refs.setFloating };
}


//# sourceMappingURL=use-floating-tooltip.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/Tooltip.module.css.mjs
'use client';
var classes = {"tooltip":"m_1b3c8819","arrow":"m_f898399f"};


//# sourceMappingURL=Tooltip.module.css.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/TooltipFloating/TooltipFloating.mjs
'use client';


























const defaultProps = {
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: (0,get_default_z_index/* getDefaultZIndex */.I)("popover")
};
const varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)((theme, { radius, color }) => ({
  tooltip: {
    "--tooltip-radius": radius === void 0 ? void 0 : (0,get_size/* getRadius */.nJ)(radius),
    "--tooltip-bg": color ? (0,get_theme_color/* getThemeColor */.r)(color, theme) : void 0,
    "--tooltip-color": color ? "var(--mantine-color-white)" : void 0
  }
}));
const TooltipFloating = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("TooltipFloating", defaultProps, _props);
  const {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset,
    position,
    multiline,
    zIndex,
    disabled,
    defaultOpened,
    variant,
    vars,
    portalProps,
    ...others
  } = props;
  const theme = (0,MantineThemeProvider/* useMantineTheme */.xd)();
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "TooltipFloating",
    props,
    classes: classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "tooltip",
    vars,
    varsResolver
  });
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset,
    position,
    defaultOpened
  });
  if (!(0,is_element/* isElement */.v)(children)) {
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = (0,use_merged_ref/* useMergedRef */.pc)(boundaryRef, (0,get_ref_prop/* getRefProp */.x)(children), ref);
  const _childrenProps = children.props;
  const onMouseEnter = (event) => {
    _childrenProps.onMouseEnter?.(event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    _childrenProps.onMouseLeave?.(event);
    setOpened(false);
  };
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(external_ReactJSXRuntime_.Fragment, { children: [
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(OptionalPortal/* OptionalPortal */.r, { ...portalProps, withinPortal, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      Box/* Box */.a,
      {
        ...others,
        ...getStyles("tooltip", {
          style: {
            ...(0,get_style_object/* getStyleObject */.X)(style, theme),
            zIndex,
            display: !disabled && opened ? "block" : "none",
            top: (y && Math.round(y)) ?? "",
            left: (x && Math.round(x)) ?? ""
          }
        }),
        variant,
        ref: floating,
        mod: { multiline },
        children: label
      }
    ) }),
    (0,external_React_.cloneElement)(children, {
      ..._childrenProps,
      [refProp]: targetRef,
      onMouseEnter,
      onMouseLeave
    })
  ] });
});
TooltipFloating.classes = classes;
TooltipFloating.displayName = "@mantine/core/TooltipFloating";


//# sourceMappingURL=TooltipFloating.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.context.mjs
'use client';


const TooltipGroupContext = (0,external_React_.createContext)(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => (0,external_React_.useContext)(TooltipGroupContext);


//# sourceMappingURL=TooltipGroup.context.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/TooltipGroup/TooltipGroup.mjs
'use client';















const TooltipGroup_defaultProps = {
  openDelay: 0,
  closeDelay: 0
};
function TooltipGroup(props) {
  const { openDelay, closeDelay, children } = (0,use_props/* useProps */.Y)("TooltipGroup", TooltipGroup_defaultProps, props);
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(TooltipGroupProvider, { value: true, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(floating_ui_react/* FloatingDelayGroup */.T3, { delay: { open: openDelay, close: closeDelay }, children }) });
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";
TooltipGroup.extend = (c) => c;


//# sourceMappingURL=TooltipGroup.mjs.map

// EXTERNAL MODULE: ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs + 2 modules
var floating_ui_dom = __webpack_require__(7315);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-id/use-id.mjs + 1 modules
var use_id = __webpack_require__(6284);
// EXTERNAL MODULE: ./node_modules/@mantine/hooks/esm/use-did-update/use-did-update.mjs
var use_did_update = __webpack_require__(297);
;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/use-tooltip.mjs
'use client';





function getDefaultMiddlewares(middlewares) {
  if (middlewares === void 0) {
    return { shift: true, flip: true };
  }
  const result = { ...middlewares };
  if (middlewares.shift === void 0) {
    result.shift = true;
  }
  if (middlewares.flip === void 0) {
    result.flip = true;
  }
  return result;
}
function getTooltipMiddlewares(settings) {
  const middlewaresOptions = getDefaultMiddlewares(settings.middlewares);
  const middlewares = [(0,floating_ui_react_dom/* offset */.cY)(settings.offset)];
  if (middlewaresOptions.shift) {
    middlewares.push(
      (0,floating_ui_react_dom/* shift */.BN)(
        typeof middlewaresOptions.shift === "boolean" ? { padding: 8 } : { padding: 8, ...middlewaresOptions.shift }
      )
    );
  }
  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === "boolean" ? (0,floating_ui_react_dom/* flip */.UU)() : (0,floating_ui_react_dom/* flip */.UU)(middlewaresOptions.flip)
    );
  }
  middlewares.push((0,floating_ui_react_dom/* arrow */.UE)({ element: settings.arrowRef, padding: settings.arrowOffset }));
  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === "boolean" ? (0,floating_ui_react_dom/* inline */.mG)() : (0,floating_ui_react_dom/* inline */.mG)(middlewaresOptions.inline)
    );
  } else if (settings.inline) {
    middlewares.push((0,floating_ui_react_dom/* inline */.mG)());
  }
  return middlewares;
}
function useTooltip(settings) {
  const [uncontrolledOpened, setUncontrolledOpened] = (0,external_React_.useState)(settings.defaultOpened);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = useTooltipGroupContext();
  const uid = (0,use_id/* useId */.B)();
  const onChange = (0,external_React_.useCallback)(
    (_opened) => {
      setUncontrolledOpened(_opened);
      if (_opened) {
        setCurrentId(uid);
      }
    },
    [uid]
  );
  const {
    x,
    y,
    context,
    refs,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = (0,floating_ui_react/* useFloating */.we)({
    strategy: settings.strategy,
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: getTooltipMiddlewares(settings),
    whileElementsMounted: floating_ui_dom/* autoUpdate */.ll
  });
  const { delay: groupDelay, currentId, setCurrentId } = (0,floating_ui_react/* useDelayGroup */.ck)(context, { id: uid });
  const { getReferenceProps, getFloatingProps } = (0,floating_ui_react/* useInteractions */.bv)([
    (0,floating_ui_react/* useHover */.Mk)(context, {
      enabled: settings.events?.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events?.touch
    }),
    (0,floating_ui_react/* useFocus */.iQ)(context, { enabled: settings.events?.focus, visibleOnly: true }),
    (0,floating_ui_react/* useRole */.It)(context, { role: "tooltip" }),
    // Cannot be used with controlled tooltip, page jumps
    (0,floating_ui_react/* useDismiss */.s9)(context, { enabled: typeof settings.opened === "undefined" })
  ]);
  (0,use_did_update/* useDidUpdate */.C)(() => {
    settings.onPositionChange?.(placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference: refs.setReference,
    floating: refs.setFloating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}


//# sourceMappingURL=use-tooltip.mjs.map

;// CONCATENATED MODULE: ./node_modules/@mantine/core/esm/components/Tooltip/Tooltip.mjs
'use client';






























const Tooltip_defaultProps = {
  position: "top",
  refProp: "ref",
  withinPortal: true,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: true, focus: false, touch: false },
  zIndex: (0,get_default_z_index/* getDefaultZIndex */.I)("popover"),
  positionDependencies: [],
  middlewares: { flip: true, shift: true, inline: false }
};
const Tooltip_varsResolver = (0,create_vars_resolver/* createVarsResolver */.V)(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      theme,
      color: color || theme.primaryColor,
      autoContrast,
      variant: variant || "filled"
    });
    return {
      tooltip: {
        "--tooltip-radius": radius === void 0 ? void 0 : (0,get_size/* getRadius */.nJ)(radius),
        "--tooltip-bg": color ? colors.background : void 0,
        "--tooltip-color": color ? colors.color : void 0
      }
    };
  }
);
const Tooltip = (0,factory/* factory */.P9)((_props, ref) => {
  const props = (0,use_props/* useProps */.Y)("Tooltip", Tooltip_defaultProps, _props);
  const {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    defaultOpened,
    withinPortal,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset,
    transitionProps,
    multiline,
    events,
    zIndex,
    disabled,
    // Scheduled for removal in 9.0
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline,
    variant,
    keepMounted,
    vars,
    portalProps,
    mod,
    floatingStrategy,
    middlewares,
    autoContrast,
    ...others
  } = (0,use_props/* useProps */.Y)("Tooltip", Tooltip_defaultProps, props);
  const { dir } = (0,DirectionProvider/* useDirection */.jH)();
  const arrowRef = (0,external_React_.useRef)(null);
  const tooltip = useTooltip({
    position: (0,get_floating_position/* getFloatingPosition */.Q)(dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    defaultOpened,
    events,
    arrowRef,
    arrowOffset,
    offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
    positionDependencies: [...positionDependencies, children],
    inline,
    strategy: floatingStrategy,
    middlewares
  });
  const getStyles = (0,use_styles/* useStyles */.I)({
    name: "Tooltip",
    props,
    classes: classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    rootSelector: "tooltip",
    vars,
    varsResolver: Tooltip_varsResolver
  });
  if (!(0,is_element/* isElement */.v)(children)) {
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = (0,use_merged_ref/* useMergedRef */.pc)(tooltip.reference, (0,get_ref_prop/* getRefProp */.x)(children), ref);
  const transition = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
  const _childrenProps = children.props;
  return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(external_ReactJSXRuntime_.Fragment, { children: [
    /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(OptionalPortal/* OptionalPortal */.r, { ...portalProps, withinPortal, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      Transition/* Transition */.e,
      {
        ...transition,
        keepMounted,
        mounted: !disabled && !!tooltip.opened,
        duration: tooltip.isGroupPhase ? 10 : transition.duration,
        children: (transitionStyles) => /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsxs)(
          Box/* Box */.a,
          {
            ...others,
            "data-fixed": floatingStrategy === "fixed" || void 0,
            variant,
            mod: [{ multiline }, mod],
            ...tooltip.getFloatingProps({
              ref: tooltip.floating,
              className: getStyles("tooltip").className,
              style: {
                ...getStyles("tooltip").style,
                ...transitionStyles,
                zIndex,
                top: tooltip.y ?? 0,
                left: tooltip.x ?? 0
              }
            }),
            children: [
              label,
              /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
                FloatingArrow/* FloatingArrow */.i,
                {
                  ref: arrowRef,
                  arrowX: tooltip.arrowX,
                  arrowY: tooltip.arrowY,
                  visible: withArrow,
                  position: tooltip.placement,
                  arrowSize,
                  arrowOffset,
                  arrowRadius,
                  arrowPosition,
                  ...getStyles("arrow")
                }
              )
            ]
          }
        )
      }
    ) }),
    (0,external_React_.cloneElement)(
      children,
      tooltip.getReferenceProps({
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove: props.onMouseMove,
        onPointerDown: props.onPointerDown,
        onPointerEnter: props.onPointerEnter,
        className: (0,clsx/* default */.A)(className, _childrenProps.className),
        ..._childrenProps,
        [refProp]: targetRef
      })
    )
  ] });
});
Tooltip.classes = classes;
Tooltip.displayName = "@mantine/core/Tooltip";
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;


//# sourceMappingURL=Tooltip.mjs.map


/***/ }),

/***/ 9890:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ getEnv)
/* harmony export */ });
'use client';
function getEnv() {
  if (typeof process !== "undefined" && process.env && "production") {
    return "production";
  }
  return "development";
}


//# sourceMappingURL=get-env.mjs.map


/***/ }),

/***/ 8143:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ clamp)
/* harmony export */ });
'use client';
function clamp(value, min, max) {
  if (min === void 0 && max === void 0) {
    return value;
  }
  if (min !== void 0 && max === void 0) {
    return Math.max(value, min);
  }
  if (min === void 0 && max !== void 0) {
    return Math.min(value, max);
  }
  return Math.min(Math.max(value, min), max);
}


//# sourceMappingURL=clamp.mjs.map


/***/ }),

/***/ 6115:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconAccessibleFilled)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconAccessibleFilled = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("filled", "accessible-filled", "IconAccessibleFilled", [["path", { "d": "M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.051 6.844a1 1 0 0 0 -1.152 -.663l-.113 .03l-2.684 .895l-2.684 -.895l-.113 -.03a1 1 0 0 0 -.628 1.884l.109 .044l2.316 .771v.976l-1.832 2.75l-.06 .1a1 1 0 0 0 .237 1.21l.1 .076l.101 .06a1 1 0 0 0 1.21 -.237l.076 -.1l1.168 -1.752l1.168 1.752l.07 .093a1 1 0 0 0 1.653 -1.102l-.059 -.1l-1.832 -2.75v-.977l2.316 -.771l.109 -.044a1 1 0 0 0 .524 -1.221zm-3.949 -4.184a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0 -3z", "key": "svg-0" }]]);


//# sourceMappingURL=IconAccessibleFilled.mjs.map


/***/ }),

/***/ 7956:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconArrowDown)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconArrowDown = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "arrow-down", "IconArrowDown", [["path", { "d": "M12 5l0 14", "key": "svg-0" }], ["path", { "d": "M18 13l-6 6", "key": "svg-1" }], ["path", { "d": "M6 13l6 6", "key": "svg-2" }]]);


//# sourceMappingURL=IconArrowDown.mjs.map


/***/ }),

/***/ 274:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconArrowRight)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconArrowRight = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "arrow-right", "IconArrowRight", [["path", { "d": "M5 12l14 0", "key": "svg-0" }], ["path", { "d": "M13 18l6 -6", "key": "svg-1" }], ["path", { "d": "M13 6l6 6", "key": "svg-2" }]]);


//# sourceMappingURL=IconArrowRight.mjs.map


/***/ }),

/***/ 4283:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconArrowsHorizontal)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconArrowsHorizontal = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "arrows-horizontal", "IconArrowsHorizontal", [["path", { "d": "M7 8l-4 4l4 4", "key": "svg-0" }], ["path", { "d": "M17 8l4 4l-4 4", "key": "svg-1" }], ["path", { "d": "M3 12l18 0", "key": "svg-2" }]]);


//# sourceMappingURL=IconArrowsHorizontal.mjs.map


/***/ }),

/***/ 757:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconArrowsVertical)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconArrowsVertical = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "arrows-vertical", "IconArrowsVertical", [["path", { "d": "M8 7l4 -4l4 4", "key": "svg-0" }], ["path", { "d": "M8 17l4 4l4 -4", "key": "svg-1" }], ["path", { "d": "M12 3l0 18", "key": "svg-2" }]]);


//# sourceMappingURL=IconArrowsVertical.mjs.map


/***/ }),

/***/ 9301:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconBrandWordpress)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconBrandWordpress = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "brand-wordpress", "IconBrandWordpress", [["path", { "d": "M9.5 9h3", "key": "svg-0" }], ["path", { "d": "M4 9h2.5", "key": "svg-1" }], ["path", { "d": "M11 9l3 11l4 -9", "key": "svg-2" }], ["path", { "d": "M5.5 9l3.5 11l3 -7", "key": "svg-3" }], ["path", { "d": "M18 11c.177 -.528 1 -1.364 1 -2.5c0 -1.78 -.776 -2.5 -1.875 -2.5c-.898 0 -1.125 .812 -1.125 1.429c0 1.83 2 2.058 2 3.571z", "key": "svg-4" }], ["path", { "d": "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-5" }]]);


//# sourceMappingURL=IconBrandWordpress.mjs.map


/***/ }),

/***/ 6525:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconCirclePlus)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconCirclePlus = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "circle-plus", "IconCirclePlus", [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "key": "svg-0" }], ["path", { "d": "M9 12h6", "key": "svg-1" }], ["path", { "d": "M12 9v6", "key": "svg-2" }]]);


//# sourceMappingURL=IconCirclePlus.mjs.map


/***/ }),

/***/ 7164:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconCloudDownload)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconCloudDownload = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "cloud-download", "IconCloudDownload", [["path", { "d": "M19 18a3.5 3.5 0 0 0 0 -7h-1a5 4.5 0 0 0 -11 -2a4.6 4.4 0 0 0 -2.1 8.4", "key": "svg-0" }], ["path", { "d": "M12 13l0 9", "key": "svg-1" }], ["path", { "d": "M9 19l3 3l3 -3", "key": "svg-2" }]]);


//# sourceMappingURL=IconCloudDownload.mjs.map


/***/ }),

/***/ 7394:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconColorSwatch)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconColorSwatch = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "color-swatch", "IconColorSwatch", [["path", { "d": "M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2", "key": "svg-0" }], ["path", { "d": "M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9", "key": "svg-1" }], ["path", { "d": "M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12", "key": "svg-2" }], ["path", { "d": "M17 17l0 .01", "key": "svg-3" }]]);


//# sourceMappingURL=IconColorSwatch.mjs.map


/***/ }),

/***/ 3325:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconDots)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconDots = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "dots", "IconDots", [["path", { "d": "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }]]);


//# sourceMappingURL=IconDots.mjs.map


/***/ }),

/***/ 6005:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconDroplet)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconDroplet = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "droplet", "IconDroplet", [["path", { "d": "M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z", "key": "svg-0" }]]);


//# sourceMappingURL=IconDroplet.mjs.map


/***/ }),

/***/ 4892:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconFileTypography)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconFileTypography = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "file-typography", "IconFileTypography", [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z", "key": "svg-1" }], ["path", { "d": "M11 18h2", "key": "svg-2" }], ["path", { "d": "M12 18v-7", "key": "svg-3" }], ["path", { "d": "M9 12v-1h6v1", "key": "svg-4" }]]);


//# sourceMappingURL=IconFileTypography.mjs.map


/***/ }),

/***/ 1081:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconFolder)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconFolder = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "folder", "IconFolder", [["path", { "d": "M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2", "key": "svg-0" }]]);


//# sourceMappingURL=IconFolder.mjs.map


/***/ }),

/***/ 685:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconFolderStar)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconFolderStar = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "folder-star", "IconFolderStar", [["path", { "d": "M10 19h-5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2.5", "key": "svg-0" }], ["path", { "d": "M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z", "key": "svg-1" }]]);


//# sourceMappingURL=IconFolderStar.mjs.map


/***/ }),

/***/ 6361:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconGridDots)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconGridDots = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "grid-dots", "IconGridDots", [["path", { "d": "M5 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M19 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }], ["path", { "d": "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-3" }], ["path", { "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-4" }], ["path", { "d": "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-5" }], ["path", { "d": "M5 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-6" }], ["path", { "d": "M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-7" }], ["path", { "d": "M19 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-8" }]]);


//# sourceMappingURL=IconGridDots.mjs.map


/***/ }),

/***/ 7233:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconLayoutBottombar)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconLayoutBottombar = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "layout-bottombar", "IconLayoutBottombar", [["path", { "d": "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z", "key": "svg-0" }], ["path", { "d": "M4 15l16 0", "key": "svg-1" }]]);


//# sourceMappingURL=IconLayoutBottombar.mjs.map


/***/ }),

/***/ 9809:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconLayoutNavbar)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconLayoutNavbar = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "layout-navbar", "IconLayoutNavbar", [["path", { "d": "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z", "key": "svg-0" }], ["path", { "d": "M4 9l16 0", "key": "svg-1" }]]);


//# sourceMappingURL=IconLayoutNavbar.mjs.map


/***/ }),

/***/ 7854:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconLoader2)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconLoader2 = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "loader-2", "IconLoader2", [["path", { "d": "M12 3a9 9 0 1 0 9 9", "key": "svg-0" }]]);


//# sourceMappingURL=IconLoader2.mjs.map


/***/ }),

/***/ 6302:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconMoon)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconMoon = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "moon", "IconMoon", [["path", { "d": "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z", "key": "svg-0" }]]);


//# sourceMappingURL=IconMoon.mjs.map


/***/ }),

/***/ 8203:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconMovie)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconMovie = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "movie", "IconMovie", [["path", { "d": "M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z", "key": "svg-0" }], ["path", { "d": "M8 4l0 16", "key": "svg-1" }], ["path", { "d": "M16 4l0 16", "key": "svg-2" }], ["path", { "d": "M4 8l4 0", "key": "svg-3" }], ["path", { "d": "M4 16l4 0", "key": "svg-4" }], ["path", { "d": "M4 12l16 0", "key": "svg-5" }], ["path", { "d": "M16 8l4 0", "key": "svg-6" }], ["path", { "d": "M16 16l4 0", "key": "svg-7" }]]);


//# sourceMappingURL=IconMovie.mjs.map


/***/ }),

/***/ 3479:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconPhoto)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconPhoto = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "photo", "IconPhoto", [["path", { "d": "M15 8h.01", "key": "svg-0" }], ["path", { "d": "M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z", "key": "svg-1" }], ["path", { "d": "M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5", "key": "svg-2" }], ["path", { "d": "M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3", "key": "svg-3" }]]);


//# sourceMappingURL=IconPhoto.mjs.map


/***/ }),

/***/ 4986:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconRefresh)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconRefresh = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "refresh", "IconRefresh", [["path", { "d": "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4", "key": "svg-0" }], ["path", { "d": "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4", "key": "svg-1" }]]);


//# sourceMappingURL=IconRefresh.mjs.map


/***/ }),

/***/ 7158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconReorder)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconReorder = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "reorder", "IconReorder", [["path", { "d": "M3 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z", "key": "svg-0" }], ["path", { "d": "M10 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z", "key": "svg-1" }], ["path", { "d": "M17 15m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z", "key": "svg-2" }], ["path", { "d": "M5 11v-3a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v3", "key": "svg-3" }], ["path", { "d": "M16.5 8.5l2.5 2.5l2.5 -2.5", "key": "svg-4" }]]);


//# sourceMappingURL=IconReorder.mjs.map


/***/ }),

/***/ 331:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconStack)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconStack = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "stack", "IconStack", [["path", { "d": "M12 6l-8 4l8 4l8 -4l-8 -4", "key": "svg-0" }], ["path", { "d": "M4 14l8 4l8 -4", "key": "svg-1" }]]);


//# sourceMappingURL=IconStack.mjs.map


/***/ }),

/***/ 117:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconSun)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconSun = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "sun", "IconSun", [["path", { "d": "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "key": "svg-0" }], ["path", { "d": "M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7", "key": "svg-1" }]]);


//# sourceMappingURL=IconSun.mjs.map


/***/ }),

/***/ 8958:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconTransitionRight)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconTransitionRight = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "transition-right", "IconTransitionRight", [["path", { "d": "M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3", "key": "svg-0" }], ["path", { "d": "M3 18v-12a3 3 0 1 1 6 0v12a3 3 0 0 1 -6 0z", "key": "svg-1" }], ["path", { "d": "M9 12h8", "key": "svg-2" }], ["path", { "d": "M14 15l3 -3l-3 -3", "key": "svg-3" }]]);


//# sourceMappingURL=IconTransitionRight.mjs.map


/***/ }),

/***/ 6833:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconVariable)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconVariable = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "variable", "IconVariable", [["path", { "d": "M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1 0 1 1 2.016 3.527c.984 2.473 .984 3.473 1.984 3.473h1", "key": "svg-0" }], ["path", { "d": "M8 16c1.5 0 3 -2 4 -3.5s2.5 -3.5 4 -3.5", "key": "svg-1" }]]);


//# sourceMappingURL=IconVariable.mjs.map


/***/ }),

/***/ 7893:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconVersions)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconVersions = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "versions", "IconVersions", [["path", { "d": "M10 5m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z", "key": "svg-0" }], ["path", { "d": "M7 7l0 10", "key": "svg-1" }], ["path", { "d": "M4 8l0 8", "key": "svg-2" }]]);


//# sourceMappingURL=IconVersions.mjs.map


/***/ }),

/***/ 6299:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ IconVinyl)
/* harmony export */ });
/* harmony import */ var _createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8728);
/**
 * @license @tabler/icons-react v3.17.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */



var IconVinyl = (0,_createReactComponent_mjs__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)("outline", "vinyl", "IconVinyl", [["path", { "d": "M16 3.937a9 9 0 1 0 5 8.063", "key": "svg-0" }], ["path", { "d": "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M20 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }], ["path", { "d": "M20 4l-3.5 10l-2.5 2", "key": "svg-3" }]]);


//# sourceMappingURL=IconVinyl.mjs.map


/***/ }),

/***/ 9418:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ purify)
/* harmony export */ });
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object; // eslint-disable-line import/no-mutable-exports
let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(Func) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

// eslint-disable-next-line unicorn/better-regex
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm); // eslint-disable-line unicorn/better-regex
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ARIA_ATTR: ARIA_ATTR,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  CUSTOM_ELEMENT: CUSTOM_ELEMENT,
  DATA_ATTR: DATA_ATTR,
  DOCTYPE_NAME: DOCTYPE_NAME,
  ERB_EXPR: ERB_EXPR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR
});

/* eslint-disable @typescript-eslint/indent */
// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12 // Deprecated
};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.3.1';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document
  } = window;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Merge configuration parameters */
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === 'function') {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === 'function') {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (cfg.ADD_FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // Overwrite existing TrustedTypes policy.
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`.
      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      // If creating the internal policy succeeded sign internal variables.
      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      }
      // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      }
      // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      }
      // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * _isClobbered
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function');
  };
  /**
   * Checks whether the given object is a DOM node.
   *
   * @param value object to check whether it's a DOM node
   * @return true is object is a DOM node
   */
  const _isNode = function _isNode(value) {
    return typeof Node === 'function' && value instanceof Node;
  };
  function _executeHooks(hooks, currentNode, data) {
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content = null;
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      /* Keep content except for bad-listed elements */
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        content = stringReplace(content, expr, ' ');
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return tagName !== 'annotation-xml' && stringMatch(tagName, CUSTOM_ELEMENT);
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === 'value' ? initValue : stringTrim(initValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
      if (lcName === 'attributename' && stringMatch(value, 'href')) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          value = stringReplace(value, expr, ' ');
        });
      }
      /* Is `value` valid for this attribute? */
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Handle attributes that require Trusted Types */
      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ; else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected */
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */
    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */
    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      _sanitizeElements(currentNode);
      /* Check attributes next */
      _sanitizeAttributes(currentNode);
      /* Shadow DOM detected, sanitize it */
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
        serializedHTML = stringReplace(serializedHTML, expr, ' ');
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();


//# sourceMappingURL=purify.es.mjs.map


/***/ }),

/***/ 5449:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FH: () => (/* binding */ ReactLenis),
  xP: () => (/* binding */ useLenis)
});

// UNUSED EXPORTS: Lenis, LenisContext, default

;// CONCATENATED MODULE: ./node_modules/lenis/dist/lenis.mjs
// package.json
var version = "1.3.3";

// packages/core/src/maths.ts
function clamp(min, input, max) {
  return Math.max(min, Math.min(input, max));
}
function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
function damp(x, y, lambda, deltaTime) {
  return lerp(x, y, 1 - Math.exp(-lambda * deltaTime));
}
function modulo(n, d) {
  return (n % d + d) % d;
}

// packages/core/src/animate.ts
var Animate = class {
  isRunning = false;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  // These are instanciated in the fromTo method
  lerp;
  duration;
  easing;
  onUpdate;
  /**
   * Advance the animation by the given delta time
   *
   * @param deltaTime - The time in seconds to advance the animation
   */
  advance(deltaTime) {
    if (!this.isRunning) return;
    let completed = false;
    if (this.duration && this.easing) {
      this.currentTime += deltaTime;
      const linearProgress = clamp(0, this.currentTime / this.duration, 1);
      completed = linearProgress >= 1;
      const easedProgress = completed ? 1 : this.easing(linearProgress);
      this.value = this.from + (this.to - this.from) * easedProgress;
    } else if (this.lerp) {
      this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
      if (Math.round(this.value) === this.to) {
        this.value = this.to;
        completed = true;
      }
    } else {
      this.value = this.to;
      completed = true;
    }
    if (completed) {
      this.stop();
    }
    this.onUpdate?.(this.value, completed);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = false;
  }
  /**
   * Set up the animation from a starting value to an ending value
   * with optional parameters for lerping, duration, easing, and onUpdate callback
   *
   * @param from - The starting value
   * @param to - The ending value
   * @param options - Options for the animation
   */
  fromTo(from, to, { lerp: lerp2, duration, easing, onStart, onUpdate }) {
    this.from = this.value = from;
    this.to = to;
    this.lerp = lerp2;
    this.duration = duration;
    this.easing = easing;
    this.currentTime = 0;
    this.isRunning = true;
    onStart?.();
    this.onUpdate = onUpdate;
  }
};

// packages/core/src/debounce.ts
function debounce(callback, delay) {
  let timer;
  return function(...args) {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = void 0;
      callback.apply(context, args);
    }, delay);
  };
}

// packages/core/src/dimensions.ts
var Dimensions = class {
  constructor(wrapper, content, { autoResize = true, debounce: debounceValue = 250 } = {}) {
    this.wrapper = wrapper;
    this.content = content;
    if (autoResize) {
      this.debouncedResize = debounce(this.resize, debounceValue);
      if (this.wrapper instanceof Window) {
        window.addEventListener("resize", this.debouncedResize, false);
      } else {
        this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize);
        this.wrapperResizeObserver.observe(this.wrapper);
      }
      this.contentResizeObserver = new ResizeObserver(this.debouncedResize);
      this.contentResizeObserver.observe(this.content);
    }
    this.resize();
  }
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  // These are instanciated in the constructor as they need information from the options
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  destroy() {
    this.wrapperResizeObserver?.disconnect();
    this.contentResizeObserver?.disconnect();
    if (this.wrapper === window && this.debouncedResize) {
      window.removeEventListener("resize", this.debouncedResize, false);
    }
  }
  resize = () => {
    this.onWrapperResize();
    this.onContentResize();
  };
  onWrapperResize = () => {
    if (this.wrapper instanceof Window) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    } else {
      this.width = this.wrapper.clientWidth;
      this.height = this.wrapper.clientHeight;
    }
  };
  onContentResize = () => {
    if (this.wrapper instanceof Window) {
      this.scrollHeight = this.content.scrollHeight;
      this.scrollWidth = this.content.scrollWidth;
    } else {
      this.scrollHeight = this.wrapper.scrollHeight;
      this.scrollWidth = this.wrapper.scrollWidth;
    }
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
};

// packages/core/src/emitter.ts
var Emitter = class {
  events = {};
  /**
   * Emit an event with the given data
   * @param event Event name
   * @param args Data to pass to the event handlers
   */
  emit(event, ...args) {
    let callbacks = this.events[event] || [];
    for (let i = 0, length = callbacks.length; i < length; i++) {
      callbacks[i]?.(...args);
    }
  }
  /**
   * Add a callback to the event
   * @param event Event name
   * @param cb Callback function
   * @returns Unsubscribe function
   */
  on(event, cb) {
    this.events[event]?.push(cb) || (this.events[event] = [cb]);
    return () => {
      this.events[event] = this.events[event]?.filter((i) => cb !== i);
    };
  }
  /**
   * Remove a callback from the event
   * @param event Event name
   * @param callback Callback function
   */
  off(event, callback) {
    this.events[event] = this.events[event]?.filter((i) => callback !== i);
  }
  /**
   * Remove all event listeners and clean up
   */
  destroy() {
    this.events = {};
  }
};

// packages/core/src/virtual-scroll.ts
var LINE_HEIGHT = 100 / 6;
var listenerOptions = { passive: false };
var VirtualScroll = class {
  constructor(element, options = { wheelMultiplier: 1, touchMultiplier: 1 }) {
    this.element = element;
    this.options = options;
    window.addEventListener("resize", this.onWindowResize, false);
    this.onWindowResize();
    this.element.addEventListener("wheel", this.onWheel, listenerOptions);
    this.element.addEventListener(
      "touchstart",
      this.onTouchStart,
      listenerOptions
    );
    this.element.addEventListener(
      "touchmove",
      this.onTouchMove,
      listenerOptions
    );
    this.element.addEventListener("touchend", this.onTouchEnd, listenerOptions);
  }
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new Emitter();
  /**
   * Add an event listener for the given event and callback
   *
   * @param event Event name
   * @param callback Callback function
   */
  on(event, callback) {
    return this.emitter.on(event, callback);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy();
    window.removeEventListener("resize", this.onWindowResize, false);
    this.element.removeEventListener("wheel", this.onWheel, listenerOptions);
    this.element.removeEventListener(
      "touchstart",
      this.onTouchStart,
      listenerOptions
    );
    this.element.removeEventListener(
      "touchmove",
      this.onTouchMove,
      listenerOptions
    );
    this.element.removeEventListener(
      "touchend",
      this.onTouchEnd,
      listenerOptions
    );
  }
  /**
   * Event handler for 'touchstart' event
   *
   * @param event Touch event
   */
  onTouchStart = (event) => {
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
    this.touchStart.x = clientX;
    this.touchStart.y = clientY;
    this.lastDelta = {
      x: 0,
      y: 0
    };
    this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (event) => {
    const { clientX, clientY } = event.targetTouches ? event.targetTouches[0] : event;
    const deltaX = -(clientX - this.touchStart.x) * this.options.touchMultiplier;
    const deltaY = -(clientY - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = clientX;
    this.touchStart.y = clientY;
    this.lastDelta = {
      x: deltaX,
      y: deltaY
    };
    this.emitter.emit("scroll", {
      deltaX,
      deltaY,
      event
    });
  };
  onTouchEnd = (event) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (event) => {
    let { deltaX, deltaY, deltaMode } = event;
    const multiplierX = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.width : 1;
    const multiplierY = deltaMode === 1 ? LINE_HEIGHT : deltaMode === 2 ? this.window.height : 1;
    deltaX *= multiplierX;
    deltaY *= multiplierY;
    deltaX *= this.options.wheelMultiplier;
    deltaY *= this.options.wheelMultiplier;
    this.emitter.emit("scroll", { deltaX, deltaY, event });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};

// packages/core/src/lenis.ts
var defaultEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
var Lenis = class {
  _isScrolling = false;
  // true when scroll is animating
  _isStopped = false;
  // true if user should not be able to scroll - enable/disable programmatically
  _isLocked = false;
  // same as isStopped but enabled/disabled when scroll reaches target
  _preventNextNativeScrollEvent = false;
  _resetVelocityTimeout = null;
  __rafID = null;
  /**
   * Whether or not the user is touching the screen
   */
  isTouching;
  /**
   * The time in ms since the lenis instance was created
   */
  time = 0;
  /**
   * User data that will be forwarded through the scroll event
   *
   * @example
   * lenis.scrollTo(100, {
   *   userData: {
   *     foo: 'bar'
   *   }
   * })
   */
  userData = {};
  /**
   * The last velocity of the scroll
   */
  lastVelocity = 0;
  /**
   * The current velocity of the scroll
   */
  velocity = 0;
  /**
   * The direction of the scroll
   */
  direction = 0;
  /**
   * The options passed to the lenis instance
   */
  options;
  /**
   * The target scroll value
   */
  targetScroll;
  /**
   * The animated scroll value
   */
  animatedScroll;
  // These are instanciated here as they don't need information from the options
  animate = new Animate();
  emitter = new Emitter();
  // These are instanciated in the constructor as they need information from the options
  dimensions;
  // This is not private because it's used in the Snap class
  virtualScroll;
  constructor({
    wrapper = window,
    content = document.documentElement,
    eventsTarget = wrapper,
    smoothWheel = true,
    syncTouch = false,
    syncTouchLerp = 0.075,
    touchInertiaMultiplier = 35,
    duration,
    // in seconds
    easing,
    lerp: lerp2 = 0.1,
    infinite = false,
    orientation = "vertical",
    // vertical, horizontal
    gestureOrientation = "vertical",
    // vertical, horizontal, both
    touchMultiplier = 1,
    wheelMultiplier = 1,
    autoResize = true,
    prevent,
    virtualScroll,
    overscroll = true,
    autoRaf = false,
    anchors = false,
    autoToggle = false,
    // https://caniuse.com/?search=transition-behavior
    allowNestedScroll = false,
    __experimental__naiveDimensions = false
  } = {}) {
    window.lenisVersion = version;
    if (!wrapper || wrapper === document.documentElement) {
      wrapper = window;
    }
    if (typeof duration === "number" && typeof easing !== "function") {
      easing = defaultEasing;
    } else if (typeof easing === "function" && typeof duration !== "number") {
      duration = 1;
    }
    this.options = {
      wrapper,
      content,
      eventsTarget,
      smoothWheel,
      syncTouch,
      syncTouchLerp,
      touchInertiaMultiplier,
      duration,
      easing,
      lerp: lerp2,
      infinite,
      gestureOrientation,
      orientation,
      touchMultiplier,
      wheelMultiplier,
      autoResize,
      prevent,
      virtualScroll,
      overscroll,
      autoRaf,
      anchors,
      autoToggle,
      allowNestedScroll,
      __experimental__naiveDimensions
    };
    this.dimensions = new Dimensions(wrapper, content, { autoResize });
    this.updateClassName();
    this.targetScroll = this.animatedScroll = this.actualScroll;
    this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false);
    this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
      capture: true
    });
    if (this.options.anchors && this.options.wrapper === window) {
      this.options.wrapper.addEventListener(
        "click",
        this.onClick,
        false
      );
    }
    this.options.wrapper.addEventListener(
      "pointerdown",
      this.onPointerDown,
      false
    );
    this.virtualScroll = new VirtualScroll(eventsTarget, {
      touchMultiplier,
      wheelMultiplier
    });
    this.virtualScroll.on("scroll", this.onVirtualScroll);
    if (this.options.autoToggle) {
      this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
        passive: true
      });
    }
    if (this.options.autoRaf) {
      this.__rafID = requestAnimationFrame(this.raf);
    }
  }
  /**
   * Destroy the lenis instance, remove all event listeners and clean up the class name
   */
  destroy() {
    this.emitter.destroy();
    this.options.wrapper.removeEventListener(
      "scroll",
      this.onNativeScroll,
      false
    );
    this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
      capture: true
    });
    this.options.wrapper.removeEventListener(
      "pointerdown",
      this.onPointerDown,
      false
    );
    if (this.options.anchors && this.options.wrapper === window) {
      this.options.wrapper.removeEventListener(
        "click",
        this.onClick,
        false
      );
    }
    this.virtualScroll.destroy();
    this.dimensions.destroy();
    this.cleanUpClassName();
    if (this.__rafID) {
      cancelAnimationFrame(this.__rafID);
    }
  }
  on(event, callback) {
    return this.emitter.on(event, callback);
  }
  off(event, callback) {
    return this.emitter.off(event, callback);
  }
  onScrollEnd = (e) => {
    if (!(e instanceof CustomEvent)) {
      if (this.isScrolling === "smooth" || this.isScrolling === false) {
        e.stopPropagation();
      }
    }
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(
      new CustomEvent("scrollend", {
        bubbles: this.options.wrapper === window,
        // cancelable: false,
        detail: {
          lenisScrollEnd: true
        }
      })
    );
  };
  onTransitionEnd = (event) => {
    if (event.propertyName.includes("overflow")) {
      const property = this.isHorizontal ? "overflow-x" : "overflow-y";
      const overflow = getComputedStyle(this.rootElement)[property];
      if (["hidden", "clip"].includes(overflow)) {
        this.stop();
      } else {
        this.start();
      }
    }
  };
  setScroll(scroll) {
    if (this.isHorizontal) {
      this.options.wrapper.scrollTo({ left: scroll, behavior: "instant" });
    } else {
      this.options.wrapper.scrollTo({ top: scroll, behavior: "instant" });
    }
  }
  onClick = (event) => {
    const path = event.composedPath();
    const anchor = path.find(
      (node) => node instanceof HTMLAnchorElement && (node.getAttribute("href")?.startsWith("#") || node.getAttribute("href")?.startsWith("/#") || node.getAttribute("href")?.startsWith("./#"))
    );
    if (anchor) {
      const id = anchor.getAttribute("href");
      if (id) {
        const options = typeof this.options.anchors === "object" && this.options.anchors ? this.options.anchors : void 0;
        let target = `#${id.split("#")[1]}`;
        if (["#", "/#", "./#", "#top", "/#top", "./#top"].includes(id)) {
          target = 0;
        }
        this.scrollTo(target, options);
      }
    }
  };
  onPointerDown = (event) => {
    if (event.button === 1) {
      this.reset();
    }
  };
  onVirtualScroll = (data) => {
    if (typeof this.options.virtualScroll === "function" && this.options.virtualScroll(data) === false)
      return;
    const { deltaX, deltaY, event } = data;
    this.emitter.emit("virtual-scroll", { deltaX, deltaY, event });
    if (event.ctrlKey) return;
    if (event.lenisStopPropagation) return;
    const isTouch = event.type.includes("touch");
    const isWheel = event.type.includes("wheel");
    this.isTouching = event.type === "touchstart" || event.type === "touchmove";
    const isClickOrTap = deltaX === 0 && deltaY === 0;
    const isTapToStop = this.options.syncTouch && isTouch && event.type === "touchstart" && isClickOrTap && !this.isStopped && !this.isLocked;
    if (isTapToStop) {
      this.reset();
      return;
    }
    const isUnknownGesture = this.options.gestureOrientation === "vertical" && deltaY === 0 || this.options.gestureOrientation === "horizontal" && deltaX === 0;
    if (isClickOrTap || isUnknownGesture) {
      return;
    }
    let composedPath = event.composedPath();
    composedPath = composedPath.slice(0, composedPath.indexOf(this.rootElement));
    const prevent = this.options.prevent;
    if (!!composedPath.find(
      (node) => node instanceof HTMLElement && (typeof prevent === "function" && prevent?.(node) || node.hasAttribute?.("data-lenis-prevent") || isTouch && node.hasAttribute?.("data-lenis-prevent-touch") || isWheel && node.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.checkNestedScroll(node, { deltaX, deltaY }))
    ))
      return;
    if (this.isStopped || this.isLocked) {
      event.preventDefault();
      return;
    }
    const isSmooth = this.options.syncTouch && isTouch || this.options.smoothWheel && isWheel;
    if (!isSmooth) {
      this.isScrolling = "native";
      this.animate.stop();
      event.lenisStopPropagation = true;
      return;
    }
    let delta = deltaY;
    if (this.options.gestureOrientation === "both") {
      delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    } else if (this.options.gestureOrientation === "horizontal") {
      delta = deltaX;
    }
    if (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && deltaY > 0 || this.animatedScroll === this.limit && deltaY < 0)) {
      event.lenisStopPropagation = true;
    }
    event.preventDefault();
    const isSyncTouch = isTouch && this.options.syncTouch;
    const isTouchEnd = isTouch && event.type === "touchend";
    const hasTouchInertia = isTouchEnd && Math.abs(delta) > 5;
    if (hasTouchInertia) {
      delta = this.velocity * this.options.touchInertiaMultiplier;
    }
    this.scrollTo(this.targetScroll + delta, {
      programmatic: false,
      ...isSyncTouch ? {
        lerp: hasTouchInertia ? this.options.syncTouchLerp : 1
        // immediate: !hasTouchInertia,
      } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    });
  };
  /**
   * Force lenis to recalculate the dimensions
   */
  resize() {
    this.dimensions.resize();
    this.animatedScroll = this.targetScroll = this.actualScroll;
    this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (this._resetVelocityTimeout !== null) {
      clearTimeout(this._resetVelocityTimeout);
      this._resetVelocityTimeout = null;
    }
    if (this._preventNextNativeScrollEvent) {
      this._preventNextNativeScrollEvent = false;
      return;
    }
    if (this.isScrolling === false || this.isScrolling === "native") {
      const lastScroll = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll;
      this.lastVelocity = this.velocity;
      this.velocity = this.animatedScroll - lastScroll;
      this.direction = Math.sign(
        this.animatedScroll - lastScroll
      );
      if (!this.isStopped) {
        this.isScrolling = "native";
      }
      this.emit();
      if (this.velocity !== 0) {
        this._resetVelocityTimeout = setTimeout(() => {
          this.lastVelocity = this.velocity;
          this.velocity = 0;
          this.isScrolling = false;
          this.emit();
        }, 400);
      }
    }
  };
  reset() {
    this.isLocked = false;
    this.isScrolling = false;
    this.animatedScroll = this.targetScroll = this.actualScroll;
    this.lastVelocity = this.velocity = 0;
    this.animate.stop();
  }
  /**
   * Start lenis scroll after it has been stopped
   */
  start() {
    if (!this.isStopped) return;
    this.reset();
    this.isStopped = false;
    this.emit();
  }
  /**
   * Stop lenis scroll
   */
  stop() {
    if (this.isStopped) return;
    this.reset();
    this.isStopped = true;
    this.emit();
  }
  /**
   * RequestAnimationFrame for lenis
   *
   * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
   */
  raf = (time) => {
    const deltaTime = time - (this.time || time);
    this.time = time;
    this.animate.advance(deltaTime * 1e-3);
    if (this.options.autoRaf) {
      this.__rafID = requestAnimationFrame(this.raf);
    }
  };
  /**
   * Scroll to a target value
   *
   * @param target The target value to scroll to
   * @param options The options for the scroll
   *
   * @example
   * lenis.scrollTo(100, {
   *   offset: 100,
   *   duration: 1,
   *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
   *   lerp: 0.1,
   *   onStart: () => {
   *     console.log('onStart')
   *   },
   *   onComplete: () => {
   *     console.log('onComplete')
   *   },
   * })
   */
  scrollTo(target, {
    offset = 0,
    immediate = false,
    lock = false,
    duration = this.options.duration,
    easing = this.options.easing,
    lerp: lerp2 = this.options.lerp,
    onStart,
    onComplete,
    force = false,
    // scroll even if stopped
    programmatic = true,
    // called from outside of the class
    userData
  } = {}) {
    if ((this.isStopped || this.isLocked) && !force) return;
    if (typeof target === "string" && ["top", "left", "start"].includes(target)) {
      target = 0;
    } else if (typeof target === "string" && ["bottom", "right", "end"].includes(target)) {
      target = this.limit;
    } else {
      let node;
      if (typeof target === "string") {
        node = document.querySelector(target);
      } else if (target instanceof HTMLElement && target?.nodeType) {
        node = target;
      }
      if (node) {
        if (this.options.wrapper !== window) {
          const wrapperRect = this.rootElement.getBoundingClientRect();
          offset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
        }
        const rect = node.getBoundingClientRect();
        target = (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll;
      }
    }
    if (typeof target !== "number") return;
    target += offset;
    target = Math.round(target);
    if (this.options.infinite) {
      if (programmatic) {
        this.targetScroll = this.animatedScroll = this.scroll;
        const distance = target - this.animatedScroll;
        if (distance > this.limit / 2) {
          target = target - this.limit;
        } else if (distance < -this.limit / 2) {
          target = target + this.limit;
        }
      }
    } else {
      target = clamp(0, target, this.limit);
    }
    if (target === this.targetScroll) {
      onStart?.(this);
      onComplete?.(this);
      return;
    }
    this.userData = userData ?? {};
    if (immediate) {
      this.animatedScroll = this.targetScroll = target;
      this.setScroll(this.scroll);
      this.reset();
      this.preventNextNativeScrollEvent();
      this.emit();
      onComplete?.(this);
      this.userData = {};
      requestAnimationFrame(() => {
        this.dispatchScrollendEvent();
      });
      return;
    }
    if (!programmatic) {
      this.targetScroll = target;
    }
    if (typeof duration === "number" && typeof easing !== "function") {
      easing = defaultEasing;
    } else if (typeof easing === "function" && typeof duration !== "number") {
      duration = 1;
    }
    this.animate.fromTo(this.animatedScroll, target, {
      duration,
      easing,
      lerp: lerp2,
      onStart: () => {
        if (lock) this.isLocked = true;
        this.isScrolling = "smooth";
        onStart?.(this);
      },
      onUpdate: (value, completed) => {
        this.isScrolling = "smooth";
        this.lastVelocity = this.velocity;
        this.velocity = value - this.animatedScroll;
        this.direction = Math.sign(this.velocity);
        this.animatedScroll = value;
        this.setScroll(this.scroll);
        if (programmatic) {
          this.targetScroll = value;
        }
        if (!completed) this.emit();
        if (completed) {
          this.reset();
          this.emit();
          onComplete?.(this);
          this.userData = {};
          requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          });
          this.preventNextNativeScrollEvent();
        }
      }
    });
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = true;
    requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = false;
    });
  }
  checkNestedScroll(node, { deltaX, deltaY }) {
    const time = Date.now();
    const cache = node._lenis ??= {};
    let hasOverflowX, hasOverflowY, isScrollableX, isScrollableY, scrollWidth, scrollHeight, clientWidth, clientHeight;
    const gestureOrientation = this.options.gestureOrientation;
    if (time - (cache.time ?? 0) > 2e3) {
      cache.time = Date.now();
      const computedStyle = window.getComputedStyle(node);
      cache.computedStyle = computedStyle;
      const overflowXString = computedStyle.overflowX;
      const overflowYString = computedStyle.overflowY;
      hasOverflowX = ["auto", "overlay", "scroll"].includes(overflowXString);
      hasOverflowY = ["auto", "overlay", "scroll"].includes(overflowYString);
      cache.hasOverflowX = hasOverflowX;
      cache.hasOverflowY = hasOverflowY;
      if (!hasOverflowX && !hasOverflowY) return false;
      if (gestureOrientation === "vertical" && !hasOverflowY) return false;
      if (gestureOrientation === "horizontal" && !hasOverflowX) return false;
      scrollWidth = node.scrollWidth;
      scrollHeight = node.scrollHeight;
      clientWidth = node.clientWidth;
      clientHeight = node.clientHeight;
      isScrollableX = scrollWidth > clientWidth;
      isScrollableY = scrollHeight > clientHeight;
      cache.isScrollableX = isScrollableX;
      cache.isScrollableY = isScrollableY;
      cache.scrollWidth = scrollWidth;
      cache.scrollHeight = scrollHeight;
      cache.clientWidth = clientWidth;
      cache.clientHeight = clientHeight;
    } else {
      isScrollableX = cache.isScrollableX;
      isScrollableY = cache.isScrollableY;
      hasOverflowX = cache.hasOverflowX;
      hasOverflowY = cache.hasOverflowY;
      scrollWidth = cache.scrollWidth;
      scrollHeight = cache.scrollHeight;
      clientWidth = cache.clientWidth;
      clientHeight = cache.clientHeight;
    }
    if (!hasOverflowX && !hasOverflowY || !isScrollableX && !isScrollableY) {
      return false;
    }
    if (gestureOrientation === "vertical" && (!hasOverflowY || !isScrollableY))
      return false;
    if (gestureOrientation === "horizontal" && (!hasOverflowX || !isScrollableX))
      return false;
    let orientation;
    if (gestureOrientation === "horizontal") {
      orientation = "x";
    } else if (gestureOrientation === "vertical") {
      orientation = "y";
    } else {
      const isScrollingX = deltaX !== 0;
      const isScrollingY = deltaY !== 0;
      if (isScrollingX && hasOverflowX && isScrollableX) {
        orientation = "x";
      }
      if (isScrollingY && hasOverflowY && isScrollableY) {
        orientation = "y";
      }
    }
    if (!orientation) return false;
    let scroll, maxScroll, delta, hasOverflow, isScrollable;
    if (orientation === "x") {
      scroll = node.scrollLeft;
      maxScroll = scrollWidth - clientWidth;
      delta = deltaX;
      hasOverflow = hasOverflowX;
      isScrollable = isScrollableX;
    } else if (orientation === "y") {
      scroll = node.scrollTop;
      maxScroll = scrollHeight - clientHeight;
      delta = deltaY;
      hasOverflow = hasOverflowY;
      isScrollable = isScrollableY;
    } else {
      return false;
    }
    const willScroll = delta > 0 ? scroll < maxScroll : scroll > 0;
    return willScroll && hasOverflow && isScrollable;
  }
  /**
   * The root element on which lenis is instanced
   */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
   * The limit which is the maximum scroll value
   */
  get limit() {
    if (this.options.__experimental__naiveDimensions) {
      if (this.isHorizontal) {
        return this.rootElement.scrollWidth - this.rootElement.clientWidth;
      } else {
        return this.rootElement.scrollHeight - this.rootElement.clientHeight;
      }
    } else {
      return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
  }
  /**
   * Whether or not the scroll is horizontal
   */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
   * The actual scroll value
   */
  get actualScroll() {
    const wrapper = this.options.wrapper;
    return this.isHorizontal ? wrapper.scrollX ?? wrapper.scrollLeft : wrapper.scrollY ?? wrapper.scrollTop;
  }
  /**
   * The current scroll value
   */
  get scroll() {
    return this.options.infinite ? modulo(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
   * The progress of the scroll relative to the limit
   */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
   * Current scroll state
   */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(value) {
    if (this._isScrolling !== value) {
      this._isScrolling = value;
      this.updateClassName();
    }
  }
  /**
   * Check if lenis is stopped
   */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(value) {
    if (this._isStopped !== value) {
      this._isStopped = value;
      this.updateClassName();
    }
  }
  /**
   * Check if lenis is locked
   */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(value) {
    if (this._isLocked !== value) {
      this._isLocked = value;
      this.updateClassName();
    }
  }
  /**
   * Check if lenis is smooth scrolling
   */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
   * The class name applied to the wrapper element
   */
  get className() {
    let className = "lenis";
    if (this.options.autoToggle) className += " lenis-autoToggle";
    if (this.isStopped) className += " lenis-stopped";
    if (this.isLocked) className += " lenis-locked";
    if (this.isScrolling) className += " lenis-scrolling";
    if (this.isScrolling === "smooth") className += " lenis-smooth";
    return className;
  }
  updateClassName() {
    this.cleanUpClassName();
    this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
  }
  cleanUpClassName() {
    this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
  }
};

//# sourceMappingURL=lenis.mjs.map
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(1609);
// EXTERNAL MODULE: external "ReactJSXRuntime"
var external_ReactJSXRuntime_ = __webpack_require__(790);
;// CONCATENATED MODULE: ./node_modules/lenis/dist/lenis-react.mjs
"use client";

// packages/react/src/provider.tsx



// packages/react/src/store.ts

var Store = class {
  constructor(state) {
    this.state = state;
  }
  listeners = [];
  set(state) {
    this.state = state;
    for (let listener of this.listeners) {
      listener(this.state);
    }
  }
  subscribe(listener) {
    this.listeners = [...this.listeners, listener];
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  get() {
    return this.state;
  }
};
function useStore(store) {
  const [state, setState] = (0,external_React_.useState)(store.get());
  (0,external_React_.useEffect)(() => {
    return store.subscribe((state2) => setState(state2));
  }, [store]);
  return state;
}

// packages/react/src/provider.tsx

var LenisContext = (0,external_React_.createContext)(null);
var rootLenisContextStore = new Store(null);
var ReactLenis = (0,external_React_.forwardRef)(
  ({
    children,
    root = false,
    options = {},
    className,
    autoRaf = true,
    style,
    props
  }, ref) => {
    const wrapperRef = (0,external_React_.useRef)(null);
    const contentRef = (0,external_React_.useRef)(null);
    const [lenis, setLenis] = (0,external_React_.useState)(void 0);
    (0,external_React_.useImperativeHandle)(
      ref,
      () => ({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        lenis
      }),
      [lenis]
    );
    (0,external_React_.useEffect)(() => {
      const lenis2 = new Lenis({
        ...options,
        ...!root && {
          wrapper: wrapperRef.current,
          content: contentRef.current
        },
        autoRaf: options?.autoRaf ?? autoRaf
        // this is to avoid breaking the autoRaf prop if it's still used (require breaking change)
      });
      setLenis(lenis2);
      return () => {
        lenis2.destroy();
        setLenis(void 0);
      };
    }, [root, JSON.stringify(options)]);
    const callbacksRefs = (0,external_React_.useRef)([]);
    const addCallback = (0,external_React_.useCallback)(
      (callback, priority) => {
        callbacksRefs.current.push({ callback, priority });
        callbacksRefs.current.sort((a, b) => a.priority - b.priority);
      },
      []
    );
    const removeCallback = (0,external_React_.useCallback)(
      (callback) => {
        callbacksRefs.current = callbacksRefs.current.filter(
          (cb) => cb.callback !== callback
        );
      },
      []
    );
    (0,external_React_.useEffect)(() => {
      if (root && lenis) {
        rootLenisContextStore.set({ lenis, addCallback, removeCallback });
        return () => rootLenisContextStore.set(null);
      }
    }, [root, lenis, addCallback, removeCallback]);
    (0,external_React_.useEffect)(() => {
      if (!lenis) return;
      const onScroll = (data) => {
        for (let i = 0; i < callbacksRefs.current.length; i++) {
          callbacksRefs.current[i]?.callback(data);
        }
      };
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }, [lenis]);
    return /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)(
      LenisContext.Provider,
      {
        value: { lenis, addCallback, removeCallback },
        children: root ? children : /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("div", { ref: wrapperRef, className, style, ...props, children: /* @__PURE__ */ (0,external_ReactJSXRuntime_.jsx)("div", { ref: contentRef, children }) })
      }
    );
  }
);

// packages/react/src/use-lenis.ts

var fallbackContext = {};
function useLenis(callback, deps = [], priority = 0) {
  const localContext = (0,external_React_.useContext)(LenisContext);
  const rootContext = useStore(rootLenisContextStore);
  const currentContext = localContext ?? rootContext ?? fallbackContext;
  const { lenis, addCallback, removeCallback } = currentContext;
  (0,external_React_.useEffect)(() => {
    if (!callback || !addCallback || !removeCallback || !lenis) return;
    addCallback(callback, priority);
    callback(lenis);
    return () => {
      removeCallback(callback);
    };
  }, [lenis, addCallback, removeCallback, priority, ...deps]);
  return lenis;
}

//# sourceMappingURL=lenis-react.mjs.map

/***/ }),

/***/ 4140:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ tinycolor)
/* harmony export */ });
// This file is autogenerated. It's used to publish ESM to npm.
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};

  // If input is already a tinycolor, return itself
  if (color instanceof tinycolor) {
    return color;
  }
  // If we are called as a function, call using new instead
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1
  // If it was supposed to be 128, this was already taken care of by `inputToRgb`
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    //http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  },
  getLuminance: function getLuminance() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
}

// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    v: v
  };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];

  // Return a 3 character hex if possible
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];

  // Return a 4 character hex if possible
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h,
      s: s,
      v: v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level: level,
    size: size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};

// Big List of Colors
// ------------------
// <https://www.w3.org/TR/css-color-4/#named-colors>
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);

// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return n % max / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = function () {
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = "[-\\+]?\\d+%?";

  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level: level,
    size: size
  };
}




/***/ })

}]);