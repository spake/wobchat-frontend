var mui = require('material-ui');
var Colors = mui.Styles.Colors;


/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

var PurpleTheme = {
    primary1Color: Colors.deepPurple500,
    primary2Color: Colors.deepPurple700,
    primary3Color: Colors.deepPurple100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
};

module.exports = PurpleTheme;
