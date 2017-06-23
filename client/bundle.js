(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['mutation (\n  $username: String!, \n  $firstname: String!, \n  $lastname: String!, \n  $phoneNumber: String!,\n  $password: String!,\n  $roles: [Roles!]){\n  signUp(username: $username, password: $password, firstName: $firstname, lastName: $lastname, phoneNumber: $phoneNumber, roles: $roles)\n  {\n    _id\n    username\n    roles\n  }\n}'], ['mutation (\n  $username: String!, \n  $firstname: String!, \n  $lastname: String!, \n  $phoneNumber: String!,\n  $password: String!,\n  $roles: [Roles!]){\n  signUp(username: $username, password: $password, firstName: $firstname, lastName: $lastname, phoneNumber: $phoneNumber, roles: $roles)\n  {\n    _id\n    username\n    roles\n  }\n}']),
    _templateObject2 = _taggedTemplateLiteral(['mutation ($username: String!, $password: String!){\n  logIn(username: $username, password: $password) {\n    token\n    user {\n      _id\n      username\n      roles\n    }\n  }\n}'], ['mutation ($username: String!, $password: String!){\n  logIn(username: $username, password: $password) {\n    token\n    user {\n      _id\n      username\n      roles\n    }\n  }\n}']),
    _templateObject3 = _taggedTemplateLiteral(['query ($webtoken: String!) {\n  allOrders(webtoken: $webtoken) {\n        _id\n        user {\n          _id\n          username\n          firstName\n          lastName\n        }\n        items {\n          itemDescription\n          itemPrice\n        }\n        total\n        statusMessage\n        fulfilled\n        createdAt\n\t}\n}'], ['query ($webtoken: String!) {\n  allOrders(webtoken: $webtoken) {\n        _id\n        user {\n          _id\n          username\n          firstName\n          lastName\n        }\n        items {\n          itemDescription\n          itemPrice\n        }\n        total\n        statusMessage\n        fulfilled\n        createdAt\n\t}\n}']),
    _templateObject4 = _taggedTemplateLiteral(['query {\n  menu {\n    entrees {\n      _id\n      itemDescription\n      itemPrice\n      tags\n      sides {\n        _id\n        itemDescription\n        tags\n      }\n      upsells {\n        _id\n        itemDescription\n        itemPrice\n        tags\n      }\n    }\n    sides {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    appetizers {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    deserts {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    drinks {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n  }\n}'], ['query {\n  menu {\n    entrees {\n      _id\n      itemDescription\n      itemPrice\n      tags\n      sides {\n        _id\n        itemDescription\n        tags\n      }\n      upsells {\n        _id\n        itemDescription\n        itemPrice\n        tags\n      }\n    }\n    sides {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    appetizers {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    deserts {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n    drinks {\n      _id\n      itemDescription\n      itemPrice\n      tags\n    }\n  }\n}']),
    _templateObject5 = _taggedTemplateLiteral(['', ''], ['', '']);

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } //
// Basic Test Client using Apollo Client and Apollo GraphQL-Tag template kibrary
// No React yet

var networkInterface = (0, _apolloClient.createNetworkInterface)({ uri: 'http://localhost:3030/graphql' });

var webtoken = "";

//
// When upgrading to latest feathers-authentication
// we'll need to generate anonymous auth token from /auth/local, save it in localstorage
// and add it to every request
//
// networkInterface.use([{
//   applyMiddleware(req, next) {
//     if (!req.options.headers) {
//       req.options.headers = {};  // Create the header object if needed.
//     }
//     req.options.headers = {
//       authorization: localStorage.getItem('feathers-anon-jwt') ? localStorage.getItem('feathers-anon-jwt') : null
//     }
//     next();
//   }
// }]);

// todo: update to new way of doing this
var client = new _apolloClient2.default({
  networkInterface: networkInterface
});

var displayResult = function displayResult(result) {
  document.querySelector('.result').innerHTML = JSON.stringify(result, null, 2);
};

var displayToken = function displayToken(token) {
  document.querySelector('.token').innerHTML = token;
};

var displayLiveResults = function displayLiveResults(result, type) {
  var el = document.querySelector('.liveResult.' + type);
  el.innerHTML = JSON.stringify(result, null, 2);
  el.classList.add('alert');
  setTimeout(function () {
    return el.classList.remove('alert');
  }, 200);
};

var signupMutation = (0, _graphqlTag2.default)(_templateObject);

var loginMutation = (0, _graphqlTag2.default)(_templateObject2);

var ordersQuery = (0, _graphqlTag2.default)(_templateObject3);

var menuQuery = (0, _graphqlTag2.default)(_templateObject4);

var observableMenuQuery = client.watchQuery({ fetchPolicy: 'network-only', query: menuQuery, pollInterval: 1000 });
observableMenuQuery.subscribe({
  next: function next(_ref) {
    var data = _ref.data;
    return displayLiveResults(data, "menu");
  }
});

document.querySelector('.signup').addEventListener('click', function () {
  var username = document.getElementById('signup_username').value;
  var password = document.getElementById('signup_password').value;
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var phoneNumber = document.getElementById('phone_number').value;
  var roles = [document.getElementById('role').value];

  client.mutate({ mutation: signupMutation, fetchPolicy: 'network-only', variables: { username: username, firstname: firstname, lastname: lastname, phoneNumber: phoneNumber, password: password, roles: roles } }).then(displayResult, displayResult);
});

document.querySelector('.run').addEventListener('click', function () {
  var input = document.querySelector('.test-input').value;

  if (input.trim().indexOf("mutation") === 0) {
    client.mutate({ mutation: (0, _graphqlTag2.default)(_templateObject5, input), fetchPolicy: 'network-only' }).then(displayResult, displayResult);
  }

  if (input.trim().indexOf("query") === 0) {
    client.query({ query: (0, _graphqlTag2.default)(_templateObject5, input), fetchPolicy: 'network-only' }).then(displayResult, displayResult);
  }
});

document.querySelector('.clear').addEventListener('click', function (e) {
  document.querySelector('.test-input').value = "";
});

var observableOrdersQuery, ordersSubscription;

document.querySelector('.login').addEventListener('click', function () {
  var username = document.getElementById('login_username').value;
  var password = document.getElementById('login_password').value;

  client.mutate({ mutation: loginMutation, fetchPolicy: 'network-only', variables: { username: username, password: password } }).then(function (result) {
    if (result.data && result.data.logIn && result.data.logIn.token) {
      webtoken = result.data.logIn.token;
      displayToken(webtoken);
      if (observableOrdersQuery) {
        observableOrdersQuery.stopPolling();
      }
      if (ordersSubscription) {
        ordersSubscription.unsubscribe();
      }

      observableOrdersQuery = client.watchQuery({ fetchPolicy: 'network-only', query: ordersQuery, variables: { webtoken: webtoken }, pollInterval: 1000 });
      ordersSubscription = observableOrdersQuery.subscribe({
        next: function next(_ref2) {
          var data = _ref2.data;
          return displayLiveResults(data, "orders");
        }
      });
    }
    displayResult(result);
  }, displayResult);
});

//
// ignore everything below (copy to clipboard functionality for test client)
//

var txt = document.querySelector('.token');
var btn = document.querySelector('.copy');

var clipboard = {
  data: '',
  intercept: false,
  hook: function hook(evt) {
    if (clipboard.intercept) {
      evt.preventDefault();
      evt.clipboardData.setData('text/plain', clipboard.data);
      clipboard.intercept = false;
      clipboard.data = '';
    }
  }
};
window.addEventListener('copy', clipboard.hook);
btn.addEventListener('click', onButtonClick);
function onButtonClick() {
  clipboard.data = txt.innerText;
  if (window.clipboardData) {
    window.clipboardData.setData('Text', clipboard.data);
  } else {
    clipboard.intercept = true;
    document.execCommand('copy');
  }
}

},{"apollo-client":2,"graphql-tag":9}],2:[function(require,module,exports){
(function (process){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('whatwg-fetch'), require('graphql/language/printer'), require('redux'), require('graphql-anywhere'), require('symbol-observable')) :
	typeof define === 'function' && define.amd ? define(['exports', 'whatwg-fetch', 'graphql/language/printer', 'redux', 'graphql-anywhere', 'symbol-observable'], factory) :
	(factory((global.apollo = global.apollo || {}),null,global.graphql_language_printer,global.redux,global.graphqlAnywhere,global.$$observable));
}(this, (function (exports,whatwgFetch,graphql_language_printer,redux,graphqlAnywhere,$$observable) { 'use strict';

graphqlAnywhere = 'default' in graphqlAnywhere ? graphqlAnywhere['default'] : graphqlAnywhere;
$$observable = 'default' in $$observable ? $$observable['default'] : $$observable;

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function printRequest(request) {
    return __assign({}, request, { query: graphql_language_printer.print(request.query) });
}
var BaseNetworkInterface = (function () {
    function BaseNetworkInterface(uri, opts) {
        if (opts === void 0) { opts = {}; }
        if (!uri) {
            throw new Error('A remote endpoint is required for a network layer');
        }
        if (typeof uri !== 'string') {
            throw new Error('Remote endpoint must be a string');
        }
        this._uri = uri;
        this._opts = __assign({}, opts);
        this._middlewares = [];
        this._afterwares = [];
    }
    BaseNetworkInterface.prototype.query = function (request) {
        return new Promise(function (resolve, reject) {
            reject(new Error('BaseNetworkInterface should not be used directly'));
        });
    };
    return BaseNetworkInterface;
}());
var HTTPFetchNetworkInterface = (function (_super) {
    __extends(HTTPFetchNetworkInterface, _super);
    function HTTPFetchNetworkInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTTPFetchNetworkInterface.prototype.applyMiddlewares = function (requestAndOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = requestAndOptions.request, options = requestAndOptions.options;
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyMiddleware.apply(scope, [{ request: request, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            request: request,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.applyAfterwares = function (_a) {
        var _this = this;
        var response = _a.response, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { response: response, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPFetchNetworkInterface.prototype.fetchFromRemoteEndpoint = function (_a) {
        var request = _a.request, options = _a.options;
        return fetch(this._uri, __assign({}, this._opts, { body: JSON.stringify(printRequest(request)), method: 'POST' }, options, { headers: __assign({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    HTTPFetchNetworkInterface.prototype.query = function (request) {
        var _this = this;
        var options = __assign({}, this._opts);
        return this.applyMiddlewares({
            request: request,
            options: options,
        }).then(function (rao) { return _this.fetchFromRemoteEndpoint.call(_this, rao); })
            .then(function (response) { return _this.applyAfterwares({
            response: response,
            options: options,
        }); })
            .then(function (_a) {
            var response = _a.response;
            var httpResponse = response;
            return httpResponse.json().catch(function (error) {
                var httpError = new Error("Network request failed with status " + response.status + " - \"" + response.statusText + "\"");
                httpError.response = httpResponse;
                httpError.parseError = error;
                throw httpError;
            });
        })
            .then(function (payload) {
            if (!payload.hasOwnProperty('data') && !payload.hasOwnProperty('errors')) {
                throw new Error("Server response was missing for query '" + request.debugName + "'.");
            }
            else {
                return payload;
            }
        });
    };
    HTTPFetchNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Middleware must implement the applyMiddleware function');
            }
        });
        return this;
    };
    HTTPFetchNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Afterware must implement the applyAfterware function');
            }
        });
        return this;
    };
    return HTTPFetchNetworkInterface;
}(BaseNetworkInterface));
function createNetworkInterface(uriOrInterfaceOpts, secondArgOpts) {
    if (secondArgOpts === void 0) { secondArgOpts = {}; }
    if (!uriOrInterfaceOpts) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    var uri;
    var opts;
    if (typeof uriOrInterfaceOpts === 'string') {
        console.warn("Passing the URI as the first argument to createNetworkInterface is deprecated as of Apollo Client 0.5. Please pass it as the \"uri\" property of the network interface options.");
        opts = secondArgOpts;
        uri = uriOrInterfaceOpts;
    }
    else {
        opts = uriOrInterfaceOpts.opts;
        uri = uriOrInterfaceOpts.uri;
    }
    return new HTTPFetchNetworkInterface(uri, opts);
}

var QueryBatcher = (function () {
    function QueryBatcher(_a) {
        var batchInterval = _a.batchInterval, batchFetchFunction = _a.batchFetchFunction;
        this.queuedRequests = [];
        this.queuedRequests = [];
        this.batchInterval = batchInterval;
        this.batchFetchFunction = batchFetchFunction;
    }
    QueryBatcher.prototype.enqueueRequest = function (request) {
        var fetchRequest = {
            request: request,
        };
        this.queuedRequests.push(fetchRequest);
        fetchRequest.promise = new Promise(function (resolve, reject) {
            fetchRequest.resolve = resolve;
            fetchRequest.reject = reject;
        });
        if (this.queuedRequests.length === 1) {
            this.scheduleQueueConsumption();
        }
        return fetchRequest.promise;
    };
    QueryBatcher.prototype.consumeQueue = function () {
        var requests = this.queuedRequests.map(function (queuedRequest) { return queuedRequest.request; });
        var promises = [];
        var resolvers = [];
        var rejecters = [];
        this.queuedRequests.forEach(function (fetchRequest, index) {
            promises.push(fetchRequest.promise);
            resolvers.push(fetchRequest.resolve);
            rejecters.push(fetchRequest.reject);
        });
        this.queuedRequests = [];
        var batchedPromise = this.batchFetchFunction(requests);
        batchedPromise.then(function (results) {
            results.forEach(function (result, index) {
                resolvers[index](result);
            });
        }).catch(function (error) {
            rejecters.forEach(function (rejecter, index) {
                rejecters[index](error);
            });
        });
        return promises;
    };
    QueryBatcher.prototype.scheduleQueueConsumption = function () {
        var _this = this;
        setTimeout(function () {
            _this.consumeQueue();
        }, this.batchInterval);
    };
    return QueryBatcher;
}());

function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        if (typeof (source) === 'undefined' || source === null) {
            return;
        }
        Object.keys(source).forEach(function (key) {
            target[key] = source[key];
        });
    });
    return target;
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var HTTPBatchedNetworkInterface = (function (_super) {
    __extends$1(HTTPBatchedNetworkInterface, _super);
    function HTTPBatchedNetworkInterface(uri, batchInterval, fetchOpts) {
        var _this = _super.call(this, uri, fetchOpts) || this;
        if (typeof batchInterval !== 'number') {
            throw new Error("batchInterval must be a number, got " + batchInterval);
        }
        _this.batcher = new QueryBatcher({
            batchInterval: batchInterval,
            batchFetchFunction: _this.batchQuery.bind(_this),
        });
        return _this;
    }
    HTTPBatchedNetworkInterface.prototype.query = function (request) {
        return this.batcher.enqueueRequest(request);
    };
    HTTPBatchedNetworkInterface.prototype.batchQuery = function (requests) {
        var _this = this;
        var options = __assign$1({}, this._opts);
        var middlewarePromise = this.applyBatchMiddlewares({
            requests: requests,
            options: options,
        });
        return new Promise(function (resolve, reject) {
            middlewarePromise.then(function (batchRequestAndOptions) {
                return _this.batchedFetchFromRemoteEndpoint(batchRequestAndOptions)
                    .then(function (result) {
                    var httpResponse = result;
                    if (!httpResponse.ok) {
                        return _this.applyBatchAfterwares({ responses: [httpResponse], options: batchRequestAndOptions })
                            .then(function () {
                            var httpError = new Error("Network request failed with status " + httpResponse.status + " - \"" + httpResponse.statusText + "\"");
                            httpError.response = httpResponse;
                            throw httpError;
                        });
                    }
                    return result.json();
                })
                    .then(function (responses) {
                    if (typeof responses.map !== 'function') {
                        throw new Error('BatchingNetworkInterface: server response is not an array');
                    }
                    _this.applyBatchAfterwares({
                        responses: responses,
                        options: batchRequestAndOptions.options,
                    }).then(function (responseAndOptions) {
                        resolve(responseAndOptions.responses);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchMiddlewares = function (_a) {
        var _this = this;
        var requests = _a.requests, options = _a.options;
        return new Promise(function (resolve, reject) {
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchMiddleware.apply(scope, [{ requests: requests, options: options }, next]);
                        }
                    }
                    else {
                        resolve({
                            requests: requests,
                            options: options,
                        });
                    }
                };
                next();
            };
            queue(_this._middlewares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.applyBatchAfterwares = function (_a) {
        var _this = this;
        var responses = _a.responses, options = _a.options;
        return new Promise(function (resolve, reject) {
            var responseObject = { responses: responses, options: options };
            var queue = function (funcs, scope) {
                var next = function () {
                    if (funcs.length > 0) {
                        var f = funcs.shift();
                        if (f) {
                            f.applyBatchAfterware.apply(scope, [responseObject, next]);
                        }
                    }
                    else {
                        resolve(responseObject);
                    }
                };
                next();
            };
            queue(_this._afterwares.slice(), _this);
        });
    };
    HTTPBatchedNetworkInterface.prototype.use = function (middlewares) {
        var _this = this;
        middlewares.map(function (middleware) {
            if (typeof middleware.applyBatchMiddleware === 'function') {
                _this._middlewares.push(middleware);
            }
            else {
                throw new Error('Batch middleware must implement the applyBatchMiddleware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.useAfter = function (afterwares) {
        var _this = this;
        afterwares.map(function (afterware) {
            if (typeof afterware.applyBatchAfterware === 'function') {
                _this._afterwares.push(afterware);
            }
            else {
                throw new Error('Batch afterware must implement the applyBatchAfterware function');
            }
        });
        return this;
    };
    HTTPBatchedNetworkInterface.prototype.batchedFetchFromRemoteEndpoint = function (batchRequestAndOptions) {
        var options = {};
        assign(options, batchRequestAndOptions.options);
        var printedRequests = batchRequestAndOptions.requests.map(function (request) {
            return printRequest(request);
        });
        return fetch(this._uri, __assign$1({}, this._opts, { body: JSON.stringify(printedRequests), method: 'POST' }, options, { headers: __assign$1({ Accept: '*/*', 'Content-Type': 'application/json' }, options.headers) }));
    };
    return HTTPBatchedNetworkInterface;
}(BaseNetworkInterface));
function createBatchingNetworkInterface(options) {
    if (!options) {
        throw new Error('You must pass an options argument to createNetworkInterface.');
    }
    return new HTTPBatchedNetworkInterface(options.uri, options.batchInterval, options.opts || {});
}

function isQueryResultAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT';
}
function isQueryErrorAction(action) {
    return action.type === 'APOLLO_QUERY_ERROR';
}
function isQueryInitAction(action) {
    return action.type === 'APOLLO_QUERY_INIT';
}
function isQueryResultClientAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT_CLIENT';
}
function isQueryStopAction(action) {
    return action.type === 'APOLLO_QUERY_STOP';
}
function isMutationInitAction(action) {
    return action.type === 'APOLLO_MUTATION_INIT';
}
function isMutationResultAction(action) {
    return action.type === 'APOLLO_MUTATION_RESULT';
}
function isMutationErrorAction(action) {
    return action.type === 'APOLLO_MUTATION_ERROR';
}
function isUpdateQueryResultAction(action) {
    return action.type === 'APOLLO_UPDATE_QUERY_RESULT';
}
function isStoreResetAction(action) {
    return action.type === 'APOLLO_STORE_RESET';
}
function isSubscriptionResultAction(action) {
    return action.type === 'APOLLO_SUBSCRIPTION_RESULT';
}
function isWriteAction(action) {
    return action.type === 'APOLLO_WRITE';
}

function isStringValue(value) {
    return value.kind === 'StringValue';
}
function isBooleanValue(value) {
    return value.kind === 'BooleanValue';
}
function isIntValue(value) {
    return value.kind === 'IntValue';
}
function isFloatValue(value) {
    return value.kind === 'FloatValue';
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObjectValue(value) {
    return value.kind === 'ObjectValue';
}
function isListValue(value) {
    return value.kind === 'ListValue';
}
function isEnumValue(value) {
    return value.kind === 'EnumValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) { return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables); });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported.\n                    Use variables instead of inline arguments to overcome this limitation.");
    }
}
function storeKeyNameFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return storeKeyNameFromFieldNameAndArgs(field.name.value, argObj_1);
    }
    return field.name.value;
}
function storeKeyNameFromFieldNameAndArgs(fieldName, args) {
    if (args) {
        var stringifiedArgs = JSON.stringify(args);
        return fieldName + "(" + stringifiedArgs + ")";
    }
    return fieldName;
}
function resultKeyNameFromField(field) {
    return field.alias ?
        field.alias.value :
        field.name.value;
}
function isField(selection) {
    return selection.kind === 'Field';
}
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
function isIdValue(idObject) {
    return (idObject != null &&
        typeof idObject === 'object' &&
        idObject.type === 'id');
}
function toIdValue(id, generated) {
    if (generated === void 0) { generated = false; }
    return {
        type: 'id',
        id: id,
        generated: generated,
    };
}
function isJsonValue(jsonObject) {
    return (jsonObject != null &&
        typeof jsonObject === 'object' &&
        jsonObject.type === 'json');
}

var __assign$5 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function getMutationDefinition(doc) {
    checkDocument(doc);
    var mutationDef = null;
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'mutation') {
            mutationDef = definition;
        }
    });
    if (!mutationDef) {
        throw new Error('Must contain a mutation definition.');
    }
    return mutationDef;
}
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var foundOperation = false;
    doc.definitions.forEach(function (definition) {
        switch (definition.kind) {
            case 'FragmentDefinition':
                break;
            case 'OperationDefinition':
                if (foundOperation) {
                    throw new Error('Queries must have exactly one operation definition.');
                }
                foundOperation = true;
                break;
            default:
                throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
        }
    });
}
function getOperationName(doc) {
    var res = '';
    doc.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition' && definition.name) {
            res = definition.name.value;
        }
    });
    return res;
}
function getFragmentDefinitions(doc) {
    var fragmentDefinitions = doc.definitions.filter(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
            return true;
        }
        else {
            return false;
        }
    });
    return fragmentDefinitions;
}
function getQueryDefinition(doc) {
    checkDocument(doc);
    var queryDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition'
            && definition.operation === 'query') {
            queryDef = definition;
        }
    });
    if (!queryDef) {
        throw new Error('Must contain a query definition.');
    }
    return queryDef;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    var opDef = null;
    doc.definitions.map(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            opDef = definition;
        }
    });
    if (!opDef) {
        throw new Error('Must contain a query definition.');
    }
    return opDef;
}

function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    var fragments = [];
    document.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            throw new Error("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        }
        if (definition.kind === 'FragmentDefinition') {
            fragments.push(definition);
        }
    });
    if (typeof actualFragmentName === 'undefined') {
        if (fragments.length !== 1) {
            throw new Error("Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
        }
        actualFragmentName = fragments[0].name.value;
    }
    var query = __assign$5({}, document, { definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'FragmentSpread',
                            name: {
                                kind: 'Name',
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ].concat(document.definitions) });
    return query;
}
function getDefaultValues(definition) {
    if (definition.variableDefinitions && definition.variableDefinitions.length) {
        var defaultValues = definition.variableDefinitions
            .filter(function (_a) {
            var defaultValue = _a.defaultValue;
            return defaultValue;
        })
            .map(function (_a) {
            var variable = _a.variable, defaultValue = _a.defaultValue;
            var defaultValueObj = {};
            valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
            return defaultValueObj;
        });
        return assign.apply(void 0, [{}].concat(defaultValues));
    }
    return {};
}

function shouldInclude(selection, variables) {
    if (variables === void 0) { variables = {}; }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments || [];
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directiveArguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directiveArguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a bool ean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}

function getEnv() {
    if (typeof process !== 'undefined' && process.env.NODE_ENV) {
        return process.env.NODE_ENV;
    }
    return 'development';
}
function isEnv(env) {
    return getEnv() === env;
}
function isProduction() {
    return isEnv('production') === true;
}
function isDevelopment() {
    return isEnv('development') === true;
}
function isTest() {
    return isEnv('test') === true;
}

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$4 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var WriteError = (function (_super) {
    __extends$2(WriteError, _super);
    function WriteError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'WriteError';
        return _this;
    }
    return WriteError;
}(Error));
function writeQueryToStore(_a) {
    var result = _a.result, query = _a.query, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, _c = _a.fragmentMap, fragmentMap = _c === void 0 ? {} : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var queryDefinition = getQueryDefinition(query);
    variables = assign({}, getDefaultValues(queryDefinition), variables);
    return writeSelectionSetToStore({
        dataId: 'ROOT_QUERY',
        result: result,
        selectionSet: queryDefinition.selectionSet,
        context: {
            store: store,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMap: fragmentMap,
            fragmentMatcherFunction: fragmentMatcherFunction,
        },
    });
}
function writeResultToStore(_a) {
    var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var operationDefinition = getOperationDefinition(document);
    var selectionSet = operationDefinition.selectionSet;
    var fragmentMap = createFragmentMap(getFragmentDefinitions(document));
    variables = assign({}, getDefaultValues(operationDefinition), variables);
    try {
        return writeSelectionSetToStore({
            result: result,
            dataId: dataId,
            selectionSet: selectionSet,
            context: {
                store: store,
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMap: fragmentMap,
                fragmentMatcherFunction: fragmentMatcherFunction,
            },
        });
    }
    catch (e) {
        var e2 = new Error("Error writing result to store for query " + (document.loc && document.loc.source.body));
        e2.message += '/n' + e.message;
        e2.stack = e.stack;
        throw e2;
    }
}
function writeSelectionSetToStore(_a) {
    var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
    var variables = context.variables, store = context.store, dataIdFromObject = context.dataIdFromObject, fragmentMap = context.fragmentMap;
    selectionSet.selections.forEach(function (selection) {
        var included = shouldInclude(selection, variables);
        if (isField(selection)) {
            var resultFieldKey = resultKeyNameFromField(selection);
            var value = result[resultFieldKey];
            if (included) {
                if (typeof value !== 'undefined') {
                    writeFieldToStore({
                        dataId: dataId,
                        value: value,
                        field: selection,
                        context: context,
                    });
                }
                else {
                    if (context.fragmentMatcherFunction) {
                        if (!isProduction()) {
                            console.warn("Missing field " + resultFieldKey);
                        }
                    }
                }
            }
        }
        else {
            var fragment = void 0;
            if (isInlineFragment(selection)) {
                fragment = selection;
            }
            else {
                fragment = (fragmentMap || {})[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value + ".");
                }
            }
            var matches = true;
            if (context.fragmentMatcherFunction && fragment.typeCondition) {
                var idValue = { type: 'id', id: 'self', generated: false };
                var fakeContext = {
                    store: { 'self': result },
                    returnPartialData: false,
                    hasMissingField: false,
                    customResolvers: {},
                };
                matches = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                if (fakeContext.returnPartialData) {
                    console.error('WARNING: heuristic fragment matching going on!');
                }
            }
            if (included && matches) {
                writeSelectionSetToStore({
                    result: result,
                    selectionSet: fragment.selectionSet,
                    dataId: dataId,
                    context: context,
                });
            }
        }
    });
    return store;
}
function isGeneratedId(id) {
    return (id[0] === '$');
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    var generated = cache[generatedKey];
    var real = cache[realKey];
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (isIdValue(value)
            && isGeneratedId(value.id)
            && isIdValue(realValue)) {
            mergeWithGenerated(value.id, realValue.id, cache);
        }
        delete cache[generatedKey];
        cache[realKey] = __assign$4({}, generated, real);
    });
}
function writeFieldToStore(_a) {
    var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
    var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store, fragmentMap = context.fragmentMap;
    var storeValue;
    var storeFieldName = storeKeyNameFromField(field, variables);
    var shouldMerge = false;
    var generatedKey = '';
    if (!field.selectionSet || value === null) {
        storeValue =
            value != null && typeof value === 'object'
                ? { type: 'json', json: value }
                : value;
    }
    else if (Array.isArray(value)) {
        var generatedId = dataId + "." + storeFieldName;
        storeValue = processArrayValue(value, generatedId, field.selectionSet, context);
    }
    else {
        var valueDataId = dataId + "." + storeFieldName;
        var generated = true;
        if (!isGeneratedId(valueDataId)) {
            valueDataId = '$' + valueDataId;
        }
        if (dataIdFromObject) {
            var semanticId = dataIdFromObject(value);
            if (semanticId && isGeneratedId(semanticId)) {
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            }
            if (semanticId) {
                valueDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: valueDataId,
            result: value,
            selectionSet: field.selectionSet,
            context: context,
        });
        storeValue = {
            type: 'id',
            id: valueDataId,
            generated: generated,
        };
        if (store[dataId] && store[dataId][storeFieldName] !== storeValue) {
            var escapedId = store[dataId][storeFieldName];
            if (isIdValue(storeValue) && storeValue.generated
                && isIdValue(escapedId) && !escapedId.generated) {
                throw new Error("Store error: the application attempted to write an object with no provided id" +
                    (" but the store already contains an id of " + escapedId.id + " for this object."));
            }
            if (isIdValue(escapedId) && escapedId.generated) {
                generatedKey = escapedId.id;
                shouldMerge = true;
            }
        }
    }
    var newStoreObj = __assign$4({}, store[dataId], (_b = {}, _b[storeFieldName] = storeValue, _b));
    if (shouldMerge) {
        mergeWithGenerated(generatedKey, storeValue.id, store);
    }
    if (!store[dataId] || storeValue !== store[dataId][storeFieldName]) {
        store[dataId] = newStoreObj;
    }
    var _b;
}
function processArrayValue(value, generatedId, selectionSet, context) {
    return value.map(function (item, index) {
        if (item === null) {
            return null;
        }
        var itemDataId = generatedId + "." + index;
        if (Array.isArray(item)) {
            return processArrayValue(item, itemDataId, selectionSet, context);
        }
        var generated = true;
        if (context.dataIdFromObject) {
            var semanticId = context.dataIdFromObject(item);
            if (semanticId) {
                itemDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: itemDataId,
            result: item,
            selectionSet: selectionSet,
            context: context,
        });
        var idStoreValue = {
            type: 'id',
            id: itemDataId,
            generated: generated,
        };
        return idStoreValue;
    });
}

var __assign$7 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var optimisticDefaultState = [];
function getDataWithOptimisticResults(store) {
    if (store.optimistic.length === 0) {
        return store.data;
    }
    var patches = store.optimistic.map(function (opt) { return opt.data; });
    return assign.apply(void 0, [{}, store.data].concat(patches));
}
function optimistic(previousState, action, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    if (isMutationInitAction(action) && action.optimisticResponse) {
        var fakeMutationResultAction = {
            type: 'APOLLO_MUTATION_RESULT',
            result: { data: action.optimisticResponse },
            document: action.mutation,
            operationName: action.operationName,
            variables: action.variables,
            mutationId: action.mutationId,
            extraReducers: action.extraReducers,
            updateQueries: action.updateQueries,
            update: action.update,
        };
        var optimisticData = getDataWithOptimisticResults(__assign$7({}, store, { optimistic: previousState }));
        var patch = getOptimisticDataPatch(optimisticData, fakeMutationResultAction, store.queries, store.mutations, config);
        var optimisticState = {
            action: fakeMutationResultAction,
            data: patch,
            mutationId: action.mutationId,
        };
        var newState = previousState.concat([optimisticState]);
        return newState;
    }
    else if ((isMutationErrorAction(action) || isMutationResultAction(action))
        && previousState.some(function (change) { return change.mutationId === action.mutationId; })) {
        return rollbackOptimisticData(function (change) { return change.mutationId === action.mutationId; }, previousState, store, config);
    }
    return previousState;
}
function getOptimisticDataPatch(previousData, optimisticAction, queries, mutations, config) {
    var optimisticData = data(previousData, optimisticAction, queries, mutations, config);
    var patch = {};
    Object.keys(optimisticData).forEach(function (key) {
        if (optimisticData[key] !== previousData[key]) {
            patch[key] = optimisticData[key];
        }
    });
    return patch;
}
function rollbackOptimisticData(filterFn, previousState, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    var optimisticData = assign({}, store.data);
    var newState = previousState
        .filter(function (item) { return !filterFn(item); })
        .map(function (change) {
        var patch = getOptimisticDataPatch(optimisticData, change.action, store.queries, store.mutations, config);
        assign(optimisticData, patch);
        return __assign$7({}, change, { data: patch });
    });
    return newState;
}

function isEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a != null && typeof a === 'object' && b != null && typeof b === 'object') {
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
                if (!b.hasOwnProperty(key)) {
                    return false;
                }
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
        }
        for (var key in b) {
            if (!a.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    return false;
}

var __assign$8 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ID_KEY = typeof Symbol !== 'undefined' ? Symbol('id') : '@@id';
function readQueryFromStore(options) {
    var optsPatch = { returnPartialData: false };
    return diffQueryAgainstStore(__assign$8({}, options, optsPatch)).result;
}
var readStoreResolver = function (fieldName, idValue, args, context, _a) {
    var resultKey = _a.resultKey;
    assertIdValue(idValue);
    var objId = idValue.id;
    var obj = context.store[objId];
    var storeKeyName = storeKeyNameFromFieldNameAndArgs(fieldName, args);
    var fieldValue = (obj || {})[storeKeyName];
    if (typeof fieldValue === 'undefined') {
        if (context.customResolvers && obj && (obj.__typename || objId === 'ROOT_QUERY')) {
            var typename = obj.__typename || 'Query';
            var type = context.customResolvers[typename];
            if (type) {
                var resolver = type[fieldName];
                if (resolver) {
                    return resolver(obj, args);
                }
            }
        }
        if (!context.returnPartialData) {
            throw new Error("Can't find field " + storeKeyName + " on object (" + objId + ") " + JSON.stringify(obj, null, 2) + ".");
        }
        context.hasMissingField = true;
        return fieldValue;
    }
    if (isJsonValue(fieldValue)) {
        if (idValue.previousResult && isEqual(idValue.previousResult[resultKey], fieldValue.json)) {
            return idValue.previousResult[resultKey];
        }
        return fieldValue.json;
    }
    if (idValue.previousResult) {
        fieldValue = addPreviousResultToIdValues(fieldValue, idValue.previousResult[resultKey]);
    }
    return fieldValue;
};
function diffQueryAgainstStore(_a) {
    var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
    var queryDefinition = getQueryDefinition(query);
    variables = assign({}, getDefaultValues(queryDefinition), variables);
    var context = {
        store: store,
        returnPartialData: returnPartialData,
        customResolvers: (config && config.customResolvers) || {},
        hasMissingField: false,
    };
    var rootIdValue = {
        type: 'id',
        id: rootId,
        previousResult: previousResult,
    };
    var result = graphqlAnywhere(readStoreResolver, query, rootIdValue, context, variables, {
        fragmentMatcher: fragmentMatcherFunction,
        resultMapper: resultMapper,
    });
    return {
        result: result,
        isMissing: context.hasMissingField,
    };
}
function assertIdValue(idValue) {
    if (!isIdValue(idValue)) {
        throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
    }
}
function addPreviousResultToIdValues(value, previousResult) {
    if (isIdValue(value)) {
        return __assign$8({}, value, { previousResult: previousResult });
    }
    else if (Array.isArray(value)) {
        var idToPreviousResult_1 = {};
        if (Array.isArray(previousResult)) {
            previousResult.forEach(function (item) {
                if (item[ID_KEY]) {
                    idToPreviousResult_1[item[ID_KEY]] = item;
                }
            });
        }
        return value.map(function (item, i) {
            var itemPreviousResult = previousResult && previousResult[i];
            if (isIdValue(item)) {
                itemPreviousResult = idToPreviousResult_1[item.id] || itemPreviousResult;
            }
            return addPreviousResultToIdValues(item, itemPreviousResult);
        });
    }
    return value;
}
function resultMapper(resultFields, idValue) {
    if (idValue.previousResult) {
        var currentResultKeys_1 = Object.keys(resultFields);
        var sameAsPreviousResult = Object.keys(idValue.previousResult)
            .reduce(function (sameKeys, key) { return sameKeys && currentResultKeys_1.indexOf(key) > -1; }, true) &&
            currentResultKeys_1.reduce(function (same, key) { return (same && areNestedArrayItemsStrictlyEqual(resultFields[key], idValue.previousResult[key])); }, true);
        if (sameAsPreviousResult) {
            return idValue.previousResult;
        }
    }
    Object.defineProperty(resultFields, ID_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: idValue.id,
    });
    return resultFields;
}
function areNestedArrayItemsStrictlyEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
    }
    return a.reduce(function (same, item, i) { return same && areNestedArrayItemsStrictlyEqual(item, b[i]); }, true);
}

function cloneDeep(value) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return cloneDeep(item); });
    }
    if (value !== null && typeof value === 'object') {
        var nextValue = {};
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                nextValue[key] = cloneDeep(value[key]);
            }
        }
        return nextValue;
    }
    return value;
}

var TYPENAME_FIELD = {
    kind: 'Field',
    name: {
        kind: 'Name',
        value: '__typename',
    },
};
function addTypenameToSelectionSet(selectionSet, isRoot) {
    if (isRoot === void 0) { isRoot = false; }
    if (selectionSet.selections) {
        if (!isRoot) {
            var alreadyHasThisField = selectionSet.selections.some(function (selection) {
                return selection.kind === 'Field' && selection.name.value === '__typename';
            });
            if (!alreadyHasThisField) {
                selectionSet.selections.push(TYPENAME_FIELD);
            }
        }
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field') {
                if (selection.name.value.lastIndexOf('__', 0) !== 0 && selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
            else if (selection.kind === 'InlineFragment') {
                if (selection.selectionSet) {
                    addTypenameToSelectionSet(selection.selectionSet);
                }
            }
        });
    }
}
function addTypenameToDocument(doc) {
    checkDocument(doc);
    var docClone = cloneDeep(doc);
    docClone.definitions.forEach(function (definition) {
        var isRoot = definition.kind === 'OperationDefinition';
        addTypenameToSelectionSet(definition.selectionSet, isRoot);
    });
    return docClone;
}

var __assign$6 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ReduxDataProxy = (function () {
    function ReduxDataProxy(store, reduxRootSelector, fragmentMatcher, reducerConfig) {
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.fragmentMatcher = fragmentMatcher;
    }
    ReduxDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: 'ROOT_QUERY',
            store: getDataWithOptimisticResults(this.reduxRootSelector(this.store.getState())),
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var query = getFragmentQueryDocument(fragment, fragmentName);
        var data = getDataWithOptimisticResults(this.reduxRootSelector(this.store.getState()));
        if (typeof data[id] === 'undefined') {
            return null;
        }
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            fragmentMatcherFunction: this.fragmentMatcher.match,
            config: this.reducerConfig,
        });
    };
    ReduxDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: 'ROOT_QUERY',
                    result: data,
                    document: query,
                    variables: variables || {},
                }],
        });
    };
    ReduxDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        var document = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            document = addTypenameToDocument(document);
        }
        this.store.dispatch({
            type: 'APOLLO_WRITE',
            writes: [{
                    rootId: id,
                    result: data,
                    document: document,
                    variables: variables || {},
                }],
        });
    };
    return ReduxDataProxy;
}());
var TransactionDataProxy = (function () {
    function TransactionDataProxy(data, reducerConfig) {
        this.data = __assign$6({}, data);
        this.reducerConfig = reducerConfig;
        this.writes = [];
        this.isFinished = false;
    }
    TransactionDataProxy.prototype.finish = function () {
        this.assertNotFinished();
        var writes = this.writes;
        this.writes = [];
        this.isFinished = true;
        return writes;
    };
    TransactionDataProxy.prototype.readQuery = function (_a) {
        var query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        return readQueryFromStore({
            rootId: 'ROOT_QUERY',
            store: this.data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.readFragment = function (_a) {
        var id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        var data = this.data;
        var query = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        if (typeof data[id] === 'undefined') {
            return null;
        }
        return readQueryFromStore({
            rootId: id,
            store: data,
            query: query,
            variables: variables,
            config: this.reducerConfig,
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
    };
    TransactionDataProxy.prototype.writeQuery = function (_a) {
        var data = _a.data, query = _a.query, variables = _a.variables;
        this.assertNotFinished();
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.applyWrite({
            rootId: 'ROOT_QUERY',
            result: data,
            document: query,
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.writeFragment = function (_a) {
        var data = _a.data, id = _a.id, fragment = _a.fragment, fragmentName = _a.fragmentName, variables = _a.variables;
        this.assertNotFinished();
        var query = getFragmentQueryDocument(fragment, fragmentName);
        if (this.reducerConfig.addTypename) {
            query = addTypenameToDocument(query);
        }
        this.applyWrite({
            rootId: id,
            result: data,
            document: query,
            variables: variables || {},
        });
    };
    TransactionDataProxy.prototype.assertNotFinished = function () {
        if (this.isFinished) {
            throw new Error('Cannot call transaction methods after the transaction has finished.');
        }
    };
    TransactionDataProxy.prototype.applyWrite = function (write) {
        writeResultToStore({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: this.data,
            dataIdFromObject: this.reducerConfig.dataIdFromObject || (function () { return null; }),
            fragmentMatcherFunction: this.reducerConfig.fragmentMatcher,
        });
        this.writes.push(write);
    };
    return TransactionDataProxy;
}());

var __assign$9 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function replaceQueryResults(state, _a, config) {
    var variables = _a.variables, document = _a.document, newResult = _a.newResult;
    var clonedState = __assign$9({}, state);
    return writeResultToStore({
        result: newResult,
        dataId: 'ROOT_QUERY',
        variables: variables,
        document: document,
        store: clonedState,
        dataIdFromObject: config.dataIdFromObject,
        fragmentMatcherFunction: config.fragmentMatcher,
    });
}

function tryFunctionOrLogError(f) {
    try {
        return f();
    }
    catch (e) {
        if (console.error) {
            console.error(e);
        }
    }
}

var __assign$3 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function data(previousState, action, queries, mutations, config) {
    if (previousState === void 0) { previousState = {}; }
    var constAction = action;
    if (isQueryResultAction(action)) {
        if (!queries[action.queryId]) {
            return previousState;
        }
        if (action.requestId < queries[action.queryId].lastRequestId) {
            return previousState;
        }
        if (!graphQLResultHasError(action.result)) {
            var queryStoreValue = queries[action.queryId];
            var clonedState = __assign$3({}, previousState);
            var newState_1 = writeResultToStore({
                result: action.result.data,
                dataId: 'ROOT_QUERY',
                document: action.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_1 = reducer(newState_1, constAction);
                });
            }
            return newState_1;
        }
    }
    else if (isSubscriptionResultAction(action)) {
        if (!graphQLResultHasError(action.result)) {
            var clonedState = __assign$3({}, previousState);
            var newState_2 = writeResultToStore({
                result: action.result.data,
                dataId: 'ROOT_SUBSCRIPTION',
                document: action.document,
                variables: action.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            if (action.extraReducers) {
                action.extraReducers.forEach(function (reducer) {
                    newState_2 = reducer(newState_2, constAction);
                });
            }
            return newState_2;
        }
    }
    else if (isMutationResultAction(constAction)) {
        if (!constAction.result.errors) {
            var queryStoreValue = mutations[constAction.mutationId];
            var clonedState = __assign$3({}, previousState);
            var newState_3 = writeResultToStore({
                result: constAction.result.data,
                dataId: 'ROOT_MUTATION',
                document: constAction.document,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
            var updateQueries_1 = constAction.updateQueries;
            if (updateQueries_1) {
                Object.keys(updateQueries_1).forEach(function (queryId) {
                    var query = queries[queryId];
                    if (!query) {
                        return;
                    }
                    var _a = diffQueryAgainstStore({
                        store: previousState,
                        query: query.document,
                        variables: query.variables,
                        returnPartialData: true,
                        fragmentMatcherFunction: config.fragmentMatcher,
                        config: config,
                    }), currentQueryResult = _a.result, isMissing = _a.isMissing;
                    if (isMissing) {
                        return;
                    }
                    var reducer = updateQueries_1[queryId];
                    var nextQueryResult = tryFunctionOrLogError(function () { return reducer(currentQueryResult, {
                        mutationResult: constAction.result,
                        queryName: getOperationName(query.document),
                        queryVariables: query.variables,
                    }); });
                    if (nextQueryResult) {
                        newState_3 = writeResultToStore({
                            result: nextQueryResult,
                            dataId: 'ROOT_QUERY',
                            document: query.document,
                            variables: query.variables,
                            store: newState_3,
                            dataIdFromObject: config.dataIdFromObject,
                            fragmentMatcherFunction: config.fragmentMatcher,
                        });
                    }
                });
            }
            if (constAction.update) {
                var update_1 = constAction.update;
                var proxy_1 = new TransactionDataProxy(newState_3, config);
                tryFunctionOrLogError(function () { return update_1(proxy_1, constAction.result); });
                var writes = proxy_1.finish();
                newState_3 = data(newState_3, { type: 'APOLLO_WRITE', writes: writes }, queries, mutations, config);
            }
            if (constAction.extraReducers) {
                constAction.extraReducers.forEach(function (reducer) {
                    newState_3 = reducer(newState_3, constAction);
                });
            }
            return newState_3;
        }
    }
    else if (isUpdateQueryResultAction(constAction)) {
        return replaceQueryResults(previousState, constAction, config);
    }
    else if (isStoreResetAction(action)) {
        return {};
    }
    else if (isWriteAction(action)) {
        return action.writes.reduce(function (currentState, write) { return writeResultToStore({
            result: write.result,
            dataId: write.rootId,
            document: write.document,
            variables: write.variables,
            store: currentState,
            dataIdFromObject: config.dataIdFromObject,
            fragmentMatcherFunction: config.fragmentMatcher,
        }); }, __assign$3({}, previousState));
    }
    return previousState;
}

(function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(exports.NetworkStatus || (exports.NetworkStatus = {}));
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
}

var __assign$10 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function queries(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (isQueryInitAction(action)) {
        var newState = __assign$10({}, previousState);
        var previousQuery = previousState[action.queryId];
        if (previousQuery && previousQuery.queryString !== action.queryString) {
            throw new Error('Internal Error: may not update existing query string in store');
        }
        var isSetVariables = false;
        var previousVariables = null;
        if (action.storePreviousVariables &&
            previousQuery &&
            previousQuery.networkStatus !== exports.NetworkStatus.loading) {
            if (!isEqual(previousQuery.variables, action.variables)) {
                isSetVariables = true;
                previousVariables = previousQuery.variables;
            }
        }
        var newNetworkStatus = exports.NetworkStatus.loading;
        if (isSetVariables) {
            newNetworkStatus = exports.NetworkStatus.setVariables;
        }
        else if (action.isPoll) {
            newNetworkStatus = exports.NetworkStatus.poll;
        }
        else if (action.isRefetch) {
            newNetworkStatus = exports.NetworkStatus.refetch;
        }
        else if (action.isPoll) {
            newNetworkStatus = exports.NetworkStatus.poll;
        }
        newState[action.queryId] = {
            queryString: action.queryString,
            document: action.document,
            variables: action.variables,
            previousVariables: previousVariables,
            networkError: null,
            graphQLErrors: [],
            networkStatus: newNetworkStatus,
            lastRequestId: action.requestId,
            metadata: action.metadata,
        };
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign$10({}, previousState[action.fetchMoreForQueryId], { networkStatus: exports.NetworkStatus.fetchMore });
        }
        return newState;
    }
    else if (isQueryResultAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = __assign$10({}, previousState);
        var resultHasGraphQLErrors = graphQLResultHasError(action.result);
        newState[action.queryId] = __assign$10({}, previousState[action.queryId], { networkError: null, graphQLErrors: resultHasGraphQLErrors ? action.result.errors : [], previousVariables: null, networkStatus: exports.NetworkStatus.ready });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign$10({}, previousState[action.fetchMoreForQueryId], { networkStatus: exports.NetworkStatus.ready });
        }
        return newState;
    }
    else if (isQueryErrorAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        if (action.requestId < previousState[action.queryId].lastRequestId) {
            return previousState;
        }
        var newState = __assign$10({}, previousState);
        newState[action.queryId] = __assign$10({}, previousState[action.queryId], { networkError: action.error, networkStatus: exports.NetworkStatus.error });
        if (typeof action.fetchMoreForQueryId === 'string') {
            newState[action.fetchMoreForQueryId] = __assign$10({}, previousState[action.fetchMoreForQueryId], { networkError: action.error, networkStatus: exports.NetworkStatus.error });
        }
        return newState;
    }
    else if (isQueryResultClientAction(action)) {
        if (!previousState[action.queryId]) {
            return previousState;
        }
        var newState = __assign$10({}, previousState);
        newState[action.queryId] = __assign$10({}, previousState[action.queryId], { networkError: null, previousVariables: null, networkStatus: action.complete ? exports.NetworkStatus.ready : exports.NetworkStatus.loading });
        return newState;
    }
    else if (isQueryStopAction(action)) {
        var newState = __assign$10({}, previousState);
        delete newState[action.queryId];
        return newState;
    }
    else if (isStoreResetAction(action)) {
        return resetQueryState(previousState, action);
    }
    return previousState;
}
function resetQueryState(state, action) {
    var observableQueryIds = action.observableQueryIds;
    var newQueries = Object.keys(state).filter(function (queryId) {
        return (observableQueryIds.indexOf(queryId) > -1);
    }).reduce(function (res, key) {
        res[key] = __assign$10({}, state[key], { networkStatus: exports.NetworkStatus.loading });
        return res;
    }, {});
    return newQueries;
}

var __assign$11 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function mutations(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (isMutationInitAction(action)) {
        var newState = __assign$11({}, previousState);
        newState[action.mutationId] = {
            mutationString: action.mutationString,
            variables: action.variables,
            loading: true,
            error: null,
        };
        return newState;
    }
    else if (isMutationResultAction(action)) {
        var newState = __assign$11({}, previousState);
        newState[action.mutationId] = __assign$11({}, previousState[action.mutationId], { loading: false, error: null });
        return newState;
    }
    else if (isMutationErrorAction(action)) {
        var newState = __assign$11({}, previousState);
        newState[action.mutationId] = __assign$11({}, previousState[action.mutationId], { loading: false, error: action.error });
    }
    else if (isStoreResetAction(action)) {
        return {};
    }
    return previousState;
}

var __assign$2 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var crashReporter = function (store) { return function (next) { return function (action) {
    try {
        return next(action);
    }
    catch (err) {
        console.error('Caught an exception!', err);
        console.error(err.stack);
        throw err;
    }
}; }; };
var createReducerError = function (error, action) {
    var reducerError = { error: error };
    if (isQueryResultAction(action)) {
        reducerError.queryId = action.queryId;
    }
    else if (isSubscriptionResultAction(action)) {
        reducerError.subscriptionId = action.subscriptionId;
    }
    else if (isMutationResultAction(action)) {
        reducerError.mutationId = action.mutationId;
    }
    return reducerError;
};
function createApolloReducer(config) {
    return function apolloReducer(state, action) {
        if (state === void 0) { state = {}; }
        try {
            var newState = {
                queries: queries(state.queries, action),
                mutations: mutations(state.mutations, action),
                data: data(state.data, action, state.queries, state.mutations, config),
                optimistic: [],
                reducerError: null,
            };
            newState.optimistic = optimistic(state.optimistic, action, newState, config);
            if (state.data === newState.data &&
                state.mutations === newState.mutations &&
                state.queries === newState.queries &&
                state.optimistic === newState.optimistic &&
                state.reducerError === newState.reducerError) {
                return state;
            }
            return newState;
        }
        catch (reducerError) {
            return __assign$2({}, state, { reducerError: createReducerError(reducerError, action) });
        }
    };
}
function createApolloStore(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.reduxRootKey, reduxRootKey = _c === void 0 ? 'apollo' : _c, initialState = _b.initialState, _d = _b.config, config = _d === void 0 ? {} : _d, _e = _b.reportCrashes, reportCrashes = _e === void 0 ? true : _e, logger = _b.logger;
    var enhancers = [];
    var middlewares = [];
    if (reportCrashes) {
        middlewares.push(crashReporter);
    }
    if (logger) {
        middlewares.push(logger);
    }
    if (middlewares.length > 0) {
        enhancers.push(redux.applyMiddleware.apply(void 0, middlewares));
    }
    if (typeof window !== 'undefined') {
        var anyWindow = window;
        if (anyWindow.devToolsExtension) {
            enhancers.push(anyWindow.devToolsExtension());
        }
    }
    var compose$$1 = redux.compose;
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['queries']) {
        throw new Error('Apollo initial state may not contain queries, only data');
    }
    if (initialState && initialState[reduxRootKey] && initialState[reduxRootKey]['mutations']) {
        throw new Error('Apollo initial state may not contain mutations, only data');
    }
    return redux.createStore(redux.combineReducers((_f = {}, _f[reduxRootKey] = createApolloReducer(config), _f)), initialState, compose$$1.apply(void 0, enhancers));
    var _f;
}

function isSubscription(subscription) {
    return subscription.unsubscribe !== undefined;
}
var Observable = (function () {
    function Observable(subscriberFunction) {
        this.subscriberFunction = subscriberFunction;
    }
    Observable.prototype[$$observable] = function () {
        return this;
    };
    Observable.prototype.subscribe = function (observer) {
        var subscriptionOrCleanupFunction = this.subscriberFunction(observer);
        if (isSubscription(subscriptionOrCleanupFunction)) {
            return subscriptionOrCleanupFunction;
        }
        else {
            return {
                unsubscribe: subscriptionOrCleanupFunction,
            };
        }
    };
    return Observable;
}());

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
}
var generateErrorMessage = function (err) {
    var message = '';
    if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
        err.graphQLErrors.forEach(function (graphQLError) {
            var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
            message += "GraphQL error: " + errorMessage + "\n";
        });
    }
    if (err.networkError) {
        message += 'Network error: ' + err.networkError.message + '\n';
    }
    message = message.replace(/\n$/, '');
    return message;
};
var ApolloError = (function (_super) {
    __extends$4(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.networkError = networkError || null;
        if (!errorMessage) {
            _this.message = generateErrorMessage(_this);
        }
        else {
            _this.message = errorMessage;
        }
        _this.extraInfo = extraInfo;
        return _this;
    }
    return ApolloError;
}(Error));

var FetchType;
(function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
})(FetchType || (FetchType = {}));

function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === 'object' || typeof o[prop] === 'function')
            && !Object.isFrozen(o[prop])) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}
function maybeDeepFreeze(obj) {
    if (isDevelopment() || isTest()) {
        return deepFreeze(obj);
    }
    return obj;
}

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign$12 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var ObservableQuery = (function (_super) {
    __extends$3(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
        var _this = this;
        var queryManager = scheduler.queryManager;
        var queryId = queryManager.generateQueryId();
        var subscriberFunction = function (observer) {
            return _this.onSubscribe(observer);
        };
        _this = _super.call(this, subscriberFunction) || this;
        _this.isCurrentlyPolling = false;
        _this.options = options;
        _this.variables = _this.options.variables || {};
        _this.scheduler = scheduler;
        _this.queryManager = queryManager;
        _this.queryId = queryId;
        _this.shouldSubscribe = shouldSubscribe;
        _this.observers = [];
        _this.subscriptionHandles = [];
        return _this;
    }
    ObservableQuery.prototype.result = function () {
        var that = this;
        return new Promise(function (resolve, reject) {
            var subscription = null;
            var observer = {
                next: function (result) {
                    resolve(result);
                    var selectedObservers = that.observers.filter(function (obs) { return obs !== observer; });
                    if (selectedObservers.length === 0) {
                        that.queryManager.removeQuery(that.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: function (error) {
                    reject(error);
                },
            };
            subscription = that.subscribe(observer);
        });
    };
    ObservableQuery.prototype.currentResult = function () {
        var _a = this.queryManager.getCurrentQueryResult(this, true), data = _a.data, partial = _a.partial;
        var queryStoreValue = this.queryManager.getApolloState().queries[this.queryId];
        if (queryStoreValue && ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
            queryStoreValue.networkError)) {
            var error = new ApolloError({
                graphQLErrors: queryStoreValue.graphQLErrors,
                networkError: queryStoreValue.networkError,
            });
            return { data: {}, loading: false, networkStatus: queryStoreValue.networkStatus, error: error };
        }
        var queryLoading = !queryStoreValue || queryStoreValue.networkStatus === exports.NetworkStatus.loading;
        var loading = (this.options.fetchPolicy === 'network-only' && queryLoading)
            || (partial && this.options.fetchPolicy !== 'cache-only');
        var networkStatus;
        if (queryStoreValue) {
            networkStatus = queryStoreValue.networkStatus;
        }
        else {
            networkStatus = loading ? exports.NetworkStatus.loading : exports.NetworkStatus.ready;
        }
        return {
            data: data,
            loading: isNetworkRequestInFlight(networkStatus),
            networkStatus: networkStatus,
            partial: partial,
        };
    };
    ObservableQuery.prototype.getLastResult = function () {
        return this.lastResult;
    };
    ObservableQuery.prototype.refetch = function (variables) {
        this.variables = __assign$12({}, this.variables, variables);
        if (this.options.fetchPolicy === 'cache-only') {
            return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
        }
        this.options.variables = __assign$12({}, this.options.variables, this.variables);
        var combinedOptions = __assign$12({}, this.options, { fetchPolicy: 'network-only' });
        return this.queryManager.fetchQuery(this.queryId, combinedOptions, FetchType.refetch)
            .then(function (result) { return maybeDeepFreeze(result); });
    };
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        if (!fetchMoreOptions.updateQuery) {
            throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
        }
        return Promise.resolve()
            .then(function () {
            var qid = _this.queryManager.generateQueryId();
            var combinedOptions = null;
            if (fetchMoreOptions.query) {
                combinedOptions = fetchMoreOptions;
            }
            else {
                var variables = __assign$12({}, _this.variables, fetchMoreOptions.variables);
                combinedOptions = __assign$12({}, _this.options, fetchMoreOptions, { variables: variables });
            }
            combinedOptions = __assign$12({}, combinedOptions, { query: combinedOptions.query, fetchPolicy: 'network-only' });
            return _this.queryManager.fetchQuery(qid, combinedOptions, FetchType.normal, _this.queryId);
        })
            .then(function (fetchMoreResult) {
            var data = fetchMoreResult.data;
            var reducer = fetchMoreOptions.updateQuery;
            var mapFn = function (previousResult, _a) {
                var variables = _a.variables;
                var queryVariables = variables;
                return reducer(previousResult, {
                    fetchMoreResult: data,
                    queryVariables: queryVariables,
                });
            };
            _this.updateQuery(mapFn);
            return fetchMoreResult;
        });
    };
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var observable = this.queryManager.startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
        });
        var subscription = observable.subscribe({
            next: function (data) {
                if (options.updateQuery) {
                    var reducer_1 = options.updateQuery;
                    var mapFn = function (previousResult, _a) {
                        var variables = _a.variables;
                        return reducer_1(previousResult, {
                            subscriptionData: { data: data },
                            variables: variables,
                        });
                    };
                    _this.updateQuery(mapFn);
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                }
                else {
                    console.error('Unhandled GraphQL subscription error', err);
                }
            },
        });
        this.subscriptionHandles.push(subscription);
        return function () {
            var i = _this.subscriptionHandles.indexOf(subscription);
            if (i >= 0) {
                _this.subscriptionHandles.splice(i, 1);
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (opts) {
        var oldOptions = this.options;
        this.options = __assign$12({}, this.options, opts);
        if (opts.pollInterval) {
            this.startPolling(opts.pollInterval);
        }
        else if (opts.pollInterval === 0) {
            this.stopPolling();
        }
        var tryFetch = (oldOptions.fetchPolicy !== 'network-only' && opts.fetchPolicy === 'network-only')
            || (oldOptions.fetchPolicy === 'cache-only' && opts.fetchPolicy !== 'cache-only')
            || (oldOptions.fetchPolicy === 'standby' && opts.fetchPolicy !== 'standby')
            || false;
        return this.setVariables(this.options.variables, tryFetch);
    };
    ObservableQuery.prototype.setVariables = function (variables, tryFetch) {
        if (tryFetch === void 0) { tryFetch = false; }
        var newVariables = __assign$12({}, this.variables, variables);
        if (isEqual(newVariables, this.variables) && !tryFetch) {
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.result();
        }
        else {
            this.variables = newVariables;
            if (this.observers.length === 0) {
                return new Promise(function (resolve) { return resolve(); });
            }
            return this.queryManager.fetchQuery(this.queryId, __assign$12({}, this.options, { variables: this.variables }))
                .then(function (result) { return maybeDeepFreeze(result); });
        }
    };
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
        var newResult = tryFunctionOrLogError(function () { return mapFn(previousResult, { variables: variables }); });
        if (newResult) {
            this.queryManager.store.dispatch({
                type: 'APOLLO_UPDATE_QUERY_RESULT',
                newResult: newResult,
                variables: variables,
                document: document,
            });
        }
    };
    ObservableQuery.prototype.stopPolling = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.options.pollInterval = undefined;
            this.isCurrentlyPolling = false;
        }
    };
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
            throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
        }
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.options.pollInterval = pollInterval;
        this.isCurrentlyPolling = true;
        this.scheduler.startPollingQuery(this.options, this.queryId);
    };
    ObservableQuery.prototype.onSubscribe = function (observer) {
        var _this = this;
        this.observers.push(observer);
        if (observer.next && this.lastResult) {
            observer.next(this.lastResult);
        }
        if (observer.error && this.lastError) {
            observer.error(this.lastError);
        }
        if (this.observers.length === 1) {
            this.setUpQuery();
        }
        var retQuerySubscription = {
            unsubscribe: function () {
                if (!_this.observers.some(function (el) { return el === observer; })) {
                    return;
                }
                _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
                if (_this.observers.length === 0) {
                    _this.tearDownQuery();
                }
            },
        };
        return retQuerySubscription;
    };
    ObservableQuery.prototype.setUpQuery = function () {
        var _this = this;
        if (this.shouldSubscribe) {
            this.queryManager.addObservableQuery(this.queryId, this);
        }
        if (!!this.options.pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' || (this.options.fetchPolicy === 'cache-only')) {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        }
        var observer = {
            next: function (result) {
                _this.lastResult = result;
                _this.observers.forEach(function (obs) {
                    if (obs.next) {
                        obs.next(result);
                    }
                });
            },
            error: function (error) {
                _this.observers.forEach(function (obs) {
                    if (obs.error) {
                        obs.error(error);
                    }
                    else {
                        console.error('Unhandled error', error.message, error.stack);
                    }
                });
                _this.lastError = error;
            },
        };
        this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        if (this.isCurrentlyPolling) {
            this.scheduler.stopPollingQuery(this.queryId);
            this.isCurrentlyPolling = false;
        }
        this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptionHandles = [];
        this.queryManager.stopQuery(this.queryId);
        if (this.shouldSubscribe) {
            this.queryManager.removeObservableQuery(this.queryId);
        }
        this.observers = [];
    };
    return ObservableQuery;
}(Observable));

var haveWarned$1 = Object.create({});
function warnOnceInDevelopment(msg, type) {
    if (type === void 0) { type = 'warn'; }
    if (isProduction()) {
        return;
    }
    if (!haveWarned$1[msg]) {
        if (!isTest()) {
            haveWarned$1[msg] = true;
        }
        switch (type) {
            case 'error':
                console.error(msg);
                break;
            default:
                console.warn(msg);
        }
    }
}

var IntrospectionFragmentMatcher = (function () {
    function IntrospectionFragmentMatcher(options) {
        if (options && options.introspectionQueryResultData) {
            this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
            this.isReady = true;
        }
        else {
            this.isReady = false;
        }
        this.match = this.match.bind(this);
    }
    IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        if (!this.isReady) {
            throw new Error('FragmentMatcher.match() was called before FragmentMatcher.init()');
        }
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            throw new Error("Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        var implementingTypes = this.possibleTypesMap[typeCondition];
        if (implementingTypes && implementingTypes.indexOf(obj.__typename) > -1) {
            return true;
        }
        return false;
    };
    IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
        var typeMap = {};
        introspectionResultData.__schema.types.forEach(function (type) {
            if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
            }
        });
        return typeMap;
    };
    return IntrospectionFragmentMatcher;
}());
var haveWarned = false;
var HeuristicFragmentMatcher = (function () {
    function HeuristicFragmentMatcher() {
    }
    HeuristicFragmentMatcher.prototype.ensureReady = function () {
        return Promise.resolve();
    };
    HeuristicFragmentMatcher.prototype.canBypassInit = function () {
        return true;
    };
    HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
        var obj = context.store[idValue.id];
        if (!obj) {
            return false;
        }
        if (!obj.__typename) {
            if (!haveWarned) {
                console.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                console.warn('Could not find __typename on Fragment ', typeCondition, obj);
                console.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                    "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
                if (!isTest()) {
                    haveWarned = true;
                }
            }
            context.returnPartialData = true;
            return true;
        }
        if (obj.__typename === typeCondition) {
            return true;
        }
        warnOnceInDevelopment("You are using the simple (heuristic) fragment matcher, but your queries contain union or interface types.\n     Apollo Client will not be able to able to accurately map fragments." +
            "To make this error go away, use the IntrospectionFragmentMatcher as described in the docs: " +
            "http://dev.apollodata.com/react/initialization.html#fragment-matcher", 'error');
        context.returnPartialData = true;
        return true;
    };
    return HeuristicFragmentMatcher;
}());

var Deduplicator = (function () {
    function Deduplicator(networkInterface) {
        this.networkInterface = networkInterface;
        this.inFlightRequestPromises = {};
    }
    Deduplicator.prototype.query = function (request, deduplicate) {
        var _this = this;
        if (deduplicate === void 0) { deduplicate = true; }
        if (!deduplicate) {
            return this.networkInterface.query(request);
        }
        var key = this.getKey(request);
        if (!this.inFlightRequestPromises[key]) {
            this.inFlightRequestPromises[key] = this.networkInterface.query(request);
        }
        return this.inFlightRequestPromises[key]
            .then(function (res) {
            delete _this.inFlightRequestPromises[key];
            return res;
        })
            .catch(function (err) {
            delete _this.inFlightRequestPromises[key];
            throw err;
        });
    };
    Deduplicator.prototype.getKey = function (request) {
        return graphql_language_printer.print(request.query) + "|" + JSON.stringify(request.variables) + "|" + request.operationName;
    };
    return Deduplicator;
}());

function createStoreReducer(resultReducer, document, variables, config) {
    return function (store, action) {
        var _a = diffQueryAgainstStore({
            store: store,
            query: document,
            variables: variables,
            returnPartialData: true,
            fragmentMatcherFunction: config.fragmentMatcher,
            config: config,
        }), result = _a.result, isMissing = _a.isMissing;
        if (isMissing) {
            return store;
        }
        var nextResult;
        try {
            nextResult = resultReducer(result, action, variables);
        }
        catch (err) {
            console.warn('Unhandled error in result reducer', err);
            throw err;
        }
        if (result !== nextResult) {
            return writeResultToStore({
                dataId: 'ROOT_QUERY',
                result: nextResult,
                store: store,
                document: document,
                variables: variables,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMatcherFunction: config.fragmentMatcher,
            });
        }
        return store;
    };
}

var __assign$15 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var QueryScheduler = (function () {
    function QueryScheduler(_a) {
        var queryManager = _a.queryManager;
        this.queryManager = queryManager;
        this.pollingTimers = {};
        this.inFlightQueries = {};
        this.registeredQueries = {};
        this.intervalQueries = {};
    }
    QueryScheduler.prototype.checkInFlight = function (queryId) {
        var queries = this.queryManager.getApolloState().queries;
        return queries[queryId] && queries[queryId].networkStatus !== exports.NetworkStatus.ready;
    };
    QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queryManager.fetchQuery(queryId, options, fetchType).then(function (result) {
                resolve(result);
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
        if (!options.pollInterval) {
            throw new Error('Attempted to start a polling query without a polling interval.');
        }
        this.registeredQueries[queryId] = options;
        if (listener) {
            this.queryManager.addQueryListener(queryId, listener);
        }
        this.addQueryOnInterval(queryId, options);
        return queryId;
    };
    QueryScheduler.prototype.stopPollingQuery = function (queryId) {
        delete this.registeredQueries[queryId];
    };
    QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
        var _this = this;
        this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
            if (!_this.registeredQueries.hasOwnProperty(queryId)) {
                return false;
            }
            if (_this.checkInFlight(queryId)) {
                return true;
            }
            var queryOptions = _this.registeredQueries[queryId];
            var pollingOptions = __assign$15({}, queryOptions);
            pollingOptions.fetchPolicy = 'network-only';
            _this.fetchQuery(queryId, pollingOptions, FetchType.poll);
            return true;
        });
        if (this.intervalQueries[interval].length === 0) {
            clearInterval(this.pollingTimers[interval]);
            delete this.intervalQueries[interval];
        }
    };
    QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
        var _this = this;
        var interval = queryOptions.pollInterval;
        if (!interval) {
            throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
        }
        if (this.intervalQueries.hasOwnProperty(interval.toString()) && this.intervalQueries[interval].length > 0) {
            this.intervalQueries[interval].push(queryId);
        }
        else {
            this.intervalQueries[interval] = [queryId];
            this.pollingTimers[interval] = setInterval(function () {
                _this.fetchQueriesOnInterval(interval);
            }, interval);
        }
    };
    QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
        if (!queryOptions.pollInterval) {
            throw new Error('Attempted to register a non-polling query with the scheduler.');
        }
        return new ObservableQuery({
            scheduler: this,
            options: queryOptions,
        });
    };
    return QueryScheduler;
}());

var __assign$14 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var QueryManager = (function () {
    function QueryManager(_a) {
        var networkInterface = _a.networkInterface, store = _a.store, reduxRootSelector = _a.reduxRootSelector, _b = _a.reducerConfig, reducerConfig = _b === void 0 ? { mutationBehaviorReducers: {} } : _b, fragmentMatcher = _a.fragmentMatcher, _c = _a.addTypename, addTypename = _c === void 0 ? true : _c, _d = _a.queryDeduplication, queryDeduplication = _d === void 0 ? false : _d;
        var _this = this;
        this.idCounter = 1;
        this.networkInterface = networkInterface;
        this.deduplicator = new Deduplicator(networkInterface);
        this.store = store;
        this.reduxRootSelector = reduxRootSelector;
        this.reducerConfig = reducerConfig;
        this.pollingTimers = {};
        this.queryListeners = {};
        this.queryDocuments = {};
        this.addTypename = addTypename;
        this.queryDeduplication = queryDeduplication;
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new HeuristicFragmentMatcher();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        this.scheduler = new QueryScheduler({
            queryManager: this,
        });
        this.fetchQueryPromises = {};
        this.observableQueries = {};
        this.queryIdsByName = {};
        if (this.store['subscribe']) {
            var currentStoreData_1;
            this.store['subscribe'](function () {
                var previousStoreData = currentStoreData_1 || {};
                var previousStoreHasData = Object.keys(previousStoreData).length;
                currentStoreData_1 = _this.getApolloState();
                if (isEqual(previousStoreData, currentStoreData_1) && previousStoreHasData) {
                    return;
                }
                _this.broadcastQueries();
            });
        }
    }
    QueryManager.prototype.broadcastNewStore = function (store) {
        this.broadcastQueries();
    };
    QueryManager.prototype.mutate = function (_a) {
        var _this = this;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, updateWithProxyFn = _a.update;
        var mutationId = this.generateQueryId();
        if (this.addTypename) {
            mutation = addTypenameToDocument(mutation);
        }
        variables = assign({}, getDefaultValues(getMutationDefinition(mutation)), variables);
        var mutationString = graphql_language_printer.print(mutation);
        var request = {
            query: mutation,
            variables: variables,
            operationName: getOperationName(mutation),
        };
        this.queryDocuments[mutationId] = mutation;
        var updateQueries = {};
        if (updateQueriesByName) {
            Object.keys(updateQueriesByName).forEach(function (queryName) { return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                updateQueries[queryId] = updateQueriesByName[queryName];
            }); });
        }
        this.store.dispatch({
            type: 'APOLLO_MUTATION_INIT',
            mutationString: mutationString,
            mutation: mutation,
            variables: variables || {},
            operationName: getOperationName(mutation),
            mutationId: mutationId,
            optimisticResponse: optimisticResponse,
            extraReducers: this.getExtraReducers(),
            updateQueries: updateQueries,
            update: updateWithProxyFn,
        });
        return new Promise(function (resolve, reject) {
            _this.networkInterface.query(request)
                .then(function (result) {
                if (result.errors) {
                    var error = new ApolloError({
                        graphQLErrors: result.errors,
                    });
                    _this.store.dispatch({
                        type: 'APOLLO_MUTATION_ERROR',
                        error: error,
                        mutationId: mutationId,
                    });
                    delete _this.queryDocuments[mutationId];
                    reject(error);
                    return;
                }
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_RESULT',
                    result: result,
                    mutationId: mutationId,
                    document: mutation,
                    operationName: getOperationName(mutation),
                    variables: variables || {},
                    extraReducers: _this.getExtraReducers(),
                    updateQueries: updateQueries,
                    update: updateWithProxyFn,
                });
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.mutationId === mutationId) {
                    reject(reducerError.error);
                    return;
                }
                if (typeof refetchQueries[0] === 'string') {
                    refetchQueries.forEach(function (name) { _this.refetchQueryByName(name); });
                }
                else {
                    refetchQueries.forEach(function (pureQuery) {
                        _this.query({
                            query: pureQuery.query,
                            variables: pureQuery.variables,
                            fetchPolicy: 'network-only',
                        });
                    });
                }
                delete _this.queryDocuments[mutationId];
                resolve(result);
            })
                .catch(function (err) {
                _this.store.dispatch({
                    type: 'APOLLO_MUTATION_ERROR',
                    error: err,
                    mutationId: mutationId,
                });
                delete _this.queryDocuments[mutationId];
                reject(new ApolloError({
                    networkError: err,
                }));
            });
        });
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
        var _this = this;
        var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
        var queryDoc = this.transformQueryDocument(options).queryDoc;
        var queryString = graphql_language_printer.print(queryDoc);
        var storeResult;
        var needToFetch = fetchPolicy === 'network-only';
        if ((fetchType !== FetchType.refetch && fetchPolicy !== 'network-only')) {
            var _d = diffQueryAgainstStore({
                query: queryDoc,
                store: this.reduxRootSelector(this.store.getState()).data,
                variables: variables,
                returnPartialData: true,
                fragmentMatcherFunction: this.fragmentMatcher.match,
                config: this.reducerConfig,
            }), isMissing = _d.isMissing, result = _d.result;
            needToFetch = isMissing || fetchPolicy === 'cache-and-network';
            storeResult = result;
        }
        var shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
        var requestId = this.generateRequestId();
        this.queryDocuments[queryId] = queryDoc;
        this.store.dispatch({
            type: 'APOLLO_QUERY_INIT',
            queryString: queryString,
            document: queryDoc,
            variables: variables,
            fetchPolicy: fetchPolicy,
            queryId: queryId,
            requestId: requestId,
            storePreviousVariables: shouldFetch,
            isPoll: fetchType === FetchType.poll,
            isRefetch: fetchType === FetchType.refetch,
            fetchMoreForQueryId: fetchMoreForQueryId,
            metadata: metadata,
        });
        var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
        if (shouldDispatchClientResult) {
            this.store.dispatch({
                type: 'APOLLO_QUERY_RESULT_CLIENT',
                result: { data: storeResult },
                variables: variables,
                document: queryDoc,
                complete: !shouldFetch,
                queryId: queryId,
                requestId: requestId,
            });
        }
        if (shouldFetch) {
            var networkResult = this.fetchRequest({
                requestId: requestId,
                queryId: queryId,
                document: queryDoc,
                options: options,
                fetchMoreForQueryId: fetchMoreForQueryId,
            }).catch(function (error) {
                if (isApolloError(error)) {
                    throw error;
                }
                else {
                    _this.store.dispatch({
                        type: 'APOLLO_QUERY_ERROR',
                        error: error,
                        queryId: queryId,
                        requestId: requestId,
                        fetchMoreForQueryId: fetchMoreForQueryId,
                    });
                    _this.removeFetchQueryPromise(requestId);
                    throw new ApolloError({
                        networkError: error,
                    });
                }
            });
            if (fetchPolicy !== 'cache-and-network') {
                return networkResult;
            }
        }
        return Promise.resolve({ data: storeResult });
    };
    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
        var _this = this;
        var lastResult;
        var previouslyHadError = false;
        return function (queryStoreValue) {
            if (!queryStoreValue) {
                return;
            }
            var storedQuery = _this.observableQueries[queryId];
            var fetchPolicy = storedQuery ? storedQuery.observableQuery.options.fetchPolicy : options.fetchPolicy;
            if (fetchPolicy === 'standby') {
                return;
            }
            var shouldNotifyIfLoading = queryStoreValue.previousVariables ||
                fetchPolicy === 'cache-only' || fetchPolicy === 'cache-and-network';
            var networkStatusChanged = lastResult && queryStoreValue.networkStatus !== lastResult.networkStatus;
            if (!isNetworkRequestInFlight(queryStoreValue.networkStatus) ||
                (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                shouldNotifyIfLoading) {
                if ((queryStoreValue.graphQLErrors && queryStoreValue.graphQLErrors.length > 0) ||
                    queryStoreValue.networkError) {
                    var apolloError_1 = new ApolloError({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    });
                    previouslyHadError = true;
                    if (observer.error) {
                        try {
                            observer.error(apolloError_1);
                        }
                        catch (e) {
                            setTimeout(function () { throw e; }, 0);
                        }
                    }
                    else {
                        setTimeout(function () { throw apolloError_1; }, 0);
                        if (!isProduction()) {
                            console.info('An unhandled error was thrown because no error handler is registered ' +
                                'for the query ' + queryStoreValue.queryString);
                        }
                    }
                }
                else {
                    try {
                        var _a = diffQueryAgainstStore({
                            store: _this.getDataWithOptimisticResults(),
                            query: _this.queryDocuments[queryId],
                            variables: queryStoreValue.previousVariables || queryStoreValue.variables,
                            config: _this.reducerConfig,
                            fragmentMatcherFunction: _this.fragmentMatcher.match,
                            previousResult: lastResult && lastResult.data,
                        }), data = _a.result, isMissing = _a.isMissing;
                        var resultFromStore = void 0;
                        if (isMissing && fetchPolicy !== 'cache-only') {
                            resultFromStore = {
                                data: lastResult && lastResult.data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: true,
                            };
                        }
                        else {
                            resultFromStore = {
                                data: data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: false,
                            };
                        }
                        if (observer.next) {
                            var isDifferentResult = !(lastResult &&
                                resultFromStore &&
                                lastResult.networkStatus === resultFromStore.networkStatus &&
                                lastResult.stale === resultFromStore.stale &&
                                lastResult.data === resultFromStore.data);
                            if (isDifferentResult || previouslyHadError) {
                                lastResult = resultFromStore;
                                try {
                                    observer.next(maybeDeepFreeze(resultFromStore));
                                }
                                catch (e) {
                                    setTimeout(function () { throw e; }, 0);
                                }
                            }
                        }
                        previouslyHadError = false;
                    }
                    catch (error) {
                        previouslyHadError = true;
                        if (observer.error) {
                            observer.error(new ApolloError({
                                networkError: error,
                            }));
                        }
                        return;
                    }
                }
            }
        };
    };
    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
        if (shouldSubscribe === void 0) { shouldSubscribe = true; }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option is no longer supported since Apollo Client 1.0.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.fetchPolicy === 'standby') {
            throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');
        }
        var queryDefinition = getQueryDefinition(options.query);
        if (queryDefinition.variableDefinitions && queryDefinition.variableDefinitions.length) {
            var defaultValues = getDefaultValues(queryDefinition);
            options.variables = assign({}, defaultValues, options.variables);
        }
        if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
            options.notifyOnNetworkStatusChange = false;
        }
        var transformedOptions = __assign$14({}, options);
        var observableQuery = new ObservableQuery({
            scheduler: this.scheduler,
            options: transformedOptions,
            shouldSubscribe: shouldSubscribe,
        });
        return observableQuery;
    };
    QueryManager.prototype.query = function (options) {
        var _this = this;
        if (!options.query) {
            throw new Error('query option is required. You must specify your GraphQL document in the query option.');
        }
        if (options.query.kind !== 'Document') {
            throw new Error('You must wrap the query string in a "gql" tag.');
        }
        if (options.returnPartialData) {
            throw new Error('returnPartialData option only supported on watchQuery.');
        }
        if (options.pollInterval) {
            throw new Error('pollInterval option only supported on watchQuery.');
        }
        if (options.forceFetch) {
            throw new Error('forceFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (options.noFetch) {
            throw new Error('noFetch option is no longer supported since Apollo Client 1.0. Use fetchPolicy instead.');
        }
        if (typeof options.notifyOnNetworkStatusChange !== 'undefined') {
            throw new Error('Cannot call "query" with "notifyOnNetworkStatusChange" option. Only "watchQuery" has that option.');
        }
        options.notifyOnNetworkStatusChange = false;
        var requestId = this.idCounter;
        var resPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, resPromise, resolve, reject);
            return _this.watchQuery(options, false).result().then(function (result) {
                _this.removeFetchQueryPromise(requestId);
                resolve(result);
            }).catch(function (error) {
                _this.removeFetchQueryPromise(requestId);
                reject(error);
            });
        });
        return resPromise;
    };
    QueryManager.prototype.generateQueryId = function () {
        var queryId = this.idCounter.toString();
        this.idCounter++;
        return queryId;
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.store.dispatch({
            type: 'APOLLO_QUERY_STOP',
            queryId: queryId,
        });
    };
    QueryManager.prototype.getApolloState = function () {
        return this.reduxRootSelector(this.store.getState());
    };
    QueryManager.prototype.selectApolloState = function (store) {
        return this.reduxRootSelector(store.getState());
    };
    QueryManager.prototype.getInitialState = function () {
        return { data: this.getApolloState().data };
    };
    QueryManager.prototype.getDataWithOptimisticResults = function () {
        return getDataWithOptimisticResults(this.getApolloState());
    };
    QueryManager.prototype.addQueryListener = function (queryId, listener) {
        this.queryListeners[queryId] = this.queryListeners[queryId] || [];
        this.queryListeners[queryId].push(listener);
    };
    QueryManager.prototype.addFetchQueryPromise = function (requestId, promise, resolve, reject) {
        this.fetchQueryPromises[requestId.toString()] = { promise: promise, resolve: resolve, reject: reject };
    };
    QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
        delete this.fetchQueryPromises[requestId.toString()];
    };
    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
        this.observableQueries[queryId] = { observableQuery: observableQuery };
        var queryDef = getQueryDefinition(observableQuery.options.query);
        if (queryDef.name && queryDef.name.value) {
            var queryName = queryDef.name.value;
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
            this.queryIdsByName[queryName].push(observableQuery.queryId);
        }
    };
    QueryManager.prototype.removeObservableQuery = function (queryId) {
        var observableQuery = this.observableQueries[queryId].observableQuery;
        var definition = getQueryDefinition(observableQuery.options.query);
        var queryName = definition.name ? definition.name.value : null;
        delete this.observableQueries[queryId];
        if (queryName) {
            this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                return !(observableQuery.queryId === val);
            });
        }
    };
    QueryManager.prototype.resetStore = function () {
        var _this = this;
        Object.keys(this.fetchQueryPromises).forEach(function (key) {
            var reject = _this.fetchQueryPromises[key].reject;
            reject(new Error('Store reset while query was in flight.'));
        });
        this.store.dispatch({
            type: 'APOLLO_STORE_RESET',
            observableQueryIds: Object.keys(this.observableQueries),
        });
        Object.keys(this.observableQueries).forEach(function (queryId) {
            var storeQuery = _this.reduxRootSelector(_this.store.getState()).queries[queryId];
            var fetchPolicy = _this.observableQueries[queryId].observableQuery.options.fetchPolicy;
            if (fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby') {
                _this.observableQueries[queryId].observableQuery.refetch();
            }
        });
    };
    QueryManager.prototype.startQuery = function (queryId, options, listener) {
        this.addQueryListener(queryId, listener);
        this.fetchQuery(queryId, options)
            .catch(function (error) { return undefined; });
        return queryId;
    };
    QueryManager.prototype.startGraphQLSubscription = function (options) {
        var _this = this;
        var query = options.query;
        var transformedDoc = query;
        if (this.addTypename) {
            transformedDoc = addTypenameToDocument(transformedDoc);
        }
        var variables = assign({}, getDefaultValues(getOperationDefinition(query)), options.variables);
        var request = {
            query: transformedDoc,
            variables: variables,
            operationName: getOperationName(transformedDoc),
        };
        var subId;
        var observers = [];
        return new Observable(function (observer) {
            observers.push(observer);
            if (observers.length === 1) {
                var handler = function (error, result) {
                    if (error) {
                        observers.forEach(function (obs) {
                            if (obs.error) {
                                obs.error(error);
                            }
                        });
                    }
                    else {
                        _this.store.dispatch({
                            type: 'APOLLO_SUBSCRIPTION_RESULT',
                            document: transformedDoc,
                            operationName: getOperationName(transformedDoc),
                            result: { data: result },
                            variables: variables,
                            subscriptionId: subId,
                            extraReducers: _this.getExtraReducers(),
                        });
                        observers.forEach(function (obs) {
                            if (obs.next) {
                                obs.next(result);
                            }
                        });
                    }
                };
                subId = _this.networkInterface.subscribe(request, handler);
            }
            return {
                unsubscribe: function () {
                    observers = observers.filter(function (obs) { return obs !== observer; });
                    if (observers.length === 0) {
                        _this.networkInterface.unsubscribe(subId);
                    }
                },
                _networkSubscriptionId: subId,
            };
        });
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        delete this.queryListeners[queryId];
        delete this.queryDocuments[queryId];
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.removeQuery(queryId);
        this.stopQueryInStore(queryId);
    };
    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var lastResult = observableQuery.getLastResult();
        var queryOptions = observableQuery.options;
        var readOptions = {
            store: isOptimistic ? this.getDataWithOptimisticResults() : this.getApolloState().data,
            query: document,
            variables: variables,
            config: this.reducerConfig,
            previousResult: lastResult ? lastResult.data : undefined,
            fragmentMatcherFunction: this.fragmentMatcher.match,
        };
        try {
            var data = readQueryFromStore(readOptions);
            return maybeDeepFreeze({ data: data, partial: false });
        }
        catch (e) {
            return maybeDeepFreeze({ data: {}, partial: true });
        }
    };
    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable, isOptimistic) {
        if (isOptimistic === void 0) { isOptimistic = false; }
        var observableQuery;
        if (typeof queryIdOrObservable === 'string') {
            if (!this.observableQueries[queryIdOrObservable]) {
                throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
            }
            observableQuery = this.observableQueries[queryIdOrObservable].observableQuery;
        }
        else {
            observableQuery = queryIdOrObservable;
        }
        var _a = this.getQueryParts(observableQuery), variables = _a.variables, document = _a.document;
        var data = this.getCurrentQueryResult(observableQuery, isOptimistic).data;
        return {
            previousResult: data,
            variables: variables,
            document: document,
        };
    };
    QueryManager.prototype.getQueryParts = function (observableQuery) {
        var queryOptions = observableQuery.options;
        var transformedDoc = observableQuery.options.query;
        if (this.addTypename) {
            transformedDoc = addTypenameToDocument(transformedDoc);
        }
        return {
            variables: queryOptions.variables,
            document: transformedDoc,
        };
    };
    QueryManager.prototype.transformQueryDocument = function (options) {
        var queryDoc = options.query;
        if (this.addTypename) {
            queryDoc = addTypenameToDocument(queryDoc);
        }
        return {
            queryDoc: queryDoc,
        };
    };
    QueryManager.prototype.getExtraReducers = function () {
        var _this = this;
        return Object.keys(this.observableQueries).map(function (obsQueryId) {
            var query = _this.observableQueries[obsQueryId].observableQuery;
            var queryOptions = query.options;
            if (queryOptions.reducer) {
                return createStoreReducer(queryOptions.reducer, _this.addTypename ? addTypenameToDocument(queryOptions.query) : queryOptions.query, query.variables || {}, _this.reducerConfig);
            }
            return null;
        }).filter(function (reducer) { return reducer !== null; });
    };
    QueryManager.prototype.fetchRequest = function (_a) {
        var _this = this;
        var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
        var variables = options.variables;
        var request = {
            query: document,
            variables: variables,
            operationName: getOperationName(document),
        };
        var retPromise = new Promise(function (resolve, reject) {
            _this.addFetchQueryPromise(requestId, retPromise, resolve, reject);
            _this.deduplicator.query(request, _this.queryDeduplication)
                .then(function (result) {
                var extraReducers = _this.getExtraReducers();
                _this.store.dispatch({
                    type: 'APOLLO_QUERY_RESULT',
                    document: document,
                    operationName: getOperationName(document),
                    result: result,
                    queryId: queryId,
                    requestId: requestId,
                    fetchMoreForQueryId: fetchMoreForQueryId,
                    extraReducers: extraReducers,
                });
                _this.removeFetchQueryPromise(requestId);
                if (result.errors) {
                    throw new ApolloError({
                        graphQLErrors: result.errors,
                    });
                }
                return result;
            }).then(function () {
                var resultFromStore;
                try {
                    resultFromStore = readQueryFromStore({
                        store: _this.getApolloState().data,
                        variables: variables,
                        query: document,
                        config: _this.reducerConfig,
                        fragmentMatcherFunction: _this.fragmentMatcher.match,
                    });
                }
                catch (e) { }
                var reducerError = _this.getApolloState().reducerError;
                if (reducerError && reducerError.queryId === queryId) {
                    return Promise.reject(reducerError.error);
                }
                _this.removeFetchQueryPromise(requestId);
                resolve({ data: resultFromStore, loading: false, networkStatus: exports.NetworkStatus.ready, stale: false });
                return Promise.resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
        return retPromise;
    };
    QueryManager.prototype.refetchQueryByName = function (queryName) {
        var _this = this;
        var refetchedQueries = this.queryIdsByName[queryName];
        if (refetchedQueries === undefined) {
            console.warn("Warning: unknown query with name " + queryName + " asked to refetch");
            return;
        }
        else {
            return Promise.all(refetchedQueries.map(function (queryId) { return _this.observableQueries[queryId].observableQuery.refetch(); }));
        }
    };
    QueryManager.prototype.broadcastQueries = function () {
        var _this = this;
        var queries = this.getApolloState().queries;
        Object.keys(this.queryListeners).forEach(function (queryId) {
            var listeners = _this.queryListeners[queryId];
            if (listeners) {
                listeners.forEach(function (listener) {
                    if (listener) {
                        var queryStoreValue = queries[queryId];
                        listener(queryStoreValue);
                    }
                });
            }
        });
    };
    QueryManager.prototype.generateRequestId = function () {
        var requestId = this.idCounter;
        this.idCounter++;
        return requestId;
    };
    return QueryManager;
}());

var version = 'local';

var __assign$13 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var DEFAULT_REDUX_ROOT_KEY = 'apollo';
function defaultReduxRootSelector(state) {
    return state[DEFAULT_REDUX_ROOT_KEY];
}
function defaultDataIdFromObject(result) {
    if (result.__typename) {
        if (result.id !== undefined) {
            return result.__typename + ":" + result.id;
        }
        if (result._id !== undefined) {
            return result.__typename + ":" + result._id;
        }
    }
    return null;
}
var hasSuggestedDevtools = false;
var ApolloClient$1 = (function () {
    function ApolloClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.middleware = function () {
            return function (store) {
                _this.setStore(store);
                return function (next) { return function (action) {
                    var previousApolloState = _this.queryManager.selectApolloState(store);
                    var returnValue = next(action);
                    var newApolloState = _this.queryManager.selectApolloState(store);
                    if (newApolloState !== previousApolloState) {
                        _this.queryManager.broadcastNewStore(store.getState());
                    }
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: action,
                            state: _this.queryManager.getApolloState(),
                            dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                        });
                    }
                    return returnValue;
                }; };
            };
        };
        var dataIdFromObject = options.dataIdFromObject;
        var networkInterface = options.networkInterface, reduxRootSelector = options.reduxRootSelector, initialState = options.initialState, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.addTypename, addTypename = _c === void 0 ? true : _c, customResolvers = options.customResolvers, connectToDevTools = options.connectToDevTools, fragmentMatcher = options.fragmentMatcher, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d;
        if (typeof reduxRootSelector === 'function') {
            this.reduxRootSelector = reduxRootSelector;
        }
        else if (typeof reduxRootSelector !== 'undefined') {
            throw new Error('"reduxRootSelector" must be a function.');
        }
        if (typeof fragmentMatcher === 'undefined') {
            this.fragmentMatcher = new HeuristicFragmentMatcher();
        }
        else {
            this.fragmentMatcher = fragmentMatcher;
        }
        this.initialState = initialState ? initialState : {};
        this.networkInterface = networkInterface ? networkInterface :
            createNetworkInterface({ uri: '/graphql' });
        this.addTypename = addTypename;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.dataId = dataIdFromObject = dataIdFromObject || defaultDataIdFromObject;
        this.fieldWithArgs = storeKeyNameFromFieldNameAndArgs;
        this.queryDeduplication = queryDeduplication;
        if (ssrForceFetchDelay) {
            setTimeout(function () { return _this.disableNetworkFetches = false; }, ssrForceFetchDelay);
        }
        this.reducerConfig = {
            dataIdFromObject: dataIdFromObject,
            customResolvers: customResolvers,
            addTypename: addTypename,
            fragmentMatcher: this.fragmentMatcher.match,
        };
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.setStore = this.setStore.bind(this);
        this.resetStore = this.resetStore.bind(this);
        var defaultConnectToDevTools = !isProduction() &&
            typeof window !== 'undefined' && (!window.__APOLLO_CLIENT__);
        if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools) {
            window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && !isProduction()) {
            hasSuggestedDevtools = true;
            if (typeof window !== 'undefined' && window.document && window.top === window.self) {
                if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    if (navigator.userAgent.indexOf('Chrome') > -1) {
                        console.debug('Download the Apollo DevTools ' +
                            'for a better development experience: ' +
                            'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                    }
                }
            }
        }
        this.version = version;
    }
    ApolloClient.prototype.watchQuery = function (options) {
        this.initStore();
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign$13({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.watchQuery(options);
    };
    ApolloClient.prototype.query = function (options) {
        this.initStore();
        if (options.fetchPolicy === 'cache-and-network') {
            throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
        }
        if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
            options = __assign$13({}, options, { fetchPolicy: 'cache-first' });
        }
        return this.queryManager.query(options);
    };
    ApolloClient.prototype.mutate = function (options) {
        this.initStore();
        return this.queryManager.mutate(options);
    };
    ApolloClient.prototype.subscribe = function (options) {
        this.initStore();
        return this.queryManager.startGraphQLSubscription(options);
    };
    ApolloClient.prototype.readQuery = function (options) {
        return this.initProxy().readQuery(options);
    };
    ApolloClient.prototype.readFragment = function (options) {
        return this.initProxy().readFragment(options);
    };
    ApolloClient.prototype.writeQuery = function (options) {
        return this.initProxy().writeQuery(options);
    };
    ApolloClient.prototype.writeFragment = function (options) {
        return this.initProxy().writeFragment(options);
    };
    ApolloClient.prototype.reducer = function () {
        return createApolloReducer(this.reducerConfig);
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.initStore = function () {
        var _this = this;
        if (this.store) {
            return;
        }
        if (this.reduxRootSelector) {
            throw new Error('Cannot initialize the store because "reduxRootSelector" is provided. ' +
                'reduxRootSelector should only be used when the store is created outside of the client. ' +
                'This may lead to unexpected results when querying the store internally. ' +
                "Please remove that option from ApolloClient constructor.");
        }
        this.setStore(createApolloStore({
            reduxRootKey: DEFAULT_REDUX_ROOT_KEY,
            initialState: this.initialState,
            config: this.reducerConfig,
            logger: function (store) { return function (next) { return function (action) {
                var result = next(action);
                if (_this.devToolsHookCb) {
                    _this.devToolsHookCb({
                        action: action,
                        state: _this.queryManager.getApolloState(),
                        dataWithOptimisticResults: _this.queryManager.getDataWithOptimisticResults(),
                    });
                }
                return result;
            }; }; },
        }));
    };
    ApolloClient.prototype.resetStore = function () {
        if (this.queryManager) {
            this.queryManager.resetStore();
        }
    };
    ApolloClient.prototype.getInitialState = function () {
        this.initStore();
        return this.queryManager.getInitialState();
    };
    ApolloClient.prototype.setStore = function (store) {
        var reduxRootSelector;
        if (this.reduxRootSelector) {
            reduxRootSelector = this.reduxRootSelector;
        }
        else {
            reduxRootSelector = defaultReduxRootSelector;
        }
        if (typeof reduxRootSelector(store.getState()) === 'undefined') {
            throw new Error('Existing store does not use apolloReducer. Please make sure the store ' +
                'is properly configured and "reduxRootSelector" is correctly specified.');
        }
        this.store = store;
        this.queryManager = new QueryManager({
            networkInterface: this.networkInterface,
            reduxRootSelector: reduxRootSelector,
            store: store,
            addTypename: this.addTypename,
            reducerConfig: this.reducerConfig,
            queryDeduplication: this.queryDeduplication,
            fragmentMatcher: this.fragmentMatcher,
        });
    };
    ApolloClient.prototype.initProxy = function () {
        if (!this.proxy) {
            this.initStore();
            this.proxy = new ReduxDataProxy(this.store, this.reduxRootSelector || defaultReduxRootSelector, this.fragmentMatcher, this.reducerConfig);
        }
        return this.proxy;
    };
    return ApolloClient;
}());

exports.createNetworkInterface = createNetworkInterface;
exports.createBatchingNetworkInterface = createBatchingNetworkInterface;
exports.createApolloStore = createApolloStore;
exports.createApolloReducer = createApolloReducer;
exports.readQueryFromStore = readQueryFromStore;
exports.writeQueryToStore = writeQueryToStore;
exports.addTypenameToDocument = addTypenameToDocument;
exports.createFragmentMap = createFragmentMap;
exports.ApolloError = ApolloError;
exports.getQueryDefinition = getQueryDefinition;
exports.getFragmentDefinitions = getFragmentDefinitions;
exports.toIdValue = toIdValue;
exports.IntrospectionFragmentMatcher = IntrospectionFragmentMatcher;
exports.printAST = graphql_language_printer.print;
exports.HTTPFetchNetworkInterface = HTTPFetchNetworkInterface;
exports.HTTPBatchedNetworkInterface = HTTPBatchedNetworkInterface;
exports.ObservableQuery = ObservableQuery;
exports.ApolloClient = ApolloClient$1;
exports['default'] = ApolloClient$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


}).call(this,require('_process'))

},{"_process":33,"graphql-anywhere":6,"graphql/language/printer":20,"redux":39,"symbol-observable":41,"whatwg-fetch":44}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function shouldInclude(selection, variables) {
    if (!variables) {
        variables = {};
    }
    if (!selection.directives) {
        return true;
    }
    var res = true;
    selection.directives.forEach(function (directive) {
        if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
            return;
        }
        var directiveArguments = directive.arguments;
        var directiveName = directive.name.value;
        if (directiveArguments.length !== 1) {
            throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
        }
        var ifArgument = directive.arguments[0];
        if (!ifArgument.name || ifArgument.name.value !== 'if') {
            throw new Error("Invalid argument for the @" + directiveName + " directive.");
        }
        var ifValue = directive.arguments[0].value;
        var evaledValue = false;
        if (!ifValue || ifValue.kind !== 'BooleanValue') {
            if (ifValue.kind !== 'Variable') {
                throw new Error("Argument for the @" + directiveName + " directive must be a variable or a bool ean value.");
            }
            else {
                evaledValue = variables[ifValue.name.value];
                if (evaledValue === undefined) {
                    throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                }
            }
        }
        else {
            evaledValue = ifValue.value;
        }
        if (directiveName === 'skip') {
            evaledValue = !evaledValue;
        }
        if (!evaledValue) {
            res = false;
        }
    });
    return res;
}
exports.shouldInclude = shouldInclude;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkDocument(doc) {
    if (doc.kind !== 'Document') {
        throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
    }
    var numOpDefinitions = doc.definitions.filter(function (definition) {
        return definition.kind === 'OperationDefinition';
    }).length;
    if (numOpDefinitions > 1) {
        throw new Error('Queries must have exactly one operation definition.');
    }
}
function getFragmentDefinitions(doc) {
    var fragmentDefinitions = doc.definitions.filter(function (definition) {
        if (definition.kind === 'FragmentDefinition') {
            return true;
        }
        else {
            return false;
        }
    });
    return fragmentDefinitions;
}
exports.getFragmentDefinitions = getFragmentDefinitions;
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
exports.createFragmentMap = createFragmentMap;
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'query' || operation === 'mutation' || operation === 'subscription') {
                return definition;
            }
        }
        if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw new Error('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}
exports.getMainDefinition = getMainDefinition;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFromAST_1 = require("./getFromAST");
var directives_1 = require("./directives");
var storeUtils_1 = require("./storeUtils");
function graphql(resolver, document, rootValue, contextValue, variableValues, execOptions) {
    if (execOptions === void 0) { execOptions = {}; }
    var mainDefinition = getFromAST_1.getMainDefinition(document);
    var fragments = getFromAST_1.getFragmentDefinitions(document);
    var fragmentMap = getFromAST_1.createFragmentMap(fragments) || {};
    var resultMapper = execOptions.resultMapper;
    var fragmentMatcher = execOptions.fragmentMatcher || (function () { return true; });
    var execContext = {
        fragmentMap: fragmentMap,
        contextValue: contextValue,
        variableValues: variableValues,
        resultMapper: resultMapper,
        resolver: resolver,
        fragmentMatcher: fragmentMatcher,
    };
    return executeSelectionSet(mainDefinition.selectionSet, rootValue, execContext);
}
exports.graphql = graphql;
function executeSelectionSet(selectionSet, rootValue, execContext) {
    var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
    var result = {};
    selectionSet.selections.forEach(function (selection) {
        if (!directives_1.shouldInclude(selection, variables)) {
            return;
        }
        if (storeUtils_1.isField(selection)) {
            var fieldResult = executeField(selection, rootValue, execContext);
            var resultFieldKey = storeUtils_1.resultKeyNameFromField(selection);
            if (fieldResult !== undefined) {
                result[resultFieldKey] = fieldResult;
            }
        }
        else {
            var fragment = void 0;
            if (storeUtils_1.isInlineFragment(selection)) {
                fragment = selection;
            }
            else {
                fragment = fragmentMap[selection.name.value];
                if (!fragment) {
                    throw new Error("No fragment named " + selection.name.value);
                }
            }
            var typeCondition = fragment.typeCondition.name.value;
            if (execContext.fragmentMatcher(rootValue, typeCondition, contextValue)) {
                var fragmentResult = executeSelectionSet(fragment.selectionSet, rootValue, execContext);
                merge(result, fragmentResult);
            }
        }
    });
    if (execContext.resultMapper) {
        return execContext.resultMapper(result, rootValue);
    }
    return result;
}
function executeField(field, rootValue, execContext) {
    var variables = execContext.variableValues, contextValue = execContext.contextValue, resolver = execContext.resolver;
    var fieldName = field.name.value;
    var args = storeUtils_1.argumentsObjectFromField(field, variables);
    var info = {
        isLeaf: !field.selectionSet,
        resultKey: storeUtils_1.resultKeyNameFromField(field),
    };
    var result = resolver(fieldName, rootValue, args, contextValue, info);
    if (!field.selectionSet) {
        return result;
    }
    if (result === null || typeof result === 'undefined') {
        return result;
    }
    if (Array.isArray(result)) {
        return executeSubSelectedArray(field, result, execContext);
    }
    return executeSelectionSet(field.selectionSet, result, execContext);
}
function executeSubSelectedArray(field, result, execContext) {
    return result.map(function (item) {
        if (item === null) {
            return null;
        }
        if (Array.isArray(item)) {
            return executeSubSelectedArray(field, item, execContext);
        }
        return executeSelectionSet(field.selectionSet, item, execContext);
    });
}
function merge(dest, src) {
    if (src === null ||
        typeof src === 'undefined' ||
        typeof src === 'string' ||
        typeof src === 'number' ||
        typeof src === 'boolean') {
        return src;
    }
    Object.keys(dest).forEach(function (destKey) {
        if (src.hasOwnProperty(destKey)) {
            merge(dest[destKey], src[destKey]);
        }
    });
    Object.keys(src).forEach(function (srcKey) {
        if (!dest.hasOwnProperty(srcKey)) {
            dest[srcKey] = src[srcKey];
        }
    });
}

},{"./directives":3,"./getFromAST":4,"./storeUtils":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("./utilities");
exports.filter = utilities_1.filter;
exports.check = utilities_1.check;
exports.propType = utilities_1.propType;
var graphql_1 = require("./graphql");
exports.default = graphql_1.graphql;

},{"./graphql":5,"./utilities":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isScalarValue(value) {
    var SCALAR_TYPES = {
        StringValue: 1,
        BooleanValue: 1,
        EnumValue: 1,
    };
    return !!SCALAR_TYPES[value.kind];
}
function isNumberValue(value) {
    var NUMBER_TYPES = {
        IntValue: 1,
        FloatValue: 1,
    };
    return NUMBER_TYPES[value.kind];
}
function isVariable(value) {
    return value.kind === 'Variable';
}
function isObject(value) {
    return value.kind === 'ObjectValue';
}
function isList(value) {
    return value.kind === 'ListValue';
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isNumberValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isScalarValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObject(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) { return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables); });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isList(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else {
        throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\" is not supported. Use variables instead of inline arguments to overcome this limitation.");
    }
}
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
exports.argumentsObjectFromField = argumentsObjectFromField;
function resultKeyNameFromField(field) {
    return field.alias ?
        field.alias.value :
        field.name.value;
}
exports.resultKeyNameFromField = resultKeyNameFromField;
function isField(selection) {
    return selection.kind === 'Field';
}
exports.isField = isField;
function isInlineFragment(selection) {
    return selection.kind === 'InlineFragment';
}
exports.isInlineFragment = isInlineFragment;
function graphQLResultHasError(result) {
    return result.errors && result.errors.length;
}
exports.graphQLResultHasError = graphQLResultHasError;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("./graphql");
function filter(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        return root[info.resultKey];
    };
    return graphql_1.graphql(resolver, doc, data);
}
exports.filter = filter;
function check(doc, data) {
    var resolver = function (fieldName, root, args, context, info) {
        if (!{}.hasOwnProperty.call(root, info.resultKey)) {
            throw new Error(info.resultKey + " missing on " + root);
        }
        return root[info.resultKey];
    };
    graphql_1.graphql(resolver, doc, data, {}, {}, {
        fragmentMatcher: function () { return false; },
    });
}
exports.check = check;
var ANONYMOUS = '<<anonymous>>';
function PropTypeError(message) {
    this.message = message;
    this.stack = '';
}
PropTypeError.prototype = Error.prototype;
var reactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
};
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;
        if (props[propName] == null) {
            var locationName = reactPropTypeLocationNames[location];
            if (isRequired) {
                if (props[propName] === null) {
                    return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required " +
                        ("in `" + componentName + "`, but its value is `null`."));
                }
                return new PropTypeError("The " + locationName + " `" + propFullName + "` is marked as required in " +
                    ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
        }
        else {
            return validate(props, propName, componentName, location, propFullName);
        }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
}
function propType(doc) {
    return createChainableTypeChecker(function (props, propName) {
        var prop = props[propName];
        try {
            check(doc, prop);
            return null;
        }
        catch (e) {
            return e;
        }
    });
}
exports.propType = propType;

},{"./graphql":5}],9:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var parser = require('graphql/language/parser');

var parse = parser.parse;

// Strip insignificant whitespace
// Note that this could do a lot more, such as reorder fields etc.
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}

// A map docString -> graphql document
var docCache = {};

// A map fragmentName -> [normalized source]
var fragmentSourceMap = {};

function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}

// For testing.
function resetCaches() {
  docCache = {};
  fragmentSourceMap = {};
}

// Take a unstripped parsed document (query/mutation or even fragment), and
// check all fragment definitions, checking for name->source uniqueness.
// We also want to make sure only unique fragments exist in the document.
var printFragmentWarnings = true;
function processFragments(ast) {
  var astFragmentMap = {};
  var definitions = [];

  for (var i = 0; i < ast.definitions.length; i++) {
    var fragmentDefinition = ast.definitions[i];

    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);

      // We know something about this fragment
      if (fragmentSourceMap.hasOwnProperty(fragmentName) && !fragmentSourceMap[fragmentName][sourceKey]) {

        // this is a problem because the app developer is trying to register another fragment with
        // the same name as one previously registered. So, we tell them about it.
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n"
            + "graphql-tag enforces all fragment names across your application to be unique; read more about\n"
            + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }

        fragmentSourceMap[fragmentName][sourceKey] = true;

      } else if (!fragmentSourceMap.hasOwnProperty(fragmentName)) {
        fragmentSourceMap[fragmentName] = {};
        fragmentSourceMap[fragmentName][sourceKey] = true;
      }

      if (!astFragmentMap[sourceKey]) {
        astFragmentMap[sourceKey] = true;
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  }

  ast.definitions = definitions;
  return ast;
}

function disableFragmentWarnings() {
  printFragmentWarnings = false;
}

function stripLoc(doc, removeLocAtThisLevel) {
  var docType = Object.prototype.toString.call(doc);

  if (docType === '[object Array]') {
    return doc.map(function (d) {
      return stripLoc(d, removeLocAtThisLevel);
    });
  }

  if (docType !== '[object Object]') {
    throw new Error('Unexpected input.');
  }

  // We don't want to remove the root loc field so we can use it
  // for fragment substitution (see below)
  if (removeLocAtThisLevel && doc.loc) {
    delete doc.loc;
  }

  // https://github.com/apollographql/graphql-tag/issues/40
  if (doc.loc) {
    delete doc.loc.startToken;
    delete doc.loc.endToken;
  }

  var keys = Object.keys(doc);
  var key;
  var value;
  var valueType;

  for (key in keys) {
    if (keys.hasOwnProperty(key)) {
      value = doc[keys[key]];
      valueType = Object.prototype.toString.call(value);

      if (valueType === '[object Object]' || valueType === '[object Array]') {
        doc[keys[key]] = stripLoc(value, true);
      }
    }
  }

  return doc;
}

function parseDocument(doc) {
  var cacheKey = normalize(doc);

  if (docCache[cacheKey]) {
    return docCache[cacheKey];
  }

  var parsed = parse(doc);
  if (!parsed || parsed.kind !== 'Document') {
    throw new Error('Not a valid GraphQL document.');
  }

  // check that all "new" fragments inside the documents are consistent with
  // existing fragments of the same name
  parsed = processFragments(parsed);
  parsed = stripLoc(parsed, false);
  docCache[cacheKey] = parsed;

  return parsed;
}

// XXX This should eventually disallow arbitrary string interpolation, like Relay does
function gql(/* arguments */) {
  var args = Array.prototype.slice.call(arguments);

  var literals = args[0];

  // We always get literals[0] and then matching post literals for each arg given
  var result = literals[0];

  for (var i = 1; i < args.length; i++) {
    if (args[i] && args[i].kind && args[i].kind === 'Document') {
      result += args[i].loc.source.body;
    } else {
      result += args[i];
    }

    result += literals[i];
  }

  return parseDocument(result);
}

// Support typescript, which isn't as nice as Babel about default exports
gql.default = gql;
gql.resetCaches = resetCaches;
gql.disableFragmentWarnings = disableFragmentWarnings;

module.exports = gql;

})));


},{"graphql/language/parser":19}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphQLError = GraphQLError;

var _location = require('../language/location');

/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */
function GraphQLError( // eslint-disable-line no-redeclare
message, nodes, source, positions, path, originalError) {
  // Include (non-enumerable) stack trace.
  if (originalError && originalError.stack) {
    Object.defineProperty(this, 'stack', {
      value: originalError.stack,
      writable: true,
      configurable: true
    });
  } else if (Error.captureStackTrace) {
    Error.captureStackTrace(this, GraphQLError);
  } else {
    Object.defineProperty(this, 'stack', {
      value: Error().stack,
      writable: true,
      configurable: true
    });
  }

  // Compute locations in the source for the given nodes/positions.
  var _source = source;
  if (!_source && nodes && nodes.length > 0) {
    var node = nodes[0];
    _source = node && node.loc && node.loc.source;
  }

  var _positions = positions;
  if (!_positions && nodes) {
    _positions = nodes.filter(function (node) {
      return Boolean(node.loc);
    }).map(function (node) {
      return node.loc.start;
    });
  }
  if (_positions && _positions.length === 0) {
    _positions = undefined;
  }

  var _locations = void 0;
  var _source2 = _source; // seems here Flow need a const to resolve type.
  if (_source2 && _positions) {
    _locations = _positions.map(function (pos) {
      return (0, _location.getLocation)(_source2, pos);
    });
  }

  Object.defineProperties(this, {
    message: {
      value: message,
      // By being enumerable, JSON.stringify will include `message` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true,
      writable: true
    },
    locations: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: _locations || undefined,
      // By being enumerable, JSON.stringify will include `locations` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    path: {
      // Coercing falsey values to undefined ensures they will not be included
      // in JSON.stringify() when not provided.
      value: path || undefined,
      // By being enumerable, JSON.stringify will include `path` in the
      // resulting output. This ensures that the simplist possible GraphQL
      // service adheres to the spec.
      enumerable: true
    },
    nodes: {
      value: nodes || undefined
    },
    source: {
      value: _source || undefined
    },
    positions: {
      value: _positions || undefined
    },
    originalError: {
      value: originalError
    }
  });
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

GraphQLError.prototype = Object.create(Error.prototype, {
  constructor: { value: GraphQLError },
  name: { value: 'GraphQLError' }
});
},{"../language/location":18}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatError = formatError;

var _invariant = require('../jsutils/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
function formatError(error) {
  (0, _invariant2.default)(error, 'Received null or undefined error.');
  return {
    message: error.message,
    locations: error.locations,
    path: error.path
  };
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
},{"../jsutils/invariant":15}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GraphQLError = require('./GraphQLError');

Object.defineProperty(exports, 'GraphQLError', {
  enumerable: true,
  get: function get() {
    return _GraphQLError.GraphQLError;
  }
});

var _syntaxError = require('./syntaxError');

Object.defineProperty(exports, 'syntaxError', {
  enumerable: true,
  get: function get() {
    return _syntaxError.syntaxError;
  }
});

var _locatedError = require('./locatedError');

Object.defineProperty(exports, 'locatedError', {
  enumerable: true,
  get: function get() {
    return _locatedError.locatedError;
  }
});

var _formatError = require('./formatError');

Object.defineProperty(exports, 'formatError', {
  enumerable: true,
  get: function get() {
    return _formatError.formatError;
  }
});
},{"./GraphQLError":10,"./formatError":11,"./locatedError":13,"./syntaxError":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locatedError = locatedError;

var _GraphQLError = require('./GraphQLError');

/**
 * Given an arbitrary Error, presumably thrown while attempting to execute a
 * GraphQL operation, produce a new GraphQLError aware of the location in the
 * document responsible for the original Error.
 */
function locatedError(originalError, nodes, path) {
  // Note: this uses a brand-check to support GraphQL errors originating from
  // other contexts.
  if (originalError && originalError.path) {
    return originalError;
  }

  var message = originalError ? originalError.message || String(originalError) : 'An unknown error occurred.';
  return new _GraphQLError.GraphQLError(message, originalError && originalError.nodes || nodes, originalError && originalError.source, originalError && originalError.positions, path, originalError);
}
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */
},{"./GraphQLError":10}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxError = syntaxError;

var _location = require('../language/location');

var _GraphQLError = require('./GraphQLError');

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function syntaxError(source, position, description) {
  var location = (0, _location.getLocation)(source, position);
  var error = new _GraphQLError.GraphQLError('Syntax Error ' + source.name + ' (' + location.line + ':' + location.column + ') ' + description + '\n\n' + highlightSourceAtLocation(source, location), undefined, source, [position]);
  return error;
}

/**
 * Render a helpful description of the location of the error in the GraphQL
 * Source document.
 */
function highlightSourceAtLocation(source, location) {
  var line = location.line;
  var prevLineNum = (line - 1).toString();
  var lineNum = line.toString();
  var nextLineNum = (line + 1).toString();
  var padLen = nextLineNum.length;
  var lines = source.body.split(/\r\n|[\n\r]/g);
  return (line >= 2 ? lpad(padLen, prevLineNum) + ': ' + lines[line - 2] + '\n' : '') + lpad(padLen, lineNum) + ': ' + lines[line - 1] + '\n' + Array(2 + padLen + location.column).join(' ') + '^\n' + (line < lines.length ? lpad(padLen, nextLineNum) + ': ' + lines[line] + '\n' : '');
}

function lpad(len, str) {
  return Array(len - str.length + 1).join(' ') + str;
}
},{"../language/location":18,"./GraphQLError":10}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Name

var NAME = exports.NAME = 'Name';

// Document

var DOCUMENT = exports.DOCUMENT = 'Document';
var OPERATION_DEFINITION = exports.OPERATION_DEFINITION = 'OperationDefinition';
var VARIABLE_DEFINITION = exports.VARIABLE_DEFINITION = 'VariableDefinition';
var VARIABLE = exports.VARIABLE = 'Variable';
var SELECTION_SET = exports.SELECTION_SET = 'SelectionSet';
var FIELD = exports.FIELD = 'Field';
var ARGUMENT = exports.ARGUMENT = 'Argument';

// Fragments

var FRAGMENT_SPREAD = exports.FRAGMENT_SPREAD = 'FragmentSpread';
var INLINE_FRAGMENT = exports.INLINE_FRAGMENT = 'InlineFragment';
var FRAGMENT_DEFINITION = exports.FRAGMENT_DEFINITION = 'FragmentDefinition';

// Values

var INT = exports.INT = 'IntValue';
var FLOAT = exports.FLOAT = 'FloatValue';
var STRING = exports.STRING = 'StringValue';
var BOOLEAN = exports.BOOLEAN = 'BooleanValue';
var NULL = exports.NULL = 'NullValue';
var ENUM = exports.ENUM = 'EnumValue';
var LIST = exports.LIST = 'ListValue';
var OBJECT = exports.OBJECT = 'ObjectValue';
var OBJECT_FIELD = exports.OBJECT_FIELD = 'ObjectField';

// Directives

var DIRECTIVE = exports.DIRECTIVE = 'Directive';

// Types

var NAMED_TYPE = exports.NAMED_TYPE = 'NamedType';
var LIST_TYPE = exports.LIST_TYPE = 'ListType';
var NON_NULL_TYPE = exports.NON_NULL_TYPE = 'NonNullType';

// Type System Definitions

var SCHEMA_DEFINITION = exports.SCHEMA_DEFINITION = 'SchemaDefinition';
var OPERATION_TYPE_DEFINITION = exports.OPERATION_TYPE_DEFINITION = 'OperationTypeDefinition';

// Type Definitions

var SCALAR_TYPE_DEFINITION = exports.SCALAR_TYPE_DEFINITION = 'ScalarTypeDefinition';
var OBJECT_TYPE_DEFINITION = exports.OBJECT_TYPE_DEFINITION = 'ObjectTypeDefinition';
var FIELD_DEFINITION = exports.FIELD_DEFINITION = 'FieldDefinition';
var INPUT_VALUE_DEFINITION = exports.INPUT_VALUE_DEFINITION = 'InputValueDefinition';
var INTERFACE_TYPE_DEFINITION = exports.INTERFACE_TYPE_DEFINITION = 'InterfaceTypeDefinition';
var UNION_TYPE_DEFINITION = exports.UNION_TYPE_DEFINITION = 'UnionTypeDefinition';
var ENUM_TYPE_DEFINITION = exports.ENUM_TYPE_DEFINITION = 'EnumTypeDefinition';
var ENUM_VALUE_DEFINITION = exports.ENUM_VALUE_DEFINITION = 'EnumValueDefinition';
var INPUT_OBJECT_TYPE_DEFINITION = exports.INPUT_OBJECT_TYPE_DEFINITION = 'InputObjectTypeDefinition';

// Type Extensions

var TYPE_EXTENSION_DEFINITION = exports.TYPE_EXTENSION_DEFINITION = 'TypeExtensionDefinition';

// Directive Definitions

var DIRECTIVE_DEFINITION = exports.DIRECTIVE_DEFINITION = 'DirectiveDefinition';
},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenKind = undefined;
exports.createLexer = createLexer;
exports.getTokenDesc = getTokenDesc;

var _error = require('../error');

/**
 * Given a Source object, this returns a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */
function createLexer(source, options) {
  var startOfFileToken = new Tok(SOF, 0, 0, 0, 0, null);
  var lexer = {
    source: source,
    options: options,
    lastToken: startOfFileToken,
    token: startOfFileToken,
    line: 1,
    lineStart: 0,
    advance: advanceLexer
  };
  return lexer;
} /*  /
  /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

function advanceLexer() {
  var token = this.lastToken = this.token;
  if (token.kind !== EOF) {
    do {
      token = token.next = readToken(this, token);
    } while (token.kind === COMMENT);
    this.token = token;
  }
  return token;
}

/**
 * The return type of createLexer.
 */


// Each kind of token.
var SOF = '<SOF>';
var EOF = '<EOF>';
var BANG = '!';
var DOLLAR = '$';
var PAREN_L = '(';
var PAREN_R = ')';
var SPREAD = '...';
var COLON = ':';
var EQUALS = '=';
var AT = '@';
var BRACKET_L = '[';
var BRACKET_R = ']';
var BRACE_L = '{';
var PIPE = '|';
var BRACE_R = '}';
var NAME = 'Name';
var INT = 'Int';
var FLOAT = 'Float';
var STRING = 'String';
var COMMENT = 'Comment';

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind = exports.TokenKind = {
  SOF: SOF,
  EOF: EOF,
  BANG: BANG,
  DOLLAR: DOLLAR,
  PAREN_L: PAREN_L,
  PAREN_R: PAREN_R,
  SPREAD: SPREAD,
  COLON: COLON,
  EQUALS: EQUALS,
  AT: AT,
  BRACKET_L: BRACKET_L,
  BRACKET_R: BRACKET_R,
  BRACE_L: BRACE_L,
  PIPE: PIPE,
  BRACE_R: BRACE_R,
  NAME: NAME,
  INT: INT,
  FLOAT: FLOAT,
  STRING: STRING,
  COMMENT: COMMENT
};

/**
 * A helper function to describe a token as a string for debugging
 */
function getTokenDesc(token) {
  var value = token.value;
  return value ? token.kind + ' "' + value + '"' : token.kind;
}

var charCodeAt = String.prototype.charCodeAt;
var slice = String.prototype.slice;

/**
 * Helper function for constructing the Token object.
 */
function Tok(kind, start, end, line, column, prev, value) {
  this.kind = kind;
  this.start = start;
  this.end = end;
  this.line = line;
  this.column = column;
  this.value = value;
  this.prev = prev;
  this.next = null;
}

// Print a simplified form when appearing in JSON/util.inspect.
Tok.prototype.toJSON = Tok.prototype.inspect = function toJSON() {
  return {
    kind: this.kind,
    value: this.value,
    line: this.line,
    column: this.column
  };
};

function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? EOF :
    // Trust JSON for ASCII.
    code < 0x007F ? JSON.stringify(String.fromCharCode(code)) :
    // Otherwise print the escaped form.
    '"\\u' + ('00' + code.toString(16).toUpperCase()).slice(-4) + '"'
  );
}

/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace and comments until it finds the next lexable
 * token, then lexes punctuators immediately or calls the appropriate helper
 * function for more complicated tokens.
 */
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;

  var position = positionAfterWhitespace(body, prev.end, lexer);
  var line = lexer.line;
  var col = 1 + position - lexer.lineStart;

  if (position >= bodyLength) {
    return new Tok(EOF, bodyLength, bodyLength, line, col, prev);
  }

  var code = charCodeAt.call(body, position);

  // SourceCharacter
  if (code < 0x0020 && code !== 0x0009 && code !== 0x000A && code !== 0x000D) {
    throw (0, _error.syntaxError)(source, position, 'Cannot contain the invalid character ' + printCharCode(code) + '.');
  }

  switch (code) {
    // !
    case 33:
      return new Tok(BANG, position, position + 1, line, col, prev);
    // #
    case 35:
      return readComment(source, position, line, col, prev);
    // $
    case 36:
      return new Tok(DOLLAR, position, position + 1, line, col, prev);
    // (
    case 40:
      return new Tok(PAREN_L, position, position + 1, line, col, prev);
    // )
    case 41:
      return new Tok(PAREN_R, position, position + 1, line, col, prev);
    // .
    case 46:
      if (charCodeAt.call(body, position + 1) === 46 && charCodeAt.call(body, position + 2) === 46) {
        return new Tok(SPREAD, position, position + 3, line, col, prev);
      }
      break;
    // :
    case 58:
      return new Tok(COLON, position, position + 1, line, col, prev);
    // =
    case 61:
      return new Tok(EQUALS, position, position + 1, line, col, prev);
    // @
    case 64:
      return new Tok(AT, position, position + 1, line, col, prev);
    // [
    case 91:
      return new Tok(BRACKET_L, position, position + 1, line, col, prev);
    // ]
    case 93:
      return new Tok(BRACKET_R, position, position + 1, line, col, prev);
    // {
    case 123:
      return new Tok(BRACE_L, position, position + 1, line, col, prev);
    // |
    case 124:
      return new Tok(PIPE, position, position + 1, line, col, prev);
    // }
    case 125:
      return new Tok(BRACE_R, position, position + 1, line, col, prev);
    // A-Z _ a-z
    case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:
    case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:
    case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:
    case 89:case 90:
    case 95:
    case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:
    case 105:case 106:case 107:case 108:case 109:case 110:case 111:
    case 112:case 113:case 114:case 115:case 116:case 117:case 118:
    case 119:case 120:case 121:case 122:
      return readName(source, position, line, col, prev);
    // - 0-9
    case 45:
    case 48:case 49:case 50:case 51:case 52:
    case 53:case 54:case 55:case 56:case 57:
      return readNumber(source, position, code, line, col, prev);
    // "
    case 34:
      return readString(source, position, line, col, prev);
  }

  throw (0, _error.syntaxError)(source, position, unexpectedCharacterMessage(code));
}

/**
 * Report a message that an unexpected character was encountered.
 */
function unexpectedCharacterMessage(code) {
  if (code === 39) {
    // '
    return 'Unexpected single quote character (\'), did you mean to use ' + 'a double quote (")?';
  }

  return 'Cannot parse the unexpected character ' + printCharCode(code) + '.';
}

/**
 * Reads from body starting at startPosition until it finds a non-whitespace
 * or commented character, then returns the position of that character for
 * lexing.
 */
function positionAfterWhitespace(body, startPosition, lexer) {
  var bodyLength = body.length;
  var position = startPosition;
  while (position < bodyLength) {
    var code = charCodeAt.call(body, position);
    // tab | space | comma | BOM
    if (code === 9 || code === 32 || code === 44 || code === 0xFEFF) {
      ++position;
    } else if (code === 10) {
      // new line
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      // carriage return
      if (charCodeAt.call(body, position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else {
      break;
    }
  }
  return position;
}

/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code = void 0;
  var position = start;

  do {
    code = charCodeAt.call(body, ++position);
  } while (code !== null && (
  // SourceCharacter but not LineTerminator
  code > 0x001F || code === 0x0009));

  return new Tok(COMMENT, start, position, line, col, prev, slice.call(body, start + 1, position));
}

/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;

  if (code === 45) {
    // -
    code = charCodeAt.call(body, ++position);
  }

  if (code === 48) {
    // 0
    code = charCodeAt.call(body, ++position);
    if (code >= 48 && code <= 57) {
      throw (0, _error.syntaxError)(source, position, 'Invalid number, unexpected digit after 0: ' + printCharCode(code) + '.');
    }
  } else {
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 46) {
    // .
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    position = readDigits(source, position, code);
    code = charCodeAt.call(body, position);
  }

  if (code === 69 || code === 101) {
    // E e
    isFloat = true;

    code = charCodeAt.call(body, ++position);
    if (code === 43 || code === 45) {
      // + -
      code = charCodeAt.call(body, ++position);
    }
    position = readDigits(source, position, code);
  }

  return new Tok(isFloat ? FLOAT : INT, start, position, line, col, prev, slice.call(body, start, position));
}

/**
 * Returns the new position in the source after reading digits.
 */
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    // 0 - 9
    do {
      code = charCodeAt.call(body, ++position);
    } while (code >= 48 && code <= 57); // 0 - 9
    return position;
  }
  throw (0, _error.syntaxError)(source, position, 'Invalid number, expected digit but got: ' + printCharCode(code) + '.');
}

/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = '';

  while (position < body.length && (code = charCodeAt.call(body, position)) !== null &&
  // not LineTerminator
  code !== 0x000A && code !== 0x000D &&
  // not Quote (")
  code !== 34) {
    // SourceCharacter
    if (code < 0x0020 && code !== 0x0009) {
      throw (0, _error.syntaxError)(source, position, 'Invalid character within String: ' + printCharCode(code) + '.');
    }

    ++position;
    if (code === 92) {
      // \
      value += slice.call(body, chunkStart, position - 1);
      code = charCodeAt.call(body, position);
      switch (code) {
        case 34:
          value += '"';break;
        case 47:
          value += '/';break;
        case 92:
          value += '\\';break;
        case 98:
          value += '\b';break;
        case 102:
          value += '\f';break;
        case 110:
          value += '\n';break;
        case 114:
          value += '\r';break;
        case 116:
          value += '\t';break;
        case 117:
          // u
          var charCode = uniCharCode(charCodeAt.call(body, position + 1), charCodeAt.call(body, position + 2), charCodeAt.call(body, position + 3), charCodeAt.call(body, position + 4));
          if (charCode < 0) {
            throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: ' + ('\\u' + body.slice(position + 1, position + 5) + '.'));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        default:
          throw (0, _error.syntaxError)(source, position, 'Invalid character escape sequence: \\' + String.fromCharCode(code) + '.');
      }
      ++position;
      chunkStart = position;
    }
  }

  if (code !== 34) {
    // quote (")
    throw (0, _error.syntaxError)(source, position, 'Unterminated string.');
  }

  value += slice.call(body, chunkStart, position);
  return new Tok(STRING, start, position + 1, line, col, prev, value);
}

/**
 * Converts four hexidecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}

/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : // 0-9
  a >= 65 && a <= 70 ? a - 55 : // A-F
  a >= 97 && a <= 102 ? a - 87 : // a-f
  -1;
}

/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */
function readName(source, position, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var end = position + 1;
  var code = 0;
  while (end !== bodyLength && (code = charCodeAt.call(body, end)) !== null && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122 // a-z
  )) {
    ++end;
  }
  return new Tok(NAME, position, end, line, col, prev, slice.call(body, position, end));
}
},{"../error":12}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = getLocation;


/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match = void 0;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return { line: line, column: column };
}

/**
 * Represents a location in a Source.
 */
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.parseValue = parseValue;
exports.parseType = parseType;
exports.parseConstValue = parseConstValue;
exports.parseTypeReference = parseTypeReference;
exports.parseNamedType = parseNamedType;

var _source = require('./source');

var _error = require('../error');

var _lexer = require('./lexer');

var _kinds = require('./kinds');

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */


/**
 * Configuration options to control parser behavior
 */

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

function parse(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  return parseDocument(lexer);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
function parseValue(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var value = parseValueLiteral(lexer, false);
  expect(lexer, _lexer.TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
function parseType(source, options) {
  var sourceObj = typeof source === 'string' ? new _source.Source(source) : source;
  var lexer = (0, _lexer.createLexer)(sourceObj, options || {});
  expect(lexer, _lexer.TokenKind.SOF);
  var type = parseTypeReference(lexer);
  expect(lexer, _lexer.TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer) {
  var token = expect(lexer, _lexer.TokenKind.NAME);
  return {
    kind: _kinds.NAME,
    value: token.value,
    loc: loc(lexer, token)
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SOF);
  var definitions = [];
  do {
    definitions.push(parseDefinition(lexer));
  } while (!skip(lexer, _lexer.TokenKind.EOF));

  return {
    kind: _kinds.DOCUMENT,
    definitions: definitions,
    loc: loc(lexer, start)
  };
}

/**
 * Definition :
 *   - OperationDefinition
 *   - FragmentDefinition
 *   - TypeSystemDefinition
 */
function parseDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      // Note: subscription is an experimental non-spec addition.
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);

      // Note: the Type System IDL is an experimental non-spec addition.
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'extend':
      case 'directive':
        return parseTypeSystemDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer) {
  var start = lexer.token;
  if (peek(lexer, _lexer.TokenKind.BRACE_L)) {
    return {
      kind: _kinds.OPERATION_DEFINITION,
      operation: 'query',
      name: null,
      variableDefinitions: null,
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start)
    };
  }
  var operation = parseOperationType(lexer);
  var name = void 0;
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    name = parseName(lexer);
  }
  return {
    kind: _kinds.OPERATION_DEFINITION,
    operation: operation,
    name: name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer) {
  var operationToken = expect(lexer, _lexer.TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    // Note: subscription is an experimental non-spec addition.
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseVariableDefinition, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue?
 */
function parseVariableDefinition(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expect(lexer, _lexer.TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: skip(lexer, _lexer.TokenKind.EQUALS) ? parseValueLiteral(lexer, true) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.DOLLAR);
  return {
    kind: _kinds.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.SELECTION_SET,
    selections: many(lexer, _lexer.TokenKind.BRACE_L, parseSelection, _lexer.TokenKind.BRACE_R),
    loc: loc(lexer, start)
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer) {
  return peek(lexer, _lexer.TokenKind.SPREAD) ? parseFragment(lexer) : parseField(lexer);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer) {
  var start = lexer.token;

  var nameOrAlias = parseName(lexer);
  var alias = void 0;
  var name = void 0;
  if (skip(lexer, _lexer.TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    alias = null;
    name = nameOrAlias;
  }

  return {
    kind: _kinds.FIELD,
    alias: alias,
    name: name,
    arguments: parseArguments(lexer),
    directives: parseDirectives(lexer),
    selectionSet: peek(lexer, _lexer.TokenKind.BRACE_L) ? parseSelectionSet(lexer) : null,
    loc: loc(lexer, start)
  };
}

/**
 * Arguments : ( Argument+ )
 */
function parseArguments(lexer) {
  return peek(lexer, _lexer.TokenKind.PAREN_L) ? many(lexer, _lexer.TokenKind.PAREN_L, parseArgument, _lexer.TokenKind.PAREN_R) : [];
}

/**
 * Argument : Name : Value
 */
function parseArgument(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.ARGUMENT,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, false)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.SPREAD);
  if (peek(lexer, _lexer.TokenKind.NAME) && lexer.token.value !== 'on') {
    return {
      kind: _kinds.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer),
      loc: loc(lexer, start)
    };
  }
  var typeCondition = null;
  if (lexer.token.value === 'on') {
    lexer.advance();
    typeCondition = parseNamedType(lexer);
  }
  return {
    kind: _kinds.INLINE_FRAGMENT,
    typeCondition: typeCondition,
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'fragment');
  return {
    kind: _kinds.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start)
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer) {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }
  return parseName(lexer);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer, isConst) {
  var token = lexer.token;
  switch (token.kind) {
    case _lexer.TokenKind.BRACKET_L:
      return parseList(lexer, isConst);
    case _lexer.TokenKind.BRACE_L:
      return parseObject(lexer, isConst);
    case _lexer.TokenKind.INT:
      lexer.advance();
      return {
        kind: _kinds.INT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: _kinds.FLOAT,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.STRING:
      lexer.advance();
      return {
        kind: _kinds.STRING,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: _kinds.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token)
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: _kinds.NULL,
          loc: loc(lexer, token)
        };
      }
      lexer.advance();
      return {
        kind: _kinds.ENUM,
        value: token.value,
        loc: loc(lexer, token)
      };
    case _lexer.TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }
      break;
  }
  throw unexpected(lexer);
}

function parseConstValue(lexer) {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer) {
  return parseValueLiteral(lexer, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer, isConst) {
  var start = lexer.token;
  var item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: _kinds.LIST,
    values: any(lexer, _lexer.TokenKind.BRACKET_L, item, _lexer.TokenKind.BRACKET_R),
    loc: loc(lexer, start)
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer, isConst) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.BRACE_L);
  var fields = [];
  while (!skip(lexer, _lexer.TokenKind.BRACE_R)) {
    fields.push(parseObjectField(lexer, isConst));
  }
  return {
    kind: _kinds.OBJECT,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer, isConst) {
  var start = lexer.token;
  return {
    kind: _kinds.OBJECT_FIELD,
    name: parseName(lexer),
    value: (expect(lexer, _lexer.TokenKind.COLON), parseValueLiteral(lexer, isConst)),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives : Directive+
 */
function parseDirectives(lexer) {
  var directives = [];
  while (peek(lexer, _lexer.TokenKind.AT)) {
    directives.push(parseDirective(lexer));
  }
  return directives;
}

/**
 * Directive : @ Name Arguments?
 */
function parseDirective(lexer) {
  var start = lexer.token;
  expect(lexer, _lexer.TokenKind.AT);
  return {
    kind: _kinds.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
function parseTypeReference(lexer) {
  var start = lexer.token;
  var type = void 0;
  if (skip(lexer, _lexer.TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expect(lexer, _lexer.TokenKind.BRACKET_R);
    type = {
      kind: _kinds.LIST_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  } else {
    type = parseNamedType(lexer);
  }
  if (skip(lexer, _lexer.TokenKind.BANG)) {
    return {
      kind: _kinds.NON_NULL_TYPE,
      type: type,
      loc: loc(lexer, start)
    };
  }
  return type;
}

/**
 * NamedType : Name
 */
function parseNamedType(lexer) {
  var start = lexer.token;
  return {
    kind: _kinds.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start)
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - TypeExtensionDefinition
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer) {
  if (peek(lexer, _lexer.TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);
      case 'scalar':
        return parseScalarTypeDefinition(lexer);
      case 'type':
        return parseObjectTypeDefinition(lexer);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer);
      case 'union':
        return parseUnionTypeDefinition(lexer);
      case 'enum':
        return parseEnumTypeDefinition(lexer);
      case 'input':
        return parseInputObjectTypeDefinition(lexer);
      case 'extend':
        return parseTypeExtensionDefinition(lexer);
      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer);
}

/**
 * SchemaDefinition : schema Directives? { OperationTypeDefinition+ }
 *
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseSchemaDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'schema');
  var directives = parseDirectives(lexer);
  var operationTypes = many(lexer, _lexer.TokenKind.BRACE_L, parseOperationTypeDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.SCHEMA_DEFINITION,
    directives: directives,
    operationTypes: operationTypes,
    loc: loc(lexer, start)
  };
}

function parseOperationTypeDefinition(lexer) {
  var start = lexer.token;
  var operation = parseOperationType(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseNamedType(lexer);
  return {
    kind: _kinds.OPERATION_TYPE_DEFINITION,
    operation: operation,
    type: type,
    loc: loc(lexer, start)
  };
}

/**
 * ScalarTypeDefinition : scalar Name Directives?
 */
function parseScalarTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'scalar');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.SCALAR_TYPE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ObjectTypeDefinition :
 *   - type Name ImplementsInterfaces? Directives? { FieldDefinition+ }
 */
function parseObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'type');
  var name = parseName(lexer);
  var interfaces = parseImplementsInterfaces(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.OBJECT_TYPE_DEFINITION,
    name: name,
    interfaces: interfaces,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * ImplementsInterfaces : implements NamedType+
 */
function parseImplementsInterfaces(lexer) {
  var types = [];
  if (lexer.token.value === 'implements') {
    lexer.advance();
    do {
      types.push(parseNamedType(lexer));
    } while (peek(lexer, _lexer.TokenKind.NAME));
  }
  return types;
}

/**
 * FieldDefinition : Name ArgumentsDefinition? : Type Directives?
 */
function parseFieldDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.FIELD_DEFINITION,
    name: name,
    arguments: args,
    type: type,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer) {
  if (!peek(lexer, _lexer.TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer, _lexer.TokenKind.PAREN_L, parseInputValueDef, _lexer.TokenKind.PAREN_R);
}

/**
 * InputValueDefinition : Name : Type DefaultValue? Directives?
 */
function parseInputValueDef(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  expect(lexer, _lexer.TokenKind.COLON);
  var type = parseTypeReference(lexer);
  var defaultValue = null;
  if (skip(lexer, _lexer.TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.INPUT_VALUE_DEFINITION,
    name: name,
    type: type,
    defaultValue: defaultValue,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InterfaceTypeDefinition : interface Name Directives? { FieldDefinition+ }
 */
function parseInterfaceTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'interface');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseFieldDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INTERFACE_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * UnionTypeDefinition : union Name Directives? = UnionMembers
 */
function parseUnionTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'union');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  expect(lexer, _lexer.TokenKind.EQUALS);
  var types = parseUnionMembers(lexer);
  return {
    kind: _kinds.UNION_TYPE_DEFINITION,
    name: name,
    directives: directives,
    types: types,
    loc: loc(lexer, start)
  };
}

/**
 * UnionMembers :
 *   - NamedType
 *   - UnionMembers | NamedType
 */
function parseUnionMembers(lexer) {
  var members = [];
  do {
    members.push(parseNamedType(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return members;
}

/**
 * EnumTypeDefinition : enum Name Directives? { EnumValueDefinition+ }
 */
function parseEnumTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'enum');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var values = many(lexer, _lexer.TokenKind.BRACE_L, parseEnumValueDefinition, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.ENUM_TYPE_DEFINITION,
    name: name,
    directives: directives,
    values: values,
    loc: loc(lexer, start)
  };
}

/**
 * EnumValueDefinition : EnumValue Directives?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer) {
  var start = lexer.token;
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  return {
    kind: _kinds.ENUM_VALUE_DEFINITION,
    name: name,
    directives: directives,
    loc: loc(lexer, start)
  };
}

/**
 * InputObjectTypeDefinition : input Name Directives? { InputValueDefinition+ }
 */
function parseInputObjectTypeDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'input');
  var name = parseName(lexer);
  var directives = parseDirectives(lexer);
  var fields = any(lexer, _lexer.TokenKind.BRACE_L, parseInputValueDef, _lexer.TokenKind.BRACE_R);
  return {
    kind: _kinds.INPUT_OBJECT_TYPE_DEFINITION,
    name: name,
    directives: directives,
    fields: fields,
    loc: loc(lexer, start)
  };
}

/**
 * TypeExtensionDefinition : extend ObjectTypeDefinition
 */
function parseTypeExtensionDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'extend');
  var definition = parseObjectTypeDefinition(lexer);
  return {
    kind: _kinds.TYPE_EXTENSION_DEFINITION,
    definition: definition,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveDefinition :
 *   - directive @ Name ArgumentsDefinition? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer) {
  var start = lexer.token;
  expectKeyword(lexer, 'directive');
  expect(lexer, _lexer.TokenKind.AT);
  var name = parseName(lexer);
  var args = parseArgumentDefs(lexer);
  expectKeyword(lexer, 'on');
  var locations = parseDirectiveLocations(lexer);
  return {
    kind: _kinds.DIRECTIVE_DEFINITION,
    name: name,
    arguments: args,
    locations: locations,
    loc: loc(lexer, start)
  };
}

/**
 * DirectiveLocations :
 *   - Name
 *   - DirectiveLocations | Name
 */
function parseDirectiveLocations(lexer) {
  var locations = [];
  do {
    locations.push(parseName(lexer));
  } while (skip(lexer, _lexer.TokenKind.PIPE));
  return locations;
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer, startToken) {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken, endToken, source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
}

// Print a simplified form when appearing in JSON/util.inspect.
Loc.prototype.toJSON = Loc.prototype.inspect = function toJSON() {
  return { start: this.start, end: this.end };
};

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer, kind) {
  return lexer.token.kind === kind;
}

/**
 * If the next token is of the given kind, return true after advancing
 * the lexer. Otherwise, do not change the parser state and return false.
 */
function skip(lexer, kind) {
  var match = lexer.token.kind === kind;
  if (match) {
    lexer.advance();
  }
  return match;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expect(lexer, kind) {
  var token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected ' + kind + ', found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * If the next token is a keyword with the given value, return that token after
 * advancing the lexer. Otherwise, do not change the parser state and return
 * false.
 */
function expectKeyword(lexer, value) {
  var token = lexer.token;
  if (token.kind === _lexer.TokenKind.NAME && token.value === value) {
    lexer.advance();
    return token;
  }
  throw (0, _error.syntaxError)(lexer.source, token.start, 'Expected "' + value + '", found ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer, atToken) {
  var token = atToken || lexer.token;
  return (0, _error.syntaxError)(lexer.source, token.start, 'Unexpected ' + (0, _lexer.getTokenDesc)(token));
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many(lexer, openKind, parseFn, closeKind) {
  expect(lexer, openKind);
  var nodes = [parseFn(lexer)];
  while (!skip(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}
},{"../error":12,"./kinds":16,"./lexer":17,"./source":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _visitor = require('./visitor');

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */
function print(ast) {
  return (0, _visitor.visit)(ast, { leave: printDocASTReducer });
} /**
   *  Copyright (c) 2015, Facebook, Inc.
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree. An additional grant
   *  of patent rights can be found in the PATENTS file in the same directory.
   */

var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },

  // Document

  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },

  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet;
    // Anonymous queries with no directives or variable definitions can use
    // the query short form.
    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },


  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue;
    return variable + ': ' + type + wrap(' = ', defaultValue);
  },

  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },

  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },

  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },

  // Fragments

  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },

  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },

  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return 'fragment ' + name + ' on ' + typeCondition + ' ' + wrap('', join(directives, ' '), ' ') + selectionSet;
  },

  // Value

  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10) {
    var value = _ref10.value;
    return JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return JSON.stringify(value);
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },

  // Directive

  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },

  // Type

  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },

  // Type System Definitions

  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },

  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },

  ScalarTypeDefinition: function ScalarTypeDefinition(_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  },

  ObjectTypeDefinition: function ObjectTypeDefinition(_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ', ')), join(directives, ' '), block(fields)], ' ');
  },

  FieldDefinition: function FieldDefinition(_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + wrap('(', join(args, ', '), ')') + ': ' + type + wrap(' ', join(directives, ' '));
  },

  InputValueDefinition: function InputValueDefinition(_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  },

  InterfaceTypeDefinition: function InterfaceTypeDefinition(_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  },

  UnionTypeDefinition: function UnionTypeDefinition(_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), '= ' + join(types, ' | ')], ' ');
  },

  EnumTypeDefinition: function EnumTypeDefinition(_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  },

  EnumValueDefinition: function EnumValueDefinition(_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  },

  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  },

  TypeExtensionDefinition: function TypeExtensionDefinition(_ref31) {
    var definition = _ref31.definition;
    return 'extend ' + definition;
  },

  DirectiveDefinition: function DirectiveDefinition(_ref32) {
    var name = _ref32.name,
        args = _ref32.arguments,
        locations = _ref32.locations;
    return 'directive @' + name + wrap('(', join(args, ', '), ')') + ' on ' + join(locations, ' | ');
  }
};

/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */
function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}

/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */
function block(array) {
  return array && array.length !== 0 ? indent('{\n' + join(array, '\n')) + '\n}' : '{}';
}

/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */
function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && maybeString.replace(/\n/g, '\n  ');
}
},{"./visitor":22}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * A representation of source input to GraphQL. The name is optional,
 * but is mostly useful for clients who store GraphQL documents in
 * source files; for example, if the GraphQL input is in a file Foo.graphql,
 * it might be useful for name to be "Foo.graphql".
 */
var Source = exports.Source = function Source(body, name) {
  _classCallCheck(this, Source);

  this.body = body;
  this.name = name || 'GraphQL';
};
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.visitWithTypeInfo = visitWithTypeInfo;
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

var QueryDocumentKeys = exports.QueryDocumentKeys = {
  Name: [],

  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],

  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', 'typeCondition', 'directives', 'selectionSet'],

  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],

  Directive: ['name', 'arguments'],

  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],

  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],

  ScalarTypeDefinition: ['name', 'directives'],
  ObjectTypeDefinition: ['name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['name', 'directives', 'fields'],
  UnionTypeDefinition: ['name', 'directives', 'types'],
  EnumTypeDefinition: ['name', 'directives', 'values'],
  EnumValueDefinition: ['name', 'directives'],
  InputObjectTypeDefinition: ['name', 'directives', 'fields'],

  TypeExtensionDefinition: ['definition'],

  DirectiveDefinition: ['name', 'arguments', 'locations']
};

var BREAK = exports.BREAK = {};

/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */
function visit(root, visitor, keyMap) {
  var visitorKeys = keyMap || QueryDocumentKeys;

  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var parent = void 0;
  var path = [];
  var ancestors = [];
  var newRoot = root;

  do {
    index++;
    var isLeaving = index === keys.length;
    var key = void 0;
    var node = void 0;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path.pop();
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === undefined) {
        continue;
      }
      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + JSON.stringify(node));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (!isLeaving) {
      stack = { inArray: inArray, index: index, keys: keys, edits: edits, prev: stack };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return maybeNode && typeof maybeNode.kind === 'string';
}

/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */
function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);

  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */false);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */true);
          if (fn) {
            var result = fn.apply(visitors[i], arguments);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}

/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */false);
      if (fn) {
        var result = fn.apply(visitor, arguments);
        if (result !== undefined) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind, /* isLeaving */true);
      var result = void 0;
      if (fn) {
        result = fn.apply(visitor, arguments);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}
},{}],23:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":30}],24:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":23,"./_getRawTag":27,"./_objectToString":28}],25:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],26:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":29}],27:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":23}],28:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],29:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],30:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":25}],31:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],32:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":24,"./_getPrototype":26,"./isObjectLike":31}],33:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":37}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],36:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if (process.env.NODE_ENV !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
}).call(this,require('_process'))

},{"./createStore":38,"./utils/warning":40,"_process":33,"lodash/isPlainObject":32}],37:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}
},{}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":32,"symbol-observable":41}],39:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
}).call(this,require('_process'))

},{"./applyMiddleware":34,"./bindActionCreators":35,"./combineReducers":36,"./compose":37,"./createStore":38,"./utils/warning":40,"_process":33}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],41:[function(require,module,exports){
module.exports = require('./lib/index');

},{"./lib/index":42}],42:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ponyfill":43}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],44:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2Fwb2xsby51bWQuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2RpcmVjdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2dldEZyb21BU1QuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2dyYXBocWwuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwtYW55d2hlcmUvbGliL3NyYy9zdG9yZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwtYW55d2hlcmUvbGliL3NyYy91dGlsaXRpZXMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC10YWcvbGliL2dyYXBocWwtdGFnLnVtZC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2Vycm9yL0dyYXBoUUxFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2Vycm9yL2Zvcm1hdEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvZXJyb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9lcnJvci9sb2NhdGVkRXJyb3IuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9lcnJvci9zeW50YXhFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2pzdXRpbHMvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2Uva2luZHMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9sYW5ndWFnZS9sZXhlci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL2xvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2UvcGFyc2VyLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL3NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL3Zpc2l0b3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21iaW5lUmVkdWNlcnMuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2NvbXBvc2UuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2NyZWF0ZVN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvdXRpbHMvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9mZXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDSUE7Ozs7QUFFQTs7Ozs7O2tKQU5BO0FBQ0E7QUFDQTs7QUFNQSxJQUFNLG1CQUFtQiwwQ0FBdUIsRUFBQyxLQUFLLCtCQUFOLEVBQXZCLENBQXpCOztBQUVBLElBQUksV0FBVyxFQUFmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBTSxTQUFTLDJCQUFpQjtBQUM5QjtBQUQ4QixDQUFqQixDQUFmOztBQUlBLElBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsTUFBRCxFQUFZO0FBQ2hDLFdBQVMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUNFLEtBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FERjtBQUVELENBSEQ7O0FBS0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM5QixXQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsU0FBakMsR0FBNkMsS0FBN0M7QUFDRCxDQUZEOztBQUlBLElBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQzNDLE1BQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsaUJBQWlCLElBQXhDLENBQVQ7QUFDQSxLQUFHLFNBQUgsR0FBZSxLQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQWY7QUFDQSxLQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLE9BQWpCO0FBQ0EsYUFBVztBQUFBLFdBQU0sR0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixPQUFwQixDQUFOO0FBQUEsR0FBWCxFQUErQyxHQUEvQztBQUNELENBTEQ7O0FBT0EsSUFBTSwyREFBTjs7QUFlQSxJQUFNLDJEQUFOOztBQVdBLElBQU0seURBQU47O0FBb0JBLElBQU0sdURBQU47O0FBOENBLElBQU0sc0JBQXNCLE9BQU8sVUFBUCxDQUFrQixFQUFDLGFBQWEsY0FBZCxFQUE4QixPQUFPLFNBQXJDLEVBQWdELGNBQWMsSUFBOUQsRUFBbEIsQ0FBNUI7QUFDQSxvQkFBb0IsU0FBcEIsQ0FBOEI7QUFDNUIsUUFBTTtBQUFBLFFBQUcsSUFBSCxRQUFHLElBQUg7QUFBQSxXQUFjLG1CQUFtQixJQUFuQixFQUF5QixNQUF6QixDQUFkO0FBQUE7QUFEc0IsQ0FBOUI7O0FBSUEsU0FBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0RCxZQUFNO0FBQ2hFLE1BQU0sV0FBVyxTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBQTVEO0FBQ0EsTUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixpQkFBeEIsRUFBMkMsS0FBNUQ7QUFDQSxNQUFNLFlBQVksU0FBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXZEO0FBQ0EsTUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFyRDtBQUNBLE1BQU0sY0FBYyxTQUFTLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0MsS0FBNUQ7QUFDQSxNQUFNLFFBQVEsQ0FBQyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0MsS0FBakMsQ0FBZDs7QUFFQSxTQUNHLE1BREgsQ0FDVSxFQUFFLFVBQVUsY0FBWixFQUE0QixhQUFhLGNBQXpDLEVBQXlELFdBQVcsRUFBRSxrQkFBRixFQUFZLG9CQUFaLEVBQXVCLGtCQUF2QixFQUFpQyx3QkFBakMsRUFBOEMsa0JBQTlDLEVBQXdELFlBQXhELEVBQXBFLEVBRFYsRUFFRyxJQUZILENBRVEsYUFGUixFQUV1QixhQUZ2QjtBQUdELENBWEQ7O0FBYUEsU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxZQUFNO0FBQzdELE1BQU0sUUFBUSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBcEQ7O0FBRUEsTUFBSSxNQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLFVBQXJCLE1BQXFDLENBQXpDLEVBQTRDO0FBQzFDLFdBQ0csTUFESCxDQUNVLEVBQUUsc0RBQWdCLEtBQWhCLENBQUYsRUFBMkIsYUFBYSxjQUF4QyxFQURWLEVBRUcsSUFGSCxDQUVRLGFBRlIsRUFFdUIsYUFGdkI7QUFHRDs7QUFFRCxNQUFJLE1BQU0sSUFBTixHQUFhLE9BQWIsQ0FBcUIsT0FBckIsTUFBa0MsQ0FBdEMsRUFBeUM7QUFDdkMsV0FDRyxLQURILENBQ1MsRUFBRSxtREFBYSxLQUFiLENBQUYsRUFBeUIsYUFBYSxjQUF0QyxFQURULEVBRUcsSUFGSCxDQUVRLGFBRlIsRUFFdUIsYUFGdkI7QUFHRDtBQUNGLENBZEQ7O0FBZ0JBLFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxnQkFBakMsQ0FBa0QsT0FBbEQsRUFBMkQsVUFBQyxDQUFELEVBQU87QUFDaEUsV0FBUyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXRDLEdBQThDLEVBQTlDO0FBQ0QsQ0FGRDs7QUFJQSxJQUFJLHFCQUFKLEVBQTJCLGtCQUEzQjs7QUFFQSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsZ0JBQWpDLENBQWtELE9BQWxELEVBQTJELFlBQU07QUFDL0QsTUFBTSxXQUFXLFNBQVMsY0FBVCxDQUF3QixnQkFBeEIsRUFBMEMsS0FBM0Q7QUFDQSxNQUFNLFdBQVcsU0FBUyxjQUFULENBQXdCLGdCQUF4QixFQUEwQyxLQUEzRDs7QUFFQSxTQUNHLE1BREgsQ0FDVSxFQUFFLFVBQVUsYUFBWixFQUEyQixhQUFhLGNBQXhDLEVBQXdELFdBQVcsRUFBRSxrQkFBRixFQUFZLGtCQUFaLEVBQW5FLEVBRFYsRUFFRyxJQUZILENBRVEsVUFBQyxNQUFELEVBQVk7QUFDZCxRQUFJLE9BQU8sSUFBUCxJQUFlLE9BQU8sSUFBUCxDQUFZLEtBQTNCLElBQW9DLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsS0FBMUQsRUFBaUU7QUFDL0QsaUJBQVcsT0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixLQUE3QjtBQUNBLG1CQUFhLFFBQWI7QUFDQSxVQUFJLHFCQUFKLEVBQTJCO0FBQ3pCLDhCQUFzQixXQUF0QjtBQUNEO0FBQ0QsVUFBSSxrQkFBSixFQUF3QjtBQUN0QiwyQkFBbUIsV0FBbkI7QUFDRDs7QUFFRCw4QkFBd0IsT0FBTyxVQUFQLENBQWtCLEVBQUMsYUFBYSxjQUFkLEVBQThCLE9BQU8sV0FBckMsRUFBa0QsV0FBVyxFQUFFLGtCQUFGLEVBQTdELEVBQTJFLGNBQWMsSUFBekYsRUFBbEIsQ0FBeEI7QUFDQSwyQkFBcUIsc0JBQXNCLFNBQXRCLENBQWdDO0FBQ25ELGNBQU07QUFBQSxjQUFHLElBQUgsU0FBRyxJQUFIO0FBQUEsaUJBQWMsbUJBQW1CLElBQW5CLEVBQXlCLFFBQXpCLENBQWQ7QUFBQTtBQUQ2QyxPQUFoQyxDQUFyQjtBQUdEO0FBQ0gsa0JBQWMsTUFBZDtBQUNELEdBbkJILEVBbUJLLGFBbkJMO0FBb0JELENBeEJEOztBQTBCQTtBQUNBO0FBQ0E7O0FBRUUsSUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFWO0FBQ0EsSUFBSSxNQUFNLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFWOztBQUVBLElBQUksWUFDSjtBQUNFLFFBQVksRUFEZDtBQUVFLGFBQVksS0FGZDtBQUdFLFFBQVksY0FBVSxHQUFWLEVBQ1o7QUFDRSxRQUFJLFVBQVUsU0FBZCxFQUNBO0FBQ0UsVUFBSSxjQUFKO0FBQ0EsVUFBSSxhQUFKLENBQWtCLE9BQWxCLENBQTBCLFlBQTFCLEVBQXdDLFVBQVUsSUFBbEQ7QUFDQSxnQkFBVSxTQUFWLEdBQXNCLEtBQXRCO0FBQ0EsZ0JBQVUsSUFBVixHQUFzQixFQUF0QjtBQUNEO0FBQ0Y7QUFaSCxDQURBO0FBZUEsT0FBTyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxVQUFVLElBQTFDO0FBQ0EsSUFBSSxnQkFBSixDQUFxQixPQUFyQixFQUE4QixhQUE5QjtBQUNBLFNBQVMsYUFBVCxHQUNBO0FBQ0UsWUFBVSxJQUFWLEdBQWlCLElBQUksU0FBckI7QUFDQSxNQUFJLE9BQU8sYUFBWCxFQUNBO0FBQ0UsV0FBTyxhQUFQLENBQXFCLE9BQXJCLENBQTZCLE1BQTdCLEVBQXFDLFVBQVUsSUFBL0M7QUFDRCxHQUhELE1BS0E7QUFDRSxjQUFVLFNBQVYsR0FBc0IsSUFBdEI7QUFDQSxhQUFTLFdBQVQsQ0FBcUIsTUFBckI7QUFDRDtBQUNGOzs7O0FDcFBIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3g3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvL1xuLy8gQmFzaWMgVGVzdCBDbGllbnQgdXNpbmcgQXBvbGxvIENsaWVudCBhbmQgQXBvbGxvIEdyYXBoUUwtVGFnIHRlbXBsYXRlIGtpYnJhcnlcbi8vIE5vIFJlYWN0IHlldFxuXG5pbXBvcnQgQXBvbGxvQ2xpZW50LCB7IGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UgfSBmcm9tICdhcG9sbG8tY2xpZW50JztcblxuaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XG5cbmNvbnN0IG5ldHdvcmtJbnRlcmZhY2UgPSBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlKHt1cmk6ICdodHRwOi8vbG9jYWxob3N0OjMwMzAvZ3JhcGhxbCd9KTtcblxudmFyIHdlYnRva2VuID0gXCJcIlxuXG4vL1xuLy8gV2hlbiB1cGdyYWRpbmcgdG8gbGF0ZXN0IGZlYXRoZXJzLWF1dGhlbnRpY2F0aW9uXG4vLyB3ZSdsbCBuZWVkIHRvIGdlbmVyYXRlIGFub255bW91cyBhdXRoIHRva2VuIGZyb20gL2F1dGgvbG9jYWwsIHNhdmUgaXQgaW4gbG9jYWxzdG9yYWdlXG4vLyBhbmQgYWRkIGl0IHRvIGV2ZXJ5IHJlcXVlc3Rcbi8vXG4vLyBuZXR3b3JrSW50ZXJmYWNlLnVzZShbe1xuLy8gICBhcHBseU1pZGRsZXdhcmUocmVxLCBuZXh0KSB7XG4vLyAgICAgaWYgKCFyZXEub3B0aW9ucy5oZWFkZXJzKSB7XG4vLyAgICAgICByZXEub3B0aW9ucy5oZWFkZXJzID0ge307ICAvLyBDcmVhdGUgdGhlIGhlYWRlciBvYmplY3QgaWYgbmVlZGVkLlxuLy8gICAgIH1cbi8vICAgICByZXEub3B0aW9ucy5oZWFkZXJzID0ge1xuLy8gICAgICAgYXV0aG9yaXphdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZlYXRoZXJzLWFub24tand0JykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmVhdGhlcnMtYW5vbi1qd3QnKSA6IG51bGxcbi8vICAgICB9XG4vLyAgICAgbmV4dCgpO1xuLy8gICB9XG4vLyB9XSk7XG5cbi8vIHRvZG86IHVwZGF0ZSB0byBuZXcgd2F5IG9mIGRvaW5nIHRoaXNcbmNvbnN0IGNsaWVudCA9IG5ldyBBcG9sbG9DbGllbnQoe1xuICBuZXR3b3JrSW50ZXJmYWNlXG59KVxuXG5jb25zdCBkaXNwbGF5UmVzdWx0ID0gKHJlc3VsdCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0JykuaW5uZXJIVE1MID1cbiAgICBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpO1xufTtcblxuY29uc3QgZGlzcGxheVRva2VuID0gKHRva2VuKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2tlbicpLmlubmVySFRNTCA9IHRva2VuXG59O1xuXG5jb25zdCBkaXNwbGF5TGl2ZVJlc3VsdHMgPSAocmVzdWx0LCB0eXBlKSA9PiB7XG4gIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXZlUmVzdWx0LicgKyB0eXBlKVxuICBlbC5pbm5lckhUTUwgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpO1xuICBlbC5jbGFzc0xpc3QuYWRkKCdhbGVydCcpXG4gIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQnKSwgMjAwKVxufTtcblxuY29uc3Qgc2lnbnVwTXV0YXRpb24gPSBncWxgbXV0YXRpb24gKFxuICAkdXNlcm5hbWU6IFN0cmluZyEsIFxuICAkZmlyc3RuYW1lOiBTdHJpbmchLCBcbiAgJGxhc3RuYW1lOiBTdHJpbmchLCBcbiAgJHBob25lTnVtYmVyOiBTdHJpbmchLFxuICAkcGFzc3dvcmQ6IFN0cmluZyEsXG4gICRyb2xlczogW1JvbGVzIV0pe1xuICBzaWduVXAodXNlcm5hbWU6ICR1c2VybmFtZSwgcGFzc3dvcmQ6ICRwYXNzd29yZCwgZmlyc3ROYW1lOiAkZmlyc3RuYW1lLCBsYXN0TmFtZTogJGxhc3RuYW1lLCBwaG9uZU51bWJlcjogJHBob25lTnVtYmVyLCByb2xlczogJHJvbGVzKVxuICB7XG4gICAgX2lkXG4gICAgdXNlcm5hbWVcbiAgICByb2xlc1xuICB9XG59YDtcblxuY29uc3QgbG9naW5NdXRhdGlvbiA9IGdxbGBtdXRhdGlvbiAoJHVzZXJuYW1lOiBTdHJpbmchLCAkcGFzc3dvcmQ6IFN0cmluZyEpe1xuICBsb2dJbih1c2VybmFtZTogJHVzZXJuYW1lLCBwYXNzd29yZDogJHBhc3N3b3JkKSB7XG4gICAgdG9rZW5cbiAgICB1c2VyIHtcbiAgICAgIF9pZFxuICAgICAgdXNlcm5hbWVcbiAgICAgIHJvbGVzXG4gICAgfVxuICB9XG59YDtcblxuY29uc3Qgb3JkZXJzUXVlcnkgPSBncWxgcXVlcnkgKCR3ZWJ0b2tlbjogU3RyaW5nISkge1xuICBhbGxPcmRlcnMod2VidG9rZW46ICR3ZWJ0b2tlbikge1xuICAgICAgICBfaWRcbiAgICAgICAgdXNlciB7XG4gICAgICAgICAgX2lkXG4gICAgICAgICAgdXNlcm5hbWVcbiAgICAgICAgICBmaXJzdE5hbWVcbiAgICAgICAgICBsYXN0TmFtZVxuICAgICAgICB9XG4gICAgICAgIGl0ZW1zIHtcbiAgICAgICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgICAgICBpdGVtUHJpY2VcbiAgICAgICAgfVxuICAgICAgICB0b3RhbFxuICAgICAgICBzdGF0dXNNZXNzYWdlXG4gICAgICAgIGZ1bGZpbGxlZFxuICAgICAgICBjcmVhdGVkQXRcblx0fVxufWBcblxuY29uc3QgbWVudVF1ZXJ5ID0gZ3FsYHF1ZXJ5IHtcbiAgbWVudSB7XG4gICAgZW50cmVlcyB7XG4gICAgICBfaWRcbiAgICAgIGl0ZW1EZXNjcmlwdGlvblxuICAgICAgaXRlbVByaWNlXG4gICAgICB0YWdzXG4gICAgICBzaWRlcyB7XG4gICAgICAgIF9pZFxuICAgICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgICAgdGFnc1xuICAgICAgfVxuICAgICAgdXBzZWxscyB7XG4gICAgICAgIF9pZFxuICAgICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgICAgaXRlbVByaWNlXG4gICAgICAgIHRhZ3NcbiAgICAgIH1cbiAgICB9XG4gICAgc2lkZXMge1xuICAgICAgX2lkXG4gICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgIGl0ZW1QcmljZVxuICAgICAgdGFnc1xuICAgIH1cbiAgICBhcHBldGl6ZXJzIHtcbiAgICAgIF9pZFxuICAgICAgaXRlbURlc2NyaXB0aW9uXG4gICAgICBpdGVtUHJpY2VcbiAgICAgIHRhZ3NcbiAgICB9XG4gICAgZGVzZXJ0cyB7XG4gICAgICBfaWRcbiAgICAgIGl0ZW1EZXNjcmlwdGlvblxuICAgICAgaXRlbVByaWNlXG4gICAgICB0YWdzXG4gICAgfVxuICAgIGRyaW5rcyB7XG4gICAgICBfaWRcbiAgICAgIGl0ZW1EZXNjcmlwdGlvblxuICAgICAgaXRlbVByaWNlXG4gICAgICB0YWdzXG4gICAgfVxuICB9XG59YFxuXG5jb25zdCBvYnNlcnZhYmxlTWVudVF1ZXJ5ID0gY2xpZW50LndhdGNoUXVlcnkoe2ZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgcXVlcnk6IG1lbnVRdWVyeSwgcG9sbEludGVydmFsOiAxMDAwIH0pXG5vYnNlcnZhYmxlTWVudVF1ZXJ5LnN1YnNjcmliZSh7XG4gIG5leHQ6ICh7IGRhdGEgfSkgPT4gZGlzcGxheUxpdmVSZXN1bHRzKGRhdGEsIFwibWVudVwiKVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ251cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXBfdXNlcm5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwX3Bhc3N3b3JkJykudmFsdWU7XG4gIGNvbnN0IGZpcnN0bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdG5hbWUnKS52YWx1ZTtcbiAgY29uc3QgbGFzdG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFzdG5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvbmVfbnVtYmVyJykudmFsdWU7XG4gIGNvbnN0IHJvbGVzID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlJykudmFsdWVdO1xuXG4gIGNsaWVudFxuICAgIC5tdXRhdGUoeyBtdXRhdGlvbjogc2lnbnVwTXV0YXRpb24sIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgdmFyaWFibGVzOiB7IHVzZXJuYW1lLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBwaG9uZU51bWJlciwgcGFzc3dvcmQsIHJvbGVzIH0gfSlcbiAgICAudGhlbihkaXNwbGF5UmVzdWx0LCBkaXNwbGF5UmVzdWx0KVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ydW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1pbnB1dCcpLnZhbHVlO1xuXG4gIGlmIChpbnB1dC50cmltKCkuaW5kZXhPZihcIm11dGF0aW9uXCIpID09PSAwKSB7XG4gICAgY2xpZW50XG4gICAgICAubXV0YXRlKHsgbXV0YXRpb246IGdxbGAke2lucHV0fWAsIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyB9KVxuICAgICAgLnRoZW4oZGlzcGxheVJlc3VsdCwgZGlzcGxheVJlc3VsdClcbiAgfVxuXG4gIGlmIChpbnB1dC50cmltKCkuaW5kZXhPZihcInF1ZXJ5XCIpID09PSAwKSB7XG4gICAgY2xpZW50XG4gICAgICAucXVlcnkoeyBxdWVyeTogZ3FsYCR7aW5wdXR9YCwgIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyB9KVxuICAgICAgLnRoZW4oZGlzcGxheVJlc3VsdCwgZGlzcGxheVJlc3VsdClcbiAgfVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1pbnB1dCcpLnZhbHVlID0gXCJcIlxufSlcblxudmFyIG9ic2VydmFibGVPcmRlcnNRdWVyeSwgb3JkZXJzU3Vic2NyaXB0aW9uO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW5fdXNlcm5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW5fcGFzc3dvcmQnKS52YWx1ZTtcblxuICBjbGllbnRcbiAgICAubXV0YXRlKHsgbXV0YXRpb246IGxvZ2luTXV0YXRpb24sIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgdmFyaWFibGVzOiB7IHVzZXJuYW1lLCBwYXNzd29yZCB9IH0pXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LmRhdGEgJiYgcmVzdWx0LmRhdGEubG9nSW4gJiYgcmVzdWx0LmRhdGEubG9nSW4udG9rZW4pIHtcbiAgICAgICAgICB3ZWJ0b2tlbiA9IHJlc3VsdC5kYXRhLmxvZ0luLnRva2VuXG4gICAgICAgICAgZGlzcGxheVRva2VuKHdlYnRva2VuKVxuICAgICAgICAgIGlmIChvYnNlcnZhYmxlT3JkZXJzUXVlcnkpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGVPcmRlcnNRdWVyeS5zdG9wUG9sbGluZygpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcmRlcnNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIG9yZGVyc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2JzZXJ2YWJsZU9yZGVyc1F1ZXJ5ID0gY2xpZW50LndhdGNoUXVlcnkoe2ZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgcXVlcnk6IG9yZGVyc1F1ZXJ5LCB2YXJpYWJsZXM6IHsgd2VidG9rZW4gfSwgcG9sbEludGVydmFsOiAxMDAwIH0pXG4gICAgICAgICAgb3JkZXJzU3Vic2NyaXB0aW9uID0gb2JzZXJ2YWJsZU9yZGVyc1F1ZXJ5LnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiAoeyBkYXRhIH0pID0+IGRpc3BsYXlMaXZlUmVzdWx0cyhkYXRhLCBcIm9yZGVyc1wiKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIGRpc3BsYXlSZXN1bHQocmVzdWx0KVxuICAgIH0sIGRpc3BsYXlSZXN1bHQpXG59KVxuXG4vL1xuLy8gaWdub3JlIGV2ZXJ5dGhpbmcgYmVsb3cgKGNvcHkgdG8gY2xpcGJvYXJkIGZ1bmN0aW9uYWxpdHkgZm9yIHRlc3QgY2xpZW50KVxuLy9cblxuICB2YXIgdHh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRva2VuJylcbiAgdmFyIGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3B5JylcbiAgXG4gIHZhciBjbGlwYm9hcmQgPVxuICB7XG4gICAgZGF0YSAgICAgIDogJycsXG4gICAgaW50ZXJjZXB0IDogZmFsc2UsXG4gICAgaG9vayAgICAgIDogZnVuY3Rpb24gKGV2dClcbiAgICB7XG4gICAgICBpZiAoY2xpcGJvYXJkLmludGVyY2VwdClcbiAgICAgIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2dC5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCBjbGlwYm9hcmQuZGF0YSk7XG4gICAgICAgIGNsaXBib2FyZC5pbnRlcmNlcHQgPSBmYWxzZTtcbiAgICAgICAgY2xpcGJvYXJkLmRhdGEgICAgICA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NvcHknLCBjbGlwYm9hcmQuaG9vayk7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnV0dG9uQ2xpY2spO1xuICBmdW5jdGlvbiBvbkJ1dHRvbkNsaWNrICgpXG4gIHtcbiAgICBjbGlwYm9hcmQuZGF0YSA9IHR4dC5pbm5lclRleHQ7XG4gICAgaWYgKHdpbmRvdy5jbGlwYm9hcmREYXRhKVxuICAgIHtcbiAgICAgIHdpbmRvdy5jbGlwYm9hcmREYXRhLnNldERhdGEoJ1RleHQnLCBjbGlwYm9hcmQuZGF0YSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICBjbGlwYm9hcmQuaW50ZXJjZXB0ID0gdHJ1ZTtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgfVxuICB9XG5cbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnd2hhdHdnLWZldGNoJyksIHJlcXVpcmUoJ2dyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlcicpLCByZXF1aXJlKCdyZWR1eCcpLCByZXF1aXJlKCdncmFwaHFsLWFueXdoZXJlJyksIHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cycsICd3aGF0d2ctZmV0Y2gnLCAnZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyJywgJ3JlZHV4JywgJ2dyYXBocWwtYW55d2hlcmUnLCAnc3ltYm9sLW9ic2VydmFibGUnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLmFwb2xsbyA9IGdsb2JhbC5hcG9sbG8gfHwge30pLG51bGwsZ2xvYmFsLmdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlcixnbG9iYWwucmVkdXgsZ2xvYmFsLmdyYXBocWxBbnl3aGVyZSxnbG9iYWwuJCRvYnNlcnZhYmxlKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cyx3aGF0d2dGZXRjaCxncmFwaHFsX2xhbmd1YWdlX3ByaW50ZXIscmVkdXgsZ3JhcGhxbEFueXdoZXJlLCQkb2JzZXJ2YWJsZSkgeyAndXNlIHN0cmljdCc7XG5cbmdyYXBocWxBbnl3aGVyZSA9ICdkZWZhdWx0JyBpbiBncmFwaHFsQW55d2hlcmUgPyBncmFwaHFsQW55d2hlcmVbJ2RlZmF1bHQnXSA6IGdyYXBocWxBbnl3aGVyZTtcbiQkb2JzZXJ2YWJsZSA9ICdkZWZhdWx0JyBpbiAkJG9ic2VydmFibGUgPyAkJG9ic2VydmFibGVbJ2RlZmF1bHQnXSA6ICQkb2JzZXJ2YWJsZTtcblxudmFyIF9fZXh0ZW5kcyA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuZnVuY3Rpb24gcHJpbnRSZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICByZXR1cm4gX19hc3NpZ24oe30sIHJlcXVlc3QsIHsgcXVlcnk6IGdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlci5wcmludChyZXF1ZXN0LnF1ZXJ5KSB9KTtcbn1cbnZhciBCYXNlTmV0d29ya0ludGVyZmFjZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFzZU5ldHdvcmtJbnRlcmZhY2UodXJpLCBvcHRzKSB7XG4gICAgICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IHt9OyB9XG4gICAgICAgIGlmICghdXJpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgcmVtb3RlIGVuZHBvaW50IGlzIHJlcXVpcmVkIGZvciBhIG5ldHdvcmsgbGF5ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHVyaSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVtb3RlIGVuZHBvaW50IG11c3QgYmUgYSBzdHJpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX29wdHMgPSBfX2Fzc2lnbih7fSwgb3B0cyk7XG4gICAgICAgIHRoaXMuX21pZGRsZXdhcmVzID0gW107XG4gICAgICAgIHRoaXMuX2FmdGVyd2FyZXMgPSBbXTtcbiAgICB9XG4gICAgQmFzZU5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0Jhc2VOZXR3b3JrSW50ZXJmYWNlIHNob3VsZCBub3QgYmUgdXNlZCBkaXJlY3RseScpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU5ldHdvcmtJbnRlcmZhY2U7XG59KCkpO1xudmFyIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlNaWRkbGV3YXJlcyA9IGZ1bmN0aW9uIChyZXF1ZXN0QW5kT3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSByZXF1ZXN0QW5kT3B0aW9ucy5yZXF1ZXN0LCBvcHRpb25zID0gcmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBxdWV1ZSA9IGZ1bmN0aW9uIChmdW5jcywgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseU1pZGRsZXdhcmUuYXBwbHkoc2NvcGUsIFt7IHJlcXVlc3Q6IHJlcXVlc3QsIG9wdGlvbnM6IG9wdGlvbnMgfSwgbmV4dF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWV1ZShfdGhpcy5fbWlkZGxld2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmFwcGx5QWZ0ZXJ3YXJlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzcG9uc2UgPSBfYS5yZXNwb25zZSwgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IHJlc3BvbnNlOiByZXNwb25zZSwgb3B0aW9uczogb3B0aW9ucyB9O1xuICAgICAgICAgICAgdmFyIHF1ZXVlID0gZnVuY3Rpb24gKGZ1bmNzLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmdW5jcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGx5QWZ0ZXJ3YXJlLmFwcGx5KHNjb3BlLCBbcmVzcG9uc2VPYmplY3QsIG5leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcXVldWUoX3RoaXMuX2FmdGVyd2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmZldGNoRnJvbVJlbW90ZUVuZHBvaW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gX2EucmVxdWVzdCwgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBmZXRjaCh0aGlzLl91cmksIF9fYXNzaWduKHt9LCB0aGlzLl9vcHRzLCB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KHByaW50UmVxdWVzdChyZXF1ZXN0KSksIG1ldGhvZDogJ1BPU1QnIH0sIG9wdGlvbnMsIHsgaGVhZGVyczogX19hc3NpZ24oeyBBY2NlcHQ6ICcqLyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMuaGVhZGVycykgfSkpO1xuICAgIH07XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF9fYXNzaWduKHt9LCB0aGlzLl9vcHRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHlNaWRkbGV3YXJlcyh7XG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmFvKSB7IHJldHVybiBfdGhpcy5mZXRjaEZyb21SZW1vdGVFbmRwb2ludC5jYWxsKF90aGlzLCByYW8pOyB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfdGhpcy5hcHBseUFmdGVyd2FyZXMoe1xuICAgICAgICAgICAgcmVzcG9uc2U6IHJlc3BvbnNlLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZSA9IF9hLnJlc3BvbnNlO1xuICAgICAgICAgICAgdmFyIGh0dHBSZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBSZXNwb25zZS5qc29uKCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0dHBFcnJvciA9IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgXCIgKyByZXNwb25zZS5zdGF0dXMgKyBcIiAtIFxcXCJcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgaHR0cEVycm9yLnJlc3BvbnNlID0gaHR0cFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGh0dHBFcnJvci5wYXJzZUVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhyb3cgaHR0cEVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgICAgICAgICAgaWYgKCFwYXlsb2FkLmhhc093blByb3BlcnR5KCdkYXRhJykgJiYgIXBheWxvYWQuaGFzT3duUHJvcGVydHkoJ2Vycm9ycycpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmVyIHJlc3BvbnNlIHdhcyBtaXNzaW5nIGZvciBxdWVyeSAnXCIgKyByZXF1ZXN0LmRlYnVnTmFtZSArIFwiJy5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAobWlkZGxld2FyZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1pZGRsZXdhcmUuYXBwbHlNaWRkbGV3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21pZGRsZXdhcmVzLnB1c2gobWlkZGxld2FyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pZGRsZXdhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5TWlkZGxld2FyZSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS51c2VBZnRlciA9IGZ1bmN0aW9uIChhZnRlcndhcmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGFmdGVyd2FyZXMubWFwKGZ1bmN0aW9uIChhZnRlcndhcmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWZ0ZXJ3YXJlLmFwcGx5QWZ0ZXJ3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FmdGVyd2FyZXMucHVzaChhZnRlcndhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZnRlcndhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5QWZ0ZXJ3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlO1xufShCYXNlTmV0d29ya0ludGVyZmFjZSkpO1xuZnVuY3Rpb24gY3JlYXRlTmV0d29ya0ludGVyZmFjZSh1cmlPckludGVyZmFjZU9wdHMsIHNlY29uZEFyZ09wdHMpIHtcbiAgICBpZiAoc2Vjb25kQXJnT3B0cyA9PT0gdm9pZCAwKSB7IHNlY29uZEFyZ09wdHMgPSB7fTsgfVxuICAgIGlmICghdXJpT3JJbnRlcmZhY2VPcHRzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcGFzcyBhbiBvcHRpb25zIGFyZ3VtZW50IHRvIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UuJyk7XG4gICAgfVxuICAgIHZhciB1cmk7XG4gICAgdmFyIG9wdHM7XG4gICAgaWYgKHR5cGVvZiB1cmlPckludGVyZmFjZU9wdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlBhc3NpbmcgdGhlIFVSSSBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gY3JlYXRlTmV0d29ya0ludGVyZmFjZSBpcyBkZXByZWNhdGVkIGFzIG9mIEFwb2xsbyBDbGllbnQgMC41LiBQbGVhc2UgcGFzcyBpdCBhcyB0aGUgXFxcInVyaVxcXCIgcHJvcGVydHkgb2YgdGhlIG5ldHdvcmsgaW50ZXJmYWNlIG9wdGlvbnMuXCIpO1xuICAgICAgICBvcHRzID0gc2Vjb25kQXJnT3B0cztcbiAgICAgICAgdXJpID0gdXJpT3JJbnRlcmZhY2VPcHRzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb3B0cyA9IHVyaU9ySW50ZXJmYWNlT3B0cy5vcHRzO1xuICAgICAgICB1cmkgPSB1cmlPckludGVyZmFjZU9wdHMudXJpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UodXJpLCBvcHRzKTtcbn1cblxudmFyIFF1ZXJ5QmF0Y2hlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUXVlcnlCYXRjaGVyKF9hKSB7XG4gICAgICAgIHZhciBiYXRjaEludGVydmFsID0gX2EuYmF0Y2hJbnRlcnZhbCwgYmF0Y2hGZXRjaEZ1bmN0aW9uID0gX2EuYmF0Y2hGZXRjaEZ1bmN0aW9uO1xuICAgICAgICB0aGlzLnF1ZXVlZFJlcXVlc3RzID0gW107XG4gICAgICAgIHRoaXMucXVldWVkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5iYXRjaEludGVydmFsID0gYmF0Y2hJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5iYXRjaEZldGNoRnVuY3Rpb24gPSBiYXRjaEZldGNoRnVuY3Rpb247XG4gICAgfVxuICAgIFF1ZXJ5QmF0Y2hlci5wcm90b3R5cGUuZW5xdWV1ZVJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICB2YXIgZmV0Y2hSZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cy5wdXNoKGZldGNoUmVxdWVzdCk7XG4gICAgICAgIGZldGNoUmVxdWVzdC5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZmV0Y2hSZXF1ZXN0LnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgZmV0Y2hSZXF1ZXN0LnJlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLnF1ZXVlZFJlcXVlc3RzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVF1ZXVlQ29uc3VtcHRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2hSZXF1ZXN0LnByb21pc2U7XG4gICAgfTtcbiAgICBRdWVyeUJhdGNoZXIucHJvdG90eXBlLmNvbnN1bWVRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcXVlc3RzID0gdGhpcy5xdWV1ZWRSZXF1ZXN0cy5tYXAoZnVuY3Rpb24gKHF1ZXVlZFJlcXVlc3QpIHsgcmV0dXJuIHF1ZXVlZFJlcXVlc3QucmVxdWVzdDsgfSk7XG4gICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgICAgICB2YXIgcmVzb2x2ZXJzID0gW107XG4gICAgICAgIHZhciByZWplY3RlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cy5mb3JFYWNoKGZ1bmN0aW9uIChmZXRjaFJlcXVlc3QsIGluZGV4KSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGZldGNoUmVxdWVzdC5wcm9taXNlKTtcbiAgICAgICAgICAgIHJlc29sdmVycy5wdXNoKGZldGNoUmVxdWVzdC5yZXNvbHZlKTtcbiAgICAgICAgICAgIHJlamVjdGVycy5wdXNoKGZldGNoUmVxdWVzdC5yZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB2YXIgYmF0Y2hlZFByb21pc2UgPSB0aGlzLmJhdGNoRmV0Y2hGdW5jdGlvbihyZXF1ZXN0cyk7XG4gICAgICAgIGJhdGNoZWRQcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAocmVzdWx0LCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmVyc1tpbmRleF0ocmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChyZWplY3RlciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZWplY3RlcnNbaW5kZXhdKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VzO1xuICAgIH07XG4gICAgUXVlcnlCYXRjaGVyLnByb3RvdHlwZS5zY2hlZHVsZVF1ZXVlQ29uc3VtcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuY29uc3VtZVF1ZXVlKCk7XG4gICAgICAgIH0sIHRoaXMuYmF0Y2hJbnRlcnZhbCk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlCYXRjaGVyO1xufSgpKTtcblxuZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIHZhciBzb3VyY2VzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgc291cmNlc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoc291cmNlKSA9PT0gJ3VuZGVmaW5lZCcgfHwgc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBfX2V4dGVuZHMkMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduJDEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMShIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlKHVyaSwgYmF0Y2hJbnRlcnZhbCwgZmV0Y2hPcHRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHVyaSwgZmV0Y2hPcHRzKSB8fCB0aGlzO1xuICAgICAgICBpZiAodHlwZW9mIGJhdGNoSW50ZXJ2YWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYXRjaEludGVydmFsIG11c3QgYmUgYSBudW1iZXIsIGdvdCBcIiArIGJhdGNoSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmJhdGNoZXIgPSBuZXcgUXVlcnlCYXRjaGVyKHtcbiAgICAgICAgICAgIGJhdGNoSW50ZXJ2YWw6IGJhdGNoSW50ZXJ2YWwsXG4gICAgICAgICAgICBiYXRjaEZldGNoRnVuY3Rpb246IF90aGlzLmJhdGNoUXVlcnkuYmluZChfdGhpcyksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXRjaGVyLmVucXVldWVSZXF1ZXN0KHJlcXVlc3QpO1xuICAgIH07XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5iYXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKHJlcXVlc3RzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gX19hc3NpZ24kMSh7fSwgdGhpcy5fb3B0cyk7XG4gICAgICAgIHZhciBtaWRkbGV3YXJlUHJvbWlzZSA9IHRoaXMuYXBwbHlCYXRjaE1pZGRsZXdhcmVzKHtcbiAgICAgICAgICAgIHJlcXVlc3RzOiByZXF1ZXN0cyxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbWlkZGxld2FyZVByb21pc2UudGhlbihmdW5jdGlvbiAoYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5iYXRjaGVkRmV0Y2hGcm9tUmVtb3RlRW5kcG9pbnQoYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaHR0cFJlc3BvbnNlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWh0dHBSZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmFwcGx5QmF0Y2hBZnRlcndhcmVzKHsgcmVzcG9uc2VzOiBbaHR0cFJlc3BvbnNlXSwgb3B0aW9uczogYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaHR0cEVycm9yID0gbmV3IEVycm9yKFwiTmV0d29yayByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBcIiArIGh0dHBSZXNwb25zZS5zdGF0dXMgKyBcIiAtIFxcXCJcIiArIGh0dHBSZXNwb25zZS5zdGF0dXNUZXh0ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBFcnJvci5yZXNwb25zZSA9IGh0dHBSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBodHRwRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2VzLm1hcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2U6IHNlcnZlciByZXNwb25zZSBpcyBub3QgYW4gYXJyYXknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5hcHBseUJhdGNoQWZ0ZXJ3YXJlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZXM6IHJlc3BvbnNlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2VBbmRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlQW5kT3B0aW9ucy5yZXNwb25zZXMpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlCYXRjaE1pZGRsZXdhcmVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IF9hLnJlcXVlc3RzLCBvcHRpb25zID0gX2Eub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBxdWV1ZSA9IGZ1bmN0aW9uIChmdW5jcywgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseUJhdGNoTWlkZGxld2FyZS5hcHBseShzY29wZSwgW3sgcmVxdWVzdHM6IHJlcXVlc3RzLCBvcHRpb25zOiBvcHRpb25zIH0sIG5leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzOiByZXF1ZXN0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWV1ZShfdGhpcy5fbWlkZGxld2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlCYXRjaEFmdGVyd2FyZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlc3BvbnNlcyA9IF9hLnJlc3BvbnNlcywgb3B0aW9ucyA9IF9hLm9wdGlvbnM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VPYmplY3QgPSB7IHJlc3BvbnNlczogcmVzcG9uc2VzLCBvcHRpb25zOiBvcHRpb25zIH07XG4gICAgICAgICAgICB2YXIgcXVldWUgPSBmdW5jdGlvbiAoZnVuY3MsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGZ1bmNzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuYXBwbHlCYXRjaEFmdGVyd2FyZS5hcHBseShzY29wZSwgW3Jlc3BvbnNlT2JqZWN0LCBuZXh0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlT2JqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1ZXVlKF90aGlzLl9hZnRlcndhcmVzLnNsaWNlKCksIF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChtaWRkbGV3YXJlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWlkZGxld2FyZS5hcHBseUJhdGNoTWlkZGxld2FyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIF90aGlzLl9taWRkbGV3YXJlcy5wdXNoKG1pZGRsZXdhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBtaWRkbGV3YXJlIG11c3QgaW1wbGVtZW50IHRoZSBhcHBseUJhdGNoTWlkZGxld2FyZSBmdW5jdGlvbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZUFmdGVyID0gZnVuY3Rpb24gKGFmdGVyd2FyZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgYWZ0ZXJ3YXJlcy5tYXAoZnVuY3Rpb24gKGFmdGVyd2FyZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZnRlcndhcmUuYXBwbHlCYXRjaEFmdGVyd2FyZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIF90aGlzLl9hZnRlcndhcmVzLnB1c2goYWZ0ZXJ3YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmF0Y2ggYWZ0ZXJ3YXJlIG11c3QgaW1wbGVtZW50IHRoZSBhcHBseUJhdGNoQWZ0ZXJ3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYmF0Y2hlZEZldGNoRnJvbVJlbW90ZUVuZHBvaW50ID0gZnVuY3Rpb24gKGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgYXNzaWduKG9wdGlvbnMsIGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMub3B0aW9ucyk7XG4gICAgICAgIHZhciBwcmludGVkUmVxdWVzdHMgPSBiYXRjaFJlcXVlc3RBbmRPcHRpb25zLnJlcXVlc3RzLm1hcChmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHByaW50UmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmZXRjaCh0aGlzLl91cmksIF9fYXNzaWduJDEoe30sIHRoaXMuX29wdHMsIHsgYm9keTogSlNPTi5zdHJpbmdpZnkocHJpbnRlZFJlcXVlc3RzKSwgbWV0aG9kOiAnUE9TVCcgfSwgb3B0aW9ucywgeyBoZWFkZXJzOiBfX2Fzc2lnbiQxKHsgQWNjZXB0OiAnKi8qJywgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LCBvcHRpb25zLmhlYWRlcnMpIH0pKTtcbiAgICB9O1xuICAgIHJldHVybiBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2U7XG59KEJhc2VOZXR3b3JrSW50ZXJmYWNlKSk7XG5mdW5jdGlvbiBjcmVhdGVCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2Uob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHBhc3MgYW4gb3B0aW9ucyBhcmd1bWVudCB0byBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZShvcHRpb25zLnVyaSwgb3B0aW9ucy5iYXRjaEludGVydmFsLCBvcHRpb25zLm9wdHMgfHwge30pO1xufVxuXG5mdW5jdGlvbiBpc1F1ZXJ5UmVzdWx0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9SRVNVTFQnO1xufVxuZnVuY3Rpb24gaXNRdWVyeUVycm9yQWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9FUlJPUic7XG59XG5mdW5jdGlvbiBpc1F1ZXJ5SW5pdEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fUVVFUllfSU5JVCc7XG59XG5mdW5jdGlvbiBpc1F1ZXJ5UmVzdWx0Q2xpZW50QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9SRVNVTFRfQ0xJRU5UJztcbn1cbmZ1bmN0aW9uIGlzUXVlcnlTdG9wQWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9TVE9QJztcbn1cbmZ1bmN0aW9uIGlzTXV0YXRpb25Jbml0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19NVVRBVElPTl9JTklUJztcbn1cbmZ1bmN0aW9uIGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX01VVEFUSU9OX1JFU1VMVCc7XG59XG5mdW5jdGlvbiBpc011dGF0aW9uRXJyb3JBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX01VVEFUSU9OX0VSUk9SJztcbn1cbmZ1bmN0aW9uIGlzVXBkYXRlUXVlcnlSZXN1bHRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1VQREFURV9RVUVSWV9SRVNVTFQnO1xufVxuZnVuY3Rpb24gaXNTdG9yZVJlc2V0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19TVE9SRV9SRVNFVCc7XG59XG5mdW5jdGlvbiBpc1N1YnNjcmlwdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fU1VCU0NSSVBUSU9OX1JFU1VMVCc7XG59XG5mdW5jdGlvbiBpc1dyaXRlQWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19XUklURSc7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ1N0cmluZ1ZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzQm9vbGVhblZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdCb29sZWFuVmFsdWUnO1xufVxuZnVuY3Rpb24gaXNJbnRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnSW50VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNGbG9hdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdGbG9hdFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzVmFyaWFibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ1ZhcmlhYmxlJztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ09iamVjdFZhbHVlJztcbn1cbmZ1bmN0aW9uIGlzTGlzdFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdMaXN0VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNFbnVtVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0VudW1WYWx1ZSc7XG59XG5mdW5jdGlvbiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24oYXJnT2JqLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKSB7XG4gICAgaWYgKGlzSW50VmFsdWUodmFsdWUpIHx8IGlzRmxvYXRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gTnVtYmVyKHZhbHVlLnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNCb29sZWFuVmFsdWUodmFsdWUpIHx8IGlzU3RyaW5nVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdFZhbHVlKHZhbHVlKSkge1xuICAgICAgICB2YXIgbmVzdGVkQXJnT2JqXzEgPSB7fTtcbiAgICAgICAgdmFsdWUuZmllbGRzLm1hcChmdW5jdGlvbiAob2JqKSB7IHJldHVybiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24obmVzdGVkQXJnT2JqXzEsIG9iai5uYW1lLCBvYmoudmFsdWUsIHZhcmlhYmxlcyk7IH0pO1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSBuZXN0ZWRBcmdPYmpfMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNWYXJpYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHZhcmlhYmxlVmFsdWUgPSAodmFyaWFibGVzIHx8IHt9KVt2YWx1ZS5uYW1lLnZhbHVlXTtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFyaWFibGVWYWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNMaXN0VmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlcy5tYXAoZnVuY3Rpb24gKGxpc3RWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIG5lc3RlZEFyZ0FycmF5T2JqID0ge307XG4gICAgICAgICAgICB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24obmVzdGVkQXJnQXJyYXlPYmosIG5hbWUsIGxpc3RWYWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgIHJldHVybiBuZXN0ZWRBcmdBcnJheU9ialtuYW1lLnZhbHVlXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRW51bVZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YWx1ZS52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBpbmxpbmUgYXJndW1lbnQgXFxcIlwiICsgbmFtZS52YWx1ZSArIFwiXFxcIiBvZiBraW5kIFxcXCJcIiArIHZhbHVlLmtpbmQgKyBcIlxcXCIgaXMgbm90IHN1cHBvcnRlZC5cXG4gICAgICAgICAgICAgICAgICAgIFVzZSB2YXJpYWJsZXMgaW5zdGVhZCBvZiBpbmxpbmUgYXJndW1lbnRzIHRvIG92ZXJjb21lIHRoaXMgbGltaXRhdGlvbi5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gc3RvcmVLZXlOYW1lRnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAoZmllbGQuYXJndW1lbnRzICYmIGZpZWxkLmFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGFyZ09ial8xID0ge307XG4gICAgICAgIGZpZWxkLmFyZ3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihhcmdPYmpfMSwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RvcmVLZXlOYW1lRnJvbUZpZWxkTmFtZUFuZEFyZ3MoZmllbGQubmFtZS52YWx1ZSwgYXJnT2JqXzEpO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGQubmFtZS52YWx1ZTtcbn1cbmZ1bmN0aW9uIHN0b3JlS2V5TmFtZUZyb21GaWVsZE5hbWVBbmRBcmdzKGZpZWxkTmFtZSwgYXJncykge1xuICAgIGlmIChhcmdzKSB7XG4gICAgICAgIHZhciBzdHJpbmdpZmllZEFyZ3MgPSBKU09OLnN0cmluZ2lmeShhcmdzKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkTmFtZSArIFwiKFwiICsgc3RyaW5naWZpZWRBcmdzICsgXCIpXCI7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZE5hbWU7XG59XG5mdW5jdGlvbiByZXN1bHRLZXlOYW1lRnJvbUZpZWxkKGZpZWxkKSB7XG4gICAgcmV0dXJuIGZpZWxkLmFsaWFzID9cbiAgICAgICAgZmllbGQuYWxpYXMudmFsdWUgOlxuICAgICAgICBmaWVsZC5uYW1lLnZhbHVlO1xufVxuZnVuY3Rpb24gaXNGaWVsZChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCc7XG59XG5mdW5jdGlvbiBpc0lubGluZUZyYWdtZW50KHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb24ua2luZCA9PT0gJ0lubGluZUZyYWdtZW50Jztcbn1cbmZ1bmN0aW9uIGdyYXBoUUxSZXN1bHRIYXNFcnJvcihyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIGlzSWRWYWx1ZShpZE9iamVjdCkge1xuICAgIHJldHVybiAoaWRPYmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YgaWRPYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICAgIGlkT2JqZWN0LnR5cGUgPT09ICdpZCcpO1xufVxuZnVuY3Rpb24gdG9JZFZhbHVlKGlkLCBnZW5lcmF0ZWQpIHtcbiAgICBpZiAoZ2VuZXJhdGVkID09PSB2b2lkIDApIHsgZ2VuZXJhdGVkID0gZmFsc2U7IH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnaWQnLFxuICAgICAgICBpZDogaWQsXG4gICAgICAgIGdlbmVyYXRlZDogZ2VuZXJhdGVkLFxuICAgIH07XG59XG5mdW5jdGlvbiBpc0pzb25WYWx1ZShqc29uT2JqZWN0KSB7XG4gICAgcmV0dXJuIChqc29uT2JqZWN0ICE9IG51bGwgJiZcbiAgICAgICAgdHlwZW9mIGpzb25PYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICAgIGpzb25PYmplY3QudHlwZSA9PT0gJ2pzb24nKTtcbn1cblxudmFyIF9fYXNzaWduJDUgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5mdW5jdGlvbiBnZXRNdXRhdGlvbkRlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBtdXRhdGlvbkRlZiA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nXG4gICAgICAgICAgICAmJiBkZWZpbml0aW9uLm9wZXJhdGlvbiA9PT0gJ211dGF0aW9uJykge1xuICAgICAgICAgICAgbXV0YXRpb25EZWYgPSBkZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFtdXRhdGlvbkRlZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgY29udGFpbiBhIG11dGF0aW9uIGRlZmluaXRpb24uJyk7XG4gICAgfVxuICAgIHJldHVybiBtdXRhdGlvbkRlZjtcbn1cbmZ1bmN0aW9uIGNoZWNrRG9jdW1lbnQoZG9jKSB7XG4gICAgaWYgKGRvYy5raW5kICE9PSAnRG9jdW1lbnQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGluZyBhIHBhcnNlZCBHcmFwaFFMIGRvY3VtZW50LiBQZXJoYXBzIHlvdSBuZWVkIHRvIHdyYXAgdGhlIHF1ZXJ5IHN0cmluZyBpbiBhIFxcXCJncWxcXFwiIHRhZz8gaHR0cDovL2RvY3MuYXBvbGxvc3RhY2suY29tL2Fwb2xsby1jbGllbnQvY29yZS5odG1sI2dxbFwiKTtcbiAgICB9XG4gICAgdmFyIGZvdW5kT3BlcmF0aW9uID0gZmFsc2U7XG4gICAgZG9jLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgc3dpdGNoIChkZWZpbml0aW9uLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ0ZyYWdtZW50RGVmaW5pdGlvbic6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdPcGVyYXRpb25EZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICBpZiAoZm91bmRPcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWVyaWVzIG11c3QgaGF2ZSBleGFjdGx5IG9uZSBvcGVyYXRpb24gZGVmaW5pdGlvbi4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm91bmRPcGVyYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY2hlbWEgdHlwZSBkZWZpbml0aW9ucyBub3QgYWxsb3dlZCBpbiBxdWVyaWVzLiBGb3VuZDogXFxcIlwiICsgZGVmaW5pdGlvbi5raW5kICsgXCJcXFwiXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBnZXRPcGVyYXRpb25OYW1lKGRvYykge1xuICAgIHZhciByZXMgPSAnJztcbiAgICBkb2MuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicgJiYgZGVmaW5pdGlvbi5uYW1lKSB7XG4gICAgICAgICAgICByZXMgPSBkZWZpbml0aW9uLm5hbWUudmFsdWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gZ2V0RnJhZ21lbnREZWZpbml0aW9ucyhkb2MpIHtcbiAgICB2YXIgZnJhZ21lbnREZWZpbml0aW9ucyA9IGRvYy5kZWZpbml0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZyYWdtZW50RGVmaW5pdGlvbnM7XG59XG5mdW5jdGlvbiBnZXRRdWVyeURlZmluaXRpb24oZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBxdWVyeURlZiA9IG51bGw7XG4gICAgZG9jLmRlZmluaXRpb25zLm1hcChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbidcbiAgICAgICAgICAgICYmIGRlZmluaXRpb24ub3BlcmF0aW9uID09PSAncXVlcnknKSB7XG4gICAgICAgICAgICBxdWVyeURlZiA9IGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXF1ZXJ5RGVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBjb250YWluIGEgcXVlcnkgZGVmaW5pdGlvbi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5RGVmO1xufVxuZnVuY3Rpb24gZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbihkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIG9wRGVmID0gbnVsbDtcbiAgICBkb2MuZGVmaW5pdGlvbnMubWFwKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJykge1xuICAgICAgICAgICAgb3BEZWYgPSBkZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFvcERlZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgY29udGFpbiBhIHF1ZXJ5IGRlZmluaXRpb24uJyk7XG4gICAgfVxuICAgIHJldHVybiBvcERlZjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRNYXAoZnJhZ21lbnRzKSB7XG4gICAgaWYgKGZyYWdtZW50cyA9PT0gdm9pZCAwKSB7IGZyYWdtZW50cyA9IFtdOyB9XG4gICAgdmFyIHN5bVRhYmxlID0ge307XG4gICAgZnJhZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIHN5bVRhYmxlW2ZyYWdtZW50Lm5hbWUudmFsdWVdID0gZnJhZ21lbnQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN5bVRhYmxlO1xufVxuZnVuY3Rpb24gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGRvY3VtZW50LCBmcmFnbWVudE5hbWUpIHtcbiAgICB2YXIgYWN0dWFsRnJhZ21lbnROYW1lID0gZnJhZ21lbnROYW1lO1xuICAgIHZhciBmcmFnbWVudHMgPSBbXTtcbiAgICBkb2N1bWVudC5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm91bmQgYSBcIiArIGRlZmluaXRpb24ub3BlcmF0aW9uICsgXCIgb3BlcmF0aW9uXCIgKyAoZGVmaW5pdGlvbi5uYW1lID8gXCIgbmFtZWQgJ1wiICsgZGVmaW5pdGlvbi5uYW1lLnZhbHVlICsgXCInXCIgOiAnJykgKyBcIi4gXCIgK1xuICAgICAgICAgICAgICAgICdObyBvcGVyYXRpb25zIGFyZSBhbGxvd2VkIHdoZW4gdXNpbmcgYSBmcmFnbWVudCBhcyBhIHF1ZXJ5LiBPbmx5IGZyYWdtZW50cyBhcmUgYWxsb3dlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgZnJhZ21lbnRzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGFjdHVhbEZyYWdtZW50TmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKGZyYWdtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZvdW5kIFwiICsgZnJhZ21lbnRzLmxlbmd0aCArIFwiIGZyYWdtZW50cy4gYGZyYWdtZW50TmFtZWAgbXVzdCBiZSBwcm92aWRlZCB3aGVuIHRoZXJlIGlzIG5vdCBleGFjdGx5IDEgZnJhZ21lbnQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGFjdHVhbEZyYWdtZW50TmFtZSA9IGZyYWdtZW50c1swXS5uYW1lLnZhbHVlO1xuICAgIH1cbiAgICB2YXIgcXVlcnkgPSBfX2Fzc2lnbiQ1KHt9LCBkb2N1bWVudCwgeyBkZWZpbml0aW9uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGtpbmQ6ICdPcGVyYXRpb25EZWZpbml0aW9uJyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdxdWVyeScsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdTZWxlY3Rpb25TZXQnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogJ0ZyYWdtZW50U3ByZWFkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFjdHVhbEZyYWdtZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICBdLmNvbmNhdChkb2N1bWVudC5kZWZpbml0aW9ucykgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xufVxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbHVlcyhkZWZpbml0aW9uKSB7XG4gICAgaWYgKGRlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucyAmJiBkZWZpbml0aW9uLnZhcmlhYmxlRGVmaW5pdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWVzID0gZGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IF9hLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHZhcmlhYmxlID0gX2EudmFyaWFibGUsIGRlZmF1bHRWYWx1ZSA9IF9hLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWVPYmogPSB7fTtcbiAgICAgICAgICAgIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihkZWZhdWx0VmFsdWVPYmosIHZhcmlhYmxlLm5hbWUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlT2JqO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFzc2lnbi5hcHBseSh2b2lkIDAsIFt7fV0uY29uY2F0KGRlZmF1bHRWYWx1ZXMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSB7XG4gICAgaWYgKHZhcmlhYmxlcyA9PT0gdm9pZCAwKSB7IHZhcmlhYmxlcyA9IHt9OyB9XG4gICAgaWYgKCFzZWxlY3Rpb24uZGlyZWN0aXZlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IHRydWU7XG4gICAgc2VsZWN0aW9uLmRpcmVjdGl2ZXMuZm9yRWFjaChmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgIGlmIChkaXJlY3RpdmUubmFtZS52YWx1ZSAhPT0gJ3NraXAnICYmIGRpcmVjdGl2ZS5uYW1lLnZhbHVlICE9PSAnaW5jbHVkZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlyZWN0aXZlQXJndW1lbnRzID0gZGlyZWN0aXZlLmFyZ3VtZW50cyB8fCBbXTtcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmUubmFtZS52YWx1ZTtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZUFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzIGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmQXJndW1lbnQgPSBkaXJlY3RpdmVBcmd1bWVudHNbMF07XG4gICAgICAgIGlmICghaWZBcmd1bWVudC5uYW1lIHx8IGlmQXJndW1lbnQubmFtZS52YWx1ZSAhPT0gJ2lmJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudCBmb3IgdGhlIEBcIiArIGRpcmVjdGl2ZU5hbWUgKyBcIiBkaXJlY3RpdmUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZlZhbHVlID0gZGlyZWN0aXZlQXJndW1lbnRzWzBdLnZhbHVlO1xuICAgICAgICB2YXIgZXZhbGVkVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFpZlZhbHVlIHx8IGlmVmFsdWUua2luZCAhPT0gJ0Jvb2xlYW5WYWx1ZScpIHtcbiAgICAgICAgICAgIGlmIChpZlZhbHVlLmtpbmQgIT09ICdWYXJpYWJsZScpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBmb3IgdGhlIEBcIiArIGRpcmVjdGl2ZU5hbWUgKyBcIiBkaXJlY3RpdmUgbXVzdCBiZSBhIHZhcmlhYmxlIG9yIGEgYm9vbCBlYW4gdmFsdWUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSB2YXJpYWJsZXNbaWZWYWx1ZS5uYW1lLnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoZXZhbGVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhcmlhYmxlIHJlZmVyZW5jZWQgaW4gQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSBpZlZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3RpdmVOYW1lID09PSAnc2tpcCcpIHtcbiAgICAgICAgICAgIGV2YWxlZFZhbHVlID0gIWV2YWxlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZhbGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gZ2V0RW52KCkge1xuICAgIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52Lk5PREVfRU5WO1xuICAgIH1cbiAgICByZXR1cm4gJ2RldmVsb3BtZW50Jztcbn1cbmZ1bmN0aW9uIGlzRW52KGVudikge1xuICAgIHJldHVybiBnZXRFbnYoKSA9PT0gZW52O1xufVxuZnVuY3Rpb24gaXNQcm9kdWN0aW9uKCkge1xuICAgIHJldHVybiBpc0VudigncHJvZHVjdGlvbicpID09PSB0cnVlO1xufVxuZnVuY3Rpb24gaXNEZXZlbG9wbWVudCgpIHtcbiAgICByZXR1cm4gaXNFbnYoJ2RldmVsb3BtZW50JykgPT09IHRydWU7XG59XG5mdW5jdGlvbiBpc1Rlc3QoKSB7XG4gICAgcmV0dXJuIGlzRW52KCd0ZXN0JykgPT09IHRydWU7XG59XG5cbnZhciBfX2V4dGVuZHMkMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduJDQgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgV3JpdGVFcnJvciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDIoV3JpdGVFcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXcml0ZUVycm9yKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudHlwZSA9ICdXcml0ZUVycm9yJztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gV3JpdGVFcnJvcjtcbn0oRXJyb3IpKTtcbmZ1bmN0aW9uIHdyaXRlUXVlcnlUb1N0b3JlKF9hKSB7XG4gICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdCwgcXVlcnkgPSBfYS5xdWVyeSwgX2IgPSBfYS5zdG9yZSwgc3RvcmUgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkYXRhSWRGcm9tT2JqZWN0ID0gX2EuZGF0YUlkRnJvbU9iamVjdCwgX2MgPSBfYS5mcmFnbWVudE1hcCwgZnJhZ21lbnRNYXAgPSBfYyA9PT0gdm9pZCAwID8ge30gOiBfYywgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBfYS5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbjtcbiAgICB2YXIgcXVlcnlEZWZpbml0aW9uID0gZ2V0UXVlcnlEZWZpbml0aW9uKHF1ZXJ5KTtcbiAgICB2YXJpYWJsZXMgPSBhc3NpZ24oe30sIGdldERlZmF1bHRWYWx1ZXMocXVlcnlEZWZpbml0aW9uKSwgdmFyaWFibGVzKTtcbiAgICByZXR1cm4gd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgZGF0YUlkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICBzZWxlY3Rpb25TZXQ6IHF1ZXJ5RGVmaW5pdGlvbi5zZWxlY3Rpb25TZXQsXG4gICAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgICAgIHN0b3JlOiBzdG9yZSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgIGZyYWdtZW50TWFwOiBmcmFnbWVudE1hcCxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbixcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHdyaXRlUmVzdWx0VG9TdG9yZShfYSkge1xuICAgIHZhciBkYXRhSWQgPSBfYS5kYXRhSWQsIHJlc3VsdCA9IF9hLnJlc3VsdCwgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgX2IgPSBfYS5zdG9yZSwgc3RvcmUgPSBfYiA9PT0gdm9pZCAwID8ge30gOiBfYiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkYXRhSWRGcm9tT2JqZWN0ID0gX2EuZGF0YUlkRnJvbU9iamVjdCwgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBfYS5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbjtcbiAgICB2YXIgb3BlcmF0aW9uRGVmaW5pdGlvbiA9IGdldE9wZXJhdGlvbkRlZmluaXRpb24oZG9jdW1lbnQpO1xuICAgIHZhciBzZWxlY3Rpb25TZXQgPSBvcGVyYXRpb25EZWZpbml0aW9uLnNlbGVjdGlvblNldDtcbiAgICB2YXIgZnJhZ21lbnRNYXAgPSBjcmVhdGVGcmFnbWVudE1hcChnZXRGcmFnbWVudERlZmluaXRpb25zKGRvY3VtZW50KSk7XG4gICAgdmFyaWFibGVzID0gYXNzaWduKHt9LCBnZXREZWZhdWx0VmFsdWVzKG9wZXJhdGlvbkRlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICBkYXRhSWQ6IGRhdGFJZCxcbiAgICAgICAgICAgIHNlbGVjdGlvblNldDogc2VsZWN0aW9uU2V0LFxuICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgIHN0b3JlOiBzdG9yZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWFwOiBmcmFnbWVudE1hcCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFyIGUyID0gbmV3IEVycm9yKFwiRXJyb3Igd3JpdGluZyByZXN1bHQgdG8gc3RvcmUgZm9yIHF1ZXJ5IFwiICsgKGRvY3VtZW50LmxvYyAmJiBkb2N1bWVudC5sb2Muc291cmNlLmJvZHkpKTtcbiAgICAgICAgZTIubWVzc2FnZSArPSAnL24nICsgZS5tZXNzYWdlO1xuICAgICAgICBlMi5zdGFjayA9IGUuc3RhY2s7XG4gICAgICAgIHRocm93IGUyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHdyaXRlU2VsZWN0aW9uU2V0VG9TdG9yZShfYSkge1xuICAgIHZhciByZXN1bHQgPSBfYS5yZXN1bHQsIGRhdGFJZCA9IF9hLmRhdGFJZCwgc2VsZWN0aW9uU2V0ID0gX2Euc2VsZWN0aW9uU2V0LCBjb250ZXh0ID0gX2EuY29udGV4dDtcbiAgICB2YXIgdmFyaWFibGVzID0gY29udGV4dC52YXJpYWJsZXMsIHN0b3JlID0gY29udGV4dC5zdG9yZSwgZGF0YUlkRnJvbU9iamVjdCA9IGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdCwgZnJhZ21lbnRNYXAgPSBjb250ZXh0LmZyYWdtZW50TWFwO1xuICAgIHNlbGVjdGlvblNldC5zZWxlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICB2YXIgaW5jbHVkZWQgPSBzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKTtcbiAgICAgICAgaWYgKGlzRmllbGQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdEZpZWxkS2V5ID0gcmVzdWx0S2V5TmFtZUZyb21GaWVsZChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0W3Jlc3VsdEZpZWxkS2V5XTtcbiAgICAgICAgICAgIGlmIChpbmNsdWRlZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyaXRlRmllbGRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJZDogZGF0YUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IHNlbGVjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJNaXNzaW5nIGZpZWxkIFwiICsgcmVzdWx0RmllbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGZyYWdtZW50ID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSAoZnJhZ21lbnRNYXAgfHwge30pW3NlbGVjdGlvbi5uYW1lLnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoIWZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyYWdtZW50IG5hbWVkIFwiICsgc2VsZWN0aW9uLm5hbWUudmFsdWUgKyBcIi5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gJiYgZnJhZ21lbnQudHlwZUNvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBpZFZhbHVlID0geyB0eXBlOiAnaWQnLCBpZDogJ3NlbGYnLCBnZW5lcmF0ZWQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgdmFyIGZha2VDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdG9yZTogeyAnc2VsZic6IHJlc3VsdCB9LFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGhhc01pc3NpbmdGaWVsZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbVJlc29sdmVyczoge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBtYXRjaGVzID0gY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbihpZFZhbHVlLCBmcmFnbWVudC50eXBlQ29uZGl0aW9uLm5hbWUudmFsdWUsIGZha2VDb250ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoZmFrZUNvbnRleHQucmV0dXJuUGFydGlhbERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignV0FSTklORzogaGV1cmlzdGljIGZyYWdtZW50IG1hdGNoaW5nIGdvaW5nIG9uIScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmNsdWRlZCAmJiBtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblNldDogZnJhZ21lbnQuc2VsZWN0aW9uU2V0LFxuICAgICAgICAgICAgICAgICAgICBkYXRhSWQ6IGRhdGFJZCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdG9yZTtcbn1cbmZ1bmN0aW9uIGlzR2VuZXJhdGVkSWQoaWQpIHtcbiAgICByZXR1cm4gKGlkWzBdID09PSAnJCcpO1xufVxuZnVuY3Rpb24gbWVyZ2VXaXRoR2VuZXJhdGVkKGdlbmVyYXRlZEtleSwgcmVhbEtleSwgY2FjaGUpIHtcbiAgICB2YXIgZ2VuZXJhdGVkID0gY2FjaGVbZ2VuZXJhdGVkS2V5XTtcbiAgICB2YXIgcmVhbCA9IGNhY2hlW3JlYWxLZXldO1xuICAgIE9iamVjdC5rZXlzKGdlbmVyYXRlZCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGdlbmVyYXRlZFtrZXldO1xuICAgICAgICB2YXIgcmVhbFZhbHVlID0gcmVhbFtrZXldO1xuICAgICAgICBpZiAoaXNJZFZhbHVlKHZhbHVlKVxuICAgICAgICAgICAgJiYgaXNHZW5lcmF0ZWRJZCh2YWx1ZS5pZClcbiAgICAgICAgICAgICYmIGlzSWRWYWx1ZShyZWFsVmFsdWUpKSB7XG4gICAgICAgICAgICBtZXJnZVdpdGhHZW5lcmF0ZWQodmFsdWUuaWQsIHJlYWxWYWx1ZS5pZCwgY2FjaGUpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBjYWNoZVtnZW5lcmF0ZWRLZXldO1xuICAgICAgICBjYWNoZVtyZWFsS2V5XSA9IF9fYXNzaWduJDQoe30sIGdlbmVyYXRlZCwgcmVhbCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiB3cml0ZUZpZWxkVG9TdG9yZShfYSkge1xuICAgIHZhciBmaWVsZCA9IF9hLmZpZWxkLCB2YWx1ZSA9IF9hLnZhbHVlLCBkYXRhSWQgPSBfYS5kYXRhSWQsIGNvbnRleHQgPSBfYS5jb250ZXh0O1xuICAgIHZhciB2YXJpYWJsZXMgPSBjb250ZXh0LnZhcmlhYmxlcywgZGF0YUlkRnJvbU9iamVjdCA9IGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdCwgc3RvcmUgPSBjb250ZXh0LnN0b3JlLCBmcmFnbWVudE1hcCA9IGNvbnRleHQuZnJhZ21lbnRNYXA7XG4gICAgdmFyIHN0b3JlVmFsdWU7XG4gICAgdmFyIHN0b3JlRmllbGROYW1lID0gc3RvcmVLZXlOYW1lRnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpO1xuICAgIHZhciBzaG91bGRNZXJnZSA9IGZhbHNlO1xuICAgIHZhciBnZW5lcmF0ZWRLZXkgPSAnJztcbiAgICBpZiAoIWZpZWxkLnNlbGVjdGlvblNldCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICBzdG9yZVZhbHVlID1cbiAgICAgICAgICAgIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgICAgID8geyB0eXBlOiAnanNvbicsIGpzb246IHZhbHVlIH1cbiAgICAgICAgICAgICAgICA6IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdGVkSWQgPSBkYXRhSWQgKyBcIi5cIiArIHN0b3JlRmllbGROYW1lO1xuICAgICAgICBzdG9yZVZhbHVlID0gcHJvY2Vzc0FycmF5VmFsdWUodmFsdWUsIGdlbmVyYXRlZElkLCBmaWVsZC5zZWxlY3Rpb25TZXQsIGNvbnRleHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHZhbHVlRGF0YUlkID0gZGF0YUlkICsgXCIuXCIgKyBzdG9yZUZpZWxkTmFtZTtcbiAgICAgICAgdmFyIGdlbmVyYXRlZCA9IHRydWU7XG4gICAgICAgIGlmICghaXNHZW5lcmF0ZWRJZCh2YWx1ZURhdGFJZCkpIHtcbiAgICAgICAgICAgIHZhbHVlRGF0YUlkID0gJyQnICsgdmFsdWVEYXRhSWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGFJZEZyb21PYmplY3QpIHtcbiAgICAgICAgICAgIHZhciBzZW1hbnRpY0lkID0gZGF0YUlkRnJvbU9iamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoc2VtYW50aWNJZCAmJiBpc0dlbmVyYXRlZElkKHNlbWFudGljSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJRHMgcmV0dXJuZWQgYnkgZGF0YUlkRnJvbU9iamVjdCBjYW5ub3QgYmVnaW4gd2l0aCB0aGUgXCIkXCIgY2hhcmFjdGVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbWFudGljSWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZURhdGFJZCA9IHNlbWFudGljSWQ7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgIGRhdGFJZDogdmFsdWVEYXRhSWQsXG4gICAgICAgICAgICByZXN1bHQ6IHZhbHVlLFxuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmaWVsZC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICB9KTtcbiAgICAgICAgc3RvcmVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdpZCcsXG4gICAgICAgICAgICBpZDogdmFsdWVEYXRhSWQsXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IGdlbmVyYXRlZCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN0b3JlW2RhdGFJZF0gJiYgc3RvcmVbZGF0YUlkXVtzdG9yZUZpZWxkTmFtZV0gIT09IHN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkSWQgPSBzdG9yZVtkYXRhSWRdW3N0b3JlRmllbGROYW1lXTtcbiAgICAgICAgICAgIGlmIChpc0lkVmFsdWUoc3RvcmVWYWx1ZSkgJiYgc3RvcmVWYWx1ZS5nZW5lcmF0ZWRcbiAgICAgICAgICAgICAgICAmJiBpc0lkVmFsdWUoZXNjYXBlZElkKSAmJiAhZXNjYXBlZElkLmdlbmVyYXRlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN0b3JlIGVycm9yOiB0aGUgYXBwbGljYXRpb24gYXR0ZW1wdGVkIHRvIHdyaXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3ZpZGVkIGlkXCIgK1xuICAgICAgICAgICAgICAgICAgICAoXCIgYnV0IHRoZSBzdG9yZSBhbHJlYWR5IGNvbnRhaW5zIGFuIGlkIG9mIFwiICsgZXNjYXBlZElkLmlkICsgXCIgZm9yIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNJZFZhbHVlKGVzY2FwZWRJZCkgJiYgZXNjYXBlZElkLmdlbmVyYXRlZCkge1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlZEtleSA9IGVzY2FwZWRJZC5pZDtcbiAgICAgICAgICAgICAgICBzaG91bGRNZXJnZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5ld1N0b3JlT2JqID0gX19hc3NpZ24kNCh7fSwgc3RvcmVbZGF0YUlkXSwgKF9iID0ge30sIF9iW3N0b3JlRmllbGROYW1lXSA9IHN0b3JlVmFsdWUsIF9iKSk7XG4gICAgaWYgKHNob3VsZE1lcmdlKSB7XG4gICAgICAgIG1lcmdlV2l0aEdlbmVyYXRlZChnZW5lcmF0ZWRLZXksIHN0b3JlVmFsdWUuaWQsIHN0b3JlKTtcbiAgICB9XG4gICAgaWYgKCFzdG9yZVtkYXRhSWRdIHx8IHN0b3JlVmFsdWUgIT09IHN0b3JlW2RhdGFJZF1bc3RvcmVGaWVsZE5hbWVdKSB7XG4gICAgICAgIHN0b3JlW2RhdGFJZF0gPSBuZXdTdG9yZU9iajtcbiAgICB9XG4gICAgdmFyIF9iO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0FycmF5VmFsdWUodmFsdWUsIGdlbmVyYXRlZElkLCBzZWxlY3Rpb25TZXQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZW1EYXRhSWQgPSBnZW5lcmF0ZWRJZCArIFwiLlwiICsgaW5kZXg7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0FycmF5VmFsdWUoaXRlbSwgaXRlbURhdGFJZCwgc2VsZWN0aW9uU2V0LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2VuZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHNlbWFudGljSWQgPSBjb250ZXh0LmRhdGFJZEZyb21PYmplY3QoaXRlbSk7XG4gICAgICAgICAgICBpZiAoc2VtYW50aWNJZCkge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhSWQgPSBzZW1hbnRpY0lkO1xuICAgICAgICAgICAgICAgIGdlbmVyYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdyaXRlU2VsZWN0aW9uU2V0VG9TdG9yZSh7XG4gICAgICAgICAgICBkYXRhSWQ6IGl0ZW1EYXRhSWQsXG4gICAgICAgICAgICByZXN1bHQ6IGl0ZW0sXG4gICAgICAgICAgICBzZWxlY3Rpb25TZXQ6IHNlbGVjdGlvblNldCxcbiAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgaWRTdG9yZVZhbHVlID0ge1xuICAgICAgICAgICAgdHlwZTogJ2lkJyxcbiAgICAgICAgICAgIGlkOiBpdGVtRGF0YUlkLFxuICAgICAgICAgICAgZ2VuZXJhdGVkOiBnZW5lcmF0ZWQsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBpZFN0b3JlVmFsdWU7XG4gICAgfSk7XG59XG5cbnZhciBfX2Fzc2lnbiQ3ID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIG9wdGltaXN0aWNEZWZhdWx0U3RhdGUgPSBbXTtcbmZ1bmN0aW9uIGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoc3RvcmUpIHtcbiAgICBpZiAoc3RvcmUub3B0aW1pc3RpYy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlLmRhdGE7XG4gICAgfVxuICAgIHZhciBwYXRjaGVzID0gc3RvcmUub3B0aW1pc3RpYy5tYXAoZnVuY3Rpb24gKG9wdCkgeyByZXR1cm4gb3B0LmRhdGE7IH0pO1xuICAgIHJldHVybiBhc3NpZ24uYXBwbHkodm9pZCAwLCBbe30sIHN0b3JlLmRhdGFdLmNvbmNhdChwYXRjaGVzKSk7XG59XG5mdW5jdGlvbiBvcHRpbWlzdGljKHByZXZpb3VzU3RhdGUsIGFjdGlvbiwgc3RvcmUsIGNvbmZpZykge1xuICAgIGlmIChwcmV2aW91c1N0YXRlID09PSB2b2lkIDApIHsgcHJldmlvdXNTdGF0ZSA9IG9wdGltaXN0aWNEZWZhdWx0U3RhdGU7IH1cbiAgICBpZiAoaXNNdXRhdGlvbkluaXRBY3Rpb24oYWN0aW9uKSAmJiBhY3Rpb24ub3B0aW1pc3RpY1Jlc3BvbnNlKSB7XG4gICAgICAgIHZhciBmYWtlTXV0YXRpb25SZXN1bHRBY3Rpb24gPSB7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX01VVEFUSU9OX1JFU1VMVCcsXG4gICAgICAgICAgICByZXN1bHQ6IHsgZGF0YTogYWN0aW9uLm9wdGltaXN0aWNSZXNwb25zZSB9LFxuICAgICAgICAgICAgZG9jdW1lbnQ6IGFjdGlvbi5tdXRhdGlvbixcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGFjdGlvbi5vcGVyYXRpb25OYW1lLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgbXV0YXRpb25JZDogYWN0aW9uLm11dGF0aW9uSWQsXG4gICAgICAgICAgICBleHRyYVJlZHVjZXJzOiBhY3Rpb24uZXh0cmFSZWR1Y2VycyxcbiAgICAgICAgICAgIHVwZGF0ZVF1ZXJpZXM6IGFjdGlvbi51cGRhdGVRdWVyaWVzLFxuICAgICAgICAgICAgdXBkYXRlOiBhY3Rpb24udXBkYXRlLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgb3B0aW1pc3RpY0RhdGEgPSBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKF9fYXNzaWduJDcoe30sIHN0b3JlLCB7IG9wdGltaXN0aWM6IHByZXZpb3VzU3RhdGUgfSkpO1xuICAgICAgICB2YXIgcGF0Y2ggPSBnZXRPcHRpbWlzdGljRGF0YVBhdGNoKG9wdGltaXN0aWNEYXRhLCBmYWtlTXV0YXRpb25SZXN1bHRBY3Rpb24sIHN0b3JlLnF1ZXJpZXMsIHN0b3JlLm11dGF0aW9ucywgY29uZmlnKTtcbiAgICAgICAgdmFyIG9wdGltaXN0aWNTdGF0ZSA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogZmFrZU11dGF0aW9uUmVzdWx0QWN0aW9uLFxuICAgICAgICAgICAgZGF0YTogcGF0Y2gsXG4gICAgICAgICAgICBtdXRhdGlvbklkOiBhY3Rpb24ubXV0YXRpb25JZCxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gcHJldmlvdXNTdGF0ZS5jb25jYXQoW29wdGltaXN0aWNTdGF0ZV0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKChpc011dGF0aW9uRXJyb3JBY3Rpb24oYWN0aW9uKSB8fCBpc011dGF0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikpXG4gICAgICAgICYmIHByZXZpb3VzU3RhdGUuc29tZShmdW5jdGlvbiAoY2hhbmdlKSB7IHJldHVybiBjaGFuZ2UubXV0YXRpb25JZCA9PT0gYWN0aW9uLm11dGF0aW9uSWQ7IH0pKSB7XG4gICAgICAgIHJldHVybiByb2xsYmFja09wdGltaXN0aWNEYXRhKGZ1bmN0aW9uIChjaGFuZ2UpIHsgcmV0dXJuIGNoYW5nZS5tdXRhdGlvbklkID09PSBhY3Rpb24ubXV0YXRpb25JZDsgfSwgcHJldmlvdXNTdGF0ZSwgc3RvcmUsIGNvbmZpZyk7XG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xufVxuZnVuY3Rpb24gZ2V0T3B0aW1pc3RpY0RhdGFQYXRjaChwcmV2aW91c0RhdGEsIG9wdGltaXN0aWNBY3Rpb24sIHF1ZXJpZXMsIG11dGF0aW9ucywgY29uZmlnKSB7XG4gICAgdmFyIG9wdGltaXN0aWNEYXRhID0gZGF0YShwcmV2aW91c0RhdGEsIG9wdGltaXN0aWNBY3Rpb24sIHF1ZXJpZXMsIG11dGF0aW9ucywgY29uZmlnKTtcbiAgICB2YXIgcGF0Y2ggPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvcHRpbWlzdGljRGF0YSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChvcHRpbWlzdGljRGF0YVtrZXldICE9PSBwcmV2aW91c0RhdGFba2V5XSkge1xuICAgICAgICAgICAgcGF0Y2hba2V5XSA9IG9wdGltaXN0aWNEYXRhW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGF0Y2g7XG59XG5mdW5jdGlvbiByb2xsYmFja09wdGltaXN0aWNEYXRhKGZpbHRlckZuLCBwcmV2aW91c1N0YXRlLCBzdG9yZSwgY29uZmlnKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0gb3B0aW1pc3RpY0RlZmF1bHRTdGF0ZTsgfVxuICAgIHZhciBvcHRpbWlzdGljRGF0YSA9IGFzc2lnbih7fSwgc3RvcmUuZGF0YSk7XG4gICAgdmFyIG5ld1N0YXRlID0gcHJldmlvdXNTdGF0ZVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiAhZmlsdGVyRm4oaXRlbSk7IH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICB2YXIgcGF0Y2ggPSBnZXRPcHRpbWlzdGljRGF0YVBhdGNoKG9wdGltaXN0aWNEYXRhLCBjaGFuZ2UuYWN0aW9uLCBzdG9yZS5xdWVyaWVzLCBzdG9yZS5tdXRhdGlvbnMsIGNvbmZpZyk7XG4gICAgICAgIGFzc2lnbihvcHRpbWlzdGljRGF0YSwgcGF0Y2gpO1xuICAgICAgICByZXR1cm4gX19hc3NpZ24kNyh7fSwgY2hhbmdlLCB7IGRhdGE6IHBhdGNoIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuZnVuY3Rpb24gaXNFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChhICE9IG51bGwgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIGIgIT0gbnVsbCAmJiB0eXBlb2YgYiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICAgIGlmIChhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNFcXVhbChhW2tleV0sIGJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKCFhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIF9fYXNzaWduJDggPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgSURfS0VZID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2woJ2lkJykgOiAnQEBpZCc7XG5mdW5jdGlvbiByZWFkUXVlcnlGcm9tU3RvcmUob3B0aW9ucykge1xuICAgIHZhciBvcHRzUGF0Y2ggPSB7IHJldHVyblBhcnRpYWxEYXRhOiBmYWxzZSB9O1xuICAgIHJldHVybiBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoX19hc3NpZ24kOCh7fSwgb3B0aW9ucywgb3B0c1BhdGNoKSkucmVzdWx0O1xufVxudmFyIHJlYWRTdG9yZVJlc29sdmVyID0gZnVuY3Rpb24gKGZpZWxkTmFtZSwgaWRWYWx1ZSwgYXJncywgY29udGV4dCwgX2EpIHtcbiAgICB2YXIgcmVzdWx0S2V5ID0gX2EucmVzdWx0S2V5O1xuICAgIGFzc2VydElkVmFsdWUoaWRWYWx1ZSk7XG4gICAgdmFyIG9iaklkID0gaWRWYWx1ZS5pZDtcbiAgICB2YXIgb2JqID0gY29udGV4dC5zdG9yZVtvYmpJZF07XG4gICAgdmFyIHN0b3JlS2V5TmFtZSA9IHN0b3JlS2V5TmFtZUZyb21GaWVsZE5hbWVBbmRBcmdzKGZpZWxkTmFtZSwgYXJncyk7XG4gICAgdmFyIGZpZWxkVmFsdWUgPSAob2JqIHx8IHt9KVtzdG9yZUtleU5hbWVdO1xuICAgIGlmICh0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuY3VzdG9tUmVzb2x2ZXJzICYmIG9iaiAmJiAob2JqLl9fdHlwZW5hbWUgfHwgb2JqSWQgPT09ICdST09UX1FVRVJZJykpIHtcbiAgICAgICAgICAgIHZhciB0eXBlbmFtZSA9IG9iai5fX3R5cGVuYW1lIHx8ICdRdWVyeSc7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNvbnRleHQuY3VzdG9tUmVzb2x2ZXJzW3R5cGVuYW1lXTtcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc29sdmVyID0gdHlwZVtmaWVsZE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZXIob2JqLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250ZXh0LnJldHVyblBhcnRpYWxEYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBmaW5kIGZpZWxkIFwiICsgc3RvcmVLZXlOYW1lICsgXCIgb24gb2JqZWN0IChcIiArIG9iaklkICsgXCIpIFwiICsgSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSArIFwiLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Lmhhc01pc3NpbmdGaWVsZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlO1xuICAgIH1cbiAgICBpZiAoaXNKc29uVmFsdWUoZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgaWYgKGlkVmFsdWUucHJldmlvdXNSZXN1bHQgJiYgaXNFcXVhbChpZFZhbHVlLnByZXZpb3VzUmVzdWx0W3Jlc3VsdEtleV0sIGZpZWxkVmFsdWUuanNvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBpZFZhbHVlLnByZXZpb3VzUmVzdWx0W3Jlc3VsdEtleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUuanNvbjtcbiAgICB9XG4gICAgaWYgKGlkVmFsdWUucHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgZmllbGRWYWx1ZSA9IGFkZFByZXZpb3VzUmVzdWx0VG9JZFZhbHVlcyhmaWVsZFZhbHVlLCBpZFZhbHVlLnByZXZpb3VzUmVzdWx0W3Jlc3VsdEtleV0pO1xuICAgIH1cbiAgICByZXR1cm4gZmllbGRWYWx1ZTtcbn07XG5mdW5jdGlvbiBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoX2EpIHtcbiAgICB2YXIgc3RvcmUgPSBfYS5zdG9yZSwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBwcmV2aW91c1Jlc3VsdCA9IF9hLnByZXZpb3VzUmVzdWx0LCBfYiA9IF9hLnJldHVyblBhcnRpYWxEYXRhLCByZXR1cm5QYXJ0aWFsRGF0YSA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2IsIF9jID0gX2Eucm9vdElkLCByb290SWQgPSBfYyA9PT0gdm9pZCAwID8gJ1JPT1RfUVVFUlknIDogX2MsIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uID0gX2EuZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24sIGNvbmZpZyA9IF9hLmNvbmZpZztcbiAgICB2YXIgcXVlcnlEZWZpbml0aW9uID0gZ2V0UXVlcnlEZWZpbml0aW9uKHF1ZXJ5KTtcbiAgICB2YXJpYWJsZXMgPSBhc3NpZ24oe30sIGdldERlZmF1bHRWYWx1ZXMocXVlcnlEZWZpbml0aW9uKSwgdmFyaWFibGVzKTtcbiAgICB2YXIgY29udGV4dCA9IHtcbiAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogcmV0dXJuUGFydGlhbERhdGEsXG4gICAgICAgIGN1c3RvbVJlc29sdmVyczogKGNvbmZpZyAmJiBjb25maWcuY3VzdG9tUmVzb2x2ZXJzKSB8fCB7fSxcbiAgICAgICAgaGFzTWlzc2luZ0ZpZWxkOiBmYWxzZSxcbiAgICB9O1xuICAgIHZhciByb290SWRWYWx1ZSA9IHtcbiAgICAgICAgdHlwZTogJ2lkJyxcbiAgICAgICAgaWQ6IHJvb3RJZCxcbiAgICAgICAgcHJldmlvdXNSZXN1bHQ6IHByZXZpb3VzUmVzdWx0LFxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IGdyYXBocWxBbnl3aGVyZShyZWFkU3RvcmVSZXNvbHZlciwgcXVlcnksIHJvb3RJZFZhbHVlLCBjb250ZXh0LCB2YXJpYWJsZXMsIHtcbiAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbixcbiAgICAgICAgcmVzdWx0TWFwcGVyOiByZXN1bHRNYXBwZXIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgIGlzTWlzc2luZzogY29udGV4dC5oYXNNaXNzaW5nRmllbGQsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFzc2VydElkVmFsdWUoaWRWYWx1ZSkge1xuICAgIGlmICghaXNJZFZhbHVlKGlkVmFsdWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVuY291bnRlcmVkIGEgc3ViLXNlbGVjdGlvbiBvbiB0aGUgcXVlcnksIGJ1dCB0aGUgc3RvcmUgZG9lc24ndCBoYXZlIGFuIG9iamVjdCByZWZlcmVuY2UuIFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbiBkdXJpbmcgbm9ybWFsIHVzZSB1bmxlc3MgeW91IGhhdmUgY3VzdG9tIGNvZGUgdGhhdCBpcyBkaXJlY3RseSBtYW5pcHVsYXRpbmcgdGhlIHN0b3JlOyBwbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkUHJldmlvdXNSZXN1bHRUb0lkVmFsdWVzKHZhbHVlLCBwcmV2aW91c1Jlc3VsdCkge1xuICAgIGlmIChpc0lkVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbiQ4KHt9LCB2YWx1ZSwgeyBwcmV2aW91c1Jlc3VsdDogcHJldmlvdXNSZXN1bHQgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhciBpZFRvUHJldmlvdXNSZXN1bHRfMSA9IHt9O1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmV2aW91c1Jlc3VsdCkpIHtcbiAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVtJRF9LRVldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkVG9QcmV2aW91c1Jlc3VsdF8xW2l0ZW1bSURfS0VZXV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtUHJldmlvdXNSZXN1bHQgPSBwcmV2aW91c1Jlc3VsdCAmJiBwcmV2aW91c1Jlc3VsdFtpXTtcbiAgICAgICAgICAgIGlmIChpc0lkVmFsdWUoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpdGVtUHJldmlvdXNSZXN1bHQgPSBpZFRvUHJldmlvdXNSZXN1bHRfMVtpdGVtLmlkXSB8fCBpdGVtUHJldmlvdXNSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWRkUHJldmlvdXNSZXN1bHRUb0lkVmFsdWVzKGl0ZW0sIGl0ZW1QcmV2aW91c1Jlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiByZXN1bHRNYXBwZXIocmVzdWx0RmllbGRzLCBpZFZhbHVlKSB7XG4gICAgaWYgKGlkVmFsdWUucHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRSZXN1bHRLZXlzXzEgPSBPYmplY3Qua2V5cyhyZXN1bHRGaWVsZHMpO1xuICAgICAgICB2YXIgc2FtZUFzUHJldmlvdXNSZXN1bHQgPSBPYmplY3Qua2V5cyhpZFZhbHVlLnByZXZpb3VzUmVzdWx0KVxuICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAoc2FtZUtleXMsIGtleSkgeyByZXR1cm4gc2FtZUtleXMgJiYgY3VycmVudFJlc3VsdEtleXNfMS5pbmRleE9mKGtleSkgPiAtMTsgfSwgdHJ1ZSkgJiZcbiAgICAgICAgICAgIGN1cnJlbnRSZXN1bHRLZXlzXzEucmVkdWNlKGZ1bmN0aW9uIChzYW1lLCBrZXkpIHsgcmV0dXJuIChzYW1lICYmIGFyZU5lc3RlZEFycmF5SXRlbXNTdHJpY3RseUVxdWFsKHJlc3VsdEZpZWxkc1trZXldLCBpZFZhbHVlLnByZXZpb3VzUmVzdWx0W2tleV0pKTsgfSwgdHJ1ZSk7XG4gICAgICAgIGlmIChzYW1lQXNQcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkVmFsdWUucHJldmlvdXNSZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3VsdEZpZWxkcywgSURfS0VZLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBpZFZhbHVlLmlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRGaWVsZHM7XG59XG5mdW5jdGlvbiBhcmVOZXN0ZWRBcnJheUl0ZW1zU3RyaWN0bHlFcXVhbChhLCBiKSB7XG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShhKSB8fCAhQXJyYXkuaXNBcnJheShiKSB8fCBhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gYS5yZWR1Y2UoZnVuY3Rpb24gKHNhbWUsIGl0ZW0sIGkpIHsgcmV0dXJuIHNhbWUgJiYgYXJlTmVzdGVkQXJyYXlJdGVtc1N0cmljdGx5RXF1YWwoaXRlbSwgYltpXSk7IH0sIHRydWUpO1xufVxuXG5mdW5jdGlvbiBjbG9uZURlZXAodmFsdWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gY2xvbmVEZWVwKGl0ZW0pOyB9KTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIG5leHRWYWx1ZSA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlW2tleV0gPSBjbG9uZURlZXAodmFsdWVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgVFlQRU5BTUVfRklFTEQgPSB7XG4gICAga2luZDogJ0ZpZWxkJyxcbiAgICBuYW1lOiB7XG4gICAgICAgIGtpbmQ6ICdOYW1lJyxcbiAgICAgICAgdmFsdWU6ICdfX3R5cGVuYW1lJyxcbiAgICB9LFxufTtcbmZ1bmN0aW9uIGFkZFR5cGVuYW1lVG9TZWxlY3Rpb25TZXQoc2VsZWN0aW9uU2V0LCBpc1Jvb3QpIHtcbiAgICBpZiAoaXNSb290ID09PSB2b2lkIDApIHsgaXNSb290ID0gZmFsc2U7IH1cbiAgICBpZiAoc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMpIHtcbiAgICAgICAgaWYgKCFpc1Jvb3QpIHtcbiAgICAgICAgICAgIHZhciBhbHJlYWR5SGFzVGhpc0ZpZWxkID0gc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuc29tZShmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5raW5kID09PSAnRmllbGQnICYmIHNlbGVjdGlvbi5uYW1lLnZhbHVlID09PSAnX190eXBlbmFtZSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghYWxyZWFkeUhhc1RoaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblNldC5zZWxlY3Rpb25zLnB1c2goVFlQRU5BTUVfRklFTEQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGlvblNldC5zZWxlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5raW5kID09PSAnRmllbGQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5uYW1lLnZhbHVlLmxhc3RJbmRleE9mKCdfXycsIDApICE9PSAwICYmIHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzZWxlY3Rpb24ua2luZCA9PT0gJ0lubGluZUZyYWdtZW50Jykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFR5cGVuYW1lVG9TZWxlY3Rpb25TZXQoc2VsZWN0aW9uLnNlbGVjdGlvblNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRUeXBlbmFtZVRvRG9jdW1lbnQoZG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChkb2MpO1xuICAgIHZhciBkb2NDbG9uZSA9IGNsb25lRGVlcChkb2MpO1xuICAgIGRvY0Nsb25lLmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgdmFyIGlzUm9vdCA9IGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nO1xuICAgICAgICBhZGRUeXBlbmFtZVRvU2VsZWN0aW9uU2V0KGRlZmluaXRpb24uc2VsZWN0aW9uU2V0LCBpc1Jvb3QpO1xuICAgIH0pO1xuICAgIHJldHVybiBkb2NDbG9uZTtcbn1cblxudmFyIF9fYXNzaWduJDYgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgUmVkdXhEYXRhUHJveHkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlZHV4RGF0YVByb3h5KHN0b3JlLCByZWR1eFJvb3RTZWxlY3RvciwgZnJhZ21lbnRNYXRjaGVyLCByZWR1Y2VyQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICAgICAgdGhpcy5yZWR1eFJvb3RTZWxlY3RvciA9IHJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB0aGlzLnJlZHVjZXJDb25maWcgPSByZWR1Y2VyQ29uZmlnO1xuICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IGZyYWdtZW50TWF0Y2hlcjtcbiAgICB9XG4gICAgUmVkdXhEYXRhUHJveHkucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRRdWVyeUZyb21TdG9yZSh7XG4gICAgICAgICAgICByb290SWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgIHN0b3JlOiBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKHRoaXMucmVkdXhSb290U2VsZWN0b3IodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKSksXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFJlZHV4RGF0YVByb3h5LnByb3RvdHlwZS5yZWFkRnJhZ21lbnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGlkID0gX2EuaWQsIGZyYWdtZW50ID0gX2EuZnJhZ21lbnQsIGZyYWdtZW50TmFtZSA9IF9hLmZyYWdtZW50TmFtZSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB2YXIgcXVlcnkgPSBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZnJhZ21lbnQsIGZyYWdtZW50TmFtZSk7XG4gICAgICAgIHZhciBkYXRhID0gZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyh0aGlzLnJlZHV4Um9vdFNlbGVjdG9yKHRoaXMuc3RvcmUuZ2V0U3RhdGUoKSkpO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbaWRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgIHN0b3JlOiBkYXRhLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5mcmFnbWVudE1hdGNoZXIubWF0Y2gsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWR1eERhdGFQcm94eS5wcm90b3R5cGUud3JpdGVRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGEsIHF1ZXJ5ID0gX2EucXVlcnksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19XUklURScsXG4gICAgICAgICAgICB3cml0ZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgIHJvb3RJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVkdXhEYXRhUHJveHkucHJvdG90eXBlLndyaXRlRnJhZ21lbnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBfYS5kYXRhLCBpZCA9IF9hLmlkLCBmcmFnbWVudCA9IF9hLmZyYWdtZW50LCBmcmFnbWVudE5hbWUgPSBfYS5mcmFnbWVudE5hbWUsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdmFyIGRvY3VtZW50ID0gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGZyYWdtZW50LCBmcmFnbWVudE5hbWUpO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBkb2N1bWVudCA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChkb2N1bWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1dSSVRFJyxcbiAgICAgICAgICAgIHdyaXRlczogW3tcbiAgICAgICAgICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWR1eERhdGFQcm94eTtcbn0oKSk7XG52YXIgVHJhbnNhY3Rpb25EYXRhUHJveHkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRyYW5zYWN0aW9uRGF0YVByb3h5KGRhdGEsIHJlZHVjZXJDb25maWcpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gX19hc3NpZ24kNih7fSwgZGF0YSk7XG4gICAgICAgIHRoaXMucmVkdWNlckNvbmZpZyA9IHJlZHVjZXJDb25maWc7XG4gICAgICAgIHRoaXMud3JpdGVzID0gW107XG4gICAgICAgIHRoaXMuaXNGaW5pc2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIHZhciB3cml0ZXMgPSB0aGlzLndyaXRlcztcbiAgICAgICAgdGhpcy53cml0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHdyaXRlcztcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS5yZWFkUXVlcnkgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gX2EucXVlcnksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdGhpcy5hc3NlcnROb3RGaW5pc2hlZCgpO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRRdWVyeUZyb21TdG9yZSh7XG4gICAgICAgICAgICByb290SWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMucmVkdWNlckNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLnJlYWRGcmFnbWVudCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgaWQgPSBfYS5pZCwgZnJhZ21lbnQgPSBfYS5mcmFnbWVudCwgZnJhZ21lbnROYW1lID0gX2EuZnJhZ21lbnROYW1lLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RmluaXNoZWQoKTtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIHZhciBxdWVyeSA9IGdldEZyYWdtZW50UXVlcnlEb2N1bWVudChmcmFnbWVudCwgZnJhZ21lbnROYW1lKTtcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFF1ZXJ5RnJvbVN0b3JlKHtcbiAgICAgICAgICAgIHJvb3RJZDogaWQsXG4gICAgICAgICAgICBzdG9yZTogZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5yZWR1Y2VyQ29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUud3JpdGVRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGEsIHF1ZXJ5ID0gX2EucXVlcnksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdGhpcy5hc3NlcnROb3RGaW5pc2hlZCgpO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBseVdyaXRlKHtcbiAgICAgICAgICAgIHJvb3RJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgcmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLndyaXRlRnJhZ21lbnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBfYS5kYXRhLCBpZCA9IF9hLmlkLCBmcmFnbWVudCA9IF9hLmZyYWdtZW50LCBmcmFnbWVudE5hbWUgPSBfYS5mcmFnbWVudE5hbWUsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdGhpcy5hc3NlcnROb3RGaW5pc2hlZCgpO1xuICAgICAgICB2YXIgcXVlcnkgPSBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZnJhZ21lbnQsIGZyYWdtZW50TmFtZSk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGx5V3JpdGUoe1xuICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgIHJlc3VsdDogZGF0YSxcbiAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS5hc3NlcnROb3RGaW5pc2hlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGaW5pc2hlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCB0cmFuc2FjdGlvbiBtZXRob2RzIGFmdGVyIHRoZSB0cmFuc2FjdGlvbiBoYXMgZmluaXNoZWQuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS5hcHBseVdyaXRlID0gZnVuY3Rpb24gKHdyaXRlKSB7XG4gICAgICAgIHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHdyaXRlLnJlc3VsdCxcbiAgICAgICAgICAgIGRhdGFJZDogd3JpdGUucm9vdElkLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHdyaXRlLmRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB3cml0ZS52YXJpYWJsZXMsXG4gICAgICAgICAgICBzdG9yZTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogdGhpcy5yZWR1Y2VyQ29uZmlnLmRhdGFJZEZyb21PYmplY3QgfHwgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH0pLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMucmVkdWNlckNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndyaXRlcy5wdXNoKHdyaXRlKTtcbiAgICB9O1xuICAgIHJldHVybiBUcmFuc2FjdGlvbkRhdGFQcm94eTtcbn0oKSk7XG5cbnZhciBfX2Fzc2lnbiQ5ID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuZnVuY3Rpb24gcmVwbGFjZVF1ZXJ5UmVzdWx0cyhzdGF0ZSwgX2EsIGNvbmZpZykge1xuICAgIHZhciB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIGRvY3VtZW50ID0gX2EuZG9jdW1lbnQsIG5ld1Jlc3VsdCA9IF9hLm5ld1Jlc3VsdDtcbiAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbiQ5KHt9LCBzdGF0ZSk7XG4gICAgcmV0dXJuIHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgIHJlc3VsdDogbmV3UmVzdWx0LFxuICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgc3RvcmU6IGNsb25lZFN0YXRlLFxuICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBfX2Fzc2lnbiQzID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuZnVuY3Rpb24gZGF0YShwcmV2aW91c1N0YXRlLCBhY3Rpb24sIHF1ZXJpZXMsIG11dGF0aW9ucywgY29uZmlnKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0ge307IH1cbiAgICB2YXIgY29uc3RBY3Rpb24gPSBhY3Rpb247XG4gICAgaWYgKGlzUXVlcnlSZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIXF1ZXJpZXNbYWN0aW9uLnF1ZXJ5SWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnJlcXVlc3RJZCA8IHF1ZXJpZXNbYWN0aW9uLnF1ZXJ5SWRdLmxhc3RSZXF1ZXN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKGFjdGlvbi5yZXN1bHQpKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlTdG9yZVZhbHVlID0gcXVlcmllc1thY3Rpb24ucXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbiQzKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIHZhciBuZXdTdGF0ZV8xID0gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGFjdGlvbi5yZXN1bHQuZGF0YSxcbiAgICAgICAgICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogYWN0aW9uLmRvY3VtZW50LFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnlTdG9yZVZhbHVlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBzdG9yZTogY2xvbmVkU3RhdGUsXG4gICAgICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24uZXh0cmFSZWR1Y2Vycykge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5leHRyYVJlZHVjZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlZHVjZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVfMSA9IHJlZHVjZXIobmV3U3RhdGVfMSwgY29uc3RBY3Rpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXzE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdWJzY3JpcHRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIWdyYXBoUUxSZXN1bHRIYXNFcnJvcihhY3Rpb24ucmVzdWx0KSkge1xuICAgICAgICAgICAgdmFyIGNsb25lZFN0YXRlID0gX19hc3NpZ24kMyh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdGVfMiA9IHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBhY3Rpb24ucmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9TVUJTQ1JJUFRJT04nLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjbG9uZWRTdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5leHRyYVJlZHVjZXJzKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4dHJhUmVkdWNlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVkdWNlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8yID0gcmVkdWNlcihuZXdTdGF0ZV8yLCBjb25zdEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVfMjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc011dGF0aW9uUmVzdWx0QWN0aW9uKGNvbnN0QWN0aW9uKSkge1xuICAgICAgICBpZiAoIWNvbnN0QWN0aW9uLnJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSBtdXRhdGlvbnNbY29uc3RBY3Rpb24ubXV0YXRpb25JZF07XG4gICAgICAgICAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbiQzKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIHZhciBuZXdTdGF0ZV8zID0gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGNvbnN0QWN0aW9uLnJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfTVVUQVRJT04nLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBjb25zdEFjdGlvbi5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHF1ZXJ5U3RvcmVWYWx1ZS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgc3RvcmU6IGNsb25lZFN0YXRlLFxuICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgdXBkYXRlUXVlcmllc18xID0gY29uc3RBY3Rpb24udXBkYXRlUXVlcmllcztcbiAgICAgICAgICAgIGlmICh1cGRhdGVRdWVyaWVzXzEpIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh1cGRhdGVRdWVyaWVzXzEpLmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gcXVlcmllc1txdWVyeUlkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGRpZmZRdWVyeUFnYWluc3RTdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZTogcHJldmlvdXNTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeS5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUGFydGlhbERhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICAgICAgICAgICAgICB9KSwgY3VycmVudFF1ZXJ5UmVzdWx0ID0gX2EucmVzdWx0LCBpc01pc3NpbmcgPSBfYS5pc01pc3Npbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc01pc3NpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVkdWNlciA9IHVwZGF0ZVF1ZXJpZXNfMVtxdWVyeUlkXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRRdWVyeVJlc3VsdCA9IHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmdW5jdGlvbiAoKSB7IHJldHVybiByZWR1Y2VyKGN1cnJlbnRRdWVyeVJlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25SZXN1bHQ6IGNvbnN0QWN0aW9uLnJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogZ2V0T3BlcmF0aW9uTmFtZShxdWVyeS5kb2N1bWVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0UXVlcnlSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlXzMgPSB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogbmV4dFF1ZXJ5UmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeS5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9yZTogbmV3U3RhdGVfMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29uc3RBY3Rpb24udXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZV8xID0gY29uc3RBY3Rpb24udXBkYXRlO1xuICAgICAgICAgICAgICAgIHZhciBwcm94eV8xID0gbmV3IFRyYW5zYWN0aW9uRGF0YVByb3h5KG5ld1N0YXRlXzMsIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZV8xKHByb3h5XzEsIGNvbnN0QWN0aW9uLnJlc3VsdCk7IH0pO1xuICAgICAgICAgICAgICAgIHZhciB3cml0ZXMgPSBwcm94eV8xLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlXzMgPSBkYXRhKG5ld1N0YXRlXzMsIHsgdHlwZTogJ0FQT0xMT19XUklURScsIHdyaXRlczogd3JpdGVzIH0sIHF1ZXJpZXMsIG11dGF0aW9ucywgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25zdEFjdGlvbi5leHRyYVJlZHVjZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3RBY3Rpb24uZXh0cmFSZWR1Y2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChyZWR1Y2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlXzMgPSByZWR1Y2VyKG5ld1N0YXRlXzMsIGNvbnN0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZV8zO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVXBkYXRlUXVlcnlSZXN1bHRBY3Rpb24oY29uc3RBY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlUXVlcnlSZXN1bHRzKHByZXZpb3VzU3RhdGUsIGNvbnN0QWN0aW9uLCBjb25maWcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0b3JlUmVzZXRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzV3JpdGVBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gYWN0aW9uLndyaXRlcy5yZWR1Y2UoZnVuY3Rpb24gKGN1cnJlbnRTdGF0ZSwgd3JpdGUpIHsgcmV0dXJuIHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHdyaXRlLnJlc3VsdCxcbiAgICAgICAgICAgIGRhdGFJZDogd3JpdGUucm9vdElkLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHdyaXRlLmRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB3cml0ZS52YXJpYWJsZXMsXG4gICAgICAgICAgICBzdG9yZTogY3VycmVudFN0YXRlLFxuICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7IH0sIF9fYXNzaWduJDMoe30sIHByZXZpb3VzU3RhdGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG59XG5cbihmdW5jdGlvbiAoTmV0d29ya1N0YXR1cykge1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcImxvYWRpbmdcIl0gPSAxXSA9IFwibG9hZGluZ1wiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcInNldFZhcmlhYmxlc1wiXSA9IDJdID0gXCJzZXRWYXJpYWJsZXNcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJmZXRjaE1vcmVcIl0gPSAzXSA9IFwiZmV0Y2hNb3JlXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicmVmZXRjaFwiXSA9IDRdID0gXCJyZWZldGNoXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicG9sbFwiXSA9IDZdID0gXCJwb2xsXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wicmVhZHlcIl0gPSA3XSA9IFwicmVhZHlcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJlcnJvclwiXSA9IDhdID0gXCJlcnJvclwiO1xufSkoZXhwb3J0cy5OZXR3b3JrU3RhdHVzIHx8IChleHBvcnRzLk5ldHdvcmtTdGF0dXMgPSB7fSkpO1xuZnVuY3Rpb24gaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpIHtcbiAgICByZXR1cm4gbmV0d29ya1N0YXR1cyA8IDc7XG59XG5cbnZhciBfX2Fzc2lnbiQxMCA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmZ1bmN0aW9uIHF1ZXJpZXMocHJldmlvdXNTdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0ge307IH1cbiAgICBpZiAoaXNRdWVyeUluaXRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIHZhciBwcmV2aW91c1F1ZXJ5ID0gcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF07XG4gICAgICAgIGlmIChwcmV2aW91c1F1ZXJ5ICYmIHByZXZpb3VzUXVlcnkucXVlcnlTdHJpbmcgIT09IGFjdGlvbi5xdWVyeVN0cmluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnRlcm5hbCBFcnJvcjogbWF5IG5vdCB1cGRhdGUgZXhpc3RpbmcgcXVlcnkgc3RyaW5nIGluIHN0b3JlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzU2V0VmFyaWFibGVzID0gZmFsc2U7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhcmlhYmxlcyA9IG51bGw7XG4gICAgICAgIGlmIChhY3Rpb24uc3RvcmVQcmV2aW91c1ZhcmlhYmxlcyAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeSAmJlxuICAgICAgICAgICAgcHJldmlvdXNRdWVyeS5uZXR3b3JrU3RhdHVzICE9PSBleHBvcnRzLk5ldHdvcmtTdGF0dXMubG9hZGluZykge1xuICAgICAgICAgICAgaWYgKCFpc0VxdWFsKHByZXZpb3VzUXVlcnkudmFyaWFibGVzLCBhY3Rpb24udmFyaWFibGVzKSkge1xuICAgICAgICAgICAgICAgIGlzU2V0VmFyaWFibGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhcmlhYmxlcyA9IHByZXZpb3VzUXVlcnkudmFyaWFibGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOZXR3b3JrU3RhdHVzID0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLmxvYWRpbmc7XG4gICAgICAgIGlmIChpc1NldFZhcmlhYmxlcykge1xuICAgICAgICAgICAgbmV3TmV0d29ya1N0YXR1cyA9IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5zZXRWYXJpYWJsZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmlzUG9sbCkge1xuICAgICAgICAgICAgbmV3TmV0d29ya1N0YXR1cyA9IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5wb2xsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbi5pc1JlZmV0Y2gpIHtcbiAgICAgICAgICAgIG5ld05ldHdvcmtTdGF0dXMgPSBleHBvcnRzLk5ldHdvcmtTdGF0dXMucmVmZXRjaDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uaXNQb2xsKSB7XG4gICAgICAgICAgICBuZXdOZXR3b3JrU3RhdHVzID0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnBvbGw7XG4gICAgICAgIH1cbiAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnF1ZXJ5SWRdID0ge1xuICAgICAgICAgICAgcXVlcnlTdHJpbmc6IGFjdGlvbi5xdWVyeVN0cmluZyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICBwcmV2aW91c1ZhcmlhYmxlczogcHJldmlvdXNWYXJpYWJsZXMsXG4gICAgICAgICAgICBuZXR3b3JrRXJyb3I6IG51bGwsXG4gICAgICAgICAgICBncmFwaFFMRXJyb3JzOiBbXSxcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IG5ld05ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICBsYXN0UmVxdWVzdElkOiBhY3Rpb24ucmVxdWVzdElkLFxuICAgICAgICAgICAgbWV0YWRhdGE6IGFjdGlvbi5tZXRhZGF0YSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSwgeyBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMuZmV0Y2hNb3JlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIGlmICghcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb24ucmVxdWVzdElkIDwgcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF0ubGFzdFJlcXVlc3RJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICB2YXIgcmVzdWx0SGFzR3JhcGhRTEVycm9ycyA9IGdyYXBoUUxSZXN1bHRIYXNFcnJvcihhY3Rpb24ucmVzdWx0KTtcbiAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnF1ZXJ5SWRdID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdLCB7IG5ldHdvcmtFcnJvcjogbnVsbCwgZ3JhcGhRTEVycm9yczogcmVzdWx0SGFzR3JhcGhRTEVycm9ycyA/IGFjdGlvbi5yZXN1bHQuZXJyb3JzIDogW10sIHByZXZpb3VzVmFyaWFibGVzOiBudWxsLCBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMucmVhZHkgfSk7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZF0gPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZF0sIHsgbmV0d29ya1N0YXR1czogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnJlYWR5IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNRdWVyeUVycm9yQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgaWYgKCFwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5yZXF1ZXN0SWQgPCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXS5sYXN0UmVxdWVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IGFjdGlvbi5lcnJvciwgbmV0d29ya1N0YXR1czogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLmVycm9yIH0pO1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWRdID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGVbYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWRdLCB7IG5ldHdvcmtFcnJvcjogYWN0aW9uLmVycm9yLCBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMuZXJyb3IgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1F1ZXJ5UmVzdWx0Q2xpZW50QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgaWYgKCFwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ucXVlcnlJZF0gPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF0sIHsgbmV0d29ya0Vycm9yOiBudWxsLCBwcmV2aW91c1ZhcmlhYmxlczogbnVsbCwgbmV0d29ya1N0YXR1czogYWN0aW9uLmNvbXBsZXRlID8gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnJlYWR5IDogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLmxvYWRpbmcgfSk7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNRdWVyeVN0b3BBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIGRlbGV0ZSBuZXdTdGF0ZVthY3Rpb24ucXVlcnlJZF07XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdG9yZVJlc2V0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHJlc2V0UXVlcnlTdGF0ZShwcmV2aW91c1N0YXRlLCBhY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbn1cbmZ1bmN0aW9uIHJlc2V0UXVlcnlTdGF0ZShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgdmFyIG9ic2VydmFibGVRdWVyeUlkcyA9IGFjdGlvbi5vYnNlcnZhYmxlUXVlcnlJZHM7XG4gICAgdmFyIG5ld1F1ZXJpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHJldHVybiAob2JzZXJ2YWJsZVF1ZXJ5SWRzLmluZGV4T2YocXVlcnlJZCkgPiAtMSk7XG4gICAgfSkucmVkdWNlKGZ1bmN0aW9uIChyZXMsIGtleSkge1xuICAgICAgICByZXNba2V5XSA9IF9fYXNzaWduJDEwKHt9LCBzdGF0ZVtrZXldLCB7IG5ldHdvcmtTdGF0dXM6IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5sb2FkaW5nIH0pO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH0sIHt9KTtcbiAgICByZXR1cm4gbmV3UXVlcmllcztcbn1cblxudmFyIF9fYXNzaWduJDExID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuZnVuY3Rpb24gbXV0YXRpb25zKHByZXZpb3VzU3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChwcmV2aW91c1N0YXRlID09PSB2b2lkIDApIHsgcHJldmlvdXNTdGF0ZSA9IHt9OyB9XG4gICAgaWYgKGlzTXV0YXRpb25Jbml0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24kMTEoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0gPSB7XG4gICAgICAgICAgICBtdXRhdGlvblN0cmluZzogYWN0aW9uLm11dGF0aW9uU3RyaW5nLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMSh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSA9IF9fYXNzaWduJDExKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IG51bGwgfSk7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNNdXRhdGlvbkVycm9yQWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgdmFyIG5ld1N0YXRlID0gX19hc3NpZ24kMTEoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0gPSBfX2Fzc2lnbiQxMSh7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24ubXV0YXRpb25JZF0sIHsgbG9hZGluZzogZmFsc2UsIGVycm9yOiBhY3Rpb24uZXJyb3IgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RvcmVSZXNldEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG59XG5cbnZhciBfX2Fzc2lnbiQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIGNyYXNoUmVwb3J0ZXIgPSBmdW5jdGlvbiAoc3RvcmUpIHsgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7IHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdDYXVnaHQgYW4gZXhjZXB0aW9uIScsIGVycik7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbn07IH07IH07XG52YXIgY3JlYXRlUmVkdWNlckVycm9yID0gZnVuY3Rpb24gKGVycm9yLCBhY3Rpb24pIHtcbiAgICB2YXIgcmVkdWNlckVycm9yID0geyBlcnJvcjogZXJyb3IgfTtcbiAgICBpZiAoaXNRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJlZHVjZXJFcnJvci5xdWVyeUlkID0gYWN0aW9uLnF1ZXJ5SWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3Vic2NyaXB0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmVkdWNlckVycm9yLnN1YnNjcmlwdGlvbklkID0gYWN0aW9uLnN1YnNjcmlwdGlvbklkO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc011dGF0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmVkdWNlckVycm9yLm11dGF0aW9uSWQgPSBhY3Rpb24ubXV0YXRpb25JZDtcbiAgICB9XG4gICAgcmV0dXJuIHJlZHVjZXJFcnJvcjtcbn07XG5mdW5jdGlvbiBjcmVhdGVBcG9sbG9SZWR1Y2VyKGNvbmZpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBhcG9sbG9SZWR1Y2VyKHN0YXRlLCBhY3Rpb24pIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSB2b2lkIDApIHsgc3RhdGUgPSB7fTsgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIG5ld1N0YXRlID0ge1xuICAgICAgICAgICAgICAgIHF1ZXJpZXM6IHF1ZXJpZXMoc3RhdGUucXVlcmllcywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBtdXRhdGlvbnM6IG11dGF0aW9ucyhzdGF0ZS5tdXRhdGlvbnMsIGFjdGlvbiksXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YShzdGF0ZS5kYXRhLCBhY3Rpb24sIHN0YXRlLnF1ZXJpZXMsIHN0YXRlLm11dGF0aW9ucywgY29uZmlnKSxcbiAgICAgICAgICAgICAgICBvcHRpbWlzdGljOiBbXSxcbiAgICAgICAgICAgICAgICByZWR1Y2VyRXJyb3I6IG51bGwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3U3RhdGUub3B0aW1pc3RpYyA9IG9wdGltaXN0aWMoc3RhdGUub3B0aW1pc3RpYywgYWN0aW9uLCBuZXdTdGF0ZSwgY29uZmlnKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5kYXRhID09PSBuZXdTdGF0ZS5kYXRhICYmXG4gICAgICAgICAgICAgICAgc3RhdGUubXV0YXRpb25zID09PSBuZXdTdGF0ZS5tdXRhdGlvbnMgJiZcbiAgICAgICAgICAgICAgICBzdGF0ZS5xdWVyaWVzID09PSBuZXdTdGF0ZS5xdWVyaWVzICYmXG4gICAgICAgICAgICAgICAgc3RhdGUub3B0aW1pc3RpYyA9PT0gbmV3U3RhdGUub3B0aW1pc3RpYyAmJlxuICAgICAgICAgICAgICAgIHN0YXRlLnJlZHVjZXJFcnJvciA9PT0gbmV3U3RhdGUucmVkdWNlckVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChyZWR1Y2VyRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2Fzc2lnbiQyKHt9LCBzdGF0ZSwgeyByZWR1Y2VyRXJyb3I6IGNyZWF0ZVJlZHVjZXJFcnJvcihyZWR1Y2VyRXJyb3IsIGFjdGlvbikgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlQXBvbGxvU3RvcmUoX2EpIHtcbiAgICB2YXIgX2IgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2MgPSBfYi5yZWR1eFJvb3RLZXksIHJlZHV4Um9vdEtleSA9IF9jID09PSB2b2lkIDAgPyAnYXBvbGxvJyA6IF9jLCBpbml0aWFsU3RhdGUgPSBfYi5pbml0aWFsU3RhdGUsIF9kID0gX2IuY29uZmlnLCBjb25maWcgPSBfZCA9PT0gdm9pZCAwID8ge30gOiBfZCwgX2UgPSBfYi5yZXBvcnRDcmFzaGVzLCByZXBvcnRDcmFzaGVzID0gX2UgPT09IHZvaWQgMCA/IHRydWUgOiBfZSwgbG9nZ2VyID0gX2IubG9nZ2VyO1xuICAgIHZhciBlbmhhbmNlcnMgPSBbXTtcbiAgICB2YXIgbWlkZGxld2FyZXMgPSBbXTtcbiAgICBpZiAocmVwb3J0Q3Jhc2hlcykge1xuICAgICAgICBtaWRkbGV3YXJlcy5wdXNoKGNyYXNoUmVwb3J0ZXIpO1xuICAgIH1cbiAgICBpZiAobG9nZ2VyKSB7XG4gICAgICAgIG1pZGRsZXdhcmVzLnB1c2gobG9nZ2VyKTtcbiAgICB9XG4gICAgaWYgKG1pZGRsZXdhcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZW5oYW5jZXJzLnB1c2gocmVkdXguYXBwbHlNaWRkbGV3YXJlLmFwcGx5KHZvaWQgMCwgbWlkZGxld2FyZXMpKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBhbnlXaW5kb3cgPSB3aW5kb3c7XG4gICAgICAgIGlmIChhbnlXaW5kb3cuZGV2VG9vbHNFeHRlbnNpb24pIHtcbiAgICAgICAgICAgIGVuaGFuY2Vycy5wdXNoKGFueVdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbigpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY29tcG9zZSQkMSA9IHJlZHV4LmNvbXBvc2U7XG4gICAgaWYgKGluaXRpYWxTdGF0ZSAmJiBpbml0aWFsU3RhdGVbcmVkdXhSb290S2V5XSAmJiBpbml0aWFsU3RhdGVbcmVkdXhSb290S2V5XVsncXVlcmllcyddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXBvbGxvIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBjb250YWluIHF1ZXJpZXMsIG9ubHkgZGF0YScpO1xuICAgIH1cbiAgICBpZiAoaW5pdGlhbFN0YXRlICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldWydtdXRhdGlvbnMnXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Fwb2xsbyBpbml0aWFsIHN0YXRlIG1heSBub3QgY29udGFpbiBtdXRhdGlvbnMsIG9ubHkgZGF0YScpO1xuICAgIH1cbiAgICByZXR1cm4gcmVkdXguY3JlYXRlU3RvcmUocmVkdXguY29tYmluZVJlZHVjZXJzKChfZiA9IHt9LCBfZltyZWR1eFJvb3RLZXldID0gY3JlYXRlQXBvbGxvUmVkdWNlcihjb25maWcpLCBfZikpLCBpbml0aWFsU3RhdGUsIGNvbXBvc2UkJDEuYXBwbHkodm9pZCAwLCBlbmhhbmNlcnMpKTtcbiAgICB2YXIgX2Y7XG59XG5cbmZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgIHJldHVybiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUgIT09IHVuZGVmaW5lZDtcbn1cbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZXJGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJGdW5jdGlvbiA9IHN1YnNjcmliZXJGdW5jdGlvbjtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGVbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbk9yQ2xlYW51cEZ1bmN0aW9uID0gdGhpcy5zdWJzY3JpYmVyRnVuY3Rpb24ob2JzZXJ2ZXIpO1xuICAgICAgICBpZiAoaXNTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uT3JDbGVhbnVwRnVuY3Rpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uT3JDbGVhbnVwRnVuY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBzdWJzY3JpcHRpb25PckNsZWFudXBGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcblxudmFyIF9fZXh0ZW5kcyQ0ID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5mdW5jdGlvbiBpc0Fwb2xsb0Vycm9yKGVycikge1xuICAgIHJldHVybiBlcnIuaGFzT3duUHJvcGVydHkoJ2dyYXBoUUxFcnJvcnMnKTtcbn1cbnZhciBnZW5lcmF0ZUVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGVyci5ncmFwaFFMRXJyb3JzKSAmJiBlcnIuZ3JhcGhRTEVycm9ycy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgZXJyLmdyYXBoUUxFcnJvcnMuZm9yRWFjaChmdW5jdGlvbiAoZ3JhcGhRTEVycm9yKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ3JhcGhRTEVycm9yID8gZ3JhcGhRTEVycm9yLm1lc3NhZ2UgOiAnRXJyb3IgbWVzc2FnZSBub3QgZm91bmQuJztcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gXCJHcmFwaFFMIGVycm9yOiBcIiArIGVycm9yTWVzc2FnZSArIFwiXFxuXCI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyLm5ldHdvcmtFcnJvcikge1xuICAgICAgICBtZXNzYWdlICs9ICdOZXR3b3JrIGVycm9yOiAnICsgZXJyLm5ldHdvcmtFcnJvci5tZXNzYWdlICsgJ1xcbic7XG4gICAgfVxuICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgcmV0dXJuIG1lc3NhZ2U7XG59O1xudmFyIEFwb2xsb0Vycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkNChBcG9sbG9FcnJvciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBcG9sbG9FcnJvcihfYSkge1xuICAgICAgICB2YXIgZ3JhcGhRTEVycm9ycyA9IF9hLmdyYXBoUUxFcnJvcnMsIG5ldHdvcmtFcnJvciA9IF9hLm5ldHdvcmtFcnJvciwgZXJyb3JNZXNzYWdlID0gX2EuZXJyb3JNZXNzYWdlLCBleHRyYUluZm8gPSBfYS5leHRyYUluZm87XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGVycm9yTWVzc2FnZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZ3JhcGhRTEVycm9ycyA9IGdyYXBoUUxFcnJvcnMgfHwgW107XG4gICAgICAgIF90aGlzLm5ldHdvcmtFcnJvciA9IG5ldHdvcmtFcnJvciB8fCBudWxsO1xuICAgICAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9IGdlbmVyYXRlRXJyb3JNZXNzYWdlKF90aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLm1lc3NhZ2UgPSBlcnJvck1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuZXh0cmFJbmZvID0gZXh0cmFJbmZvO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBBcG9sbG9FcnJvcjtcbn0oRXJyb3IpKTtcblxudmFyIEZldGNoVHlwZTtcbihmdW5jdGlvbiAoRmV0Y2hUeXBlKSB7XG4gICAgRmV0Y2hUeXBlW0ZldGNoVHlwZVtcIm5vcm1hbFwiXSA9IDFdID0gXCJub3JtYWxcIjtcbiAgICBGZXRjaFR5cGVbRmV0Y2hUeXBlW1wicmVmZXRjaFwiXSA9IDJdID0gXCJyZWZldGNoXCI7XG4gICAgRmV0Y2hUeXBlW0ZldGNoVHlwZVtcInBvbGxcIl0gPSAzXSA9IFwicG9sbFwiO1xufSkoRmV0Y2hUeXBlIHx8IChGZXRjaFR5cGUgPSB7fSkpO1xuXG5mdW5jdGlvbiBkZWVwRnJlZXplKG8pIHtcbiAgICBPYmplY3QuZnJlZXplKG8pO1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG8pLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkocHJvcClcbiAgICAgICAgICAgICYmIG9bcHJvcF0gIT09IG51bGxcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb1twcm9wXSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9bcHJvcF0gPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAmJiAhT2JqZWN0LmlzRnJvemVuKG9bcHJvcF0pKSB7XG4gICAgICAgICAgICBkZWVwRnJlZXplKG9bcHJvcF0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG87XG59XG5mdW5jdGlvbiBtYXliZURlZXBGcmVlemUob2JqKSB7XG4gICAgaWYgKGlzRGV2ZWxvcG1lbnQoKSB8fCBpc1Rlc3QoKSkge1xuICAgICAgICByZXR1cm4gZGVlcEZyZWV6ZShvYmopO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuXG52YXIgX19leHRlbmRzJDMgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2Fzc2lnbiQxMiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBPYnNlcnZhYmxlUXVlcnkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQzKE9ic2VydmFibGVRdWVyeSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlUXVlcnkoX2EpIHtcbiAgICAgICAgdmFyIHNjaGVkdWxlciA9IF9hLnNjaGVkdWxlciwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIF9iID0gX2Euc2hvdWxkU3Vic2NyaWJlLCBzaG91bGRTdWJzY3JpYmUgPSBfYiA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9iO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnlNYW5hZ2VyID0gc2NoZWR1bGVyLnF1ZXJ5TWFuYWdlcjtcbiAgICAgICAgdmFyIHF1ZXJ5SWQgPSBxdWVyeU1hbmFnZXIuZ2VuZXJhdGVRdWVyeUlkKCk7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyRnVuY3Rpb24gPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5vblN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc3Vic2NyaWJlckZ1bmN0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIF90aGlzLnZhcmlhYmxlcyA9IF90aGlzLm9wdGlvbnMudmFyaWFibGVzIHx8IHt9O1xuICAgICAgICBfdGhpcy5zY2hlZHVsZXIgPSBzY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLnF1ZXJ5TWFuYWdlciA9IHF1ZXJ5TWFuYWdlcjtcbiAgICAgICAgX3RoaXMucXVlcnlJZCA9IHF1ZXJ5SWQ7XG4gICAgICAgIF90aGlzLnNob3VsZFN1YnNjcmliZSA9IHNob3VsZFN1YnNjcmliZTtcbiAgICAgICAgX3RoaXMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIF90aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RlZE9ic2VydmVycyA9IHRoYXQub2JzZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbiAob2JzKSB7IHJldHVybiBvYnMgIT09IG9ic2VydmVyOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkT2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5xdWVyeU1hbmFnZXIucmVtb3ZlUXVlcnkodGhhdC5xdWVyeUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoYXQuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLmN1cnJlbnRSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMucXVlcnlNYW5hZ2VyLmdldEN1cnJlbnRRdWVyeVJlc3VsdCh0aGlzLCB0cnVlKSwgZGF0YSA9IF9hLmRhdGEsIHBhcnRpYWwgPSBfYS5wYXJ0aWFsO1xuICAgICAgICB2YXIgcXVlcnlTdG9yZVZhbHVlID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0QXBvbGxvU3RhdGUoKS5xdWVyaWVzW3RoaXMucXVlcnlJZF07XG4gICAgICAgIGlmIChxdWVyeVN0b3JlVmFsdWUgJiYgKChxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycyAmJiBxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtFcnJvcikpIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnMsXG4gICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBxdWVyeVN0b3JlVmFsdWUubmV0d29ya0Vycm9yLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyBkYXRhOiB7fSwgbG9hZGluZzogZmFsc2UsIG5ldHdvcmtTdGF0dXM6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzLCBlcnJvcjogZXJyb3IgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcXVlcnlMb2FkaW5nID0gIXF1ZXJ5U3RvcmVWYWx1ZSB8fCBxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyA9PT0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLmxvYWRpbmc7XG4gICAgICAgIHZhciBsb2FkaW5nID0gKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScgJiYgcXVlcnlMb2FkaW5nKVxuICAgICAgICAgICAgfHwgKHBhcnRpYWwgJiYgdGhpcy5vcHRpb25zLmZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScpO1xuICAgICAgICB2YXIgbmV0d29ya1N0YXR1cztcbiAgICAgICAgaWYgKHF1ZXJ5U3RvcmVWYWx1ZSkge1xuICAgICAgICAgICAgbmV0d29ya1N0YXR1cyA9IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmV0d29ya1N0YXR1cyA9IGxvYWRpbmcgPyBleHBvcnRzLk5ldHdvcmtTdGF0dXMubG9hZGluZyA6IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5yZWFkeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIGxvYWRpbmc6IGlzTmV0d29ya1JlcXVlc3RJbkZsaWdodChuZXR3b3JrU3RhdHVzKSxcbiAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IG5ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICBwYXJ0aWFsOiBwYXJ0aWFsLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5nZXRMYXN0UmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXN0UmVzdWx0O1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5yZWZldGNoID0gZnVuY3Rpb24gKHZhcmlhYmxlcykge1xuICAgICAgICB0aGlzLnZhcmlhYmxlcyA9IF9fYXNzaWduJDEyKHt9LCB0aGlzLnZhcmlhYmxlcywgdmFyaWFibGVzKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdjYWNoZS1vbmx5IGZldGNoUG9saWN5IG9wdGlvbiBzaG91bGQgbm90IGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBxdWVyeSByZWZldGNoLicpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMudmFyaWFibGVzID0gX19hc3NpZ24kMTIoe30sIHRoaXMub3B0aW9ucy52YXJpYWJsZXMsIHRoaXMudmFyaWFibGVzKTtcbiAgICAgICAgdmFyIGNvbWJpbmVkT3B0aW9ucyA9IF9fYXNzaWduJDEyKHt9LCB0aGlzLm9wdGlvbnMsIHsgZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeSh0aGlzLnF1ZXJ5SWQsIGNvbWJpbmVkT3B0aW9ucywgRmV0Y2hUeXBlLnJlZmV0Y2gpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBtYXliZURlZXBGcmVlemUocmVzdWx0KTsgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLmZldGNoTW9yZSA9IGZ1bmN0aW9uIChmZXRjaE1vcmVPcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghZmV0Y2hNb3JlT3B0aW9ucy51cGRhdGVRdWVyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1cGRhdGVRdWVyeSBvcHRpb24gaXMgcmVxdWlyZWQuIFRoaXMgZnVuY3Rpb24gZGVmaW5lcyBob3cgdG8gdXBkYXRlIHRoZSBxdWVyeSBkYXRhIHdpdGggdGhlIG5ldyByZXN1bHRzLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHFpZCA9IF90aGlzLnF1ZXJ5TWFuYWdlci5nZW5lcmF0ZVF1ZXJ5SWQoKTtcbiAgICAgICAgICAgIHZhciBjb21iaW5lZE9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGZldGNoTW9yZU9wdGlvbnMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICBjb21iaW5lZE9wdGlvbnMgPSBmZXRjaE1vcmVPcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlcyA9IF9fYXNzaWduJDEyKHt9LCBfdGhpcy52YXJpYWJsZXMsIGZldGNoTW9yZU9wdGlvbnMudmFyaWFibGVzKTtcbiAgICAgICAgICAgICAgICBjb21iaW5lZE9wdGlvbnMgPSBfX2Fzc2lnbiQxMih7fSwgX3RoaXMub3B0aW9ucywgZmV0Y2hNb3JlT3B0aW9ucywgeyB2YXJpYWJsZXM6IHZhcmlhYmxlcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbWJpbmVkT3B0aW9ucyA9IF9fYXNzaWduJDEyKHt9LCBjb21iaW5lZE9wdGlvbnMsIHsgcXVlcnk6IGNvbWJpbmVkT3B0aW9ucy5xdWVyeSwgZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknIH0pO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnF1ZXJ5TWFuYWdlci5mZXRjaFF1ZXJ5KHFpZCwgY29tYmluZWRPcHRpb25zLCBGZXRjaFR5cGUubm9ybWFsLCBfdGhpcy5xdWVyeUlkKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChmZXRjaE1vcmVSZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gZmV0Y2hNb3JlUmVzdWx0LmRhdGE7XG4gICAgICAgICAgICB2YXIgcmVkdWNlciA9IGZldGNoTW9yZU9wdGlvbnMudXBkYXRlUXVlcnk7XG4gICAgICAgICAgICB2YXIgbWFwRm4gPSBmdW5jdGlvbiAocHJldmlvdXNSZXN1bHQsIF9hKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICB2YXIgcXVlcnlWYXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZHVjZXIocHJldmlvdXNSZXN1bHQsIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hNb3JlUmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVZhcmlhYmxlczogcXVlcnlWYXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlUXVlcnkobWFwRm4pO1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoTW9yZVJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnN1YnNjcmliZVRvTW9yZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy5xdWVyeU1hbmFnZXIuc3RhcnRHcmFwaFFMU3Vic2NyaXB0aW9uKHtcbiAgICAgICAgICAgIHF1ZXJ5OiBvcHRpb25zLmRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBvcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnVwZGF0ZVF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWR1Y2VyXzEgPSBvcHRpb25zLnVwZGF0ZVF1ZXJ5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFwRm4gPSBmdW5jdGlvbiAocHJldmlvdXNSZXN1bHQsIF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZHVjZXJfMShwcmV2aW91c1Jlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbkRhdGE6IHsgZGF0YTogZGF0YSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnVwZGF0ZVF1ZXJ5KG1hcEZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5vbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIEdyYXBoUUwgc3Vic2NyaXB0aW9uIGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpID0gX3RoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICB2YXIgb2xkT3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgdGhpcy5vcHRpb25zID0gX19hc3NpZ24kMTIoe30sIHRoaXMub3B0aW9ucywgb3B0cyk7XG4gICAgICAgIGlmIChvcHRzLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydFBvbGxpbmcob3B0cy5wb2xsSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMucG9sbEludGVydmFsID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BQb2xsaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyeUZldGNoID0gKG9sZE9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICduZXR3b3JrLW9ubHknICYmIG9wdHMuZmV0Y2hQb2xpY3kgPT09ICduZXR3b3JrLW9ubHknKVxuICAgICAgICAgICAgfHwgKG9sZE9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JyAmJiBvcHRzLmZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScpXG4gICAgICAgICAgICB8fCAob2xkT3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ3N0YW5kYnknICYmIG9wdHMuZmV0Y2hQb2xpY3kgIT09ICdzdGFuZGJ5JylcbiAgICAgICAgICAgIHx8IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRWYXJpYWJsZXModGhpcy5vcHRpb25zLnZhcmlhYmxlcywgdHJ5RmV0Y2gpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5zZXRWYXJpYWJsZXMgPSBmdW5jdGlvbiAodmFyaWFibGVzLCB0cnlGZXRjaCkge1xuICAgICAgICBpZiAodHJ5RmV0Y2ggPT09IHZvaWQgMCkgeyB0cnlGZXRjaCA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBuZXdWYXJpYWJsZXMgPSBfX2Fzc2lnbiQxMih7fSwgdGhpcy52YXJpYWJsZXMsIHZhcmlhYmxlcyk7XG4gICAgICAgIGlmIChpc0VxdWFsKG5ld1ZhcmlhYmxlcywgdGhpcy52YXJpYWJsZXMpICYmICF0cnlGZXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gcmVzb2x2ZSgpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YXJpYWJsZXMgPSBuZXdWYXJpYWJsZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXNvbHZlKCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyLmZldGNoUXVlcnkodGhpcy5xdWVyeUlkLCBfX2Fzc2lnbiQxMih7fSwgdGhpcy5vcHRpb25zLCB7IHZhcmlhYmxlczogdGhpcy52YXJpYWJsZXMgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkgeyByZXR1cm4gbWF5YmVEZWVwRnJlZXplKHJlc3VsdCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnVwZGF0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG1hcEZuKSB7XG4gICAgICAgIHZhciBfYSA9IHRoaXMucXVlcnlNYW5hZ2VyLmdldFF1ZXJ5V2l0aFByZXZpb3VzUmVzdWx0KHRoaXMucXVlcnlJZCksIHByZXZpb3VzUmVzdWx0ID0gX2EucHJldmlvdXNSZXN1bHQsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIG5ld1Jlc3VsdCA9IHRyeUZ1bmN0aW9uT3JMb2dFcnJvcihmdW5jdGlvbiAoKSB7IHJldHVybiBtYXBGbihwcmV2aW91c1Jlc3VsdCwgeyB2YXJpYWJsZXM6IHZhcmlhYmxlcyB9KTsgfSk7XG4gICAgICAgIGlmIChuZXdSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX1VQREFURV9RVUVSWV9SRVNVTFQnLFxuICAgICAgICAgICAgICAgIG5ld1Jlc3VsdDogbmV3UmVzdWx0LFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnN0b3BQb2xsaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0N1cnJlbnRseVBvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVyLnN0b3BQb2xsaW5nUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb2xsSW50ZXJ2YWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnN0YXJ0UG9sbGluZyA9IGZ1bmN0aW9uIChwb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWZpcnN0JyB8fCAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1ZXJpZXMgdGhhdCBzcGVjaWZ5IHRoZSBjYWNoZS1maXJzdCBhbmQgY2FjaGUtb25seSBmZXRjaFBvbGljaWVzIGNhbm5vdCBhbHNvIGJlIHBvbGxpbmcgcXVlcmllcy4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0N1cnJlbnRseVBvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVyLnN0b3BQb2xsaW5nUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50bHlQb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCA9IHBvbGxJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlci5zdGFydFBvbGxpbmdRdWVyeSh0aGlzLm9wdGlvbnMsIHRoaXMucXVlcnlJZCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLm9uU3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCAmJiB0aGlzLmxhc3RSZXN1bHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodGhpcy5sYXN0UmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IgJiYgdGhpcy5sYXN0RXJyb3IpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKHRoaXMubGFzdEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldFVwUXVlcnkoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0UXVlcnlTdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMub2JzZXJ2ZXJzLnNvbWUoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA9PT0gb2JzZXJ2ZXI7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzID0gX3RoaXMub2JzZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbiAob2JzKSB7IHJldHVybiBvYnMgIT09IG9ic2VydmVyOyB9KTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMub2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy50ZWFyRG93blF1ZXJ5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJldFF1ZXJ5U3Vic2NyaXB0aW9uO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS5zZXRVcFF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5zaG91bGRTdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLmFkZE9ic2VydmFibGVRdWVyeSh0aGlzLnF1ZXJ5SWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghIXRoaXMub3B0aW9ucy5wb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1maXJzdCcgfHwgKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUXVlcmllcyB0aGF0IHNwZWNpZnkgdGhlIGNhY2hlLWZpcnN0IGFuZCBjYWNoZS1vbmx5IGZldGNoUG9saWNpZXMgY2Fubm90IGFsc28gYmUgcG9sbGluZyBxdWVyaWVzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RhcnRQb2xsaW5nUXVlcnkodGhpcy5vcHRpb25zLCB0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvYnNlcnZlciA9IHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5sYXN0UmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIF90aGlzLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9icy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnMubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIF90aGlzLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9icy5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBlcnJvcicsIGVycm9yLm1lc3NhZ2UsIGVycm9yLnN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLmxhc3RFcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuc3RhcnRRdWVyeSh0aGlzLnF1ZXJ5SWQsIHRoaXMub3B0aW9ucywgdGhpcy5xdWVyeU1hbmFnZXIucXVlcnlMaXN0ZW5lckZvck9ic2VydmVyKHRoaXMucXVlcnlJZCwgdGhpcy5vcHRpb25zLCBvYnNlcnZlcikpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVF1ZXJ5LnByb3RvdHlwZS50ZWFyRG93blF1ZXJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0N1cnJlbnRseVBvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVyLnN0b3BQb2xsaW5nUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50bHlQb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLmZvckVhY2goZnVuY3Rpb24gKHN1YikgeyByZXR1cm4gc3ViLnVuc3Vic2NyaWJlKCk7IH0pO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuc3RvcFF1ZXJ5KHRoaXMucXVlcnlJZCk7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIucmVtb3ZlT2JzZXJ2YWJsZVF1ZXJ5KHRoaXMucXVlcnlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlUXVlcnk7XG59KE9ic2VydmFibGUpKTtcblxudmFyIGhhdmVXYXJuZWQkMSA9IE9iamVjdC5jcmVhdGUoe30pO1xuZnVuY3Rpb24gd2Fybk9uY2VJbkRldmVsb3BtZW50KG1zZywgdHlwZSkge1xuICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9ICd3YXJuJzsgfVxuICAgIGlmIChpc1Byb2R1Y3Rpb24oKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghaGF2ZVdhcm5lZCQxW21zZ10pIHtcbiAgICAgICAgaWYgKCFpc1Rlc3QoKSkge1xuICAgICAgICAgICAgaGF2ZVdhcm5lZCQxW21zZ10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5pbnRyb3NwZWN0aW9uUXVlcnlSZXN1bHREYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnBvc3NpYmxlVHlwZXNNYXAgPSB0aGlzLnBhcnNlSW50cm9zcGVjdGlvblJlc3VsdChvcHRpb25zLmludHJvc3BlY3Rpb25RdWVyeVJlc3VsdERhdGEpO1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF0Y2ggPSB0aGlzLm1hdGNoLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKGlkVmFsdWUsIHR5cGVDb25kaXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRnJhZ21lbnRNYXRjaGVyLm1hdGNoKCkgd2FzIGNhbGxlZCBiZWZvcmUgRnJhZ21lbnRNYXRjaGVyLmluaXQoKScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvYmogPSBjb250ZXh0LnN0b3JlW2lkVmFsdWUuaWRdO1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBtYXRjaCBmcmFnbWVudCBiZWNhdXNlIF9fdHlwZW5hbWUgcHJvcGVydHkgaXMgbWlzc2luZzogXCIgKyBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqLl9fdHlwZW5hbWUgPT09IHR5cGVDb25kaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbXBsZW1lbnRpbmdUeXBlcyA9IHRoaXMucG9zc2libGVUeXBlc01hcFt0eXBlQ29uZGl0aW9uXTtcbiAgICAgICAgaWYgKGltcGxlbWVudGluZ1R5cGVzICYmIGltcGxlbWVudGluZ1R5cGVzLmluZGV4T2Yob2JqLl9fdHlwZW5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLnBhcnNlSW50cm9zcGVjdGlvblJlc3VsdCA9IGZ1bmN0aW9uIChpbnRyb3NwZWN0aW9uUmVzdWx0RGF0YSkge1xuICAgICAgICB2YXIgdHlwZU1hcCA9IHt9O1xuICAgICAgICBpbnRyb3NwZWN0aW9uUmVzdWx0RGF0YS5fX3NjaGVtYS50eXBlcy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICBpZiAodHlwZS5raW5kID09PSAnVU5JT04nIHx8IHR5cGUua2luZCA9PT0gJ0lOVEVSRkFDRScpIHtcbiAgICAgICAgICAgICAgICB0eXBlTWFwW3R5cGUubmFtZV0gPSB0eXBlLnBvc3NpYmxlVHlwZXMubWFwKGZ1bmN0aW9uIChpbXBsZW1lbnRpbmdUeXBlKSB7IHJldHVybiBpbXBsZW1lbnRpbmdUeXBlLm5hbWU7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGVNYXA7XG4gICAgfTtcbiAgICByZXR1cm4gSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlcjtcbn0oKSk7XG52YXIgaGF2ZVdhcm5lZCA9IGZhbHNlO1xudmFyIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyKCkge1xuICAgIH1cbiAgICBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLmVuc3VyZVJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLmNhbkJ5cGFzc0luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIChpZFZhbHVlLCB0eXBlQ29uZGl0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBvYmogPSBjb250ZXh0LnN0b3JlW2lkVmFsdWUuaWRdO1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqLl9fdHlwZW5hbWUpIHtcbiAgICAgICAgICAgIGlmICghaGF2ZVdhcm5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIllvdSdyZSB1c2luZyBmcmFnbWVudHMgaW4geW91ciBxdWVyaWVzLCBidXQgZWl0aGVyIGRvbid0IGhhdmUgdGhlIGFkZFR5cGVuYW1lOlxcbiAgdHJ1ZSBvcHRpb24gc2V0IGluIEFwb2xsbyBDbGllbnQsIG9yIHlvdSBhcmUgdHJ5aW5nIHRvIHdyaXRlIGEgZnJhZ21lbnQgdG8gdGhlIHN0b3JlIHdpdGhvdXQgdGhlIF9fdHlwZW5hbWUuXFxuICAgUGxlYXNlIHR1cm4gb24gdGhlIGFkZFR5cGVuYW1lIG9wdGlvbiBhbmQgaW5jbHVkZSBfX3R5cGVuYW1lIHdoZW4gd3JpdGluZyBmcmFnbWVudHMgc28gdGhhdCBBcG9sbG8gQ2xpZW50XFxuICAgY2FuIGFjY3VyYXRlbHkgbWF0Y2ggZnJhZ21lbnRzLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBmaW5kIF9fdHlwZW5hbWUgb24gRnJhZ21lbnQgJywgdHlwZUNvbmRpdGlvbiwgb2JqKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJERVBSRUNBVElPTiBXQVJOSU5HOiB1c2luZyBmcmFnbWVudHMgd2l0aG91dCBfX3R5cGVuYW1lIGlzIHVuc3VwcG9ydGVkIGJlaGF2aW9yIFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBBcG9sbG8gY2xpZW50LiBZb3Ugc2hvdWxkIGZpeCB0aGlzIGFuZCBzZXQgYWRkVHlwZW5hbWUgdG8gdHJ1ZSBub3cuXCIpO1xuICAgICAgICAgICAgICAgIGlmICghaXNUZXN0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGF2ZVdhcm5lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5yZXR1cm5QYXJ0aWFsRGF0YSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqLl9fdHlwZW5hbWUgPT09IHR5cGVDb25kaXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdhcm5PbmNlSW5EZXZlbG9wbWVudChcIllvdSBhcmUgdXNpbmcgdGhlIHNpbXBsZSAoaGV1cmlzdGljKSBmcmFnbWVudCBtYXRjaGVyLCBidXQgeW91ciBxdWVyaWVzIGNvbnRhaW4gdW5pb24gb3IgaW50ZXJmYWNlIHR5cGVzLlxcbiAgICAgQXBvbGxvIENsaWVudCB3aWxsIG5vdCBiZSBhYmxlIHRvIGFibGUgdG8gYWNjdXJhdGVseSBtYXAgZnJhZ21lbnRzLlwiICtcbiAgICAgICAgICAgIFwiVG8gbWFrZSB0aGlzIGVycm9yIGdvIGF3YXksIHVzZSB0aGUgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlciBhcyBkZXNjcmliZWQgaW4gdGhlIGRvY3M6IFwiICtcbiAgICAgICAgICAgIFwiaHR0cDovL2Rldi5hcG9sbG9kYXRhLmNvbS9yZWFjdC9pbml0aWFsaXphdGlvbi5odG1sI2ZyYWdtZW50LW1hdGNoZXJcIiwgJ2Vycm9yJyk7XG4gICAgICAgIGNvbnRleHQucmV0dXJuUGFydGlhbERhdGEgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXI7XG59KCkpO1xuXG52YXIgRGVkdXBsaWNhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWR1cGxpY2F0b3IobmV0d29ya0ludGVyZmFjZSkge1xuICAgICAgICB0aGlzLm5ldHdvcmtJbnRlcmZhY2UgPSBuZXR3b3JrSW50ZXJmYWNlO1xuICAgICAgICB0aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzID0ge307XG4gICAgfVxuICAgIERlZHVwbGljYXRvci5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCwgZGVkdXBsaWNhdGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGRlZHVwbGljYXRlID09PSB2b2lkIDApIHsgZGVkdXBsaWNhdGUgPSB0cnVlOyB9XG4gICAgICAgIGlmICghZGVkdXBsaWNhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5ldHdvcmtJbnRlcmZhY2UucXVlcnkocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleSA9IHRoaXMuZ2V0S2V5KHJlcXVlc3QpO1xuICAgICAgICBpZiAoIXRoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXNba2V5XSkge1xuICAgICAgICAgICAgdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlc1trZXldID0gdGhpcy5uZXR3b3JrSW50ZXJmYWNlLnF1ZXJ5KHJlcXVlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzW2tleV1cbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlc1trZXldO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBkZWxldGUgX3RoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXNba2V5XTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBEZWR1cGxpY2F0b3IucHJvdG90eXBlLmdldEtleSA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBncmFwaHFsX2xhbmd1YWdlX3ByaW50ZXIucHJpbnQocmVxdWVzdC5xdWVyeSkgKyBcInxcIiArIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudmFyaWFibGVzKSArIFwifFwiICsgcmVxdWVzdC5vcGVyYXRpb25OYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIERlZHVwbGljYXRvcjtcbn0oKSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlUmVkdWNlcihyZXN1bHRSZWR1Y2VyLCBkb2N1bWVudCwgdmFyaWFibGVzLCBjb25maWcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlLCBhY3Rpb24pIHtcbiAgICAgICAgdmFyIF9hID0gZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKHtcbiAgICAgICAgICAgIHN0b3JlOiBzdG9yZSxcbiAgICAgICAgICAgIHF1ZXJ5OiBkb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgcmV0dXJuUGFydGlhbERhdGE6IHRydWUsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICB9KSwgcmVzdWx0ID0gX2EucmVzdWx0LCBpc01pc3NpbmcgPSBfYS5pc01pc3Npbmc7XG4gICAgICAgIGlmIChpc01pc3NpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV4dFJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5leHRSZXN1bHQgPSByZXN1bHRSZWR1Y2VyKHJlc3VsdCwgYWN0aW9uLCB2YXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5oYW5kbGVkIGVycm9yIGluIHJlc3VsdCByZWR1Y2VyJywgZXJyKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0ICE9PSBuZXh0UmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IG5leHRSZXN1bHQsXG4gICAgICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9O1xufVxuXG52YXIgX19hc3NpZ24kMTUgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgUXVlcnlTY2hlZHVsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5U2NoZWR1bGVyKF9hKSB7XG4gICAgICAgIHZhciBxdWVyeU1hbmFnZXIgPSBfYS5xdWVyeU1hbmFnZXI7XG4gICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyID0gcXVlcnlNYW5hZ2VyO1xuICAgICAgICB0aGlzLnBvbGxpbmdUaW1lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5pbkZsaWdodFF1ZXJpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcmVkUXVlcmllcyA9IHt9O1xuICAgICAgICB0aGlzLmludGVydmFsUXVlcmllcyA9IHt9O1xuICAgIH1cbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuY2hlY2tJbkZsaWdodCA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHZhciBxdWVyaWVzID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0QXBvbGxvU3RhdGUoKS5xdWVyaWVzO1xuICAgICAgICByZXR1cm4gcXVlcmllc1txdWVyeUlkXSAmJiBxdWVyaWVzW3F1ZXJ5SWRdLm5ldHdvcmtTdGF0dXMgIT09IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5yZWFkeTtcbiAgICB9O1xuICAgIFF1ZXJ5U2NoZWR1bGVyLnByb3RvdHlwZS5mZXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9wdGlvbnMsIGZldGNoVHlwZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyLmZldGNoUXVlcnkocXVlcnlJZCwgb3B0aW9ucywgZmV0Y2hUeXBlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLnN0YXJ0UG9sbGluZ1F1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHF1ZXJ5SWQsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5wb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHN0YXJ0IGEgcG9sbGluZyBxdWVyeSB3aXRob3V0IGEgcG9sbGluZyBpbnRlcnZhbC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRRdWVyaWVzW3F1ZXJ5SWRdID0gb3B0aW9ucztcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5hZGRRdWVyeUxpc3RlbmVyKHF1ZXJ5SWQsIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFF1ZXJ5T25JbnRlcnZhbChxdWVyeUlkLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5SWQ7XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuc3RvcFBvbGxpbmdRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJlZ2lzdGVyZWRRdWVyaWVzW3F1ZXJ5SWRdO1xuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmZldGNoUXVlcmllc09uSW50ZXJ2YWwgPSBmdW5jdGlvbiAoaW50ZXJ2YWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdID0gdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdLmZpbHRlcihmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5yZWdpc3RlcmVkUXVlcmllcy5oYXNPd25Qcm9wZXJ0eShxdWVyeUlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5jaGVja0luRmxpZ2h0KHF1ZXJ5SWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0gX3RoaXMucmVnaXN0ZXJlZFF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgcG9sbGluZ09wdGlvbnMgPSBfX2Fzc2lnbiQxNSh7fSwgcXVlcnlPcHRpb25zKTtcbiAgICAgICAgICAgIHBvbGxpbmdPcHRpb25zLmZldGNoUG9saWN5ID0gJ25ldHdvcmstb25seSc7XG4gICAgICAgICAgICBfdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIHBvbGxpbmdPcHRpb25zLCBGZXRjaFR5cGUucG9sbCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucG9sbGluZ1RpbWVyc1tpbnRlcnZhbF0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWxRdWVyaWVzW2ludGVydmFsXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmFkZFF1ZXJ5T25JbnRlcnZhbCA9IGZ1bmN0aW9uIChxdWVyeUlkLCBxdWVyeU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGludGVydmFsID0gcXVlcnlPcHRpb25zLnBvbGxJbnRlcnZhbDtcbiAgICAgICAgaWYgKCFpbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQSBwb2xsIGludGVydmFsIGlzIHJlcXVpcmVkIHRvIHN0YXJ0IHBvbGxpbmcgcXVlcnkgd2l0aCBpZCAnXCIgKyBxdWVyeUlkICsgXCInLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbFF1ZXJpZXMuaGFzT3duUHJvcGVydHkoaW50ZXJ2YWwudG9TdHJpbmcoKSkgJiYgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxRdWVyaWVzW2ludGVydmFsXS5wdXNoKHF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdID0gW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nVGltZXJzW2ludGVydmFsXSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5mZXRjaFF1ZXJpZXNPbkludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLnJlZ2lzdGVyUG9sbGluZ1F1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5T3B0aW9ucykge1xuICAgICAgICBpZiAoIXF1ZXJ5T3B0aW9ucy5wb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0ZW1wdGVkIHRvIHJlZ2lzdGVyIGEgbm9uLXBvbGxpbmcgcXVlcnkgd2l0aCB0aGUgc2NoZWR1bGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVF1ZXJ5KHtcbiAgICAgICAgICAgIHNjaGVkdWxlcjogdGhpcyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHF1ZXJ5T3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlTY2hlZHVsZXI7XG59KCkpO1xuXG52YXIgX19hc3NpZ24kMTQgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgUXVlcnlNYW5hZ2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRdWVyeU1hbmFnZXIoX2EpIHtcbiAgICAgICAgdmFyIG5ldHdvcmtJbnRlcmZhY2UgPSBfYS5uZXR3b3JrSW50ZXJmYWNlLCBzdG9yZSA9IF9hLnN0b3JlLCByZWR1eFJvb3RTZWxlY3RvciA9IF9hLnJlZHV4Um9vdFNlbGVjdG9yLCBfYiA9IF9hLnJlZHVjZXJDb25maWcsIHJlZHVjZXJDb25maWcgPSBfYiA9PT0gdm9pZCAwID8geyBtdXRhdGlvbkJlaGF2aW9yUmVkdWNlcnM6IHt9IH0gOiBfYiwgZnJhZ21lbnRNYXRjaGVyID0gX2EuZnJhZ21lbnRNYXRjaGVyLCBfYyA9IF9hLmFkZFR5cGVuYW1lLCBhZGRUeXBlbmFtZSA9IF9jID09PSB2b2lkIDAgPyB0cnVlIDogX2MsIF9kID0gX2EucXVlcnlEZWR1cGxpY2F0aW9uLCBxdWVyeURlZHVwbGljYXRpb24gPSBfZCA9PT0gdm9pZCAwID8gZmFsc2UgOiBfZDtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pZENvdW50ZXIgPSAxO1xuICAgICAgICB0aGlzLm5ldHdvcmtJbnRlcmZhY2UgPSBuZXR3b3JrSW50ZXJmYWNlO1xuICAgICAgICB0aGlzLmRlZHVwbGljYXRvciA9IG5ldyBEZWR1cGxpY2F0b3IobmV0d29ya0ludGVyZmFjZSk7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICAgICAgdGhpcy5yZWR1eFJvb3RTZWxlY3RvciA9IHJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB0aGlzLnJlZHVjZXJDb25maWcgPSByZWR1Y2VyQ29uZmlnO1xuICAgICAgICB0aGlzLnBvbGxpbmdUaW1lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5xdWVyeUxpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLnF1ZXJ5RG9jdW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuYWRkVHlwZW5hbWUgPSBhZGRUeXBlbmFtZTtcbiAgICAgICAgdGhpcy5xdWVyeURlZHVwbGljYXRpb24gPSBxdWVyeURlZHVwbGljYXRpb247XG4gICAgICAgIGlmICh0eXBlb2YgZnJhZ21lbnRNYXRjaGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudE1hdGNoZXIgPSBuZXcgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IGZyYWdtZW50TWF0Y2hlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlciA9IG5ldyBRdWVyeVNjaGVkdWxlcih7XG4gICAgICAgICAgICBxdWVyeU1hbmFnZXI6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZldGNoUXVlcnlQcm9taXNlcyA9IHt9O1xuICAgICAgICB0aGlzLm9ic2VydmFibGVRdWVyaWVzID0ge307XG4gICAgICAgIHRoaXMucXVlcnlJZHNCeU5hbWUgPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVbJ3N1YnNjcmliZSddKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN0b3JlRGF0YV8xO1xuICAgICAgICAgICAgdGhpcy5zdG9yZVsnc3Vic2NyaWJlJ10oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1N0b3JlRGF0YSA9IGN1cnJlbnRTdG9yZURhdGFfMSB8fCB7fTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldmlvdXNTdG9yZUhhc0RhdGEgPSBPYmplY3Qua2V5cyhwcmV2aW91c1N0b3JlRGF0YSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdG9yZURhdGFfMSA9IF90aGlzLmdldEFwb2xsb1N0YXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRXF1YWwocHJldmlvdXNTdG9yZURhdGEsIGN1cnJlbnRTdG9yZURhdGFfMSkgJiYgcHJldmlvdXNTdG9yZUhhc0RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmJyb2FkY2FzdE5ld1N0b3JlID0gZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0UXVlcmllcygpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5tdXRhdGUgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG11dGF0aW9uID0gX2EubXV0YXRpb24sIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgb3B0aW1pc3RpY1Jlc3BvbnNlID0gX2Eub3B0aW1pc3RpY1Jlc3BvbnNlLCB1cGRhdGVRdWVyaWVzQnlOYW1lID0gX2EudXBkYXRlUXVlcmllcywgX2IgPSBfYS5yZWZldGNoUXVlcmllcywgcmVmZXRjaFF1ZXJpZXMgPSBfYiA9PT0gdm9pZCAwID8gW10gOiBfYiwgdXBkYXRlV2l0aFByb3h5Rm4gPSBfYS51cGRhdGU7XG4gICAgICAgIHZhciBtdXRhdGlvbklkID0gdGhpcy5nZW5lcmF0ZVF1ZXJ5SWQoKTtcbiAgICAgICAgaWYgKHRoaXMuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIG11dGF0aW9uID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KG11dGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICB2YXJpYWJsZXMgPSBhc3NpZ24oe30sIGdldERlZmF1bHRWYWx1ZXMoZ2V0TXV0YXRpb25EZWZpbml0aW9uKG11dGF0aW9uKSksIHZhcmlhYmxlcyk7XG4gICAgICAgIHZhciBtdXRhdGlvblN0cmluZyA9IGdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlci5wcmludChtdXRhdGlvbik7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcXVlcnk6IG11dGF0aW9uLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKG11dGF0aW9uKSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5xdWVyeURvY3VtZW50c1ttdXRhdGlvbklkXSA9IG11dGF0aW9uO1xuICAgICAgICB2YXIgdXBkYXRlUXVlcmllcyA9IHt9O1xuICAgICAgICBpZiAodXBkYXRlUXVlcmllc0J5TmFtZSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModXBkYXRlUXVlcmllc0J5TmFtZSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlOYW1lKSB7IHJldHVybiAoX3RoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVF1ZXJpZXNbcXVlcnlJZF0gPSB1cGRhdGVRdWVyaWVzQnlOYW1lW3F1ZXJ5TmFtZV07XG4gICAgICAgICAgICB9KTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX01VVEFUSU9OX0lOSVQnLFxuICAgICAgICAgICAgbXV0YXRpb25TdHJpbmc6IG11dGF0aW9uU3RyaW5nLFxuICAgICAgICAgICAgbXV0YXRpb246IG11dGF0aW9uLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKG11dGF0aW9uKSxcbiAgICAgICAgICAgIG11dGF0aW9uSWQ6IG11dGF0aW9uSWQsXG4gICAgICAgICAgICBvcHRpbWlzdGljUmVzcG9uc2U6IG9wdGltaXN0aWNSZXNwb25zZSxcbiAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IHRoaXMuZ2V0RXh0cmFSZWR1Y2VycygpLFxuICAgICAgICAgICAgdXBkYXRlUXVlcmllczogdXBkYXRlUXVlcmllcyxcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlV2l0aFByb3h5Rm4sXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMubmV0d29ya0ludGVyZmFjZS5xdWVyeShyZXF1ZXN0KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcmVzdWx0LmVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fTVVUQVRJT05fRVJST1InLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5xdWVyeURvY3VtZW50c1ttdXRhdGlvbklkXTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fTVVUQVRJT05fUkVTVUxUJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uSWQ6IG11dGF0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBtdXRhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZShtdXRhdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzIHx8IHt9LFxuICAgICAgICAgICAgICAgICAgICBleHRyYVJlZHVjZXJzOiBfdGhpcy5nZXRFeHRyYVJlZHVjZXJzKCksXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVF1ZXJpZXM6IHVwZGF0ZVF1ZXJpZXMsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlV2l0aFByb3h5Rm4sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlZHVjZXJFcnJvciA9IF90aGlzLmdldEFwb2xsb1N0YXRlKCkucmVkdWNlckVycm9yO1xuICAgICAgICAgICAgICAgIGlmIChyZWR1Y2VyRXJyb3IgJiYgcmVkdWNlckVycm9yLm11dGF0aW9uSWQgPT09IG11dGF0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlZHVjZXJFcnJvci5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWZldGNoUXVlcmllc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmZXRjaFF1ZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyBfdGhpcy5yZWZldGNoUXVlcnlCeU5hbWUobmFtZSk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmZXRjaFF1ZXJpZXMuZm9yRWFjaChmdW5jdGlvbiAocHVyZVF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5xdWVyeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHB1cmVRdWVyeS5xdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHB1cmVRdWVyeS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMucXVlcnlEb2N1bWVudHNbbXV0YXRpb25JZF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19NVVRBVElPTl9FUlJPUicsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnIsXG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uSWQ6IG11dGF0aW9uSWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnF1ZXJ5RG9jdW1lbnRzW211dGF0aW9uSWRdO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IGVycixcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmZldGNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgZmV0Y2hUeXBlLCBmZXRjaE1vcmVGb3JRdWVyeUlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBfYSA9IG9wdGlvbnMudmFyaWFibGVzLCB2YXJpYWJsZXMgPSBfYSA9PT0gdm9pZCAwID8ge30gOiBfYSwgX2IgPSBvcHRpb25zLm1ldGFkYXRhLCBtZXRhZGF0YSA9IF9iID09PSB2b2lkIDAgPyBudWxsIDogX2IsIF9jID0gb3B0aW9ucy5mZXRjaFBvbGljeSwgZmV0Y2hQb2xpY3kgPSBfYyA9PT0gdm9pZCAwID8gJ2NhY2hlLWZpcnN0JyA6IF9jO1xuICAgICAgICB2YXIgcXVlcnlEb2MgPSB0aGlzLnRyYW5zZm9ybVF1ZXJ5RG9jdW1lbnQob3B0aW9ucykucXVlcnlEb2M7XG4gICAgICAgIHZhciBxdWVyeVN0cmluZyA9IGdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlci5wcmludChxdWVyeURvYyk7XG4gICAgICAgIHZhciBzdG9yZVJlc3VsdDtcbiAgICAgICAgdmFyIG5lZWRUb0ZldGNoID0gZmV0Y2hQb2xpY3kgPT09ICduZXR3b3JrLW9ubHknO1xuICAgICAgICBpZiAoKGZldGNoVHlwZSAhPT0gRmV0Y2hUeXBlLnJlZmV0Y2ggJiYgZmV0Y2hQb2xpY3kgIT09ICduZXR3b3JrLW9ubHknKSkge1xuICAgICAgICAgICAgdmFyIF9kID0gZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKHtcbiAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnlEb2MsXG4gICAgICAgICAgICAgICAgc3RvcmU6IHRoaXMucmVkdXhSb290U2VsZWN0b3IodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKS5kYXRhLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIH0pLCBpc01pc3NpbmcgPSBfZC5pc01pc3NpbmcsIHJlc3VsdCA9IF9kLnJlc3VsdDtcbiAgICAgICAgICAgIG5lZWRUb0ZldGNoID0gaXNNaXNzaW5nIHx8IGZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnO1xuICAgICAgICAgICAgc3RvcmVSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3VsZEZldGNoID0gbmVlZFRvRmV0Y2ggJiYgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JyAmJiBmZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gdGhpcy5nZW5lcmF0ZVJlcXVlc3RJZCgpO1xuICAgICAgICB0aGlzLnF1ZXJ5RG9jdW1lbnRzW3F1ZXJ5SWRdID0gcXVlcnlEb2M7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9JTklUJyxcbiAgICAgICAgICAgIHF1ZXJ5U3RyaW5nOiBxdWVyeVN0cmluZyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeURvYyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZmV0Y2hQb2xpY3k6IGZldGNoUG9saWN5LFxuICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgc3RvcmVQcmV2aW91c1ZhcmlhYmxlczogc2hvdWxkRmV0Y2gsXG4gICAgICAgICAgICBpc1BvbGw6IGZldGNoVHlwZSA9PT0gRmV0Y2hUeXBlLnBvbGwsXG4gICAgICAgICAgICBpc1JlZmV0Y2g6IGZldGNoVHlwZSA9PT0gRmV0Y2hUeXBlLnJlZmV0Y2gsXG4gICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgbWV0YWRhdGE6IG1ldGFkYXRhLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNob3VsZERpc3BhdGNoQ2xpZW50UmVzdWx0ID0gIXNob3VsZEZldGNoIHx8IGZldGNoUG9saWN5ID09PSAnY2FjaGUtYW5kLW5ldHdvcmsnO1xuICAgICAgICBpZiAoc2hvdWxkRGlzcGF0Y2hDbGllbnRSZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fUVVFUllfUkVTVUxUX0NMSUVOVCcsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiB7IGRhdGE6IHN0b3JlUmVzdWx0IH0sXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5RG9jLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAhc2hvdWxkRmV0Y2gsXG4gICAgICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG91bGRGZXRjaCkge1xuICAgICAgICAgICAgdmFyIG5ldHdvcmtSZXN1bHQgPSB0aGlzLmZldGNoUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnlEb2MsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXBvbGxvRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9FUlJPUicsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ICE9PSAnY2FjaGUtYW5kLW5ldHdvcmsnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldHdvcmtSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IGRhdGE6IHN0b3JlUmVzdWx0IH0pO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5xdWVyeUxpc3RlbmVyRm9yT2JzZXJ2ZXIgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgb2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGxhc3RSZXN1bHQ7XG4gICAgICAgIHZhciBwcmV2aW91c2x5SGFkRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChxdWVyeVN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghcXVlcnlTdG9yZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0b3JlZFF1ZXJ5ID0gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSBzdG9yZWRRdWVyeSA/IHN0b3JlZFF1ZXJ5Lm9ic2VydmFibGVRdWVyeS5vcHRpb25zLmZldGNoUG9saWN5IDogb3B0aW9ucy5mZXRjaFBvbGljeTtcbiAgICAgICAgICAgIGlmIChmZXRjaFBvbGljeSA9PT0gJ3N0YW5kYnknKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNob3VsZE5vdGlmeUlmTG9hZGluZyA9IHF1ZXJ5U3RvcmVWYWx1ZS5wcmV2aW91c1ZhcmlhYmxlcyB8fFxuICAgICAgICAgICAgICAgIGZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScgfHwgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yayc7XG4gICAgICAgICAgICB2YXIgbmV0d29ya1N0YXR1c0NoYW5nZWQgPSBsYXN0UmVzdWx0ICYmIHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzICE9PSBsYXN0UmVzdWx0Lm5ldHdvcmtTdGF0dXM7XG4gICAgICAgICAgICBpZiAoIWlzTmV0d29ya1JlcXVlc3RJbkZsaWdodChxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cykgfHxcbiAgICAgICAgICAgICAgICAobmV0d29ya1N0YXR1c0NoYW5nZWQgJiYgb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UpIHx8XG4gICAgICAgICAgICAgICAgc2hvdWxkTm90aWZ5SWZMb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKChxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycyAmJiBxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVN0b3JlVmFsdWUubmV0d29ya0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcG9sbG9FcnJvcl8xID0gbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBxdWVyeVN0b3JlVmFsdWUubmV0d29ya0Vycm9yLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNseUhhZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGFwb2xsb0Vycm9yXzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhyb3cgYXBvbGxvRXJyb3JfMTsgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUHJvZHVjdGlvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdBbiB1bmhhbmRsZWQgZXJyb3Igd2FzIHRocm93biBiZWNhdXNlIG5vIGVycm9yIGhhbmRsZXIgaXMgcmVnaXN0ZXJlZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2ZvciB0aGUgcXVlcnkgJyArIHF1ZXJ5U3RvcmVWYWx1ZS5xdWVyeVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlOiBfdGhpcy5nZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IF90aGlzLnF1ZXJ5RG9jdW1lbnRzW3F1ZXJ5SWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnlTdG9yZVZhbHVlLnByZXZpb3VzVmFyaWFibGVzIHx8IHF1ZXJ5U3RvcmVWYWx1ZS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBfdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBfdGhpcy5mcmFnbWVudE1hdGNoZXIubWF0Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQ6IGxhc3RSZXN1bHQgJiYgbGFzdFJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksIGRhdGEgPSBfYS5yZXN1bHQsIGlzTWlzc2luZyA9IF9hLmlzTWlzc2luZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRGcm9tU3RvcmUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNNaXNzaW5nICYmIGZldGNoUG9saWN5ICE9PSAnY2FjaGUtb25seScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGxhc3RSZXN1bHQgJiYgbGFzdFJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBpc05ldHdvcmtSZXF1ZXN0SW5GbGlnaHQocXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrU3RhdHVzOiBxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhbGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEZyb21TdG9yZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya1N0YXR1czogcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXNEaWZmZXJlbnRSZXN1bHQgPSAhKGxhc3RSZXN1bHQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSZXN1bHQubmV0d29ya1N0YXR1cyA9PT0gcmVzdWx0RnJvbVN0b3JlLm5ldHdvcmtTdGF0dXMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdC5zdGFsZSA9PT0gcmVzdWx0RnJvbVN0b3JlLnN0YWxlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RSZXN1bHQuZGF0YSA9PT0gcmVzdWx0RnJvbVN0b3JlLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0RpZmZlcmVudFJlc3VsdCB8fCBwcmV2aW91c2x5SGFkRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdCA9IHJlc3VsdEZyb21TdG9yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQobWF5YmVEZWVwRnJlZXplKHJlc3VsdEZyb21TdG9yZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c2x5SGFkRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzbHlIYWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUud2F0Y2hRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zLCBzaG91bGRTdWJzY3JpYmUpIHtcbiAgICAgICAgaWYgKHNob3VsZFN1YnNjcmliZSA9PT0gdm9pZCAwKSB7IHNob3VsZFN1YnNjcmliZSA9IHRydWU7IH1cbiAgICAgICAgaWYgKG9wdGlvbnMucmV0dXJuUGFydGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncmV0dXJuUGFydGlhbERhdGEgb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VGZXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JjZUZldGNoIG9wdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIEFwb2xsbyBDbGllbnQgMS4wLiBVc2UgZmV0Y2hQb2xpY3kgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5ub0ZldGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vRmV0Y2ggb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuIFVzZSBmZXRjaFBvbGljeSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmZldGNoUG9saWN5ID09PSAnc3RhbmRieScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2xpZW50LndhdGNoUXVlcnkgY2Fubm90IGJlIGNhbGxlZCB3aXRoIGZldGNoUG9saWN5IHNldCB0byBcInN0YW5kYnlcIicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ob3B0aW9ucy5xdWVyeSk7XG4gICAgICAgIGlmIChxdWVyeURlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucyAmJiBxdWVyeURlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VmFsdWVzID0gZ2V0RGVmYXVsdFZhbHVlcyhxdWVyeURlZmluaXRpb24pO1xuICAgICAgICAgICAgb3B0aW9ucy52YXJpYWJsZXMgPSBhc3NpZ24oe30sIGRlZmF1bHRWYWx1ZXMsIG9wdGlvbnMudmFyaWFibGVzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubm90aWZ5T25OZXR3b3JrU3RhdHVzQ2hhbmdlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJhbnNmb3JtZWRPcHRpb25zID0gX19hc3NpZ24kMTQoe30sIG9wdGlvbnMpO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5ID0gbmV3IE9ic2VydmFibGVRdWVyeSh7XG4gICAgICAgICAgICBzY2hlZHVsZXI6IHRoaXMuc2NoZWR1bGVyLFxuICAgICAgICAgICAgb3B0aW9uczogdHJhbnNmb3JtZWRPcHRpb25zLFxuICAgICAgICAgICAgc2hvdWxkU3Vic2NyaWJlOiBzaG91bGRTdWJzY3JpYmUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZVF1ZXJ5O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0aW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdxdWVyeSBvcHRpb24gaXMgcmVxdWlyZWQuIFlvdSBtdXN0IHNwZWNpZnkgeW91ciBHcmFwaFFMIGRvY3VtZW50IGluIHRoZSBxdWVyeSBvcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucXVlcnkua2luZCAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcImdxbFwiIHRhZy4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXR1cm5QYXJ0aWFsRGF0YSBvcHRpb24gb25seSBzdXBwb3J0ZWQgb24gd2F0Y2hRdWVyeS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wb2xsSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncG9sbEludGVydmFsIG9wdGlvbiBvbmx5IHN1cHBvcnRlZCBvbiB3YXRjaFF1ZXJ5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmZvcmNlRmV0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZm9yY2VGZXRjaCBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBzaW5jZSBBcG9sbG8gQ2xpZW50IDEuMC4gVXNlIGZldGNoUG9saWN5IGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMubm9GZXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub0ZldGNoIG9wdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIEFwb2xsbyBDbGllbnQgMS4wLiBVc2UgZmV0Y2hQb2xpY3kgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubm90aWZ5T25OZXR3b3JrU3RhdHVzQ2hhbmdlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FsbCBcInF1ZXJ5XCIgd2l0aCBcIm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZVwiIG9wdGlvbi4gT25seSBcIndhdGNoUXVlcnlcIiBoYXMgdGhhdCBvcHRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgdmFyIHJlcXVlc3RJZCA9IHRoaXMuaWRDb3VudGVyO1xuICAgICAgICB2YXIgcmVzUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZEZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCwgcmVzUHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy53YXRjaFF1ZXJ5KG9wdGlvbnMsIGZhbHNlKS5yZXN1bHQoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc1Byb21pc2U7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlUXVlcnlJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHF1ZXJ5SWQgPSB0aGlzLmlkQ291bnRlci50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmlkQ291bnRlcisrO1xuICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RvcFF1ZXJ5SW5TdG9yZSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9TVE9QJyxcbiAgICAgICAgICAgIHF1ZXJ5SWQ6IHF1ZXJ5SWQsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXRBcG9sbG9TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdXhSb290U2VsZWN0b3IodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc2VsZWN0QXBvbGxvU3RhdGUgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdXhSb290U2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLmRhdGEgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHModGhpcy5nZXRBcG9sbG9TdGF0ZSgpKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYWRkUXVlcnlMaXN0ZW5lciA9IGZ1bmN0aW9uIChxdWVyeUlkLCBsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdID0gdGhpcy5xdWVyeUxpc3RlbmVyc1txdWVyeUlkXSB8fCBbXTtcbiAgICAgICAgdGhpcy5xdWVyeUxpc3RlbmVyc1txdWVyeUlkXS5wdXNoKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYWRkRmV0Y2hRdWVyeVByb21pc2UgPSBmdW5jdGlvbiAocmVxdWVzdElkLCBwcm9taXNlLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXNbcmVxdWVzdElkLnRvU3RyaW5nKCldID0geyBwcm9taXNlOiBwcm9taXNlLCByZXNvbHZlOiByZXNvbHZlLCByZWplY3Q6IHJlamVjdCB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVGZXRjaFF1ZXJ5UHJvbWlzZSA9IGZ1bmN0aW9uIChyZXF1ZXN0SWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZmV0Y2hRdWVyeVByb21pc2VzW3JlcXVlc3RJZC50b1N0cmluZygpXTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYWRkT2JzZXJ2YWJsZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIG9ic2VydmFibGVRdWVyeSkge1xuICAgICAgICB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRdID0geyBvYnNlcnZhYmxlUXVlcnk6IG9ic2VydmFibGVRdWVyeSB9O1xuICAgICAgICB2YXIgcXVlcnlEZWYgPSBnZXRRdWVyeURlZmluaXRpb24ob2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMucXVlcnkpO1xuICAgICAgICBpZiAocXVlcnlEZWYubmFtZSAmJiBxdWVyeURlZi5uYW1lLnZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnlOYW1lID0gcXVlcnlEZWYubmFtZS52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXSA9IHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXS5wdXNoKG9ic2VydmFibGVRdWVyeS5xdWVyeUlkKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVPYnNlcnZhYmxlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5ID0gdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnk7XG4gICAgICAgIHZhciBkZWZpbml0aW9uID0gZ2V0UXVlcnlEZWZpbml0aW9uKG9ic2VydmFibGVRdWVyeS5vcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgdmFyIHF1ZXJ5TmFtZSA9IGRlZmluaXRpb24ubmFtZSA/IGRlZmluaXRpb24ubmFtZS52YWx1ZSA6IG51bGw7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRdO1xuICAgICAgICBpZiAocXVlcnlOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5SWRzQnlOYW1lW3F1ZXJ5TmFtZV0gPSB0aGlzLnF1ZXJ5SWRzQnlOYW1lW3F1ZXJ5TmFtZV0uZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIShvYnNlcnZhYmxlUXVlcnkucXVlcnlJZCA9PT0gdmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlc2V0U3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmV0Y2hRdWVyeVByb21pc2VzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHZhciByZWplY3QgPSBfdGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXNba2V5XS5yZWplY3Q7XG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdTdG9yZSByZXNldCB3aGlsZSBxdWVyeSB3YXMgaW4gZmxpZ2h0LicpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19TVE9SRV9SRVNFVCcsXG4gICAgICAgICAgICBvYnNlcnZhYmxlUXVlcnlJZHM6IE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXMpLFxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5vYnNlcnZhYmxlUXVlcmllcykuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgdmFyIHN0b3JlUXVlcnkgPSBfdGhpcy5yZWR1eFJvb3RTZWxlY3RvcihfdGhpcy5zdG9yZS5nZXRTdGF0ZSgpKS5xdWVyaWVzW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgdmFyIGZldGNoUG9saWN5ID0gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMuZmV0Y2hQb2xpY3k7XG4gICAgICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JyAmJiBmZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5LnJlZmV0Y2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0YXJ0UXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgbGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5hZGRRdWVyeUxpc3RlbmVyKHF1ZXJ5SWQsIGxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5mZXRjaFF1ZXJ5KHF1ZXJ5SWQsIG9wdGlvbnMpXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IHJldHVybiB1bmRlZmluZWQ7IH0pO1xuICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RhcnRHcmFwaFFMU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkRG9jID0gcXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZERvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudCh0cmFuc2Zvcm1lZERvYyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhnZXRPcGVyYXRpb25EZWZpbml0aW9uKHF1ZXJ5KSksIG9wdGlvbnMudmFyaWFibGVzKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBxdWVyeTogdHJhbnNmb3JtZWREb2MsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUodHJhbnNmb3JtZWREb2MpLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgc3ViSWQ7XG4gICAgICAgIHZhciBvYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChlcnJvciwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX1NVQlNDUklQVElPTl9SRVNVTFQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiB0cmFuc2Zvcm1lZERvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKHRyYW5zZm9ybWVkRG9jKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHsgZGF0YTogcmVzdWx0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uSWQ6IHN1YklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IF90aGlzLmdldEV4dHJhUmVkdWNlcnMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnMubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMubmV4dChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzdWJJZCA9IF90aGlzLm5ldHdvcmtJbnRlcmZhY2Uuc3Vic2NyaWJlKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMgPSBvYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMubmV0d29ya0ludGVyZmFjZS51bnN1YnNjcmliZShzdWJJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF9uZXR3b3JrU3Vic2NyaXB0aW9uSWQ6IHN1YklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlMaXN0ZW5lcnNbcXVlcnlJZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5RG9jdW1lbnRzW3F1ZXJ5SWRdO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdG9wUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVF1ZXJ5KHF1ZXJ5SWQpO1xuICAgICAgICB0aGlzLnN0b3BRdWVyeUluU3RvcmUocXVlcnlJZCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldEN1cnJlbnRRdWVyeVJlc3VsdCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlUXVlcnksIGlzT3B0aW1pc3RpYykge1xuICAgICAgICBpZiAoaXNPcHRpbWlzdGljID09PSB2b2lkIDApIHsgaXNPcHRpbWlzdGljID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRRdWVyeVBhcnRzKG9ic2VydmFibGVRdWVyeSksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIGxhc3RSZXN1bHQgPSBvYnNlcnZhYmxlUXVlcnkuZ2V0TGFzdFJlc3VsdCgpO1xuICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0gb2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnM7XG4gICAgICAgIHZhciByZWFkT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHN0b3JlOiBpc09wdGltaXN0aWMgPyB0aGlzLmdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoKSA6IHRoaXMuZ2V0QXBvbGxvU3RhdGUoKS5kYXRhLFxuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0OiBsYXN0UmVzdWx0ID8gbGFzdFJlc3VsdC5kYXRhIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSByZWFkUXVlcnlGcm9tU3RvcmUocmVhZE9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIG1heWJlRGVlcEZyZWV6ZSh7IGRhdGE6IGRhdGEsIHBhcnRpYWw6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF5YmVEZWVwRnJlZXplKHsgZGF0YToge30sIHBhcnRpYWw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0UXVlcnlXaXRoUHJldmlvdXNSZXN1bHQgPSBmdW5jdGlvbiAocXVlcnlJZE9yT2JzZXJ2YWJsZSwgaXNPcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChpc09wdGltaXN0aWMgPT09IHZvaWQgMCkgeyBpc09wdGltaXN0aWMgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5SWRPck9ic2VydmFibGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZE9yT2JzZXJ2YWJsZV0pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYnNlcnZhYmxlUXVlcnkgd2l0aCB0aGlzIGlkIGRvZXNuJ3QgZXhpc3Q6IFwiICsgcXVlcnlJZE9yT2JzZXJ2YWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYnNlcnZhYmxlUXVlcnkgPSB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRPck9ic2VydmFibGVdLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeSA9IHF1ZXJ5SWRPck9ic2VydmFibGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcy5nZXRRdWVyeVBhcnRzKG9ic2VydmFibGVRdWVyeSksIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudDtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdldEN1cnJlbnRRdWVyeVJlc3VsdChvYnNlcnZhYmxlUXVlcnksIGlzT3B0aW1pc3RpYykuZGF0YTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHByZXZpb3VzUmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldFF1ZXJ5UGFydHMgPSBmdW5jdGlvbiAob2JzZXJ2YWJsZVF1ZXJ5KSB7XG4gICAgICAgIHZhciBxdWVyeU9wdGlvbnMgPSBvYnNlcnZhYmxlUXVlcnkub3B0aW9ucztcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVkRG9jID0gb2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMucXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZERvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudCh0cmFuc2Zvcm1lZERvYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnlPcHRpb25zLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIGRvY3VtZW50OiB0cmFuc2Zvcm1lZERvYyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUudHJhbnNmb3JtUXVlcnlEb2N1bWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHZhciBxdWVyeURvYyA9IG9wdGlvbnMucXVlcnk7XG4gICAgICAgIGlmICh0aGlzLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeURvYyA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeURvYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXJ5RG9jOiBxdWVyeURvYyxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0RXh0cmFSZWR1Y2VycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXMpLm1hcChmdW5jdGlvbiAob2JzUXVlcnlJZCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbb2JzUXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICAgICAgdmFyIHF1ZXJ5T3B0aW9ucyA9IHF1ZXJ5Lm9wdGlvbnM7XG4gICAgICAgICAgICBpZiAocXVlcnlPcHRpb25zLnJlZHVjZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlU3RvcmVSZWR1Y2VyKHF1ZXJ5T3B0aW9ucy5yZWR1Y2VyLCBfdGhpcy5hZGRUeXBlbmFtZSA/IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeU9wdGlvbnMucXVlcnkpIDogcXVlcnlPcHRpb25zLnF1ZXJ5LCBxdWVyeS52YXJpYWJsZXMgfHwge30sIF90aGlzLnJlZHVjZXJDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbiAocmVkdWNlcikgeyByZXR1cm4gcmVkdWNlciAhPT0gbnVsbDsgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmZldGNoUmVxdWVzdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gX2EucmVxdWVzdElkLCBxdWVyeUlkID0gX2EucXVlcnlJZCwgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgb3B0aW9ucyA9IF9hLm9wdGlvbnMsIGZldGNoTW9yZUZvclF1ZXJ5SWQgPSBfYS5mZXRjaE1vcmVGb3JRdWVyeUlkO1xuICAgICAgICB2YXIgdmFyaWFibGVzID0gb3B0aW9ucy52YXJpYWJsZXM7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKGRvY3VtZW50KSxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHJldFByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5hZGRGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQsIHJldFByb21pc2UsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICBfdGhpcy5kZWR1cGxpY2F0b3IucXVlcnkocmVxdWVzdCwgX3RoaXMucXVlcnlEZWR1cGxpY2F0aW9uKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmFSZWR1Y2VycyA9IF90aGlzLmdldEV4dHJhUmVkdWNlcnMoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fUVVFUllfUkVTVUxUJyxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKGRvY3VtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5SWQ6IHF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVGb3JRdWVyeUlkOiBmZXRjaE1vcmVGb3JRdWVyeUlkLFxuICAgICAgICAgICAgICAgICAgICBleHRyYVJlZHVjZXJzOiBleHRyYVJlZHVjZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IHJlc3VsdC5lcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgPSByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmU6IF90aGlzLmdldEFwb2xsb1N0YXRlKCkuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBfdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IF90aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgICAgICB2YXIgcmVkdWNlckVycm9yID0gX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKS5yZWR1Y2VyRXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKHJlZHVjZXJFcnJvciAmJiByZWR1Y2VyRXJyb3IucXVlcnlJZCA9PT0gcXVlcnlJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVkdWNlckVycm9yLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgZGF0YTogcmVzdWx0RnJvbVN0b3JlLCBsb2FkaW5nOiBmYWxzZSwgbmV0d29ya1N0YXR1czogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnJlYWR5LCBzdGFsZTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldFByb21pc2U7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlZmV0Y2hRdWVyeUJ5TmFtZSA9IGZ1bmN0aW9uIChxdWVyeU5hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlZmV0Y2hlZFF1ZXJpZXMgPSB0aGlzLnF1ZXJ5SWRzQnlOYW1lW3F1ZXJ5TmFtZV07XG4gICAgICAgIGlmIChyZWZldGNoZWRRdWVyaWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHVua25vd24gcXVlcnkgd2l0aCBuYW1lIFwiICsgcXVlcnlOYW1lICsgXCIgYXNrZWQgdG8gcmVmZXRjaFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChyZWZldGNoZWRRdWVyaWVzLm1hcChmdW5jdGlvbiAocXVlcnlJZCkgeyByZXR1cm4gX3RoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0ub2JzZXJ2YWJsZVF1ZXJ5LnJlZmV0Y2goKTsgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmJyb2FkY2FzdFF1ZXJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBxdWVyaWVzID0gdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLnF1ZXJpZXM7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMucXVlcnlMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSBfdGhpcy5xdWVyeUxpc3RlbmVyc1txdWVyeUlkXTtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnlTdG9yZVZhbHVlID0gcXVlcmllc1txdWVyeUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKHF1ZXJ5U3RvcmVWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlUmVxdWVzdElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gdGhpcy5pZENvdW50ZXI7XG4gICAgICAgIHRoaXMuaWRDb3VudGVyKys7XG4gICAgICAgIHJldHVybiByZXF1ZXN0SWQ7XG4gICAgfTtcbiAgICByZXR1cm4gUXVlcnlNYW5hZ2VyO1xufSgpKTtcblxudmFyIHZlcnNpb24gPSAnbG9jYWwnO1xuXG52YXIgX19hc3NpZ24kMTMgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgREVGQVVMVF9SRURVWF9ST09UX0tFWSA9ICdhcG9sbG8nO1xuZnVuY3Rpb24gZGVmYXVsdFJlZHV4Um9vdFNlbGVjdG9yKHN0YXRlKSB7XG4gICAgcmV0dXJuIHN0YXRlW0RFRkFVTFRfUkVEVVhfUk9PVF9LRVldO1xufVxuZnVuY3Rpb24gZGVmYXVsdERhdGFJZEZyb21PYmplY3QocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdC5fX3R5cGVuYW1lKSB7XG4gICAgICAgIGlmIChyZXN1bHQuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5fX3R5cGVuYW1lICsgXCI6XCIgKyByZXN1bHQuaWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdC5faWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5fX3R5cGVuYW1lICsgXCI6XCIgKyByZXN1bHQuX2lkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxudmFyIGhhc1N1Z2dlc3RlZERldnRvb2xzID0gZmFsc2U7XG52YXIgQXBvbGxvQ2xpZW50JDEgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFwb2xsb0NsaWVudChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMubWlkZGxld2FyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdG9yZShzdG9yZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7IHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c0Fwb2xsb1N0YXRlID0gX3RoaXMucXVlcnlNYW5hZ2VyLnNlbGVjdEFwb2xsb1N0YXRlKHN0b3JlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlID0gbmV4dChhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3QXBvbGxvU3RhdGUgPSBfdGhpcy5xdWVyeU1hbmFnZXIuc2VsZWN0QXBvbGxvU3RhdGUoc3RvcmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3QXBvbGxvU3RhdGUgIT09IHByZXZpb3VzQXBvbGxvU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnF1ZXJ5TWFuYWdlci5icm9hZGNhc3ROZXdTdG9yZShzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZGV2VG9vbHNIb29rQ2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRldlRvb2xzSG9va0NiKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogX3RoaXMucXVlcnlNYW5hZ2VyLmdldEFwb2xsb1N0YXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0czogX3RoaXMucXVlcnlNYW5hZ2VyLmdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICB9OyB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGRhdGFJZEZyb21PYmplY3QgPSBvcHRpb25zLmRhdGFJZEZyb21PYmplY3Q7XG4gICAgICAgIHZhciBuZXR3b3JrSW50ZXJmYWNlID0gb3B0aW9ucy5uZXR3b3JrSW50ZXJmYWNlLCByZWR1eFJvb3RTZWxlY3RvciA9IG9wdGlvbnMucmVkdXhSb290U2VsZWN0b3IsIGluaXRpYWxTdGF0ZSA9IG9wdGlvbnMuaW5pdGlhbFN0YXRlLCBfYSA9IG9wdGlvbnMuc3NyTW9kZSwgc3NyTW9kZSA9IF9hID09PSB2b2lkIDAgPyBmYWxzZSA6IF9hLCBfYiA9IG9wdGlvbnMuc3NyRm9yY2VGZXRjaERlbGF5LCBzc3JGb3JjZUZldGNoRGVsYXkgPSBfYiA9PT0gdm9pZCAwID8gMCA6IF9iLCBfYyA9IG9wdGlvbnMuYWRkVHlwZW5hbWUsIGFkZFR5cGVuYW1lID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgY3VzdG9tUmVzb2x2ZXJzID0gb3B0aW9ucy5jdXN0b21SZXNvbHZlcnMsIGNvbm5lY3RUb0RldlRvb2xzID0gb3B0aW9ucy5jb25uZWN0VG9EZXZUb29scywgZnJhZ21lbnRNYXRjaGVyID0gb3B0aW9ucy5mcmFnbWVudE1hdGNoZXIsIF9kID0gb3B0aW9ucy5xdWVyeURlZHVwbGljYXRpb24sIHF1ZXJ5RGVkdXBsaWNhdGlvbiA9IF9kID09PSB2b2lkIDAgPyB0cnVlIDogX2Q7XG4gICAgICAgIGlmICh0eXBlb2YgcmVkdXhSb290U2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucmVkdXhSb290U2VsZWN0b3IgPSByZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVkdXhSb290U2VsZWN0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wicmVkdXhSb290U2VsZWN0b3JcIiBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudE1hdGNoZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IG5ldyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gZnJhZ21lbnRNYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbFN0YXRlID0gaW5pdGlhbFN0YXRlID8gaW5pdGlhbFN0YXRlIDoge307XG4gICAgICAgIHRoaXMubmV0d29ya0ludGVyZmFjZSA9IG5ldHdvcmtJbnRlcmZhY2UgPyBuZXR3b3JrSW50ZXJmYWNlIDpcbiAgICAgICAgICAgIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UoeyB1cmk6ICcvZ3JhcGhxbCcgfSk7XG4gICAgICAgIHRoaXMuYWRkVHlwZW5hbWUgPSBhZGRUeXBlbmFtZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgPSBzc3JNb2RlIHx8IHNzckZvcmNlRmV0Y2hEZWxheSA+IDA7XG4gICAgICAgIHRoaXMuZGF0YUlkID0gZGF0YUlkRnJvbU9iamVjdCA9IGRhdGFJZEZyb21PYmplY3QgfHwgZGVmYXVsdERhdGFJZEZyb21PYmplY3Q7XG4gICAgICAgIHRoaXMuZmllbGRXaXRoQXJncyA9IHN0b3JlS2V5TmFtZUZyb21GaWVsZE5hbWVBbmRBcmdzO1xuICAgICAgICB0aGlzLnF1ZXJ5RGVkdXBsaWNhdGlvbiA9IHF1ZXJ5RGVkdXBsaWNhdGlvbjtcbiAgICAgICAgaWYgKHNzckZvcmNlRmV0Y2hEZWxheSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgPSBmYWxzZTsgfSwgc3NyRm9yY2VGZXRjaERlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZHVjZXJDb25maWcgPSB7XG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiBjdXN0b21SZXNvbHZlcnMsXG4gICAgICAgICAgICBhZGRUeXBlbmFtZTogYWRkVHlwZW5hbWUsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXI6IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLndhdGNoUXVlcnkgPSB0aGlzLndhdGNoUXVlcnkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5tdXRhdGUgPSB0aGlzLm11dGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNldFN0b3JlID0gdGhpcy5zZXRTdG9yZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlc2V0U3RvcmUgPSB0aGlzLnJlc2V0U3RvcmUuYmluZCh0aGlzKTtcbiAgICAgICAgdmFyIGRlZmF1bHRDb25uZWN0VG9EZXZUb29scyA9ICFpc1Byb2R1Y3Rpb24oKSAmJlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgKCF3aW5kb3cuX19BUE9MTE9fQ0xJRU5UX18pO1xuICAgICAgICBpZiAodHlwZW9mIGNvbm5lY3RUb0RldlRvb2xzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRDb25uZWN0VG9EZXZUb29scyA6IGNvbm5lY3RUb0RldlRvb2xzKSB7XG4gICAgICAgICAgICB3aW5kb3cuX19BUE9MTE9fQ0xJRU5UX18gPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU3VnZ2VzdGVkRGV2dG9vbHMgJiYgIWlzUHJvZHVjdGlvbigpKSB7XG4gICAgICAgICAgICBoYXNTdWdnZXN0ZWREZXZ0b29scyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy50b3AgPT09IHdpbmRvdy5zZWxmKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19BUE9MTE9fREVWVE9PTFNfR0xPQkFMX0hPT0tfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRG93bmxvYWQgdGhlIEFwb2xsbyBEZXZUb29scyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yIGEgYmV0dGVyIGRldmVsb3BtZW50IGV4cGVyaWVuY2U6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlL2RldGFpbC9hcG9sbG8tY2xpZW50LWRldmVsb3Blci10L2pka2tua2tiZWJiYXBpbGdvZWNjY2lnbGtmYm1ibmZtJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB9XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53YXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZU5ldHdvcmtGZXRjaGVzICYmIG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICduZXR3b3JrLW9ubHknKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gX19hc3NpZ24kMTMoe30sIG9wdGlvbnMsIHsgZmV0Y2hQb2xpY3k6ICdjYWNoZS1maXJzdCcgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyLndhdGNoUXVlcnkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yaycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2FjaGUtYW5kLW5ldHdvcmsgZmV0Y2hQb2xpY3kgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIHdhdGNoUXVlcnknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgJiYgb3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbiQxMyh7fSwgb3B0aW9ucywgeyBmZXRjaFBvbGljeTogJ2NhY2hlLWZpcnN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIucXVlcnkob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5tdXRhdGUob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24ob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRQcm94eSgpLnJlYWRRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkucmVhZEZyYWdtZW50KG9wdGlvbnMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkud3JpdGVRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUud3JpdGVGcmFnbWVudCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRQcm94eSgpLndyaXRlRnJhZ21lbnQob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnJlZHVjZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVBcG9sbG9SZWR1Y2VyKHRoaXMucmVkdWNlckNvbmZpZyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLl9fYWN0aW9uSG9va0ZvckRldlRvb2xzID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgIHRoaXMuZGV2VG9vbHNIb29rQ2IgPSBjYjtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuaW5pdFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5zdG9yZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlZHV4Um9vdFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbml0aWFsaXplIHRoZSBzdG9yZSBiZWNhdXNlIFwicmVkdXhSb290U2VsZWN0b3JcIiBpcyBwcm92aWRlZC4gJyArXG4gICAgICAgICAgICAgICAgJ3JlZHV4Um9vdFNlbGVjdG9yIHNob3VsZCBvbmx5IGJlIHVzZWQgd2hlbiB0aGUgc3RvcmUgaXMgY3JlYXRlZCBvdXRzaWRlIG9mIHRoZSBjbGllbnQuICcgK1xuICAgICAgICAgICAgICAgICdUaGlzIG1heSBsZWFkIHRvIHVuZXhwZWN0ZWQgcmVzdWx0cyB3aGVuIHF1ZXJ5aW5nIHRoZSBzdG9yZSBpbnRlcm5hbGx5LiAnICtcbiAgICAgICAgICAgICAgICBcIlBsZWFzZSByZW1vdmUgdGhhdCBvcHRpb24gZnJvbSBBcG9sbG9DbGllbnQgY29uc3RydWN0b3IuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RvcmUoY3JlYXRlQXBvbGxvU3RvcmUoe1xuICAgICAgICAgICAgcmVkdXhSb290S2V5OiBERUZBVUxUX1JFRFVYX1JPT1RfS0VZLFxuICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiB0aGlzLmluaXRpYWxTdGF0ZSxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgbG9nZ2VyOiBmdW5jdGlvbiAoc3RvcmUpIHsgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7IHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZGV2VG9vbHNIb29rQ2IpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGV2VG9vbHNIb29rQ2Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogX3RoaXMucXVlcnlNYW5hZ2VyLmdldEFwb2xsb1N0YXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cygpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07IH07IH0sXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVzZXRTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucXVlcnlNYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5yZXNldFN0b3JlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLnNldFN0b3JlID0gZnVuY3Rpb24gKHN0b3JlKSB7XG4gICAgICAgIHZhciByZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgaWYgKHRoaXMucmVkdXhSb290U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJlZHV4Um9vdFNlbGVjdG9yID0gdGhpcy5yZWR1eFJvb3RTZWxlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlZHV4Um9vdFNlbGVjdG9yID0gZGVmYXVsdFJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcmVkdXhSb290U2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4aXN0aW5nIHN0b3JlIGRvZXMgbm90IHVzZSBhcG9sbG9SZWR1Y2VyLiBQbGVhc2UgbWFrZSBzdXJlIHRoZSBzdG9yZSAnICtcbiAgICAgICAgICAgICAgICAnaXMgcHJvcGVybHkgY29uZmlndXJlZCBhbmQgXCJyZWR1eFJvb3RTZWxlY3RvclwiIGlzIGNvcnJlY3RseSBzcGVjaWZpZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlciA9IG5ldyBRdWVyeU1hbmFnZXIoe1xuICAgICAgICAgICAgbmV0d29ya0ludGVyZmFjZTogdGhpcy5uZXR3b3JrSW50ZXJmYWNlLFxuICAgICAgICAgICAgcmVkdXhSb290U2VsZWN0b3I6IHJlZHV4Um9vdFNlbGVjdG9yLFxuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgYWRkVHlwZW5hbWU6IHRoaXMuYWRkVHlwZW5hbWUsXG4gICAgICAgICAgICByZWR1Y2VyQ29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBxdWVyeURlZHVwbGljYXRpb246IHRoaXMucXVlcnlEZWR1cGxpY2F0aW9uLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiB0aGlzLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLmluaXRQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3h5KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICAgICAgdGhpcy5wcm94eSA9IG5ldyBSZWR1eERhdGFQcm94eSh0aGlzLnN0b3JlLCB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yIHx8IGRlZmF1bHRSZWR1eFJvb3RTZWxlY3RvciwgdGhpcy5mcmFnbWVudE1hdGNoZXIsIHRoaXMucmVkdWNlckNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJveHk7XG4gICAgfTtcbiAgICByZXR1cm4gQXBvbGxvQ2xpZW50O1xufSgpKTtcblxuZXhwb3J0cy5jcmVhdGVOZXR3b3JrSW50ZXJmYWNlID0gY3JlYXRlTmV0d29ya0ludGVyZmFjZTtcbmV4cG9ydHMuY3JlYXRlQmF0Y2hpbmdOZXR3b3JrSW50ZXJmYWNlID0gY3JlYXRlQmF0Y2hpbmdOZXR3b3JrSW50ZXJmYWNlO1xuZXhwb3J0cy5jcmVhdGVBcG9sbG9TdG9yZSA9IGNyZWF0ZUFwb2xsb1N0b3JlO1xuZXhwb3J0cy5jcmVhdGVBcG9sbG9SZWR1Y2VyID0gY3JlYXRlQXBvbGxvUmVkdWNlcjtcbmV4cG9ydHMucmVhZFF1ZXJ5RnJvbVN0b3JlID0gcmVhZFF1ZXJ5RnJvbVN0b3JlO1xuZXhwb3J0cy53cml0ZVF1ZXJ5VG9TdG9yZSA9IHdyaXRlUXVlcnlUb1N0b3JlO1xuZXhwb3J0cy5hZGRUeXBlbmFtZVRvRG9jdW1lbnQgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQ7XG5leHBvcnRzLmNyZWF0ZUZyYWdtZW50TWFwID0gY3JlYXRlRnJhZ21lbnRNYXA7XG5leHBvcnRzLkFwb2xsb0Vycm9yID0gQXBvbGxvRXJyb3I7XG5leHBvcnRzLmdldFF1ZXJ5RGVmaW5pdGlvbiA9IGdldFF1ZXJ5RGVmaW5pdGlvbjtcbmV4cG9ydHMuZ2V0RnJhZ21lbnREZWZpbml0aW9ucyA9IGdldEZyYWdtZW50RGVmaW5pdGlvbnM7XG5leHBvcnRzLnRvSWRWYWx1ZSA9IHRvSWRWYWx1ZTtcbmV4cG9ydHMuSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlciA9IEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXI7XG5leHBvcnRzLnByaW50QVNUID0gZ3JhcGhxbF9sYW5ndWFnZV9wcmludGVyLnByaW50O1xuZXhwb3J0cy5IVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlID0gSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZTtcbmV4cG9ydHMuSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlID0gSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlO1xuZXhwb3J0cy5PYnNlcnZhYmxlUXVlcnkgPSBPYnNlcnZhYmxlUXVlcnk7XG5leHBvcnRzLkFwb2xsb0NsaWVudCA9IEFwb2xsb0NsaWVudCQxO1xuZXhwb3J0c1snZGVmYXVsdCddID0gQXBvbGxvQ2xpZW50JDE7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcG9sbG8udW1kLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBzaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSB7XG4gICAgaWYgKCF2YXJpYWJsZXMpIHtcbiAgICAgICAgdmFyaWFibGVzID0ge307XG4gICAgfVxuICAgIGlmICghc2VsZWN0aW9uLmRpcmVjdGl2ZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHZhciByZXMgPSB0cnVlO1xuICAgIHNlbGVjdGlvbi5kaXJlY3RpdmVzLmZvckVhY2goZnVuY3Rpb24gKGRpcmVjdGl2ZSkge1xuICAgICAgICBpZiAoZGlyZWN0aXZlLm5hbWUudmFsdWUgIT09ICdza2lwJyAmJiBkaXJlY3RpdmUubmFtZS52YWx1ZSAhPT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpcmVjdGl2ZUFyZ3VtZW50cyA9IGRpcmVjdGl2ZS5hcmd1bWVudHM7XG4gICAgICAgIHZhciBkaXJlY3RpdmVOYW1lID0gZGlyZWN0aXZlLm5hbWUudmFsdWU7XG4gICAgICAgIGlmIChkaXJlY3RpdmVBcmd1bWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50cyBmb3IgdGhlIEBcIiArIGRpcmVjdGl2ZU5hbWUgKyBcIiBkaXJlY3RpdmUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpZkFyZ3VtZW50ID0gZGlyZWN0aXZlLmFyZ3VtZW50c1swXTtcbiAgICAgICAgaWYgKCFpZkFyZ3VtZW50Lm5hbWUgfHwgaWZBcmd1bWVudC5uYW1lLnZhbHVlICE9PSAnaWYnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmVmFsdWUgPSBkaXJlY3RpdmUuYXJndW1lbnRzWzBdLnZhbHVlO1xuICAgICAgICB2YXIgZXZhbGVkVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCFpZlZhbHVlIHx8IGlmVmFsdWUua2luZCAhPT0gJ0Jvb2xlYW5WYWx1ZScpIHtcbiAgICAgICAgICAgIGlmIChpZlZhbHVlLmtpbmQgIT09ICdWYXJpYWJsZScpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBmb3IgdGhlIEBcIiArIGRpcmVjdGl2ZU5hbWUgKyBcIiBkaXJlY3RpdmUgbXVzdCBiZSBhIHZhcmlhYmxlIG9yIGEgYm9vbCBlYW4gdmFsdWUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSB2YXJpYWJsZXNbaWZWYWx1ZS5uYW1lLnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoZXZhbGVkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhcmlhYmxlIHJlZmVyZW5jZWQgaW4gQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSBpZlZhbHVlLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkaXJlY3RpdmVOYW1lID09PSAnc2tpcCcpIHtcbiAgICAgICAgICAgIGV2YWxlZFZhbHVlID0gIWV2YWxlZFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZhbGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbn1cbmV4cG9ydHMuc2hvdWxkSW5jbHVkZSA9IHNob3VsZEluY2x1ZGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kaXJlY3RpdmVzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gY2hlY2tEb2N1bWVudChkb2MpIHtcbiAgICBpZiAoZG9jLmtpbmQgIT09ICdEb2N1bWVudCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0aW5nIGEgcGFyc2VkIEdyYXBoUUwgZG9jdW1lbnQuIFBlcmhhcHMgeW91IG5lZWQgdG8gd3JhcCB0aGUgcXVlcnkgc3RyaW5nIGluIGEgXFxcImdxbFxcXCIgdGFnPyBodHRwOi8vZG9jcy5hcG9sbG9zdGFjay5jb20vYXBvbGxvLWNsaWVudC9jb3JlLmh0bWwjZ3FsXCIpO1xuICAgIH1cbiAgICB2YXIgbnVtT3BEZWZpbml0aW9ucyA9IGRvYy5kZWZpbml0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nO1xuICAgIH0pLmxlbmd0aDtcbiAgICBpZiAobnVtT3BEZWZpbml0aW9ucyA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWVyaWVzIG11c3QgaGF2ZSBleGFjdGx5IG9uZSBvcGVyYXRpb24gZGVmaW5pdGlvbi4nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRGcmFnbWVudERlZmluaXRpb25zKGRvYykge1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZnJhZ21lbnREZWZpbml0aW9ucztcbn1cbmV4cG9ydHMuZ2V0RnJhZ21lbnREZWZpbml0aW9ucyA9IGdldEZyYWdtZW50RGVmaW5pdGlvbnM7XG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudE1hcChmcmFnbWVudHMpIHtcbiAgICBpZiAoZnJhZ21lbnRzID09PSB2b2lkIDApIHsgZnJhZ21lbnRzID0gW107IH1cbiAgICB2YXIgc3ltVGFibGUgPSB7fTtcbiAgICBmcmFnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgc3ltVGFibGVbZnJhZ21lbnQubmFtZS52YWx1ZV0gPSBmcmFnbWVudDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3ltVGFibGU7XG59XG5leHBvcnRzLmNyZWF0ZUZyYWdtZW50TWFwID0gY3JlYXRlRnJhZ21lbnRNYXA7XG5mdW5jdGlvbiBnZXRNYWluRGVmaW5pdGlvbihxdWVyeURvYykge1xuICAgIGNoZWNrRG9jdW1lbnQocXVlcnlEb2MpO1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb247XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHF1ZXJ5RG9jLmRlZmluaXRpb25zOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IF9hW19pXTtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICB2YXIgb3BlcmF0aW9uID0gZGVmaW5pdGlvbi5vcGVyYXRpb247XG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAncXVlcnknIHx8IG9wZXJhdGlvbiA9PT0gJ211dGF0aW9uJyB8fCBvcGVyYXRpb24gPT09ICdzdWJzY3JpcHRpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmluaXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ0ZyYWdtZW50RGVmaW5pdGlvbicgJiYgIWZyYWdtZW50RGVmaW5pdGlvbikge1xuICAgICAgICAgICAgZnJhZ21lbnREZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZnJhZ21lbnREZWZpbml0aW9uKSB7XG4gICAgICAgIHJldHVybiBmcmFnbWVudERlZmluaXRpb247XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBwYXJzZWQgR3JhcGhRTCBxdWVyeSB3aXRoIGEgcXVlcnksIG11dGF0aW9uLCBzdWJzY3JpcHRpb24sIG9yIGEgZnJhZ21lbnQuJyk7XG59XG5leHBvcnRzLmdldE1haW5EZWZpbml0aW9uID0gZ2V0TWFpbkRlZmluaXRpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZXRGcm9tQVNULmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGdldEZyb21BU1RfMSA9IHJlcXVpcmUoXCIuL2dldEZyb21BU1RcIik7XG52YXIgZGlyZWN0aXZlc18xID0gcmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKTtcbnZhciBzdG9yZVV0aWxzXzEgPSByZXF1aXJlKFwiLi9zdG9yZVV0aWxzXCIpO1xuZnVuY3Rpb24gZ3JhcGhxbChyZXNvbHZlciwgZG9jdW1lbnQsIHJvb3RWYWx1ZSwgY29udGV4dFZhbHVlLCB2YXJpYWJsZVZhbHVlcywgZXhlY09wdGlvbnMpIHtcbiAgICBpZiAoZXhlY09wdGlvbnMgPT09IHZvaWQgMCkgeyBleGVjT3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIG1haW5EZWZpbml0aW9uID0gZ2V0RnJvbUFTVF8xLmdldE1haW5EZWZpbml0aW9uKGRvY3VtZW50KTtcbiAgICB2YXIgZnJhZ21lbnRzID0gZ2V0RnJvbUFTVF8xLmdldEZyYWdtZW50RGVmaW5pdGlvbnMoZG9jdW1lbnQpO1xuICAgIHZhciBmcmFnbWVudE1hcCA9IGdldEZyb21BU1RfMS5jcmVhdGVGcmFnbWVudE1hcChmcmFnbWVudHMpIHx8IHt9O1xuICAgIHZhciByZXN1bHRNYXBwZXIgPSBleGVjT3B0aW9ucy5yZXN1bHRNYXBwZXI7XG4gICAgdmFyIGZyYWdtZW50TWF0Y2hlciA9IGV4ZWNPcHRpb25zLmZyYWdtZW50TWF0Y2hlciB8fCAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfSk7XG4gICAgdmFyIGV4ZWNDb250ZXh0ID0ge1xuICAgICAgICBmcmFnbWVudE1hcDogZnJhZ21lbnRNYXAsXG4gICAgICAgIGNvbnRleHRWYWx1ZTogY29udGV4dFZhbHVlLFxuICAgICAgICB2YXJpYWJsZVZhbHVlczogdmFyaWFibGVWYWx1ZXMsXG4gICAgICAgIHJlc3VsdE1hcHBlcjogcmVzdWx0TWFwcGVyLFxuICAgICAgICByZXNvbHZlcjogcmVzb2x2ZXIsXG4gICAgICAgIGZyYWdtZW50TWF0Y2hlcjogZnJhZ21lbnRNYXRjaGVyLFxuICAgIH07XG4gICAgcmV0dXJuIGV4ZWN1dGVTZWxlY3Rpb25TZXQobWFpbkRlZmluaXRpb24uc2VsZWN0aW9uU2V0LCByb290VmFsdWUsIGV4ZWNDb250ZXh0KTtcbn1cbmV4cG9ydHMuZ3JhcGhxbCA9IGdyYXBocWw7XG5mdW5jdGlvbiBleGVjdXRlU2VsZWN0aW9uU2V0KHNlbGVjdGlvblNldCwgcm9vdFZhbHVlLCBleGVjQ29udGV4dCkge1xuICAgIHZhciBmcmFnbWVudE1hcCA9IGV4ZWNDb250ZXh0LmZyYWdtZW50TWFwLCBjb250ZXh0VmFsdWUgPSBleGVjQ29udGV4dC5jb250ZXh0VmFsdWUsIHZhcmlhYmxlcyA9IGV4ZWNDb250ZXh0LnZhcmlhYmxlVmFsdWVzO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKCFkaXJlY3RpdmVzXzEuc2hvdWxkSW5jbHVkZShzZWxlY3Rpb24sIHZhcmlhYmxlcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RvcmVVdGlsc18xLmlzRmllbGQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgdmFyIGZpZWxkUmVzdWx0ID0gZXhlY3V0ZUZpZWxkKHNlbGVjdGlvbiwgcm9vdFZhbHVlLCBleGVjQ29udGV4dCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RmllbGRLZXkgPSBzdG9yZVV0aWxzXzEucmVzdWx0S2V5TmFtZUZyb21GaWVsZChzZWxlY3Rpb24pO1xuICAgICAgICAgICAgaWYgKGZpZWxkUmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0RmllbGRLZXldID0gZmllbGRSZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoc3RvcmVVdGlsc18xLmlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGZyYWdtZW50ID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBmcmFnbWVudE1hcFtzZWxlY3Rpb24ubmFtZS52YWx1ZV07XG4gICAgICAgICAgICAgICAgaWYgKCFmcmFnbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmFnbWVudCBuYW1lZCBcIiArIHNlbGVjdGlvbi5uYW1lLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZUNvbmRpdGlvbiA9IGZyYWdtZW50LnR5cGVDb25kaXRpb24ubmFtZS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChleGVjQ29udGV4dC5mcmFnbWVudE1hdGNoZXIocm9vdFZhbHVlLCB0eXBlQ29uZGl0aW9uLCBjb250ZXh0VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyYWdtZW50UmVzdWx0ID0gZXhlY3V0ZVNlbGVjdGlvblNldChmcmFnbWVudC5zZWxlY3Rpb25TZXQsIHJvb3RWYWx1ZSwgZXhlY0NvbnRleHQpO1xuICAgICAgICAgICAgICAgIG1lcmdlKHJlc3VsdCwgZnJhZ21lbnRSZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGV4ZWNDb250ZXh0LnJlc3VsdE1hcHBlcikge1xuICAgICAgICByZXR1cm4gZXhlY0NvbnRleHQucmVzdWx0TWFwcGVyKHJlc3VsdCwgcm9vdFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGV4ZWN1dGVGaWVsZChmaWVsZCwgcm9vdFZhbHVlLCBleGVjQ29udGV4dCkge1xuICAgIHZhciB2YXJpYWJsZXMgPSBleGVjQ29udGV4dC52YXJpYWJsZVZhbHVlcywgY29udGV4dFZhbHVlID0gZXhlY0NvbnRleHQuY29udGV4dFZhbHVlLCByZXNvbHZlciA9IGV4ZWNDb250ZXh0LnJlc29sdmVyO1xuICAgIHZhciBmaWVsZE5hbWUgPSBmaWVsZC5uYW1lLnZhbHVlO1xuICAgIHZhciBhcmdzID0gc3RvcmVVdGlsc18xLmFyZ3VtZW50c09iamVjdEZyb21GaWVsZChmaWVsZCwgdmFyaWFibGVzKTtcbiAgICB2YXIgaW5mbyA9IHtcbiAgICAgICAgaXNMZWFmOiAhZmllbGQuc2VsZWN0aW9uU2V0LFxuICAgICAgICByZXN1bHRLZXk6IHN0b3JlVXRpbHNfMS5yZXN1bHRLZXlOYW1lRnJvbUZpZWxkKGZpZWxkKSxcbiAgICB9O1xuICAgIHZhciByZXN1bHQgPSByZXNvbHZlcihmaWVsZE5hbWUsIHJvb3RWYWx1ZSwgYXJncywgY29udGV4dFZhbHVlLCBpbmZvKTtcbiAgICBpZiAoIWZpZWxkLnNlbGVjdGlvblNldCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVTdWJTZWxlY3RlZEFycmF5KGZpZWxkLCByZXN1bHQsIGV4ZWNDb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGV4ZWN1dGVTZWxlY3Rpb25TZXQoZmllbGQuc2VsZWN0aW9uU2V0LCByZXN1bHQsIGV4ZWNDb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGV4ZWN1dGVTdWJTZWxlY3RlZEFycmF5KGZpZWxkLCByZXN1bHQsIGV4ZWNDb250ZXh0KSB7XG4gICAgcmV0dXJuIHJlc3VsdC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0ZVN1YlNlbGVjdGVkQXJyYXkoZmllbGQsIGl0ZW0sIGV4ZWNDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhlY3V0ZVNlbGVjdGlvblNldChmaWVsZC5zZWxlY3Rpb25TZXQsIGl0ZW0sIGV4ZWNDb250ZXh0KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG1lcmdlKGRlc3QsIHNyYykge1xuICAgIGlmIChzcmMgPT09IG51bGwgfHxcbiAgICAgICAgdHlwZW9mIHNyYyA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgdHlwZW9mIHNyYyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgdHlwZW9mIHNyYyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgdHlwZW9mIHNyYyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKGRlc3QpLmZvckVhY2goZnVuY3Rpb24gKGRlc3RLZXkpIHtcbiAgICAgICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShkZXN0S2V5KSkge1xuICAgICAgICAgICAgbWVyZ2UoZGVzdFtkZXN0S2V5XSwgc3JjW2Rlc3RLZXldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChmdW5jdGlvbiAoc3JjS2V5KSB7XG4gICAgICAgIGlmICghZGVzdC5oYXNPd25Qcm9wZXJ0eShzcmNLZXkpKSB7XG4gICAgICAgICAgICBkZXN0W3NyY0tleV0gPSBzcmNbc3JjS2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JhcGhxbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciB1dGlsaXRpZXNfMSA9IHJlcXVpcmUoXCIuL3V0aWxpdGllc1wiKTtcbmV4cG9ydHMuZmlsdGVyID0gdXRpbGl0aWVzXzEuZmlsdGVyO1xuZXhwb3J0cy5jaGVjayA9IHV0aWxpdGllc18xLmNoZWNrO1xuZXhwb3J0cy5wcm9wVHlwZSA9IHV0aWxpdGllc18xLnByb3BUeXBlO1xudmFyIGdyYXBocWxfMSA9IHJlcXVpcmUoXCIuL2dyYXBocWxcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBncmFwaHFsXzEuZ3JhcGhxbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNTY2FsYXJWYWx1ZSh2YWx1ZSkge1xuICAgIHZhciBTQ0FMQVJfVFlQRVMgPSB7XG4gICAgICAgIFN0cmluZ1ZhbHVlOiAxLFxuICAgICAgICBCb29sZWFuVmFsdWU6IDEsXG4gICAgICAgIEVudW1WYWx1ZTogMSxcbiAgICB9O1xuICAgIHJldHVybiAhIVNDQUxBUl9UWVBFU1t2YWx1ZS5raW5kXTtcbn1cbmZ1bmN0aW9uIGlzTnVtYmVyVmFsdWUodmFsdWUpIHtcbiAgICB2YXIgTlVNQkVSX1RZUEVTID0ge1xuICAgICAgICBJbnRWYWx1ZTogMSxcbiAgICAgICAgRmxvYXRWYWx1ZTogMSxcbiAgICB9O1xuICAgIHJldHVybiBOVU1CRVJfVFlQRVNbdmFsdWUua2luZF07XG59XG5mdW5jdGlvbiBpc1ZhcmlhYmxlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdWYXJpYWJsZSc7XG59XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnT2JqZWN0VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNMaXN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdMaXN0VmFsdWUnO1xufVxuZnVuY3Rpb24gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09iaiwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcykge1xuICAgIGlmIChpc051bWJlclZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSBOdW1iZXIodmFsdWUudmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1NjYWxhclZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YWx1ZS52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhciBuZXN0ZWRBcmdPYmpfMSA9IHt9O1xuICAgICAgICB2YWx1ZS5maWVsZHMubWFwKGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihuZXN0ZWRBcmdPYmpfMSwgb2JqLm5hbWUsIG9iai52YWx1ZSwgdmFyaWFibGVzKTsgfSk7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IG5lc3RlZEFyZ09ial8xO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1ZhcmlhYmxlKHZhbHVlKSkge1xuICAgICAgICB2YXIgdmFyaWFibGVWYWx1ZSA9ICh2YXJpYWJsZXMgfHwge30pW3ZhbHVlLm5hbWUudmFsdWVdO1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YXJpYWJsZVZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0xpc3QodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlcy5tYXAoZnVuY3Rpb24gKGxpc3RWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIG5lc3RlZEFyZ0FycmF5T2JqID0ge307XG4gICAgICAgICAgICB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24obmVzdGVkQXJnQXJyYXlPYmosIG5hbWUsIGxpc3RWYWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgIHJldHVybiBuZXN0ZWRBcmdBcnJheU9ialtuYW1lLnZhbHVlXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgaW5saW5lIGFyZ3VtZW50IFxcXCJcIiArIG5hbWUudmFsdWUgKyBcIlxcXCIgb2Yga2luZCBcXFwiXCIgKyB2YWx1ZS5raW5kICsgXCJcXFwiIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSB2YXJpYWJsZXMgaW5zdGVhZCBvZiBpbmxpbmUgYXJndW1lbnRzIHRvIG92ZXJjb21lIHRoaXMgbGltaXRhdGlvbi5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gYXJndW1lbnRzT2JqZWN0RnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAoZmllbGQuYXJndW1lbnRzICYmIGZpZWxkLmFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGFyZ09ial8xID0ge307XG4gICAgICAgIGZpZWxkLmFyZ3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBfYS5uYW1lLCB2YWx1ZSA9IF9hLnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihhcmdPYmpfMSwgbmFtZSwgdmFsdWUsIHZhcmlhYmxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJnT2JqXzE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5hcmd1bWVudHNPYmplY3RGcm9tRmllbGQgPSBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQ7XG5mdW5jdGlvbiByZXN1bHRLZXlOYW1lRnJvbUZpZWxkKGZpZWxkKSB7XG4gICAgcmV0dXJuIGZpZWxkLmFsaWFzID9cbiAgICAgICAgZmllbGQuYWxpYXMudmFsdWUgOlxuICAgICAgICBmaWVsZC5uYW1lLnZhbHVlO1xufVxuZXhwb3J0cy5yZXN1bHRLZXlOYW1lRnJvbUZpZWxkID0gcmVzdWx0S2V5TmFtZUZyb21GaWVsZDtcbmZ1bmN0aW9uIGlzRmllbGQoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5raW5kID09PSAnRmllbGQnO1xufVxuZXhwb3J0cy5pc0ZpZWxkID0gaXNGaWVsZDtcbmZ1bmN0aW9uIGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnO1xufVxuZXhwb3J0cy5pc0lubGluZUZyYWdtZW50ID0gaXNJbmxpbmVGcmFnbWVudDtcbmZ1bmN0aW9uIGdyYXBoUUxSZXN1bHRIYXNFcnJvcihyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aDtcbn1cbmV4cG9ydHMuZ3JhcGhRTFJlc3VsdEhhc0Vycm9yID0gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmVVdGlscy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBncmFwaHFsXzEgPSByZXF1aXJlKFwiLi9ncmFwaHFsXCIpO1xuZnVuY3Rpb24gZmlsdGVyKGRvYywgZGF0YSkge1xuICAgIHZhciByZXNvbHZlciA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIHJvb3QsIGFyZ3MsIGNvbnRleHQsIGluZm8pIHtcbiAgICAgICAgcmV0dXJuIHJvb3RbaW5mby5yZXN1bHRLZXldO1xuICAgIH07XG4gICAgcmV0dXJuIGdyYXBocWxfMS5ncmFwaHFsKHJlc29sdmVyLCBkb2MsIGRhdGEpO1xufVxuZXhwb3J0cy5maWx0ZXIgPSBmaWx0ZXI7XG5mdW5jdGlvbiBjaGVjayhkb2MsIGRhdGEpIHtcbiAgICB2YXIgcmVzb2x2ZXIgPSBmdW5jdGlvbiAoZmllbGROYW1lLCByb290LCBhcmdzLCBjb250ZXh0LCBpbmZvKSB7XG4gICAgICAgIGlmICghe30uaGFzT3duUHJvcGVydHkuY2FsbChyb290LCBpbmZvLnJlc3VsdEtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmZvLnJlc3VsdEtleSArIFwiIG1pc3Npbmcgb24gXCIgKyByb290KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9vdFtpbmZvLnJlc3VsdEtleV07XG4gICAgfTtcbiAgICBncmFwaHFsXzEuZ3JhcGhxbChyZXNvbHZlciwgZG9jLCBkYXRhLCB7fSwge30sIHtcbiAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICB9KTtcbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5mdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbn1cblByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xudmFyIHJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge1xuICAgIHByb3A6ICdwcm9wJyxcbiAgICBjb250ZXh0OiAnY29udGV4dCcsXG4gICAgY2hpbGRDb250ZXh0OiAnY2hpbGQgY29udGV4dCcsXG59O1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSByZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFwiVGhlIFwiICsgbG9jYXRpb25OYW1lICsgXCIgYFwiICsgcHJvcEZ1bGxOYW1lICsgXCJgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAoXCJpbiBgXCIgKyBjb21wb25lbnROYW1lICsgXCJgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC5cIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXCJUaGUgXCIgKyBsb2NhdGlvbk5hbWUgKyBcIiBgXCIgKyBwcm9wRnVsbE5hbWUgKyBcImAgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluIFwiICtcbiAgICAgICAgICAgICAgICAgICAgKFwiYFwiICsgY29tcG9uZW50TmFtZSArIFwiYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbn1cbmZ1bmN0aW9uIHByb3BUeXBlKGRvYykge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihmdW5jdGlvbiAocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICAgIHZhciBwcm9wID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hlY2soZG9jLCBwcm9wKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5wcm9wVHlwZSA9IHByb3BUeXBlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbGl0aWVzLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdncmFwaHFsL2xhbmd1YWdlL3BhcnNlcicpO1xuXG52YXIgcGFyc2UgPSBwYXJzZXIucGFyc2U7XG5cbi8vIFN0cmlwIGluc2lnbmlmaWNhbnQgd2hpdGVzcGFjZVxuLy8gTm90ZSB0aGF0IHRoaXMgY291bGQgZG8gYSBsb3QgbW9yZSwgc3VjaCBhcyByZW9yZGVyIGZpZWxkcyBldGMuXG5mdW5jdGlvbiBub3JtYWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xccyxdKy9nLCAnICcpLnRyaW0oKTtcbn1cblxuLy8gQSBtYXAgZG9jU3RyaW5nIC0+IGdyYXBocWwgZG9jdW1lbnRcbnZhciBkb2NDYWNoZSA9IHt9O1xuXG4vLyBBIG1hcCBmcmFnbWVudE5hbWUgLT4gW25vcm1hbGl6ZWQgc291cmNlXVxudmFyIGZyYWdtZW50U291cmNlTWFwID0ge307XG5cbmZ1bmN0aW9uIGNhY2hlS2V5RnJvbUxvYyhsb2MpIHtcbiAgcmV0dXJuIG5vcm1hbGl6ZShsb2Muc291cmNlLmJvZHkuc3Vic3RyaW5nKGxvYy5zdGFydCwgbG9jLmVuZCkpO1xufVxuXG4vLyBGb3IgdGVzdGluZy5cbmZ1bmN0aW9uIHJlc2V0Q2FjaGVzKCkge1xuICBkb2NDYWNoZSA9IHt9O1xuICBmcmFnbWVudFNvdXJjZU1hcCA9IHt9O1xufVxuXG4vLyBUYWtlIGEgdW5zdHJpcHBlZCBwYXJzZWQgZG9jdW1lbnQgKHF1ZXJ5L211dGF0aW9uIG9yIGV2ZW4gZnJhZ21lbnQpLCBhbmRcbi8vIGNoZWNrIGFsbCBmcmFnbWVudCBkZWZpbml0aW9ucywgY2hlY2tpbmcgZm9yIG5hbWUtPnNvdXJjZSB1bmlxdWVuZXNzLlxuLy8gV2UgYWxzbyB3YW50IHRvIG1ha2Ugc3VyZSBvbmx5IHVuaXF1ZSBmcmFnbWVudHMgZXhpc3QgaW4gdGhlIGRvY3VtZW50LlxudmFyIHByaW50RnJhZ21lbnRXYXJuaW5ncyA9IHRydWU7XG5mdW5jdGlvbiBwcm9jZXNzRnJhZ21lbnRzKGFzdCkge1xuICB2YXIgYXN0RnJhZ21lbnRNYXAgPSB7fTtcbiAgdmFyIGRlZmluaXRpb25zID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhc3QuZGVmaW5pdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZnJhZ21lbnREZWZpbml0aW9uID0gYXN0LmRlZmluaXRpb25zW2ldO1xuXG4gICAgaWYgKGZyYWdtZW50RGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgdmFyIGZyYWdtZW50TmFtZSA9IGZyYWdtZW50RGVmaW5pdGlvbi5uYW1lLnZhbHVlO1xuICAgICAgdmFyIHNvdXJjZUtleSA9IGNhY2hlS2V5RnJvbUxvYyhmcmFnbWVudERlZmluaXRpb24ubG9jKTtcblxuICAgICAgLy8gV2Uga25vdyBzb21ldGhpbmcgYWJvdXQgdGhpcyBmcmFnbWVudFxuICAgICAgaWYgKGZyYWdtZW50U291cmNlTWFwLmhhc093blByb3BlcnR5KGZyYWdtZW50TmFtZSkgJiYgIWZyYWdtZW50U291cmNlTWFwW2ZyYWdtZW50TmFtZV1bc291cmNlS2V5XSkge1xuXG4gICAgICAgIC8vIHRoaXMgaXMgYSBwcm9ibGVtIGJlY2F1c2UgdGhlIGFwcCBkZXZlbG9wZXIgaXMgdHJ5aW5nIHRvIHJlZ2lzdGVyIGFub3RoZXIgZnJhZ21lbnQgd2l0aFxuICAgICAgICAvLyB0aGUgc2FtZSBuYW1lIGFzIG9uZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQuIFNvLCB3ZSB0ZWxsIHRoZW0gYWJvdXQgaXQuXG4gICAgICAgIGlmIChwcmludEZyYWdtZW50V2FybmluZ3MpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiBmcmFnbWVudCB3aXRoIG5hbWUgXCIgKyBmcmFnbWVudE5hbWUgKyBcIiBhbHJlYWR5IGV4aXN0cy5cXG5cIlxuICAgICAgICAgICAgKyBcImdyYXBocWwtdGFnIGVuZm9yY2VzIGFsbCBmcmFnbWVudCBuYW1lcyBhY3Jvc3MgeW91ciBhcHBsaWNhdGlvbiB0byBiZSB1bmlxdWU7IHJlYWQgbW9yZSBhYm91dFxcblwiXG4gICAgICAgICAgICArIFwidGhpcyBpbiB0aGUgZG9jczogaHR0cDovL2Rldi5hcG9sbG9kYXRhLmNvbS9jb3JlL2ZyYWdtZW50cy5odG1sI3VuaXF1ZS1uYW1lc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZyYWdtZW50U291cmNlTWFwW2ZyYWdtZW50TmFtZV1bc291cmNlS2V5XSA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSBpZiAoIWZyYWdtZW50U291cmNlTWFwLmhhc093blByb3BlcnR5KGZyYWdtZW50TmFtZSkpIHtcbiAgICAgICAgZnJhZ21lbnRTb3VyY2VNYXBbZnJhZ21lbnROYW1lXSA9IHt9O1xuICAgICAgICBmcmFnbWVudFNvdXJjZU1hcFtmcmFnbWVudE5hbWVdW3NvdXJjZUtleV0gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWFzdEZyYWdtZW50TWFwW3NvdXJjZUtleV0pIHtcbiAgICAgICAgYXN0RnJhZ21lbnRNYXBbc291cmNlS2V5XSA9IHRydWU7XG4gICAgICAgIGRlZmluaXRpb25zLnB1c2goZnJhZ21lbnREZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaChmcmFnbWVudERlZmluaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGFzdC5kZWZpbml0aW9ucyA9IGRlZmluaXRpb25zO1xuICByZXR1cm4gYXN0O1xufVxuXG5mdW5jdGlvbiBkaXNhYmxlRnJhZ21lbnRXYXJuaW5ncygpIHtcbiAgcHJpbnRGcmFnbWVudFdhcm5pbmdzID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHN0cmlwTG9jKGRvYywgcmVtb3ZlTG9jQXRUaGlzTGV2ZWwpIHtcbiAgdmFyIGRvY1R5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZG9jKTtcblxuICBpZiAoZG9jVHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldHVybiBkb2MubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gc3RyaXBMb2MoZCwgcmVtb3ZlTG9jQXRUaGlzTGV2ZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGRvY1R5cGUgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGlucHV0LicpO1xuICB9XG5cbiAgLy8gV2UgZG9uJ3Qgd2FudCB0byByZW1vdmUgdGhlIHJvb3QgbG9jIGZpZWxkIHNvIHdlIGNhbiB1c2UgaXRcbiAgLy8gZm9yIGZyYWdtZW50IHN1YnN0aXR1dGlvbiAoc2VlIGJlbG93KVxuICBpZiAocmVtb3ZlTG9jQXRUaGlzTGV2ZWwgJiYgZG9jLmxvYykge1xuICAgIGRlbGV0ZSBkb2MubG9jO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Fwb2xsb2dyYXBocWwvZ3JhcGhxbC10YWcvaXNzdWVzLzQwXG4gIGlmIChkb2MubG9jKSB7XG4gICAgZGVsZXRlIGRvYy5sb2Muc3RhcnRUb2tlbjtcbiAgICBkZWxldGUgZG9jLmxvYy5lbmRUb2tlbjtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZG9jKTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbHVlO1xuICB2YXIgdmFsdWVUeXBlO1xuXG4gIGZvciAoa2V5IGluIGtleXMpIHtcbiAgICBpZiAoa2V5cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YWx1ZSA9IGRvY1trZXlzW2tleV1dO1xuICAgICAgdmFsdWVUeXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgICAgaWYgKHZhbHVlVHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgdmFsdWVUeXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgIGRvY1trZXlzW2tleV1dID0gc3RyaXBMb2ModmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb2M7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQoZG9jKSB7XG4gIHZhciBjYWNoZUtleSA9IG5vcm1hbGl6ZShkb2MpO1xuXG4gIGlmIChkb2NDYWNoZVtjYWNoZUtleV0pIHtcbiAgICByZXR1cm4gZG9jQ2FjaGVbY2FjaGVLZXldO1xuICB9XG5cbiAgdmFyIHBhcnNlZCA9IHBhcnNlKGRvYyk7XG4gIGlmICghcGFyc2VkIHx8IHBhcnNlZC5raW5kICE9PSAnRG9jdW1lbnQnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYSB2YWxpZCBHcmFwaFFMIGRvY3VtZW50LicpO1xuICB9XG5cbiAgLy8gY2hlY2sgdGhhdCBhbGwgXCJuZXdcIiBmcmFnbWVudHMgaW5zaWRlIHRoZSBkb2N1bWVudHMgYXJlIGNvbnNpc3RlbnQgd2l0aFxuICAvLyBleGlzdGluZyBmcmFnbWVudHMgb2YgdGhlIHNhbWUgbmFtZVxuICBwYXJzZWQgPSBwcm9jZXNzRnJhZ21lbnRzKHBhcnNlZCk7XG4gIHBhcnNlZCA9IHN0cmlwTG9jKHBhcnNlZCwgZmFsc2UpO1xuICBkb2NDYWNoZVtjYWNoZUtleV0gPSBwYXJzZWQ7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn1cblxuLy8gWFhYIFRoaXMgc2hvdWxkIGV2ZW50dWFsbHkgZGlzYWxsb3cgYXJiaXRyYXJ5IHN0cmluZyBpbnRlcnBvbGF0aW9uLCBsaWtlIFJlbGF5IGRvZXNcbmZ1bmN0aW9uIGdxbCgvKiBhcmd1bWVudHMgKi8pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gIHZhciBsaXRlcmFscyA9IGFyZ3NbMF07XG5cbiAgLy8gV2UgYWx3YXlzIGdldCBsaXRlcmFsc1swXSBhbmQgdGhlbiBtYXRjaGluZyBwb3N0IGxpdGVyYWxzIGZvciBlYWNoIGFyZyBnaXZlblxuICB2YXIgcmVzdWx0ID0gbGl0ZXJhbHNbMF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFyZ3NbaV0gJiYgYXJnc1tpXS5raW5kICYmIGFyZ3NbaV0ua2luZCA9PT0gJ0RvY3VtZW50Jykge1xuICAgICAgcmVzdWx0ICs9IGFyZ3NbaV0ubG9jLnNvdXJjZS5ib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgKz0gYXJnc1tpXTtcbiAgICB9XG5cbiAgICByZXN1bHQgKz0gbGl0ZXJhbHNbaV07XG4gIH1cblxuICByZXR1cm4gcGFyc2VEb2N1bWVudChyZXN1bHQpO1xufVxuXG4vLyBTdXBwb3J0IHR5cGVzY3JpcHQsIHdoaWNoIGlzbid0IGFzIG5pY2UgYXMgQmFiZWwgYWJvdXQgZGVmYXVsdCBleHBvcnRzXG5ncWwuZGVmYXVsdCA9IGdxbDtcbmdxbC5yZXNldENhY2hlcyA9IHJlc2V0Q2FjaGVzO1xuZ3FsLmRpc2FibGVGcmFnbWVudFdhcm5pbmdzID0gZGlzYWJsZUZyYWdtZW50V2FybmluZ3M7XG5cbm1vZHVsZS5leHBvcnRzID0gZ3FsO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z3JhcGhxbC10YWcudW1kLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5HcmFwaFFMRXJyb3IgPSBHcmFwaFFMRXJyb3I7XG5cbnZhciBfbG9jYXRpb24gPSByZXF1aXJlKCcuLi9sYW5ndWFnZS9sb2NhdGlvbicpO1xuXG4vKipcbiAqIEEgR3JhcGhRTEVycm9yIGRlc2NyaWJlcyBhbiBFcnJvciBmb3VuZCBkdXJpbmcgdGhlIHBhcnNlLCB2YWxpZGF0ZSwgb3JcbiAqIGV4ZWN1dGUgcGhhc2VzIG9mIHBlcmZvcm1pbmcgYSBHcmFwaFFMIG9wZXJhdGlvbi4gSW4gYWRkaXRpb24gdG8gYSBtZXNzYWdlXG4gKiBhbmQgc3RhY2sgdHJhY2UsIGl0IGFsc28gaW5jbHVkZXMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxvY2F0aW9ucyBpbiBhXG4gKiBHcmFwaFFMIGRvY3VtZW50IGFuZC9vciBleGVjdXRpb24gcmVzdWx0IHRoYXQgY29ycmVzcG9uZCB0byB0aGUgRXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEdyYXBoUUxFcnJvciggLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZWRlY2xhcmVcbm1lc3NhZ2UsIG5vZGVzLCBzb3VyY2UsIHBvc2l0aW9ucywgcGF0aCwgb3JpZ2luYWxFcnJvcikge1xuICAvLyBJbmNsdWRlIChub24tZW51bWVyYWJsZSkgc3RhY2sgdHJhY2UuXG4gIGlmIChvcmlnaW5hbEVycm9yICYmIG9yaWdpbmFsRXJyb3Iuc3RhY2spIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YWNrJywge1xuICAgICAgdmFsdWU6IG9yaWdpbmFsRXJyb3Iuc3RhY2ssXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2UgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgR3JhcGhRTEVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3N0YWNrJywge1xuICAgICAgdmFsdWU6IEVycm9yKCkuc3RhY2ssXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSBsb2NhdGlvbnMgaW4gdGhlIHNvdXJjZSBmb3IgdGhlIGdpdmVuIG5vZGVzL3Bvc2l0aW9ucy5cbiAgdmFyIF9zb3VyY2UgPSBzb3VyY2U7XG4gIGlmICghX3NvdXJjZSAmJiBub2RlcyAmJiBub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIG5vZGUgPSBub2Rlc1swXTtcbiAgICBfc291cmNlID0gbm9kZSAmJiBub2RlLmxvYyAmJiBub2RlLmxvYy5zb3VyY2U7XG4gIH1cblxuICB2YXIgX3Bvc2l0aW9ucyA9IHBvc2l0aW9ucztcbiAgaWYgKCFfcG9zaXRpb25zICYmIG5vZGVzKSB7XG4gICAgX3Bvc2l0aW9ucyA9IG5vZGVzLmZpbHRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIEJvb2xlYW4obm9kZS5sb2MpO1xuICAgIH0pLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUubG9jLnN0YXJ0O1xuICAgIH0pO1xuICB9XG4gIGlmIChfcG9zaXRpb25zICYmIF9wb3NpdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgX3Bvc2l0aW9ucyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBfbG9jYXRpb25zID0gdm9pZCAwO1xuICB2YXIgX3NvdXJjZTIgPSBfc291cmNlOyAvLyBzZWVtcyBoZXJlIEZsb3cgbmVlZCBhIGNvbnN0IHRvIHJlc29sdmUgdHlwZS5cbiAgaWYgKF9zb3VyY2UyICYmIF9wb3NpdGlvbnMpIHtcbiAgICBfbG9jYXRpb25zID0gX3Bvc2l0aW9ucy5tYXAoZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuICgwLCBfbG9jYXRpb24uZ2V0TG9jYXRpb24pKF9zb3VyY2UyLCBwb3MpO1xuICAgIH0pO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIG1lc3NhZ2U6IHtcbiAgICAgIHZhbHVlOiBtZXNzYWdlLFxuICAgICAgLy8gQnkgYmVpbmcgZW51bWVyYWJsZSwgSlNPTi5zdHJpbmdpZnkgd2lsbCBpbmNsdWRlIGBtZXNzYWdlYCBpbiB0aGVcbiAgICAgIC8vIHJlc3VsdGluZyBvdXRwdXQuIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBzaW1wbGlzdCBwb3NzaWJsZSBHcmFwaFFMXG4gICAgICAvLyBzZXJ2aWNlIGFkaGVyZXMgdG8gdGhlIHNwZWMuXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9LFxuICAgIGxvY2F0aW9uczoge1xuICAgICAgLy8gQ29lcmNpbmcgZmFsc2V5IHZhbHVlcyB0byB1bmRlZmluZWQgZW5zdXJlcyB0aGV5IHdpbGwgbm90IGJlIGluY2x1ZGVkXG4gICAgICAvLyBpbiBKU09OLnN0cmluZ2lmeSgpIHdoZW4gbm90IHByb3ZpZGVkLlxuICAgICAgdmFsdWU6IF9sb2NhdGlvbnMgfHwgdW5kZWZpbmVkLFxuICAgICAgLy8gQnkgYmVpbmcgZW51bWVyYWJsZSwgSlNPTi5zdHJpbmdpZnkgd2lsbCBpbmNsdWRlIGBsb2NhdGlvbnNgIGluIHRoZVxuICAgICAgLy8gcmVzdWx0aW5nIG91dHB1dC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHNpbXBsaXN0IHBvc3NpYmxlIEdyYXBoUUxcbiAgICAgIC8vIHNlcnZpY2UgYWRoZXJlcyB0byB0aGUgc3BlYy5cbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHBhdGg6IHtcbiAgICAgIC8vIENvZXJjaW5nIGZhbHNleSB2YWx1ZXMgdG8gdW5kZWZpbmVkIGVuc3VyZXMgdGhleSB3aWxsIG5vdCBiZSBpbmNsdWRlZFxuICAgICAgLy8gaW4gSlNPTi5zdHJpbmdpZnkoKSB3aGVuIG5vdCBwcm92aWRlZC5cbiAgICAgIHZhbHVlOiBwYXRoIHx8IHVuZGVmaW5lZCxcbiAgICAgIC8vIEJ5IGJlaW5nIGVudW1lcmFibGUsIEpTT04uc3RyaW5naWZ5IHdpbGwgaW5jbHVkZSBgcGF0aGAgaW4gdGhlXG4gICAgICAvLyByZXN1bHRpbmcgb3V0cHV0LiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgc2ltcGxpc3QgcG9zc2libGUgR3JhcGhRTFxuICAgICAgLy8gc2VydmljZSBhZGhlcmVzIHRvIHRoZSBzcGVjLlxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbm9kZXM6IHtcbiAgICAgIHZhbHVlOiBub2RlcyB8fCB1bmRlZmluZWRcbiAgICB9LFxuICAgIHNvdXJjZToge1xuICAgICAgdmFsdWU6IF9zb3VyY2UgfHwgdW5kZWZpbmVkXG4gICAgfSxcbiAgICBwb3NpdGlvbnM6IHtcbiAgICAgIHZhbHVlOiBfcG9zaXRpb25zIHx8IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgb3JpZ2luYWxFcnJvcjoge1xuICAgICAgdmFsdWU6IG9yaWdpbmFsRXJyb3JcbiAgICB9XG4gIH0pO1xufVxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbkdyYXBoUUxFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSwge1xuICBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogR3JhcGhRTEVycm9yIH0sXG4gIG5hbWU6IHsgdmFsdWU6ICdHcmFwaFFMRXJyb3InIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZm9ybWF0RXJyb3IgPSBmb3JtYXRFcnJvcjtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCcuLi9qc3V0aWxzL2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogR2l2ZW4gYSBHcmFwaFFMRXJyb3IsIGZvcm1hdCBpdCBhY2NvcmRpbmcgdG8gdGhlIHJ1bGVzIGRlc2NyaWJlZCBieSB0aGVcbiAqIFJlc3BvbnNlIEZvcm1hdCwgRXJyb3JzIHNlY3Rpb24gb2YgdGhlIEdyYXBoUUwgU3BlY2lmaWNhdGlvbi5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXJyb3IpIHtcbiAgKDAsIF9pbnZhcmlhbnQyLmRlZmF1bHQpKGVycm9yLCAnUmVjZWl2ZWQgbnVsbCBvciB1bmRlZmluZWQgZXJyb3IuJyk7XG4gIHJldHVybiB7XG4gICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICBsb2NhdGlvbnM6IGVycm9yLmxvY2F0aW9ucyxcbiAgICBwYXRoOiBlcnJvci5wYXRoXG4gIH07XG59XG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfR3JhcGhRTEVycm9yID0gcmVxdWlyZSgnLi9HcmFwaFFMRXJyb3InKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdHcmFwaFFMRXJyb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfR3JhcGhRTEVycm9yLkdyYXBoUUxFcnJvcjtcbiAgfVxufSk7XG5cbnZhciBfc3ludGF4RXJyb3IgPSByZXF1aXJlKCcuL3N5bnRheEVycm9yJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnc3ludGF4RXJyb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfc3ludGF4RXJyb3Iuc3ludGF4RXJyb3I7XG4gIH1cbn0pO1xuXG52YXIgX2xvY2F0ZWRFcnJvciA9IHJlcXVpcmUoJy4vbG9jYXRlZEVycm9yJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnbG9jYXRlZEVycm9yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2xvY2F0ZWRFcnJvci5sb2NhdGVkRXJyb3I7XG4gIH1cbn0pO1xuXG52YXIgX2Zvcm1hdEVycm9yID0gcmVxdWlyZSgnLi9mb3JtYXRFcnJvcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ2Zvcm1hdEVycm9yJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX2Zvcm1hdEVycm9yLmZvcm1hdEVycm9yO1xuICB9XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmxvY2F0ZWRFcnJvciA9IGxvY2F0ZWRFcnJvcjtcblxudmFyIF9HcmFwaFFMRXJyb3IgPSByZXF1aXJlKCcuL0dyYXBoUUxFcnJvcicpO1xuXG4vKipcbiAqIEdpdmVuIGFuIGFyYml0cmFyeSBFcnJvciwgcHJlc3VtYWJseSB0aHJvd24gd2hpbGUgYXR0ZW1wdGluZyB0byBleGVjdXRlIGFcbiAqIEdyYXBoUUwgb3BlcmF0aW9uLCBwcm9kdWNlIGEgbmV3IEdyYXBoUUxFcnJvciBhd2FyZSBvZiB0aGUgbG9jYXRpb24gaW4gdGhlXG4gKiBkb2N1bWVudCByZXNwb25zaWJsZSBmb3IgdGhlIG9yaWdpbmFsIEVycm9yLlxuICovXG5mdW5jdGlvbiBsb2NhdGVkRXJyb3Iob3JpZ2luYWxFcnJvciwgbm9kZXMsIHBhdGgpIHtcbiAgLy8gTm90ZTogdGhpcyB1c2VzIGEgYnJhbmQtY2hlY2sgdG8gc3VwcG9ydCBHcmFwaFFMIGVycm9ycyBvcmlnaW5hdGluZyBmcm9tXG4gIC8vIG90aGVyIGNvbnRleHRzLlxuICBpZiAob3JpZ2luYWxFcnJvciAmJiBvcmlnaW5hbEVycm9yLnBhdGgpIHtcbiAgICByZXR1cm4gb3JpZ2luYWxFcnJvcjtcbiAgfVxuXG4gIHZhciBtZXNzYWdlID0gb3JpZ2luYWxFcnJvciA/IG9yaWdpbmFsRXJyb3IubWVzc2FnZSB8fCBTdHJpbmcob3JpZ2luYWxFcnJvcikgOiAnQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nO1xuICByZXR1cm4gbmV3IF9HcmFwaFFMRXJyb3IuR3JhcGhRTEVycm9yKG1lc3NhZ2UsIG9yaWdpbmFsRXJyb3IgJiYgb3JpZ2luYWxFcnJvci5ub2RlcyB8fCBub2Rlcywgb3JpZ2luYWxFcnJvciAmJiBvcmlnaW5hbEVycm9yLnNvdXJjZSwgb3JpZ2luYWxFcnJvciAmJiBvcmlnaW5hbEVycm9yLnBvc2l0aW9ucywgcGF0aCwgb3JpZ2luYWxFcnJvcik7XG59XG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnN5bnRheEVycm9yID0gc3ludGF4RXJyb3I7XG5cbnZhciBfbG9jYXRpb24gPSByZXF1aXJlKCcuLi9sYW5ndWFnZS9sb2NhdGlvbicpO1xuXG52YXIgX0dyYXBoUUxFcnJvciA9IHJlcXVpcmUoJy4vR3JhcGhRTEVycm9yJyk7XG5cbi8qKlxuICogUHJvZHVjZXMgYSBHcmFwaFFMRXJyb3IgcmVwcmVzZW50aW5nIGEgc3ludGF4IGVycm9yLCBjb250YWluaW5nIHVzZWZ1bFxuICogZGVzY3JpcHRpdmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHN5bnRheCBlcnJvcidzIHBvc2l0aW9uIGluIHRoZSBzb3VyY2UuXG4gKi9cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIHN5bnRheEVycm9yKHNvdXJjZSwgcG9zaXRpb24sIGRlc2NyaXB0aW9uKSB7XG4gIHZhciBsb2NhdGlvbiA9ICgwLCBfbG9jYXRpb24uZ2V0TG9jYXRpb24pKHNvdXJjZSwgcG9zaXRpb24pO1xuICB2YXIgZXJyb3IgPSBuZXcgX0dyYXBoUUxFcnJvci5HcmFwaFFMRXJyb3IoJ1N5bnRheCBFcnJvciAnICsgc291cmNlLm5hbWUgKyAnICgnICsgbG9jYXRpb24ubGluZSArICc6JyArIGxvY2F0aW9uLmNvbHVtbiArICcpICcgKyBkZXNjcmlwdGlvbiArICdcXG5cXG4nICsgaGlnaGxpZ2h0U291cmNlQXRMb2NhdGlvbihzb3VyY2UsIGxvY2F0aW9uKSwgdW5kZWZpbmVkLCBzb3VyY2UsIFtwb3NpdGlvbl0pO1xuICByZXR1cm4gZXJyb3I7XG59XG5cbi8qKlxuICogUmVuZGVyIGEgaGVscGZ1bCBkZXNjcmlwdGlvbiBvZiB0aGUgbG9jYXRpb24gb2YgdGhlIGVycm9yIGluIHRoZSBHcmFwaFFMXG4gKiBTb3VyY2UgZG9jdW1lbnQuXG4gKi9cbmZ1bmN0aW9uIGhpZ2hsaWdodFNvdXJjZUF0TG9jYXRpb24oc291cmNlLCBsb2NhdGlvbikge1xuICB2YXIgbGluZSA9IGxvY2F0aW9uLmxpbmU7XG4gIHZhciBwcmV2TGluZU51bSA9IChsaW5lIC0gMSkudG9TdHJpbmcoKTtcbiAgdmFyIGxpbmVOdW0gPSBsaW5lLnRvU3RyaW5nKCk7XG4gIHZhciBuZXh0TGluZU51bSA9IChsaW5lICsgMSkudG9TdHJpbmcoKTtcbiAgdmFyIHBhZExlbiA9IG5leHRMaW5lTnVtLmxlbmd0aDtcbiAgdmFyIGxpbmVzID0gc291cmNlLmJvZHkuc3BsaXQoL1xcclxcbnxbXFxuXFxyXS9nKTtcbiAgcmV0dXJuIChsaW5lID49IDIgPyBscGFkKHBhZExlbiwgcHJldkxpbmVOdW0pICsgJzogJyArIGxpbmVzW2xpbmUgLSAyXSArICdcXG4nIDogJycpICsgbHBhZChwYWRMZW4sIGxpbmVOdW0pICsgJzogJyArIGxpbmVzW2xpbmUgLSAxXSArICdcXG4nICsgQXJyYXkoMiArIHBhZExlbiArIGxvY2F0aW9uLmNvbHVtbikuam9pbignICcpICsgJ15cXG4nICsgKGxpbmUgPCBsaW5lcy5sZW5ndGggPyBscGFkKHBhZExlbiwgbmV4dExpbmVOdW0pICsgJzogJyArIGxpbmVzW2xpbmVdICsgJ1xcbicgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGxwYWQobGVuLCBzdHIpIHtcbiAgcmV0dXJuIEFycmF5KGxlbiAtIHN0ci5sZW5ndGggKyAxKS5qb2luKCcgJykgKyBzdHI7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpbnZhcmlhbnQ7XG5cbi8qKlxuICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuLy8gTmFtZVxuXG52YXIgTkFNRSA9IGV4cG9ydHMuTkFNRSA9ICdOYW1lJztcblxuLy8gRG9jdW1lbnRcblxudmFyIERPQ1VNRU5UID0gZXhwb3J0cy5ET0NVTUVOVCA9ICdEb2N1bWVudCc7XG52YXIgT1BFUkFUSU9OX0RFRklOSVRJT04gPSBleHBvcnRzLk9QRVJBVElPTl9ERUZJTklUSU9OID0gJ09wZXJhdGlvbkRlZmluaXRpb24nO1xudmFyIFZBUklBQkxFX0RFRklOSVRJT04gPSBleHBvcnRzLlZBUklBQkxFX0RFRklOSVRJT04gPSAnVmFyaWFibGVEZWZpbml0aW9uJztcbnZhciBWQVJJQUJMRSA9IGV4cG9ydHMuVkFSSUFCTEUgPSAnVmFyaWFibGUnO1xudmFyIFNFTEVDVElPTl9TRVQgPSBleHBvcnRzLlNFTEVDVElPTl9TRVQgPSAnU2VsZWN0aW9uU2V0JztcbnZhciBGSUVMRCA9IGV4cG9ydHMuRklFTEQgPSAnRmllbGQnO1xudmFyIEFSR1VNRU5UID0gZXhwb3J0cy5BUkdVTUVOVCA9ICdBcmd1bWVudCc7XG5cbi8vIEZyYWdtZW50c1xuXG52YXIgRlJBR01FTlRfU1BSRUFEID0gZXhwb3J0cy5GUkFHTUVOVF9TUFJFQUQgPSAnRnJhZ21lbnRTcHJlYWQnO1xudmFyIElOTElORV9GUkFHTUVOVCA9IGV4cG9ydHMuSU5MSU5FX0ZSQUdNRU5UID0gJ0lubGluZUZyYWdtZW50JztcbnZhciBGUkFHTUVOVF9ERUZJTklUSU9OID0gZXhwb3J0cy5GUkFHTUVOVF9ERUZJTklUSU9OID0gJ0ZyYWdtZW50RGVmaW5pdGlvbic7XG5cbi8vIFZhbHVlc1xuXG52YXIgSU5UID0gZXhwb3J0cy5JTlQgPSAnSW50VmFsdWUnO1xudmFyIEZMT0FUID0gZXhwb3J0cy5GTE9BVCA9ICdGbG9hdFZhbHVlJztcbnZhciBTVFJJTkcgPSBleHBvcnRzLlNUUklORyA9ICdTdHJpbmdWYWx1ZSc7XG52YXIgQk9PTEVBTiA9IGV4cG9ydHMuQk9PTEVBTiA9ICdCb29sZWFuVmFsdWUnO1xudmFyIE5VTEwgPSBleHBvcnRzLk5VTEwgPSAnTnVsbFZhbHVlJztcbnZhciBFTlVNID0gZXhwb3J0cy5FTlVNID0gJ0VudW1WYWx1ZSc7XG52YXIgTElTVCA9IGV4cG9ydHMuTElTVCA9ICdMaXN0VmFsdWUnO1xudmFyIE9CSkVDVCA9IGV4cG9ydHMuT0JKRUNUID0gJ09iamVjdFZhbHVlJztcbnZhciBPQkpFQ1RfRklFTEQgPSBleHBvcnRzLk9CSkVDVF9GSUVMRCA9ICdPYmplY3RGaWVsZCc7XG5cbi8vIERpcmVjdGl2ZXNcblxudmFyIERJUkVDVElWRSA9IGV4cG9ydHMuRElSRUNUSVZFID0gJ0RpcmVjdGl2ZSc7XG5cbi8vIFR5cGVzXG5cbnZhciBOQU1FRF9UWVBFID0gZXhwb3J0cy5OQU1FRF9UWVBFID0gJ05hbWVkVHlwZSc7XG52YXIgTElTVF9UWVBFID0gZXhwb3J0cy5MSVNUX1RZUEUgPSAnTGlzdFR5cGUnO1xudmFyIE5PTl9OVUxMX1RZUEUgPSBleHBvcnRzLk5PTl9OVUxMX1RZUEUgPSAnTm9uTnVsbFR5cGUnO1xuXG4vLyBUeXBlIFN5c3RlbSBEZWZpbml0aW9uc1xuXG52YXIgU0NIRU1BX0RFRklOSVRJT04gPSBleHBvcnRzLlNDSEVNQV9ERUZJTklUSU9OID0gJ1NjaGVtYURlZmluaXRpb24nO1xudmFyIE9QRVJBVElPTl9UWVBFX0RFRklOSVRJT04gPSBleHBvcnRzLk9QRVJBVElPTl9UWVBFX0RFRklOSVRJT04gPSAnT3BlcmF0aW9uVHlwZURlZmluaXRpb24nO1xuXG4vLyBUeXBlIERlZmluaXRpb25zXG5cbnZhciBTQ0FMQVJfVFlQRV9ERUZJTklUSU9OID0gZXhwb3J0cy5TQ0FMQVJfVFlQRV9ERUZJTklUSU9OID0gJ1NjYWxhclR5cGVEZWZpbml0aW9uJztcbnZhciBPQkpFQ1RfVFlQRV9ERUZJTklUSU9OID0gZXhwb3J0cy5PQkpFQ1RfVFlQRV9ERUZJTklUSU9OID0gJ09iamVjdFR5cGVEZWZpbml0aW9uJztcbnZhciBGSUVMRF9ERUZJTklUSU9OID0gZXhwb3J0cy5GSUVMRF9ERUZJTklUSU9OID0gJ0ZpZWxkRGVmaW5pdGlvbic7XG52YXIgSU5QVVRfVkFMVUVfREVGSU5JVElPTiA9IGV4cG9ydHMuSU5QVVRfVkFMVUVfREVGSU5JVElPTiA9ICdJbnB1dFZhbHVlRGVmaW5pdGlvbic7XG52YXIgSU5URVJGQUNFX1RZUEVfREVGSU5JVElPTiA9IGV4cG9ydHMuSU5URVJGQUNFX1RZUEVfREVGSU5JVElPTiA9ICdJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbic7XG52YXIgVU5JT05fVFlQRV9ERUZJTklUSU9OID0gZXhwb3J0cy5VTklPTl9UWVBFX0RFRklOSVRJT04gPSAnVW5pb25UeXBlRGVmaW5pdGlvbic7XG52YXIgRU5VTV9UWVBFX0RFRklOSVRJT04gPSBleHBvcnRzLkVOVU1fVFlQRV9ERUZJTklUSU9OID0gJ0VudW1UeXBlRGVmaW5pdGlvbic7XG52YXIgRU5VTV9WQUxVRV9ERUZJTklUSU9OID0gZXhwb3J0cy5FTlVNX1ZBTFVFX0RFRklOSVRJT04gPSAnRW51bVZhbHVlRGVmaW5pdGlvbic7XG52YXIgSU5QVVRfT0JKRUNUX1RZUEVfREVGSU5JVElPTiA9IGV4cG9ydHMuSU5QVVRfT0JKRUNUX1RZUEVfREVGSU5JVElPTiA9ICdJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uJztcblxuLy8gVHlwZSBFeHRlbnNpb25zXG5cbnZhciBUWVBFX0VYVEVOU0lPTl9ERUZJTklUSU9OID0gZXhwb3J0cy5UWVBFX0VYVEVOU0lPTl9ERUZJTklUSU9OID0gJ1R5cGVFeHRlbnNpb25EZWZpbml0aW9uJztcblxuLy8gRGlyZWN0aXZlIERlZmluaXRpb25zXG5cbnZhciBESVJFQ1RJVkVfREVGSU5JVElPTiA9IGV4cG9ydHMuRElSRUNUSVZFX0RFRklOSVRJT04gPSAnRGlyZWN0aXZlRGVmaW5pdGlvbic7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5Ub2tlbktpbmQgPSB1bmRlZmluZWQ7XG5leHBvcnRzLmNyZWF0ZUxleGVyID0gY3JlYXRlTGV4ZXI7XG5leHBvcnRzLmdldFRva2VuRGVzYyA9IGdldFRva2VuRGVzYztcblxudmFyIF9lcnJvciA9IHJlcXVpcmUoJy4uL2Vycm9yJyk7XG5cbi8qKlxuICogR2l2ZW4gYSBTb3VyY2Ugb2JqZWN0LCB0aGlzIHJldHVybnMgYSBMZXhlciBmb3IgdGhhdCBzb3VyY2UuXG4gKiBBIExleGVyIGlzIGEgc3RhdGVmdWwgc3RyZWFtIGdlbmVyYXRvciBpbiB0aGF0IGV2ZXJ5IHRpbWVcbiAqIGl0IGlzIGFkdmFuY2VkLCBpdCByZXR1cm5zIHRoZSBuZXh0IHRva2VuIGluIHRoZSBTb3VyY2UuIEFzc3VtaW5nIHRoZVxuICogc291cmNlIGxleGVzLCB0aGUgZmluYWwgVG9rZW4gZW1pdHRlZCBieSB0aGUgbGV4ZXIgd2lsbCBiZSBvZiBraW5kXG4gKiBFT0YsIGFmdGVyIHdoaWNoIHRoZSBsZXhlciB3aWxsIHJlcGVhdGVkbHkgcmV0dXJuIHRoZSBzYW1lIEVPRiB0b2tlblxuICogd2hlbmV2ZXIgY2FsbGVkLlxuICovXG5mdW5jdGlvbiBjcmVhdGVMZXhlcihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0T2ZGaWxlVG9rZW4gPSBuZXcgVG9rKFNPRiwgMCwgMCwgMCwgMCwgbnVsbCk7XG4gIHZhciBsZXhlciA9IHtcbiAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgIGxhc3RUb2tlbjogc3RhcnRPZkZpbGVUb2tlbixcbiAgICB0b2tlbjogc3RhcnRPZkZpbGVUb2tlbixcbiAgICBsaW5lOiAxLFxuICAgIGxpbmVTdGFydDogMCxcbiAgICBhZHZhbmNlOiBhZHZhbmNlTGV4ZXJcbiAgfTtcbiAgcmV0dXJuIGxleGVyO1xufSAvKiAgL1xuICAvKipcbiAgICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAgICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAqXG4gICAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAgICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICAgKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gICAqL1xuXG5mdW5jdGlvbiBhZHZhbmNlTGV4ZXIoKSB7XG4gIHZhciB0b2tlbiA9IHRoaXMubGFzdFRva2VuID0gdGhpcy50b2tlbjtcbiAgaWYgKHRva2VuLmtpbmQgIT09IEVPRikge1xuICAgIGRvIHtcbiAgICAgIHRva2VuID0gdG9rZW4ubmV4dCA9IHJlYWRUb2tlbih0aGlzLCB0b2tlbik7XG4gICAgfSB3aGlsZSAodG9rZW4ua2luZCA9PT0gQ09NTUVOVCk7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICB9XG4gIHJldHVybiB0b2tlbjtcbn1cblxuLyoqXG4gKiBUaGUgcmV0dXJuIHR5cGUgb2YgY3JlYXRlTGV4ZXIuXG4gKi9cblxuXG4vLyBFYWNoIGtpbmQgb2YgdG9rZW4uXG52YXIgU09GID0gJzxTT0Y+JztcbnZhciBFT0YgPSAnPEVPRj4nO1xudmFyIEJBTkcgPSAnISc7XG52YXIgRE9MTEFSID0gJyQnO1xudmFyIFBBUkVOX0wgPSAnKCc7XG52YXIgUEFSRU5fUiA9ICcpJztcbnZhciBTUFJFQUQgPSAnLi4uJztcbnZhciBDT0xPTiA9ICc6JztcbnZhciBFUVVBTFMgPSAnPSc7XG52YXIgQVQgPSAnQCc7XG52YXIgQlJBQ0tFVF9MID0gJ1snO1xudmFyIEJSQUNLRVRfUiA9ICddJztcbnZhciBCUkFDRV9MID0gJ3snO1xudmFyIFBJUEUgPSAnfCc7XG52YXIgQlJBQ0VfUiA9ICd9JztcbnZhciBOQU1FID0gJ05hbWUnO1xudmFyIElOVCA9ICdJbnQnO1xudmFyIEZMT0FUID0gJ0Zsb2F0JztcbnZhciBTVFJJTkcgPSAnU3RyaW5nJztcbnZhciBDT01NRU5UID0gJ0NvbW1lbnQnO1xuXG4vKipcbiAqIEFuIGV4cG9ydGVkIGVudW0gZGVzY3JpYmluZyB0aGUgZGlmZmVyZW50IGtpbmRzIG9mIHRva2VucyB0aGF0IHRoZVxuICogbGV4ZXIgZW1pdHMuXG4gKi9cbnZhciBUb2tlbktpbmQgPSBleHBvcnRzLlRva2VuS2luZCA9IHtcbiAgU09GOiBTT0YsXG4gIEVPRjogRU9GLFxuICBCQU5HOiBCQU5HLFxuICBET0xMQVI6IERPTExBUixcbiAgUEFSRU5fTDogUEFSRU5fTCxcbiAgUEFSRU5fUjogUEFSRU5fUixcbiAgU1BSRUFEOiBTUFJFQUQsXG4gIENPTE9OOiBDT0xPTixcbiAgRVFVQUxTOiBFUVVBTFMsXG4gIEFUOiBBVCxcbiAgQlJBQ0tFVF9MOiBCUkFDS0VUX0wsXG4gIEJSQUNLRVRfUjogQlJBQ0tFVF9SLFxuICBCUkFDRV9MOiBCUkFDRV9MLFxuICBQSVBFOiBQSVBFLFxuICBCUkFDRV9SOiBCUkFDRV9SLFxuICBOQU1FOiBOQU1FLFxuICBJTlQ6IElOVCxcbiAgRkxPQVQ6IEZMT0FULFxuICBTVFJJTkc6IFNUUklORyxcbiAgQ09NTUVOVDogQ09NTUVOVFxufTtcblxuLyoqXG4gKiBBIGhlbHBlciBmdW5jdGlvbiB0byBkZXNjcmliZSBhIHRva2VuIGFzIGEgc3RyaW5nIGZvciBkZWJ1Z2dpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0VG9rZW5EZXNjKHRva2VuKSB7XG4gIHZhciB2YWx1ZSA9IHRva2VuLnZhbHVlO1xuICByZXR1cm4gdmFsdWUgPyB0b2tlbi5raW5kICsgJyBcIicgKyB2YWx1ZSArICdcIicgOiB0b2tlbi5raW5kO1xufVxuXG52YXIgY2hhckNvZGVBdCA9IFN0cmluZy5wcm90b3R5cGUuY2hhckNvZGVBdDtcbnZhciBzbGljZSA9IFN0cmluZy5wcm90b3R5cGUuc2xpY2U7XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBjb25zdHJ1Y3RpbmcgdGhlIFRva2VuIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gVG9rKGtpbmQsIHN0YXJ0LCBlbmQsIGxpbmUsIGNvbHVtbiwgcHJldiwgdmFsdWUpIHtcbiAgdGhpcy5raW5kID0ga2luZDtcbiAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICB0aGlzLmVuZCA9IGVuZDtcbiAgdGhpcy5saW5lID0gbGluZTtcbiAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgdGhpcy5wcmV2ID0gcHJldjtcbiAgdGhpcy5uZXh0ID0gbnVsbDtcbn1cblxuLy8gUHJpbnQgYSBzaW1wbGlmaWVkIGZvcm0gd2hlbiBhcHBlYXJpbmcgaW4gSlNPTi91dGlsLmluc3BlY3QuXG5Ub2sucHJvdG90eXBlLnRvSlNPTiA9IFRvay5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiB0aGlzLmtpbmQsXG4gICAgdmFsdWU6IHRoaXMudmFsdWUsXG4gICAgbGluZTogdGhpcy5saW5lLFxuICAgIGNvbHVtbjogdGhpcy5jb2x1bW5cbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHByaW50Q2hhckNvZGUoY29kZSkge1xuICByZXR1cm4gKFxuICAgIC8vIE5hTi91bmRlZmluZWQgcmVwcmVzZW50cyBhY2Nlc3MgYmV5b25kIHRoZSBlbmQgb2YgdGhlIGZpbGUuXG4gICAgaXNOYU4oY29kZSkgPyBFT0YgOlxuICAgIC8vIFRydXN0IEpTT04gZm9yIEFTQ0lJLlxuICAgIGNvZGUgPCAweDAwN0YgPyBKU09OLnN0cmluZ2lmeShTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpKSA6XG4gICAgLy8gT3RoZXJ3aXNlIHByaW50IHRoZSBlc2NhcGVkIGZvcm0uXG4gICAgJ1wiXFxcXHUnICsgKCcwMCcgKyBjb2RlLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpKS5zbGljZSgtNCkgKyAnXCInXG4gICk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmV4dCB0b2tlbiBmcm9tIHRoZSBzb3VyY2Ugc3RhcnRpbmcgYXQgdGhlIGdpdmVuIHBvc2l0aW9uLlxuICpcbiAqIFRoaXMgc2tpcHMgb3ZlciB3aGl0ZXNwYWNlIGFuZCBjb21tZW50cyB1bnRpbCBpdCBmaW5kcyB0aGUgbmV4dCBsZXhhYmxlXG4gKiB0b2tlbiwgdGhlbiBsZXhlcyBwdW5jdHVhdG9ycyBpbW1lZGlhdGVseSBvciBjYWxscyB0aGUgYXBwcm9wcmlhdGUgaGVscGVyXG4gKiBmdW5jdGlvbiBmb3IgbW9yZSBjb21wbGljYXRlZCB0b2tlbnMuXG4gKi9cbmZ1bmN0aW9uIHJlYWRUb2tlbihsZXhlciwgcHJldikge1xuICB2YXIgc291cmNlID0gbGV4ZXIuc291cmNlO1xuICB2YXIgYm9keSA9IHNvdXJjZS5ib2R5O1xuICB2YXIgYm9keUxlbmd0aCA9IGJvZHkubGVuZ3RoO1xuXG4gIHZhciBwb3NpdGlvbiA9IHBvc2l0aW9uQWZ0ZXJXaGl0ZXNwYWNlKGJvZHksIHByZXYuZW5kLCBsZXhlcik7XG4gIHZhciBsaW5lID0gbGV4ZXIubGluZTtcbiAgdmFyIGNvbCA9IDEgKyBwb3NpdGlvbiAtIGxleGVyLmxpbmVTdGFydDtcblxuICBpZiAocG9zaXRpb24gPj0gYm9keUxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgVG9rKEVPRiwgYm9keUxlbmd0aCwgYm9keUxlbmd0aCwgbGluZSwgY29sLCBwcmV2KTtcbiAgfVxuXG4gIHZhciBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uKTtcblxuICAvLyBTb3VyY2VDaGFyYWN0ZXJcbiAgaWYgKGNvZGUgPCAweDAwMjAgJiYgY29kZSAhPT0gMHgwMDA5ICYmIGNvZGUgIT09IDB4MDAwQSAmJiBjb2RlICE9PSAweDAwMEQpIHtcbiAgICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnQ2Fubm90IGNvbnRhaW4gdGhlIGludmFsaWQgY2hhcmFjdGVyICcgKyBwcmludENoYXJDb2RlKGNvZGUpICsgJy4nKTtcbiAgfVxuXG4gIHN3aXRjaCAoY29kZSkge1xuICAgIC8vICFcbiAgICBjYXNlIDMzOlxuICAgICAgcmV0dXJuIG5ldyBUb2soQkFORywgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyAjXG4gICAgY2FzZSAzNTpcbiAgICAgIHJldHVybiByZWFkQ29tbWVudChzb3VyY2UsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vICRcbiAgICBjYXNlIDM2OlxuICAgICAgcmV0dXJuIG5ldyBUb2soRE9MTEFSLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIChcbiAgICBjYXNlIDQwOlxuICAgICAgcmV0dXJuIG5ldyBUb2soUEFSRU5fTCwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyApXG4gICAgY2FzZSA0MTpcbiAgICAgIHJldHVybiBuZXcgVG9rKFBBUkVOX1IsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gLlxuICAgIGNhc2UgNDY6XG4gICAgICBpZiAoY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uICsgMSkgPT09IDQ2ICYmIGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbiArIDIpID09PSA0Nikge1xuICAgICAgICByZXR1cm4gbmV3IFRvayhTUFJFQUQsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDMsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICAvLyA6XG4gICAgY2FzZSA1ODpcbiAgICAgIHJldHVybiBuZXcgVG9rKENPTE9OLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vID1cbiAgICBjYXNlIDYxOlxuICAgICAgcmV0dXJuIG5ldyBUb2soRVFVQUxTLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIEBcbiAgICBjYXNlIDY0OlxuICAgICAgcmV0dXJuIG5ldyBUb2soQVQsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gW1xuICAgIGNhc2UgOTE6XG4gICAgICByZXR1cm4gbmV3IFRvayhCUkFDS0VUX0wsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gXVxuICAgIGNhc2UgOTM6XG4gICAgICByZXR1cm4gbmV3IFRvayhCUkFDS0VUX1IsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8ge1xuICAgIGNhc2UgMTIzOlxuICAgICAgcmV0dXJuIG5ldyBUb2soQlJBQ0VfTCwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyB8XG4gICAgY2FzZSAxMjQ6XG4gICAgICByZXR1cm4gbmV3IFRvayhQSVBFLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIH1cbiAgICBjYXNlIDEyNTpcbiAgICAgIHJldHVybiBuZXcgVG9rKEJSQUNFX1IsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gQS1aIF8gYS16XG4gICAgY2FzZSA2NTpjYXNlIDY2OmNhc2UgNjc6Y2FzZSA2ODpjYXNlIDY5OmNhc2UgNzA6Y2FzZSA3MTpjYXNlIDcyOlxuICAgIGNhc2UgNzM6Y2FzZSA3NDpjYXNlIDc1OmNhc2UgNzY6Y2FzZSA3NzpjYXNlIDc4OmNhc2UgNzk6Y2FzZSA4MDpcbiAgICBjYXNlIDgxOmNhc2UgODI6Y2FzZSA4MzpjYXNlIDg0OmNhc2UgODU6Y2FzZSA4NjpjYXNlIDg3OmNhc2UgODg6XG4gICAgY2FzZSA4OTpjYXNlIDkwOlxuICAgIGNhc2UgOTU6XG4gICAgY2FzZSA5NzpjYXNlIDk4OmNhc2UgOTk6Y2FzZSAxMDA6Y2FzZSAxMDE6Y2FzZSAxMDI6Y2FzZSAxMDM6Y2FzZSAxMDQ6XG4gICAgY2FzZSAxMDU6Y2FzZSAxMDY6Y2FzZSAxMDc6Y2FzZSAxMDg6Y2FzZSAxMDk6Y2FzZSAxMTA6Y2FzZSAxMTE6XG4gICAgY2FzZSAxMTI6Y2FzZSAxMTM6Y2FzZSAxMTQ6Y2FzZSAxMTU6Y2FzZSAxMTY6Y2FzZSAxMTc6Y2FzZSAxMTg6XG4gICAgY2FzZSAxMTk6Y2FzZSAxMjA6Y2FzZSAxMjE6Y2FzZSAxMjI6XG4gICAgICByZXR1cm4gcmVhZE5hbWUoc291cmNlLCBwb3NpdGlvbiwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyAtIDAtOVxuICAgIGNhc2UgNDU6XG4gICAgY2FzZSA0ODpjYXNlIDQ5OmNhc2UgNTA6Y2FzZSA1MTpjYXNlIDUyOlxuICAgIGNhc2UgNTM6Y2FzZSA1NDpjYXNlIDU1OmNhc2UgNTY6Y2FzZSA1NzpcbiAgICAgIHJldHVybiByZWFkTnVtYmVyKHNvdXJjZSwgcG9zaXRpb24sIGNvZGUsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gXCJcbiAgICBjYXNlIDM0OlxuICAgICAgcmV0dXJuIHJlYWRTdHJpbmcoc291cmNlLCBwb3NpdGlvbiwgbGluZSwgY29sLCBwcmV2KTtcbiAgfVxuXG4gIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sIHVuZXhwZWN0ZWRDaGFyYWN0ZXJNZXNzYWdlKGNvZGUpKTtcbn1cblxuLyoqXG4gKiBSZXBvcnQgYSBtZXNzYWdlIHRoYXQgYW4gdW5leHBlY3RlZCBjaGFyYWN0ZXIgd2FzIGVuY291bnRlcmVkLlxuICovXG5mdW5jdGlvbiB1bmV4cGVjdGVkQ2hhcmFjdGVyTWVzc2FnZShjb2RlKSB7XG4gIGlmIChjb2RlID09PSAzOSkge1xuICAgIC8vICdcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgc2luZ2xlIHF1b3RlIGNoYXJhY3RlciAoXFwnKSwgZGlkIHlvdSBtZWFuIHRvIHVzZSAnICsgJ2EgZG91YmxlIHF1b3RlIChcIik/JztcbiAgfVxuXG4gIHJldHVybiAnQ2Fubm90IHBhcnNlIHRoZSB1bmV4cGVjdGVkIGNoYXJhY3RlciAnICsgcHJpbnRDaGFyQ29kZShjb2RlKSArICcuJztcbn1cblxuLyoqXG4gKiBSZWFkcyBmcm9tIGJvZHkgc3RhcnRpbmcgYXQgc3RhcnRQb3NpdGlvbiB1bnRpbCBpdCBmaW5kcyBhIG5vbi13aGl0ZXNwYWNlXG4gKiBvciBjb21tZW50ZWQgY2hhcmFjdGVyLCB0aGVuIHJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoYXQgY2hhcmFjdGVyIGZvclxuICogbGV4aW5nLlxuICovXG5mdW5jdGlvbiBwb3NpdGlvbkFmdGVyV2hpdGVzcGFjZShib2R5LCBzdGFydFBvc2l0aW9uLCBsZXhlcikge1xuICB2YXIgYm9keUxlbmd0aCA9IGJvZHkubGVuZ3RoO1xuICB2YXIgcG9zaXRpb24gPSBzdGFydFBvc2l0aW9uO1xuICB3aGlsZSAocG9zaXRpb24gPCBib2R5TGVuZ3RoKSB7XG4gICAgdmFyIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24pO1xuICAgIC8vIHRhYiB8IHNwYWNlIHwgY29tbWEgfCBCT01cbiAgICBpZiAoY29kZSA9PT0gOSB8fCBjb2RlID09PSAzMiB8fCBjb2RlID09PSA0NCB8fCBjb2RlID09PSAweEZFRkYpIHtcbiAgICAgICsrcG9zaXRpb247XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAxMCkge1xuICAgICAgLy8gbmV3IGxpbmVcbiAgICAgICsrcG9zaXRpb247XG4gICAgICArK2xleGVyLmxpbmU7XG4gICAgICBsZXhlci5saW5lU3RhcnQgPSBwb3NpdGlvbjtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDEzKSB7XG4gICAgICAvLyBjYXJyaWFnZSByZXR1cm5cbiAgICAgIGlmIChjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24gKyAxKSA9PT0gMTApIHtcbiAgICAgICAgcG9zaXRpb24gKz0gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICsrcG9zaXRpb247XG4gICAgICB9XG4gICAgICArK2xleGVyLmxpbmU7XG4gICAgICBsZXhlci5saW5lU3RhcnQgPSBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBwb3NpdGlvbjtcbn1cblxuLyoqXG4gKiBSZWFkcyBhIGNvbW1lbnQgdG9rZW4gZnJvbSB0aGUgc291cmNlIGZpbGUuXG4gKlxuICogI1tcXHUwMDA5XFx1MDAyMC1cXHVGRkZGXSpcbiAqL1xuZnVuY3Rpb24gcmVhZENvbW1lbnQoc291cmNlLCBzdGFydCwgbGluZSwgY29sLCBwcmV2KSB7XG4gIHZhciBib2R5ID0gc291cmNlLmJvZHk7XG4gIHZhciBjb2RlID0gdm9pZCAwO1xuICB2YXIgcG9zaXRpb24gPSBzdGFydDtcblxuICBkbyB7XG4gICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgfSB3aGlsZSAoY29kZSAhPT0gbnVsbCAmJiAoXG4gIC8vIFNvdXJjZUNoYXJhY3RlciBidXQgbm90IExpbmVUZXJtaW5hdG9yXG4gIGNvZGUgPiAweDAwMUYgfHwgY29kZSA9PT0gMHgwMDA5KSk7XG5cbiAgcmV0dXJuIG5ldyBUb2soQ09NTUVOVCwgc3RhcnQsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYsIHNsaWNlLmNhbGwoYm9keSwgc3RhcnQgKyAxLCBwb3NpdGlvbikpO1xufVxuXG4vKipcbiAqIFJlYWRzIGEgbnVtYmVyIHRva2VuIGZyb20gdGhlIHNvdXJjZSBmaWxlLCBlaXRoZXIgYSBmbG9hdFxuICogb3IgYW4gaW50IGRlcGVuZGluZyBvbiB3aGV0aGVyIGEgZGVjaW1hbCBwb2ludCBhcHBlYXJzLlxuICpcbiAqIEludDogICAtPygwfFsxLTldWzAtOV0qKVxuICogRmxvYXQ6IC0/KDB8WzEtOV1bMC05XSopKFxcLlswLTldKyk/KChFfGUpKCt8LSk/WzAtOV0rKT9cbiAqL1xuZnVuY3Rpb24gcmVhZE51bWJlcihzb3VyY2UsIHN0YXJ0LCBmaXJzdENvZGUsIGxpbmUsIGNvbCwgcHJldikge1xuICB2YXIgYm9keSA9IHNvdXJjZS5ib2R5O1xuICB2YXIgY29kZSA9IGZpcnN0Q29kZTtcbiAgdmFyIHBvc2l0aW9uID0gc3RhcnQ7XG4gIHZhciBpc0Zsb2F0ID0gZmFsc2U7XG5cbiAgaWYgKGNvZGUgPT09IDQ1KSB7XG4gICAgLy8gLVxuICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgKytwb3NpdGlvbik7XG4gIH1cblxuICBpZiAoY29kZSA9PT0gNDgpIHtcbiAgICAvLyAwXG4gICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgICBpZiAoY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3KSB7XG4gICAgICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnSW52YWxpZCBudW1iZXIsIHVuZXhwZWN0ZWQgZGlnaXQgYWZ0ZXIgMDogJyArIHByaW50Q2hhckNvZGUoY29kZSkgKyAnLicpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwb3NpdGlvbiA9IHJlYWREaWdpdHMoc291cmNlLCBwb3NpdGlvbiwgY29kZSk7XG4gICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbik7XG4gIH1cblxuICBpZiAoY29kZSA9PT0gNDYpIHtcbiAgICAvLyAuXG4gICAgaXNGbG9hdCA9IHRydWU7XG5cbiAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksICsrcG9zaXRpb24pO1xuICAgIHBvc2l0aW9uID0gcmVhZERpZ2l0cyhzb3VyY2UsIHBvc2l0aW9uLCBjb2RlKTtcbiAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChjb2RlID09PSA2OSB8fCBjb2RlID09PSAxMDEpIHtcbiAgICAvLyBFIGVcbiAgICBpc0Zsb2F0ID0gdHJ1ZTtcblxuICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgKytwb3NpdGlvbik7XG4gICAgaWYgKGNvZGUgPT09IDQzIHx8IGNvZGUgPT09IDQ1KSB7XG4gICAgICAvLyArIC1cbiAgICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgKytwb3NpdGlvbik7XG4gICAgfVxuICAgIHBvc2l0aW9uID0gcmVhZERpZ2l0cyhzb3VyY2UsIHBvc2l0aW9uLCBjb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVG9rKGlzRmxvYXQgPyBGTE9BVCA6IElOVCwgc3RhcnQsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYsIHNsaWNlLmNhbGwoYm9keSwgc3RhcnQsIHBvc2l0aW9uKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmV3IHBvc2l0aW9uIGluIHRoZSBzb3VyY2UgYWZ0ZXIgcmVhZGluZyBkaWdpdHMuXG4gKi9cbmZ1bmN0aW9uIHJlYWREaWdpdHMoc291cmNlLCBzdGFydCwgZmlyc3RDb2RlKSB7XG4gIHZhciBib2R5ID0gc291cmNlLmJvZHk7XG4gIHZhciBwb3NpdGlvbiA9IHN0YXJ0O1xuICB2YXIgY29kZSA9IGZpcnN0Q29kZTtcbiAgaWYgKGNvZGUgPj0gNDggJiYgY29kZSA8PSA1Nykge1xuICAgIC8vIDAgLSA5XG4gICAgZG8ge1xuICAgICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgICB9IHdoaWxlIChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpOyAvLyAwIC0gOVxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnSW52YWxpZCBudW1iZXIsIGV4cGVjdGVkIGRpZ2l0IGJ1dCBnb3Q6ICcgKyBwcmludENoYXJDb2RlKGNvZGUpICsgJy4nKTtcbn1cblxuLyoqXG4gKiBSZWFkcyBhIHN0cmluZyB0b2tlbiBmcm9tIHRoZSBzb3VyY2UgZmlsZS5cbiAqXG4gKiBcIihbXlwiXFxcXFxcdTAwMEFcXHUwMDBEXXwoXFxcXCh1WzAtOWEtZkEtRl17NH18W1wiXFxcXC9iZm5ydF0pKSkqXCJcbiAqL1xuZnVuY3Rpb24gcmVhZFN0cmluZyhzb3VyY2UsIHN0YXJ0LCBsaW5lLCBjb2wsIHByZXYpIHtcbiAgdmFyIGJvZHkgPSBzb3VyY2UuYm9keTtcbiAgdmFyIHBvc2l0aW9uID0gc3RhcnQgKyAxO1xuICB2YXIgY2h1bmtTdGFydCA9IHBvc2l0aW9uO1xuICB2YXIgY29kZSA9IDA7XG4gIHZhciB2YWx1ZSA9ICcnO1xuXG4gIHdoaWxlIChwb3NpdGlvbiA8IGJvZHkubGVuZ3RoICYmIChjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uKSkgIT09IG51bGwgJiZcbiAgLy8gbm90IExpbmVUZXJtaW5hdG9yXG4gIGNvZGUgIT09IDB4MDAwQSAmJiBjb2RlICE9PSAweDAwMEQgJiZcbiAgLy8gbm90IFF1b3RlIChcIilcbiAgY29kZSAhPT0gMzQpIHtcbiAgICAvLyBTb3VyY2VDaGFyYWN0ZXJcbiAgICBpZiAoY29kZSA8IDB4MDAyMCAmJiBjb2RlICE9PSAweDAwMDkpIHtcbiAgICAgIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sICdJbnZhbGlkIGNoYXJhY3RlciB3aXRoaW4gU3RyaW5nOiAnICsgcHJpbnRDaGFyQ29kZShjb2RlKSArICcuJyk7XG4gICAgfVxuXG4gICAgKytwb3NpdGlvbjtcbiAgICBpZiAoY29kZSA9PT0gOTIpIHtcbiAgICAgIC8vIFxcXG4gICAgICB2YWx1ZSArPSBzbGljZS5jYWxsKGJvZHksIGNodW5rU3RhcnQsIHBvc2l0aW9uIC0gMSk7XG4gICAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uKTtcbiAgICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICBjYXNlIDM0OlxuICAgICAgICAgIHZhbHVlICs9ICdcIic7YnJlYWs7XG4gICAgICAgIGNhc2UgNDc6XG4gICAgICAgICAgdmFsdWUgKz0gJy8nO2JyZWFrO1xuICAgICAgICBjYXNlIDkyOlxuICAgICAgICAgIHZhbHVlICs9ICdcXFxcJzticmVhaztcbiAgICAgICAgY2FzZSA5ODpcbiAgICAgICAgICB2YWx1ZSArPSAnXFxiJzticmVhaztcbiAgICAgICAgY2FzZSAxMDI6XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcZic7YnJlYWs7XG4gICAgICAgIGNhc2UgMTEwOlxuICAgICAgICAgIHZhbHVlICs9ICdcXG4nO2JyZWFrO1xuICAgICAgICBjYXNlIDExNDpcbiAgICAgICAgICB2YWx1ZSArPSAnXFxyJzticmVhaztcbiAgICAgICAgY2FzZSAxMTY6XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcdCc7YnJlYWs7XG4gICAgICAgIGNhc2UgMTE3OlxuICAgICAgICAgIC8vIHVcbiAgICAgICAgICB2YXIgY2hhckNvZGUgPSB1bmlDaGFyQ29kZShjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24gKyAxKSwgY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uICsgMiksIGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbiArIDMpLCBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24gKyA0KSk7XG4gICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikoc291cmNlLCBwb3NpdGlvbiwgJ0ludmFsaWQgY2hhcmFjdGVyIGVzY2FwZSBzZXF1ZW5jZTogJyArICgnXFxcXHUnICsgYm9keS5zbGljZShwb3NpdGlvbiArIDEsIHBvc2l0aW9uICsgNSkgKyAnLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyQ29kZSk7XG4gICAgICAgICAgcG9zaXRpb24gKz0gNDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnSW52YWxpZCBjaGFyYWN0ZXIgZXNjYXBlIHNlcXVlbmNlOiBcXFxcJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSkgKyAnLicpO1xuICAgICAgfVxuICAgICAgKytwb3NpdGlvbjtcbiAgICAgIGNodW5rU3RhcnQgPSBwb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBpZiAoY29kZSAhPT0gMzQpIHtcbiAgICAvLyBxdW90ZSAoXCIpXG4gICAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikoc291cmNlLCBwb3NpdGlvbiwgJ1VudGVybWluYXRlZCBzdHJpbmcuJyk7XG4gIH1cblxuICB2YWx1ZSArPSBzbGljZS5jYWxsKGJvZHksIGNodW5rU3RhcnQsIHBvc2l0aW9uKTtcbiAgcmV0dXJuIG5ldyBUb2soU1RSSU5HLCBzdGFydCwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBmb3VyIGhleGlkZWNpbWFsIGNoYXJzIHRvIHRoZSBpbnRlZ2VyIHRoYXQgdGhlXG4gKiBzdHJpbmcgcmVwcmVzZW50cy4gRm9yIGV4YW1wbGUsIHVuaUNoYXJDb2RlKCcwJywnMCcsJzAnLCdmJylcbiAqIHdpbGwgcmV0dXJuIDE1LCBhbmQgdW5pQ2hhckNvZGUoJzAnLCcwJywnZicsJ2YnKSByZXR1cm5zIDI1NS5cbiAqXG4gKiBSZXR1cm5zIGEgbmVnYXRpdmUgbnVtYmVyIG9uIGVycm9yLCBpZiBhIGNoYXIgd2FzIGludmFsaWQuXG4gKlxuICogVGhpcyBpcyBpbXBsZW1lbnRlZCBieSBub3RpbmcgdGhhdCBjaGFyMmhleCgpIHJldHVybnMgLTEgb24gZXJyb3IsXG4gKiB3aGljaCBtZWFucyB0aGUgcmVzdWx0IG9mIE9SaW5nIHRoZSBjaGFyMmhleCgpIHdpbGwgYWxzbyBiZSBuZWdhdGl2ZS5cbiAqL1xuZnVuY3Rpb24gdW5pQ2hhckNvZGUoYSwgYiwgYywgZCkge1xuICByZXR1cm4gY2hhcjJoZXgoYSkgPDwgMTIgfCBjaGFyMmhleChiKSA8PCA4IHwgY2hhcjJoZXgoYykgPDwgNCB8IGNoYXIyaGV4KGQpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgaGV4IGNoYXJhY3RlciB0byBpdHMgaW50ZWdlciB2YWx1ZS5cbiAqICcwJyBiZWNvbWVzIDAsICc5JyBiZWNvbWVzIDlcbiAqICdBJyBiZWNvbWVzIDEwLCAnRicgYmVjb21lcyAxNVxuICogJ2EnIGJlY29tZXMgMTAsICdmJyBiZWNvbWVzIDE1XG4gKlxuICogUmV0dXJucyAtMSBvbiBlcnJvci5cbiAqL1xuZnVuY3Rpb24gY2hhcjJoZXgoYSkge1xuICByZXR1cm4gYSA+PSA0OCAmJiBhIDw9IDU3ID8gYSAtIDQ4IDogLy8gMC05XG4gIGEgPj0gNjUgJiYgYSA8PSA3MCA/IGEgLSA1NSA6IC8vIEEtRlxuICBhID49IDk3ICYmIGEgPD0gMTAyID8gYSAtIDg3IDogLy8gYS1mXG4gIC0xO1xufVxuXG4vKipcbiAqIFJlYWRzIGFuIGFscGhhbnVtZXJpYyArIHVuZGVyc2NvcmUgbmFtZSBmcm9tIHRoZSBzb3VyY2UuXG4gKlxuICogW19BLVphLXpdW18wLTlBLVphLXpdKlxuICovXG5mdW5jdGlvbiByZWFkTmFtZShzb3VyY2UsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYpIHtcbiAgdmFyIGJvZHkgPSBzb3VyY2UuYm9keTtcbiAgdmFyIGJvZHlMZW5ndGggPSBib2R5Lmxlbmd0aDtcbiAgdmFyIGVuZCA9IHBvc2l0aW9uICsgMTtcbiAgdmFyIGNvZGUgPSAwO1xuICB3aGlsZSAoZW5kICE9PSBib2R5TGVuZ3RoICYmIChjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIGVuZCkpICE9PSBudWxsICYmIChjb2RlID09PSA5NSB8fCAvLyBfXG4gIGNvZGUgPj0gNDggJiYgY29kZSA8PSA1NyB8fCAvLyAwLTlcbiAgY29kZSA+PSA2NSAmJiBjb2RlIDw9IDkwIHx8IC8vIEEtWlxuICBjb2RlID49IDk3ICYmIGNvZGUgPD0gMTIyIC8vIGEtelxuICApKSB7XG4gICAgKytlbmQ7XG4gIH1cbiAgcmV0dXJuIG5ldyBUb2soTkFNRSwgcG9zaXRpb24sIGVuZCwgbGluZSwgY29sLCBwcmV2LCBzbGljZS5jYWxsKGJvZHksIHBvc2l0aW9uLCBlbmQpKTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XG5cblxuLyoqXG4gKiBUYWtlcyBhIFNvdXJjZSBhbmQgYSBVVEYtOCBjaGFyYWN0ZXIgb2Zmc2V0LCBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZ1xuICogbGluZSBhbmQgY29sdW1uIGFzIGEgU291cmNlTG9jYXRpb24uXG4gKi9cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIGdldExvY2F0aW9uKHNvdXJjZSwgcG9zaXRpb24pIHtcbiAgdmFyIGxpbmVSZWdleHAgPSAvXFxyXFxufFtcXG5cXHJdL2c7XG4gIHZhciBsaW5lID0gMTtcbiAgdmFyIGNvbHVtbiA9IHBvc2l0aW9uICsgMTtcbiAgdmFyIG1hdGNoID0gdm9pZCAwO1xuICB3aGlsZSAoKG1hdGNoID0gbGluZVJlZ2V4cC5leGVjKHNvdXJjZS5ib2R5KSkgJiYgbWF0Y2guaW5kZXggPCBwb3NpdGlvbikge1xuICAgIGxpbmUgKz0gMTtcbiAgICBjb2x1bW4gPSBwb3NpdGlvbiArIDEgLSAobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuICB9XG4gIHJldHVybiB7IGxpbmU6IGxpbmUsIGNvbHVtbjogY29sdW1uIH07XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxvY2F0aW9uIGluIGEgU291cmNlLlxuICovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuZXhwb3J0cy5wYXJzZVZhbHVlID0gcGFyc2VWYWx1ZTtcbmV4cG9ydHMucGFyc2VUeXBlID0gcGFyc2VUeXBlO1xuZXhwb3J0cy5wYXJzZUNvbnN0VmFsdWUgPSBwYXJzZUNvbnN0VmFsdWU7XG5leHBvcnRzLnBhcnNlVHlwZVJlZmVyZW5jZSA9IHBhcnNlVHlwZVJlZmVyZW5jZTtcbmV4cG9ydHMucGFyc2VOYW1lZFR5cGUgPSBwYXJzZU5hbWVkVHlwZTtcblxudmFyIF9zb3VyY2UgPSByZXF1aXJlKCcuL3NvdXJjZScpO1xuXG52YXIgX2Vycm9yID0gcmVxdWlyZSgnLi4vZXJyb3InKTtcblxudmFyIF9sZXhlciA9IHJlcXVpcmUoJy4vbGV4ZXInKTtcblxudmFyIF9raW5kcyA9IHJlcXVpcmUoJy4va2luZHMnKTtcblxuLyoqXG4gKiBHaXZlbiBhIEdyYXBoUUwgc291cmNlLCBwYXJzZXMgaXQgaW50byBhIERvY3VtZW50LlxuICogVGhyb3dzIEdyYXBoUUxFcnJvciBpZiBhIHN5bnRheCBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAqL1xuXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvcHRpb25zIHRvIGNvbnRyb2wgcGFyc2VyIGJlaGF2aW9yXG4gKi9cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHNvdXJjZSwgb3B0aW9ucykge1xuICB2YXIgc291cmNlT2JqID0gdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycgPyBuZXcgX3NvdXJjZS5Tb3VyY2Uoc291cmNlKSA6IHNvdXJjZTtcbiAgdmFyIGxleGVyID0gKDAsIF9sZXhlci5jcmVhdGVMZXhlcikoc291cmNlT2JqLCBvcHRpb25zIHx8IHt9KTtcbiAgcmV0dXJuIHBhcnNlRG9jdW1lbnQobGV4ZXIpO1xufVxuXG4vKipcbiAqIEdpdmVuIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBHcmFwaFFMIHZhbHVlIChleC4gYFs0Ml1gKSwgcGFyc2UgdGhlIEFTVCBmb3JcbiAqIHRoYXQgdmFsdWUuXG4gKiBUaHJvd3MgR3JhcGhRTEVycm9yIGlmIGEgc3ludGF4IGVycm9yIGlzIGVuY291bnRlcmVkLlxuICpcbiAqIFRoaXMgaXMgdXNlZnVsIHdpdGhpbiB0b29scyB0aGF0IG9wZXJhdGUgdXBvbiBHcmFwaFFMIFZhbHVlcyBkaXJlY3RseSBhbmRcbiAqIGluIGlzb2xhdGlvbiBvZiBjb21wbGV0ZSBHcmFwaFFMIGRvY3VtZW50cy5cbiAqXG4gKiBDb25zaWRlciBwcm92aWRpbmcgdGhlIHJlc3VsdHMgdG8gdGhlIHV0aWxpdHkgZnVuY3Rpb246IHZhbHVlRnJvbUFTVCgpLlxuICovXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHNvdXJjZSwgb3B0aW9ucykge1xuICB2YXIgc291cmNlT2JqID0gdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycgPyBuZXcgX3NvdXJjZS5Tb3VyY2Uoc291cmNlKSA6IHNvdXJjZTtcbiAgdmFyIGxleGVyID0gKDAsIF9sZXhlci5jcmVhdGVMZXhlcikoc291cmNlT2JqLCBvcHRpb25zIHx8IHt9KTtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlNPRik7XG4gIHZhciB2YWx1ZSA9IHBhcnNlVmFsdWVMaXRlcmFsKGxleGVyLCBmYWxzZSk7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FT0YpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbi8qKlxuICogR2l2ZW4gYSBzdHJpbmcgY29udGFpbmluZyBhIEdyYXBoUUwgVHlwZSAoZXguIGBbSW50IV1gKSwgcGFyc2UgdGhlIEFTVCBmb3JcbiAqIHRoYXQgdHlwZS5cbiAqIFRocm93cyBHcmFwaFFMRXJyb3IgaWYgYSBzeW50YXggZXJyb3IgaXMgZW5jb3VudGVyZWQuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgd2l0aGluIHRvb2xzIHRoYXQgb3BlcmF0ZSB1cG9uIEdyYXBoUUwgVHlwZXMgZGlyZWN0bHkgYW5kXG4gKiBpbiBpc29sYXRpb24gb2YgY29tcGxldGUgR3JhcGhRTCBkb2N1bWVudHMuXG4gKlxuICogQ29uc2lkZXIgcHJvdmlkaW5nIHRoZSByZXN1bHRzIHRvIHRoZSB1dGlsaXR5IGZ1bmN0aW9uOiB0eXBlRnJvbUFTVCgpLlxuICovXG5mdW5jdGlvbiBwYXJzZVR5cGUoc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2VPYmogPSB0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyA/IG5ldyBfc291cmNlLlNvdXJjZShzb3VyY2UpIDogc291cmNlO1xuICB2YXIgbGV4ZXIgPSAoMCwgX2xleGVyLmNyZWF0ZUxleGVyKShzb3VyY2VPYmosIG9wdGlvbnMgfHwge30pO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuU09GKTtcbiAgdmFyIHR5cGUgPSBwYXJzZVR5cGVSZWZlcmVuY2UobGV4ZXIpO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuRU9GKTtcbiAgcmV0dXJuIHR5cGU7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBuYW1lIGxleCB0b2tlbiBpbnRvIGEgbmFtZSBwYXJzZSBub2RlLlxuICovXG5mdW5jdGlvbiBwYXJzZU5hbWUobGV4ZXIpIHtcbiAgdmFyIHRva2VuID0gZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5OQU1FLFxuICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICBsb2M6IGxvYyhsZXhlciwgdG9rZW4pXG4gIH07XG59XG5cbi8vIEltcGxlbWVudHMgdGhlIHBhcnNpbmcgcnVsZXMgaW4gdGhlIERvY3VtZW50IHNlY3Rpb24uXG5cbi8qKlxuICogRG9jdW1lbnQgOiBEZWZpbml0aW9uK1xuICovXG5mdW5jdGlvbiBwYXJzZURvY3VtZW50KGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuU09GKTtcbiAgdmFyIGRlZmluaXRpb25zID0gW107XG4gIGRvIHtcbiAgICBkZWZpbml0aW9ucy5wdXNoKHBhcnNlRGVmaW5pdGlvbihsZXhlcikpO1xuICB9IHdoaWxlICghc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FT0YpKTtcblxuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5ET0NVTUVOVCxcbiAgICBkZWZpbml0aW9uczogZGVmaW5pdGlvbnMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIERlZmluaXRpb24gOlxuICogICAtIE9wZXJhdGlvbkRlZmluaXRpb25cbiAqICAgLSBGcmFnbWVudERlZmluaXRpb25cbiAqICAgLSBUeXBlU3lzdGVtRGVmaW5pdGlvblxuICovXG5mdW5jdGlvbiBwYXJzZURlZmluaXRpb24obGV4ZXIpIHtcbiAgaWYgKHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCkpIHtcbiAgICByZXR1cm4gcGFyc2VPcGVyYXRpb25EZWZpbml0aW9uKGxleGVyKTtcbiAgfVxuXG4gIGlmIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpKSB7XG4gICAgc3dpdGNoIChsZXhlci50b2tlbi52YWx1ZSkge1xuICAgICAgLy8gTm90ZTogc3Vic2NyaXB0aW9uIGlzIGFuIGV4cGVyaW1lbnRhbCBub24tc3BlYyBhZGRpdGlvbi5cbiAgICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgIGNhc2UgJ211dGF0aW9uJzpcbiAgICAgIGNhc2UgJ3N1YnNjcmlwdGlvbic6XG4gICAgICAgIHJldHVybiBwYXJzZU9wZXJhdGlvbkRlZmluaXRpb24obGV4ZXIpO1xuXG4gICAgICBjYXNlICdmcmFnbWVudCc6XG4gICAgICAgIHJldHVybiBwYXJzZUZyYWdtZW50RGVmaW5pdGlvbihsZXhlcik7XG5cbiAgICAgIC8vIE5vdGU6IHRoZSBUeXBlIFN5c3RlbSBJREwgaXMgYW4gZXhwZXJpbWVudGFsIG5vbi1zcGVjIGFkZGl0aW9uLlxuICAgICAgY2FzZSAnc2NoZW1hJzpcbiAgICAgIGNhc2UgJ3NjYWxhcic6XG4gICAgICBjYXNlICd0eXBlJzpcbiAgICAgIGNhc2UgJ2ludGVyZmFjZSc6XG4gICAgICBjYXNlICd1bmlvbic6XG4gICAgICBjYXNlICdlbnVtJzpcbiAgICAgIGNhc2UgJ2lucHV0JzpcbiAgICAgIGNhc2UgJ2V4dGVuZCc6XG4gICAgICBjYXNlICdkaXJlY3RpdmUnOlxuICAgICAgICByZXR1cm4gcGFyc2VUeXBlU3lzdGVtRGVmaW5pdGlvbihsZXhlcik7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgdW5leHBlY3RlZChsZXhlcik7XG59XG5cbi8vIEltcGxlbWVudHMgdGhlIHBhcnNpbmcgcnVsZXMgaW4gdGhlIE9wZXJhdGlvbnMgc2VjdGlvbi5cblxuLyoqXG4gKiBPcGVyYXRpb25EZWZpbml0aW9uIDpcbiAqICAtIFNlbGVjdGlvblNldFxuICogIC0gT3BlcmF0aW9uVHlwZSBOYW1lPyBWYXJpYWJsZURlZmluaXRpb25zPyBEaXJlY3RpdmVzPyBTZWxlY3Rpb25TZXRcbiAqL1xuZnVuY3Rpb24gcGFyc2VPcGVyYXRpb25EZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBpZiAocGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MKSkge1xuICAgIHJldHVybiB7XG4gICAgICBraW5kOiBfa2luZHMuT1BFUkFUSU9OX0RFRklOSVRJT04sXG4gICAgICBvcGVyYXRpb246ICdxdWVyeScsXG4gICAgICBuYW1lOiBudWxsLFxuICAgICAgdmFyaWFibGVEZWZpbml0aW9uczogbnVsbCxcbiAgICAgIGRpcmVjdGl2ZXM6IFtdLFxuICAgICAgc2VsZWN0aW9uU2V0OiBwYXJzZVNlbGVjdGlvblNldChsZXhlciksXG4gICAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gICAgfTtcbiAgfVxuICB2YXIgb3BlcmF0aW9uID0gcGFyc2VPcGVyYXRpb25UeXBlKGxleGVyKTtcbiAgdmFyIG5hbWUgPSB2b2lkIDA7XG4gIGlmIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpKSB7XG4gICAgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuT1BFUkFUSU9OX0RFRklOSVRJT04sXG4gICAgb3BlcmF0aW9uOiBvcGVyYXRpb24sXG4gICAgbmFtZTogbmFtZSxcbiAgICB2YXJpYWJsZURlZmluaXRpb25zOiBwYXJzZVZhcmlhYmxlRGVmaW5pdGlvbnMobGV4ZXIpLFxuICAgIGRpcmVjdGl2ZXM6IHBhcnNlRGlyZWN0aXZlcyhsZXhlciksXG4gICAgc2VsZWN0aW9uU2V0OiBwYXJzZVNlbGVjdGlvblNldChsZXhlciksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIE9wZXJhdGlvblR5cGUgOiBvbmUgb2YgcXVlcnkgbXV0YXRpb24gc3Vic2NyaXB0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlT3BlcmF0aW9uVHlwZShsZXhlcikge1xuICB2YXIgb3BlcmF0aW9uVG9rZW4gPSBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSk7XG4gIHN3aXRjaCAob3BlcmF0aW9uVG9rZW4udmFsdWUpIHtcbiAgICBjYXNlICdxdWVyeSc6XG4gICAgICByZXR1cm4gJ3F1ZXJ5JztcbiAgICBjYXNlICdtdXRhdGlvbic6XG4gICAgICByZXR1cm4gJ211dGF0aW9uJztcbiAgICAvLyBOb3RlOiBzdWJzY3JpcHRpb24gaXMgYW4gZXhwZXJpbWVudGFsIG5vbi1zcGVjIGFkZGl0aW9uLlxuICAgIGNhc2UgJ3N1YnNjcmlwdGlvbic6XG4gICAgICByZXR1cm4gJ3N1YnNjcmlwdGlvbic7XG4gIH1cblxuICB0aHJvdyB1bmV4cGVjdGVkKGxleGVyLCBvcGVyYXRpb25Ub2tlbik7XG59XG5cbi8qKlxuICogVmFyaWFibGVEZWZpbml0aW9ucyA6ICggVmFyaWFibGVEZWZpbml0aW9uKyApXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFyaWFibGVEZWZpbml0aW9ucyhsZXhlcikge1xuICByZXR1cm4gcGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9MKSA/IG1hbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fTCwgcGFyc2VWYXJpYWJsZURlZmluaXRpb24sIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fUikgOiBbXTtcbn1cblxuLyoqXG4gKiBWYXJpYWJsZURlZmluaXRpb24gOiBWYXJpYWJsZSA6IFR5cGUgRGVmYXVsdFZhbHVlP1xuICovXG5mdW5jdGlvbiBwYXJzZVZhcmlhYmxlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuVkFSSUFCTEVfREVGSU5JVElPTixcbiAgICB2YXJpYWJsZTogcGFyc2VWYXJpYWJsZShsZXhlciksXG4gICAgdHlwZTogKGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTiksIHBhcnNlVHlwZVJlZmVyZW5jZShsZXhlcikpLFxuICAgIGRlZmF1bHRWYWx1ZTogc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FUVVBTFMpID8gcGFyc2VWYWx1ZUxpdGVyYWwobGV4ZXIsIHRydWUpIDogbnVsbCxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogVmFyaWFibGUgOiAkIE5hbWVcbiAqL1xuZnVuY3Rpb24gcGFyc2VWYXJpYWJsZShsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkRPTExBUik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLlZBUklBQkxFLFxuICAgIG5hbWU6IHBhcnNlTmFtZShsZXhlciksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdGlvblNldCA6IHsgU2VsZWN0aW9uKyB9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlU2VsZWN0aW9uU2V0KGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5TRUxFQ1RJT05fU0VULFxuICAgIHNlbGVjdGlvbnM6IG1hbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCwgcGFyc2VTZWxlY3Rpb24sIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfUiksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIFNlbGVjdGlvbiA6XG4gKiAgIC0gRmllbGRcbiAqICAgLSBGcmFnbWVudFNwcmVhZFxuICogICAtIElubGluZUZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIHBhcnNlU2VsZWN0aW9uKGxleGVyKSB7XG4gIHJldHVybiBwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlNQUkVBRCkgPyBwYXJzZUZyYWdtZW50KGxleGVyKSA6IHBhcnNlRmllbGQobGV4ZXIpO1xufVxuXG4vKipcbiAqIEZpZWxkIDogQWxpYXM/IE5hbWUgQXJndW1lbnRzPyBEaXJlY3RpdmVzPyBTZWxlY3Rpb25TZXQ/XG4gKlxuICogQWxpYXMgOiBOYW1lIDpcbiAqL1xuZnVuY3Rpb24gcGFyc2VGaWVsZChsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcblxuICB2YXIgbmFtZU9yQWxpYXMgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgYWxpYXMgPSB2b2lkIDA7XG4gIHZhciBuYW1lID0gdm9pZCAwO1xuICBpZiAoc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTikpIHtcbiAgICBhbGlhcyA9IG5hbWVPckFsaWFzO1xuICAgIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB9IGVsc2Uge1xuICAgIGFsaWFzID0gbnVsbDtcbiAgICBuYW1lID0gbmFtZU9yQWxpYXM7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5GSUVMRCxcbiAgICBhbGlhczogYWxpYXMsXG4gICAgbmFtZTogbmFtZSxcbiAgICBhcmd1bWVudHM6IHBhcnNlQXJndW1lbnRzKGxleGVyKSxcbiAgICBkaXJlY3RpdmVzOiBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpLFxuICAgIHNlbGVjdGlvblNldDogcGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MKSA/IHBhcnNlU2VsZWN0aW9uU2V0KGxleGVyKSA6IG51bGwsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEFyZ3VtZW50cyA6ICggQXJndW1lbnQrIClcbiAqL1xuZnVuY3Rpb24gcGFyc2VBcmd1bWVudHMobGV4ZXIpIHtcbiAgcmV0dXJuIHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fTCkgPyBtYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBBUkVOX0wsIHBhcnNlQXJndW1lbnQsIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fUikgOiBbXTtcbn1cblxuLyoqXG4gKiBBcmd1bWVudCA6IE5hbWUgOiBWYWx1ZVxuICovXG5mdW5jdGlvbiBwYXJzZUFyZ3VtZW50KGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5BUkdVTUVOVCxcbiAgICBuYW1lOiBwYXJzZU5hbWUobGV4ZXIpLFxuICAgIHZhbHVlOiAoZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkNPTE9OKSwgcGFyc2VWYWx1ZUxpdGVyYWwobGV4ZXIsIGZhbHNlKSksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vLyBJbXBsZW1lbnRzIHRoZSBwYXJzaW5nIHJ1bGVzIGluIHRoZSBGcmFnbWVudHMgc2VjdGlvbi5cblxuLyoqXG4gKiBDb3JyZXNwb25kcyB0byBib3RoIEZyYWdtZW50U3ByZWFkIGFuZCBJbmxpbmVGcmFnbWVudCBpbiB0aGUgc3BlYy5cbiAqXG4gKiBGcmFnbWVudFNwcmVhZCA6IC4uLiBGcmFnbWVudE5hbWUgRGlyZWN0aXZlcz9cbiAqXG4gKiBJbmxpbmVGcmFnbWVudCA6IC4uLiBUeXBlQ29uZGl0aW9uPyBEaXJlY3RpdmVzPyBTZWxlY3Rpb25TZXRcbiAqL1xuZnVuY3Rpb24gcGFyc2VGcmFnbWVudChsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlNQUkVBRCk7XG4gIGlmIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpICYmIGxleGVyLnRva2VuLnZhbHVlICE9PSAnb24nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtpbmQ6IF9raW5kcy5GUkFHTUVOVF9TUFJFQUQsXG4gICAgICBuYW1lOiBwYXJzZUZyYWdtZW50TmFtZShsZXhlciksXG4gICAgICBkaXJlY3RpdmVzOiBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpLFxuICAgICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICAgIH07XG4gIH1cbiAgdmFyIHR5cGVDb25kaXRpb24gPSBudWxsO1xuICBpZiAobGV4ZXIudG9rZW4udmFsdWUgPT09ICdvbicpIHtcbiAgICBsZXhlci5hZHZhbmNlKCk7XG4gICAgdHlwZUNvbmRpdGlvbiA9IHBhcnNlTmFtZWRUeXBlKGxleGVyKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5JTkxJTkVfRlJBR01FTlQsXG4gICAgdHlwZUNvbmRpdGlvbjogdHlwZUNvbmRpdGlvbixcbiAgICBkaXJlY3RpdmVzOiBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpLFxuICAgIHNlbGVjdGlvblNldDogcGFyc2VTZWxlY3Rpb25TZXQobGV4ZXIpLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBGcmFnbWVudERlZmluaXRpb24gOlxuICogICAtIGZyYWdtZW50IEZyYWdtZW50TmFtZSBvbiBUeXBlQ29uZGl0aW9uIERpcmVjdGl2ZXM/IFNlbGVjdGlvblNldFxuICpcbiAqIFR5cGVDb25kaXRpb24gOiBOYW1lZFR5cGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VGcmFnbWVudERlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdEtleXdvcmQobGV4ZXIsICdmcmFnbWVudCcpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5GUkFHTUVOVF9ERUZJTklUSU9OLFxuICAgIG5hbWU6IHBhcnNlRnJhZ21lbnROYW1lKGxleGVyKSxcbiAgICB0eXBlQ29uZGl0aW9uOiAoZXhwZWN0S2V5d29yZChsZXhlciwgJ29uJyksIHBhcnNlTmFtZWRUeXBlKGxleGVyKSksXG4gICAgZGlyZWN0aXZlczogcGFyc2VEaXJlY3RpdmVzKGxleGVyKSxcbiAgICBzZWxlY3Rpb25TZXQ6IHBhcnNlU2VsZWN0aW9uU2V0KGxleGVyKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogRnJhZ21lbnROYW1lIDogTmFtZSBidXQgbm90IGBvbmBcbiAqL1xuZnVuY3Rpb24gcGFyc2VGcmFnbWVudE5hbWUobGV4ZXIpIHtcbiAgaWYgKGxleGVyLnRva2VuLnZhbHVlID09PSAnb24nKSB7XG4gICAgdGhyb3cgdW5leHBlY3RlZChsZXhlcik7XG4gIH1cbiAgcmV0dXJuIHBhcnNlTmFtZShsZXhlcik7XG59XG5cbi8vIEltcGxlbWVudHMgdGhlIHBhcnNpbmcgcnVsZXMgaW4gdGhlIFZhbHVlcyBzZWN0aW9uLlxuXG4vKipcbiAqIFZhbHVlW0NvbnN0XSA6XG4gKiAgIC0gW35Db25zdF0gVmFyaWFibGVcbiAqICAgLSBJbnRWYWx1ZVxuICogICAtIEZsb2F0VmFsdWVcbiAqICAgLSBTdHJpbmdWYWx1ZVxuICogICAtIEJvb2xlYW5WYWx1ZVxuICogICAtIE51bGxWYWx1ZVxuICogICAtIEVudW1WYWx1ZVxuICogICAtIExpc3RWYWx1ZVs/Q29uc3RdXG4gKiAgIC0gT2JqZWN0VmFsdWVbP0NvbnN0XVxuICpcbiAqIEJvb2xlYW5WYWx1ZSA6IG9uZSBvZiBgdHJ1ZWAgYGZhbHNlYFxuICpcbiAqIE51bGxWYWx1ZSA6IGBudWxsYFxuICpcbiAqIEVudW1WYWx1ZSA6IE5hbWUgYnV0IG5vdCBgdHJ1ZWAsIGBmYWxzZWAgb3IgYG51bGxgXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFsdWVMaXRlcmFsKGxleGVyLCBpc0NvbnN0KSB7XG4gIHZhciB0b2tlbiA9IGxleGVyLnRva2VuO1xuICBzd2l0Y2ggKHRva2VuLmtpbmQpIHtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0tFVF9MOlxuICAgICAgcmV0dXJuIHBhcnNlTGlzdChsZXhlciwgaXNDb25zdCk7XG4gICAgY2FzZSBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0w6XG4gICAgICByZXR1cm4gcGFyc2VPYmplY3QobGV4ZXIsIGlzQ29uc3QpO1xuICAgIGNhc2UgX2xleGVyLlRva2VuS2luZC5JTlQ6XG4gICAgICBsZXhlci5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBfa2luZHMuSU5ULFxuICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUsXG4gICAgICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgICAgIH07XG4gICAgY2FzZSBfbGV4ZXIuVG9rZW5LaW5kLkZMT0FUOlxuICAgICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogX2tpbmRzLkZMT0FULFxuICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUsXG4gICAgICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgICAgIH07XG4gICAgY2FzZSBfbGV4ZXIuVG9rZW5LaW5kLlNUUklORzpcbiAgICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IF9raW5kcy5TVFJJTkcsXG4gICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgbG9jOiBsb2MobGV4ZXIsIHRva2VuKVxuICAgICAgfTtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuTkFNRTpcbiAgICAgIGlmICh0b2tlbi52YWx1ZSA9PT0gJ3RydWUnIHx8IHRva2VuLnZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBraW5kOiBfa2luZHMuQk9PTEVBTixcbiAgICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUgPT09ICd0cnVlJyxcbiAgICAgICAgICBsb2M6IGxvYyhsZXhlciwgdG9rZW4pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnZhbHVlID09PSAnbnVsbCcpIHtcbiAgICAgICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtpbmQ6IF9raW5kcy5OVUxMLFxuICAgICAgICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IF9raW5kcy5FTlVNLFxuICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWUsXG4gICAgICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgICAgIH07XG4gICAgY2FzZSBfbGV4ZXIuVG9rZW5LaW5kLkRPTExBUjpcbiAgICAgIGlmICghaXNDb25zdCkge1xuICAgICAgICByZXR1cm4gcGFyc2VWYXJpYWJsZShsZXhlcik7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICB0aHJvdyB1bmV4cGVjdGVkKGxleGVyKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb25zdFZhbHVlKGxleGVyKSB7XG4gIHJldHVybiBwYXJzZVZhbHVlTGl0ZXJhbChsZXhlciwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVmFsdWVWYWx1ZShsZXhlcikge1xuICByZXR1cm4gcGFyc2VWYWx1ZUxpdGVyYWwobGV4ZXIsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBMaXN0VmFsdWVbQ29uc3RdIDpcbiAqICAgLSBbIF1cbiAqICAgLSBbIFZhbHVlWz9Db25zdF0rIF1cbiAqL1xuZnVuY3Rpb24gcGFyc2VMaXN0KGxleGVyLCBpc0NvbnN0KSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICB2YXIgaXRlbSA9IGlzQ29uc3QgPyBwYXJzZUNvbnN0VmFsdWUgOiBwYXJzZVZhbHVlVmFsdWU7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkxJU1QsXG4gICAgdmFsdWVzOiBhbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0tFVF9MLCBpdGVtLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNLRVRfUiksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIE9iamVjdFZhbHVlW0NvbnN0XSA6XG4gKiAgIC0geyB9XG4gKiAgIC0geyBPYmplY3RGaWVsZFs/Q29uc3RdKyB9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlT2JqZWN0KGxleGVyLCBpc0NvbnN0KSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCk7XG4gIHZhciBmaWVsZHMgPSBbXTtcbiAgd2hpbGUgKCFza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX1IpKSB7XG4gICAgZmllbGRzLnB1c2gocGFyc2VPYmplY3RGaWVsZChsZXhlciwgaXNDb25zdCkpO1xuICB9XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLk9CSkVDVCxcbiAgICBmaWVsZHM6IGZpZWxkcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogT2JqZWN0RmllbGRbQ29uc3RdIDogTmFtZSA6IFZhbHVlWz9Db25zdF1cbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmplY3RGaWVsZChsZXhlciwgaXNDb25zdCkge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuT0JKRUNUX0ZJRUxELFxuICAgIG5hbWU6IHBhcnNlTmFtZShsZXhlciksXG4gICAgdmFsdWU6IChleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQ09MT04pLCBwYXJzZVZhbHVlTGl0ZXJhbChsZXhlciwgaXNDb25zdCkpLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgcGFyc2luZyBydWxlcyBpbiB0aGUgRGlyZWN0aXZlcyBzZWN0aW9uLlxuXG4vKipcbiAqIERpcmVjdGl2ZXMgOiBEaXJlY3RpdmUrXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGlyZWN0aXZlcyhsZXhlcikge1xuICB2YXIgZGlyZWN0aXZlcyA9IFtdO1xuICB3aGlsZSAocGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5BVCkpIHtcbiAgICBkaXJlY3RpdmVzLnB1c2gocGFyc2VEaXJlY3RpdmUobGV4ZXIpKTtcbiAgfVxuICByZXR1cm4gZGlyZWN0aXZlcztcbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgOiBAIE5hbWUgQXJndW1lbnRzP1xuICovXG5mdW5jdGlvbiBwYXJzZURpcmVjdGl2ZShsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkFUKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuRElSRUNUSVZFLFxuICAgIG5hbWU6IHBhcnNlTmFtZShsZXhlciksXG4gICAgYXJndW1lbnRzOiBwYXJzZUFyZ3VtZW50cyhsZXhlciksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vLyBJbXBsZW1lbnRzIHRoZSBwYXJzaW5nIHJ1bGVzIGluIHRoZSBUeXBlcyBzZWN0aW9uLlxuXG4vKipcbiAqIFR5cGUgOlxuICogICAtIE5hbWVkVHlwZVxuICogICAtIExpc3RUeXBlXG4gKiAgIC0gTm9uTnVsbFR5cGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VUeXBlUmVmZXJlbmNlKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICB2YXIgdHlwZSA9IHZvaWQgMDtcbiAgaWYgKHNraXAobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0tFVF9MKSkge1xuICAgIHR5cGUgPSBwYXJzZVR5cGVSZWZlcmVuY2UobGV4ZXIpO1xuICAgIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDS0VUX1IpO1xuICAgIHR5cGUgPSB7XG4gICAgICBraW5kOiBfa2luZHMuTElTVF9UWVBFLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHR5cGUgPSBwYXJzZU5hbWVkVHlwZShsZXhlcik7XG4gIH1cbiAgaWYgKHNraXAobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQkFORykpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2luZDogX2tpbmRzLk5PTl9OVUxMX1RZUEUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHR5cGU7XG59XG5cbi8qKlxuICogTmFtZWRUeXBlIDogTmFtZVxuICovXG5mdW5jdGlvbiBwYXJzZU5hbWVkVHlwZShsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuTkFNRURfVFlQRSxcbiAgICBuYW1lOiBwYXJzZU5hbWUobGV4ZXIpLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgcGFyc2luZyBydWxlcyBpbiB0aGUgVHlwZSBEZWZpbml0aW9uIHNlY3Rpb24uXG5cbi8qKlxuICogVHlwZVN5c3RlbURlZmluaXRpb24gOlxuICogICAtIFNjaGVtYURlZmluaXRpb25cbiAqICAgLSBUeXBlRGVmaW5pdGlvblxuICogICAtIFR5cGVFeHRlbnNpb25EZWZpbml0aW9uXG4gKiAgIC0gRGlyZWN0aXZlRGVmaW5pdGlvblxuICpcbiAqIFR5cGVEZWZpbml0aW9uIDpcbiAqICAgLSBTY2FsYXJUeXBlRGVmaW5pdGlvblxuICogICAtIE9iamVjdFR5cGVEZWZpbml0aW9uXG4gKiAgIC0gSW50ZXJmYWNlVHlwZURlZmluaXRpb25cbiAqICAgLSBVbmlvblR5cGVEZWZpbml0aW9uXG4gKiAgIC0gRW51bVR5cGVEZWZpbml0aW9uXG4gKiAgIC0gSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvblxuICovXG5mdW5jdGlvbiBwYXJzZVR5cGVTeXN0ZW1EZWZpbml0aW9uKGxleGVyKSB7XG4gIGlmIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpKSB7XG4gICAgc3dpdGNoIChsZXhlci50b2tlbi52YWx1ZSkge1xuICAgICAgY2FzZSAnc2NoZW1hJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlU2NoZW1hRGVmaW5pdGlvbihsZXhlcik7XG4gICAgICBjYXNlICdzY2FsYXInOlxuICAgICAgICByZXR1cm4gcGFyc2VTY2FsYXJUeXBlRGVmaW5pdGlvbihsZXhlcik7XG4gICAgICBjYXNlICd0eXBlJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlT2JqZWN0VHlwZURlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAnaW50ZXJmYWNlJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50ZXJmYWNlVHlwZURlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAndW5pb24nOlxuICAgICAgICByZXR1cm4gcGFyc2VVbmlvblR5cGVEZWZpbml0aW9uKGxleGVyKTtcbiAgICAgIGNhc2UgJ2VudW0nOlxuICAgICAgICByZXR1cm4gcGFyc2VFbnVtVHlwZURlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICByZXR1cm4gcGFyc2VJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uKGxleGVyKTtcbiAgICAgIGNhc2UgJ2V4dGVuZCc6XG4gICAgICAgIHJldHVybiBwYXJzZVR5cGVFeHRlbnNpb25EZWZpbml0aW9uKGxleGVyKTtcbiAgICAgIGNhc2UgJ2RpcmVjdGl2ZSc6XG4gICAgICAgIHJldHVybiBwYXJzZURpcmVjdGl2ZURlZmluaXRpb24obGV4ZXIpO1xuICAgIH1cbiAgfVxuXG4gIHRocm93IHVuZXhwZWN0ZWQobGV4ZXIpO1xufVxuXG4vKipcbiAqIFNjaGVtYURlZmluaXRpb24gOiBzY2hlbWEgRGlyZWN0aXZlcz8geyBPcGVyYXRpb25UeXBlRGVmaW5pdGlvbisgfVxuICpcbiAqIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uIDogT3BlcmF0aW9uVHlwZSA6IE5hbWVkVHlwZVxuICovXG5mdW5jdGlvbiBwYXJzZVNjaGVtYURlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdEtleXdvcmQobGV4ZXIsICdzY2hlbWEnKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICB2YXIgb3BlcmF0aW9uVHlwZXMgPSBtYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wsIHBhcnNlT3BlcmF0aW9uVHlwZURlZmluaXRpb24sIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfUik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLlNDSEVNQV9ERUZJTklUSU9OLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgb3BlcmF0aW9uVHlwZXM6IG9wZXJhdGlvblR5cGVzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VPcGVyYXRpb25UeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgdmFyIG9wZXJhdGlvbiA9IHBhcnNlT3BlcmF0aW9uVHlwZShsZXhlcik7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTik7XG4gIHZhciB0eXBlID0gcGFyc2VOYW1lZFR5cGUobGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5PUEVSQVRJT05fVFlQRV9ERUZJTklUSU9OLFxuICAgIG9wZXJhdGlvbjogb3BlcmF0aW9uLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIFNjYWxhclR5cGVEZWZpbml0aW9uIDogc2NhbGFyIE5hbWUgRGlyZWN0aXZlcz9cbiAqL1xuZnVuY3Rpb24gcGFyc2VTY2FsYXJUeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ3NjYWxhcicpO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBkaXJlY3RpdmVzID0gcGFyc2VEaXJlY3RpdmVzKGxleGVyKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuU0NBTEFSX1RZUEVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIE9iamVjdFR5cGVEZWZpbml0aW9uIDpcbiAqICAgLSB0eXBlIE5hbWUgSW1wbGVtZW50c0ludGVyZmFjZXM/IERpcmVjdGl2ZXM/IHsgRmllbGREZWZpbml0aW9uKyB9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlT2JqZWN0VHlwZURlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdEtleXdvcmQobGV4ZXIsICd0eXBlJyk7XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGludGVyZmFjZXMgPSBwYXJzZUltcGxlbWVudHNJbnRlcmZhY2VzKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICB2YXIgZmllbGRzID0gYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wsIHBhcnNlRmllbGREZWZpbml0aW9uLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX1IpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5PQkpFQ1RfVFlQRV9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgaW50ZXJmYWNlczogaW50ZXJmYWNlcyxcbiAgICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzLFxuICAgIGZpZWxkczogZmllbGRzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBJbXBsZW1lbnRzSW50ZXJmYWNlcyA6IGltcGxlbWVudHMgTmFtZWRUeXBlK1xuICovXG5mdW5jdGlvbiBwYXJzZUltcGxlbWVudHNJbnRlcmZhY2VzKGxleGVyKSB7XG4gIHZhciB0eXBlcyA9IFtdO1xuICBpZiAobGV4ZXIudG9rZW4udmFsdWUgPT09ICdpbXBsZW1lbnRzJykge1xuICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICBkbyB7XG4gICAgICB0eXBlcy5wdXNoKHBhcnNlTmFtZWRUeXBlKGxleGVyKSk7XG4gICAgfSB3aGlsZSAocGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5OQU1FKSk7XG4gIH1cbiAgcmV0dXJuIHR5cGVzO1xufVxuXG4vKipcbiAqIEZpZWxkRGVmaW5pdGlvbiA6IE5hbWUgQXJndW1lbnRzRGVmaW5pdGlvbj8gOiBUeXBlIERpcmVjdGl2ZXM/XG4gKi9cbmZ1bmN0aW9uIHBhcnNlRmllbGREZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBhcmdzID0gcGFyc2VBcmd1bWVudERlZnMobGV4ZXIpO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQ09MT04pO1xuICB2YXIgdHlwZSA9IHBhcnNlVHlwZVJlZmVyZW5jZShsZXhlcik7XG4gIHZhciBkaXJlY3RpdmVzID0gcGFyc2VEaXJlY3RpdmVzKGxleGVyKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuRklFTERfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGFyZ3VtZW50czogYXJncyxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEFyZ3VtZW50c0RlZmluaXRpb24gOiAoIElucHV0VmFsdWVEZWZpbml0aW9uKyApXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXJndW1lbnREZWZzKGxleGVyKSB7XG4gIGlmICghcGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9MKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gbWFueShsZXhlciwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9MLCBwYXJzZUlucHV0VmFsdWVEZWYsIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fUik7XG59XG5cbi8qKlxuICogSW5wdXRWYWx1ZURlZmluaXRpb24gOiBOYW1lIDogVHlwZSBEZWZhdWx0VmFsdWU/IERpcmVjdGl2ZXM/XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW5wdXRWYWx1ZURlZihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQ09MT04pO1xuICB2YXIgdHlwZSA9IHBhcnNlVHlwZVJlZmVyZW5jZShsZXhlcik7XG4gIHZhciBkZWZhdWx0VmFsdWUgPSBudWxsO1xuICBpZiAoc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FUVVBTFMpKSB7XG4gICAgZGVmYXVsdFZhbHVlID0gcGFyc2VDb25zdFZhbHVlKGxleGVyKTtcbiAgfVxuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLklOUFVUX1ZBTFVFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEludGVyZmFjZVR5cGVEZWZpbml0aW9uIDogaW50ZXJmYWNlIE5hbWUgRGlyZWN0aXZlcz8geyBGaWVsZERlZmluaXRpb24rIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2ludGVyZmFjZScpO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBkaXJlY3RpdmVzID0gcGFyc2VEaXJlY3RpdmVzKGxleGVyKTtcbiAgdmFyIGZpZWxkcyA9IGFueShsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MLCBwYXJzZUZpZWxkRGVmaW5pdGlvbiwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9SKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuSU5URVJGQUNFX1RZUEVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgZmllbGRzOiBmaWVsZHMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIFVuaW9uVHlwZURlZmluaXRpb24gOiB1bmlvbiBOYW1lIERpcmVjdGl2ZXM/ID0gVW5pb25NZW1iZXJzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVW5pb25UeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ3VuaW9uJyk7XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuRVFVQUxTKTtcbiAgdmFyIHR5cGVzID0gcGFyc2VVbmlvbk1lbWJlcnMobGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5VTklPTl9UWVBFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzLFxuICAgIHR5cGVzOiB0eXBlcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogVW5pb25NZW1iZXJzIDpcbiAqICAgLSBOYW1lZFR5cGVcbiAqICAgLSBVbmlvbk1lbWJlcnMgfCBOYW1lZFR5cGVcbiAqL1xuZnVuY3Rpb24gcGFyc2VVbmlvbk1lbWJlcnMobGV4ZXIpIHtcbiAgdmFyIG1lbWJlcnMgPSBbXTtcbiAgZG8ge1xuICAgIG1lbWJlcnMucHVzaChwYXJzZU5hbWVkVHlwZShsZXhlcikpO1xuICB9IHdoaWxlIChza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBJUEUpKTtcbiAgcmV0dXJuIG1lbWJlcnM7XG59XG5cbi8qKlxuICogRW51bVR5cGVEZWZpbml0aW9uIDogZW51bSBOYW1lIERpcmVjdGl2ZXM/IHsgRW51bVZhbHVlRGVmaW5pdGlvbisgfVxuICovXG5mdW5jdGlvbiBwYXJzZUVudW1UeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2VudW0nKTtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHZhciB2YWx1ZXMgPSBtYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wsIHBhcnNlRW51bVZhbHVlRGVmaW5pdGlvbiwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9SKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuRU5VTV9UWVBFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzLFxuICAgIHZhbHVlczogdmFsdWVzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBFbnVtVmFsdWVEZWZpbml0aW9uIDogRW51bVZhbHVlIERpcmVjdGl2ZXM/XG4gKlxuICogRW51bVZhbHVlIDogTmFtZVxuICovXG5mdW5jdGlvbiBwYXJzZUVudW1WYWx1ZURlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5FTlVNX1ZBTFVFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICBkaXJlY3RpdmVzOiBkaXJlY3RpdmVzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uIDogaW5wdXQgTmFtZSBEaXJlY3RpdmVzPyB7IElucHV0VmFsdWVEZWZpbml0aW9uKyB9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2lucHV0Jyk7XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICB2YXIgZmllbGRzID0gYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wsIHBhcnNlSW5wdXRWYWx1ZURlZiwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9SKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuSU5QVVRfT0JKRUNUX1RZUEVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgZmllbGRzOiBmaWVsZHMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIFR5cGVFeHRlbnNpb25EZWZpbml0aW9uIDogZXh0ZW5kIE9iamVjdFR5cGVEZWZpbml0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVHlwZUV4dGVuc2lvbkRlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdEtleXdvcmQobGV4ZXIsICdleHRlbmQnKTtcbiAgdmFyIGRlZmluaXRpb24gPSBwYXJzZU9iamVjdFR5cGVEZWZpbml0aW9uKGxleGVyKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuVFlQRV9FWFRFTlNJT05fREVGSU5JVElPTixcbiAgICBkZWZpbml0aW9uOiBkZWZpbml0aW9uLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXJlY3RpdmVEZWZpbml0aW9uIDpcbiAqICAgLSBkaXJlY3RpdmUgQCBOYW1lIEFyZ3VtZW50c0RlZmluaXRpb24/IG9uIERpcmVjdGl2ZUxvY2F0aW9uc1xuICovXG5mdW5jdGlvbiBwYXJzZURpcmVjdGl2ZURlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdEtleXdvcmQobGV4ZXIsICdkaXJlY3RpdmUnKTtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkFUKTtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgYXJncyA9IHBhcnNlQXJndW1lbnREZWZzKGxleGVyKTtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ29uJyk7XG4gIHZhciBsb2NhdGlvbnMgPSBwYXJzZURpcmVjdGl2ZUxvY2F0aW9ucyhsZXhlcik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkRJUkVDVElWRV9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgYXJndW1lbnRzOiBhcmdzLFxuICAgIGxvY2F0aW9uczogbG9jYXRpb25zLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXJlY3RpdmVMb2NhdGlvbnMgOlxuICogICAtIE5hbWVcbiAqICAgLSBEaXJlY3RpdmVMb2NhdGlvbnMgfCBOYW1lXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGlyZWN0aXZlTG9jYXRpb25zKGxleGVyKSB7XG4gIHZhciBsb2NhdGlvbnMgPSBbXTtcbiAgZG8ge1xuICAgIGxvY2F0aW9ucy5wdXNoKHBhcnNlTmFtZShsZXhlcikpO1xuICB9IHdoaWxlIChza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBJUEUpKTtcbiAgcmV0dXJuIGxvY2F0aW9ucztcbn1cblxuLy8gQ29yZSBwYXJzaW5nIHV0aWxpdHkgZnVuY3Rpb25zXG5cbi8qKlxuICogUmV0dXJucyBhIGxvY2F0aW9uIG9iamVjdCwgdXNlZCB0byBpZGVudGlmeSB0aGUgcGxhY2UgaW5cbiAqIHRoZSBzb3VyY2UgdGhhdCBjcmVhdGVkIGEgZ2l2ZW4gcGFyc2VkIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gbG9jKGxleGVyLCBzdGFydFRva2VuKSB7XG4gIGlmICghbGV4ZXIub3B0aW9ucy5ub0xvY2F0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBMb2Moc3RhcnRUb2tlbiwgbGV4ZXIubGFzdFRva2VuLCBsZXhlci5zb3VyY2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIExvYyhzdGFydFRva2VuLCBlbmRUb2tlbiwgc291cmNlKSB7XG4gIHRoaXMuc3RhcnQgPSBzdGFydFRva2VuLnN0YXJ0O1xuICB0aGlzLmVuZCA9IGVuZFRva2VuLmVuZDtcbiAgdGhpcy5zdGFydFRva2VuID0gc3RhcnRUb2tlbjtcbiAgdGhpcy5lbmRUb2tlbiA9IGVuZFRva2VuO1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbn1cblxuLy8gUHJpbnQgYSBzaW1wbGlmaWVkIGZvcm0gd2hlbiBhcHBlYXJpbmcgaW4gSlNPTi91dGlsLmluc3BlY3QuXG5Mb2MucHJvdG90eXBlLnRvSlNPTiA9IExvYy5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgbmV4dCB0b2tlbiBpcyBvZiBhIGdpdmVuIGtpbmRcbiAqL1xuZnVuY3Rpb24gcGVlayhsZXhlciwga2luZCkge1xuICByZXR1cm4gbGV4ZXIudG9rZW4ua2luZCA9PT0ga2luZDtcbn1cblxuLyoqXG4gKiBJZiB0aGUgbmV4dCB0b2tlbiBpcyBvZiB0aGUgZ2l2ZW4ga2luZCwgcmV0dXJuIHRydWUgYWZ0ZXIgYWR2YW5jaW5nXG4gKiB0aGUgbGV4ZXIuIE90aGVyd2lzZSwgZG8gbm90IGNoYW5nZSB0aGUgcGFyc2VyIHN0YXRlIGFuZCByZXR1cm4gZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIHNraXAobGV4ZXIsIGtpbmQpIHtcbiAgdmFyIG1hdGNoID0gbGV4ZXIudG9rZW4ua2luZCA9PT0ga2luZDtcbiAgaWYgKG1hdGNoKSB7XG4gICAgbGV4ZXIuYWR2YW5jZSgpO1xuICB9XG4gIHJldHVybiBtYXRjaDtcbn1cblxuLyoqXG4gKiBJZiB0aGUgbmV4dCB0b2tlbiBpcyBvZiB0aGUgZ2l2ZW4ga2luZCwgcmV0dXJuIHRoYXQgdG9rZW4gYWZ0ZXIgYWR2YW5jaW5nXG4gKiB0aGUgbGV4ZXIuIE90aGVyd2lzZSwgZG8gbm90IGNoYW5nZSB0aGUgcGFyc2VyIHN0YXRlIGFuZCB0aHJvdyBhbiBlcnJvci5cbiAqL1xuZnVuY3Rpb24gZXhwZWN0KGxleGVyLCBraW5kKSB7XG4gIHZhciB0b2tlbiA9IGxleGVyLnRva2VuO1xuICBpZiAodG9rZW4ua2luZCA9PT0ga2luZCkge1xuICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikobGV4ZXIuc291cmNlLCB0b2tlbi5zdGFydCwgJ0V4cGVjdGVkICcgKyBraW5kICsgJywgZm91bmQgJyArICgwLCBfbGV4ZXIuZ2V0VG9rZW5EZXNjKSh0b2tlbikpO1xufVxuXG4vKipcbiAqIElmIHRoZSBuZXh0IHRva2VuIGlzIGEga2V5d29yZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZSwgcmV0dXJuIHRoYXQgdG9rZW4gYWZ0ZXJcbiAqIGFkdmFuY2luZyB0aGUgbGV4ZXIuIE90aGVyd2lzZSwgZG8gbm90IGNoYW5nZSB0aGUgcGFyc2VyIHN0YXRlIGFuZCByZXR1cm5cbiAqIGZhbHNlLlxuICovXG5mdW5jdGlvbiBleHBlY3RLZXl3b3JkKGxleGVyLCB2YWx1ZSkge1xuICB2YXIgdG9rZW4gPSBsZXhlci50b2tlbjtcbiAgaWYgKHRva2VuLmtpbmQgPT09IF9sZXhlci5Ub2tlbktpbmQuTkFNRSAmJiB0b2tlbi52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICBsZXhlci5hZHZhbmNlKCk7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG4gIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKGxleGVyLnNvdXJjZSwgdG9rZW4uc3RhcnQsICdFeHBlY3RlZCBcIicgKyB2YWx1ZSArICdcIiwgZm91bmQgJyArICgwLCBfbGV4ZXIuZ2V0VG9rZW5EZXNjKSh0b2tlbikpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYW4gZXJyb3Igd2hlbiBhbiB1bmV4cGVjdGVkIGxleGVkIHRva2VuXG4gKiBpcyBlbmNvdW50ZXJlZC5cbiAqL1xuZnVuY3Rpb24gdW5leHBlY3RlZChsZXhlciwgYXRUb2tlbikge1xuICB2YXIgdG9rZW4gPSBhdFRva2VuIHx8IGxleGVyLnRva2VuO1xuICByZXR1cm4gKDAsIF9lcnJvci5zeW50YXhFcnJvcikobGV4ZXIuc291cmNlLCB0b2tlbi5zdGFydCwgJ1VuZXhwZWN0ZWQgJyArICgwLCBfbGV4ZXIuZ2V0VG9rZW5EZXNjKSh0b2tlbikpO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBwb3NzaWJseSBlbXB0eSBsaXN0IG9mIHBhcnNlIG5vZGVzLCBkZXRlcm1pbmVkIGJ5XG4gKiB0aGUgcGFyc2VGbi4gVGhpcyBsaXN0IGJlZ2lucyB3aXRoIGEgbGV4IHRva2VuIG9mIG9wZW5LaW5kXG4gKiBhbmQgZW5kcyB3aXRoIGEgbGV4IHRva2VuIG9mIGNsb3NlS2luZC4gQWR2YW5jZXMgdGhlIHBhcnNlclxuICogdG8gdGhlIG5leHQgbGV4IHRva2VuIGFmdGVyIHRoZSBjbG9zaW5nIHRva2VuLlxuICovXG5mdW5jdGlvbiBhbnkobGV4ZXIsIG9wZW5LaW5kLCBwYXJzZUZuLCBjbG9zZUtpbmQpIHtcbiAgZXhwZWN0KGxleGVyLCBvcGVuS2luZCk7XG4gIHZhciBub2RlcyA9IFtdO1xuICB3aGlsZSAoIXNraXAobGV4ZXIsIGNsb3NlS2luZCkpIHtcbiAgICBub2Rlcy5wdXNoKHBhcnNlRm4obGV4ZXIpKTtcbiAgfVxuICByZXR1cm4gbm9kZXM7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5vbi1lbXB0eSBsaXN0IG9mIHBhcnNlIG5vZGVzLCBkZXRlcm1pbmVkIGJ5XG4gKiB0aGUgcGFyc2VGbi4gVGhpcyBsaXN0IGJlZ2lucyB3aXRoIGEgbGV4IHRva2VuIG9mIG9wZW5LaW5kXG4gKiBhbmQgZW5kcyB3aXRoIGEgbGV4IHRva2VuIG9mIGNsb3NlS2luZC4gQWR2YW5jZXMgdGhlIHBhcnNlclxuICogdG8gdGhlIG5leHQgbGV4IHRva2VuIGFmdGVyIHRoZSBjbG9zaW5nIHRva2VuLlxuICovXG5mdW5jdGlvbiBtYW55KGxleGVyLCBvcGVuS2luZCwgcGFyc2VGbiwgY2xvc2VLaW5kKSB7XG4gIGV4cGVjdChsZXhlciwgb3BlbktpbmQpO1xuICB2YXIgbm9kZXMgPSBbcGFyc2VGbihsZXhlcildO1xuICB3aGlsZSAoIXNraXAobGV4ZXIsIGNsb3NlS2luZCkpIHtcbiAgICBub2Rlcy5wdXNoKHBhcnNlRm4obGV4ZXIpKTtcbiAgfVxuICByZXR1cm4gbm9kZXM7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wcmludCA9IHByaW50O1xuXG52YXIgX3Zpc2l0b3IgPSByZXF1aXJlKCcuL3Zpc2l0b3InKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBBU1QgaW50byBhIHN0cmluZywgdXNpbmcgb25lIHNldCBvZiByZWFzb25hYmxlXG4gKiBmb3JtYXR0aW5nIHJ1bGVzLlxuICovXG5mdW5jdGlvbiBwcmludChhc3QpIHtcbiAgcmV0dXJuICgwLCBfdmlzaXRvci52aXNpdCkoYXN0LCB7IGxlYXZlOiBwcmludERvY0FTVFJlZHVjZXIgfSk7XG59IC8qKlxuICAgKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICAgKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICpcbiAgICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICAgKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gICAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAgICovXG5cbnZhciBwcmludERvY0FTVFJlZHVjZXIgPSB7XG4gIE5hbWU6IGZ1bmN0aW9uIE5hbWUobm9kZSkge1xuICAgIHJldHVybiBub2RlLnZhbHVlO1xuICB9LFxuICBWYXJpYWJsZTogZnVuY3Rpb24gVmFyaWFibGUobm9kZSkge1xuICAgIHJldHVybiAnJCcgKyBub2RlLm5hbWU7XG4gIH0sXG5cbiAgLy8gRG9jdW1lbnRcblxuICBEb2N1bWVudDogZnVuY3Rpb24gRG9jdW1lbnQobm9kZSkge1xuICAgIHJldHVybiBqb2luKG5vZGUuZGVmaW5pdGlvbnMsICdcXG5cXG4nKSArICdcXG4nO1xuICB9LFxuXG4gIE9wZXJhdGlvbkRlZmluaXRpb246IGZ1bmN0aW9uIE9wZXJhdGlvbkRlZmluaXRpb24obm9kZSkge1xuICAgIHZhciBvcCA9IG5vZGUub3BlcmF0aW9uO1xuICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgIHZhciB2YXJEZWZzID0gd3JhcCgnKCcsIGpvaW4obm9kZS52YXJpYWJsZURlZmluaXRpb25zLCAnLCAnKSwgJyknKTtcbiAgICB2YXIgZGlyZWN0aXZlcyA9IGpvaW4obm9kZS5kaXJlY3RpdmVzLCAnICcpO1xuICAgIHZhciBzZWxlY3Rpb25TZXQgPSBub2RlLnNlbGVjdGlvblNldDtcbiAgICAvLyBBbm9ueW1vdXMgcXVlcmllcyB3aXRoIG5vIGRpcmVjdGl2ZXMgb3IgdmFyaWFibGUgZGVmaW5pdGlvbnMgY2FuIHVzZVxuICAgIC8vIHRoZSBxdWVyeSBzaG9ydCBmb3JtLlxuICAgIHJldHVybiAhbmFtZSAmJiAhZGlyZWN0aXZlcyAmJiAhdmFyRGVmcyAmJiBvcCA9PT0gJ3F1ZXJ5JyA/IHNlbGVjdGlvblNldCA6IGpvaW4oW29wLCBqb2luKFtuYW1lLCB2YXJEZWZzXSksIGRpcmVjdGl2ZXMsIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG5cblxuICBWYXJpYWJsZURlZmluaXRpb246IGZ1bmN0aW9uIFZhcmlhYmxlRGVmaW5pdGlvbihfcmVmKSB7XG4gICAgdmFyIHZhcmlhYmxlID0gX3JlZi52YXJpYWJsZSxcbiAgICAgICAgdHlwZSA9IF9yZWYudHlwZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gX3JlZi5kZWZhdWx0VmFsdWU7XG4gICAgcmV0dXJuIHZhcmlhYmxlICsgJzogJyArIHR5cGUgKyB3cmFwKCcgPSAnLCBkZWZhdWx0VmFsdWUpO1xuICB9LFxuXG4gIFNlbGVjdGlvblNldDogZnVuY3Rpb24gU2VsZWN0aW9uU2V0KF9yZWYyKSB7XG4gICAgdmFyIHNlbGVjdGlvbnMgPSBfcmVmMi5zZWxlY3Rpb25zO1xuICAgIHJldHVybiBibG9jayhzZWxlY3Rpb25zKTtcbiAgfSxcblxuICBGaWVsZDogZnVuY3Rpb24gRmllbGQoX3JlZjMpIHtcbiAgICB2YXIgYWxpYXMgPSBfcmVmMy5hbGlhcyxcbiAgICAgICAgbmFtZSA9IF9yZWYzLm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMy5hcmd1bWVudHMsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMy5kaXJlY3RpdmVzLFxuICAgICAgICBzZWxlY3Rpb25TZXQgPSBfcmVmMy5zZWxlY3Rpb25TZXQ7XG4gICAgcmV0dXJuIGpvaW4oW3dyYXAoJycsIGFsaWFzLCAnOiAnKSArIG5hbWUgKyB3cmFwKCcoJywgam9pbihhcmdzLCAnLCAnKSwgJyknKSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBzZWxlY3Rpb25TZXRdLCAnICcpO1xuICB9LFxuXG4gIEFyZ3VtZW50OiBmdW5jdGlvbiBBcmd1bWVudChfcmVmNCkge1xuICAgIHZhciBuYW1lID0gX3JlZjQubmFtZSxcbiAgICAgICAgdmFsdWUgPSBfcmVmNC52YWx1ZTtcbiAgICByZXR1cm4gbmFtZSArICc6ICcgKyB2YWx1ZTtcbiAgfSxcblxuICAvLyBGcmFnbWVudHNcblxuICBGcmFnbWVudFNwcmVhZDogZnVuY3Rpb24gRnJhZ21lbnRTcHJlYWQoX3JlZjUpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY1Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmNS5kaXJlY3RpdmVzO1xuICAgIHJldHVybiAnLi4uJyArIG5hbWUgKyB3cmFwKCcgJywgam9pbihkaXJlY3RpdmVzLCAnICcpKTtcbiAgfSxcblxuICBJbmxpbmVGcmFnbWVudDogZnVuY3Rpb24gSW5saW5lRnJhZ21lbnQoX3JlZjYpIHtcbiAgICB2YXIgdHlwZUNvbmRpdGlvbiA9IF9yZWY2LnR5cGVDb25kaXRpb24sXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmNi5kaXJlY3RpdmVzLFxuICAgICAgICBzZWxlY3Rpb25TZXQgPSBfcmVmNi5zZWxlY3Rpb25TZXQ7XG4gICAgcmV0dXJuIGpvaW4oWycuLi4nLCB3cmFwKCdvbiAnLCB0eXBlQ29uZGl0aW9uKSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBzZWxlY3Rpb25TZXRdLCAnICcpO1xuICB9LFxuXG4gIEZyYWdtZW50RGVmaW5pdGlvbjogZnVuY3Rpb24gRnJhZ21lbnREZWZpbml0aW9uKF9yZWY3KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmNy5uYW1lLFxuICAgICAgICB0eXBlQ29uZGl0aW9uID0gX3JlZjcudHlwZUNvbmRpdGlvbixcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY3LmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWY3LnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gJ2ZyYWdtZW50ICcgKyBuYW1lICsgJyBvbiAnICsgdHlwZUNvbmRpdGlvbiArICcgJyArIHdyYXAoJycsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgJyAnKSArIHNlbGVjdGlvblNldDtcbiAgfSxcblxuICAvLyBWYWx1ZVxuXG4gIEludFZhbHVlOiBmdW5jdGlvbiBJbnRWYWx1ZShfcmVmOCkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWY4LnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgRmxvYXRWYWx1ZTogZnVuY3Rpb24gRmxvYXRWYWx1ZShfcmVmOSkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWY5LnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgU3RyaW5nVmFsdWU6IGZ1bmN0aW9uIFN0cmluZ1ZhbHVlKF9yZWYxMCkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYxMC52YWx1ZTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9LFxuICBCb29sZWFuVmFsdWU6IGZ1bmN0aW9uIEJvb2xlYW5WYWx1ZShfcmVmMTEpIHtcbiAgICB2YXIgdmFsdWUgPSBfcmVmMTEudmFsdWU7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfSxcbiAgTnVsbFZhbHVlOiBmdW5jdGlvbiBOdWxsVmFsdWUoKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfSxcbiAgRW51bVZhbHVlOiBmdW5jdGlvbiBFbnVtVmFsdWUoX3JlZjEyKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjEyLnZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgTGlzdFZhbHVlOiBmdW5jdGlvbiBMaXN0VmFsdWUoX3JlZjEzKSB7XG4gICAgdmFyIHZhbHVlcyA9IF9yZWYxMy52YWx1ZXM7XG4gICAgcmV0dXJuICdbJyArIGpvaW4odmFsdWVzLCAnLCAnKSArICddJztcbiAgfSxcbiAgT2JqZWN0VmFsdWU6IGZ1bmN0aW9uIE9iamVjdFZhbHVlKF9yZWYxNCkge1xuICAgIHZhciBmaWVsZHMgPSBfcmVmMTQuZmllbGRzO1xuICAgIHJldHVybiAneycgKyBqb2luKGZpZWxkcywgJywgJykgKyAnfSc7XG4gIH0sXG4gIE9iamVjdEZpZWxkOiBmdW5jdGlvbiBPYmplY3RGaWVsZChfcmVmMTUpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYxNS5uYW1lLFxuICAgICAgICB2YWx1ZSA9IF9yZWYxNS52YWx1ZTtcbiAgICByZXR1cm4gbmFtZSArICc6ICcgKyB2YWx1ZTtcbiAgfSxcblxuICAvLyBEaXJlY3RpdmVcblxuICBEaXJlY3RpdmU6IGZ1bmN0aW9uIERpcmVjdGl2ZShfcmVmMTYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYxNi5uYW1lLFxuICAgICAgICBhcmdzID0gX3JlZjE2LmFyZ3VtZW50cztcbiAgICByZXR1cm4gJ0AnICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpO1xuICB9LFxuXG4gIC8vIFR5cGVcblxuICBOYW1lZFR5cGU6IGZ1bmN0aW9uIE5hbWVkVHlwZShfcmVmMTcpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYxNy5uYW1lO1xuICAgIHJldHVybiBuYW1lO1xuICB9LFxuICBMaXN0VHlwZTogZnVuY3Rpb24gTGlzdFR5cGUoX3JlZjE4KSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMTgudHlwZTtcbiAgICByZXR1cm4gJ1snICsgdHlwZSArICddJztcbiAgfSxcbiAgTm9uTnVsbFR5cGU6IGZ1bmN0aW9uIE5vbk51bGxUeXBlKF9yZWYxOSkge1xuICAgIHZhciB0eXBlID0gX3JlZjE5LnR5cGU7XG4gICAgcmV0dXJuIHR5cGUgKyAnISc7XG4gIH0sXG5cbiAgLy8gVHlwZSBTeXN0ZW0gRGVmaW5pdGlvbnNcblxuICBTY2hlbWFEZWZpbml0aW9uOiBmdW5jdGlvbiBTY2hlbWFEZWZpbml0aW9uKF9yZWYyMCkge1xuICAgIHZhciBkaXJlY3RpdmVzID0gX3JlZjIwLmRpcmVjdGl2ZXMsXG4gICAgICAgIG9wZXJhdGlvblR5cGVzID0gX3JlZjIwLm9wZXJhdGlvblR5cGVzO1xuICAgIHJldHVybiBqb2luKFsnc2NoZW1hJywgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhvcGVyYXRpb25UeXBlcyldLCAnICcpO1xuICB9LFxuXG4gIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBPcGVyYXRpb25UeXBlRGVmaW5pdGlvbihfcmVmMjEpIHtcbiAgICB2YXIgb3BlcmF0aW9uID0gX3JlZjIxLm9wZXJhdGlvbixcbiAgICAgICAgdHlwZSA9IF9yZWYyMS50eXBlO1xuICAgIHJldHVybiBvcGVyYXRpb24gKyAnOiAnICsgdHlwZTtcbiAgfSxcblxuICBTY2FsYXJUeXBlRGVmaW5pdGlvbjogZnVuY3Rpb24gU2NhbGFyVHlwZURlZmluaXRpb24oX3JlZjIyKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjIubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyMi5kaXJlY3RpdmVzO1xuICAgIHJldHVybiBqb2luKFsnc2NhbGFyJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpXSwgJyAnKTtcbiAgfSxcblxuICBPYmplY3RUeXBlRGVmaW5pdGlvbjogZnVuY3Rpb24gT2JqZWN0VHlwZURlZmluaXRpb24oX3JlZjIzKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjMubmFtZSxcbiAgICAgICAgaW50ZXJmYWNlcyA9IF9yZWYyMy5pbnRlcmZhY2VzLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjIzLmRpcmVjdGl2ZXMsXG4gICAgICAgIGZpZWxkcyA9IF9yZWYyMy5maWVsZHM7XG4gICAgcmV0dXJuIGpvaW4oWyd0eXBlJywgbmFtZSwgd3JhcCgnaW1wbGVtZW50cyAnLCBqb2luKGludGVyZmFjZXMsICcsICcpKSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhmaWVsZHMpXSwgJyAnKTtcbiAgfSxcblxuICBGaWVsZERlZmluaXRpb246IGZ1bmN0aW9uIEZpZWxkRGVmaW5pdGlvbihfcmVmMjQpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyNC5uYW1lLFxuICAgICAgICBhcmdzID0gX3JlZjI0LmFyZ3VtZW50cyxcbiAgICAgICAgdHlwZSA9IF9yZWYyNC50eXBlLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI0LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIG5hbWUgKyB3cmFwKCcoJywgam9pbihhcmdzLCAnLCAnKSwgJyknKSArICc6ICcgKyB0eXBlICsgd3JhcCgnICcsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSk7XG4gIH0sXG5cbiAgSW5wdXRWYWx1ZURlZmluaXRpb246IGZ1bmN0aW9uIElucHV0VmFsdWVEZWZpbml0aW9uKF9yZWYyNSkge1xuICAgIHZhciBuYW1lID0gX3JlZjI1Lm5hbWUsXG4gICAgICAgIHR5cGUgPSBfcmVmMjUudHlwZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlID0gX3JlZjI1LmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNS5kaXJlY3RpdmVzO1xuICAgIHJldHVybiBqb2luKFtuYW1lICsgJzogJyArIHR5cGUsIHdyYXAoJz0gJywgZGVmYXVsdFZhbHVlKSwgam9pbihkaXJlY3RpdmVzLCAnICcpXSwgJyAnKTtcbiAgfSxcblxuICBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbjogZnVuY3Rpb24gSW50ZXJmYWNlVHlwZURlZmluaXRpb24oX3JlZjI2KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjYubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNi5kaXJlY3RpdmVzLFxuICAgICAgICBmaWVsZHMgPSBfcmVmMjYuZmllbGRzO1xuICAgIHJldHVybiBqb2luKFsnaW50ZXJmYWNlJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhmaWVsZHMpXSwgJyAnKTtcbiAgfSxcblxuICBVbmlvblR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBVbmlvblR5cGVEZWZpbml0aW9uKF9yZWYyNykge1xuICAgIHZhciBuYW1lID0gX3JlZjI3Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjcuZGlyZWN0aXZlcyxcbiAgICAgICAgdHlwZXMgPSBfcmVmMjcudHlwZXM7XG4gICAgcmV0dXJuIGpvaW4oWyd1bmlvbicsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgJz0gJyArIGpvaW4odHlwZXMsICcgfCAnKV0sICcgJyk7XG4gIH0sXG5cbiAgRW51bVR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBFbnVtVHlwZURlZmluaXRpb24oX3JlZjI4KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjgubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyOC5kaXJlY3RpdmVzLFxuICAgICAgICB2YWx1ZXMgPSBfcmVmMjgudmFsdWVzO1xuICAgIHJldHVybiBqb2luKFsnZW51bScsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2sodmFsdWVzKV0sICcgJyk7XG4gIH0sXG5cbiAgRW51bVZhbHVlRGVmaW5pdGlvbjogZnVuY3Rpb24gRW51bVZhbHVlRGVmaW5pdGlvbihfcmVmMjkpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyOS5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI5LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oW25hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKV0sICcgJyk7XG4gIH0sXG5cbiAgSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvbjogZnVuY3Rpb24gSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvbihfcmVmMzApIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzMC5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjMwLmRpcmVjdGl2ZXMsXG4gICAgICAgIGZpZWxkcyA9IF9yZWYzMC5maWVsZHM7XG4gICAgcmV0dXJuIGpvaW4oWydpbnB1dCcsIG5hbWUsIGpvaW4oZGlyZWN0aXZlcywgJyAnKSwgYmxvY2soZmllbGRzKV0sICcgJyk7XG4gIH0sXG5cbiAgVHlwZUV4dGVuc2lvbkRlZmluaXRpb246IGZ1bmN0aW9uIFR5cGVFeHRlbnNpb25EZWZpbml0aW9uKF9yZWYzMSkge1xuICAgIHZhciBkZWZpbml0aW9uID0gX3JlZjMxLmRlZmluaXRpb247XG4gICAgcmV0dXJuICdleHRlbmQgJyArIGRlZmluaXRpb247XG4gIH0sXG5cbiAgRGlyZWN0aXZlRGVmaW5pdGlvbjogZnVuY3Rpb24gRGlyZWN0aXZlRGVmaW5pdGlvbihfcmVmMzIpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYzMi5uYW1lLFxuICAgICAgICBhcmdzID0gX3JlZjMyLmFyZ3VtZW50cyxcbiAgICAgICAgbG9jYXRpb25zID0gX3JlZjMyLmxvY2F0aW9ucztcbiAgICByZXR1cm4gJ2RpcmVjdGl2ZSBAJyArIG5hbWUgKyB3cmFwKCcoJywgam9pbihhcmdzLCAnLCAnKSwgJyknKSArICcgb24gJyArIGpvaW4obG9jYXRpb25zLCAnIHwgJyk7XG4gIH1cbn07XG5cbi8qKlxuICogR2l2ZW4gbWF5YmVBcnJheSwgcHJpbnQgYW4gZW1wdHkgc3RyaW5nIGlmIGl0IGlzIG51bGwgb3IgZW1wdHksIG90aGVyd2lzZVxuICogcHJpbnQgYWxsIGl0ZW1zIHRvZ2V0aGVyIHNlcGFyYXRlZCBieSBzZXBhcmF0b3IgaWYgcHJvdmlkZWRcbiAqL1xuZnVuY3Rpb24gam9pbihtYXliZUFycmF5LCBzZXBhcmF0b3IpIHtcbiAgcmV0dXJuIG1heWJlQXJyYXkgPyBtYXliZUFycmF5LmZpbHRlcihmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiB4O1xuICB9KS5qb2luKHNlcGFyYXRvciB8fCAnJykgOiAnJztcbn1cblxuLyoqXG4gKiBHaXZlbiBhcnJheSwgcHJpbnQgZWFjaCBpdGVtIG9uIGl0cyBvd24gbGluZSwgd3JhcHBlZCBpbiBhblxuICogaW5kZW50ZWQgXCJ7IH1cIiBibG9jay5cbiAqL1xuZnVuY3Rpb24gYmxvY2soYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5ICYmIGFycmF5Lmxlbmd0aCAhPT0gMCA/IGluZGVudCgne1xcbicgKyBqb2luKGFycmF5LCAnXFxuJykpICsgJ1xcbn0nIDogJ3t9Jztcbn1cblxuLyoqXG4gKiBJZiBtYXliZVN0cmluZyBpcyBub3QgbnVsbCBvciBlbXB0eSwgdGhlbiB3cmFwIHdpdGggc3RhcnQgYW5kIGVuZCwgb3RoZXJ3aXNlXG4gKiBwcmludCBhbiBlbXB0eSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHdyYXAoc3RhcnQsIG1heWJlU3RyaW5nLCBlbmQpIHtcbiAgcmV0dXJuIG1heWJlU3RyaW5nID8gc3RhcnQgKyBtYXliZVN0cmluZyArIChlbmQgfHwgJycpIDogJyc7XG59XG5cbmZ1bmN0aW9uIGluZGVudChtYXliZVN0cmluZykge1xuICByZXR1cm4gbWF5YmVTdHJpbmcgJiYgbWF5YmVTdHJpbmcucmVwbGFjZSgvXFxuL2csICdcXG4gICcpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbi8qKlxuICogQSByZXByZXNlbnRhdGlvbiBvZiBzb3VyY2UgaW5wdXQgdG8gR3JhcGhRTC4gVGhlIG5hbWUgaXMgb3B0aW9uYWwsXG4gKiBidXQgaXMgbW9zdGx5IHVzZWZ1bCBmb3IgY2xpZW50cyB3aG8gc3RvcmUgR3JhcGhRTCBkb2N1bWVudHMgaW5cbiAqIHNvdXJjZSBmaWxlczsgZm9yIGV4YW1wbGUsIGlmIHRoZSBHcmFwaFFMIGlucHV0IGlzIGluIGEgZmlsZSBGb28uZ3JhcGhxbCxcbiAqIGl0IG1pZ2h0IGJlIHVzZWZ1bCBmb3IgbmFtZSB0byBiZSBcIkZvby5ncmFwaHFsXCIuXG4gKi9cbnZhciBTb3VyY2UgPSBleHBvcnRzLlNvdXJjZSA9IGZ1bmN0aW9uIFNvdXJjZShib2R5LCBuYW1lKSB7XG4gIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTb3VyY2UpO1xuXG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHRoaXMubmFtZSA9IG5hbWUgfHwgJ0dyYXBoUUwnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnZpc2l0ID0gdmlzaXQ7XG5leHBvcnRzLnZpc2l0SW5QYXJhbGxlbCA9IHZpc2l0SW5QYXJhbGxlbDtcbmV4cG9ydHMudmlzaXRXaXRoVHlwZUluZm8gPSB2aXNpdFdpdGhUeXBlSW5mbztcbi8qKlxuICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG52YXIgUXVlcnlEb2N1bWVudEtleXMgPSBleHBvcnRzLlF1ZXJ5RG9jdW1lbnRLZXlzID0ge1xuICBOYW1lOiBbXSxcblxuICBEb2N1bWVudDogWydkZWZpbml0aW9ucyddLFxuICBPcGVyYXRpb25EZWZpbml0aW9uOiBbJ25hbWUnLCAndmFyaWFibGVEZWZpbml0aW9ucycsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuICBWYXJpYWJsZURlZmluaXRpb246IFsndmFyaWFibGUnLCAndHlwZScsICdkZWZhdWx0VmFsdWUnXSxcbiAgVmFyaWFibGU6IFsnbmFtZSddLFxuICBTZWxlY3Rpb25TZXQ6IFsnc2VsZWN0aW9ucyddLFxuICBGaWVsZDogWydhbGlhcycsICduYW1lJywgJ2FyZ3VtZW50cycsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuICBBcmd1bWVudDogWyduYW1lJywgJ3ZhbHVlJ10sXG5cbiAgRnJhZ21lbnRTcHJlYWQ6IFsnbmFtZScsICdkaXJlY3RpdmVzJ10sXG4gIElubGluZUZyYWdtZW50OiBbJ3R5cGVDb25kaXRpb24nLCAnZGlyZWN0aXZlcycsICdzZWxlY3Rpb25TZXQnXSxcbiAgRnJhZ21lbnREZWZpbml0aW9uOiBbJ25hbWUnLCAndHlwZUNvbmRpdGlvbicsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuXG4gIEludFZhbHVlOiBbXSxcbiAgRmxvYXRWYWx1ZTogW10sXG4gIFN0cmluZ1ZhbHVlOiBbXSxcbiAgQm9vbGVhblZhbHVlOiBbXSxcbiAgTnVsbFZhbHVlOiBbXSxcbiAgRW51bVZhbHVlOiBbXSxcbiAgTGlzdFZhbHVlOiBbJ3ZhbHVlcyddLFxuICBPYmplY3RWYWx1ZTogWydmaWVsZHMnXSxcbiAgT2JqZWN0RmllbGQ6IFsnbmFtZScsICd2YWx1ZSddLFxuXG4gIERpcmVjdGl2ZTogWyduYW1lJywgJ2FyZ3VtZW50cyddLFxuXG4gIE5hbWVkVHlwZTogWyduYW1lJ10sXG4gIExpc3RUeXBlOiBbJ3R5cGUnXSxcbiAgTm9uTnVsbFR5cGU6IFsndHlwZSddLFxuXG4gIFNjaGVtYURlZmluaXRpb246IFsnZGlyZWN0aXZlcycsICdvcGVyYXRpb25UeXBlcyddLFxuICBPcGVyYXRpb25UeXBlRGVmaW5pdGlvbjogWyd0eXBlJ10sXG5cbiAgU2NhbGFyVHlwZURlZmluaXRpb246IFsnbmFtZScsICdkaXJlY3RpdmVzJ10sXG4gIE9iamVjdFR5cGVEZWZpbml0aW9uOiBbJ25hbWUnLCAnaW50ZXJmYWNlcycsICdkaXJlY3RpdmVzJywgJ2ZpZWxkcyddLFxuICBGaWVsZERlZmluaXRpb246IFsnbmFtZScsICdhcmd1bWVudHMnLCAndHlwZScsICdkaXJlY3RpdmVzJ10sXG4gIElucHV0VmFsdWVEZWZpbml0aW9uOiBbJ25hbWUnLCAndHlwZScsICdkZWZhdWx0VmFsdWUnLCAnZGlyZWN0aXZlcyddLFxuICBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAnZmllbGRzJ10sXG4gIFVuaW9uVHlwZURlZmluaXRpb246IFsnbmFtZScsICdkaXJlY3RpdmVzJywgJ3R5cGVzJ10sXG4gIEVudW1UeXBlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAndmFsdWVzJ10sXG4gIEVudW1WYWx1ZURlZmluaXRpb246IFsnbmFtZScsICdkaXJlY3RpdmVzJ10sXG4gIElucHV0T2JqZWN0VHlwZURlZmluaXRpb246IFsnbmFtZScsICdkaXJlY3RpdmVzJywgJ2ZpZWxkcyddLFxuXG4gIFR5cGVFeHRlbnNpb25EZWZpbml0aW9uOiBbJ2RlZmluaXRpb24nXSxcblxuICBEaXJlY3RpdmVEZWZpbml0aW9uOiBbJ25hbWUnLCAnYXJndW1lbnRzJywgJ2xvY2F0aW9ucyddXG59O1xuXG52YXIgQlJFQUsgPSBleHBvcnRzLkJSRUFLID0ge307XG5cbi8qKlxuICogdmlzaXQoKSB3aWxsIHdhbGsgdGhyb3VnaCBhbiBBU1QgdXNpbmcgYSBkZXB0aCBmaXJzdCB0cmF2ZXJzYWwsIGNhbGxpbmdcbiAqIHRoZSB2aXNpdG9yJ3MgZW50ZXIgZnVuY3Rpb24gYXQgZWFjaCBub2RlIGluIHRoZSB0cmF2ZXJzYWwsIGFuZCBjYWxsaW5nIHRoZVxuICogbGVhdmUgZnVuY3Rpb24gYWZ0ZXIgdmlzaXRpbmcgdGhhdCBub2RlIGFuZCBhbGwgb2YgaXRzIGNoaWxkIG5vZGVzLlxuICpcbiAqIEJ5IHJldHVybmluZyBkaWZmZXJlbnQgdmFsdWVzIGZyb20gdGhlIGVudGVyIGFuZCBsZWF2ZSBmdW5jdGlvbnMsIHRoZVxuICogYmVoYXZpb3Igb2YgdGhlIHZpc2l0b3IgY2FuIGJlIGFsdGVyZWQsIGluY2x1ZGluZyBza2lwcGluZyBvdmVyIGEgc3ViLXRyZWUgb2ZcbiAqIHRoZSBBU1QgKGJ5IHJldHVybmluZyBmYWxzZSksIGVkaXRpbmcgdGhlIEFTVCBieSByZXR1cm5pbmcgYSB2YWx1ZSBvciBudWxsXG4gKiB0byByZW1vdmUgdGhlIHZhbHVlLCBvciB0byBzdG9wIHRoZSB3aG9sZSB0cmF2ZXJzYWwgYnkgcmV0dXJuaW5nIEJSRUFLLlxuICpcbiAqIFdoZW4gdXNpbmcgdmlzaXQoKSB0byBlZGl0IGFuIEFTVCwgdGhlIG9yaWdpbmFsIEFTVCB3aWxsIG5vdCBiZSBtb2RpZmllZCwgYW5kXG4gKiBhIG5ldyB2ZXJzaW9uIG9mIHRoZSBBU1Qgd2l0aCB0aGUgY2hhbmdlcyBhcHBsaWVkIHdpbGwgYmUgcmV0dXJuZWQgZnJvbSB0aGVcbiAqIHZpc2l0IGZ1bmN0aW9uLlxuICpcbiAqICAgICBjb25zdCBlZGl0ZWRBU1QgPSB2aXNpdChhc3QsIHtcbiAqICAgICAgIGVudGVyKG5vZGUsIGtleSwgcGFyZW50LCBwYXRoLCBhbmNlc3RvcnMpIHtcbiAqICAgICAgICAgLy8gQHJldHVyblxuICogICAgICAgICAvLyAgIHVuZGVmaW5lZDogbm8gYWN0aW9uXG4gKiAgICAgICAgIC8vICAgZmFsc2U6IHNraXAgdmlzaXRpbmcgdGhpcyBub2RlXG4gKiAgICAgICAgIC8vICAgdmlzaXRvci5CUkVBSzogc3RvcCB2aXNpdGluZyBhbHRvZ2V0aGVyXG4gKiAgICAgICAgIC8vICAgbnVsbDogZGVsZXRlIHRoaXMgbm9kZVxuICogICAgICAgICAvLyAgIGFueSB2YWx1ZTogcmVwbGFjZSB0aGlzIG5vZGUgd2l0aCB0aGUgcmV0dXJuZWQgdmFsdWVcbiAqICAgICAgIH0sXG4gKiAgICAgICBsZWF2ZShub2RlLCBrZXksIHBhcmVudCwgcGF0aCwgYW5jZXN0b3JzKSB7XG4gKiAgICAgICAgIC8vIEByZXR1cm5cbiAqICAgICAgICAgLy8gICB1bmRlZmluZWQ6IG5vIGFjdGlvblxuICogICAgICAgICAvLyAgIGZhbHNlOiBubyBhY3Rpb25cbiAqICAgICAgICAgLy8gICB2aXNpdG9yLkJSRUFLOiBzdG9wIHZpc2l0aW5nIGFsdG9nZXRoZXJcbiAqICAgICAgICAgLy8gICBudWxsOiBkZWxldGUgdGhpcyBub2RlXG4gKiAgICAgICAgIC8vICAgYW55IHZhbHVlOiByZXBsYWNlIHRoaXMgbm9kZSB3aXRoIHRoZSByZXR1cm5lZCB2YWx1ZVxuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIEFsdGVybmF0aXZlbHkgdG8gcHJvdmlkaW5nIGVudGVyKCkgYW5kIGxlYXZlKCkgZnVuY3Rpb25zLCBhIHZpc2l0b3IgY2FuXG4gKiBpbnN0ZWFkIHByb3ZpZGUgZnVuY3Rpb25zIG5hbWVkIHRoZSBzYW1lIGFzIHRoZSBraW5kcyBvZiBBU1Qgbm9kZXMsIG9yXG4gKiBlbnRlci9sZWF2ZSB2aXNpdG9ycyBhdCBhIG5hbWVkIGtleSwgbGVhZGluZyB0byBmb3VyIHBlcm11dGF0aW9ucyBvZlxuICogdmlzaXRvciBBUEk6XG4gKlxuICogMSkgTmFtZWQgdmlzaXRvcnMgdHJpZ2dlcmVkIHdoZW4gZW50ZXJpbmcgYSBub2RlIGEgc3BlY2lmaWMga2luZC5cbiAqXG4gKiAgICAgdmlzaXQoYXN0LCB7XG4gKiAgICAgICBLaW5kKG5vZGUpIHtcbiAqICAgICAgICAgLy8gZW50ZXIgdGhlIFwiS2luZFwiIG5vZGVcbiAqICAgICAgIH1cbiAqICAgICB9KVxuICpcbiAqIDIpIE5hbWVkIHZpc2l0b3JzIHRoYXQgdHJpZ2dlciB1cG9uIGVudGVyaW5nIGFuZCBsZWF2aW5nIGEgbm9kZSBvZlxuICogICAgYSBzcGVjaWZpYyBraW5kLlxuICpcbiAqICAgICB2aXNpdChhc3QsIHtcbiAqICAgICAgIEtpbmQ6IHtcbiAqICAgICAgICAgZW50ZXIobm9kZSkge1xuICogICAgICAgICAgIC8vIGVudGVyIHRoZSBcIktpbmRcIiBub2RlXG4gKiAgICAgICAgIH1cbiAqICAgICAgICAgbGVhdmUobm9kZSkge1xuICogICAgICAgICAgIC8vIGxlYXZlIHRoZSBcIktpbmRcIiBub2RlXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9KVxuICpcbiAqIDMpIEdlbmVyaWMgdmlzaXRvcnMgdGhhdCB0cmlnZ2VyIHVwb24gZW50ZXJpbmcgYW5kIGxlYXZpbmcgYW55IG5vZGUuXG4gKlxuICogICAgIHZpc2l0KGFzdCwge1xuICogICAgICAgZW50ZXIobm9kZSkge1xuICogICAgICAgICAvLyBlbnRlciBhbnkgbm9kZVxuICogICAgICAgfSxcbiAqICAgICAgIGxlYXZlKG5vZGUpIHtcbiAqICAgICAgICAgLy8gbGVhdmUgYW55IG5vZGVcbiAqICAgICAgIH1cbiAqICAgICB9KVxuICpcbiAqIDQpIFBhcmFsbGVsIHZpc2l0b3JzIGZvciBlbnRlcmluZyBhbmQgbGVhdmluZyBub2RlcyBvZiBhIHNwZWNpZmljIGtpbmQuXG4gKlxuICogICAgIHZpc2l0KGFzdCwge1xuICogICAgICAgZW50ZXI6IHtcbiAqICAgICAgICAgS2luZChub2RlKSB7XG4gKiAgICAgICAgICAgLy8gZW50ZXIgdGhlIFwiS2luZFwiIG5vZGVcbiAqICAgICAgICAgfVxuICogICAgICAgfSxcbiAqICAgICAgIGxlYXZlOiB7XG4gKiAgICAgICAgIEtpbmQobm9kZSkge1xuICogICAgICAgICAgIC8vIGxlYXZlIHRoZSBcIktpbmRcIiBub2RlXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9KVxuICovXG5mdW5jdGlvbiB2aXNpdChyb290LCB2aXNpdG9yLCBrZXlNYXApIHtcbiAgdmFyIHZpc2l0b3JLZXlzID0ga2V5TWFwIHx8IFF1ZXJ5RG9jdW1lbnRLZXlzO1xuXG4gIHZhciBzdGFjayA9IHZvaWQgMDtcbiAgdmFyIGluQXJyYXkgPSBBcnJheS5pc0FycmF5KHJvb3QpO1xuICB2YXIga2V5cyA9IFtyb290XTtcbiAgdmFyIGluZGV4ID0gLTE7XG4gIHZhciBlZGl0cyA9IFtdO1xuICB2YXIgcGFyZW50ID0gdm9pZCAwO1xuICB2YXIgcGF0aCA9IFtdO1xuICB2YXIgYW5jZXN0b3JzID0gW107XG4gIHZhciBuZXdSb290ID0gcm9vdDtcblxuICBkbyB7XG4gICAgaW5kZXgrKztcbiAgICB2YXIgaXNMZWF2aW5nID0gaW5kZXggPT09IGtleXMubGVuZ3RoO1xuICAgIHZhciBrZXkgPSB2b2lkIDA7XG4gICAgdmFyIG5vZGUgPSB2b2lkIDA7XG4gICAgdmFyIGlzRWRpdGVkID0gaXNMZWF2aW5nICYmIGVkaXRzLmxlbmd0aCAhPT0gMDtcbiAgICBpZiAoaXNMZWF2aW5nKSB7XG4gICAgICBrZXkgPSBhbmNlc3RvcnMubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogcGF0aC5wb3AoKTtcbiAgICAgIG5vZGUgPSBwYXJlbnQ7XG4gICAgICBwYXJlbnQgPSBhbmNlc3RvcnMucG9wKCk7XG4gICAgICBpZiAoaXNFZGl0ZWQpIHtcbiAgICAgICAgaWYgKGluQXJyYXkpIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5zbGljZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjbG9uZSA9IHt9O1xuICAgICAgICAgIGZvciAodmFyIGsgaW4gbm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgY2xvbmVba10gPSBub2RlW2tdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBub2RlID0gY2xvbmU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVkaXRPZmZzZXQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgZWRpdHMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgICAgdmFyIGVkaXRLZXkgPSBlZGl0c1tpaV1bMF07XG4gICAgICAgICAgdmFyIGVkaXRWYWx1ZSA9IGVkaXRzW2lpXVsxXTtcbiAgICAgICAgICBpZiAoaW5BcnJheSkge1xuICAgICAgICAgICAgZWRpdEtleSAtPSBlZGl0T2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW5BcnJheSAmJiBlZGl0VmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUuc3BsaWNlKGVkaXRLZXksIDEpO1xuICAgICAgICAgICAgZWRpdE9mZnNldCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlW2VkaXRLZXldID0gZWRpdFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW5kZXggPSBzdGFjay5pbmRleDtcbiAgICAgIGtleXMgPSBzdGFjay5rZXlzO1xuICAgICAgZWRpdHMgPSBzdGFjay5lZGl0cztcbiAgICAgIGluQXJyYXkgPSBzdGFjay5pbkFycmF5O1xuICAgICAgc3RhY2sgPSBzdGFjay5wcmV2O1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBwYXJlbnQgPyBpbkFycmF5ID8gaW5kZXggOiBrZXlzW2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgICAgIG5vZGUgPSBwYXJlbnQgPyBwYXJlbnRba2V5XSA6IG5ld1Jvb3Q7XG4gICAgICBpZiAobm9kZSA9PT0gbnVsbCB8fCBub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHBhdGgucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSB2b2lkIDA7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICBpZiAoIWlzTm9kZShub2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQVNUIE5vZGU6ICcgKyBKU09OLnN0cmluZ2lmeShub2RlKSk7XG4gICAgICB9XG4gICAgICB2YXIgdmlzaXRGbiA9IGdldFZpc2l0Rm4odmlzaXRvciwgbm9kZS5raW5kLCBpc0xlYXZpbmcpO1xuICAgICAgaWYgKHZpc2l0Rm4pIHtcbiAgICAgICAgcmVzdWx0ID0gdmlzaXRGbi5jYWxsKHZpc2l0b3IsIG5vZGUsIGtleSwgcGFyZW50LCBwYXRoLCBhbmNlc3RvcnMpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IEJSRUFLKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgIGlmICghaXNMZWF2aW5nKSB7XG4gICAgICAgICAgICBwYXRoLnBvcCgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZWRpdHMucHVzaChba2V5LCByZXN1bHRdKTtcbiAgICAgICAgICBpZiAoIWlzTGVhdmluZykge1xuICAgICAgICAgICAgaWYgKGlzTm9kZShyZXN1bHQpKSB7XG4gICAgICAgICAgICAgIG5vZGUgPSByZXN1bHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXRoLnBvcCgpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQgJiYgaXNFZGl0ZWQpIHtcbiAgICAgIGVkaXRzLnB1c2goW2tleSwgbm9kZV0pO1xuICAgIH1cblxuICAgIGlmICghaXNMZWF2aW5nKSB7XG4gICAgICBzdGFjayA9IHsgaW5BcnJheTogaW5BcnJheSwgaW5kZXg6IGluZGV4LCBrZXlzOiBrZXlzLCBlZGl0czogZWRpdHMsIHByZXY6IHN0YWNrIH07XG4gICAgICBpbkFycmF5ID0gQXJyYXkuaXNBcnJheShub2RlKTtcbiAgICAgIGtleXMgPSBpbkFycmF5ID8gbm9kZSA6IHZpc2l0b3JLZXlzW25vZGUua2luZF0gfHwgW107XG4gICAgICBpbmRleCA9IC0xO1xuICAgICAgZWRpdHMgPSBbXTtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgYW5jZXN0b3JzLnB1c2gocGFyZW50KTtcbiAgICAgIH1cbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9IHdoaWxlIChzdGFjayAhPT0gdW5kZWZpbmVkKTtcblxuICBpZiAoZWRpdHMubGVuZ3RoICE9PSAwKSB7XG4gICAgbmV3Um9vdCA9IGVkaXRzW2VkaXRzLmxlbmd0aCAtIDFdWzFdO1xuICB9XG5cbiAgcmV0dXJuIG5ld1Jvb3Q7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShtYXliZU5vZGUpIHtcbiAgcmV0dXJuIG1heWJlTm9kZSAmJiB0eXBlb2YgbWF5YmVOb2RlLmtpbmQgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmlzaXRvciBpbnN0YW5jZSB3aGljaCBkZWxlZ2F0ZXMgdG8gbWFueSB2aXNpdG9ycyB0byBydW4gaW5cbiAqIHBhcmFsbGVsLiBFYWNoIHZpc2l0b3Igd2lsbCBiZSB2aXNpdGVkIGZvciBlYWNoIG5vZGUgYmVmb3JlIG1vdmluZyBvbi5cbiAqXG4gKiBJZiBhIHByaW9yIHZpc2l0b3IgZWRpdHMgYSBub2RlLCBubyBmb2xsb3dpbmcgdmlzaXRvcnMgd2lsbCBzZWUgdGhhdCBub2RlLlxuICovXG5mdW5jdGlvbiB2aXNpdEluUGFyYWxsZWwodmlzaXRvcnMpIHtcbiAgdmFyIHNraXBwaW5nID0gbmV3IEFycmF5KHZpc2l0b3JzLmxlbmd0aCk7XG5cbiAgcmV0dXJuIHtcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIobm9kZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aXNpdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXNraXBwaW5nW2ldKSB7XG4gICAgICAgICAgdmFyIGZuID0gZ2V0VmlzaXRGbih2aXNpdG9yc1tpXSwgbm9kZS5raW5kLCAvKiBpc0xlYXZpbmcgKi9mYWxzZSk7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodmlzaXRvcnNbaV0sIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBza2lwcGluZ1tpXSA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gQlJFQUspIHtcbiAgICAgICAgICAgICAgc2tpcHBpbmdbaV0gPSBCUkVBSztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxlYXZlOiBmdW5jdGlvbiBsZWF2ZShub2RlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc2l0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghc2tpcHBpbmdbaV0pIHtcbiAgICAgICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3JzW2ldLCBub2RlLmtpbmQsIC8qIGlzTGVhdmluZyAqL3RydWUpO1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHZpc2l0b3JzW2ldLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gQlJFQUspIHtcbiAgICAgICAgICAgICAgc2tpcHBpbmdbaV0gPSBCUkVBSztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgcmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChza2lwcGluZ1tpXSA9PT0gbm9kZSkge1xuICAgICAgICAgIHNraXBwaW5nW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHZpc2l0b3IgaW5zdGFuY2Ugd2hpY2ggbWFpbnRhaW5zIGEgcHJvdmlkZWQgVHlwZUluZm8gaW5zdGFuY2VcbiAqIGFsb25nIHdpdGggdmlzaXRpbmcgdmlzaXRvci5cbiAqL1xuZnVuY3Rpb24gdmlzaXRXaXRoVHlwZUluZm8odHlwZUluZm8sIHZpc2l0b3IpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIobm9kZSkge1xuICAgICAgdHlwZUluZm8uZW50ZXIobm9kZSk7XG4gICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3IsIG5vZGUua2luZCwgLyogaXNMZWF2aW5nICovZmFsc2UpO1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh2aXNpdG9yLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0eXBlSW5mby5sZWF2ZShub2RlKTtcbiAgICAgICAgICBpZiAoaXNOb2RlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHR5cGVJbmZvLmVudGVyKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWF2ZTogZnVuY3Rpb24gbGVhdmUobm9kZSkge1xuICAgICAgdmFyIGZuID0gZ2V0VmlzaXRGbih2aXNpdG9yLCBub2RlLmtpbmQsIC8qIGlzTGVhdmluZyAqL3RydWUpO1xuICAgICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcbiAgICAgIGlmIChmbikge1xuICAgICAgICByZXN1bHQgPSBmbi5hcHBseSh2aXNpdG9yLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgdHlwZUluZm8ubGVhdmUobm9kZSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIHZpc2l0b3IgaW5zdGFuY2UsIGlmIGl0IGlzIGxlYXZpbmcgb3Igbm90LCBhbmQgYSBub2RlIGtpbmQsIHJldHVyblxuICogdGhlIGZ1bmN0aW9uIHRoZSB2aXNpdG9yIHJ1bnRpbWUgc2hvdWxkIGNhbGwuXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2l0Rm4odmlzaXRvciwga2luZCwgaXNMZWF2aW5nKSB7XG4gIHZhciBraW5kVmlzaXRvciA9IHZpc2l0b3Jba2luZF07XG4gIGlmIChraW5kVmlzaXRvcikge1xuICAgIGlmICghaXNMZWF2aW5nICYmIHR5cGVvZiBraW5kVmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8geyBLaW5kKCkge30gfVxuICAgICAgcmV0dXJuIGtpbmRWaXNpdG9yO1xuICAgIH1cbiAgICB2YXIga2luZFNwZWNpZmljVmlzaXRvciA9IGlzTGVhdmluZyA/IGtpbmRWaXNpdG9yLmxlYXZlIDoga2luZFZpc2l0b3IuZW50ZXI7XG4gICAgaWYgKHR5cGVvZiBraW5kU3BlY2lmaWNWaXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyB7IEtpbmQ6IHsgZW50ZXIoKSB7fSwgbGVhdmUoKSB7fSB9IH1cbiAgICAgIHJldHVybiBraW5kU3BlY2lmaWNWaXNpdG9yO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgc3BlY2lmaWNWaXNpdG9yID0gaXNMZWF2aW5nID8gdmlzaXRvci5sZWF2ZSA6IHZpc2l0b3IuZW50ZXI7XG4gICAgaWYgKHNwZWNpZmljVmlzaXRvcikge1xuICAgICAgaWYgKHR5cGVvZiBzcGVjaWZpY1Zpc2l0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8geyBlbnRlcigpIHt9LCBsZWF2ZSgpIHt9IH1cbiAgICAgICAgcmV0dXJuIHNwZWNpZmljVmlzaXRvcjtcbiAgICAgIH1cbiAgICAgIHZhciBzcGVjaWZpY0tpbmRWaXNpdG9yID0gc3BlY2lmaWNWaXNpdG9yW2tpbmRdO1xuICAgICAgaWYgKHR5cGVvZiBzcGVjaWZpY0tpbmRWaXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIHsgZW50ZXI6IHsgS2luZCgpIHt9IH0sIGxlYXZlOiB7IEtpbmQoKSB7fSB9IH1cbiAgICAgICAgcmV0dXJuIHNwZWNpZmljS2luZFZpc2l0b3I7XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdmVyQXJnO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBhcHBseU1pZGRsZXdhcmU7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG4gICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBfY29tcG9zZTJbJ2RlZmF1bHQnXS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBiaW5kQWN0aW9uQ3JlYXRvcnM7XG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uIGNyZWF0b3JzLCBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZVxuICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG4gKiBgc3RvcmUuZGlzcGF0Y2goTXlBY3Rpb25DcmVhdG9ycy5kb1NvbWV0aGluZygpKWAgeW91cnNlbGYganVzdCBmaW5lLlxuICpcbiAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIGdldCBhIGZ1bmN0aW9uIGluIHJldHVybi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gYWN0aW9uQ3JlYXRvcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uXG4gKiBjcmVhdG9yIGZ1bmN0aW9ucy4gT25lIGhhbmR5IHdheSB0byBvYnRhaW4gaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXNgXG4gKiBzeW50YXguIFlvdSBtYXkgYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRpc3BhdGNoIFRoZSBgZGlzcGF0Y2hgIGZ1bmN0aW9uIGF2YWlsYWJsZSBvbiB5b3VyIFJlZHV4XG4gKiBzdG9yZS5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBUaGUgb2JqZWN0IG1pbWlja2luZyB0aGUgb3JpZ2luYWwgb2JqZWN0LCBidXQgd2l0aFxuICogZXZlcnkgYWN0aW9uIGNyZWF0b3Igd3JhcHBlZCBpbnRvIHRoZSBgZGlzcGF0Y2hgIGNhbGwuIElmIHlvdSBwYXNzZWQgYVxuICogZnVuY3Rpb24gYXMgYGFjdGlvbkNyZWF0b3JzYCwgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGFsc28gYmUgYSBzaW5nbGVcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgIT09ICdvYmplY3QnIHx8IGFjdGlvbkNyZWF0b3JzID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWN0aW9uQ3JlYXRvcnMgZXhwZWN0ZWQgYW4gb2JqZWN0IG9yIGEgZnVuY3Rpb24sIGluc3RlYWQgcmVjZWl2ZWQgJyArIChhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBhY3Rpb25DcmVhdG9ycykgKyAnLiAnICsgJ0RpZCB5b3Ugd3JpdGUgXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiIGluc3RlYWQgb2YgXCJpbXBvcnQgKiBhcyBBY3Rpb25DcmVhdG9ycyBmcm9tXCI/Jyk7XG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbkNyZWF0b3JzKTtcbiAgdmFyIGJvdW5kQWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYm91bmRBY3Rpb25DcmVhdG9yc1trZXldID0gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRBY3Rpb25DcmVhdG9ycztcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjb21iaW5lUmVkdWNlcnM7XG5cbnZhciBfY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnLi91dGlscy93YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUID8gJ3ByZWxvYWRlZFN0YXRlIGFyZ3VtZW50IHBhc3NlZCB0byBjcmVhdGVTdG9yZScgOiAncHJldmlvdXMgc3RhdGUgcmVjZWl2ZWQgYnkgdGhlIHJlZHVjZXInO1xuXG4gIGlmIChyZWR1Y2VyS2V5cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ1N0b3JlIGRvZXMgbm90IGhhdmUgYSB2YWxpZCByZWR1Y2VyLiBNYWtlIHN1cmUgdGhlIGFyZ3VtZW50IHBhc3NlZCAnICsgJ3RvIGNvbWJpbmVSZWR1Y2VycyBpcyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSByZWR1Y2Vycy4nO1xuICB9XG5cbiAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGlucHV0U3RhdGUpKSB7XG4gICAgcmV0dXJuICdUaGUgJyArIGFyZ3VtZW50TmFtZSArICcgaGFzIHVuZXhwZWN0ZWQgdHlwZSBvZiBcIicgKyB7fS50b1N0cmluZy5jYWxsKGlucHV0U3RhdGUpLm1hdGNoKC9cXHMoW2EtenxBLVpdKykvKVsxXSArICdcIi4gRXhwZWN0ZWQgYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyAnICsgKCdrZXlzOiBcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIicpO1xuICB9XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRTdGF0ZSkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gIXJlZHVjZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgIXVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldO1xuICB9KTtcblxuICB1bmV4cGVjdGVkS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XSA9IHRydWU7XG4gIH0pO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNhbml0eShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gJ0BAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05fJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2FuaXR5RXJyb3I7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNhbml0eShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNhbml0eUVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNhbml0eUVycm9yKSB7XG4gICAgICB0aHJvdyBzYW5pdHlFcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGZpbmFsUmVkdWNlcktleXNbaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNba2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVba2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVba2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY29tcG9zZTtcbi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICB2YXIgbGFzdCA9IGZ1bmNzW2Z1bmNzLmxlbmd0aCAtIDFdO1xuICB2YXIgcmVzdCA9IGZ1bmNzLnNsaWNlKDAsIC0xKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVzdC5yZWR1Y2VSaWdodChmdW5jdGlvbiAoY29tcG9zZWQsIGYpIHtcbiAgICAgIHJldHVybiBmKGNvbXBvc2VkKTtcbiAgICB9LCBsYXN0LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHVuZGVmaW5lZDtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZVN0b3JlO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ3N5bWJvbC1vYnNlcnZhYmxlJyk7XG5cbnZhciBfc3ltYm9sT2JzZXJ2YWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2xPYnNlcnZhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIFRoZXNlIGFyZSBwcml2YXRlIGFjdGlvbiB0eXBlcyByZXNlcnZlZCBieSBSZWR1eC5cbiAqIEZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB5b3UgbXVzdCByZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGUuXG4gKiBJZiB0aGUgY3VycmVudCBzdGF0ZSBpcyB1bmRlZmluZWQsIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAqIERvIG5vdCByZWZlcmVuY2UgdGhlc2UgYWN0aW9uIHR5cGVzIGRpcmVjdGx5IGluIHlvdXIgY29kZS5cbiAqL1xudmFyIEFjdGlvblR5cGVzID0gZXhwb3J0cy5BY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCdcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIFJlZHV4IHN0b3JlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIHRyZWUuXG4gKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAqXG4gKiBUaGVyZSBzaG91bGQgb25seSBiZSBhIHNpbmdsZSBzdG9yZSBpbiB5b3VyIGFwcC4gVG8gc3BlY2lmeSBob3cgZGlmZmVyZW50XG4gKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gKlxuICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICogcHJldmlvdXNseSBzZXJpYWxpemVkIHVzZXIgc2Vzc2lvbi5cbiAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZW5oYW5jZXIgVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAqXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxpc3RlbmVyc1tpXSgpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3plbnBhcnNpbmcvZXMtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuY29tcG9zZSA9IGV4cG9ydHMuYXBwbHlNaWRkbGV3YXJlID0gZXhwb3J0cy5iaW5kQWN0aW9uQ3JlYXRvcnMgPSBleHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IGV4cG9ydHMuY3JlYXRlU3RvcmUgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbnZhciBfY3JlYXRlU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlU3RvcmUpO1xuXG52YXIgX2NvbWJpbmVSZWR1Y2VycyA9IHJlcXVpcmUoJy4vY29tYmluZVJlZHVjZXJzJyk7XG5cbnZhciBfY29tYmluZVJlZHVjZXJzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbWJpbmVSZWR1Y2Vycyk7XG5cbnZhciBfYmluZEFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSgnLi9iaW5kQWN0aW9uQ3JlYXRvcnMnKTtcblxudmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmluZEFjdGlvbkNyZWF0b3JzKTtcblxudmFyIF9hcHBseU1pZGRsZXdhcmUgPSByZXF1aXJlKCcuL2FwcGx5TWlkZGxld2FyZScpO1xuXG52YXIgX2FwcGx5TWlkZGxld2FyZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hcHBseU1pZGRsZXdhcmUpO1xuXG52YXIgX2NvbXBvc2UgPSByZXF1aXJlKCcuL2NvbXBvc2UnKTtcblxudmFyIF9jb21wb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvc2UpO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCcuL3V0aWxzL3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnRzLmNyZWF0ZVN0b3JlID0gX2NyZWF0ZVN0b3JlMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBfY29tYmluZVJlZHVjZXJzMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5iaW5kQWN0aW9uQ3JlYXRvcnMgPSBfYmluZEFjdGlvbkNyZWF0b3JzMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBfYXBwbHlNaWRkbGV3YXJlMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5jb21wb3NlID0gX2NvbXBvc2UyWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gd2FybmluZztcbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3BvbnlmaWxsID0gcmVxdWlyZSgnLi9wb255ZmlsbCcpO1xuXG52YXIgX3BvbnlmaWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbnlmaWxsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgcm9vdDsgLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9ICgwLCBfcG9ueWZpbGwyWydkZWZhdWx0J10pKHJvb3QpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmVzdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF1cblxuICAgIHZhciBpc0RhdGFWaWV3ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbiAgICB9XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhlYWRlcikge1xuICAgICAgICB0aGlzLmFwcGVuZChoZWFkZXJbMF0sIGhlYWRlclsxXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy5tYXBbbmFtZV1cbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUrJywnK3ZhbHVlIDogdmFsdWVcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShub3JtYWxpemVOYW1lKG5hbWUpKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzLm1hcCkge1xuICAgICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdGhpcy5tYXBbbmFtZV0sIG5hbWUsIHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIHJhd0hlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCkudHJpbSgpXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKClcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpXG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fVxuICAgIH1cblxuICAgIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICAgIHRoaXMuc3RhdHVzID0gJ3N0YXR1cycgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzIDogMjAwXG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICAgIHRoaXMuc3RhdHVzVGV4dCA9ICdzdGF0dXNUZXh0JyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXNUZXh0IDogJ09LJ1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH1cblxuICBSZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcidcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIHZhciByZWRpcmVjdFN0YXR1c2VzID0gWzMwMSwgMzAyLCAzMDMsIDMwNywgMzA4XVxuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH1cblxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlXG5cbiAgc2VsZi5mZXRjaCA9IGZ1bmN0aW9uKGlucHV0LCBpbml0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdClcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHRcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgICBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ2luY2x1ZGUnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgICB9KVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICAgIH0pXG4gIH1cbiAgc2VsZi5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzKTtcbiJdfQ==
