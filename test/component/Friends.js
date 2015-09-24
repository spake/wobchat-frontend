var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    List = mui.List,
    Paper = mui.Paper,
    Friends = require('../../app/components/Friends.jsx'),
    FriendsListAddBox = require('../../app/components/FriendsListAddBox.jsx');

describe('Friends', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Friends));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a List', function() {
    assert(this.component.type == List);
  });

  it('should contain a Paper', function() {
    assert(this.component.props.children.type == Paper);
  });

});
