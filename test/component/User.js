var React = require('react/addons'),
    assert = require('assert'),
    TestUtils = React.addons.TestUtils,
    mui = require('material-ui'),
    User = require('../../app/components/User.jsx'),
    ListItem = mui.ListItem,
    Avatar = mui.Avatar,
    IconButton = mui.IconButton,
    IconMenu = mui.IconMenu,
    MenuItem = mui.MenuItem;

describe('User', function(){
  before('testing', function() {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(User));
    this.component = shallowRenderer.getRenderOutput();
  });

  it('should render a ListItem', function() {
    assert(this.component.type == ListItem);
  });

  it('should have a ListItem with a leftAvatar of type Avatar rendered', function() {
    assert(this.component.props.leftAvatar.type == Avatar);
  });

  it('should have a ListItem with an IconMenu rendered', function() {
    assert(this.component.props.rightIconButton.type == IconMenu);
  });

});
