'use strict';

var Promise = require('es6-promise').Promise;
var loading = false;
var resolvers = [];

var debug = require('debug')('Fluxible:InstagramPlugin');

// var DEFAULT_VERSION = 'v2.3';

function getInstagramSdk(options) {
    var options = {
        client_id           : options.appId,
        cookie              : !!options.cookie,
        check_status        : !!options.status
    };

    debug('Instagram SDK asked');

    if (typeof window === 'undefined') {
        debug('server side, aborting');
        return Promise.reject(new Error('instagram: cannot get SDK in server side'));
    }

    if (window.IG) {
        return Promise.resolve(window.FB);
    }

    return new Promise(function (resolve, reject) {
        debug('appending resolver');
        resolvers.push(resolve);
        loadIfNecessary(options);
    });
}

module.exports = getInstagramSdk;

function loadIfNecessary(options) {
    if (!loading) {
        loading = true;
        load(options);
    }
}

function load(options) {
    debug('loading SDK');
    window.igAsyncInit = igAsyncInit.bind(null, options);

    (function(d, s, id){
        var igRoot = document.createElement('div');
        igRoot.setAttribute('id', 'ig-root');
        document.body.appendChild(igRoot);
        var js, ijs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//cdn.rawgit.com/mwelche/instagram-javascript-sdk/master/ig-min.js";
        ijs.parentNode.insertBefore(js, ijs);
    }(document, 'script', 'instagram-jssdk'));
}

function igAsyncInit(options) {
    window.IG.init(options);

    debug('finished loading Instagram SDK, resolving all promises');
    resolvers.map(function (resolve) { resolve(window.IG) });
    resolvers = [];
}
