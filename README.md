# wobchat-frontend

----------------------

## Installing

Steps to install:

1. Install node, npm and nvm
2. Set node and npm version (`nvm install`)
3. Install everything else (`sudo npm install`)

To build assets, run `gulp`. To watch for changes, run `gulp watch`.


---------

## Testing

Make tests in the `test/component` folder. There should be one test file per react component.

Use `npm test` to run the tests.

-----------------------

## GAPI

The GAPI component (found at [react_components/GAPI.jsx](react_components/GAPI.jsx)) offers handling of interactions between wobchat-frontend and the Google API.

To use GAPI simply `require` it (e.g. `var foo = require('./react_components/GAPI.jsx'`) in whichever components or tests need it.

In most cases we want to use the authentication object of the API, so we call `authLoaded` and supply a function as argument which is executed upon the authentication object being loaded. Inside this function we write, we can access the auth object by calling `getAuth2()`, and then proceed to do whatever is needed with the auth object. More info on what can be achieved with the auth object can be found at the [Google Sign-In Reference](https://developers.google.com/identity/sign-in/web/reference).

GAPI also offers `signIn()` and `signOut()`, which are recommended over the raw API as they have some ability to debug on failed sign in/out.

As an example, to sign in/out if they are signed out/in using GAPI we would do the following:

    var googleApiLoader = require('react_components/GAPI.jsx');
    ...
    componentDidMount: function() {
        googleApiLoader.authLoaded() function() {
            \\ Define here what happens on auth load
            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                \\ Describes what happens on currentUser changing
                if (googleApiLoader.getAuth2().isSignedIn.get() {
                    \\ If signed in, sign out
                    googleApiLoader.signOut()
                } else {
                    googleApiLoader.signIn()
                }
            }
        }
    }
