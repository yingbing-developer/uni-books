"use weex:vue";
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!*********************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.log = log;exports.default = formatLog;function typof(v) {
  var s = Object.prototype.toString.call(v);
  return s.substring(8, s.length - 1);
}

function isDebugMode() {
  /* eslint-disable no-undef */
  return typeof __channelId__ === 'string' && __channelId__;
}

function log(type) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  console[type].apply(console, args);
}

function formatLog() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var type = args.shift();
  if (isDebugMode()) {
    args.push(args.pop().replace('at ', 'uni-app:///'));
    return console[type].apply(console, args);
  }

  var msgs = args.map(function (v) {
    var type = Object.prototype.toString.call(v).toLowerCase();

    if (type === '[object object]' || type === '[object array]') {
      try {
        v = '---BEGIN:JSON---' + JSON.stringify(v) + '---END:JSON---';
      } catch (e) {
        v = '[object object]';
      }
    } else {
      if (v === null) {
        v = '---NULL---';
      } else if (v === undefined) {
        v = '---UNDEFINED---';
      } else {
        var vType = typof(v).toUpperCase();

        if (vType === 'NUMBER' || vType === 'BOOLEAN') {
          v = '---BEGIN:' + vType + '---' + v + '---END:' + vType + '---';
        } else {
          v = String(v);
        }
      }
    }

    return v;
  });
  var msg = '';

  if (msgs.length > 1) {
    var lastMsg = msgs.pop();
    msg = msgs.join('---COMMA---');

    if (lastMsg.indexOf(' at ') === 0) {
      msg += lastMsg;
    } else {
      msg += '---COMMA---' + lastMsg;
    }
  } else {
    msg = msgs[0];
  }

  console[type](msg);
}

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 10 */,
/* 11 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.install = install;exports.default = exports.createNamespacedHelpers = exports.mapActions = exports.mapGetters = exports.mapMutations = exports.mapState = exports.Store = void 0; /**
                                                                                                                                                                                                                                                                      * vuex v3.0.1
                                                                                                                                                                                                                                                                      * (c) 2017 Evan You
                                                                                                                                                                                                                                                                      * @license MIT
                                                                                                                                                                                                                                                                      */
var applyMixin = function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};

      options.init = options.init ?
      [vuexInit].concat(options.init) :
      vuexInit;
      _init.call(this, options);
    };
  }

  /**
     * Vuex init hook, injected into each instances init hooks list.
     */

  function vuexInit() {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function' ?
      options.store() :
      options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
typeof window !== 'undefined' &&
window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {return;}

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
   * Get the first item that pass the test
   * by second argument function
   *
   * @param {Array} list
   * @param {Function} f
   * @return {*}
   */
/**
       * Deep copy the given object considering circular structure.
       * This function caches all nested objects and its copies.
       * If it detects circular structure, use cached copy to avoid infinite loop.
       *
       * @param {*} obj
       * @param {Array<Object>} cache
       * @return {*}
       */


/**
           * forEach for object
           */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {return fn(obj[key], key);});
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {throw new Error("[vuex] " + msg);}
}

var Module = function Module(rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors$1);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) {return;}

  parent.removeChild(key);
};

function update(path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed');

        }
        return;
      }
      update(
      path.concat(key),
      targetModule.getChild(key),
      newModule.modules[key]);

    }
  }
}

var functionAssert = {
  assert: function assert(value) {return typeof value === 'function';},
  expected: 'function' };


var objectAssert = {
  assert: function assert(value) {return typeof value === 'function' ||
    typeof value === 'object' && typeof value.handler === 'function';},
  expected: 'function or object with "handler" function' };


var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert };


function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {return;}

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
      assertOptions.assert(value),
      makeAssertionMessage(path, key, type, value, assertOptions.expected));

    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins;if (plugins === void 0) plugins = [];
  var strict = options.strict;if (strict === void 0) strict = false;

  var state = options.state;if (state === void 0) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) {return plugin(this$1);});

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};exports.Store = Store;

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) {return sub(mutation, this$1.state);});

  if (
   true &&
  options && options.silent)
  {
    console.warn(
    "[vuex] mutation type: " + type + ". Silent option has been removed. " +
    'Use the filter functionality in the vue-devtools');

  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }

  this._actionSubscribers.forEach(function (sub) {return sub(action, this$1.state);});

  return entry.length > 1 ?
  Promise.all(entry.map(function (handler) {return handler(payload);})) :
  entry[0](payload);
};

Store.prototype.subscribe = function subscribe(fn) {
  return genericSubscribe(fn, this._subscribers);
};

Store.prototype.subscribeAction = function subscribeAction(fn) {
  return genericSubscribe(fn, this._actionSubscribers);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () {return getter(this$1.state, this$1.getters);}, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {path = [path];}

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {path = [path];}

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors);

function genericSubscribe(fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () {return fn(store);};
    Object.defineProperty(store.getters, key, {
      get: function get() {return store._vm[key];},
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state },

    computed: computed });

  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () {return oldVm.$destroy();});
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
   * make localized dispatch, commit, getters and state
   * if there is no namespace, just use root ones
   */
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    } };


  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ?
      function () {return store.getters;} :
      function () {return makeLocalGetters(store, namespace);} },

    state: {
      get: function get() {return getNestedState(store.state, path);} } });



  return local;
}

function makeLocalGetters(store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) {return;}

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function get() {return store.getters[type];},
      enumerable: true });

  });

  return gettersProxy;
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state },
    payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(
    local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {return this._data.$$state;}, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState(state, path) {
  return path.length ?
  path.reduce(function (state, key) {return state[key];}, state) :
  state;
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', "Expects string as the type, but found " + typeof type + ".");
  }

  return { type: type, payload: payload, options: options };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.');

    }
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function' ?
      val.call(this, state, getters) :
      state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});exports.mapState = mapState;

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],len = arguments.length;
      while (len--) {args[len] = arguments[len];}

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return;
        }
        commit = module.context.commit;
      }
      return typeof val === 'function' ?
      val.apply(this, [commit].concat(args)) :
      commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});exports.mapMutations = mapMutations;

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }
      if ( true && !(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});exports.mapGetters = mapGetters;

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],len = arguments.length;
      while (len--) {args[len] = arguments[len];}

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return;
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function' ?
      val.apply(this, [dispatch].concat(args)) :
      dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});exports.mapActions = mapActions;

var createNamespacedHelpers = function createNamespacedHelpers(namespace) {return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace) };
};exports.createNamespacedHelpers = createNamespacedHelpers;

function normalizeMap(map) {
  return Array.isArray(map) ?
  map.map(function (key) {return { key: key, val: key };}) :
  Object.keys(map).map(function (key) {return { key: key, val: map[key] };});
}

function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }
  return module;
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers };var _default =



index_esm;exports.default = _default;

/***/ }),
/* 12 */
/*!***************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \***************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uni-app-style */ 13);
/* harmony import */ var uni_app_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uni_app_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_index_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/index/index.nvue?mpType=page */ 16);

        
        
        
        _pages_index_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"].mpType = 'page'
        _pages_index_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"].route = 'pages/index/index'
        _pages_index_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"].el = '#root'
        new Vue(_pages_index_index_nvue_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"])
        

/***/ }),
/* 13 */
/*!**************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/main.js?{"type":"appStyle"} ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.prototype.__$appStyle__ = {}
Vue.prototype.__merge_style && Vue.prototype.__merge_style(__webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css */ 14).default,Vue.prototype.__$appStyle__)


/***/ }),
/* 14 */
/*!**************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/App.vue?vue&type=style&index=0&lang=css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css */ 15);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 15 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/App.vue?vue&type=style&index=0&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 16 */
/*!*********************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?mpType=page ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.nvue?vue&type=template&id=b8229bcc&scoped=true&mpType=page */ 17);
/* harmony import */ var _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.nvue?vue&type=script&lang=js&mpType=page */ 41);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 9);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./index.nvue?vue&type=style&index=0&id=b8229bcc&scoped=true&lang=css&mpType=page */ 50).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./index.nvue?vue&type=style&index=0&id=b8229bcc&scoped=true&lang=css&mpType=page */ 50).default)
            }

}

/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "b8229bcc",
  "5b388cc7",
  false,
  _index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "hbuilderProjects/uni-books/pages/index/index.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 17 */
/*!***************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=template&id=b8229bcc&scoped=true&mpType=page ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.nvue?vue&type=template&id=b8229bcc&scoped=true&mpType=page */ 18);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_template_id_b8229bcc_scoped_true_mpType_page__WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 18 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=template&id=b8229bcc&scoped=true&mpType=page ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "nav-bar": __webpack_require__(/*! @/components/nav-bar/nav-bar.nvue */ 19).default,
  "c-icon": __webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22).default,
  "fixed-button": __webpack_require__(/*! @/components/fixed-button/fixed-button.nvue */ 34).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: ["index"],
      style: { "background-color": _vm.skinColor.bgColor },
      on: {
        touchstart: _vm.touchstart,
        touchmove: _vm.touchmove,
        touchend: _vm.touchend
      }
    },
    [
      _c(
        "nav-bar",
        {
          attrs: {
            titleColor: _vm.skinColor.iconColor,
            title: "好用阅读器",
            backShow: false,
            cWidth: 420
          }
        },
        [
          _c(
            "view",
            {
              staticClass: ["nav-left"],
              attrs: { slot: "left" },
              on: {
                click: function($event) {
                  _vm.$refs.leftMenu.show()
                }
              },
              slot: "left"
            },
            [
              _c("c-icon", {
                attrs: {
                  name: "menu",
                  size: "25",
                  color: _vm.skinColor.iconColor
                }
              })
            ],
            1
          ),
          _c(
            "view",
            { attrs: { slot: "right" }, slot: "right" },
            [
              _c("c-icon", {
                attrs: {
                  name: "search",
                  size: "25",
                  color: _vm.skinColor.iconColor
                }
              })
            ],
            1
          ),
          _c(
            "view",
            { attrs: { slot: "right" }, slot: "right" },
            [
              _c("c-icon", {
                attrs: {
                  name: "filter",
                  size: "25",
                  color: _vm.skinColor.iconColor
                }
              })
            ],
            1
          ),
          _c(
            "view",
            { attrs: { slot: "right" }, slot: "right" },
            [
              _c("c-icon", {
                attrs: {
                  name: "more",
                  size: "25",
                  color: _vm.skinColor.iconColor
                }
              })
            ],
            1
          )
        ]
      ),
      _c(
        "waterfall",
        {
          attrs: {
            columnCount: "<integer>",
            columnWidth: "120",
            columnGap: "10",
            leftGap: "10",
            rightGap: "10"
          },
          on: { scroll: _vm.scroll }
        },
        _vm._l(_vm.books, function(item, index) {
          return _c(
            "cell",
            { key: item.id, appendAsTree: true, attrs: { append: "tree" } },
            [
              _c(
                "view",
                { ref: "list", refInFor: true, staticClass: ["book"] },
                [
                  _c("u-image", {
                    staticClass: ["book-img"],
                    attrs: { src: "../../static/logo.png", mode: "aspectFill" }
                  }),
                  _c("view", {
                    staticClass: ["book-mask"],
                    style: { opacity: _vm.skinColor.imgMask }
                  }),
                  _c("view", { staticClass: ["book-bottom"] }, [
                    _c("u-text", { staticClass: ["book-name"] }, [
                      _vm._v("影院街影院街影院街影院街影院街影院街影院街")
                    ]),
                    _c("view", { staticClass: ["b-bottom"] }, [
                      _c("u-text", { staticClass: ["book-time"] }, [
                        _vm._v("2019-05-15")
                      ]),
                      _c("u-text", { staticClass: ["book-progress"] }, [
                        _vm._v("33.33%")
                      ])
                    ])
                  ])
                ],
                1
              ),
              index == _vm.books.length - 1
                ? _c("view", { staticStyle: { height: "10px" } })
                : _vm._e()
            ]
          )
        }),
        0
      ),
      _c("view", { staticClass: ["fixed"] }, [
        _c(
          "view",
          [
            _c(
              "fixed-button",
              { attrs: { show: _vm.btnShow } },
              [
                _c("c-icon", {
                  attrs: {
                    name: "history",
                    size: "25",
                    color: _vm.skinColor.iconColor
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _c(
          "view",
          { on: { click: _vm.clear } },
          [
            _c(
              "fixed-button",
              { attrs: { show: _vm.btnShow } },
              [
                _c("c-icon", {
                  attrs: {
                    name: "clear-fill",
                    size: "25",
                    color: _vm.skinColor.iconColor
                  }
                })
              ],
              1
            )
          ],
          1
        ),
        _c(
          "view",
          { on: { click: _vm.scrollTop } },
          [
            _c(
              "fixed-button",
              { attrs: { show: Math.abs(_vm.oldOffsetY) > 300 } },
              [
                _c("c-icon", {
                  attrs: {
                    name: "top",
                    size: "25",
                    color: _vm.skinColor.iconColor
                  }
                })
              ],
              1
            )
          ],
          1
        )
      ]),
      _c("c-menu", {
        ref: "leftMenu",
        attrs: { translate: _vm.menuLate, opacity: _vm.menuOpac }
      })
    ],
    1
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 19 */
/*!******************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav-bar.nvue?vue&type=template&id=4502682e&scoped=true& */ 20);
/* harmony import */ var _nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav-bar.nvue?vue&type=script&lang=js& */ 29);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 9);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./nav-bar.nvue?vue&type=style&index=0&id=4502682e&scoped=true&lang=css& */ 32).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./nav-bar.nvue?vue&type=style&index=0&id=4502682e&scoped=true&lang=css& */ 32).default)
            }

}

/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4502682e",
  "553a55d5",
  false,
  _nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 20 */
/*!*************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=template&id=4502682e&scoped=true& ***!
  \*************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./nav-bar.nvue?vue&type=template&id=4502682e&scoped=true& */ 21);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_template_id_4502682e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 21 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=template&id=4502682e&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "c-icon": __webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    {
      staticClass: ["nav-bar"],
      style: { "background-color": _vm.skinColor.navColor }
    },
    [
      _c("view", { staticClass: ["bar"], style: { height: _vm.barHeight } }),
      _c("view", { staticClass: ["nav"] }, [
        _c(
          "view",
          { staticClass: ["left"] },
          [
            _vm._t("left"),
            _vm.backShow
              ? _c(
                  "view",
                  { staticClass: ["back"], on: { click: _vm.back } },
                  [
                    _c("c-icon", {
                      attrs: {
                        name: "arrow-left",
                        size: 28,
                        color: _vm.skinColor.iconColor
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ],
          2
        ),
        _c(
          "view",
          { staticClass: ["center"], style: { width: _vm.cWidth + "rpx" } },
          [
            _c(
              "u-text",
              { staticClass: ["title"], style: { color: _vm.titleColor } },
              [_vm._v(_vm._s(_vm.title))]
            )
          ]
        ),
        _c("view", { staticClass: ["right"] }, [_vm._t("right")], 2)
      ])
    ]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 22 */
/*!****************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./c-icon.nvue?vue&type=template&id=54307fa2&scoped=true& */ 23);
/* harmony import */ var _c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./c-icon.nvue?vue&type=script&lang=js& */ 25);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 9);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./c-icon.nvue?vue&type=style&index=0&id=54307fa2&scoped=true&lang=css& */ 27).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./c-icon.nvue?vue&type=style&index=0&id=54307fa2&scoped=true&lang=css& */ 27).default)
            }

}

/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "54307fa2",
  "730c50cf",
  false,
  _c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "hbuilderProjects/uni-books/components/c-icon/c-icon.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 23 */
/*!***********************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=template&id=54307fa2&scoped=true& ***!
  \***********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./c-icon.nvue?vue&type=template&id=54307fa2&scoped=true& */ 24);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_template_id_54307fa2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 24 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=template&id=54307fa2&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "u-text",
    {
      staticClass: ["iconfont"],
      style: { "font-size": _vm.size + "px", color: _vm.color }
    },
    [_vm._v(_vm._s(_vm.icons[_vm.name]))]
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 25 */
/*!*****************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./c-icon.nvue?vue&type=script&lang=js& */ 26);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 26 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//

var src = plus.io.convertLocalFileSystemURL('/static/iconfont.ttf');
var domModule = weex.requireModule('dom');var _default =
{
  props: {
    name: {
      type: String,
      default: '' },

    size: {
      type: Number,
      default: 18 },

    color: {
      type: String,
      default: '#FFFFFF' } },


  data: function data() {
    return {
      icons: {
        'history': "\uE6AA",
        'history-fill': "\uE75F",
        'arrow-left': "\uE604",
        'arrow-right': "\uE60D",
        'pushpin-fill': "\uE638",
        'search': "\uE650",
        'setting': "\uE6A9",
        'setting-fill': "\uE608",
        'clear-fill': "\uE678",
        'catalog': "\uE601",
        'more': "\uE60F",
        'menu': "\uE624",
        'filter': "\uE630",
        'top': "\uE62C",
        'books-fill': "\uE60E",
        'night': "\uE625",
        'night-fill': "\uE6C1",
        'about': "\uE600",
        'about-fill': "\uE760",
        'read': "\uE67A",
        'light': "\uE65E",
        'light-fill': "\uE6C7" } };


  },
  beforeCreate: function beforeCreate() {
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('file:/" + src + "')" });

  } };exports.default = _default;

/***/ }),
/* 27 */
/*!*************************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=style&index=0&id=54307fa2&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./c-icon.nvue?vue&type=style&index=0&id=54307fa2&scoped=true&lang=css& */ 28);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_c_icon_nvue_vue_type_style_index_0_id_54307fa2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 28 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/c-icon/c-icon.nvue?vue&type=style&index=0&id=54307fa2&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "iconfont": {
    "fontFamily": "iconfont"
  }
}

/***/ }),
/* 29 */
/*!*******************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./nav-bar.nvue?vue&type=script&lang=js& */ 30);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 30 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;






















var _cIcon = _interopRequireDefault(__webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22));
var _index = __webpack_require__(/*! @/common/mixin/index.js */ 31);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { mixins: [_index.skinMixin], props: { bgColor: { type: String, default: '#2196F5' }, backShow: { type: Boolean, default: true }, title: { type: String, default: '' }, titleColor: { type: String, default: '#FFFFFF' }, lWidth: { type: Number, default: 0 },

    cWidth: {
      type: Number,
      default: 500 },

    rWidth: {
      type: Number,
      default: 0 } },


  data: function data() {
    return {
      barHeight: '' };

  },
  created: function created() {
    this.init();
  },
  methods: {
    init: function init() {var _this = this;
      uni.getSystemInfo({
        success: function success(res) {//根据状态栏高度, 进行导航栏顶部适配
          _this.barHeight = "".concat(res.statusBarHeight + 4, "px");
        } });

    },
    back: function back() {
      uni.navigateBack({
        delta: 1 });

    } },

  components: {
    CIcon: _cIcon.default } };exports.default = _default;

/***/ }),
/* 31 */
/*!********************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/common/mixin/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.skinMixin = void 0;var _vuex = __webpack_require__(/*! vuex */ 11);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var skinMixin = {
  computed: _objectSpread({},
  (0, _vuex.mapGetters)(['skinMode', 'skinColor'])),

  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['changeSkin'])) };exports.skinMixin = skinMixin;

/***/ }),
/* 32 */
/*!***************************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=style&index=0&id=4502682e&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./nav-bar.nvue?vue&type=style&index=0&id=4502682e&scoped=true&lang=css& */ 33);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_nav_bar_nvue_vue_type_style_index_0_id_4502682e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 33 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/nav-bar/nav-bar.nvue?vue&type=style&index=0&id=4502682e&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "nav": {
    "height": "44",
    "flexDirection": "row",
    "paddingLeft": "20rpx",
    "paddingRight": "20rpx"
  },
  "back": {
    "width": "44",
    "justifyContent": "center",
    "alignItems": "flex-start",
    "height": "44"
  },
  "title": {
    "fontSize": "28rpx"
  },
  "left": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "center": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "right": {
    "flexDirection": "row",
    "alignItems": "center",
    "flex": 1,
    "justifyContent": "space-between"
  }
}

/***/ }),
/* 34 */
/*!****************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixed-button.nvue?vue&type=template&id=45ba89bc&scoped=true& */ 35);
/* harmony import */ var _fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixed-button.nvue?vue&type=script&lang=js& */ 37);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 9);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./fixed-button.nvue?vue&type=style&index=0&id=45ba89bc&scoped=true&lang=css& */ 39).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./fixed-button.nvue?vue&type=style&index=0&id=45ba89bc&scoped=true&lang=css& */ 39).default)
            }

}

/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "45ba89bc",
  "9b9859e2",
  false,
  _fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 35 */
/*!***********************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=template&id=45ba89bc&scoped=true& ***!
  \***********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./fixed-button.nvue?vue&type=template&id=45ba89bc&scoped=true& */ 36);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_template_id_45ba89bc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 36 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=template&id=45ba89bc&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isShow
    ? _c(
        "view",
        {
          ref: "button",
          staticClass: ["button"],
          style: { "background-color": _vm.skinColor.itemColor }
        },
        [_vm._t("default")],
        2
      )
    : _vm._e()
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 37 */
/*!*****************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./fixed-button.nvue?vue&type=script&lang=js& */ 38);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 38 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;







var _index = __webpack_require__(/*! @/common/mixin/index.js */ 31); //
//
//
//
//
//
var animation = weex.requireModule('animation');var _default = { mixins: [_index.skinMixin], props: { show: { type: Boolean, default: true } },


  data: function data() {
    return {
      isShow: true };

  },
  mounted: function mounted() {
    if (!this.show) {
      this.hideBtn();
    } else {
      this.showBtn();
    }
  },
  methods: {
    hideBtn: function hideBtn() {var _this = this;
      animation.transition(this.$refs.button, {
        styles: {
          transform: 'scale(0)' },

        duration: 300, //ms
        timingFunction: 'ease',
        needLayout: false,
        delay: 0 //ms
      }, function (res) {
        _this.isShow = false;
      });
    },
    showBtn: function showBtn() {var _this2 = this;
      this.isShow = true;
      this.$nextTick(function () {
        animation.transition(_this2.$refs.button, {
          styles: {
            transform: 'scale(1)' },

          duration: 300, //ms
          timingFunction: 'ease',
          needLayout: false,
          delay: 0 //ms
        });
      });
    } },

  watch: {
    show: function show(val) {
      if (!val) {
        this.hideBtn();
      } else {
        this.showBtn();
      }
    } } };exports.default = _default;

/***/ }),
/* 39 */
/*!*************************************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=style&index=0&id=45ba89bc&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./fixed-button.nvue?vue&type=style&index=0&id=45ba89bc&scoped=true&lang=css& */ 40);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_fixed_button_nvue_vue_type_style_index_0_id_45ba89bc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 40 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/components/fixed-button/fixed-button.nvue?vue&type=style&index=0&id=45ba89bc&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "button": {
    "width": "50",
    "height": "50",
    "transform": "scale(0)",
    "borderRadius": "50",
    "boxShadow": "0 2px 6px rgba(0,0,0,0.2)",
    "justifyContent": "center",
    "alignItems": "center",
    "marginTop": "5",
    "marginBottom": "5"
  }
}

/***/ }),
/* 41 */
/*!*********************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=script&lang=js&mpType=page ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.nvue?vue&type=script&lang=js&mpType=page */ 42);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_script_lang_js_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 42 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=script&lang=js&mpType=page ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





















































var _cIcon = _interopRequireDefault(__webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22));
var _menu = _interopRequireDefault(__webpack_require__(/*! @/pages/menu/menu.nvue */ 43));
var _index = __webpack_require__(/*! @/common/mixin/index.js */ 31);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var dom = weex.requireModule('dom') || {};var _default = { mixins: [_index.skinMixin], data: function data() {return { books: [{ id: '200901141850320490', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320491', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320492', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320493', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320494', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320495', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320496', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320497', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320498', name: '影院街影院街影院街影院街影院街影院街影院街', image: '', progress: 33.33 }, { id: '200901141850320499', name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320500',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320501',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320502',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320503',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320504',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320505',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320506',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 },
      {
        id: '200901141850320507',
        name: '影院街影院街影院街影院街影院街影院街影院街',
        image: '',
        progress: 33.33 }],

      current: 0,
      oldOffsetY: 0,
      btnShow: true,
      pointX: 0,
      menuLate: 0,
      menuOpac: 0 };

  },
  methods: {
    scroll: function scroll(e) {
      if (e.contentOffset.y < this.oldOffsetY) {
        this.btnShow = false;
      } else {
        this.btnShow = true;
      }
      this.oldOffsetY = e.contentOffset.y;
    },
    clear: function clear() {
      uni.showModal({
        title: '提示',
        content: '是否清空所有书籍？',
        success: function success(res) {
          if (res.confirm) {
            __f__("log", '清空', " at pages\\index\\index.nvue:177");
          }
        } });

    },
    changeCurrent: function changeCurrent(val) {
      this.current = val;
    },
    scrollTop: function scrollTop() {
      dom.scrollToElement(this.$refs['list'][0]);
    },
    touchstart: function touchstart(e) {
      if (e.touches.length > 1) {
        return;
      }
      var touch = e.touches[0];
      this.pointX = touch.pageX;
      if (this.pointX <= 10) {
        this.$refs.leftMenu.open();
      }
    },
    touchmove: function touchmove(e) {
      if (e.touches.length > 1) {
        return;
      }
      if (this.pointX > 10) {
        return;
      }
      var touch = e.touches[0];
      this.menuLate = 1.5 * (touch.pageX - this.pointX);
      this.menuOpac = this.menuLate / Math.abs(this.$refs.leftMenu.anima.late) * this.$refs.leftMenu.anima.opac;
    },
    touchend: function touchend(e) {var _this = this;
      if (this.pointX > 10) {
        return;
      }
      if (this.$refs.leftMenu.popuplate >= -240) {
        this.$refs.leftMenu.show();
      } else {
        this.$refs.leftMenu.hide();
        setTimeout(function () {
          _this.menuLate = 0;
        }, this.$refs.leftMenu.anima.duration);
      }
      this.$nextTick(function () {
        _this.pointX = 0;
      });
    } },

  onBackPress: function onBackPress(event) {
    if (this.$refs.leftMenu.isShow) {
      this.$refs.leftMenu.hide();
      return true;
    }
    return false;
  },
  components: {
    CIcon: _cIcon.default,
    CMenu: _menu.default } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 6)["default"]))

/***/ }),
/* 43 */
/*!*******************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.nvue?vue&type=template&id=7575e0e0& */ 44);
/* harmony import */ var _menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.nvue?vue&type=script&lang=js& */ 46);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 9);

var renderjs


function injectStyles (context) {
  
  if(!this.options.style){
          this.options.style = {}
      }
      if(Vue.prototype.__merge_style && Vue.prototype.__$appStyle__){
        Vue.prototype.__merge_style(Vue.prototype.__$appStyle__, this.options.style)
      }
      if(Vue.prototype.__merge_style){
                Vue.prototype.__merge_style(__webpack_require__(/*! ./menu.nvue?vue&type=style&index=0&lang=css& */ 48).default, this.options.style)
            }else{
                Object.assign(this.options.style,__webpack_require__(/*! ./menu.nvue?vue&type=style&index=0&lang=css& */ 48).default)
            }

}

/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "a72a677a",
  false,
  _menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

injectStyles.call(component)
component.options.__file = "hbuilderProjects/uni-books/pages/menu/menu.nvue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 44 */
/*!**************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=template&id=7575e0e0& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=template&id=7575e0e0& */ 45);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_template_recycle_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_7_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_template_id_7575e0e0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),
/* 45 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/template.recycle.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--7-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=template&id=7575e0e0& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "c-icon": __webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22).default
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.isShow
    ? _c("view", { staticClass: ["menu"] }, [
        _c("view", {
          ref: "mask",
          staticClass: ["mask"],
          style: { opacity: _vm.maskOpacity },
          on: { touchmove: _vm.moveEnable, click: _vm.hide }
        }),
        _c(
          "view",
          {
            ref: "popup",
            staticClass: ["popup"],
            style: {
              "background-color": _vm.skinColor.menuBgColor,
              transform: "translateX(" + _vm.popuplate + "rpx)"
            },
            on: {
              touchstart: _vm.touchstart,
              touchmove: _vm.touchmove,
              touchend: _vm.touchend,
              click: _vm.moveEnable
            }
          },
          [
            _c(
              "view",
              { staticClass: ["top-img"] },
              [
                _c("u-image", {
                  staticClass: ["bg"],
                  attrs: { src: "../../static/logo.png", mode: "aspectFill" }
                }),
                _c("view", {
                  staticClass: ["top-mask"],
                  style: { opacity: _vm.skinColor.imgMask }
                })
              ],
              1
            ),
            _vm._l(_vm.navs, function(item, index) {
              return _c(
                "view",
                {
                  key: index,
                  staticClass: ["list"],
                  style: _vm.isActived(index),
                  on: {
                    click: function($event) {
                      _vm.changeCurrent(index)
                    }
                  }
                },
                [
                  _c(
                    "view",
                    { staticClass: ["icon"] },
                    [
                      _c("c-icon", {
                        attrs: {
                          name: item.icon,
                          size: item.size,
                          color:
                            _vm.current == index
                              ? _vm.skinColor.menuActiveColor
                              : _vm.skinColor.menuIconColor
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "u-text",
                    {
                      staticClass: ["title"],
                      style: {
                        color:
                          _vm.current == index
                            ? _vm.skinColor.menuActiveColor
                            : _vm.skinColor.menuTitleColor
                      }
                    },
                    [_vm._v(_vm._s(item.title))]
                  )
                ]
              )
            }),
            _c("view", {
              staticClass: ["hr"],
              style: { "background-color": _vm.skinColor.gapColor }
            }),
            _c(
              "view",
              { staticClass: ["list"], on: { click: _vm.changeMode } },
              [
                _c(
                  "view",
                  { staticClass: ["icon"] },
                  [
                    _c("c-icon", {
                      attrs: {
                        name: _vm.modeIcon,
                        size: "25",
                        color: _vm.skinColor.menuIconColor
                      }
                    })
                  ],
                  1
                ),
                _c(
                  "u-text",
                  {
                    staticClass: ["title"],
                    style: { color: _vm.skinColor.menuTitleColor }
                  },
                  [_vm._v(_vm._s(_vm.modeName))]
                )
              ]
            ),
            _vm._l(_vm.options, function(item, index) {
              return _c("view", { key: index, staticClass: ["list"] }, [
                _c(
                  "view",
                  { staticClass: ["icon"] },
                  [
                    _c("c-icon", {
                      attrs: {
                        name: item.icon,
                        size: item.size,
                        color: _vm.skinColor.menuIconColor
                      }
                    })
                  ],
                  1
                ),
                _c(
                  "u-text",
                  {
                    staticClass: ["title"],
                    style: { color: _vm.skinColor.menuTitleColor }
                  },
                  [_vm._v(_vm._s(item.title))]
                )
              ])
            })
          ],
          2
        )
      ])
    : _vm._e()
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),
/* 46 */
/*!********************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib??ref--4-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=script&lang=js& */ 47);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_ref_4_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_4_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 47 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--4-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__f__) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




































var _cIcon = _interopRequireDefault(__webpack_require__(/*! @/components/c-icon/c-icon.nvue */ 22));
var _index = __webpack_require__(/*! @/common/mixin/index.js */ 31);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var animation = weex.requireModule('animation');var _default = { mixins: [_index.skinMixin], props: { translate: { type: Number, default: 0 }, opacity: { type: Number, default: 0 } }, data: function data() {return { anima: { duration: 400, late: -540, opac: 0.5 }, isShow: false, maskOpacity: 0, popuplate: -540, pointX: 0, current: 0, navs: [{ icon: 'books-fill', size: 23, title: '阅读中' }, { icon: 'history-fill', size: 25, title: '已读完' }], options: [{ icon: 'setting-fill',
        size: 23,
        title: '设置' },
      {
        icon: 'about',
        size: 22,
        title: '关于' }] };


  },
  computed: {
    modeName: function modeName() {
      return this.skinMode == 'default' ? '夜间模式' : '日间模式';
    },
    modeIcon: function modeIcon() {
      return this.skinMode == 'default' ? 'night' : 'light-fill';
    } },

  methods: {
    moveEnable: function moveEnable() {
      return true;
    },
    changeCurrent: function changeCurrent(val) {
      this.current = val;
    },
    isActived: function isActived(val) {
      if (val == this.current) {
        return { 'background-color': this.skinColor.menuActiveBgColor };
      }
    },
    changeMode: function changeMode() {
      var skin = this.skinMode == 'default' ? 'night' : 'default';
      this.changeSkin(skin);
    },
    //仅仅显示组件，并不显示菜单和遮罩层
    open: function open() {
      this.isShow = true;
    },
    //显示出菜单和遮罩层
    show: function show() {var _this = this;
      this.isShow = true;
      this.$nextTick(function () {
        animation.transition(_this.$refs.mask, {
          styles: {
            opacity: _this.anima.opac },

          duration: _this.anima.duration, //ms
          timingFunction: 'ease',
          needLayout: false,
          delay: 0 //ms
        }, function (res) {
          _this.maskOpacity = _this.anima.opac;
        });
        animation.transition(_this.$refs.popup, {
          styles: {
            transform: 'translateX(0)' },

          duration: _this.anima.duration, //ms
          timingFunction: 'ease',
          needLayout: false,
          delay: 0 //ms
        }, function (res) {
          _this.popuplate = 0;
        });
      });
    },
    //关闭全部
    hide: function hide() {var _this2 = this;
      animation.transition(this.$refs.mask, {
        styles: {
          opacity: 0 },

        duration: this.anima.duration, //ms
        timingFunction: 'ease',
        needLayout: false,
        delay: 0 //ms
      }, function (res) {
        _this2.maskOpacity = 0;
      });
      animation.transition(this.$refs.popup, {
        styles: {
          transform: 'translateX(' + this.anima.late + 'rpx)' },

        duration: this.anima.duration, //ms
        timingFunction: 'ease',
        needLayout: false,
        delay: 0 //ms
      }, function (res) {
        _this2.isShow = false;
        _this2.popuplate = _this2.anima.late;
      });
    },
    touchstart: function touchstart(e) {
      if (e.touches.length > 1) {
        return;
      }
      var touch = e.touches[0];
      this.pointX = touch.pageX;
    },
    touchmove: function touchmove(e) {
      if (e.touches.length > 1) {
        return;
      }
      var touch = e.touches[0];
      __f__("log", this.pointX - touch.pageX, " at pages\\menu\\menu.nvue:178");
      this.popuplate = 0 - 1.5 * (this.pointX - touch.pageX);
      if (this.popuplate <= -540) {
        this.popuplate = -540;
      }
      if (this.popuplate >= 0) {
        this.popuplate = 0;
      }
      this.maskOpacity = Math.abs(this.anima.late - this.popuplate) / Math.abs(this.anima.late) * this.anima.opac;
      if (this.maskOpacity <= 0) {
        this.maskOpacity = 0;
      }
      if (this.maskOpacity >= this.anima.opac) {
        this.maskOpacity = this.anima.opac;
      }
    },
    touchend: function touchend(e) {
      if (this.popuplate <= -300) {
        this.hide();
      } else {
        this.show();
      }
      this.pointX = 0;
    } },

  watch: {
    current: function current(val) {
      this.$emit('change', val);
    },
    translate: function translate(val) {
      this.popuplate = val + this.anima.late;
      if (this.popuplate > 0) {
        this.popuplate = 0;
      }
    },
    opacity: function opacity(val) {
      this.maskOpacity = val;
      if (this.maskOpacity > this.anima.opac) {
        this.maskOpacity = this.anima.opac;
      }
    } },

  components: {
    CIcon: _cIcon.default } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/lib/format-log.js */ 6)["default"]))

/***/ }),
/* 48 */
/*!****************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./menu.nvue?vue&type=style&index=0&lang=css& */ 49);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_menu_nvue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 49 */
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/menu/menu.nvue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "menu": {
    "position": "fixed",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "mask": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#000000"
  },
  "popup": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "bottom": 0,
    "width": "540rpx",
    "boxShadow": "2px 0 8px rgba(0,0,0,0.1)"
  },
  "top-img": {
    "height": "350rpx",
    "position": "relative",
    "marginBottom": "10"
  },
  "bg": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#666666"
  },
  "top-mask": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#000000"
  },
  "hr": {
    "height": "1",
    "marginTop": "10",
    "marginBottom": "10"
  },
  "list": {
    "flexDirection": "row",
    "alignItems": "center",
    "height": "60"
  },
  "list-right": {
    "flex": 1,
    "alignItems": "flex-end"
  },
  "list-actived": {
    "backgroundColor": "#DDDDDD"
  },
  "list-actived-2": {
    "backgroundColor": "#343434"
  },
  "icon": {
    "width": "35",
    "marginLeft": "20",
    "marginRight": "35"
  },
  "title": {
    "fontSize": 18
  }
}

/***/ }),
/* 50 */
/*!*****************************************************************************************************************************************!*\
  !*** C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=style&index=0&id=b8229bcc&scoped=true&lang=css&mpType=page ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-0-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./index.nvue?vue&type=style&index=0&id=b8229bcc&scoped=true&lang=css&mpType=page */ 51);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_style_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_1_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_0_2_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_0_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_index_nvue_vue_type_style_index_0_id_b8229bcc_scoped_true_lang_css_mpType_page__WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 51 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/style.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-1!./node_modules/postcss-loader/src??ref--8-oneOf-0-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-0-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!C:/SoftWare/hbuilderProjects/uni-books/pages/index/index.nvue?vue&type=style&index=0&id=b8229bcc&scoped=true&lang=css&mpType=page ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "book": {
    "marginTop": "10",
    "position": "relative",
    "height": "190"
  },
  "book-img": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "book-mask": {
    "position": "absolute",
    "top": 0,
    "left": 0,
    "right": 0,
    "bottom": 0,
    "backgroundColor": "#000000"
  },
  "book-bottom": {
    "position": "absolute",
    "bottom": 0,
    "left": 0,
    "right": 0,
    "height": "80rpx",
    "backgroundColor": "rgba(255,255,255,0.4)",
    "justifyContent": "center",
    "paddingTop": 0,
    "paddingRight": "5",
    "paddingBottom": 0,
    "paddingLeft": "5"
  },
  "book-name": {
    "fontSize": "22rpx",
    "color": "#333333",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  "b-bottom": {
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "book-time": {
    "fontSize": "18rpx",
    "color": "#666666",
    "marginTop": "5"
  },
  "book-progress": {
    "fontSize": "18rpx",
    "color": "#666666",
    "marginTop": "5"
  },
  "nav-left": {
    "marginRight": "60rpx"
  },
  "fixed": {
    "position": "fixed",
    "bottom": "20",
    "right": "20",
    "width": "50",
    "alignItems": "center",
    "justifyContent": "flex-end"
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXA/N2Y4MCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9saWIvZm9ybWF0LWxvZy5qcz8wZGU5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qcz9mMGM1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWV4L2Rpc3QvdnVleC5lc20uanM/MmY2MiIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvbWFpbi5qcz81MjllIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9tYWluLmpzPzkwZmUiLCJ3ZWJwYWNrOi8vL0M6L1NvZnRXYXJlL2hidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL0FwcC52dWU/OWFjNSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvQXBwLnZ1ZT82ZWQ0Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9pbmRleC9pbmRleC5udnVlP2IwYjQiLCJ3ZWJwYWNrOi8vL0M6L1NvZnRXYXJlL2hidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL3BhZ2VzL2luZGV4L2luZGV4Lm52dWU/ZDVjNSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvcGFnZXMvaW5kZXgvaW5kZXgubnZ1ZT81ZjNmIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL25hdi1iYXIvbmF2LWJhci5udnVlPzVjNDIiLCJ3ZWJwYWNrOi8vL0M6L1NvZnRXYXJlL2hidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL2NvbXBvbmVudHMvbmF2LWJhci9uYXYtYmFyLm52dWU/NjVhZSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9uYXYtYmFyL25hdi1iYXIubnZ1ZT85NjA5Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZT85ZmMzIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZT9hYzk5Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZT9iNjEzIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZT8wNmU4IiwidW5pLWFwcDovLy9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9jLWljb24vYy1pY29uLm52dWU/ZWVmYyIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9jLWljb24vYy1pY29uLm52dWU/ODgzNSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9uYXYtYmFyL25hdi1iYXIubnZ1ZT8wMmFiIiwidW5pLWFwcDovLy9jb21wb25lbnRzL25hdi1iYXIvbmF2LWJhci5udnVlIiwidW5pLWFwcDovLy9jb21tb24vbWl4aW4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0M6L1NvZnRXYXJlL2hidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL2NvbXBvbmVudHMvbmF2LWJhci9uYXYtYmFyLm52dWU/YjNjZiIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9uYXYtYmFyL25hdi1iYXIubnZ1ZT8xNWYxIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZT84NWZkIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZT9iZmU5Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZT9iYmI3Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZT83YTNhIiwidW5pLWFwcDovLy9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9maXhlZC1idXR0b24vZml4ZWQtYnV0dG9uLm52dWU/NmQxYyIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9maXhlZC1idXR0b24vZml4ZWQtYnV0dG9uLm52dWU/Mjg1ZiIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvcGFnZXMvaW5kZXgvaW5kZXgubnZ1ZT80MzJmIiwidW5pLWFwcDovLy9wYWdlcy9pbmRleC9pbmRleC5udnVlIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9tZW51L21lbnUubnZ1ZT8wMmQzIiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9tZW51L21lbnUubnZ1ZT9mNTk1Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9tZW51L21lbnUubnZ1ZT8wNTE4Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9tZW51L21lbnUubnZ1ZT85NjRhIiwidW5pLWFwcDovLy9wYWdlcy9tZW51L21lbnUubnZ1ZSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvcGFnZXMvbWVudS9tZW51Lm52dWU/OTk5MyIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvcGFnZXMvbWVudS9tZW51Lm52dWU/ZDBlYSIsIndlYnBhY2s6Ly8vQzovU29mdFdhcmUvaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvcGFnZXMvaW5kZXgvaW5kZXgubnZ1ZT8zNmQ0Iiwid2VicGFjazovLy9DOi9Tb2Z0V2FyZS9oYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9pbmRleC9pbmRleC5udnVlPzQxZmEiXSwibmFtZXMiOlsidHlwb2YiLCJ2IiwicyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsInN1YnN0cmluZyIsImxlbmd0aCIsImlzRGVidWdNb2RlIiwiX19jaGFubmVsSWRfXyIsImxvZyIsInR5cGUiLCJfbGVuIiwiYXJndW1lbnRzIiwiYXJncyIsIkFycmF5IiwiX2tleSIsImNvbnNvbGUiLCJhcHBseSIsImZvcm1hdExvZyIsInNoaWZ0IiwicHVzaCIsInBvcCIsInJlcGxhY2UiLCJtc2dzIiwibWFwIiwidG9Mb3dlckNhc2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZSIsInVuZGVmaW5lZCIsInZUeXBlIiwidG9VcHBlckNhc2UiLCJTdHJpbmciLCJtc2ciLCJsYXN0TXNnIiwiam9pbiIsImluZGV4T2YiLCJhcHBseU1peGluIiwiVnVlIiwidmVyc2lvbiIsIk51bWJlciIsInNwbGl0IiwibWl4aW4iLCJiZWZvcmVDcmVhdGUiLCJ2dWV4SW5pdCIsIl9pbml0Iiwib3B0aW9ucyIsImluaXQiLCJjb25jYXQiLCIkb3B0aW9ucyIsInN0b3JlIiwiJHN0b3JlIiwicGFyZW50IiwiZGV2dG9vbEhvb2siLCJ3aW5kb3ciLCJfX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fIiwiZGV2dG9vbFBsdWdpbiIsIl9kZXZ0b29sSG9vayIsImVtaXQiLCJvbiIsInRhcmdldFN0YXRlIiwicmVwbGFjZVN0YXRlIiwic3Vic2NyaWJlIiwibXV0YXRpb24iLCJzdGF0ZSIsImZvckVhY2hWYWx1ZSIsIm9iaiIsImZuIiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpc09iamVjdCIsImlzUHJvbWlzZSIsInZhbCIsInRoZW4iLCJhc3NlcnQiLCJjb25kaXRpb24iLCJFcnJvciIsIk1vZHVsZSIsInJhd01vZHVsZSIsInJ1bnRpbWUiLCJfY2hpbGRyZW4iLCJjcmVhdGUiLCJfcmF3TW9kdWxlIiwicmF3U3RhdGUiLCJwcm90b3R5cGVBY2Nlc3NvcnMkMSIsIm5hbWVzcGFjZWQiLCJjb25maWd1cmFibGUiLCJnZXQiLCJhZGRDaGlsZCIsIm1vZHVsZSIsInJlbW92ZUNoaWxkIiwiZ2V0Q2hpbGQiLCJ1cGRhdGUiLCJhY3Rpb25zIiwibXV0YXRpb25zIiwiZ2V0dGVycyIsImZvckVhY2hDaGlsZCIsImZvckVhY2hHZXR0ZXIiLCJmb3JFYWNoQWN0aW9uIiwiZm9yRWFjaE11dGF0aW9uIiwiZGVmaW5lUHJvcGVydGllcyIsIk1vZHVsZUNvbGxlY3Rpb24iLCJyYXdSb290TW9kdWxlIiwicmVnaXN0ZXIiLCJwYXRoIiwicmVkdWNlIiwicm9vdCIsImdldE5hbWVzcGFjZSIsIm5hbWVzcGFjZSIsInVwZGF0ZSQxIiwidGhpcyQxIiwicHJvY2VzcyIsImFzc2VydFJhd01vZHVsZSIsIm5ld01vZHVsZSIsInNsaWNlIiwibW9kdWxlcyIsInJhd0NoaWxkTW9kdWxlIiwidW5yZWdpc3RlciIsInRhcmdldE1vZHVsZSIsIndhcm4iLCJmdW5jdGlvbkFzc2VydCIsInZhbHVlIiwiZXhwZWN0ZWQiLCJvYmplY3RBc3NlcnQiLCJoYW5kbGVyIiwiYXNzZXJ0VHlwZXMiLCJhc3NlcnRPcHRpb25zIiwibWFrZUFzc2VydGlvbk1lc3NhZ2UiLCJidWYiLCJTdG9yZSIsImluc3RhbGwiLCJQcm9taXNlIiwicGx1Z2lucyIsInN0cmljdCIsIl9jb21taXR0aW5nIiwiX2FjdGlvbnMiLCJfYWN0aW9uU3Vic2NyaWJlcnMiLCJfbXV0YXRpb25zIiwiX3dyYXBwZWRHZXR0ZXJzIiwiX21vZHVsZXMiLCJfbW9kdWxlc05hbWVzcGFjZU1hcCIsIl9zdWJzY3JpYmVycyIsIl93YXRjaGVyVk0iLCJyZWYiLCJkaXNwYXRjaCIsImNvbW1pdCIsImJvdW5kRGlzcGF0Y2giLCJwYXlsb2FkIiwiYm91bmRDb21taXQiLCJpbnN0YWxsTW9kdWxlIiwicmVzZXRTdG9yZVZNIiwicGx1Z2luIiwiY29uZmlnIiwiZGV2dG9vbHMiLCJwcm90b3R5cGVBY2Nlc3NvcnMiLCJfdm0iLCJfZGF0YSIsIiQkc3RhdGUiLCJzZXQiLCJfdHlwZSIsIl9wYXlsb2FkIiwiX29wdGlvbnMiLCJ1bmlmeU9iamVjdFN0eWxlIiwiZW50cnkiLCJlcnJvciIsIl93aXRoQ29tbWl0IiwiY29tbWl0SXRlcmF0b3IiLCJzdWIiLCJzaWxlbnQiLCJhY3Rpb24iLCJhbGwiLCJnZW5lcmljU3Vic2NyaWJlIiwic3Vic2NyaWJlQWN0aW9uIiwid2F0Y2giLCJnZXR0ZXIiLCJjYiIsIiR3YXRjaCIsInJlZ2lzdGVyTW9kdWxlIiwiaXNBcnJheSIsInByZXNlcnZlU3RhdGUiLCJ1bnJlZ2lzdGVyTW9kdWxlIiwicGFyZW50U3RhdGUiLCJnZXROZXN0ZWRTdGF0ZSIsImRlbGV0ZSIsInJlc2V0U3RvcmUiLCJob3RVcGRhdGUiLCJuZXdPcHRpb25zIiwiY29tbWl0dGluZyIsInN1YnMiLCJpIiwic3BsaWNlIiwiaG90Iiwib2xkVm0iLCJ3cmFwcGVkR2V0dGVycyIsImNvbXB1dGVkIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZGF0YSIsImVuYWJsZVN0cmljdE1vZGUiLCJuZXh0VGljayIsIiRkZXN0cm95Iiwicm9vdFN0YXRlIiwiaXNSb290IiwibW9kdWxlTmFtZSIsImxvY2FsIiwiY29udGV4dCIsIm1ha2VMb2NhbENvbnRleHQiLCJuYW1lc3BhY2VkVHlwZSIsInJlZ2lzdGVyTXV0YXRpb24iLCJyZWdpc3RlckFjdGlvbiIsInJlZ2lzdGVyR2V0dGVyIiwiY2hpbGQiLCJub05hbWVzcGFjZSIsIm1ha2VMb2NhbEdldHRlcnMiLCJnZXR0ZXJzUHJveHkiLCJzcGxpdFBvcyIsImxvY2FsVHlwZSIsIndyYXBwZWRNdXRhdGlvbkhhbmRsZXIiLCJ3cmFwcGVkQWN0aW9uSGFuZGxlciIsInJlcyIsInJvb3RHZXR0ZXJzIiwicmVzb2x2ZSIsImNhdGNoIiwiZXJyIiwicmF3R2V0dGVyIiwid3JhcHBlZEdldHRlciIsImRlZXAiLCJzeW5jIiwiX1Z1ZSIsIm1hcFN0YXRlIiwibm9ybWFsaXplTmFtZXNwYWNlIiwic3RhdGVzIiwibm9ybWFsaXplTWFwIiwibWFwcGVkU3RhdGUiLCJnZXRNb2R1bGVCeU5hbWVzcGFjZSIsInZ1ZXgiLCJtYXBNdXRhdGlvbnMiLCJtYXBwZWRNdXRhdGlvbiIsImxlbiIsIm1hcEdldHRlcnMiLCJtYXBwZWRHZXR0ZXIiLCJtYXBBY3Rpb25zIiwibWFwcGVkQWN0aW9uIiwiY3JlYXRlTmFtZXNwYWNlZEhlbHBlcnMiLCJiaW5kIiwiY2hhckF0IiwiaGVscGVy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QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7O0FDekVBO0FBQUE7QUFBQTtBQUFBO0FBQTB2QixDQUFnQixtd0JBQUcsRUFBQyxDOzs7Ozs7Ozs7O0FDQTl3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJwYWdlcy9pbmRleC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG4iLCJmdW5jdGlvbiB0eXBvZiAodikge1xuICB2YXIgcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KVxuICByZXR1cm4gcy5zdWJzdHJpbmcoOCwgcy5sZW5ndGggLSAxKVxufVxuXG5mdW5jdGlvbiBpc0RlYnVnTW9kZSAoKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4gIHJldHVybiB0eXBlb2YgX19jaGFubmVsSWRfXyA9PT0gJ3N0cmluZycgJiYgX19jaGFubmVsSWRfX1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nICh0eXBlKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XVxuICB9XG4gIGNvbnNvbGVbdHlwZV0uYXBwbHkoY29uc29sZSwgYXJncylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0TG9nICgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XVxuICB9XG4gIHZhciB0eXBlID0gYXJncy5zaGlmdCgpXG4gIGlmIChpc0RlYnVnTW9kZSgpKSB7XG4gICAgYXJncy5wdXNoKGFyZ3MucG9wKCkucmVwbGFjZSgnYXQgJywgJ3VuaS1hcHA6Ly8vJykpXG4gICAgcmV0dXJuIGNvbnNvbGVbdHlwZV0uYXBwbHkoY29uc29sZSwgYXJncylcbiAgfVxuXG4gIHZhciBtc2dzID0gYXJncy5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2KS50b0xvd2VyQ2FzZSgpXG5cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3Qgb2JqZWN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgYXJyYXldJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdiA9ICctLS1CRUdJTjpKU09OLS0tJyArIEpTT04uc3RyaW5naWZ5KHYpICsgJy0tLUVORDpKU09OLS0tJ1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB2ID0gJ1tvYmplY3Qgb2JqZWN0XSdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHYgPT09IG51bGwpIHtcbiAgICAgICAgdiA9ICctLS1OVUxMLS0tJ1xuICAgICAgfSBlbHNlIGlmICh2ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdiA9ICctLS1VTkRFRklORUQtLS0nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdlR5cGUgPSB0eXBvZih2KS50b1VwcGVyQ2FzZSgpXG5cbiAgICAgICAgaWYgKHZUeXBlID09PSAnTlVNQkVSJyB8fCB2VHlwZSA9PT0gJ0JPT0xFQU4nKSB7XG4gICAgICAgICAgdiA9ICctLS1CRUdJTjonICsgdlR5cGUgKyAnLS0tJyArIHYgKyAnLS0tRU5EOicgKyB2VHlwZSArICctLS0nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdiA9IFN0cmluZyh2KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZcbiAgfSlcbiAgdmFyIG1zZyA9ICcnXG5cbiAgaWYgKG1zZ3MubGVuZ3RoID4gMSkge1xuICAgIHZhciBsYXN0TXNnID0gbXNncy5wb3AoKVxuICAgIG1zZyA9IG1zZ3Muam9pbignLS0tQ09NTUEtLS0nKVxuXG4gICAgaWYgKGxhc3RNc2cuaW5kZXhPZignIGF0ICcpID09PSAwKSB7XG4gICAgICBtc2cgKz0gbGFzdE1zZ1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgKz0gJy0tLUNPTU1BLS0tJyArIGxhc3RNc2dcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbXNnID0gbXNnc1swXVxuICB9XG5cbiAgY29uc29sZVt0eXBlXShtc2cpXG59XG4iLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gSU1QT1JUQU5UOiBEbyBOT1QgdXNlIEVTMjAxNSBmZWF0dXJlcyBpbiB0aGlzIGZpbGUgKGV4Y2VwdCBmb3IgbW9kdWxlcykuXG4vLyBUaGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGUuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHNjcmlwdEV4cG9ydHMsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmdW5jdGlvbmFsVGVtcGxhdGUsXG4gIGluamVjdFN0eWxlcyxcbiAgc2NvcGVJZCxcbiAgbW9kdWxlSWRlbnRpZmllciwgLyogc2VydmVyIG9ubHkgKi9cbiAgc2hhZG93TW9kZSwgLyogdnVlLWNsaSBvbmx5ICovXG4gIGNvbXBvbmVudHMsIC8vIGZpeGVkIGJ5IHh4eHh4eCBhdXRvIGNvbXBvbmVudHNcbiAgcmVuZGVyanMgLy8gZml4ZWQgYnkgeHh4eHh4IHJlbmRlcmpzXG4pIHtcbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyBmaXhlZCBieSB4eHh4eHggYXV0byBjb21wb25lbnRzXG4gIGlmIChjb21wb25lbnRzKSB7XG4gICAgaWYgKCFvcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICAgIG9wdGlvbnMuY29tcG9uZW50cyA9IHt9XG4gICAgfVxuICAgIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICAgZm9yICh2YXIgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgICBpZiAoaGFzT3duLmNhbGwoY29tcG9uZW50cywgbmFtZSkgJiYgIWhhc093bi5jYWxsKG9wdGlvbnMuY29tcG9uZW50cywgbmFtZSkpIHtcbiAgICAgICAgb3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gY29tcG9uZW50c1tuYW1lXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBmaXhlZCBieSB4eHh4eHggcmVuZGVyanNcbiAgaWYgKHJlbmRlcmpzKSB7XG4gICAgKHJlbmRlcmpzLmJlZm9yZUNyZWF0ZSB8fCAocmVuZGVyanMuYmVmb3JlQ3JlYXRlID0gW10pKS51bnNoaWZ0KGZ1bmN0aW9uKCkge1xuICAgICAgdGhpc1tyZW5kZXJqcy5fX21vZHVsZV0gPSB0aGlzXG4gICAgfSk7XG4gICAgKG9wdGlvbnMubWl4aW5zIHx8IChvcHRpb25zLm1peGlucyA9IFtdKSkucHVzaChyZW5kZXJqcylcbiAgfVxuXG4gIC8vIHJlbmRlciBmdW5jdGlvbnNcbiAgaWYgKHJlbmRlcikge1xuICAgIG9wdGlvbnMucmVuZGVyID0gcmVuZGVyXG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBzdGF0aWNSZW5kZXJGbnNcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWVcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGZ1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWVcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9ICdkYXRhLXYtJyArIHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gc2hhZG93TW9kZVxuICAgICAgPyBmdW5jdGlvbiAoKSB7IGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIHRoaXMuJHJvb3QuJG9wdGlvbnMuc2hhZG93Um9vdCkgfVxuICAgICAgOiBpbmplY3RTdHlsZXNcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgaWYgKG9wdGlvbnMuZnVuY3Rpb25hbCkge1xuICAgICAgLy8gZm9yIHRlbXBsYXRlLW9ubHkgaG90LXJlbG9hZCBiZWNhdXNlIGluIHRoYXQgY2FzZSB0aGUgcmVuZGVyIGZuIGRvZXNuJ3RcbiAgICAgIC8vIGdvIHRocm91Z2ggdGhlIG5vcm1hbGl6ZXJcbiAgICAgIG9wdGlvbnMuX2luamVjdFN0eWxlcyA9IGhvb2tcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICB2YXIgb3JpZ2luYWxSZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBvcmlnaW5hbFJlbmRlcihoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgdmFyIGV4aXN0aW5nID0gb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBleHBvcnRzOiBzY3JpcHRFeHBvcnRzLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfVxufVxuIiwiLyoqXG4gKiB2dWV4IHYzLjAuMVxuICogKGMpIDIwMTcgRXZhbiBZb3VcbiAqIEBsaWNlbnNlIE1JVFxuICovXG52YXIgYXBwbHlNaXhpbiA9IGZ1bmN0aW9uIChWdWUpIHtcbiAgdmFyIHZlcnNpb24gPSBOdW1iZXIoVnVlLnZlcnNpb24uc3BsaXQoJy4nKVswXSk7XG5cbiAgaWYgKHZlcnNpb24gPj0gMikge1xuICAgIFZ1ZS5taXhpbih7IGJlZm9yZUNyZWF0ZTogdnVleEluaXQgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gb3ZlcnJpZGUgaW5pdCBhbmQgaW5qZWN0IHZ1ZXggaW5pdCBwcm9jZWR1cmVcbiAgICAvLyBmb3IgMS54IGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIHZhciBfaW5pdCA9IFZ1ZS5wcm90b3R5cGUuX2luaXQ7XG4gICAgVnVlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICAgICAgb3B0aW9ucy5pbml0ID0gb3B0aW9ucy5pbml0XG4gICAgICAgID8gW3Z1ZXhJbml0XS5jb25jYXQob3B0aW9ucy5pbml0KVxuICAgICAgICA6IHZ1ZXhJbml0O1xuICAgICAgX2luaXQuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZ1ZXggaW5pdCBob29rLCBpbmplY3RlZCBpbnRvIGVhY2ggaW5zdGFuY2VzIGluaXQgaG9va3MgbGlzdC5cbiAgICovXG5cbiAgZnVuY3Rpb24gdnVleEluaXQgKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAvLyBzdG9yZSBpbmplY3Rpb25cbiAgICBpZiAob3B0aW9ucy5zdG9yZSkge1xuICAgICAgdGhpcy4kc3RvcmUgPSB0eXBlb2Ygb3B0aW9ucy5zdG9yZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IG9wdGlvbnMuc3RvcmUoKVxuICAgICAgICA6IG9wdGlvbnMuc3RvcmU7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnBhcmVudCAmJiBvcHRpb25zLnBhcmVudC4kc3RvcmUpIHtcbiAgICAgIHRoaXMuJHN0b3JlID0gb3B0aW9ucy5wYXJlbnQuJHN0b3JlO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGRldnRvb2xIb29rID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XG5cbmZ1bmN0aW9uIGRldnRvb2xQbHVnaW4gKHN0b3JlKSB7XG4gIGlmICghZGV2dG9vbEhvb2spIHsgcmV0dXJuIH1cblxuICBzdG9yZS5fZGV2dG9vbEhvb2sgPSBkZXZ0b29sSG9vaztcblxuICBkZXZ0b29sSG9vay5lbWl0KCd2dWV4OmluaXQnLCBzdG9yZSk7XG5cbiAgZGV2dG9vbEhvb2sub24oJ3Z1ZXg6dHJhdmVsLXRvLXN0YXRlJywgZnVuY3Rpb24gKHRhcmdldFN0YXRlKSB7XG4gICAgc3RvcmUucmVwbGFjZVN0YXRlKHRhcmdldFN0YXRlKTtcbiAgfSk7XG5cbiAgc3RvcmUuc3Vic2NyaWJlKGZ1bmN0aW9uIChtdXRhdGlvbiwgc3RhdGUpIHtcbiAgICBkZXZ0b29sSG9vay5lbWl0KCd2dWV4Om11dGF0aW9uJywgbXV0YXRpb24sIHN0YXRlKTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBmaXJzdCBpdGVtIHRoYXQgcGFzcyB0aGUgdGVzdFxuICogYnkgc2Vjb25kIGFyZ3VtZW50IGZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHJldHVybiB7Kn1cbiAqL1xuLyoqXG4gKiBEZWVwIGNvcHkgdGhlIGdpdmVuIG9iamVjdCBjb25zaWRlcmluZyBjaXJjdWxhciBzdHJ1Y3R1cmUuXG4gKiBUaGlzIGZ1bmN0aW9uIGNhY2hlcyBhbGwgbmVzdGVkIG9iamVjdHMgYW5kIGl0cyBjb3BpZXMuXG4gKiBJZiBpdCBkZXRlY3RzIGNpcmN1bGFyIHN0cnVjdHVyZSwgdXNlIGNhY2hlZCBjb3B5IHRvIGF2b2lkIGluZmluaXRlIGxvb3AuXG4gKlxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gY2FjaGVcbiAqIEByZXR1cm4geyp9XG4gKi9cblxuXG4vKipcbiAqIGZvckVhY2ggZm9yIG9iamVjdFxuICovXG5mdW5jdGlvbiBmb3JFYWNoVmFsdWUgKG9iaiwgZm4pIHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGZuKG9ialtrZXldLCBrZXkpOyB9KTtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QgKG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZSAodmFsKSB7XG4gIHJldHVybiB2YWwgJiYgdHlwZW9mIHZhbC50aGVuID09PSAnZnVuY3Rpb24nXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAoY29uZGl0aW9uLCBtc2cpIHtcbiAgaWYgKCFjb25kaXRpb24pIHsgdGhyb3cgbmV3IEVycm9yKChcIlt2dWV4XSBcIiArIG1zZykpIH1cbn1cblxudmFyIE1vZHVsZSA9IGZ1bmN0aW9uIE1vZHVsZSAocmF3TW9kdWxlLCBydW50aW1lKSB7XG4gIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gIHRoaXMuX2NoaWxkcmVuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fcmF3TW9kdWxlID0gcmF3TW9kdWxlO1xuICB2YXIgcmF3U3RhdGUgPSByYXdNb2R1bGUuc3RhdGU7XG4gIHRoaXMuc3RhdGUgPSAodHlwZW9mIHJhd1N0YXRlID09PSAnZnVuY3Rpb24nID8gcmF3U3RhdGUoKSA6IHJhd1N0YXRlKSB8fCB7fTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMSA9IHsgbmFtZXNwYWNlZDogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMkMS5uYW1lc3BhY2VkLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICEhdGhpcy5fcmF3TW9kdWxlLm5hbWVzcGFjZWRcbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbiBhZGRDaGlsZCAoa2V5LCBtb2R1bGUpIHtcbiAgdGhpcy5fY2hpbGRyZW5ba2V5XSA9IG1vZHVsZTtcbn07XG5cbk1vZHVsZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiByZW1vdmVDaGlsZCAoa2V5KSB7XG4gIGRlbGV0ZSB0aGlzLl9jaGlsZHJlbltrZXldO1xufTtcblxuTW9kdWxlLnByb3RvdHlwZS5nZXRDaGlsZCA9IGZ1bmN0aW9uIGdldENoaWxkIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuW2tleV1cbn07XG5cbk1vZHVsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChyYXdNb2R1bGUpIHtcbiAgdGhpcy5fcmF3TW9kdWxlLm5hbWVzcGFjZWQgPSByYXdNb2R1bGUubmFtZXNwYWNlZDtcbiAgaWYgKHJhd01vZHVsZS5hY3Rpb25zKSB7XG4gICAgdGhpcy5fcmF3TW9kdWxlLmFjdGlvbnMgPSByYXdNb2R1bGUuYWN0aW9ucztcbiAgfVxuICBpZiAocmF3TW9kdWxlLm11dGF0aW9ucykge1xuICAgIHRoaXMuX3Jhd01vZHVsZS5tdXRhdGlvbnMgPSByYXdNb2R1bGUubXV0YXRpb25zO1xuICB9XG4gIGlmIChyYXdNb2R1bGUuZ2V0dGVycykge1xuICAgIHRoaXMuX3Jhd01vZHVsZS5nZXR0ZXJzID0gcmF3TW9kdWxlLmdldHRlcnM7XG4gIH1cbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZm9yRWFjaENoaWxkID0gZnVuY3Rpb24gZm9yRWFjaENoaWxkIChmbikge1xuICBmb3JFYWNoVmFsdWUodGhpcy5fY2hpbGRyZW4sIGZuKTtcbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZm9yRWFjaEdldHRlciA9IGZ1bmN0aW9uIGZvckVhY2hHZXR0ZXIgKGZuKSB7XG4gIGlmICh0aGlzLl9yYXdNb2R1bGUuZ2V0dGVycykge1xuICAgIGZvckVhY2hWYWx1ZSh0aGlzLl9yYXdNb2R1bGUuZ2V0dGVycywgZm4pO1xuICB9XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hBY3Rpb24gPSBmdW5jdGlvbiBmb3JFYWNoQWN0aW9uIChmbikge1xuICBpZiAodGhpcy5fcmF3TW9kdWxlLmFjdGlvbnMpIHtcbiAgICBmb3JFYWNoVmFsdWUodGhpcy5fcmF3TW9kdWxlLmFjdGlvbnMsIGZuKTtcbiAgfVxufTtcblxuTW9kdWxlLnByb3RvdHlwZS5mb3JFYWNoTXV0YXRpb24gPSBmdW5jdGlvbiBmb3JFYWNoTXV0YXRpb24gKGZuKSB7XG4gIGlmICh0aGlzLl9yYXdNb2R1bGUubXV0YXRpb25zKSB7XG4gICAgZm9yRWFjaFZhbHVlKHRoaXMuX3Jhd01vZHVsZS5tdXRhdGlvbnMsIGZuKTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIE1vZHVsZS5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyQxICk7XG5cbnZhciBNb2R1bGVDb2xsZWN0aW9uID0gZnVuY3Rpb24gTW9kdWxlQ29sbGVjdGlvbiAocmF3Um9vdE1vZHVsZSkge1xuICAvLyByZWdpc3RlciByb290IG1vZHVsZSAoVnVleC5TdG9yZSBvcHRpb25zKVxuICB0aGlzLnJlZ2lzdGVyKFtdLCByYXdSb290TW9kdWxlLCBmYWxzZSk7XG59O1xuXG5Nb2R1bGVDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgucmVkdWNlKGZ1bmN0aW9uIChtb2R1bGUsIGtleSkge1xuICAgIHJldHVybiBtb2R1bGUuZ2V0Q2hpbGQoa2V5KVxuICB9LCB0aGlzLnJvb3QpXG59O1xuXG5Nb2R1bGVDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXROYW1lc3BhY2UgPSBmdW5jdGlvbiBnZXROYW1lc3BhY2UgKHBhdGgpIHtcbiAgdmFyIG1vZHVsZSA9IHRoaXMucm9vdDtcbiAgcmV0dXJuIHBhdGgucmVkdWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIGtleSkge1xuICAgIG1vZHVsZSA9IG1vZHVsZS5nZXRDaGlsZChrZXkpO1xuICAgIHJldHVybiBuYW1lc3BhY2UgKyAobW9kdWxlLm5hbWVzcGFjZWQgPyBrZXkgKyAnLycgOiAnJylcbiAgfSwgJycpXG59O1xuXG5Nb2R1bGVDb2xsZWN0aW9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUkMSAocmF3Um9vdE1vZHVsZSkge1xuICB1cGRhdGUoW10sIHRoaXMucm9vdCwgcmF3Um9vdE1vZHVsZSk7XG59O1xuXG5Nb2R1bGVDb2xsZWN0aW9uLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIHJlZ2lzdGVyIChwYXRoLCByYXdNb2R1bGUsIHJ1bnRpbWUpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICBpZiAoIHJ1bnRpbWUgPT09IHZvaWQgMCApIHJ1bnRpbWUgPSB0cnVlO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0UmF3TW9kdWxlKHBhdGgsIHJhd01vZHVsZSk7XG4gIH1cblxuICB2YXIgbmV3TW9kdWxlID0gbmV3IE1vZHVsZShyYXdNb2R1bGUsIHJ1bnRpbWUpO1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICB0aGlzLnJvb3QgPSBuZXdNb2R1bGU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0KHBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICBwYXJlbnQuYWRkQ2hpbGQocGF0aFtwYXRoLmxlbmd0aCAtIDFdLCBuZXdNb2R1bGUpO1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgbmVzdGVkIG1vZHVsZXNcbiAgaWYgKHJhd01vZHVsZS5tb2R1bGVzKSB7XG4gICAgZm9yRWFjaFZhbHVlKHJhd01vZHVsZS5tb2R1bGVzLCBmdW5jdGlvbiAocmF3Q2hpbGRNb2R1bGUsIGtleSkge1xuICAgICAgdGhpcyQxLnJlZ2lzdGVyKHBhdGguY29uY2F0KGtleSksIHJhd0NoaWxkTW9kdWxlLCBydW50aW1lKTtcbiAgICB9KTtcbiAgfVxufTtcblxuTW9kdWxlQ29sbGVjdGlvbi5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIHVucmVnaXN0ZXIgKHBhdGgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0KHBhdGguc2xpY2UoMCwgLTEpKTtcbiAgdmFyIGtleSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgaWYgKCFwYXJlbnQuZ2V0Q2hpbGQoa2V5KS5ydW50aW1lKSB7IHJldHVybiB9XG5cbiAgcGFyZW50LnJlbW92ZUNoaWxkKGtleSk7XG59O1xuXG5mdW5jdGlvbiB1cGRhdGUgKHBhdGgsIHRhcmdldE1vZHVsZSwgbmV3TW9kdWxlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0UmF3TW9kdWxlKHBhdGgsIG5ld01vZHVsZSk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGFyZ2V0IG1vZHVsZVxuICB0YXJnZXRNb2R1bGUudXBkYXRlKG5ld01vZHVsZSk7XG5cbiAgLy8gdXBkYXRlIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChuZXdNb2R1bGUubW9kdWxlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBuZXdNb2R1bGUubW9kdWxlcykge1xuICAgICAgaWYgKCF0YXJnZXRNb2R1bGUuZ2V0Q2hpbGQoa2V5KSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIFwiW3Z1ZXhdIHRyeWluZyB0byBhZGQgYSBuZXcgbW9kdWxlICdcIiArIGtleSArIFwiJyBvbiBob3QgcmVsb2FkaW5nLCBcIiArXG4gICAgICAgICAgICAnbWFudWFsIHJlbG9hZCBpcyBuZWVkZWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShcbiAgICAgICAgcGF0aC5jb25jYXQoa2V5KSxcbiAgICAgICAgdGFyZ2V0TW9kdWxlLmdldENoaWxkKGtleSksXG4gICAgICAgIG5ld01vZHVsZS5tb2R1bGVzW2tleV1cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbnZhciBmdW5jdGlvbkFzc2VydCA9IHtcbiAgYXNzZXJ0OiBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJzsgfSxcbiAgZXhwZWN0ZWQ6ICdmdW5jdGlvbidcbn07XG5cbnZhciBvYmplY3RBc3NlcnQgPSB7XG4gIGFzc2VydDogZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgfHxcbiAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUuaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJyk7IH0sXG4gIGV4cGVjdGVkOiAnZnVuY3Rpb24gb3Igb2JqZWN0IHdpdGggXCJoYW5kbGVyXCIgZnVuY3Rpb24nXG59O1xuXG52YXIgYXNzZXJ0VHlwZXMgPSB7XG4gIGdldHRlcnM6IGZ1bmN0aW9uQXNzZXJ0LFxuICBtdXRhdGlvbnM6IGZ1bmN0aW9uQXNzZXJ0LFxuICBhY3Rpb25zOiBvYmplY3RBc3NlcnRcbn07XG5cbmZ1bmN0aW9uIGFzc2VydFJhd01vZHVsZSAocGF0aCwgcmF3TW9kdWxlKSB7XG4gIE9iamVjdC5rZXlzKGFzc2VydFR5cGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIXJhd01vZHVsZVtrZXldKSB7IHJldHVybiB9XG5cbiAgICB2YXIgYXNzZXJ0T3B0aW9ucyA9IGFzc2VydFR5cGVzW2tleV07XG5cbiAgICBmb3JFYWNoVmFsdWUocmF3TW9kdWxlW2tleV0sIGZ1bmN0aW9uICh2YWx1ZSwgdHlwZSkge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBhc3NlcnRPcHRpb25zLmFzc2VydCh2YWx1ZSksXG4gICAgICAgIG1ha2VBc3NlcnRpb25NZXNzYWdlKHBhdGgsIGtleSwgdHlwZSwgdmFsdWUsIGFzc2VydE9wdGlvbnMuZXhwZWN0ZWQpXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbWFrZUFzc2VydGlvbk1lc3NhZ2UgKHBhdGgsIGtleSwgdHlwZSwgdmFsdWUsIGV4cGVjdGVkKSB7XG4gIHZhciBidWYgPSBrZXkgKyBcIiBzaG91bGQgYmUgXCIgKyBleHBlY3RlZCArIFwiIGJ1dCBcXFwiXCIgKyBrZXkgKyBcIi5cIiArIHR5cGUgKyBcIlxcXCJcIjtcbiAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgIGJ1ZiArPSBcIiBpbiBtb2R1bGUgXFxcIlwiICsgKHBhdGguam9pbignLicpKSArIFwiXFxcIlwiO1xuICB9XG4gIGJ1ZiArPSBcIiBpcyBcIiArIChKU09OLnN0cmluZ2lmeSh2YWx1ZSkpICsgXCIuXCI7XG4gIHJldHVybiBidWZcbn1cblxudmFyIFZ1ZTsgLy8gYmluZCBvbiBpbnN0YWxsXG5cbnZhciBTdG9yZSA9IGZ1bmN0aW9uIFN0b3JlIChvcHRpb25zKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICAvLyBBdXRvIGluc3RhbGwgaWYgaXQgaXMgbm90IGRvbmUgeWV0IGFuZCBgd2luZG93YCBoYXMgYFZ1ZWAuXG4gIC8vIFRvIGFsbG93IHVzZXJzIHRvIGF2b2lkIGF1dG8taW5zdGFsbGF0aW9uIGluIHNvbWUgY2FzZXMsXG4gIC8vIHRoaXMgY29kZSBzaG91bGQgYmUgcGxhY2VkIGhlcmUuIFNlZSAjNzMxXG4gIGlmICghVnVlICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgICBpbnN0YWxsKHdpbmRvdy5WdWUpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnQoVnVlLCBcIm11c3QgY2FsbCBWdWUudXNlKFZ1ZXgpIGJlZm9yZSBjcmVhdGluZyBhIHN0b3JlIGluc3RhbmNlLlwiKTtcbiAgICBhc3NlcnQodHlwZW9mIFByb21pc2UgIT09ICd1bmRlZmluZWQnLCBcInZ1ZXggcmVxdWlyZXMgYSBQcm9taXNlIHBvbHlmaWxsIGluIHRoaXMgYnJvd3Nlci5cIik7XG4gICAgYXNzZXJ0KHRoaXMgaW5zdGFuY2VvZiBTdG9yZSwgXCJTdG9yZSBtdXN0IGJlIGNhbGxlZCB3aXRoIHRoZSBuZXcgb3BlcmF0b3IuXCIpO1xuICB9XG5cbiAgdmFyIHBsdWdpbnMgPSBvcHRpb25zLnBsdWdpbnM7IGlmICggcGx1Z2lucyA9PT0gdm9pZCAwICkgcGx1Z2lucyA9IFtdO1xuICB2YXIgc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3Q7IGlmICggc3RyaWN0ID09PSB2b2lkIDAgKSBzdHJpY3QgPSBmYWxzZTtcblxuICB2YXIgc3RhdGUgPSBvcHRpb25zLnN0YXRlOyBpZiAoIHN0YXRlID09PSB2b2lkIDAgKSBzdGF0ZSA9IHt9O1xuICBpZiAodHlwZW9mIHN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSgpIHx8IHt9O1xuICB9XG5cbiAgLy8gc3RvcmUgaW50ZXJuYWwgc3RhdGVcbiAgdGhpcy5fY29tbWl0dGluZyA9IGZhbHNlO1xuICB0aGlzLl9hY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fYWN0aW9uU3Vic2NyaWJlcnMgPSBbXTtcbiAgdGhpcy5fbXV0YXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fd3JhcHBlZEdldHRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9tb2R1bGVzID0gbmV3IE1vZHVsZUNvbGxlY3Rpb24ob3B0aW9ucyk7XG4gIHRoaXMuX21vZHVsZXNOYW1lc3BhY2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuICB0aGlzLl93YXRjaGVyVk0gPSBuZXcgVnVlKCk7XG5cbiAgLy8gYmluZCBjb21taXQgYW5kIGRpc3BhdGNoIHRvIHNlbGZcbiAgdmFyIHN0b3JlID0gdGhpcztcbiAgdmFyIHJlZiA9IHRoaXM7XG4gIHZhciBkaXNwYXRjaCA9IHJlZi5kaXNwYXRjaDtcbiAgdmFyIGNvbW1pdCA9IHJlZi5jb21taXQ7XG4gIHRoaXMuZGlzcGF0Y2ggPSBmdW5jdGlvbiBib3VuZERpc3BhdGNoICh0eXBlLCBwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoLmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQpXG4gIH07XG4gIHRoaXMuY29tbWl0ID0gZnVuY3Rpb24gYm91bmRDb21taXQgKHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY29tbWl0LmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpXG4gIH07XG5cbiAgLy8gc3RyaWN0IG1vZGVcbiAgdGhpcy5zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgLy8gaW5pdCByb290IG1vZHVsZS5cbiAgLy8gdGhpcyBhbHNvIHJlY3Vyc2l2ZWx5IHJlZ2lzdGVycyBhbGwgc3ViLW1vZHVsZXNcbiAgLy8gYW5kIGNvbGxlY3RzIGFsbCBtb2R1bGUgZ2V0dGVycyBpbnNpZGUgdGhpcy5fd3JhcHBlZEdldHRlcnNcbiAgaW5zdGFsbE1vZHVsZSh0aGlzLCBzdGF0ZSwgW10sIHRoaXMuX21vZHVsZXMucm9vdCk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgdm0sIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgcmVhY3Rpdml0eVxuICAvLyAoYWxzbyByZWdpc3RlcnMgX3dyYXBwZWRHZXR0ZXJzIGFzIGNvbXB1dGVkIHByb3BlcnRpZXMpXG4gIHJlc2V0U3RvcmVWTSh0aGlzLCBzdGF0ZSk7XG5cbiAgLy8gYXBwbHkgcGx1Z2luc1xuICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikgeyByZXR1cm4gcGx1Z2luKHRoaXMkMSk7IH0pO1xuXG4gIGlmIChWdWUuY29uZmlnLmRldnRvb2xzKSB7XG4gICAgZGV2dG9vbFBsdWdpbih0aGlzKTtcbiAgfVxufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgc3RhdGU6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnN0YXRlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3ZtLl9kYXRhLiQkc3RhdGVcbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5zdGF0ZS5zZXQgPSBmdW5jdGlvbiAodikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydChmYWxzZSwgXCJVc2Ugc3RvcmUucmVwbGFjZVN0YXRlKCkgdG8gZXhwbGljaXQgcmVwbGFjZSBzdG9yZSBzdGF0ZS5cIik7XG4gIH1cbn07XG5cblN0b3JlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQgKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAvLyBjaGVjayBvYmplY3Qtc3R5bGUgY29tbWl0XG4gIHZhciByZWYgPSB1bmlmeU9iamVjdFN0eWxlKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpO1xuICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgdmFyIHBheWxvYWQgPSByZWYucGF5bG9hZDtcbiAgICB2YXIgb3B0aW9ucyA9IHJlZi5vcHRpb25zO1xuXG4gIHZhciBtdXRhdGlvbiA9IHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCB9O1xuICB2YXIgZW50cnkgPSB0aGlzLl9tdXRhdGlvbnNbdHlwZV07XG4gIGlmICghZW50cnkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gdW5rbm93biBtdXRhdGlvbiB0eXBlOiBcIiArIHR5cGUpKTtcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgZW50cnkuZm9yRWFjaChmdW5jdGlvbiBjb21taXRJdGVyYXRvciAoaGFuZGxlcikge1xuICAgICAgaGFuZGxlcihwYXlsb2FkKTtcbiAgICB9KTtcbiAgfSk7XG4gIHRoaXMuX3N1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YikgeyByZXR1cm4gc3ViKG11dGF0aW9uLCB0aGlzJDEuc3RhdGUpOyB9KTtcblxuICBpZiAoXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5zaWxlbnRcbiAgKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJbdnVleF0gbXV0YXRpb24gdHlwZTogXCIgKyB0eXBlICsgXCIuIFNpbGVudCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZC4gXCIgK1xuICAgICAgJ1VzZSB0aGUgZmlsdGVyIGZ1bmN0aW9uYWxpdHkgaW4gdGhlIHZ1ZS1kZXZ0b29scydcbiAgICApO1xuICB9XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCAoX3R5cGUsIF9wYXlsb2FkKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgLy8gY2hlY2sgb2JqZWN0LXN0eWxlIGRpc3BhdGNoXG4gIHZhciByZWYgPSB1bmlmeU9iamVjdFN0eWxlKF90eXBlLCBfcGF5bG9hZCk7XG4gICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICB2YXIgcGF5bG9hZCA9IHJlZi5wYXlsb2FkO1xuXG4gIHZhciBhY3Rpb24gPSB7IHR5cGU6IHR5cGUsIHBheWxvYWQ6IHBheWxvYWQgfTtcbiAgdmFyIGVudHJ5ID0gdGhpcy5fYWN0aW9uc1t0eXBlXTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGFjdGlvbiB0eXBlOiBcIiArIHR5cGUpKTtcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9hY3Rpb25TdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHsgcmV0dXJuIHN1YihhY3Rpb24sIHRoaXMkMS5zdGF0ZSk7IH0pO1xuXG4gIHJldHVybiBlbnRyeS5sZW5ndGggPiAxXG4gICAgPyBQcm9taXNlLmFsbChlbnRyeS5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIGhhbmRsZXIocGF5bG9hZCk7IH0pKVxuICAgIDogZW50cnlbMF0ocGF5bG9hZClcbn07XG5cblN0b3JlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUgKGZuKSB7XG4gIHJldHVybiBnZW5lcmljU3Vic2NyaWJlKGZuLCB0aGlzLl9zdWJzY3JpYmVycylcbn07XG5cblN0b3JlLnByb3RvdHlwZS5zdWJzY3JpYmVBY3Rpb24gPSBmdW5jdGlvbiBzdWJzY3JpYmVBY3Rpb24gKGZuKSB7XG4gIHJldHVybiBnZW5lcmljU3Vic2NyaWJlKGZuLCB0aGlzLl9hY3Rpb25TdWJzY3JpYmVycylcbn07XG5cblN0b3JlLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoIChnZXR0ZXIsIGNiLCBvcHRpb25zKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnQodHlwZW9mIGdldHRlciA9PT0gJ2Z1bmN0aW9uJywgXCJzdG9yZS53YXRjaCBvbmx5IGFjY2VwdHMgYSBmdW5jdGlvbi5cIik7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX3dhdGNoZXJWTS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0dGVyKHRoaXMkMS5zdGF0ZSwgdGhpcyQxLmdldHRlcnMpOyB9LCBjYiwgb3B0aW9ucylcbn07XG5cblN0b3JlLnByb3RvdHlwZS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiByZXBsYWNlU3RhdGUgKHN0YXRlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcyQxLl92bS5fZGF0YS4kJHN0YXRlID0gc3RhdGU7XG4gIH0pO1xufTtcblxuU3RvcmUucHJvdG90eXBlLnJlZ2lzdGVyTW9kdWxlID0gZnVuY3Rpb24gcmVnaXN0ZXJNb2R1bGUgKHBhdGgsIHJhd01vZHVsZSwgb3B0aW9ucykge1xuICAgIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHsgcGF0aCA9IFtwYXRoXTsgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KEFycmF5LmlzQXJyYXkocGF0aCksIFwibW9kdWxlIHBhdGggbXVzdCBiZSBhIHN0cmluZyBvciBhbiBBcnJheS5cIik7XG4gICAgYXNzZXJ0KHBhdGgubGVuZ3RoID4gMCwgJ2Nhbm5vdCByZWdpc3RlciB0aGUgcm9vdCBtb2R1bGUgYnkgdXNpbmcgcmVnaXN0ZXJNb2R1bGUuJyk7XG4gIH1cblxuICB0aGlzLl9tb2R1bGVzLnJlZ2lzdGVyKHBhdGgsIHJhd01vZHVsZSk7XG4gIGluc3RhbGxNb2R1bGUodGhpcywgdGhpcy5zdGF0ZSwgcGF0aCwgdGhpcy5fbW9kdWxlcy5nZXQocGF0aCksIG9wdGlvbnMucHJlc2VydmVTdGF0ZSk7XG4gIC8vIHJlc2V0IHN0b3JlIHRvIHVwZGF0ZSBnZXR0ZXJzLi4uXG4gIHJlc2V0U3RvcmVWTSh0aGlzLCB0aGlzLnN0YXRlKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS51bnJlZ2lzdGVyTW9kdWxlID0gZnVuY3Rpb24gdW5yZWdpc3Rlck1vZHVsZSAocGF0aCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHsgcGF0aCA9IFtwYXRoXTsgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KEFycmF5LmlzQXJyYXkocGF0aCksIFwibW9kdWxlIHBhdGggbXVzdCBiZSBhIHN0cmluZyBvciBhbiBBcnJheS5cIik7XG4gIH1cblxuICB0aGlzLl9tb2R1bGVzLnVucmVnaXN0ZXIocGF0aCk7XG4gIHRoaXMuX3dpdGhDb21taXQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnRTdGF0ZSA9IGdldE5lc3RlZFN0YXRlKHRoaXMkMS5zdGF0ZSwgcGF0aC5zbGljZSgwLCAtMSkpO1xuICAgIFZ1ZS5kZWxldGUocGFyZW50U3RhdGUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSk7XG4gIH0pO1xuICByZXNldFN0b3JlKHRoaXMpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmhvdFVwZGF0ZSA9IGZ1bmN0aW9uIGhvdFVwZGF0ZSAobmV3T3B0aW9ucykge1xuICB0aGlzLl9tb2R1bGVzLnVwZGF0ZShuZXdPcHRpb25zKTtcbiAgcmVzZXRTdG9yZSh0aGlzLCB0cnVlKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5fd2l0aENvbW1pdCA9IGZ1bmN0aW9uIF93aXRoQ29tbWl0IChmbikge1xuICB2YXIgY29tbWl0dGluZyA9IHRoaXMuX2NvbW1pdHRpbmc7XG4gIHRoaXMuX2NvbW1pdHRpbmcgPSB0cnVlO1xuICBmbigpO1xuICB0aGlzLl9jb21taXR0aW5nID0gY29tbWl0dGluZztcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBTdG9yZS5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG5mdW5jdGlvbiBnZW5lcmljU3Vic2NyaWJlIChmbiwgc3Vicykge1xuICBpZiAoc3Vicy5pbmRleE9mKGZuKSA8IDApIHtcbiAgICBzdWJzLnB1c2goZm4pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGkgPSBzdWJzLmluZGV4T2YoZm4pO1xuICAgIGlmIChpID4gLTEpIHtcbiAgICAgIHN1YnMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldFN0b3JlIChzdG9yZSwgaG90KSB7XG4gIHN0b3JlLl9hY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX211dGF0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHN0b3JlLl93cmFwcGVkR2V0dGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHN0b3JlLl9tb2R1bGVzTmFtZXNwYWNlTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIHN0YXRlID0gc3RvcmUuc3RhdGU7XG4gIC8vIGluaXQgYWxsIG1vZHVsZXNcbiAgaW5zdGFsbE1vZHVsZShzdG9yZSwgc3RhdGUsIFtdLCBzdG9yZS5fbW9kdWxlcy5yb290LCB0cnVlKTtcbiAgLy8gcmVzZXQgdm1cbiAgcmVzZXRTdG9yZVZNKHN0b3JlLCBzdGF0ZSwgaG90KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTdG9yZVZNIChzdG9yZSwgc3RhdGUsIGhvdCkge1xuICB2YXIgb2xkVm0gPSBzdG9yZS5fdm07XG5cbiAgLy8gYmluZCBzdG9yZSBwdWJsaWMgZ2V0dGVyc1xuICBzdG9yZS5nZXR0ZXJzID0ge307XG4gIHZhciB3cmFwcGVkR2V0dGVycyA9IHN0b3JlLl93cmFwcGVkR2V0dGVycztcbiAgdmFyIGNvbXB1dGVkID0ge307XG4gIGZvckVhY2hWYWx1ZSh3cmFwcGVkR2V0dGVycywgZnVuY3Rpb24gKGZuLCBrZXkpIHtcbiAgICAvLyB1c2UgY29tcHV0ZWQgdG8gbGV2ZXJhZ2UgaXRzIGxhenktY2FjaGluZyBtZWNoYW5pc21cbiAgICBjb21wdXRlZFtrZXldID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZm4oc3RvcmUpOyB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdG9yZS5nZXR0ZXJzLCBrZXksIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuX3ZtW2tleV07IH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlIC8vIGZvciBsb2NhbCBnZXR0ZXJzXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHVzZSBhIFZ1ZSBpbnN0YW5jZSB0byBzdG9yZSB0aGUgc3RhdGUgdHJlZVxuICAvLyBzdXBwcmVzcyB3YXJuaW5ncyBqdXN0IGluIGNhc2UgdGhlIHVzZXIgaGFzIGFkZGVkXG4gIC8vIHNvbWUgZnVua3kgZ2xvYmFsIG1peGluc1xuICB2YXIgc2lsZW50ID0gVnVlLmNvbmZpZy5zaWxlbnQ7XG4gIFZ1ZS5jb25maWcuc2lsZW50ID0gdHJ1ZTtcbiAgc3RvcmUuX3ZtID0gbmV3IFZ1ZSh7XG4gICAgZGF0YToge1xuICAgICAgJCRzdGF0ZTogc3RhdGVcbiAgICB9LFxuICAgIGNvbXB1dGVkOiBjb21wdXRlZFxuICB9KTtcbiAgVnVlLmNvbmZpZy5zaWxlbnQgPSBzaWxlbnQ7XG5cbiAgLy8gZW5hYmxlIHN0cmljdCBtb2RlIGZvciBuZXcgdm1cbiAgaWYgKHN0b3JlLnN0cmljdCkge1xuICAgIGVuYWJsZVN0cmljdE1vZGUoc3RvcmUpO1xuICB9XG5cbiAgaWYgKG9sZFZtKSB7XG4gICAgaWYgKGhvdCkge1xuICAgICAgLy8gZGlzcGF0Y2ggY2hhbmdlcyBpbiBhbGwgc3Vic2NyaWJlZCB3YXRjaGVyc1xuICAgICAgLy8gdG8gZm9yY2UgZ2V0dGVyIHJlLWV2YWx1YXRpb24gZm9yIGhvdCByZWxvYWRpbmcuXG4gICAgICBzdG9yZS5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9sZFZtLl9kYXRhLiQkc3RhdGUgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJldHVybiBvbGRWbS4kZGVzdHJveSgpOyB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsTW9kdWxlIChzdG9yZSwgcm9vdFN0YXRlLCBwYXRoLCBtb2R1bGUsIGhvdCkge1xuICB2YXIgaXNSb290ID0gIXBhdGgubGVuZ3RoO1xuICB2YXIgbmFtZXNwYWNlID0gc3RvcmUuX21vZHVsZXMuZ2V0TmFtZXNwYWNlKHBhdGgpO1xuXG4gIC8vIHJlZ2lzdGVyIGluIG5hbWVzcGFjZSBtYXBcbiAgaWYgKG1vZHVsZS5uYW1lc3BhY2VkKSB7XG4gICAgc3RvcmUuX21vZHVsZXNOYW1lc3BhY2VNYXBbbmFtZXNwYWNlXSA9IG1vZHVsZTtcbiAgfVxuXG4gIC8vIHNldCBzdGF0ZVxuICBpZiAoIWlzUm9vdCAmJiAhaG90KSB7XG4gICAgdmFyIHBhcmVudFN0YXRlID0gZ2V0TmVzdGVkU3RhdGUocm9vdFN0YXRlLCBwYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgdmFyIG1vZHVsZU5hbWUgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgc3RvcmUuX3dpdGhDb21taXQoZnVuY3Rpb24gKCkge1xuICAgICAgVnVlLnNldChwYXJlbnRTdGF0ZSwgbW9kdWxlTmFtZSwgbW9kdWxlLnN0YXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBsb2NhbCA9IG1vZHVsZS5jb250ZXh0ID0gbWFrZUxvY2FsQ29udGV4dChzdG9yZSwgbmFtZXNwYWNlLCBwYXRoKTtcblxuICBtb2R1bGUuZm9yRWFjaE11dGF0aW9uKGZ1bmN0aW9uIChtdXRhdGlvbiwga2V5KSB7XG4gICAgdmFyIG5hbWVzcGFjZWRUeXBlID0gbmFtZXNwYWNlICsga2V5O1xuICAgIHJlZ2lzdGVyTXV0YXRpb24oc3RvcmUsIG5hbWVzcGFjZWRUeXBlLCBtdXRhdGlvbiwgbG9jYWwpO1xuICB9KTtcblxuICBtb2R1bGUuZm9yRWFjaEFjdGlvbihmdW5jdGlvbiAoYWN0aW9uLCBrZXkpIHtcbiAgICB2YXIgdHlwZSA9IGFjdGlvbi5yb290ID8ga2V5IDogbmFtZXNwYWNlICsga2V5O1xuICAgIHZhciBoYW5kbGVyID0gYWN0aW9uLmhhbmRsZXIgfHwgYWN0aW9uO1xuICAgIHJlZ2lzdGVyQWN0aW9uKHN0b3JlLCB0eXBlLCBoYW5kbGVyLCBsb2NhbCk7XG4gIH0pO1xuXG4gIG1vZHVsZS5mb3JFYWNoR2V0dGVyKGZ1bmN0aW9uIChnZXR0ZXIsIGtleSkge1xuICAgIHZhciBuYW1lc3BhY2VkVHlwZSA9IG5hbWVzcGFjZSArIGtleTtcbiAgICByZWdpc3RlckdldHRlcihzdG9yZSwgbmFtZXNwYWNlZFR5cGUsIGdldHRlciwgbG9jYWwpO1xuICB9KTtcblxuICBtb2R1bGUuZm9yRWFjaENoaWxkKGZ1bmN0aW9uIChjaGlsZCwga2V5KSB7XG4gICAgaW5zdGFsbE1vZHVsZShzdG9yZSwgcm9vdFN0YXRlLCBwYXRoLmNvbmNhdChrZXkpLCBjaGlsZCwgaG90KTtcbiAgfSk7XG59XG5cbi8qKlxuICogbWFrZSBsb2NhbGl6ZWQgZGlzcGF0Y2gsIGNvbW1pdCwgZ2V0dGVycyBhbmQgc3RhdGVcbiAqIGlmIHRoZXJlIGlzIG5vIG5hbWVzcGFjZSwganVzdCB1c2Ugcm9vdCBvbmVzXG4gKi9cbmZ1bmN0aW9uIG1ha2VMb2NhbENvbnRleHQgKHN0b3JlLCBuYW1lc3BhY2UsIHBhdGgpIHtcbiAgdmFyIG5vTmFtZXNwYWNlID0gbmFtZXNwYWNlID09PSAnJztcblxuICB2YXIgbG9jYWwgPSB7XG4gICAgZGlzcGF0Y2g6IG5vTmFtZXNwYWNlID8gc3RvcmUuZGlzcGF0Y2ggOiBmdW5jdGlvbiAoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucykge1xuICAgICAgdmFyIGFyZ3MgPSB1bmlmeU9iamVjdFN0eWxlKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpO1xuICAgICAgdmFyIHBheWxvYWQgPSBhcmdzLnBheWxvYWQ7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3Mub3B0aW9ucztcbiAgICAgIHZhciB0eXBlID0gYXJncy50eXBlO1xuXG4gICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucm9vdCkge1xuICAgICAgICB0eXBlID0gbmFtZXNwYWNlICsgdHlwZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIXN0b3JlLl9hY3Rpb25zW3R5cGVdKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gdW5rbm93biBsb2NhbCBhY3Rpb24gdHlwZTogXCIgKyAoYXJncy50eXBlKSArIFwiLCBnbG9iYWwgdHlwZTogXCIgKyB0eXBlKSk7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0b3JlLmRpc3BhdGNoKHR5cGUsIHBheWxvYWQpXG4gICAgfSxcblxuICAgIGNvbW1pdDogbm9OYW1lc3BhY2UgPyBzdG9yZS5jb21taXQgOiBmdW5jdGlvbiAoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucykge1xuICAgICAgdmFyIGFyZ3MgPSB1bmlmeU9iamVjdFN0eWxlKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpO1xuICAgICAgdmFyIHBheWxvYWQgPSBhcmdzLnBheWxvYWQ7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3Mub3B0aW9ucztcbiAgICAgIHZhciB0eXBlID0gYXJncy50eXBlO1xuXG4gICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucm9vdCkge1xuICAgICAgICB0eXBlID0gbmFtZXNwYWNlICsgdHlwZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgIXN0b3JlLl9tdXRhdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGxvY2FsIG11dGF0aW9uIHR5cGU6IFwiICsgKGFyZ3MudHlwZSkgKyBcIiwgZ2xvYmFsIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0b3JlLmNvbW1pdCh0eXBlLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gZ2V0dGVycyBhbmQgc3RhdGUgb2JqZWN0IG11c3QgYmUgZ290dGVuIGxhemlseVxuICAvLyBiZWNhdXNlIHRoZXkgd2lsbCBiZSBjaGFuZ2VkIGJ5IHZtIHVwZGF0ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhsb2NhbCwge1xuICAgIGdldHRlcnM6IHtcbiAgICAgIGdldDogbm9OYW1lc3BhY2VcbiAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXR0ZXJzOyB9XG4gICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFrZUxvY2FsR2V0dGVycyhzdG9yZSwgbmFtZXNwYWNlKTsgfVxuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0TmVzdGVkU3RhdGUoc3RvcmUuc3RhdGUsIHBhdGgpOyB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbG9jYWxcbn1cblxuZnVuY3Rpb24gbWFrZUxvY2FsR2V0dGVycyAoc3RvcmUsIG5hbWVzcGFjZSkge1xuICB2YXIgZ2V0dGVyc1Byb3h5ID0ge307XG5cbiAgdmFyIHNwbGl0UG9zID0gbmFtZXNwYWNlLmxlbmd0aDtcbiAgT2JqZWN0LmtleXMoc3RvcmUuZ2V0dGVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIC8vIHNraXAgaWYgdGhlIHRhcmdldCBnZXR0ZXIgaXMgbm90IG1hdGNoIHRoaXMgbmFtZXNwYWNlXG4gICAgaWYgKHR5cGUuc2xpY2UoMCwgc3BsaXRQb3MpICE9PSBuYW1lc3BhY2UpIHsgcmV0dXJuIH1cblxuICAgIC8vIGV4dHJhY3QgbG9jYWwgZ2V0dGVyIHR5cGVcbiAgICB2YXIgbG9jYWxUeXBlID0gdHlwZS5zbGljZShzcGxpdFBvcyk7XG5cbiAgICAvLyBBZGQgYSBwb3J0IHRvIHRoZSBnZXR0ZXJzIHByb3h5LlxuICAgIC8vIERlZmluZSBhcyBnZXR0ZXIgcHJvcGVydHkgYmVjYXVzZVxuICAgIC8vIHdlIGRvIG5vdCB3YW50IHRvIGV2YWx1YXRlIHRoZSBnZXR0ZXJzIGluIHRoaXMgdGltZS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2V0dGVyc1Byb3h5LCBsb2NhbFR5cGUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0dGVyc1t0eXBlXTsgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGdldHRlcnNQcm94eVxufVxuXG5mdW5jdGlvbiByZWdpc3Rlck11dGF0aW9uIChzdG9yZSwgdHlwZSwgaGFuZGxlciwgbG9jYWwpIHtcbiAgdmFyIGVudHJ5ID0gc3RvcmUuX211dGF0aW9uc1t0eXBlXSB8fCAoc3RvcmUuX211dGF0aW9uc1t0eXBlXSA9IFtdKTtcbiAgZW50cnkucHVzaChmdW5jdGlvbiB3cmFwcGVkTXV0YXRpb25IYW5kbGVyIChwYXlsb2FkKSB7XG4gICAgaGFuZGxlci5jYWxsKHN0b3JlLCBsb2NhbC5zdGF0ZSwgcGF5bG9hZCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckFjdGlvbiAoc3RvcmUsIHR5cGUsIGhhbmRsZXIsIGxvY2FsKSB7XG4gIHZhciBlbnRyeSA9IHN0b3JlLl9hY3Rpb25zW3R5cGVdIHx8IChzdG9yZS5fYWN0aW9uc1t0eXBlXSA9IFtdKTtcbiAgZW50cnkucHVzaChmdW5jdGlvbiB3cmFwcGVkQWN0aW9uSGFuZGxlciAocGF5bG9hZCwgY2IpIHtcbiAgICB2YXIgcmVzID0gaGFuZGxlci5jYWxsKHN0b3JlLCB7XG4gICAgICBkaXNwYXRjaDogbG9jYWwuZGlzcGF0Y2gsXG4gICAgICBjb21taXQ6IGxvY2FsLmNvbW1pdCxcbiAgICAgIGdldHRlcnM6IGxvY2FsLmdldHRlcnMsXG4gICAgICBzdGF0ZTogbG9jYWwuc3RhdGUsXG4gICAgICByb290R2V0dGVyczogc3RvcmUuZ2V0dGVycyxcbiAgICAgIHJvb3RTdGF0ZTogc3RvcmUuc3RhdGVcbiAgICB9LCBwYXlsb2FkLCBjYik7XG4gICAgaWYgKCFpc1Byb21pc2UocmVzKSkge1xuICAgICAgcmVzID0gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgfVxuICAgIGlmIChzdG9yZS5fZGV2dG9vbEhvb2spIHtcbiAgICAgIHJldHVybiByZXMuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBzdG9yZS5fZGV2dG9vbEhvb2suZW1pdCgndnVleDplcnJvcicsIGVycik7XG4gICAgICAgIHRocm93IGVyclxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyR2V0dGVyIChzdG9yZSwgdHlwZSwgcmF3R2V0dGVyLCBsb2NhbCkge1xuICBpZiAoc3RvcmUuX3dyYXBwZWRHZXR0ZXJzW3R5cGVdKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIGR1cGxpY2F0ZSBnZXR0ZXIga2V5OiBcIiArIHR5cGUpKTtcbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgc3RvcmUuX3dyYXBwZWRHZXR0ZXJzW3R5cGVdID0gZnVuY3Rpb24gd3JhcHBlZEdldHRlciAoc3RvcmUpIHtcbiAgICByZXR1cm4gcmF3R2V0dGVyKFxuICAgICAgbG9jYWwuc3RhdGUsIC8vIGxvY2FsIHN0YXRlXG4gICAgICBsb2NhbC5nZXR0ZXJzLCAvLyBsb2NhbCBnZXR0ZXJzXG4gICAgICBzdG9yZS5zdGF0ZSwgLy8gcm9vdCBzdGF0ZVxuICAgICAgc3RvcmUuZ2V0dGVycyAvLyByb290IGdldHRlcnNcbiAgICApXG4gIH07XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVN0cmljdE1vZGUgKHN0b3JlKSB7XG4gIHN0b3JlLl92bS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZGF0YS4kJHN0YXRlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgYXNzZXJ0KHN0b3JlLl9jb21taXR0aW5nLCBcIkRvIG5vdCBtdXRhdGUgdnVleCBzdG9yZSBzdGF0ZSBvdXRzaWRlIG11dGF0aW9uIGhhbmRsZXJzLlwiKTtcbiAgICB9XG4gIH0sIHsgZGVlcDogdHJ1ZSwgc3luYzogdHJ1ZSB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TmVzdGVkU3RhdGUgKHN0YXRlLCBwYXRoKSB7XG4gIHJldHVybiBwYXRoLmxlbmd0aFxuICAgID8gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKHN0YXRlLCBrZXkpIHsgcmV0dXJuIHN0YXRlW2tleV07IH0sIHN0YXRlKVxuICAgIDogc3RhdGVcbn1cblxuZnVuY3Rpb24gdW5pZnlPYmplY3RTdHlsZSAodHlwZSwgcGF5bG9hZCwgb3B0aW9ucykge1xuICBpZiAoaXNPYmplY3QodHlwZSkgJiYgdHlwZS50eXBlKSB7XG4gICAgb3B0aW9ucyA9IHBheWxvYWQ7XG4gICAgcGF5bG9hZCA9IHR5cGU7XG4gICAgdHlwZSA9IHR5cGUudHlwZTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJywgKFwiRXhwZWN0cyBzdHJpbmcgYXMgdGhlIHR5cGUsIGJ1dCBmb3VuZCBcIiArICh0eXBlb2YgdHlwZSkgKyBcIi5cIikpO1xuICB9XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCwgb3B0aW9uczogb3B0aW9ucyB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGwgKF9WdWUpIHtcbiAgaWYgKFZ1ZSAmJiBfVnVlID09PSBWdWUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ1t2dWV4XSBhbHJlYWR5IGluc3RhbGxlZC4gVnVlLnVzZShWdWV4KSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgb25jZS4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICBWdWUgPSBfVnVlO1xuICBhcHBseU1peGluKFZ1ZSk7XG59XG5cbnZhciBtYXBTdGF0ZSA9IG5vcm1hbGl6ZU5hbWVzcGFjZShmdW5jdGlvbiAobmFtZXNwYWNlLCBzdGF0ZXMpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBub3JtYWxpemVNYXAoc3RhdGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICB2YXIgdmFsID0gcmVmLnZhbDtcblxuICAgIHJlc1trZXldID0gZnVuY3Rpb24gbWFwcGVkU3RhdGUgKCkge1xuICAgICAgdmFyIHN0YXRlID0gdGhpcy4kc3RvcmUuc3RhdGU7XG4gICAgICB2YXIgZ2V0dGVycyA9IHRoaXMuJHN0b3JlLmdldHRlcnM7XG4gICAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAgIHZhciBtb2R1bGUgPSBnZXRNb2R1bGVCeU5hbWVzcGFjZSh0aGlzLiRzdG9yZSwgJ21hcFN0YXRlJywgbmFtZXNwYWNlKTtcbiAgICAgICAgaWYgKCFtb2R1bGUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBzdGF0ZSA9IG1vZHVsZS5jb250ZXh0LnN0YXRlO1xuICAgICAgICBnZXR0ZXJzID0gbW9kdWxlLmNvbnRleHQuZ2V0dGVycztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdmFsLmNhbGwodGhpcywgc3RhdGUsIGdldHRlcnMpXG4gICAgICAgIDogc3RhdGVbdmFsXVxuICAgIH07XG4gICAgLy8gbWFyayB2dWV4IGdldHRlciBmb3IgZGV2dG9vbHNcbiAgICByZXNba2V5XS52dWV4ID0gdHJ1ZTtcbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG52YXIgbWFwTXV0YXRpb25zID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIG11dGF0aW9ucykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChtdXRhdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBrZXkgPSByZWYua2V5O1xuICAgIHZhciB2YWwgPSByZWYudmFsO1xuXG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRNdXRhdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgdmFyIGNvbW1pdCA9IHRoaXMuJHN0b3JlLmNvbW1pdDtcbiAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgdmFyIG1vZHVsZSA9IGdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwTXV0YXRpb25zJywgbmFtZXNwYWNlKTtcbiAgICAgICAgaWYgKCFtb2R1bGUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBjb21taXQgPSBtb2R1bGUuY29udGV4dC5jb21taXQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHZhbC5hcHBseSh0aGlzLCBbY29tbWl0XS5jb25jYXQoYXJncykpXG4gICAgICAgIDogY29tbWl0LmFwcGx5KHRoaXMuJHN0b3JlLCBbdmFsXS5jb25jYXQoYXJncykpXG4gICAgfTtcbiAgfSk7XG4gIHJldHVybiByZXNcbn0pO1xuXG52YXIgbWFwR2V0dGVycyA9IG5vcm1hbGl6ZU5hbWVzcGFjZShmdW5jdGlvbiAobmFtZXNwYWNlLCBnZXR0ZXJzKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgbm9ybWFsaXplTWFwKGdldHRlcnMpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBrZXkgPSByZWYua2V5O1xuICAgIHZhciB2YWwgPSByZWYudmFsO1xuXG4gICAgdmFsID0gbmFtZXNwYWNlICsgdmFsO1xuICAgIHJlc1trZXldID0gZnVuY3Rpb24gbWFwcGVkR2V0dGVyICgpIHtcbiAgICAgIGlmIChuYW1lc3BhY2UgJiYgIWdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwR2V0dGVycycsIG5hbWVzcGFjZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhKHZhbCBpbiB0aGlzLiRzdG9yZS5nZXR0ZXJzKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGdldHRlcjogXCIgKyB2YWwpKTtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZ2V0dGVyc1t2YWxdXG4gICAgfTtcbiAgICAvLyBtYXJrIHZ1ZXggZ2V0dGVyIGZvciBkZXZ0b29sc1xuICAgIHJlc1trZXldLnZ1ZXggPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBBY3Rpb25zID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIGFjdGlvbnMpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBub3JtYWxpemVNYXAoYWN0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZEFjdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgdmFyIGRpc3BhdGNoID0gdGhpcy4kc3RvcmUuZGlzcGF0Y2g7XG4gICAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAgIHZhciBtb2R1bGUgPSBnZXRNb2R1bGVCeU5hbWVzcGFjZSh0aGlzLiRzdG9yZSwgJ21hcEFjdGlvbnMnLCBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGRpc3BhdGNoID0gbW9kdWxlLmNvbnRleHQuZGlzcGF0Y2g7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHZhbC5hcHBseSh0aGlzLCBbZGlzcGF0Y2hdLmNvbmNhdChhcmdzKSlcbiAgICAgICAgOiBkaXNwYXRjaC5hcHBseSh0aGlzLiRzdG9yZSwgW3ZhbF0uY29uY2F0KGFyZ3MpKVxuICAgIH07XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxudmFyIGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSkgeyByZXR1cm4gKHtcbiAgbWFwU3RhdGU6IG1hcFN0YXRlLmJpbmQobnVsbCwgbmFtZXNwYWNlKSxcbiAgbWFwR2V0dGVyczogbWFwR2V0dGVycy5iaW5kKG51bGwsIG5hbWVzcGFjZSksXG4gIG1hcE11dGF0aW9uczogbWFwTXV0YXRpb25zLmJpbmQobnVsbCwgbmFtZXNwYWNlKSxcbiAgbWFwQWN0aW9uczogbWFwQWN0aW9ucy5iaW5kKG51bGwsIG5hbWVzcGFjZSlcbn0pOyB9O1xuXG5mdW5jdGlvbiBub3JtYWxpemVNYXAgKG1hcCkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShtYXApXG4gICAgPyBtYXAubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICh7IGtleToga2V5LCB2YWw6IGtleSB9KTsgfSlcbiAgICA6IE9iamVjdC5rZXlzKG1hcCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuICh7IGtleToga2V5LCB2YWw6IG1hcFtrZXldIH0pOyB9KVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lc3BhY2UgKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAobmFtZXNwYWNlLCBtYXApIHtcbiAgICBpZiAodHlwZW9mIG5hbWVzcGFjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG1hcCA9IG5hbWVzcGFjZTtcbiAgICAgIG5hbWVzcGFjZSA9ICcnO1xuICAgIH0gZWxzZSBpZiAobmFtZXNwYWNlLmNoYXJBdChuYW1lc3BhY2UubGVuZ3RoIC0gMSkgIT09ICcvJykge1xuICAgICAgbmFtZXNwYWNlICs9ICcvJztcbiAgICB9XG4gICAgcmV0dXJuIGZuKG5hbWVzcGFjZSwgbWFwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldE1vZHVsZUJ5TmFtZXNwYWNlIChzdG9yZSwgaGVscGVyLCBuYW1lc3BhY2UpIHtcbiAgdmFyIG1vZHVsZSA9IHN0b3JlLl9tb2R1bGVzTmFtZXNwYWNlTWFwW25hbWVzcGFjZV07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFtb2R1bGUpIHtcbiAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSBtb2R1bGUgbmFtZXNwYWNlIG5vdCBmb3VuZCBpbiBcIiArIGhlbHBlciArIFwiKCk6IFwiICsgbmFtZXNwYWNlKSk7XG4gIH1cbiAgcmV0dXJuIG1vZHVsZVxufVxuXG52YXIgaW5kZXhfZXNtID0ge1xuICBTdG9yZTogU3RvcmUsXG4gIGluc3RhbGw6IGluc3RhbGwsXG4gIHZlcnNpb246ICczLjAuMScsXG4gIG1hcFN0YXRlOiBtYXBTdGF0ZSxcbiAgbWFwTXV0YXRpb25zOiBtYXBNdXRhdGlvbnMsXG4gIG1hcEdldHRlcnM6IG1hcEdldHRlcnMsXG4gIG1hcEFjdGlvbnM6IG1hcEFjdGlvbnMsXG4gIGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzOiBjcmVhdGVOYW1lc3BhY2VkSGVscGVyc1xufTtcblxuZXhwb3J0IHsgU3RvcmUsIGluc3RhbGwsIG1hcFN0YXRlLCBtYXBNdXRhdGlvbnMsIG1hcEdldHRlcnMsIG1hcEFjdGlvbnMsIGNyZWF0ZU5hbWVzcGFjZWRIZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBpbmRleF9lc207XG4iLCJcbiAgICAgICAgXG4gICAgICAgIGltcG9ydCAndW5pLWFwcC1zdHlsZSdcbiAgICAgICAgaW1wb3J0IEFwcCBmcm9tICcuL3BhZ2VzL2luZGV4L2luZGV4Lm52dWU/bXBUeXBlPXBhZ2UnXG4gICAgICAgIEFwcC5tcFR5cGUgPSAncGFnZSdcbiAgICAgICAgQXBwLnJvdXRlID0gJ3BhZ2VzL2luZGV4L2luZGV4J1xuICAgICAgICBBcHAuZWwgPSAnI3Jvb3QnXG4gICAgICAgIG5ldyBWdWUoQXBwKVxuICAgICAgICAiLCJWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18gPSB7fVxuVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3NcIikuZGVmYXVsdCxWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pXG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzc1wiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzc1wiIiwibW9kdWxlLmV4cG9ydHMgPSB7fSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vaW5kZXgubnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1iODIyOWJjYyZzY29wZWQ9dHJ1ZSZtcFR5cGU9cGFnZVwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vaW5kZXgubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiXG5leHBvcnQgKiBmcm9tIFwiLi9pbmRleC5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJm1wVHlwZT1wYWdlXCJcbmZ1bmN0aW9uIGluamVjdFN0eWxlcyAoY29udGV4dCkge1xuICBcbiAgaWYoIXRoaXMub3B0aW9ucy5zdHlsZSl7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0ge31cbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSAmJiBWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pe1xuICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUoVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fLCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUpe1xuICAgICAgICAgICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9pbmRleC5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YjgyMjliY2Mmc2NvcGVkPXRydWUmbGFuZz1jc3MmbXBUeXBlPXBhZ2VcIikuZGVmYXVsdCwgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMuc3R5bGUscmVxdWlyZShcIi4vaW5kZXgubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPWI4MjI5YmNjJnNjb3BlZD10cnVlJmxhbmc9Y3NzJm1wVHlwZT1wYWdlXCIpLmRlZmF1bHQpXG4gICAgICAgICAgICB9XG5cbn1cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYjgyMjliY2NcIixcbiAgXCI1YjM4OGNjN1wiLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuaW5qZWN0U3R5bGVzLmNhbGwoY29tcG9uZW50KVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJoYnVpbGRlclByb2plY3RzL3VuaS1ib29rcy9wYWdlcy9pbmRleC9pbmRleC5udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLWhidWlsZGVyeC9wYWNrYWdlcy93ZWJwYWNrLXVuaS1udnVlLWxvYWRlci9saWIvdGVtcGxhdGUuanMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXVuaS1hcHAtbG9hZGVyL3BhZ2UtbWV0YS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luZGV4Lm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YjgyMjliY2Mmc2NvcGVkPXRydWUmbXBUeXBlPXBhZ2VcIiIsInZhciBjb21wb25lbnRzID0ge1xuICBcIm5hdi1iYXJcIjogcmVxdWlyZShcIkAvY29tcG9uZW50cy9uYXYtYmFyL25hdi1iYXIubnZ1ZVwiKS5kZWZhdWx0LFxuICBcImMtaWNvblwiOiByZXF1aXJlKFwiQC9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZVwiKS5kZWZhdWx0LFxuICBcImZpeGVkLWJ1dHRvblwiOiByZXF1aXJlKFwiQC9jb21wb25lbnRzL2ZpeGVkLWJ1dHRvbi9maXhlZC1idXR0b24ubnZ1ZVwiKS5kZWZhdWx0XG59XG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidmlld1wiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBbXCJpbmRleFwiXSxcbiAgICAgIHN0eWxlOiB7IFwiYmFja2dyb3VuZC1jb2xvclwiOiBfdm0uc2tpbkNvbG9yLmJnQ29sb3IgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIHRvdWNoc3RhcnQ6IF92bS50b3VjaHN0YXJ0LFxuICAgICAgICB0b3VjaG1vdmU6IF92bS50b3VjaG1vdmUsXG4gICAgICAgIHRvdWNoZW5kOiBfdm0udG91Y2hlbmRcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIm5hdi1iYXJcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICB0aXRsZUNvbG9yOiBfdm0uc2tpbkNvbG9yLmljb25Db2xvcixcbiAgICAgICAgICAgIHRpdGxlOiBcIuWlveeUqOmYheivu+WZqFwiLFxuICAgICAgICAgICAgYmFja1Nob3c6IGZhbHNlLFxuICAgICAgICAgICAgY1dpZHRoOiA0MjBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogW1wibmF2LWxlZnRcIl0sXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwibGVmdFwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgX3ZtLiRyZWZzLmxlZnRNZW51LnNob3coKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2xvdDogXCJsZWZ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiYy1pY29uXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZW51XCIsXG4gICAgICAgICAgICAgICAgICBzaXplOiBcIjI1XCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgc2xvdDogXCJyaWdodFwiIH0sIHNsb3Q6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgICBzaXplOiBcIjI1XCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgc2xvdDogXCJyaWdodFwiIH0sIHNsb3Q6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyXCIsXG4gICAgICAgICAgICAgICAgICBzaXplOiBcIjI1XCIsXG4gICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgc2xvdDogXCJyaWdodFwiIH0sIHNsb3Q6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9yZVwiLFxuICAgICAgICAgICAgICAgICAgc2l6ZTogXCIyNVwiLFxuICAgICAgICAgICAgICAgICAgY29sb3I6IF92bS5za2luQ29sb3IuaWNvbkNvbG9yXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF1cbiAgICAgICksXG4gICAgICBfYyhcbiAgICAgICAgXCJ3YXRlcmZhbGxcIixcbiAgICAgICAge1xuICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICBjb2x1bW5Db3VudDogXCI8aW50ZWdlcj5cIixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBcIjEyMFwiLFxuICAgICAgICAgICAgY29sdW1uR2FwOiBcIjEwXCIsXG4gICAgICAgICAgICBsZWZ0R2FwOiBcIjEwXCIsXG4gICAgICAgICAgICByaWdodEdhcDogXCIxMFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbjogeyBzY3JvbGw6IF92bS5zY3JvbGwgfVxuICAgICAgICB9LFxuICAgICAgICBfdm0uX2woX3ZtLmJvb2tzLCBmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwiY2VsbFwiLFxuICAgICAgICAgICAgeyBrZXk6IGl0ZW0uaWQsIGFwcGVuZEFzVHJlZTogdHJ1ZSwgYXR0cnM6IHsgYXBwZW5kOiBcInRyZWVcIiB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAgICAgIHsgcmVmOiBcImxpc3RcIiwgcmVmSW5Gb3I6IHRydWUsIHN0YXRpY0NsYXNzOiBbXCJib29rXCJdIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ1LWltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFtcImJvb2staW1nXCJdLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IFwiLi4vLi4vc3RhdGljL2xvZ28ucG5nXCIsIG1vZGU6IFwiYXNwZWN0RmlsbFwiIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2aWV3XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFtcImJvb2stbWFza1wiXSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgb3BhY2l0eTogX3ZtLnNraW5Db2xvci5pbWdNYXNrIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJ2aWV3XCIsIHsgc3RhdGljQ2xhc3M6IFtcImJvb2stYm90dG9tXCJdIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJ1LXRleHRcIiwgeyBzdGF0aWNDbGFzczogW1wiYm9vay1uYW1lXCJdIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCLlvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZdcIilcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF9jKFwidmlld1wiLCB7IHN0YXRpY0NsYXNzOiBbXCJiLWJvdHRvbVwiXSB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJ1LXRleHRcIiwgeyBzdGF0aWNDbGFzczogW1wiYm9vay10aW1lXCJdIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIjIwMTktMDUtMTVcIilcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcInUtdGV4dFwiLCB7IHN0YXRpY0NsYXNzOiBbXCJib29rLXByb2dyZXNzXCJdIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIjMzLjMzJVwiKVxuICAgICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBpbmRleCA9PSBfdm0uYm9va3MubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgID8gX2MoXCJ2aWV3XCIsIHsgc3RhdGljU3R5bGU6IHsgaGVpZ2h0OiBcIjEwcHhcIiB9IH0pXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgfSksXG4gICAgICAgIDBcbiAgICAgICksXG4gICAgICBfYyhcInZpZXdcIiwgeyBzdGF0aWNDbGFzczogW1wiZml4ZWRcIl0gfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJmaXhlZC1idXR0b25cIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyBzaG93OiBfdm0uYnRuU2hvdyB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImhpc3RvcnlcIixcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogXCIyNVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgIHsgb246IHsgY2xpY2s6IF92bS5jbGVhciB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwiZml4ZWQtYnV0dG9uXCIsXG4gICAgICAgICAgICAgIHsgYXR0cnM6IHsgc2hvdzogX3ZtLmJ0blNob3cgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJjLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjbGVhci1maWxsXCIsXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IFwiMjVcIixcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IF92bS5za2luQ29sb3IuaWNvbkNvbG9yXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICB7IG9uOiB7IGNsaWNrOiBfdm0uc2Nyb2xsVG9wIH0gfSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJmaXhlZC1idXR0b25cIixcbiAgICAgICAgICAgICAgeyBhdHRyczogeyBzaG93OiBNYXRoLmFicyhfdm0ub2xkT2Zmc2V0WSkgPiAzMDAgfSB9LFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgX2MoXCJjLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b3BcIixcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogXCIyNVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAxXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSxcbiAgICAgICAgICAxXG4gICAgICAgIClcbiAgICAgIF0pLFxuICAgICAgX2MoXCJjLW1lbnVcIiwge1xuICAgICAgICByZWY6IFwibGVmdE1lbnVcIixcbiAgICAgICAgYXR0cnM6IHsgdHJhbnNsYXRlOiBfdm0ubWVudUxhdGUsIG9wYWNpdHk6IF92bS5tZW51T3BhYyB9XG4gICAgICB9KVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgcmVjeWNsYWJsZVJlbmRlciA9IGZhbHNlXG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSBmcm9tIFwiLi9uYXYtYmFyLm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDUwMjY4MmUmc2NvcGVkPXRydWUmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9uYXYtYmFyLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL25hdi1iYXIubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZnVuY3Rpb24gaW5qZWN0U3R5bGVzIChjb250ZXh0KSB7XG4gIFxuICBpZighdGhpcy5vcHRpb25zLnN0eWxlKXtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuc3R5bGUgPSB7fVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlICYmIFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXyl7XG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18sIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSl7XG4gICAgICAgICAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKHJlcXVpcmUoXCIuL25hdi1iYXIubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ1MDI2ODJlJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiKS5kZWZhdWx0LCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5zdHlsZSxyZXF1aXJlKFwiLi9uYXYtYmFyLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NTAyNjgyZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0NTAyNjgyZVwiLFxuICBcIjU1M2E1NWQ1XCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImhidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL2NvbXBvbmVudHMvbmF2LWJhci9uYXYtYmFyLm52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS5yZWN5Y2xlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbmF2LWJhci5udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1MDI2ODJlJnNjb3BlZD10cnVlJlwiIiwidmFyIGNvbXBvbmVudHMgPSB7XG4gIFwiYy1pY29uXCI6IHJlcXVpcmUoXCJAL2NvbXBvbmVudHMvYy1pY29uL2MtaWNvbi5udnVlXCIpLmRlZmF1bHRcbn1cbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ2aWV3XCIsXG4gICAge1xuICAgICAgc3RhdGljQ2xhc3M6IFtcIm5hdi1iYXJcIl0sXG4gICAgICBzdHlsZTogeyBcImJhY2tncm91bmQtY29sb3JcIjogX3ZtLnNraW5Db2xvci5uYXZDb2xvciB9XG4gICAgfSxcbiAgICBbXG4gICAgICBfYyhcInZpZXdcIiwgeyBzdGF0aWNDbGFzczogW1wiYmFyXCJdLCBzdHlsZTogeyBoZWlnaHQ6IF92bS5iYXJIZWlnaHQgfSB9KSxcbiAgICAgIF9jKFwidmlld1wiLCB7IHN0YXRpY0NsYXNzOiBbXCJuYXZcIl0gfSwgW1xuICAgICAgICBfYyhcbiAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBbXCJsZWZ0XCJdIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX3ZtLl90KFwibGVmdFwiKSxcbiAgICAgICAgICAgIF92bS5iYWNrU2hvd1xuICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgXCJ2aWV3XCIsXG4gICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBbXCJiYWNrXCJdLCBvbjogeyBjbGljazogX3ZtLmJhY2sgfSB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJyb3ctbGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMjgsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5pY29uQ29sb3JcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMlxuICAgICAgICApLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBbXCJjZW50ZXJcIl0sIHN0eWxlOiB7IHdpZHRoOiBfdm0uY1dpZHRoICsgXCJycHhcIiB9IH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidS10ZXh0XCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFtcInRpdGxlXCJdLCBzdHlsZTogeyBjb2xvcjogX3ZtLnRpdGxlQ29sb3IgfSB9LFxuICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0udGl0bGUpKV1cbiAgICAgICAgICAgIClcbiAgICAgICAgICBdXG4gICAgICAgICksXG4gICAgICAgIF9jKFwidmlld1wiLCB7IHN0YXRpY0NsYXNzOiBbXCJyaWdodFwiXSB9LCBbX3ZtLl90KFwicmlnaHRcIildLCAyKVxuICAgICAgXSlcbiAgICBdXG4gIClcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL2MtaWNvbi5udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU0MzA3ZmEyJnNjb3BlZD10cnVlJlwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vYy1pY29uLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2MtaWNvbi5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5mdW5jdGlvbiBpbmplY3RTdHlsZXMgKGNvbnRleHQpIHtcbiAgXG4gIGlmKCF0aGlzLm9wdGlvbnMuc3R5bGUpe1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHt9XG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUgJiYgVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKXtcbiAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXywgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKXtcbiAgICAgICAgICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUocmVxdWlyZShcIi4vYy1pY29uLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD01NDMwN2ZhMiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIikuZGVmYXVsdCwgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMuc3R5bGUscmVxdWlyZShcIi4vYy1pY29uLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD01NDMwN2ZhMiZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIikuZGVmYXVsdClcbiAgICAgICAgICAgIH1cblxufVxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI1NDMwN2ZhMlwiLFxuICBcIjczMGM1MGNmXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImhidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL2NvbXBvbmVudHMvYy1pY29uL2MtaWNvbi5udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLWhidWlsZGVyeC9wYWNrYWdlcy93ZWJwYWNrLXVuaS1udnVlLWxvYWRlci9saWIvdGVtcGxhdGUucmVjeWNsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2MtaWNvbi5udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTU0MzA3ZmEyJnNjb3BlZD10cnVlJlwiIiwidmFyIGNvbXBvbmVudHNcbnZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ1LXRleHRcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogW1wiaWNvbmZvbnRcIl0sXG4gICAgICBzdHlsZTogeyBcImZvbnQtc2l6ZVwiOiBfdm0uc2l6ZSArIFwicHhcIiwgY29sb3I6IF92bS5jb2xvciB9XG4gICAgfSxcbiAgICBbX3ZtLl92KF92bS5fcyhfdm0uaWNvbnNbX3ZtLm5hbWVdKSldXG4gIClcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS00LTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYy1pY29uLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9jLWljb24ubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIjx0ZW1wbGF0ZT5cblx0PHRleHQgY2xhc3M9XCJpY29uZm9udFwiIDpzdHlsZT1cInsnZm9udC1zaXplJzogc2l6ZSArICdweCcsIGNvbG9yOiBjb2xvcn1cIj57e2ljb25zW25hbWVdfX08L3RleHQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxyXG5cdGNvbnN0IHNyYyA9IHBsdXMuaW8uY29udmVydExvY2FsRmlsZVN5c3RlbVVSTCgnL3N0YXRpYy9pY29uZm9udC50dGYnKVxyXG5cdGNvbnN0IGRvbU1vZHVsZSA9IHdlZXgucmVxdWlyZU1vZHVsZSgnZG9tJylcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0cHJvcHM6IHtcclxuXHRcdFx0bmFtZToge1xyXG5cdFx0XHRcdHR5cGU6IFN0cmluZyxcclxuXHRcdFx0XHRkZWZhdWx0OiAnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzaXplOiB7XHJcblx0XHRcdFx0dHlwZTogTnVtYmVyLFxyXG5cdFx0XHRcdGRlZmF1bHQ6IDE4XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbG9yOiB7XHJcblx0XHRcdFx0dHlwZTogU3RyaW5nLFxyXG5cdFx0XHRcdGRlZmF1bHQ6ICcjRkZGRkZGJ1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZGF0YSAoKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0aWNvbnM6IHtcclxuXHRcdFx0XHRcdCdoaXN0b3J5JzogJ1xcdWU2YWEnLFxyXG5cdFx0XHRcdFx0J2hpc3RvcnktZmlsbCc6ICdcXHVlNzVmJyxcclxuXHRcdFx0XHRcdCdhcnJvdy1sZWZ0JzogJ1xcdWU2MDQnLFxyXG5cdFx0XHRcdFx0J2Fycm93LXJpZ2h0JzogJ1xcdWU2MGQnLFxyXG5cdFx0XHRcdFx0J3B1c2hwaW4tZmlsbCc6ICdcXHVlNjM4JyxcclxuXHRcdFx0XHRcdCdzZWFyY2gnOiAnXFx1ZTY1MCcsXHJcblx0XHRcdFx0XHQnc2V0dGluZyc6ICdcXHVlNmE5JyxcclxuXHRcdFx0XHRcdCdzZXR0aW5nLWZpbGwnOiAnXFx1ZTYwOCcsXHJcblx0XHRcdFx0XHQnY2xlYXItZmlsbCc6ICdcXHVlNjc4JyxcclxuXHRcdFx0XHRcdCdjYXRhbG9nJzogJ1xcdWU2MDEnLFxyXG5cdFx0XHRcdFx0J21vcmUnOiAnXFx1ZTYwZicsXHJcblx0XHRcdFx0XHQnbWVudSc6ICdcXHVlNjI0JyxcclxuXHRcdFx0XHRcdCdmaWx0ZXInOiAnXFx1ZTYzMCcsXHJcblx0XHRcdFx0XHQndG9wJzogJ1xcdWU2MmMnLFxyXG5cdFx0XHRcdFx0J2Jvb2tzLWZpbGwnOiAnXFx1ZTYwZScsXHJcblx0XHRcdFx0XHQnbmlnaHQnOiAnXFx1ZTYyNScsXHJcblx0XHRcdFx0XHQnbmlnaHQtZmlsbCc6ICdcXHVlNmMxJyxcclxuXHRcdFx0XHRcdCdhYm91dCc6ICdcXHVlNjAwJyxcclxuXHRcdFx0XHRcdCdhYm91dC1maWxsJzogJ1xcdWU3NjAnLFxyXG5cdFx0XHRcdFx0J3JlYWQnOiAnXFx1ZTY3YScsXHJcblx0XHRcdFx0XHQnbGlnaHQnOiAnXFx1ZTY1ZScsXHJcblx0XHRcdFx0XHQnbGlnaHQtZmlsbCc6ICdcXHVlNmM3J1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcblx0XHRiZWZvcmVDcmVhdGUgKCkge1xyXG5cdFx0XHRkb21Nb2R1bGUuYWRkUnVsZSgnZm9udEZhY2UnLCB7XHJcblx0XHRcdCAgICAnZm9udEZhbWlseSc6IFwiaWNvbmZvbnRcIixcclxuXHRcdFx0XHQnc3JjJzogXCJ1cmwoJ2ZpbGU6L1wiICsgc3JjICsgXCInKVwiXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblx0Lmljb25mb250IHtcclxuXHQgICAgZm9udC1mYW1pbHk6IGljb25mb250IWltcG9ydGFudDtcclxuXHR9XG48L3N0eWxlPlxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi9zdHlsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0yIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9jLWljb24ubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTU0MzA3ZmEyJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2MtaWNvbi5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NTQzMDdmYTImc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJpY29uZm9udFwiOiB7XG4gICAgXCJmb250RmFtaWx5XCI6IFwiaWNvbmZvbnRcIlxuICB9XG59IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC0xIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL25hdi1iYXIubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC0xIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL25hdi1iYXIubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIjx0ZW1wbGF0ZT5cblx0PHZpZXcgY2xhc3M9XCJuYXYtYmFyXCIgOnN0eWxlPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogc2tpbkNvbG9yLm5hdkNvbG9yfVwiPlxuXHRcdDx2aWV3IGNsYXNzPVwiYmFyXCIgOnN0eWxlPVwieydoZWlnaHQnOiBiYXJIZWlnaHR9XCI+PC92aWV3PlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJuYXZcIj5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJsZWZ0XCI+XHJcblx0XHRcdFx0PHNsb3QgbmFtZT1cImxlZnRcIj5cclxuXHRcdFx0XHQ8L3Nsb3Q+XHJcblx0XHRcdFx0PHZpZXcgY2xhc3M9XCJiYWNrXCIgdi1pZj1cImJhY2tTaG93XCIgQHRhcD1cImJhY2tcIj5cclxuXHRcdFx0XHRcdDxjLWljb24gbmFtZT1cImFycm93LWxlZnRcIiA6c2l6ZT1cIjI4XCIgOmNvbG9yPVwic2tpbkNvbG9yLmljb25Db2xvclwiPjwvYy1pY29uPlxyXG5cdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cImNlbnRlclwiIDpzdHlsZT1cInt3aWR0aDogY1dpZHRoICsgJ3JweCd9XCI+XHJcblx0XHRcdFx0PHRleHQgY2xhc3M9XCJ0aXRsZVwiIDpzdHlsZT1cInsnY29sb3InOiB0aXRsZUNvbG9yfVwiPnt7dGl0bGV9fTwvdGV4dD5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cInJpZ2h0XCI+XHJcblx0XHRcdFx0PHNsb3QgbmFtZT1cInJpZ2h0XCI+XHJcblx0XHRcdFx0PC9zbG90PlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHQ8L3ZpZXc+XG5cdDwvdmlldz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XHJcblx0aW1wb3J0IENJY29uIGZyb20gJ0AvY29tcG9uZW50cy9jLWljb24vYy1pY29uLm52dWUnXHJcblx0aW1wb3J0IHsgc2tpbk1peGluIH0gZnJvbSAnQC9jb21tb24vbWl4aW4vaW5kZXguanMnXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdG1peGluczogW3NraW5NaXhpbl0sXHJcblx0XHRwcm9wczoge1xyXG5cdFx0XHRiZ0NvbG9yOiB7XHJcblx0XHRcdFx0dHlwZTogU3RyaW5nLFxyXG5cdFx0XHRcdGRlZmF1bHQ6ICcjMjE5NkY1J1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRiYWNrU2hvdzoge1xyXG5cdFx0XHRcdHR5cGU6IEJvb2xlYW4sXHJcblx0XHRcdFx0ZGVmYXVsdDogdHJ1ZVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdHR5cGU6IFN0cmluZyxcclxuXHRcdFx0XHRkZWZhdWx0OiAnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZUNvbG9yOiB7XHJcblx0XHRcdFx0dHlwZTogU3RyaW5nLFxyXG5cdFx0XHRcdGRlZmF1bHQ6ICcjRkZGRkZGJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRsV2lkdGg6IHtcclxuXHRcdFx0XHR0eXBlOiBOdW1iZXIsXHJcblx0XHRcdFx0ZGVmYXVsdDogMFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjV2lkdGg6IHtcclxuXHRcdFx0XHR0eXBlOiBOdW1iZXIsXHJcblx0XHRcdFx0ZGVmYXVsdDogNTAwXHJcblx0XHRcdH0sXHJcblx0XHRcdHJXaWR0aDoge1xyXG5cdFx0XHRcdHR5cGU6IE51bWJlcixcclxuXHRcdFx0XHRkZWZhdWx0OiAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRiYXJIZWlnaHQ6ICcnXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjcmVhdGVkICgpIHtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9LFxuXHRcdG1ldGhvZHM6IHtcclxuXHRcdFx0aW5pdCAoKSB7XHJcblx0XHRcdFx0dW5pLmdldFN5c3RlbUluZm8oe1xyXG5cdFx0XHRcdFx0c3VjY2VzczogKHJlcykgPT4gey8v5qC55o2u54q25oCB5qCP6auY5bqmLCDov5vooYzlr7zoiKrmoI/pobbpg6jpgILphY1cclxuXHRcdFx0XHRcdFx0dGhpcy5iYXJIZWlnaHQgPSBgJHtyZXMuc3RhdHVzQmFySGVpZ2h0ICsgNH1weGA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0YmFjayAoKSB7XHJcblx0XHRcdFx0dW5pLm5hdmlnYXRlQmFjayh7XHJcblx0XHRcdFx0XHRkZWx0YTogMVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjb21wb25lbnRzOiB7XHJcblx0XHRcdENJY29uXHJcblx0XHR9XG5cdH1cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXHQubmF2IHtcclxuXHRcdGhlaWdodDogNDRweDtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHRwYWRkaW5nLWxlZnQ6IDIwcnB4O1xyXG5cdFx0cGFkZGluZy1yaWdodDogMjBycHg7XHJcblx0fVxyXG5cdC5iYWNrIHtcclxuXHRcdHdpZHRoOiA0NHB4O1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuXHRcdGhlaWdodDogNDRweDtcclxuXHR9XHJcblx0LnRpdGxlIHtcclxuXHRcdGZvbnQtc2l6ZTogMjhycHg7XHJcblx0fVxyXG5cdC5sZWZ0LCAuY2VudGVyLCAucmlnaHQge1xyXG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0fVxyXG5cdC5yaWdodCB7XHJcblx0XHRmbGV4OiAxO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG5cdH1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyBtYXBHZXR0ZXJzLCBtYXBNdXRhdGlvbnMgfSBmcm9tICd2dWV4J1xyXG5leHBvcnQgY29uc3Qgc2tpbk1peGluID0ge1xyXG5cdGNvbXB1dGVkOiB7XHJcblx0XHQuLi5tYXBHZXR0ZXJzKFsnc2tpbk1vZGUnLCAnc2tpbkNvbG9yJ10pXHJcblx0fSxcclxuXHRtZXRob2RzOiB7XHJcblx0XHQuLi5tYXBNdXRhdGlvbnMoWydjaGFuZ2VTa2luJ10pXHJcblx0fVxyXG59IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi9zdHlsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0yIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9uYXYtYmFyLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NTAyNjgyZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi9zdHlsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0yIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9uYXYtYmFyLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NTAyNjgyZSZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIm5hdlwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCI0NFwiLFxuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwicGFkZGluZ0xlZnRcIjogXCIyMHJweFwiLFxuICAgIFwicGFkZGluZ1JpZ2h0XCI6IFwiMjBycHhcIlxuICB9LFxuICBcImJhY2tcIjoge1xuICAgIFwid2lkdGhcIjogXCI0NFwiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJjZW50ZXJcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJmbGV4LXN0YXJ0XCIsXG4gICAgXCJoZWlnaHRcIjogXCI0NFwiXG4gIH0sXG4gIFwidGl0bGVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIyOHJweFwiXG4gIH0sXG4gIFwibGVmdFwiOiB7XG4gICAgXCJmbGV4RGlyZWN0aW9uXCI6IFwicm93XCIsXG4gICAgXCJhbGlnbkl0ZW1zXCI6IFwiY2VudGVyXCJcbiAgfSxcbiAgXCJjZW50ZXJcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiXG4gIH0sXG4gIFwicmlnaHRcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiZmxleFwiOiAxLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfVxufSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vZml4ZWQtYnV0dG9uLm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDViYTg5YmMmc2NvcGVkPXRydWUmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9maXhlZC1idXR0b24ubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vZml4ZWQtYnV0dG9uLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmZ1bmN0aW9uIGluamVjdFN0eWxlcyAoY29udGV4dCkge1xuICBcbiAgaWYoIXRoaXMub3B0aW9ucy5zdHlsZSl7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlID0ge31cbiAgICAgIH1cbiAgICAgIGlmKFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZSAmJiBWdWUucHJvdG90eXBlLl9fJGFwcFN0eWxlX18pe1xuICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUoVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fLCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUpe1xuICAgICAgICAgICAgICAgIFZ1ZS5wcm90b3R5cGUuX19tZXJnZV9zdHlsZShyZXF1aXJlKFwiLi9maXhlZC1idXR0b24ubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ1YmE4OWJjJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiKS5kZWZhdWx0LCB0aGlzLm9wdGlvbnMuc3R5bGUpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucy5zdHlsZSxyZXF1aXJlKFwiLi9maXhlZC1idXR0b24ubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ1YmE4OWJjJnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiKS5kZWZhdWx0KVxuICAgICAgICAgICAgfVxuXG59XG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcIjQ1YmE4OWJjXCIsXG4gIFwiOWI5ODU5ZTJcIixcbiAgZmFsc2UsXG4gIGNvbXBvbmVudHMsXG4gIHJlbmRlcmpzXG4pXG5cbmluamVjdFN0eWxlcy5jYWxsKGNvbXBvbmVudClcbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiaGJ1aWxkZXJQcm9qZWN0cy91bmktYm9va3MvY29tcG9uZW50cy9maXhlZC1idXR0b24vZml4ZWQtYnV0dG9uLm52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS5yZWN5Y2xlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS03LTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZml4ZWQtYnV0dG9uLm52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDViYTg5YmMmc2NvcGVkPXRydWUmXCIiLCJ2YXIgY29tcG9uZW50c1xudmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfdm0uaXNTaG93XG4gICAgPyBfYyhcbiAgICAgICAgXCJ2aWV3XCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFtcImJ1dHRvblwiXSxcbiAgICAgICAgICBzdHlsZTogeyBcImJhY2tncm91bmQtY29sb3JcIjogX3ZtLnNraW5Db2xvci5pdGVtQ29sb3IgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl90KFwiZGVmYXVsdFwiKV0sXG4gICAgICAgIDJcbiAgICAgIClcbiAgICA6IF92bS5fZSgpXG59XG52YXIgcmVjeWNsYWJsZVJlbmRlciA9IGZhbHNlXG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTQtMCEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNC0xIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2ZpeGVkLWJ1dHRvbi5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS00LTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZml4ZWQtYnV0dG9uLm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCI8dGVtcGxhdGU+XHJcblx0PHZpZXcgcmVmPVwiYnV0dG9uXCIgdi1pZj1cImlzU2hvd1wiIGNsYXNzPVwiYnV0dG9uXCIgOnN0eWxlPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogc2tpbkNvbG9yLml0ZW1Db2xvcn1cIj5cclxuXHRcdDxzbG90Pjwvc2xvdD5cclxuXHQ8L3ZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxyXG5cdGNvbnN0IGFuaW1hdGlvbiA9IHdlZXgucmVxdWlyZU1vZHVsZSgnYW5pbWF0aW9uJyk7XHJcblx0aW1wb3J0IHsgc2tpbk1peGluIH0gZnJvbSAnQC9jb21tb24vbWl4aW4vaW5kZXguanMnXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdG1peGluczogW3NraW5NaXhpbl0sXHJcblx0XHRwcm9wczoge1xyXG5cdFx0XHRzaG93OiB7XHJcblx0XHRcdFx0dHlwZTogQm9vbGVhbixcclxuXHRcdFx0XHRkZWZhdWx0OiB0cnVlXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRpc1Nob3c6IHRydWVcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdG1vdW50ZWQgKCkge1xyXG5cdFx0XHRpZiAoICF0aGlzLnNob3cgKSB7XHJcblx0XHRcdFx0dGhpcy5oaWRlQnRuKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zaG93QnRuKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdGhpZGVCdG4gKCkge1xyXG5cdFx0XHRcdGFuaW1hdGlvbi50cmFuc2l0aW9uKHRoaXMuJHJlZnMuYnV0dG9uLCB7XHJcblx0XHRcdFx0ICAgIHN0eWxlczoge1xyXG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm06ICdzY2FsZSgwKSdcclxuXHRcdFx0XHQgICAgfSxcclxuXHRcdFx0XHQgICAgZHVyYXRpb246IDMwMCwgLy9tc1xyXG5cdFx0XHRcdCAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnLFxyXG5cdFx0XHRcdCAgICBuZWVkTGF5b3V0OmZhbHNlLFxyXG5cdFx0XHRcdCAgICBkZWxheTogMCAvL21zXHJcblx0XHRcdFx0fSwgKHJlcykgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5pc1Nob3cgPSBmYWxzZTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzaG93QnRuICgpIHtcclxuXHRcdFx0XHR0aGlzLmlzU2hvdyA9IHRydWU7XHJcblx0XHRcdFx0dGhpcy4kbmV4dFRpY2soKCkgPT4ge1xyXG5cdFx0XHRcdFx0YW5pbWF0aW9uLnRyYW5zaXRpb24odGhpcy4kcmVmcy5idXR0b24sIHtcclxuXHRcdFx0XHRcdCAgICBzdHlsZXM6IHtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2Zvcm06ICdzY2FsZSgxKSdcclxuXHRcdFx0XHRcdCAgICB9LFxyXG5cdFx0XHRcdFx0ICAgIGR1cmF0aW9uOiAzMDAsIC8vbXNcclxuXHRcdFx0XHRcdCAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnLFxyXG5cdFx0XHRcdFx0ICAgIG5lZWRMYXlvdXQ6ZmFsc2UsXHJcblx0XHRcdFx0XHQgICAgZGVsYXk6IDAgLy9tc1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0d2F0Y2g6IHtcclxuXHRcdFx0c2hvdyAodmFsKSB7XHJcblx0XHRcdFx0aWYgKCAhdmFsICkge1xyXG5cdFx0XHRcdFx0dGhpcy5oaWRlQnRuKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuc2hvd0J0bigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cclxuXHQuYnV0dG9uIHtcclxuXHRcdHdpZHRoOiA1MHB4O1xyXG5cdFx0aGVpZ2h0OiA1MHB4O1xyXG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcblx0XHRib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgwLDAsMCwwLjIpO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0bWFyZ2luLXRvcDogNXB4O1xyXG5cdFx0bWFyZ2luLWJvdHRvbTogNXB4O1xyXG5cdH1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2ZpeGVkLWJ1dHRvbi5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDViYTg5YmMmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLWhidWlsZGVyeC9wYWNrYWdlcy93ZWJwYWNrLXVuaS1udnVlLWxvYWRlci9saWIvc3R5bGUuanMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0xIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMiEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZml4ZWQtYnV0dG9uLm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD00NWJhODliYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcImJ1dHRvblwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjUwXCIsXG4gICAgXCJoZWlnaHRcIjogXCI1MFwiLFxuICAgIFwidHJhbnNmb3JtXCI6IFwic2NhbGUoMClcIixcbiAgICBcImJvcmRlclJhZGl1c1wiOiBcIjUwXCIsXG4gICAgXCJib3hTaGFkb3dcIjogXCIwIDJweCA2cHggcmdiYSgwLDAsMCwwLjIpXCIsXG4gICAgXCJqdXN0aWZ5Q29udGVudFwiOiBcImNlbnRlclwiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNVwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiNVwiXG4gIH1cbn0iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS00LTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vaW5kZXgubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNC0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS00LTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vaW5kZXgubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZtcFR5cGU9cGFnZVwiIiwiPHRlbXBsYXRlPlxuXHQ8dmlldyBjbGFzcz1cImluZGV4XCIgOnN0eWxlPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogc2tpbkNvbG9yLmJnQ29sb3J9XCIgQHRvdWNoc3RhcnQ9XCJ0b3VjaHN0YXJ0XCIgQHRvdWNobW92ZT1cInRvdWNobW92ZVwiIEB0b3VjaGVuZD1cInRvdWNoZW5kXCI+XHJcblx0XHQ8bmF2LWJhciA6dGl0bGVDb2xvcj1cInNraW5Db2xvci5pY29uQ29sb3JcIiB0aXRsZT1cIuWlveeUqOmYheivu+WZqFwiIDpiYWNrU2hvdz1cImZhbHNlXCIgOmNXaWR0aD1cIjQyMFwiPlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cIm5hdi1sZWZ0XCIgc2xvdD1cImxlZnRcIiBAdGFwPVwiJHJlZnMubGVmdE1lbnUuc2hvdygpXCI+XHJcblx0XHRcdFx0PGMtaWNvbiBuYW1lPVwibWVudVwiIHNpemU9XCIyNVwiIDpjb2xvcj1cInNraW5Db2xvci5pY29uQ29sb3JcIj48L2MtaWNvbj5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8dmlldyBzbG90PVwicmlnaHRcIj5cclxuXHRcdFx0XHQ8Yy1pY29uIG5hbWU9XCJzZWFyY2hcIiBzaXplPVwiMjVcIiA6Y29sb3I9XCJza2luQ29sb3IuaWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PHZpZXcgc2xvdD1cInJpZ2h0XCI+XHJcblx0XHRcdFx0PGMtaWNvbiBuYW1lPVwiZmlsdGVyXCIgc2l6ZT1cIjI1XCIgOmNvbG9yPVwic2tpbkNvbG9yLmljb25Db2xvclwiPjwvYy1pY29uPlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdDx2aWV3IHNsb3Q9XCJyaWdodFwiPlxyXG5cdFx0XHRcdDxjLWljb24gbmFtZT1cIm1vcmVcIiBzaXplPVwiMjVcIiA6Y29sb3I9XCJza2luQ29sb3IuaWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdDwvbmF2LWJhcj5cclxuXHRcdDx3YXRlcmZhbGwgQHNjcm9sbD1cInNjcm9sbFwiIGNvbHVtbi1jb3VudD1cIjxpbnRlZ2VyPlwiIGNvbHVtbi13aWR0aD1cIjEyMFwiIGNvbHVtbi1nYXA9XCIxMFwiIGxlZnQtZ2FwPVwiMTBcIiByaWdodC1nYXA9XCIxMFwiPlxyXG5cdFx0ICAgIDxjZWxsIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBib29rc1wiIDprZXk9XCJpdGVtLmlkXCI+XHJcblx0XHRcdFx0PHZpZXcgY2xhc3M9XCJib29rXCIgcmVmPVwibGlzdFwiPlxyXG5cdFx0XHRcdFx0PGltYWdlIGNsYXNzPVwiYm9vay1pbWdcIiBzcmM9XCIuLi8uLi9zdGF0aWMvbG9nby5wbmdcIiBtb2RlPVwiYXNwZWN0RmlsbFwiPjwvaW1hZ2U+XHJcblx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImJvb2stbWFza1wiIDpzdHlsZT1cIntvcGFjaXR5OiBza2luQ29sb3IuaW1nTWFza31cIj48L3ZpZXc+XHJcblx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImJvb2stYm90dG9tXCI+XHJcblx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwiYm9vay1uYW1lXCI+5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXPC90ZXh0PlxyXG5cdFx0XHRcdFx0XHQ8dmlldyBjbGFzcz1cImItYm90dG9tXCI+XHJcblx0XHRcdFx0XHRcdFx0PHRleHQgY2xhc3M9XCJib29rLXRpbWVcIj4yMDE5LTA1LTE1PC90ZXh0PlxyXG5cdFx0XHRcdFx0XHRcdDx0ZXh0IGNsYXNzPVwiYm9vay1wcm9ncmVzc1wiPjMzLjMzJTwvdGV4dD5cclxuXHRcdFx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0XHQ8dmlldyB2LWlmPVwiaW5kZXggPT0gYm9va3MubGVuZ3RoIC0gMVwiIHN0eWxlPVwiaGVpZ2h0OiAxMHB4O1wiPjwvdmlldz5cclxuXHRcdCAgICA8L2NlbGw+XHJcblx0XHQ8L3dhdGVyZmFsbD5cclxuXHRcdDx2aWV3IGNsYXNzPVwiZml4ZWRcIj5cclxuXHRcdFx0PHZpZXc+XHJcblx0XHRcdFx0PGZpeGVkLWJ1dHRvbiA6c2hvdz1cImJ0blNob3dcIj5cclxuXHRcdFx0XHRcdDxjLWljb24gbmFtZT1cImhpc3RvcnlcIiBzaXplPVwiMjVcIiA6Y29sb3I9XCJza2luQ29sb3IuaWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdFx0PC9maXhlZC1idXR0b24+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PHZpZXcgQHRhcD1cImNsZWFyXCI+XHJcblx0XHRcdFx0PGZpeGVkLWJ1dHRvbiA6c2hvdz1cImJ0blNob3dcIj5cclxuXHRcdFx0XHRcdDxjLWljb24gbmFtZT1cImNsZWFyLWZpbGxcIiBzaXplPVwiMjVcIiA6Y29sb3I9XCJza2luQ29sb3IuaWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdFx0PC9maXhlZC1idXR0b24+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PHZpZXcgQHRhcD1cInNjcm9sbFRvcFwiPlxyXG5cdFx0XHRcdDxmaXhlZC1idXR0b24gOnNob3c9XCJNYXRoLmFicyhvbGRPZmZzZXRZKSA+IDMwMFwiPlxyXG5cdFx0XHRcdFx0PGMtaWNvbiBuYW1lPVwidG9wXCIgc2l6ZT1cIjI1XCIgOmNvbG9yPVwic2tpbkNvbG9yLmljb25Db2xvclwiPjwvYy1pY29uPlxyXG5cdFx0XHRcdDwvZml4ZWQtYnV0dG9uPlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHQ8L3ZpZXc+XHJcblx0XHQ8Yy1tZW51IDp0cmFuc2xhdGU9XCJtZW51TGF0ZVwiIDpvcGFjaXR5PVwibWVudU9wYWNcIiByZWY9XCJsZWZ0TWVudVwiPjwvYy1tZW51PlxuXHQ8L3ZpZXc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxyXG5cdGltcG9ydCBDSWNvbiBmcm9tICdAL2NvbXBvbmVudHMvYy1pY29uL2MtaWNvbi5udnVlJ1xyXG5cdGltcG9ydCBDTWVudSBmcm9tICdAL3BhZ2VzL21lbnUvbWVudS5udnVlJ1xyXG5cdGltcG9ydCB7IHNraW5NaXhpbiB9IGZyb20gJ0AvY29tbW9uL21peGluL2luZGV4LmpzJ1xyXG5cdGNvbnN0IGRvbSA9IHdlZXgucmVxdWlyZU1vZHVsZSgnZG9tJykgfHwge307XG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHRcdG1peGluczogW3NraW5NaXhpbl0sXG5cdFx0ZGF0YSAoKSB7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0Ym9va3M6IFt7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDQ5MCcsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA0OTEnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNDkyJyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDQ5MycsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA0OTQnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNDk1JyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDQ5NicsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA0OTcnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNDk4JyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDQ5OScsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA1MDAnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNTAxJyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDUwMicsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA1MDMnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNTA0JyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRpZDogJzIwMDkwMTE0MTg1MDMyMDUwNScsXHJcblx0XHRcdFx0XHRuYW1lOiAn5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGX5b2x6Zmi6KGXJyxcclxuXHRcdFx0XHRcdGltYWdlOiAnJyxcclxuXHRcdFx0XHRcdHByb2dyZXNzOiAzMy4zM1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWQ6ICcyMDA5MDExNDE4NTAzMjA1MDYnLFxyXG5cdFx0XHRcdFx0bmFtZTogJ+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihl+W9semZouihlycsXHJcblx0XHRcdFx0XHRpbWFnZTogJycsXHJcblx0XHRcdFx0XHRwcm9ncmVzczogMzMuMzNcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGlkOiAnMjAwOTAxMTQxODUwMzIwNTA3JyxcclxuXHRcdFx0XHRcdG5hbWU6ICflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZflvbHpmaLooZcnLFxyXG5cdFx0XHRcdFx0aW1hZ2U6ICcnLFxyXG5cdFx0XHRcdFx0cHJvZ3Jlc3M6IDMzLjMzXHJcblx0XHRcdFx0fV0sXHJcblx0XHRcdFx0Y3VycmVudDogMCxcclxuXHRcdFx0XHRvbGRPZmZzZXRZOiAwLFxyXG5cdFx0XHRcdGJ0blNob3c6IHRydWUsXHJcblx0XHRcdFx0cG9pbnRYOiAwLFxyXG5cdFx0XHRcdG1lbnVMYXRlOiAwLFxyXG5cdFx0XHRcdG1lbnVPcGFjOiAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdHNjcm9sbCAoZSkge1xyXG5cdFx0XHRcdGlmICggZS5jb250ZW50T2Zmc2V0LnkgPCB0aGlzLm9sZE9mZnNldFkgKSB7XHJcblx0XHRcdFx0XHR0aGlzLmJ0blNob3cgPSBmYWxzZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5idG5TaG93ID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5vbGRPZmZzZXRZID0gZS5jb250ZW50T2Zmc2V0Lnk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNsZWFyICgpIHtcclxuXHRcdFx0XHR1bmkuc2hvd01vZGFsKHtcclxuXHRcdFx0XHRcdHRpdGxlOiAn5o+Q56S6JyxcclxuXHRcdFx0XHRcdGNvbnRlbnQ6ICfmmK/lkKbmuIXnqbrmiYDmnInkuabnsY3vvJ8nLFxyXG5cdFx0XHRcdFx0c3VjY2VzcyAocmVzKSB7XHJcblx0XHRcdFx0XHRcdGlmICggcmVzLmNvbmZpcm0gKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ+a4heepuicpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2hhbmdlQ3VycmVudCAodmFsKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50ID0gdmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzY3JvbGxUb3AgKCkge1xyXG5cdFx0XHRcdGRvbS5zY3JvbGxUb0VsZW1lbnQodGhpcy4kcmVmc1snbGlzdCddWzBdKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0dG91Y2hzdGFydCAoZSkge1xyXG5cdFx0XHRcdGlmICggZS50b3VjaGVzLmxlbmd0aCA+IDEgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xyXG5cdFx0XHRcdHRoaXMucG9pbnRYID0gdG91Y2gucGFnZVg7XHJcblx0XHRcdFx0aWYgKCB0aGlzLnBvaW50WCA8PSAxMCApIHtcclxuXHRcdFx0XHRcdHRoaXMuJHJlZnMubGVmdE1lbnUub3BlbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0dG91Y2htb3ZlIChlKSB7XHJcblx0XHRcdFx0aWYgKCBlLnRvdWNoZXMubGVuZ3RoID4gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCB0aGlzLnBvaW50WCA+IDEwICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zdCB0b3VjaCA9IGUudG91Y2hlc1swXTtcclxuXHRcdFx0XHR0aGlzLm1lbnVMYXRlID0gMS41ICogKHRvdWNoLnBhZ2VYIC0gdGhpcy5wb2ludFgpO1xyXG5cdFx0XHRcdHRoaXMubWVudU9wYWMgPSB0aGlzLm1lbnVMYXRlIC8gTWF0aC5hYnModGhpcy4kcmVmcy5sZWZ0TWVudS5hbmltYS5sYXRlKSAqIHRoaXMuJHJlZnMubGVmdE1lbnUuYW5pbWEub3BhYztcclxuXHRcdFx0fSxcclxuXHRcdFx0dG91Y2hlbmQgKGUpIHtcclxuXHRcdFx0XHRpZiAoIHRoaXMucG9pbnRYID4gMTAgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggdGhpcy4kcmVmcy5sZWZ0TWVudS5wb3B1cGxhdGUgPj0gLTI0MCApIHtcclxuXHRcdFx0XHRcdHRoaXMuJHJlZnMubGVmdE1lbnUuc2hvdygpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLiRyZWZzLmxlZnRNZW51LmhpZGUoKTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLm1lbnVMYXRlID0gMDtcclxuXHRcdFx0XHRcdH0sIHRoaXMuJHJlZnMubGVmdE1lbnUuYW5pbWEuZHVyYXRpb24pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuJG5leHRUaWNrKCgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMucG9pbnRYID0gMDtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0b25CYWNrUHJlc3MoZXZlbnQpIHtcclxuXHRcdFx0aWYgKCB0aGlzLiRyZWZzLmxlZnRNZW51LmlzU2hvdyApIHtcclxuXHRcdFx0XHR0aGlzLiRyZWZzLmxlZnRNZW51LmhpZGUoKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9LFxyXG5cdFx0Y29tcG9uZW50czoge1xyXG5cdFx0XHRDSWNvbixcclxuXHRcdFx0Q01lbnVcclxuXHRcdH1cblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cdC5ib29rIHtcclxuXHRcdG1hcmdpbi10b3A6IDEwcHg7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHRoZWlnaHQ6IDE5MHB4O1xyXG5cdH1cclxuXHQuYm9vay1pbWcge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAwO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdHJpZ2h0OiAwO1xyXG5cdFx0Ym90dG9tOiAwO1xyXG5cdH1cclxuXHQuYm9vay1tYXNrIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMDtcclxuXHRcdGxlZnQ6IDA7XHJcblx0XHRyaWdodDogMDtcclxuXHRcdGJvdHRvbTogMDtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XHJcblx0fVxyXG5cdC5ib29rLWJvdHRvbSB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRib3R0b206IDA7XHJcblx0XHRsZWZ0OiAwO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHRoZWlnaHQ6IDgwcnB4O1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjQpO1xyXG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblx0XHRwYWRkaW5nOiAwIDVweDtcclxuXHR9XHJcblx0LmJvb2stbmFtZSB7XHJcblx0XHRmb250LXNpemU6IDIycnB4O1xyXG5cdFx0Y29sb3I6ICMzMzMzMzM7XHJcblx0XHRsaW5lczoxO1xyXG5cdFx0dGV4dC1vdmVyZmxvdzplbGxpcHNpcztcclxuXHR9XHJcblx0LmItYm90dG9tIHtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblx0fVxyXG5cdC5ib29rLXRpbWUge1xyXG5cdFx0Zm9udC1zaXplOiAxOHJweDtcclxuXHRcdGNvbG9yOiAjNjY2NjY2O1xyXG5cdFx0bWFyZ2luLXRvcDogNXB4O1xyXG5cdH1cclxuXHQuYm9vay1wcm9ncmVzcyB7XHJcblx0XHRmb250LXNpemU6IDE4cnB4O1xyXG5cdFx0Y29sb3I6ICM2NjY2NjY7XHJcblx0XHRtYXJnaW4tdG9wOiA1cHg7XHJcblx0fVxyXG5cdC5uYXYtbGVmdCB7XHJcblx0XHRtYXJnaW4tcmlnaHQ6IDYwcnB4O1xyXG5cdH1cclxuXHQuZml4ZWQge1xyXG5cdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0Ym90dG9tOiAyMHB4O1xyXG5cdFx0cmlnaHQ6IDIwcHg7XHJcblx0XHR3aWR0aDogNTBweDtcclxuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG5cdH1cbjwvc3R5bGU+XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL21lbnUubnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NTc1ZTBlMCZcIlxudmFyIHJlbmRlcmpzXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL21lbnUubnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vbWVudS5udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5mdW5jdGlvbiBpbmplY3RTdHlsZXMgKGNvbnRleHQpIHtcbiAgXG4gIGlmKCF0aGlzLm9wdGlvbnMuc3R5bGUpe1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZSA9IHt9XG4gICAgICB9XG4gICAgICBpZihWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUgJiYgVnVlLnByb3RvdHlwZS5fXyRhcHBTdHlsZV9fKXtcbiAgICAgICAgVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKFZ1ZS5wcm90b3R5cGUuX18kYXBwU3R5bGVfXywgdGhpcy5vcHRpb25zLnN0eWxlKVxuICAgICAgfVxuICAgICAgaWYoVnVlLnByb3RvdHlwZS5fX21lcmdlX3N0eWxlKXtcbiAgICAgICAgICAgICAgICBWdWUucHJvdG90eXBlLl9fbWVyZ2Vfc3R5bGUocmVxdWlyZShcIi4vbWVudS5udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIpLmRlZmF1bHQsIHRoaXMub3B0aW9ucy5zdHlsZSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLnN0eWxlLHJlcXVpcmUoXCIuL21lbnUubnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiKS5kZWZhdWx0KVxuICAgICAgICAgICAgfVxuXG59XG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBcImE3MmE2NzdhXCIsXG4gIGZhbHNlLFxuICBjb21wb25lbnRzLFxuICByZW5kZXJqc1xuKVxuXG5pbmplY3RTdHlsZXMuY2FsbChjb21wb25lbnQpXG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImhidWlsZGVyUHJvamVjdHMvdW5pLWJvb2tzL3BhZ2VzL21lbnUvbWVudS5udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLWhidWlsZGVyeC9wYWNrYWdlcy93ZWJwYWNrLXVuaS1udnVlLWxvYWRlci9saWIvdGVtcGxhdGUucmVjeWNsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNy0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL21lbnUubnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NTc1ZTBlMCZcIiIsInZhciBjb21wb25lbnRzID0ge1xuICBcImMtaWNvblwiOiByZXF1aXJlKFwiQC9jb21wb25lbnRzL2MtaWNvbi9jLWljb24ubnZ1ZVwiKS5kZWZhdWx0XG59XG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF92bS5pc1Nob3dcbiAgICA/IF9jKFwidmlld1wiLCB7IHN0YXRpY0NsYXNzOiBbXCJtZW51XCJdIH0sIFtcbiAgICAgICAgX2MoXCJ2aWV3XCIsIHtcbiAgICAgICAgICByZWY6IFwibWFza1wiLFxuICAgICAgICAgIHN0YXRpY0NsYXNzOiBbXCJtYXNrXCJdLFxuICAgICAgICAgIHN0eWxlOiB7IG9wYWNpdHk6IF92bS5tYXNrT3BhY2l0eSB9LFxuICAgICAgICAgIG9uOiB7IHRvdWNobW92ZTogX3ZtLm1vdmVFbmFibGUsIGNsaWNrOiBfdm0uaGlkZSB9XG4gICAgICAgIH0pLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZWY6IFwicG9wdXBcIixcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBbXCJwb3B1cFwiXSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiBfdm0uc2tpbkNvbG9yLm1lbnVCZ0NvbG9yLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlWChcIiArIF92bS5wb3B1cGxhdGUgKyBcInJweClcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIHRvdWNoc3RhcnQ6IF92bS50b3VjaHN0YXJ0LFxuICAgICAgICAgICAgICB0b3VjaG1vdmU6IF92bS50b3VjaG1vdmUsXG4gICAgICAgICAgICAgIHRvdWNoZW5kOiBfdm0udG91Y2hlbmQsXG4gICAgICAgICAgICAgIGNsaWNrOiBfdm0ubW92ZUVuYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBbXCJ0b3AtaW1nXCJdIH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcInUtaW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFtcImJnXCJdLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBcIi4uLy4uL3N0YXRpYy9sb2dvLnBuZ1wiLCBtb2RlOiBcImFzcGVjdEZpbGxcIiB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX2MoXCJ2aWV3XCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBbXCJ0b3AtbWFza1wiXSxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IG9wYWNpdHk6IF92bS5za2luQ29sb3IuaW1nTWFzayB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF92bS5fbChfdm0ubmF2cywgZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogaW5kZXgsXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogW1wibGlzdFwiXSxcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiBfdm0uaXNBY3RpdmVkKGluZGV4KSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uY2hhbmdlQ3VycmVudChpbmRleClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBbXCJpY29uXCJdIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLmljb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IGl0ZW0uc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnQgPT0gaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gX3ZtLnNraW5Db2xvci5tZW51QWN0aXZlQ29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLnNraW5Db2xvci5tZW51SWNvbkNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcInUtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFtcInRpdGxlXCJdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmN1cnJlbnQgPT0gaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IF92bS5za2luQ29sb3IubWVudUFjdGl2ZUNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uc2tpbkNvbG9yLm1lbnVUaXRsZUNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhpdGVtLnRpdGxlKSldXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF9jKFwidmlld1wiLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBbXCJoclwiXSxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IF92bS5za2luQ29sb3IuZ2FwQ29sb3IgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgXCJ2aWV3XCIsXG4gICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFtcImxpc3RcIl0sIG9uOiB7IGNsaWNrOiBfdm0uY2hhbmdlTW9kZSB9IH0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwidmlld1wiLFxuICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogW1wiaWNvblwiXSB9LFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcImMtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IF92bS5tb2RlSWNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IFwiMjVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBfdm0uc2tpbkNvbG9yLm1lbnVJY29uQ29sb3JcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInUtdGV4dFwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogW1widGl0bGVcIl0sXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7IGNvbG9yOiBfdm0uc2tpbkNvbG9yLm1lbnVUaXRsZUNvbG9yIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ubW9kZU5hbWUpKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBfdm0uX2woX3ZtLm9wdGlvbnMsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcInZpZXdcIiwgeyBrZXk6IGluZGV4LCBzdGF0aWNDbGFzczogW1wibGlzdFwiXSB9LCBbXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcInZpZXdcIixcbiAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFtcImljb25cIl0gfSxcbiAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJjLWljb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLmljb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBpdGVtLnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogX3ZtLnNraW5Db2xvci5tZW51SWNvbkNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgXCJ1LXRleHRcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFtcInRpdGxlXCJdLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBjb2xvcjogX3ZtLnNraW5Db2xvci5tZW51VGl0bGVDb2xvciB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihfdm0uX3MoaXRlbS50aXRsZSkpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSxcbiAgICAgICAgICAyXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgOiBfdm0uX2UoKVxufVxudmFyIHJlY3ljbGFibGVSZW5kZXIgPSBmYWxzZVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMsIHJlY3ljbGFibGVSZW5kZXIsIGNvbXBvbmVudHMgfSIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9tZW51Lm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS00LTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTQtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9tZW51Lm52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCI8dGVtcGxhdGU+XG5cdDx2aWV3IGNsYXNzPVwibWVudVwiIHYtaWY9XCJpc1Nob3dcIj5cclxuXHRcdDwhLS0g6YGu572p5bGCIC0tPlxuXHRcdDx2aWV3IGNsYXNzPVwibWFza1wiIHJlZj1cIm1hc2tcIiBAdG91Y2htb3ZlPVwibW92ZUVuYWJsZVwiIDpzdHlsZT1cInsnb3BhY2l0eSc6IG1hc2tPcGFjaXR5fVwiIEB0YXA9XCJoaWRlXCI+PC92aWV3PlxyXG5cdFx0PHZpZXcgY2xhc3M9XCJwb3B1cFwiIHJlZj1cInBvcHVwXCIgQHRvdWNoc3RhcnQ9XCJ0b3VjaHN0YXJ0XCIgQHRvdWNobW92ZT1cInRvdWNobW92ZVwiIEB0b3VjaGVuZD1cInRvdWNoZW5kXCIgOnN0eWxlPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogc2tpbkNvbG9yLm1lbnVCZ0NvbG9yLCAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVgoJyArIHBvcHVwbGF0ZSArICdycHgpJ31cIiBAdGFwPVwibW92ZUVuYWJsZVwiPlxyXG5cdFx0XHQ8dmlldyBjbGFzcz1cInRvcC1pbWdcIj5cclxuXHRcdFx0XHQ8aW1hZ2UgY2xhc3M9XCJiZ1wiIHNyYz1cIi4uLy4uL3N0YXRpYy9sb2dvLnBuZ1wiIG1vZGU9XCJhc3BlY3RGaWxsXCI+PC9pbWFnZT5cclxuXHRcdFx0XHQ8dmlldyBjbGFzcz1cInRvcC1tYXNrXCIgOnN0eWxlPVwie29wYWNpdHk6IHNraW5Db2xvci5pbWdNYXNrfVwiPjwvdmlldz5cclxuXHRcdFx0PC92aWV3PlxyXG5cdFx0XHQ8IS0tIOWIl+ihqOWIh+aNoiAtLT5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJsaXN0XCIgOnN0eWxlPVwiaXNBY3RpdmVkKGluZGV4KVwiIEB0YXA9XCJjaGFuZ2VDdXJyZW50KGluZGV4KVwiIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBuYXZzXCIgOmtleT1cImluZGV4XCI+XHJcblx0XHRcdFx0PHZpZXcgY2xhc3M9XCJpY29uXCI+XHJcblx0XHRcdFx0XHQ8Yy1pY29uIDpuYW1lPVwiaXRlbS5pY29uXCIgOnNpemU9XCJpdGVtLnNpemVcIiA6Y29sb3I9XCJjdXJyZW50ID09IGluZGV4ID8gc2tpbkNvbG9yLm1lbnVBY3RpdmVDb2xvciA6IHNraW5Db2xvci5tZW51SWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdDx0ZXh0IGNsYXNzPVwidGl0bGVcIiA6c3R5bGU9XCJ7Y29sb3I6IGN1cnJlbnQgPT0gaW5kZXggPyBza2luQ29sb3IubWVudUFjdGl2ZUNvbG9yIDogc2tpbkNvbG9yLm1lbnVUaXRsZUNvbG9yfVwiPnt7aXRlbS50aXRsZX19PC90ZXh0PlxyXG5cdFx0XHQ8L3ZpZXc+XHJcblx0XHRcdDx2aWV3IGNsYXNzPVwiaHJcIiA6c3R5bGU9XCJ7J2JhY2tncm91bmQtY29sb3InOiBza2luQ29sb3IuZ2FwQ29sb3J9XCI+PC92aWV3PlxyXG5cdFx0XHQ8IS0tIOWknOmXtOaooeW8j+WIh+aNoiAtLT5cclxuXHRcdFx0PHZpZXcgY2xhc3M9XCJsaXN0XCIgQHRhcD1cImNoYW5nZU1vZGVcIj5cclxuXHRcdFx0XHQ8dmlldyBjbGFzcz1cImljb25cIj5cclxuXHRcdFx0XHRcdDxjLWljb24gOm5hbWU9XCJtb2RlSWNvblwiIHNpemU9XCIyNVwiIDpjb2xvcj1cInNraW5Db2xvci5tZW51SWNvbkNvbG9yXCI+PC9jLWljb24+XHJcblx0XHRcdFx0PC92aWV3PlxyXG5cdFx0XHRcdDx0ZXh0IGNsYXNzPVwidGl0bGVcIiA6c3R5bGU9XCJ7Y29sb3I6IHNraW5Db2xvci5tZW51VGl0bGVDb2xvcn1cIj57e21vZGVOYW1lfX08L3RleHQ+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdFx0PCEtLSDlip/og73pobXpnaIgLS0+XHJcblx0XHRcdDx2aWV3IGNsYXNzPVwibGlzdFwiIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBvcHRpb25zXCIgOmtleT1cImluZGV4XCI+XHJcblx0XHRcdFx0PHZpZXcgY2xhc3M9XCJpY29uXCI+XHJcblx0XHRcdFx0XHQ8Yy1pY29uIDpuYW1lPVwiaXRlbS5pY29uXCIgOnNpemU9XCJpdGVtLnNpemVcIiA6Y29sb3I9XCJza2luQ29sb3IubWVudUljb25Db2xvclwiPjwvYy1pY29uPlxyXG5cdFx0XHRcdDwvdmlldz5cclxuXHRcdFx0XHQ8dGV4dCBjbGFzcz1cInRpdGxlXCIgOnN0eWxlPVwie2NvbG9yOiBza2luQ29sb3IubWVudVRpdGxlQ29sb3J9XCI+e3tpdGVtLnRpdGxlfX08L3RleHQ+XHJcblx0XHRcdDwvdmlldz5cclxuXHRcdDwvdmlldz5cblx0PC92aWV3PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cclxuXHRjb25zdCBhbmltYXRpb24gPSB3ZWV4LnJlcXVpcmVNb2R1bGUoJ2FuaW1hdGlvbicpO1xyXG5cdGltcG9ydCBDSWNvbiBmcm9tICdAL2NvbXBvbmVudHMvYy1pY29uL2MtaWNvbi5udnVlJ1xyXG5cdGltcG9ydCB7IHNraW5NaXhpbiB9IGZyb20gJ0AvY29tbW9uL21peGluL2luZGV4LmpzJ1xuXHRleHBvcnQgZGVmYXVsdCB7XHJcblx0XHRtaXhpbnM6IFtza2luTWl4aW5dLFxyXG5cdFx0cHJvcHM6IHtcclxuXHRcdFx0dHJhbnNsYXRlOiB7XHJcblx0XHRcdFx0dHlwZTogTnVtYmVyLFxyXG5cdFx0XHRcdGRlZmF1bHQ6IDBcclxuXHRcdFx0fSxcclxuXHRcdFx0b3BhY2l0eToge1xyXG5cdFx0XHRcdHR5cGU6IE51bWJlcixcclxuXHRcdFx0XHRkZWZhdWx0OiAwXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRkYXRhICgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRhbmltYToge1xyXG5cdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcclxuXHRcdFx0XHRcdGxhdGU6IC01NDAsXHJcblx0XHRcdFx0XHRvcGFjOiAwLjVcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGlzU2hvdzogZmFsc2UsXHJcblx0XHRcdFx0bWFza09wYWNpdHk6IDAsXHJcblx0XHRcdFx0cG9wdXBsYXRlOiAtNTQwLFxyXG5cdFx0XHRcdHBvaW50WDogMCxcclxuXHRcdFx0XHRjdXJyZW50OiAwLFxyXG5cdFx0XHRcdG5hdnM6IFt7XHJcblx0XHRcdFx0XHRpY29uOiAnYm9va3MtZmlsbCcsXHJcblx0XHRcdFx0XHRzaXplOiAyMyxcclxuXHRcdFx0XHRcdHRpdGxlOiAn6ZiF6K+75LitJ1xyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0aWNvbjogJ2hpc3RvcnktZmlsbCcsXHJcblx0XHRcdFx0XHRzaXplOiAyNSxcclxuXHRcdFx0XHRcdHRpdGxlOiAn5bey6K+75a6MJ1xyXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdG9wdGlvbnM6W3tcclxuXHRcdFx0XHRcdGljb246ICdzZXR0aW5nLWZpbGwnLFxyXG5cdFx0XHRcdFx0c2l6ZTogMjMsXHJcblx0XHRcdFx0XHR0aXRsZTogJ+iuvue9ridcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdGljb246ICdhYm91dCcsXHJcblx0XHRcdFx0XHRzaXplOiAyMixcclxuXHRcdFx0XHRcdHRpdGxlOiAn5YWz5LqOJ1xyXG5cdFx0XHRcdH1dXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRjb21wdXRlZDoge1xyXG5cdFx0XHRtb2RlTmFtZSAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2tpbk1vZGUgPT0gJ2RlZmF1bHQnID8gJ+WknOmXtOaooeW8jycgOiAn5pel6Ze05qih5byPJztcclxuXHRcdFx0fSxcclxuXHRcdFx0bW9kZUljb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLnNraW5Nb2RlID09ICdkZWZhdWx0JyA/ICduaWdodCcgOiAnbGlnaHQtZmlsbCc7XHJcblx0XHRcdH1cclxuXHRcdH0sXG5cdFx0bWV0aG9kczoge1xyXG5cdFx0XHRtb3ZlRW5hYmxlICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2hhbmdlQ3VycmVudCAodmFsKSB7XHJcblx0XHRcdFx0dGhpcy5jdXJyZW50ID0gdmFsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpc0FjdGl2ZWQgKHZhbCkge1xyXG5cdFx0XHRcdGlmICggdmFsID09IHRoaXMuY3VycmVudCApIHtcclxuXHRcdFx0XHRcdHJldHVybiB7J2JhY2tncm91bmQtY29sb3InOiB0aGlzLnNraW5Db2xvci5tZW51QWN0aXZlQmdDb2xvcn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNoYW5nZU1vZGUgKCkge1xyXG5cdFx0XHRcdGNvbnN0IHNraW4gPSB0aGlzLnNraW5Nb2RlID09ICdkZWZhdWx0JyA/ICduaWdodCcgOiAnZGVmYXVsdCc7XHJcblx0XHRcdFx0dGhpcy5jaGFuZ2VTa2luKHNraW4pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL+S7heS7heaYvuekuue7hOS7tu+8jOW5tuS4jeaYvuekuuiPnOWNleWSjOmBrue9qeWxglxyXG5cdFx0XHRvcGVuICgpIHtcclxuXHRcdFx0XHR0aGlzLmlzU2hvdyA9IHRydWU7XHJcblx0XHRcdH0sXHJcblx0XHRcdC8v5pi+56S65Ye66I+c5Y2V5ZKM6YGu572p5bGCXHJcblx0XHRcdHNob3cgKCkge1xyXG5cdFx0XHRcdHRoaXMuaXNTaG93ID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLiRuZXh0VGljaygoKSA9PiB7XHJcblx0XHRcdFx0XHRhbmltYXRpb24udHJhbnNpdGlvbih0aGlzLiRyZWZzLm1hc2ssIHtcclxuXHRcdFx0XHRcdCAgICBzdHlsZXM6IHtcclxuXHRcdFx0XHRcdFx0XHRvcGFjaXR5OiB0aGlzLmFuaW1hLm9wYWNcclxuXHRcdFx0XHRcdCAgICB9LFxyXG5cdFx0XHRcdFx0ICAgIGR1cmF0aW9uOiB0aGlzLmFuaW1hLmR1cmF0aW9uLCAvL21zXHJcblx0XHRcdFx0XHQgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJyxcclxuXHRcdFx0XHRcdCAgICBuZWVkTGF5b3V0OmZhbHNlLFxyXG5cdFx0XHRcdFx0ICAgIGRlbGF5OiAwIC8vbXNcclxuXHRcdFx0XHRcdH0sIChyZXMpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5tYXNrT3BhY2l0eSA9IHRoaXMuYW5pbWEub3BhYztcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRhbmltYXRpb24udHJhbnNpdGlvbih0aGlzLiRyZWZzLnBvcHVwLCB7XHJcblx0XHRcdFx0XHQgICAgc3R5bGVzOiB7XHJcblx0XHRcdFx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcclxuXHRcdFx0XHRcdCAgICB9LFxyXG5cdFx0XHRcdFx0ICAgIGR1cmF0aW9uOiB0aGlzLmFuaW1hLmR1cmF0aW9uLCAvL21zXHJcblx0XHRcdFx0XHQgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJyxcclxuXHRcdFx0XHRcdCAgICBuZWVkTGF5b3V0OmZhbHNlLFxyXG5cdFx0XHRcdFx0ICAgIGRlbGF5OiAwIC8vbXNcclxuXHRcdFx0XHRcdH0sIChyZXMpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5wb3B1cGxhdGUgPSAwO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvL+WFs+mXreWFqOmDqFxyXG5cdFx0XHRoaWRlICgpIHtcclxuXHRcdFx0XHRhbmltYXRpb24udHJhbnNpdGlvbih0aGlzLiRyZWZzLm1hc2ssIHtcclxuXHRcdFx0XHQgICAgc3R5bGVzOiB7XHJcblx0XHRcdFx0XHRcdG9wYWNpdHk6IDBcclxuXHRcdFx0XHQgICAgfSxcclxuXHRcdFx0XHQgICAgZHVyYXRpb246IHRoaXMuYW5pbWEuZHVyYXRpb24sIC8vbXNcclxuXHRcdFx0XHQgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJyxcclxuXHRcdFx0XHQgICAgbmVlZExheW91dDpmYWxzZSxcclxuXHRcdFx0XHQgICAgZGVsYXk6IDAgLy9tc1xyXG5cdFx0XHRcdH0sIChyZXMpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMubWFza09wYWNpdHkgPSAwO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0YW5pbWF0aW9uLnRyYW5zaXRpb24odGhpcy4kcmVmcy5wb3B1cCwge1xyXG5cdFx0XHRcdCAgICBzdHlsZXM6IHtcclxuXHRcdFx0XHRcdFx0dHJhbnNmb3JtOiAndHJhbnNsYXRlWCgnICsgdGhpcy5hbmltYS5sYXRlICsgJ3JweCknXHJcblx0XHRcdFx0ICAgIH0sXHJcblx0XHRcdFx0ICAgIGR1cmF0aW9uOiB0aGlzLmFuaW1hLmR1cmF0aW9uLCAvL21zXHJcblx0XHRcdFx0ICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZScsXHJcblx0XHRcdFx0ICAgIG5lZWRMYXlvdXQ6ZmFsc2UsXHJcblx0XHRcdFx0ICAgIGRlbGF5OiAwIC8vbXNcclxuXHRcdFx0XHR9LCAocmVzKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmlzU2hvdyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0dGhpcy5wb3B1cGxhdGUgPSB0aGlzLmFuaW1hLmxhdGU7XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0dG91Y2hzdGFydCAoZSkge1xyXG5cdFx0XHRcdGlmICggZS50b3VjaGVzLmxlbmd0aCA+IDEgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xyXG5cdFx0XHRcdHRoaXMucG9pbnRYID0gdG91Y2gucGFnZVg7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRvdWNobW92ZSAoZSkge1xyXG5cdFx0XHRcdGlmICggZS50b3VjaGVzLmxlbmd0aCA+IDEgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucG9pbnRYIC0gdG91Y2gucGFnZVgpO1xyXG5cdFx0XHRcdHRoaXMucG9wdXBsYXRlID0gMCAtIDEuNSAqICh0aGlzLnBvaW50WCAtIHRvdWNoLnBhZ2VYKTtcclxuXHRcdFx0XHRpZiAoIHRoaXMucG9wdXBsYXRlIDw9IC01NDAgKSB7XHJcblx0XHRcdFx0XHR0aGlzLnBvcHVwbGF0ZSA9IC01NDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggdGhpcy5wb3B1cGxhdGUgPj0gMCApIHtcclxuXHRcdFx0XHRcdHRoaXMucG9wdXBsYXRlID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5tYXNrT3BhY2l0eSA9IE1hdGguYWJzKHRoaXMuYW5pbWEubGF0ZSAtIHRoaXMucG9wdXBsYXRlKSAvIE1hdGguYWJzKHRoaXMuYW5pbWEubGF0ZSkgKiB0aGlzLmFuaW1hLm9wYWM7XHJcblx0XHRcdFx0aWYgKCB0aGlzLm1hc2tPcGFjaXR5IDw9IDAgKSB7XHJcblx0XHRcdFx0XHR0aGlzLm1hc2tPcGFjaXR5ID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCB0aGlzLm1hc2tPcGFjaXR5ID49IHRoaXMuYW5pbWEub3BhYyApIHtcclxuXHRcdFx0XHRcdHRoaXMubWFza09wYWNpdHkgPSB0aGlzLmFuaW1hLm9wYWM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0b3VjaGVuZCAoZSkge1xyXG5cdFx0XHRcdGlmICggdGhpcy5wb3B1cGxhdGUgPD0gLTMwMCApIHtcclxuXHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnNob3coKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5wb2ludFggPSAwO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0d2F0Y2g6IHtcclxuXHRcdFx0Y3VycmVudCAodmFsKSB7XHJcblx0XHRcdFx0dGhpcy4kZW1pdCgnY2hhbmdlJywgdmFsKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJhbnNsYXRlICh2YWwpIHtcclxuXHRcdFx0XHR0aGlzLnBvcHVwbGF0ZSA9IHZhbCArIHRoaXMuYW5pbWEubGF0ZTtcclxuXHRcdFx0XHRpZiAoIHRoaXMucG9wdXBsYXRlID4gMCApIHtcclxuXHRcdFx0XHRcdHRoaXMucG9wdXBsYXRlID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdG9wYWNpdHkgKHZhbCkge1xyXG5cdFx0XHRcdHRoaXMubWFza09wYWNpdHkgPSB2YWw7XHJcblx0XHRcdFx0aWYgKCB0aGlzLm1hc2tPcGFjaXR5ID4gdGhpcy5hbmltYS5vcGFjICkge1xyXG5cdFx0XHRcdFx0dGhpcy5tYXNrT3BhY2l0eSA9IHRoaXMuYW5pbWEub3BhY1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGNvbXBvbmVudHM6IHtcclxuXHRcdFx0Q0ljb25cclxuXHRcdH1cblx0fVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0Lm1lbnUge1xyXG5cdFx0cG9zaXRpb246IGZpeGVkO1xyXG5cdFx0dG9wOiAwO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdHJpZ2h0OiAwO1xyXG5cdFx0Ym90dG9tOiAwO1xyXG5cdH1cclxuXHQubWFzayB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDA7XHJcblx0XHRsZWZ0OiAwO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHRib3R0b206IDA7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xyXG5cdH1cclxuXHQucG9wdXAge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAwO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdGJvdHRvbTogMDtcclxuXHRcdHdpZHRoOiA1NDBycHg7XHJcblx0XHRib3gtc2hhZG93OiAycHggMCA4cHggcmdiYSgwLDAsMCwwLjEpO1xyXG5cdH1cclxuXHQudG9wLWltZyB7XHJcblx0XHRoZWlnaHQ6IDM1MHJweDtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdG1hcmdpbi1ib3R0b206IDEwcHg7XHJcblx0fVxyXG5cdC5iZyB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDA7XHJcblx0XHRsZWZ0OiAwO1xyXG5cdFx0cmlnaHQ6IDA7XHJcblx0XHRib3R0b206IDA7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjNjY2O1xyXG5cdH1cclxuXHQudG9wLW1hc2sge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG5cdFx0dG9wOiAwO1xyXG5cdFx0bGVmdDogMDtcclxuXHRcdHJpZ2h0OiAwO1xyXG5cdFx0Ym90dG9tOiAwO1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzAwMDtcclxuXHR9XHJcblx0LmhyIHtcclxuXHRcdGhlaWdodDogMXB4O1xyXG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjogI0UwRTBFMDsgKi9cclx0XHRtYXJnaW4tdG9wOiAxMHB4O1xyXG5cdFx0bWFyZ2luLWJvdHRvbTogMTBweDtcblx0fVxyXG5cdC5saXN0IHtcclxuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cdFx0aGVpZ2h0OiA2MHB4O1xyXG5cdH1cclxuXHQubGlzdC1yaWdodCB7XHJcblx0XHRmbGV4OiAxO1xyXG5cdFx0YWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG5cdH1cclxuXHQubGlzdC1hY3RpdmVkIHtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICNEREREREQ7XHJcblx0fVxyXG5cdC5saXN0LWFjdGl2ZWQtMiB7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjMzQzNDM0O1xyXG5cdH1cclxuXHQuaWNvbiB7XHJcblx0XHR3aWR0aDogMzVweDtcclxuXHRcdG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG5cdFx0bWFyZ2luLXJpZ2h0OiAzNXB4O1xyXG5cdH1cclxuXHQudGl0bGUge1xyXG5cdFx0Zm9udC1zaXplOiAxODtcclxuXHR9XG48L3N0eWxlPlxuIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi9zdHlsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0yIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9tZW51Lm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4taGJ1aWxkZXJ4L3BhY2thZ2VzL3dlYnBhY2stdW5pLW52dWUtbG9hZGVyL2xpYi9zdHlsZS5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0yIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9tZW51Lm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIm1lbnVcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwidG9wXCI6IDAsXG4gICAgXCJsZWZ0XCI6IDAsXG4gICAgXCJyaWdodFwiOiAwLFxuICAgIFwiYm90dG9tXCI6IDBcbiAgfSxcbiAgXCJtYXNrXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiAwLFxuICAgIFwibGVmdFwiOiAwLFxuICAgIFwicmlnaHRcIjogMCxcbiAgICBcImJvdHRvbVwiOiAwLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzAwMDAwMFwiXG4gIH0sXG4gIFwicG9wdXBcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IDAsXG4gICAgXCJsZWZ0XCI6IDAsXG4gICAgXCJib3R0b21cIjogMCxcbiAgICBcIndpZHRoXCI6IFwiNTQwcnB4XCIsXG4gICAgXCJib3hTaGFkb3dcIjogXCIycHggMCA4cHggcmdiYSgwLDAsMCwwLjEpXCJcbiAgfSxcbiAgXCJ0b3AtaW1nXCI6IHtcbiAgICBcImhlaWdodFwiOiBcIjM1MHJweFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTBcIlxuICB9LFxuICBcImJnXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcInRvcFwiOiAwLFxuICAgIFwibGVmdFwiOiAwLFxuICAgIFwicmlnaHRcIjogMCxcbiAgICBcImJvdHRvbVwiOiAwLFxuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzY2NjY2NlwiXG4gIH0sXG4gIFwidG9wLW1hc2tcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJhYnNvbHV0ZVwiLFxuICAgIFwidG9wXCI6IDAsXG4gICAgXCJsZWZ0XCI6IDAsXG4gICAgXCJyaWdodFwiOiAwLFxuICAgIFwiYm90dG9tXCI6IDAsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCIjMDAwMDAwXCJcbiAgfSxcbiAgXCJoclwiOiB7XG4gICAgXCJoZWlnaHRcIjogXCIxXCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMFwiLFxuICAgIFwibWFyZ2luQm90dG9tXCI6IFwiMTBcIlxuICB9LFxuICBcImxpc3RcIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImNlbnRlclwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiNjBcIlxuICB9LFxuICBcImxpc3QtcmlnaHRcIjoge1xuICAgIFwiZmxleFwiOiAxLFxuICAgIFwiYWxpZ25JdGVtc1wiOiBcImZsZXgtZW5kXCJcbiAgfSxcbiAgXCJsaXN0LWFjdGl2ZWRcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI0RERERERFwiXG4gIH0sXG4gIFwibGlzdC1hY3RpdmVkLTJcIjoge1xuICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiIzM0MzQzNFwiXG4gIH0sXG4gIFwiaWNvblwiOiB7XG4gICAgXCJ3aWR0aFwiOiBcIjM1XCIsXG4gICAgXCJtYXJnaW5MZWZ0XCI6IFwiMjBcIixcbiAgICBcIm1hcmdpblJpZ2h0XCI6IFwiMzVcIlxuICB9LFxuICBcInRpdGxlXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IDE4XG4gIH1cbn0iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luZGV4Lm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1iODIyOWJjYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZtcFR5cGU9cGFnZVwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi1oYnVpbGRlcngvcGFja2FnZXMvd2VicGFjay11bmktbnZ1ZS1sb2FkZXIvbGliL3N0eWxlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS04LW9uZU9mLTAtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tOC1vbmVPZi0wLTIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTgtb25lT2YtMC0zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2luZGV4Lm52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1iODIyOWJjYyZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZtcFR5cGU9cGFnZVwiIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiYm9va1wiOiB7XG4gICAgXCJtYXJnaW5Ub3BcIjogXCIxMFwiLFxuICAgIFwicG9zaXRpb25cIjogXCJyZWxhdGl2ZVwiLFxuICAgIFwiaGVpZ2h0XCI6IFwiMTkwXCJcbiAgfSxcbiAgXCJib29rLWltZ1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogMCxcbiAgICBcImxlZnRcIjogMCxcbiAgICBcInJpZ2h0XCI6IDAsXG4gICAgXCJib3R0b21cIjogMFxuICB9LFxuICBcImJvb2stbWFza1wiOiB7XG4gICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgXCJ0b3BcIjogMCxcbiAgICBcImxlZnRcIjogMCxcbiAgICBcInJpZ2h0XCI6IDAsXG4gICAgXCJib3R0b21cIjogMCxcbiAgICBcImJhY2tncm91bmRDb2xvclwiOiBcIiMwMDAwMDBcIlxuICB9LFxuICBcImJvb2stYm90dG9tXCI6IHtcbiAgICBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIixcbiAgICBcImJvdHRvbVwiOiAwLFxuICAgIFwibGVmdFwiOiAwLFxuICAgIFwicmlnaHRcIjogMCxcbiAgICBcImhlaWdodFwiOiBcIjgwcnB4XCIsXG4gICAgXCJiYWNrZ3JvdW5kQ29sb3JcIjogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNClcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiY2VudGVyXCIsXG4gICAgXCJwYWRkaW5nVG9wXCI6IDAsXG4gICAgXCJwYWRkaW5nUmlnaHRcIjogXCI1XCIsXG4gICAgXCJwYWRkaW5nQm90dG9tXCI6IDAsXG4gICAgXCJwYWRkaW5nTGVmdFwiOiBcIjVcIlxuICB9LFxuICBcImJvb2stbmFtZVwiOiB7XG4gICAgXCJmb250U2l6ZVwiOiBcIjIycnB4XCIsXG4gICAgXCJjb2xvclwiOiBcIiMzMzMzMzNcIixcbiAgICBcImxpbmVzXCI6IDEsXG4gICAgXCJ0ZXh0T3ZlcmZsb3dcIjogXCJlbGxpcHNpc1wiXG4gIH0sXG4gIFwiYi1ib3R0b21cIjoge1xuICAgIFwiZmxleERpcmVjdGlvblwiOiBcInJvd1wiLFxuICAgIFwianVzdGlmeUNvbnRlbnRcIjogXCJzcGFjZS1iZXR3ZWVuXCJcbiAgfSxcbiAgXCJib29rLXRpbWVcIjoge1xuICAgIFwiZm9udFNpemVcIjogXCIxOHJweFwiLFxuICAgIFwiY29sb3JcIjogXCIjNjY2NjY2XCIsXG4gICAgXCJtYXJnaW5Ub3BcIjogXCI1XCJcbiAgfSxcbiAgXCJib29rLXByb2dyZXNzXCI6IHtcbiAgICBcImZvbnRTaXplXCI6IFwiMThycHhcIixcbiAgICBcImNvbG9yXCI6IFwiIzY2NjY2NlwiLFxuICAgIFwibWFyZ2luVG9wXCI6IFwiNVwiXG4gIH0sXG4gIFwibmF2LWxlZnRcIjoge1xuICAgIFwibWFyZ2luUmlnaHRcIjogXCI2MHJweFwiXG4gIH0sXG4gIFwiZml4ZWRcIjoge1xuICAgIFwicG9zaXRpb25cIjogXCJmaXhlZFwiLFxuICAgIFwiYm90dG9tXCI6IFwiMjBcIixcbiAgICBcInJpZ2h0XCI6IFwiMjBcIixcbiAgICBcIndpZHRoXCI6IFwiNTBcIixcbiAgICBcImFsaWduSXRlbXNcIjogXCJjZW50ZXJcIixcbiAgICBcImp1c3RpZnlDb250ZW50XCI6IFwiZmxleC1lbmRcIlxuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==