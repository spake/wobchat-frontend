var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Header = require('../../app/components/Header.jsx'),
    Router = require('../../app/components/Router.jsx'),
    AppBar = mui.AppBar;

describe('Router', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Router));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a Header', function() {
    assert(this.component.props.children[1].type == Header);
  });

});
