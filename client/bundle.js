(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['mutation (\n  $username: String!, \n  $firstname: String!, \n  $lastname: String!, \n  $phoneNumber: String!,\n  $password: String!,\n  $roles: [Roles!]){\n  signUp(username: $username, password: $password, firstName: $firstname, lastName: $lastname, phoneNumber: $phoneNumber, roles: $roles)\n  {\n    _id\n    username\n    roles\n  }\n}'], ['mutation (\n  $username: String!, \n  $firstname: String!, \n  $lastname: String!, \n  $phoneNumber: String!,\n  $password: String!,\n  $roles: [Roles!]){\n  signUp(username: $username, password: $password, firstName: $firstname, lastName: $lastname, phoneNumber: $phoneNumber, roles: $roles)\n  {\n    _id\n    username\n    roles\n  }\n}']),
    _templateObject2 = _taggedTemplateLiteral(['mutation ($username: String!, $password: String!){\n  logIn(username: $username, password: $password) {\n    token\n    data {\n      _id\n      username\n      roles\n    }\n  }\n}'], ['mutation ($username: String!, $password: String!){\n  logIn(username: $username, password: $password) {\n    token\n    data {\n      _id\n      username\n      roles\n    }\n  }\n}']),
    _templateObject3 = _taggedTemplateLiteral(['query {\n  allOrders {\n        _id\n        user {\n          _id\n          username\n          firstName\n          lastName\n        }\n        items {\n          itemDescription\n          itemPrice\n        }\n        total\n        statusMessage\n        fulfilled\n        createdAt\n\t}\n}'], ['query {\n  allOrders {\n        _id\n        user {\n          _id\n          username\n          firstName\n          lastName\n        }\n        items {\n          itemDescription\n          itemPrice\n        }\n        total\n        statusMessage\n        fulfilled\n        createdAt\n\t}\n}']),
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

networkInterface.use([{
  applyMiddleware: function applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    req.options.headers = {
      authorization: webtoken ? 'Bearer ' + webtoken : null
    };
    next();
  }
}]);

var client = new _apolloClient2.default({
  networkInterface: networkInterface
});

var observableMenuQuery = client.watchQuery({ fetchPolicy: 'network-only', query: menuQuery, pollInterval: 1000 });
observableMenuQuery.subscribe({
  next: function next(_ref) {
    var data = _ref.data;
    return displayLiveResults(data, "menu");
  }
});

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

      observableOrdersQuery = client.watchQuery({ fetchPolicy: 'network-only', query: ordersQuery, pollInterval: 1000 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9hcG9sbG8tY2xpZW50L2Fwb2xsby51bWQuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2RpcmVjdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2dldEZyb21BU1QuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2dyYXBocWwuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC1hbnl3aGVyZS9saWIvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwtYW55d2hlcmUvbGliL3NyYy9zdG9yZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwtYW55d2hlcmUvbGliL3NyYy91dGlsaXRpZXMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC10YWcvbGliL2dyYXBocWwtdGFnLnVtZC5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2Vycm9yL0dyYXBoUUxFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2Vycm9yL2Zvcm1hdEVycm9yLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvZXJyb3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9lcnJvci9sb2NhdGVkRXJyb3IuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9lcnJvci9zeW50YXhFcnJvci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2pzdXRpbHMvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2Uva2luZHMuanMiLCJub2RlX21vZHVsZXMvZ3JhcGhxbC9sYW5ndWFnZS9sZXhlci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL2xvY2F0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2UvcGFyc2VyLmpzIiwibm9kZV9tb2R1bGVzL2dyYXBocWwvbGFuZ3VhZ2UvcHJpbnRlci5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL3NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9ncmFwaHFsL2xhbmd1YWdlL3Zpc2l0b3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlckFyZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2FwcGx5TWlkZGxld2FyZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21iaW5lUmVkdWNlcnMuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2NvbXBvc2UuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2NyZWF0ZVN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvdXRpbHMvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvbGliL3BvbnlmaWxsLmpzIiwibm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9mZXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDSUE7Ozs7QUFFQTs7Ozs7O2tKQU5BO0FBQ0E7QUFDQTs7QUFNQSxJQUFNLG1CQUFtQiwwQ0FBdUIsRUFBQyxLQUFLLCtCQUFOLEVBQXZCLENBQXpCOztBQUVBLElBQUksV0FBVyxFQUFmOztBQUVBLElBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsTUFBRCxFQUFZO0FBQ2hDLFdBQVMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxTQUFsQyxHQUNFLEtBQUssU0FBTCxDQUFlLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FERjtBQUVELENBSEQ7O0FBS0EsSUFBTSxlQUFlLFNBQWYsWUFBZSxDQUFDLEtBQUQsRUFBVztBQUM5QixXQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsU0FBakMsR0FBNkMsS0FBN0M7QUFDRCxDQUZEOztBQUlBLElBQU0scUJBQXFCLFNBQXJCLGtCQUFxQixDQUFDLE1BQUQsRUFBUyxJQUFULEVBQWtCO0FBQzNDLE1BQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsaUJBQWlCLElBQXhDLENBQVQ7QUFDQSxLQUFHLFNBQUgsR0FBZSxLQUFLLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLElBQXZCLEVBQTZCLENBQTdCLENBQWY7QUFDQSxLQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWlCLE9BQWpCO0FBQ0EsYUFBVztBQUFBLFdBQU0sR0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixPQUFwQixDQUFOO0FBQUEsR0FBWCxFQUErQyxHQUEvQztBQUNELENBTEQ7O0FBT0EsSUFBTSwyREFBTjs7QUFlQSxJQUFNLDJEQUFOOztBQVdBLElBQU0seURBQU47O0FBb0JBLElBQU0sdURBQU47O0FBOENBLFNBQVMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNEQsWUFBTTtBQUNoRSxNQUFNLFdBQVcsU0FBUyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxLQUE1RDtBQUNBLE1BQU0sV0FBVyxTQUFTLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBQTVEO0FBQ0EsTUFBTSxZQUFZLFNBQVMsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxLQUF2RDtBQUNBLE1BQU0sV0FBVyxTQUFTLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsS0FBckQ7QUFDQSxNQUFNLGNBQWMsU0FBUyxjQUFULENBQXdCLGNBQXhCLEVBQXdDLEtBQTVEO0FBQ0EsTUFBTSxRQUFRLENBQUMsU0FBUyxjQUFULENBQXdCLE1BQXhCLEVBQWdDLEtBQWpDLENBQWQ7O0FBRUEsU0FDRyxNQURILENBQ1UsRUFBRSxVQUFVLGNBQVosRUFBNEIsYUFBYSxjQUF6QyxFQUF5RCxXQUFXLEVBQUUsa0JBQUYsRUFBWSxvQkFBWixFQUF1QixrQkFBdkIsRUFBaUMsd0JBQWpDLEVBQThDLGtCQUE5QyxFQUF3RCxZQUF4RCxFQUFwRSxFQURWLEVBRUcsSUFGSCxDQUVRLGFBRlIsRUFFdUIsYUFGdkI7QUFHRCxDQVhEOztBQWFBLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsWUFBTTtBQUM3RCxNQUFNLFFBQVEsU0FBUyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXBEOztBQUVBLE1BQUksTUFBTSxJQUFOLEdBQWEsT0FBYixDQUFxQixVQUFyQixNQUFxQyxDQUF6QyxFQUE0QztBQUMxQyxXQUNHLE1BREgsQ0FDVSxFQUFFLHNEQUFnQixLQUFoQixDQUFGLEVBQTJCLGFBQWEsY0FBeEMsRUFEVixFQUVHLElBRkgsQ0FFUSxhQUZSLEVBRXVCLGFBRnZCO0FBR0Q7O0FBRUQsTUFBSSxNQUFNLElBQU4sR0FBYSxPQUFiLENBQXFCLE9BQXJCLE1BQWtDLENBQXRDLEVBQXlDO0FBQ3ZDLFdBQ0csS0FESCxDQUNTLEVBQUUsbURBQWEsS0FBYixDQUFGLEVBQXlCLGFBQWEsY0FBdEMsRUFEVCxFQUVHLElBRkgsQ0FFUSxhQUZSLEVBRXVCLGFBRnZCO0FBR0Q7QUFDRixDQWREOztBQWdCQSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsZ0JBQWpDLENBQWtELE9BQWxELEVBQTJELFVBQUMsQ0FBRCxFQUFPO0FBQ2hFLFdBQVMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxLQUF0QyxHQUE4QyxFQUE5QztBQUNELENBRkQ7O0FBSUEsSUFBSSxxQkFBSixFQUEyQixrQkFBM0I7O0FBRUEsaUJBQWlCLEdBQWpCLENBQXFCLENBQUM7QUFDcEIsaUJBRG9CLDJCQUNKLEdBREksRUFDQyxJQURELEVBQ087QUFDekIsUUFBSSxDQUFDLElBQUksT0FBSixDQUFZLE9BQWpCLEVBQTBCO0FBQ3hCLFVBQUksT0FBSixDQUFZLE9BQVosR0FBc0IsRUFBdEIsQ0FEd0IsQ0FDRztBQUM1QjtBQUNELFFBQUksT0FBSixDQUFZLE9BQVosR0FBc0I7QUFDcEIscUJBQWUsV0FBVyxZQUFZLFFBQXZCLEdBQWtDO0FBRDdCLEtBQXRCO0FBR0E7QUFDRDtBQVRtQixDQUFELENBQXJCOztBQVlBLElBQU0sU0FBUywyQkFBaUI7QUFDOUI7QUFEOEIsQ0FBakIsQ0FBZjs7QUFJQSxJQUFNLHNCQUFzQixPQUFPLFVBQVAsQ0FBa0IsRUFBQyxhQUFhLGNBQWQsRUFBOEIsT0FBTyxTQUFyQyxFQUFnRCxjQUFjLElBQTlELEVBQWxCLENBQTVCO0FBQ0Esb0JBQW9CLFNBQXBCLENBQThCO0FBQzVCLFFBQU07QUFBQSxRQUFHLElBQUgsUUFBRyxJQUFIO0FBQUEsV0FBYyxtQkFBbUIsSUFBbkIsRUFBeUIsTUFBekIsQ0FBZDtBQUFBO0FBRHNCLENBQTlCOztBQUlBLFNBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxnQkFBakMsQ0FBa0QsT0FBbEQsRUFBMkQsWUFBTTtBQUMvRCxNQUFNLFdBQVcsU0FBUyxjQUFULENBQXdCLGdCQUF4QixFQUEwQyxLQUEzRDtBQUNBLE1BQU0sV0FBVyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLEVBQTBDLEtBQTNEOztBQUVBLFNBQ0csTUFESCxDQUNVLEVBQUUsVUFBVSxhQUFaLEVBQTJCLGFBQWEsY0FBeEMsRUFBd0QsV0FBVyxFQUFFLGtCQUFGLEVBQVksa0JBQVosRUFBbkUsRUFEVixFQUVHLElBRkgsQ0FFUSxVQUFDLE1BQUQsRUFBWTtBQUNkLFFBQUksT0FBTyxJQUFQLElBQWUsT0FBTyxJQUFQLENBQVksS0FBM0IsSUFBb0MsT0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixLQUExRCxFQUFpRTtBQUMvRCxpQkFBVyxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEtBQTdCO0FBQ0EsbUJBQWEsUUFBYjtBQUNBLFVBQUkscUJBQUosRUFBMkI7QUFDekIsOEJBQXNCLFdBQXRCO0FBQ0Q7QUFDRCxVQUFJLGtCQUFKLEVBQXdCO0FBQ3RCLDJCQUFtQixXQUFuQjtBQUNEOztBQUVELDhCQUF3QixPQUFPLFVBQVAsQ0FBa0IsRUFBQyxhQUFhLGNBQWQsRUFBOEIsT0FBTyxXQUFyQyxFQUFrRCxjQUFjLElBQWhFLEVBQWxCLENBQXhCO0FBQ0EsMkJBQXFCLHNCQUFzQixTQUF0QixDQUFnQztBQUNuRCxjQUFNO0FBQUEsY0FBRyxJQUFILFNBQUcsSUFBSDtBQUFBLGlCQUFjLG1CQUFtQixJQUFuQixFQUF5QixRQUF6QixDQUFkO0FBQUE7QUFENkMsT0FBaEMsQ0FBckI7QUFHRDtBQUNILGtCQUFjLE1BQWQ7QUFDRCxHQW5CSCxFQW1CSyxhQW5CTDtBQW9CRCxDQXhCRDs7QUEwQkE7QUFDQTtBQUNBOztBQUVFLElBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVjtBQUNBLElBQUksTUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjs7QUFFQSxJQUFJLFlBQ0o7QUFDRSxRQUFZLEVBRGQ7QUFFRSxhQUFZLEtBRmQ7QUFHRSxRQUFZLGNBQVUsR0FBVixFQUNaO0FBQ0UsUUFBSSxVQUFVLFNBQWQsRUFDQTtBQUNFLFVBQUksY0FBSjtBQUNBLFVBQUksYUFBSixDQUFrQixPQUFsQixDQUEwQixZQUExQixFQUF3QyxVQUFVLElBQWxEO0FBQ0EsZ0JBQVUsU0FBVixHQUFzQixLQUF0QjtBQUNBLGdCQUFVLElBQVYsR0FBc0IsRUFBdEI7QUFDRDtBQUNGO0FBWkgsQ0FEQTtBQWVBLE9BQU8sZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsVUFBVSxJQUExQztBQUNBLElBQUksZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIsYUFBOUI7QUFDQSxTQUFTLGFBQVQsR0FDQTtBQUNFLFlBQVUsSUFBVixHQUFpQixJQUFJLFNBQXJCO0FBQ0EsTUFBSSxPQUFPLGFBQVgsRUFDQTtBQUNFLFdBQU8sYUFBUCxDQUFxQixPQUFyQixDQUE2QixNQUE3QixFQUFxQyxVQUFVLElBQS9DO0FBQ0QsR0FIRCxNQUtBO0FBQ0UsY0FBVSxTQUFWLEdBQXNCLElBQXRCO0FBQ0EsYUFBUyxXQUFULENBQXFCLE1BQXJCO0FBQ0Q7QUFDRjs7OztBQzlPSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4N0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3BRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9cbi8vIEJhc2ljIFRlc3QgQ2xpZW50IHVzaW5nIEFwb2xsbyBDbGllbnQgYW5kIEFwb2xsbyBHcmFwaFFMLVRhZyB0ZW1wbGF0ZSBraWJyYXJ5XG4vLyBObyBSZWFjdCB5ZXRcblxuaW1wb3J0IEFwb2xsb0NsaWVudCwgeyBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlIH0gZnJvbSAnYXBvbGxvLWNsaWVudCc7XG5cbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuXG5jb25zdCBuZXR3b3JrSW50ZXJmYWNlID0gY3JlYXRlTmV0d29ya0ludGVyZmFjZSh7dXJpOiAnaHR0cDovL2xvY2FsaG9zdDozMDMwL2dyYXBocWwnfSk7XG5cbnZhciB3ZWJ0b2tlbiA9IFwiXCJcblxuY29uc3QgZGlzcGxheVJlc3VsdCA9IChyZXN1bHQpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdCcpLmlubmVySFRNTCA9XG4gICAgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlUb2tlbiA9ICh0b2tlbikgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9rZW4nKS5pbm5lckhUTUwgPSB0b2tlblxufTtcblxuY29uc3QgZGlzcGxheUxpdmVSZXN1bHRzID0gKHJlc3VsdCwgdHlwZSkgPT4ge1xuICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl2ZVJlc3VsdC4nICsgdHlwZSlcbiAgZWwuaW5uZXJIVE1MID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKTtcbiAgZWwuY2xhc3NMaXN0LmFkZCgnYWxlcnQnKVxuICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FsZXJ0JyksIDIwMClcbn07XG5cbmNvbnN0IHNpZ251cE11dGF0aW9uID0gZ3FsYG11dGF0aW9uIChcbiAgJHVzZXJuYW1lOiBTdHJpbmchLCBcbiAgJGZpcnN0bmFtZTogU3RyaW5nISwgXG4gICRsYXN0bmFtZTogU3RyaW5nISwgXG4gICRwaG9uZU51bWJlcjogU3RyaW5nISxcbiAgJHBhc3N3b3JkOiBTdHJpbmchLFxuICAkcm9sZXM6IFtSb2xlcyFdKXtcbiAgc2lnblVwKHVzZXJuYW1lOiAkdXNlcm5hbWUsIHBhc3N3b3JkOiAkcGFzc3dvcmQsIGZpcnN0TmFtZTogJGZpcnN0bmFtZSwgbGFzdE5hbWU6ICRsYXN0bmFtZSwgcGhvbmVOdW1iZXI6ICRwaG9uZU51bWJlciwgcm9sZXM6ICRyb2xlcylcbiAge1xuICAgIF9pZFxuICAgIHVzZXJuYW1lXG4gICAgcm9sZXNcbiAgfVxufWA7XG5cbmNvbnN0IGxvZ2luTXV0YXRpb24gPSBncWxgbXV0YXRpb24gKCR1c2VybmFtZTogU3RyaW5nISwgJHBhc3N3b3JkOiBTdHJpbmchKXtcbiAgbG9nSW4odXNlcm5hbWU6ICR1c2VybmFtZSwgcGFzc3dvcmQ6ICRwYXNzd29yZCkge1xuICAgIHRva2VuXG4gICAgZGF0YSB7XG4gICAgICBfaWRcbiAgICAgIHVzZXJuYW1lXG4gICAgICByb2xlc1xuICAgIH1cbiAgfVxufWA7XG5cbmNvbnN0IG9yZGVyc1F1ZXJ5ID0gZ3FsYHF1ZXJ5IHtcbiAgYWxsT3JkZXJzIHtcbiAgICAgICAgX2lkXG4gICAgICAgIHVzZXIge1xuICAgICAgICAgIF9pZFxuICAgICAgICAgIHVzZXJuYW1lXG4gICAgICAgICAgZmlyc3ROYW1lXG4gICAgICAgICAgbGFzdE5hbWVcbiAgICAgICAgfVxuICAgICAgICBpdGVtcyB7XG4gICAgICAgICAgaXRlbURlc2NyaXB0aW9uXG4gICAgICAgICAgaXRlbVByaWNlXG4gICAgICAgIH1cbiAgICAgICAgdG90YWxcbiAgICAgICAgc3RhdHVzTWVzc2FnZVxuICAgICAgICBmdWxmaWxsZWRcbiAgICAgICAgY3JlYXRlZEF0XG5cdH1cbn1gXG5cbmNvbnN0IG1lbnVRdWVyeSA9IGdxbGBxdWVyeSB7XG4gIG1lbnUge1xuICAgIGVudHJlZXMge1xuICAgICAgX2lkXG4gICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgIGl0ZW1QcmljZVxuICAgICAgdGFnc1xuICAgICAgc2lkZXMge1xuICAgICAgICBfaWRcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uXG4gICAgICAgIHRhZ3NcbiAgICAgIH1cbiAgICAgIHVwc2VsbHMge1xuICAgICAgICBfaWRcbiAgICAgICAgaXRlbURlc2NyaXB0aW9uXG4gICAgICAgIGl0ZW1QcmljZVxuICAgICAgICB0YWdzXG4gICAgICB9XG4gICAgfVxuICAgIHNpZGVzIHtcbiAgICAgIF9pZFxuICAgICAgaXRlbURlc2NyaXB0aW9uXG4gICAgICBpdGVtUHJpY2VcbiAgICAgIHRhZ3NcbiAgICB9XG4gICAgYXBwZXRpemVycyB7XG4gICAgICBfaWRcbiAgICAgIGl0ZW1EZXNjcmlwdGlvblxuICAgICAgaXRlbVByaWNlXG4gICAgICB0YWdzXG4gICAgfVxuICAgIGRlc2VydHMge1xuICAgICAgX2lkXG4gICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgIGl0ZW1QcmljZVxuICAgICAgdGFnc1xuICAgIH1cbiAgICBkcmlua3Mge1xuICAgICAgX2lkXG4gICAgICBpdGVtRGVzY3JpcHRpb25cbiAgICAgIGl0ZW1QcmljZVxuICAgICAgdGFnc1xuICAgIH1cbiAgfVxufWBcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ251cCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWdudXBfdXNlcm5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwX3Bhc3N3b3JkJykudmFsdWU7XG4gIGNvbnN0IGZpcnN0bmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdG5hbWUnKS52YWx1ZTtcbiAgY29uc3QgbGFzdG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFzdG5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvbmVfbnVtYmVyJykudmFsdWU7XG4gIGNvbnN0IHJvbGVzID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlJykudmFsdWVdO1xuXG4gIGNsaWVudFxuICAgIC5tdXRhdGUoeyBtdXRhdGlvbjogc2lnbnVwTXV0YXRpb24sIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgdmFyaWFibGVzOiB7IHVzZXJuYW1lLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBwaG9uZU51bWJlciwgcGFzc3dvcmQsIHJvbGVzIH0gfSlcbiAgICAudGhlbihkaXNwbGF5UmVzdWx0LCBkaXNwbGF5UmVzdWx0KVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ydW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1pbnB1dCcpLnZhbHVlO1xuXG4gIGlmIChpbnB1dC50cmltKCkuaW5kZXhPZihcIm11dGF0aW9uXCIpID09PSAwKSB7XG4gICAgY2xpZW50XG4gICAgICAubXV0YXRlKHsgbXV0YXRpb246IGdxbGAke2lucHV0fWAsIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyB9KVxuICAgICAgLnRoZW4oZGlzcGxheVJlc3VsdCwgZGlzcGxheVJlc3VsdClcbiAgfVxuXG4gIGlmIChpbnB1dC50cmltKCkuaW5kZXhPZihcInF1ZXJ5XCIpID09PSAwKSB7XG4gICAgY2xpZW50XG4gICAgICAucXVlcnkoeyBxdWVyeTogZ3FsYCR7aW5wdXR9YCwgIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JyB9KVxuICAgICAgLnRoZW4oZGlzcGxheVJlc3VsdCwgZGlzcGxheVJlc3VsdClcbiAgfVxufSlcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsZWFyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1pbnB1dCcpLnZhbHVlID0gXCJcIlxufSlcblxudmFyIG9ic2VydmFibGVPcmRlcnNRdWVyeSwgb3JkZXJzU3Vic2NyaXB0aW9uO1xuXG5uZXR3b3JrSW50ZXJmYWNlLnVzZShbe1xuICBhcHBseU1pZGRsZXdhcmUocmVxLCBuZXh0KSB7XG4gICAgaWYgKCFyZXEub3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICByZXEub3B0aW9ucy5oZWFkZXJzID0ge307ICAvLyBDcmVhdGUgdGhlIGhlYWRlciBvYmplY3QgaWYgbmVlZGVkLlxuICAgIH1cbiAgICByZXEub3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgYXV0aG9yaXphdGlvbjogd2VidG9rZW4gPyAnQmVhcmVyICcgKyB3ZWJ0b2tlbiA6IG51bGxcbiAgICB9XG4gICAgbmV4dCgpO1xuICB9XG59XSlcblxuY29uc3QgY2xpZW50ID0gbmV3IEFwb2xsb0NsaWVudCh7XG4gIG5ldHdvcmtJbnRlcmZhY2Vcbn0pXG5cbmNvbnN0IG9ic2VydmFibGVNZW51UXVlcnkgPSBjbGllbnQud2F0Y2hRdWVyeSh7ZmV0Y2hQb2xpY3k6ICduZXR3b3JrLW9ubHknLCBxdWVyeTogbWVudVF1ZXJ5LCBwb2xsSW50ZXJ2YWw6IDEwMDAgfSlcbm9ic2VydmFibGVNZW51UXVlcnkuc3Vic2NyaWJlKHtcbiAgbmV4dDogKHsgZGF0YSB9KSA9PiBkaXNwbGF5TGl2ZVJlc3VsdHMoZGF0YSwgXCJtZW51XCIpXG59KVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9naW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW5fdXNlcm5hbWUnKS52YWx1ZTtcbiAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW5fcGFzc3dvcmQnKS52YWx1ZTtcblxuICBjbGllbnRcbiAgICAubXV0YXRlKHsgbXV0YXRpb246IGxvZ2luTXV0YXRpb24sIGZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgdmFyaWFibGVzOiB7IHVzZXJuYW1lLCBwYXNzd29yZCB9IH0pXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LmRhdGEgJiYgcmVzdWx0LmRhdGEubG9nSW4gJiYgcmVzdWx0LmRhdGEubG9nSW4udG9rZW4pIHtcbiAgICAgICAgICB3ZWJ0b2tlbiA9IHJlc3VsdC5kYXRhLmxvZ0luLnRva2VuXG4gICAgICAgICAgZGlzcGxheVRva2VuKHdlYnRva2VuKVxuICAgICAgICAgIGlmIChvYnNlcnZhYmxlT3JkZXJzUXVlcnkpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGVPcmRlcnNRdWVyeS5zdG9wUG9sbGluZygpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcmRlcnNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIG9yZGVyc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2JzZXJ2YWJsZU9yZGVyc1F1ZXJ5ID0gY2xpZW50LndhdGNoUXVlcnkoe2ZldGNoUG9saWN5OiAnbmV0d29yay1vbmx5JywgcXVlcnk6IG9yZGVyc1F1ZXJ5LCBwb2xsSW50ZXJ2YWw6IDEwMDAgfSlcbiAgICAgICAgICBvcmRlcnNTdWJzY3JpcHRpb24gPSBvYnNlcnZhYmxlT3JkZXJzUXVlcnkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6ICh7IGRhdGEgfSkgPT4gZGlzcGxheUxpdmVSZXN1bHRzKGRhdGEsIFwib3JkZXJzXCIpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgZGlzcGxheVJlc3VsdChyZXN1bHQpXG4gICAgfSwgZGlzcGxheVJlc3VsdClcbn0pXG5cbi8vXG4vLyBpZ25vcmUgZXZlcnl0aGluZyBiZWxvdyAoY29weSB0byBjbGlwYm9hcmQgZnVuY3Rpb25hbGl0eSBmb3IgdGVzdCBjbGllbnQpXG4vL1xuXG4gIHZhciB0eHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9rZW4nKVxuICB2YXIgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvcHknKVxuICBcbiAgdmFyIGNsaXBib2FyZCA9XG4gIHtcbiAgICBkYXRhICAgICAgOiAnJyxcbiAgICBpbnRlcmNlcHQgOiBmYWxzZSxcbiAgICBob29rICAgICAgOiBmdW5jdGlvbiAoZXZ0KVxuICAgIHtcbiAgICAgIGlmIChjbGlwYm9hcmQuaW50ZXJjZXB0KVxuICAgICAge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZ0LmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNsaXBib2FyZC5kYXRhKTtcbiAgICAgICAgY2xpcGJvYXJkLmludGVyY2VwdCA9IGZhbHNlO1xuICAgICAgICBjbGlwYm9hcmQuZGF0YSAgICAgID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY29weScsIGNsaXBib2FyZC5ob29rKTtcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdXR0b25DbGljayk7XG4gIGZ1bmN0aW9uIG9uQnV0dG9uQ2xpY2sgKClcbiAge1xuICAgIGNsaXBib2FyZC5kYXRhID0gdHh0LmlubmVyVGV4dDtcbiAgICBpZiAod2luZG93LmNsaXBib2FyZERhdGEpXG4gICAge1xuICAgICAgd2luZG93LmNsaXBib2FyZERhdGEuc2V0RGF0YSgnVGV4dCcsIGNsaXBib2FyZC5kYXRhKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIGNsaXBib2FyZC5pbnRlcmNlcHQgPSB0cnVlO1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICB9XG4gIH1cblxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCd3aGF0d2ctZmV0Y2gnKSwgcmVxdWlyZSgnZ3JhcGhxbC9sYW5ndWFnZS9wcmludGVyJyksIHJlcXVpcmUoJ3JlZHV4JyksIHJlcXVpcmUoJ2dyYXBocWwtYW55d2hlcmUnKSwgcmVxdWlyZSgnc3ltYm9sLW9ic2VydmFibGUnKSkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ3doYXR3Zy1mZXRjaCcsICdncmFwaHFsL2xhbmd1YWdlL3ByaW50ZXInLCAncmVkdXgnLCAnZ3JhcGhxbC1hbnl3aGVyZScsICdzeW1ib2wtb2JzZXJ2YWJsZSddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuYXBvbGxvID0gZ2xvYmFsLmFwb2xsbyB8fCB7fSksbnVsbCxnbG9iYWwuZ3JhcGhxbF9sYW5ndWFnZV9wcmludGVyLGdsb2JhbC5yZWR1eCxnbG9iYWwuZ3JhcGhxbEFueXdoZXJlLGdsb2JhbC4kJG9ic2VydmFibGUpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzLHdoYXR3Z0ZldGNoLGdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlcixyZWR1eCxncmFwaHFsQW55d2hlcmUsJCRvYnNlcnZhYmxlKSB7ICd1c2Ugc3RyaWN0JztcblxuZ3JhcGhxbEFueXdoZXJlID0gJ2RlZmF1bHQnIGluIGdyYXBocWxBbnl3aGVyZSA/IGdyYXBocWxBbnl3aGVyZVsnZGVmYXVsdCddIDogZ3JhcGhxbEFueXdoZXJlO1xuJCRvYnNlcnZhYmxlID0gJ2RlZmF1bHQnIGluICQkb2JzZXJ2YWJsZSA/ICQkb2JzZXJ2YWJsZVsnZGVmYXVsdCddIDogJCRvYnNlcnZhYmxlO1xuXG52YXIgX19leHRlbmRzID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24gPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5mdW5jdGlvbiBwcmludFJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBfX2Fzc2lnbih7fSwgcmVxdWVzdCwgeyBxdWVyeTogZ3JhcGhxbF9sYW5ndWFnZV9wcmludGVyLnByaW50KHJlcXVlc3QucXVlcnkpIH0pO1xufVxudmFyIEJhc2VOZXR3b3JrSW50ZXJmYWNlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYXNlTmV0d29ya0ludGVyZmFjZSh1cmksIG9wdHMpIHtcbiAgICAgICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0ge307IH1cbiAgICAgICAgaWYgKCF1cmkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSByZW1vdGUgZW5kcG9pbnQgaXMgcmVxdWlyZWQgZm9yIGEgbmV0d29yayBsYXllcicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdXJpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW1vdGUgZW5kcG9pbnQgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5fb3B0cyA9IF9fYXNzaWduKHt9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5fbWlkZGxld2FyZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJ3YXJlcyA9IFtdO1xuICAgIH1cbiAgICBCYXNlTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignQmFzZU5ldHdvcmtJbnRlcmZhY2Ugc2hvdWxkIG5vdCBiZSB1c2VkIGRpcmVjdGx5JykpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlTmV0d29ya0ludGVyZmFjZTtcbn0oKSk7XG52YXIgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5hcHBseU1pZGRsZXdhcmVzID0gZnVuY3Rpb24gKHJlcXVlc3RBbmRPcHRpb25zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHJlcXVlc3RBbmRPcHRpb25zLnJlcXVlc3QsIG9wdGlvbnMgPSByZXF1ZXN0QW5kT3B0aW9ucy5vcHRpb25zO1xuICAgICAgICAgICAgdmFyIHF1ZXVlID0gZnVuY3Rpb24gKGZ1bmNzLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmdW5jcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGx5TWlkZGxld2FyZS5hcHBseShzY29wZSwgW3sgcmVxdWVzdDogcmVxdWVzdCwgb3B0aW9uczogb3B0aW9ucyB9LCBuZXh0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1ZXVlKF90aGlzLl9taWRkbGV3YXJlcy5zbGljZSgpLCBfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuYXBwbHlBZnRlcndhcmVzID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXNwb25zZSA9IF9hLnJlc3BvbnNlLCBvcHRpb25zID0gX2Eub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZU9iamVjdCA9IHsgcmVzcG9uc2U6IHJlc3BvbnNlLCBvcHRpb25zOiBvcHRpb25zIH07XG4gICAgICAgICAgICB2YXIgcXVldWUgPSBmdW5jdGlvbiAoZnVuY3MsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZiA9IGZ1bmNzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuYXBwbHlBZnRlcndhcmUuYXBwbHkoc2NvcGUsIFtyZXNwb25zZU9iamVjdCwgbmV4dF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZU9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBxdWV1ZShfdGhpcy5fYWZ0ZXJ3YXJlcy5zbGljZSgpLCBfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUuZmV0Y2hGcm9tUmVtb3RlRW5kcG9pbnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBfYS5yZXF1ZXN0LCBvcHRpb25zID0gX2Eub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIGZldGNoKHRoaXMuX3VyaSwgX19hc3NpZ24oe30sIHRoaXMuX29wdHMsIHsgYm9keTogSlNPTi5zdHJpbmdpZnkocHJpbnRSZXF1ZXN0KHJlcXVlc3QpKSwgbWV0aG9kOiAnUE9TVCcgfSwgb3B0aW9ucywgeyBoZWFkZXJzOiBfX2Fzc2lnbih7IEFjY2VwdDogJyovKicsICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwgb3B0aW9ucy5oZWFkZXJzKSB9KSk7XG4gICAgfTtcbiAgICBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvcHRpb25zID0gX19hc3NpZ24oe30sIHRoaXMuX29wdHMpO1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBseU1pZGRsZXdhcmVzKHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyYW8pIHsgcmV0dXJuIF90aGlzLmZldGNoRnJvbVJlbW90ZUVuZHBvaW50LmNhbGwoX3RoaXMsIHJhbyk7IH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF90aGlzLmFwcGx5QWZ0ZXJ3YXJlcyh7XG4gICAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2UsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9KTsgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gX2EucmVzcG9uc2U7XG4gICAgICAgICAgICB2YXIgaHR0cFJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgICAgICByZXR1cm4gaHR0cFJlc3BvbnNlLmpzb24oKS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHR0cEVycm9yID0gbmV3IEVycm9yKFwiTmV0d29yayByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBcIiArIHJlc3BvbnNlLnN0YXR1cyArIFwiIC0gXFxcIlwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgICAgICBodHRwRXJyb3IucmVzcG9uc2UgPSBodHRwUmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgaHR0cEVycm9yLnBhcnNlRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aHJvdyBodHRwRXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICAgICAgICBpZiAoIXBheWxvYWQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSAmJiAhcGF5bG9hZC5oYXNPd25Qcm9wZXJ0eSgnZXJyb3JzJykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZXJ2ZXIgcmVzcG9uc2Ugd2FzIG1pc3NpbmcgZm9yIHF1ZXJ5ICdcIiArIHJlcXVlc3QuZGVidWdOYW1lICsgXCInLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIChtaWRkbGV3YXJlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWlkZGxld2FyZS5hcHBseU1pZGRsZXdhcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fbWlkZGxld2FyZXMucHVzaChtaWRkbGV3YXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWlkZGxld2FyZSBtdXN0IGltcGxlbWVudCB0aGUgYXBwbHlNaWRkbGV3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLnVzZUFmdGVyID0gZnVuY3Rpb24gKGFmdGVyd2FyZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgYWZ0ZXJ3YXJlcy5tYXAoZnVuY3Rpb24gKGFmdGVyd2FyZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhZnRlcndhcmUuYXBwbHlBZnRlcndhcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYWZ0ZXJ3YXJlcy5wdXNoKGFmdGVyd2FyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FmdGVyd2FyZSBtdXN0IGltcGxlbWVudCB0aGUgYXBwbHlBZnRlcndhcmUgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2U7XG59KEJhc2VOZXR3b3JrSW50ZXJmYWNlKSk7XG5mdW5jdGlvbiBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlKHVyaU9ySW50ZXJmYWNlT3B0cywgc2Vjb25kQXJnT3B0cykge1xuICAgIGlmIChzZWNvbmRBcmdPcHRzID09PSB2b2lkIDApIHsgc2Vjb25kQXJnT3B0cyA9IHt9OyB9XG4gICAgaWYgKCF1cmlPckludGVyZmFjZU9wdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbXVzdCBwYXNzIGFuIG9wdGlvbnMgYXJndW1lbnQgdG8gY3JlYXRlTmV0d29ya0ludGVyZmFjZS4nKTtcbiAgICB9XG4gICAgdmFyIHVyaTtcbiAgICB2YXIgb3B0cztcbiAgICBpZiAodHlwZW9mIHVyaU9ySW50ZXJmYWNlT3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiUGFzc2luZyB0aGUgVVJJIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlIGlzIGRlcHJlY2F0ZWQgYXMgb2YgQXBvbGxvIENsaWVudCAwLjUuIFBsZWFzZSBwYXNzIGl0IGFzIHRoZSBcXFwidXJpXFxcIiBwcm9wZXJ0eSBvZiB0aGUgbmV0d29yayBpbnRlcmZhY2Ugb3B0aW9ucy5cIik7XG4gICAgICAgIG9wdHMgPSBzZWNvbmRBcmdPcHRzO1xuICAgICAgICB1cmkgPSB1cmlPckludGVyZmFjZU9wdHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvcHRzID0gdXJpT3JJbnRlcmZhY2VPcHRzLm9wdHM7XG4gICAgICAgIHVyaSA9IHVyaU9ySW50ZXJmYWNlT3B0cy51cmk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSFRUUEZldGNoTmV0d29ya0ludGVyZmFjZSh1cmksIG9wdHMpO1xufVxuXG52YXIgUXVlcnlCYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRdWVyeUJhdGNoZXIoX2EpIHtcbiAgICAgICAgdmFyIGJhdGNoSW50ZXJ2YWwgPSBfYS5iYXRjaEludGVydmFsLCBiYXRjaEZldGNoRnVuY3Rpb24gPSBfYS5iYXRjaEZldGNoRnVuY3Rpb247XG4gICAgICAgIHRoaXMucXVldWVkUmVxdWVzdHMgPSBbXTtcbiAgICAgICAgdGhpcy5xdWV1ZWRSZXF1ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLmJhdGNoSW50ZXJ2YWwgPSBiYXRjaEludGVydmFsO1xuICAgICAgICB0aGlzLmJhdGNoRmV0Y2hGdW5jdGlvbiA9IGJhdGNoRmV0Y2hGdW5jdGlvbjtcbiAgICB9XG4gICAgUXVlcnlCYXRjaGVyLnByb3RvdHlwZS5lbnF1ZXVlUmVxdWVzdCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHZhciBmZXRjaFJlcXVlc3QgPSB7XG4gICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnF1ZXVlZFJlcXVlc3RzLnB1c2goZmV0Y2hSZXF1ZXN0KTtcbiAgICAgICAgZmV0Y2hSZXF1ZXN0LnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBmZXRjaFJlcXVlc3QucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICBmZXRjaFJlcXVlc3QucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucXVldWVkUmVxdWVzdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlUXVldWVDb25zdW1wdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmZXRjaFJlcXVlc3QucHJvbWlzZTtcbiAgICB9O1xuICAgIFF1ZXJ5QmF0Y2hlci5wcm90b3R5cGUuY29uc3VtZVF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVxdWVzdHMgPSB0aGlzLnF1ZXVlZFJlcXVlc3RzLm1hcChmdW5jdGlvbiAocXVldWVkUmVxdWVzdCkgeyByZXR1cm4gcXVldWVkUmVxdWVzdC5yZXF1ZXN0OyB9KTtcbiAgICAgICAgdmFyIHByb21pc2VzID0gW107XG4gICAgICAgIHZhciByZXNvbHZlcnMgPSBbXTtcbiAgICAgICAgdmFyIHJlamVjdGVycyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXVlZFJlcXVlc3RzLmZvckVhY2goZnVuY3Rpb24gKGZldGNoUmVxdWVzdCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goZmV0Y2hSZXF1ZXN0LnByb21pc2UpO1xuICAgICAgICAgICAgcmVzb2x2ZXJzLnB1c2goZmV0Y2hSZXF1ZXN0LnJlc29sdmUpO1xuICAgICAgICAgICAgcmVqZWN0ZXJzLnB1c2goZmV0Y2hSZXF1ZXN0LnJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnF1ZXVlZFJlcXVlc3RzID0gW107XG4gICAgICAgIHZhciBiYXRjaGVkUHJvbWlzZSA9IHRoaXMuYmF0Y2hGZXRjaEZ1bmN0aW9uKHJlcXVlc3RzKTtcbiAgICAgICAgYmF0Y2hlZFByb21pc2UudGhlbihmdW5jdGlvbiAocmVzdWx0cykge1xuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZXJzW2luZGV4XShyZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0ZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlamVjdGVyLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJlamVjdGVyc1tpbmRleF0oZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZXM7XG4gICAgfTtcbiAgICBRdWVyeUJhdGNoZXIucHJvdG90eXBlLnNjaGVkdWxlUXVldWVDb25zdW1wdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5jb25zdW1lUXVldWUoKTtcbiAgICAgICAgfSwgdGhpcy5iYXRjaEludGVydmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBRdWVyeUJhdGNoZXI7XG59KCkpO1xuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBzb3VyY2VzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICBzb3VyY2VzLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIChzb3VyY2UpID09PSAndW5kZWZpbmVkJyB8fCBzb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxudmFyIF9fZXh0ZW5kcyQxID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24kMSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQxKEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UodXJpLCBiYXRjaEludGVydmFsLCBmZXRjaE9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgdXJpLCBmZXRjaE9wdHMpIHx8IHRoaXM7XG4gICAgICAgIGlmICh0eXBlb2YgYmF0Y2hJbnRlcnZhbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImJhdGNoSW50ZXJ2YWwgbXVzdCBiZSBhIG51bWJlciwgZ290IFwiICsgYmF0Y2hJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuYmF0Y2hlciA9IG5ldyBRdWVyeUJhdGNoZXIoe1xuICAgICAgICAgICAgYmF0Y2hJbnRlcnZhbDogYmF0Y2hJbnRlcnZhbCxcbiAgICAgICAgICAgIGJhdGNoRmV0Y2hGdW5jdGlvbjogX3RoaXMuYmF0Y2hRdWVyeS5iaW5kKF90aGlzKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhdGNoZXIuZW5xdWV1ZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgfTtcbiAgICBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UucHJvdG90eXBlLmJhdGNoUXVlcnkgPSBmdW5jdGlvbiAocmVxdWVzdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfX2Fzc2lnbiQxKHt9LCB0aGlzLl9vcHRzKTtcbiAgICAgICAgdmFyIG1pZGRsZXdhcmVQcm9taXNlID0gdGhpcy5hcHBseUJhdGNoTWlkZGxld2FyZXMoe1xuICAgICAgICAgICAgcmVxdWVzdHM6IHJlcXVlc3RzLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBtaWRkbGV3YXJlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChiYXRjaFJlcXVlc3RBbmRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmJhdGNoZWRGZXRjaEZyb21SZW1vdGVFbmRwb2ludChiYXRjaFJlcXVlc3RBbmRPcHRpb25zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBodHRwUmVzcG9uc2UgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaHR0cFJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuYXBwbHlCYXRjaEFmdGVyd2FyZXMoeyByZXNwb25zZXM6IFtodHRwUmVzcG9uc2VdLCBvcHRpb25zOiBiYXRjaFJlcXVlc3RBbmRPcHRpb25zIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBodHRwRXJyb3IgPSBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIFwiICsgaHR0cFJlc3BvbnNlLnN0YXR1cyArIFwiIC0gXFxcIlwiICsgaHR0cFJlc3BvbnNlLnN0YXR1c1RleHQgKyBcIlxcXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHR0cEVycm9yLnJlc3BvbnNlID0gaHR0cFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGh0dHBFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZXMubWFwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhdGNoaW5nTmV0d29ya0ludGVyZmFjZTogc2VydmVyIHJlc3BvbnNlIGlzIG5vdCBhbiBhcnJheScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFwcGx5QmF0Y2hBZnRlcndhcmVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlczogcmVzcG9uc2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucy5vcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZUFuZE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VBbmRPcHRpb25zLnJlc3BvbnNlcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5hcHBseUJhdGNoTWlkZGxld2FyZXMgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHJlcXVlc3RzID0gX2EucmVxdWVzdHMsIG9wdGlvbnMgPSBfYS5vcHRpb25zO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHF1ZXVlID0gZnVuY3Rpb24gKGZ1bmNzLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZnVuY3MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGYgPSBmdW5jcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmLmFwcGx5QmF0Y2hNaWRkbGV3YXJlLmFwcGx5KHNjb3BlLCBbeyByZXF1ZXN0czogcmVxdWVzdHMsIG9wdGlvbnM6IG9wdGlvbnMgfSwgbmV4dF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHM6IHJlcXVlc3RzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHF1ZXVlKF90aGlzLl9taWRkbGV3YXJlcy5zbGljZSgpLCBfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5hcHBseUJhdGNoQWZ0ZXJ3YXJlcyA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVzcG9uc2VzID0gX2EucmVzcG9uc2VzLCBvcHRpb25zID0gX2Eub3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciByZXNwb25zZU9iamVjdCA9IHsgcmVzcG9uc2VzOiByZXNwb25zZXMsIG9wdGlvbnM6IG9wdGlvbnMgfTtcbiAgICAgICAgICAgIHZhciBxdWV1ZSA9IGZ1bmN0aW9uIChmdW5jcywgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmID0gZnVuY3Muc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5hcHBseUJhdGNoQWZ0ZXJ3YXJlLmFwcGx5KHNjb3BlLCBbcmVzcG9uc2VPYmplY3QsIG5leHRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2VPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcXVldWUoX3RoaXMuX2FmdGVyd2FyZXMuc2xpY2UoKSwgX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gKG1pZGRsZXdhcmVzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtaWRkbGV3YXJlLmFwcGx5QmF0Y2hNaWRkbGV3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX21pZGRsZXdhcmVzLnB1c2gobWlkZGxld2FyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JhdGNoIG1pZGRsZXdhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5QmF0Y2hNaWRkbGV3YXJlIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZS5wcm90b3R5cGUudXNlQWZ0ZXIgPSBmdW5jdGlvbiAoYWZ0ZXJ3YXJlcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBhZnRlcndhcmVzLm1hcChmdW5jdGlvbiAoYWZ0ZXJ3YXJlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFmdGVyd2FyZS5hcHBseUJhdGNoQWZ0ZXJ3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2FmdGVyd2FyZXMucHVzaChhZnRlcndhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCYXRjaCBhZnRlcndhcmUgbXVzdCBpbXBsZW1lbnQgdGhlIGFwcGx5QmF0Y2hBZnRlcndhcmUgZnVuY3Rpb24nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlLnByb3RvdHlwZS5iYXRjaGVkRmV0Y2hGcm9tUmVtb3RlRW5kcG9pbnQgPSBmdW5jdGlvbiAoYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgICAgICBhc3NpZ24ob3B0aW9ucywgYmF0Y2hSZXF1ZXN0QW5kT3B0aW9ucy5vcHRpb25zKTtcbiAgICAgICAgdmFyIHByaW50ZWRSZXF1ZXN0cyA9IGJhdGNoUmVxdWVzdEFuZE9wdGlvbnMucmVxdWVzdHMubWFwKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gcHJpbnRSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZldGNoKHRoaXMuX3VyaSwgX19hc3NpZ24kMSh7fSwgdGhpcy5fb3B0cywgeyBib2R5OiBKU09OLnN0cmluZ2lmeShwcmludGVkUmVxdWVzdHMpLCBtZXRob2Q6ICdQT1NUJyB9LCBvcHRpb25zLCB7IGhlYWRlcnM6IF9fYXNzaWduJDEoeyBBY2NlcHQ6ICcqLyonLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMuaGVhZGVycykgfSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEhUVFBCYXRjaGVkTmV0d29ya0ludGVyZmFjZTtcbn0oQmFzZU5ldHdvcmtJbnRlcmZhY2UpKTtcbmZ1bmN0aW9uIGNyZWF0ZUJhdGNoaW5nTmV0d29ya0ludGVyZmFjZShvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcGFzcyBhbiBvcHRpb25zIGFyZ3VtZW50IHRvIGNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgSFRUUEJhdGNoZWROZXR3b3JrSW50ZXJmYWNlKG9wdGlvbnMudXJpLCBvcHRpb25zLmJhdGNoSW50ZXJ2YWwsIG9wdGlvbnMub3B0cyB8fCB7fSk7XG59XG5cbmZ1bmN0aW9uIGlzUXVlcnlSZXN1bHRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1FVRVJZX1JFU1VMVCc7XG59XG5mdW5jdGlvbiBpc1F1ZXJ5RXJyb3JBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1FVRVJZX0VSUk9SJztcbn1cbmZ1bmN0aW9uIGlzUXVlcnlJbml0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19RVUVSWV9JTklUJztcbn1cbmZ1bmN0aW9uIGlzUXVlcnlSZXN1bHRDbGllbnRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1FVRVJZX1JFU1VMVF9DTElFTlQnO1xufVxuZnVuY3Rpb24gaXNRdWVyeVN0b3BBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1FVRVJZX1NUT1AnO1xufVxuZnVuY3Rpb24gaXNNdXRhdGlvbkluaXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX01VVEFUSU9OX0lOSVQnO1xufVxuZnVuY3Rpb24gaXNNdXRhdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fTVVUQVRJT05fUkVTVUxUJztcbn1cbmZ1bmN0aW9uIGlzTXV0YXRpb25FcnJvckFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fTVVUQVRJT05fRVJST1InO1xufVxuZnVuY3Rpb24gaXNVcGRhdGVRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdBUE9MTE9fVVBEQVRFX1FVRVJZX1JFU1VMVCc7XG59XG5mdW5jdGlvbiBpc1N0b3JlUmVzZXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1NUT1JFX1JFU0VUJztcbn1cbmZ1bmN0aW9uIGlzU3Vic2NyaXB0aW9uUmVzdWx0QWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24udHlwZSA9PT0gJ0FQT0xMT19TVUJTQ1JJUFRJT05fUkVTVUxUJztcbn1cbmZ1bmN0aW9uIGlzV3JpdGVBY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi50eXBlID09PSAnQVBPTExPX1dSSVRFJztcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmdWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnU3RyaW5nVmFsdWUnO1xufVxuZnVuY3Rpb24gaXNCb29sZWFuVmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0Jvb2xlYW5WYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0ludFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdJbnRWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0Zsb2F0VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0Zsb2F0VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNWYXJpYWJsZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnVmFyaWFibGUnO1xufVxuZnVuY3Rpb24gaXNPYmplY3RWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnT2JqZWN0VmFsdWUnO1xufVxuZnVuY3Rpb24gaXNMaXN0VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0xpc3RWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0VudW1WYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5raW5kID09PSAnRW51bVZhbHVlJztcbn1cbmZ1bmN0aW9uIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihhcmdPYmosIG5hbWUsIHZhbHVlLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAoaXNJbnRWYWx1ZSh2YWx1ZSkgfHwgaXNGbG9hdFZhbHVlKHZhbHVlKSkge1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSBOdW1iZXIodmFsdWUudmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0Jvb2xlYW5WYWx1ZSh2YWx1ZSkgfHwgaXNTdHJpbmdWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFsdWUudmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JqZWN0VmFsdWUodmFsdWUpKSB7XG4gICAgICAgIHZhciBuZXN0ZWRBcmdPYmpfMSA9IHt9O1xuICAgICAgICB2YWx1ZS5maWVsZHMubWFwKGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihuZXN0ZWRBcmdPYmpfMSwgb2JqLm5hbWUsIG9iai52YWx1ZSwgdmFyaWFibGVzKTsgfSk7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IG5lc3RlZEFyZ09ial8xO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1ZhcmlhYmxlKHZhbHVlKSkge1xuICAgICAgICB2YXIgdmFyaWFibGVWYWx1ZSA9ICh2YXJpYWJsZXMgfHwge30pW3ZhbHVlLm5hbWUudmFsdWVdO1xuICAgICAgICBhcmdPYmpbbmFtZS52YWx1ZV0gPSB2YXJpYWJsZVZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0xpc3RWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFsdWUudmFsdWVzLm1hcChmdW5jdGlvbiAobGlzdFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbmVzdGVkQXJnQXJyYXlPYmogPSB7fTtcbiAgICAgICAgICAgIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihuZXN0ZWRBcmdBcnJheU9iaiwgbmFtZSwgbGlzdFZhbHVlLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgcmV0dXJuIG5lc3RlZEFyZ0FycmF5T2JqW25hbWUudmFsdWVdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNFbnVtVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGlubGluZSBhcmd1bWVudCBcXFwiXCIgKyBuYW1lLnZhbHVlICsgXCJcXFwiIG9mIGtpbmQgXFxcIlwiICsgdmFsdWUua2luZCArIFwiXFxcIiBpcyBub3Qgc3VwcG9ydGVkLlxcbiAgICAgICAgICAgICAgICAgICAgVXNlIHZhcmlhYmxlcyBpbnN0ZWFkIG9mIGlubGluZSBhcmd1bWVudHMgdG8gb3ZlcmNvbWUgdGhpcyBsaW1pdGF0aW9uLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdG9yZUtleU5hbWVGcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcykge1xuICAgIGlmIChmaWVsZC5hcmd1bWVudHMgJiYgZmllbGQuYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB2YXIgYXJnT2JqXzEgPSB7fTtcbiAgICAgICAgZmllbGQuYXJndW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09ial8xLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdG9yZUtleU5hbWVGcm9tRmllbGROYW1lQW5kQXJncyhmaWVsZC5uYW1lLnZhbHVlLCBhcmdPYmpfMSk7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZC5uYW1lLnZhbHVlO1xufVxuZnVuY3Rpb24gc3RvcmVLZXlOYW1lRnJvbUZpZWxkTmFtZUFuZEFyZ3MoZmllbGROYW1lLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgdmFyIHN0cmluZ2lmaWVkQXJncyA9IEpTT04uc3RyaW5naWZ5KGFyZ3MpO1xuICAgICAgICByZXR1cm4gZmllbGROYW1lICsgXCIoXCIgKyBzdHJpbmdpZmllZEFyZ3MgKyBcIilcIjtcbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkTmFtZTtcbn1cbmZ1bmN0aW9uIHJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQuYWxpYXMgP1xuICAgICAgICBmaWVsZC5hbGlhcy52YWx1ZSA6XG4gICAgICAgIGZpZWxkLm5hbWUudmFsdWU7XG59XG5mdW5jdGlvbiBpc0ZpZWxkKHNlbGVjdGlvbikge1xuICAgIHJldHVybiBzZWxlY3Rpb24ua2luZCA9PT0gJ0ZpZWxkJztcbn1cbmZ1bmN0aW9uIGlzSW5saW5lRnJhZ21lbnQoc2VsZWN0aW9uKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnO1xufVxuZnVuY3Rpb24gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQuZXJyb3JzICYmIHJlc3VsdC5lcnJvcnMubGVuZ3RoO1xufVxuZnVuY3Rpb24gaXNJZFZhbHVlKGlkT2JqZWN0KSB7XG4gICAgcmV0dXJuIChpZE9iamVjdCAhPSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBpZE9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgaWRPYmplY3QudHlwZSA9PT0gJ2lkJyk7XG59XG5mdW5jdGlvbiB0b0lkVmFsdWUoaWQsIGdlbmVyYXRlZCkge1xuICAgIGlmIChnZW5lcmF0ZWQgPT09IHZvaWQgMCkgeyBnZW5lcmF0ZWQgPSBmYWxzZTsgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdpZCcsXG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgZ2VuZXJhdGVkOiBnZW5lcmF0ZWQsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGlzSnNvblZhbHVlKGpzb25PYmplY3QpIHtcbiAgICByZXR1cm4gKGpzb25PYmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YganNvbk9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAganNvbk9iamVjdC50eXBlID09PSAnanNvbicpO1xufVxuXG52YXIgX19hc3NpZ24kNSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbmZ1bmN0aW9uIGdldE11dGF0aW9uRGVmaW5pdGlvbihkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIG11dGF0aW9uRGVmID0gbnVsbDtcbiAgICBkb2MuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbidcbiAgICAgICAgICAgICYmIGRlZmluaXRpb24ub3BlcmF0aW9uID09PSAnbXV0YXRpb24nKSB7XG4gICAgICAgICAgICBtdXRhdGlvbkRlZiA9IGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIW11dGF0aW9uRGVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBjb250YWluIGEgbXV0YXRpb24gZGVmaW5pdGlvbi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG11dGF0aW9uRGVmO1xufVxuZnVuY3Rpb24gY2hlY2tEb2N1bWVudChkb2MpIHtcbiAgICBpZiAoZG9jLmtpbmQgIT09ICdEb2N1bWVudCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0aW5nIGEgcGFyc2VkIEdyYXBoUUwgZG9jdW1lbnQuIFBlcmhhcHMgeW91IG5lZWQgdG8gd3JhcCB0aGUgcXVlcnkgc3RyaW5nIGluIGEgXFxcImdxbFxcXCIgdGFnPyBodHRwOi8vZG9jcy5hcG9sbG9zdGFjay5jb20vYXBvbGxvLWNsaWVudC9jb3JlLmh0bWwjZ3FsXCIpO1xuICAgIH1cbiAgICB2YXIgZm91bmRPcGVyYXRpb24gPSBmYWxzZTtcbiAgICBkb2MuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBzd2l0Y2ggKGRlZmluaXRpb24ua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnRnJhZ21lbnREZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ09wZXJhdGlvbkRlZmluaXRpb24nOlxuICAgICAgICAgICAgICAgIGlmIChmb3VuZE9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1ZXJpZXMgbXVzdCBoYXZlIGV4YWN0bHkgb25lIG9wZXJhdGlvbiBkZWZpbml0aW9uLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3VuZE9wZXJhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNjaGVtYSB0eXBlIGRlZmluaXRpb25zIG5vdCBhbGxvd2VkIGluIHF1ZXJpZXMuIEZvdW5kOiBcXFwiXCIgKyBkZWZpbml0aW9uLmtpbmQgKyBcIlxcXCJcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldE9wZXJhdGlvbk5hbWUoZG9jKSB7XG4gICAgdmFyIHJlcyA9ICcnO1xuICAgIGRvYy5kZWZpbml0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJyAmJiBkZWZpbml0aW9uLm5hbWUpIHtcbiAgICAgICAgICAgIHJlcyA9IGRlZmluaXRpb24ubmFtZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBnZXRGcmFnbWVudERlZmluaXRpb25zKGRvYykge1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZnJhZ21lbnREZWZpbml0aW9ucztcbn1cbmZ1bmN0aW9uIGdldFF1ZXJ5RGVmaW5pdGlvbihkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIHF1ZXJ5RGVmID0gbnVsbDtcbiAgICBkb2MuZGVmaW5pdGlvbnMubWFwKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdPcGVyYXRpb25EZWZpbml0aW9uJ1xuICAgICAgICAgICAgJiYgZGVmaW5pdGlvbi5vcGVyYXRpb24gPT09ICdxdWVyeScpIHtcbiAgICAgICAgICAgIHF1ZXJ5RGVmID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghcXVlcnlEZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGNvbnRhaW4gYSBxdWVyeSBkZWZpbml0aW9uLicpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnlEZWY7XG59XG5mdW5jdGlvbiBnZXRPcGVyYXRpb25EZWZpbml0aW9uKGRvYykge1xuICAgIGNoZWNrRG9jdW1lbnQoZG9jKTtcbiAgICB2YXIgb3BEZWYgPSBudWxsO1xuICAgIGRvYy5kZWZpbml0aW9ucy5tYXAoZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICBvcERlZiA9IGRlZmluaXRpb247XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIW9wRGVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBjb250YWluIGEgcXVlcnkgZGVmaW5pdGlvbi4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG9wRGVmO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudE1hcChmcmFnbWVudHMpIHtcbiAgICBpZiAoZnJhZ21lbnRzID09PSB2b2lkIDApIHsgZnJhZ21lbnRzID0gW107IH1cbiAgICB2YXIgc3ltVGFibGUgPSB7fTtcbiAgICBmcmFnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgc3ltVGFibGVbZnJhZ21lbnQubmFtZS52YWx1ZV0gPSBmcmFnbWVudDtcbiAgICB9KTtcbiAgICByZXR1cm4gc3ltVGFibGU7XG59XG5mdW5jdGlvbiBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZG9jdW1lbnQsIGZyYWdtZW50TmFtZSkge1xuICAgIHZhciBhY3R1YWxGcmFnbWVudE5hbWUgPSBmcmFnbWVudE5hbWU7XG4gICAgdmFyIGZyYWdtZW50cyA9IFtdO1xuICAgIGRvY3VtZW50LmRlZmluaXRpb25zLmZvckVhY2goZnVuY3Rpb24gKGRlZmluaXRpb24pIHtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ua2luZCA9PT0gJ09wZXJhdGlvbkRlZmluaXRpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGb3VuZCBhIFwiICsgZGVmaW5pdGlvbi5vcGVyYXRpb24gKyBcIiBvcGVyYXRpb25cIiArIChkZWZpbml0aW9uLm5hbWUgPyBcIiBuYW1lZCAnXCIgKyBkZWZpbml0aW9uLm5hbWUudmFsdWUgKyBcIidcIiA6ICcnKSArIFwiLiBcIiArXG4gICAgICAgICAgICAgICAgJ05vIG9wZXJhdGlvbnMgYXJlIGFsbG93ZWQgd2hlbiB1c2luZyBhIGZyYWdtZW50IGFzIGEgcXVlcnkuIE9ubHkgZnJhZ21lbnRzIGFyZSBhbGxvd2VkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nKSB7XG4gICAgICAgICAgICBmcmFnbWVudHMucHVzaChkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgYWN0dWFsRnJhZ21lbnROYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoZnJhZ21lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRm91bmQgXCIgKyBmcmFnbWVudHMubGVuZ3RoICsgXCIgZnJhZ21lbnRzLiBgZnJhZ21lbnROYW1lYCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gdGhlcmUgaXMgbm90IGV4YWN0bHkgMSBmcmFnbWVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgYWN0dWFsRnJhZ21lbnROYW1lID0gZnJhZ21lbnRzWzBdLm5hbWUudmFsdWU7XG4gICAgfVxuICAgIHZhciBxdWVyeSA9IF9fYXNzaWduJDUoe30sIGRvY3VtZW50LCB7IGRlZmluaXRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAga2luZDogJ09wZXJhdGlvbkRlZmluaXRpb24nLFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ3F1ZXJ5JyxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAga2luZDogJ1NlbGVjdGlvblNldCcsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kOiAnRnJhZ21lbnRTcHJlYWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZDogJ05hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYWN0dWFsRnJhZ21lbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIF0uY29uY2F0KGRvY3VtZW50LmRlZmluaXRpb25zKSB9KTtcbiAgICByZXR1cm4gcXVlcnk7XG59XG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWVzKGRlZmluaXRpb24pIHtcbiAgICBpZiAoZGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zICYmIGRlZmluaXRpb24udmFyaWFibGVEZWZpbml0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZXMgPSBkZWZpbml0aW9uLnZhcmlhYmxlRGVmaW5pdGlvbnNcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFibGUgPSBfYS52YXJpYWJsZSwgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlO1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZU9iaiA9IHt9O1xuICAgICAgICAgICAgdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGRlZmF1bHRWYWx1ZU9iaiwgdmFyaWFibGUubmFtZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVPYmo7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXNzaWduLmFwcGx5KHZvaWQgMCwgW3t9XS5jb25jYXQoZGVmYXVsdFZhbHVlcykpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG59XG5cbmZ1bmN0aW9uIHNob3VsZEluY2x1ZGUoc2VsZWN0aW9uLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAodmFyaWFibGVzID09PSB2b2lkIDApIHsgdmFyaWFibGVzID0ge307IH1cbiAgICBpZiAoIXNlbGVjdGlvbi5kaXJlY3RpdmVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB2YXIgcmVzID0gdHJ1ZTtcbiAgICBzZWxlY3Rpb24uZGlyZWN0aXZlcy5mb3JFYWNoKGZ1bmN0aW9uIChkaXJlY3RpdmUpIHtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZS5uYW1lLnZhbHVlICE9PSAnc2tpcCcgJiYgZGlyZWN0aXZlLm5hbWUudmFsdWUgIT09ICdpbmNsdWRlJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkaXJlY3RpdmVBcmd1bWVudHMgPSBkaXJlY3RpdmUuYXJndW1lbnRzIHx8IFtdO1xuICAgICAgICB2YXIgZGlyZWN0aXZlTmFtZSA9IGRpcmVjdGl2ZS5uYW1lLnZhbHVlO1xuICAgICAgICBpZiAoZGlyZWN0aXZlQXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWZBcmd1bWVudCA9IGRpcmVjdGl2ZUFyZ3VtZW50c1swXTtcbiAgICAgICAgaWYgKCFpZkFyZ3VtZW50Lm5hbWUgfHwgaWZBcmd1bWVudC5uYW1lLnZhbHVlICE9PSAnaWYnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmVmFsdWUgPSBkaXJlY3RpdmVBcmd1bWVudHNbMF0udmFsdWU7XG4gICAgICAgIHZhciBldmFsZWRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWlmVmFsdWUgfHwgaWZWYWx1ZS5raW5kICE9PSAnQm9vbGVhblZhbHVlJykge1xuICAgICAgICAgICAgaWYgKGlmVmFsdWUua2luZCAhPT0gJ1ZhcmlhYmxlJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZSBtdXN0IGJlIGEgdmFyaWFibGUgb3IgYSBib29sIGVhbiB2YWx1ZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmFsZWRWYWx1ZSA9IHZhcmlhYmxlc1tpZlZhbHVlLm5hbWUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChldmFsZWRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFyaWFibGUgcmVmZXJlbmNlZCBpbiBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmFsZWRWYWx1ZSA9IGlmVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGl2ZU5hbWUgPT09ICdza2lwJykge1xuICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSAhZXZhbGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldmFsZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBnZXRFbnYoKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuTk9ERV9FTlY7XG4gICAgfVxuICAgIHJldHVybiAnZGV2ZWxvcG1lbnQnO1xufVxuZnVuY3Rpb24gaXNFbnYoZW52KSB7XG4gICAgcmV0dXJuIGdldEVudigpID09PSBlbnY7XG59XG5mdW5jdGlvbiBpc1Byb2R1Y3Rpb24oKSB7XG4gICAgcmV0dXJuIGlzRW52KCdwcm9kdWN0aW9uJykgPT09IHRydWU7XG59XG5mdW5jdGlvbiBpc0RldmVsb3BtZW50KCkge1xuICAgIHJldHVybiBpc0VudignZGV2ZWxvcG1lbnQnKSA9PT0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzVGVzdCgpIHtcbiAgICByZXR1cm4gaXNFbnYoJ3Rlc3QnKSA9PT0gdHJ1ZTtcbn1cblxudmFyIF9fZXh0ZW5kcyQyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19hc3NpZ24kNCA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBXcml0ZUVycm9yID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMkMihXcml0ZUVycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFdyaXRlRXJyb3IoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50eXBlID0gJ1dyaXRlRXJyb3InO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBXcml0ZUVycm9yO1xufShFcnJvcikpO1xuZnVuY3Rpb24gd3JpdGVRdWVyeVRvU3RvcmUoX2EpIHtcbiAgICB2YXIgcmVzdWx0ID0gX2EucmVzdWx0LCBxdWVyeSA9IF9hLnF1ZXJ5LCBfYiA9IF9hLnN0b3JlLCBzdG9yZSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIGRhdGFJZEZyb21PYmplY3QgPSBfYS5kYXRhSWRGcm9tT2JqZWN0LCBfYyA9IF9hLmZyYWdtZW50TWFwLCBmcmFnbWVudE1hcCA9IF9jID09PSB2b2lkIDAgPyB7fSA6IF9jLCBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbiA9IF9hLmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uO1xuICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ocXVlcnkpO1xuICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhxdWVyeURlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHJldHVybiB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICBkYXRhSWQ6ICdST09UX1FVRVJZJyxcbiAgICAgICAgcmVzdWx0OiByZXN1bHQsXG4gICAgICAgIHNlbGVjdGlvblNldDogcXVlcnlEZWZpbml0aW9uLnNlbGVjdGlvblNldCxcbiAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBkYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgZnJhZ21lbnRNYXA6IGZyYWdtZW50TWFwLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICB9LFxuICAgIH0pO1xufVxuZnVuY3Rpb24gd3JpdGVSZXN1bHRUb1N0b3JlKF9hKSB7XG4gICAgdmFyIGRhdGFJZCA9IF9hLmRhdGFJZCwgcmVzdWx0ID0gX2EucmVzdWx0LCBkb2N1bWVudCA9IF9hLmRvY3VtZW50LCBfYiA9IF9hLnN0b3JlLCBzdG9yZSA9IF9iID09PSB2b2lkIDAgPyB7fSA6IF9iLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIGRhdGFJZEZyb21PYmplY3QgPSBfYS5kYXRhSWRGcm9tT2JqZWN0LCBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbiA9IF9hLmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uO1xuICAgIHZhciBvcGVyYXRpb25EZWZpbml0aW9uID0gZ2V0T3BlcmF0aW9uRGVmaW5pdGlvbihkb2N1bWVudCk7XG4gICAgdmFyIHNlbGVjdGlvblNldCA9IG9wZXJhdGlvbkRlZmluaXRpb24uc2VsZWN0aW9uU2V0O1xuICAgIHZhciBmcmFnbWVudE1hcCA9IGNyZWF0ZUZyYWdtZW50TWFwKGdldEZyYWdtZW50RGVmaW5pdGlvbnMoZG9jdW1lbnQpKTtcbiAgICB2YXJpYWJsZXMgPSBhc3NpZ24oe30sIGdldERlZmF1bHRWYWx1ZXMob3BlcmF0aW9uRGVmaW5pdGlvbiksIHZhcmlhYmxlcyk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHdyaXRlU2VsZWN0aW9uU2V0VG9TdG9yZSh7XG4gICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgIGRhdGFJZDogZGF0YUlkLFxuICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBzZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXA6IGZyYWdtZW50TWFwLFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgZTIgPSBuZXcgRXJyb3IoXCJFcnJvciB3cml0aW5nIHJlc3VsdCB0byBzdG9yZSBmb3IgcXVlcnkgXCIgKyAoZG9jdW1lbnQubG9jICYmIGRvY3VtZW50LmxvYy5zb3VyY2UuYm9keSkpO1xuICAgICAgICBlMi5tZXNzYWdlICs9ICcvbicgKyBlLm1lc3NhZ2U7XG4gICAgICAgIGUyLnN0YWNrID0gZS5zdGFjaztcbiAgICAgICAgdGhyb3cgZTI7XG4gICAgfVxufVxuZnVuY3Rpb24gd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKF9hKSB7XG4gICAgdmFyIHJlc3VsdCA9IF9hLnJlc3VsdCwgZGF0YUlkID0gX2EuZGF0YUlkLCBzZWxlY3Rpb25TZXQgPSBfYS5zZWxlY3Rpb25TZXQsIGNvbnRleHQgPSBfYS5jb250ZXh0O1xuICAgIHZhciB2YXJpYWJsZXMgPSBjb250ZXh0LnZhcmlhYmxlcywgc3RvcmUgPSBjb250ZXh0LnN0b3JlLCBkYXRhSWRGcm9tT2JqZWN0ID0gY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0LCBmcmFnbWVudE1hcCA9IGNvbnRleHQuZnJhZ21lbnRNYXA7XG4gICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgIHZhciBpbmNsdWRlZCA9IHNob3VsZEluY2x1ZGUoc2VsZWN0aW9uLCB2YXJpYWJsZXMpO1xuICAgICAgICBpZiAoaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RmllbGRLZXkgPSByZXN1bHRLZXlOYW1lRnJvbUZpZWxkKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHRbcmVzdWx0RmllbGRLZXldO1xuICAgICAgICAgICAgaWYgKGluY2x1ZGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWVsZFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUlkOiBkYXRhSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogc2VsZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb2R1Y3Rpb24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIk1pc3NpbmcgZmllbGQgXCIgKyByZXN1bHRGaWVsZEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IChmcmFnbWVudE1hcCB8fCB7fSlbc2VsZWN0aW9uLm5hbWUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmICghZnJhZ21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJhZ21lbnQgbmFtZWQgXCIgKyBzZWxlY3Rpb24ubmFtZS52YWx1ZSArIFwiLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2hlcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAoY29udGV4dC5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbiAmJiBmcmFnbWVudC50eXBlQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkVmFsdWUgPSB7IHR5cGU6ICdpZCcsIGlkOiAnc2VsZicsIGdlbmVyYXRlZDogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB2YXIgZmFrZUNvbnRleHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlOiB7ICdzZWxmJzogcmVzdWx0IH0sXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgaGFzTWlzc2luZ0ZpZWxkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG1hdGNoZXMgPSBjb250ZXh0LmZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uKGlkVmFsdWUsIGZyYWdtZW50LnR5cGVDb25kaXRpb24ubmFtZS52YWx1ZSwgZmFrZUNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChmYWtlQ29udGV4dC5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdXQVJOSU5HOiBoZXVyaXN0aWMgZnJhZ21lbnQgbWF0Y2hpbmcgZ29pbmcgb24hJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluY2x1ZGVkICYmIG1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0OiBmcmFnbWVudC5zZWxlY3Rpb25TZXQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJZDogZGF0YUlkLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0b3JlO1xufVxuZnVuY3Rpb24gaXNHZW5lcmF0ZWRJZChpZCkge1xuICAgIHJldHVybiAoaWRbMF0gPT09ICckJyk7XG59XG5mdW5jdGlvbiBtZXJnZVdpdGhHZW5lcmF0ZWQoZ2VuZXJhdGVkS2V5LCByZWFsS2V5LCBjYWNoZSkge1xuICAgIHZhciBnZW5lcmF0ZWQgPSBjYWNoZVtnZW5lcmF0ZWRLZXldO1xuICAgIHZhciByZWFsID0gY2FjaGVbcmVhbEtleV07XG4gICAgT2JqZWN0LmtleXMoZ2VuZXJhdGVkKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZ2VuZXJhdGVkW2tleV07XG4gICAgICAgIHZhciByZWFsVmFsdWUgPSByZWFsW2tleV07XG4gICAgICAgIGlmIChpc0lkVmFsdWUodmFsdWUpXG4gICAgICAgICAgICAmJiBpc0dlbmVyYXRlZElkKHZhbHVlLmlkKVxuICAgICAgICAgICAgJiYgaXNJZFZhbHVlKHJlYWxWYWx1ZSkpIHtcbiAgICAgICAgICAgIG1lcmdlV2l0aEdlbmVyYXRlZCh2YWx1ZS5pZCwgcmVhbFZhbHVlLmlkLCBjYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGNhY2hlW2dlbmVyYXRlZEtleV07XG4gICAgICAgIGNhY2hlW3JlYWxLZXldID0gX19hc3NpZ24kNCh7fSwgZ2VuZXJhdGVkLCByZWFsKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHdyaXRlRmllbGRUb1N0b3JlKF9hKSB7XG4gICAgdmFyIGZpZWxkID0gX2EuZmllbGQsIHZhbHVlID0gX2EudmFsdWUsIGRhdGFJZCA9IF9hLmRhdGFJZCwgY29udGV4dCA9IF9hLmNvbnRleHQ7XG4gICAgdmFyIHZhcmlhYmxlcyA9IGNvbnRleHQudmFyaWFibGVzLCBkYXRhSWRGcm9tT2JqZWN0ID0gY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0LCBzdG9yZSA9IGNvbnRleHQuc3RvcmUsIGZyYWdtZW50TWFwID0gY29udGV4dC5mcmFnbWVudE1hcDtcbiAgICB2YXIgc3RvcmVWYWx1ZTtcbiAgICB2YXIgc3RvcmVGaWVsZE5hbWUgPSBzdG9yZUtleU5hbWVGcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcyk7XG4gICAgdmFyIHNob3VsZE1lcmdlID0gZmFsc2U7XG4gICAgdmFyIGdlbmVyYXRlZEtleSA9ICcnO1xuICAgIGlmICghZmllbGQuc2VsZWN0aW9uU2V0IHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHN0b3JlVmFsdWUgPVxuICAgICAgICAgICAgdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgPyB7IHR5cGU6ICdqc29uJywganNvbjogdmFsdWUgfVxuICAgICAgICAgICAgICAgIDogdmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhciBnZW5lcmF0ZWRJZCA9IGRhdGFJZCArIFwiLlwiICsgc3RvcmVGaWVsZE5hbWU7XG4gICAgICAgIHN0b3JlVmFsdWUgPSBwcm9jZXNzQXJyYXlWYWx1ZSh2YWx1ZSwgZ2VuZXJhdGVkSWQsIGZpZWxkLnNlbGVjdGlvblNldCwgY29udGV4dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdmFsdWVEYXRhSWQgPSBkYXRhSWQgKyBcIi5cIiArIHN0b3JlRmllbGROYW1lO1xuICAgICAgICB2YXIgZ2VuZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFpc0dlbmVyYXRlZElkKHZhbHVlRGF0YUlkKSkge1xuICAgICAgICAgICAgdmFsdWVEYXRhSWQgPSAnJCcgKyB2YWx1ZURhdGFJZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YUlkRnJvbU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIHNlbWFudGljSWQgPSBkYXRhSWRGcm9tT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChzZW1hbnRpY0lkICYmIGlzR2VuZXJhdGVkSWQoc2VtYW50aWNJZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lEcyByZXR1cm5lZCBieSBkYXRhSWRGcm9tT2JqZWN0IGNhbm5vdCBiZWdpbiB3aXRoIHRoZSBcIiRcIiBjaGFyYWN0ZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VtYW50aWNJZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlRGF0YUlkID0gc2VtYW50aWNJZDtcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3cml0ZVNlbGVjdGlvblNldFRvU3RvcmUoe1xuICAgICAgICAgICAgZGF0YUlkOiB2YWx1ZURhdGFJZCxcbiAgICAgICAgICAgIHJlc3VsdDogdmFsdWUsXG4gICAgICAgICAgICBzZWxlY3Rpb25TZXQ6IGZpZWxkLnNlbGVjdGlvblNldCxcbiAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgIH0pO1xuICAgICAgICBzdG9yZVZhbHVlID0ge1xuICAgICAgICAgICAgdHlwZTogJ2lkJyxcbiAgICAgICAgICAgIGlkOiB2YWx1ZURhdGFJZCxcbiAgICAgICAgICAgIGdlbmVyYXRlZDogZ2VuZXJhdGVkLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoc3RvcmVbZGF0YUlkXSAmJiBzdG9yZVtkYXRhSWRdW3N0b3JlRmllbGROYW1lXSAhPT0gc3RvcmVWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGVzY2FwZWRJZCA9IHN0b3JlW2RhdGFJZF1bc3RvcmVGaWVsZE5hbWVdO1xuICAgICAgICAgICAgaWYgKGlzSWRWYWx1ZShzdG9yZVZhbHVlKSAmJiBzdG9yZVZhbHVlLmdlbmVyYXRlZFxuICAgICAgICAgICAgICAgICYmIGlzSWRWYWx1ZShlc2NhcGVkSWQpICYmICFlc2NhcGVkSWQuZ2VuZXJhdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU3RvcmUgZXJyb3I6IHRoZSBhcHBsaWNhdGlvbiBhdHRlbXB0ZWQgdG8gd3JpdGUgYW4gb2JqZWN0IHdpdGggbm8gcHJvdmlkZWQgaWRcIiArXG4gICAgICAgICAgICAgICAgICAgIChcIiBidXQgdGhlIHN0b3JlIGFscmVhZHkgY29udGFpbnMgYW4gaWQgb2YgXCIgKyBlc2NhcGVkSWQuaWQgKyBcIiBmb3IgdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0lkVmFsdWUoZXNjYXBlZElkKSAmJiBlc2NhcGVkSWQuZ2VuZXJhdGVkKSB7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVkS2V5ID0gZXNjYXBlZElkLmlkO1xuICAgICAgICAgICAgICAgIHNob3VsZE1lcmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgbmV3U3RvcmVPYmogPSBfX2Fzc2lnbiQ0KHt9LCBzdG9yZVtkYXRhSWRdLCAoX2IgPSB7fSwgX2Jbc3RvcmVGaWVsZE5hbWVdID0gc3RvcmVWYWx1ZSwgX2IpKTtcbiAgICBpZiAoc2hvdWxkTWVyZ2UpIHtcbiAgICAgICAgbWVyZ2VXaXRoR2VuZXJhdGVkKGdlbmVyYXRlZEtleSwgc3RvcmVWYWx1ZS5pZCwgc3RvcmUpO1xuICAgIH1cbiAgICBpZiAoIXN0b3JlW2RhdGFJZF0gfHwgc3RvcmVWYWx1ZSAhPT0gc3RvcmVbZGF0YUlkXVtzdG9yZUZpZWxkTmFtZV0pIHtcbiAgICAgICAgc3RvcmVbZGF0YUlkXSA9IG5ld1N0b3JlT2JqO1xuICAgIH1cbiAgICB2YXIgX2I7XG59XG5mdW5jdGlvbiBwcm9jZXNzQXJyYXlWYWx1ZSh2YWx1ZSwgZ2VuZXJhdGVkSWQsIHNlbGVjdGlvblNldCwgY29udGV4dCkge1xuICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXRlbURhdGFJZCA9IGdlbmVyYXRlZElkICsgXCIuXCIgKyBpbmRleDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzQXJyYXlWYWx1ZShpdGVtLCBpdGVtRGF0YUlkLCBzZWxlY3Rpb25TZXQsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZW5lcmF0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoY29udGV4dC5kYXRhSWRGcm9tT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc2VtYW50aWNJZCA9IGNvbnRleHQuZGF0YUlkRnJvbU9iamVjdChpdGVtKTtcbiAgICAgICAgICAgIGlmIChzZW1hbnRpY0lkKSB7XG4gICAgICAgICAgICAgICAgaXRlbURhdGFJZCA9IHNlbWFudGljSWQ7XG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3JpdGVTZWxlY3Rpb25TZXRUb1N0b3JlKHtcbiAgICAgICAgICAgIGRhdGFJZDogaXRlbURhdGFJZCxcbiAgICAgICAgICAgIHJlc3VsdDogaXRlbSxcbiAgICAgICAgICAgIHNlbGVjdGlvblNldDogc2VsZWN0aW9uU2V0LFxuICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBpZFN0b3JlVmFsdWUgPSB7XG4gICAgICAgICAgICB0eXBlOiAnaWQnLFxuICAgICAgICAgICAgaWQ6IGl0ZW1EYXRhSWQsXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IGdlbmVyYXRlZCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGlkU3RvcmVWYWx1ZTtcbiAgICB9KTtcbn1cblxudmFyIF9fYXNzaWduJDcgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgb3B0aW1pc3RpY0RlZmF1bHRTdGF0ZSA9IFtdO1xuZnVuY3Rpb24gZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyhzdG9yZSkge1xuICAgIGlmIChzdG9yZS5vcHRpbWlzdGljLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gc3RvcmUuZGF0YTtcbiAgICB9XG4gICAgdmFyIHBhdGNoZXMgPSBzdG9yZS5vcHRpbWlzdGljLm1hcChmdW5jdGlvbiAob3B0KSB7IHJldHVybiBvcHQuZGF0YTsgfSk7XG4gICAgcmV0dXJuIGFzc2lnbi5hcHBseSh2b2lkIDAsIFt7fSwgc3RvcmUuZGF0YV0uY29uY2F0KHBhdGNoZXMpKTtcbn1cbmZ1bmN0aW9uIG9wdGltaXN0aWMocHJldmlvdXNTdGF0ZSwgYWN0aW9uLCBzdG9yZSwgY29uZmlnKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0gb3B0aW1pc3RpY0RlZmF1bHRTdGF0ZTsgfVxuICAgIGlmIChpc011dGF0aW9uSW5pdEFjdGlvbihhY3Rpb24pICYmIGFjdGlvbi5vcHRpbWlzdGljUmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGZha2VNdXRhdGlvblJlc3VsdEFjdGlvbiA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fTVVUQVRJT05fUkVTVUxUJyxcbiAgICAgICAgICAgIHJlc3VsdDogeyBkYXRhOiBhY3Rpb24ub3B0aW1pc3RpY1Jlc3BvbnNlIH0sXG4gICAgICAgICAgICBkb2N1bWVudDogYWN0aW9uLm11dGF0aW9uLFxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogYWN0aW9uLm9wZXJhdGlvbk5hbWUsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICBtdXRhdGlvbklkOiBhY3Rpb24ubXV0YXRpb25JZCxcbiAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IGFjdGlvbi5leHRyYVJlZHVjZXJzLFxuICAgICAgICAgICAgdXBkYXRlUXVlcmllczogYWN0aW9uLnVwZGF0ZVF1ZXJpZXMsXG4gICAgICAgICAgICB1cGRhdGU6IGFjdGlvbi51cGRhdGUsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcHRpbWlzdGljRGF0YSA9IGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoX19hc3NpZ24kNyh7fSwgc3RvcmUsIHsgb3B0aW1pc3RpYzogcHJldmlvdXNTdGF0ZSB9KSk7XG4gICAgICAgIHZhciBwYXRjaCA9IGdldE9wdGltaXN0aWNEYXRhUGF0Y2gob3B0aW1pc3RpY0RhdGEsIGZha2VNdXRhdGlvblJlc3VsdEFjdGlvbiwgc3RvcmUucXVlcmllcywgc3RvcmUubXV0YXRpb25zLCBjb25maWcpO1xuICAgICAgICB2YXIgb3B0aW1pc3RpY1N0YXRlID0ge1xuICAgICAgICAgICAgYWN0aW9uOiBmYWtlTXV0YXRpb25SZXN1bHRBY3Rpb24sXG4gICAgICAgICAgICBkYXRhOiBwYXRjaCxcbiAgICAgICAgICAgIG11dGF0aW9uSWQ6IGFjdGlvbi5tdXRhdGlvbklkLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBwcmV2aW91c1N0YXRlLmNvbmNhdChbb3B0aW1pc3RpY1N0YXRlXSk7XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKGlzTXV0YXRpb25FcnJvckFjdGlvbihhY3Rpb24pIHx8IGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSlcbiAgICAgICAgJiYgcHJldmlvdXNTdGF0ZS5zb21lKGZ1bmN0aW9uIChjaGFuZ2UpIHsgcmV0dXJuIGNoYW5nZS5tdXRhdGlvbklkID09PSBhY3Rpb24ubXV0YXRpb25JZDsgfSkpIHtcbiAgICAgICAgcmV0dXJuIHJvbGxiYWNrT3B0aW1pc3RpY0RhdGEoZnVuY3Rpb24gKGNoYW5nZSkgeyByZXR1cm4gY2hhbmdlLm11dGF0aW9uSWQgPT09IGFjdGlvbi5tdXRhdGlvbklkOyB9LCBwcmV2aW91c1N0YXRlLCBzdG9yZSwgY29uZmlnKTtcbiAgICB9XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG59XG5mdW5jdGlvbiBnZXRPcHRpbWlzdGljRGF0YVBhdGNoKHByZXZpb3VzRGF0YSwgb3B0aW1pc3RpY0FjdGlvbiwgcXVlcmllcywgbXV0YXRpb25zLCBjb25maWcpIHtcbiAgICB2YXIgb3B0aW1pc3RpY0RhdGEgPSBkYXRhKHByZXZpb3VzRGF0YSwgb3B0aW1pc3RpY0FjdGlvbiwgcXVlcmllcywgbXV0YXRpb25zLCBjb25maWcpO1xuICAgIHZhciBwYXRjaCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG9wdGltaXN0aWNEYXRhKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKG9wdGltaXN0aWNEYXRhW2tleV0gIT09IHByZXZpb3VzRGF0YVtrZXldKSB7XG4gICAgICAgICAgICBwYXRjaFtrZXldID0gb3B0aW1pc3RpY0RhdGFba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXRjaDtcbn1cbmZ1bmN0aW9uIHJvbGxiYWNrT3B0aW1pc3RpY0RhdGEoZmlsdGVyRm4sIHByZXZpb3VzU3RhdGUsIHN0b3JlLCBjb25maWcpIHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZSA9PT0gdm9pZCAwKSB7IHByZXZpb3VzU3RhdGUgPSBvcHRpbWlzdGljRGVmYXVsdFN0YXRlOyB9XG4gICAgdmFyIG9wdGltaXN0aWNEYXRhID0gYXNzaWduKHt9LCBzdG9yZS5kYXRhKTtcbiAgICB2YXIgbmV3U3RhdGUgPSBwcmV2aW91c1N0YXRlXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuICFmaWx0ZXJGbihpdGVtKTsgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgIHZhciBwYXRjaCA9IGdldE9wdGltaXN0aWNEYXRhUGF0Y2gob3B0aW1pc3RpY0RhdGEsIGNoYW5nZS5hY3Rpb24sIHN0b3JlLnF1ZXJpZXMsIHN0b3JlLm11dGF0aW9ucywgY29uZmlnKTtcbiAgICAgICAgYXNzaWduKG9wdGltaXN0aWNEYXRhLCBwYXRjaCk7XG4gICAgICAgIHJldHVybiBfX2Fzc2lnbiQ3KHt9LCBjaGFuZ2UsIHsgZGF0YTogcGF0Y2ggfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld1N0YXRlO1xufVxuXG5mdW5jdGlvbiBpc0VxdWFsKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGEgIT0gbnVsbCAmJiB0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiYgYiAhPSBudWxsICYmIHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYSkge1xuICAgICAgICAgICAgaWYgKGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmICghYi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0VxdWFsKGFba2V5XSwgYltrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAoIWEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgX19hc3NpZ24kOCA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBJRF9LRVkgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbCgnaWQnKSA6ICdAQGlkJztcbmZ1bmN0aW9uIHJlYWRRdWVyeUZyb21TdG9yZShvcHRpb25zKSB7XG4gICAgdmFyIG9wdHNQYXRjaCA9IHsgcmV0dXJuUGFydGlhbERhdGE6IGZhbHNlIH07XG4gICAgcmV0dXJuIGRpZmZRdWVyeUFnYWluc3RTdG9yZShfX2Fzc2lnbiQ4KHt9LCBvcHRpb25zLCBvcHRzUGF0Y2gpKS5yZXN1bHQ7XG59XG52YXIgcmVhZFN0b3JlUmVzb2x2ZXIgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBpZFZhbHVlLCBhcmdzLCBjb250ZXh0LCBfYSkge1xuICAgIHZhciByZXN1bHRLZXkgPSBfYS5yZXN1bHRLZXk7XG4gICAgYXNzZXJ0SWRWYWx1ZShpZFZhbHVlKTtcbiAgICB2YXIgb2JqSWQgPSBpZFZhbHVlLmlkO1xuICAgIHZhciBvYmogPSBjb250ZXh0LnN0b3JlW29iaklkXTtcbiAgICB2YXIgc3RvcmVLZXlOYW1lID0gc3RvcmVLZXlOYW1lRnJvbUZpZWxkTmFtZUFuZEFyZ3MoZmllbGROYW1lLCBhcmdzKTtcbiAgICB2YXIgZmllbGRWYWx1ZSA9IChvYmogfHwge30pW3N0b3JlS2V5TmFtZV07XG4gICAgaWYgKHR5cGVvZiBmaWVsZFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoY29udGV4dC5jdXN0b21SZXNvbHZlcnMgJiYgb2JqICYmIChvYmouX190eXBlbmFtZSB8fCBvYmpJZCA9PT0gJ1JPT1RfUVVFUlknKSkge1xuICAgICAgICAgICAgdmFyIHR5cGVuYW1lID0gb2JqLl9fdHlwZW5hbWUgfHwgJ1F1ZXJ5JztcbiAgICAgICAgICAgIHZhciB0eXBlID0gY29udGV4dC5jdXN0b21SZXNvbHZlcnNbdHlwZW5hbWVdO1xuICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb2x2ZXIgPSB0eXBlW2ZpZWxkTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlcihvYmosIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbnRleHQucmV0dXJuUGFydGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGZpbmQgZmllbGQgXCIgKyBzdG9yZUtleU5hbWUgKyBcIiBvbiBvYmplY3QgKFwiICsgb2JqSWQgKyBcIikgXCIgKyBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsIDIpICsgXCIuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuaGFzTWlzc2luZ0ZpZWxkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gICAgfVxuICAgIGlmIChpc0pzb25WYWx1ZShmaWVsZFZhbHVlKSkge1xuICAgICAgICBpZiAoaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdCAmJiBpc0VxdWFsKGlkVmFsdWUucHJldmlvdXNSZXN1bHRbcmVzdWx0S2V5XSwgZmllbGRWYWx1ZS5qc29uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlkVmFsdWUucHJldmlvdXNSZXN1bHRbcmVzdWx0S2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmllbGRWYWx1ZS5qc29uO1xuICAgIH1cbiAgICBpZiAoaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICBmaWVsZFZhbHVlID0gYWRkUHJldmlvdXNSZXN1bHRUb0lkVmFsdWVzKGZpZWxkVmFsdWUsIGlkVmFsdWUucHJldmlvdXNSZXN1bHRbcmVzdWx0S2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZFZhbHVlO1xufTtcbmZ1bmN0aW9uIGRpZmZRdWVyeUFnYWluc3RTdG9yZShfYSkge1xuICAgIHZhciBzdG9yZSA9IF9hLnN0b3JlLCBxdWVyeSA9IF9hLnF1ZXJ5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXMsIHByZXZpb3VzUmVzdWx0ID0gX2EucHJldmlvdXNSZXN1bHQsIF9iID0gX2EucmV0dXJuUGFydGlhbERhdGEsIHJldHVyblBhcnRpYWxEYXRhID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgX2MgPSBfYS5yb290SWQsIHJvb3RJZCA9IF9jID09PSB2b2lkIDAgPyAnUk9PVF9RVUVSWScgOiBfYywgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb24gPSBfYS5mcmFnbWVudE1hdGNoZXJGdW5jdGlvbiwgY29uZmlnID0gX2EuY29uZmlnO1xuICAgIHZhciBxdWVyeURlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ocXVlcnkpO1xuICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhxdWVyeURlZmluaXRpb24pLCB2YXJpYWJsZXMpO1xuICAgIHZhciBjb250ZXh0ID0ge1xuICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgIHJldHVyblBhcnRpYWxEYXRhOiByZXR1cm5QYXJ0aWFsRGF0YSxcbiAgICAgICAgY3VzdG9tUmVzb2x2ZXJzOiAoY29uZmlnICYmIGNvbmZpZy5jdXN0b21SZXNvbHZlcnMpIHx8IHt9LFxuICAgICAgICBoYXNNaXNzaW5nRmllbGQ6IGZhbHNlLFxuICAgIH07XG4gICAgdmFyIHJvb3RJZFZhbHVlID0ge1xuICAgICAgICB0eXBlOiAnaWQnLFxuICAgICAgICBpZDogcm9vdElkLFxuICAgICAgICBwcmV2aW91c1Jlc3VsdDogcHJldmlvdXNSZXN1bHQsXG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gZ3JhcGhxbEFueXdoZXJlKHJlYWRTdG9yZVJlc29sdmVyLCBxdWVyeSwgcm9vdElkVmFsdWUsIGNvbnRleHQsIHZhcmlhYmxlcywge1xuICAgICAgICBmcmFnbWVudE1hdGNoZXI6IGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uLFxuICAgICAgICByZXN1bHRNYXBwZXI6IHJlc3VsdE1hcHBlcixcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgaXNNaXNzaW5nOiBjb250ZXh0Lmhhc01pc3NpbmdGaWVsZCxcbiAgICB9O1xufVxuZnVuY3Rpb24gYXNzZXJ0SWRWYWx1ZShpZFZhbHVlKSB7XG4gICAgaWYgKCFpc0lkVmFsdWUoaWRWYWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW5jb3VudGVyZWQgYSBzdWItc2VsZWN0aW9uIG9uIHRoZSBxdWVyeSwgYnV0IHRoZSBzdG9yZSBkb2Vzbid0IGhhdmUgYW4gb2JqZWN0IHJlZmVyZW5jZS4gVGhpcyBzaG91bGQgbmV2ZXIgaGFwcGVuIGR1cmluZyBub3JtYWwgdXNlIHVubGVzcyB5b3UgaGF2ZSBjdXN0b20gY29kZSB0aGF0IGlzIGRpcmVjdGx5IG1hbmlwdWxhdGluZyB0aGUgc3RvcmU7IHBsZWFzZSBmaWxlIGFuIGlzc3VlLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRQcmV2aW91c1Jlc3VsdFRvSWRWYWx1ZXModmFsdWUsIHByZXZpb3VzUmVzdWx0KSB7XG4gICAgaWYgKGlzSWRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXNzaWduJDgoe30sIHZhbHVlLCB7IHByZXZpb3VzUmVzdWx0OiBwcmV2aW91c1Jlc3VsdCB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIGlkVG9QcmV2aW91c1Jlc3VsdF8xID0ge307XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZXZpb3VzUmVzdWx0KSkge1xuICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtW0lEX0tFWV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWRUb1ByZXZpb3VzUmVzdWx0XzFbaXRlbVtJRF9LRVldXSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgdmFyIGl0ZW1QcmV2aW91c1Jlc3VsdCA9IHByZXZpb3VzUmVzdWx0ICYmIHByZXZpb3VzUmVzdWx0W2ldO1xuICAgICAgICAgICAgaWYgKGlzSWRWYWx1ZShpdGVtKSkge1xuICAgICAgICAgICAgICAgIGl0ZW1QcmV2aW91c1Jlc3VsdCA9IGlkVG9QcmV2aW91c1Jlc3VsdF8xW2l0ZW0uaWRdIHx8IGl0ZW1QcmV2aW91c1Jlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhZGRQcmV2aW91c1Jlc3VsdFRvSWRWYWx1ZXMoaXRlbSwgaXRlbVByZXZpb3VzUmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHJlc3VsdE1hcHBlcihyZXN1bHRGaWVsZHMsIGlkVmFsdWUpIHtcbiAgICBpZiAoaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICB2YXIgY3VycmVudFJlc3VsdEtleXNfMSA9IE9iamVjdC5rZXlzKHJlc3VsdEZpZWxkcyk7XG4gICAgICAgIHZhciBzYW1lQXNQcmV2aW91c1Jlc3VsdCA9IE9iamVjdC5rZXlzKGlkVmFsdWUucHJldmlvdXNSZXN1bHQpXG4gICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChzYW1lS2V5cywga2V5KSB7IHJldHVybiBzYW1lS2V5cyAmJiBjdXJyZW50UmVzdWx0S2V5c18xLmluZGV4T2Yoa2V5KSA+IC0xOyB9LCB0cnVlKSAmJlxuICAgICAgICAgICAgY3VycmVudFJlc3VsdEtleXNfMS5yZWR1Y2UoZnVuY3Rpb24gKHNhbWUsIGtleSkgeyByZXR1cm4gKHNhbWUgJiYgYXJlTmVzdGVkQXJyYXlJdGVtc1N0cmljdGx5RXF1YWwocmVzdWx0RmllbGRzW2tleV0sIGlkVmFsdWUucHJldmlvdXNSZXN1bHRba2V5XSkpOyB9LCB0cnVlKTtcbiAgICAgICAgaWYgKHNhbWVBc1ByZXZpb3VzUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gaWRWYWx1ZS5wcmV2aW91c1Jlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0RmllbGRzLCBJRF9LRVksIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IGlkVmFsdWUuaWQsXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdEZpZWxkcztcbn1cbmZ1bmN0aW9uIGFyZU5lc3RlZEFycmF5SXRlbXNTdHJpY3RseUVxdWFsKGEsIGIpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGEpIHx8ICFBcnJheS5pc0FycmF5KGIpIHx8IGEubGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhLnJlZHVjZShmdW5jdGlvbiAoc2FtZSwgaXRlbSwgaSkgeyByZXR1cm4gc2FtZSAmJiBhcmVOZXN0ZWRBcnJheUl0ZW1zU3RyaWN0bHlFcXVhbChpdGVtLCBiW2ldKTsgfSwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lRGVlcCh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWUubWFwKGZ1bmN0aW9uIChpdGVtKSB7IHJldHVybiBjbG9uZURlZXAoaXRlbSk7IH0pO1xuICAgIH1cbiAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgbmV4dFZhbHVlID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWVba2V5XSA9IGNsb25lRGVlcCh2YWx1ZVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dFZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbnZhciBUWVBFTkFNRV9GSUVMRCA9IHtcbiAgICBraW5kOiAnRmllbGQnLFxuICAgIG5hbWU6IHtcbiAgICAgICAga2luZDogJ05hbWUnLFxuICAgICAgICB2YWx1ZTogJ19fdHlwZW5hbWUnLFxuICAgIH0sXG59O1xuZnVuY3Rpb24gYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChzZWxlY3Rpb25TZXQsIGlzUm9vdCkge1xuICAgIGlmIChpc1Jvb3QgPT09IHZvaWQgMCkgeyBpc1Jvb3QgPSBmYWxzZTsgfVxuICAgIGlmIChzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucykge1xuICAgICAgICBpZiAoIWlzUm9vdCkge1xuICAgICAgICAgICAgdmFyIGFscmVhZHlIYXNUaGlzRmllbGQgPSBzZWxlY3Rpb25TZXQuc2VsZWN0aW9ucy5zb21lKGZ1bmN0aW9uIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCcgJiYgc2VsZWN0aW9uLm5hbWUudmFsdWUgPT09ICdfX3R5cGVuYW1lJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFhbHJlYWR5SGFzVGhpc0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMucHVzaChUWVBFTkFNRV9GSUVMRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uU2V0LnNlbGVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLm5hbWUudmFsdWUubGFzdEluZGV4T2YoJ19fJywgMCkgIT09IDAgJiYgc2VsZWN0aW9uLnNlbGVjdGlvblNldCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRUeXBlbmFtZVRvU2VsZWN0aW9uU2V0KHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdGlvbi5raW5kID09PSAnSW5saW5lRnJhZ21lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5zZWxlY3Rpb25TZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkVHlwZW5hbWVUb1NlbGVjdGlvblNldChzZWxlY3Rpb24uc2VsZWN0aW9uU2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZFR5cGVuYW1lVG9Eb2N1bWVudChkb2MpIHtcbiAgICBjaGVja0RvY3VtZW50KGRvYyk7XG4gICAgdmFyIGRvY0Nsb25lID0gY2xvbmVEZWVwKGRvYyk7XG4gICAgZG9jQ2xvbmUuZGVmaW5pdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICB2YXIgaXNSb290ID0gZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbic7XG4gICAgICAgIGFkZFR5cGVuYW1lVG9TZWxlY3Rpb25TZXQoZGVmaW5pdGlvbi5zZWxlY3Rpb25TZXQsIGlzUm9vdCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRvY0Nsb25lO1xufVxuXG52YXIgX19hc3NpZ24kNiA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBSZWR1eERhdGFQcm94eSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVkdXhEYXRhUHJveHkoc3RvcmUsIHJlZHV4Um9vdFNlbGVjdG9yLCBmcmFnbWVudE1hdGNoZXIsIHJlZHVjZXJDb25maWcpIHtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yID0gcmVkdXhSb290U2VsZWN0b3I7XG4gICAgICAgIHRoaXMucmVkdWNlckNvbmZpZyA9IHJlZHVjZXJDb25maWc7XG4gICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gZnJhZ21lbnRNYXRjaGVyO1xuICAgIH1cbiAgICBSZWR1eERhdGFQcm94eS5wcm90b3R5cGUucmVhZFF1ZXJ5ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBxdWVyeSA9IF9hLnF1ZXJ5LCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFF1ZXJ5RnJvbVN0b3JlKHtcbiAgICAgICAgICAgIHJvb3RJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgc3RvcmU6IGdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHModGhpcy5yZWR1eFJvb3RTZWxlY3Rvcih0aGlzLnN0b3JlLmdldFN0YXRlKCkpKSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUmVkdXhEYXRhUHJveHkucHJvdG90eXBlLnJlYWRGcmFnbWVudCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgaWQgPSBfYS5pZCwgZnJhZ21lbnQgPSBfYS5mcmFnbWVudCwgZnJhZ21lbnROYW1lID0gX2EuZnJhZ21lbnROYW1lLCB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgIHZhciBxdWVyeSA9IGdldEZyYWdtZW50UXVlcnlEb2N1bWVudChmcmFnbWVudCwgZnJhZ21lbnROYW1lKTtcbiAgICAgICAgdmFyIGRhdGEgPSBnZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKHRoaXMucmVkdXhSb290U2VsZWN0b3IodGhpcy5zdG9yZS5nZXRTdGF0ZSgpKSk7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtpZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlYWRRdWVyeUZyb21TdG9yZSh7XG4gICAgICAgICAgICByb290SWQ6IGlkLFxuICAgICAgICAgICAgc3RvcmU6IGRhdGEsXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFJlZHV4RGF0YVByb3h5LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBkYXRhID0gX2EuZGF0YSwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1dSSVRFJyxcbiAgICAgICAgICAgIHdyaXRlczogW3tcbiAgICAgICAgICAgICAgICAgICAgcm9vdElkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdDogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSZWR1eERhdGFQcm94eS5wcm90b3R5cGUud3JpdGVGcmFnbWVudCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGEsIGlkID0gX2EuaWQsIGZyYWdtZW50ID0gX2EuZnJhZ21lbnQsIGZyYWdtZW50TmFtZSA9IF9hLmZyYWdtZW50TmFtZSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB2YXIgZG9jdW1lbnQgPSBnZXRGcmFnbWVudFF1ZXJ5RG9jdW1lbnQoZnJhZ21lbnQsIGZyYWdtZW50TmFtZSk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KGRvY3VtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fV1JJVEUnLFxuICAgICAgICAgICAgd3JpdGVzOiBbe1xuICAgICAgICAgICAgICAgICAgICByb290SWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIFJlZHV4RGF0YVByb3h5O1xufSgpKTtcbnZhciBUcmFuc2FjdGlvbkRhdGFQcm94eSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHJhbnNhY3Rpb25EYXRhUHJveHkoZGF0YSwgcmVkdWNlckNvbmZpZykge1xuICAgICAgICB0aGlzLmRhdGEgPSBfX2Fzc2lnbiQ2KHt9LCBkYXRhKTtcbiAgICAgICAgdGhpcy5yZWR1Y2VyQ29uZmlnID0gcmVkdWNlckNvbmZpZztcbiAgICAgICAgdGhpcy53cml0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pc0ZpbmlzaGVkID0gZmFsc2U7XG4gICAgfVxuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0Tm90RmluaXNoZWQoKTtcbiAgICAgICAgdmFyIHdyaXRlcyA9IHRoaXMud3JpdGVzO1xuICAgICAgICB0aGlzLndyaXRlcyA9IFtdO1xuICAgICAgICB0aGlzLmlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gd3JpdGVzO1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLnJlYWRRdWVyeSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVhZFF1ZXJ5RnJvbVN0b3JlKHtcbiAgICAgICAgICAgIHJvb3RJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgc3RvcmU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5yZWR1Y2VyQ29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUucmVhZEZyYWdtZW50ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBpZCA9IF9hLmlkLCBmcmFnbWVudCA9IF9hLmZyYWdtZW50LCBmcmFnbWVudE5hbWUgPSBfYS5mcmFnbWVudE5hbWUsIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcztcbiAgICAgICAgdGhpcy5hc3NlcnROb3RGaW5pc2hlZCgpO1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gZ2V0RnJhZ21lbnRRdWVyeURvY3VtZW50KGZyYWdtZW50LCBmcmFnbWVudE5hbWUpO1xuICAgICAgICBpZiAodGhpcy5yZWR1Y2VyQ29uZmlnLmFkZFR5cGVuYW1lKSB7XG4gICAgICAgICAgICBxdWVyeSA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2lkXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkUXVlcnlGcm9tU3RvcmUoe1xuICAgICAgICAgICAgcm9vdElkOiBpZCxcbiAgICAgICAgICAgIHN0b3JlOiBkYXRhLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBjb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiB0aGlzLnJlZHVjZXJDb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zYWN0aW9uRGF0YVByb3h5LnByb3RvdHlwZS53cml0ZVF1ZXJ5ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBkYXRhID0gX2EuZGF0YSwgcXVlcnkgPSBfYS5xdWVyeSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIGlmICh0aGlzLnJlZHVjZXJDb25maWcuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGx5V3JpdGUoe1xuICAgICAgICAgICAgcm9vdElkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICBkb2N1bWVudDogcXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc2FjdGlvbkRhdGFQcm94eS5wcm90b3R5cGUud3JpdGVGcmFnbWVudCA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgZGF0YSA9IF9hLmRhdGEsIGlkID0gX2EuaWQsIGZyYWdtZW50ID0gX2EuZnJhZ21lbnQsIGZyYWdtZW50TmFtZSA9IF9hLmZyYWdtZW50TmFtZSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICB0aGlzLmFzc2VydE5vdEZpbmlzaGVkKCk7XG4gICAgICAgIHZhciBxdWVyeSA9IGdldEZyYWdtZW50UXVlcnlEb2N1bWVudChmcmFnbWVudCwgZnJhZ21lbnROYW1lKTtcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlckNvbmZpZy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgcXVlcnkgPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwbHlXcml0ZSh7XG4gICAgICAgICAgICByb290SWQ6IGlkLFxuICAgICAgICAgICAgcmVzdWx0OiBkYXRhLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLmFzc2VydE5vdEZpbmlzaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIHRyYW5zYWN0aW9uIG1ldGhvZHMgYWZ0ZXIgdGhlIHRyYW5zYWN0aW9uIGhhcyBmaW5pc2hlZC4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHJhbnNhY3Rpb25EYXRhUHJveHkucHJvdG90eXBlLmFwcGx5V3JpdGUgPSBmdW5jdGlvbiAod3JpdGUpIHtcbiAgICAgICAgd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgIHJlc3VsdDogd3JpdGUucmVzdWx0LFxuICAgICAgICAgICAgZGF0YUlkOiB3cml0ZS5yb290SWQsXG4gICAgICAgICAgICBkb2N1bWVudDogd3JpdGUuZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHdyaXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIHN0b3JlOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiB0aGlzLnJlZHVjZXJDb25maWcuZGF0YUlkRnJvbU9iamVjdCB8fCAoZnVuY3Rpb24gKCkgeyByZXR1cm4gbnVsbDsgfSksXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5yZWR1Y2VyQ29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3JpdGVzLnB1c2god3JpdGUpO1xuICAgIH07XG4gICAgcmV0dXJuIFRyYW5zYWN0aW9uRGF0YVByb3h5O1xufSgpKTtcblxudmFyIF9fYXNzaWduJDkgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5mdW5jdGlvbiByZXBsYWNlUXVlcnlSZXN1bHRzKHN0YXRlLCBfYSwgY29uZmlnKSB7XG4gICAgdmFyIHZhcmlhYmxlcyA9IF9hLnZhcmlhYmxlcywgZG9jdW1lbnQgPSBfYS5kb2N1bWVudCwgbmV3UmVzdWx0ID0gX2EubmV3UmVzdWx0O1xuICAgIHZhciBjbG9uZWRTdGF0ZSA9IF9fYXNzaWduJDkoe30sIHN0YXRlKTtcbiAgICByZXR1cm4gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgcmVzdWx0OiBuZXdSZXN1bHQsXG4gICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICBzdG9yZTogY2xvbmVkU3RhdGUsXG4gICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGYpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoY29uc29sZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIF9fYXNzaWduJDMgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5mdW5jdGlvbiBkYXRhKHByZXZpb3VzU3RhdGUsIGFjdGlvbiwgcXVlcmllcywgbXV0YXRpb25zLCBjb25maWcpIHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZSA9PT0gdm9pZCAwKSB7IHByZXZpb3VzU3RhdGUgPSB7fTsgfVxuICAgIHZhciBjb25zdEFjdGlvbiA9IGFjdGlvbjtcbiAgICBpZiAoaXNRdWVyeVJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIGlmICghcXVlcmllc1thY3Rpb24ucXVlcnlJZF0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb24ucmVxdWVzdElkIDwgcXVlcmllc1thY3Rpb24ucXVlcnlJZF0ubGFzdFJlcXVlc3RJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFncmFwaFFMUmVzdWx0SGFzRXJyb3IoYWN0aW9uLnJlc3VsdCkpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSBxdWVyaWVzW2FjdGlvbi5xdWVyeUlkXTtcbiAgICAgICAgICAgIHZhciBjbG9uZWRTdGF0ZSA9IF9fYXNzaWduJDMoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgdmFyIG5ld1N0YXRlXzEgPSB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogYWN0aW9uLnJlc3VsdC5kYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBhY3Rpb24uZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeVN0b3JlVmFsdWUudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIHN0b3JlOiBjbG9uZWRTdGF0ZSxcbiAgICAgICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogY29uZmlnLmZyYWdtZW50TWF0Y2hlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5leHRyYVJlZHVjZXJzKSB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmV4dHJhUmVkdWNlcnMuZm9yRWFjaChmdW5jdGlvbiAocmVkdWNlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZV8xID0gcmVkdWNlcihuZXdTdGF0ZV8xLCBjb25zdEFjdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGVfMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1N1YnNjcmlwdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIGlmICghZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKGFjdGlvbi5yZXN1bHQpKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkU3RhdGUgPSBfX2Fzc2lnbiQzKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgICAgIHZhciBuZXdTdGF0ZV8yID0gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgICAgICByZXN1bHQ6IGFjdGlvbi5yZXN1bHQuZGF0YSxcbiAgICAgICAgICAgICAgICBkYXRhSWQ6ICdST09UX1NVQlNDUklQVElPTicsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGFjdGlvbi5kb2N1bWVudCxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgc3RvcmU6IGNsb25lZFN0YXRlLFxuICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmV4dHJhUmVkdWNlcnMpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uZXh0cmFSZWR1Y2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChyZWR1Y2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlXzIgPSByZWR1Y2VyKG5ld1N0YXRlXzIsIGNvbnN0QWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTdGF0ZV8yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oY29uc3RBY3Rpb24pKSB7XG4gICAgICAgIGlmICghY29uc3RBY3Rpb24ucmVzdWx0LmVycm9ycykge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5U3RvcmVWYWx1ZSA9IG11dGF0aW9uc1tjb25zdEFjdGlvbi5tdXRhdGlvbklkXTtcbiAgICAgICAgICAgIHZhciBjbG9uZWRTdGF0ZSA9IF9fYXNzaWduJDMoe30sIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICAgICAgdmFyIG5ld1N0YXRlXzMgPSB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogY29uc3RBY3Rpb24ucmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9NVVRBVElPTicsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGNvbnN0QWN0aW9uLmRvY3VtZW50LFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnlTdG9yZVZhbHVlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBzdG9yZTogY2xvbmVkU3RhdGUsXG4gICAgICAgICAgICAgICAgZGF0YUlkRnJvbU9iamVjdDogY29uZmlnLmRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IGNvbmZpZy5mcmFnbWVudE1hdGNoZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciB1cGRhdGVRdWVyaWVzXzEgPSBjb25zdEFjdGlvbi51cGRhdGVRdWVyaWVzO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZVF1ZXJpZXNfMSkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZVF1ZXJpZXNfMSkuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBxdWVyaWVzW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gZGlmZlF1ZXJ5QWdhaW5zdFN0b3JlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlOiBwcmV2aW91c1N0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LmRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgICAgICAgICAgICAgIH0pLCBjdXJyZW50UXVlcnlSZXN1bHQgPSBfYS5yZXN1bHQsIGlzTWlzc2luZyA9IF9hLmlzTWlzc2luZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTWlzc2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWR1Y2VyID0gdXBkYXRlUXVlcmllc18xW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFF1ZXJ5UmVzdWx0ID0gdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZHVjZXIoY3VycmVudFF1ZXJ5UmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvblJlc3VsdDogY29uc3RBY3Rpb24ucmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiBnZXRPcGVyYXRpb25OYW1lKHF1ZXJ5LmRvY3VtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5VmFyaWFibGVzOiBxdWVyeS52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRRdWVyeVJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVfMyA9IHdyaXRlUmVzdWx0VG9TdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBuZXh0UXVlcnlSZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUlkOiAnUk9PVF9RVUVSWScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5LmRvY3VtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcXVlcnkudmFyaWFibGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlOiBuZXdTdGF0ZV8zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25zdEFjdGlvbi51cGRhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXBkYXRlXzEgPSBjb25zdEFjdGlvbi51cGRhdGU7XG4gICAgICAgICAgICAgICAgdmFyIHByb3h5XzEgPSBuZXcgVHJhbnNhY3Rpb25EYXRhUHJveHkobmV3U3RhdGVfMywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICB0cnlGdW5jdGlvbk9yTG9nRXJyb3IoZnVuY3Rpb24gKCkgeyByZXR1cm4gdXBkYXRlXzEocHJveHlfMSwgY29uc3RBY3Rpb24ucmVzdWx0KTsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHdyaXRlcyA9IHByb3h5XzEuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVfMyA9IGRhdGEobmV3U3RhdGVfMywgeyB0eXBlOiAnQVBPTExPX1dSSVRFJywgd3JpdGVzOiB3cml0ZXMgfSwgcXVlcmllcywgbXV0YXRpb25zLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnN0QWN0aW9uLmV4dHJhUmVkdWNlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdEFjdGlvbi5leHRyYVJlZHVjZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlZHVjZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVfMyA9IHJlZHVjZXIobmV3U3RhdGVfMywgY29uc3RBY3Rpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ld1N0YXRlXzM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVcGRhdGVRdWVyeVJlc3VsdEFjdGlvbihjb25zdEFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2VRdWVyeVJlc3VsdHMocHJldmlvdXNTdGF0ZSwgY29uc3RBY3Rpb24sIGNvbmZpZyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU3RvcmVSZXNldEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNXcml0ZUFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24ud3JpdGVzLnJlZHVjZShmdW5jdGlvbiAoY3VycmVudFN0YXRlLCB3cml0ZSkgeyByZXR1cm4gd3JpdGVSZXN1bHRUb1N0b3JlKHtcbiAgICAgICAgICAgIHJlc3VsdDogd3JpdGUucmVzdWx0LFxuICAgICAgICAgICAgZGF0YUlkOiB3cml0ZS5yb290SWQsXG4gICAgICAgICAgICBkb2N1bWVudDogd3JpdGUuZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHdyaXRlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIHN0b3JlOiBjdXJyZW50U3RhdGUsXG4gICAgICAgICAgICBkYXRhSWRGcm9tT2JqZWN0OiBjb25maWcuZGF0YUlkRnJvbU9iamVjdCxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICB9KTsgfSwgX19hc3NpZ24kMyh7fSwgcHJldmlvdXNTdGF0ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbn1cblxuKGZ1bmN0aW9uIChOZXR3b3JrU3RhdHVzKSB7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wibG9hZGluZ1wiXSA9IDFdID0gXCJsb2FkaW5nXCI7XG4gICAgTmV0d29ya1N0YXR1c1tOZXR3b3JrU3RhdHVzW1wic2V0VmFyaWFibGVzXCJdID0gMl0gPSBcInNldFZhcmlhYmxlc1wiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcImZldGNoTW9yZVwiXSA9IDNdID0gXCJmZXRjaE1vcmVcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJyZWZldGNoXCJdID0gNF0gPSBcInJlZmV0Y2hcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJwb2xsXCJdID0gNl0gPSBcInBvbGxcIjtcbiAgICBOZXR3b3JrU3RhdHVzW05ldHdvcmtTdGF0dXNbXCJyZWFkeVwiXSA9IDddID0gXCJyZWFkeVwiO1xuICAgIE5ldHdvcmtTdGF0dXNbTmV0d29ya1N0YXR1c1tcImVycm9yXCJdID0gOF0gPSBcImVycm9yXCI7XG59KShleHBvcnRzLk5ldHdvcmtTdGF0dXMgfHwgKGV4cG9ydHMuTmV0d29ya1N0YXR1cyA9IHt9KSk7XG5mdW5jdGlvbiBpc05ldHdvcmtSZXF1ZXN0SW5GbGlnaHQobmV0d29ya1N0YXR1cykge1xuICAgIHJldHVybiBuZXR3b3JrU3RhdHVzIDwgNztcbn1cblxudmFyIF9fYXNzaWduJDEwID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuZnVuY3Rpb24gcXVlcmllcyhwcmV2aW91c1N0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAocHJldmlvdXNTdGF0ZSA9PT0gdm9pZCAwKSB7IHByZXZpb3VzU3RhdGUgPSB7fTsgfVxuICAgIGlmIChpc1F1ZXJ5SW5pdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgdmFyIHByZXZpb3VzUXVlcnkgPSBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXTtcbiAgICAgICAgaWYgKHByZXZpb3VzUXVlcnkgJiYgcHJldmlvdXNRdWVyeS5xdWVyeVN0cmluZyAhPT0gYWN0aW9uLnF1ZXJ5U3RyaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludGVybmFsIEVycm9yOiBtYXkgbm90IHVwZGF0ZSBleGlzdGluZyBxdWVyeSBzdHJpbmcgaW4gc3RvcmUnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNTZXRWYXJpYWJsZXMgPSBmYWxzZTtcbiAgICAgICAgdmFyIHByZXZpb3VzVmFyaWFibGVzID0gbnVsbDtcbiAgICAgICAgaWYgKGFjdGlvbi5zdG9yZVByZXZpb3VzVmFyaWFibGVzICYmXG4gICAgICAgICAgICBwcmV2aW91c1F1ZXJ5ICYmXG4gICAgICAgICAgICBwcmV2aW91c1F1ZXJ5Lm5ldHdvcmtTdGF0dXMgIT09IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5sb2FkaW5nKSB7XG4gICAgICAgICAgICBpZiAoIWlzRXF1YWwocHJldmlvdXNRdWVyeS52YXJpYWJsZXMsIGFjdGlvbi52YXJpYWJsZXMpKSB7XG4gICAgICAgICAgICAgICAgaXNTZXRWYXJpYWJsZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVmFyaWFibGVzID0gcHJldmlvdXNRdWVyeS52YXJpYWJsZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05ldHdvcmtTdGF0dXMgPSBleHBvcnRzLk5ldHdvcmtTdGF0dXMubG9hZGluZztcbiAgICAgICAgaWYgKGlzU2V0VmFyaWFibGVzKSB7XG4gICAgICAgICAgICBuZXdOZXR3b3JrU3RhdHVzID0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnNldFZhcmlhYmxlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3Rpb24uaXNQb2xsKSB7XG4gICAgICAgICAgICBuZXdOZXR3b3JrU3RhdHVzID0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnBvbGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYWN0aW9uLmlzUmVmZXRjaCkge1xuICAgICAgICAgICAgbmV3TmV0d29ya1N0YXR1cyA9IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5yZWZldGNoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbi5pc1BvbGwpIHtcbiAgICAgICAgICAgIG5ld05ldHdvcmtTdGF0dXMgPSBleHBvcnRzLk5ldHdvcmtTdGF0dXMucG9sbDtcbiAgICAgICAgfVxuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ucXVlcnlJZF0gPSB7XG4gICAgICAgICAgICBxdWVyeVN0cmluZzogYWN0aW9uLnF1ZXJ5U3RyaW5nLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IGFjdGlvbi5kb2N1bWVudCxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYWN0aW9uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIHByZXZpb3VzVmFyaWFibGVzOiBwcmV2aW91c1ZhcmlhYmxlcyxcbiAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogbnVsbCxcbiAgICAgICAgICAgIGdyYXBoUUxFcnJvcnM6IFtdLFxuICAgICAgICAgICAgbmV0d29ya1N0YXR1czogbmV3TmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgIGxhc3RSZXF1ZXN0SWQ6IGFjdGlvbi5yZXF1ZXN0SWQsXG4gICAgICAgICAgICBtZXRhZGF0YTogYWN0aW9uLm1ldGFkYXRhLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWRdID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGVbYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWRdLCB7IG5ldHdvcmtTdGF0dXM6IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5mZXRjaE1vcmUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1F1ZXJ5UmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgaWYgKCFwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzU3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbi5yZXF1ZXN0SWQgPCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXS5sYXN0UmVxdWVzdElkKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIHZhciByZXN1bHRIYXNHcmFwaFFMRXJyb3JzID0gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKGFjdGlvbi5yZXN1bHQpO1xuICAgICAgICBuZXdTdGF0ZVthY3Rpb24ucXVlcnlJZF0gPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24ucXVlcnlJZF0sIHsgbmV0d29ya0Vycm9yOiBudWxsLCBncmFwaFFMRXJyb3JzOiByZXN1bHRIYXNHcmFwaFFMRXJyb3JzID8gYWN0aW9uLnJlc3VsdC5lcnJvcnMgOiBbXSwgcHJldmlvdXNWYXJpYWJsZXM6IG51bGwsIG5ldHdvcmtTdGF0dXM6IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5yZWFkeSB9KTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5mZXRjaE1vcmVGb3JRdWVyeUlkXSwgeyBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMucmVhZHkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1F1ZXJ5RXJyb3JBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIXByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uLnJlcXVlc3RJZCA8IHByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdLmxhc3RSZXF1ZXN0SWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnF1ZXJ5SWRdID0gX19hc3NpZ24kMTAoe30sIHByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdLCB7IG5ldHdvcmtFcnJvcjogYWN0aW9uLmVycm9yLCBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMuZXJyb3IgfSk7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uLmZldGNoTW9yZUZvclF1ZXJ5SWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZF0gPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZVthY3Rpb24uZmV0Y2hNb3JlRm9yUXVlcnlJZF0sIHsgbmV0d29ya0Vycm9yOiBhY3Rpb24uZXJyb3IsIG5ldHdvcmtTdGF0dXM6IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5lcnJvciB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUXVlcnlSZXN1bHRDbGllbnRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICBpZiAoIXByZXZpb3VzU3RhdGVbYWN0aW9uLnF1ZXJ5SWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMCh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5xdWVyeUlkXSwgeyBuZXR3b3JrRXJyb3I6IG51bGwsIHByZXZpb3VzVmFyaWFibGVzOiBudWxsLCBuZXR3b3JrU3RhdHVzOiBhY3Rpb24uY29tcGxldGUgPyBleHBvcnRzLk5ldHdvcmtTdGF0dXMucmVhZHkgOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMubG9hZGluZyB9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1F1ZXJ5U3RvcEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IF9fYXNzaWduJDEwKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgZGVsZXRlIG5ld1N0YXRlW2FjdGlvbi5xdWVyeUlkXTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1N0b3JlUmVzZXRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICByZXR1cm4gcmVzZXRRdWVyeVN0YXRlKHByZXZpb3VzU3RhdGUsIGFjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBwcmV2aW91c1N0YXRlO1xufVxuZnVuY3Rpb24gcmVzZXRRdWVyeVN0YXRlKHN0YXRlLCBhY3Rpb24pIHtcbiAgICB2YXIgb2JzZXJ2YWJsZVF1ZXJ5SWRzID0gYWN0aW9uLm9ic2VydmFibGVRdWVyeUlkcztcbiAgICB2YXIgbmV3UXVlcmllcyA9IE9iamVjdC5rZXlzKHN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgcmV0dXJuIChvYnNlcnZhYmxlUXVlcnlJZHMuaW5kZXhPZihxdWVyeUlkKSA+IC0xKTtcbiAgICB9KS5yZWR1Y2UoZnVuY3Rpb24gKHJlcywga2V5KSB7XG4gICAgICAgIHJlc1trZXldID0gX19hc3NpZ24kMTAoe30sIHN0YXRlW2tleV0sIHsgbmV0d29ya1N0YXR1czogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLmxvYWRpbmcgfSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfSwge30pO1xuICAgIHJldHVybiBuZXdRdWVyaWVzO1xufVxuXG52YXIgX19hc3NpZ24kMTEgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5mdW5jdGlvbiBtdXRhdGlvbnMocHJldmlvdXNTdGF0ZSwgYWN0aW9uKSB7XG4gICAgaWYgKHByZXZpb3VzU3RhdGUgPT09IHZvaWQgMCkgeyBwcmV2aW91c1N0YXRlID0ge307IH1cbiAgICBpZiAoaXNNdXRhdGlvbkluaXRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMSh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSA9IHtcbiAgICAgICAgICAgIG11dGF0aW9uU3RyaW5nOiBhY3Rpb24ubXV0YXRpb25TdHJpbmcsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IGFjdGlvbi52YXJpYWJsZXMsXG4gICAgICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNNdXRhdGlvblJlc3VsdEFjdGlvbihhY3Rpb24pKSB7XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IF9fYXNzaWduJDExKHt9LCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgbmV3U3RhdGVbYWN0aW9uLm11dGF0aW9uSWRdID0gX19hc3NpZ24kMTEoe30sIHByZXZpb3VzU3RhdGVbYWN0aW9uLm11dGF0aW9uSWRdLCB7IGxvYWRpbmc6IGZhbHNlLCBlcnJvcjogbnVsbCB9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc011dGF0aW9uRXJyb3JBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBfX2Fzc2lnbiQxMSh7fSwgcHJldmlvdXNTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSA9IF9fYXNzaWduJDExKHt9LCBwcmV2aW91c1N0YXRlW2FjdGlvbi5tdXRhdGlvbklkXSwgeyBsb2FkaW5nOiBmYWxzZSwgZXJyb3I6IGFjdGlvbi5lcnJvciB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdG9yZVJlc2V0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZTtcbn1cblxudmFyIF9fYXNzaWduJDIgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgY3Jhc2hSZXBvcnRlciA9IGZ1bmN0aW9uIChzdG9yZSkgeyByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHsgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NhdWdodCBhbiBleGNlcHRpb24hJywgZXJyKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufTsgfTsgfTtcbnZhciBjcmVhdGVSZWR1Y2VyRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IsIGFjdGlvbikge1xuICAgIHZhciByZWR1Y2VyRXJyb3IgPSB7IGVycm9yOiBlcnJvciB9O1xuICAgIGlmIChpc1F1ZXJ5UmVzdWx0QWN0aW9uKGFjdGlvbikpIHtcbiAgICAgICAgcmVkdWNlckVycm9yLnF1ZXJ5SWQgPSBhY3Rpb24ucXVlcnlJZDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNTdWJzY3JpcHRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICByZWR1Y2VyRXJyb3Iuc3Vic2NyaXB0aW9uSWQgPSBhY3Rpb24uc3Vic2NyaXB0aW9uSWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTXV0YXRpb25SZXN1bHRBY3Rpb24oYWN0aW9uKSkge1xuICAgICAgICByZWR1Y2VyRXJyb3IubXV0YXRpb25JZCA9IGFjdGlvbi5tdXRhdGlvbklkO1xuICAgIH1cbiAgICByZXR1cm4gcmVkdWNlckVycm9yO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZUFwb2xsb1JlZHVjZXIoY29uZmlnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGFwb2xsb1JlZHVjZXIoc3RhdGUsIGFjdGlvbikge1xuICAgICAgICBpZiAoc3RhdGUgPT09IHZvaWQgMCkgeyBzdGF0ZSA9IHt9OyB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbmV3U3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcXVlcmllczogcXVlcmllcyhzdGF0ZS5xdWVyaWVzLCBhY3Rpb24pLFxuICAgICAgICAgICAgICAgIG11dGF0aW9uczogbXV0YXRpb25zKHN0YXRlLm11dGF0aW9ucywgYWN0aW9uKSxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhKHN0YXRlLmRhdGEsIGFjdGlvbiwgc3RhdGUucXVlcmllcywgc3RhdGUubXV0YXRpb25zLCBjb25maWcpLFxuICAgICAgICAgICAgICAgIG9wdGltaXN0aWM6IFtdLFxuICAgICAgICAgICAgICAgIHJlZHVjZXJFcnJvcjogbnVsbCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBuZXdTdGF0ZS5vcHRpbWlzdGljID0gb3B0aW1pc3RpYyhzdGF0ZS5vcHRpbWlzdGljLCBhY3Rpb24sIG5ld1N0YXRlLCBjb25maWcpO1xuICAgICAgICAgICAgaWYgKHN0YXRlLmRhdGEgPT09IG5ld1N0YXRlLmRhdGEgJiZcbiAgICAgICAgICAgICAgICBzdGF0ZS5tdXRhdGlvbnMgPT09IG5ld1N0YXRlLm11dGF0aW9ucyAmJlxuICAgICAgICAgICAgICAgIHN0YXRlLnF1ZXJpZXMgPT09IG5ld1N0YXRlLnF1ZXJpZXMgJiZcbiAgICAgICAgICAgICAgICBzdGF0ZS5vcHRpbWlzdGljID09PSBuZXdTdGF0ZS5vcHRpbWlzdGljICYmXG4gICAgICAgICAgICAgICAgc3RhdGUucmVkdWNlckVycm9yID09PSBuZXdTdGF0ZS5yZWR1Y2VyRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKHJlZHVjZXJFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXNzaWduJDIoe30sIHN0YXRlLCB7IHJlZHVjZXJFcnJvcjogY3JlYXRlUmVkdWNlckVycm9yKHJlZHVjZXJFcnJvciwgYWN0aW9uKSB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVBcG9sbG9TdG9yZShfYSkge1xuICAgIHZhciBfYiA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYyA9IF9iLnJlZHV4Um9vdEtleSwgcmVkdXhSb290S2V5ID0gX2MgPT09IHZvaWQgMCA/ICdhcG9sbG8nIDogX2MsIGluaXRpYWxTdGF0ZSA9IF9iLmluaXRpYWxTdGF0ZSwgX2QgPSBfYi5jb25maWcsIGNvbmZpZyA9IF9kID09PSB2b2lkIDAgPyB7fSA6IF9kLCBfZSA9IF9iLnJlcG9ydENyYXNoZXMsIHJlcG9ydENyYXNoZXMgPSBfZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9lLCBsb2dnZXIgPSBfYi5sb2dnZXI7XG4gICAgdmFyIGVuaGFuY2VycyA9IFtdO1xuICAgIHZhciBtaWRkbGV3YXJlcyA9IFtdO1xuICAgIGlmIChyZXBvcnRDcmFzaGVzKSB7XG4gICAgICAgIG1pZGRsZXdhcmVzLnB1c2goY3Jhc2hSZXBvcnRlcik7XG4gICAgfVxuICAgIGlmIChsb2dnZXIpIHtcbiAgICAgICAgbWlkZGxld2FyZXMucHVzaChsb2dnZXIpO1xuICAgIH1cbiAgICBpZiAobWlkZGxld2FyZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbmhhbmNlcnMucHVzaChyZWR1eC5hcHBseU1pZGRsZXdhcmUuYXBwbHkodm9pZCAwLCBtaWRkbGV3YXJlcykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGFueVdpbmRvdyA9IHdpbmRvdztcbiAgICAgICAgaWYgKGFueVdpbmRvdy5kZXZUb29sc0V4dGVuc2lvbikge1xuICAgICAgICAgICAgZW5oYW5jZXJzLnB1c2goYW55V2luZG93LmRldlRvb2xzRXh0ZW5zaW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjb21wb3NlJCQxID0gcmVkdXguY29tcG9zZTtcbiAgICBpZiAoaW5pdGlhbFN0YXRlICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldICYmIGluaXRpYWxTdGF0ZVtyZWR1eFJvb3RLZXldWydxdWVyaWVzJ10pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcG9sbG8gaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGNvbnRhaW4gcXVlcmllcywgb25seSBkYXRhJyk7XG4gICAgfVxuICAgIGlmIChpbml0aWFsU3RhdGUgJiYgaW5pdGlhbFN0YXRlW3JlZHV4Um9vdEtleV0gJiYgaW5pdGlhbFN0YXRlW3JlZHV4Um9vdEtleV1bJ211dGF0aW9ucyddKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXBvbGxvIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBjb250YWluIG11dGF0aW9ucywgb25seSBkYXRhJyk7XG4gICAgfVxuICAgIHJldHVybiByZWR1eC5jcmVhdGVTdG9yZShyZWR1eC5jb21iaW5lUmVkdWNlcnMoKF9mID0ge30sIF9mW3JlZHV4Um9vdEtleV0gPSBjcmVhdGVBcG9sbG9SZWR1Y2VyKGNvbmZpZyksIF9mKSksIGluaXRpYWxTdGF0ZSwgY29tcG9zZSQkMS5hcHBseSh2b2lkIDAsIGVuaGFuY2VycykpO1xuICAgIHZhciBfZjtcbn1cblxuZnVuY3Rpb24gaXNTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSAhPT0gdW5kZWZpbmVkO1xufVxudmFyIE9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlckZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlckZ1bmN0aW9uID0gc3Vic2NyaWJlckZ1bmN0aW9uO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZVskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uT3JDbGVhbnVwRnVuY3Rpb24gPSB0aGlzLnN1YnNjcmliZXJGdW5jdGlvbihvYnNlcnZlcik7XG4gICAgICAgIGlmIChpc1N1YnNjcmlwdGlvbihzdWJzY3JpcHRpb25PckNsZWFudXBGdW5jdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25PckNsZWFudXBGdW5jdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmU6IHN1YnNjcmlwdGlvbk9yQ2xlYW51cEZ1bmN0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuXG52YXIgX19leHRlbmRzJDQgPSAodW5kZWZpbmVkICYmIHVuZGVmaW5lZC5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmZ1bmN0aW9uIGlzQXBvbGxvRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGVyci5oYXNPd25Qcm9wZXJ0eSgnZ3JhcGhRTEVycm9ycycpO1xufVxudmFyIGdlbmVyYXRlRXJyb3JNZXNzYWdlID0gZnVuY3Rpb24gKGVycikge1xuICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXJyLmdyYXBoUUxFcnJvcnMpICYmIGVyci5ncmFwaFFMRXJyb3JzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBlcnIuZ3JhcGhRTEVycm9ycy5mb3JFYWNoKGZ1bmN0aW9uIChncmFwaFFMRXJyb3IpIHtcbiAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBncmFwaFFMRXJyb3IgPyBncmFwaFFMRXJyb3IubWVzc2FnZSA6ICdFcnJvciBtZXNzYWdlIG5vdCBmb3VuZC4nO1xuICAgICAgICAgICAgbWVzc2FnZSArPSBcIkdyYXBoUUwgZXJyb3I6IFwiICsgZXJyb3JNZXNzYWdlICsgXCJcXG5cIjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChlcnIubmV0d29ya0Vycm9yKSB7XG4gICAgICAgIG1lc3NhZ2UgKz0gJ05ldHdvcmsgZXJyb3I6ICcgKyBlcnIubmV0d29ya0Vycm9yLm1lc3NhZ2UgKyAnXFxuJztcbiAgICB9XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZSgvXFxuJC8sICcnKTtcbiAgICByZXR1cm4gbWVzc2FnZTtcbn07XG52YXIgQXBvbGxvRXJyb3IgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyQ0KEFwb2xsb0Vycm9yLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFwb2xsb0Vycm9yKF9hKSB7XG4gICAgICAgIHZhciBncmFwaFFMRXJyb3JzID0gX2EuZ3JhcGhRTEVycm9ycywgbmV0d29ya0Vycm9yID0gX2EubmV0d29ya0Vycm9yLCBlcnJvck1lc3NhZ2UgPSBfYS5lcnJvck1lc3NhZ2UsIGV4dHJhSW5mbyA9IF9hLmV4dHJhSW5mbztcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZXJyb3JNZXNzYWdlKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5ncmFwaFFMRXJyb3JzID0gZ3JhcGhRTEVycm9ycyB8fCBbXTtcbiAgICAgICAgX3RoaXMubmV0d29ya0Vycm9yID0gbmV0d29ya0Vycm9yIHx8IG51bGw7XG4gICAgICAgIGlmICghZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgICBfdGhpcy5tZXNzYWdlID0gZ2VuZXJhdGVFcnJvck1lc3NhZ2UoX3RoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMubWVzc2FnZSA9IGVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5leHRyYUluZm8gPSBleHRyYUluZm87XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIEFwb2xsb0Vycm9yO1xufShFcnJvcikpO1xuXG52YXIgRmV0Y2hUeXBlO1xuKGZ1bmN0aW9uIChGZXRjaFR5cGUpIHtcbiAgICBGZXRjaFR5cGVbRmV0Y2hUeXBlW1wibm9ybWFsXCJdID0gMV0gPSBcIm5vcm1hbFwiO1xuICAgIEZldGNoVHlwZVtGZXRjaFR5cGVbXCJyZWZldGNoXCJdID0gMl0gPSBcInJlZmV0Y2hcIjtcbiAgICBGZXRjaFR5cGVbRmV0Y2hUeXBlW1wicG9sbFwiXSA9IDNdID0gXCJwb2xsXCI7XG59KShGZXRjaFR5cGUgfHwgKEZldGNoVHlwZSA9IHt9KSk7XG5cbmZ1bmN0aW9uIGRlZXBGcmVlemUobykge1xuICAgIE9iamVjdC5mcmVlemUobyk7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobykuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShwcm9wKVxuICAgICAgICAgICAgJiYgb1twcm9wXSAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgKHR5cGVvZiBvW3Byb3BdID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb1twcm9wXSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICYmICFPYmplY3QuaXNGcm96ZW4ob1twcm9wXSkpIHtcbiAgICAgICAgICAgIGRlZXBGcmVlemUob1twcm9wXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbztcbn1cbmZ1bmN0aW9uIG1heWJlRGVlcEZyZWV6ZShvYmopIHtcbiAgICBpZiAoaXNEZXZlbG9wbWVudCgpIHx8IGlzVGVzdCgpKSB7XG4gICAgICAgIHJldHVybiBkZWVwRnJlZXplKG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59XG5cbnZhciBfX2V4dGVuZHMkMyA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXNzaWduJDEyID0gKHVuZGVmaW5lZCAmJiB1bmRlZmluZWQuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xudmFyIE9ic2VydmFibGVRdWVyeSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzJDMoT2JzZXJ2YWJsZVF1ZXJ5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVRdWVyeShfYSkge1xuICAgICAgICB2YXIgc2NoZWR1bGVyID0gX2Euc2NoZWR1bGVyLCBvcHRpb25zID0gX2Eub3B0aW9ucywgX2IgPSBfYS5zaG91bGRTdWJzY3JpYmUsIHNob3VsZFN1YnNjcmliZSA9IF9iID09PSB2b2lkIDAgPyB0cnVlIDogX2I7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBxdWVyeU1hbmFnZXIgPSBzY2hlZHVsZXIucXVlcnlNYW5hZ2VyO1xuICAgICAgICB2YXIgcXVlcnlJZCA9IHF1ZXJ5TWFuYWdlci5nZW5lcmF0ZVF1ZXJ5SWQoKTtcbiAgICAgICAgdmFyIHN1YnNjcmliZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLm9uU3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzdWJzY3JpYmVyRnVuY3Rpb24pIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgX3RoaXMudmFyaWFibGVzID0gX3RoaXMub3B0aW9ucy52YXJpYWJsZXMgfHwge307XG4gICAgICAgIF90aGlzLnNjaGVkdWxlciA9IHNjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyID0gcXVlcnlNYW5hZ2VyO1xuICAgICAgICBfdGhpcy5xdWVyeUlkID0gcXVlcnlJZDtcbiAgICAgICAgX3RoaXMuc2hvdWxkU3Vic2NyaWJlID0gc2hvdWxkU3Vic2NyaWJlO1xuICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgX3RoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcyA9IFtdO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUucmVzdWx0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkT2JzZXJ2ZXJzID0gdGhhdC5vYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRPYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnF1ZXJ5TWFuYWdlci5yZW1vdmVRdWVyeSh0aGF0LnF1ZXJ5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdGhhdC5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuY3VycmVudFJlc3VsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0Q3VycmVudFF1ZXJ5UmVzdWx0KHRoaXMsIHRydWUpLCBkYXRhID0gX2EuZGF0YSwgcGFydGlhbCA9IF9hLnBhcnRpYWw7XG4gICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSB0aGlzLnF1ZXJ5TWFuYWdlci5nZXRBcG9sbG9TdGF0ZSgpLnF1ZXJpZXNbdGhpcy5xdWVyeUlkXTtcbiAgICAgICAgaWYgKHF1ZXJ5U3RvcmVWYWx1ZSAmJiAoKHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzICYmIHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICBxdWVyeVN0b3JlVmFsdWUubmV0d29ya0Vycm9yKSkge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEFwb2xsb0Vycm9yKHtcbiAgICAgICAgICAgICAgICBncmFwaFFMRXJyb3JzOiBxdWVyeVN0b3JlVmFsdWUuZ3JhcGhRTEVycm9ycyxcbiAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHt9LCBsb2FkaW5nOiBmYWxzZSwgbmV0d29ya1N0YXR1czogcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMsIGVycm9yOiBlcnJvciB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBxdWVyeUxvYWRpbmcgPSAhcXVlcnlTdG9yZVZhbHVlIHx8IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzID09PSBleHBvcnRzLk5ldHdvcmtTdGF0dXMubG9hZGluZztcbiAgICAgICAgdmFyIGxvYWRpbmcgPSAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnbmV0d29yay1vbmx5JyAmJiBxdWVyeUxvYWRpbmcpXG4gICAgICAgICAgICB8fCAocGFydGlhbCAmJiB0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5Jyk7XG4gICAgICAgIHZhciBuZXR3b3JrU3RhdHVzO1xuICAgICAgICBpZiAocXVlcnlTdG9yZVZhbHVlKSB7XG4gICAgICAgICAgICBuZXR3b3JrU3RhdHVzID0gcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXR3b3JrU3RhdHVzID0gbG9hZGluZyA/IGV4cG9ydHMuTmV0d29ya1N0YXR1cy5sb2FkaW5nIDogZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnJlYWR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbG9hZGluZzogaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KG5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgbmV0d29ya1N0YXR1czogbmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgIHBhcnRpYWw6IHBhcnRpYWwsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLmdldExhc3RSZXN1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RSZXN1bHQ7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnJlZmV0Y2ggPSBmdW5jdGlvbiAodmFyaWFibGVzKSB7XG4gICAgICAgIHRoaXMudmFyaWFibGVzID0gX19hc3NpZ24kMTIoe30sIHRoaXMudmFyaWFibGVzLCB2YXJpYWJsZXMpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2NhY2hlLW9ubHkgZmV0Y2hQb2xpY3kgb3B0aW9uIHNob3VsZCBub3QgYmUgdXNlZCB0b2dldGhlciB3aXRoIHF1ZXJ5IHJlZmV0Y2guJykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy52YXJpYWJsZXMgPSBfX2Fzc2lnbiQxMih7fSwgdGhpcy5vcHRpb25zLnZhcmlhYmxlcywgdGhpcy52YXJpYWJsZXMpO1xuICAgICAgICB2YXIgY29tYmluZWRPcHRpb25zID0gX19hc3NpZ24kMTIoe30sIHRoaXMub3B0aW9ucywgeyBmZXRjaFBvbGljeTogJ25ldHdvcmstb25seScgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5mZXRjaFF1ZXJ5KHRoaXMucXVlcnlJZCwgY29tYmluZWRPcHRpb25zLCBGZXRjaFR5cGUucmVmZXRjaClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHsgcmV0dXJuIG1heWJlRGVlcEZyZWV6ZShyZXN1bHQpOyB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuZmV0Y2hNb3JlID0gZnVuY3Rpb24gKGZldGNoTW9yZU9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFmZXRjaE1vcmVPcHRpb25zLnVwZGF0ZVF1ZXJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZVF1ZXJ5IG9wdGlvbiBpcyByZXF1aXJlZC4gVGhpcyBmdW5jdGlvbiBkZWZpbmVzIGhvdyB0byB1cGRhdGUgdGhlIHF1ZXJ5IGRhdGEgd2l0aCB0aGUgbmV3IHJlc3VsdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcWlkID0gX3RoaXMucXVlcnlNYW5hZ2VyLmdlbmVyYXRlUXVlcnlJZCgpO1xuICAgICAgICAgICAgdmFyIGNvbWJpbmVkT3B0aW9ucyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZmV0Y2hNb3JlT3B0aW9ucy5xdWVyeSkge1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkT3B0aW9ucyA9IGZldGNoTW9yZU9wdGlvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzID0gX19hc3NpZ24kMTIoe30sIF90aGlzLnZhcmlhYmxlcywgZmV0Y2hNb3JlT3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICAgICAgICAgIGNvbWJpbmVkT3B0aW9ucyA9IF9fYXNzaWduJDEyKHt9LCBfdGhpcy5vcHRpb25zLCBmZXRjaE1vcmVPcHRpb25zLCB7IHZhcmlhYmxlczogdmFyaWFibGVzIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tYmluZWRPcHRpb25zID0gX19hc3NpZ24kMTIoe30sIGNvbWJpbmVkT3B0aW9ucywgeyBxdWVyeTogY29tYmluZWRPcHRpb25zLnF1ZXJ5LCBmZXRjaFBvbGljeTogJ25ldHdvcmstb25seScgfSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucXVlcnlNYW5hZ2VyLmZldGNoUXVlcnkocWlkLCBjb21iaW5lZE9wdGlvbnMsIEZldGNoVHlwZS5ub3JtYWwsIF90aGlzLnF1ZXJ5SWQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGZldGNoTW9yZVJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBmZXRjaE1vcmVSZXN1bHQuZGF0YTtcbiAgICAgICAgICAgIHZhciByZWR1Y2VyID0gZmV0Y2hNb3JlT3B0aW9ucy51cGRhdGVRdWVyeTtcbiAgICAgICAgICAgIHZhciBtYXBGbiA9IGZ1bmN0aW9uIChwcmV2aW91c1Jlc3VsdCwgX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzID0gX2EudmFyaWFibGVzO1xuICAgICAgICAgICAgICAgIHZhciBxdWVyeVZhcmlhYmxlcyA9IHZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlcihwcmV2aW91c1Jlc3VsdCwge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaE1vcmVSZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5VmFyaWFibGVzOiBxdWVyeVZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy51cGRhdGVRdWVyeShtYXBGbik7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hNb3JlUmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3Vic2NyaWJlVG9Nb3JlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24oe1xuICAgICAgICAgICAgcXVlcnk6IG9wdGlvbnMuZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IG9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMudXBkYXRlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZHVjZXJfMSA9IG9wdGlvbnMudXBkYXRlUXVlcnk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXBGbiA9IGZ1bmN0aW9uIChwcmV2aW91c1Jlc3VsdCwgX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZXMgPSBfYS52YXJpYWJsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlcl8xKHByZXZpb3VzUmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uRGF0YTogeyBkYXRhOiBkYXRhIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlUXVlcnkobWFwRm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgR3JhcGhRTCBzdWJzY3JpcHRpb24gZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBfdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmIChpID49IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zdWJzY3JpcHRpb25IYW5kbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIHZhciBvbGRPcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfX2Fzc2lnbiQxMih7fSwgdGhpcy5vcHRpb25zLCBvcHRzKTtcbiAgICAgICAgaWYgKG9wdHMucG9sbEludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZyhvcHRzLnBvbGxJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0cy5wb2xsSW50ZXJ2YWwgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJ5RmV0Y2ggPSAob2xkT3B0aW9ucy5mZXRjaFBvbGljeSAhPT0gJ25ldHdvcmstb25seScgJiYgb3B0cy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpXG4gICAgICAgICAgICB8fCAob2xkT3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLW9ubHknICYmIG9wdHMuZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5JylcbiAgICAgICAgICAgIHx8IChvbGRPcHRpb25zLmZldGNoUG9saWN5ID09PSAnc3RhbmRieScgJiYgb3B0cy5mZXRjaFBvbGljeSAhPT0gJ3N0YW5kYnknKVxuICAgICAgICAgICAgfHwgZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFZhcmlhYmxlcyh0aGlzLm9wdGlvbnMudmFyaWFibGVzLCB0cnlGZXRjaCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldFZhcmlhYmxlcyA9IGZ1bmN0aW9uICh2YXJpYWJsZXMsIHRyeUZldGNoKSB7XG4gICAgICAgIGlmICh0cnlGZXRjaCA9PT0gdm9pZCAwKSB7IHRyeUZldGNoID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIG5ld1ZhcmlhYmxlcyA9IF9fYXNzaWduJDEyKHt9LCB0aGlzLnZhcmlhYmxlcywgdmFyaWFibGVzKTtcbiAgICAgICAgaWYgKGlzRXF1YWwobmV3VmFyaWFibGVzLCB0aGlzLnZhcmlhYmxlcykgJiYgIXRyeUZldGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXNvbHZlKCk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhcmlhYmxlcyA9IG5ld1ZhcmlhYmxlcztcbiAgICAgICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUoKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeSh0aGlzLnF1ZXJ5SWQsIF9fYXNzaWduJDEyKHt9LCB0aGlzLm9wdGlvbnMsIHsgdmFyaWFibGVzOiB0aGlzLnZhcmlhYmxlcyB9KSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7IHJldHVybiBtYXliZURlZXBGcmVlemUocmVzdWx0KTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUudXBkYXRlUXVlcnkgPSBmdW5jdGlvbiAobWFwRm4pIHtcbiAgICAgICAgdmFyIF9hID0gdGhpcy5xdWVyeU1hbmFnZXIuZ2V0UXVlcnlXaXRoUHJldmlvdXNSZXN1bHQodGhpcy5xdWVyeUlkKSwgcHJldmlvdXNSZXN1bHQgPSBfYS5wcmV2aW91c1Jlc3VsdCwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkb2N1bWVudCA9IF9hLmRvY3VtZW50O1xuICAgICAgICB2YXIgbmV3UmVzdWx0ID0gdHJ5RnVuY3Rpb25PckxvZ0Vycm9yKGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hcEZuKHByZXZpb3VzUmVzdWx0LCB7IHZhcmlhYmxlczogdmFyaWFibGVzIH0pOyB9KTtcbiAgICAgICAgaWYgKG5ld1Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fVVBEQVRFX1FVRVJZX1JFU1VMVCcsXG4gICAgICAgICAgICAgICAgbmV3UmVzdWx0OiBuZXdSZXN1bHQsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3RvcFBvbGxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuaXNDdXJyZW50bHlQb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUuc3RhcnRQb2xsaW5nID0gZnVuY3Rpb24gKHBvbGxJbnRlcnZhbCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtZmlyc3QnIHx8ICh0aGlzLm9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUXVlcmllcyB0aGF0IHNwZWNpZnkgdGhlIGNhY2hlLWZpcnN0IGFuZCBjYWNoZS1vbmx5IGZldGNoUG9saWNpZXMgY2Fubm90IGFsc28gYmUgcG9sbGluZyBxdWVyaWVzLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMucG9sbEludGVydmFsID0gcG9sbEludGVydmFsO1xuICAgICAgICB0aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyLnN0YXJ0UG9sbGluZ1F1ZXJ5KHRoaXMub3B0aW9ucywgdGhpcy5xdWVyeUlkKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVRdWVyeS5wcm90b3R5cGUub25TdWJzY3JpYmUgPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgIGlmIChvYnNlcnZlci5uZXh0ICYmIHRoaXMubGFzdFJlc3VsdCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh0aGlzLmxhc3RSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYnNlcnZlci5lcnJvciAmJiB0aGlzLmxhc3RFcnJvcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IodGhpcy5sYXN0RXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9ic2VydmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VXBRdWVyeSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXRRdWVyeVN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vYnNlcnZlcnMuc29tZShmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID09PSBvYnNlcnZlcjsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5vYnNlcnZlcnMgPSBfdGhpcy5vYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvYnMpIHsgcmV0dXJuIG9icyAhPT0gb2JzZXJ2ZXI7IH0pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRlYXJEb3duUXVlcnkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0UXVlcnlTdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnNldFVwUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIuYWRkT2JzZXJ2YWJsZVF1ZXJ5KHRoaXMucXVlcnlJZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhdGhpcy5vcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWZpcnN0JyB8fCAodGhpcy5vcHRpb25zLmZldGNoUG9saWN5ID09PSAnY2FjaGUtb25seScpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdRdWVyaWVzIHRoYXQgc3BlY2lmeSB0aGUgY2FjaGUtZmlyc3QgYW5kIGNhY2hlLW9ubHkgZmV0Y2hQb2xpY2llcyBjYW5ub3QgYWxzbyBiZSBwb2xsaW5nIHF1ZXJpZXMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudGx5UG9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlci5zdGFydFBvbGxpbmdRdWVyeSh0aGlzLm9wdGlvbnMsIHRoaXMucXVlcnlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9ic2VydmVyID0ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmxhc3RSZXN1bHQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9icy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9icykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnMuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIGVycm9yJywgZXJyb3IubWVzc2FnZSwgZXJyb3Iuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMubGFzdEVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5zdGFydFF1ZXJ5KHRoaXMucXVlcnlJZCwgdGhpcy5vcHRpb25zLCB0aGlzLnF1ZXJ5TWFuYWdlci5xdWVyeUxpc3RlbmVyRm9yT2JzZXJ2ZXIodGhpcy5xdWVyeUlkLCB0aGlzLm9wdGlvbnMsIG9ic2VydmVyKSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlUXVlcnkucHJvdG90eXBlLnRlYXJEb3duUXVlcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudGx5UG9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZXIuc3RvcFBvbGxpbmdRdWVyeSh0aGlzLnF1ZXJ5SWQpO1xuICAgICAgICAgICAgdGhpcy5pc0N1cnJlbnRseVBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbkhhbmRsZXMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBzdWIudW5zdWJzY3JpYmUoKTsgfSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uSGFuZGxlcyA9IFtdO1xuICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5zdG9wUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkU3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5TWFuYWdlci5yZW1vdmVPYnNlcnZhYmxlUXVlcnkodGhpcy5xdWVyeUlkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9ic2VydmVycyA9IFtdO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVRdWVyeTtcbn0oT2JzZXJ2YWJsZSkpO1xuXG52YXIgaGF2ZVdhcm5lZCQxID0gT2JqZWN0LmNyZWF0ZSh7fSk7XG5mdW5jdGlvbiB3YXJuT25jZUluRGV2ZWxvcG1lbnQobXNnLCB0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09IHZvaWQgMCkgeyB0eXBlID0gJ3dhcm4nOyB9XG4gICAgaWYgKGlzUHJvZHVjdGlvbigpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFoYXZlV2FybmVkJDFbbXNnXSkge1xuICAgICAgICBpZiAoIWlzVGVzdCgpKSB7XG4gICAgICAgICAgICBoYXZlV2FybmVkJDFbbXNnXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEludHJvc3BlY3Rpb25GcmFnbWVudE1hdGNoZXIob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmludHJvc3BlY3Rpb25RdWVyeVJlc3VsdERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMucG9zc2libGVUeXBlc01hcCA9IHRoaXMucGFyc2VJbnRyb3NwZWN0aW9uUmVzdWx0KG9wdGlvbnMuaW50cm9zcGVjdGlvblF1ZXJ5UmVzdWx0RGF0YSk7XG4gICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXRjaCA9IHRoaXMubWF0Y2guYmluZCh0aGlzKTtcbiAgICB9XG4gICAgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAoaWRWYWx1ZSwgdHlwZUNvbmRpdGlvbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNSZWFkeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGcmFnbWVudE1hdGNoZXIubWF0Y2goKSB3YXMgY2FsbGVkIGJlZm9yZSBGcmFnbWVudE1hdGNoZXIuaW5pdCgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9iaiA9IGNvbnRleHQuc3RvcmVbaWRWYWx1ZS5pZF07XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmouX190eXBlbmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG1hdGNoIGZyYWdtZW50IGJlY2F1c2UgX190eXBlbmFtZSBwcm9wZXJ0eSBpcyBtaXNzaW5nOiBcIiArIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmouX190eXBlbmFtZSA9PT0gdHlwZUNvbmRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGltcGxlbWVudGluZ1R5cGVzID0gdGhpcy5wb3NzaWJsZVR5cGVzTWFwW3R5cGVDb25kaXRpb25dO1xuICAgICAgICBpZiAoaW1wbGVtZW50aW5nVHlwZXMgJiYgaW1wbGVtZW50aW5nVHlwZXMuaW5kZXhPZihvYmouX190eXBlbmFtZSkgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUucGFyc2VJbnRyb3NwZWN0aW9uUmVzdWx0ID0gZnVuY3Rpb24gKGludHJvc3BlY3Rpb25SZXN1bHREYXRhKSB7XG4gICAgICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgICAgIGludHJvc3BlY3Rpb25SZXN1bHREYXRhLl9fc2NoZW1hLnR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlLmtpbmQgPT09ICdVTklPTicgfHwgdHlwZS5raW5kID09PSAnSU5URVJGQUNFJykge1xuICAgICAgICAgICAgICAgIHR5cGVNYXBbdHlwZS5uYW1lXSA9IHR5cGUucG9zc2libGVUeXBlcy5tYXAoZnVuY3Rpb24gKGltcGxlbWVudGluZ1R5cGUpIHsgcmV0dXJuIGltcGxlbWVudGluZ1R5cGUubmFtZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHlwZU1hcDtcbiAgICB9O1xuICAgIHJldHVybiBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyO1xufSgpKTtcbnZhciBoYXZlV2FybmVkID0gZmFsc2U7XG52YXIgSGV1cmlzdGljRnJhZ21lbnRNYXRjaGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKSB7XG4gICAgfVxuICAgIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUuZW5zdXJlUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlci5wcm90b3R5cGUuY2FuQnlwYXNzSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKGlkVmFsdWUsIHR5cGVDb25kaXRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG9iaiA9IGNvbnRleHQuc3RvcmVbaWRWYWx1ZS5pZF07XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvYmouX190eXBlbmFtZSkge1xuICAgICAgICAgICAgaWYgKCFoYXZlV2FybmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiWW91J3JlIHVzaW5nIGZyYWdtZW50cyBpbiB5b3VyIHF1ZXJpZXMsIGJ1dCBlaXRoZXIgZG9uJ3QgaGF2ZSB0aGUgYWRkVHlwZW5hbWU6XFxuICB0cnVlIG9wdGlvbiBzZXQgaW4gQXBvbGxvIENsaWVudCwgb3IgeW91IGFyZSB0cnlpbmcgdG8gd3JpdGUgYSBmcmFnbWVudCB0byB0aGUgc3RvcmUgd2l0aG91dCB0aGUgX190eXBlbmFtZS5cXG4gICBQbGVhc2UgdHVybiBvbiB0aGUgYWRkVHlwZW5hbWUgb3B0aW9uIGFuZCBpbmNsdWRlIF9fdHlwZW5hbWUgd2hlbiB3cml0aW5nIGZyYWdtZW50cyBzbyB0aGF0IEFwb2xsbyBDbGllbnRcXG4gICBjYW4gYWNjdXJhdGVseSBtYXRjaCBmcmFnbWVudHMuXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IGZpbmQgX190eXBlbmFtZSBvbiBGcmFnbWVudCAnLCB0eXBlQ29uZGl0aW9uLCBvYmopO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkRFUFJFQ0FUSU9OIFdBUk5JTkc6IHVzaW5nIGZyYWdtZW50cyB3aXRob3V0IF9fdHlwZW5hbWUgaXMgdW5zdXBwb3J0ZWQgYmVoYXZpb3IgXCIgK1xuICAgICAgICAgICAgICAgICAgICBcImFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIEFwb2xsbyBjbGllbnQuIFlvdSBzaG91bGQgZml4IHRoaXMgYW5kIHNldCBhZGRUeXBlbmFtZSB0byB0cnVlIG5vdy5cIik7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1Rlc3QoKSkge1xuICAgICAgICAgICAgICAgICAgICBoYXZlV2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnJldHVyblBhcnRpYWxEYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYmouX190eXBlbmFtZSA9PT0gdHlwZUNvbmRpdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2Fybk9uY2VJbkRldmVsb3BtZW50KFwiWW91IGFyZSB1c2luZyB0aGUgc2ltcGxlIChoZXVyaXN0aWMpIGZyYWdtZW50IG1hdGNoZXIsIGJ1dCB5b3VyIHF1ZXJpZXMgY29udGFpbiB1bmlvbiBvciBpbnRlcmZhY2UgdHlwZXMuXFxuICAgICBBcG9sbG8gQ2xpZW50IHdpbGwgbm90IGJlIGFibGUgdG8gYWJsZSB0byBhY2N1cmF0ZWx5IG1hcCBmcmFnbWVudHMuXCIgK1xuICAgICAgICAgICAgXCJUbyBtYWtlIHRoaXMgZXJyb3IgZ28gYXdheSwgdXNlIHRoZSBJbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyIGFzIGRlc2NyaWJlZCBpbiB0aGUgZG9jczogXCIgK1xuICAgICAgICAgICAgXCJodHRwOi8vZGV2LmFwb2xsb2RhdGEuY29tL3JlYWN0L2luaXRpYWxpemF0aW9uLmh0bWwjZnJhZ21lbnQtbWF0Y2hlclwiLCAnZXJyb3InKTtcbiAgICAgICAgY29udGV4dC5yZXR1cm5QYXJ0aWFsRGF0YSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlcjtcbn0oKSk7XG5cbnZhciBEZWR1cGxpY2F0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlZHVwbGljYXRvcihuZXR3b3JrSW50ZXJmYWNlKSB7XG4gICAgICAgIHRoaXMubmV0d29ya0ludGVyZmFjZSA9IG5ldHdvcmtJbnRlcmZhY2U7XG4gICAgICAgIHRoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXMgPSB7fTtcbiAgICB9XG4gICAgRGVkdXBsaWNhdG9yLnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBkZWR1cGxpY2F0ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZGVkdXBsaWNhdGUgPT09IHZvaWQgMCkgeyBkZWR1cGxpY2F0ZSA9IHRydWU7IH1cbiAgICAgICAgaWYgKCFkZWR1cGxpY2F0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV0d29ya0ludGVyZmFjZS5xdWVyeShyZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5ID0gdGhpcy5nZXRLZXkocmVxdWVzdCk7XG4gICAgICAgIGlmICghdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlc1trZXldKSB7XG4gICAgICAgICAgICB0aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzW2tleV0gPSB0aGlzLm5ldHdvcmtJbnRlcmZhY2UucXVlcnkocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5GbGlnaHRSZXF1ZXN0UHJvbWlzZXNba2V5XVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgZGVsZXRlIF90aGlzLmluRmxpZ2h0UmVxdWVzdFByb21pc2VzW2tleV07XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5pbkZsaWdodFJlcXVlc3RQcm9taXNlc1trZXldO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERlZHVwbGljYXRvci5wcm90b3R5cGUuZ2V0S2V5ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuIGdyYXBocWxfbGFuZ3VhZ2VfcHJpbnRlci5wcmludChyZXF1ZXN0LnF1ZXJ5KSArIFwifFwiICsgSlNPTi5zdHJpbmdpZnkocmVxdWVzdC52YXJpYWJsZXMpICsgXCJ8XCIgKyByZXF1ZXN0Lm9wZXJhdGlvbk5hbWU7XG4gICAgfTtcbiAgICByZXR1cm4gRGVkdXBsaWNhdG9yO1xufSgpKTtcblxuZnVuY3Rpb24gY3JlYXRlU3RvcmVSZWR1Y2VyKHJlc3VsdFJlZHVjZXIsIGRvY3VtZW50LCB2YXJpYWJsZXMsIGNvbmZpZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmUsIGFjdGlvbikge1xuICAgICAgICB2YXIgX2EgPSBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoe1xuICAgICAgICAgICAgc3RvcmU6IHN0b3JlLFxuICAgICAgICAgICAgcXVlcnk6IGRvY3VtZW50LFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICByZXR1cm5QYXJ0aWFsRGF0YTogdHJ1ZSxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIH0pLCByZXN1bHQgPSBfYS5yZXN1bHQsIGlzTWlzc2luZyA9IF9hLmlzTWlzc2luZztcbiAgICAgICAgaWYgKGlzTWlzc2luZykge1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXh0UmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbmV4dFJlc3VsdCA9IHJlc3VsdFJlZHVjZXIocmVzdWx0LCBhY3Rpb24sIHZhcmlhYmxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmhhbmRsZWQgZXJyb3IgaW4gcmVzdWx0IHJlZHVjZXInLCBlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5leHRSZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB3cml0ZVJlc3VsdFRvU3RvcmUoe1xuICAgICAgICAgICAgICAgIGRhdGFJZDogJ1JPT1RfUVVFUlknLFxuICAgICAgICAgICAgICAgIHJlc3VsdDogbmV4dFJlc3VsdCxcbiAgICAgICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQ6IGRvY3VtZW50LFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGNvbmZpZy5kYXRhSWRGcm9tT2JqZWN0LFxuICAgICAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlckZ1bmN0aW9uOiBjb25maWcuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgIH07XG59XG5cbnZhciBfX2Fzc2lnbiQxNSA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBRdWVyeVNjaGVkdWxlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUXVlcnlTY2hlZHVsZXIoX2EpIHtcbiAgICAgICAgdmFyIHF1ZXJ5TWFuYWdlciA9IF9hLnF1ZXJ5TWFuYWdlcjtcbiAgICAgICAgdGhpcy5xdWVyeU1hbmFnZXIgPSBxdWVyeU1hbmFnZXI7XG4gICAgICAgIHRoaXMucG9sbGluZ1RpbWVycyA9IHt9O1xuICAgICAgICB0aGlzLmluRmxpZ2h0UXVlcmllcyA9IHt9O1xuICAgICAgICB0aGlzLnJlZ2lzdGVyZWRRdWVyaWVzID0ge307XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxRdWVyaWVzID0ge307XG4gICAgfVxuICAgIFF1ZXJ5U2NoZWR1bGVyLnByb3RvdHlwZS5jaGVja0luRmxpZ2h0ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSB0aGlzLnF1ZXJ5TWFuYWdlci5nZXRBcG9sbG9TdGF0ZSgpLnF1ZXJpZXM7XG4gICAgICAgIHJldHVybiBxdWVyaWVzW3F1ZXJ5SWRdICYmIHF1ZXJpZXNbcXVlcnlJZF0ubmV0d29ya1N0YXR1cyAhPT0gZXhwb3J0cy5OZXR3b3JrU3RhdHVzLnJlYWR5O1xuICAgIH07XG4gICAgUXVlcnlTY2hlZHVsZXIucHJvdG90eXBlLmZldGNoUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb3B0aW9ucywgZmV0Y2hUeXBlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5xdWVyeU1hbmFnZXIuZmV0Y2hRdWVyeShxdWVyeUlkLCBvcHRpb25zLCBmZXRjaFR5cGUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuc3RhcnRQb2xsaW5nUXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucywgcXVlcnlJZCwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gc3RhcnQgYSBwb2xsaW5nIHF1ZXJ5IHdpdGhvdXQgYSBwb2xsaW5nIGludGVydmFsLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVnaXN0ZXJlZFF1ZXJpZXNbcXVlcnlJZF0gPSBvcHRpb25zO1xuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLmFkZFF1ZXJ5TGlzdGVuZXIocXVlcnlJZCwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkUXVlcnlPbkludGVydmFsKHF1ZXJ5SWQsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcXVlcnlJZDtcbiAgICB9O1xuICAgIFF1ZXJ5U2NoZWR1bGVyLnByb3RvdHlwZS5zdG9wUG9sbGluZ1F1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucmVnaXN0ZXJlZFF1ZXJpZXNbcXVlcnlJZF07XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuZmV0Y2hRdWVyaWVzT25JbnRlcnZhbCA9IGZ1bmN0aW9uIChpbnRlcnZhbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0gPSB0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0uZmlsdGVyKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLnJlZ2lzdGVyZWRRdWVyaWVzLmhhc093blByb3BlcnR5KHF1ZXJ5SWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLmNoZWNrSW5GbGlnaHQocXVlcnlJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBxdWVyeU9wdGlvbnMgPSBfdGhpcy5yZWdpc3RlcmVkUXVlcmllc1txdWVyeUlkXTtcbiAgICAgICAgICAgIHZhciBwb2xsaW5nT3B0aW9ucyA9IF9fYXNzaWduJDE1KHt9LCBxdWVyeU9wdGlvbnMpO1xuICAgICAgICAgICAgcG9sbGluZ09wdGlvbnMuZmV0Y2hQb2xpY3kgPSAnbmV0d29yay1vbmx5JztcbiAgICAgICAgICAgIF90aGlzLmZldGNoUXVlcnkocXVlcnlJZCwgcG9sbGluZ09wdGlvbnMsIEZldGNoVHlwZS5wb2xsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuaW50ZXJ2YWxRdWVyaWVzW2ludGVydmFsXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5wb2xsaW5nVGltZXJzW2ludGVydmFsXSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUuYWRkUXVlcnlPbkludGVydmFsID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIHF1ZXJ5T3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSBxdWVyeU9wdGlvbnMucG9sbEludGVydmFsO1xuICAgICAgICBpZiAoIWludGVydmFsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBIHBvbGwgaW50ZXJ2YWwgaXMgcmVxdWlyZWQgdG8gc3RhcnQgcG9sbGluZyBxdWVyeSB3aXRoIGlkICdcIiArIHF1ZXJ5SWQgKyBcIicuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmludGVydmFsUXVlcmllcy5oYXNPd25Qcm9wZXJ0eShpbnRlcnZhbC50b1N0cmluZygpKSAmJiB0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFF1ZXJpZXNbaW50ZXJ2YWxdLnB1c2gocXVlcnlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsUXVlcmllc1tpbnRlcnZhbF0gPSBbcXVlcnlJZF07XG4gICAgICAgICAgICB0aGlzLnBvbGxpbmdUaW1lcnNbaW50ZXJ2YWxdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmZldGNoUXVlcmllc09uSW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeVNjaGVkdWxlci5wcm90b3R5cGUucmVnaXN0ZXJQb2xsaW5nUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlPcHRpb25zKSB7XG4gICAgICAgIGlmICghcXVlcnlPcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRlbXB0ZWQgdG8gcmVnaXN0ZXIgYSBub24tcG9sbGluZyBxdWVyeSB3aXRoIHRoZSBzY2hlZHVsZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlUXVlcnkoe1xuICAgICAgICAgICAgc2NoZWR1bGVyOiB0aGlzLFxuICAgICAgICAgICAgb3B0aW9uczogcXVlcnlPcHRpb25zLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBRdWVyeVNjaGVkdWxlcjtcbn0oKSk7XG5cbnZhciBfX2Fzc2lnbiQxNCA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBRdWVyeU1hbmFnZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFF1ZXJ5TWFuYWdlcihfYSkge1xuICAgICAgICB2YXIgbmV0d29ya0ludGVyZmFjZSA9IF9hLm5ldHdvcmtJbnRlcmZhY2UsIHN0b3JlID0gX2Euc3RvcmUsIHJlZHV4Um9vdFNlbGVjdG9yID0gX2EucmVkdXhSb290U2VsZWN0b3IsIF9iID0gX2EucmVkdWNlckNvbmZpZywgcmVkdWNlckNvbmZpZyA9IF9iID09PSB2b2lkIDAgPyB7IG11dGF0aW9uQmVoYXZpb3JSZWR1Y2Vyczoge30gfSA6IF9iLCBmcmFnbWVudE1hdGNoZXIgPSBfYS5mcmFnbWVudE1hdGNoZXIsIF9jID0gX2EuYWRkVHlwZW5hbWUsIGFkZFR5cGVuYW1lID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgX2QgPSBfYS5xdWVyeURlZHVwbGljYXRpb24sIHF1ZXJ5RGVkdXBsaWNhdGlvbiA9IF9kID09PSB2b2lkIDAgPyBmYWxzZSA6IF9kO1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmlkQ291bnRlciA9IDE7XG4gICAgICAgIHRoaXMubmV0d29ya0ludGVyZmFjZSA9IG5ldHdvcmtJbnRlcmZhY2U7XG4gICAgICAgIHRoaXMuZGVkdXBsaWNhdG9yID0gbmV3IERlZHVwbGljYXRvcihuZXR3b3JrSW50ZXJmYWNlKTtcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yID0gcmVkdXhSb290U2VsZWN0b3I7XG4gICAgICAgIHRoaXMucmVkdWNlckNvbmZpZyA9IHJlZHVjZXJDb25maWc7XG4gICAgICAgIHRoaXMucG9sbGluZ1RpbWVycyA9IHt9O1xuICAgICAgICB0aGlzLnF1ZXJ5TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMucXVlcnlEb2N1bWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy5hZGRUeXBlbmFtZSA9IGFkZFR5cGVuYW1lO1xuICAgICAgICB0aGlzLnF1ZXJ5RGVkdXBsaWNhdGlvbiA9IHF1ZXJ5RGVkdXBsaWNhdGlvbjtcbiAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudE1hdGNoZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmZyYWdtZW50TWF0Y2hlciA9IG5ldyBIZXVyaXN0aWNGcmFnbWVudE1hdGNoZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gZnJhZ21lbnRNYXRjaGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVyID0gbmV3IFF1ZXJ5U2NoZWR1bGVyKHtcbiAgICAgICAgICAgIHF1ZXJ5TWFuYWdlcjogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZmV0Y2hRdWVyeVByb21pc2VzID0ge307XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXMgPSB7fTtcbiAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5zdG9yZVsnc3Vic2NyaWJlJ10pIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3RvcmVEYXRhXzE7XG4gICAgICAgICAgICB0aGlzLnN0b3JlWydzdWJzY3JpYmUnXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzU3RvcmVEYXRhID0gY3VycmVudFN0b3JlRGF0YV8xIHx8IHt9O1xuICAgICAgICAgICAgICAgIHZhciBwcmV2aW91c1N0b3JlSGFzRGF0YSA9IE9iamVjdC5rZXlzKHByZXZpb3VzU3RvcmVEYXRhKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0b3JlRGF0YV8xID0gX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNFcXVhbChwcmV2aW91c1N0b3JlRGF0YSwgY3VycmVudFN0b3JlRGF0YV8xKSAmJiBwcmV2aW91c1N0b3JlSGFzRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLmJyb2FkY2FzdFF1ZXJpZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYnJvYWRjYXN0TmV3U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RRdWVyaWVzKCk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLm11dGF0ZSA9IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbXV0YXRpb24gPSBfYS5tdXRhdGlvbiwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBvcHRpbWlzdGljUmVzcG9uc2UgPSBfYS5vcHRpbWlzdGljUmVzcG9uc2UsIHVwZGF0ZVF1ZXJpZXNCeU5hbWUgPSBfYS51cGRhdGVRdWVyaWVzLCBfYiA9IF9hLnJlZmV0Y2hRdWVyaWVzLCByZWZldGNoUXVlcmllcyA9IF9iID09PSB2b2lkIDAgPyBbXSA6IF9iLCB1cGRhdGVXaXRoUHJveHlGbiA9IF9hLnVwZGF0ZTtcbiAgICAgICAgdmFyIG11dGF0aW9uSWQgPSB0aGlzLmdlbmVyYXRlUXVlcnlJZCgpO1xuICAgICAgICBpZiAodGhpcy5hZGRUeXBlbmFtZSkge1xuICAgICAgICAgICAgbXV0YXRpb24gPSBhZGRUeXBlbmFtZVRvRG9jdW1lbnQobXV0YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZ2V0RGVmYXVsdFZhbHVlcyhnZXRNdXRhdGlvbkRlZmluaXRpb24obXV0YXRpb24pKSwgdmFyaWFibGVzKTtcbiAgICAgICAgdmFyIG11dGF0aW9uU3RyaW5nID0gZ3JhcGhxbF9sYW5ndWFnZV9wcmludGVyLnByaW50KG11dGF0aW9uKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBxdWVyeTogbXV0YXRpb24sXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUobXV0YXRpb24pLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnF1ZXJ5RG9jdW1lbnRzW211dGF0aW9uSWRdID0gbXV0YXRpb247XG4gICAgICAgIHZhciB1cGRhdGVRdWVyaWVzID0ge307XG4gICAgICAgIGlmICh1cGRhdGVRdWVyaWVzQnlOYW1lKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh1cGRhdGVRdWVyaWVzQnlOYW1lKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeU5hbWUpIHsgcmV0dXJuIChfdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUXVlcmllc1txdWVyeUlkXSA9IHVwZGF0ZVF1ZXJpZXNCeU5hbWVbcXVlcnlOYW1lXTtcbiAgICAgICAgICAgIH0pOyB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fTVVUQVRJT05fSU5JVCcsXG4gICAgICAgICAgICBtdXRhdGlvblN0cmluZzogbXV0YXRpb25TdHJpbmcsXG4gICAgICAgICAgICBtdXRhdGlvbjogbXV0YXRpb24sXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyB8fCB7fSxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUobXV0YXRpb24pLFxuICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgIG9wdGltaXN0aWNSZXNwb25zZTogb3B0aW1pc3RpY1Jlc3BvbnNlLFxuICAgICAgICAgICAgZXh0cmFSZWR1Y2VyczogdGhpcy5nZXRFeHRyYVJlZHVjZXJzKCksXG4gICAgICAgICAgICB1cGRhdGVRdWVyaWVzOiB1cGRhdGVRdWVyaWVzLFxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVXaXRoUHJveHlGbixcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBfdGhpcy5uZXR3b3JrSW50ZXJmYWNlLnF1ZXJ5KHJlcXVlc3QpXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFwaFFMRXJyb3JzOiByZXN1bHQuZXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19NVVRBVElPTl9FUlJPUicsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbklkOiBtdXRhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnF1ZXJ5RG9jdW1lbnRzW211dGF0aW9uSWRdO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19NVVRBVElPTl9SRVNVTFQnLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IG11dGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25OYW1lOiBnZXRPcGVyYXRpb25OYW1lKG11dGF0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMgfHwge30sXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IF90aGlzLmdldEV4dHJhUmVkdWNlcnMoKSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVlcmllczogdXBkYXRlUXVlcmllcyxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGVXaXRoUHJveHlGbixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgcmVkdWNlckVycm9yID0gX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKS5yZWR1Y2VyRXJyb3I7XG4gICAgICAgICAgICAgICAgaWYgKHJlZHVjZXJFcnJvciAmJiByZWR1Y2VyRXJyb3IubXV0YXRpb25JZCA9PT0gbXV0YXRpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVkdWNlckVycm9yLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlZmV0Y2hRdWVyaWVzWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZWZldGNoUXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IF90aGlzLnJlZmV0Y2hRdWVyeUJ5TmFtZShuYW1lKTsgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWZldGNoUXVlcmllcy5mb3JFYWNoKGZ1bmN0aW9uIChwdXJlUXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnF1ZXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogcHVyZVF1ZXJ5LnF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlczogcHVyZVF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZXRjaFBvbGljeTogJ25ldHdvcmstb25seScsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5xdWVyeURvY3VtZW50c1ttdXRhdGlvbklkXTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX01VVEFUSU9OX0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycixcbiAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25JZDogbXV0YXRpb25JZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWxldGUgX3RoaXMucXVlcnlEb2N1bWVudHNbbXV0YXRpb25JZF07XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogZXJyLFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZmV0Y2hRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkLCBvcHRpb25zLCBmZXRjaFR5cGUsIGZldGNoTW9yZUZvclF1ZXJ5SWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIF9hID0gb3B0aW9ucy52YXJpYWJsZXMsIHZhcmlhYmxlcyA9IF9hID09PSB2b2lkIDAgPyB7fSA6IF9hLCBfYiA9IG9wdGlvbnMubWV0YWRhdGEsIG1ldGFkYXRhID0gX2IgPT09IHZvaWQgMCA/IG51bGwgOiBfYiwgX2MgPSBvcHRpb25zLmZldGNoUG9saWN5LCBmZXRjaFBvbGljeSA9IF9jID09PSB2b2lkIDAgPyAnY2FjaGUtZmlyc3QnIDogX2M7XG4gICAgICAgIHZhciBxdWVyeURvYyA9IHRoaXMudHJhbnNmb3JtUXVlcnlEb2N1bWVudChvcHRpb25zKS5xdWVyeURvYztcbiAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gZ3JhcGhxbF9sYW5ndWFnZV9wcmludGVyLnByaW50KHF1ZXJ5RG9jKTtcbiAgICAgICAgdmFyIHN0b3JlUmVzdWx0O1xuICAgICAgICB2YXIgbmVlZFRvRmV0Y2ggPSBmZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seSc7XG4gICAgICAgIGlmICgoZmV0Y2hUeXBlICE9PSBGZXRjaFR5cGUucmVmZXRjaCAmJiBmZXRjaFBvbGljeSAhPT0gJ25ldHdvcmstb25seScpKSB7XG4gICAgICAgICAgICB2YXIgX2QgPSBkaWZmUXVlcnlBZ2FpbnN0U3RvcmUoe1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeURvYyxcbiAgICAgICAgICAgICAgICBzdG9yZTogdGhpcy5yZWR1eFJvb3RTZWxlY3Rvcih0aGlzLnN0b3JlLmdldFN0YXRlKCkpLmRhdGEsXG4gICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgcmV0dXJuUGFydGlhbERhdGE6IHRydWUsXG4gICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IHRoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgfSksIGlzTWlzc2luZyA9IF9kLmlzTWlzc2luZywgcmVzdWx0ID0gX2QucmVzdWx0O1xuICAgICAgICAgICAgbmVlZFRvRmV0Y2ggPSBpc01pc3NpbmcgfHwgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yayc7XG4gICAgICAgICAgICBzdG9yZVJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvdWxkRmV0Y2ggPSBuZWVkVG9GZXRjaCAmJiBmZXRjaFBvbGljeSAhPT0gJ2NhY2hlLW9ubHknICYmIGZldGNoUG9saWN5ICE9PSAnc3RhbmRieSc7XG4gICAgICAgIHZhciByZXF1ZXN0SWQgPSB0aGlzLmdlbmVyYXRlUmVxdWVzdElkKCk7XG4gICAgICAgIHRoaXMucXVlcnlEb2N1bWVudHNbcXVlcnlJZF0gPSBxdWVyeURvYztcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1FVRVJZX0lOSVQnLFxuICAgICAgICAgICAgcXVlcnlTdHJpbmc6IHF1ZXJ5U3RyaW5nLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHF1ZXJ5RG9jLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICBmZXRjaFBvbGljeTogZmV0Y2hQb2xpY3ksXG4gICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICBzdG9yZVByZXZpb3VzVmFyaWFibGVzOiBzaG91bGRGZXRjaCxcbiAgICAgICAgICAgIGlzUG9sbDogZmV0Y2hUeXBlID09PSBGZXRjaFR5cGUucG9sbCxcbiAgICAgICAgICAgIGlzUmVmZXRjaDogZmV0Y2hUeXBlID09PSBGZXRjaFR5cGUucmVmZXRjaCxcbiAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hvdWxkRGlzcGF0Y2hDbGllbnRSZXN1bHQgPSAhc2hvdWxkRmV0Y2ggfHwgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1hbmQtbmV0d29yayc7XG4gICAgICAgIGlmIChzaG91bGREaXNwYXRjaENsaWVudFJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9SRVNVTFRfQ0xJRU5UJyxcbiAgICAgICAgICAgICAgICByZXN1bHQ6IHsgZGF0YTogc3RvcmVSZXN1bHQgfSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBkb2N1bWVudDogcXVlcnlEb2MsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6ICFzaG91bGRGZXRjaCxcbiAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RJZDogcmVxdWVzdElkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZEZldGNoKSB7XG4gICAgICAgICAgICB2YXIgbmV0d29ya1Jlc3VsdCA9IHRoaXMuZmV0Y2hSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICBxdWVyeUlkOiBxdWVyeUlkLFxuICAgICAgICAgICAgICAgIGRvY3VtZW50OiBxdWVyeURvYyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcG9sbG9FcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnQVBPTExPX1FVRVJZX0VSUk9SJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5SWQ6IHF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Vycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1hbmQtbmV0d29yaycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV0d29ya1Jlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgZGF0YTogc3RvcmVSZXN1bHQgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnF1ZXJ5TGlzdGVuZXJGb3JPYnNlcnZlciA9IGZ1bmN0aW9uIChxdWVyeUlkLCBvcHRpb25zLCBvYnNlcnZlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGFzdFJlc3VsdDtcbiAgICAgICAgdmFyIHByZXZpb3VzbHlIYWRFcnJvciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHF1ZXJ5U3RvcmVWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKCFxdWVyeVN0b3JlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RvcmVkUXVlcnkgPSBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXTtcbiAgICAgICAgICAgIHZhciBmZXRjaFBvbGljeSA9IHN0b3JlZFF1ZXJ5ID8gc3RvcmVkUXVlcnkub2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMuZmV0Y2hQb2xpY3kgOiBvcHRpb25zLmZldGNoUG9saWN5O1xuICAgICAgICAgICAgaWYgKGZldGNoUG9saWN5ID09PSAnc3RhbmRieScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc2hvdWxkTm90aWZ5SWZMb2FkaW5nID0gcXVlcnlTdG9yZVZhbHVlLnByZXZpb3VzVmFyaWFibGVzIHx8XG4gICAgICAgICAgICAgICAgZmV0Y2hQb2xpY3kgPT09ICdjYWNoZS1vbmx5JyB8fCBmZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWFuZC1uZXR3b3JrJztcbiAgICAgICAgICAgIHZhciBuZXR3b3JrU3RhdHVzQ2hhbmdlZCA9IGxhc3RSZXN1bHQgJiYgcXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMgIT09IGxhc3RSZXN1bHQubmV0d29ya1N0YXR1cztcbiAgICAgICAgICAgIGlmICghaXNOZXR3b3JrUmVxdWVzdEluRmxpZ2h0KHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzKSB8fFxuICAgICAgICAgICAgICAgIChuZXR3b3JrU3RhdHVzQ2hhbmdlZCAmJiBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSkgfHxcbiAgICAgICAgICAgICAgICBzaG91bGROb3RpZnlJZkxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzICYmIHF1ZXJ5U3RvcmVWYWx1ZS5ncmFwaFFMRXJyb3JzLmxlbmd0aCA+IDApIHx8XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFwb2xsb0Vycm9yXzEgPSBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcXVlcnlTdG9yZVZhbHVlLmdyYXBoUUxFcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrRXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c2x5SGFkRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoYXBvbGxvRXJyb3JfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBhcG9sbG9FcnJvcl8xOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ0FuIHVuaGFuZGxlZCBlcnJvciB3YXMgdGhyb3duIGJlY2F1c2Ugbm8gZXJyb3IgaGFuZGxlciBpcyByZWdpc3RlcmVkICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9yIHRoZSBxdWVyeSAnICsgcXVlcnlTdG9yZVZhbHVlLnF1ZXJ5U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGRpZmZRdWVyeUFnYWluc3RTdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmU6IF90aGlzLmdldERhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogX3RoaXMucXVlcnlEb2N1bWVudHNbcXVlcnlJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeVN0b3JlVmFsdWUucHJldmlvdXNWYXJpYWJsZXMgfHwgcXVlcnlTdG9yZVZhbHVlLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IF90aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRNYXRjaGVyRnVuY3Rpb246IF90aGlzLmZyYWdtZW50TWF0Y2hlci5tYXRjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1Jlc3VsdDogbGFzdFJlc3VsdCAmJiBsYXN0UmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSwgZGF0YSA9IF9hLnJlc3VsdCwgaXNNaXNzaW5nID0gX2EuaXNNaXNzaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdEZyb21TdG9yZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc01pc3NpbmcgJiYgZmV0Y2hQb2xpY3kgIT09ICdjYWNoZS1vbmx5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdEZyb21TdG9yZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGFzdFJlc3VsdCAmJiBsYXN0UmVzdWx0LmRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGlzTmV0d29ya1JlcXVlc3RJbkZsaWdodChxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtTdGF0dXM6IHF1ZXJ5U3RvcmVWYWx1ZS5uZXR3b3JrU3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJvbVN0b3JlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBpc05ldHdvcmtSZXF1ZXN0SW5GbGlnaHQocXVlcnlTdG9yZVZhbHVlLm5ldHdvcmtTdGF0dXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrU3RhdHVzOiBxdWVyeVN0b3JlVmFsdWUubmV0d29ya1N0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhbGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0RpZmZlcmVudFJlc3VsdCA9ICEobGFzdFJlc3VsdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRGcm9tU3RvcmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdC5uZXR3b3JrU3RhdHVzID09PSByZXN1bHRGcm9tU3RvcmUubmV0d29ya1N0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0LnN0YWxlID09PSByZXN1bHRGcm9tU3RvcmUuc3RhbGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJlc3VsdC5kYXRhID09PSByZXN1bHRGcm9tU3RvcmUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGlmZmVyZW50UmVzdWx0IHx8IHByZXZpb3VzbHlIYWRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0UmVzdWx0ID0gcmVzdWx0RnJvbVN0b3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChtYXliZURlZXBGcmVlemUocmVzdWx0RnJvbVN0b3JlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzbHlIYWRFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNseUhhZEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlci5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBBcG9sbG9FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtFcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS53YXRjaFF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNob3VsZFN1YnNjcmliZSkge1xuICAgICAgICBpZiAoc2hvdWxkU3Vic2NyaWJlID09PSB2b2lkIDApIHsgc2hvdWxkU3Vic2NyaWJlID0gdHJ1ZTsgfVxuICAgICAgICBpZiAob3B0aW9ucy5yZXR1cm5QYXJ0aWFsRGF0YSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZXR1cm5QYXJ0aWFsRGF0YSBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBzaW5jZSBBcG9sbG8gQ2xpZW50IDEuMC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5mb3JjZUZldGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZvcmNlRmV0Y2ggb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuIFVzZSBmZXRjaFBvbGljeSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm5vRmV0Y2gpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm9GZXRjaCBvcHRpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBzaW5jZSBBcG9sbG8gQ2xpZW50IDEuMC4gVXNlIGZldGNoUG9saWN5IGluc3RlYWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZmV0Y2hQb2xpY3kgPT09ICdzdGFuZGJ5Jykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGllbnQud2F0Y2hRdWVyeSBjYW5ub3QgYmUgY2FsbGVkIHdpdGggZmV0Y2hQb2xpY3kgc2V0IHRvIFwic3RhbmRieVwiJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHF1ZXJ5RGVmaW5pdGlvbiA9IGdldFF1ZXJ5RGVmaW5pdGlvbihvcHRpb25zLnF1ZXJ5KTtcbiAgICAgICAgaWYgKHF1ZXJ5RGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zICYmIHF1ZXJ5RGVmaW5pdGlvbi52YXJpYWJsZURlZmluaXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZXMgPSBnZXREZWZhdWx0VmFsdWVzKHF1ZXJ5RGVmaW5pdGlvbik7XG4gICAgICAgICAgICBvcHRpb25zLnZhcmlhYmxlcyA9IGFzc2lnbih7fSwgZGVmYXVsdFZhbHVlcywgb3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lZE9wdGlvbnMgPSBfX2Fzc2lnbiQxNCh7fSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnkgPSBuZXcgT2JzZXJ2YWJsZVF1ZXJ5KHtcbiAgICAgICAgICAgIHNjaGVkdWxlcjogdGhpcy5zY2hlZHVsZXIsXG4gICAgICAgICAgICBvcHRpb25zOiB0cmFuc2Zvcm1lZE9wdGlvbnMsXG4gICAgICAgICAgICBzaG91bGRTdWJzY3JpYmU6IHNob3VsZFN1YnNjcmliZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlUXVlcnk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFvcHRpb25zLnF1ZXJ5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3F1ZXJ5IG9wdGlvbiBpcyByZXF1aXJlZC4gWW91IG11c3Qgc3BlY2lmeSB5b3VyIEdyYXBoUUwgZG9jdW1lbnQgaW4gdGhlIHF1ZXJ5IG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5xdWVyeS5raW5kICE9PSAnRG9jdW1lbnQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHdyYXAgdGhlIHF1ZXJ5IHN0cmluZyBpbiBhIFwiZ3FsXCIgdGFnLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnJldHVyblBhcnRpYWxEYXRhKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JldHVyblBhcnRpYWxEYXRhIG9wdGlvbiBvbmx5IHN1cHBvcnRlZCBvbiB3YXRjaFF1ZXJ5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBvbGxJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwb2xsSW50ZXJ2YWwgb3B0aW9uIG9ubHkgc3VwcG9ydGVkIG9uIHdhdGNoUXVlcnkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2VGZXRjaCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JjZUZldGNoIG9wdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIHNpbmNlIEFwb2xsbyBDbGllbnQgMS4wLiBVc2UgZmV0Y2hQb2xpY3kgaW5zdGVhZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5ub0ZldGNoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vRmV0Y2ggb3B0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgc2luY2UgQXBvbGxvIENsaWVudCAxLjAuIFVzZSBmZXRjaFBvbGljeSBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5ub3RpZnlPbk5ldHdvcmtTdGF0dXNDaGFuZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIFwicXVlcnlcIiB3aXRoIFwibm90aWZ5T25OZXR3b3JrU3RhdHVzQ2hhbmdlXCIgb3B0aW9uLiBPbmx5IFwid2F0Y2hRdWVyeVwiIGhhcyB0aGF0IG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLm5vdGlmeU9uTmV0d29ya1N0YXR1c0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB2YXIgcmVxdWVzdElkID0gdGhpcy5pZENvdW50ZXI7XG4gICAgICAgIHZhciByZXNQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgX3RoaXMuYWRkRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkLCByZXNQcm9taXNlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLndhdGNoUXVlcnkob3B0aW9ucywgZmFsc2UpLnJlc3VsdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzUHJvbWlzZTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVRdWVyeUlkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcXVlcnlJZCA9IHRoaXMuaWRDb3VudGVyLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuaWRDb3VudGVyKys7XG4gICAgICAgIHJldHVybiBxdWVyeUlkO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdG9wUXVlcnlJblN0b3JlID0gZnVuY3Rpb24gKHF1ZXJ5SWQpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1FVRVJZX1NUT1AnLFxuICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLmdldEFwb2xsb1N0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1eFJvb3RTZWxlY3Rvcih0aGlzLnN0b3JlLmdldFN0YXRlKCkpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zZWxlY3RBcG9sbG9TdGF0ZSA9IGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWR1eFJvb3RTZWxlY3RvcihzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4geyBkYXRhOiB0aGlzLmdldEFwb2xsb1N0YXRlKCkuZGF0YSB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cyh0aGlzLmdldEFwb2xsb1N0YXRlKCkpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRRdWVyeUxpc3RlbmVyID0gZnVuY3Rpb24gKHF1ZXJ5SWQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMucXVlcnlMaXN0ZW5lcnNbcXVlcnlJZF0gPSB0aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdIHx8IFtdO1xuICAgICAgICB0aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdLnB1c2gobGlzdGVuZXIpO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRGZXRjaFF1ZXJ5UHJvbWlzZSA9IGZ1bmN0aW9uIChyZXF1ZXN0SWQsIHByb21pc2UsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0aGlzLmZldGNoUXVlcnlQcm9taXNlc1tyZXF1ZXN0SWQudG9TdHJpbmcoKV0gPSB7IHByb21pc2U6IHByb21pc2UsIHJlc29sdmU6IHJlc29sdmUsIHJlamVjdDogcmVqZWN0IH07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUZldGNoUXVlcnlQcm9taXNlID0gZnVuY3Rpb24gKHJlcXVlc3RJZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXNbcmVxdWVzdElkLnRvU3RyaW5nKCldO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5hZGRPYnNlcnZhYmxlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCwgb2JzZXJ2YWJsZVF1ZXJ5KSB7XG4gICAgICAgIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF0gPSB7IG9ic2VydmFibGVRdWVyeTogb2JzZXJ2YWJsZVF1ZXJ5IH07XG4gICAgICAgIHZhciBxdWVyeURlZiA9IGdldFF1ZXJ5RGVmaW5pdGlvbihvYnNlcnZhYmxlUXVlcnkub3B0aW9ucy5xdWVyeSk7XG4gICAgICAgIGlmIChxdWVyeURlZi5uYW1lICYmIHF1ZXJ5RGVmLm5hbWUudmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeU5hbWUgPSBxdWVyeURlZi5uYW1lLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdID0gdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5xdWVyeUlkc0J5TmFtZVtxdWVyeU5hbWVdLnB1c2gob2JzZXJ2YWJsZVF1ZXJ5LnF1ZXJ5SWQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZU9ic2VydmFibGVRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnkgPSB0aGlzLm9ic2VydmFibGVRdWVyaWVzW3F1ZXJ5SWRdLm9ic2VydmFibGVRdWVyeTtcbiAgICAgICAgdmFyIGRlZmluaXRpb24gPSBnZXRRdWVyeURlZmluaXRpb24ob2JzZXJ2YWJsZVF1ZXJ5Lm9wdGlvbnMucXVlcnkpO1xuICAgICAgICB2YXIgcXVlcnlOYW1lID0gZGVmaW5pdGlvbi5uYW1lID8gZGVmaW5pdGlvbi5uYW1lLnZhbHVlIDogbnVsbDtcbiAgICAgICAgZGVsZXRlIHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgIGlmIChxdWVyeU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXSA9IHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXS5maWx0ZXIoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhKG9ic2VydmFibGVRdWVyeS5xdWVyeUlkID09PSB2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucmVzZXRTdG9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mZXRjaFF1ZXJ5UHJvbWlzZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHJlamVjdCA9IF90aGlzLmZldGNoUXVlcnlQcm9taXNlc1trZXldLnJlamVjdDtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ1N0b3JlIHJlc2V0IHdoaWxlIHF1ZXJ5IHdhcyBpbiBmbGlnaHQuJykpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnQVBPTExPX1NUT1JFX1JFU0VUJyxcbiAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeUlkczogT2JqZWN0LmtleXModGhpcy5vYnNlcnZhYmxlUXVlcmllcyksXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLm9ic2VydmFibGVRdWVyaWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmVRdWVyeSA9IF90aGlzLnJlZHV4Um9vdFNlbGVjdG9yKF90aGlzLnN0b3JlLmdldFN0YXRlKCkpLnF1ZXJpZXNbcXVlcnlJZF07XG4gICAgICAgICAgICB2YXIgZmV0Y2hQb2xpY3kgPSBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnkub3B0aW9ucy5mZXRjaFBvbGljeTtcbiAgICAgICAgICAgIGlmIChmZXRjaFBvbGljeSAhPT0gJ2NhY2hlLW9ubHknICYmIGZldGNoUG9saWN5ICE9PSAnc3RhbmRieScpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnkucmVmZXRjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuc3RhcnRRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkLCBvcHRpb25zLCBsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmFkZFF1ZXJ5TGlzdGVuZXIocXVlcnlJZCwgbGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmZldGNoUXVlcnkocXVlcnlJZCwgb3B0aW9ucylcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSk7XG4gICAgICAgIHJldHVybiBxdWVyeUlkO1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5zdGFydEdyYXBoUUxTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgICB2YXIgdHJhbnNmb3JtZWREb2MgPSBxdWVyeTtcbiAgICAgICAgaWYgKHRoaXMuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRG9jID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHRyYW5zZm9ybWVkRG9jKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFyaWFibGVzID0gYXNzaWduKHt9LCBnZXREZWZhdWx0VmFsdWVzKGdldE9wZXJhdGlvbkRlZmluaXRpb24ocXVlcnkpKSwgb3B0aW9ucy52YXJpYWJsZXMpO1xuICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgIHF1ZXJ5OiB0cmFuc2Zvcm1lZERvYyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogdmFyaWFibGVzLFxuICAgICAgICAgICAgb3BlcmF0aW9uTmFtZTogZ2V0T3BlcmF0aW9uTmFtZSh0cmFuc2Zvcm1lZERvYyksXG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdWJJZDtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IFtdO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGVycm9yLCByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9icy5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYnMuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdBUE9MTE9fU1VCU0NSSVBUSU9OX1JFU1VMVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQ6IHRyYW5zZm9ybWVkRG9jLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUodHJhbnNmb3JtZWREb2MpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogeyBkYXRhOiByZXN1bHQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25JZDogc3ViSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFSZWR1Y2VyczogX3RoaXMuZ2V0RXh0cmFSZWR1Y2VycygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9icy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9icy5uZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHN1YklkID0gX3RoaXMubmV0d29ya0ludGVyZmFjZS5zdWJzY3JpYmUocmVxdWVzdCwgaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVycyA9IG9ic2VydmVycy5maWx0ZXIoZnVuY3Rpb24gKG9icykgeyByZXR1cm4gb2JzICE9PSBvYnNlcnZlcjsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5uZXR3b3JrSW50ZXJmYWNlLnVuc3Vic2NyaWJlKHN1YklkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgX25ldHdvcmtTdWJzY3JpcHRpb25JZDogc3ViSWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucmVtb3ZlUXVlcnkgPSBmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICBkZWxldGUgdGhpcy5xdWVyeUxpc3RlbmVyc1txdWVyeUlkXTtcbiAgICAgICAgZGVsZXRlIHRoaXMucXVlcnlEb2N1bWVudHNbcXVlcnlJZF07XG4gICAgfTtcbiAgICBRdWVyeU1hbmFnZXIucHJvdG90eXBlLnN0b3BRdWVyeSA9IGZ1bmN0aW9uIChxdWVyeUlkKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUXVlcnkocXVlcnlJZCk7XG4gICAgICAgIHRoaXMuc3RvcFF1ZXJ5SW5TdG9yZShxdWVyeUlkKTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0Q3VycmVudFF1ZXJ5UmVzdWx0ID0gZnVuY3Rpb24gKG9ic2VydmFibGVRdWVyeSwgaXNPcHRpbWlzdGljKSB7XG4gICAgICAgIGlmIChpc09wdGltaXN0aWMgPT09IHZvaWQgMCkgeyBpc09wdGltaXN0aWMgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldFF1ZXJ5UGFydHMob2JzZXJ2YWJsZVF1ZXJ5KSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkb2N1bWVudCA9IF9hLmRvY3VtZW50O1xuICAgICAgICB2YXIgbGFzdFJlc3VsdCA9IG9ic2VydmFibGVRdWVyeS5nZXRMYXN0UmVzdWx0KCk7XG4gICAgICAgIHZhciBxdWVyeU9wdGlvbnMgPSBvYnNlcnZhYmxlUXVlcnkub3B0aW9ucztcbiAgICAgICAgdmFyIHJlYWRPcHRpb25zID0ge1xuICAgICAgICAgICAgc3RvcmU6IGlzT3B0aW1pc3RpYyA/IHRoaXMuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cygpIDogdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLmRhdGEsXG4gICAgICAgICAgICBxdWVyeTogZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIGNvbmZpZzogdGhpcy5yZWR1Y2VyQ29uZmlnLFxuICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQ6IGxhc3RSZXN1bHQgPyBsYXN0UmVzdWx0LmRhdGEgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogdGhpcy5mcmFnbWVudE1hdGNoZXIubWF0Y2gsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlYWRRdWVyeUZyb21TdG9yZShyZWFkT3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gbWF5YmVEZWVwRnJlZXplKHsgZGF0YTogZGF0YSwgcGFydGlhbDogZmFsc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXliZURlZXBGcmVlemUoeyBkYXRhOiB7fSwgcGFydGlhbDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXRRdWVyeVdpdGhQcmV2aW91c1Jlc3VsdCA9IGZ1bmN0aW9uIChxdWVyeUlkT3JPYnNlcnZhYmxlLCBpc09wdGltaXN0aWMpIHtcbiAgICAgICAgaWYgKGlzT3B0aW1pc3RpYyA9PT0gdm9pZCAwKSB7IGlzT3B0aW1pc3RpYyA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBvYnNlcnZhYmxlUXVlcnk7XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlJZE9yT2JzZXJ2YWJsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkT3JPYnNlcnZhYmxlXSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk9ic2VydmFibGVRdWVyeSB3aXRoIHRoaXMgaWQgZG9lc24ndCBleGlzdDogXCIgKyBxdWVyeUlkT3JPYnNlcnZhYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ic2VydmFibGVRdWVyeSA9IHRoaXMub2JzZXJ2YWJsZVF1ZXJpZXNbcXVlcnlJZE9yT2JzZXJ2YWJsZV0ub2JzZXJ2YWJsZVF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZVF1ZXJ5ID0gcXVlcnlJZE9yT2JzZXJ2YWJsZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2EgPSB0aGlzLmdldFF1ZXJ5UGFydHMob2JzZXJ2YWJsZVF1ZXJ5KSwgdmFyaWFibGVzID0gX2EudmFyaWFibGVzLCBkb2N1bWVudCA9IF9hLmRvY3VtZW50O1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ2V0Q3VycmVudFF1ZXJ5UmVzdWx0KG9ic2VydmFibGVRdWVyeSwgaXNPcHRpbWlzdGljKS5kYXRhO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJldmlvdXNSZXN1bHQ6IGRhdGEsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIGRvY3VtZW50OiBkb2N1bWVudCxcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0UXVlcnlQYXJ0cyA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlUXVlcnkpIHtcbiAgICAgICAgdmFyIHF1ZXJ5T3B0aW9ucyA9IG9ic2VydmFibGVRdWVyeS5vcHRpb25zO1xuICAgICAgICB2YXIgdHJhbnNmb3JtZWREb2MgPSBvYnNlcnZhYmxlUXVlcnkub3B0aW9ucy5xdWVyeTtcbiAgICAgICAgaWYgKHRoaXMuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRG9jID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHRyYW5zZm9ybWVkRG9jKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFyaWFibGVzOiBxdWVyeU9wdGlvbnMudmFyaWFibGVzLFxuICAgICAgICAgICAgZG9jdW1lbnQ6IHRyYW5zZm9ybWVkRG9jLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS50cmFuc2Zvcm1RdWVyeURvY3VtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHF1ZXJ5RG9jID0gb3B0aW9ucy5xdWVyeTtcbiAgICAgICAgaWYgKHRoaXMuYWRkVHlwZW5hbWUpIHtcbiAgICAgICAgICAgIHF1ZXJ5RG9jID0gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5RG9jKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcXVlcnlEb2M6IHF1ZXJ5RG9jLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgUXVlcnlNYW5hZ2VyLnByb3RvdHlwZS5nZXRFeHRyYVJlZHVjZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5vYnNlcnZhYmxlUXVlcmllcykubWFwKGZ1bmN0aW9uIChvYnNRdWVyeUlkKSB7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1tvYnNRdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnk7XG4gICAgICAgICAgICB2YXIgcXVlcnlPcHRpb25zID0gcXVlcnkub3B0aW9ucztcbiAgICAgICAgICAgIGlmIChxdWVyeU9wdGlvbnMucmVkdWNlcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVTdG9yZVJlZHVjZXIocXVlcnlPcHRpb25zLnJlZHVjZXIsIF90aGlzLmFkZFR5cGVuYW1lID8gYWRkVHlwZW5hbWVUb0RvY3VtZW50KHF1ZXJ5T3B0aW9ucy5xdWVyeSkgOiBxdWVyeU9wdGlvbnMucXVlcnksIHF1ZXJ5LnZhcmlhYmxlcyB8fCB7fSwgX3RoaXMucmVkdWNlckNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uIChyZWR1Y2VyKSB7IHJldHVybiByZWR1Y2VyICE9PSBudWxsOyB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZmV0Y2hSZXF1ZXN0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciByZXF1ZXN0SWQgPSBfYS5yZXF1ZXN0SWQsIHF1ZXJ5SWQgPSBfYS5xdWVyeUlkLCBkb2N1bWVudCA9IF9hLmRvY3VtZW50LCBvcHRpb25zID0gX2Eub3B0aW9ucywgZmV0Y2hNb3JlRm9yUXVlcnlJZCA9IF9hLmZldGNoTW9yZUZvclF1ZXJ5SWQ7XG4gICAgICAgIHZhciB2YXJpYWJsZXMgPSBvcHRpb25zLnZhcmlhYmxlcztcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBxdWVyeTogZG9jdW1lbnQsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlcyxcbiAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUoZG9jdW1lbnQpLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgcmV0UHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIF90aGlzLmFkZEZldGNoUXVlcnlQcm9taXNlKHJlcXVlc3RJZCwgcmV0UHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIF90aGlzLmRlZHVwbGljYXRvci5xdWVyeShyZXF1ZXN0LCBfdGhpcy5xdWVyeURlZHVwbGljYXRpb24pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciBleHRyYVJlZHVjZXJzID0gX3RoaXMuZ2V0RXh0cmFSZWR1Y2VycygpO1xuICAgICAgICAgICAgICAgIF90aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0FQT0xMT19RVUVSWV9SRVNVTFQnLFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudDogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbk5hbWU6IGdldE9wZXJhdGlvbk5hbWUoZG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlJZDogcXVlcnlJZCxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdElkOiByZXF1ZXN0SWQsXG4gICAgICAgICAgICAgICAgICAgIGZldGNoTW9yZUZvclF1ZXJ5SWQ6IGZldGNoTW9yZUZvclF1ZXJ5SWQsXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhUmVkdWNlcnM6IGV4dHJhUmVkdWNlcnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVtb3ZlRmV0Y2hRdWVyeVByb21pc2UocmVxdWVzdElkKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmVycm9ycykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXBvbGxvRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhRTEVycm9yczogcmVzdWx0LmVycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0RnJvbVN0b3JlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEZyb21TdG9yZSA9IHJlYWRRdWVyeUZyb21TdG9yZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZTogX3RoaXMuZ2V0QXBvbGxvU3RhdGUoKS5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogZG9jdW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWc6IF90aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudE1hdGNoZXJGdW5jdGlvbjogX3RoaXMuZnJhZ21lbnRNYXRjaGVyLm1hdGNoLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgICAgIHZhciByZWR1Y2VyRXJyb3IgPSBfdGhpcy5nZXRBcG9sbG9TdGF0ZSgpLnJlZHVjZXJFcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAocmVkdWNlckVycm9yICYmIHJlZHVjZXJFcnJvci5xdWVyeUlkID09PSBxdWVyeUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWR1Y2VyRXJyb3IuZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdGhpcy5yZW1vdmVGZXRjaFF1ZXJ5UHJvbWlzZShyZXF1ZXN0SWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoeyBkYXRhOiByZXN1bHRGcm9tU3RvcmUsIGxvYWRpbmc6IGZhbHNlLCBuZXR3b3JrU3RhdHVzOiBleHBvcnRzLk5ldHdvcmtTdGF0dXMucmVhZHksIHN0YWxlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0UHJvbWlzZTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUucmVmZXRjaFF1ZXJ5QnlOYW1lID0gZnVuY3Rpb24gKHF1ZXJ5TmFtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcmVmZXRjaGVkUXVlcmllcyA9IHRoaXMucXVlcnlJZHNCeU5hbWVbcXVlcnlOYW1lXTtcbiAgICAgICAgaWYgKHJlZmV0Y2hlZFF1ZXJpZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogdW5rbm93biBxdWVyeSB3aXRoIG5hbWUgXCIgKyBxdWVyeU5hbWUgKyBcIiBhc2tlZCB0byByZWZldGNoXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJlZmV0Y2hlZFF1ZXJpZXMubWFwKGZ1bmN0aW9uIChxdWVyeUlkKSB7IHJldHVybiBfdGhpcy5vYnNlcnZhYmxlUXVlcmllc1txdWVyeUlkXS5vYnNlcnZhYmxlUXVlcnkucmVmZXRjaCgpOyB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuYnJvYWRjYXN0UXVlcmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSB0aGlzLmdldEFwb2xsb1N0YXRlKCkucXVlcmllcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeUxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAocXVlcnlJZCkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IF90aGlzLnF1ZXJ5TGlzdGVuZXJzW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBxdWVyeVN0b3JlVmFsdWUgPSBxdWVyaWVzW3F1ZXJ5SWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIocXVlcnlTdG9yZVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFF1ZXJ5TWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVSZXF1ZXN0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXF1ZXN0SWQgPSB0aGlzLmlkQ291bnRlcjtcbiAgICAgICAgdGhpcy5pZENvdW50ZXIrKztcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RJZDtcbiAgICB9O1xuICAgIHJldHVybiBRdWVyeU1hbmFnZXI7XG59KCkpO1xuXG52YXIgdmVyc2lvbiA9ICdsb2NhbCc7XG5cbnZhciBfX2Fzc2lnbiQxMyA9ICh1bmRlZmluZWQgJiYgdW5kZWZpbmVkLl9fYXNzaWduKSB8fCBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBERUZBVUxUX1JFRFVYX1JPT1RfS0VZID0gJ2Fwb2xsbyc7XG5mdW5jdGlvbiBkZWZhdWx0UmVkdXhSb290U2VsZWN0b3Ioc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGVbREVGQVVMVF9SRURVWF9ST09UX0tFWV07XG59XG5mdW5jdGlvbiBkZWZhdWx0RGF0YUlkRnJvbU9iamVjdChyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0Ll9fdHlwZW5hbWUpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Ll9fdHlwZW5hbWUgKyBcIjpcIiArIHJlc3VsdC5pZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzdWx0Ll9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Ll9fdHlwZW5hbWUgKyBcIjpcIiArIHJlc3VsdC5faWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG52YXIgaGFzU3VnZ2VzdGVkRGV2dG9vbHMgPSBmYWxzZTtcbnZhciBBcG9sbG9DbGllbnQkMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXBvbGxvQ2xpZW50KG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5taWRkbGV3YXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0b3JlKHN0b3JlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHsgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzQXBvbGxvU3RhdGUgPSBfdGhpcy5xdWVyeU1hbmFnZXIuc2VsZWN0QXBvbGxvU3RhdGUoc3RvcmUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuVmFsdWUgPSBuZXh0KGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdBcG9sbG9TdGF0ZSA9IF90aGlzLnF1ZXJ5TWFuYWdlci5zZWxlY3RBcG9sbG9TdGF0ZShzdG9yZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdBcG9sbG9TdGF0ZSAhPT0gcHJldmlvdXNBcG9sbG9TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucXVlcnlNYW5hZ2VyLmJyb2FkY2FzdE5ld1N0b3JlKHN0b3JlLmdldFN0YXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kZXZUb29sc0hvb2tDYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGV2VG9vbHNIb29rQ2Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0QXBvbGxvU3RhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0RGF0YVdpdGhPcHRpbWlzdGljUmVzdWx0cygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH07IH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZGF0YUlkRnJvbU9iamVjdCA9IG9wdGlvbnMuZGF0YUlkRnJvbU9iamVjdDtcbiAgICAgICAgdmFyIG5ldHdvcmtJbnRlcmZhY2UgPSBvcHRpb25zLm5ldHdvcmtJbnRlcmZhY2UsIHJlZHV4Um9vdFNlbGVjdG9yID0gb3B0aW9ucy5yZWR1eFJvb3RTZWxlY3RvciwgaW5pdGlhbFN0YXRlID0gb3B0aW9ucy5pbml0aWFsU3RhdGUsIF9hID0gb3B0aW9ucy5zc3JNb2RlLCBzc3JNb2RlID0gX2EgPT09IHZvaWQgMCA/IGZhbHNlIDogX2EsIF9iID0gb3B0aW9ucy5zc3JGb3JjZUZldGNoRGVsYXksIHNzckZvcmNlRmV0Y2hEZWxheSA9IF9iID09PSB2b2lkIDAgPyAwIDogX2IsIF9jID0gb3B0aW9ucy5hZGRUeXBlbmFtZSwgYWRkVHlwZW5hbWUgPSBfYyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9jLCBjdXN0b21SZXNvbHZlcnMgPSBvcHRpb25zLmN1c3RvbVJlc29sdmVycywgY29ubmVjdFRvRGV2VG9vbHMgPSBvcHRpb25zLmNvbm5lY3RUb0RldlRvb2xzLCBmcmFnbWVudE1hdGNoZXIgPSBvcHRpb25zLmZyYWdtZW50TWF0Y2hlciwgX2QgPSBvcHRpb25zLnF1ZXJ5RGVkdXBsaWNhdGlvbiwgcXVlcnlEZWR1cGxpY2F0aW9uID0gX2QgPT09IHZvaWQgMCA/IHRydWUgOiBfZDtcbiAgICAgICAgaWYgKHR5cGVvZiByZWR1eFJvb3RTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5yZWR1eFJvb3RTZWxlY3RvciA9IHJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZWR1eFJvb3RTZWxlY3RvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCJyZWR1eFJvb3RTZWxlY3RvclwiIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZyYWdtZW50TWF0Y2hlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhZ21lbnRNYXRjaGVyID0gbmV3IEhldXJpc3RpY0ZyYWdtZW50TWF0Y2hlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcmFnbWVudE1hdGNoZXIgPSBmcmFnbWVudE1hdGNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsU3RhdGUgPSBpbml0aWFsU3RhdGUgPyBpbml0aWFsU3RhdGUgOiB7fTtcbiAgICAgICAgdGhpcy5uZXR3b3JrSW50ZXJmYWNlID0gbmV0d29ya0ludGVyZmFjZSA/IG5ldHdvcmtJbnRlcmZhY2UgOlxuICAgICAgICAgICAgY3JlYXRlTmV0d29ya0ludGVyZmFjZSh7IHVyaTogJy9ncmFwaHFsJyB9KTtcbiAgICAgICAgdGhpcy5hZGRUeXBlbmFtZSA9IGFkZFR5cGVuYW1lO1xuICAgICAgICB0aGlzLmRpc2FibGVOZXR3b3JrRmV0Y2hlcyA9IHNzck1vZGUgfHwgc3NyRm9yY2VGZXRjaERlbGF5ID4gMDtcbiAgICAgICAgdGhpcy5kYXRhSWQgPSBkYXRhSWRGcm9tT2JqZWN0ID0gZGF0YUlkRnJvbU9iamVjdCB8fCBkZWZhdWx0RGF0YUlkRnJvbU9iamVjdDtcbiAgICAgICAgdGhpcy5maWVsZFdpdGhBcmdzID0gc3RvcmVLZXlOYW1lRnJvbUZpZWxkTmFtZUFuZEFyZ3M7XG4gICAgICAgIHRoaXMucXVlcnlEZWR1cGxpY2F0aW9uID0gcXVlcnlEZWR1cGxpY2F0aW9uO1xuICAgICAgICBpZiAoc3NyRm9yY2VGZXRjaERlbGF5KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLmRpc2FibGVOZXR3b3JrRmV0Y2hlcyA9IGZhbHNlOyB9LCBzc3JGb3JjZUZldGNoRGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVkdWNlckNvbmZpZyA9IHtcbiAgICAgICAgICAgIGRhdGFJZEZyb21PYmplY3Q6IGRhdGFJZEZyb21PYmplY3QsXG4gICAgICAgICAgICBjdXN0b21SZXNvbHZlcnM6IGN1c3RvbVJlc29sdmVycyxcbiAgICAgICAgICAgIGFkZFR5cGVuYW1lOiBhZGRUeXBlbmFtZSxcbiAgICAgICAgICAgIGZyYWdtZW50TWF0Y2hlcjogdGhpcy5mcmFnbWVudE1hdGNoZXIubWF0Y2gsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2F0Y2hRdWVyeSA9IHRoaXMud2F0Y2hRdWVyeS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm11dGF0ZSA9IHRoaXMubXV0YXRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2V0U3RvcmUgPSB0aGlzLnNldFN0b3JlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzZXRTdG9yZSA9IHRoaXMucmVzZXRTdG9yZS5iaW5kKHRoaXMpO1xuICAgICAgICB2YXIgZGVmYXVsdENvbm5lY3RUb0RldlRvb2xzID0gIWlzUHJvZHVjdGlvbigpICYmXG4gICAgICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAoIXdpbmRvdy5fX0FQT0xMT19DTElFTlRfXyk7XG4gICAgICAgIGlmICh0eXBlb2YgY29ubmVjdFRvRGV2VG9vbHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdENvbm5lY3RUb0RldlRvb2xzIDogY29ubmVjdFRvRGV2VG9vbHMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5fX0FQT0xMT19DTElFTlRfXyA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNTdWdnZXN0ZWREZXZ0b29scyAmJiAhaXNQcm9kdWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGhhc1N1Z2dlc3RlZERldnRvb2xzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LnRvcCA9PT0gd2luZG93LnNlbGYpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX0FQT0xMT19ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdEb3dubG9hZCB0aGUgQXBvbGxvIERldlRvb2xzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmb3IgYSBiZXR0ZXIgZGV2ZWxvcG1lbnQgZXhwZXJpZW5jZTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL2Fwb2xsby1jbGllbnQtZGV2ZWxvcGVyLXQvamRra25ra2JlYmJhcGlsZ29lY2NjaWdsa2ZibWJuZm0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIH1cbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLndhdGNoUXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlTmV0d29ya0ZldGNoZXMgJiYgb3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ25ldHdvcmstb25seScpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBfX2Fzc2lnbiQxMyh7fSwgb3B0aW9ucywgeyBmZXRjaFBvbGljeTogJ2NhY2hlLWZpcnN0JyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeU1hbmFnZXIud2F0Y2hRdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICB0aGlzLmluaXRTdG9yZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5mZXRjaFBvbGljeSA9PT0gJ2NhY2hlLWFuZC1uZXR3b3JrJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYWNoZS1hbmQtbmV0d29yayBmZXRjaFBvbGljeSBjYW4gb25seSBiZSB1c2VkIHdpdGggd2F0Y2hRdWVyeScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVOZXR3b3JrRmV0Y2hlcyAmJiBvcHRpb25zLmZldGNoUG9saWN5ID09PSAnbmV0d29yay1vbmx5Jykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IF9fYXNzaWduJDEzKHt9LCBvcHRpb25zLCB7IGZldGNoUG9saWN5OiAnY2FjaGUtZmlyc3QnIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5xdWVyeShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUubXV0YXRlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyLm11dGF0ZShvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5pbml0U3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlNYW5hZ2VyLnN0YXJ0R3JhcGhRTFN1YnNjcmlwdGlvbihvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVhZFF1ZXJ5ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkucmVhZFF1ZXJ5KG9wdGlvbnMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5yZWFkRnJhZ21lbnQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0UHJveHkoKS5yZWFkRnJhZ21lbnQob3B0aW9ucyk7XG4gICAgfTtcbiAgICBBcG9sbG9DbGllbnQucHJvdG90eXBlLndyaXRlUXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0UHJveHkoKS53cml0ZVF1ZXJ5KG9wdGlvbnMpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS53cml0ZUZyYWdtZW50ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdFByb3h5KCkud3JpdGVGcmFnbWVudChvcHRpb25zKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUucmVkdWNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUFwb2xsb1JlZHVjZXIodGhpcy5yZWR1Y2VyQ29uZmlnKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuX19hY3Rpb25Ib29rRm9yRGV2VG9vbHMgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgdGhpcy5kZXZUb29sc0hvb2tDYiA9IGNiO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5pbml0U3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLnN0b3JlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVkdXhSb290U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGluaXRpYWxpemUgdGhlIHN0b3JlIGJlY2F1c2UgXCJyZWR1eFJvb3RTZWxlY3RvclwiIGlzIHByb3ZpZGVkLiAnICtcbiAgICAgICAgICAgICAgICAncmVkdXhSb290U2VsZWN0b3Igc2hvdWxkIG9ubHkgYmUgdXNlZCB3aGVuIHRoZSBzdG9yZSBpcyBjcmVhdGVkIG91dHNpZGUgb2YgdGhlIGNsaWVudC4gJyArXG4gICAgICAgICAgICAgICAgJ1RoaXMgbWF5IGxlYWQgdG8gdW5leHBlY3RlZCByZXN1bHRzIHdoZW4gcXVlcnlpbmcgdGhlIHN0b3JlIGludGVybmFsbHkuICcgK1xuICAgICAgICAgICAgICAgIFwiUGxlYXNlIHJlbW92ZSB0aGF0IG9wdGlvbiBmcm9tIEFwb2xsb0NsaWVudCBjb25zdHJ1Y3Rvci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdG9yZShjcmVhdGVBcG9sbG9TdG9yZSh7XG4gICAgICAgICAgICByZWR1eFJvb3RLZXk6IERFRkFVTFRfUkVEVVhfUk9PVF9LRVksXG4gICAgICAgICAgICBpbml0aWFsU3RhdGU6IHRoaXMuaW5pdGlhbFN0YXRlLFxuICAgICAgICAgICAgY29uZmlnOiB0aGlzLnJlZHVjZXJDb25maWcsXG4gICAgICAgICAgICBsb2dnZXI6IGZ1bmN0aW9uIChzdG9yZSkgeyByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHsgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV4dChhY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kZXZUb29sc0hvb2tDYikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXZUb29sc0hvb2tDYih7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiBfdGhpcy5xdWVyeU1hbmFnZXIuZ2V0QXBvbGxvU3RhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFXaXRoT3B0aW1pc3RpY1Jlc3VsdHM6IF90aGlzLnF1ZXJ5TWFuYWdlci5nZXREYXRhV2l0aE9wdGltaXN0aWNSZXN1bHRzKCksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTsgfTsgfSxcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5yZXNldFN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5xdWVyeU1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyLnJlc2V0U3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXBvbGxvQ2xpZW50LnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXJ5TWFuYWdlci5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuc2V0U3RvcmUgPSBmdW5jdGlvbiAoc3RvcmUpIHtcbiAgICAgICAgdmFyIHJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICBpZiAodGhpcy5yZWR1eFJvb3RTZWxlY3Rvcikge1xuICAgICAgICAgICAgcmVkdXhSb290U2VsZWN0b3IgPSB0aGlzLnJlZHV4Um9vdFNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVkdXhSb290U2VsZWN0b3IgPSBkZWZhdWx0UmVkdXhSb290U2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiByZWR1eFJvb3RTZWxlY3RvcihzdG9yZS5nZXRTdGF0ZSgpKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhpc3Rpbmcgc3RvcmUgZG9lcyBub3QgdXNlIGFwb2xsb1JlZHVjZXIuIFBsZWFzZSBtYWtlIHN1cmUgdGhlIHN0b3JlICcgK1xuICAgICAgICAgICAgICAgICdpcyBwcm9wZXJseSBjb25maWd1cmVkIGFuZCBcInJlZHV4Um9vdFNlbGVjdG9yXCIgaXMgY29ycmVjdGx5IHNwZWNpZmllZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgIHRoaXMucXVlcnlNYW5hZ2VyID0gbmV3IFF1ZXJ5TWFuYWdlcih7XG4gICAgICAgICAgICBuZXR3b3JrSW50ZXJmYWNlOiB0aGlzLm5ldHdvcmtJbnRlcmZhY2UsXG4gICAgICAgICAgICByZWR1eFJvb3RTZWxlY3RvcjogcmVkdXhSb290U2VsZWN0b3IsXG4gICAgICAgICAgICBzdG9yZTogc3RvcmUsXG4gICAgICAgICAgICBhZGRUeXBlbmFtZTogdGhpcy5hZGRUeXBlbmFtZSxcbiAgICAgICAgICAgIHJlZHVjZXJDb25maWc6IHRoaXMucmVkdWNlckNvbmZpZyxcbiAgICAgICAgICAgIHF1ZXJ5RGVkdXBsaWNhdGlvbjogdGhpcy5xdWVyeURlZHVwbGljYXRpb24sXG4gICAgICAgICAgICBmcmFnbWVudE1hdGNoZXI6IHRoaXMuZnJhZ21lbnRNYXRjaGVyLFxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEFwb2xsb0NsaWVudC5wcm90b3R5cGUuaW5pdFByb3h5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJveHkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFN0b3JlKCk7XG4gICAgICAgICAgICB0aGlzLnByb3h5ID0gbmV3IFJlZHV4RGF0YVByb3h5KHRoaXMuc3RvcmUsIHRoaXMucmVkdXhSb290U2VsZWN0b3IgfHwgZGVmYXVsdFJlZHV4Um9vdFNlbGVjdG9yLCB0aGlzLmZyYWdtZW50TWF0Y2hlciwgdGhpcy5yZWR1Y2VyQ29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm94eTtcbiAgICB9O1xuICAgIHJldHVybiBBcG9sbG9DbGllbnQ7XG59KCkpO1xuXG5leHBvcnRzLmNyZWF0ZU5ldHdvcmtJbnRlcmZhY2UgPSBjcmVhdGVOZXR3b3JrSW50ZXJmYWNlO1xuZXhwb3J0cy5jcmVhdGVCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2UgPSBjcmVhdGVCYXRjaGluZ05ldHdvcmtJbnRlcmZhY2U7XG5leHBvcnRzLmNyZWF0ZUFwb2xsb1N0b3JlID0gY3JlYXRlQXBvbGxvU3RvcmU7XG5leHBvcnRzLmNyZWF0ZUFwb2xsb1JlZHVjZXIgPSBjcmVhdGVBcG9sbG9SZWR1Y2VyO1xuZXhwb3J0cy5yZWFkUXVlcnlGcm9tU3RvcmUgPSByZWFkUXVlcnlGcm9tU3RvcmU7XG5leHBvcnRzLndyaXRlUXVlcnlUb1N0b3JlID0gd3JpdGVRdWVyeVRvU3RvcmU7XG5leHBvcnRzLmFkZFR5cGVuYW1lVG9Eb2N1bWVudCA9IGFkZFR5cGVuYW1lVG9Eb2N1bWVudDtcbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnRNYXAgPSBjcmVhdGVGcmFnbWVudE1hcDtcbmV4cG9ydHMuQXBvbGxvRXJyb3IgPSBBcG9sbG9FcnJvcjtcbmV4cG9ydHMuZ2V0UXVlcnlEZWZpbml0aW9uID0gZ2V0UXVlcnlEZWZpbml0aW9uO1xuZXhwb3J0cy5nZXRGcmFnbWVudERlZmluaXRpb25zID0gZ2V0RnJhZ21lbnREZWZpbml0aW9ucztcbmV4cG9ydHMudG9JZFZhbHVlID0gdG9JZFZhbHVlO1xuZXhwb3J0cy5JbnRyb3NwZWN0aW9uRnJhZ21lbnRNYXRjaGVyID0gSW50cm9zcGVjdGlvbkZyYWdtZW50TWF0Y2hlcjtcbmV4cG9ydHMucHJpbnRBU1QgPSBncmFwaHFsX2xhbmd1YWdlX3ByaW50ZXIucHJpbnQ7XG5leHBvcnRzLkhUVFBGZXRjaE5ldHdvcmtJbnRlcmZhY2UgPSBIVFRQRmV0Y2hOZXR3b3JrSW50ZXJmYWNlO1xuZXhwb3J0cy5IVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2UgPSBIVFRQQmF0Y2hlZE5ldHdvcmtJbnRlcmZhY2U7XG5leHBvcnRzLk9ic2VydmFibGVRdWVyeSA9IE9ic2VydmFibGVRdWVyeTtcbmV4cG9ydHMuQXBvbGxvQ2xpZW50ID0gQXBvbGxvQ2xpZW50JDE7XG5leHBvcnRzWydkZWZhdWx0J10gPSBBcG9sbG9DbGllbnQkMTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwb2xsby51bWQuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIHNob3VsZEluY2x1ZGUoc2VsZWN0aW9uLCB2YXJpYWJsZXMpIHtcbiAgICBpZiAoIXZhcmlhYmxlcykge1xuICAgICAgICB2YXJpYWJsZXMgPSB7fTtcbiAgICB9XG4gICAgaWYgKCFzZWxlY3Rpb24uZGlyZWN0aXZlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IHRydWU7XG4gICAgc2VsZWN0aW9uLmRpcmVjdGl2ZXMuZm9yRWFjaChmdW5jdGlvbiAoZGlyZWN0aXZlKSB7XG4gICAgICAgIGlmIChkaXJlY3RpdmUubmFtZS52YWx1ZSAhPT0gJ3NraXAnICYmIGRpcmVjdGl2ZS5uYW1lLnZhbHVlICE9PSAnaW5jbHVkZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlyZWN0aXZlQXJndW1lbnRzID0gZGlyZWN0aXZlLmFyZ3VtZW50cztcbiAgICAgICAgdmFyIGRpcmVjdGl2ZU5hbWUgPSBkaXJlY3RpdmUubmFtZS52YWx1ZTtcbiAgICAgICAgaWYgKGRpcmVjdGl2ZUFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzIGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlmQXJndW1lbnQgPSBkaXJlY3RpdmUuYXJndW1lbnRzWzBdO1xuICAgICAgICBpZiAoIWlmQXJndW1lbnQubmFtZSB8fCBpZkFyZ3VtZW50Lm5hbWUudmFsdWUgIT09ICdpZicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQgZm9yIHRoZSBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWZWYWx1ZSA9IGRpcmVjdGl2ZS5hcmd1bWVudHNbMF0udmFsdWU7XG4gICAgICAgIHZhciBldmFsZWRWYWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIWlmVmFsdWUgfHwgaWZWYWx1ZS5raW5kICE9PSAnQm9vbGVhblZhbHVlJykge1xuICAgICAgICAgICAgaWYgKGlmVmFsdWUua2luZCAhPT0gJ1ZhcmlhYmxlJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IGZvciB0aGUgQFwiICsgZGlyZWN0aXZlTmFtZSArIFwiIGRpcmVjdGl2ZSBtdXN0IGJlIGEgdmFyaWFibGUgb3IgYSBib29sIGVhbiB2YWx1ZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmFsZWRWYWx1ZSA9IHZhcmlhYmxlc1tpZlZhbHVlLm5hbWUudmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChldmFsZWRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFyaWFibGUgcmVmZXJlbmNlZCBpbiBAXCIgKyBkaXJlY3RpdmVOYW1lICsgXCIgZGlyZWN0aXZlLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmFsZWRWYWx1ZSA9IGlmVmFsdWUudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpcmVjdGl2ZU5hbWUgPT09ICdza2lwJykge1xuICAgICAgICAgICAgZXZhbGVkVmFsdWUgPSAhZXZhbGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldmFsZWRWYWx1ZSkge1xuICAgICAgICAgICAgcmVzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZXhwb3J0cy5zaG91bGRJbmNsdWRlID0gc2hvdWxkSW5jbHVkZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpcmVjdGl2ZXMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBjaGVja0RvY3VtZW50KGRvYykge1xuICAgIGlmIChkb2Mua2luZCAhPT0gJ0RvY3VtZW50Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RpbmcgYSBwYXJzZWQgR3JhcGhRTCBkb2N1bWVudC4gUGVyaGFwcyB5b3UgbmVlZCB0byB3cmFwIHRoZSBxdWVyeSBzdHJpbmcgaW4gYSBcXFwiZ3FsXFxcIiB0YWc/IGh0dHA6Ly9kb2NzLmFwb2xsb3N0YWNrLmNvbS9hcG9sbG8tY2xpZW50L2NvcmUuaHRtbCNncWxcIik7XG4gICAgfVxuICAgIHZhciBudW1PcERlZmluaXRpb25zID0gZG9jLmRlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbic7XG4gICAgfSkubGVuZ3RoO1xuICAgIGlmIChudW1PcERlZmluaXRpb25zID4gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1F1ZXJpZXMgbXVzdCBoYXZlIGV4YWN0bHkgb25lIG9wZXJhdGlvbiBkZWZpbml0aW9uLicpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEZyYWdtZW50RGVmaW5pdGlvbnMoZG9jKSB7XG4gICAgdmFyIGZyYWdtZW50RGVmaW5pdGlvbnMgPSBkb2MuZGVmaW5pdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChkZWZpbml0aW9uKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uLmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmcmFnbWVudERlZmluaXRpb25zO1xufVxuZXhwb3J0cy5nZXRGcmFnbWVudERlZmluaXRpb25zID0gZ2V0RnJhZ21lbnREZWZpbml0aW9ucztcbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50TWFwKGZyYWdtZW50cykge1xuICAgIGlmIChmcmFnbWVudHMgPT09IHZvaWQgMCkgeyBmcmFnbWVudHMgPSBbXTsgfVxuICAgIHZhciBzeW1UYWJsZSA9IHt9O1xuICAgIGZyYWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICBzeW1UYWJsZVtmcmFnbWVudC5uYW1lLnZhbHVlXSA9IGZyYWdtZW50O1xuICAgIH0pO1xuICAgIHJldHVybiBzeW1UYWJsZTtcbn1cbmV4cG9ydHMuY3JlYXRlRnJhZ21lbnRNYXAgPSBjcmVhdGVGcmFnbWVudE1hcDtcbmZ1bmN0aW9uIGdldE1haW5EZWZpbml0aW9uKHF1ZXJ5RG9jKSB7XG4gICAgY2hlY2tEb2N1bWVudChxdWVyeURvYyk7XG4gICAgdmFyIGZyYWdtZW50RGVmaW5pdGlvbjtcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gcXVlcnlEb2MuZGVmaW5pdGlvbnM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBkZWZpbml0aW9uID0gX2FbX2ldO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnT3BlcmF0aW9uRGVmaW5pdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBvcGVyYXRpb24gPSBkZWZpbml0aW9uLm9wZXJhdGlvbjtcbiAgICAgICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdxdWVyeScgfHwgb3BlcmF0aW9uID09PSAnbXV0YXRpb24nIHx8IG9wZXJhdGlvbiA9PT0gJ3N1YnNjcmlwdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmaW5pdGlvbi5raW5kID09PSAnRnJhZ21lbnREZWZpbml0aW9uJyAmJiAhZnJhZ21lbnREZWZpbml0aW9uKSB7XG4gICAgICAgICAgICBmcmFnbWVudERlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChmcmFnbWVudERlZmluaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50RGVmaW5pdGlvbjtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHBhcnNlZCBHcmFwaFFMIHF1ZXJ5IHdpdGggYSBxdWVyeSwgbXV0YXRpb24sIHN1YnNjcmlwdGlvbiwgb3IgYSBmcmFnbWVudC4nKTtcbn1cbmV4cG9ydHMuZ2V0TWFpbkRlZmluaXRpb24gPSBnZXRNYWluRGVmaW5pdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldEZyb21BU1QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgZ2V0RnJvbUFTVF8xID0gcmVxdWlyZShcIi4vZ2V0RnJvbUFTVFwiKTtcbnZhciBkaXJlY3RpdmVzXzEgPSByZXF1aXJlKFwiLi9kaXJlY3RpdmVzXCIpO1xudmFyIHN0b3JlVXRpbHNfMSA9IHJlcXVpcmUoXCIuL3N0b3JlVXRpbHNcIik7XG5mdW5jdGlvbiBncmFwaHFsKHJlc29sdmVyLCBkb2N1bWVudCwgcm9vdFZhbHVlLCBjb250ZXh0VmFsdWUsIHZhcmlhYmxlVmFsdWVzLCBleGVjT3B0aW9ucykge1xuICAgIGlmIChleGVjT3B0aW9ucyA9PT0gdm9pZCAwKSB7IGV4ZWNPcHRpb25zID0ge307IH1cbiAgICB2YXIgbWFpbkRlZmluaXRpb24gPSBnZXRGcm9tQVNUXzEuZ2V0TWFpbkRlZmluaXRpb24oZG9jdW1lbnQpO1xuICAgIHZhciBmcmFnbWVudHMgPSBnZXRGcm9tQVNUXzEuZ2V0RnJhZ21lbnREZWZpbml0aW9ucyhkb2N1bWVudCk7XG4gICAgdmFyIGZyYWdtZW50TWFwID0gZ2V0RnJvbUFTVF8xLmNyZWF0ZUZyYWdtZW50TWFwKGZyYWdtZW50cykgfHwge307XG4gICAgdmFyIHJlc3VsdE1hcHBlciA9IGV4ZWNPcHRpb25zLnJlc3VsdE1hcHBlcjtcbiAgICB2YXIgZnJhZ21lbnRNYXRjaGVyID0gZXhlY09wdGlvbnMuZnJhZ21lbnRNYXRjaGVyIHx8IChmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9KTtcbiAgICB2YXIgZXhlY0NvbnRleHQgPSB7XG4gICAgICAgIGZyYWdtZW50TWFwOiBmcmFnbWVudE1hcCxcbiAgICAgICAgY29udGV4dFZhbHVlOiBjb250ZXh0VmFsdWUsXG4gICAgICAgIHZhcmlhYmxlVmFsdWVzOiB2YXJpYWJsZVZhbHVlcyxcbiAgICAgICAgcmVzdWx0TWFwcGVyOiByZXN1bHRNYXBwZXIsXG4gICAgICAgIHJlc29sdmVyOiByZXNvbHZlcixcbiAgICAgICAgZnJhZ21lbnRNYXRjaGVyOiBmcmFnbWVudE1hdGNoZXIsXG4gICAgfTtcbiAgICByZXR1cm4gZXhlY3V0ZVNlbGVjdGlvblNldChtYWluRGVmaW5pdGlvbi5zZWxlY3Rpb25TZXQsIHJvb3RWYWx1ZSwgZXhlY0NvbnRleHQpO1xufVxuZXhwb3J0cy5ncmFwaHFsID0gZ3JhcGhxbDtcbmZ1bmN0aW9uIGV4ZWN1dGVTZWxlY3Rpb25TZXQoc2VsZWN0aW9uU2V0LCByb290VmFsdWUsIGV4ZWNDb250ZXh0KSB7XG4gICAgdmFyIGZyYWdtZW50TWFwID0gZXhlY0NvbnRleHQuZnJhZ21lbnRNYXAsIGNvbnRleHRWYWx1ZSA9IGV4ZWNDb250ZXh0LmNvbnRleHRWYWx1ZSwgdmFyaWFibGVzID0gZXhlY0NvbnRleHQudmFyaWFibGVWYWx1ZXM7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHNlbGVjdGlvblNldC5zZWxlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKHNlbGVjdGlvbikge1xuICAgICAgICBpZiAoIWRpcmVjdGl2ZXNfMS5zaG91bGRJbmNsdWRlKHNlbGVjdGlvbiwgdmFyaWFibGVzKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdG9yZVV0aWxzXzEuaXNGaWVsZChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICB2YXIgZmllbGRSZXN1bHQgPSBleGVjdXRlRmllbGQoc2VsZWN0aW9uLCByb290VmFsdWUsIGV4ZWNDb250ZXh0KTtcbiAgICAgICAgICAgIHZhciByZXN1bHRGaWVsZEtleSA9IHN0b3JlVXRpbHNfMS5yZXN1bHRLZXlOYW1lRnJvbUZpZWxkKHNlbGVjdGlvbik7XG4gICAgICAgICAgICBpZiAoZmllbGRSZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHRGaWVsZEtleV0gPSBmaWVsZFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChzdG9yZVV0aWxzXzEuaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudCA9IGZyYWdtZW50TWFwW3NlbGVjdGlvbi5uYW1lLnZhbHVlXTtcbiAgICAgICAgICAgICAgICBpZiAoIWZyYWdtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyYWdtZW50IG5hbWVkIFwiICsgc2VsZWN0aW9uLm5hbWUudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0eXBlQ29uZGl0aW9uID0gZnJhZ21lbnQudHlwZUNvbmRpdGlvbi5uYW1lLnZhbHVlO1xuICAgICAgICAgICAgaWYgKGV4ZWNDb250ZXh0LmZyYWdtZW50TWF0Y2hlcihyb290VmFsdWUsIHR5cGVDb25kaXRpb24sIGNvbnRleHRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhZ21lbnRSZXN1bHQgPSBleGVjdXRlU2VsZWN0aW9uU2V0KGZyYWdtZW50LnNlbGVjdGlvblNldCwgcm9vdFZhbHVlLCBleGVjQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgbWVyZ2UocmVzdWx0LCBmcmFnbWVudFJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXhlY0NvbnRleHQucmVzdWx0TWFwcGVyKSB7XG4gICAgICAgIHJldHVybiBleGVjQ29udGV4dC5yZXN1bHRNYXBwZXIocmVzdWx0LCByb290VmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZXhlY3V0ZUZpZWxkKGZpZWxkLCByb290VmFsdWUsIGV4ZWNDb250ZXh0KSB7XG4gICAgdmFyIHZhcmlhYmxlcyA9IGV4ZWNDb250ZXh0LnZhcmlhYmxlVmFsdWVzLCBjb250ZXh0VmFsdWUgPSBleGVjQ29udGV4dC5jb250ZXh0VmFsdWUsIHJlc29sdmVyID0gZXhlY0NvbnRleHQucmVzb2x2ZXI7XG4gICAgdmFyIGZpZWxkTmFtZSA9IGZpZWxkLm5hbWUudmFsdWU7XG4gICAgdmFyIGFyZ3MgPSBzdG9yZVV0aWxzXzEuYXJndW1lbnRzT2JqZWN0RnJvbUZpZWxkKGZpZWxkLCB2YXJpYWJsZXMpO1xuICAgIHZhciBpbmZvID0ge1xuICAgICAgICBpc0xlYWY6ICFmaWVsZC5zZWxlY3Rpb25TZXQsXG4gICAgICAgIHJlc3VsdEtleTogc3RvcmVVdGlsc18xLnJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpLFxuICAgIH07XG4gICAgdmFyIHJlc3VsdCA9IHJlc29sdmVyKGZpZWxkTmFtZSwgcm9vdFZhbHVlLCBhcmdzLCBjb250ZXh0VmFsdWUsIGluZm8pO1xuICAgIGlmICghZmllbGQuc2VsZWN0aW9uU2V0KSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gZXhlY3V0ZVN1YlNlbGVjdGVkQXJyYXkoZmllbGQsIHJlc3VsdCwgZXhlY0NvbnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gZXhlY3V0ZVNlbGVjdGlvblNldChmaWVsZC5zZWxlY3Rpb25TZXQsIHJlc3VsdCwgZXhlY0NvbnRleHQpO1xufVxuZnVuY3Rpb24gZXhlY3V0ZVN1YlNlbGVjdGVkQXJyYXkoZmllbGQsIHJlc3VsdCwgZXhlY0NvbnRleHQpIHtcbiAgICByZXR1cm4gcmVzdWx0Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlU3ViU2VsZWN0ZWRBcnJheShmaWVsZCwgaXRlbSwgZXhlY0NvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGVjdXRlU2VsZWN0aW9uU2V0KGZpZWxkLnNlbGVjdGlvblNldCwgaXRlbSwgZXhlY0NvbnRleHQpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbWVyZ2UoZGVzdCwgc3JjKSB7XG4gICAgaWYgKHNyYyA9PT0gbnVsbCB8fFxuICAgICAgICB0eXBlb2Ygc3JjID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICB0eXBlb2Ygc3JjID09PSAnc3RyaW5nJyB8fFxuICAgICAgICB0eXBlb2Ygc3JjID09PSAnbnVtYmVyJyB8fFxuICAgICAgICB0eXBlb2Ygc3JjID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHNyYztcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoZGVzdCkuZm9yRWFjaChmdW5jdGlvbiAoZGVzdEtleSkge1xuICAgICAgICBpZiAoc3JjLmhhc093blByb3BlcnR5KGRlc3RLZXkpKSB7XG4gICAgICAgICAgICBtZXJnZShkZXN0W2Rlc3RLZXldLCBzcmNbZGVzdEtleV0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGZ1bmN0aW9uIChzcmNLZXkpIHtcbiAgICAgICAgaWYgKCFkZXN0Lmhhc093blByb3BlcnR5KHNyY0tleSkpIHtcbiAgICAgICAgICAgIGRlc3Rbc3JjS2V5XSA9IHNyY1tzcmNLZXldO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmFwaHFsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHV0aWxpdGllc18xID0gcmVxdWlyZShcIi4vdXRpbGl0aWVzXCIpO1xuZXhwb3J0cy5maWx0ZXIgPSB1dGlsaXRpZXNfMS5maWx0ZXI7XG5leHBvcnRzLmNoZWNrID0gdXRpbGl0aWVzXzEuY2hlY2s7XG5leHBvcnRzLnByb3BUeXBlID0gdXRpbGl0aWVzXzEucHJvcFR5cGU7XG52YXIgZ3JhcGhxbF8xID0gcmVxdWlyZShcIi4vZ3JhcGhxbFwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdyYXBocWxfMS5ncmFwaHFsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpc1NjYWxhclZhbHVlKHZhbHVlKSB7XG4gICAgdmFyIFNDQUxBUl9UWVBFUyA9IHtcbiAgICAgICAgU3RyaW5nVmFsdWU6IDEsXG4gICAgICAgIEJvb2xlYW5WYWx1ZTogMSxcbiAgICAgICAgRW51bVZhbHVlOiAxLFxuICAgIH07XG4gICAgcmV0dXJuICEhU0NBTEFSX1RZUEVTW3ZhbHVlLmtpbmRdO1xufVxuZnVuY3Rpb24gaXNOdW1iZXJWYWx1ZSh2YWx1ZSkge1xuICAgIHZhciBOVU1CRVJfVFlQRVMgPSB7XG4gICAgICAgIEludFZhbHVlOiAxLFxuICAgICAgICBGbG9hdFZhbHVlOiAxLFxuICAgIH07XG4gICAgcmV0dXJuIE5VTUJFUl9UWVBFU1t2YWx1ZS5raW5kXTtcbn1cbmZ1bmN0aW9uIGlzVmFyaWFibGUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ1ZhcmlhYmxlJztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmtpbmQgPT09ICdPYmplY3RWYWx1ZSc7XG59XG5mdW5jdGlvbiBpc0xpc3QodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUua2luZCA9PT0gJ0xpc3RWYWx1ZSc7XG59XG5mdW5jdGlvbiB2YWx1ZVRvT2JqZWN0UmVwcmVzZW50YXRpb24oYXJnT2JqLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKSB7XG4gICAgaWYgKGlzTnVtYmVyVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IE51bWJlcih2YWx1ZS52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzU2NhbGFyVmFsdWUodmFsdWUpKSB7XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhbHVlLnZhbHVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIG5lc3RlZEFyZ09ial8xID0ge307XG4gICAgICAgIHZhbHVlLmZpZWxkcy5tYXAoZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKG5lc3RlZEFyZ09ial8xLCBvYmoubmFtZSwgb2JqLnZhbHVlLCB2YXJpYWJsZXMpOyB9KTtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gbmVzdGVkQXJnT2JqXzE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzVmFyaWFibGUodmFsdWUpKSB7XG4gICAgICAgIHZhciB2YXJpYWJsZVZhbHVlID0gKHZhcmlhYmxlcyB8fCB7fSlbdmFsdWUubmFtZS52YWx1ZV07XG4gICAgICAgIGFyZ09ialtuYW1lLnZhbHVlXSA9IHZhcmlhYmxlVmFsdWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzTGlzdCh2YWx1ZSkpIHtcbiAgICAgICAgYXJnT2JqW25hbWUudmFsdWVdID0gdmFsdWUudmFsdWVzLm1hcChmdW5jdGlvbiAobGlzdFZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgbmVzdGVkQXJnQXJyYXlPYmogPSB7fTtcbiAgICAgICAgICAgIHZhbHVlVG9PYmplY3RSZXByZXNlbnRhdGlvbihuZXN0ZWRBcmdBcnJheU9iaiwgbmFtZSwgbGlzdFZhbHVlLCB2YXJpYWJsZXMpO1xuICAgICAgICAgICAgcmV0dXJuIG5lc3RlZEFyZ0FycmF5T2JqW25hbWUudmFsdWVdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBpbmxpbmUgYXJndW1lbnQgXFxcIlwiICsgbmFtZS52YWx1ZSArIFwiXFxcIiBvZiBraW5kIFxcXCJcIiArIHZhbHVlLmtpbmQgKyBcIlxcXCIgaXMgbm90IHN1cHBvcnRlZC4gVXNlIHZhcmlhYmxlcyBpbnN0ZWFkIG9mIGlubGluZSBhcmd1bWVudHMgdG8gb3ZlcmNvbWUgdGhpcyBsaW1pdGF0aW9uLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhcmd1bWVudHNPYmplY3RGcm9tRmllbGQoZmllbGQsIHZhcmlhYmxlcykge1xuICAgIGlmIChmaWVsZC5hcmd1bWVudHMgJiYgZmllbGQuYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB2YXIgYXJnT2JqXzEgPSB7fTtcbiAgICAgICAgZmllbGQuYXJndW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHZhbHVlID0gX2EudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVUb09iamVjdFJlcHJlc2VudGF0aW9uKGFyZ09ial8xLCBuYW1lLCB2YWx1ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcmdPYmpfMTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnRzLmFyZ3VtZW50c09iamVjdEZyb21GaWVsZCA9IGFyZ3VtZW50c09iamVjdEZyb21GaWVsZDtcbmZ1bmN0aW9uIHJlc3VsdEtleU5hbWVGcm9tRmllbGQoZmllbGQpIHtcbiAgICByZXR1cm4gZmllbGQuYWxpYXMgP1xuICAgICAgICBmaWVsZC5hbGlhcy52YWx1ZSA6XG4gICAgICAgIGZpZWxkLm5hbWUudmFsdWU7XG59XG5leHBvcnRzLnJlc3VsdEtleU5hbWVGcm9tRmllbGQgPSByZXN1bHRLZXlOYW1lRnJvbUZpZWxkO1xuZnVuY3Rpb24gaXNGaWVsZChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdGaWVsZCc7XG59XG5leHBvcnRzLmlzRmllbGQgPSBpc0ZpZWxkO1xuZnVuY3Rpb24gaXNJbmxpbmVGcmFnbWVudChzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gc2VsZWN0aW9uLmtpbmQgPT09ICdJbmxpbmVGcmFnbWVudCc7XG59XG5leHBvcnRzLmlzSW5saW5lRnJhZ21lbnQgPSBpc0lubGluZUZyYWdtZW50O1xuZnVuY3Rpb24gZ3JhcGhRTFJlc3VsdEhhc0Vycm9yKHJlc3VsdCkge1xuICAgIHJldHVybiByZXN1bHQuZXJyb3JzICYmIHJlc3VsdC5lcnJvcnMubGVuZ3RoO1xufVxuZXhwb3J0cy5ncmFwaFFMUmVzdWx0SGFzRXJyb3IgPSBncmFwaFFMUmVzdWx0SGFzRXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yZVV0aWxzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGdyYXBocWxfMSA9IHJlcXVpcmUoXCIuL2dyYXBocWxcIik7XG5mdW5jdGlvbiBmaWx0ZXIoZG9jLCBkYXRhKSB7XG4gICAgdmFyIHJlc29sdmVyID0gZnVuY3Rpb24gKGZpZWxkTmFtZSwgcm9vdCwgYXJncywgY29udGV4dCwgaW5mbykge1xuICAgICAgICByZXR1cm4gcm9vdFtpbmZvLnJlc3VsdEtleV07XG4gICAgfTtcbiAgICByZXR1cm4gZ3JhcGhxbF8xLmdyYXBocWwocmVzb2x2ZXIsIGRvYywgZGF0YSk7XG59XG5leHBvcnRzLmZpbHRlciA9IGZpbHRlcjtcbmZ1bmN0aW9uIGNoZWNrKGRvYywgZGF0YSkge1xuICAgIHZhciByZXNvbHZlciA9IGZ1bmN0aW9uIChmaWVsZE5hbWUsIHJvb3QsIGFyZ3MsIGNvbnRleHQsIGluZm8pIHtcbiAgICAgICAgaWYgKCF7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJvb3QsIGluZm8ucmVzdWx0S2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZm8ucmVzdWx0S2V5ICsgXCIgbWlzc2luZyBvbiBcIiArIHJvb3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb290W2luZm8ucmVzdWx0S2V5XTtcbiAgICB9O1xuICAgIGdyYXBocWxfMS5ncmFwaHFsKHJlc29sdmVyLCBkb2MsIGRhdGEsIHt9LCB7fSwge1xuICAgICAgICBmcmFnbWVudE1hdGNoZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgIH0pO1xufVxuZXhwb3J0cy5jaGVjayA9IGNoZWNrO1xudmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcbmZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xufVxuUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG52YXIgcmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0Jyxcbn07XG5mdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IHJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXCJUaGUgXCIgKyBsb2NhdGlvbk5hbWUgKyBcIiBgXCIgKyBwcm9wRnVsbE5hbWUgKyBcImAgaXMgbWFya2VkIGFzIHJlcXVpcmVkIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChcImluIGBcIiArIGNvbXBvbmVudE5hbWUgKyBcImAsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcIlRoZSBcIiArIGxvY2F0aW9uTmFtZSArIFwiIGBcIiArIHByb3BGdWxsTmFtZSArIFwiYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gXCIgK1xuICAgICAgICAgICAgICAgICAgICAoXCJgXCIgKyBjb21wb25lbnROYW1lICsgXCJgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xufVxuZnVuY3Rpb24gcHJvcFR5cGUoZG9jKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgICAgdmFyIHByb3AgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVjayhkb2MsIHByb3ApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnByb3BUeXBlID0gcHJvcFR5cGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsaXRpZXMuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2dyYXBocWwvbGFuZ3VhZ2UvcGFyc2VyJyk7XG5cbnZhciBwYXJzZSA9IHBhcnNlci5wYXJzZTtcblxuLy8gU3RyaXAgaW5zaWduaWZpY2FudCB3aGl0ZXNwYWNlXG4vLyBOb3RlIHRoYXQgdGhpcyBjb3VsZCBkbyBhIGxvdCBtb3JlLCBzdWNoIGFzIHJlb3JkZXIgZmllbGRzIGV0Yy5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFxzLF0rL2csICcgJykudHJpbSgpO1xufVxuXG4vLyBBIG1hcCBkb2NTdHJpbmcgLT4gZ3JhcGhxbCBkb2N1bWVudFxudmFyIGRvY0NhY2hlID0ge307XG5cbi8vIEEgbWFwIGZyYWdtZW50TmFtZSAtPiBbbm9ybWFsaXplZCBzb3VyY2VdXG52YXIgZnJhZ21lbnRTb3VyY2VNYXAgPSB7fTtcblxuZnVuY3Rpb24gY2FjaGVLZXlGcm9tTG9jKGxvYykge1xuICByZXR1cm4gbm9ybWFsaXplKGxvYy5zb3VyY2UuYm9keS5zdWJzdHJpbmcobG9jLnN0YXJ0LCBsb2MuZW5kKSk7XG59XG5cbi8vIEZvciB0ZXN0aW5nLlxuZnVuY3Rpb24gcmVzZXRDYWNoZXMoKSB7XG4gIGRvY0NhY2hlID0ge307XG4gIGZyYWdtZW50U291cmNlTWFwID0ge307XG59XG5cbi8vIFRha2UgYSB1bnN0cmlwcGVkIHBhcnNlZCBkb2N1bWVudCAocXVlcnkvbXV0YXRpb24gb3IgZXZlbiBmcmFnbWVudCksIGFuZFxuLy8gY2hlY2sgYWxsIGZyYWdtZW50IGRlZmluaXRpb25zLCBjaGVja2luZyBmb3IgbmFtZS0+c291cmNlIHVuaXF1ZW5lc3MuXG4vLyBXZSBhbHNvIHdhbnQgdG8gbWFrZSBzdXJlIG9ubHkgdW5pcXVlIGZyYWdtZW50cyBleGlzdCBpbiB0aGUgZG9jdW1lbnQuXG52YXIgcHJpbnRGcmFnbWVudFdhcm5pbmdzID0gdHJ1ZTtcbmZ1bmN0aW9uIHByb2Nlc3NGcmFnbWVudHMoYXN0KSB7XG4gIHZhciBhc3RGcmFnbWVudE1hcCA9IHt9O1xuICB2YXIgZGVmaW5pdGlvbnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFzdC5kZWZpbml0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBmcmFnbWVudERlZmluaXRpb24gPSBhc3QuZGVmaW5pdGlvbnNbaV07XG5cbiAgICBpZiAoZnJhZ21lbnREZWZpbml0aW9uLmtpbmQgPT09ICdGcmFnbWVudERlZmluaXRpb24nKSB7XG4gICAgICB2YXIgZnJhZ21lbnROYW1lID0gZnJhZ21lbnREZWZpbml0aW9uLm5hbWUudmFsdWU7XG4gICAgICB2YXIgc291cmNlS2V5ID0gY2FjaGVLZXlGcm9tTG9jKGZyYWdtZW50RGVmaW5pdGlvbi5sb2MpO1xuXG4gICAgICAvLyBXZSBrbm93IHNvbWV0aGluZyBhYm91dCB0aGlzIGZyYWdtZW50XG4gICAgICBpZiAoZnJhZ21lbnRTb3VyY2VNYXAuaGFzT3duUHJvcGVydHkoZnJhZ21lbnROYW1lKSAmJiAhZnJhZ21lbnRTb3VyY2VNYXBbZnJhZ21lbnROYW1lXVtzb3VyY2VLZXldKSB7XG5cbiAgICAgICAgLy8gdGhpcyBpcyBhIHByb2JsZW0gYmVjYXVzZSB0aGUgYXBwIGRldmVsb3BlciBpcyB0cnlpbmcgdG8gcmVnaXN0ZXIgYW5vdGhlciBmcmFnbWVudCB3aXRoXG4gICAgICAgIC8vIHRoZSBzYW1lIG5hbWUgYXMgb25lIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC4gU28sIHdlIHRlbGwgdGhlbSBhYm91dCBpdC5cbiAgICAgICAgaWYgKHByaW50RnJhZ21lbnRXYXJuaW5ncykge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IGZyYWdtZW50IHdpdGggbmFtZSBcIiArIGZyYWdtZW50TmFtZSArIFwiIGFscmVhZHkgZXhpc3RzLlxcblwiXG4gICAgICAgICAgICArIFwiZ3JhcGhxbC10YWcgZW5mb3JjZXMgYWxsIGZyYWdtZW50IG5hbWVzIGFjcm9zcyB5b3VyIGFwcGxpY2F0aW9uIHRvIGJlIHVuaXF1ZTsgcmVhZCBtb3JlIGFib3V0XFxuXCJcbiAgICAgICAgICAgICsgXCJ0aGlzIGluIHRoZSBkb2NzOiBodHRwOi8vZGV2LmFwb2xsb2RhdGEuY29tL2NvcmUvZnJhZ21lbnRzLmh0bWwjdW5pcXVlLW5hbWVzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJhZ21lbnRTb3VyY2VNYXBbZnJhZ21lbnROYW1lXVtzb3VyY2VLZXldID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIGlmICghZnJhZ21lbnRTb3VyY2VNYXAuaGFzT3duUHJvcGVydHkoZnJhZ21lbnROYW1lKSkge1xuICAgICAgICBmcmFnbWVudFNvdXJjZU1hcFtmcmFnbWVudE5hbWVdID0ge307XG4gICAgICAgIGZyYWdtZW50U291cmNlTWFwW2ZyYWdtZW50TmFtZV1bc291cmNlS2V5XSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghYXN0RnJhZ21lbnRNYXBbc291cmNlS2V5XSkge1xuICAgICAgICBhc3RGcmFnbWVudE1hcFtzb3VyY2VLZXldID0gdHJ1ZTtcbiAgICAgICAgZGVmaW5pdGlvbnMucHVzaChmcmFnbWVudERlZmluaXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKGZyYWdtZW50RGVmaW5pdGlvbik7XG4gICAgfVxuICB9XG5cbiAgYXN0LmRlZmluaXRpb25zID0gZGVmaW5pdGlvbnM7XG4gIHJldHVybiBhc3Q7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVGcmFnbWVudFdhcm5pbmdzKCkge1xuICBwcmludEZyYWdtZW50V2FybmluZ3MgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gc3RyaXBMb2MoZG9jLCByZW1vdmVMb2NBdFRoaXNMZXZlbCkge1xuICB2YXIgZG9jVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkb2MpO1xuXG4gIGlmIChkb2NUeXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgcmV0dXJuIGRvYy5tYXAoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBzdHJpcExvYyhkLCByZW1vdmVMb2NBdFRoaXNMZXZlbCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoZG9jVHlwZSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgaW5wdXQuJyk7XG4gIH1cblxuICAvLyBXZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGUgcm9vdCBsb2MgZmllbGQgc28gd2UgY2FuIHVzZSBpdFxuICAvLyBmb3IgZnJhZ21lbnQgc3Vic3RpdHV0aW9uIChzZWUgYmVsb3cpXG4gIGlmIChyZW1vdmVMb2NBdFRoaXNMZXZlbCAmJiBkb2MubG9jKSB7XG4gICAgZGVsZXRlIGRvYy5sb2M7XG4gIH1cblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXBvbGxvZ3JhcGhxbC9ncmFwaHFsLXRhZy9pc3N1ZXMvNDBcbiAgaWYgKGRvYy5sb2MpIHtcbiAgICBkZWxldGUgZG9jLmxvYy5zdGFydFRva2VuO1xuICAgIGRlbGV0ZSBkb2MubG9jLmVuZFRva2VuO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkb2MpO1xuICB2YXIga2V5O1xuICB2YXIgdmFsdWU7XG4gIHZhciB2YWx1ZVR5cGU7XG5cbiAgZm9yIChrZXkgaW4ga2V5cykge1xuICAgIGlmIChrZXlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhbHVlID0gZG9jW2tleXNba2V5XV07XG4gICAgICB2YWx1ZVR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG4gICAgICBpZiAodmFsdWVUeXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCB2YWx1ZVR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgZG9jW2tleXNba2V5XV0gPSBzdHJpcExvYyh2YWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvYztcbn1cblxuZnVuY3Rpb24gcGFyc2VEb2N1bWVudChkb2MpIHtcbiAgdmFyIGNhY2hlS2V5ID0gbm9ybWFsaXplKGRvYyk7XG5cbiAgaWYgKGRvY0NhY2hlW2NhY2hlS2V5XSkge1xuICAgIHJldHVybiBkb2NDYWNoZVtjYWNoZUtleV07XG4gIH1cblxuICB2YXIgcGFyc2VkID0gcGFyc2UoZG9jKTtcbiAgaWYgKCFwYXJzZWQgfHwgcGFyc2VkLmtpbmQgIT09ICdEb2N1bWVudCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIEdyYXBoUUwgZG9jdW1lbnQuJyk7XG4gIH1cblxuICAvLyBjaGVjayB0aGF0IGFsbCBcIm5ld1wiIGZyYWdtZW50cyBpbnNpZGUgdGhlIGRvY3VtZW50cyBhcmUgY29uc2lzdGVudCB3aXRoXG4gIC8vIGV4aXN0aW5nIGZyYWdtZW50cyBvZiB0aGUgc2FtZSBuYW1lXG4gIHBhcnNlZCA9IHByb2Nlc3NGcmFnbWVudHMocGFyc2VkKTtcbiAgcGFyc2VkID0gc3RyaXBMb2MocGFyc2VkLCBmYWxzZSk7XG4gIGRvY0NhY2hlW2NhY2hlS2V5XSA9IHBhcnNlZDtcblxuICByZXR1cm4gcGFyc2VkO1xufVxuXG4vLyBYWFggVGhpcyBzaG91bGQgZXZlbnR1YWxseSBkaXNhbGxvdyBhcmJpdHJhcnkgc3RyaW5nIGludGVycG9sYXRpb24sIGxpa2UgUmVsYXkgZG9lc1xuZnVuY3Rpb24gZ3FsKC8qIGFyZ3VtZW50cyAqLykge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgdmFyIGxpdGVyYWxzID0gYXJnc1swXTtcblxuICAvLyBXZSBhbHdheXMgZ2V0IGxpdGVyYWxzWzBdIGFuZCB0aGVuIG1hdGNoaW5nIHBvc3QgbGl0ZXJhbHMgZm9yIGVhY2ggYXJnIGdpdmVuXG4gIHZhciByZXN1bHQgPSBsaXRlcmFsc1swXTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJnc1tpXSAmJiBhcmdzW2ldLmtpbmQgJiYgYXJnc1tpXS5raW5kID09PSAnRG9jdW1lbnQnKSB7XG4gICAgICByZXN1bHQgKz0gYXJnc1tpXS5sb2Muc291cmNlLmJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSBhcmdzW2ldO1xuICAgIH1cblxuICAgIHJlc3VsdCArPSBsaXRlcmFsc1tpXTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZURvY3VtZW50KHJlc3VsdCk7XG59XG5cbi8vIFN1cHBvcnQgdHlwZXNjcmlwdCwgd2hpY2ggaXNuJ3QgYXMgbmljZSBhcyBCYWJlbCBhYm91dCBkZWZhdWx0IGV4cG9ydHNcbmdxbC5kZWZhdWx0ID0gZ3FsO1xuZ3FsLnJlc2V0Q2FjaGVzID0gcmVzZXRDYWNoZXM7XG5ncWwuZGlzYWJsZUZyYWdtZW50V2FybmluZ3MgPSBkaXNhYmxlRnJhZ21lbnRXYXJuaW5ncztcblxubW9kdWxlLmV4cG9ydHMgPSBncWw7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ncmFwaHFsLXRhZy51bWQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkdyYXBoUUxFcnJvciA9IEdyYXBoUUxFcnJvcjtcblxudmFyIF9sb2NhdGlvbiA9IHJlcXVpcmUoJy4uL2xhbmd1YWdlL2xvY2F0aW9uJyk7XG5cbi8qKlxuICogQSBHcmFwaFFMRXJyb3IgZGVzY3JpYmVzIGFuIEVycm9yIGZvdW5kIGR1cmluZyB0aGUgcGFyc2UsIHZhbGlkYXRlLCBvclxuICogZXhlY3V0ZSBwaGFzZXMgb2YgcGVyZm9ybWluZyBhIEdyYXBoUUwgb3BlcmF0aW9uLiBJbiBhZGRpdGlvbiB0byBhIG1lc3NhZ2VcbiAqIGFuZCBzdGFjayB0cmFjZSwgaXQgYWxzbyBpbmNsdWRlcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbG9jYXRpb25zIGluIGFcbiAqIEdyYXBoUUwgZG9jdW1lbnQgYW5kL29yIGV4ZWN1dGlvbiByZXN1bHQgdGhhdCBjb3JyZXNwb25kIHRvIHRoZSBFcnJvci5cbiAqL1xuZnVuY3Rpb24gR3JhcGhRTEVycm9yKCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlZGVjbGFyZVxubWVzc2FnZSwgbm9kZXMsIHNvdXJjZSwgcG9zaXRpb25zLCBwYXRoLCBvcmlnaW5hbEVycm9yKSB7XG4gIC8vIEluY2x1ZGUgKG5vbi1lbnVtZXJhYmxlKSBzdGFjayB0cmFjZS5cbiAgaWYgKG9yaWdpbmFsRXJyb3IgJiYgb3JpZ2luYWxFcnJvci5zdGFjaykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3RhY2snLCB7XG4gICAgICB2YWx1ZTogb3JpZ2luYWxFcnJvci5zdGFjayxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBHcmFwaFFMRXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc3RhY2snLCB7XG4gICAgICB2YWx1ZTogRXJyb3IoKS5zdGFjayxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvLyBDb21wdXRlIGxvY2F0aW9ucyBpbiB0aGUgc291cmNlIGZvciB0aGUgZ2l2ZW4gbm9kZXMvcG9zaXRpb25zLlxuICB2YXIgX3NvdXJjZSA9IHNvdXJjZTtcbiAgaWYgKCFfc291cmNlICYmIG5vZGVzICYmIG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICB2YXIgbm9kZSA9IG5vZGVzWzBdO1xuICAgIF9zb3VyY2UgPSBub2RlICYmIG5vZGUubG9jICYmIG5vZGUubG9jLnNvdXJjZTtcbiAgfVxuXG4gIHZhciBfcG9zaXRpb25zID0gcG9zaXRpb25zO1xuICBpZiAoIV9wb3NpdGlvbnMgJiYgbm9kZXMpIHtcbiAgICBfcG9zaXRpb25zID0gbm9kZXMuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbihub2RlLmxvYyk7XG4gICAgfSkubWFwKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5sb2Muc3RhcnQ7XG4gICAgfSk7XG4gIH1cbiAgaWYgKF9wb3NpdGlvbnMgJiYgX3Bvc2l0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBfcG9zaXRpb25zID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIF9sb2NhdGlvbnMgPSB2b2lkIDA7XG4gIHZhciBfc291cmNlMiA9IF9zb3VyY2U7IC8vIHNlZW1zIGhlcmUgRmxvdyBuZWVkIGEgY29uc3QgdG8gcmVzb2x2ZSB0eXBlLlxuICBpZiAoX3NvdXJjZTIgJiYgX3Bvc2l0aW9ucykge1xuICAgIF9sb2NhdGlvbnMgPSBfcG9zaXRpb25zLm1hcChmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gKDAsIF9sb2NhdGlvbi5nZXRMb2NhdGlvbikoX3NvdXJjZTIsIHBvcyk7XG4gICAgfSk7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgbWVzc2FnZToge1xuICAgICAgdmFsdWU6IG1lc3NhZ2UsXG4gICAgICAvLyBCeSBiZWluZyBlbnVtZXJhYmxlLCBKU09OLnN0cmluZ2lmeSB3aWxsIGluY2x1ZGUgYG1lc3NhZ2VgIGluIHRoZVxuICAgICAgLy8gcmVzdWx0aW5nIG91dHB1dC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHNpbXBsaXN0IHBvc3NpYmxlIEdyYXBoUUxcbiAgICAgIC8vIHNlcnZpY2UgYWRoZXJlcyB0byB0aGUgc3BlYy5cbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbG9jYXRpb25zOiB7XG4gICAgICAvLyBDb2VyY2luZyBmYWxzZXkgdmFsdWVzIHRvIHVuZGVmaW5lZCBlbnN1cmVzIHRoZXkgd2lsbCBub3QgYmUgaW5jbHVkZWRcbiAgICAgIC8vIGluIEpTT04uc3RyaW5naWZ5KCkgd2hlbiBub3QgcHJvdmlkZWQuXG4gICAgICB2YWx1ZTogX2xvY2F0aW9ucyB8fCB1bmRlZmluZWQsXG4gICAgICAvLyBCeSBiZWluZyBlbnVtZXJhYmxlLCBKU09OLnN0cmluZ2lmeSB3aWxsIGluY2x1ZGUgYGxvY2F0aW9uc2AgaW4gdGhlXG4gICAgICAvLyByZXN1bHRpbmcgb3V0cHV0LiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgc2ltcGxpc3QgcG9zc2libGUgR3JhcGhRTFxuICAgICAgLy8gc2VydmljZSBhZGhlcmVzIHRvIHRoZSBzcGVjLlxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgcGF0aDoge1xuICAgICAgLy8gQ29lcmNpbmcgZmFsc2V5IHZhbHVlcyB0byB1bmRlZmluZWQgZW5zdXJlcyB0aGV5IHdpbGwgbm90IGJlIGluY2x1ZGVkXG4gICAgICAvLyBpbiBKU09OLnN0cmluZ2lmeSgpIHdoZW4gbm90IHByb3ZpZGVkLlxuICAgICAgdmFsdWU6IHBhdGggfHwgdW5kZWZpbmVkLFxuICAgICAgLy8gQnkgYmVpbmcgZW51bWVyYWJsZSwgSlNPTi5zdHJpbmdpZnkgd2lsbCBpbmNsdWRlIGBwYXRoYCBpbiB0aGVcbiAgICAgIC8vIHJlc3VsdGluZyBvdXRwdXQuIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBzaW1wbGlzdCBwb3NzaWJsZSBHcmFwaFFMXG4gICAgICAvLyBzZXJ2aWNlIGFkaGVyZXMgdG8gdGhlIHNwZWMuXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBub2Rlczoge1xuICAgICAgdmFsdWU6IG5vZGVzIHx8IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgc291cmNlOiB7XG4gICAgICB2YWx1ZTogX3NvdXJjZSB8fCB1bmRlZmluZWRcbiAgICB9LFxuICAgIHBvc2l0aW9uczoge1xuICAgICAgdmFsdWU6IF9wb3NpdGlvbnMgfHwgdW5kZWZpbmVkXG4gICAgfSxcbiAgICBvcmlnaW5hbEVycm9yOiB7XG4gICAgICB2YWx1ZTogb3JpZ2luYWxFcnJvclxuICAgIH1cbiAgfSk7XG59XG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuR3JhcGhRTEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlLCB7XG4gIGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBHcmFwaFFMRXJyb3IgfSxcbiAgbmFtZTogeyB2YWx1ZTogJ0dyYXBoUUxFcnJvcicgfVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5mb3JtYXRFcnJvciA9IGZvcm1hdEVycm9yO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJy4uL2pzdXRpbHMvaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLyoqXG4gKiBHaXZlbiBhIEdyYXBoUUxFcnJvciwgZm9ybWF0IGl0IGFjY29yZGluZyB0byB0aGUgcnVsZXMgZGVzY3JpYmVkIGJ5IHRoZVxuICogUmVzcG9uc2UgRm9ybWF0LCBFcnJvcnMgc2VjdGlvbiBvZiB0aGUgR3JhcGhRTCBTcGVjaWZpY2F0aW9uLlxuICovXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihlcnJvcikge1xuICAoMCwgX2ludmFyaWFudDIuZGVmYXVsdCkoZXJyb3IsICdSZWNlaXZlZCBudWxsIG9yIHVuZGVmaW5lZCBlcnJvci4nKTtcbiAgcmV0dXJuIHtcbiAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgIGxvY2F0aW9uczogZXJyb3IubG9jYXRpb25zLFxuICAgIHBhdGg6IGVycm9yLnBhdGhcbiAgfTtcbn1cbi8qKlxuICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9HcmFwaFFMRXJyb3IgPSByZXF1aXJlKCcuL0dyYXBoUUxFcnJvcicpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ0dyYXBoUUxFcnJvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9HcmFwaFFMRXJyb3IuR3JhcGhRTEVycm9yO1xuICB9XG59KTtcblxudmFyIF9zeW50YXhFcnJvciA9IHJlcXVpcmUoJy4vc3ludGF4RXJyb3InKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdzeW50YXhFcnJvcicsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9zeW50YXhFcnJvci5zeW50YXhFcnJvcjtcbiAgfVxufSk7XG5cbnZhciBfbG9jYXRlZEVycm9yID0gcmVxdWlyZSgnLi9sb2NhdGVkRXJyb3InKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdsb2NhdGVkRXJyb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfbG9jYXRlZEVycm9yLmxvY2F0ZWRFcnJvcjtcbiAgfVxufSk7XG5cbnZhciBfZm9ybWF0RXJyb3IgPSByZXF1aXJlKCcuL2Zvcm1hdEVycm9yJyk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnZm9ybWF0RXJyb3InLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfZm9ybWF0RXJyb3IuZm9ybWF0RXJyb3I7XG4gIH1cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9jYXRlZEVycm9yID0gbG9jYXRlZEVycm9yO1xuXG52YXIgX0dyYXBoUUxFcnJvciA9IHJlcXVpcmUoJy4vR3JhcGhRTEVycm9yJyk7XG5cbi8qKlxuICogR2l2ZW4gYW4gYXJiaXRyYXJ5IEVycm9yLCBwcmVzdW1hYmx5IHRocm93biB3aGlsZSBhdHRlbXB0aW5nIHRvIGV4ZWN1dGUgYVxuICogR3JhcGhRTCBvcGVyYXRpb24sIHByb2R1Y2UgYSBuZXcgR3JhcGhRTEVycm9yIGF3YXJlIG9mIHRoZSBsb2NhdGlvbiBpbiB0aGVcbiAqIGRvY3VtZW50IHJlc3BvbnNpYmxlIGZvciB0aGUgb3JpZ2luYWwgRXJyb3IuXG4gKi9cbmZ1bmN0aW9uIGxvY2F0ZWRFcnJvcihvcmlnaW5hbEVycm9yLCBub2RlcywgcGF0aCkge1xuICAvLyBOb3RlOiB0aGlzIHVzZXMgYSBicmFuZC1jaGVjayB0byBzdXBwb3J0IEdyYXBoUUwgZXJyb3JzIG9yaWdpbmF0aW5nIGZyb21cbiAgLy8gb3RoZXIgY29udGV4dHMuXG4gIGlmIChvcmlnaW5hbEVycm9yICYmIG9yaWdpbmFsRXJyb3IucGF0aCkge1xuICAgIHJldHVybiBvcmlnaW5hbEVycm9yO1xuICB9XG5cbiAgdmFyIG1lc3NhZ2UgPSBvcmlnaW5hbEVycm9yID8gb3JpZ2luYWxFcnJvci5tZXNzYWdlIHx8IFN0cmluZyhvcmlnaW5hbEVycm9yKSA6ICdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLic7XG4gIHJldHVybiBuZXcgX0dyYXBoUUxFcnJvci5HcmFwaFFMRXJyb3IobWVzc2FnZSwgb3JpZ2luYWxFcnJvciAmJiBvcmlnaW5hbEVycm9yLm5vZGVzIHx8IG5vZGVzLCBvcmlnaW5hbEVycm9yICYmIG9yaWdpbmFsRXJyb3Iuc291cmNlLCBvcmlnaW5hbEVycm9yICYmIG9yaWdpbmFsRXJyb3IucG9zaXRpb25zLCBwYXRoLCBvcmlnaW5hbEVycm9yKTtcbn1cbi8qKlxuICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3ludGF4RXJyb3IgPSBzeW50YXhFcnJvcjtcblxudmFyIF9sb2NhdGlvbiA9IHJlcXVpcmUoJy4uL2xhbmd1YWdlL2xvY2F0aW9uJyk7XG5cbnZhciBfR3JhcGhRTEVycm9yID0gcmVxdWlyZSgnLi9HcmFwaFFMRXJyb3InKTtcblxuLyoqXG4gKiBQcm9kdWNlcyBhIEdyYXBoUUxFcnJvciByZXByZXNlbnRpbmcgYSBzeW50YXggZXJyb3IsIGNvbnRhaW5pbmcgdXNlZnVsXG4gKiBkZXNjcmlwdGl2ZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc3ludGF4IGVycm9yJ3MgcG9zaXRpb24gaW4gdGhlIHNvdXJjZS5cbiAqL1xuXG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuZnVuY3Rpb24gc3ludGF4RXJyb3Ioc291cmNlLCBwb3NpdGlvbiwgZGVzY3JpcHRpb24pIHtcbiAgdmFyIGxvY2F0aW9uID0gKDAsIF9sb2NhdGlvbi5nZXRMb2NhdGlvbikoc291cmNlLCBwb3NpdGlvbik7XG4gIHZhciBlcnJvciA9IG5ldyBfR3JhcGhRTEVycm9yLkdyYXBoUUxFcnJvcignU3ludGF4IEVycm9yICcgKyBzb3VyY2UubmFtZSArICcgKCcgKyBsb2NhdGlvbi5saW5lICsgJzonICsgbG9jYXRpb24uY29sdW1uICsgJykgJyArIGRlc2NyaXB0aW9uICsgJ1xcblxcbicgKyBoaWdobGlnaHRTb3VyY2VBdExvY2F0aW9uKHNvdXJjZSwgbG9jYXRpb24pLCB1bmRlZmluZWQsIHNvdXJjZSwgW3Bvc2l0aW9uXSk7XG4gIHJldHVybiBlcnJvcjtcbn1cblxuLyoqXG4gKiBSZW5kZXIgYSBoZWxwZnVsIGRlc2NyaXB0aW9uIG9mIHRoZSBsb2NhdGlvbiBvZiB0aGUgZXJyb3IgaW4gdGhlIEdyYXBoUUxcbiAqIFNvdXJjZSBkb2N1bWVudC5cbiAqL1xuZnVuY3Rpb24gaGlnaGxpZ2h0U291cmNlQXRMb2NhdGlvbihzb3VyY2UsIGxvY2F0aW9uKSB7XG4gIHZhciBsaW5lID0gbG9jYXRpb24ubGluZTtcbiAgdmFyIHByZXZMaW5lTnVtID0gKGxpbmUgLSAxKS50b1N0cmluZygpO1xuICB2YXIgbGluZU51bSA9IGxpbmUudG9TdHJpbmcoKTtcbiAgdmFyIG5leHRMaW5lTnVtID0gKGxpbmUgKyAxKS50b1N0cmluZygpO1xuICB2YXIgcGFkTGVuID0gbmV4dExpbmVOdW0ubGVuZ3RoO1xuICB2YXIgbGluZXMgPSBzb3VyY2UuYm9keS5zcGxpdCgvXFxyXFxufFtcXG5cXHJdL2cpO1xuICByZXR1cm4gKGxpbmUgPj0gMiA/IGxwYWQocGFkTGVuLCBwcmV2TGluZU51bSkgKyAnOiAnICsgbGluZXNbbGluZSAtIDJdICsgJ1xcbicgOiAnJykgKyBscGFkKHBhZExlbiwgbGluZU51bSkgKyAnOiAnICsgbGluZXNbbGluZSAtIDFdICsgJ1xcbicgKyBBcnJheSgyICsgcGFkTGVuICsgbG9jYXRpb24uY29sdW1uKS5qb2luKCcgJykgKyAnXlxcbicgKyAobGluZSA8IGxpbmVzLmxlbmd0aCA/IGxwYWQocGFkTGVuLCBuZXh0TGluZU51bSkgKyAnOiAnICsgbGluZXNbbGluZV0gKyAnXFxuJyA6ICcnKTtcbn1cblxuZnVuY3Rpb24gbHBhZChsZW4sIHN0cikge1xuICByZXR1cm4gQXJyYXkobGVuIC0gc3RyLmxlbmd0aCArIDEpLmpvaW4oJyAnKSArIHN0cjtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGludmFyaWFudDtcblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogIENvcHlyaWdodCAoYykgMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4vLyBOYW1lXG5cbnZhciBOQU1FID0gZXhwb3J0cy5OQU1FID0gJ05hbWUnO1xuXG4vLyBEb2N1bWVudFxuXG52YXIgRE9DVU1FTlQgPSBleHBvcnRzLkRPQ1VNRU5UID0gJ0RvY3VtZW50JztcbnZhciBPUEVSQVRJT05fREVGSU5JVElPTiA9IGV4cG9ydHMuT1BFUkFUSU9OX0RFRklOSVRJT04gPSAnT3BlcmF0aW9uRGVmaW5pdGlvbic7XG52YXIgVkFSSUFCTEVfREVGSU5JVElPTiA9IGV4cG9ydHMuVkFSSUFCTEVfREVGSU5JVElPTiA9ICdWYXJpYWJsZURlZmluaXRpb24nO1xudmFyIFZBUklBQkxFID0gZXhwb3J0cy5WQVJJQUJMRSA9ICdWYXJpYWJsZSc7XG52YXIgU0VMRUNUSU9OX1NFVCA9IGV4cG9ydHMuU0VMRUNUSU9OX1NFVCA9ICdTZWxlY3Rpb25TZXQnO1xudmFyIEZJRUxEID0gZXhwb3J0cy5GSUVMRCA9ICdGaWVsZCc7XG52YXIgQVJHVU1FTlQgPSBleHBvcnRzLkFSR1VNRU5UID0gJ0FyZ3VtZW50JztcblxuLy8gRnJhZ21lbnRzXG5cbnZhciBGUkFHTUVOVF9TUFJFQUQgPSBleHBvcnRzLkZSQUdNRU5UX1NQUkVBRCA9ICdGcmFnbWVudFNwcmVhZCc7XG52YXIgSU5MSU5FX0ZSQUdNRU5UID0gZXhwb3J0cy5JTkxJTkVfRlJBR01FTlQgPSAnSW5saW5lRnJhZ21lbnQnO1xudmFyIEZSQUdNRU5UX0RFRklOSVRJT04gPSBleHBvcnRzLkZSQUdNRU5UX0RFRklOSVRJT04gPSAnRnJhZ21lbnREZWZpbml0aW9uJztcblxuLy8gVmFsdWVzXG5cbnZhciBJTlQgPSBleHBvcnRzLklOVCA9ICdJbnRWYWx1ZSc7XG52YXIgRkxPQVQgPSBleHBvcnRzLkZMT0FUID0gJ0Zsb2F0VmFsdWUnO1xudmFyIFNUUklORyA9IGV4cG9ydHMuU1RSSU5HID0gJ1N0cmluZ1ZhbHVlJztcbnZhciBCT09MRUFOID0gZXhwb3J0cy5CT09MRUFOID0gJ0Jvb2xlYW5WYWx1ZSc7XG52YXIgTlVMTCA9IGV4cG9ydHMuTlVMTCA9ICdOdWxsVmFsdWUnO1xudmFyIEVOVU0gPSBleHBvcnRzLkVOVU0gPSAnRW51bVZhbHVlJztcbnZhciBMSVNUID0gZXhwb3J0cy5MSVNUID0gJ0xpc3RWYWx1ZSc7XG52YXIgT0JKRUNUID0gZXhwb3J0cy5PQkpFQ1QgPSAnT2JqZWN0VmFsdWUnO1xudmFyIE9CSkVDVF9GSUVMRCA9IGV4cG9ydHMuT0JKRUNUX0ZJRUxEID0gJ09iamVjdEZpZWxkJztcblxuLy8gRGlyZWN0aXZlc1xuXG52YXIgRElSRUNUSVZFID0gZXhwb3J0cy5ESVJFQ1RJVkUgPSAnRGlyZWN0aXZlJztcblxuLy8gVHlwZXNcblxudmFyIE5BTUVEX1RZUEUgPSBleHBvcnRzLk5BTUVEX1RZUEUgPSAnTmFtZWRUeXBlJztcbnZhciBMSVNUX1RZUEUgPSBleHBvcnRzLkxJU1RfVFlQRSA9ICdMaXN0VHlwZSc7XG52YXIgTk9OX05VTExfVFlQRSA9IGV4cG9ydHMuTk9OX05VTExfVFlQRSA9ICdOb25OdWxsVHlwZSc7XG5cbi8vIFR5cGUgU3lzdGVtIERlZmluaXRpb25zXG5cbnZhciBTQ0hFTUFfREVGSU5JVElPTiA9IGV4cG9ydHMuU0NIRU1BX0RFRklOSVRJT04gPSAnU2NoZW1hRGVmaW5pdGlvbic7XG52YXIgT1BFUkFUSU9OX1RZUEVfREVGSU5JVElPTiA9IGV4cG9ydHMuT1BFUkFUSU9OX1RZUEVfREVGSU5JVElPTiA9ICdPcGVyYXRpb25UeXBlRGVmaW5pdGlvbic7XG5cbi8vIFR5cGUgRGVmaW5pdGlvbnNcblxudmFyIFNDQUxBUl9UWVBFX0RFRklOSVRJT04gPSBleHBvcnRzLlNDQUxBUl9UWVBFX0RFRklOSVRJT04gPSAnU2NhbGFyVHlwZURlZmluaXRpb24nO1xudmFyIE9CSkVDVF9UWVBFX0RFRklOSVRJT04gPSBleHBvcnRzLk9CSkVDVF9UWVBFX0RFRklOSVRJT04gPSAnT2JqZWN0VHlwZURlZmluaXRpb24nO1xudmFyIEZJRUxEX0RFRklOSVRJT04gPSBleHBvcnRzLkZJRUxEX0RFRklOSVRJT04gPSAnRmllbGREZWZpbml0aW9uJztcbnZhciBJTlBVVF9WQUxVRV9ERUZJTklUSU9OID0gZXhwb3J0cy5JTlBVVF9WQUxVRV9ERUZJTklUSU9OID0gJ0lucHV0VmFsdWVEZWZpbml0aW9uJztcbnZhciBJTlRFUkZBQ0VfVFlQRV9ERUZJTklUSU9OID0gZXhwb3J0cy5JTlRFUkZBQ0VfVFlQRV9ERUZJTklUSU9OID0gJ0ludGVyZmFjZVR5cGVEZWZpbml0aW9uJztcbnZhciBVTklPTl9UWVBFX0RFRklOSVRJT04gPSBleHBvcnRzLlVOSU9OX1RZUEVfREVGSU5JVElPTiA9ICdVbmlvblR5cGVEZWZpbml0aW9uJztcbnZhciBFTlVNX1RZUEVfREVGSU5JVElPTiA9IGV4cG9ydHMuRU5VTV9UWVBFX0RFRklOSVRJT04gPSAnRW51bVR5cGVEZWZpbml0aW9uJztcbnZhciBFTlVNX1ZBTFVFX0RFRklOSVRJT04gPSBleHBvcnRzLkVOVU1fVkFMVUVfREVGSU5JVElPTiA9ICdFbnVtVmFsdWVEZWZpbml0aW9uJztcbnZhciBJTlBVVF9PQkpFQ1RfVFlQRV9ERUZJTklUSU9OID0gZXhwb3J0cy5JTlBVVF9PQkpFQ1RfVFlQRV9ERUZJTklUSU9OID0gJ0lucHV0T2JqZWN0VHlwZURlZmluaXRpb24nO1xuXG4vLyBUeXBlIEV4dGVuc2lvbnNcblxudmFyIFRZUEVfRVhURU5TSU9OX0RFRklOSVRJT04gPSBleHBvcnRzLlRZUEVfRVhURU5TSU9OX0RFRklOSVRJT04gPSAnVHlwZUV4dGVuc2lvbkRlZmluaXRpb24nO1xuXG4vLyBEaXJlY3RpdmUgRGVmaW5pdGlvbnNcblxudmFyIERJUkVDVElWRV9ERUZJTklUSU9OID0gZXhwb3J0cy5ESVJFQ1RJVkVfREVGSU5JVElPTiA9ICdEaXJlY3RpdmVEZWZpbml0aW9uJzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlRva2VuS2luZCA9IHVuZGVmaW5lZDtcbmV4cG9ydHMuY3JlYXRlTGV4ZXIgPSBjcmVhdGVMZXhlcjtcbmV4cG9ydHMuZ2V0VG9rZW5EZXNjID0gZ2V0VG9rZW5EZXNjO1xuXG52YXIgX2Vycm9yID0gcmVxdWlyZSgnLi4vZXJyb3InKTtcblxuLyoqXG4gKiBHaXZlbiBhIFNvdXJjZSBvYmplY3QsIHRoaXMgcmV0dXJucyBhIExleGVyIGZvciB0aGF0IHNvdXJjZS5cbiAqIEEgTGV4ZXIgaXMgYSBzdGF0ZWZ1bCBzdHJlYW0gZ2VuZXJhdG9yIGluIHRoYXQgZXZlcnkgdGltZVxuICogaXQgaXMgYWR2YW5jZWQsIGl0IHJldHVybnMgdGhlIG5leHQgdG9rZW4gaW4gdGhlIFNvdXJjZS4gQXNzdW1pbmcgdGhlXG4gKiBzb3VyY2UgbGV4ZXMsIHRoZSBmaW5hbCBUb2tlbiBlbWl0dGVkIGJ5IHRoZSBsZXhlciB3aWxsIGJlIG9mIGtpbmRcbiAqIEVPRiwgYWZ0ZXIgd2hpY2ggdGhlIGxleGVyIHdpbGwgcmVwZWF0ZWRseSByZXR1cm4gdGhlIHNhbWUgRU9GIHRva2VuXG4gKiB3aGVuZXZlciBjYWxsZWQuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUxleGVyKHNvdXJjZSwgb3B0aW9ucykge1xuICB2YXIgc3RhcnRPZkZpbGVUb2tlbiA9IG5ldyBUb2soU09GLCAwLCAwLCAwLCAwLCBudWxsKTtcbiAgdmFyIGxleGVyID0ge1xuICAgIHNvdXJjZTogc291cmNlLFxuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgbGFzdFRva2VuOiBzdGFydE9mRmlsZVRva2VuLFxuICAgIHRva2VuOiBzdGFydE9mRmlsZVRva2VuLFxuICAgIGxpbmU6IDEsXG4gICAgbGluZVN0YXJ0OiAwLFxuICAgIGFkdmFuY2U6IGFkdmFuY2VMZXhlclxuICB9O1xuICByZXR1cm4gbGV4ZXI7XG59IC8qICAvXG4gIC8qKlxuICAgKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICAgKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICpcbiAgICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICAgKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gICAqICBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAgICovXG5cbmZ1bmN0aW9uIGFkdmFuY2VMZXhlcigpIHtcbiAgdmFyIHRva2VuID0gdGhpcy5sYXN0VG9rZW4gPSB0aGlzLnRva2VuO1xuICBpZiAodG9rZW4ua2luZCAhPT0gRU9GKSB7XG4gICAgZG8ge1xuICAgICAgdG9rZW4gPSB0b2tlbi5uZXh0ID0gcmVhZFRva2VuKHRoaXMsIHRva2VuKTtcbiAgICB9IHdoaWxlICh0b2tlbi5raW5kID09PSBDT01NRU5UKTtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cbiAgcmV0dXJuIHRva2VuO1xufVxuXG4vKipcbiAqIFRoZSByZXR1cm4gdHlwZSBvZiBjcmVhdGVMZXhlci5cbiAqL1xuXG5cbi8vIEVhY2gga2luZCBvZiB0b2tlbi5cbnZhciBTT0YgPSAnPFNPRj4nO1xudmFyIEVPRiA9ICc8RU9GPic7XG52YXIgQkFORyA9ICchJztcbnZhciBET0xMQVIgPSAnJCc7XG52YXIgUEFSRU5fTCA9ICcoJztcbnZhciBQQVJFTl9SID0gJyknO1xudmFyIFNQUkVBRCA9ICcuLi4nO1xudmFyIENPTE9OID0gJzonO1xudmFyIEVRVUFMUyA9ICc9JztcbnZhciBBVCA9ICdAJztcbnZhciBCUkFDS0VUX0wgPSAnWyc7XG52YXIgQlJBQ0tFVF9SID0gJ10nO1xudmFyIEJSQUNFX0wgPSAneyc7XG52YXIgUElQRSA9ICd8JztcbnZhciBCUkFDRV9SID0gJ30nO1xudmFyIE5BTUUgPSAnTmFtZSc7XG52YXIgSU5UID0gJ0ludCc7XG52YXIgRkxPQVQgPSAnRmxvYXQnO1xudmFyIFNUUklORyA9ICdTdHJpbmcnO1xudmFyIENPTU1FTlQgPSAnQ29tbWVudCc7XG5cbi8qKlxuICogQW4gZXhwb3J0ZWQgZW51bSBkZXNjcmliaW5nIHRoZSBkaWZmZXJlbnQga2luZHMgb2YgdG9rZW5zIHRoYXQgdGhlXG4gKiBsZXhlciBlbWl0cy5cbiAqL1xudmFyIFRva2VuS2luZCA9IGV4cG9ydHMuVG9rZW5LaW5kID0ge1xuICBTT0Y6IFNPRixcbiAgRU9GOiBFT0YsXG4gIEJBTkc6IEJBTkcsXG4gIERPTExBUjogRE9MTEFSLFxuICBQQVJFTl9MOiBQQVJFTl9MLFxuICBQQVJFTl9SOiBQQVJFTl9SLFxuICBTUFJFQUQ6IFNQUkVBRCxcbiAgQ09MT046IENPTE9OLFxuICBFUVVBTFM6IEVRVUFMUyxcbiAgQVQ6IEFULFxuICBCUkFDS0VUX0w6IEJSQUNLRVRfTCxcbiAgQlJBQ0tFVF9SOiBCUkFDS0VUX1IsXG4gIEJSQUNFX0w6IEJSQUNFX0wsXG4gIFBJUEU6IFBJUEUsXG4gIEJSQUNFX1I6IEJSQUNFX1IsXG4gIE5BTUU6IE5BTUUsXG4gIElOVDogSU5ULFxuICBGTE9BVDogRkxPQVQsXG4gIFNUUklORzogU1RSSU5HLFxuICBDT01NRU5UOiBDT01NRU5UXG59O1xuXG4vKipcbiAqIEEgaGVscGVyIGZ1bmN0aW9uIHRvIGRlc2NyaWJlIGEgdG9rZW4gYXMgYSBzdHJpbmcgZm9yIGRlYnVnZ2luZ1xuICovXG5mdW5jdGlvbiBnZXRUb2tlbkRlc2ModG9rZW4pIHtcbiAgdmFyIHZhbHVlID0gdG9rZW4udmFsdWU7XG4gIHJldHVybiB2YWx1ZSA/IHRva2VuLmtpbmQgKyAnIFwiJyArIHZhbHVlICsgJ1wiJyA6IHRva2VuLmtpbmQ7XG59XG5cbnZhciBjaGFyQ29kZUF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0O1xudmFyIHNsaWNlID0gU3RyaW5nLnByb3RvdHlwZS5zbGljZTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnN0cnVjdGluZyB0aGUgVG9rZW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBUb2soa2luZCwgc3RhcnQsIGVuZCwgbGluZSwgY29sdW1uLCBwcmV2LCB2YWx1ZSkge1xuICB0aGlzLmtpbmQgPSBraW5kO1xuICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gIHRoaXMuZW5kID0gZW5kO1xuICB0aGlzLmxpbmUgPSBsaW5lO1xuICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB0aGlzLnByZXYgPSBwcmV2O1xuICB0aGlzLm5leHQgPSBudWxsO1xufVxuXG4vLyBQcmludCBhIHNpbXBsaWZpZWQgZm9ybSB3aGVuIGFwcGVhcmluZyBpbiBKU09OL3V0aWwuaW5zcGVjdC5cblRvay5wcm90b3R5cGUudG9KU09OID0gVG9rLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IHRoaXMua2luZCxcbiAgICB2YWx1ZTogdGhpcy52YWx1ZSxcbiAgICBsaW5lOiB0aGlzLmxpbmUsXG4gICAgY29sdW1uOiB0aGlzLmNvbHVtblxuICB9O1xufTtcblxuZnVuY3Rpb24gcHJpbnRDaGFyQ29kZShjb2RlKSB7XG4gIHJldHVybiAoXG4gICAgLy8gTmFOL3VuZGVmaW5lZCByZXByZXNlbnRzIGFjY2VzcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgZmlsZS5cbiAgICBpc05hTihjb2RlKSA/IEVPRiA6XG4gICAgLy8gVHJ1c3QgSlNPTiBmb3IgQVNDSUkuXG4gICAgY29kZSA8IDB4MDA3RiA/IEpTT04uc3RyaW5naWZ5KFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSkpIDpcbiAgICAvLyBPdGhlcndpc2UgcHJpbnQgdGhlIGVzY2FwZWQgZm9ybS5cbiAgICAnXCJcXFxcdScgKyAoJzAwJyArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkpLnNsaWNlKC00KSArICdcIidcbiAgKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuZXh0IHRva2VuIGZyb20gdGhlIHNvdXJjZSBzdGFydGluZyBhdCB0aGUgZ2l2ZW4gcG9zaXRpb24uXG4gKlxuICogVGhpcyBza2lwcyBvdmVyIHdoaXRlc3BhY2UgYW5kIGNvbW1lbnRzIHVudGlsIGl0IGZpbmRzIHRoZSBuZXh0IGxleGFibGVcbiAqIHRva2VuLCB0aGVuIGxleGVzIHB1bmN0dWF0b3JzIGltbWVkaWF0ZWx5IG9yIGNhbGxzIHRoZSBhcHByb3ByaWF0ZSBoZWxwZXJcbiAqIGZ1bmN0aW9uIGZvciBtb3JlIGNvbXBsaWNhdGVkIHRva2Vucy5cbiAqL1xuZnVuY3Rpb24gcmVhZFRva2VuKGxleGVyLCBwcmV2KSB7XG4gIHZhciBzb3VyY2UgPSBsZXhlci5zb3VyY2U7XG4gIHZhciBib2R5ID0gc291cmNlLmJvZHk7XG4gIHZhciBib2R5TGVuZ3RoID0gYm9keS5sZW5ndGg7XG5cbiAgdmFyIHBvc2l0aW9uID0gcG9zaXRpb25BZnRlcldoaXRlc3BhY2UoYm9keSwgcHJldi5lbmQsIGxleGVyKTtcbiAgdmFyIGxpbmUgPSBsZXhlci5saW5lO1xuICB2YXIgY29sID0gMSArIHBvc2l0aW9uIC0gbGV4ZXIubGluZVN0YXJ0O1xuXG4gIGlmIChwb3NpdGlvbiA+PSBib2R5TGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2soRU9GLCBib2R5TGVuZ3RoLCBib2R5TGVuZ3RoLCBsaW5lLCBjb2wsIHByZXYpO1xuICB9XG5cbiAgdmFyIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24pO1xuXG4gIC8vIFNvdXJjZUNoYXJhY3RlclxuICBpZiAoY29kZSA8IDB4MDAyMCAmJiBjb2RlICE9PSAweDAwMDkgJiYgY29kZSAhPT0gMHgwMDBBICYmIGNvZGUgIT09IDB4MDAwRCkge1xuICAgIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sICdDYW5ub3QgY29udGFpbiB0aGUgaW52YWxpZCBjaGFyYWN0ZXIgJyArIHByaW50Q2hhckNvZGUoY29kZSkgKyAnLicpO1xuICB9XG5cbiAgc3dpdGNoIChjb2RlKSB7XG4gICAgLy8gIVxuICAgIGNhc2UgMzM6XG4gICAgICByZXR1cm4gbmV3IFRvayhCQU5HLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vICNcbiAgICBjYXNlIDM1OlxuICAgICAgcmV0dXJuIHJlYWRDb21tZW50KHNvdXJjZSwgcG9zaXRpb24sIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gJFxuICAgIGNhc2UgMzY6XG4gICAgICByZXR1cm4gbmV3IFRvayhET0xMQVIsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gKFxuICAgIGNhc2UgNDA6XG4gICAgICByZXR1cm4gbmV3IFRvayhQQVJFTl9MLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIClcbiAgICBjYXNlIDQxOlxuICAgICAgcmV0dXJuIG5ldyBUb2soUEFSRU5fUiwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyAuXG4gICAgY2FzZSA0NjpcbiAgICAgIGlmIChjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24gKyAxKSA9PT0gNDYgJiYgY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uICsgMikgPT09IDQ2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVG9rKFNQUkVBRCwgcG9zaXRpb24sIHBvc2l0aW9uICsgMywgbGluZSwgY29sLCBwcmV2KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIC8vIDpcbiAgICBjYXNlIDU4OlxuICAgICAgcmV0dXJuIG5ldyBUb2soQ09MT04sIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gPVxuICAgIGNhc2UgNjE6XG4gICAgICByZXR1cm4gbmV3IFRvayhFUVVBTFMsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gQFxuICAgIGNhc2UgNjQ6XG4gICAgICByZXR1cm4gbmV3IFRvayhBVCwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyBbXG4gICAgY2FzZSA5MTpcbiAgICAgIHJldHVybiBuZXcgVG9rKEJSQUNLRVRfTCwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyBdXG4gICAgY2FzZSA5MzpcbiAgICAgIHJldHVybiBuZXcgVG9rKEJSQUNLRVRfUiwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyB7XG4gICAgY2FzZSAxMjM6XG4gICAgICByZXR1cm4gbmV3IFRvayhCUkFDRV9MLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAxLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIHxcbiAgICBjYXNlIDEyNDpcbiAgICAgIHJldHVybiBuZXcgVG9rKFBJUEUsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldik7XG4gICAgLy8gfVxuICAgIGNhc2UgMTI1OlxuICAgICAgcmV0dXJuIG5ldyBUb2soQlJBQ0VfUiwgcG9zaXRpb24sIHBvc2l0aW9uICsgMSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyBBLVogXyBhLXpcbiAgICBjYXNlIDY1OmNhc2UgNjY6Y2FzZSA2NzpjYXNlIDY4OmNhc2UgNjk6Y2FzZSA3MDpjYXNlIDcxOmNhc2UgNzI6XG4gICAgY2FzZSA3MzpjYXNlIDc0OmNhc2UgNzU6Y2FzZSA3NjpjYXNlIDc3OmNhc2UgNzg6Y2FzZSA3OTpjYXNlIDgwOlxuICAgIGNhc2UgODE6Y2FzZSA4MjpjYXNlIDgzOmNhc2UgODQ6Y2FzZSA4NTpjYXNlIDg2OmNhc2UgODc6Y2FzZSA4ODpcbiAgICBjYXNlIDg5OmNhc2UgOTA6XG4gICAgY2FzZSA5NTpcbiAgICBjYXNlIDk3OmNhc2UgOTg6Y2FzZSA5OTpjYXNlIDEwMDpjYXNlIDEwMTpjYXNlIDEwMjpjYXNlIDEwMzpjYXNlIDEwNDpcbiAgICBjYXNlIDEwNTpjYXNlIDEwNjpjYXNlIDEwNzpjYXNlIDEwODpjYXNlIDEwOTpjYXNlIDExMDpjYXNlIDExMTpcbiAgICBjYXNlIDExMjpjYXNlIDExMzpjYXNlIDExNDpjYXNlIDExNTpjYXNlIDExNjpjYXNlIDExNzpjYXNlIDExODpcbiAgICBjYXNlIDExOTpjYXNlIDEyMDpjYXNlIDEyMTpjYXNlIDEyMjpcbiAgICAgIHJldHVybiByZWFkTmFtZShzb3VyY2UsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYpO1xuICAgIC8vIC0gMC05XG4gICAgY2FzZSA0NTpcbiAgICBjYXNlIDQ4OmNhc2UgNDk6Y2FzZSA1MDpjYXNlIDUxOmNhc2UgNTI6XG4gICAgY2FzZSA1MzpjYXNlIDU0OmNhc2UgNTU6Y2FzZSA1NjpjYXNlIDU3OlxuICAgICAgcmV0dXJuIHJlYWROdW1iZXIoc291cmNlLCBwb3NpdGlvbiwgY29kZSwgbGluZSwgY29sLCBwcmV2KTtcbiAgICAvLyBcIlxuICAgIGNhc2UgMzQ6XG4gICAgICByZXR1cm4gcmVhZFN0cmluZyhzb3VyY2UsIHBvc2l0aW9uLCBsaW5lLCBjb2wsIHByZXYpO1xuICB9XG5cbiAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikoc291cmNlLCBwb3NpdGlvbiwgdW5leHBlY3RlZENoYXJhY3Rlck1lc3NhZ2UoY29kZSkpO1xufVxuXG4vKipcbiAqIFJlcG9ydCBhIG1lc3NhZ2UgdGhhdCBhbiB1bmV4cGVjdGVkIGNoYXJhY3RlciB3YXMgZW5jb3VudGVyZWQuXG4gKi9cbmZ1bmN0aW9uIHVuZXhwZWN0ZWRDaGFyYWN0ZXJNZXNzYWdlKGNvZGUpIHtcbiAgaWYgKGNvZGUgPT09IDM5KSB7XG4gICAgLy8gJ1xuICAgIHJldHVybiAnVW5leHBlY3RlZCBzaW5nbGUgcXVvdGUgY2hhcmFjdGVyIChcXCcpLCBkaWQgeW91IG1lYW4gdG8gdXNlICcgKyAnYSBkb3VibGUgcXVvdGUgKFwiKT8nO1xuICB9XG5cbiAgcmV0dXJuICdDYW5ub3QgcGFyc2UgdGhlIHVuZXhwZWN0ZWQgY2hhcmFjdGVyICcgKyBwcmludENoYXJDb2RlKGNvZGUpICsgJy4nO1xufVxuXG4vKipcbiAqIFJlYWRzIGZyb20gYm9keSBzdGFydGluZyBhdCBzdGFydFBvc2l0aW9uIHVudGlsIGl0IGZpbmRzIGEgbm9uLXdoaXRlc3BhY2VcbiAqIG9yIGNvbW1lbnRlZCBjaGFyYWN0ZXIsIHRoZW4gcmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhhdCBjaGFyYWN0ZXIgZm9yXG4gKiBsZXhpbmcuXG4gKi9cbmZ1bmN0aW9uIHBvc2l0aW9uQWZ0ZXJXaGl0ZXNwYWNlKGJvZHksIHN0YXJ0UG9zaXRpb24sIGxleGVyKSB7XG4gIHZhciBib2R5TGVuZ3RoID0gYm9keS5sZW5ndGg7XG4gIHZhciBwb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb247XG4gIHdoaWxlIChwb3NpdGlvbiA8IGJvZHlMZW5ndGgpIHtcbiAgICB2YXIgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbik7XG4gICAgLy8gdGFiIHwgc3BhY2UgfCBjb21tYSB8IEJPTVxuICAgIGlmIChjb2RlID09PSA5IHx8IGNvZGUgPT09IDMyIHx8IGNvZGUgPT09IDQ0IHx8IGNvZGUgPT09IDB4RkVGRikge1xuICAgICAgKytwb3NpdGlvbjtcbiAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDEwKSB7XG4gICAgICAvLyBuZXcgbGluZVxuICAgICAgKytwb3NpdGlvbjtcbiAgICAgICsrbGV4ZXIubGluZTtcbiAgICAgIGxleGVyLmxpbmVTdGFydCA9IHBvc2l0aW9uO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMTMpIHtcbiAgICAgIC8vIGNhcnJpYWdlIHJldHVyblxuICAgICAgaWYgKGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbiArIDEpID09PSAxMCkge1xuICAgICAgICBwb3NpdGlvbiArPSAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKytwb3NpdGlvbjtcbiAgICAgIH1cbiAgICAgICsrbGV4ZXIubGluZTtcbiAgICAgIGxleGVyLmxpbmVTdGFydCA9IHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvc2l0aW9uO1xufVxuXG4vKipcbiAqIFJlYWRzIGEgY29tbWVudCB0b2tlbiBmcm9tIHRoZSBzb3VyY2UgZmlsZS5cbiAqXG4gKiAjW1xcdTAwMDlcXHUwMDIwLVxcdUZGRkZdKlxuICovXG5mdW5jdGlvbiByZWFkQ29tbWVudChzb3VyY2UsIHN0YXJ0LCBsaW5lLCBjb2wsIHByZXYpIHtcbiAgdmFyIGJvZHkgPSBzb3VyY2UuYm9keTtcbiAgdmFyIGNvZGUgPSB2b2lkIDA7XG4gIHZhciBwb3NpdGlvbiA9IHN0YXJ0O1xuXG4gIGRvIHtcbiAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksICsrcG9zaXRpb24pO1xuICB9IHdoaWxlIChjb2RlICE9PSBudWxsICYmIChcbiAgLy8gU291cmNlQ2hhcmFjdGVyIGJ1dCBub3QgTGluZVRlcm1pbmF0b3JcbiAgY29kZSA+IDB4MDAxRiB8fCBjb2RlID09PSAweDAwMDkpKTtcblxuICByZXR1cm4gbmV3IFRvayhDT01NRU5ULCBzdGFydCwgcG9zaXRpb24sIGxpbmUsIGNvbCwgcHJldiwgc2xpY2UuY2FsbChib2R5LCBzdGFydCArIDEsIHBvc2l0aW9uKSk7XG59XG5cbi8qKlxuICogUmVhZHMgYSBudW1iZXIgdG9rZW4gZnJvbSB0aGUgc291cmNlIGZpbGUsIGVpdGhlciBhIGZsb2F0XG4gKiBvciBhbiBpbnQgZGVwZW5kaW5nIG9uIHdoZXRoZXIgYSBkZWNpbWFsIHBvaW50IGFwcGVhcnMuXG4gKlxuICogSW50OiAgIC0/KDB8WzEtOV1bMC05XSopXG4gKiBGbG9hdDogLT8oMHxbMS05XVswLTldKikoXFwuWzAtOV0rKT8oKEV8ZSkoK3wtKT9bMC05XSspP1xuICovXG5mdW5jdGlvbiByZWFkTnVtYmVyKHNvdXJjZSwgc3RhcnQsIGZpcnN0Q29kZSwgbGluZSwgY29sLCBwcmV2KSB7XG4gIHZhciBib2R5ID0gc291cmNlLmJvZHk7XG4gIHZhciBjb2RlID0gZmlyc3RDb2RlO1xuICB2YXIgcG9zaXRpb24gPSBzdGFydDtcbiAgdmFyIGlzRmxvYXQgPSBmYWxzZTtcblxuICBpZiAoY29kZSA9PT0gNDUpIHtcbiAgICAvLyAtXG4gICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChjb2RlID09PSA0OCkge1xuICAgIC8vIDBcbiAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksICsrcG9zaXRpb24pO1xuICAgIGlmIChjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTcpIHtcbiAgICAgIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sICdJbnZhbGlkIG51bWJlciwgdW5leHBlY3RlZCBkaWdpdCBhZnRlciAwOiAnICsgcHJpbnRDaGFyQ29kZShjb2RlKSArICcuJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBvc2l0aW9uID0gcmVhZERpZ2l0cyhzb3VyY2UsIHBvc2l0aW9uLCBjb2RlKTtcbiAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChjb2RlID09PSA0Nikge1xuICAgIC8vIC5cbiAgICBpc0Zsb2F0ID0gdHJ1ZTtcblxuICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgKytwb3NpdGlvbik7XG4gICAgcG9zaXRpb24gPSByZWFkRGlnaXRzKHNvdXJjZSwgcG9zaXRpb24sIGNvZGUpO1xuICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKGNvZGUgPT09IDY5IHx8IGNvZGUgPT09IDEwMSkge1xuICAgIC8vIEUgZVxuICAgIGlzRmxvYXQgPSB0cnVlO1xuXG4gICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgICBpZiAoY29kZSA9PT0gNDMgfHwgY29kZSA9PT0gNDUpIHtcbiAgICAgIC8vICsgLVxuICAgICAgY29kZSA9IGNoYXJDb2RlQXQuY2FsbChib2R5LCArK3Bvc2l0aW9uKTtcbiAgICB9XG4gICAgcG9zaXRpb24gPSByZWFkRGlnaXRzKHNvdXJjZSwgcG9zaXRpb24sIGNvZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUb2soaXNGbG9hdCA/IEZMT0FUIDogSU5ULCBzdGFydCwgcG9zaXRpb24sIGxpbmUsIGNvbCwgcHJldiwgc2xpY2UuY2FsbChib2R5LCBzdGFydCwgcG9zaXRpb24pKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBuZXcgcG9zaXRpb24gaW4gdGhlIHNvdXJjZSBhZnRlciByZWFkaW5nIGRpZ2l0cy5cbiAqL1xuZnVuY3Rpb24gcmVhZERpZ2l0cyhzb3VyY2UsIHN0YXJ0LCBmaXJzdENvZGUpIHtcbiAgdmFyIGJvZHkgPSBzb3VyY2UuYm9keTtcbiAgdmFyIHBvc2l0aW9uID0gc3RhcnQ7XG4gIHZhciBjb2RlID0gZmlyc3RDb2RlO1xuICBpZiAoY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3KSB7XG4gICAgLy8gMCAtIDlcbiAgICBkbyB7XG4gICAgICBjb2RlID0gY2hhckNvZGVBdC5jYWxsKGJvZHksICsrcG9zaXRpb24pO1xuICAgIH0gd2hpbGUgKGNvZGUgPj0gNDggJiYgY29kZSA8PSA1Nyk7IC8vIDAgLSA5XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG4gIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sICdJbnZhbGlkIG51bWJlciwgZXhwZWN0ZWQgZGlnaXQgYnV0IGdvdDogJyArIHByaW50Q2hhckNvZGUoY29kZSkgKyAnLicpO1xufVxuXG4vKipcbiAqIFJlYWRzIGEgc3RyaW5nIHRva2VuIGZyb20gdGhlIHNvdXJjZSBmaWxlLlxuICpcbiAqIFwiKFteXCJcXFxcXFx1MDAwQVxcdTAwMERdfChcXFxcKHVbMC05YS1mQS1GXXs0fXxbXCJcXFxcL2JmbnJ0XSkpKSpcIlxuICovXG5mdW5jdGlvbiByZWFkU3RyaW5nKHNvdXJjZSwgc3RhcnQsIGxpbmUsIGNvbCwgcHJldikge1xuICB2YXIgYm9keSA9IHNvdXJjZS5ib2R5O1xuICB2YXIgcG9zaXRpb24gPSBzdGFydCArIDE7XG4gIHZhciBjaHVua1N0YXJ0ID0gcG9zaXRpb247XG4gIHZhciBjb2RlID0gMDtcbiAgdmFyIHZhbHVlID0gJyc7XG5cbiAgd2hpbGUgKHBvc2l0aW9uIDwgYm9keS5sZW5ndGggJiYgKGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24pKSAhPT0gbnVsbCAmJlxuICAvLyBub3QgTGluZVRlcm1pbmF0b3JcbiAgY29kZSAhPT0gMHgwMDBBICYmIGNvZGUgIT09IDB4MDAwRCAmJlxuICAvLyBub3QgUXVvdGUgKFwiKVxuICBjb2RlICE9PSAzNCkge1xuICAgIC8vIFNvdXJjZUNoYXJhY3RlclxuICAgIGlmIChjb2RlIDwgMHgwMDIwICYmIGNvZGUgIT09IDB4MDAwOSkge1xuICAgICAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikoc291cmNlLCBwb3NpdGlvbiwgJ0ludmFsaWQgY2hhcmFjdGVyIHdpdGhpbiBTdHJpbmc6ICcgKyBwcmludENoYXJDb2RlKGNvZGUpICsgJy4nKTtcbiAgICB9XG5cbiAgICArK3Bvc2l0aW9uO1xuICAgIGlmIChjb2RlID09PSA5Mikge1xuICAgICAgLy8gXFxcbiAgICAgIHZhbHVlICs9IHNsaWNlLmNhbGwoYm9keSwgY2h1bmtTdGFydCwgcG9zaXRpb24gLSAxKTtcbiAgICAgIGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24pO1xuICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgdmFsdWUgKz0gJ1wiJzticmVhaztcbiAgICAgICAgY2FzZSA0NzpcbiAgICAgICAgICB2YWx1ZSArPSAnLyc7YnJlYWs7XG4gICAgICAgIGNhc2UgOTI6XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcXFwnO2JyZWFrO1xuICAgICAgICBjYXNlIDk4OlxuICAgICAgICAgIHZhbHVlICs9ICdcXGInO2JyZWFrO1xuICAgICAgICBjYXNlIDEwMjpcbiAgICAgICAgICB2YWx1ZSArPSAnXFxmJzticmVhaztcbiAgICAgICAgY2FzZSAxMTA6XG4gICAgICAgICAgdmFsdWUgKz0gJ1xcbic7YnJlYWs7XG4gICAgICAgIGNhc2UgMTE0OlxuICAgICAgICAgIHZhbHVlICs9ICdcXHInO2JyZWFrO1xuICAgICAgICBjYXNlIDExNjpcbiAgICAgICAgICB2YWx1ZSArPSAnXFx0JzticmVhaztcbiAgICAgICAgY2FzZSAxMTc6XG4gICAgICAgICAgLy8gdVxuICAgICAgICAgIHZhciBjaGFyQ29kZSA9IHVuaUNoYXJDb2RlKGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbiArIDEpLCBjaGFyQ29kZUF0LmNhbGwoYm9keSwgcG9zaXRpb24gKyAyKSwgY2hhckNvZGVBdC5jYWxsKGJvZHksIHBvc2l0aW9uICsgMyksIGNoYXJDb2RlQXQuY2FsbChib2R5LCBwb3NpdGlvbiArIDQpKTtcbiAgICAgICAgICBpZiAoY2hhckNvZGUgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnSW52YWxpZCBjaGFyYWN0ZXIgZXNjYXBlIHNlcXVlbmNlOiAnICsgKCdcXFxcdScgKyBib2R5LnNsaWNlKHBvc2l0aW9uICsgMSwgcG9zaXRpb24gKyA1KSArICcuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXJDb2RlKTtcbiAgICAgICAgICBwb3NpdGlvbiArPSA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93ICgwLCBfZXJyb3Iuc3ludGF4RXJyb3IpKHNvdXJjZSwgcG9zaXRpb24sICdJbnZhbGlkIGNoYXJhY3RlciBlc2NhcGUgc2VxdWVuY2U6IFxcXFwnICsgU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKSArICcuJyk7XG4gICAgICB9XG4gICAgICArK3Bvc2l0aW9uO1xuICAgICAgY2h1bmtTdGFydCA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb2RlICE9PSAzNCkge1xuICAgIC8vIHF1b3RlIChcIilcbiAgICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShzb3VyY2UsIHBvc2l0aW9uLCAnVW50ZXJtaW5hdGVkIHN0cmluZy4nKTtcbiAgfVxuXG4gIHZhbHVlICs9IHNsaWNlLmNhbGwoYm9keSwgY2h1bmtTdGFydCwgcG9zaXRpb24pO1xuICByZXR1cm4gbmV3IFRvayhTVFJJTkcsIHN0YXJ0LCBwb3NpdGlvbiArIDEsIGxpbmUsIGNvbCwgcHJldiwgdmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGZvdXIgaGV4aWRlY2ltYWwgY2hhcnMgdG8gdGhlIGludGVnZXIgdGhhdCB0aGVcbiAqIHN0cmluZyByZXByZXNlbnRzLiBGb3IgZXhhbXBsZSwgdW5pQ2hhckNvZGUoJzAnLCcwJywnMCcsJ2YnKVxuICogd2lsbCByZXR1cm4gMTUsIGFuZCB1bmlDaGFyQ29kZSgnMCcsJzAnLCdmJywnZicpIHJldHVybnMgMjU1LlxuICpcbiAqIFJldHVybnMgYSBuZWdhdGl2ZSBudW1iZXIgb24gZXJyb3IsIGlmIGEgY2hhciB3YXMgaW52YWxpZC5cbiAqXG4gKiBUaGlzIGlzIGltcGxlbWVudGVkIGJ5IG5vdGluZyB0aGF0IGNoYXIyaGV4KCkgcmV0dXJucyAtMSBvbiBlcnJvcixcbiAqIHdoaWNoIG1lYW5zIHRoZSByZXN1bHQgb2YgT1JpbmcgdGhlIGNoYXIyaGV4KCkgd2lsbCBhbHNvIGJlIG5lZ2F0aXZlLlxuICovXG5mdW5jdGlvbiB1bmlDaGFyQ29kZShhLCBiLCBjLCBkKSB7XG4gIHJldHVybiBjaGFyMmhleChhKSA8PCAxMiB8IGNoYXIyaGV4KGIpIDw8IDggfCBjaGFyMmhleChjKSA8PCA0IHwgY2hhcjJoZXgoZCk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBoZXggY2hhcmFjdGVyIHRvIGl0cyBpbnRlZ2VyIHZhbHVlLlxuICogJzAnIGJlY29tZXMgMCwgJzknIGJlY29tZXMgOVxuICogJ0EnIGJlY29tZXMgMTAsICdGJyBiZWNvbWVzIDE1XG4gKiAnYScgYmVjb21lcyAxMCwgJ2YnIGJlY29tZXMgMTVcbiAqXG4gKiBSZXR1cm5zIC0xIG9uIGVycm9yLlxuICovXG5mdW5jdGlvbiBjaGFyMmhleChhKSB7XG4gIHJldHVybiBhID49IDQ4ICYmIGEgPD0gNTcgPyBhIC0gNDggOiAvLyAwLTlcbiAgYSA+PSA2NSAmJiBhIDw9IDcwID8gYSAtIDU1IDogLy8gQS1GXG4gIGEgPj0gOTcgJiYgYSA8PSAxMDIgPyBhIC0gODcgOiAvLyBhLWZcbiAgLTE7XG59XG5cbi8qKlxuICogUmVhZHMgYW4gYWxwaGFudW1lcmljICsgdW5kZXJzY29yZSBuYW1lIGZyb20gdGhlIHNvdXJjZS5cbiAqXG4gKiBbX0EtWmEtel1bXzAtOUEtWmEtel0qXG4gKi9cbmZ1bmN0aW9uIHJlYWROYW1lKHNvdXJjZSwgcG9zaXRpb24sIGxpbmUsIGNvbCwgcHJldikge1xuICB2YXIgYm9keSA9IHNvdXJjZS5ib2R5O1xuICB2YXIgYm9keUxlbmd0aCA9IGJvZHkubGVuZ3RoO1xuICB2YXIgZW5kID0gcG9zaXRpb24gKyAxO1xuICB2YXIgY29kZSA9IDA7XG4gIHdoaWxlIChlbmQgIT09IGJvZHlMZW5ndGggJiYgKGNvZGUgPSBjaGFyQ29kZUF0LmNhbGwoYm9keSwgZW5kKSkgIT09IG51bGwgJiYgKGNvZGUgPT09IDk1IHx8IC8vIF9cbiAgY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3IHx8IC8vIDAtOVxuICBjb2RlID49IDY1ICYmIGNvZGUgPD0gOTAgfHwgLy8gQS1aXG4gIGNvZGUgPj0gOTcgJiYgY29kZSA8PSAxMjIgLy8gYS16XG4gICkpIHtcbiAgICArK2VuZDtcbiAgfVxuICByZXR1cm4gbmV3IFRvayhOQU1FLCBwb3NpdGlvbiwgZW5kLCBsaW5lLCBjb2wsIHByZXYsIHNsaWNlLmNhbGwoYm9keSwgcG9zaXRpb24sIGVuZCkpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2V0TG9jYXRpb24gPSBnZXRMb2NhdGlvbjtcblxuXG4vKipcbiAqIFRha2VzIGEgU291cmNlIGFuZCBhIFVURi04IGNoYXJhY3RlciBvZmZzZXQsIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nXG4gKiBsaW5lIGFuZCBjb2x1bW4gYXMgYSBTb3VyY2VMb2NhdGlvbi5cbiAqL1xuXG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuZnVuY3Rpb24gZ2V0TG9jYXRpb24oc291cmNlLCBwb3NpdGlvbikge1xuICB2YXIgbGluZVJlZ2V4cCA9IC9cXHJcXG58W1xcblxccl0vZztcbiAgdmFyIGxpbmUgPSAxO1xuICB2YXIgY29sdW1uID0gcG9zaXRpb24gKyAxO1xuICB2YXIgbWF0Y2ggPSB2b2lkIDA7XG4gIHdoaWxlICgobWF0Y2ggPSBsaW5lUmVnZXhwLmV4ZWMoc291cmNlLmJvZHkpKSAmJiBtYXRjaC5pbmRleCA8IHBvc2l0aW9uKSB7XG4gICAgbGluZSArPSAxO1xuICAgIGNvbHVtbiA9IHBvc2l0aW9uICsgMSAtIChtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHsgbGluZTogbGluZSwgY29sdW1uOiBjb2x1bW4gfTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbG9jYXRpb24gaW4gYSBTb3VyY2UuXG4gKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5leHBvcnRzLnBhcnNlVmFsdWUgPSBwYXJzZVZhbHVlO1xuZXhwb3J0cy5wYXJzZVR5cGUgPSBwYXJzZVR5cGU7XG5leHBvcnRzLnBhcnNlQ29uc3RWYWx1ZSA9IHBhcnNlQ29uc3RWYWx1ZTtcbmV4cG9ydHMucGFyc2VUeXBlUmVmZXJlbmNlID0gcGFyc2VUeXBlUmVmZXJlbmNlO1xuZXhwb3J0cy5wYXJzZU5hbWVkVHlwZSA9IHBhcnNlTmFtZWRUeXBlO1xuXG52YXIgX3NvdXJjZSA9IHJlcXVpcmUoJy4vc291cmNlJyk7XG5cbnZhciBfZXJyb3IgPSByZXF1aXJlKCcuLi9lcnJvcicpO1xuXG52YXIgX2xleGVyID0gcmVxdWlyZSgnLi9sZXhlcicpO1xuXG52YXIgX2tpbmRzID0gcmVxdWlyZSgnLi9raW5kcycpO1xuXG4vKipcbiAqIEdpdmVuIGEgR3JhcGhRTCBzb3VyY2UsIHBhcnNlcyBpdCBpbnRvIGEgRG9jdW1lbnQuXG4gKiBUaHJvd3MgR3JhcGhRTEVycm9yIGlmIGEgc3ludGF4IGVycm9yIGlzIGVuY291bnRlcmVkLlxuICovXG5cblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gY29udHJvbCBwYXJzZXIgYmVoYXZpb3JcbiAqL1xuXG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2VPYmogPSB0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyA/IG5ldyBfc291cmNlLlNvdXJjZShzb3VyY2UpIDogc291cmNlO1xuICB2YXIgbGV4ZXIgPSAoMCwgX2xleGVyLmNyZWF0ZUxleGVyKShzb3VyY2VPYmosIG9wdGlvbnMgfHwge30pO1xuICByZXR1cm4gcGFyc2VEb2N1bWVudChsZXhlcik7XG59XG5cbi8qKlxuICogR2l2ZW4gYSBzdHJpbmcgY29udGFpbmluZyBhIEdyYXBoUUwgdmFsdWUgKGV4LiBgWzQyXWApLCBwYXJzZSB0aGUgQVNUIGZvclxuICogdGhhdCB2YWx1ZS5cbiAqIFRocm93cyBHcmFwaFFMRXJyb3IgaWYgYSBzeW50YXggZXJyb3IgaXMgZW5jb3VudGVyZWQuXG4gKlxuICogVGhpcyBpcyB1c2VmdWwgd2l0aGluIHRvb2xzIHRoYXQgb3BlcmF0ZSB1cG9uIEdyYXBoUUwgVmFsdWVzIGRpcmVjdGx5IGFuZFxuICogaW4gaXNvbGF0aW9uIG9mIGNvbXBsZXRlIEdyYXBoUUwgZG9jdW1lbnRzLlxuICpcbiAqIENvbnNpZGVyIHByb3ZpZGluZyB0aGUgcmVzdWx0cyB0byB0aGUgdXRpbGl0eSBmdW5jdGlvbjogdmFsdWVGcm9tQVNUKCkuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFsdWUoc291cmNlLCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2VPYmogPSB0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyA/IG5ldyBfc291cmNlLlNvdXJjZShzb3VyY2UpIDogc291cmNlO1xuICB2YXIgbGV4ZXIgPSAoMCwgX2xleGVyLmNyZWF0ZUxleGVyKShzb3VyY2VPYmosIG9wdGlvbnMgfHwge30pO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuU09GKTtcbiAgdmFyIHZhbHVlID0gcGFyc2VWYWx1ZUxpdGVyYWwobGV4ZXIsIGZhbHNlKTtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkVPRik7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIHN0cmluZyBjb250YWluaW5nIGEgR3JhcGhRTCBUeXBlIChleC4gYFtJbnQhXWApLCBwYXJzZSB0aGUgQVNUIGZvclxuICogdGhhdCB0eXBlLlxuICogVGhyb3dzIEdyYXBoUUxFcnJvciBpZiBhIHN5bnRheCBlcnJvciBpcyBlbmNvdW50ZXJlZC5cbiAqXG4gKiBUaGlzIGlzIHVzZWZ1bCB3aXRoaW4gdG9vbHMgdGhhdCBvcGVyYXRlIHVwb24gR3JhcGhRTCBUeXBlcyBkaXJlY3RseSBhbmRcbiAqIGluIGlzb2xhdGlvbiBvZiBjb21wbGV0ZSBHcmFwaFFMIGRvY3VtZW50cy5cbiAqXG4gKiBDb25zaWRlciBwcm92aWRpbmcgdGhlIHJlc3VsdHMgdG8gdGhlIHV0aWxpdHkgZnVuY3Rpb246IHR5cGVGcm9tQVNUKCkuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVHlwZShzb3VyY2UsIG9wdGlvbnMpIHtcbiAgdmFyIHNvdXJjZU9iaiA9IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnID8gbmV3IF9zb3VyY2UuU291cmNlKHNvdXJjZSkgOiBzb3VyY2U7XG4gIHZhciBsZXhlciA9ICgwLCBfbGV4ZXIuY3JlYXRlTGV4ZXIpKHNvdXJjZU9iaiwgb3B0aW9ucyB8fCB7fSk7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5TT0YpO1xuICB2YXIgdHlwZSA9IHBhcnNlVHlwZVJlZmVyZW5jZShsZXhlcik7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FT0YpO1xuICByZXR1cm4gdHlwZTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIG5hbWUgbGV4IHRva2VuIGludG8gYSBuYW1lIHBhcnNlIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTmFtZShsZXhlcikge1xuICB2YXIgdG9rZW4gPSBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSk7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLk5BTUUsXG4gICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgfTtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgcGFyc2luZyBydWxlcyBpbiB0aGUgRG9jdW1lbnQgc2VjdGlvbi5cblxuLyoqXG4gKiBEb2N1bWVudCA6IERlZmluaXRpb24rXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRG9jdW1lbnQobGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5TT0YpO1xuICB2YXIgZGVmaW5pdGlvbnMgPSBbXTtcbiAgZG8ge1xuICAgIGRlZmluaXRpb25zLnB1c2gocGFyc2VEZWZpbml0aW9uKGxleGVyKSk7XG4gIH0gd2hpbGUgKCFza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkVPRikpO1xuXG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkRPQ1VNRU5ULFxuICAgIGRlZmluaXRpb25zOiBkZWZpbml0aW9ucyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogRGVmaW5pdGlvbiA6XG4gKiAgIC0gT3BlcmF0aW9uRGVmaW5pdGlvblxuICogICAtIEZyYWdtZW50RGVmaW5pdGlvblxuICogICAtIFR5cGVTeXN0ZW1EZWZpbml0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGVmaW5pdGlvbihsZXhlcikge1xuICBpZiAocGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MKSkge1xuICAgIHJldHVybiBwYXJzZU9wZXJhdGlvbkRlZmluaXRpb24obGV4ZXIpO1xuICB9XG5cbiAgaWYgKHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSkpIHtcbiAgICBzd2l0Y2ggKGxleGVyLnRva2VuLnZhbHVlKSB7XG4gICAgICAvLyBOb3RlOiBzdWJzY3JpcHRpb24gaXMgYW4gZXhwZXJpbWVudGFsIG5vbi1zcGVjIGFkZGl0aW9uLlxuICAgICAgY2FzZSAncXVlcnknOlxuICAgICAgY2FzZSAnbXV0YXRpb24nOlxuICAgICAgY2FzZSAnc3Vic2NyaXB0aW9uJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlT3BlcmF0aW9uRGVmaW5pdGlvbihsZXhlcik7XG5cbiAgICAgIGNhc2UgJ2ZyYWdtZW50JzpcbiAgICAgICAgcmV0dXJuIHBhcnNlRnJhZ21lbnREZWZpbml0aW9uKGxleGVyKTtcblxuICAgICAgLy8gTm90ZTogdGhlIFR5cGUgU3lzdGVtIElETCBpcyBhbiBleHBlcmltZW50YWwgbm9uLXNwZWMgYWRkaXRpb24uXG4gICAgICBjYXNlICdzY2hlbWEnOlxuICAgICAgY2FzZSAnc2NhbGFyJzpcbiAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgY2FzZSAnaW50ZXJmYWNlJzpcbiAgICAgIGNhc2UgJ3VuaW9uJzpcbiAgICAgIGNhc2UgJ2VudW0nOlxuICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgY2FzZSAnZXh0ZW5kJzpcbiAgICAgIGNhc2UgJ2RpcmVjdGl2ZSc6XG4gICAgICAgIHJldHVybiBwYXJzZVR5cGVTeXN0ZW1EZWZpbml0aW9uKGxleGVyKTtcbiAgICB9XG4gIH1cblxuICB0aHJvdyB1bmV4cGVjdGVkKGxleGVyKTtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgcGFyc2luZyBydWxlcyBpbiB0aGUgT3BlcmF0aW9ucyBzZWN0aW9uLlxuXG4vKipcbiAqIE9wZXJhdGlvbkRlZmluaXRpb24gOlxuICogIC0gU2VsZWN0aW9uU2V0XG4gKiAgLSBPcGVyYXRpb25UeXBlIE5hbWU/IFZhcmlhYmxlRGVmaW5pdGlvbnM/IERpcmVjdGl2ZXM/IFNlbGVjdGlvblNldFxuICovXG5mdW5jdGlvbiBwYXJzZU9wZXJhdGlvbkRlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGlmIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtpbmQ6IF9raW5kcy5PUEVSQVRJT05fREVGSU5JVElPTixcbiAgICAgIG9wZXJhdGlvbjogJ3F1ZXJ5JyxcbiAgICAgIG5hbWU6IG51bGwsXG4gICAgICB2YXJpYWJsZURlZmluaXRpb25zOiBudWxsLFxuICAgICAgZGlyZWN0aXZlczogW10sXG4gICAgICBzZWxlY3Rpb25TZXQ6IHBhcnNlU2VsZWN0aW9uU2V0KGxleGVyKSxcbiAgICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgICB9O1xuICB9XG4gIHZhciBvcGVyYXRpb24gPSBwYXJzZU9wZXJhdGlvblR5cGUobGV4ZXIpO1xuICB2YXIgbmFtZSA9IHZvaWQgMDtcbiAgaWYgKHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSkpIHtcbiAgICBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5PUEVSQVRJT05fREVGSU5JVElPTixcbiAgICBvcGVyYXRpb246IG9wZXJhdGlvbixcbiAgICBuYW1lOiBuYW1lLFxuICAgIHZhcmlhYmxlRGVmaW5pdGlvbnM6IHBhcnNlVmFyaWFibGVEZWZpbml0aW9ucyhsZXhlciksXG4gICAgZGlyZWN0aXZlczogcGFyc2VEaXJlY3RpdmVzKGxleGVyKSxcbiAgICBzZWxlY3Rpb25TZXQ6IHBhcnNlU2VsZWN0aW9uU2V0KGxleGVyKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogT3BlcmF0aW9uVHlwZSA6IG9uZSBvZiBxdWVyeSBtdXRhdGlvbiBzdWJzY3JpcHRpb25cbiAqL1xuZnVuY3Rpb24gcGFyc2VPcGVyYXRpb25UeXBlKGxleGVyKSB7XG4gIHZhciBvcGVyYXRpb25Ub2tlbiA9IGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5OQU1FKTtcbiAgc3dpdGNoIChvcGVyYXRpb25Ub2tlbi52YWx1ZSkge1xuICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgIHJldHVybiAncXVlcnknO1xuICAgIGNhc2UgJ211dGF0aW9uJzpcbiAgICAgIHJldHVybiAnbXV0YXRpb24nO1xuICAgIC8vIE5vdGU6IHN1YnNjcmlwdGlvbiBpcyBhbiBleHBlcmltZW50YWwgbm9uLXNwZWMgYWRkaXRpb24uXG4gICAgY2FzZSAnc3Vic2NyaXB0aW9uJzpcbiAgICAgIHJldHVybiAnc3Vic2NyaXB0aW9uJztcbiAgfVxuXG4gIHRocm93IHVuZXhwZWN0ZWQobGV4ZXIsIG9wZXJhdGlvblRva2VuKTtcbn1cblxuLyoqXG4gKiBWYXJpYWJsZURlZmluaXRpb25zIDogKCBWYXJpYWJsZURlZmluaXRpb24rIClcbiAqL1xuZnVuY3Rpb24gcGFyc2VWYXJpYWJsZURlZmluaXRpb25zKGxleGVyKSB7XG4gIHJldHVybiBwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBBUkVOX0wpID8gbWFueShsZXhlciwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9MLCBwYXJzZVZhcmlhYmxlRGVmaW5pdGlvbiwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9SKSA6IFtdO1xufVxuXG4vKipcbiAqIFZhcmlhYmxlRGVmaW5pdGlvbiA6IFZhcmlhYmxlIDogVHlwZSBEZWZhdWx0VmFsdWU/XG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFyaWFibGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5WQVJJQUJMRV9ERUZJTklUSU9OLFxuICAgIHZhcmlhYmxlOiBwYXJzZVZhcmlhYmxlKGxleGVyKSxcbiAgICB0eXBlOiAoZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkNPTE9OKSwgcGFyc2VUeXBlUmVmZXJlbmNlKGxleGVyKSksXG4gICAgZGVmYXVsdFZhbHVlOiBza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkVRVUFMUykgPyBwYXJzZVZhbHVlTGl0ZXJhbChsZXhlciwgdHJ1ZSkgOiBudWxsLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBWYXJpYWJsZSA6ICQgTmFtZVxuICovXG5mdW5jdGlvbiBwYXJzZVZhcmlhYmxlKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuRE9MTEFSKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuVkFSSUFCTEUsXG4gICAgbmFtZTogcGFyc2VOYW1lKGxleGVyKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogU2VsZWN0aW9uU2V0IDogeyBTZWxlY3Rpb24rIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VTZWxlY3Rpb25TZXQobGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLlNFTEVDVElPTl9TRVQsXG4gICAgc2VsZWN0aW9uczogbWFueShsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MLCBwYXJzZVNlbGVjdGlvbiwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9SKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogU2VsZWN0aW9uIDpcbiAqICAgLSBGaWVsZFxuICogICAtIEZyYWdtZW50U3ByZWFkXG4gKiAgIC0gSW5saW5lRnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gcGFyc2VTZWxlY3Rpb24obGV4ZXIpIHtcbiAgcmV0dXJuIHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuU1BSRUFEKSA/IHBhcnNlRnJhZ21lbnQobGV4ZXIpIDogcGFyc2VGaWVsZChsZXhlcik7XG59XG5cbi8qKlxuICogRmllbGQgOiBBbGlhcz8gTmFtZSBBcmd1bWVudHM/IERpcmVjdGl2ZXM/IFNlbGVjdGlvblNldD9cbiAqXG4gKiBBbGlhcyA6IE5hbWUgOlxuICovXG5mdW5jdGlvbiBwYXJzZUZpZWxkKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuXG4gIHZhciBuYW1lT3JBbGlhcyA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBhbGlhcyA9IHZvaWQgMDtcbiAgdmFyIG5hbWUgPSB2b2lkIDA7XG4gIGlmIChza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkNPTE9OKSkge1xuICAgIGFsaWFzID0gbmFtZU9yQWxpYXM7XG4gICAgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIH0gZWxzZSB7XG4gICAgYWxpYXMgPSBudWxsO1xuICAgIG5hbWUgPSBuYW1lT3JBbGlhcztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkZJRUxELFxuICAgIGFsaWFzOiBhbGlhcyxcbiAgICBuYW1lOiBuYW1lLFxuICAgIGFyZ3VtZW50czogcGFyc2VBcmd1bWVudHMobGV4ZXIpLFxuICAgIGRpcmVjdGl2ZXM6IHBhcnNlRGlyZWN0aXZlcyhsZXhlciksXG4gICAgc2VsZWN0aW9uU2V0OiBwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wpID8gcGFyc2VTZWxlY3Rpb25TZXQobGV4ZXIpIDogbnVsbCxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogQXJndW1lbnRzIDogKCBBcmd1bWVudCsgKVxuICovXG5mdW5jdGlvbiBwYXJzZUFyZ3VtZW50cyhsZXhlcikge1xuICByZXR1cm4gcGVlayhsZXhlciwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9MKSA/IG1hbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuUEFSRU5fTCwgcGFyc2VBcmd1bWVudCwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9SKSA6IFtdO1xufVxuXG4vKipcbiAqIEFyZ3VtZW50IDogTmFtZSA6IFZhbHVlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXJndW1lbnQobGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkFSR1VNRU5ULFxuICAgIG5hbWU6IHBhcnNlTmFtZShsZXhlciksXG4gICAgdmFsdWU6IChleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQ09MT04pLCBwYXJzZVZhbHVlTGl0ZXJhbChsZXhlciwgZmFsc2UpKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8vIEltcGxlbWVudHMgdGhlIHBhcnNpbmcgcnVsZXMgaW4gdGhlIEZyYWdtZW50cyBzZWN0aW9uLlxuXG4vKipcbiAqIENvcnJlc3BvbmRzIHRvIGJvdGggRnJhZ21lbnRTcHJlYWQgYW5kIElubGluZUZyYWdtZW50IGluIHRoZSBzcGVjLlxuICpcbiAqIEZyYWdtZW50U3ByZWFkIDogLi4uIEZyYWdtZW50TmFtZSBEaXJlY3RpdmVzP1xuICpcbiAqIElubGluZUZyYWdtZW50IDogLi4uIFR5cGVDb25kaXRpb24/IERpcmVjdGl2ZXM/IFNlbGVjdGlvblNldFxuICovXG5mdW5jdGlvbiBwYXJzZUZyYWdtZW50KGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuU1BSRUFEKTtcbiAgaWYgKHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSkgJiYgbGV4ZXIudG9rZW4udmFsdWUgIT09ICdvbicpIHtcbiAgICByZXR1cm4ge1xuICAgICAga2luZDogX2tpbmRzLkZSQUdNRU5UX1NQUkVBRCxcbiAgICAgIG5hbWU6IHBhcnNlRnJhZ21lbnROYW1lKGxleGVyKSxcbiAgICAgIGRpcmVjdGl2ZXM6IHBhcnNlRGlyZWN0aXZlcyhsZXhlciksXG4gICAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gICAgfTtcbiAgfVxuICB2YXIgdHlwZUNvbmRpdGlvbiA9IG51bGw7XG4gIGlmIChsZXhlci50b2tlbi52YWx1ZSA9PT0gJ29uJykge1xuICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICB0eXBlQ29uZGl0aW9uID0gcGFyc2VOYW1lZFR5cGUobGV4ZXIpO1xuICB9XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLklOTElORV9GUkFHTUVOVCxcbiAgICB0eXBlQ29uZGl0aW9uOiB0eXBlQ29uZGl0aW9uLFxuICAgIGRpcmVjdGl2ZXM6IHBhcnNlRGlyZWN0aXZlcyhsZXhlciksXG4gICAgc2VsZWN0aW9uU2V0OiBwYXJzZVNlbGVjdGlvblNldChsZXhlciksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEZyYWdtZW50RGVmaW5pdGlvbiA6XG4gKiAgIC0gZnJhZ21lbnQgRnJhZ21lbnROYW1lIG9uIFR5cGVDb25kaXRpb24gRGlyZWN0aXZlcz8gU2VsZWN0aW9uU2V0XG4gKlxuICogVHlwZUNvbmRpdGlvbiA6IE5hbWVkVHlwZVxuICovXG5mdW5jdGlvbiBwYXJzZUZyYWdtZW50RGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2ZyYWdtZW50Jyk7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkZSQUdNRU5UX0RFRklOSVRJT04sXG4gICAgbmFtZTogcGFyc2VGcmFnbWVudE5hbWUobGV4ZXIpLFxuICAgIHR5cGVDb25kaXRpb246IChleHBlY3RLZXl3b3JkKGxleGVyLCAnb24nKSwgcGFyc2VOYW1lZFR5cGUobGV4ZXIpKSxcbiAgICBkaXJlY3RpdmVzOiBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpLFxuICAgIHNlbGVjdGlvblNldDogcGFyc2VTZWxlY3Rpb25TZXQobGV4ZXIpLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBGcmFnbWVudE5hbWUgOiBOYW1lIGJ1dCBub3QgYG9uYFxuICovXG5mdW5jdGlvbiBwYXJzZUZyYWdtZW50TmFtZShsZXhlcikge1xuICBpZiAobGV4ZXIudG9rZW4udmFsdWUgPT09ICdvbicpIHtcbiAgICB0aHJvdyB1bmV4cGVjdGVkKGxleGVyKTtcbiAgfVxuICByZXR1cm4gcGFyc2VOYW1lKGxleGVyKTtcbn1cblxuLy8gSW1wbGVtZW50cyB0aGUgcGFyc2luZyBydWxlcyBpbiB0aGUgVmFsdWVzIHNlY3Rpb24uXG5cbi8qKlxuICogVmFsdWVbQ29uc3RdIDpcbiAqICAgLSBbfkNvbnN0XSBWYXJpYWJsZVxuICogICAtIEludFZhbHVlXG4gKiAgIC0gRmxvYXRWYWx1ZVxuICogICAtIFN0cmluZ1ZhbHVlXG4gKiAgIC0gQm9vbGVhblZhbHVlXG4gKiAgIC0gTnVsbFZhbHVlXG4gKiAgIC0gRW51bVZhbHVlXG4gKiAgIC0gTGlzdFZhbHVlWz9Db25zdF1cbiAqICAgLSBPYmplY3RWYWx1ZVs/Q29uc3RdXG4gKlxuICogQm9vbGVhblZhbHVlIDogb25lIG9mIGB0cnVlYCBgZmFsc2VgXG4gKlxuICogTnVsbFZhbHVlIDogYG51bGxgXG4gKlxuICogRW51bVZhbHVlIDogTmFtZSBidXQgbm90IGB0cnVlYCwgYGZhbHNlYCBvciBgbnVsbGBcbiAqL1xuZnVuY3Rpb24gcGFyc2VWYWx1ZUxpdGVyYWwobGV4ZXIsIGlzQ29uc3QpIHtcbiAgdmFyIHRva2VuID0gbGV4ZXIudG9rZW47XG4gIHN3aXRjaCAodG9rZW4ua2luZCkge1xuICAgIGNhc2UgX2xleGVyLlRva2VuS2luZC5CUkFDS0VUX0w6XG4gICAgICByZXR1cm4gcGFyc2VMaXN0KGxleGVyLCBpc0NvbnN0KTtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTDpcbiAgICAgIHJldHVybiBwYXJzZU9iamVjdChsZXhlciwgaXNDb25zdCk7XG4gICAgY2FzZSBfbGV4ZXIuVG9rZW5LaW5kLklOVDpcbiAgICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtpbmQ6IF9raW5kcy5JTlQsXG4gICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgbG9jOiBsb2MobGV4ZXIsIHRva2VuKVxuICAgICAgfTtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuRkxPQVQ6XG4gICAgICBsZXhlci5hZHZhbmNlKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBraW5kOiBfa2luZHMuRkxPQVQsXG4gICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgbG9jOiBsb2MobGV4ZXIsIHRva2VuKVxuICAgICAgfTtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuU1RSSU5HOlxuICAgICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogX2tpbmRzLlNUUklORyxcbiAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlLFxuICAgICAgICBsb2M6IGxvYyhsZXhlciwgdG9rZW4pXG4gICAgICB9O1xuICAgIGNhc2UgX2xleGVyLlRva2VuS2luZC5OQU1FOlxuICAgICAgaWYgKHRva2VuLnZhbHVlID09PSAndHJ1ZScgfHwgdG9rZW4udmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGtpbmQ6IF9raW5kcy5CT09MRUFOLFxuICAgICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSA9PT0gJ3RydWUnLFxuICAgICAgICAgIGxvYzogbG9jKGxleGVyLCB0b2tlbilcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICdudWxsJykge1xuICAgICAgICBsZXhlci5hZHZhbmNlKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2luZDogX2tpbmRzLk5VTEwsXG4gICAgICAgICAgbG9jOiBsb2MobGV4ZXIsIHRva2VuKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2luZDogX2tpbmRzLkVOVU0sXG4gICAgICAgIHZhbHVlOiB0b2tlbi52YWx1ZSxcbiAgICAgICAgbG9jOiBsb2MobGV4ZXIsIHRva2VuKVxuICAgICAgfTtcbiAgICBjYXNlIF9sZXhlci5Ub2tlbktpbmQuRE9MTEFSOlxuICAgICAgaWYgKCFpc0NvbnN0KSB7XG4gICAgICAgIHJldHVybiBwYXJzZVZhcmlhYmxlKGxleGVyKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIHRocm93IHVuZXhwZWN0ZWQobGV4ZXIpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUNvbnN0VmFsdWUobGV4ZXIpIHtcbiAgcmV0dXJuIHBhcnNlVmFsdWVMaXRlcmFsKGxleGVyLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZVZhbHVlKGxleGVyKSB7XG4gIHJldHVybiBwYXJzZVZhbHVlTGl0ZXJhbChsZXhlciwgZmFsc2UpO1xufVxuXG4vKipcbiAqIExpc3RWYWx1ZVtDb25zdF0gOlxuICogICAtIFsgXVxuICogICAtIFsgVmFsdWVbP0NvbnN0XSsgXVxuICovXG5mdW5jdGlvbiBwYXJzZUxpc3QobGV4ZXIsIGlzQ29uc3QpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHZhciBpdGVtID0gaXNDb25zdCA/IHBhcnNlQ29uc3RWYWx1ZSA6IHBhcnNlVmFsdWVWYWx1ZTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuTElTVCxcbiAgICB2YWx1ZXM6IGFueShsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDS0VUX0wsIGl0ZW0sIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0tFVF9SKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogT2JqZWN0VmFsdWVbQ29uc3RdIDpcbiAqICAgLSB7IH1cbiAqICAgLSB7IE9iamVjdEZpZWxkWz9Db25zdF0rIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmplY3QobGV4ZXIsIGlzQ29uc3QpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9MKTtcbiAgdmFyIGZpZWxkcyA9IFtdO1xuICB3aGlsZSAoIXNraXAobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfUikpIHtcbiAgICBmaWVsZHMucHVzaChwYXJzZU9iamVjdEZpZWxkKGxleGVyLCBpc0NvbnN0KSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuT0JKRUNULFxuICAgIGZpZWxkczogZmllbGRzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBPYmplY3RGaWVsZFtDb25zdF0gOiBOYW1lIDogVmFsdWVbP0NvbnN0XVxuICovXG5mdW5jdGlvbiBwYXJzZU9iamVjdEZpZWxkKGxleGVyLCBpc0NvbnN0KSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5PQkpFQ1RfRklFTEQsXG4gICAgbmFtZTogcGFyc2VOYW1lKGxleGVyKSxcbiAgICB2YWx1ZTogKGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTiksIHBhcnNlVmFsdWVMaXRlcmFsKGxleGVyLCBpc0NvbnN0KSksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vLyBJbXBsZW1lbnRzIHRoZSBwYXJzaW5nIHJ1bGVzIGluIHRoZSBEaXJlY3RpdmVzIHNlY3Rpb24uXG5cbi8qKlxuICogRGlyZWN0aXZlcyA6IERpcmVjdGl2ZStcbiAqL1xuZnVuY3Rpb24gcGFyc2VEaXJlY3RpdmVzKGxleGVyKSB7XG4gIHZhciBkaXJlY3RpdmVzID0gW107XG4gIHdoaWxlIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkFUKSkge1xuICAgIGRpcmVjdGl2ZXMucHVzaChwYXJzZURpcmVjdGl2ZShsZXhlcikpO1xuICB9XG4gIHJldHVybiBkaXJlY3RpdmVzO1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZSA6IEAgTmFtZSBBcmd1bWVudHM/XG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGlyZWN0aXZlKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQVQpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5ESVJFQ1RJVkUsXG4gICAgbmFtZTogcGFyc2VOYW1lKGxleGVyKSxcbiAgICBhcmd1bWVudHM6IHBhcnNlQXJndW1lbnRzKGxleGVyKSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8vIEltcGxlbWVudHMgdGhlIHBhcnNpbmcgcnVsZXMgaW4gdGhlIFR5cGVzIHNlY3Rpb24uXG5cbi8qKlxuICogVHlwZSA6XG4gKiAgIC0gTmFtZWRUeXBlXG4gKiAgIC0gTGlzdFR5cGVcbiAqICAgLSBOb25OdWxsVHlwZVxuICovXG5mdW5jdGlvbiBwYXJzZVR5cGVSZWZlcmVuY2UobGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHZhciB0eXBlID0gdm9pZCAwO1xuICBpZiAoc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5CUkFDS0VUX0wpKSB7XG4gICAgdHlwZSA9IHBhcnNlVHlwZVJlZmVyZW5jZShsZXhlcik7XG4gICAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNLRVRfUik7XG4gICAgdHlwZSA9IHtcbiAgICAgIGtpbmQ6IF9raW5kcy5MSVNUX1RZUEUsXG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdHlwZSA9IHBhcnNlTmFtZWRUeXBlKGxleGVyKTtcbiAgfVxuICBpZiAoc2tpcChsZXhlciwgX2xleGVyLlRva2VuS2luZC5CQU5HKSkge1xuICAgIHJldHVybiB7XG4gICAgICBraW5kOiBfa2luZHMuTk9OX05VTExfVFlQRSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gICAgfTtcbiAgfVxuICByZXR1cm4gdHlwZTtcbn1cblxuLyoqXG4gKiBOYW1lZFR5cGUgOiBOYW1lXG4gKi9cbmZ1bmN0aW9uIHBhcnNlTmFtZWRUeXBlKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5OQU1FRF9UWVBFLFxuICAgIG5hbWU6IHBhcnNlTmFtZShsZXhlciksXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vLyBJbXBsZW1lbnRzIHRoZSBwYXJzaW5nIHJ1bGVzIGluIHRoZSBUeXBlIERlZmluaXRpb24gc2VjdGlvbi5cblxuLyoqXG4gKiBUeXBlU3lzdGVtRGVmaW5pdGlvbiA6XG4gKiAgIC0gU2NoZW1hRGVmaW5pdGlvblxuICogICAtIFR5cGVEZWZpbml0aW9uXG4gKiAgIC0gVHlwZUV4dGVuc2lvbkRlZmluaXRpb25cbiAqICAgLSBEaXJlY3RpdmVEZWZpbml0aW9uXG4gKlxuICogVHlwZURlZmluaXRpb24gOlxuICogICAtIFNjYWxhclR5cGVEZWZpbml0aW9uXG4gKiAgIC0gT2JqZWN0VHlwZURlZmluaXRpb25cbiAqICAgLSBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblxuICogICAtIFVuaW9uVHlwZURlZmluaXRpb25cbiAqICAgLSBFbnVtVHlwZURlZmluaXRpb25cbiAqICAgLSBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVHlwZVN5c3RlbURlZmluaXRpb24obGV4ZXIpIHtcbiAgaWYgKHBlZWsobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuTkFNRSkpIHtcbiAgICBzd2l0Y2ggKGxleGVyLnRva2VuLnZhbHVlKSB7XG4gICAgICBjYXNlICdzY2hlbWEnOlxuICAgICAgICByZXR1cm4gcGFyc2VTY2hlbWFEZWZpbml0aW9uKGxleGVyKTtcbiAgICAgIGNhc2UgJ3NjYWxhcic6XG4gICAgICAgIHJldHVybiBwYXJzZVNjYWxhclR5cGVEZWZpbml0aW9uKGxleGVyKTtcbiAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICByZXR1cm4gcGFyc2VPYmplY3RUeXBlRGVmaW5pdGlvbihsZXhlcik7XG4gICAgICBjYXNlICdpbnRlcmZhY2UnOlxuICAgICAgICByZXR1cm4gcGFyc2VJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbihsZXhlcik7XG4gICAgICBjYXNlICd1bmlvbic6XG4gICAgICAgIHJldHVybiBwYXJzZVVuaW9uVHlwZURlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAnZW51bSc6XG4gICAgICAgIHJldHVybiBwYXJzZUVudW1UeXBlRGVmaW5pdGlvbihsZXhlcik7XG4gICAgICBjYXNlICdpbnB1dCc6XG4gICAgICAgIHJldHVybiBwYXJzZUlucHV0T2JqZWN0VHlwZURlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAnZXh0ZW5kJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlVHlwZUV4dGVuc2lvbkRlZmluaXRpb24obGV4ZXIpO1xuICAgICAgY2FzZSAnZGlyZWN0aXZlJzpcbiAgICAgICAgcmV0dXJuIHBhcnNlRGlyZWN0aXZlRGVmaW5pdGlvbihsZXhlcik7XG4gICAgfVxuICB9XG5cbiAgdGhyb3cgdW5leHBlY3RlZChsZXhlcik7XG59XG5cbi8qKlxuICogU2NoZW1hRGVmaW5pdGlvbiA6IHNjaGVtYSBEaXJlY3RpdmVzPyB7IE9wZXJhdGlvblR5cGVEZWZpbml0aW9uKyB9XG4gKlxuICogT3BlcmF0aW9uVHlwZURlZmluaXRpb24gOiBPcGVyYXRpb25UeXBlIDogTmFtZWRUeXBlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlU2NoZW1hRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ3NjaGVtYScpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHZhciBvcGVyYXRpb25UeXBlcyA9IG1hbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCwgcGFyc2VPcGVyYXRpb25UeXBlRGVmaW5pdGlvbiwgX2xleGVyLlRva2VuS2luZC5CUkFDRV9SKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuU0NIRU1BX0RFRklOSVRJT04sXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBvcGVyYXRpb25UeXBlczogb3BlcmF0aW9uVHlwZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZU9wZXJhdGlvblR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICB2YXIgb3BlcmF0aW9uID0gcGFyc2VPcGVyYXRpb25UeXBlKGxleGVyKTtcbiAgZXhwZWN0KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkNPTE9OKTtcbiAgdmFyIHR5cGUgPSBwYXJzZU5hbWVkVHlwZShsZXhlcik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLk9QRVJBVElPTl9UWVBFX0RFRklOSVRJT04sXG4gICAgb3BlcmF0aW9uOiBvcGVyYXRpb24sXG4gICAgdHlwZTogdHlwZSxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogU2NhbGFyVHlwZURlZmluaXRpb24gOiBzY2FsYXIgTmFtZSBEaXJlY3RpdmVzP1xuICovXG5mdW5jdGlvbiBwYXJzZVNjYWxhclR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAnc2NhbGFyJyk7XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5TQ0FMQVJfVFlQRV9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogT2JqZWN0VHlwZURlZmluaXRpb24gOlxuICogICAtIHR5cGUgTmFtZSBJbXBsZW1lbnRzSW50ZXJmYWNlcz8gRGlyZWN0aXZlcz8geyBGaWVsZERlZmluaXRpb24rIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmplY3RUeXBlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ3R5cGUnKTtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgaW50ZXJmYWNlcyA9IHBhcnNlSW1wbGVtZW50c0ludGVyZmFjZXMobGV4ZXIpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHZhciBmaWVsZHMgPSBhbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCwgcGFyc2VGaWVsZERlZmluaXRpb24sIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfUik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLk9CSkVDVF9UWVBFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICBpbnRlcmZhY2VzOiBpbnRlcmZhY2VzLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgZmllbGRzOiBmaWVsZHMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEltcGxlbWVudHNJbnRlcmZhY2VzIDogaW1wbGVtZW50cyBOYW1lZFR5cGUrXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSW1wbGVtZW50c0ludGVyZmFjZXMobGV4ZXIpIHtcbiAgdmFyIHR5cGVzID0gW107XG4gIGlmIChsZXhlci50b2tlbi52YWx1ZSA9PT0gJ2ltcGxlbWVudHMnKSB7XG4gICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgIGRvIHtcbiAgICAgIHR5cGVzLnB1c2gocGFyc2VOYW1lZFR5cGUobGV4ZXIpKTtcbiAgICB9IHdoaWxlIChwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLk5BTUUpKTtcbiAgfVxuICByZXR1cm4gdHlwZXM7XG59XG5cbi8qKlxuICogRmllbGREZWZpbml0aW9uIDogTmFtZSBBcmd1bWVudHNEZWZpbml0aW9uPyA6IFR5cGUgRGlyZWN0aXZlcz9cbiAqL1xuZnVuY3Rpb24gcGFyc2VGaWVsZERlZmluaXRpb24obGV4ZXIpIHtcbiAgdmFyIHN0YXJ0ID0gbGV4ZXIudG9rZW47XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGFyZ3MgPSBwYXJzZUFyZ3VtZW50RGVmcyhsZXhlcik7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTik7XG4gIHZhciB0eXBlID0gcGFyc2VUeXBlUmVmZXJlbmNlKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5GSUVMRF9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgYXJndW1lbnRzOiBhcmdzLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogQXJndW1lbnRzRGVmaW5pdGlvbiA6ICggSW5wdXRWYWx1ZURlZmluaXRpb24rIClcbiAqL1xuZnVuY3Rpb24gcGFyc2VBcmd1bWVudERlZnMobGV4ZXIpIHtcbiAgaWYgKCFwZWVrKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBBUkVOX0wpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBtYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLlBBUkVOX0wsIHBhcnNlSW5wdXRWYWx1ZURlZiwgX2xleGVyLlRva2VuS2luZC5QQVJFTl9SKTtcbn1cblxuLyoqXG4gKiBJbnB1dFZhbHVlRGVmaW5pdGlvbiA6IE5hbWUgOiBUeXBlIERlZmF1bHRWYWx1ZT8gRGlyZWN0aXZlcz9cbiAqL1xuZnVuY3Rpb24gcGFyc2VJbnB1dFZhbHVlRGVmKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5DT0xPTik7XG4gIHZhciB0eXBlID0gcGFyc2VUeXBlUmVmZXJlbmNlKGxleGVyKTtcbiAgdmFyIGRlZmF1bHRWYWx1ZSA9IG51bGw7XG4gIGlmIChza2lwKGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkVRVUFMUykpIHtcbiAgICBkZWZhdWx0VmFsdWUgPSBwYXJzZUNvbnN0VmFsdWUobGV4ZXIpO1xuICB9XG4gIHZhciBkaXJlY3RpdmVzID0gcGFyc2VEaXJlY3RpdmVzKGxleGVyKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuSU5QVVRfVkFMVUVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogSW50ZXJmYWNlVHlwZURlZmluaXRpb24gOiBpbnRlcmZhY2UgTmFtZSBEaXJlY3RpdmVzPyB7IEZpZWxkRGVmaW5pdGlvbisgfVxuICovXG5mdW5jdGlvbiBwYXJzZUludGVyZmFjZVR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAnaW50ZXJmYWNlJyk7XG4gIHZhciBuYW1lID0gcGFyc2VOYW1lKGxleGVyKTtcbiAgdmFyIGRpcmVjdGl2ZXMgPSBwYXJzZURpcmVjdGl2ZXMobGV4ZXIpO1xuICB2YXIgZmllbGRzID0gYW55KGxleGVyLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX0wsIHBhcnNlRmllbGREZWZpbml0aW9uLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX1IpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5JTlRFUkZBQ0VfVFlQRV9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBmaWVsZHM6IGZpZWxkcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogVW5pb25UeXBlRGVmaW5pdGlvbiA6IHVuaW9uIE5hbWUgRGlyZWN0aXZlcz8gPSBVbmlvbk1lbWJlcnNcbiAqL1xuZnVuY3Rpb24gcGFyc2VVbmlvblR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAndW5pb24nKTtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIGV4cGVjdChsZXhlciwgX2xleGVyLlRva2VuS2luZC5FUVVBTFMpO1xuICB2YXIgdHlwZXMgPSBwYXJzZVVuaW9uTWVtYmVycyhsZXhlcik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLlVOSU9OX1RZUEVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgdHlwZXM6IHR5cGVzLFxuICAgIGxvYzogbG9jKGxleGVyLCBzdGFydClcbiAgfTtcbn1cblxuLyoqXG4gKiBVbmlvbk1lbWJlcnMgOlxuICogICAtIE5hbWVkVHlwZVxuICogICAtIFVuaW9uTWVtYmVycyB8IE5hbWVkVHlwZVxuICovXG5mdW5jdGlvbiBwYXJzZVVuaW9uTWVtYmVycyhsZXhlcikge1xuICB2YXIgbWVtYmVycyA9IFtdO1xuICBkbyB7XG4gICAgbWVtYmVycy5wdXNoKHBhcnNlTmFtZWRUeXBlKGxleGVyKSk7XG4gIH0gd2hpbGUgKHNraXAobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuUElQRSkpO1xuICByZXR1cm4gbWVtYmVycztcbn1cblxuLyoqXG4gKiBFbnVtVHlwZURlZmluaXRpb24gOiBlbnVtIE5hbWUgRGlyZWN0aXZlcz8geyBFbnVtVmFsdWVEZWZpbml0aW9uKyB9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlRW51bVR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAnZW51bScpO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBkaXJlY3RpdmVzID0gcGFyc2VEaXJlY3RpdmVzKGxleGVyKTtcbiAgdmFyIHZhbHVlcyA9IG1hbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCwgcGFyc2VFbnVtVmFsdWVEZWZpbml0aW9uLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX1IpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5FTlVNX1RZUEVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIEVudW1WYWx1ZURlZmluaXRpb24gOiBFbnVtVmFsdWUgRGlyZWN0aXZlcz9cbiAqXG4gKiBFbnVtVmFsdWUgOiBOYW1lXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRW51bVZhbHVlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHJldHVybiB7XG4gICAga2luZDogX2tpbmRzLkVOVU1fVkFMVUVfREVGSU5JVElPTixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGRpcmVjdGl2ZXM6IGRpcmVjdGl2ZXMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIElucHV0T2JqZWN0VHlwZURlZmluaXRpb24gOiBpbnB1dCBOYW1lIERpcmVjdGl2ZXM/IHsgSW5wdXRWYWx1ZURlZmluaXRpb24rIH1cbiAqL1xuZnVuY3Rpb24gcGFyc2VJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uKGxleGVyKSB7XG4gIHZhciBzdGFydCA9IGxleGVyLnRva2VuO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAnaW5wdXQnKTtcbiAgdmFyIG5hbWUgPSBwYXJzZU5hbWUobGV4ZXIpO1xuICB2YXIgZGlyZWN0aXZlcyA9IHBhcnNlRGlyZWN0aXZlcyhsZXhlcik7XG4gIHZhciBmaWVsZHMgPSBhbnkobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQlJBQ0VfTCwgcGFyc2VJbnB1dFZhbHVlRGVmLCBfbGV4ZXIuVG9rZW5LaW5kLkJSQUNFX1IpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5JTlBVVF9PQkpFQ1RfVFlQRV9ERUZJTklUSU9OLFxuICAgIG5hbWU6IG5hbWUsXG4gICAgZGlyZWN0aXZlczogZGlyZWN0aXZlcyxcbiAgICBmaWVsZHM6IGZpZWxkcyxcbiAgICBsb2M6IGxvYyhsZXhlciwgc3RhcnQpXG4gIH07XG59XG5cbi8qKlxuICogVHlwZUV4dGVuc2lvbkRlZmluaXRpb24gOiBleHRlbmQgT2JqZWN0VHlwZURlZmluaXRpb25cbiAqL1xuZnVuY3Rpb24gcGFyc2VUeXBlRXh0ZW5zaW9uRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2V4dGVuZCcpO1xuICB2YXIgZGVmaW5pdGlvbiA9IHBhcnNlT2JqZWN0VHlwZURlZmluaXRpb24obGV4ZXIpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IF9raW5kcy5UWVBFX0VYVEVOU0lPTl9ERUZJTklUSU9OLFxuICAgIGRlZmluaXRpb246IGRlZmluaXRpb24sXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZURlZmluaXRpb24gOlxuICogICAtIGRpcmVjdGl2ZSBAIE5hbWUgQXJndW1lbnRzRGVmaW5pdGlvbj8gb24gRGlyZWN0aXZlTG9jYXRpb25zXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRGlyZWN0aXZlRGVmaW5pdGlvbihsZXhlcikge1xuICB2YXIgc3RhcnQgPSBsZXhlci50b2tlbjtcbiAgZXhwZWN0S2V5d29yZChsZXhlciwgJ2RpcmVjdGl2ZScpO1xuICBleHBlY3QobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuQVQpO1xuICB2YXIgbmFtZSA9IHBhcnNlTmFtZShsZXhlcik7XG4gIHZhciBhcmdzID0gcGFyc2VBcmd1bWVudERlZnMobGV4ZXIpO1xuICBleHBlY3RLZXl3b3JkKGxleGVyLCAnb24nKTtcbiAgdmFyIGxvY2F0aW9ucyA9IHBhcnNlRGlyZWN0aXZlTG9jYXRpb25zKGxleGVyKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBfa2luZHMuRElSRUNUSVZFX0RFRklOSVRJT04sXG4gICAgbmFtZTogbmFtZSxcbiAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgbG9jYXRpb25zOiBsb2NhdGlvbnMsXG4gICAgbG9jOiBsb2MobGV4ZXIsIHN0YXJ0KVxuICB9O1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZUxvY2F0aW9ucyA6XG4gKiAgIC0gTmFtZVxuICogICAtIERpcmVjdGl2ZUxvY2F0aW9ucyB8IE5hbWVcbiAqL1xuZnVuY3Rpb24gcGFyc2VEaXJlY3RpdmVMb2NhdGlvbnMobGV4ZXIpIHtcbiAgdmFyIGxvY2F0aW9ucyA9IFtdO1xuICBkbyB7XG4gICAgbG9jYXRpb25zLnB1c2gocGFyc2VOYW1lKGxleGVyKSk7XG4gIH0gd2hpbGUgKHNraXAobGV4ZXIsIF9sZXhlci5Ub2tlbktpbmQuUElQRSkpO1xuICByZXR1cm4gbG9jYXRpb25zO1xufVxuXG4vLyBDb3JlIHBhcnNpbmcgdXRpbGl0eSBmdW5jdGlvbnNcblxuLyoqXG4gKiBSZXR1cm5zIGEgbG9jYXRpb24gb2JqZWN0LCB1c2VkIHRvIGlkZW50aWZ5IHRoZSBwbGFjZSBpblxuICogdGhlIHNvdXJjZSB0aGF0IGNyZWF0ZWQgYSBnaXZlbiBwYXJzZWQgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBsb2MobGV4ZXIsIHN0YXJ0VG9rZW4pIHtcbiAgaWYgKCFsZXhlci5vcHRpb25zLm5vTG9jYXRpb24pIHtcbiAgICByZXR1cm4gbmV3IExvYyhzdGFydFRva2VuLCBsZXhlci5sYXN0VG9rZW4sIGxleGVyLnNvdXJjZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gTG9jKHN0YXJ0VG9rZW4sIGVuZFRva2VuLCBzb3VyY2UpIHtcbiAgdGhpcy5zdGFydCA9IHN0YXJ0VG9rZW4uc3RhcnQ7XG4gIHRoaXMuZW5kID0gZW5kVG9rZW4uZW5kO1xuICB0aGlzLnN0YXJ0VG9rZW4gPSBzdGFydFRva2VuO1xuICB0aGlzLmVuZFRva2VuID0gZW5kVG9rZW47XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xufVxuXG4vLyBQcmludCBhIHNpbXBsaWZpZWQgZm9ybSB3aGVuIGFwcGVhcmluZyBpbiBKU09OL3V0aWwuaW5zcGVjdC5cbkxvYy5wcm90b3R5cGUudG9KU09OID0gTG9jLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICByZXR1cm4geyBzdGFydDogdGhpcy5zdGFydCwgZW5kOiB0aGlzLmVuZCB9O1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBuZXh0IHRva2VuIGlzIG9mIGEgZ2l2ZW4ga2luZFxuICovXG5mdW5jdGlvbiBwZWVrKGxleGVyLCBraW5kKSB7XG4gIHJldHVybiBsZXhlci50b2tlbi5raW5kID09PSBraW5kO1xufVxuXG4vKipcbiAqIElmIHRoZSBuZXh0IHRva2VuIGlzIG9mIHRoZSBnaXZlbiBraW5kLCByZXR1cm4gdHJ1ZSBhZnRlciBhZHZhbmNpbmdcbiAqIHRoZSBsZXhlci4gT3RoZXJ3aXNlLCBkbyBub3QgY2hhbmdlIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHJldHVybiBmYWxzZS5cbiAqL1xuZnVuY3Rpb24gc2tpcChsZXhlciwga2luZCkge1xuICB2YXIgbWF0Y2ggPSBsZXhlci50b2tlbi5raW5kID09PSBraW5kO1xuICBpZiAobWF0Y2gpIHtcbiAgICBsZXhlci5hZHZhbmNlKCk7XG4gIH1cbiAgcmV0dXJuIG1hdGNoO1xufVxuXG4vKipcbiAqIElmIHRoZSBuZXh0IHRva2VuIGlzIG9mIHRoZSBnaXZlbiBraW5kLCByZXR1cm4gdGhhdCB0b2tlbiBhZnRlciBhZHZhbmNpbmdcbiAqIHRoZSBsZXhlci4gT3RoZXJ3aXNlLCBkbyBub3QgY2hhbmdlIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93IGFuIGVycm9yLlxuICovXG5mdW5jdGlvbiBleHBlY3QobGV4ZXIsIGtpbmQpIHtcbiAgdmFyIHRva2VuID0gbGV4ZXIudG9rZW47XG4gIGlmICh0b2tlbi5raW5kID09PSBraW5kKSB7XG4gICAgbGV4ZXIuYWR2YW5jZSgpO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuICB0aHJvdyAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShsZXhlci5zb3VyY2UsIHRva2VuLnN0YXJ0LCAnRXhwZWN0ZWQgJyArIGtpbmQgKyAnLCBmb3VuZCAnICsgKDAsIF9sZXhlci5nZXRUb2tlbkRlc2MpKHRva2VuKSk7XG59XG5cbi8qKlxuICogSWYgdGhlIG5leHQgdG9rZW4gaXMgYSBrZXl3b3JkIHdpdGggdGhlIGdpdmVuIHZhbHVlLCByZXR1cm4gdGhhdCB0b2tlbiBhZnRlclxuICogYWR2YW5jaW5nIHRoZSBsZXhlci4gT3RoZXJ3aXNlLCBkbyBub3QgY2hhbmdlIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHJldHVyblxuICogZmFsc2UuXG4gKi9cbmZ1bmN0aW9uIGV4cGVjdEtleXdvcmQobGV4ZXIsIHZhbHVlKSB7XG4gIHZhciB0b2tlbiA9IGxleGVyLnRva2VuO1xuICBpZiAodG9rZW4ua2luZCA9PT0gX2xleGVyLlRva2VuS2luZC5OQU1FICYmIHRva2VuLnZhbHVlID09PSB2YWx1ZSkge1xuICAgIGxleGVyLmFkdmFuY2UoKTtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbiAgdGhyb3cgKDAsIF9lcnJvci5zeW50YXhFcnJvcikobGV4ZXIuc291cmNlLCB0b2tlbi5zdGFydCwgJ0V4cGVjdGVkIFwiJyArIHZhbHVlICsgJ1wiLCBmb3VuZCAnICsgKDAsIF9sZXhlci5nZXRUb2tlbkRlc2MpKHRva2VuKSk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhbiBlcnJvciB3aGVuIGFuIHVuZXhwZWN0ZWQgbGV4ZWQgdG9rZW5cbiAqIGlzIGVuY291bnRlcmVkLlxuICovXG5mdW5jdGlvbiB1bmV4cGVjdGVkKGxleGVyLCBhdFRva2VuKSB7XG4gIHZhciB0b2tlbiA9IGF0VG9rZW4gfHwgbGV4ZXIudG9rZW47XG4gIHJldHVybiAoMCwgX2Vycm9yLnN5bnRheEVycm9yKShsZXhlci5zb3VyY2UsIHRva2VuLnN0YXJ0LCAnVW5leHBlY3RlZCAnICsgKDAsIF9sZXhlci5nZXRUb2tlbkRlc2MpKHRva2VuKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHBvc3NpYmx5IGVtcHR5IGxpc3Qgb2YgcGFyc2Ugbm9kZXMsIGRldGVybWluZWQgYnlcbiAqIHRoZSBwYXJzZUZuLiBUaGlzIGxpc3QgYmVnaW5zIHdpdGggYSBsZXggdG9rZW4gb2Ygb3BlbktpbmRcbiAqIGFuZCBlbmRzIHdpdGggYSBsZXggdG9rZW4gb2YgY2xvc2VLaW5kLiBBZHZhbmNlcyB0aGUgcGFyc2VyXG4gKiB0byB0aGUgbmV4dCBsZXggdG9rZW4gYWZ0ZXIgdGhlIGNsb3NpbmcgdG9rZW4uXG4gKi9cbmZ1bmN0aW9uIGFueShsZXhlciwgb3BlbktpbmQsIHBhcnNlRm4sIGNsb3NlS2luZCkge1xuICBleHBlY3QobGV4ZXIsIG9wZW5LaW5kKTtcbiAgdmFyIG5vZGVzID0gW107XG4gIHdoaWxlICghc2tpcChsZXhlciwgY2xvc2VLaW5kKSkge1xuICAgIG5vZGVzLnB1c2gocGFyc2VGbihsZXhlcikpO1xuICB9XG4gIHJldHVybiBub2Rlcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbm9uLWVtcHR5IGxpc3Qgb2YgcGFyc2Ugbm9kZXMsIGRldGVybWluZWQgYnlcbiAqIHRoZSBwYXJzZUZuLiBUaGlzIGxpc3QgYmVnaW5zIHdpdGggYSBsZXggdG9rZW4gb2Ygb3BlbktpbmRcbiAqIGFuZCBlbmRzIHdpdGggYSBsZXggdG9rZW4gb2YgY2xvc2VLaW5kLiBBZHZhbmNlcyB0aGUgcGFyc2VyXG4gKiB0byB0aGUgbmV4dCBsZXggdG9rZW4gYWZ0ZXIgdGhlIGNsb3NpbmcgdG9rZW4uXG4gKi9cbmZ1bmN0aW9uIG1hbnkobGV4ZXIsIG9wZW5LaW5kLCBwYXJzZUZuLCBjbG9zZUtpbmQpIHtcbiAgZXhwZWN0KGxleGVyLCBvcGVuS2luZCk7XG4gIHZhciBub2RlcyA9IFtwYXJzZUZuKGxleGVyKV07XG4gIHdoaWxlICghc2tpcChsZXhlciwgY2xvc2VLaW5kKSkge1xuICAgIG5vZGVzLnB1c2gocGFyc2VGbihsZXhlcikpO1xuICB9XG4gIHJldHVybiBub2Rlcztcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnByaW50ID0gcHJpbnQ7XG5cbnZhciBfdmlzaXRvciA9IHJlcXVpcmUoJy4vdmlzaXRvcicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIEFTVCBpbnRvIGEgc3RyaW5nLCB1c2luZyBvbmUgc2V0IG9mIHJlYXNvbmFibGVcbiAqIGZvcm1hdHRpbmcgcnVsZXMuXG4gKi9cbmZ1bmN0aW9uIHByaW50KGFzdCkge1xuICByZXR1cm4gKDAsIF92aXNpdG9yLnZpc2l0KShhc3QsIHsgbGVhdmU6IHByaW50RG9jQVNUUmVkdWNlciB9KTtcbn0gLyoqXG4gICAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gICAqICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgKlxuICAgKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gICAqICBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAgICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICAgKi9cblxudmFyIHByaW50RG9jQVNUUmVkdWNlciA9IHtcbiAgTmFtZTogZnVuY3Rpb24gTmFtZShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gIH0sXG4gIFZhcmlhYmxlOiBmdW5jdGlvbiBWYXJpYWJsZShub2RlKSB7XG4gICAgcmV0dXJuICckJyArIG5vZGUubmFtZTtcbiAgfSxcblxuICAvLyBEb2N1bWVudFxuXG4gIERvY3VtZW50OiBmdW5jdGlvbiBEb2N1bWVudChub2RlKSB7XG4gICAgcmV0dXJuIGpvaW4obm9kZS5kZWZpbml0aW9ucywgJ1xcblxcbicpICsgJ1xcbic7XG4gIH0sXG5cbiAgT3BlcmF0aW9uRGVmaW5pdGlvbjogZnVuY3Rpb24gT3BlcmF0aW9uRGVmaW5pdGlvbihub2RlKSB7XG4gICAgdmFyIG9wID0gbm9kZS5vcGVyYXRpb247XG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgdmFyIHZhckRlZnMgPSB3cmFwKCcoJywgam9pbihub2RlLnZhcmlhYmxlRGVmaW5pdGlvbnMsICcsICcpLCAnKScpO1xuICAgIHZhciBkaXJlY3RpdmVzID0gam9pbihub2RlLmRpcmVjdGl2ZXMsICcgJyk7XG4gICAgdmFyIHNlbGVjdGlvblNldCA9IG5vZGUuc2VsZWN0aW9uU2V0O1xuICAgIC8vIEFub255bW91cyBxdWVyaWVzIHdpdGggbm8gZGlyZWN0aXZlcyBvciB2YXJpYWJsZSBkZWZpbml0aW9ucyBjYW4gdXNlXG4gICAgLy8gdGhlIHF1ZXJ5IHNob3J0IGZvcm0uXG4gICAgcmV0dXJuICFuYW1lICYmICFkaXJlY3RpdmVzICYmICF2YXJEZWZzICYmIG9wID09PSAncXVlcnknID8gc2VsZWN0aW9uU2V0IDogam9pbihbb3AsIGpvaW4oW25hbWUsIHZhckRlZnNdKSwgZGlyZWN0aXZlcywgc2VsZWN0aW9uU2V0XSwgJyAnKTtcbiAgfSxcblxuXG4gIFZhcmlhYmxlRGVmaW5pdGlvbjogZnVuY3Rpb24gVmFyaWFibGVEZWZpbml0aW9uKF9yZWYpIHtcbiAgICB2YXIgdmFyaWFibGUgPSBfcmVmLnZhcmlhYmxlLFxuICAgICAgICB0eXBlID0gX3JlZi50eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBfcmVmLmRlZmF1bHRWYWx1ZTtcbiAgICByZXR1cm4gdmFyaWFibGUgKyAnOiAnICsgdHlwZSArIHdyYXAoJyA9ICcsIGRlZmF1bHRWYWx1ZSk7XG4gIH0sXG5cbiAgU2VsZWN0aW9uU2V0OiBmdW5jdGlvbiBTZWxlY3Rpb25TZXQoX3JlZjIpIHtcbiAgICB2YXIgc2VsZWN0aW9ucyA9IF9yZWYyLnNlbGVjdGlvbnM7XG4gICAgcmV0dXJuIGJsb2NrKHNlbGVjdGlvbnMpO1xuICB9LFxuXG4gIEZpZWxkOiBmdW5jdGlvbiBGaWVsZChfcmVmMykge1xuICAgIHZhciBhbGlhcyA9IF9yZWYzLmFsaWFzLFxuICAgICAgICBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgYXJncyA9IF9yZWYzLmFyZ3VtZW50cyxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYzLmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWYzLnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gam9pbihbd3JhcCgnJywgYWxpYXMsICc6ICcpICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG5cbiAgQXJndW1lbnQ6IGZ1bmN0aW9uIEFyZ3VtZW50KF9yZWY0KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmNC5uYW1lLFxuICAgICAgICB2YWx1ZSA9IF9yZWY0LnZhbHVlO1xuICAgIHJldHVybiBuYW1lICsgJzogJyArIHZhbHVlO1xuICB9LFxuXG4gIC8vIEZyYWdtZW50c1xuXG4gIEZyYWdtZW50U3ByZWFkOiBmdW5jdGlvbiBGcmFnbWVudFNwcmVhZChfcmVmNSkge1xuICAgIHZhciBuYW1lID0gX3JlZjUubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY1LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuICcuLi4nICsgbmFtZSArIHdyYXAoJyAnLCBqb2luKGRpcmVjdGl2ZXMsICcgJykpO1xuICB9LFxuXG4gIElubGluZUZyYWdtZW50OiBmdW5jdGlvbiBJbmxpbmVGcmFnbWVudChfcmVmNikge1xuICAgIHZhciB0eXBlQ29uZGl0aW9uID0gX3JlZjYudHlwZUNvbmRpdGlvbixcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWY2LmRpcmVjdGl2ZXMsXG4gICAgICAgIHNlbGVjdGlvblNldCA9IF9yZWY2LnNlbGVjdGlvblNldDtcbiAgICByZXR1cm4gam9pbihbJy4uLicsIHdyYXAoJ29uICcsIHR5cGVDb25kaXRpb24pLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIHNlbGVjdGlvblNldF0sICcgJyk7XG4gIH0sXG5cbiAgRnJhZ21lbnREZWZpbml0aW9uOiBmdW5jdGlvbiBGcmFnbWVudERlZmluaXRpb24oX3JlZjcpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWY3Lm5hbWUsXG4gICAgICAgIHR5cGVDb25kaXRpb24gPSBfcmVmNy50eXBlQ29uZGl0aW9uLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjcuZGlyZWN0aXZlcyxcbiAgICAgICAgc2VsZWN0aW9uU2V0ID0gX3JlZjcuc2VsZWN0aW9uU2V0O1xuICAgIHJldHVybiAnZnJhZ21lbnQgJyArIG5hbWUgKyAnIG9uICcgKyB0eXBlQ29uZGl0aW9uICsgJyAnICsgd3JhcCgnJywgam9pbihkaXJlY3RpdmVzLCAnICcpLCAnICcpICsgc2VsZWN0aW9uU2V0O1xuICB9LFxuXG4gIC8vIFZhbHVlXG5cbiAgSW50VmFsdWU6IGZ1bmN0aW9uIEludFZhbHVlKF9yZWY4KSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjgudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBGbG9hdFZhbHVlOiBmdW5jdGlvbiBGbG9hdFZhbHVlKF9yZWY5KSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjkudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBTdHJpbmdWYWx1ZTogZnVuY3Rpb24gU3RyaW5nVmFsdWUoX3JlZjEwKSB7XG4gICAgdmFyIHZhbHVlID0gX3JlZjEwLnZhbHVlO1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0sXG4gIEJvb2xlYW5WYWx1ZTogZnVuY3Rpb24gQm9vbGVhblZhbHVlKF9yZWYxMSkge1xuICAgIHZhciB2YWx1ZSA9IF9yZWYxMS52YWx1ZTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9LFxuICBOdWxsVmFsdWU6IGZ1bmN0aW9uIE51bGxWYWx1ZSgpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9LFxuICBFbnVtVmFsdWU6IGZ1bmN0aW9uIEVudW1WYWx1ZShfcmVmMTIpIHtcbiAgICB2YXIgdmFsdWUgPSBfcmVmMTIudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBMaXN0VmFsdWU6IGZ1bmN0aW9uIExpc3RWYWx1ZShfcmVmMTMpIHtcbiAgICB2YXIgdmFsdWVzID0gX3JlZjEzLnZhbHVlcztcbiAgICByZXR1cm4gJ1snICsgam9pbih2YWx1ZXMsICcsICcpICsgJ10nO1xuICB9LFxuICBPYmplY3RWYWx1ZTogZnVuY3Rpb24gT2JqZWN0VmFsdWUoX3JlZjE0KSB7XG4gICAgdmFyIGZpZWxkcyA9IF9yZWYxNC5maWVsZHM7XG4gICAgcmV0dXJuICd7JyArIGpvaW4oZmllbGRzLCAnLCAnKSArICd9JztcbiAgfSxcbiAgT2JqZWN0RmllbGQ6IGZ1bmN0aW9uIE9iamVjdEZpZWxkKF9yZWYxNSkge1xuICAgIHZhciBuYW1lID0gX3JlZjE1Lm5hbWUsXG4gICAgICAgIHZhbHVlID0gX3JlZjE1LnZhbHVlO1xuICAgIHJldHVybiBuYW1lICsgJzogJyArIHZhbHVlO1xuICB9LFxuXG4gIC8vIERpcmVjdGl2ZVxuXG4gIERpcmVjdGl2ZTogZnVuY3Rpb24gRGlyZWN0aXZlKF9yZWYxNikge1xuICAgIHZhciBuYW1lID0gX3JlZjE2Lm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMTYuYXJndW1lbnRzO1xuICAgIHJldHVybiAnQCcgKyBuYW1lICsgd3JhcCgnKCcsIGpvaW4oYXJncywgJywgJyksICcpJyk7XG4gIH0sXG5cbiAgLy8gVHlwZVxuXG4gIE5hbWVkVHlwZTogZnVuY3Rpb24gTmFtZWRUeXBlKF9yZWYxNykge1xuICAgIHZhciBuYW1lID0gX3JlZjE3Lm5hbWU7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH0sXG4gIExpc3RUeXBlOiBmdW5jdGlvbiBMaXN0VHlwZShfcmVmMTgpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYxOC50eXBlO1xuICAgIHJldHVybiAnWycgKyB0eXBlICsgJ10nO1xuICB9LFxuICBOb25OdWxsVHlwZTogZnVuY3Rpb24gTm9uTnVsbFR5cGUoX3JlZjE5KSB7XG4gICAgdmFyIHR5cGUgPSBfcmVmMTkudHlwZTtcbiAgICByZXR1cm4gdHlwZSArICchJztcbiAgfSxcblxuICAvLyBUeXBlIFN5c3RlbSBEZWZpbml0aW9uc1xuXG4gIFNjaGVtYURlZmluaXRpb246IGZ1bmN0aW9uIFNjaGVtYURlZmluaXRpb24oX3JlZjIwKSB7XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSBfcmVmMjAuZGlyZWN0aXZlcyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZXMgPSBfcmVmMjAub3BlcmF0aW9uVHlwZXM7XG4gICAgcmV0dXJuIGpvaW4oWydzY2hlbWEnLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKG9wZXJhdGlvblR5cGVzKV0sICcgJyk7XG4gIH0sXG5cbiAgT3BlcmF0aW9uVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uKF9yZWYyMSkge1xuICAgIHZhciBvcGVyYXRpb24gPSBfcmVmMjEub3BlcmF0aW9uLFxuICAgICAgICB0eXBlID0gX3JlZjIxLnR5cGU7XG4gICAgcmV0dXJuIG9wZXJhdGlvbiArICc6ICcgKyB0eXBlO1xuICB9LFxuXG4gIFNjYWxhclR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBTY2FsYXJUeXBlRGVmaW5pdGlvbihfcmVmMjIpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyMi5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjIyLmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydzY2FsYXInLCBuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyldLCAnICcpO1xuICB9LFxuXG4gIE9iamVjdFR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBPYmplY3RUeXBlRGVmaW5pdGlvbihfcmVmMjMpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyMy5uYW1lLFxuICAgICAgICBpbnRlcmZhY2VzID0gX3JlZjIzLmludGVyZmFjZXMsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjMuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjIzLmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ3R5cGUnLCBuYW1lLCB3cmFwKCdpbXBsZW1lbnRzICcsIGpvaW4oaW50ZXJmYWNlcywgJywgJykpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKGZpZWxkcyldLCAnICcpO1xuICB9LFxuXG4gIEZpZWxkRGVmaW5pdGlvbjogZnVuY3Rpb24gRmllbGREZWZpbml0aW9uKF9yZWYyNCkge1xuICAgIHZhciBuYW1lID0gX3JlZjI0Lm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMjQuYXJndW1lbnRzLFxuICAgICAgICB0eXBlID0gX3JlZjI0LnR5cGUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjQuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpICsgJzogJyArIHR5cGUgKyB3cmFwKCcgJywgam9pbihkaXJlY3RpdmVzLCAnICcpKTtcbiAgfSxcblxuICBJbnB1dFZhbHVlRGVmaW5pdGlvbjogZnVuY3Rpb24gSW5wdXRWYWx1ZURlZmluaXRpb24oX3JlZjI1KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjUubmFtZSxcbiAgICAgICAgdHlwZSA9IF9yZWYyNS50eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWUgPSBfcmVmMjUuZGVmYXVsdFZhbHVlLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI1LmRpcmVjdGl2ZXM7XG4gICAgcmV0dXJuIGpvaW4oW25hbWUgKyAnOiAnICsgdHlwZSwgd3JhcCgnPSAnLCBkZWZhdWx0VmFsdWUpLCBqb2luKGRpcmVjdGl2ZXMsICcgJyldLCAnICcpO1xuICB9LFxuXG4gIEludGVyZmFjZVR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBJbnRlcmZhY2VUeXBlRGVmaW5pdGlvbihfcmVmMjYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyNi5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI2LmRpcmVjdGl2ZXMsXG4gICAgICAgIGZpZWxkcyA9IF9yZWYyNi5maWVsZHM7XG4gICAgcmV0dXJuIGpvaW4oWydpbnRlcmZhY2UnLCBuYW1lLCBqb2luKGRpcmVjdGl2ZXMsICcgJyksIGJsb2NrKGZpZWxkcyldLCAnICcpO1xuICB9LFxuXG4gIFVuaW9uVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIFVuaW9uVHlwZURlZmluaXRpb24oX3JlZjI3KSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMjcubmFtZSxcbiAgICAgICAgZGlyZWN0aXZlcyA9IF9yZWYyNy5kaXJlY3RpdmVzLFxuICAgICAgICB0eXBlcyA9IF9yZWYyNy50eXBlcztcbiAgICByZXR1cm4gam9pbihbJ3VuaW9uJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCAnPSAnICsgam9pbih0eXBlcywgJyB8ICcpXSwgJyAnKTtcbiAgfSxcblxuICBFbnVtVHlwZURlZmluaXRpb246IGZ1bmN0aW9uIEVudW1UeXBlRGVmaW5pdGlvbihfcmVmMjgpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYyOC5uYW1lLFxuICAgICAgICBkaXJlY3RpdmVzID0gX3JlZjI4LmRpcmVjdGl2ZXMsXG4gICAgICAgIHZhbHVlcyA9IF9yZWYyOC52YWx1ZXM7XG4gICAgcmV0dXJuIGpvaW4oWydlbnVtJywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayh2YWx1ZXMpXSwgJyAnKTtcbiAgfSxcblxuICBFbnVtVmFsdWVEZWZpbml0aW9uOiBmdW5jdGlvbiBFbnVtVmFsdWVEZWZpbml0aW9uKF9yZWYyOSkge1xuICAgIHZhciBuYW1lID0gX3JlZjI5Lm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMjkuZGlyZWN0aXZlcztcbiAgICByZXR1cm4gam9pbihbbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpXSwgJyAnKTtcbiAgfSxcblxuICBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uOiBmdW5jdGlvbiBJbnB1dE9iamVjdFR5cGVEZWZpbml0aW9uKF9yZWYzMCkge1xuICAgIHZhciBuYW1lID0gX3JlZjMwLm5hbWUsXG4gICAgICAgIGRpcmVjdGl2ZXMgPSBfcmVmMzAuZGlyZWN0aXZlcyxcbiAgICAgICAgZmllbGRzID0gX3JlZjMwLmZpZWxkcztcbiAgICByZXR1cm4gam9pbihbJ2lucHV0JywgbmFtZSwgam9pbihkaXJlY3RpdmVzLCAnICcpLCBibG9jayhmaWVsZHMpXSwgJyAnKTtcbiAgfSxcblxuICBUeXBlRXh0ZW5zaW9uRGVmaW5pdGlvbjogZnVuY3Rpb24gVHlwZUV4dGVuc2lvbkRlZmluaXRpb24oX3JlZjMxKSB7XG4gICAgdmFyIGRlZmluaXRpb24gPSBfcmVmMzEuZGVmaW5pdGlvbjtcbiAgICByZXR1cm4gJ2V4dGVuZCAnICsgZGVmaW5pdGlvbjtcbiAgfSxcblxuICBEaXJlY3RpdmVEZWZpbml0aW9uOiBmdW5jdGlvbiBEaXJlY3RpdmVEZWZpbml0aW9uKF9yZWYzMikge1xuICAgIHZhciBuYW1lID0gX3JlZjMyLm5hbWUsXG4gICAgICAgIGFyZ3MgPSBfcmVmMzIuYXJndW1lbnRzLFxuICAgICAgICBsb2NhdGlvbnMgPSBfcmVmMzIubG9jYXRpb25zO1xuICAgIHJldHVybiAnZGlyZWN0aXZlIEAnICsgbmFtZSArIHdyYXAoJygnLCBqb2luKGFyZ3MsICcsICcpLCAnKScpICsgJyBvbiAnICsgam9pbihsb2NhdGlvbnMsICcgfCAnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHaXZlbiBtYXliZUFycmF5LCBwcmludCBhbiBlbXB0eSBzdHJpbmcgaWYgaXQgaXMgbnVsbCBvciBlbXB0eSwgb3RoZXJ3aXNlXG4gKiBwcmludCBhbGwgaXRlbXMgdG9nZXRoZXIgc2VwYXJhdGVkIGJ5IHNlcGFyYXRvciBpZiBwcm92aWRlZFxuICovXG5mdW5jdGlvbiBqb2luKG1heWJlQXJyYXksIHNlcGFyYXRvcikge1xuICByZXR1cm4gbWF5YmVBcnJheSA/IG1heWJlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH0pLmpvaW4oc2VwYXJhdG9yIHx8ICcnKSA6ICcnO1xufVxuXG4vKipcbiAqIEdpdmVuIGFycmF5LCBwcmludCBlYWNoIGl0ZW0gb24gaXRzIG93biBsaW5lLCB3cmFwcGVkIGluIGFuXG4gKiBpbmRlbnRlZCBcInsgfVwiIGJsb2NrLlxuICovXG5mdW5jdGlvbiBibG9jayhhcnJheSkge1xuICByZXR1cm4gYXJyYXkgJiYgYXJyYXkubGVuZ3RoICE9PSAwID8gaW5kZW50KCd7XFxuJyArIGpvaW4oYXJyYXksICdcXG4nKSkgKyAnXFxufScgOiAne30nO1xufVxuXG4vKipcbiAqIElmIG1heWJlU3RyaW5nIGlzIG5vdCBudWxsIG9yIGVtcHR5LCB0aGVuIHdyYXAgd2l0aCBzdGFydCBhbmQgZW5kLCBvdGhlcndpc2VcbiAqIHByaW50IGFuIGVtcHR5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gd3JhcChzdGFydCwgbWF5YmVTdHJpbmcsIGVuZCkge1xuICByZXR1cm4gbWF5YmVTdHJpbmcgPyBzdGFydCArIG1heWJlU3RyaW5nICsgKGVuZCB8fCAnJykgOiAnJztcbn1cblxuZnVuY3Rpb24gaW5kZW50KG1heWJlU3RyaW5nKSB7XG4gIHJldHVybiBtYXliZVN0cmluZyAmJiBtYXliZVN0cmluZy5yZXBsYWNlKC9cXG4vZywgJ1xcbiAgJyk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiAgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiAgb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuLyoqXG4gKiBBIHJlcHJlc2VudGF0aW9uIG9mIHNvdXJjZSBpbnB1dCB0byBHcmFwaFFMLiBUaGUgbmFtZSBpcyBvcHRpb25hbCxcbiAqIGJ1dCBpcyBtb3N0bHkgdXNlZnVsIGZvciBjbGllbnRzIHdobyBzdG9yZSBHcmFwaFFMIGRvY3VtZW50cyBpblxuICogc291cmNlIGZpbGVzOyBmb3IgZXhhbXBsZSwgaWYgdGhlIEdyYXBoUUwgaW5wdXQgaXMgaW4gYSBmaWxlIEZvby5ncmFwaHFsLFxuICogaXQgbWlnaHQgYmUgdXNlZnVsIGZvciBuYW1lIHRvIGJlIFwiRm9vLmdyYXBocWxcIi5cbiAqL1xudmFyIFNvdXJjZSA9IGV4cG9ydHMuU291cmNlID0gZnVuY3Rpb24gU291cmNlKGJvZHksIG5hbWUpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNvdXJjZSk7XG5cbiAgdGhpcy5ib2R5ID0gYm9keTtcbiAgdGhpcy5uYW1lID0gbmFtZSB8fCAnR3JhcGhRTCc7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudmlzaXQgPSB2aXNpdDtcbmV4cG9ydHMudmlzaXRJblBhcmFsbGVsID0gdmlzaXRJblBhcmFsbGVsO1xuZXhwb3J0cy52aXNpdFdpdGhUeXBlSW5mbyA9IHZpc2l0V2l0aFR5cGVJbmZvO1xuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE1LCBGYWNlYm9vaywgSW5jLlxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbnZhciBRdWVyeURvY3VtZW50S2V5cyA9IGV4cG9ydHMuUXVlcnlEb2N1bWVudEtleXMgPSB7XG4gIE5hbWU6IFtdLFxuXG4gIERvY3VtZW50OiBbJ2RlZmluaXRpb25zJ10sXG4gIE9wZXJhdGlvbkRlZmluaXRpb246IFsnbmFtZScsICd2YXJpYWJsZURlZmluaXRpb25zJywgJ2RpcmVjdGl2ZXMnLCAnc2VsZWN0aW9uU2V0J10sXG4gIFZhcmlhYmxlRGVmaW5pdGlvbjogWyd2YXJpYWJsZScsICd0eXBlJywgJ2RlZmF1bHRWYWx1ZSddLFxuICBWYXJpYWJsZTogWyduYW1lJ10sXG4gIFNlbGVjdGlvblNldDogWydzZWxlY3Rpb25zJ10sXG4gIEZpZWxkOiBbJ2FsaWFzJywgJ25hbWUnLCAnYXJndW1lbnRzJywgJ2RpcmVjdGl2ZXMnLCAnc2VsZWN0aW9uU2V0J10sXG4gIEFyZ3VtZW50OiBbJ25hbWUnLCAndmFsdWUnXSxcblxuICBGcmFnbWVudFNwcmVhZDogWyduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgSW5saW5lRnJhZ21lbnQ6IFsndHlwZUNvbmRpdGlvbicsICdkaXJlY3RpdmVzJywgJ3NlbGVjdGlvblNldCddLFxuICBGcmFnbWVudERlZmluaXRpb246IFsnbmFtZScsICd0eXBlQ29uZGl0aW9uJywgJ2RpcmVjdGl2ZXMnLCAnc2VsZWN0aW9uU2V0J10sXG5cbiAgSW50VmFsdWU6IFtdLFxuICBGbG9hdFZhbHVlOiBbXSxcbiAgU3RyaW5nVmFsdWU6IFtdLFxuICBCb29sZWFuVmFsdWU6IFtdLFxuICBOdWxsVmFsdWU6IFtdLFxuICBFbnVtVmFsdWU6IFtdLFxuICBMaXN0VmFsdWU6IFsndmFsdWVzJ10sXG4gIE9iamVjdFZhbHVlOiBbJ2ZpZWxkcyddLFxuICBPYmplY3RGaWVsZDogWyduYW1lJywgJ3ZhbHVlJ10sXG5cbiAgRGlyZWN0aXZlOiBbJ25hbWUnLCAnYXJndW1lbnRzJ10sXG5cbiAgTmFtZWRUeXBlOiBbJ25hbWUnXSxcbiAgTGlzdFR5cGU6IFsndHlwZSddLFxuICBOb25OdWxsVHlwZTogWyd0eXBlJ10sXG5cbiAgU2NoZW1hRGVmaW5pdGlvbjogWydkaXJlY3RpdmVzJywgJ29wZXJhdGlvblR5cGVzJ10sXG4gIE9wZXJhdGlvblR5cGVEZWZpbml0aW9uOiBbJ3R5cGUnXSxcblxuICBTY2FsYXJUeXBlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgT2JqZWN0VHlwZURlZmluaXRpb246IFsnbmFtZScsICdpbnRlcmZhY2VzJywgJ2RpcmVjdGl2ZXMnLCAnZmllbGRzJ10sXG4gIEZpZWxkRGVmaW5pdGlvbjogWyduYW1lJywgJ2FyZ3VtZW50cycsICd0eXBlJywgJ2RpcmVjdGl2ZXMnXSxcbiAgSW5wdXRWYWx1ZURlZmluaXRpb246IFsnbmFtZScsICd0eXBlJywgJ2RlZmF1bHRWYWx1ZScsICdkaXJlY3RpdmVzJ10sXG4gIEludGVyZmFjZVR5cGVEZWZpbml0aW9uOiBbJ25hbWUnLCAnZGlyZWN0aXZlcycsICdmaWVsZHMnXSxcbiAgVW5pb25UeXBlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAndHlwZXMnXSxcbiAgRW51bVR5cGVEZWZpbml0aW9uOiBbJ25hbWUnLCAnZGlyZWN0aXZlcycsICd2YWx1ZXMnXSxcbiAgRW51bVZhbHVlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnXSxcbiAgSW5wdXRPYmplY3RUeXBlRGVmaW5pdGlvbjogWyduYW1lJywgJ2RpcmVjdGl2ZXMnLCAnZmllbGRzJ10sXG5cbiAgVHlwZUV4dGVuc2lvbkRlZmluaXRpb246IFsnZGVmaW5pdGlvbiddLFxuXG4gIERpcmVjdGl2ZURlZmluaXRpb246IFsnbmFtZScsICdhcmd1bWVudHMnLCAnbG9jYXRpb25zJ11cbn07XG5cbnZhciBCUkVBSyA9IGV4cG9ydHMuQlJFQUsgPSB7fTtcblxuLyoqXG4gKiB2aXNpdCgpIHdpbGwgd2FsayB0aHJvdWdoIGFuIEFTVCB1c2luZyBhIGRlcHRoIGZpcnN0IHRyYXZlcnNhbCwgY2FsbGluZ1xuICogdGhlIHZpc2l0b3IncyBlbnRlciBmdW5jdGlvbiBhdCBlYWNoIG5vZGUgaW4gdGhlIHRyYXZlcnNhbCwgYW5kIGNhbGxpbmcgdGhlXG4gKiBsZWF2ZSBmdW5jdGlvbiBhZnRlciB2aXNpdGluZyB0aGF0IG5vZGUgYW5kIGFsbCBvZiBpdHMgY2hpbGQgbm9kZXMuXG4gKlxuICogQnkgcmV0dXJuaW5nIGRpZmZlcmVudCB2YWx1ZXMgZnJvbSB0aGUgZW50ZXIgYW5kIGxlYXZlIGZ1bmN0aW9ucywgdGhlXG4gKiBiZWhhdmlvciBvZiB0aGUgdmlzaXRvciBjYW4gYmUgYWx0ZXJlZCwgaW5jbHVkaW5nIHNraXBwaW5nIG92ZXIgYSBzdWItdHJlZSBvZlxuICogdGhlIEFTVCAoYnkgcmV0dXJuaW5nIGZhbHNlKSwgZWRpdGluZyB0aGUgQVNUIGJ5IHJldHVybmluZyBhIHZhbHVlIG9yIG51bGxcbiAqIHRvIHJlbW92ZSB0aGUgdmFsdWUsIG9yIHRvIHN0b3AgdGhlIHdob2xlIHRyYXZlcnNhbCBieSByZXR1cm5pbmcgQlJFQUsuXG4gKlxuICogV2hlbiB1c2luZyB2aXNpdCgpIHRvIGVkaXQgYW4gQVNULCB0aGUgb3JpZ2luYWwgQVNUIHdpbGwgbm90IGJlIG1vZGlmaWVkLCBhbmRcbiAqIGEgbmV3IHZlcnNpb24gb2YgdGhlIEFTVCB3aXRoIHRoZSBjaGFuZ2VzIGFwcGxpZWQgd2lsbCBiZSByZXR1cm5lZCBmcm9tIHRoZVxuICogdmlzaXQgZnVuY3Rpb24uXG4gKlxuICogICAgIGNvbnN0IGVkaXRlZEFTVCA9IHZpc2l0KGFzdCwge1xuICogICAgICAgZW50ZXIobm9kZSwga2V5LCBwYXJlbnQsIHBhdGgsIGFuY2VzdG9ycykge1xuICogICAgICAgICAvLyBAcmV0dXJuXG4gKiAgICAgICAgIC8vICAgdW5kZWZpbmVkOiBubyBhY3Rpb25cbiAqICAgICAgICAgLy8gICBmYWxzZTogc2tpcCB2aXNpdGluZyB0aGlzIG5vZGVcbiAqICAgICAgICAgLy8gICB2aXNpdG9yLkJSRUFLOiBzdG9wIHZpc2l0aW5nIGFsdG9nZXRoZXJcbiAqICAgICAgICAgLy8gICBudWxsOiBkZWxldGUgdGhpcyBub2RlXG4gKiAgICAgICAgIC8vICAgYW55IHZhbHVlOiByZXBsYWNlIHRoaXMgbm9kZSB3aXRoIHRoZSByZXR1cm5lZCB2YWx1ZVxuICogICAgICAgfSxcbiAqICAgICAgIGxlYXZlKG5vZGUsIGtleSwgcGFyZW50LCBwYXRoLCBhbmNlc3RvcnMpIHtcbiAqICAgICAgICAgLy8gQHJldHVyblxuICogICAgICAgICAvLyAgIHVuZGVmaW5lZDogbm8gYWN0aW9uXG4gKiAgICAgICAgIC8vICAgZmFsc2U6IG5vIGFjdGlvblxuICogICAgICAgICAvLyAgIHZpc2l0b3IuQlJFQUs6IHN0b3AgdmlzaXRpbmcgYWx0b2dldGhlclxuICogICAgICAgICAvLyAgIG51bGw6IGRlbGV0ZSB0aGlzIG5vZGVcbiAqICAgICAgICAgLy8gICBhbnkgdmFsdWU6IHJlcGxhY2UgdGhpcyBub2RlIHdpdGggdGhlIHJldHVybmVkIHZhbHVlXG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICogQWx0ZXJuYXRpdmVseSB0byBwcm92aWRpbmcgZW50ZXIoKSBhbmQgbGVhdmUoKSBmdW5jdGlvbnMsIGEgdmlzaXRvciBjYW5cbiAqIGluc3RlYWQgcHJvdmlkZSBmdW5jdGlvbnMgbmFtZWQgdGhlIHNhbWUgYXMgdGhlIGtpbmRzIG9mIEFTVCBub2Rlcywgb3JcbiAqIGVudGVyL2xlYXZlIHZpc2l0b3JzIGF0IGEgbmFtZWQga2V5LCBsZWFkaW5nIHRvIGZvdXIgcGVybXV0YXRpb25zIG9mXG4gKiB2aXNpdG9yIEFQSTpcbiAqXG4gKiAxKSBOYW1lZCB2aXNpdG9ycyB0cmlnZ2VyZWQgd2hlbiBlbnRlcmluZyBhIG5vZGUgYSBzcGVjaWZpYyBraW5kLlxuICpcbiAqICAgICB2aXNpdChhc3QsIHtcbiAqICAgICAgIEtpbmQobm9kZSkge1xuICogICAgICAgICAvLyBlbnRlciB0aGUgXCJLaW5kXCIgbm9kZVxuICogICAgICAgfVxuICogICAgIH0pXG4gKlxuICogMikgTmFtZWQgdmlzaXRvcnMgdGhhdCB0cmlnZ2VyIHVwb24gZW50ZXJpbmcgYW5kIGxlYXZpbmcgYSBub2RlIG9mXG4gKiAgICBhIHNwZWNpZmljIGtpbmQuXG4gKlxuICogICAgIHZpc2l0KGFzdCwge1xuICogICAgICAgS2luZDoge1xuICogICAgICAgICBlbnRlcihub2RlKSB7XG4gKiAgICAgICAgICAgLy8gZW50ZXIgdGhlIFwiS2luZFwiIG5vZGVcbiAqICAgICAgICAgfVxuICogICAgICAgICBsZWF2ZShub2RlKSB7XG4gKiAgICAgICAgICAgLy8gbGVhdmUgdGhlIFwiS2luZFwiIG5vZGVcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pXG4gKlxuICogMykgR2VuZXJpYyB2aXNpdG9ycyB0aGF0IHRyaWdnZXIgdXBvbiBlbnRlcmluZyBhbmQgbGVhdmluZyBhbnkgbm9kZS5cbiAqXG4gKiAgICAgdmlzaXQoYXN0LCB7XG4gKiAgICAgICBlbnRlcihub2RlKSB7XG4gKiAgICAgICAgIC8vIGVudGVyIGFueSBub2RlXG4gKiAgICAgICB9LFxuICogICAgICAgbGVhdmUobm9kZSkge1xuICogICAgICAgICAvLyBsZWF2ZSBhbnkgbm9kZVxuICogICAgICAgfVxuICogICAgIH0pXG4gKlxuICogNCkgUGFyYWxsZWwgdmlzaXRvcnMgZm9yIGVudGVyaW5nIGFuZCBsZWF2aW5nIG5vZGVzIG9mIGEgc3BlY2lmaWMga2luZC5cbiAqXG4gKiAgICAgdmlzaXQoYXN0LCB7XG4gKiAgICAgICBlbnRlcjoge1xuICogICAgICAgICBLaW5kKG5vZGUpIHtcbiAqICAgICAgICAgICAvLyBlbnRlciB0aGUgXCJLaW5kXCIgbm9kZVxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAgbGVhdmU6IHtcbiAqICAgICAgICAgS2luZChub2RlKSB7XG4gKiAgICAgICAgICAgLy8gbGVhdmUgdGhlIFwiS2luZFwiIG5vZGVcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pXG4gKi9cbmZ1bmN0aW9uIHZpc2l0KHJvb3QsIHZpc2l0b3IsIGtleU1hcCkge1xuICB2YXIgdmlzaXRvcktleXMgPSBrZXlNYXAgfHwgUXVlcnlEb2N1bWVudEtleXM7XG5cbiAgdmFyIHN0YWNrID0gdm9pZCAwO1xuICB2YXIgaW5BcnJheSA9IEFycmF5LmlzQXJyYXkocm9vdCk7XG4gIHZhciBrZXlzID0gW3Jvb3RdO1xuICB2YXIgaW5kZXggPSAtMTtcbiAgdmFyIGVkaXRzID0gW107XG4gIHZhciBwYXJlbnQgPSB2b2lkIDA7XG4gIHZhciBwYXRoID0gW107XG4gIHZhciBhbmNlc3RvcnMgPSBbXTtcbiAgdmFyIG5ld1Jvb3QgPSByb290O1xuXG4gIGRvIHtcbiAgICBpbmRleCsrO1xuICAgIHZhciBpc0xlYXZpbmcgPSBpbmRleCA9PT0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGtleSA9IHZvaWQgMDtcbiAgICB2YXIgbm9kZSA9IHZvaWQgMDtcbiAgICB2YXIgaXNFZGl0ZWQgPSBpc0xlYXZpbmcgJiYgZWRpdHMubGVuZ3RoICE9PSAwO1xuICAgIGlmIChpc0xlYXZpbmcpIHtcbiAgICAgIGtleSA9IGFuY2VzdG9ycy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBwYXRoLnBvcCgpO1xuICAgICAgbm9kZSA9IHBhcmVudDtcbiAgICAgIHBhcmVudCA9IGFuY2VzdG9ycy5wb3AoKTtcbiAgICAgIGlmIChpc0VkaXRlZCkge1xuICAgICAgICBpZiAoaW5BcnJheSkge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnNsaWNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNsb25lID0ge307XG4gICAgICAgICAgZm9yICh2YXIgayBpbiBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgICBjbG9uZVtrXSA9IG5vZGVba107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG5vZGUgPSBjbG9uZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWRpdE9mZnNldCA9IDA7XG4gICAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBlZGl0cy5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgICB2YXIgZWRpdEtleSA9IGVkaXRzW2lpXVswXTtcbiAgICAgICAgICB2YXIgZWRpdFZhbHVlID0gZWRpdHNbaWldWzFdO1xuICAgICAgICAgIGlmIChpbkFycmF5KSB7XG4gICAgICAgICAgICBlZGl0S2V5IC09IGVkaXRPZmZzZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbkFycmF5ICYmIGVkaXRWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5zcGxpY2UoZWRpdEtleSwgMSk7XG4gICAgICAgICAgICBlZGl0T2Zmc2V0Kys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVbZWRpdEtleV0gPSBlZGl0VmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpbmRleCA9IHN0YWNrLmluZGV4O1xuICAgICAga2V5cyA9IHN0YWNrLmtleXM7XG4gICAgICBlZGl0cyA9IHN0YWNrLmVkaXRzO1xuICAgICAgaW5BcnJheSA9IHN0YWNrLmluQXJyYXk7XG4gICAgICBzdGFjayA9IHN0YWNrLnByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IHBhcmVudCA/IGluQXJyYXkgPyBpbmRleCA6IGtleXNbaW5kZXhdIDogdW5kZWZpbmVkO1xuICAgICAgbm9kZSA9IHBhcmVudCA/IHBhcmVudFtrZXldIDogbmV3Um9vdDtcbiAgICAgIGlmIChub2RlID09PSBudWxsIHx8IG5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcGF0aC5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IHZvaWQgMDtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICAgIGlmICghaXNOb2RlKG5vZGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBBU1QgTm9kZTogJyArIEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcbiAgICAgIH1cbiAgICAgIHZhciB2aXNpdEZuID0gZ2V0VmlzaXRGbih2aXNpdG9yLCBub2RlLmtpbmQsIGlzTGVhdmluZyk7XG4gICAgICBpZiAodmlzaXRGbikge1xuICAgICAgICByZXN1bHQgPSB2aXNpdEZuLmNhbGwodmlzaXRvciwgbm9kZSwga2V5LCBwYXJlbnQsIHBhdGgsIGFuY2VzdG9ycyk7XG5cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gQlJFQUspIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKCFpc0xlYXZpbmcpIHtcbiAgICAgICAgICAgIHBhdGgucG9wKCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBlZGl0cy5wdXNoKFtrZXksIHJlc3VsdF0pO1xuICAgICAgICAgIGlmICghaXNMZWF2aW5nKSB7XG4gICAgICAgICAgICBpZiAoaXNOb2RlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgICAgbm9kZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhdGgucG9wKCk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCAmJiBpc0VkaXRlZCkge1xuICAgICAgZWRpdHMucHVzaChba2V5LCBub2RlXSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0xlYXZpbmcpIHtcbiAgICAgIHN0YWNrID0geyBpbkFycmF5OiBpbkFycmF5LCBpbmRleDogaW5kZXgsIGtleXM6IGtleXMsIGVkaXRzOiBlZGl0cywgcHJldjogc3RhY2sgfTtcbiAgICAgIGluQXJyYXkgPSBBcnJheS5pc0FycmF5KG5vZGUpO1xuICAgICAga2V5cyA9IGluQXJyYXkgPyBub2RlIDogdmlzaXRvcktleXNbbm9kZS5raW5kXSB8fCBbXTtcbiAgICAgIGluZGV4ID0gLTE7XG4gICAgICBlZGl0cyA9IFtdO1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBhbmNlc3RvcnMucHVzaChwYXJlbnQpO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICB9XG4gIH0gd2hpbGUgKHN0YWNrICE9PSB1bmRlZmluZWQpO1xuXG4gIGlmIChlZGl0cy5sZW5ndGggIT09IDApIHtcbiAgICBuZXdSb290ID0gZWRpdHNbZWRpdHMubGVuZ3RoIC0gMV1bMV07XG4gIH1cblxuICByZXR1cm4gbmV3Um9vdDtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKG1heWJlTm9kZSkge1xuICByZXR1cm4gbWF5YmVOb2RlICYmIHR5cGVvZiBtYXliZU5vZGUua2luZCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2aXNpdG9yIGluc3RhbmNlIHdoaWNoIGRlbGVnYXRlcyB0byBtYW55IHZpc2l0b3JzIHRvIHJ1biBpblxuICogcGFyYWxsZWwuIEVhY2ggdmlzaXRvciB3aWxsIGJlIHZpc2l0ZWQgZm9yIGVhY2ggbm9kZSBiZWZvcmUgbW92aW5nIG9uLlxuICpcbiAqIElmIGEgcHJpb3IgdmlzaXRvciBlZGl0cyBhIG5vZGUsIG5vIGZvbGxvd2luZyB2aXNpdG9ycyB3aWxsIHNlZSB0aGF0IG5vZGUuXG4gKi9cbmZ1bmN0aW9uIHZpc2l0SW5QYXJhbGxlbCh2aXNpdG9ycykge1xuICB2YXIgc2tpcHBpbmcgPSBuZXcgQXJyYXkodmlzaXRvcnMubGVuZ3RoKTtcblxuICByZXR1cm4ge1xuICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcihub2RlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc2l0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghc2tpcHBpbmdbaV0pIHtcbiAgICAgICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3JzW2ldLCBub2RlLmtpbmQsIC8qIGlzTGVhdmluZyAqL2ZhbHNlKTtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh2aXNpdG9yc1tpXSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHNraXBwaW5nW2ldID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBCUkVBSykge1xuICAgICAgICAgICAgICBza2lwcGluZ1tpXSA9IEJSRUFLO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGVhdmU6IGZ1bmN0aW9uIGxlYXZlKG5vZGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzaXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFza2lwcGluZ1tpXSkge1xuICAgICAgICAgIHZhciBmbiA9IGdldFZpc2l0Rm4odmlzaXRvcnNbaV0sIG5vZGUua2luZCwgLyogaXNMZWF2aW5nICovdHJ1ZSk7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodmlzaXRvcnNbaV0sIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBCUkVBSykge1xuICAgICAgICAgICAgICBza2lwcGluZ1tpXSA9IEJSRUFLO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNraXBwaW5nW2ldID09PSBub2RlKSB7XG4gICAgICAgICAgc2tpcHBpbmdbaV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmlzaXRvciBpbnN0YW5jZSB3aGljaCBtYWludGFpbnMgYSBwcm92aWRlZCBUeXBlSW5mbyBpbnN0YW5jZVxuICogYWxvbmcgd2l0aCB2aXNpdGluZyB2aXNpdG9yLlxuICovXG5mdW5jdGlvbiB2aXNpdFdpdGhUeXBlSW5mbyh0eXBlSW5mbywgdmlzaXRvcikge1xuICByZXR1cm4ge1xuICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcihub2RlKSB7XG4gICAgICB0eXBlSW5mby5lbnRlcihub2RlKTtcbiAgICAgIHZhciBmbiA9IGdldFZpc2l0Rm4odmlzaXRvciwgbm9kZS5raW5kLCAvKiBpc0xlYXZpbmcgKi9mYWxzZSk7XG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHZpc2l0b3IsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHR5cGVJbmZvLmxlYXZlKG5vZGUpO1xuICAgICAgICAgIGlmIChpc05vZGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdHlwZUluZm8uZW50ZXIocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxlYXZlOiBmdW5jdGlvbiBsZWF2ZShub2RlKSB7XG4gICAgICB2YXIgZm4gPSBnZXRWaXNpdEZuKHZpc2l0b3IsIG5vZGUua2luZCwgLyogaXNMZWF2aW5nICovdHJ1ZSk7XG4gICAgICB2YXIgcmVzdWx0ID0gdm9pZCAwO1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIHJlc3VsdCA9IGZuLmFwcGx5KHZpc2l0b3IsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICB0eXBlSW5mby5sZWF2ZShub2RlKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEdpdmVuIGEgdmlzaXRvciBpbnN0YW5jZSwgaWYgaXQgaXMgbGVhdmluZyBvciBub3QsIGFuZCBhIG5vZGUga2luZCwgcmV0dXJuXG4gKiB0aGUgZnVuY3Rpb24gdGhlIHZpc2l0b3IgcnVudGltZSBzaG91bGQgY2FsbC5cbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaXRGbih2aXNpdG9yLCBraW5kLCBpc0xlYXZpbmcpIHtcbiAgdmFyIGtpbmRWaXNpdG9yID0gdmlzaXRvcltraW5kXTtcbiAgaWYgKGtpbmRWaXNpdG9yKSB7XG4gICAgaWYgKCFpc0xlYXZpbmcgJiYgdHlwZW9mIGtpbmRWaXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyB7IEtpbmQoKSB7fSB9XG4gICAgICByZXR1cm4ga2luZFZpc2l0b3I7XG4gICAgfVxuICAgIHZhciBraW5kU3BlY2lmaWNWaXNpdG9yID0gaXNMZWF2aW5nID8ga2luZFZpc2l0b3IubGVhdmUgOiBraW5kVmlzaXRvci5lbnRlcjtcbiAgICBpZiAodHlwZW9mIGtpbmRTcGVjaWZpY1Zpc2l0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHsgS2luZDogeyBlbnRlcigpIHt9LCBsZWF2ZSgpIHt9IH0gfVxuICAgICAgcmV0dXJuIGtpbmRTcGVjaWZpY1Zpc2l0b3I7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBzcGVjaWZpY1Zpc2l0b3IgPSBpc0xlYXZpbmcgPyB2aXNpdG9yLmxlYXZlIDogdmlzaXRvci5lbnRlcjtcbiAgICBpZiAoc3BlY2lmaWNWaXNpdG9yKSB7XG4gICAgICBpZiAodHlwZW9mIHNwZWNpZmljVmlzaXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyB7IGVudGVyKCkge30sIGxlYXZlKCkge30gfVxuICAgICAgICByZXR1cm4gc3BlY2lmaWNWaXNpdG9yO1xuICAgICAgfVxuICAgICAgdmFyIHNwZWNpZmljS2luZFZpc2l0b3IgPSBzcGVjaWZpY1Zpc2l0b3Jba2luZF07XG4gICAgICBpZiAodHlwZW9mIHNwZWNpZmljS2luZFZpc2l0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8geyBlbnRlcjogeyBLaW5kKCkge30gfSwgbGVhdmU6IHsgS2luZCgpIHt9IH0gfVxuICAgICAgICByZXR1cm4gc3BlY2lmaWNLaW5kVmlzaXRvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRQcm90b3R5cGU7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IGJhc2VHZXRUYWcodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJlxuICAgIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwcGx5TWlkZGxld2FyZTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IF9jb21wb3NlMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGJpbmRBY3Rpb25DcmVhdG9ycztcbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNvbWJpbmVSZWR1Y2VycztcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCcuL3V0aWxzL3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzYW5pdHlFcnJvcjtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2FuaXR5KGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2FuaXR5RXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2FuaXR5RXJyb3IpIHtcbiAgICAgIHRocm93IHNhbml0eUVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tpXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtrZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjb21wb3NlO1xuLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHZhciBsYXN0ID0gZnVuY3NbZnVuY3MubGVuZ3RoIC0gMV07XG4gIHZhciByZXN0ID0gZnVuY3Muc2xpY2UoMCwgLTEpO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXN0LnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChjb21wb3NlZCwgZikge1xuICAgICAgcmV0dXJuIGYoY29tcG9zZWQpO1xuICAgIH0sIGxhc3QuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFjdGlvblR5cGVzID0gdW5kZWZpbmVkO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlU3RvcmU7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlID0gcmVxdWlyZSgnc3ltYm9sLW9ic2VydmFibGUnKTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbE9ic2VydmFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG52YXIgQWN0aW9uVHlwZXMgPSBleHBvcnRzLkFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmhhbmNlciBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICpcbiAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jb21wb3NlID0gZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBleHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9jcmVhdGVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVTdG9yZSk7XG5cbnZhciBfY29tYmluZVJlZHVjZXJzID0gcmVxdWlyZSgnLi9jb21iaW5lUmVkdWNlcnMnKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tYmluZVJlZHVjZXJzKTtcblxudmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlKCcuL2JpbmRBY3Rpb25DcmVhdG9ycycpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9yczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uQ3JlYXRvcnMpO1xuXG52YXIgX2FwcGx5TWlkZGxld2FyZSA9IHJlcXVpcmUoJy4vYXBwbHlNaWRkbGV3YXJlJyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwcGx5TWlkZGxld2FyZSk7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSBfY3JlYXRlU3RvcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IF9jb21iaW5lUmVkdWNlcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IF9iaW5kQWN0aW9uQ3JlYXRvcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IF9hcHBseU1pZGRsZXdhcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTJbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSB3YXJuaW5nO1xuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290OyAvKiBnbG9iYWwgd2luZG93ICovXG5cblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsO1xuZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIF9TeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoX1N5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdF9TeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSsnLCcrdmFsdWUgOiB2YWx1ZVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuIl19
