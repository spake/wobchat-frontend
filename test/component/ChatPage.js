var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    TextField = mui.TextField,
    Friends = require('../../app/components/Friends.jsx'),
    ChatPage = require('../../app/components/ChatPage.jsx'),
    FriendsListAddBox = require('../../app/components/FriendsListAddBox.jsx'),
    AltContainer = require('alt/AltContainer');

describe('ChatPage', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(ChatPage));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });

  it('should render a div inside that div', function() {
    assert(this.component.props.children[0].type == 'div');
  });

  it('should render a FriendsListAddBox inside that div', function() {
    assert(this.component.props.children[0].props.children[0].type == FriendsListAddBox);
  });

  it('should render an AltContainer inside previous div', function() {
    assert(this.component.props.children[0].props.children[1].type == AltContainer);
  });

  it('should render Friends inside that AltContainer', function() {
    assert(this.component.props.children[0].props.children[1].props.children.type == Friends);
  });

  // More testing for Message display


});
