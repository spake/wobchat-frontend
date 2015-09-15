var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

module.exports = {
    clientsLoaded: function (callback) {

        var ids = 0;

        var check = function () {
            if (ids++ > 1000) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    authLoaded: function (callback) {
        var check = function () {
            if (auth2Loaded && sign2Loaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 50);
            }
        }

        check();
    },
    gapiLoaded: function (callback) {
        var hasgapi = function () {
            if (typeof (gapi) !== "undefined" && gapi.client) {
                callback();
            }
            else {
                window.setTimeout(function () {
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
            client_id: '783279836221-m71iri9830ptguifn0apfbsnj22pfeel.apps.googleusercontent.com',
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
