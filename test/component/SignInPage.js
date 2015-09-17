var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    CenterOnPage = require('../../react_components/CenterOnPage.jsx'),
    SignInPage = require('../../react_components/SignInPage.jsx'),
    SignInOut = require('../../react_components/SignInOut.jsx'),
    AppBar = mui.AppBar;

describe('SignInPage', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(SignInPage));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a CenterOnPage', function() {
    assert(this.component.type == CenterOnPage);
  });

});
