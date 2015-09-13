var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    FriendsList = require('../../react_components/FriendsList.jsx'),
    FriendsListAddBox = require('../../react_components/FriendsListAddBox.jsx');

describe('FriendsList', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(FriendsList));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });

  it('should contain a FriendsListAddBox as its first item', function() {
    assert(this.component.props.children[0].type == FriendsListAddBox);
  });

  it('should contain a List as its second item', function() {
    assert(this.component.props.children[1].type == mui.List);
  });


});
