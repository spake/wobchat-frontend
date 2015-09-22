var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    TextField = mui.TextField,
    FriendsList = require('../../react_components/FriendsList.jsx'),
    Thread = require('../../react_components/Thread.jsx'),
    ChatPage = require('../../react_components/ChatPage.jsx');

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

  it('should contain a FriendsList as its first item', function() {
    assert(this.component.props.children[0].props.children.type == FriendsList);
  });

  it('should contain a Thread as its second item', function() {
    assert(this.component.props.children[1].props.children[0].type == Thread);
  });

  it('should contain a TextField as its second item', function() {
    assert(this.component.props.children[1].props.children[1].props.children.type == TextField);
  });

});
