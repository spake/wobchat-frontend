import Config from './Config'

var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

module.exports = {
    /*
    * Takes in a function as argument with is executed upon
    * over 1000 clients accessing the Google API. (?)
    */
    clientsLoaded: function (callback) {

        var ids = 0;

        var check = function () {
            if (ids++ > 1000) {
                callback();
            }
            else {
                setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    /*
    * Takes in a function as argument which is executed upon
    * google authentication services being loaded.
    * At this point the GoogleAuth object can be accessed through
    * the getAuth2() function.
    */
    authLoaded: function (callback) {
        var check = function () {
            if (auth2Loaded && sign2Loaded) {
                callback();
            }
            else {
                setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    /*
    * Takes in a function as argument which is executed upon
    * the Google API becoming available.
    */
    gapiLoaded: function (callback) {
        var hasgapi = function () {
            if (typeof (gapi) !== "undefined" && gapi.client) {
                callback();
            }
            else {
                setTimeout(function () {
                    hasgapi();
                }, 50);
            }
        }

        hasgapi();
    },
    getAuth2: function () {
        return auth2;
    },
    signIn: function () {

        var options = new gapi.auth2.SigninOptionsBuilder({
            scopes: 'email'
        });

        this.getAuth2().signIn(options).then(function (success) {
        }, function (fail) {
            console.error('Sign in failed');
        });
    },
    signOut: function () {
        this.getAuth2().signOut().then(function (success) {
        }, function (fail) {
            console.error('Sign out failed');
        });
    }

};


module.exports.gapiLoaded(function () {

    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: Config.client_id,
            scopes: 'email'
        });
        auth2Loaded = true;
    });

    gapi.load('signin2', function () {
        sign2Loaded = true;
    });

    var clientLoaded = function clientLoaded() {
        clientsLoaded++;
    }

});
