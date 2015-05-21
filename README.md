Instagram SDK with Fluxible
==========================

Plug & play the Instagram SDK into your Fluxible App!
inspired by fluxible-plugin-facebook

Features
--------

 * Works with webpack / browserify
 * Loads facebook SDK asynchronously (thanks to es6 Promises)
 * Shares configuration between server / client (means you can use environment variables)
 * Comes with a "do whatever you want" (MIT) license
 * Doesn't load SDK on server side

Install
-------

Add the module to your fluxible project :

    npm install --save fluxible-plugin-instagram

Add it to your fluxible context :

```javascript

import instagramPlugin from 'fluxible-plugin-instagram';

app.plug(instagramPlugin({
    /* https://developers.facebook.com/docs/javascript/reference/FB.init/v2.3 options */
    appId: 'xxx'
}));

```

Usage
-----

Add `getInstagramSdk` to the react's context :

```

Application = provideContext(Application, {

    // ...
    
    getInstagramSdk: React.PropTypes.func
    
});

```

From a component :

```javascript

class FooComponent {
    // ...

    plop() {
        this.context.getInstagramSdk().then(Instagram => {
            // do your sdk magic here
        });
    }
}

FooComponent.contextTypes = {
    getInstagramSdk: React.PropTypes.func
};

```
