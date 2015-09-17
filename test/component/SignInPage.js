var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    CenterOnPage = require('../../react_components/CenterOnPage.jsx'),
    Logo = require('../../react_components/Logo.jsx'),
    SignInPage = require('../../react_components/SignInPage.jsx'),
    SignIn = require('../../react_components/SignIn.jsx'),
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

  it('should render a Logo', function() {
    assert(this.component.props.children[0].type == Logo);
  });

  it('should render a second CenterOnPage', function() {
    assert(this.component.props.children[1].type == CenterOnPage);
  });

  it('should render a SignIn', function() {
    assert(this.component.props.children[1].props.children.type == SignIn);
  });

});
