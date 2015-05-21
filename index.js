'use strict';

var instagramSdk = require('./lib/instagram-plugin');

function instagramPlugin(options) {
    var options = options;

    return {
        name: 'InstagramPlugin',
        plugContext: function () {
            return {
                plugComponentContext: function (componentContext) {
                    componentContext.getInstagramSdk = getInstagramSdk.bind(null, options);
                }
            };
        },
        dehydrate: function () {
            return { options: options };
        },
        rehydrate: function (state) {
            options = state.options;
        }
    };
}

module.exports = instagramPlugin;
