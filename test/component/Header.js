var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Header = require('../../react_components/Header.jsx'),
    SignInOut = require('../../react_components/SignInOut.jsx'),
    AppBar = mui.AppBar;

describe('Header', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Header));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render an AppBar', function() {
    assert(this.component.type == AppBar);
  });

	it('should have a div in the iconRightElement property', function() {
		assert(this.component.props.iconElementRight.type == 'div')
	})

	it('should have a SignInOut inside that div', function() {
		assert(this.component.props.iconElementRight.props.children.type == SignInOut)
	})


});
