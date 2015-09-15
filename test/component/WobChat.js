var React = require('react/addons'),
    assert = require('assert'),
    WobChat = require('../../react_components/WobChat.jsx'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsList = require('../../react_components/FriendsList.jsx');

describe('WobChat', function(){
    before('testing', function() {
        var shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(WobChat));
        this.component = shallowRenderer.getRenderOutput();
    });

    it('should render an AppBar', function() {
        assert(this.component.props.children[0].type == mui.AppBar);
    });

  it('should render a FriendsList component', function() {
    assert(this.component.props.children[2].type == FriendsList);
  });
    it('should render Sign In component', function() {
        assert(this.component.props.children[1].type = SignIn);
    });
  

});
