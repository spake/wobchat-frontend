var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    Friend = require('../../app/components/Friend.jsx'),
    ListItem = mui.ListItem,
    DeleteFriendModal = require('../../app/components/DeleteFriendModal.jsx'),
    Avatar = mui.Avatar,
    IconButton = mui.IconButton,
    IconMenu = mui.IconMenu,
    MenuItem = mui.MenuItem;

describe('Friend', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Friend));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a div', function() {
    assert(this.component.type == 'div');
  });

  it('should render a ListItem inside that div', function() {
    assert(this.component.props.children[0].type == ListItem);
  });

  it('should have a ListItem with a leftAvatar of type Avatar rendered', function() {
    assert(this.component.props.children[0].props.leftAvatar.type == Avatar);
  });

  it('should have a ListItem with an IconMenu rendered', function() {
    assert(this.component.props.children[0].props.rightIconButton.type == IconMenu);
  });

  it('should have that IconMenu with a MenuItem inside it', function() {
    assert(this.component.props.children[0].props.rightIconButton.props.children.type == MenuItem);
  });

  it('should render a DeleteFriendModal inside the previous div', function() {
//    this.component.refs.modal.show();
    assert(this.component.props.children[1].type == DeleteFriendModal);
  });

});
