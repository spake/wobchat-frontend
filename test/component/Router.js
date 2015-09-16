var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Header = require('../../react_components/Header.jsx'),
    Router = require('../../react_components/Router.jsx'),
    AppBar = mui.AppBar;

describe('Router', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Router));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a Header', function() {
    assert(this.component.props.children[0].type == Header);
  });

});
